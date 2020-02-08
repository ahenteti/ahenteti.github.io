import * as React from 'react';

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
    setTimeout(() => {
      if (alreadyVisible(this.container)) {
        addAlreadyVisibleClass(this.container);
      } else {
        addNotYetVisibleClass(this.container);
      }
      window.addEventListener('scroll', this.scrollHandler);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    checkAndAddSlideInClass(this.container);
  }
}

export default FancyTitleReactComponent;
