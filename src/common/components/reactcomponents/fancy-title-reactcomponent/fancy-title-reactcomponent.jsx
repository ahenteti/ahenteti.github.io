import * as React from 'react';
import * as constants from 'common/constants';
import './fancy-title-reactcomponent.scss';
import {
  checkAndAddSlideInClass,
  alreadyVisible,
  addAlreadyVisibleClass,
  addNotYetVisibleClass
} from './slidein-utlis';

class FancyTitleReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  render() {
    return (
      <div ref={el => (this.container = el)} className='fancy-title-reactcomponent'>
        <h2>{this.props.value}</h2>
      </div>
    );
  }

  componentDidMount() {
    $(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
      if (alreadyVisible(this.container)) {
        addAlreadyVisibleClass(this.container);
      } else {
        addNotYetVisibleClass(this.container);
      }
      window.addEventListener('scroll', this.scrollHandler);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    checkAndAddSlideInClass(this.container);
  }
}

export default FancyTitleReactComponent;
