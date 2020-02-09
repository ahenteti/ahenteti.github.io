import * as React from 'react';
import SelectReactComponent from 'components/reactcomponents/select-reactcomponent/select-reactcomponent';
import * as constants from 'common/constants';
import './website-divisions-reactcomponent.scss';

class WebsiteDivisionsReactComponent extends React.Component {
  render() {
    return (
      <div className='website-divisions-reactcomponent'>
        <SelectReactComponent
          selectedOption={constants.DEFAULT_WEBSITE_DIVISION}
          options={constants.WEBSITE_DIVISIONS}
        />
      </div>
    );
  }
}

export default WebsiteDivisionsReactComponent;
