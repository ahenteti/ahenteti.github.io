import * as React from 'react';

import './tag-reactcomponent.scss';

class TagReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selectTag = this.selectTag.bind(this);
  }

  render() {
    return (
      <span
        className={this.props.selectedTag === this.props.value ? 'tag-reactcomponent selected' : 'tag-reactcomponent'}
        onClick={this.selectTag}
      >
        {this.props.value}
      </span>
    );
  }

  selectTag(event) {
    event.preventDefault();
    this.props.selectTag(event.target.innerText);
  }
}

export default TagReactComponent;
