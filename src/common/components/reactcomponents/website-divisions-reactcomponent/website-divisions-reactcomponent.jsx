import * as React from 'react';
import SelectReactComponent from 'common/components/reactcomponents/select-reactcomponent/select-reactcomponent';
import './website-divisions-reactcomponent.scss';

class WebsiteDivisionsReactComponent extends React.Component {
  render() {
    return (
      <div className='website-divisions-reactcomponent'>
        <SelectReactComponent
          selectedOption={this.props.currentWebsiteDivision}
          options={this.props.websiteDivisions}
          selectOption={this.props.changeWebsiteDivision}
        />
      </div>
    );
  }
}

export default WebsiteDivisionsReactComponent;
