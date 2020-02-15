import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import * as constants from 'common/constants.js';

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  const $overflowMultiLineTexts = document.querySelectorAll('.overflow-multi-line');
  setTimeout(() => $overflowMultiLineTexts.forEach(ellipsizeTextBox), 0);
});

function ellipsizeTextBox(element) {
  const maxLines = parseInt(element.dataset.maxLines) || 3;
  const elementLineHeight = calcElementLineHeight(element);
  let currentElementLines = calcCurrentElementLines(element, elementLineHeight);
  const wordArray = element.innerHTML.split(' ');
  element.style.textAlign = 'justify';
  while (currentElementLines > maxLines) {
    wordArray.pop();
    element.innerHTML = wordArray.join(' ') + ' ...';
    currentElementLines = calcCurrentElementLines(element, elementLineHeight);
  }
}

function calcCurrentElementLines(element, elementLineHeight) {
  return Math.floor(element.offsetHeight / elementLineHeight);
}

function calcElementLineHeight(element) {
  let res = element.style.lineHeight;
  if (isNaN(parseInt(res))) {
    res = document.defaultView.getComputedStyle(element).getPropertyValue('line-height');
  }
  if (isNaN(parseInt(res))) {
    res = 20;
  }
  return parseInt(res);
}
