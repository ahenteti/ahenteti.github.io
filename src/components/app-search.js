class AppSearch extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        .container {
          display: flex;
          align-items: stretch;
        }

        app-search-input {
          width: 100%;
        }

      </style>
      <div class="container">
        <app-search-select></app-search-select>
        <app-search-input></app-search-input>
      </div>
    `;
    }
}

window.customElements.define('app-search', AppSearch);

class AppSearchInput extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        
        .container {
          font-smoothing: antialiased;
          display: flex;
          align-items: center;
          padding: 1.2rem;
          transition: all .2s;
          background: var(--search-background-color);
          border: 1px solid var(--border-color);
          border-top-right-radius: 100rem;
          border-bottom-right-radius: 100rem;
          height: calc(1.2rem * 2 + 1.6rem);
        }

        .container.focus, .container:hover {
          border: 1px solid var(--primary-color-light);
        }

        ion-icon {
          font-size: 2.5rem;
        }
        ion-icon, ::placeholder {
          color: var(--input-placeholder-color);
          opacity: 1; /* Firefox */
        }
        input {
          width: 100%;
          color: var(--text-color);
          border: none;
          outline: none;
          font-size: 1.6rem;
        } 

        ion-icon[name="close"] {
          font-size: 2.9rem;
          transition: all .2s ease-in;
        }

        ion-icon[name="close"].hidden {
          opacity: 0;
        }

        ion-icon[name="close"]:hover {
          color: var(--primary-color);
        }
      </style>
      <div class="container">
        <input type="text" placeholder="Search articles...">
        <ion-icon name="search"></ion-icon>
      </div>
    `;
    }
}

window.customElements.define('app-search-input', AppSearchInput);

class AppSearchSelect extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
        this._fontSize = '1.3rem';
    }

    _calcTagWidth(tag) {
        let text = document.createElement('span');
        text.style.fontSize = this._fontSize;
        document.body.appendChild(text);
        text.style.position = 'absolute';
        text.innerHTML = tag;
        const width = Math.ceil(text.clientWidth);
        document.body.removeChild(text);
        return width;
    }

    _buildSelectedOptionDiv() {
        let span = document.createElement('span');
        span.innerHTML = 'all';
        let dropdownArrowIcon = document.createElement('ion-icon');
        dropdownArrowIcon.setAttribute('name', 'arrow-dropdown');
        dropdownArrowIcon.style.fontSize = '2rem';
        dropdownArrowIcon.style.marginLeft = '10px';

        let dropupArrowIcon = document.createElement('ion-icon');
        dropupArrowIcon.setAttribute('class', 'hidden');
        dropupArrowIcon.setAttribute('name', 'arrow-dropup');
        dropupArrowIcon.style.fontSize = '2rem';
        dropupArrowIcon.style.marginLeft = '10px';

        let option = document.createElement('div');
        option.appendChild(span);
        option.appendChild(dropdownArrowIcon);
        option.appendChild(dropupArrowIcon);
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.style.justifyContent = 'space-between';
        option.setAttribute('class', 'select-selected select-option');

        span.addEventListener('change', function() {
            if (span.innerHTML == 'all') {
                option.setAttribute('class', 'select-selected select-option');
            } else {
                option.setAttribute('class', 'select-selected select-option primary-color');
            }
        });
        return option;
    }

    _fillSelectOptions() {
        const selectedOption = this._buildSelectedOptionDiv();
        const dropdownArrowIcon = selectedOption.querySelector('[name=arrow-dropdown]');
        const dropupArrowIcon = selectedOption.querySelector('[name=arrow-dropup]');

        let maxTagWidth = 0;
        let selectOptions = document.createElement('div');
        selectOptions.setAttribute('class', 'select-items hidden');
        ALL_TAGS.forEach(tag => {
            let option = document.createElement('div');
            option.innerHTML = tag;
            maxTagWidth = Math.max(maxTagWidth, this._calcTagWidth(tag));
            option.setAttribute('class', 'select-option tag');
            selectOptions.appendChild(option);
        });

        selectedOption.addEventListener('click', function(e) {
            e.stopPropagation();
            selectOptions.classList.toggle('hidden');
            dropdownArrowIcon.classList.toggle('hidden');
            dropupArrowIcon.classList.toggle('hidden');
        });

        selectOptions.addEventListener('click', function(e) {
            let span = selectedOption.querySelector('span');
            span.innerHTML = e.target.innerHTML;
        });

        document.addEventListener('click', function() {
            selectOptions.classList.add('hidden');
            dropdownArrowIcon.classList.remove('hidden');
            dropupArrowIcon.classList.add('hidden');
        });

        this._container = this._root.querySelector('.container');
        this._container.appendChild(selectedOption);
        this._container.appendChild(selectOptions);
        this._selectItems = this._root.querySelector('.container .select-items');
        this._selectItems.style.width = maxTagWidth + 45 + 'px';
    }

    connectedCallback() {
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        .container {
          position: relative;
          color: var(--text-color-light);
        }

        .select-option, .select-option span { 
          font-size: ${this._fontSize};
        }

        .select-option {
          padding: 10px;
          padding-left: 2rem;
          padding-right: 5px;
        }

        .select-selected {
          background-color: var(--tag-background-color);
          border-top-left-radius: 100rem;
          border-bottom-left-radius: 100rem;
          height: calc(1.2rem * 2 + 1.6rem);
          border: 1px solid var(--tag-background-color);
          white-space: nowrap;
        }

        .select-selected.primary-color {
          background-color: var(--primary-color);
          color: var(--selected-option-color);
          border: 1px solid var(--primary-color);
        }

        .select-items {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 99;
          box-shadow: var(--box-shadow);
        }

        .select-items {
          max-height: 200px;
          overflow: auto;
        }

        .select-items .select-option {
          background-color: var(--select-background-color);
        }
        
        .select-items .select-option:hover {
          background-color: var(--background-select-option-on-hover-state-color);
        }

        .hidden {
          display: none;
        }
        
      </style>
      <div class="container">
      </div>
      
    `;
        this._fillSelectOptions();
    }
}

window.customElements.define('app-search-select', AppSearchSelect);
