import * as constants from '../common/constants';

// //////////////////////////////// //
//        global variables          //
// //////////////////////////////// //
const $body = document.querySelector('body');
const $oneLineTexts = document.querySelectorAll('.one-line');

// //////////////////////////////// //
//          main actions            //
// //////////////////////////////// //
const theme = findTheme();
$body.className = theme;
localStorage.setItem(constants.LOCAL_STORAGE_THEME_KEY, theme);
$oneLineTexts.forEach(resizeTextFontSize);

// //////////////////////////////// //
//         util functions           //
// //////////////////////////////// //
function resizeTextFontSize(text) {
    let fontSize = parseInt(window.getComputedStyle(text).fontSize);
    for (let i = fontSize; i >= 0; i--) {
        if (isOverflown(text)) {
            fontSize--;
            text.style.fontSize = fontSize + 'px';
        }
    }
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function findTheme() {
    const searchParam = new URLSearchParams(window.location.search);
    const bodyClass = searchParam.get('theme');
    if (bodyClass) {
        return bodyClass;
    } else {
        return localStorage.getItem(constants.LOCAL_STORAGE_THEME_KEY);
    }
}
