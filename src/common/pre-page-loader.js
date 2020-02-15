/* eslint-disable no-undef */
import './pre-page-loader.scss';
import * as constants from './constants';

$(window).load(function() {
  setTimeout(() => {
    $('.pre-page-loader').fadeOut('slow');
    $('.page-content').fadeIn('slow');
    $(window).trigger(constants.PAGE_CONTENT_READY_EVENT);
  }, 1000);
});
