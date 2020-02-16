import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './convert-pdf-to-png-using-mozilla-pdfjs-library.scss';
import * as constants from 'common/constants.js';

let pdfDocument;
let pdfFileName;
let currentPage;
let totalPages;
let uploadButtonDOMElement;
let uploadInputDOMElement;
let loaderDOMElement;
let pdfMetadataDOMElement;
let totalPagesDOMElement;
let currentPageDOMElement;
let canvasDOMElement;
let downloadLinkDOMElement;
let previousPageDOMElement;
let nextPageDOMElement;

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  uploadButtonDOMElement = document.querySelector('.upload-button');
  uploadInputDOMElement = document.querySelector('.upload-input');
  loaderDOMElement = document.querySelector('.loader-demo');
  pdfMetadataDOMElement = document.querySelector('.pdf-metadata');
  totalPagesDOMElement = document.querySelector('.pdf-total-pages');
  currentPageDOMElement = document.querySelector('.pdf-current-page');
  canvasDOMElement = document.querySelector('.pdf-canvas');
  downloadLinkDOMElement = document.querySelector('.download-link');
  previousPageDOMElement = document.querySelector('.pdf-prev');
  nextPageDOMElement = document.querySelector('.pdf-next');

  canvasDOMElement.width = Math.floor(window.parseInt(window.getComputedStyle(canvasDOMElement.parentElement).width));
  uploadButtonDOMElement.addEventListener('click', () => {
    uploadInputDOMElement.click();
  });

  uploadInputDOMElement.addEventListener('change', function() {
    const uploadedFile = this.files[0];
    if ('application/pdf' !== uploadedFile.type) {
      alert('Error : Only PDF files are accepted');
      return;
    }
    pdfFileName = calcPdfFileName(uploadedFile);
    hide(uploadButtonDOMElement);
    show(loaderDOMElement);
    showPdf(URL.createObjectURL(uploadedFile));
  });

  downloadLinkDOMElement.addEventListener('click', function() {
    this.setAttribute('href', canvasDOMElement.toDataURL());
    this.setAttribute('download', pdfFileName + '-' + currentPage + '.png');
  });

  previousPageDOMElement.addEventListener('click', function() {
    if (currentPage !== 1) {
      showPage(--currentPage);
    }
  });

  nextPageDOMElement.addEventListener('click', function() {
    if (currentPage !== totalPages) {
      showPage(++currentPage);
    }
  });
});

function calcPdfFileName(uploadedFile) {
  return uploadedFile.name
    .split('.')
    .slice(0, -1)
    .join('.');
}

function showPdf(url) {
  pdfjsLib.getDocument(url).promise.then(doc => {
    pdfDocument = doc;
    hide(loaderDOMElement);
    show(pdfMetadataDOMElement);
    totalPages = pdfDocument.numPages;
    totalPagesDOMElement.innerHTML = totalPages;
    showPage(1);
  });
}

function showPage(pageNumber) {
  currentPage = pageNumber;
  currentPageDOMElement.innerHTML = pageNumber;
  pdfDocument.getPage(pageNumber).then(page => {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    const requiredScale = canvasDOMElement.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    const viewport = page.getViewport({ scale: requiredScale });

    // Set canvas height
    canvasDOMElement.height = viewport.height;
    show(canvasDOMElement);

    var renderContext = {
      canvasContext: canvasDOMElement.getContext('2d'),
      viewport: viewport
    };
    page.render(renderContext);
  });
}

function hide(element) {
  element.style.display = 'none';
}

function show(element) {
  element.classList.add('display');
}
