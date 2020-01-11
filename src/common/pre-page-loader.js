/* eslint-disable no-undef */
import './pre-page-loader.scss';

$(window).load(function() {
  $('.pre-page-loader').fadeOut('slow');
  $('.page-content').fadeIn('slow');
});
