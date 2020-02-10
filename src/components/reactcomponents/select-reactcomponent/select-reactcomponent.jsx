import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './select-reactcomponent.scss';

class SelectReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selectOption = this.selectOption.bind(this);
    this.state = {
      open: false
    };
  }

  render() {
    const { options, selectedOption } = this.props;
    const { open } = this.state;
    return (
      <div className={open ? 'select-reactcomponent open' : 'select-reactcomponent'}>
        <div className='selected-option-container' onClick={() => this.toggleList()}>
          <div className='selected-option'>{selectedOption}</div>
          {open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
        </div>
        {open && (
          <ul className={open ? 'options open' : 'options'}>
            {options.map(option => (
              <li onClick={this.selectOption} className='option' key={option}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  handleClickOutside() {
    this.hideOptions();
  }

  hideOptions() {
    this.setState({
      open: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  selectOption(event) {
    event.preventDefault();
    this.setState({
      open: false
    });
    if (this.props.selectOption) {
      this.props.selectOption(event.target.innerText);
    }
  }
}

export default onClickOutside(SelectReactComponent);
