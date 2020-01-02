/* eslint-disable no-return-assign */
class AppCodeTabs extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];

    this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');
  }

  connectedCallback() {
    this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        .tab-container {
          display: flex;
          flex-wrap: wrap;
          background: var(--code-background-color);
          border-bottom: .3rem solid var(--code-line-numbers-background-color);
          border-radius: 3px 3px 0 0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .tab-container::-webkit-scrollbar {
          display: none;
        }
      </style>
      <div class="tab-container">
        <slot name="code-tab"></slot>
      </div>
      <slot name="code-panel"></slot>
    `;
    this.addEventListener('click', this._onClick);
    this.setAttribute('role', 'tablist');
    Promise.all([
      customElements.whenDefined('code-tab-webcomponent'),
      customElements.whenDefined('code-panel-webcomponent')
    ]).then(_ => this._linkPanels());
  }

  reset() {
    const tabs = this._allTabs();
    const panels = this._allPanels();
    tabs.forEach(tab => tab.setAttribute('selected', 'false'));
    panels.forEach(panel => (panel.hidden = true));
  }

  _linkPanels() {
    const tabs = this._allTabs();
    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (!panel) {
        throw new Error(`tab #${tab.id} is not a sibling of a code-panel-webcomponent`);
      }
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });
    const selectedTab = tabs.find(tab => tab.getAttribute('selected'));
    this._selectTab(selectedTab || tabs[0]);
  }

  _allPanels() {
    return Array.from(this.querySelectorAll('code-panel-webcomponent'));
  }

  _allTabs() {
    return Array.from(this.querySelectorAll('code-tab-webcomponent'));
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return this.querySelector(`#${panelId}`);
  }

  _selectTab(newTab) {
    this.reset();
    const newPanel = this._panelForTab(newTab);
    if (!newPanel) {
      throw new Error(`No panel for the tab: ${newTab.id}`);
    }
    newTab.setAttribute('selected', 'true');
    newPanel.hidden = false;
    newTab.focus();
  }

  _onClick(event) {
    if (event.target.getAttribute('role') !== 'tab') {
      return;
    }
    this._selectTab(event.target);
  }
}

window.customElements.define('code-tabs-webcomponent', AppCodeTabs);

class AppCodeTab extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  static get observedAttributes() {
    return ['selected'];
  }

  connectedCallback() {
    this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        :host {
          transition: all .2s;
          flex-shrink: 0;
        }
        :host([selected=true]), :host(:hover) {
          background: var(--code-line-numbers-background-color);
        }
        :host(:first-child) {
          border-radius: 3px 0 0 0; 
        }
        .container {
          padding: 1.5rem;
          font-size: 1.5rem;
          cursor: default;
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
    this.id = `code-tab-generated-id-${Math.floor(Math.random() * 1001)}`;
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
  }

  attributeChangedCallback() {
    const value = this.hasAttribute('selected');
    this.setAttribute('area-selected', value);
  }
}

window.customElements.define('code-tab-webcomponent', AppCodeTab);

class AppCodePanel extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback() {
    this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        :host(.result) .container {
          border: .3rem solid var(--code-line-numbers-background-color);
          border-top: none;
        }
        .container {
          --code-top-bottom-margin: 0;
          --left-border-radius: 0 0 0 3px;
          --border-radius: 0 0 3px 3px;
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
    this.setAttribute('role', 'tabpanel');
    this.id = `code-panel-generated-id-${Math.floor(Math.random() * 1001)}`;
  }
}

window.customElements.define('code-panel-webcomponent', AppCodePanel);
