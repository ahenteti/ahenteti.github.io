import './code-reactcomponent.scss';
import * as React from 'react';
import CodeLineNumbersReactComponent from 'components/reactcomponents/code-reactcomponent/code-line-numbers-reactcomponent/code-line-numbers-reactcomponent';
import * as hljs from 'common/vendor/highlight/highlight.min.js';

class CodeReactComponent extends React.Component {
  componentDidMount() {
    this.code.classList.add('javascript');
    hljs.highlightBlock(this.code);
  }

  render() {
    const codeLineNumbers = this.calcCodeLineNumbers(this.props.code);
    return (
      <div className='code-reactcomponent'>
        <CodeLineNumbersReactComponent lineNumbers={codeLineNumbers} />
        <pre>
          <code ref={el => (this.code = el)}>{this.props.code}</code>
        </pre>
        <ion-icon data-tooltip='Copy the code to clipboard' name='copy-sharp'></ion-icon>
      </div>
    );
  }

  calcCodeLineNumbers(code) {
    return code.match(/\n/g).length;
  }
}

export default CodeReactComponent;
