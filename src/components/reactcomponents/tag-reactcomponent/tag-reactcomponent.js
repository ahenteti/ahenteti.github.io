import * as React from 'react';

import './tag-reactcomponent.scss';

class TagReactComponent extends React.Component {
  render() {
    return (
      <span class={this.props.selected ? 'tag-reactcomponent selected' : 'tag-reactcomponent'}>{this.props.value}</span>
    );
  }
}

export default TagReactComponent;
