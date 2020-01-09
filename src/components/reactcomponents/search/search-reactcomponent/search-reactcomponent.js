import * as React from 'react';

import './search-reactcomponent.scss';
import SearchInputReactComponent from '../search-input-reactcomponent/search-input-reactcomponent';
import SearchTagsReactComponent from '../search-tags-reactcomponent/search-tags-reactcomponent';

class SearchReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  render() {
    return (
      <div ref={el => (this.container = el)} className='search-reactcomponent'>
        <SearchTagsReactComponent
          selectedTag={this.props.selectedTag}
          selectTag={this.props.selectTag}
          tags={this.props.tags}
        />
        <SearchInputReactComponent
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onArticlesFilterChange={this.props.onArticlesFilterChange}
        />
        <ion-icon name='search'></ion-icon>
      </div>
    );
  }

  onBlur() {
    this.container.classList.remove('focus');
  }

  onFocus() {
    this.container.classList.add('focus');
  }
}

export default SearchReactComponent;
