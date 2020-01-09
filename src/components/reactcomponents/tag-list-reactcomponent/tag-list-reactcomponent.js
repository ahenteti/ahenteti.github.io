import * as React from 'react';

import './tag-list-reactcomponent.scss';
import TagReactComponent from '../tag-reactcomponent/tag-reactcomponent';

class TagListReactComponent extends React.Component {
  render() {
    return (
      <div className='tag-list-reactcomponent'>
        {this.props.tags.split(',').map(t => {
          return (
            <TagReactComponent
              key={t}
              selectedTag={this.props.selectedTag}
              selectTag={this.props.selectTag}
              value={t}
            ></TagReactComponent>
          );
        })}
      </div>
    );
  }
}

export default TagListReactComponent;
