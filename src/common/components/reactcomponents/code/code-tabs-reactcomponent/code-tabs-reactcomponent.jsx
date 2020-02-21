import * as React from 'react';
import './code-tabs-reactcomponent.scss';
import CodeReactComponent from 'common/components/reactcomponents/code/code-reactcomponent/code-reactcomponent';

const RESULT_TAB_NAME = 'Result';

class CodeTabsReactComponent extends React.Component {
  componentDidMount() {
    this.selectTab(this.toDefaultTab(this.props.resultTab, this.props.codeTabs));
    this.printResultTab();
  }

  render() {
    this.tabsNames = this.toTabsNames(this.props.resultTab, this.props.codeTabs);
    this.codeTabsContents = this.toTabsContents(this.props.codeTabs);
    this.tabNameIdPrefix = this.calcTabNameIdPrefix();
    this.tabContentIdPrefix = this.calcTabContentIdPrefix();
    return (
      <div className='code-tabs-reactcomponent'>
        <div className='tabs'>
          {this.tabsNames.map(tabName => {
            return (
              <button
                id={this.toTabNameId(tabName)}
                key={tabName}
                onClick={() => this.handleTabClick(tabName)}
                className='tab'
              >
                {tabName}
              </button>
            );
          })}
        </div>
        <div id={this.tabNameToTabContentId(RESULT_TAB_NAME)} className='tabcontent result-tab'></div>
        {this.codeTabsContents.map(codeTab => {
          return (
            <div id={this.toTabContentId(codeTab)} key={this.toTabContentId(codeTab)} className='tabcontent'>
              <CodeReactComponent
                code={codeTab.innerHTML}
                language={codeTab.getAttribute('language')}
              ></CodeReactComponent>
            </div>
          );
        })}
      </div>
    );
  }

  printResultTab() {
    if (this.props.resultTab) {
      const resultTabId = this.tabNameToTabContentId(RESULT_TAB_NAME);
      const resultTab = document.getElementById(resultTabId);
      resultTab.innerHTML = this.props.resultTab.innerHTML;
    }
  }

  selectTab(tabName) {
    this.handleTabClick(tabName);
  }

  handleTabClick(tabName) {
    this.hideAllTabContents();
    this.showTabContentByName(tabName);
    this.inactivateAllTabs();
    this.activateTabByName(tabName);
  }

  hideAllTabContents() {
    document.querySelectorAll(`[id^='${this.tabContentIdPrefix}']`).forEach(tabContent => {
      tabContent.style.display = 'none';
    });
  }

  showTabContentByName(tabName) {
    const tabContentId = this.tabNameToTabContentId(tabName);
    const tabContent = document.getElementById(tabContentId);
    if (tabContent) {
      tabContent.style.display = 'block';
    }
  }

  inactivateAllTabs() {
    document.querySelectorAll(`[id^='${this.tabNameIdPrefix}']`).forEach(tab => {
      tab.classList.remove('active');
    });
  }

  activateTabByName(tabName) {
    const tabId = this.toTabNameId(tabName);
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.classList.add('active');
    }
  }

  toTabName(codeTab) {
    return codeTab.getAttribute('tab-name');
  }

  toTabContentId(codeTab) {
    return this.tabNameToTabContentId(codeTab.getAttribute('tab-name'));
  }

  toTabNameId(tabName) {
    return this.tabNameIdPrefix + tabName;
  }

  tabNameToTabContentId(tabName) {
    return this.tabContentIdPrefix + tabName;
  }

  toTabsNames(resultTab, codeTabs) {
    const res = [];
    if (resultTab) {
      res.push(RESULT_TAB_NAME);
    }
    Array.from(codeTabs).map(codeTab => {
      res.push(codeTab.getAttribute('tab-name'));
    });
    return res;
  }

  toTabsContents(codeTabs) {
    return Array.from(codeTabs);
  }

  calcTabContentIdPrefix() {
    return Math.floor(Math.random() * 10000) + 1 + '-';
  }

  calcTabNameIdPrefix() {
    return Math.floor(Math.random() * 10000) + 1 + '-';
  }

  toDefaultTab(resultTab, codeTabs) {
    if (resultTab) {
      return RESULT_TAB_NAME;
    }
    const defaultTab = Array.from(codeTabs).filter(tab => {
      return tab.getAttribute('default') !== null;
    });
    if (defaultTab.length > 0) {
      return defaultTab[0].getAttribute('tab-name');
    }
    return Array.from(codeTabs)[0].getAttribute('tab-name');
  }
}

export default CodeTabsReactComponent;
