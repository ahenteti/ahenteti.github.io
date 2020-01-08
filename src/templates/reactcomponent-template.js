import * as React from 'react';

import './__COMPONENT_CSS_FILES_NAME__';

class __COMPONENT_NAME__ extends React.Component {
  render() {
    return (
      <div class='__COMPONENT_NAME_WITH_DASHES__'>
        <h1>{this.props.value || 'Hello React'}</h1>
      </div>
    );
  }
}

export default __COMPONENT_NAME__;
