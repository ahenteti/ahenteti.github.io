import './about.scss';

const CERTIFICATES_OF_COMPLETION = [
    'img/design-patterns-java-behavioral-certificate.jpg',
    'img/apache-web-server-install-config-certificate.jpg',
    'img/build-asynchronous-restful-services-jersey-certificate.jpg',
    'img/context-dependency-injection-1-1-certificate.jpg',
    'img/droidcon-boston-2019-session-13-certificate.jpg',
    'img/getting-started-spring-webflux-certificate.jpg',
    'img/java-api-websockets-introduction-certificate.jpg',
    'img/java-persistence-api-21-certificate.jpg',
    'img/javascript-module-fundamentals-certificate.jpg',
    'img/javaserver-faces-getting-started-java-ee-certificate.jpg',
    'img/jcache-fundamentals-certificate.jpg',
    'img/react-flux-building-applications-certificate.jpg',
    'img/structuring-javascript-certificate.jpg'
];

const certificatesOfCompletionArrowBack = document.querySelector(
    '.certificate-of-completion-image-container [name="ios-arrow-back"]'
);

const certificatesOfCompletionArrowForward = document.querySelector(
    '.certificate-of-completion-image-container [name=ios-arrow-forward]'
);
const currentDisplayedCertificate = document.querySelector('.certificate-of-completion-image-container img');
currentDisplayedCertificate.src = CERTIFICATES_OF_COMPLETION[0];
currentDisplayedCertificate.dataset.index = 0;

const currentDisplayedCertificateIndex = document.querySelector('.certificate-of-completion-image-container .index');
currentDisplayedCertificateIndex.innerHTML = `1 / ${CERTIFICATES_OF_COMPLETION.length}`;

const currentDisplayedCertificateLoader = document.querySelector('.certificate-of-completion-image-container .loader');

certificatesOfCompletionArrowBack.addEventListener('click', () => {
    currentDisplayedCertificate.classList.add('with-loader');
    currentDisplayedCertificateLoader.style.display = 'block';
    const nextIndex = calcCertificateNextIndexOnArrowBackClick(currentDisplayedCertificate);
    const certificate = new Image();
    certificate.onload = function() {
        currentDisplayedCertificate.classList.remove('with-loader');
        currentDisplayedCertificateLoader.style.display = 'none';
        currentDisplayedCertificate.src = CERTIFICATES_OF_COMPLETION[nextIndex];
        currentDisplayedCertificate.dataset.index = nextIndex;
        currentDisplayedCertificateIndex.innerHTML = `${nextIndex + 1} / ${CERTIFICATES_OF_COMPLETION.length}`;
    };
    certificate.src = CERTIFICATES_OF_COMPLETION[nextIndex];
});

certificatesOfCompletionArrowForward.addEventListener('click', () => {
    currentDisplayedCertificate.classList.add('with-loader');
    currentDisplayedCertificateLoader.style.display = 'block';
    const nextIndex = calcCertificateNextIndexOnArrowForwardClick(currentDisplayedCertificate);
    const certificate = new Image();
    certificate.onload = function() {
        currentDisplayedCertificate.classList.remove('with-loader');
        currentDisplayedCertificateLoader.style.display = 'none';
        currentDisplayedCertificate.src = CERTIFICATES_OF_COMPLETION[nextIndex];
        currentDisplayedCertificate.dataset.index = nextIndex;
        currentDisplayedCertificateIndex.innerHTML = `${nextIndex + 1} / ${CERTIFICATES_OF_COMPLETION.length}`;
    };
    certificate.src = CERTIFICATES_OF_COMPLETION[nextIndex];
});
function calcCertificateNextIndexOnArrowBackClick(currentDisplayedCertificate) {
    const currentDisplayedCertificateIndex = window.parseInt(currentDisplayedCertificate.dataset.index);
    let nextIndex = currentDisplayedCertificateIndex - 1;
    if (currentDisplayedCertificateIndex === 0) {
        nextIndex = CERTIFICATES_OF_COMPLETION.length - 1;
    }
    return nextIndex;
}

function calcCertificateNextIndexOnArrowForwardClick(currentDisplayedCertificate) {
    const currentDisplayedCertificateIndex = window.parseInt(currentDisplayedCertificate.dataset.index);
    let nextIndex = currentDisplayedCertificateIndex + 1;
    if (currentDisplayedCertificateIndex === CERTIFICATES_OF_COMPLETION.length - 1) {
        nextIndex = 0;
    }
    return nextIndex;
}
