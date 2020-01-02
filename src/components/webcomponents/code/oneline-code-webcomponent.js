class AppOnelineCode extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
  }

  get language () {
    return this._language;
  };

  connectedCallback () {
    this._language = this.getAttribute('language');
    this._code = this.getAttribute('code');
    this._root.innerHTML = /* html */`
      <multiline-code-webcomponent language="${this.language}">
        <pre slot="code">
          <code>
            ${this._code}
          </code>
        </pre>
      </multiline-code-webcomponent>
    `;
  }
}

window.customElements.define('oneline-code-webcomponent', AppOnelineCode);
