import * as React from 'react';

import './code-line-numbers-reactcomponent.scss';

class CodeLineNumbersReactComponent extends React.Component {
  render() {
    const lines = [];
    for (let i = 1; i <= this.props.lineNumbers; i++) {
      lines.push(<span key={i}>{i}</span>);
    }
    return <div className='code-line-numbers-reactcomponent'>{lines}</div>;
  }
}

export default CodeLineNumbersReactComponent;
