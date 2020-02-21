import ElementWebComponent from './element-webcomponent';

class ConclusionWebComponent extends ElementWebComponent {
  connectedCallback() {
    this._value = this.getAttribute('value');
    this._root.innerHTML += /* html */ `
      <style>
        h2 {
          margin: 2.5rem 0 1.6rem;
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.235;
        }
        p {
          font-size: 1.6rem;
          line-height: 1.6;
          margin-bottom: 1.6rem;
          text-align: justify;
          text-justify: inter-word;
        }
      </style>
      <h2>Conclusion</h2>
      <p>That's it for this article, I hope you enjoyed it. Thank you for reading :)</p>
    `;
  }
}

window.customElements.define('conclusion-webcomponent', ConclusionWebComponent);
