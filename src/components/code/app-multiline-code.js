class AppMultilineCode extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    _resetPreTagContentWithFormattedSlotContent() {
        this._slot = this._root.querySelector('slot');
        this._slotContent = this._slot.assignedNodes()[0].innerHTML;
        this._slotContent = this._slotContent.replace(/^[\s\S]*<code.*?>/, '');
        this._slotContent = this._slotContent.replace(/<\/code>[\s\S]*$/, '');
        const firstNewLineAndIndentation = this._slotContent.match(/\n\s*/);
        const firstNewLineAndIndentationRegExp = new RegExp(firstNewLineAndIndentation, 'g');
        this._slotContent = this._slotContent.replace(firstNewLineAndIndentationRegExp, '\n');
        this._slotContent = this._slotContent.replace(/^\s*\n/, '');
        this._slotContent = this._slotContent.replace(/\n\s*$/, '');
        this._slotContent = '<code>' + this._slotContent + '</code>';
        this.$pre.innerHTML = this._slotContent;
    }

    _addLineNumbersColumn() {
        if (typeof window.getComputedStyle === 'undefined') {
            return; // old browsers :(
        }
        const lineNumbersColumn = document.createElement('div');
        lineNumbersColumn.setAttribute('area-hidden', 'true');
        this._slotContent.split('\n').forEach(line => {
            lineNumbersColumn.appendChild(document.createElement('span'));
        });
        this.$pre.insertAdjacentHTML('afterbegin', lineNumbersColumn.outerHTML);
    }

    _resetCopyCodeIconTooltipDataAttribute() {
        this.$icon.setAttribute('data-tooltip', 'Copy the code to clipboard');
    }

    _addEventListenerToCopyCodeIcon() {
        this.$icon.addEventListener('click', () => {
            // code inspiration: https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
            // code inspiration: https://edupala.com/copy-div-content-clipboard/
            if (document.body.createTextRange) {
                // for Internet Explorer
                const range = document.body.createTextRange();
                range.moveToElementText(this.$pre);
                range.select().createTextRange();
                document.execCommand('Copy');
            } else if (window.getSelection) {
                // other browsers
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(this.$pre);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeRange(range);
                this.$icon.setAttribute('data-tooltip', 'Copied');
            }
        });

        this.$icon.addEventListener('mouseout', () => this._resetCopyCodeIconTooltipDataAttribute());
    }

    _init() {
        this.$pre = this._root.querySelector('pre');
        this.$icon = this._root.querySelector('.copy-code-icon');
        this._resetPreTagContentWithFormattedSlotContent();
        this._addLineNumbersColumn();
        this._resetCopyCodeIconTooltipDataAttribute();
        this._addEventListenerToCopyCodeIcon();
    }

    get language() {
        return this._language;
    }

    connectedCallback() {
        this._language = this.getAttribute('language');
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        .container {
          position: relative;
          margin-top: var(--code-top-bottom-margin, 1rem);
          margin-bottom: var(--code-top-bottom-margin, 1rem);
        }

        .container pre,
        .container pre * {
          font-family: "Anonymous Pro", monospace;
        }
        
        .container > pre {
          display: flex;
          flex-wrap: wrap;
          background-color: var(--code-background-color);
          line-height: 1.3;
          border-radius: var(--border-radius);
        }
        
        .container > pre > code {
          width: 100%;
          overflow-x: auto;
          overflow-x: overlay;
          padding: var(--code-padding);
        }

        .container > pre.line-numbers {
          position: relative;
        }

        .container > pre.line-numbers > code {
          margin-left: var(--container-prefix-width);
        }

        .container > pre div {
          display: none;
        }

        .container > pre.line-numbers > div {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          padding: var(--code-padding) 0;
          background-color: var(--code-line-numbers-background-color);
          color: var(--text-color-light);
          border-radius: var(--left-border-radius);
        }

        .container > pre.line-numbers > div > span {
          display: block;
          width: var(--container-prefix-width);
          padding: 0 1.2rem 0 0;
          text-align: right;
        }

        .container > pre.line-numbers > div {
          counter-reset: line;
        }

        .container > pre.line-numbers > div > span {
          counter-increment: line;
        }

        .container > pre.line-numbers > div > span::before {
          content: counter(line);
        }

        .container .copy-code-icon {
          position: absolute;
          top: var(--code-padding);
          right: var(--code-padding);
          color: var(--code-icon-color);
          cursor: pointer;
          font-size: 2rem;
        }

        @media screen and (max-width: 480px) {
          .container .copy-code-icon {
            display: none;
          }
        }

      </style>
      <div class="container">
        <pre class="line-numbers">
          <slot class="code" name="code"></slot>
        </pre>
        <div class="copy-code-icon tooltip-top" data-tooltip="Copy the code to clipboard">
          <ion-icon name="ios-copy"></ion-icon>
        </div>
      </div>
    `;
        setTimeout(() => this._init());
    }
}

window.customElements.define('app-multiline-code', AppMultilineCode);
