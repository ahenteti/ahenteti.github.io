import * as React from 'react';

import './tags-reactcomponent.scss';
import TagReactComponent from '../tag-reactcomponent/tag-reactcomponent';

class TagsReactComponent extends React.Component {
  render() {
    return (
      <div className='tags-reactcomponent'>
        {this.props.tags.split(',').map(t => {
          return <TagReactComponent key={t} value={t}></TagReactComponent>;
        })}
      </div>
    );
  }
}

export default TagsReactComponent;
