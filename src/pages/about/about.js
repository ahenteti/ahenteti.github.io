/* eslint-disable no-undef */
import * as constants from 'common/constants.js';
import 'common/components/webcomponents/webcomponents.js';
import 'common/common.js';
import './about.scss';

const BACK_ARROW = 'back';
const FORWARD_ARROW = 'forward';
const CERTIFICATES_OF_COMPLETION = [
  'assets/img/certificate-csharp-clean-coding-principles.png',
  'assets/img/certificate-design-patterns-java-creational.png',
  'assets/img/certificate-design-patterns-java-behavioral.jpg',
  'assets/img/certificate-apache-web-server-install-config.jpg',
  'assets/img/certificate-build-asynchronous-restful-services-jersey.jpg',
  'assets/img/certificate-context-dependency-injection-1-1.jpg',
  'assets/img/certificate-droidcon-boston-2019-session-13.jpg',
  'assets/img/certificate-getting-started-spring-webflux.jpg',
  'assets/img/certificate-java-api-websockets-introduction.jpg',
  'assets/img/certificate-java-persistence-api-21.jpg',
  'assets/img/certificate-javascript-module-fundamentals.jpg',
  'assets/img/certificate-javaserver-faces-getting-started-java-ee.jpg',
  'assets/img/certificate-jcache-fundamentals.jpg',
  'assets/img/certificate-react-flux-building-applications.jpg',
  'assets/img/certificate-structuring-javascript.jpg'
];

let loader;
let displayedCertificateIndex;

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  const certificatesOfCompletionArrowBack = document.querySelector(
    '.certificate-of-completion-image-container [name="caret-back"]'
  );

  const certificatesOfCompletionArrowForward = document.querySelector(
    '.certificate-of-completion-image-container [name=caret-forward]'
  );

  const certificateContainer = document.querySelector('.certificate-container');

  const displayedCertificate = document.querySelector('.displayed-certificate');
  displayedCertificate.onload = () => {
    certificateContainer.style.height = window.getComputedStyle(displayedCertificate).height;
  };
  displayedCertificate.src = CERTIFICATES_OF_COMPLETION[0];
  displayedCertificate.dataset.index = 0;

  displayedCertificateIndex = document.querySelector('.certificate-of-completion-image-container .index');
  displayedCertificateIndex.innerHTML = `1 / ${CERTIFICATES_OF_COMPLETION.length}`;

  loader = document.querySelector('.certificate-of-completion-image-container loader-webcomponent');

  certificatesOfCompletionArrowBack.addEventListener('click', () =>
    handleCertificatesOfCompletionNavigation(BACK_ARROW)
  );

  certificatesOfCompletionArrowForward.addEventListener('click', () =>
    handleCertificatesOfCompletionNavigation(FORWARD_ARROW)
  );
});

function handleCertificatesOfCompletionNavigation(arrow) {
  const currentDisplayedCertificate = document.querySelector('.displayed-certificate');
  const currentHiddenCertificate = document.querySelector('.hidden-certificate');

  loader.show();
  const nextIndex = calcCertificateNextIndex(arrow, currentDisplayedCertificate);
  const certificateToDisplay = CERTIFICATES_OF_COMPLETION[nextIndex];
  const certificate = new Image();
  certificate.onload = function() {
    setTimeout(() => {
      displayedCertificateIndex.innerHTML = `${nextIndex + 1} / ${CERTIFICATES_OF_COMPLETION.length}`;
      currentHiddenCertificate.src = certificateToDisplay;
      currentHiddenCertificate.dataset.index = nextIndex;

      currentHiddenCertificate.classList.remove('displayed-certificate', 'hidden-certificate');
      currentDisplayedCertificate.classList.remove('displayed-certificate', 'hidden-certificate');

      currentDisplayedCertificate.classList.add('hidden-certificate');
      currentHiddenCertificate.classList.add('displayed-certificate');

      currentDisplayedCertificate.classList.add('transparent');
      currentHiddenCertificate.classList.remove('transparent');
      loader.hide();
    }, 1000);
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
