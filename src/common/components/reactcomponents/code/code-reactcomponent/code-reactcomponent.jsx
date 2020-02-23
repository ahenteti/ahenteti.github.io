import './code-reactcomponent.scss';
import * as React from 'react';
import CodeLineNumbersReactComponent from 'common/components/reactcomponents/code/code-line-numbers-reactcomponent/code-line-numbers-reactcomponent';
import * as hljs from 'common/vendor/highlight/highlight.min.js';

class CodeReactComponent extends React.Component {
  componentDidMount() {
    this.codeElement.innerHTML = this.trimmedCode;
    this.addCodeLanguage(this.codeElement);
    hljs.highlightBlock(this.codeElement);
    this.resetCopyCodeIconTooltipDataAttribute();
    this.copyCodeIcon.addEventListener('mouseout', () => this.resetCopyCodeIconTooltipDataAttribute());
  }

  render() {
    this.trimmedCode = this.trimCode(this.props.code);
    this.codeLineNumbers = this.calcCodeLineNumbers(this.trimmedCode);
    return (
      <div className='code-reactcomponent'>
        <CodeLineNumbersReactComponent lineNumbers={this.codeLineNumbers} />
        <pre>
          <code ref={el => (this.codeElement = el)}></code>
        </pre>
        <div
          ref={el => (this.copyCodeIcon = el)}
          className='copy-code-icon tooltip-left'
          onClick={() => this.handleCopyCodeIconClick()}
        >
          <ion-icon name='copy-sharp'></ion-icon>
        </div>
      </div>
    );
  }

  addCodeLanguage(codeElement) {
    if (this.props.language) {
      this.codeElement.classList.add(this.props.language);
    }
  }

  trimCode(code) {
    const indentation = code.match(/^\s*/);
    const indentationRegExp = new RegExp('\n' + indentation, 'g');
    code = code.replace(/^\s*/, '');
    code = code.replace(indentationRegExp, '\n');
    return code.replace(/\n\s*$/, '');
  }

  handleCopyCodeIconClick(event) {
    // code inspiration: https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
    // code inspiration: https://edupala.com/copy-div-content-clipboard/
    if (document.body.createTextRange) {
      // for Internet Explorer
      const range = document.body.createTextRange();
      range.moveToElementText(this.codeElement);
      range.select().createTextRange();
      document.execCommand('Copy');
    } else if (window.getSelection) {
      // other browsers
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(this.codeElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeRange(range);
    }
    this.copyCodeIcon.setAttribute('data-tooltip', 'Copied');
  }

  calcCodeLineNumbers(code) {
    const newLines = code.match(/\n/g);
    if (newLines) {
      return newLines.length + 1;
    }
    return 1;
  }

  resetCopyCodeIconTooltipDataAttribute() {
    this.copyCodeIcon.setAttribute('data-tooltip', 'Copy the code to clipboard');
  }
}

export default CodeReactComponent;
