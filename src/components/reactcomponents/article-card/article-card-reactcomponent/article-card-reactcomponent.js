import React from 'react';
import ReactDOM from 'react-dom';
import TagListReactComponent from '../../tag-list-reactcomponent/tag-list-reactcomponent';
import {
  checkAndAddSlideInClass,
  alreadyVisible,
  addAlreadyVisibleClass,
  addNotYetVisibleClass
} from '../../fancy-title-reactcomponent/slidein-utlis';
import './article-card-reactcomponent.scss';

class ArticleCardReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  render() {
    return (
      <div ref={el => (this.container = el)} className='article-card-reactcomponent'>
        <a href={this.props.article.slug}>
          <div className='container'>
            <p className='name'>{this.props.article.name}</p>
            <div className='tags'>
              <ion-icon name='ios-pricetags'></ion-icon>
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
          </div>
        </a>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      if (alreadyVisible(this.container)) {
        addAlreadyVisibleClass(this.container);
      } else {
        addNotYetVisibleClass(this.container);
      }
      window.addEventListener('scroll', this.scrollHandler);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    checkAndAddSlideInClass(this.container);
  }
}

export default ArticleCardReactComponent;
