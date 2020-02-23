import * as React from 'react';
import ToastLevel from 'common/components/reactcomponents/toast-reactcomponent/toast-level';
import './toast-reactcomponent.scss';

class ToastReactComponent extends React.Component {
  componentDidMount() {
    this.show();
    setTimeout(() => this.hide(), 2900);
  }

  show() {
    this.container.classList.add('show');
  }

  hide() {
    this.container.classList.remove('show');
  }

  render() {
    let component;
    if (this.props.level === ToastLevel.INFO) {
      component = (
        <info-webcomponent>
          <p>{this.props.msg}</p>
        </info-webcomponent>
      );
    } else if (this.props.level === ToastLevel.WARN) {
      component = (
        <warn-webcomponent>
          <p>{this.props.msg}</p>
        </warn-webcomponent>
      );
    } else {
      component = (
        <error-webcomponent>
          <p>{this.props.msg}</p>
        </error-webcomponent>
      );
    }
    return (
      <div ref={el => (this.container = el)} className='toast-reactcomponent'>
        {component}
      </div>
    );
  }
}

export default ToastReactComponent;
