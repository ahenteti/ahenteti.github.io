#!/bin/sh

GREEN="\\033[1;32m"
NORMAL="\\033[0;39m"
RED="\\033[1;31m"
BLUE="\\033[1;34m"
WHITE="\\033[0;02m"
YELLOW="\\033[1;33m"

PROJECT_FILE="__PROJECT_FILE__"
PROJECT_FILE_INDENTATION="                    "
START_APP_MULTILINE_CODE_TAG='        <multiline-code-webcomponent language="bash">
            <pre slot="code">
                <code>'
END_APP_MULTILINE_CODE_TAG='                </code>
            </pre>
        </multiline-code-webcomponent>'

PROJECT_FILES="__PROJECT_FILES__"
PROJECT_FILES_INDENTATION="                            "
START_APP_CODE_TABS_TAG='        <code-tabs-webcomponent>'
START_PROJECT_STRUCTURE_APP_CODE_TAB_TAG='            <code-tab-webcomponent slot="code-tab">project structure</code-tab-webcomponent>
            <code-panel-webcomponent slot="code-panel">
                <multiline-code-webcomponent language="xml">
                    <pre slot="code">
                        <code>'
END_PROJECT_STRUCTURE_APP_CODE_TAB_TAG='                        </code>
                    </pre>
                </multiline-code-webcomponent>
            </code-panel-webcomponent>'
END_APP_CODE_TABS_TAG='        </code-tabs-webcomponent>'
START_APP_CODE_TAB_TAG='            <code-tab-webcomponent slot="code-tab">__SOURCE_FILENAME__</code-tab-webcomponent>
            <code-panel-webcomponent slot="code-panel">
                <multiline-code-webcomponent language="__SOURCE_FILENAME_EXTENSION__">
                    <pre slot="code">
                        <code>'
END_APP_CODE_TAB_TAG='                        </code>
                    </pre>
                </multiline-code-webcomponent>
            </code-panel-webcomponent>'

name=
tags=
containerFolder=
sourceFile=
articleFile=

usage() {
  printf "Usage: %s COMMAND [COMMAND-OPTION...]\n" "$0"
  cat >&2 << EOF
Manage articles

COMMAND: the command that you want to execute. the supported commands are:
  - deploy 
    deploy the web site to github pages

  - new-component, nc
    create a new component
   
    options:
      --name, -n
        if your name contains more than one word, please use hyphen "-" as separator

  - new-article, na
    create a new article with its base html, css, js and metadata files
    
    options: 
      --name, -n
        article name
        the article name must be unique 
        An internal verification will be done using the folling command: 
        find src/articles -name <article-name-after-transformation> | wc -l

      --tags, -t
        article tags (separated by a space if there are many) 

      --container-folder, -f
        the folder containing this new article
        /src/artciles/<container-folder>/<article-name-after-transformation>

      --readtime, -r
        article read time
        default value: 5 min

      --author, -a
        article author
        default value: Ahmed HENTETI

  - copy-project-file, cpf
    copy the content of a source file to an article

    options: 
      --project-file, -s
        the path of the project file 
      
      --article-file
        the path of the article where to put the content of the source file

  - copy-project-files, cpfs
    copy project files to an article

    options: 
      --article-file
        the path of the article where to put the content of the source file

EOF
}

deploy () {
  set -e

  echo -e "${GREEN}\nnpm build${NORMAL}"
  npm run build

  echo -e "${GREEN}\ngit worktree add --checkout deploy-to-gh-pages origin/master${NORMAL}"
  git worktree add --checkout deploy-to-gh-pages origin/master

  echo -e "${GREEN}\nrm -rf deploy-to-gh-pages/*${NORMAL}"
  rm -rf deploy-to-gh-pages/*

  echo -e "${GREEN}\ncp -r dist/* deploy-to-gh-pages/${NORMAL}"
  cp -r dist/* deploy-to-gh-pages/

  echo -e "${GREEN}\ncd deploy-to-gh-pages/${NORMAL}"
  cd deploy-to-gh-pages/

  echo -e "${GREEN}\ngit checkout -b deploy-to-gh-pages${NORMAL}"
  git checkout -b deploy-to-gh-pages


  echo -e "${GREEN}\ngit add .${NORMAL}"
  git add .

  echo -e "${GREEN}\ngit commit -am \"deploying new version of the website to github pages\"${NORMAL}"
  git commit -am "deploying new version of the website to github pages"

  echo -e "${GREEN}\ngit checkout master${NORMAL}"
  git checkout master

  echo -e "${GREEN}\ngit reset deploy-to-gh-pages --hard${NORMAL}"
  git reset deploy-to-gh-pages --hard

  echo -e "${GREEN}\ngit push${NORMAL}"
  git push -f

  echo -e "${GREEN}\ncd ..${NORMAL}"
  cd ..

  echo -e "${GREEN}\nrm -rf deploy-to-gh-pages${NORMAL}"
  rm -rf deploy-to-gh-pages

  echo -e "${GREEN}\ngit checkout -b deploy-to-gh-pages${NORMAL}"
  git worktree remove deploy-to-gh-pages --force

  echo -e "${GREEN}\ngit branch -D deploy-to-gh-pages${NORMAL}"
  git branch -D deploy-to-gh-pages

  echo -e "${GREEN}\nDone!${NORMAL}"
}

getTransformedName() {
  transformed_name=$(echo $1 | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr ' ' '-' | tr -d ':')
  echo "$transformed_name"
}

jointBy () {
  local IFS="$1"
  shift
  echo "$*"
}

newArticle() {
  if [ -z $name ]; then
    printf "\n${GREEN}your article name: ${NORMAL}"
    read name
  fi
  transformed_name=$(getTransformedName "$name")
  exist=$(find src/pages/articles -name $transformed_name | wc -l)
  while [ $exist -ne 0 ]; do
    printf "${RED}article name already exists, please choose another name!${NORMAL}\n"
    printf "${GREEN}your article name: ${NORMAL}"
    read name
    transformed_name=$(getTransformedName "$name")
    exist=$(find src/pages/articles -name $transformed_name | wc -l)
  done

  if [ -z $tags ]; then
    printf "\n${GREEN}your article tags (seperated by a space if there are many): ${NORMAL}"
    read -ra tags
  fi

  if [ -z $category ]; then
    printf "\n${GREEN}your article category: ${NORMAL}"
    read -ra category
  fi

  if [ -z $containerFolder ]; then
    printf "\n${GREEN}article's parent folder: ${NORMAL}"
    read containerFolder
  fi
  containerFolder=$(echo $containerFolder | sed 's|\.|/|g')

  IFS=$'\n' 
  sortedTags=($(sort <<< "${tags[*]}")); 
  unset IFS

  parentFolder="src/pages/articles/$containerFolder/$transformed_name"

  mkdir -p $parentFolder
  articleFile=$parentFolder/$transformed_name.html
  cp src/templates/article-template.html $articleFile
  sed -i "s/__ARTICLE_NAME__/$name/g" $articleFile

  touch $parentFolder/$transformed_name.scss
  touch $parentFolder/$transformed_name.js
  metadata=$parentFolder/metadata.json
  touch $metadata

  publicationDate=$(date '+%b %d, %Y')
  file_name="$transformed_name.html"
  tools/jq -n --arg name "$name" \
         --arg publicationDate "$publicationDate" \
         --arg file_name "$file_name" \
         --arg category "$category" \
         --arg tags "$(jointBy , ${sortedTags[*]})" \
         '{ name: $name, slug: $file_name, tags: $tags, category: $category, publicationDate: $publicationDate }' \
         > $metadata
  echo -e "${GREEN}\nDone${NORMAL}"
} 

newWebComponent() {
  if [ -z $name ]; then
    printf "\n${GREEN}your component name: ${NORMAL}"
    read name
  fi

  componentName=$(echo "$name" | tr '[:upper:]' '[:lower:]')
  
  componentClassName=""
  IFS='-' read -ra componentNameSplitted <<< "$componentName"; unset IFS
  for i in ${componentNameSplitted[@]}; do
    componentClassName=$componentClassName$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}
  done

  # add webcomponent suffix
  componentName=$componentName"-webcomponent"
  componentClassName=$componentClassName"WebComponent"

  componentFile=src/components/webcomponents/$componentName.js
  cp src/templates/webcomponent-template.js $componentFile

  sed -i "s/__COMPONENT_CLASS_NAME__/$componentClassName/g" $componentFile
  sed -i "s/__COMPONENT_NAME__/$componentName/g" $componentFile

  echo -e "${GREEN}\nDone${NORMAL}"
}

newReactComponent() {
  if [ -z $name ]; then
    printf "\n${GREEN}your component name: ${NORMAL}"
    read name
  fi

  componentName=$(echo "$name" | tr '[:upper:]' '[:lower:]')
  
  componentClassName=""
  IFS='-' read -ra componentNameSplitted <<< "$componentName"; unset IFS
  for i in ${componentNameSplitted[@]}; do
    componentClassName=$componentClassName$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}
  done

  # add reactcomponent suffix
  componentFileName=$componentName"-reactcomponent"
  componentJsFileName=$componentName"-reactcomponent.js"
  componentCssFileName=$componentName"-reactcomponent.module.scss"
  componentClassName=$componentClassName"ReactComponent"

  componentJsFile=src/components/reactcomponents/$componentFileName/$componentJsFileName
  componentCssFile=src/components/reactcomponents/$componentFileName/$componentCssFileName
  mkdir -p src/components/reactcomponents/$componentFileName
  cp src/templates/reactcomponent-template.js $componentJsFile
  cp src/templates/reactcomponent-template.module.scss $componentCssFile

  sed -i "s/__COMPONENT_NAME__/$componentClassName/g" $componentJsFile
  sed -i "s/__COMPONENT_CSS_FILES_NAME__/$componentCssFileName/g" $componentJsFile

  echo -e "${GREEN}\nDone${NORMAL}"
}

copyProjectFile () {
  articleFile=$(calcFileInput article)
  sourceFile=$(calcFileInput source)

  projectFile=$(mktemp)
  echo -e "$START_APP_MULTILINE_CODE_TAG" >> $projectFile
  sourceFileAfterTransformation=$(escapeReservedHtmlCharactersAndAddIndentation $sourceFile "file")
  cat $sourceFileAfterTransformation >> $projectFile
  echo -e "$END_APP_MULTILINE_CODE_TAG" >> $projectFile

  sed -i "/$PROJECT_FILE/r $projectFile" $articleFile
  sed -i "/$PROJECT_FILE/d" $articleFile
  rm $projectFile
  rm $sourceFileAfterTransformation
}

copyProjectFiles () {
  articleFile=$(calcFileInput article)

  projectFiles=$(mktemp)
  echo -e "$START_APP_CODE_TABS_TAG" >> $projectFiles

  echoProjectStructure $projectFiles

  printf "\n${GREEN}project file: ${NORMAL}"
  read -r sourceFile
  while [[ "$sourceFile" != "end" ]]; do
    while [ ! -f $sourceFile ]; do
      printf "\n${GREEN}your file doesn't exist, please try again: ${NORMAL}"
      read -r sourceFile
    done

    filename=$(basename $sourceFile)
    extension=${filename##*.}
    echo -e "$START_APP_CODE_TAB_TAG" | sed -e "s/__SOURCE_FILENAME__/$filename/g; s/__SOURCE_FILENAME_EXTENSION__/$extension/g" >> $projectFiles

    sourceFileAfterTransformation=$(escapeReservedHtmlCharactersAndAddIndentation $sourceFile "files")
    cat $sourceFileAfterTransformation >> $projectFiles
    rm $sourceFileAfterTransformation

    echo -e "$END_APP_CODE_TAB_TAG" >> $projectFiles

    printf "\n${GREEN}project file: ${NORMAL}"
    read -r sourceFile
  done

  echo -e "$END_APP_CODE_TABS_TAG" >> $projectFiles
  sed -i "/$PROJECT_FILES/r $projectFiles" $articleFile
  sed -i "/$PROJECT_FILES/d" $articleFile
  rm $projectFiles
}

echoProjectStructure () {
  projectStructure=$(mktemp)
  echo -e "$START_PROJECT_STRUCTURE_APP_CODE_TAB_TAG" >> $1
  projectPath=$(calcFolderInput project)
  currentDirectory=$(pwd)
  cd $projectPath
  tree -I "target|test|*.iml|nb-configuration.xml" | grep -v "directories," \
      | sed 's/`--/└──/g; s/|--/├──/g' >> $projectStructure
  cd $currentDirectory
  sed -i "s/^/$PROJECT_FILES_INDENTATION/" $projectStructure
  cat $projectStructure >> $1
  echo -e "$END_PROJECT_STRUCTURE_APP_CODE_TAB_TAG" >> $1
  rm $projectStructure
}

getLineIndentation() {
  indentation=$(grep $1 $2 | sed "s/$1//")
  echo "$indentation"
}

escapeReservedHtmlCharactersAndAddIndentation() {
  if [[ "$2" == "files" ]]; then
    indentation="$PROJECT_FILES_INDENTATION"
  else 
    indentation="$PROJECT_FILE_INDENTATION"
  fi
  tmp=$(mktemp)
  content=$(cat $1 | sed 's/</\&lt;/g; s/>/\&gt;/g; s/\$/\\$/g' | sed 's/|/│/g')
  echo -e "$content" > $tmp
  sed -i "s/^/$indentation/" $tmp
  echo $tmp
}

calcFileInput() {
  file=
  printf "\n${GREEN}your $1 path: ${NORMAL}" >&2
  read -r file
  file=$(windowsToLinuxFilePath $file)
  while [ ! -f $file ]; do
    printf "\n${GREEN}your file doesn't exist, please try again: ${NORMAL}" >&2
    read -r file
    file=$(windowsToLinuxFilePath $file)
  done
  echo $file
}

calcFolderInput() {
  file=
  printf "\n${GREEN}your $1 path: ${NORMAL}" >&2
  read -r file
  file=$(windowsToLinuxFilePath $file)
  while [ ! -d $file ]; do
    printf "\n${GREEN}your file doesn't exist, please try again: ${NORMAL}" >&2
    read -r file
    file=$(windowsToLinuxFilePath $file)
  done
  echo $file
}

windowsToLinuxFilePath() {
  file=$1
  file=${file/C://c}
  file=${file//\\//}
  echo $file
}

OPTS=$(getopt -o hn:t:f:s: --long help,name:,tags:,container-folder:,project-file:,article-file: -n 'parse-options' -- "$@")
if [ $? != 0 ]; then
  echo "Failed parsing options." >&2; exit 1
fi
eval set -- "$OPTS"

while true; do
  case "$1" in
    -h | --help )
      usage; shift ;;
    -n | --name )
      name=$2; shift 2 ;;
    -t | --tags )
      read -ra tags <<< "$2"; 
      shift 2 ;;
    -f | --container-folder )
      containerFolder=$2; shift 2 ;;
    -s | --project-file )
      projectFile=$2; shift 2 ;;
    --article-file )
      articleFile=$2; shift 2 ;;
    -- )
      shift; break ;;
    * )
      break ;;
  esac
done

case $1 in 
  new-article | na )
    newArticle ;;
  new-webcomponent | nwc )
    newWebComponent ;;
  new-reactcomponent | nrc )
    newReactComponent ;;
  deploy | d )
    deploy ;;
  copy-project-file | cpf )
    copyProjectFile ;;
  copy-project-files | cpfs )
    copyProjectFiles ;;
  * )
    usage ;;
esac