import * as React from 'react';

import './select-reactcomponent.scss';

class SelectReactComponent extends React.Component {
  render() {
    return (
      <div className='select-reactcomponent'>
        <h1>{this.props.value || 'Hello React'}</h1>
      </div>
    );
  }
}

export default SelectReactComponent;
