!function(e){function t(n){if(i[n])return i[n].exports;var c=i[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([,function(e,t,i){"use strict";function n(e){var t=window.parseInt(e.dataset.index),i=t-1;return 0===t&&(i=a.length-1),i}function c(e){var t=window.parseInt(e.dataset.index),i=t+1;return t===a.length-1&&(i=0),i}Object.defineProperty(t,"__esModule",{value:!0});var r=i(2),a=(i.n(r),["img/design-patterns-java-behavioral-certificate.jpg","img/apache-web-server-install-config-certificate.jpg","img/build-asynchronous-restful-services-jersey-certificate.jpg","img/context-dependency-injection-1-1-certificate.jpg","img/droidcon-boston-2019-session-13-certificate.jpg","img/getting-started-spring-webflux-certificate.jpg","img/java-api-websockets-introduction-certificate.jpg","img/java-persistence-api-21-certificate.jpg","img/javascript-module-fundamentals-certificate.jpg","img/javaserver-faces-getting-started-java-ee-certificate.jpg","img/jcache-fundamentals-certificate.jpg","img/react-flux-building-applications-certificate.jpg","img/structuring-javascript-certificate.jpg"]),o=document.querySelector('.certificate-of-completion-image-container [name="ios-arrow-back"]'),s=document.querySelector(".certificate-of-completion-image-container [name=ios-arrow-forward]"),u=document.querySelector(".certificate-of-completion-image-container img");u.src=a[0],u.dataset.index=0;var f=document.querySelector(".certificate-of-completion-image-container .index");f.innerHTML="1 / ".concat(a.length),o.addEventListener("click",function(){var e=n(u);u.src=a[e],u.dataset.index=e,f.innerHTML="".concat(e+1," / ").concat(a.length)}),s.addEventListener("click",function(){var e=c(u);u.src=a[e],u.dataset.index=e,f.innerHTML="".concat(e+1," / ").concat(a.length)})},function(e,t){}]);