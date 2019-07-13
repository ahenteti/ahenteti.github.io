// //////////////////////////////// //
//        global variables          //
// //////////////////////////////// //
const $oneLineTexts = document.querySelectorAll('.one-line');

// //////////////////////////////// //
//          main actions            //
// //////////////////////////////// //
$oneLineTexts.forEach(resizeTextFontSize);

// //////////////////////////////// //
//         util functions           //
// //////////////////////////////// //
function resizeTextFontSize (text) {
  let fontSize = parseInt(window.getComputedStyle(text).fontSize);
  for (let i = fontSize; i >= 0; i--) {
    if (isOverflown(text)) {
      fontSize--;
      text.style.fontSize = fontSize + 'px';
    }
  }
}

function isOverflown (element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
