import AppElement from './element-webcomponent';

class AppHighlightFeature extends AppElement {
  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value');
    this._width = this.getAttribute('width') || '40rem';
    this._height = this.getAttribute('height') || '10rem';
    this._trianglePosition = this.getAttribute('triangle-position') || '30rem';
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          position: relative;
          background: var(--primary-color);
          padding: 2rem;
          color: white;
          border-radius: .3rem;
          box-shadow: var(--box-shadow);
          width: ${this._width};
          height: ${this._height};
          animation: bounce .8s infinite alternate;
        }

        .container::after {
          content: '';
          position: absolute;
          top: -1rem;
          left: ${this._trianglePosition};
          border-top: none;
          border-right: 2rem solid transparent;
          border-bottom: 2rem solid var(--primary-color);
          border-left: 2rem solid transparent;
        }
        h2 {
          margin-bottom: 1rem;
          font-size: 2.5rem;
        }

        p {
          font-size: 1.5rem;
        }

        @keyframes bounce {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(15px);
          }
        }
      </style>
      <div class="container">
        <h2>See what's new</h2>
        <p>Click to explore the newest feature we've added</p>
      </div>
  `;
  }
}

window.customElements.define('highlight-feature-webcomponent', AppHighlightFeature);
