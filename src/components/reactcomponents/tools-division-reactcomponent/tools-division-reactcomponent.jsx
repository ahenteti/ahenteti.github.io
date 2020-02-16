import * as React from 'react';
import './tools-division-reactcomponent.scss';
import ToolCardReactComponent from 'components/reactcomponents/tools-division-reactcomponent/tool-card-reactcomponent/tool-card-reactcomponent';

class ToolsDivisionReactComponent extends React.Component {
  render() {
    return (
      <div className='tools-division-reactcomponent'>
        {this.props.tools.map(tool => {
          console.log(tool);
          return <ToolCardReactComponent key={tool} tool={tool}></ToolCardReactComponent>;
        })}
      </div>
    );
  }
}

export default ToolsDivisionReactComponent;
