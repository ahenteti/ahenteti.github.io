import * as React from 'react';

import './search-tags-reactcomponent.scss';
import * as commonConstants from 'common/constants';

class SearchTagsReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.hideTags = this.hideTags.bind(this);
    this.toggleTags = this.toggleTags.bind(this);
    this.selectTag = this.selectTag.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.hideTags);
    this.updateContainerClass();
  }

  componentDidUpdate() {
    this.hideTags();
    this.updateContainerClass();
  }

  render() {
    return (
      <div ref={el => (this.container = el)} className='search-tags-reactcomponent'>
        <div onClick={this.toggleTags} className='selected-tag-container'>
          <span ref={el => (this.selectedTag = el)} className='selected-tag'>
            {this.props.selectedTag}
          </span>
          <ion-icon ref={el => (this.dropdownArrow = el)} name='caret-down' aria-label='arrow dropdown'></ion-icon>
          <ion-icon
            ref={el => (this.dropupArrow = el)}
            class='hidden'
            name='caret-up'
            aria-label='arrow dropup'
          ></ion-icon>
        </div>
        <div ref={el => (this.tags = el)} className='tags hidden'>
          {this.props.tags.map(tag => (
            <div onClick={this.selectTag} key={tag} className='tag'>
              {tag}
            </div>
          ))}
        </div>
      </div>
    );
  }

  hideTags() {
    this.tags.classList.add('hidden');
    this.dropdownArrow.classList.remove('hidden');
    this.dropupArrow.classList.add('hidden');
  }

  toggleTags(event) {
    this.tags.classList.toggle('hidden');
    this.dropdownArrow.classList.toggle('hidden');
    this.dropupArrow.classList.toggle('hidden');
    event.nativeEvent.stopImmediatePropagation();
  }

  selectTag(event) {
    this.props.selectTag(event.target.innerText);
    event.nativeEvent.stopImmediatePropagation();
  }

  updateContainerClass() {
    if (commonConstants.ALL_ARTICLES === this.props.selectedTag) {
      this.container.classList.remove('background-primary-color');
    } else {
      this.container.classList.add('background-primary-color');
    }
  }
}

export default SearchTagsReactComponent;
