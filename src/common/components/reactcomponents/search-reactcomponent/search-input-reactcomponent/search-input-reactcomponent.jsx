import * as React from 'react';

import './search-input-reactcomponent.scss';

class SearchInputReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className='search-input-reactcomponent'>
        <input
          ref={el => (this.input = el)}
          type='text'
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          onChange={this.delay(this.onChange, 500)}
          placeholder='Search articles...'
        />
      </div>
    );
  }

  onChange() {
    this.props.onArticlesFilterChange(this.input.value);
  }

  delay(fn, ms) {
    let timer = 0;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(fn.bind(this, ...args), ms || 0);
    };
  }
}

export default SearchInputReactComponent;
