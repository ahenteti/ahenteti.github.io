!function(e){function t(c){if(i[c])return i[c].exports;var n=i[c]={i:c,l:!1,exports:{}};return e[c].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,c){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:c})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([,function(e,t,i){"use strict";function c(e){var t=window.parseInt(e.dataset.index),i=t-1;return 0===t&&(i=r.length-1),i}function n(e){var t=window.parseInt(e.dataset.index),i=t+1;return t===r.length-1&&(i=0),i}Object.defineProperty(t,"__esModule",{value:!0});var o=i(2),r=(i.n(o),["img/certificate-of-completion/design-patterns-java-behavioral-certificate.jpg","img/certificate-of-completion/apache-web-server-install-config-certificate.jpg","img/certificate-of-completion/build-asynchronous-restful-services-jersey-certificate.jpg","img/certificate-of-completion/context-dependency-injection-1-1-certificate.jpg","img/certificate-of-completion/droidcon-boston-2019-session-13-certificate.jpg","img/certificate-of-completion/getting-started-spring-webflux-certificate.jpg","img/certificate-of-completion/java-api-websockets-introduction-certificate.jpg","img/certificate-of-completion/java-persistence-api-21-certificate.jpg","img/certificate-of-completion/javascript-module-fundamentals-certificate.jpg","img/certificate-of-completion/javaserver-faces-getting-started-java-ee-certificate.jpg","img/certificate-of-completion/jcache-fundamentals-certificate.jpg","img/certificate-of-completion/react-flux-building-applications-certificate.jpg","img/certificate-of-completion/structuring-javascript-certificate.jpg"]),a=document.querySelector('.certificate-of-completion-image-container [name="ios-arrow-back"]'),f=document.querySelector(".certificate-of-completion-image-container [name=ios-arrow-forward]"),p=document.querySelector(".certificate-of-completion-image-container img");p.src=r[0],p.dataset.index=0;var s=document.querySelector(".certificate-of-completion-image-container .index");s.innerHTML="1 / ".concat(r.length),a.addEventListener("click",function(){var e=c(p);p.src=r[e],p.dataset.index=e,s.innerHTML="".concat(e+1," / ").concat(r.length)}),f.addEventListener("click",function(){var e=n(p);p.src=r[e],p.dataset.index=e,s.innerHTML="".concat(e+1," / ").concat(r.length)})},function(e,t){}]);