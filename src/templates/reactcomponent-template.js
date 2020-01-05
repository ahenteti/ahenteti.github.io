import * as React from 'react';

import style from './__COMPONENT_CSS_FILES_NAME__';

class __COMPONENT_NAME__ extends React.Component {
  render() {
    return (
      <div class='container'>
        <h1 class={style.h1}>{this.props.value || 'Hello React'}</h1>
      </div>
    );
  }
}

export default __COMPONENT_NAME__;
