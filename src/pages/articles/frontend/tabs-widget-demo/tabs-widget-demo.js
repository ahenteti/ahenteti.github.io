import 'common/components/webcomponents/webcomponents.js';
import 'common/common.js';
import * as constants from 'common/constants.js';
import './tabs-widget-demo.scss';

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  const tabs = Array.from(document.querySelectorAll('.demo [role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.demo [role="tabpanel"]'));
  console.log(tabs);
  console.log(panels);

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', event => activateTab(event));
  }

  function activateTab(event) {
    event.stopPropagation();
    var tab = event.target;
    deactivateTabs();
    tab.setAttribute('aria-selected', 'true');
    var controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).removeAttribute('hidden');
  }

  function deactivateTabs() {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].setAttribute('aria-selected', 'false');
      panels[i].setAttribute('hidden', 'true');
    }
  }
});
