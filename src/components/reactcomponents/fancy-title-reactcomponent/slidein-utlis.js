export function checkAndAddSlideInClass(container) {
  if (alreadyVisible(container)) {
    addSlideInClass(container);
  }
}

export function alreadyVisible(container) {
  const position = container.getBoundingClientRect();
  return position.top < 0 || (position.top < window.innerHeight && position.bottom >= 0);
}

export function addAlreadyVisibleClass(container) {
  container.classList.add('already-visible');
}

export function addNotYetVisibleClass(container) {
  container.classList.add('not-yet-visible');
}

function addSlideInClass(container) {
  container.classList.add('slide-in');
}
