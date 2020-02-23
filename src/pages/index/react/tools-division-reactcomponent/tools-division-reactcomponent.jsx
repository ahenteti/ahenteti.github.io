import * as React from 'react';
import './tools-division-reactcomponent.scss';
import ToolCardReactComponent from './tool-card-reactcomponent/tool-card-reactcomponent';

class ToolsDivisionReactComponent extends React.Component {
  render() {
    return (
      <div className='tools-division-reactcomponent'>
        {this.props.tools.map(tool => {
          return <ToolCardReactComponent key={tool} tool={tool}></ToolCardReactComponent>;
        })}
      </div>
    );
  }
}

export default ToolsDivisionReactComponent;
