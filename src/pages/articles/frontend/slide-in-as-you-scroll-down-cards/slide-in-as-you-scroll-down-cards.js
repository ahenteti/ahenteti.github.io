import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './slide-in-as-you-scroll-down-cards.scss';

const demo = document.querySelector('.demo');

function alreadyVisible(div) {
  let container = demo.getBoundingClientRect();
  let card = div.getBoundingClientRect();
  return card.top < container.bottom;
}

function visible(div) {
  let container = demo.getBoundingClientRect();
  let card = div.getBoundingClientRect();
  return card.bottom > container.top && card.top < container.bottom;
}

document.querySelectorAll('.card').forEach(card => {
  if (alreadyVisible(card)) {
    card.classList.add('already-visible');
  } else {
    card.classList.add('not-yet-visible');
  }
});

demo.addEventListener('scroll', function() {
  document.querySelectorAll('.card').forEach(card => {
    if (visible(card)) {
      card.classList.add('visible-after-scroll');
    }
  });
});
