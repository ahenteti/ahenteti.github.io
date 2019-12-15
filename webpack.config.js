const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DeclareComponentsPlugin = require("./plugins/declare-components-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let ARTICLES_METADATA = null;

const entries = glob
  .sync("./src/{index,about,articles}/**/*.js")
  .reduce((acc, filePath) => {
    const parentFolderName = getParentFolderName(filePath);
    const fileNameWithoutExtension = getBasenameWithoutExtension(
      filePath,
      ".js"
    );
    if (parentFolderName === fileNameWithoutExtension) {
      acc[getBasenameWithoutExtension(filePath, ".js")] = filePath;
    }
    return acc;
  }, {});
entries.common = "./src/common/common.js";
entries.components = "./src/components/components.js";

const htmlWebpackPlugins = glob
  .sync("./src/{index,about,articles}/**/*.html")
  .reduce((acc, filePath) => {
    acc.push(
      new HtmlWebpackPlugin({
        filename: path.basename(filePath),
        template: filePath,
        chunks: [
          "components",
          "common",
          getBasenameWithoutExtension(filePath, ".html")
        ],
        chunksSortMode: "manual"
      })
    );
    return acc;
  }, []);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[chunkhash].js"
  },
  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DeclareComponentsPlugin(),
    new ManifestPlugin(),
    ...htmlWebpackPlugins,
    new InlineChunkManifestHtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "css/[name].[chunkhash].css"
    }),
    new webpack.DefinePlugin({
      ALL_ARTICLES: JSON.stringify(getArticlesMetadata()),
      ALL_ARTICLES_BY_CATEGORY: JSON.stringify(
        toArticlesByCategory(getArticlesMetadata())
      ),
      ALL_TAGS: JSON.stringify(getArticlesTags())
    }),
    new CopyWebpackPlugin([{ from: "src/img", to: "img" }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s?[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.html$/,
        use: "html-loader?interpolate"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "file-loader?name=img/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: "./dist"
  },
  watchOptions: {
    ignored: ["./src/components/components.js"]
  }
};

function getBasenameWithoutExtension(filePath, extension) {
  return path.basename(filePath, extension);
}

function getParentFolderName(filePath) {
  return path
    .dirname(filePath)
    .split("/")
    .pop();
}

function getArticlesMetadata() {
  if (ARTICLES_METADATA === null) {
    ARTICLES_METADATA = glob
      .sync("./src/articles/**/metadata.json")
      .reduce((articles, filePath) => {
        articles.push(JSON.parse(fs.readFileSync(filePath)));
        return articles;
      }, []);

    const tagToArticlesMap = new Map();
    for (const article of ARTICLES_METADATA) {
      for (const tag of article.tags.split(",")) {
        if (!tagToArticlesMap.get(tag)) {
          tagToArticlesMap.set(tag, new Set());
        }
        tagToArticlesMap.get(tag).add(article);
      }
    }

    for (const article of ARTICLES_METADATA) {
      const relatedArticles = new Set();
      for (const tag of article.tags.split(",")) {
        for (const article of tagToArticlesMap.get(tag)) {
          relatedArticles.add(article);
        }
      }
      relatedArticles.delete(article);
      const relatedArticlesWithoutRelatedArticlesProperty = [];
      for (const article of relatedArticles) {
        const {
          relatedArticlesProperty,
          ...articleWithoutRelatedArticlesProperty
        } = article;
        relatedArticlesWithoutRelatedArticlesProperty.push(
          articleWithoutRelatedArticlesProperty
        );
      }
      article.relatedArticles = relatedArticlesWithoutRelatedArticlesProperty;

      const articleNameKeys = article.name.toLowerCase().split(" ");
      const articleTags = article.tags.toLowerCase().split(",");
      const articleKeys = articleNameKeys.concat(articleTags);
      article.searchKey = articleKeys.join(" ");
    }
  }
  return ARTICLES_METADATA;
}

function toArticlesByCategory(allArticles) {
  const articlesByCategory = {};
  for (const article of allArticles) {
    if (!articlesByCategory.hasOwnProperty(article.category)) {
      articlesByCategory[article.category] = [];
    }
    articlesByCategory[article.category].push(article);
  }
  return articlesByCategory;
}

function getArticlesTags() {
  const tags = glob
    .sync("./src/articles/**/metadata.json")
    .reduce((tags, filePath) => {
      JSON.parse(fs.readFileSync(filePath))
        .tags.split(",")
        .forEach(tag => tags.add(tag));
      return tags;
    }, new Set());
  let tagsArray = Array.from(tags);
  tagsArray.sort();
  return ["all", ...tagsArray];
}
