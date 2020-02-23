import React from 'react';
import ReactDOM from 'react-dom';
import TagListReactComponent from 'common/components/reactcomponents/tag/tag-list-reactcomponent/tag-list-reactcomponent';
import {
  checkAndAddSlideInClass,
  alreadyVisible,
  addAlreadyVisibleClass,
  addNotYetVisibleClass
} from 'common/components/reactcomponents/fancy-title-reactcomponent/slidein-utlis';
import './article-card-reactcomponent.scss';
import * as constants from 'common/constants';

class ArticleCardReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  render() {
    return (
      <div ref={el => (this.container = el)} className='article-card-reactcomponent'>
        <a href={this.props.article.slug}>
          <div className='container'>
            <p className='name'>{this.props.article.name}</p>
            <div className='tags'>
              <ion-icon name='pricetags'></ion-icon>
              <TagListReactComponent
                selectedTag={this.props.selectedTag}
                selectTag={this.props.selectTag}
                tags={this.props.article.tags}
              ></TagListReactComponent>
            </div>
            <div className='publication-date'>
              <ion-icon name='calendar'></ion-icon>
              <p>{this.props.article.publicationDate}</p>
            </div>
            <div ref={el => (this.newArticleWrapper = el)} onClick={this.selectTag} className='new-article-wrapper'>
              <div className='new-article'>New</div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  componentDidMount() {
    this.highlightNewArticle();
    $(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
      if (alreadyVisible(this.container)) {
        addAlreadyVisibleClass(this.container);
      } else {
        addNotYetVisibleClass(this.container);
      }
      window.addEventListener('scroll', this.scrollHandler);
    });
    setTimeout(() => {}, 0);
  }

  highlightNewArticle() {
    if (this.props.article.recent) {
      this.newArticleWrapper.style.display = 'block';
    }
  }

  selectTag(event) {
    event.preventDefault();
    this.props.selectTag(constants.NEW_ARTICLES);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    checkAndAddSlideInClass(this.container);
  }
}

export default ArticleCardReactComponent;
