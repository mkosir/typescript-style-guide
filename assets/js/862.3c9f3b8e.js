"use strict";(self.webpackChunktypescript_style_guide_website=self.webpackChunktypescript_style_guide_website||[]).push([[862],{3901:(e,t,i)=>{i.d(t,{Z:()=>a});i(7294);var n=i(3743);const s={tableOfContentsInline:"tableOfContentsInline_prmo"};var r=i(5893);function a(e){let{toc:t,minHeadingLevel:i,maxHeadingLevel:a}=e;return(0,r.jsx)("div",{className:s.tableOfContentsInline,children:(0,r.jsx)(n.Z,{toc:t,minHeadingLevel:i,maxHeadingLevel:a,className:"table-of-contents",linkClassName:null})})}},3743:(e,t,i)=>{i.d(t,{Z:()=>m});var n=i(7294),s=i(6668);function r(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),i=Array(7).fill(-1);t.forEach(((e,t)=>{const n=i.slice(2,e.level);e.parentIndex=Math.max(...n),i[e.level]=t}));const n=[];return t.forEach((e=>{const{parentIndex:i,...s}=e;i>=0?t[i].children.push(s):n.push(s)})),n}function a(e){let{toc:t,minHeadingLevel:i,maxHeadingLevel:n}=e;return t.flatMap((e=>{const t=a({toc:e.children,minHeadingLevel:i,maxHeadingLevel:n});return function(e){return e.level>=i&&e.level<=n}(e)?[{...e,children:t}]:t}))}function l(e){const t=e.getBoundingClientRect();return t.top===t.bottom?l(e.parentNode):t}function o(e,t){let{anchorTopOffset:i}=t;const n=e.find((e=>l(e).top>=i));if(n){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(n))?n:e[e.indexOf(n)-1]??null}return e[e.length-1]??null}function c(){const e=(0,n.useRef)(0),{navbar:{hideOnScroll:t}}=(0,s.L)();return(0,n.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function h(e){const t=(0,n.useRef)(void 0),i=c();(0,n.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:n,linkActiveClassName:s,minHeadingLevel:r,maxHeadingLevel:a}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(n),l=function(e){let{minHeadingLevel:t,maxHeadingLevel:i}=e;const n=[];for(let s=t;s<=i;s+=1)n.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(n.join()))}({minHeadingLevel:r,maxHeadingLevel:a}),c=o(l,{anchorTopOffset:i.current}),h=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,i){i?(t.current&&t.current!==e&&t.current.classList.remove(s),e.classList.add(s),t.current=e):e.classList.remove(s)}(e,e===h)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,i])}var p=i(9960),u=i(5893);function d(e){let{toc:t,className:i,linkClassName:n,isChild:s}=e;return t.length?(0,u.jsx)("ul",{className:s?void 0:i,children:t.map((e=>(0,u.jsxs)("li",{children:[(0,u.jsx)(p.Z,{to:`#${e.id}`,className:n??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,u.jsx)(d,{isChild:!0,toc:e.children,className:i,linkClassName:n})]},e.id)))}):null}const g=n.memo(d);function m(e){let{toc:t,className:i="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:c,maxHeadingLevel:p,...d}=e;const m=(0,s.L)(),v=c??m.tableOfContents.minHeadingLevel,f=p??m.tableOfContents.maxHeadingLevel,w=function(e){let{toc:t,minHeadingLevel:i,maxHeadingLevel:s}=e;return(0,n.useMemo)((()=>a({toc:r(t),minHeadingLevel:i,maxHeadingLevel:s})),[t,i,s])}({toc:t,minHeadingLevel:v,maxHeadingLevel:f});return h((0,n.useMemo)((()=>{if(l&&o)return{linkClassName:l,linkActiveClassName:o,minHeadingLevel:v,maxHeadingLevel:f}}),[l,o,v,f])),(0,u.jsx)(g,{toc:w,className:i,linkClassName:l,...d})}},7521:(e,t,i)=>{i.d(t,{Z:()=>c});var n=i(7294);"function"==typeof SuppressedError&&SuppressedError;const s=(e,t,i,n)=>{e.style.transition=`${t} ${i}ms ${n}`},r=(e,t,i)=>Math.min(Math.max(e,t),i);class a{constructor(e,t){this.glareAngle=0,this.glareOpacity=0,this.calculateGlareSize=e=>{const{width:t,height:i}=e,n=Math.sqrt(Math.pow(t,2)+Math.pow(i,2));return{width:n,height:n}},this.setSize=e=>{const t=this.calculateGlareSize(e);this.glareEl.style.width=`${t.width}px`,this.glareEl.style.height=`${t.height}px`},this.update=(e,t,i,n)=>{this.updateAngle(e,t.glareReverse),this.updateOpacity(e,t,i,n)},this.updateAngle=(e,t)=>{const{xPercentage:i,yPercentage:n}=e,s=180/Math.PI,r=i?Math.atan2(n,-i)*s:0;this.glareAngle=r-(t?180:0)},this.updateOpacity=(e,t,i,n)=>{const{xPercentage:s,yPercentage:a}=e,{glarePosition:l,glareReverse:o,glareMaxOpacity:c}=t,h=i?-1:1,p=n?-1:1,u=o?-1:1;let d=0;switch(l){case"top":d=-s*h*u;break;case"right":d=a*p*u;break;case"bottom":case void 0:d=s*h*u;break;case"left":d=-a*p*u;break;case"all":d=Math.hypot(s,a)}const g=r(d,0,100);this.glareOpacity=g*c/100},this.render=e=>{const{glareColor:t}=e;this.glareEl.style.transform=`rotate(${this.glareAngle}deg) translate(-50%, -50%)`,this.glareEl.style.opacity=this.glareOpacity.toString(),this.glareEl.style.background=`linear-gradient(0deg, rgba(255,255,255,0) 0%, ${t} 100%)`},this.glareWrapperEl=document.createElement("div"),this.glareEl=document.createElement("div"),this.glareWrapperEl.appendChild(this.glareEl),this.glareWrapperEl.className="glare-wrapper",this.glareEl.className="glare";const i={position:"absolute",top:"0",left:"0",width:"100%",height:"100%",overflow:"hidden",borderRadius:t,WebkitMaskImage:"-webkit-radial-gradient(white, black)",pointerEvents:"none"},n=this.calculateGlareSize(e),s={position:"absolute",top:"50%",left:"50%",transformOrigin:"0% 0%",pointerEvents:"none",width:`${n.width}px`,height:`${n.height}px`};Object.assign(this.glareWrapperEl.style,i),Object.assign(this.glareEl.style,s)}}class l{constructor(){this.glareAngle=0,this.glareOpacity=0,this.tiltAngleX=0,this.tiltAngleY=0,this.tiltAngleXPercentage=0,this.tiltAngleYPercentage=0,this.update=(e,t)=>{this.updateTilt(e,t),this.updateTiltManualInput(e,t),this.updateTiltReverse(t),this.updateTiltLimits(t)},this.updateTilt=(e,t)=>{const{xPercentage:i,yPercentage:n}=e,{tiltMaxAngleX:s,tiltMaxAngleY:r}=t;this.tiltAngleX=i*s/100,this.tiltAngleY=n*r/100*-1},this.updateTiltManualInput=(e,t)=>{const{tiltAngleXManual:i,tiltAngleYManual:n,tiltMaxAngleX:s,tiltMaxAngleY:r}=t;(null!==i||null!==n)&&(this.tiltAngleX=null!==i?i:0,this.tiltAngleY=null!==n?n:0,e.xPercentage=100*this.tiltAngleX/s,e.yPercentage=100*this.tiltAngleY/r)},this.updateTiltReverse=e=>{const t=e.tiltReverse?-1:1;this.tiltAngleX=t*this.tiltAngleX,this.tiltAngleY=t*this.tiltAngleY},this.updateTiltLimits=e=>{const{tiltAxis:t}=e;this.tiltAngleX=r(this.tiltAngleX,-90,90),this.tiltAngleY=r(this.tiltAngleY,-90,90),t&&(this.tiltAngleX="x"===t?this.tiltAngleX:0,this.tiltAngleY="y"===t?this.tiltAngleY:0)},this.updateTiltAnglesPercentage=e=>{const{tiltMaxAngleX:t,tiltMaxAngleY:i}=e;this.tiltAngleXPercentage=this.tiltAngleX/t*100,this.tiltAngleYPercentage=this.tiltAngleY/i*100},this.render=e=>{e.style.transform+=`rotateX(${this.tiltAngleX}deg) rotateY(${this.tiltAngleY}deg) `}}}const o=Object.assign(Object.assign({scale:1,perspective:1e3,flipVertically:!1,flipHorizontally:!1,reset:!0,transitionEasing:"cubic-bezier(.03,.98,.52,.99)",transitionSpeed:400,trackOnWindow:!1,gyroscope:!1},{tiltEnable:!0,tiltReverse:!1,tiltAngleXInitial:0,tiltAngleYInitial:0,tiltMaxAngleX:20,tiltMaxAngleY:20,tiltAxis:void 0,tiltAngleXManual:null,tiltAngleYManual:null}),{glareEnable:!1,glareMaxOpacity:.7,glareColor:"#ffffff",glarePosition:"bottom",glareReverse:!1,glareBorderRadius:"0"});class c extends n.PureComponent{constructor(){super(...arguments),this.wrapperEl={node:null,size:{width:0,height:0,left:0,top:0},clientPosition:{x:null,y:null,xPercentage:0,yPercentage:0},updateAnimationId:null,scale:1},this.tilt=null,this.glare=null,this.addDeviceOrientationEventListener=()=>function(e,t,i,n){return new(i||(i=Promise))((function(s,r){function a(e){try{o(n.next(e))}catch(e){r(e)}}function l(e){try{o(n.throw(e))}catch(e){r(e)}}function o(e){var t;e.done?s(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,l)}o((n=n.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){if(!window.DeviceOrientationEvent)return;const e=DeviceOrientationEvent.requestPermission;"function"==typeof e?"granted"===(yield e())&&window.addEventListener("deviceorientation",this.onMove):window.addEventListener("deviceorientation",this.onMove)})),this.setSize=()=>{this.setWrapperElSize(),this.glare&&this.glare.setSize(this.wrapperEl.size)},this.mainLoop=e=>{null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.processInput(e),this.update(e.type),this.wrapperEl.updateAnimationId=requestAnimationFrame(this.renderFrame)},this.onEnter=e=>{const{onEnter:t}=this.props;this.setSize(),this.wrapperEl.node.style.willChange="transform",this.setTransitions(),t&&t(e.type)},this.onMove=e=>{this.mainLoop(e),this.emitOnMove(e)},this.onLeave=e=>{const{onLeave:t}=this.props;if(this.setTransitions(),t&&t(e.type),this.props.reset){const e=new CustomEvent("autoreset");this.onMove(e)}},this.processInput=e=>{const{scale:t}=this.props;switch(e.type){case"mousemove":this.wrapperEl.clientPosition.x=e.pageX,this.wrapperEl.clientPosition.y=e.pageY,this.wrapperEl.scale=t;break;case"touchmove":this.wrapperEl.clientPosition.x=e.touches[0].pageX,this.wrapperEl.clientPosition.y=e.touches[0].pageY,this.wrapperEl.scale=t;break;case"deviceorientation":this.processInputDeviceOrientation(e),this.wrapperEl.scale=t;break;case"autoreset":const{tiltAngleXInitial:i,tiltAngleYInitial:n,tiltMaxAngleX:s,tiltMaxAngleY:a}=this.props,l=n/a*100;this.wrapperEl.clientPosition.xPercentage=r(i/s*100,-100,100),this.wrapperEl.clientPosition.yPercentage=r(l,-100,100),this.wrapperEl.scale=1}},this.processInputDeviceOrientation=e=>{if(!e.gamma||!e.beta||!this.props.gyroscope)return;const{tiltMaxAngleX:t,tiltMaxAngleY:i}=this.props,n=e.gamma;this.wrapperEl.clientPosition.xPercentage=e.beta/t*100,this.wrapperEl.clientPosition.yPercentage=n/i*100,this.wrapperEl.clientPosition.xPercentage=r(this.wrapperEl.clientPosition.xPercentage,-100,100),this.wrapperEl.clientPosition.yPercentage=r(this.wrapperEl.clientPosition.yPercentage,-100,100)},this.update=e=>{const{tiltEnable:t,flipVertically:i,flipHorizontally:n}=this.props;"autoreset"!==e&&"deviceorientation"!==e&&"propChange"!==e&&this.updateClientInput(),t&&this.tilt.update(this.wrapperEl.clientPosition,this.props),this.updateFlip(),this.tilt.updateTiltAnglesPercentage(this.props),this.glare&&this.glare.update(this.wrapperEl.clientPosition,this.props,i,n)},this.updateClientInput=()=>{const{trackOnWindow:e}=this.props;let t,i;if(e){const{x:e,y:n}=this.wrapperEl.clientPosition;t=n/window.innerHeight*200-100,i=e/window.innerWidth*200-100}else{const{size:{width:e,height:n,left:s,top:r},clientPosition:{x:a,y:l}}=this.wrapperEl;t=(l-r)/n*200-100,i=(a-s)/e*200-100}this.wrapperEl.clientPosition.xPercentage=r(t,-100,100),this.wrapperEl.clientPosition.yPercentage=r(i,-100,100)},this.updateFlip=()=>{const{flipVertically:e,flipHorizontally:t}=this.props;e&&(this.tilt.tiltAngleX+=180,this.tilt.tiltAngleY*=-1),t&&(this.tilt.tiltAngleY+=180)},this.renderFrame=()=>{this.resetWrapperElTransform(),this.renderPerspective(),this.tilt.render(this.wrapperEl.node),this.renderScale(),this.glare&&this.glare.render(this.props)}}componentDidMount(){if(this.tilt=new l,this.initGlare(),this.addEventListeners(),"undefined"==typeof CustomEvent)return;const e=new CustomEvent("autoreset");this.mainLoop(e);const t=new CustomEvent("initial");this.emitOnMove(t)}componentWillUnmount(){null!==this.wrapperEl.updateAnimationId&&cancelAnimationFrame(this.wrapperEl.updateAnimationId),this.removeEventListeners()}componentDidUpdate(){const e=new CustomEvent("propChange");this.mainLoop(e),this.emitOnMove(e)}addEventListeners(){const{trackOnWindow:e,gyroscope:t}=this.props;window.addEventListener("resize",this.setSize),e&&(window.addEventListener("mouseenter",this.onEnter),window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseout",this.onLeave),window.addEventListener("touchstart",this.onEnter),window.addEventListener("touchmove",this.onMove),window.addEventListener("touchend",this.onLeave)),t&&this.addDeviceOrientationEventListener()}removeEventListeners(){const{trackOnWindow:e,gyroscope:t}=this.props;window.removeEventListener("resize",this.setSize),e&&(window.removeEventListener("mouseenter",this.onEnter),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseout",this.onLeave),window.removeEventListener("touchstart",this.onEnter),window.removeEventListener("touchmove",this.onMove),window.removeEventListener("touchend",this.onLeave)),t&&window.DeviceOrientationEvent&&window.removeEventListener("deviceorientation",this.onMove)}setWrapperElSize(){const e=this.wrapperEl.node.getBoundingClientRect();this.wrapperEl.size.width=this.wrapperEl.node.offsetWidth,this.wrapperEl.size.height=this.wrapperEl.node.offsetHeight,this.wrapperEl.size.left=e.left+window.scrollX,this.wrapperEl.size.top=e.top+window.scrollY}initGlare(){const{glareEnable:e,glareBorderRadius:t}=this.props;e&&(this.glare=new a(this.wrapperEl.size,t),this.wrapperEl.node.appendChild(this.glare.glareWrapperEl))}emitOnMove(e){const{onMove:t}=this.props;if(!t)return;let i=0,n=0;this.glare&&(i=this.glare.glareAngle,n=this.glare.glareOpacity),t({tiltAngleX:this.tilt.tiltAngleX,tiltAngleY:this.tilt.tiltAngleY,tiltAngleXPercentage:this.tilt.tiltAngleXPercentage,tiltAngleYPercentage:this.tilt.tiltAngleYPercentage,glareAngle:i,glareOpacity:n,eventType:e.type})}resetWrapperElTransform(){this.wrapperEl.node.style.transform=""}renderPerspective(){const{perspective:e}=this.props;this.wrapperEl.node.style.transform+=`perspective(${e}px) `}renderScale(){const{scale:e}=this.wrapperEl;this.wrapperEl.node.style.transform+=`scale3d(${e},${e},${e})`}setTransitions(){const{transitionSpeed:e,transitionEasing:t}=this.props;s(this.wrapperEl.node,"all",e,t),this.glare&&s(this.glare.glareEl,"opacity",e,t)}render(){const{children:e,className:t,style:i}=this.props;return n.createElement("div",{ref:e=>this.wrapperEl.node=e,onMouseEnter:this.onEnter,onMouseMove:this.onMove,onMouseLeave:this.onLeave,onTouchStart:this.onEnter,onTouchMove:this.onMove,onTouchEnd:this.onLeave,className:t,style:i},e)}}c.defaultProps=o},1151:(e,t,i)=>{i.d(t,{Zo:()=>l,ah:()=>r});var n=i(7294);const s=n.createContext({});function r(e){const t=n.useContext(s);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const a={};function l({components:e,children:t,disableParentContext:i}){let l;return l=i?"function"==typeof e?e({}):e||a:r(e),n.createElement(s.Provider,{value:l},t)}},9244:(e,t,i)=>{i.d(t,{Z:()=>c});var n=i(7294);function s(e){return"string"==typeof e&&"%"===e[e.length-1]&&function(e){const t=parseFloat(e);return!isNaN(t)&&isFinite(t)}(e.substring(0,e.length-1))}function r(e,t){0===t&&(null==e?void 0:e.style)&&(e.style.display="none")}const a={animating:"rah-animating",animatingUp:"rah-animating--up",animatingDown:"rah-animating--down",animatingToHeightZero:"rah-animating--to-height-zero",animatingToHeightAuto:"rah-animating--to-height-auto",animatingToHeightSpecific:"rah-animating--to-height-specific",static:"rah-static",staticHeightZero:"rah-static--height-zero",staticHeightAuto:"rah-static--height-auto",staticHeightSpecific:"rah-static--height-specific"};function l(e,t){return[e.static,0===t&&e.staticHeightZero,"number"==typeof t&&t>0?e.staticHeightSpecific:null,"auto"===t&&e.staticHeightAuto].filter((e=>e)).join(" ")}const o=["animateOpacity","animationStateClasses","applyInlineTransitions","children","className","contentClassName","contentRef","delay","duration","easing","height","onHeightAnimationEnd","onHeightAnimationStart","style"],c=n.forwardRef(((e,t)=>{const{animateOpacity:i=!1,animationStateClasses:c={},applyInlineTransitions:h=!0,children:p,className:u="",contentClassName:d,delay:g=0,duration:m=500,easing:v="ease",height:f,onHeightAnimationEnd:w,onHeightAnimationStart:E,style:y,contentRef:A}=e,L=Object.assign({},e);o.forEach((e=>{delete L[e]}));const x=(0,n.useRef)(f),b=(0,n.useRef)(null),P=(0,n.useRef)(),M=(0,n.useRef)(),H=(0,n.useRef)(Object.assign(Object.assign({},a),c)),O="undefined"!=typeof window,C=(0,n.useRef)(!(!O||!window.matchMedia)&&window.matchMedia("(prefers-reduced-motion)").matches),T=C.current?0:g,S=C.current?0:m;let Y=f,k="visible";"number"==typeof f?(Y=f<0?0:f,k="hidden"):s(Y)&&(Y="0%"===f?0:f,k="hidden");const[X,N]=(0,n.useState)(Y),[I,z]=(0,n.useState)(k),[$,R]=(0,n.useState)(!1),[j,W]=(0,n.useState)(l(H.current,f));(0,n.useEffect)((()=>{r(b.current,X)}),[]),(0,n.useEffect)((()=>{if(f!==x.current&&b.current){!function(e,t){0===t&&(null==e?void 0:e.style)&&(e.style.display="")}(b.current,x.current),b.current.style.overflow="hidden";const e=b.current.offsetHeight;b.current.style.overflow="";const t=S+T;let i,n,a,o="hidden";const c="auto"===x.current;"number"==typeof f?(i=f<0?0:f,n=i):s(f)?(i="0%"===f?0:f,n=i):(i=e,n="auto",o=void 0),c&&(n=i,i=e);const h=[H.current.animating,("auto"===x.current||f<x.current)&&H.current.animatingUp,("auto"===f||f>x.current)&&H.current.animatingDown,0===n&&H.current.animatingToHeightZero,"auto"===n&&H.current.animatingToHeightAuto,"number"==typeof n&&n>0?H.current.animatingToHeightSpecific:null].filter((e=>e)).join(" "),p=l(H.current,n);N(i),z("hidden"),R(!c),W(h),clearTimeout(M.current),clearTimeout(P.current),c?(a=!0,M.current=setTimeout((()=>{N(n),z(o),R(a),null==E||E(n)}),50),P.current=setTimeout((()=>{R(!1),W(p),r(b.current,n),null==w||w(n)}),t)):(null==E||E(i),M.current=setTimeout((()=>{N(n),z(o),R(!1),W(p),"auto"!==f&&r(b.current,i),null==w||w(i)}),t))}return x.current=f,()=>{clearTimeout(M.current),clearTimeout(P.current)}}),[f]);const _=Object.assign(Object.assign({},y),{height:X,overflow:I||(null==y?void 0:y.overflow)});$&&h&&(_.transition=`height ${S}ms ${v} ${T}ms`,(null==y?void 0:y.transition)&&(_.transition=`${y.transition}, ${_.transition}`),_.WebkitTransition=_.transition);const D={};i&&(D.transition=`opacity ${S}ms ${v} ${T}ms`,D.WebkitTransition=D.transition,0===X&&(D.opacity=0));const Z=void 0!==L["aria-hidden"]?L["aria-hidden"]:0===f;return n.createElement("div",Object.assign({},L,{"aria-hidden":Z,className:`${j} ${u}`,style:_,ref:t}),n.createElement("div",{className:d,style:D,ref:e=>{b.current=e,A&&(A.current=e)}},p))}))}}]);