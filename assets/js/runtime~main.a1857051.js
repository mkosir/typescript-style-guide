(()=>{"use strict";var e,t,r,o,n,i={},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={id:e,loaded:!1,exports:{}};return i[e].call(r.exports,r,r.exports,c),r.loaded=!0,r.exports}c.m=i,c.c=a,e=[],c.O=(t,r,o,n)=>{if(!r){var i=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],n=e[f][2];for(var a=!0,u=0;u<r.length;u++)(!1&n||i>=n)&&Object.keys(c.O).every((e=>c.O[e](r[u])))?r.splice(u--,1):(a=!1,n<i&&(i=n));if(a){e.splice(f--,1);var l=o();void 0!==l&&(t=l)}}return t}n=n||0;for(var f=e.length;f>0&&e[f-1][2]>n;f--)e[f]=e[f-1];e[f]=[r,o,n]},c.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return c.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,c.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);c.r(n);var i={};t=t||[null,r({}),r([]),r(r)];for(var a=2&o&&e;"object"==typeof a&&!~t.indexOf(a);a=r(a))Object.getOwnPropertyNames(a).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,c.d(n,i),n},c.d=(e,t)=>{for(var r in t)c.o(t,r)&&!c.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((t,r)=>(c.f[r](e,t),t)),[])),c.u=e=>"assets/js/"+({61:"1f391b9e",138:"1a4e3797",235:"a7456010",490:"e7ce6630",957:"c141421f"}[e]||e)+"."+{61:"62d565d6",138:"30a061f5",235:"1099a491",312:"2f9002f8",490:"8bf850a0",511:"2118d91b",809:"c8e2ba65",944:"3e7921a6",957:"c506da23"}[e]+".js",c.miniCssF=e=>{},c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o={},n="typescript-style-guide-website:",c.l=(e,t,r,i)=>{if(o[e])o[e].push(t);else{var a,u;if(void 0!==r)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==n+r){a=s;break}}a||(u=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,c.nc&&a.setAttribute("nonce",c.nc),a.setAttribute("data-webpack",n+r),a.src=e),o[e]=[t];var d=(t,r)=>{a.onerror=a.onload=null,clearTimeout(p);var n=o[e];if(delete o[e],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(r))),t)return t(r)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),u&&document.head.appendChild(a)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.p="/typescript-style-guide/",c.gca=function(e){return e={"1f391b9e":"61","1a4e3797":"138",a7456010:"235",e7ce6630:"490",c141421f:"957"}[e]||e,c.p+c.u(e)},(()=>{var e={354:0,869:0};c.f.j=(t,r)=>{var o=c.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(/^(354|869)$/.test(t))e[t]=0;else{var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var i=c.p+c.u(t),a=new Error;c.l(i,(r=>{if(c.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+n+": "+i+")",a.name="ChunkLoadError",a.type=n,a.request=i,o[1](a)}}),"chunk-"+t,t)}},c.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,i=r[0],a=r[1],u=r[2],l=0;if(i.some((t=>0!==e[t]))){for(o in a)c.o(a,o)&&(c.m[o]=a[o]);if(u)var f=u(c)}for(t&&t(r);l<i.length;l++)n=i[l],c.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return c.O(f)},r=self.webpackChunktypescript_style_guide_website=self.webpackChunktypescript_style_guide_website||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})()})();