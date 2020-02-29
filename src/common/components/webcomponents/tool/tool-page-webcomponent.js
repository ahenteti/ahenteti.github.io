/* eslint-disable no-undef */
import ElementWebComponent from '../element-webcomponent';

class ToolPageWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          position: relative;
          background: var(--article-background-color);
          color: var(--text-color);
          max-width: var(--max-width);
          width: 70%;
          padding: 8rem;
          border-radius: .4rem;
          margin: calc(var(--header-height) + 4rem) auto;
          box-shadow: var(--box-shadow);
          transition: var(--transition);
          transition-property: color, background-color;
        }
        @media screen and (min-width: 720px) and (max-width: 1200px) {
          .container {
            width: 80%;
            padding: 6rem;
            margin: calc(var(--header-height) + 3rem) auto;
          }
        }

        @media screen and (max-width: 720px) {
          .container {
            width: 100%;
            padding: 4rem;
            border-radius: 0;
            margin: var(--header-height) auto;
          }
        }

        ::slotted(*) {
          color: var(--text-color);
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
    this._container = this._root.querySelector('.container');
    renderToolMetadata(this._container);

    function renderToolMetadata(toolContainer) {
      const tool = findToolMetadata();
      toolContainer.insertAdjacentHTML(
        'afterbegin',
        `<tool-title-webcomponent tool-title="${tool.name}" tool-description="${tool.description}"></tool-title-webcomponent>`
      );
    }

    function findToolMetadata() {
      for (const tool of ALL_TOOLS) {
        if (window.location.pathname.includes(tool.slug)) {
          return tool;
        }
      }
      throw new Error('the current tool is not defined in the ALL_TOOLS variable!');
    }
  }
}

window.customElements.define('tool-page-webcomponent', ToolPageWebComponent);
