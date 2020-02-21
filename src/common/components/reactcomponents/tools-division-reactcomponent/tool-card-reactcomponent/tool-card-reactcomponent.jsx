import * as React from 'react';

import './tool-card-reactcomponent.scss';

class ToolCardReactComponent extends React.Component {
  render() {
    return (
      <div className='tool-card-reactcomponent'>
        <a href={this.props.tool.slug}>
          <div className='container'>
            <p className='name'>{this.props.tool.name}</p>
            <p className='description'>{this.props.tool.description}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default ToolCardReactComponent;
