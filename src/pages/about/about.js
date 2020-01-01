import './about.scss';

const CERTIFICATES_OF_COMPLETION = [
  'img/certificate-design-patterns-java-behavioral.jpg',
  'img/certificate-apache-web-server-install-config.jpg',
  'img/certificate-build-asynchronous-restful-services-jersey.jpg',
  'img/certificate-context-dependency-injection-1-1.jpg',
  'img/certificate-droidcon-boston-2019-session-13.jpg',
  'img/certificate-getting-started-spring-webflux.jpg',
  'img/certificate-java-api-websockets-introduction.jpg',
  'img/certificate-java-persistence-api-21.jpg',
  'img/certificate-javascript-module-fundamentals.jpg',
  'img/certificate-javaserver-faces-getting-started-java-ee.jpg',
  'img/certificate-jcache-fundamentals.jpg',
  'img/certificate-react-flux-building-applications.jpg',
  'img/certificate-structuring-javascript.jpg'
];

const BACK_ARROW = 'back';
const FORWARD_ARROW = 'forward';

const certificatesOfCompletionArrowBack = document.querySelector(
  '.certificate-of-completion-image-container [name="ios-arrow-back"]'
);

const certificatesOfCompletionArrowForward = document.querySelector(
  '.certificate-of-completion-image-container [name=ios-arrow-forward]'
);

const certificateContainer = document.querySelector('.certificate-container');

const displayedCertificate = document.querySelector('.displayed-certificate');
displayedCertificate.onload = () => {
  certificateContainer.style.height = window.getComputedStyle(displayedCertificate).height;
};
displayedCertificate.src = CERTIFICATES_OF_COMPLETION[0];
displayedCertificate.dataset.index = 0;

const displayedCertificateIndex = document.querySelector('.certificate-of-completion-image-container .index');
displayedCertificateIndex.innerHTML = `1 / ${CERTIFICATES_OF_COMPLETION.length}`;

const loader = document.querySelector('.certificate-of-completion-image-container app-loader');

certificatesOfCompletionArrowBack.addEventListener('click', () => handleCertificatesOfCompletionNavigation(BACK_ARROW));

certificatesOfCompletionArrowForward.addEventListener('click', () =>
  handleCertificatesOfCompletionNavigation(FORWARD_ARROW)
);

function handleCertificatesOfCompletionNavigation(arrow) {
  const currentDisplayedCertificate = document.querySelector('.displayed-certificate');
  const currentHiddenCertificate = document.querySelector('.hidden-certificate');
  currentDisplayedCertificate.classList.add('lightweight-transparent');

  loader.show();
  const nextIndex = calcCertificateNextIndex(arrow, currentDisplayedCertificate);
  const certificateToDisplay = CERTIFICATES_OF_COMPLETION[nextIndex];
  const certificate = new Image();
  certificate.onload = function() {
    loader.hide();
    displayedCertificateIndex.innerHTML = `${nextIndex + 1} / ${CERTIFICATES_OF_COMPLETION.length}`;
    currentHiddenCertificate.src = certificateToDisplay;
    currentHiddenCertificate.dataset.index = nextIndex;

    currentHiddenCertificate.classList.remove('displayed-certificate', 'hidden-certificate');
    currentDisplayedCertificate.classList.remove('displayed-certificate', 'hidden-certificate');

    currentHiddenCertificate.classList.add('displayed-certificate');
    currentDisplayedCertificate.classList.add('hidden-certificate');

    currentHiddenCertificate.classList.remove('transparent');
    currentDisplayedCertificate.classList.add('transparent');
    currentDisplayedCertificate.classList.remove('lightweight-transparent');
  };
  certificate.src = certificateToDisplay;
}

function calcCertificateNextIndex(arrow, currentDisplayedCertificate) {
  if (arrow === BACK_ARROW) {
    return calcCertificateNextIndexOnArrowBackClick(currentDisplayedCertificate);
  } else {
    return calcCertificateNextIndexOnArrowForwardClick(currentDisplayedCertificate);
  }
}

function calcCertificateNextIndexOnArrowBackClick(currentDisplayedCertificate) {
  const currentDisplayedCertificateIndex = window.parseInt(currentDisplayedCertificate.dataset.index);
  return (currentDisplayedCertificateIndex - 1 + CERTIFICATES_OF_COMPLETION.length) % CERTIFICATES_OF_COMPLETION.length;
}

function calcCertificateNextIndexOnArrowForwardClick(currentDisplayedCertificate) {
  const currentDisplayedCertificateIndex = window.parseInt(currentDisplayedCertificate.dataset.index);
  return (currentDisplayedCertificateIndex + 1) % CERTIFICATES_OF_COMPLETION.length;
}
