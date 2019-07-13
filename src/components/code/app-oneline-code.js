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
      <app-multiline-code language="${this.language}">
        <pre slot="code">
          <code>
            ${this._code}
          </code>
        </pre>
      </app-multiline-code>
    `;
  }
}

window.customElements.define('app-oneline-code', AppOnelineCode);
