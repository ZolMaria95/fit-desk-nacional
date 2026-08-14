import {f,y as yE,g as fe,S as Sh,aK as sn,F,j as u2,W,o as oe,p as pi,k as da$1,aL as s,aM as r$1,aN as o_,K as Kt$1,aO as W$1,aP as zt$1,aQ as mt,L as La,a as yT,A as Ja$1,i as iS,m as mf,e as ec,ah as iy,P as IT,aR as LT,J as Jw,D as DT,u as uy,Q as wT,B as Dy,C as FT,G as _t$2,E as vi,H as Wo$1,N as No$1,I as jo$1,O as zo$1,ag as AT,l as lC,M as My,a3 as nc,ae as _i,b as fC,w as wf,$ as $e,T as Oe,a7 as Kt$2,U as ge,as as bi,aS as ct,ax as fR,an as y,ao as U,aT as Lh,ap as re,ar as X,aB as Oo$1,at as Bt$2,aU as Zc,a9 as Rh,aD as T_,aG as De,aV as Xt$1,ad as Ly,ak as H$1,aW as wn,aX as de,aY as x,aZ as Pt,av as Re,a_ as xe,a$ as Fe$1,b0 as At$1,b1 as f2,b2 as P4,X as XE,au as VE,a4 as tc,a5 as _f,a6 as If,aj as ME,ay as Xc,b3 as wr,b4 as S4,b5 as sc,b6 as b4,b7 as J,a0 as OT,a1 as kT,aw as vy,b8 as e3,b9 as a2,ba as Vh,Z as L,bb as V4,bc as nu,bd as hy,a2 as ZT,aa as xm,ac as ry,az as cr$1,be as Ph,bf as vf,bg as yf,bh as m,bi as Dg,bj as Eg,bk as Vs,c as RT,aH as sg,aI as ag,bl as b$1,aA as tt,bm as ut$1,al as yi,bn as ee,bo as C_,bp as Ah,bq as ht,br as Ki,bs as Yi,bt as _T,af as Iy,bu as c_,bv as ie,bw as ky,bx as dS,by as fS,bz as vS,aJ as rv}from'./main-VBMBWRSV.js';import {_,I}from'./chunk-B9HKcW7B.js';import {k as ki}from'./chunk-Bl6iziH8.js';import {O as Or,K as Kn$1,h as hn,Y as Yr,_ as _t$1,j as jr,z as zr,N as Nr,B as Br,L as Lr,T as Tr,P as Pr,I as Ir,E as Er,R as Rr,U as Ur,u as ut,V as Vr,H as Hr,F as Fr,o as on,r as rn,a as zs,b as Ys,c as Rn}from'./chunk-8--zXP0H.js';import {L as Lt$1,P,G,N as Nt$1}from'./chunk-Db3jQ6OE.js';import'./chunk-Dp_-tKRy.js';import'./chunk-CI3ix_kR.js';import'./chunk-lQUfp4vW.js';import {s as s$1}from'./chunk-DL780i6E.js';import {o}from'./chunk-BNEgAUk-.js';import {l}from'./chunk-CdT2Y1k4.js';import {T}from'./chunk-BEBKHx5y.js';import {p}from'./chunk-7Pq9_1K0.js';import {Q as Qt$1}from'./chunk-prh-03br.js';import {B as Bt$1,W as Wt$1,b}from'./chunk-a6Ylvdce.js';import {v}from'./chunk-BkpWwlRq.js';import {K}from'./chunk-DHycyw5G.js';import {y as yt,w as wt}from'./chunk-DPkMfdoP.js';import {A as Aa$1,F as Fa$1,e as eo$1,h as he,Z as Zn$1,m as me,u as ue,I as Io$1,L as Lr$1,z as zr$1,d as da$2,l as ln,i as ia$1,a as Di,j as ji,_ as _t$3,K as K$1}from'./chunk-oAXRSNns.js';function Bt(a){let t=a.cloneNode(true),e=t.querySelectorAll("[id]"),i=a.nodeName.toLowerCase();t.removeAttribute("id");for(let n=0;n<e.length;n++)e[n].removeAttribute("id");return i==="canvas"?Ln(a,t):(i==="input"||i==="select"||i==="textarea")&&Nn(a,t),Bn("canvas",a,t,Ln),Bn("input, textarea, select",a,t,Nn),t}function Bn(a,t,e,i){let n=t.querySelectorAll(a);if(n.length){let o=e.querySelectorAll(a);for(let r=0;r<n.length;r++)i(n[r],o[r]);}}var Da=0;function Nn(a,t){t.type!=="file"&&(t.value=a.value),t.type==="radio"&&t.name&&(t.name=`mat-clone-${t.name}-${Da++}`);}function Ln(a,t){let e=t.getContext("2d");if(e)try{e.drawImage(a,0,0);}catch{}}function qt(a){let t=a.getBoundingClientRect();return {top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.width,height:t.height,x:t.x,y:t.y}}function Nt(a,t,e){let{top:i,bottom:n,left:o,right:r}=a;return e>=i&&e<=n&&t>=o&&t<=r}function Pa(a,t){let e=t.left<a.left,i=t.left+t.width>a.right,n=t.top<a.top,o=t.top+t.height>a.bottom;return e||i||n||o}function Be(a,t,e){a.top+=t,a.bottom=a.top+a.height,a.left+=e,a.right=a.left+a.width;}function Vn(a,t,e,i){let{top:n,right:o,bottom:r,left:l,width:p,height:_}=a,b=p*t,M=_*t;return i>n-M&&i<r+M&&e>l-b&&e<o+b}var gt=class{_document;positions=new Map;constructor(t){this._document=t;}clear(){this.positions.clear();}cache(t){this.clear(),this.positions.set(this._document,{scrollPosition:this.getViewportScrollPosition()}),t.forEach(e=>{this.positions.set(e,{scrollPosition:{top:e.scrollTop,left:e.scrollLeft},clientRect:qt(e)});});}handleScroll(t){let e=ht(t),i=this.positions.get(e);if(!i)return null;let n=i.scrollPosition,o,r;if(e===this._document){let _=this.getViewportScrollPosition();o=_.top,r=_.left;}else o=e.scrollTop,r=e.scrollLeft;let l=n.top-o,p=n.left-r;return this.positions.forEach((_,b)=>{_.clientRect&&e!==b&&e.contains(b)&&Be(_.clientRect,l,p);}),n.top=o,n.left=r,{top:l,left:p}}getViewportScrollPosition(){return {top:window.scrollY,left:window.scrollX}}};function Yn(a,t){let e=a.rootNodes;if(e.length===1&&e[0].nodeType===t.ELEMENT_NODE)return e[0];let i=t.createElement("div");return e.forEach(n=>i.appendChild(n)),i}function jt(a,t,e){for(let i in t)if(t.hasOwnProperty(i)){let n=t[i];n?a.setProperty(i,n,e?.has(i)?"important":""):a.removeProperty(i);}return a}function we(a,t){let e=t?"":"none";jt(a.style,{"touch-action":t?"":"none","-webkit-user-drag":t?"":"none","-webkit-tap-highlight-color":t?"":"transparent","user-select":e,"-ms-user-select":e,"-webkit-user-select":e,"-moz-user-select":e});}function zn(a,t,e){jt(a.style,{position:t?"":"fixed",top:t?"":"0",opacity:t?"":"0",left:t?"":"-999em"},e);}function _t(a,t){return t&&t!="none"?a+" "+t:a}function Hn(a,t){a.style.width=`${t.width}px`,a.style.height=`${t.height}px`,a.style.transform=Ne(t.left,t.top);}function Ne(a,t){return `translate3d(${Math.round(a)}px, ${Math.round(t)}px, 0)`}var Fe={capture:true},Ft={passive:false,capture:true},Ma=(()=>{class a{static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Kt$1({type:a,selectors:[["ng-component"]],hostAttrs:["cdk-drag-resets-container",""],decls:0,vars:0,template:function(i,n){},styles:[`@layer cdk-resets {
  .cdk-drag-preview {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    inset: auto;
  }
}
.cdk-drag-placeholder *,
.cdk-drag-preview * {
  pointer-events: none !important;
}
`],encapsulation:2})}return a})(),Ut=(()=>{class a{_ngZone=f(H$1);_document=f(L);_styleLoader=f(wr);_renderer=f(ut$1).createRenderer(null,null);_cleanupDocumentTouchmove;_scroll=new U;_dropInstances=new Set;_dragInstances=new Set;_activeDragInstances=W([]);_globalListeners;_draggingPredicate=e=>e.isDragging();_domNodesToDirectives=null;pointerMove=new U;pointerUp=new U;registerDropContainer(e){this._dropInstances.has(e)||this._dropInstances.add(e);}registerDragItem(e){this._dragInstances.add(e),this._dragInstances.size===1&&this._ngZone.runOutsideAngular(()=>{this._cleanupDocumentTouchmove?.(),this._cleanupDocumentTouchmove=this._renderer.listen(this._document,"touchmove",this._persistentTouchmoveListener,Ft);});}removeDropContainer(e){this._dropInstances.delete(e);}removeDragItem(e){this._dragInstances.delete(e),this.stopDragging(e),this._dragInstances.size===0&&this._cleanupDocumentTouchmove?.();}startDragging(e,i){if(!(this._activeDragInstances().indexOf(e)>-1)&&(this._styleLoader.load(Ma),this._activeDragInstances.update(n=>[...n,e]),this._activeDragInstances().length===1)){let n=i.type.startsWith("touch"),o=l=>this.pointerUp.next(l),r=[["scroll",l=>this._scroll.next(l),Fe],["selectstart",this._preventDefaultWhileDragging,Ft]];n?r.push(["touchend",o,Fe],["touchcancel",o,Fe]):r.push(["mouseup",o,Fe]),n||r.push(["mousemove",l=>this.pointerMove.next(l),Ft]),this._ngZone.runOutsideAngular(()=>{this._globalListeners=r.map(([l,p,_])=>this._renderer.listen(this._document,l,p,_));});}}stopDragging(e){this._activeDragInstances.update(i=>{let n=i.indexOf(e);return n>-1?(i.splice(n,1),[...i]):i}),this._activeDragInstances().length===0&&this._clearGlobalListeners();}isDragging(e){return this._activeDragInstances().indexOf(e)>-1}scrolled(e){let i=[this._scroll];return e&&e!==this._document&&i.push(new x(n=>this._ngZone.runOutsideAngular(()=>{let o=this._renderer.listen(e,"scroll",r=>{this._activeDragInstances().length&&n.next(r);},Fe);return ()=>{o();}}))),T_(...i)}registerDirectiveNode(e,i){this._domNodesToDirectives??=new WeakMap,this._domNodesToDirectives.set(e,i);}removeDirectiveNode(e){this._domNodesToDirectives?.delete(e);}getDragDirectiveForNode(e){return this._domNodesToDirectives?.get(e)||null}ngOnDestroy(){this._dragInstances.forEach(e=>this.removeDragItem(e)),this._dropInstances.forEach(e=>this.removeDropContainer(e)),this._domNodesToDirectives=null,this._clearGlobalListeners(),this.pointerMove.complete(),this.pointerUp.complete();}_preventDefaultWhileDragging=e=>{this._activeDragInstances().length>0&&e.preventDefault();};_persistentTouchmoveListener=e=>{this._activeDragInstances().length>0&&(this._activeDragInstances().some(this._draggingPredicate)&&e.preventDefault(),this.pointerMove.next(e));};_clearGlobalListeners(){this._globalListeners?.forEach(e=>e()),this._globalListeners=void 0;}static \u0275fac=function(i){return new(i||a)};static \u0275prov=b$1({token:a,factory:a.\u0275fac})}return a})();function Gn(a){let t=a.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(a)*t}function Ea(a){let t=getComputedStyle(a),e=At(t,"transition-property"),i=e.find(l=>l==="transform"||l==="all");if(!i)return 0;let n=e.indexOf(i),o=At(t,"transition-duration"),r=At(t,"transition-delay");return Gn(o[n])+Gn(r[n])}function At(a,t){return a.getPropertyValue(t).split(",").map(i=>i.trim())}var Ia=new Set(["position"]),Lt=class{_document;_rootElement;_direction;_initialDomRect;_previewTemplate;_previewClass;_pickupPositionOnPage;_initialTransform;_zIndex;_renderer;_previewEmbeddedView=null;_preview;get element(){return this._preview}constructor(t,e,i,n,o,r,l,p,_,b){this._document=t,this._rootElement=e,this._direction=i,this._initialDomRect=n,this._previewTemplate=o,this._previewClass=r,this._pickupPositionOnPage=l,this._initialTransform=p,this._zIndex=_,this._renderer=b;}attach(t){this._preview=this._createPreview(),t.appendChild(this._preview),qn(this._preview)&&this._preview.showPopover();}destroy(){this._preview.remove(),this._previewEmbeddedView?.destroy(),this._preview=this._previewEmbeddedView=null;}setTransform(t){this._preview.style.transform=t;}getBoundingClientRect(){return this._preview.getBoundingClientRect()}addClass(t){this._preview.classList.add(t);}getTransitionDuration(){return Ea(this._preview)}addEventListener(t,e){return this._renderer.listen(this._preview,t,e)}_createPreview(){let t=this._previewTemplate,e=this._previewClass,i=t?t.template:null,n;if(i&&t){let o=t.matchSize?this._initialDomRect:null,r=t.viewContainer.createEmbeddedView(i,t.context);r.detectChanges(),n=Yn(r,this._document),this._previewEmbeddedView=r,t.matchSize?Hn(n,o):n.style.transform=Ne(this._pickupPositionOnPage.x,this._pickupPositionOnPage.y);}else n=Bt(this._rootElement),Hn(n,this._initialDomRect),this._initialTransform&&(n.style.transform=this._initialTransform);return jt(n.style,{"pointer-events":"none",margin:qn(n)?"0 auto 0 0":"0",position:"fixed",top:"0",left:"0","z-index":this._zIndex+""},Ia),we(n,false),n.classList.add("cdk-drag-preview"),n.setAttribute("popover","manual"),n.setAttribute("dir",this._direction),e&&(Array.isArray(e)?e.forEach(o=>n.classList.add(o)):n.classList.add(e)),n}};function qn(a){return "showPopover"in a}var Ta={passive:true},jn={passive:false},Ra={passive:false,capture:true},Oa=800,Un="cdk-drag-placeholder",$n=new Set(["position"]);function Xn(a,t,e={dragStartThreshold:5,pointerDirectionChangeThreshold:5}){let i=a.get(yi,null,{optional:true})||a.get(ut$1).createRenderer(null,null);return new Vt(t,e,a.get(L),a.get(H$1),a.get(tt),a.get(Ut),i)}var Vt=class{_config;_document;_ngZone;_viewportRuler;_dragDropRegistry;_renderer;_rootElementCleanups;_cleanupShadowRootSelectStart;_preview=null;_previewContainer;_placeholderRef=null;_placeholder;_pickupPositionInElement;_pickupPositionOnPage;_marker;_anchor=null;_passiveTransform={x:0,y:0};_activeTransform={x:0,y:0};_initialTransform;_hasStartedDragging=W(false);_hasMoved=false;_initialContainer;_initialIndex;_parentPositions;_moveEvents=new U;_pointerDirectionDelta;_pointerPositionAtLastDirectionChange;_lastKnownPointerPosition;_rootElement;_ownerSVGElement=null;_rootElementTapHighlight;_pointerMoveSubscription=ee.EMPTY;_pointerUpSubscription=ee.EMPTY;_scrollSubscription=ee.EMPTY;_resizeSubscription=ee.EMPTY;_lastTouchEventTime;_dragStartTime;_boundaryElement=null;_nativeInteractionsEnabled=true;_initialDomRect;_previewRect;_boundaryRect;_previewTemplate;_placeholderTemplate;_handles=[];_disabledHandles=new Set;_dropContainer;_direction="ltr";_parentDragRef=null;_cachedShadowRoot;lockAxis=null;dragStartDelay=0;previewClass;scale=1;get disabled(){return this._disabled||!!(this._dropContainer&&this._dropContainer.disabled)}set disabled(t){t!==this._disabled&&(this._disabled=t,this._toggleNativeDragInteractions(),this._handles.forEach(e=>we(e,t)));}_disabled=false;beforeStarted=new U;started=new U;released=new U;ended=new U;entered=new U;exited=new U;dropped=new U;moved=this._moveEvents;data;constrainPosition;constructor(t,e,i,n,o,r,l){this._config=e,this._document=i,this._ngZone=n,this._viewportRuler=o,this._dragDropRegistry=r,this._renderer=l,this.withRootElement(t).withParent(e.parentDragRef||null),this._parentPositions=new gt(i),r.registerDragItem(this);}getPlaceholderElement(){return this._placeholder}getRootElement(){return this._rootElement}getVisibleElement(){return this.isDragging()?this.getPlaceholderElement():this.getRootElement()}withHandles(t){this._handles=t.map(i=>Pt(i)),this._handles.forEach(i=>we(i,this.disabled)),this._toggleNativeDragInteractions();let e=new Set;return this._disabledHandles.forEach(i=>{this._handles.indexOf(i)>-1&&e.add(i);}),this._disabledHandles=e,this}withPreviewTemplate(t){return this._previewTemplate=t,this}withPlaceholderTemplate(t){return this._placeholderTemplate=t,this}withRootElement(t){let e=Pt(t);if(e!==this._rootElement){this._removeRootElementListeners();let i=this._renderer;this._rootElementCleanups=this._ngZone.runOutsideAngular(()=>[i.listen(e,"mousedown",this._pointerDown,jn),i.listen(e,"touchstart",this._pointerDown,Ta),i.listen(e,"dragstart",this._nativeDragStart,jn)]),this._initialTransform=void 0,this._rootElement=e;}return typeof SVGElement<"u"&&this._rootElement instanceof SVGElement&&(this._ownerSVGElement=this._rootElement.ownerSVGElement),this}withBoundaryElement(t){return this._boundaryElement=t?Pt(t):null,this._resizeSubscription.unsubscribe(),t&&(this._resizeSubscription=this._viewportRuler.change(10).subscribe(()=>this._containInsideBoundaryOnResize())),this}withParent(t){return this._parentDragRef=t,this}dispose(){this._removeRootElementListeners(),this.isDragging()&&this._rootElement?.remove(),this._marker?.remove(),this._destroyPreview(),this._destroyPlaceholder(),this._dragDropRegistry.removeDragItem(this),this._removeListeners(),this.beforeStarted.complete(),this.started.complete(),this.released.complete(),this.ended.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this._moveEvents.complete(),this._handles=[],this._disabledHandles.clear(),this._dropContainer=void 0,this._resizeSubscription.unsubscribe(),this._parentPositions.clear(),this._boundaryElement=this._rootElement=this._ownerSVGElement=this._placeholderTemplate=this._previewTemplate=this._marker=this._parentDragRef=null;}isDragging(){return this._hasStartedDragging()&&this._dragDropRegistry.isDragging(this)}reset(){this._rootElement.style.transform=this._initialTransform||"",this._activeTransform={x:0,y:0},this._passiveTransform={x:0,y:0};}resetToBoundary(){if(this._boundaryElement&&this._rootElement&&Pa(this._boundaryElement.getBoundingClientRect(),this._rootElement.getBoundingClientRect())){let t=this._boundaryElement.getBoundingClientRect(),e=this._rootElement.getBoundingClientRect(),i=0,n=0;e.left<t.left?i=t.left-e.left:e.right>t.right&&(i=t.right-e.right),e.top<t.top?n=t.top-e.top:e.bottom>t.bottom&&(n=t.bottom-e.bottom);let o=this._activeTransform.x,r=this._activeTransform.y,l=o+i,p=r+n;this._rootElement.style.transform=Ne(l,p),this._activeTransform={x:l,y:p},this._passiveTransform={x:l,y:p};}}disableHandle(t){!this._disabledHandles.has(t)&&this._handles.indexOf(t)>-1&&(this._disabledHandles.add(t),we(t,true));}enableHandle(t){this._disabledHandles.has(t)&&(this._disabledHandles.delete(t),we(t,this.disabled));}withDirection(t){return this._direction=t,this}_withDropContainer(t){this._dropContainer=t;}getFreeDragPosition(){let t=this.isDragging()?this._activeTransform:this._passiveTransform;return {x:t.x,y:t.y}}setFreeDragPosition(t){return this._activeTransform={x:0,y:0},this._passiveTransform.x=t.x,this._passiveTransform.y=t.y,this._dropContainer||this._applyRootElementTransform(t.x,t.y),this}withPreviewContainer(t){return this._previewContainer=t,this}_sortFromLastPointerPosition(){let t=this._lastKnownPointerPosition;t&&this._dropContainer&&this._updateActiveDropContainer(this._getConstrainedPointerPosition(t),t);}_removeListeners(){this._pointerMoveSubscription.unsubscribe(),this._pointerUpSubscription.unsubscribe(),this._scrollSubscription.unsubscribe(),this._cleanupShadowRootSelectStart?.(),this._cleanupShadowRootSelectStart=void 0;}_destroyPreview(){this._preview?.destroy(),this._preview=null;}_destroyPlaceholder(){this._anchor?.remove(),this._placeholder?.remove(),this._placeholderRef?.destroy(),this._placeholder=this._anchor=this._placeholderRef=null;}_pointerDown=t=>{if(this.beforeStarted.next(),this._handles.length){let e=this._getTargetHandle(t);e&&!this._disabledHandles.has(e)&&!this.disabled&&this._initializeDragSequence(e,t);}else this.disabled||this._initializeDragSequence(this._rootElement,t);};_pointerMove=t=>{let e=this._getPointerPositionOnPage(t);if(!this._hasStartedDragging()){let n=Math.abs(e.x-this._pickupPositionOnPage.x),o=Math.abs(e.y-this._pickupPositionOnPage.y);if(n+o>=this._config.dragStartThreshold){let l=Date.now()>=this._dragStartTime+this._getDragStartDelay(t),p=this._dropContainer;if(!l){this._endDragSequence(t);return}(!p||!p.isDragging()&&!p.isReceiving())&&(t.cancelable&&t.preventDefault(),this._hasStartedDragging.set(true),this._ngZone.run(()=>this._startDragSequence(t)));}return}t.cancelable&&t.preventDefault();let i=this._getConstrainedPointerPosition(e);if(this._hasMoved=true,this._lastKnownPointerPosition=e,this._updatePointerDirectionDelta(i),this._dropContainer)this._updateActiveDropContainer(i,e);else {let n=this.constrainPosition?this._initialDomRect:this._pickupPositionOnPage,o=this._activeTransform;o.x=i.x-n.x+this._passiveTransform.x,o.y=i.y-n.y+this._passiveTransform.y,this._applyRootElementTransform(o.x,o.y);}this._moveEvents.observers.length&&this._ngZone.run(()=>{this._moveEvents.next({source:this,pointerPosition:i,event:t,distance:this._getDragDistance(i),delta:this._pointerDirectionDelta});});};_pointerUp=t=>{this._endDragSequence(t);};_endDragSequence(t){if(this._dragDropRegistry.isDragging(this)&&(this._removeListeners(),this._dragDropRegistry.stopDragging(this),this._toggleNativeDragInteractions(),this._handles&&(this._rootElement.style.webkitTapHighlightColor=this._rootElementTapHighlight),!!this._hasStartedDragging()))if(this.released.next({source:this,event:t}),this._dropContainer)this._dropContainer._stopScrolling(),this._animatePreviewToPlaceholder().then(()=>{this._cleanupDragArtifacts(t),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);});else {this._passiveTransform.x=this._activeTransform.x;let e=this._getPointerPositionOnPage(t);this._passiveTransform.y=this._activeTransform.y,this._ngZone.run(()=>{this.ended.next({source:this,distance:this._getDragDistance(e),dropPoint:e,event:t});}),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);}}_startDragSequence(t){Ae(t)&&(this._lastTouchEventTime=Date.now()),this._toggleNativeDragInteractions();let e=this._getShadowRoot(),i=this._dropContainer;if(e&&this._ngZone.runOutsideAngular(()=>{this._cleanupShadowRootSelectStart=this._renderer.listen(e,"selectstart",Fa,Ra);}),i){let n=this._rootElement,o=n.parentNode,r=this._placeholder=this._createPlaceholderElement(),l=this._marker=this._marker||this._document.createComment("");o.insertBefore(l,n),this._initialTransform=n.style.transform||"",this._preview=new Lt(this._document,this._rootElement,this._direction,this._initialDomRect,this._previewTemplate||null,this.previewClass||null,this._pickupPositionOnPage,this._initialTransform,this._config.zIndex||1e3,this._renderer),this._preview.attach(this._getPreviewInsertionPoint(o,e)),zn(n,false,$n),this._document.body.appendChild(o.replaceChild(r,n)),this.started.next({source:this,event:t}),i.start(),this._initialContainer=i,this._initialIndex=i.getItemIndex(this);}else this.started.next({source:this,event:t}),this._initialContainer=this._initialIndex=void 0;this._parentPositions.cache(i?i.getScrollableParents():[]);}_initializeDragSequence(t,e){this._parentDragRef&&e.stopPropagation();let i=this.isDragging(),n=Ae(e),o=!n&&e.button!==0,r=this._rootElement,l=ht(e),p=!n&&this._lastTouchEventTime&&this._lastTouchEventTime+Oa>Date.now(),_=n?Ki(e):Yi(e);if(l&&l.draggable&&e.type==="mousedown"&&e.preventDefault(),i||o||p||_)return;if(this._handles.length){let S=r.style;this._rootElementTapHighlight=S.webkitTapHighlightColor||"",S.webkitTapHighlightColor="transparent";}this._hasMoved=false,this._hasStartedDragging.set(this._hasMoved),this._removeListeners(),this._initialDomRect=this._rootElement.getBoundingClientRect(),this._pointerMoveSubscription=this._dragDropRegistry.pointerMove.subscribe(this._pointerMove),this._pointerUpSubscription=this._dragDropRegistry.pointerUp.subscribe(this._pointerUp),this._scrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(S=>this._updateOnScroll(S)),this._boundaryElement&&(this._boundaryRect=qt(this._boundaryElement));let b=this._previewTemplate;this._pickupPositionInElement=b&&b.template&&!b.matchSize?{x:0,y:0}:this._getPointerPositionInElement(this._initialDomRect,t,e);let M=this._pickupPositionOnPage=this._lastKnownPointerPosition=this._getPointerPositionOnPage(e);this._pointerDirectionDelta={x:0,y:0},this._pointerPositionAtLastDirectionChange={x:M.x,y:M.y},this._dragStartTime=Date.now(),this._dragDropRegistry.startDragging(this,e);}_cleanupDragArtifacts(t){zn(this._rootElement,true,$n),this._marker.parentNode.replaceChild(this._rootElement,this._marker),this._destroyPreview(),this._destroyPlaceholder(),this._initialDomRect=this._boundaryRect=this._previewRect=this._initialTransform=void 0,this._ngZone.run(()=>{let e=this._dropContainer,i=e.getItemIndex(this),n=this._getPointerPositionOnPage(t),o=this._getDragDistance(n),r=e._isOverContainer(n.x,n.y);this.ended.next({source:this,distance:o,dropPoint:n,event:t}),this.dropped.next({item:this,currentIndex:i,previousIndex:this._initialIndex,container:e,previousContainer:this._initialContainer,isPointerOverContainer:r,distance:o,dropPoint:n,event:t}),e.drop(this,i,this._initialIndex,this._initialContainer,r,o,n,t),this._dropContainer=this._initialContainer;});}_updateActiveDropContainer({x:t,y:e},{x:i,y:n}){let o=this._initialContainer._getSiblingContainerFromPosition(this,t,e);!o&&this._dropContainer!==this._initialContainer&&this._initialContainer._isOverContainer(t,e)&&(o=this._initialContainer),o&&o!==this._dropContainer&&this._ngZone.run(()=>{let r=this._dropContainer.getItemIndex(this),l=this._dropContainer.getItemAtIndex(r+1)?.getVisibleElement()||null;this.exited.next({item:this,container:this._dropContainer}),this._dropContainer.exit(this),this._conditionallyInsertAnchor(o,this._dropContainer,l),this._dropContainer=o,this._dropContainer.enter(this,t,e,o===this._initialContainer&&o.sortingDisabled?this._initialIndex:void 0),this.entered.next({item:this,container:o,currentIndex:o.getItemIndex(this)});}),this.isDragging()&&(this._dropContainer._startScrollingIfNecessary(i,n),this._dropContainer._sortItem(this,t,e,this._pointerDirectionDelta),this.constrainPosition?this._applyPreviewTransform(t,e):this._applyPreviewTransform(t-this._pickupPositionInElement.x,e-this._pickupPositionInElement.y));}_animatePreviewToPlaceholder(){if(!this._hasMoved)return Promise.resolve();let t=this._placeholder.getBoundingClientRect();this._preview.addClass("cdk-drag-animating"),this._applyPreviewTransform(t.left,t.top);let e=this._preview.getTransitionDuration();return e===0?Promise.resolve():this._ngZone.runOutsideAngular(()=>new Promise(i=>{let n=l=>{(!l||this._preview&&ht(l)===this._preview.element&&l.propertyName==="transform")&&(r(),i(),clearTimeout(o));},o=setTimeout(n,e*1.5),r=this._preview.addEventListener("transitionend",n);}))}_createPlaceholderElement(){let t=this._placeholderTemplate,e=t?t.template:null,i;return e?(this._placeholderRef=t.viewContainer.createEmbeddedView(e,t.context),this._placeholderRef.detectChanges(),i=Yn(this._placeholderRef,this._document)):i=Bt(this._rootElement),i.style.pointerEvents="none",i.classList.add(Un),i}_getPointerPositionInElement(t,e,i){let n=e===this._rootElement?null:e,o=n?n.getBoundingClientRect():t,r=Ae(i)?i.targetTouches[0]:i,l=this._getViewportScrollPosition(),p=r.pageX-o.left-l.left,_=r.pageY-o.top-l.top;return {x:o.left-t.left+p,y:o.top-t.top+_}}_getPointerPositionOnPage(t){let e=this._getViewportScrollPosition(),i=Ae(t)?t.touches[0]||t.changedTouches[0]||{pageX:0,pageY:0}:t,n=i.pageX-e.left,o=i.pageY-e.top;if(this._ownerSVGElement){let r=this._ownerSVGElement.getScreenCTM();if(r){let l=this._ownerSVGElement.createSVGPoint();return l.x=n,l.y=o,l.matrixTransform(r.inverse())}}return {x:n,y:o}}_getConstrainedPointerPosition(t){let e=this._dropContainer?this._dropContainer.lockAxis:null,{x:i,y:n}=this.constrainPosition?this.constrainPosition(t,this,this._initialDomRect,this._pickupPositionInElement):t;if(this.lockAxis==="x"||e==="x"?n=this._pickupPositionOnPage.y-(this.constrainPosition?this._pickupPositionInElement.y:0):(this.lockAxis==="y"||e==="y")&&(i=this._pickupPositionOnPage.x-(this.constrainPosition?this._pickupPositionInElement.x:0)),this._boundaryRect){let{x:o,y:r}=this.constrainPosition?{x:0,y:0}:this._pickupPositionInElement,l=this._boundaryRect,{width:p,height:_}=this._getPreviewRect(),b=l.top+r,M=l.bottom-(_-r),S=l.left+o,X=l.right-(p-o);i=Qn(i,S,X),n=Qn(n,b,M);}return {x:i,y:n}}_updatePointerDirectionDelta(t){let{x:e,y:i}=t,n=this._pointerDirectionDelta,o=this._pointerPositionAtLastDirectionChange,r=Math.abs(e-o.x),l=Math.abs(i-o.y);return r>this._config.pointerDirectionChangeThreshold&&(n.x=e>o.x?1:-1,o.x=e),l>this._config.pointerDirectionChangeThreshold&&(n.y=i>o.y?1:-1,o.y=i),n}_toggleNativeDragInteractions(){if(!this._rootElement||!this._handles)return;let t=this._handles.length>0||!this.isDragging();t!==this._nativeInteractionsEnabled&&(this._nativeInteractionsEnabled=t,we(this._rootElement,t));}_removeRootElementListeners(){this._rootElementCleanups?.forEach(t=>t()),this._rootElementCleanups=void 0;}_applyRootElementTransform(t,e){let i=1/this.scale,n=Ne(t*i,e*i),o=this._rootElement.style;this._initialTransform==null&&(this._initialTransform=o.transform&&o.transform!="none"?o.transform:""),o.transform=_t(n,this._initialTransform);}_applyPreviewTransform(t,e){let i=this._previewTemplate?.template?void 0:this._initialTransform,n=Ne(t,e);this._preview.setTransform(_t(n,i));}_getDragDistance(t){let e=this._pickupPositionOnPage;return e?{x:t.x-e.x,y:t.y-e.y}:{x:0,y:0}}_cleanupCachedDimensions(){this._boundaryRect=this._previewRect=void 0,this._parentPositions.clear();}_containInsideBoundaryOnResize(){let{x:t,y:e}=this._passiveTransform;if(t===0&&e===0||this.isDragging()||!this._boundaryElement)return;let i=this._rootElement.getBoundingClientRect(),n=this._boundaryElement.getBoundingClientRect();if(n.width===0&&n.height===0||i.width===0&&i.height===0)return;let o=n.left-i.left,r=i.right-n.right,l=n.top-i.top,p=i.bottom-n.bottom;n.width>i.width?(o>0&&(t+=o),r>0&&(t-=r)):t=0,n.height>i.height?(l>0&&(e+=l),p>0&&(e-=p)):e=0,(t!==this._passiveTransform.x||e!==this._passiveTransform.y)&&this.setFreeDragPosition({y:e,x:t});}_getDragStartDelay(t){let e=this.dragStartDelay;return typeof e=="number"?e:Ae(t)?e.touch:e?e.mouse:0}_updateOnScroll(t){let e=this._parentPositions.handleScroll(t);if(e){let i=ht(t);this._boundaryRect&&i!==this._boundaryElement&&i.contains(this._boundaryElement)&&Be(this._boundaryRect,e.top,e.left),this._pickupPositionOnPage.x+=e.left,this._pickupPositionOnPage.y+=e.top,this._dropContainer||(this._activeTransform.x-=e.left,this._activeTransform.y-=e.top,this._applyRootElementTransform(this._activeTransform.x,this._activeTransform.y));}}_getViewportScrollPosition(){return this._parentPositions.positions.get(this._document)?.scrollPosition||this._parentPositions.getViewportScrollPosition()}_getShadowRoot(){return this._cachedShadowRoot===void 0&&(this._cachedShadowRoot=Ah(this._rootElement)),this._cachedShadowRoot}_getPreviewInsertionPoint(t,e){let i=this._previewContainer||"global";if(i==="parent")return t;if(i==="global"){let n=this._document;return e||n.fullscreenElement||n.webkitFullscreenElement||n.mozFullScreenElement||n.msFullscreenElement||n.body}return Pt(i)}_getPreviewRect(){return (!this._previewRect||!this._previewRect.width&&!this._previewRect.height)&&(this._previewRect=this._preview?this._preview.getBoundingClientRect():this._initialDomRect),this._previewRect}_nativeDragStart=t=>{if(this._handles.length){let e=this._getTargetHandle(t);e&&!this._disabledHandles.has(e)&&!this.disabled&&t.preventDefault();}else this.disabled||t.preventDefault();};_getTargetHandle(t){return this._handles.find(e=>t.target&&(t.target===e||e.contains(t.target)))}_conditionallyInsertAnchor(t,e,i){if(t===this._initialContainer)this._anchor?.remove(),this._anchor=null;else if(e===this._initialContainer&&e.hasAnchor){let n=this._anchor??=Bt(this._placeholder);n.classList.remove(Un),n.classList.add("cdk-drag-anchor"),n.style.transform="",i?i.before(n):Pt(e.element).appendChild(n);}}};function Qn(a,t,e){return Math.max(t,Math.min(e,a))}function Ae(a){return a.type[0]==="t"}function Fa(a){a.preventDefault();}function Jn(a,t,e){let i=Wn(t,a.length-1),n=Wn(e,a.length-1);if(i===n)return;let o=a[i],r=n<i?-1:1;for(let l=i;l!==n;l+=r)a[l]=a[l+r];a[n]=o;}function Wn(a,t){return Math.max(0,Math.min(t,a))}var ft=class{_dragDropRegistry;_element;_sortPredicate;_itemPositions=[];_activeDraggables;orientation="vertical";direction="ltr";constructor(t){this._dragDropRegistry=t;}_previousSwap={drag:null,delta:0,overlaps:false};start(t){this.withItems(t);}sort(t,e,i,n){let o=this._itemPositions,r=this._getItemIndexFromPointerPosition(t,e,i,n);if(r===-1&&o.length>0)return null;let l=this.orientation==="horizontal",p=o.findIndex(G=>G.drag===t),_=o[r],b=o[p].clientRect,M=_.clientRect,S=p>r?1:-1,X=this._getItemOffsetPx(b,M,S),Se=this._getSiblingOffsetPx(p,o,S),De=o.slice();return Jn(o,p,r),o.forEach((G,Sa)=>{if(De[Sa]===G)return;let ei=G.drag===t,yt=ei?X:Se,ti=ei?t.getPlaceholderElement():G.drag.getRootElement();G.offset+=yt;let ii=Math.round(G.offset*(1/G.drag.scale));l?(ti.style.transform=_t(`translate3d(${ii}px, 0, 0)`,G.initialTransform),Be(G.clientRect,0,yt)):(ti.style.transform=_t(`translate3d(0, ${ii}px, 0)`,G.initialTransform),Be(G.clientRect,yt,0));}),this._previousSwap.overlaps=Nt(M,e,i),this._previousSwap.drag=_.drag,this._previousSwap.delta=l?n.x:n.y,{previousIndex:p,currentIndex:r}}enter(t,e,i,n){let o=this._activeDraggables,r=o.indexOf(t),l=t.getPlaceholderElement();r>-1&&o.splice(r,1);let p=n==null||n<0?this._getItemIndexFromPointerPosition(t,e,i):n,_=o[p];if(_===t&&(_=o[p+1]),!_&&(p==null||p===-1||p<o.length-1)&&this._shouldEnterAsFirstChild(e,i)&&(_=o[0]),_&&!this._dragDropRegistry.isDragging(_)){let b=_.getRootElement();b.parentElement.insertBefore(l,b),o.splice(p,0,t);}else this._element.appendChild(l),o.push(t);l.style.transform="",this._cacheItemPositions();}withItems(t){this._activeDraggables=t.slice(),this._cacheItemPositions();}withSortPredicate(t){this._sortPredicate=t;}reset(){this._activeDraggables?.forEach(t=>{let e=t.getRootElement();if(e){let i=this._itemPositions.find(n=>n.drag===t)?.initialTransform;e.style.transform=i||"";}}),this._itemPositions=[],this._activeDraggables=[],this._previousSwap.drag=null,this._previousSwap.delta=0,this._previousSwap.overlaps=false;}getActiveItemsSnapshot(){return this._activeDraggables}getItemIndex(t){return this._getVisualItemPositions().findIndex(e=>e.drag===t)}getItemAtIndex(t){return this._getVisualItemPositions()[t]?.drag||null}updateOnScroll(t,e){this._itemPositions.forEach(({clientRect:i})=>{Be(i,t,e);}),this._itemPositions.forEach(({drag:i})=>{this._dragDropRegistry.isDragging(i)&&i._sortFromLastPointerPosition();});}withElementContainer(t){this._element=t;}_cacheItemPositions(){let t=this.orientation==="horizontal";this._itemPositions=this._activeDraggables.map(e=>{let i=e.getVisibleElement();return {drag:e,offset:0,initialTransform:i.style.transform||"",clientRect:qt(i)}}).sort((e,i)=>t?e.clientRect.left-i.clientRect.left:e.clientRect.top-i.clientRect.top);}_getVisualItemPositions(){return this.orientation==="horizontal"&&this.direction==="rtl"?this._itemPositions.slice().reverse():this._itemPositions}_getItemOffsetPx(t,e,i){let n=this.orientation==="horizontal",o=n?e.left-t.left:e.top-t.top;return i===-1&&(o+=n?e.width-t.width:e.height-t.height),o}_getSiblingOffsetPx(t,e,i){let n=this.orientation==="horizontal",o=e[t].clientRect,r=e[t+i*-1],l=o[n?"width":"height"]*i;if(r){let p=n?"left":"top",_=n?"right":"bottom";i===-1?l-=r.clientRect[p]-o[_]:l+=o[p]-r.clientRect[_];}return l}_shouldEnterAsFirstChild(t,e){if(!this._activeDraggables.length)return  false;let i=this._itemPositions,n=this.orientation==="horizontal";if(i[0].drag!==this._activeDraggables[0]){let r=i[i.length-1].clientRect;return n?t>=r.right:e>=r.bottom}else {let r=i[0].clientRect;return n?t<=r.left:e<=r.top}}_getItemIndexFromPointerPosition(t,e,i,n){let o=this.orientation==="horizontal",r=this._itemPositions.findIndex(({drag:l,clientRect:p})=>{if(l===t)return  false;if(n){let _=o?n.x:n.y;if(l===this._previousSwap.drag&&this._previousSwap.overlaps&&_===this._previousSwap.delta)return  false}return o?e>=Math.floor(p.left)&&e<Math.floor(p.right):i>=Math.floor(p.top)&&i<Math.floor(p.bottom)});return r===-1||!this._sortPredicate(r,t)?-1:r}},zt=class{_document;_dragDropRegistry;_element;_sortPredicate;_rootNode;_activeItems;_previousSwap={drag:null,deltaX:0,deltaY:0,overlaps:false};_relatedNodes=[];constructor(t,e){this._document=t,this._dragDropRegistry=e;}start(t){let e=this._element.childNodes;this._relatedNodes=[];for(let i=0;i<e.length;i++){let n=e[i];this._relatedNodes.push([n,n.nextSibling]);}this.withItems(t);}sort(t,e,i,n){let o=this._getItemIndexFromPointerPosition(t,e,i),r=this._previousSwap;if(o===-1||this._activeItems[o]===t)return null;let l=this._activeItems[o];if(r.drag===l&&r.overlaps&&r.deltaX===n.x&&r.deltaY===n.y)return null;let p=this.getItemIndex(t),_=t.getPlaceholderElement(),b=l.getRootElement();o>p?b.after(_):b.before(_),Jn(this._activeItems,p,o);let M=this._getRootNode().elementFromPoint(e,i);return r.deltaX=n.x,r.deltaY=n.y,r.drag=l,r.overlaps=b===M||b.contains(M),{previousIndex:p,currentIndex:o}}enter(t,e,i,n){let o=this._activeItems.indexOf(t);o>-1&&this._activeItems.splice(o,1);let r=n==null||n<0?this._getItemIndexFromPointerPosition(t,e,i):n;r===-1&&(r=this._getClosestItemIndexToPointer(t,e,i));let l=this._activeItems[r];l&&!this._dragDropRegistry.isDragging(l)?(this._activeItems.splice(r,0,t),l.getRootElement().before(t.getPlaceholderElement())):(this._activeItems.push(t),this._element.appendChild(t.getPlaceholderElement()));}withItems(t){this._activeItems=t.slice();}withSortPredicate(t){this._sortPredicate=t;}reset(){let t=this._element,e=this._previousSwap;for(let i=this._relatedNodes.length-1;i>-1;i--){let[n,o]=this._relatedNodes[i];n.parentNode===t&&n.nextSibling!==o&&(o===null?t.appendChild(n):o.parentNode===t&&t.insertBefore(n,o));}this._relatedNodes=[],this._activeItems=[],e.drag=null,e.deltaX=e.deltaY=0,e.overlaps=false;}getActiveItemsSnapshot(){return this._activeItems}getItemIndex(t){return this._activeItems.indexOf(t)}getItemAtIndex(t){return this._activeItems[t]||null}updateOnScroll(){this._activeItems.forEach(t=>{this._dragDropRegistry.isDragging(t)&&t._sortFromLastPointerPosition();});}withElementContainer(t){t!==this._element&&(this._element=t,this._rootNode=void 0);}_getItemIndexFromPointerPosition(t,e,i){let n=this._getRootNode().elementFromPoint(Math.floor(e),Math.floor(i)),o=n?this._activeItems.findIndex(r=>{let l=r.getRootElement();return n===l||l.contains(n)}):-1;return o===-1||!this._sortPredicate(o,t)?-1:o}_getRootNode(){return this._rootNode||(this._rootNode=Ah(this._element)||this._document),this._rootNode}_getClosestItemIndexToPointer(t,e,i){if(this._activeItems.length===0)return  -1;if(this._activeItems.length===1)return 0;let n=1/0,o=-1;for(let r=0;r<this._activeItems.length;r++){let l=this._activeItems[r];if(l!==t){let{x:p,y:_}=l.getRootElement().getBoundingClientRect(),b=Math.hypot(e-p,i-_);b<n&&(n=b,o=r);}}return o}},Kn=.05,ea=.05,$=(function(a){return a[a.NONE=0]="NONE",a[a.UP=1]="UP",a[a.DOWN=2]="DOWN",a})($||{}),H=(function(a){return a[a.NONE=0]="NONE",a[a.LEFT=1]="LEFT",a[a.RIGHT=2]="RIGHT",a})(H||{});function ta(a,t){return new Ht(t,a.get(Ut),a.get(L),a.get(H$1),a.get(tt))}var Ht=class{_dragDropRegistry;_ngZone;_viewportRuler;element;disabled=false;sortingDisabled=false;lockAxis=null;autoScrollDisabled=false;autoScrollStep=2;hasAnchor=false;enterPredicate=()=>true;sortPredicate=()=>true;beforeStarted=new U;entered=new U;exited=new U;dropped=new U;sorted=new U;receivingStarted=new U;receivingStopped=new U;data;_container;_isDragging=false;_parentPositions;_sortStrategy;_domRect;_draggables=[];_siblings=[];_activeSiblings=new Set;_viewportScrollSubscription=ee.EMPTY;_verticalScrollDirection=$.NONE;_horizontalScrollDirection=H.NONE;_scrollNode;_stopScrollTimers=new U;_cachedShadowRoot=null;_document;_scrollableElements=[];_initialScrollSnap;_direction="ltr";constructor(t,e,i,n,o){this._dragDropRegistry=e,this._ngZone=n,this._viewportRuler=o;let r=this.element=Pt(t);this._document=i,this.withOrientation("vertical").withElementContainer(r),e.registerDropContainer(this),this._parentPositions=new gt(i);}dispose(){this._stopScrolling(),this._stopScrollTimers.complete(),this._viewportScrollSubscription.unsubscribe(),this.beforeStarted.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this.sorted.complete(),this.receivingStarted.complete(),this.receivingStopped.complete(),this._activeSiblings.clear(),this._scrollNode=null,this._parentPositions.clear(),this._dragDropRegistry.removeDropContainer(this);}isDragging(){return this._isDragging}start(){this._draggingStarted(),this._notifyReceivingSiblings();}enter(t,e,i,n){this._draggingStarted(),n==null&&this.sortingDisabled&&(n=this._draggables.indexOf(t)),this._sortStrategy.enter(t,e,i,n),this._cacheParentPositions(),this._notifyReceivingSiblings(),this.entered.next({item:t,container:this,currentIndex:this.getItemIndex(t)});}exit(t){this._reset(),this.exited.next({item:t,container:this});}drop(t,e,i,n,o,r,l,p){this._reset(),this.dropped.next({item:t,currentIndex:e,previousIndex:i,container:this,previousContainer:n,isPointerOverContainer:o,distance:r,dropPoint:l,event:p});}withItems(t){let e=this._draggables;return this._draggables=t,t.forEach(i=>i._withDropContainer(this)),this.isDragging()&&(e.filter(n=>n.isDragging()).every(n=>t.indexOf(n)===-1)?this._reset():this._sortStrategy.withItems(this._draggables)),this}withDirection(t){return this._direction=t,this._sortStrategy instanceof ft&&(this._sortStrategy.direction=t),this}connectedTo(t){return this._siblings=t.slice(),this}withOrientation(t){if(t==="mixed")this._sortStrategy=new zt(this._document,this._dragDropRegistry);else {let e=new ft(this._dragDropRegistry);e.direction=this._direction,e.orientation=t,this._sortStrategy=e;}return this._sortStrategy.withElementContainer(this._container),this._sortStrategy.withSortPredicate((e,i)=>this.sortPredicate(e,i,this)),this}withScrollableParents(t){let e=this._container;return this._scrollableElements=t.indexOf(e)===-1?[e,...t]:t.slice(),this}withElementContainer(t){if(t===this._container)return this;Pt(this.element);let i=this._scrollableElements.indexOf(this._container),n=this._scrollableElements.indexOf(t);return i>-1&&this._scrollableElements.splice(i,1),n>-1&&this._scrollableElements.splice(n,1),this._sortStrategy&&this._sortStrategy.withElementContainer(t),this._cachedShadowRoot=null,this._scrollableElements.unshift(t),this._container=t,this}getScrollableParents(){return this._scrollableElements}getItemIndex(t){return this._isDragging?this._sortStrategy.getItemIndex(t):this._draggables.indexOf(t)}getItemAtIndex(t){return this._isDragging?this._sortStrategy.getItemAtIndex(t):this._draggables[t]||null}isReceiving(){return this._activeSiblings.size>0}_sortItem(t,e,i,n){if(this.sortingDisabled||!this._domRect||!Vn(this._domRect,Kn,e,i))return;let o=this._sortStrategy.sort(t,e,i,n);o&&this.sorted.next({previousIndex:o.previousIndex,currentIndex:o.currentIndex,container:this,item:t});}_startScrollingIfNecessary(t,e){if(this.autoScrollDisabled)return;let i,n=$.NONE,o=H.NONE;if(this._parentPositions.positions.forEach((r,l)=>{l===this._document||!r.clientRect||i||Vn(r.clientRect,Kn,t,e)&&([n,o]=Aa(l,r.clientRect,this._direction,t,e),(n||o)&&(i=l));}),!n&&!o){let{width:r,height:l}=this._viewportRuler.getViewportSize(),p={width:r,height:l,top:0,right:r,bottom:l,left:0};n=ia(p,e),o=na(p,t),i=window;}i&&(n!==this._verticalScrollDirection||o!==this._horizontalScrollDirection||i!==this._scrollNode)&&(this._verticalScrollDirection=n,this._horizontalScrollDirection=o,this._scrollNode=i,(n||o)&&i?this._ngZone.runOutsideAngular(this._startScrollInterval):this._stopScrolling());}_stopScrolling(){this._stopScrollTimers.next();}_draggingStarted(){let t=this._container.style;this.beforeStarted.next(),this._isDragging=true,this._initialScrollSnap=t.msScrollSnapType||t.scrollSnapType||"",t.scrollSnapType=t.msScrollSnapType="none",this._sortStrategy.start(this._draggables),this._cacheParentPositions(),this._viewportScrollSubscription.unsubscribe(),this._listenToScrollEvents();}_cacheParentPositions(){this._parentPositions.cache(this._scrollableElements),this._domRect=this._parentPositions.positions.get(this._container).clientRect;}_reset(){this._isDragging=false;let t=this._container.style;t.scrollSnapType=t.msScrollSnapType=this._initialScrollSnap,this._siblings.forEach(e=>e._stopReceiving(this)),this._sortStrategy.reset(),this._stopScrolling(),this._viewportScrollSubscription.unsubscribe(),this._parentPositions.clear();}_startScrollInterval=()=>{this._stopScrolling(),C_(0,c_).pipe(Bt$2(this._stopScrollTimers)).subscribe(()=>{let t=this._scrollNode,e=this.autoScrollStep;this._verticalScrollDirection===$.UP?t.scrollBy(0,-e):this._verticalScrollDirection===$.DOWN&&t.scrollBy(0,e),this._horizontalScrollDirection===H.LEFT?t.scrollBy(-e,0):this._horizontalScrollDirection===H.RIGHT&&t.scrollBy(e,0);});};_isOverContainer(t,e){return this._domRect!=null&&Nt(this._domRect,t,e)}_getSiblingContainerFromPosition(t,e,i){return this._siblings.find(n=>n._canReceive(t,e,i))}_canReceive(t,e,i){if(!this._domRect||!Nt(this._domRect,e,i)||!this.enterPredicate(t,this))return  false;let n=this._getShadowRoot().elementFromPoint(e,i);return n?n===this._container||this._container.contains(n):false}_startReceiving(t,e){let i=this._activeSiblings;!i.has(t)&&e.every(n=>this.enterPredicate(n,this)||this._draggables.indexOf(n)>-1)&&(i.add(t),this._cacheParentPositions(),this._listenToScrollEvents(),this.receivingStarted.next({initiator:t,receiver:this,items:e}));}_stopReceiving(t){this._activeSiblings.delete(t),this._viewportScrollSubscription.unsubscribe(),this.receivingStopped.next({initiator:t,receiver:this});}_listenToScrollEvents(){this._viewportScrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(t=>{if(this.isDragging()){let e=this._parentPositions.handleScroll(t);e&&this._sortStrategy.updateOnScroll(e.top,e.left);}else this.isReceiving()&&this._cacheParentPositions();});}_getShadowRoot(){if(!this._cachedShadowRoot){let t=Ah(this._container);this._cachedShadowRoot=t||this._document;}return this._cachedShadowRoot}_notifyReceivingSiblings(){let t=this._sortStrategy.getActiveItemsSnapshot().filter(e=>e.isDragging());this._siblings.forEach(e=>e._startReceiving(this,t));}};function ia(a,t){let{top:e,bottom:i,height:n}=a,o=n*ea;return t>=e-o&&t<=e+o?$.UP:t>=i-o&&t<=i+o?$.DOWN:$.NONE}function na(a,t){let{left:e,right:i,width:n}=a,o=n*ea;return t>=e-o&&t<=e+o?H.LEFT:t>=i-o&&t<=i+o?H.RIGHT:H.NONE}function Aa(a,t,e,i,n){let o=ia(t,n),r=na(t,i),l=$.NONE,p=H.NONE;if(o){let _=a.scrollTop;o===$.UP?_>0&&(l=$.UP):a.scrollHeight-_>a.clientHeight&&(l=$.DOWN);}if(r){let _=a.scrollLeft;e==="rtl"?r===H.RIGHT?_<0&&(p=H.RIGHT):a.scrollWidth+_>a.clientWidth&&(p=H.LEFT):r===H.LEFT?_>0&&(p=H.LEFT):a.scrollWidth-_>a.clientWidth&&(p=H.RIGHT);}return [l,p]}var Ba=(()=>{class a{_injector=f(X);createDrag(e,i){return Xn(this._injector,e,i)}createDropList(e){return ta(this._injector,e)}static \u0275fac=function(i){return new(i||a)};static \u0275prov=b$1({token:a,factory:a.\u0275fac})}return a})(),Zn=new y("CDK_DRAG_PARENT");var Na=new y("CdkDragHandle");var aa=new y("CDK_DRAG_CONFIG"),oa=new y("CdkDropList"),ra=(()=>{class a{element=f(ge);dropContainer=f(oa,{optional:true,skipSelf:true});_ngZone=f(H$1);_viewContainerRef=f(wn);_dir=f(fR,{optional:true});_changeDetectorRef=f(bi);_selfHandle=f(Na,{optional:true,self:true});_parentDrag=f(Zn,{optional:true,skipSelf:true});_dragDropRegistry=f(Ut);_destroyed=new U;_handles=new de([]);_previewTemplate=null;_placeholderTemplate=null;_dragRef;data;lockAxis=null;rootElementSelector;boundaryElement;dragStartDelay;freeDragPosition;get disabled(){return this._disabled||!!(this.dropContainer&&this.dropContainer.disabled)}set disabled(e){this._disabled=e,this._dragRef.disabled=this._disabled;}_disabled=false;constrainPosition;previewClass;previewContainer;scale=1;started=new re;released=new re;ended=new re;entered=new re;exited=new re;dropped=new re;moved=new x(e=>{let i=this._dragRef.moved.pipe(F(n=>({source:this,pointerPosition:n.pointerPosition,event:n.event,delta:n.delta,distance:n.distance}))).subscribe(e);return ()=>{i.unsubscribe();}});_injector=f(X);constructor(){let e=this.dropContainer,i=f(aa,{optional:true});this._dragRef=Xn(this._injector,this.element,{dragStartThreshold:i&&i.dragStartThreshold!=null?i.dragStartThreshold:5,pointerDirectionChangeThreshold:i&&i.pointerDirectionChangeThreshold!=null?i.pointerDirectionChangeThreshold:5,zIndex:i?.zIndex}),this._dragRef.data=this,this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement,this),i&&this._assignDefaults(i),e&&(e.addItem(this),e._dropListRef.beforeStarted.pipe(Bt$2(this._destroyed)).subscribe(()=>{this._dragRef.scale=this.scale;})),this._syncInputs(this._dragRef),this._handleEvents(this._dragRef);}getPlaceholderElement(){return this._dragRef.getPlaceholderElement()}getRootElement(){return this._dragRef.getRootElement()}reset(){this._dragRef.reset();}resetToBoundary(){this._dragRef.resetToBoundary();}getFreeDragPosition(){return this._dragRef.getFreeDragPosition()}setFreeDragPosition(e){this._dragRef.setFreeDragPosition(e);}ngAfterViewInit(){pi(()=>{this._updateRootElement(),this._setupHandlesListener(),this._dragRef.scale=this.scale,this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);},{injector:this._injector});}ngOnChanges(e){let i=e.rootElementSelector,n=e.freeDragPosition;i&&!i.firstChange&&this._updateRootElement(),this._dragRef.scale=this.scale,n&&!n.firstChange&&this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);}ngOnDestroy(){this.dropContainer&&this.dropContainer.removeItem(this),this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement),this._ngZone.runOutsideAngular(()=>{this._handles.complete(),this._destroyed.next(),this._destroyed.complete(),this._dragRef.dispose();});}_addHandle(e){let i=this._handles.getValue();i.push(e),this._handles.next(i);}_removeHandle(e){let i=this._handles.getValue(),n=i.indexOf(e);n>-1&&(i.splice(n,1),this._handles.next(i));}_setPreviewTemplate(e){this._previewTemplate=e;}_resetPreviewTemplate(e){e===this._previewTemplate&&(this._previewTemplate=null);}_setPlaceholderTemplate(e){this._placeholderTemplate=e;}_resetPlaceholderTemplate(e){e===this._placeholderTemplate&&(this._placeholderTemplate=null);}_updateRootElement(){let e=this.element.nativeElement,i=e;this.rootElementSelector&&(i=e.closest!==void 0?e.closest(this.rootElementSelector):e.parentElement?.closest(this.rootElementSelector)),this._dragRef.withRootElement(i||e);}_getBoundaryElement(){let e=this.boundaryElement;return e?typeof e=="string"?this.element.nativeElement.closest(e):Pt(e):null}_syncInputs(e){e.beforeStarted.subscribe(()=>{if(!e.isDragging()){let i=this._dir,n=this.dragStartDelay,o=this._placeholderTemplate?{template:this._placeholderTemplate.templateRef,context:this._placeholderTemplate.data,viewContainer:this._viewContainerRef}:null,r=this._previewTemplate?{template:this._previewTemplate.templateRef,context:this._previewTemplate.data,matchSize:this._previewTemplate.matchSize,viewContainer:this._viewContainerRef}:null;e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.scale=this.scale,e.dragStartDelay=typeof n=="object"&&n?n:Rh(n),e.constrainPosition=this.constrainPosition,e.previewClass=this.previewClass,e.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(o).withPreviewTemplate(r).withPreviewContainer(this.previewContainer||"global"),i&&e.withDirection(i.value);}}),e.beforeStarted.pipe(Re(1)).subscribe(()=>{if(this._parentDrag){e.withParent(this._parentDrag._dragRef);return}let i=this.element.nativeElement.parentElement;for(;i;){let n=this._dragDropRegistry.getDragDirectiveForNode(i);if(n){e.withParent(n._dragRef);break}i=i.parentElement;}});}_handleEvents(e){e.started.subscribe(i=>{this.started.emit({source:this,event:i.event}),this._changeDetectorRef.markForCheck();}),e.released.subscribe(i=>{this.released.emit({source:this,event:i.event});}),e.ended.subscribe(i=>{this.ended.emit({source:this,distance:i.distance,dropPoint:i.dropPoint,event:i.event}),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(i=>{this.entered.emit({container:i.container.data,item:this,currentIndex:i.currentIndex});}),e.exited.subscribe(i=>{this.exited.emit({container:i.container.data,item:this});}),e.dropped.subscribe(i=>{this.dropped.emit({previousIndex:i.previousIndex,currentIndex:i.currentIndex,previousContainer:i.previousContainer.data,container:i.container.data,isPointerOverContainer:i.isPointerOverContainer,item:this,distance:i.distance,dropPoint:i.dropPoint,event:i.event});});}_assignDefaults(e){let{lockAxis:i,dragStartDelay:n,constrainPosition:o,previewClass:r,boundaryElement:l,draggingDisabled:p,rootElementSelector:_,previewContainer:b}=e;this.disabled=p??false,this.dragStartDelay=n||0,this.lockAxis=i||null,o&&(this.constrainPosition=o),r&&(this.previewClass=r),l&&(this.boundaryElement=l),_&&(this.rootElementSelector=_),b&&(this.previewContainer=b);}_setupHandlesListener(){this._handles.pipe(xe(e=>{let i=e.map(n=>n.element);this._selfHandle&&this.rootElementSelector&&i.push(this.element),this._dragRef.withHandles(i);}),Fe$1(e=>T_(...e.map(i=>i._stateChanges.pipe(Oo$1(i))))),Bt$2(this._destroyed)).subscribe(e=>{let i=this._dragRef,n=e.element.nativeElement;e.disabled?i.disableHandle(n):i.enableHandle(n);});}static \u0275fac=function(i){return new(i||a)};static \u0275dir=De({type:a,selectors:[["","cdkDrag",""]],hostAttrs:[1,"cdk-drag"],hostVars:4,hostBindings:function(i,n){i&2&&nc("cdk-drag-disabled",n.disabled)("cdk-drag-dragging",n._dragRef.isDragging());},inputs:{data:[0,"cdkDragData","data"],lockAxis:[0,"cdkDragLockAxis","lockAxis"],rootElementSelector:[0,"cdkDragRootElement","rootElementSelector"],boundaryElement:[0,"cdkDragBoundary","boundaryElement"],dragStartDelay:[0,"cdkDragStartDelay","dragStartDelay"],freeDragPosition:[0,"cdkDragFreeDragPosition","freeDragPosition"],disabled:[2,"cdkDragDisabled","disabled",Xt$1],constrainPosition:[0,"cdkDragConstrainPosition","constrainPosition"],previewClass:[0,"cdkDragPreviewClass","previewClass"],previewContainer:[0,"cdkDragPreviewContainer","previewContainer"],scale:[2,"cdkDragScale","scale",f2]},outputs:{started:"cdkDragStarted",released:"cdkDragReleased",ended:"cdkDragEnded",entered:"cdkDragEntered",exited:"cdkDragExited",dropped:"cdkDragDropped",moved:"cdkDragMoved"},exportAs:["cdkDrag"],features:[Ly([{provide:Zn,useExisting:a}]),At$1]})}return a})(),Gt=new y("CdkDropListGroup"),sa=(()=>{class a{_items=new Set;disabled=false;ngOnDestroy(){this._items.clear();}static \u0275fac=function(i){return new(i||a)};static \u0275dir=De({type:a,selectors:[["","cdkDropListGroup",""]],inputs:{disabled:[2,"cdkDropListGroupDisabled","disabled",Xt$1]},exportAs:["cdkDropListGroup"],features:[Ly([{provide:Gt,useExisting:a}])]})}return a})(),ca=(()=>{class a{element=f(ge);_changeDetectorRef=f(bi);_scrollDispatcher=f(ct);_dir=f(fR,{optional:true});_group=f(Gt,{optional:true,skipSelf:true});_latestSortedRefs;_destroyed=new U;_scrollableParentsResolved=false;static _dropLists=[];_dropListRef;connectedTo=[];data;orientation="vertical";id=f(Lh).getId("cdk-drop-list-");lockAxis=null;get disabled(){return this._disabled||!!this._group&&this._group.disabled}set disabled(e){this._dropListRef.disabled=this._disabled=e;}_disabled=false;sortingDisabled=false;enterPredicate=()=>true;sortPredicate=()=>true;autoScrollDisabled=false;autoScrollStep;elementContainerSelector=null;hasAnchor=false;dropped=new re;entered=new re;exited=new re;sorted=new re;_unsortedItems=new Set;constructor(){let e=f(aa,{optional:true}),i=f(X);this._dropListRef=ta(i,this.element),this._dropListRef.data=this,e&&this._assignDefaults(e),this._dropListRef.enterPredicate=(n,o)=>this.enterPredicate(n.data,o.data),this._dropListRef.sortPredicate=(n,o,r)=>this.sortPredicate(n,o.data,r.data),this._setupInputSyncSubscription(this._dropListRef),this._handleEvents(this._dropListRef),a._dropLists.push(this),this._group&&this._group._items.add(this);}addItem(e){this._unsortedItems.add(e),e._dragRef._withDropContainer(this._dropListRef),this._dropListRef.isDragging()&&this._syncItemsWithRef(this.getSortedItems().map(i=>i._dragRef));}removeItem(e){if(this._unsortedItems.delete(e),this._latestSortedRefs){let i=this._latestSortedRefs.indexOf(e._dragRef);i>-1&&(this._latestSortedRefs.splice(i,1),this._syncItemsWithRef(this._latestSortedRefs));}}getSortedItems(){return Array.from(this._unsortedItems).sort((e,i)=>e._dragRef.getVisibleElement().compareDocumentPosition(i._dragRef.getVisibleElement())&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}ngOnDestroy(){let e=a._dropLists.indexOf(this);e>-1&&a._dropLists.splice(e,1),this._group&&this._group._items.delete(this),this._latestSortedRefs=void 0,this._unsortedItems.clear(),this._dropListRef.dispose(),this._destroyed.next(),this._destroyed.complete();}_setupInputSyncSubscription(e){this._dir&&this._dir.change.pipe(Oo$1(this._dir.value),Bt$2(this._destroyed)).subscribe(i=>e.withDirection(i)),e.beforeStarted.subscribe(()=>{let i=Zc(this.connectedTo).map(n=>{if(typeof n=="string"){let o=a._dropLists.find(r=>r.id===n);return o}return n});if(this._group&&this._group._items.forEach(n=>{i.indexOf(n)===-1&&i.push(n);}),!this._scrollableParentsResolved){let n=this._scrollDispatcher.getAncestorScrollContainers(this.element).map(o=>o.getElementRef().nativeElement);this._dropListRef.withScrollableParents(n),this._scrollableParentsResolved=true;}if(this.elementContainerSelector){let n=this.element.nativeElement.querySelector(this.elementContainerSelector);e.withElementContainer(n);}e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.sortingDisabled=this.sortingDisabled,e.autoScrollDisabled=this.autoScrollDisabled,e.autoScrollStep=Rh(this.autoScrollStep,2),e.hasAnchor=this.hasAnchor,e.connectedTo(i.filter(n=>n&&n!==this).map(n=>n._dropListRef)).withOrientation(this.orientation);});}_handleEvents(e){e.beforeStarted.subscribe(()=>{this._syncItemsWithRef(this.getSortedItems().map(i=>i._dragRef)),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(i=>{this.entered.emit({container:this,item:i.item.data,currentIndex:i.currentIndex});}),e.exited.subscribe(i=>{this.exited.emit({container:this,item:i.item.data}),this._changeDetectorRef.markForCheck();}),e.sorted.subscribe(i=>{this.sorted.emit({previousIndex:i.previousIndex,currentIndex:i.currentIndex,container:this,item:i.item.data});}),e.dropped.subscribe(i=>{this.dropped.emit({previousIndex:i.previousIndex,currentIndex:i.currentIndex,previousContainer:i.previousContainer.data,container:i.container.data,item:i.item.data,isPointerOverContainer:i.isPointerOverContainer,distance:i.distance,dropPoint:i.dropPoint,event:i.event}),this._changeDetectorRef.markForCheck();}),T_(e.receivingStarted,e.receivingStopped).subscribe(()=>this._changeDetectorRef.markForCheck());}_assignDefaults(e){let{lockAxis:i,draggingDisabled:n,sortingDisabled:o,listAutoScrollDisabled:r,listOrientation:l}=e;this.disabled=n??false,this.sortingDisabled=o??false,this.autoScrollDisabled=r??false,this.orientation=l||"vertical",this.lockAxis=i||null;}_syncItemsWithRef(e){this._latestSortedRefs=e,this._dropListRef.withItems(e);}static \u0275fac=function(i){return new(i||a)};static \u0275dir=De({type:a,selectors:[["","cdkDropList",""],["cdk-drop-list"]],hostAttrs:[1,"cdk-drop-list"],hostVars:7,hostBindings:function(i,n){i&2&&(_i("id",n.id),nc("cdk-drop-list-disabled",n.disabled)("cdk-drop-list-dragging",n._dropListRef.isDragging())("cdk-drop-list-receiving",n._dropListRef.isReceiving()));},inputs:{connectedTo:[0,"cdkDropListConnectedTo","connectedTo"],data:[0,"cdkDropListData","data"],orientation:[0,"cdkDropListOrientation","orientation"],id:"id",lockAxis:[0,"cdkDropListLockAxis","lockAxis"],disabled:[2,"cdkDropListDisabled","disabled",Xt$1],sortingDisabled:[2,"cdkDropListSortingDisabled","sortingDisabled",Xt$1],enterPredicate:[0,"cdkDropListEnterPredicate","enterPredicate"],sortPredicate:[0,"cdkDropListSortPredicate","sortPredicate"],autoScrollDisabled:[2,"cdkDropListAutoScrollDisabled","autoScrollDisabled",Xt$1],autoScrollStep:[0,"cdkDropListAutoScrollStep","autoScrollStep"],elementContainerSelector:[0,"cdkDropListElementContainer","elementContainerSelector"],hasAnchor:[2,"cdkDropListHasAnchor","hasAnchor",Xt$1]},outputs:{dropped:"cdkDropListDropped",entered:"cdkDropListEntered",exited:"cdkDropListExited",sorted:"cdkDropListSorted"},exportAs:["cdkDropList"],features:[Ly([{provide:Gt,useValue:void 0},{provide:oa,useExisting:a}])]})}return a})();var la=(()=>{class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe({providers:[Ba],imports:[Kt$2]})}return a})();var qa=["button"],ja=["*"];function Ua(a,t){if(a&1&&(La(0,"div",2),Ja$1(1,"mat-pseudo-checkbox",6),mf()),a&2){let e=RT();Jw(),uy("disabled",e.disabled);}}var da=new y("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),ha=new y("MatButtonToggleGroup"),$a={provide:_t$3,useExisting:Vs(()=>Qt),multi:true},bt=class{source;value;constructor(t,e){this.source=t,this.value=e;}},Qt=(()=>{class a{_changeDetector=f(bi);_dir=f(fR,{optional:true});_multiple=false;_disabled=false;_disabledInteractive=false;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck();}_name=f(Lh).getId("mat-button-toggle-group-");vertical=false;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value);}valueChange=new re;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck();}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck();}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck();}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new re;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck();}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck();}_hideMultipleSelectionIndicator;constructor(){let e=f(da,{optional:true});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??false,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??false;}ngOnInit(){this._selectionModel=new b(this.multiple,void 0,false);}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex();}writeValue(e){this.value=e,this._changeDetector.markForCheck();}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_keydown(e){if(this.multiple||this.disabled||VE(e))return;let n=e.target.id,o=this._buttonToggles.toArray().findIndex(l=>l.buttonId===n),r=null;switch(e.keyCode){case 32:case 13:r=this._buttonToggles.get(o)||null;break;case 38:r=this._getNextButton(o,-1);break;case 37:r=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:r=this._getNextButton(o,1);break;case 39:r=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}r&&(e.preventDefault(),r._onButtonClick(),r.focus());}_emitChangeEvent(e){let i=new bt(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i);}_syncButtonToggle(e,i,n=false,o=false){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=false),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):o=true,o?Promise.resolve().then(()=>this._updateModelValue(e,n)):this._updateModelValue(e,n);}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?false:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1;}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let n=this._buttonToggles;for(let o=1;o<=n.length;o++){let r=(e+i*o+n.length)%n.length,l=n.get(r);if(l&&!l.disabled)return l}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(this._clearSelection(),e.forEach(n=>this._selectValue(n,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(n=>n.tabIndex===-1)){for(let n of i)if(!n.disabled){n.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=false,this.multiple||(e.tabIndex=-1);});}_selectValue(e,i){for(let n of i)if(n.value===e){n.checked=true,this._selectionModel.select(n),this.multiple||(n.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value);}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck());}static \u0275fac=function(i){return new(i||a)};static \u0275dir=De({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,n,o){if(i&1&&tc(o,vt,5),i&2){let r;_f(r=If())&&(n._buttonToggles=r);}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,n){i&1&&ec("keydown",function(r){return n._keydown(r)}),i&2&&(_i("role",n.multiple?"group":"radiogroup")("aria-disabled",n.disabled),nc("mat-button-toggle-vertical",n.vertical)("mat-button-toggle-group-appearance-standard",n.appearance==="standard"));},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",Xt$1],value:"value",multiple:[2,"multiple","multiple",Xt$1],disabled:[2,"disabled","disabled",Xt$1],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",Xt$1],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",Xt$1]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Ly([$a,{provide:ha,useExisting:a}])]})}return a})(),vt=(()=>{class a{_changeDetectorRef=f(bi);_elementRef=f(ge);_focusMonitor=f(ME);_idGenerator=f(Lh);_animationDisabled=Xc();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new re;constructor(){f(wr).load(S4);let e=f(ha,{optional:true}),i=f(new sc("tabindex"),{optional:true})||"",n=f(da,{optional:true});this._tabIndex=W(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0;}this.change.emit(new bt(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(i,n){if(i&1&&vy(qa,5),i&2){let o;_f(o=If())&&(n._buttonElement=o.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(i,n){i&1&&ec("focus",function(){return n.focus()}),i&2&&(_i("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),nc("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",Xt$1],appearance:"appearance",checked:[2,"checked","checked",Xt$1],disabled:[2,"disabled","disabled",Xt$1],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:ja,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(i,n){if(i&1&&(OT(),La(0,"button",1,0),ec("click",function(){return n._onButtonClick()}),yT(2,Ua,2,1,"div",2),La(3,"span",3),kT(4),mf()(),Ja$1(5,"span",4)(6,"span",5)),i&2){let o=LT(1);uy("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),_i("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),Jw(2),DT(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),Jw(4),uy("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[b4,J],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2})}return a})(),pa=(()=>{class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe({imports:[P4,vt,XE]})}return a})();var Wa=["input"],Ka=["label"],Za=["*"],Wt={color:"accent",clickAction:"check-indeterminate",disabledInteractive:false},Ya=new y("mat-checkbox-default-options",{providedIn:"root",factory:()=>Wt}),z=(function(a){return a[a.Init=0]="Init",a[a.Checked=1]="Checked",a[a.Unchecked=2]="Unchecked",a[a.Indeterminate=3]="Indeterminate",a})(z||{}),Kt=class{source;checked},Zt=(()=>{class a{_elementRef=f(ge);_changeDetectorRef=f(bi);_ngZone=f(H$1);_animationsDisabled=Xc();_options=f(Ya,{optional:true});focus(){this._inputElement.nativeElement.focus();}_createChangeEvent(e){let i=new Kt;return i.source=this,i.checked=e,i}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return `${this.id||this._uniqueId}-input`}required=false;labelPosition="after";name=null;change=new re;indeterminateChange=new re;value;disableRipple=false;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=z.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){f(wr).load(S4);let e=f(new sc("tabindex"),{optional:true});this._options=this._options||Wt,this.color=this._options.color||Wt.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=f(Lh).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??false;}ngOnChanges(e){e.required&&this._validatorChangeFn();}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate);}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck());}_checked=false;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck());}_disabled=false;get indeterminate(){return this._indeterminate()}set indeterminate(e){let i=e!=this._indeterminate();this._indeterminate.set(e),i&&(e?this._transitionCheckState(z.Indeterminate):this._transitionCheckState(this.checked?z.Checked:z.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e);}_indeterminate=W(false);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges();}writeValue(e){this.checked=!!e;}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorChangeFn=e;}_transitionCheckState(e){let i=this._currentCheckState,n=this._getAnimationTargetElement();if(!(i===e||!n)&&(this._currentAnimationClass&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(i,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(o);},1e3);});}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked);}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked);}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(false),this.indeterminateChange.emit(false);}),this._checked=!this._checked,this._transitionCheckState(this._checked?z.Checked:z.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate);}_onInteractionEvent(e){e.stopPropagation();}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck();});}_getAnimationClassForCheckStateTransition(e,i){if(this._animationsDisabled)return "";switch(e){case z.Init:if(i===z.Checked)return this._animationClasses.uncheckedToChecked;if(i==z.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case z.Unchecked:return i===z.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case z.Checked:return i===z.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case z.Indeterminate:return i===z.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return ""}_syncIndeterminate(e){let i=this._inputElement;i&&(i.nativeElement.indeterminate=e);}_onInputClick(){this._handleInputClick();}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus();}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation();}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-checkbox"]],viewQuery:function(i,n){if(i&1&&vy(Wa,5)(Ka,5),i&2){let o;_f(o=If())&&(n._inputElement=o.first),_f(o=If())&&(n._labelElement=o.first);}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(i,n){i&2&&(hy("id",n.id),_i("tabindex",null)("aria-label",null)("aria-labelledby",null),ZT(n.color?"mat-"+n.color:"mat-accent"),nc("_mat-animation-noopable",n._animationsDisabled)("mdc-checkbox--disabled",n.disabled)("mat-mdc-checkbox-disabled",n.disabled)("mat-mdc-checkbox-checked",n.checked)("mat-mdc-checkbox-disabled-interactive",n.disabledInteractive));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",Xt$1],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",Xt$1],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",Xt$1],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:f2(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1],checked:[2,"checked","checked",Xt$1],disabled:[2,"disabled","disabled",Xt$1],indeterminate:[2,"indeterminate","indeterminate",Xt$1]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[Ly([{provide:_t$3,useExisting:Vs(()=>a),multi:true},{provide:K$1,useExisting:a,multi:true}]),At$1],ngContentSelectors:Za,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(i,n){if(i&1&&(OT(),La(0,"div",3),ec("click",function(r){return n._preventBubblingFromLabel(r)}),La(1,"div",4,0)(3,"div",5),ec("click",function(){return n._onTouchTargetClick()}),mf(),La(4,"input",6,1),ec("blur",function(){return n._onBlur()})("click",function(){return n._onInputClick()})("change",function(r){return n._onInteractionEvent(r)}),mf(),Ja$1(6,"div",7),La(7,"div",8),Dg(),La(8,"svg",9),Ja$1(9,"path",10),mf(),Eg(),Ja$1(10,"div",11),mf(),Ja$1(11,"div",12),mf(),La(12,"label",13,2),kT(14),mf()()),i&2){let o=LT(2);uy("labelPosition",n.labelPosition),Jw(4),nc("mdc-checkbox--selected",n.checked),uy("checked",n.checked)("indeterminate",n.indeterminate)("disabled",n.disabled&&!n.disabledInteractive)("id",n.inputId)("required",n.required)("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex),_i("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby)("aria-checked",n.indeterminate?"mixed":null)("aria-controls",n.ariaControls)("aria-disabled",n.disabled&&n.disabledInteractive?true:null)("aria-expanded",n.ariaExpanded)("aria-owns",n.ariaOwns)("name",n.name)("value",n.value),Jw(7),uy("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",true),Jw(),uy("for",n.inputId);}},dependencies:[b4,m],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return a})(),ma=(()=>{class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe({imports:[Zt,XE]})}return a})();var Ja=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],eo=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function to(a,t){a&1&&(La(0,"span",3),kT(1,1),mf());}function io(a,t){a&1&&(La(0,"span",6),kT(1,2),mf());}var no=["*"];var ao=new y("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),ua=new y("MatChipAvatar"),ga=new y("MatChipTrailingIcon"),_a=new y("MatChipEdit"),Yt=new y("MatChipRemove"),fa=new y("MatChip"),ba=(()=>{class a{_elementRef=f(ge);_parentChip=f(fa);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(e){this._disabled=e;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){f(wr).load(S4),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(i){return new(i||a)};static \u0275dir=De({type:a,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(i,n){i&2&&(_i("disabled",n._getDisabledAttribute())("aria-disabled",n.disabled),nc("mdc-evolution-chip__action--primary",n._isPrimary)("mdc-evolution-chip__action--secondary",!n._isPrimary)("mdc-evolution-chip__action--trailing",!n._isPrimary&&!n._isLeading));},inputs:{disabled:[2,"disabled","disabled",Xt$1],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:f2(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return a})(),va=(()=>{class a extends ba{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=xm(a)))(n||a)}})();static \u0275dir=De({type:a,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(i,n){i&1&&ec("click",function(r){return n._handleClick(r)})("keydown",function(r){return n._handleKeydown(r)}),i&2&&(_i("tabindex",n._getTabindex()),nc("mdc-evolution-chip__action--presentational",false));},features:[ry]})}return a})();var ya=(()=>{class a extends va{_isPrimary=false;_handleClick(e){this.disabled||(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=xm(a)))(n||a)}})();static \u0275dir=De({type:a,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(i,n){i&2&&_i("aria-hidden",null);},features:[Ly([{provide:Yt,useExisting:a}]),ry]})}return a})(),Xt=(()=>{class a{_changeDetectorRef=f(bi);_elementRef=f(ge);_tagName=f(a2);_ngZone=f(H$1);_focusMonitor=f(ME);_globalRippleOptions=f(Vh,{optional:true});_document=f(L);_onFocus=new U;_onBlur=new U;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=Xc();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=f(Lh).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e;}_disabled=false;removed=new re;destroyed=new re;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=f(V4);_injector=f(X);constructor(){let e=f(wr);e.load(S4),e.load(nu),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=T_(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(e){return this._getActions().find(i=>{let n=i._elementRef.nativeElement;return n===e||n.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{let i=e!==null;i!==this._hasFocusInternal&&(this._hasFocusInternal=i,i?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(i,n,o){if(i&1&&tc(o,ua,5)(o,_a,5)(o,ga,5)(o,Yt,5)(o,ua,5)(o,ga,5)(o,_a,5)(o,Yt,5),i&2){let r;_f(r=If())&&(n.leadingIcon=r.first),_f(r=If())&&(n.editIcon=r.first),_f(r=If())&&(n.trailingIcon=r.first),_f(r=If())&&(n.removeIcon=r.first),_f(r=If())&&(n._allLeadingIcons=r),_f(r=If())&&(n._allTrailingIcons=r),_f(r=If())&&(n._allEditIcons=r),_f(r=If())&&(n._allRemoveIcons=r);}},viewQuery:function(i,n){if(i&1&&vy(va,5),i&2){let o;_f(o=If())&&(n.primaryAction=o.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(i,n){i&1&&ec("keydown",function(r){return n._handleKeydown(r)}),i&2&&(hy("id",n.id),_i("role",n.role)("aria-label",n.ariaLabel),ZT("mat-"+(n.color||"primary")),nc("mdc-evolution-chip",!n._isBasicChip)("mdc-evolution-chip--disabled",n.disabled)("mdc-evolution-chip--with-trailing-action",n._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",n.leadingIcon)("mdc-evolution-chip--with-primary-icon",n.leadingIcon)("mdc-evolution-chip--with-avatar",n.leadingIcon)("mat-mdc-chip-with-avatar",n.leadingIcon)("mat-mdc-chip-highlighted",n.highlighted)("mat-mdc-chip-disabled",n.disabled)("mat-mdc-basic-chip",n._isBasicChip)("mat-mdc-standard-chip",!n._isBasicChip)("mat-mdc-chip-with-trailing-icon",n._hasTrailingIcon())("_mat-animation-noopable",n._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",Xt$1],highlighted:[2,"highlighted","highlighted",Xt$1],disableRipple:[2,"disableRipple","disableRipple",Xt$1],disabled:[2,"disabled","disabled",Xt$1]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[Ly([{provide:fa,useExisting:a}])],ngContentSelectors:eo,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(i,n){i&1&&(OT(Ja),Ja$1(0,"span",0),La(1,"span",1)(2,"span",2),yT(3,to,2,0,"span",3),La(4,"span",4),kT(5),Ja$1(6,"span",5),mf()()(),yT(7,io,2,0,"span",6)),i&2&&(Jw(3),DT(n.leadingIcon?3:-1),Jw(4),DT(n._hasTrailingIcon()?7:-1));},dependencies:[ba],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})}return a})();var xa=(()=>{class a{_elementRef=f(ge);_changeDetectorRef=f(bi);_dir=f(fR,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new U;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new cr$1;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e);}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e));}_getChipStream(e){return this._chips.changes.pipe(Oo$1(null),Fe$1(()=>T_(...this._chips.map(e))))}_originatesFromChip(e){let i=e.target;for(;i&&i!==this._elementRef.nativeElement;){if(i.classList.contains("mat-mdc-chip"))return  true;i=i.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Oo$1(this._chips)).subscribe(e=>{let i=[];e.forEach(n=>n._getActions().forEach(o=>i.push(o))),this._chipActions.reset(i),this._chipActions.notifyOnChanges();}),this._keyManager=new Ph(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(Bt$2(this._destroyed)).subscribe(({chip:e})=>{let i=e._getSourceAction(document.activeElement);i&&this._keyManager.updateActiveItem(i);}),this._dir?.change.pipe(Bt$2(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e));}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Oo$1(null),Bt$2(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Bt$2(this._destroyed)).subscribe(e=>{let n=this._chips.toArray().indexOf(e.chip),o=e.chip._hasFocus(),r=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),l=o||r;this._isValidIndex(n)&&l&&(this._lastDestroyedFocusedChipIndex=n);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),i=this._chips.toArray()[e];i.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():i.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(i){return new(i||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-chip-set"]],contentQueries:function(i,n,o){if(i&1&&tc(o,Xt,5),i&2){let r;_f(r=If())&&(n._chips=r);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(i,n){i&1&&ec("keydown",function(r){return n._handleKeydown(r)}),i&2&&_i("role",n.role);},inputs:{disabled:[2,"disabled","disabled",Xt$1],role:"role",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:f2(e)]},ngContentSelectors:no,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(i,n){i&1&&(OT(),vf(0,"div",0),kT(1),yf());},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})}return a})();var ka=(()=>{class a{static \u0275fac=function(i){return new(i||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe({providers:[e3,{provide:ao,useValue:{separatorKeyCodes:[13]}}],imports:[P4,XE]})}return a})();var po=(a,t)=>t.codigo,mo=(a,t)=>t.id;function uo(a,t){if(a&1){let e=AT();La(0,"button",36),ec("click",function(){let n=sg(e).$implicit,o=RT(2);return ag(o.assignee.set(n.id))}),iS(1),mf();}if(a&2){let e=t.$implicit,i=RT(2);nc("rf-on",i.assignee()===e.id),Jw(),My(e.name);}}function go(a,t){if(a&1){let e=AT();La(0,"div",13)(1,"label",24),iS(2,"Responsable "),La(3,"span",15),iS(4,"*"),mf()(),La(5,"button",46)(6,"mat-icon",20),iS(7,"person"),mf(),La(8,"span",31),iS(9),mf(),La(10,"mat-icon",32),iS(11,"expand_more"),mf()()(),La(12,"mat-menu",33,3)(14,"div",34),ec("click",function(n){return n.stopPropagation()})("keydown",function(n){return n.stopPropagation()}),La(15,"mat-icon"),iS(16,"search"),mf(),La(17,"input",47),ec("ngModelChange",function(n){sg(e);let o=RT();return ag(o.buscarResp.set(n))}),mf(),lC(),mf(),La(18,"button",36),ec("click",function(){sg(e);let n=RT();return ag(n.assignee.set(""))}),iS(19,"\u2014 Sin asignar \u2014"),mf(),IT(20,uo,2,3,"button",37,mo),mf();}if(a&2){let e=LT(13),i=RT();Jw(5),uy("matMenuTriggerFor",e),Jw(3),nc("rf-placeholder",!i.assignee()),Jw(),My(i.assigneeLabel()||"Sin asignar"),Jw(8),uy("ngModel",i.buscarResp()),fC(),Jw(),nc("rf-on",!i.assignee()),Jw(2),wT(i.usuariosF());}}function _o(a,t){if(a&1&&(La(0,"div",29)(1,"label",24),iS(2,"Responsable "),La(3,"span",15),iS(4,"*"),mf()(),La(5,"div",16)(6,"mat-icon",20),iS(7,"person"),mf(),La(8,"span",31),iS(9),La(10,"span",48),iS(11,"\xB7 t\xFA"),mf()()()()),a&2){let e=RT();Jw(9),wf("",e.nombreYo()," ");}}function fo(a,t){if(a&1){let e=AT();La(0,"button",36),ec("click",function(){let n=sg(e).$implicit,o=RT();return ag(o.clientId.set(n.codigo))}),iS(1),mf();}if(a&2){let e=t.$implicit,i=RT();nc("rf-on",i.clientId()===e.codigo),Jw(),My(e.nombre);}}function bo(a,t){if(a&1){let e=AT();La(0,"button",49),ec("click",function(){sg(e);let n=RT();return ag(n.eliminar())}),La(1,"mat-icon"),iS(2,"delete"),mf(),La(3,"span",50),iS(4,"Eliminar"),mf()();}}var ze=class a{data=f(v);hd=f(K);perfil=f(l);auth=f(yE);ref=f(_t$2);snack=f(Qt$1);dlg=f(vi);story=this.dlg.story;isNew=!this.story;puedeAsignarAOtros=oe(()=>this.auth.esResponsableEquipo()||this.auth.esAdminPlataforma());subtipo=W(this.story?.subtipo||"CAPACITACION");tema=W(this.story?.tema||this.story?.title||"");link=W(this.story?.link||"");assignee=W("");clientId=W(this.story?.client||"");inicioFecha=W(null);inicioHora=W("09:00");finFecha=W(null);finHora=W("10:00");buscarResp=W("");buscarCli=W("");usuariosF=oe(()=>{let t=this.buscarResp().trim().toLowerCase(),e=this.hd.hdUsers();return t?e.filter(i=>i.name.toLowerCase().includes(t)):e});clientesSource=oe(()=>this.perfil.esGlobal()?this.hd.clients().map(t=>({codigo:t.id,nombre:t.name})):this.perfil.misClientes());clientesF=oe(()=>{let t=this.buscarCli().trim().toLowerCase(),e=this.clientesSource();return t?e.filter(i=>i.nombre.toLowerCase().includes(t)):e});assigneeLabel=oe(()=>{let t=this.assignee();return t?this.hd.hdUsers().find(e=>e.id===t)?.name||t:""});clienteLabel=oe(()=>{let t=this.clientId();return t?this.clientesSource().find(e=>e.codigo===t)?.nombre||this.story?.clientName||t:""});constructor(){s$1(this.ref),this.hd.getClients(),this.perfil.cargarMiPerfil();let t=this.parseDT(this.story?.inicio);t&&(this.inicioFecha.set(t.fecha),this.inicioHora.set(t.hora));let e=this.parseDT(this.story?.fin);e&&(this.finFecha.set(e.fecha),this.finHora.set(e.hora)),this.story?this.assignee.set(this.story.assignee||""):this.puedeAsignarAOtros()||this.assignee.set(this.auth.session()?.id||"");}nombreYo(){return this.auth.session()?.name||"Yo"}async guardar(){let t=this.tema().trim();if(!t){this.snack.open("El tema es obligatorio.","OK",{duration:3e3});return}let e=this.combinar(this.inicioFecha(),this.inicioHora());if(!e){this.snack.open("La fecha y hora de inicio es obligatoria.","OK",{duration:3e3});return}let i=this.combinar(this.finFecha(),this.finHora());if(i&&i<e){this.snack.open("El fin no puede ser anterior al inicio.","OK",{duration:3500});return}let n=this.puedeAsignarAOtros()?this.assignee()||null:this.auth.session()?.id||null,o=this.clientId(),r=this.clientesSource().find(p=>p.codigo===o),l={title:t,tipo:"REUNION",subtipo:this.subtipo(),tema:t,link:this.link().trim(),inicio:e,fin:i,assignee:n,client:o||null,clientName:r?.nombre||this.story?.clientName||""};if(this.isNew)try{await this.data.addStory(s(r$1({},l),{status:"todo",priority:"media"}));}catch{this.snack.open("No se pudo guardar la reuni\xF3n. Revisa tu conexi\xF3n e intenta de nuevo.","OK",{duration:4e3});return}else this.data.updateStoryReunion(this.story.id,l);this.ref.close(true);}eliminar(){this.story&&this.auth.puedeEliminarTarea()&&(this.data.deleteStory(this.story.id),this.ref.close(true));}cerrar(){this.ref.close();}parseDT(t){if(!t)return null;let[e,i]=t.split("T"),[n,o,r]=(e||"").split("-").map(Number);return !n||!o||!r?null:{fecha:new Date(n,o-1,r),hora:(i||"09:00").slice(0,5)}}combinar(t,e){if(!t)return "";let i=n=>String(n).padStart(2,"0");return `${t.getFullYear()}-${i(t.getMonth()+1)}-${i(t.getDate())}T${e||"00:00"}`}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Kt$1({type:a,selectors:[["app-reunion-dialog"]],decls:126,vars:25,consts:[["dpI",""],["dpF",""],["cliMenu","matMenu"],["respMenu","matMenu"],["mat-dialog-title","",1,"rf-head"],[1,"rf-head-icon"],[1,"rf-head-text"],[1,"rf-title"],[1,"rf-sub"],["mat-icon-button","","type","button","aria-label","Cerrar",1,"rf-close",3,"click"],[1,"rf-body"],["role","radiogroup","aria-label","Tipo de reuni\xF3n",1,"rf-seg"],["type","button","role","radio",1,"rf-seg-btn",3,"click"],[1,"rf-field"],["for","rf-tema",1,"rf-label"],[1,"rf-req"],[1,"rf-control"],["id","rf-tema","placeholder","Ej. Capacitaci\xF3n uso de Fit-Desk","maxlength","300",1,"rf-input",3,"ngModelChange","ngModel"],[1,"rf-trailing"],["for","rf-link",1,"rf-label"],[1,"rf-lead"],["id","rf-link","placeholder","Ej. https://meet.google.com/abc-defg-hij",1,"rf-input",3,"ngModelChange","ngModel"],[1,"rf-2col"],[1,"rf-field","rf-clickable",3,"click"],[1,"rf-label"],[1,"rf-label-icon"],["readonly","","placeholder","Selecciona la fecha",1,"rf-input",3,"ngModelChange","matDatepicker","ngModel"],["type","time","aria-label","Hora de inicio",1,"rf-input","rf-time",3,"ngModelChange","ngModel"],["type","time","aria-label","Hora de fin",1,"rf-input","rf-time",3,"ngModelChange","ngModel"],[1,"rf-field","rf-field-static"],["type","button","aria-label","Elegir cliente",1,"rf-control","rf-trigger",3,"matMenuTriggerFor"],[1,"rf-value"],[1,"rf-caret"],[1,"rf-menu"],[1,"rf-menu-search",3,"click","keydown"],["placeholder","Buscar cliente\u2026","aria-label","Buscar cliente",3,"ngModelChange","ngModel"],["mat-menu-item","",3,"click"],["mat-menu-item","",3,"rf-on"],[1,"rf-tip"],[1,"rf-tip-icon"],[1,"rf-tip-text"],[1,"rf-actions"],["mat-button","","type","button","matTooltip","Eliminar reuni\xF3n","aria-label","Eliminar reuni\xF3n",1,"rf-danger"],[1,"rf-spacer"],["mat-button","","type","button",3,"click"],["mat-flat-button","","color","primary","type","button",1,"rf-save",3,"click"],["type","button","aria-label","Elegir responsable",1,"rf-control","rf-trigger",3,"matMenuTriggerFor"],["placeholder","Buscar consultor\u2026","aria-label","Buscar consultor",3,"ngModelChange","ngModel"],[1,"rf-you"],["mat-button","","type","button","matTooltip","Eliminar reuni\xF3n","aria-label","Eliminar reuni\xF3n",1,"rf-danger",3,"click"],[1,"rf-btn-txt"]],template:function(e,i){if(e&1){let n=AT();La(0,"div",4)(1,"mat-icon",5),iS(2,"groups"),mf(),La(3,"div",6)(4,"h2",7),iS(5),mf(),La(6,"p",8),iS(7,"Crea y agenda una capacitaci\xF3n o presentaci\xF3n."),mf()(),La(8,"button",9),ec("click",function(){return i.cerrar()}),La(9,"mat-icon"),iS(10,"close"),mf()()(),La(11,"mat-dialog-content",10)(12,"div",11)(13,"button",12),ec("click",function(){return i.subtipo.set("CAPACITACION")}),La(14,"mat-icon"),iS(15,"school"),mf(),iS(16," Capacitaci\xF3n "),mf(),La(17,"button",12),ec("click",function(){return i.subtipo.set("PRESENTACION")}),La(18,"mat-icon"),iS(19,"co_present"),mf(),iS(20," Presentaci\xF3n "),mf()(),La(21,"div",13)(22,"label",14),iS(23,"Tema "),La(24,"span",15),iS(25,"*"),mf()(),La(26,"div",16)(27,"input",17),ec("ngModelChange",function(r){return i.tema.set(r)}),mf(),lC(),La(28,"mat-icon",18),iS(29,"article"),mf()()(),La(30,"div",13)(31,"label",19),iS(32,"Link (opcional)"),mf(),La(33,"div",16)(34,"mat-icon",20),iS(35,"link"),mf(),La(36,"input",21),ec("ngModelChange",function(r){return i.link.set(r)}),mf(),lC(),mf()(),La(37,"div",22)(38,"div",23),ec("click",function(){sg(n);let r=LT(50);return ag(r.open())}),La(39,"label",24),iS(40,"Fecha de inicio "),La(41,"span",15),iS(42,"*"),mf(),La(43,"mat-icon",25),iS(44,"event"),mf()(),La(45,"div",16)(46,"mat-icon",20),iS(47,"calendar_today"),mf(),La(48,"input",26),ec("ngModelChange",function(r){return i.inicioFecha.set(r)}),mf(),lC(),Ja$1(49,"mat-datepicker",null,0),mf()(),La(51,"div",13)(52,"label",24),iS(53,"Hora de inicio "),La(54,"span",15),iS(55,"*"),mf(),La(56,"mat-icon",25),iS(57,"schedule"),mf()(),La(58,"div",16)(59,"mat-icon",20),iS(60,"schedule"),mf(),La(61,"input",27),ec("ngModelChange",function(r){return i.inicioHora.set(r)}),mf(),lC(),mf()()(),La(62,"div",22)(63,"div",23),ec("click",function(){sg(n);let r=LT(75);return ag(r.open())}),La(64,"label",24),iS(65,"Fecha de fin "),La(66,"span",15),iS(67,"*"),mf(),La(68,"mat-icon",25),iS(69,"event"),mf()(),La(70,"div",16)(71,"mat-icon",20),iS(72,"calendar_today"),mf(),La(73,"input",26),ec("ngModelChange",function(r){return i.finFecha.set(r)}),mf(),lC(),Ja$1(74,"mat-datepicker",null,1),mf()(),La(76,"div",13)(77,"label",24),iS(78,"Hora de fin "),La(79,"span",15),iS(80,"*"),mf(),La(81,"mat-icon",25),iS(82,"schedule"),mf()(),La(83,"div",16)(84,"mat-icon",20),iS(85,"schedule"),mf(),La(86,"input",28),ec("ngModelChange",function(r){return i.finHora.set(r)}),mf(),lC(),mf()()(),yT(87,go,22,7)(88,_o,12,1,"div",29),La(89,"div",13)(90,"label",24),iS(91,"Cliente (opcional)"),mf(),La(92,"button",30)(93,"mat-icon",20),iS(94,"apartment"),mf(),La(95,"span",31),iS(96),mf(),La(97,"mat-icon",32),iS(98,"expand_more"),mf()()(),La(99,"mat-menu",33,2)(101,"div",34),ec("click",function(r){return r.stopPropagation()})("keydown",function(r){return r.stopPropagation()}),La(102,"mat-icon"),iS(103,"search"),mf(),La(104,"input",35),ec("ngModelChange",function(r){return i.buscarCli.set(r)}),mf(),lC(),mf(),La(105,"button",36),ec("click",function(){return i.clientId.set("")}),iS(106,"\u2014 Sin cliente \u2014"),mf(),IT(107,fo,2,3,"button",37,po),mf(),La(109,"div",38)(110,"mat-icon",39),iS(111,"info"),mf(),La(112,"div",40)(113,"strong"),iS(114,"Consejo"),mf(),La(115,"p"),iS(116,"Aseg\xFArate de revisar la fecha, hora y el enlace antes de guardar la reuni\xF3n."),mf()()()(),La(117,"mat-dialog-actions",41),yT(118,bo,5,0,"button",42),Ja$1(119,"span",43),La(120,"button",44),ec("click",function(){return i.cerrar()}),iS(121,"Cancelar"),mf(),La(122,"button",45),ec("click",function(){return i.guardar()}),La(123,"mat-icon"),iS(124,"event"),mf(),iS(125),mf()();}if(e&2){let n=LT(50),o=LT(75),r=LT(100);Jw(5),My(i.isNew?"Nueva reuni\xF3n":"Editar reuni\xF3n"),Jw(8),nc("on",i.subtipo()==="CAPACITACION"),_i("aria-checked",i.subtipo()==="CAPACITACION"),Jw(4),nc("on",i.subtipo()==="PRESENTACION"),_i("aria-checked",i.subtipo()==="PRESENTACION"),Jw(10),uy("ngModel",i.tema()),fC(),Jw(9),uy("ngModel",i.link()),fC(),Jw(12),uy("matDatepicker",n)("ngModel",i.inicioFecha()),fC(),Jw(13),uy("ngModel",i.inicioHora()),fC(),Jw(12),uy("matDatepicker",o)("ngModel",i.finFecha()),fC(),Jw(13),uy("ngModel",i.finHora()),fC(),Jw(),DT(i.puedeAsignarAOtros()?87:88),Jw(5),uy("matMenuTriggerFor",r),Jw(3),nc("rf-placeholder",!i.clientId()),Jw(),My(i.clienteLabel()||"Sin cliente"),Jw(8),uy("ngModel",i.buscarCli()),fC(),Jw(),nc("rf-on",!i.clientId()),Jw(2),wT(i.clientesF()),Jw(11),DT(!i.isNew&&i.auth.puedeEliminarTarea()?118:-1),Jw(7),wf(" ",i.isNew?"Guardar reuni\xF3n":"Guardar cambios"," ");}},dependencies:[da$2,ln,ia$1,Di,ji,Wo$1,No$1,jo$1,zo$1,Aa$1,Fa$1,eo$1,yt,wt,zs,Ys,Rn,Lt$1,P,G,Nt$1,zt$1,mt],styles:["[_nghost-%COMP%]{--rf-border: #dfe4ea;--rf-border-focus: var(--brand, #048abf);--rf-lead-bg: color-mix(in srgb, var(--brand, #048abf) 10%, transparent);--rf-radius: 12px}.rf-head[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;margin:0;padding:20px 24px 10px}.rf-head[_ngcontent-%COMP%]   .rf-head-icon[_ngcontent-%COMP%]{flex:none;color:var(--brand, #048abf);font-size:28px;width:28px;height:28px;margin-top:2px}.rf-head[_ngcontent-%COMP%]   .rf-head-text[_ngcontent-%COMP%]{flex:1;min-width:0}.rf-head[_ngcontent-%COMP%]   .rf-title[_ngcontent-%COMP%]{margin:0;font-size:22px;font-weight:700;letter-spacing:-.3px;line-height:1.15;color:var(--mat-sys-on-surface, #16202a)}.rf-head[_ngcontent-%COMP%]   .rf-sub[_ngcontent-%COMP%]{margin:3px 0 0;font-size:13px;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-head[_ngcontent-%COMP%]   .rf-close[_ngcontent-%COMP%]{flex:none;margin:-6px -8px 0 0;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;padding-top:6px;min-width:472px;overflow-x:hidden}.rf-seg[_ngcontent-%COMP%]{display:flex;gap:6px;width:100%;padding:4px;border-radius:14px;background:var(--mat-sys-surface-container-low, #eef2f6)}.rf-seg-btn[_ngcontent-%COMP%]{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;border:1px solid transparent;border-radius:10px;background:transparent;color:var(--mat-sys-on-surface-variant, #5a6470);font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .12s,color .12s,border-color .12s}.rf-seg-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px}.rf-seg-btn[_ngcontent-%COMP%]:hover:not(.on){background:#0000000a}.rf-seg-btn[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--brand, #048abf);outline-offset:2px}.rf-seg-btn.on[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--brand, #048abf) 12%,#fff);border-color:color-mix(in srgb,var(--brand, #048abf) 45%,transparent);color:var(--brand-dark, #0390bc);box-shadow:0 1px 2px #0000000f}.rf-field[_ngcontent-%COMP%]{border:1px solid var(--rf-border);border-radius:var(--rf-radius);padding:11px 16px 12px;background:#fff;transition:border-color .12s,box-shadow .12s}.rf-field[_ngcontent-%COMP%]:focus-within{border-color:var(--rf-border-focus);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand, #048abf) 14%,transparent)}.rf-clickable[_ngcontent-%COMP%]{cursor:pointer}.rf-field-static[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container-low, #f6f8fa)}.rf-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--mat-sys-on-surface, #384552);margin-bottom:8px}.rf-label[_ngcontent-%COMP%]   .rf-req[_ngcontent-%COMP%]{color:var(--brand, #048abf);font-weight:700}.rf-label[_ngcontent-%COMP%]   .rf-label-icon[_ngcontent-%COMP%]{margin-left:auto;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #97a1ab)}.rf-control[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.rf-lead[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:var(--rf-lead-bg);color:var(--brand, #048abf);font-size:19px}.rf-input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:15px;color:var(--mat-sys-on-surface, #16202a);padding:0}.rf-input[_ngcontent-%COMP%]::placeholder{color:#9aa4ae}.rf-time[_ngcontent-%COMP%]{font-variant-numeric:tabular-nums}.rf-trailing[_ngcontent-%COMP%]{flex:none;color:var(--mat-sys-on-surface-variant, #97a1ab);font-size:20px;width:20px;height:20px}.rf-trigger[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;text-align:left;padding:0;font:inherit}.rf-value[_ngcontent-%COMP%]{flex:1;min-width:0;font-size:15px;color:var(--mat-sys-on-surface, #16202a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rf-value.rf-placeholder[_ngcontent-%COMP%]{color:#9aa4ae}.rf-value[_ngcontent-%COMP%]   .rf-you[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #5a6470);font-size:13px}.rf-caret[_ngcontent-%COMP%]{flex:none;color:var(--mat-sys-on-surface-variant, #97a1ab);font-size:22px;width:22px;height:22px}.rf-2col[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}@media(max-width:520px){.rf-2col[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}}.rf-menu-search[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:8px 12px;margin:-8px 0 4px;border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.rf-menu-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex:none;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #97a1ab)}.rf-menu-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:14px}.rf-menu-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#9aa4ae}.rf-tip[_ngcontent-%COMP%]{display:flex;gap:12px;padding:14px 16px;border-radius:var(--rf-radius);background:color-mix(in srgb,var(--brand, #048abf) 7%,transparent);border:1px solid color-mix(in srgb,var(--brand, #048abf) 18%,transparent)}.rf-tip[_ngcontent-%COMP%]   .rf-tip-icon[_ngcontent-%COMP%]{flex:none;color:var(--brand, #048abf);font-size:22px;width:22px;height:22px}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]{min-width:0}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:13px;color:var(--brand-dark, #0390bc);margin-bottom:2px}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:13px;line-height:1.4;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-actions[_ngcontent-%COMP%]{position:sticky;bottom:0;z-index:1;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:14px 24px;background:var(--mat-sys-surface-container-low, #fff);border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.rf-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.rf-danger[_ngcontent-%COMP%]{color:var(--mat-sys-error, #ba1a1a)}.rf-save[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:4px}@media(max-width:560px){.rf-body[_ngcontent-%COMP%]{min-width:0}.rf-head[_ngcontent-%COMP%]{padding:16px 18px 8px}.rf-actions[_ngcontent-%COMP%]{padding:12px 18px;gap:4px;justify-content:flex-end}.rf-actions[_ngcontent-%COMP%]   .rf-btn-txt[_ngcontent-%COMP%]{display:none}.rf-actions[_ngcontent-%COMP%]   .rf-danger[_ngcontent-%COMP%]{min-width:40px;padding:0 8px}}"]})};var vo=["filtersTpl"],wa=(a,t)=>t.status,yo=(a,t)=>t.codigo,Jt=(a,t)=>t.id;function xo(a,t){if(a&1&&(La(0,"mat-option",17),iS(1),mf()),a&2){let e=t.$implicit;uy("value",e.codigo),Jw(),My(e.equipo||e.nombre);}}function ko(a,t){if(a&1){let e=AT();La(0,"mat-form-field",6)(1,"mat-label"),iS(2,"Equipo / Tablero"),mf(),La(3,"mat-select",16),ec("selectionChange",function(n){sg(e);let o=RT();return ag(o.switchBoard(n.value))}),IT(4,xo,2,2,"mat-option",17,yo),mf()();}if(a&2){let e=RT();Jw(3),uy("value",e.currentBoard()),Jw(),wT(e.boards());}}function Co(a,t){a&1&&(La(0,"h2",7)(1,"mat-icon"),iS(2,"dashboard_customize"),mf(),iS(3," Mis tareas \xB7 todos los equipos"),mf());}function wo(a,t){if(a&1){let e=AT();La(0,"button",18),ec("click",function(){sg(e);let n=RT();return ag(n.toggleConsolidado())}),La(1,"mat-icon"),iS(2,"dashboard_customize"),mf(),iS(3," Mis tareas (todos los equipos) "),mf();}if(a&2){let e=RT();nc("active",e.consolidadoManual()),_i("aria-pressed",e.consolidadoManual());}}function So(a,t){if(a&1){let e=AT();La(0,"button",19),ec("click",function(){sg(e);let n=RT();return ag(n.clearBoard())}),La(1,"mat-icon"),iS(2,"delete_sweep"),mf(),iS(3," Borrar Board "),mf();}}function Do(a,t){a&1&&(La(0,"mat-hint"),iS(1,"Buscando en el HelpDesk\u2026"),mf());}function Po(a,t){a&1&&(La(0,"mat-hint"),iS(1,"Presiona Enter para buscar por palabra"),mf());}function Mo(a,t){if(a&1&&(La(0,"mat-button-toggle",17),iS(1),mf()),a&2){let e=t.$implicit,i=RT(2);uy("value",e),Jw(),My(e==="all"?"Todas":i.PRIORITY_FILTER_LABELS[e]);}}function Eo(a,t){if(a&1){let e=AT();La(0,"button",31),ec("click",function(){sg(e);let n=RT(2);return ag(n.toggleMine())}),La(1,"mat-icon"),iS(2,"person"),mf(),iS(3," Asignados a m\xED "),mf();}if(a&2){let e=RT(2);nc("active",e.mineOnly()),_i("aria-pressed",e.mineOnly());}}function Io(a,t){if(a&1){let e=AT();La(0,"button",32),ec("click",function(){sg(e);let n=RT(2);return ag(n.toggleTeam())}),La(1,"mat-icon"),iS(2,"groups"),mf(),iS(3," Mi equipo "),mf();}if(a&2){let e=RT(2);nc("active",e.teamOnly()),_i("aria-pressed",e.teamOnly());}}function To(a,t){if(a&1&&(La(0,"mat-option",17),iS(1),mf()),a&2){let e=t.$implicit;uy("value",e.id),Jw(),My(e.name);}}function Ro(a,t){a&1&&(La(0,"mat-option",41),iS(1,"Sin coincidencias"),mf());}function Oo(a,t){if(a&1){let e=AT();La(0,"mat-chip",44),ec("removed",function(){let n=sg(e).$implicit,o=RT(4);return ag(o.removeAssignee(n))}),iS(1),La(2,"button",45)(3,"mat-icon"),iS(4,"close"),mf()()();}if(a&2){let e=t.$implicit,i=RT(4),n=i.resolveMember(e);Iy("background",i.pastel(n?.color||"#9aa0a6")),uy("matTooltip",n?.name||"\u2014"),Jw(),wf(" ",i.shortName(n?.name||"\u2014")," "),Jw(),_i("aria-label","Quitar "+(n?.name||"\u2014"));}}function Fo(a,t){if(a&1&&(La(0,"mat-chip-set",42),IT(1,Oo,5,5,"mat-chip",43,_T),mf()),a&2){let e=RT(3);Jw(),wT(e.selectedAssignees());}}function Ao(a,t){if(a&1){let e=AT();La(0,"div",28)(1,"span",33),iS(2,"Asignado a:"),mf(),La(3,"mat-form-field",34)(4,"mat-label"),iS(5,"Consultores"),mf(),La(6,"mat-select",35,2),ec("selectionChange",function(n){sg(e);let o=RT(2);return ag(o.onAssigneeSelectChange(n.value))})("closed",function(){sg(e);let n=RT(2);return ag(n.buscarAsignado.set(""))}),La(8,"div",36),ec("click",function(n){return n.stopPropagation()}),La(9,"div",37)(10,"mat-icon"),iS(11,"search"),mf(),La(12,"input",38),ec("input",function(n){sg(e);let o=RT(2);return ag(o.buscarAsignado.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),mf(),La(13,"button",39),ec("click",function(){sg(e);let n=LT(7);return ag(n.close())}),La(14,"mat-icon"),iS(15,"close"),mf(),iS(16,"Cerrar"),mf()(),La(17,"button",40),ec("click",function(n){return sg(e),RT(2).toggleAllAssignees(),ag(n.stopPropagation())}),iS(18),mf()(),IT(19,To,2,2,"mat-option",17,Jt,false,Ro,2,0,"mat-option",41),mf()(),yT(22,Fo,3,0,"mat-chip-set",42),mf();}if(a&2){let e=RT(2);Jw(6),uy("value",e.selectedAssignees()),Jw(6),uy("value",e.buscarAsignado()),Jw(6),wf(" ",e.allAssigneesSelected()?"Quitar todos":"Seleccionar todos"," "),Jw(),wT(e.assigneeOptions()),Jw(3),DT(e.selectedAssignees().length?22:-1);}}function Bo(a,t){if(a&1&&(La(0,"mat-option",17),iS(1),mf()),a&2){let e=t.$implicit;uy("value",e.id),Jw(),My(e.name);}}function No(a,t){a&1&&(La(0,"mat-option",41),iS(1,"Sin coincidencias"),mf());}function Lo(a,t){if(a&1){let e=AT();La(0,"mat-chip",49),ec("removed",function(){let n=sg(e).$implicit,o=RT(4);return ag(o.removeClient(n))}),iS(1),La(2,"button",45)(3,"mat-icon"),iS(4,"close"),mf()()();}if(a&2){let e=t.$implicit,i=RT(4);Iy("background",i.pastel(i.clientColorOf(e))),uy("matTooltip",i.clientNameOf(e)),Jw(),wf(" ",i.clientNameOf(e)," "),Jw(),_i("aria-label","Quitar "+i.clientNameOf(e));}}function Vo(a,t){if(a&1&&(La(0,"mat-chip-set",42),IT(1,Lo,5,5,"mat-chip",48,_T),mf()),a&2){let e=RT(3);Jw(),wT(e.selectedClients());}}function zo(a,t){if(a&1){let e=AT();La(0,"div",29)(1,"span",33),iS(2,"Cliente:"),mf(),La(3,"mat-form-field",46)(4,"mat-label"),iS(5,"Clientes"),mf(),La(6,"mat-select",35,3),ec("selectionChange",function(n){sg(e);let o=RT(2);return ag(o.onClientSelectChange(n.value))})("closed",function(){sg(e);let n=RT(2);return ag(n.buscarCliente.set(""))}),La(8,"div",36),ec("click",function(n){return n.stopPropagation()}),La(9,"div",37)(10,"mat-icon"),iS(11,"search"),mf(),La(12,"input",47),ec("input",function(n){sg(e);let o=RT(2);return ag(o.buscarCliente.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),mf(),La(13,"button",39),ec("click",function(){sg(e);let n=LT(7);return ag(n.close())}),La(14,"mat-icon"),iS(15,"close"),mf(),iS(16,"Cerrar"),mf()(),La(17,"button",40),ec("click",function(n){return sg(e),RT(2).toggleAllClients(),ag(n.stopPropagation())}),iS(18),mf()(),IT(19,Bo,2,2,"mat-option",17,Jt,false,No,2,0,"mat-option",41),mf()(),yT(22,Vo,3,0,"mat-chip-set",42),mf();}if(a&2){let e=RT(2);Jw(6),uy("value",e.selectedClients()),Jw(6),uy("value",e.buscarCliente()),Jw(6),wf(" ",e.allClientsSelected()?"Quitar todos":"Seleccionar todos"," "),Jw(),wT(e.clientOptions()),Jw(3),DT(e.selectedClients().length?22:-1);}}function Ho(a,t){if(a&1){let e=AT();La(0,"button",50),ec("click",function(){sg(e);let n=RT(2);return ag(n.clearFilters())}),La(1,"mat-icon"),iS(2,"filter_alt_off"),mf(),iS(3," Limpiar filtros "),mf();}}function Go(a,t){if(a&1){let e=AT();La(0,"div",20)(1,"div",21)(2,"mat-form-field",22)(3,"mat-label"),iS(4,"Buscar en el tablero"),mf(),La(5,"input",23),ec("input",function(n){sg(e);let o=RT();return ag(o.onBoardSearch(n.target.value))})("keydown.enter",function(){sg(e);let n=RT();return ag(n.submitBoardSearch())}),mf(),La(6,"mat-icon",24),iS(7,"search"),mf(),yT(8,Do,2,0,"mat-hint")(9,Po,2,0,"mat-hint"),mf()(),La(10,"div",21)(11,"mat-button-toggle-group",25),ec("change",function(n){sg(e);let o=RT();return ag(o.setPriority(n.value))}),IT(12,Mo,2,2,"mat-button-toggle",17,_T),mf(),yT(14,Eo,4,3,"button",26),yT(15,Io,4,3,"button",27),yT(16,Ao,23,5,"div",28),yT(17,zo,23,5,"div",29),mf(),yT(18,Ho,4,0,"button",30),mf();}if(a&2){let e=RT();Jw(5),uy("value",e.boardSearchText()),Jw(3),DT(e.searchingTickets()?8:e.searchPending()?9:-1),Jw(3),uy("value",e.priorityFilter()),Jw(),wT(e.PRIORITY_FILTERS),Jw(2),DT(e.esConsolidado()?-1:14),Jw(),DT(e.puedeVerEquipo()&&!e.esConsolidado()?15:-1),Jw(),DT(e.assigneeChips().length&&!e.esConsolidado()?16:-1),Jw(),DT(e.clientChips().length?17:-1),Jw(),DT(e.hasFilters()?18:-1);}}function qo(a,t){if(a&1&&(La(0,"span",60)(1,"mat-icon",75),iS(2,"groups"),mf(),iS(3),mf()),a&2){let e=RT().$implicit,i=RT(2);Jw(3),wf(" ",i.subtipoLabel(e.subtipo));}}function jo(a,t){if(a&1){let e=AT();La(0,"button",78),ec("click",function(n){sg(e);let o=RT(2).$implicit,r=RT(2);return ag(r.copiarTicket(o.ticket,n))}),La(1,"mat-icon"),iS(2),mf()();}if(a&2){let e=RT(2).$implicit,i=RT(2);uy("matTooltip",i.ticketCopiado()===e.ticket?"Copiado":"Copiar n\xFAmero"),Jw(2),My(i.ticketCopiado()===e.ticket?"check":"content_copy");}}function Uo(a,t){if(a&1&&(La(0,"span",76),iS(1),mf(),yT(2,jo,3,2,"button",77)),a&2){let e=RT().$implicit;Jw(),My(e.ticket?"#"+e.ticket:e.id),Jw(),DT(e.ticket?2:-1);}}function $o(a,t){if(a&1&&(La(0,"span",79),iS(1),mf()),a&2){let e=RT().$implicit,i=RT(2);ZT(i.prioClase(i.ticketPrio(e.ticket))),Jw(),wf("#",i.ticketPrio(e.ticket));}}function Qo(a,t){if(a&1&&(La(0,"span",80),iS(1),mf()),a&2){let e=RT().$implicit,i=RT(2);ZT("prio-"+e.priority),Jw(),My(i.PRIORITY_LABELS[e.priority]);}}function Wo(a,t){if(a&1&&(La(0,"span",63)(1,"mat-icon",75),iS(2,"groups"),mf(),iS(3),mf()),a&2){let e=RT().$implicit,i=RT(2);Jw(3),wf("",i.boardLabel(e.board)," ");}}function Ko(a,t){if(a&1){let e=AT();La(0,"button",83),ec("click",function(){let n=sg(e).$implicit,o=RT(2).$implicit,r=RT(2);return ag(r.moveCard(o,n.status))}),La(1,"mat-icon"),iS(2),mf(),iS(3),mf();}if(a&2){let e=t.$implicit,i=RT(2).$implicit;uy("disabled",e.status===i.status),Jw(2),My(e.status===i.status?"radio_button_checked":"radio_button_unchecked"),Jw(),wf(" ",e.label," ");}}function Zo(a,t){if(a&1&&(La(0,"button",81),ec("click",function(i){return i.stopPropagation()}),La(1,"mat-icon"),iS(2,"drive_file_move"),mf()(),La(3,"mat-menu",null,4),IT(5,Ko,4,3,"button",82,wa),mf()),a&2){let e=LT(4),i=RT(3);uy("matMenuTriggerFor",e),Jw(5),wT(i.columns());}}function Yo(a,t){if(a&1){let e=AT();La(0,"button",84),ec("click",function(n){sg(e);let o=RT().$implicit,r=RT(2);return n.stopPropagation(),ag(r.deleteCard(o))}),La(1,"mat-icon"),iS(2,"close"),mf()();}}function Xo(a,t){if(a&1&&(La(0,"span",66),iS(1),mf()),a&2){let e=RT().$implicit,i=fS(1);Jw(),My(e.clientName||i?.name);}}function Jo(a,t){if(a&1&&(La(0,"div",85)(1,"mat-icon",75),iS(2,"schedule"),mf(),iS(3),mf()),a&2){let e=RT(2).$implicit,i=RT(2);Jw(3),wf(" ",i.fmtReunion(e.inicio,e.fin));}}function er(a,t){if(a&1&&(La(0,"a",87),ec("click",function(i){return i.stopPropagation()}),La(1,"mat-icon",75),iS(2,"link"),mf(),iS(3," Abrir enlace "),mf()),a&2){let e=RT(2).$implicit,i=RT(2);uy("href",i.linkHref(e.link),rv);}}function tr(a,t){if(a&1&&(yT(0,Jo,4,1,"div",85),yT(1,er,4,1,"a",86)),a&2){let e=RT().$implicit;DT(e.inicio?0:-1),Jw(),DT(e.link?1:-1);}}function ir(a,t){if(a&1&&(La(0,"span",68),iS(1),mf()),a&2){let e=RT().$implicit;Jw(),My(e.hdEstatus);}}function nr(a,t){if(a&1&&(La(0,"div",69),iS(1),mf()),a&2){RT();let e=fS(2);Jw(),wf("\u26A0 Pr\xF3ximo a vencer \u2014 ",e.badge);}}function ar(a,t){if(a&1){let e=AT();La(0,"div",88),ec("click",function(n){return n.stopPropagation()}),Ja$1(1,"mat-progress-bar",89),La(2,"input",90),ec("change",function(n){sg(e);let o=RT().$implicit,r=RT(2);return ag(r.onProgressChange(o,n.target.value))}),mf()(),La(3,"button",91),ec("click",function(n){sg(e);let o=RT().$implicit,r=RT(2);return n.stopPropagation(),ag(r.toggleWaiting(o))}),iS(4),mf();}if(a&2){let e=RT().$implicit,i=RT(2);Jw(),Iy("--mdc-linear-progress-active-indicator-color",i.progColor(e.progress)),uy("value",e.progress),Jw(),uy("value",e.progress);let n=i.waitingDays(e);Jw(),nc("active",n!==null&&n<3)("alert",n!==null&&n>=3),Jw(),wf(" ",n!==null&&n>=3?"\u26A0 Notificar al cliente":"\u23F3 Esperando cliente"," ");}}function or(a,t){if(a&1){let e=AT();La(0,"div",92),ec("click",function(n){return n.stopPropagation()}),La(1,"mat-checkbox",93),ec("change",function(n){sg(e);let o=RT().$implicit,r=RT(2);return ag(r.onCert(o,n))}),mf(),La(2,"span",94),iS(3,"Certificado"),mf()();}a&2&&(Jw(),uy("checked",false));}function rr(a,t){if(a&1){let e=AT();La(0,"div",92),ec("click",function(n){return n.stopPropagation()}),La(1,"mat-checkbox",95),ec("change",function(n){sg(e);let o=RT().$implicit,r=RT(2);return ag(r.onFinalize(o,n))}),iS(2),mf()();}if(a&2){let e=RT().$implicit;Jw(),uy("checked",e.approved)("disabled",!!e.ticket),Jw(),wf(" ",e.approved?"Finalizado \u2713":"Finalizado"," ");}}function sr(a,t){if(a&1&&(La(0,"span",73),Ja$1(1,"span",96),La(2,"span",97),iS(3),mf()()),a&2){RT();let e=fS(0),i=RT(2);uy("matTooltip",e.name),Jw(),Iy("background",e.color),Jw(2),My(i.shortName(e.name));}}function cr(a,t){a&1&&(La(0,"span",74),Ja$1(1,"span",96),La(2,"span",97),iS(3,"Sin asignar"),mf()());}function lr(a,t){if(a&1){let e=AT();ky(0)(1)(2),La(3,"mat-card",58),ec("click",function(){let n=sg(e).$implicit,o=RT(2);return ag(o.openDetail(n))}),La(4,"div",59),yT(5,qo,4,1,"span",60)(6,Uo,3,2),yT(7,$o,2,3,"span",61)(8,Qo,2,3,"span",62),yT(9,Wo,4,1,"span",63),Ja$1(10,"span",64),yT(11,Zo,7,1),yT(12,Yo,3,0,"button",65),mf(),yT(13,Xo,2,1,"span",66),La(14,"div",67),iS(15),mf(),yT(16,tr,2,2),yT(17,ir,2,1,"span",68),yT(18,nr,2,1,"div",69),yT(19,ar,5,9)(20,or,4,1,"div",70)(21,rr,3,3,"div",70),La(22,"div",71)(23,"span",72)(24,"mat-icon"),iS(25,"event"),mf(),iS(26),mf(),yT(27,sr,4,4,"span",73)(28,cr,4,0,"span",74),mf()();}if(a&2){let e,i=t.$implicit,n=RT(2),o=dS(n.assigneeView(i));Jw();let r=dS(n.clientOf(i.client)),l=n.clientStyle(r);Jw();let p=dS(n.dueInfo(i.dueDate,i.status));Jw(),Iy("background",l.bg)("color",l.ink)("--accent",l.accent)("--tilt",n.cardTilt(i.id)),nc("not-mine",!n.canDrag(i))("overdue",p.overdue)("soon",p.soon),uy("id","card-"+i.id)("cdkDragData",i)("cdkDragDisabled",n.isHandset()||!n.canDrag(i)),Jw(2),DT(n.esReunion(i)?5:6),Jw(2),DT(i.ticket&&n.ticketPrio(i.ticket)?7:8),Jw(2),DT(n.mostrarEquipo(i)?9:-1),Jw(2),DT(n.canDrag(i)?11:-1),Jw(),DT(n.puedeEliminarTarea()&&!i.ticket?12:-1),Jw(),DT(i.clientName||r?13:-1),Jw(2),My(i.title),Jw(),DT(n.esReunion(i)?16:-1),Jw(),DT(i.ticket&&i.hdEstatus?17:-1),Jw(),DT(p.soon?18:-1),Jw(),DT((e=i.status)==="in_progress"?19:e==="review"?20:e==="done"?21:-1),Jw(4),nc("overdue",p.overdue)("soon",p.soon),Jw(3),wf("",p.str||"\u2014"," "),Jw(),DT(o?27:28);}}function dr(a,t){a&1&&(La(0,"div",57)(1,"span"),iS(2,"\u25CB"),mf(),La(3,"span"),iS(4,"Sin tareas"),mf()());}function hr(a,t){if(a&1){let e=AT();La(0,"section",15)(1,"header",51),Ja$1(2,"span",52),La(3,"span",53),iS(4),mf(),La(5,"span",54),iS(6),mf()(),La(7,"div",55),ec("cdkDropListDropped",function(n){let o=sg(e).$implicit,r=RT();return ag(r.drop(n,o.status))}),IT(8,lr,29,37,"mat-card",56,Jt,false,dr,5,0,"div",57),mf()();}if(a&2){let e=t.$implicit;Jw(),ZT("head-"+e.status),Jw(),ZT("dot-"+e.status),Jw(2),My(e.label),Jw(2),My(e.cards.length),Jw(),uy("cdkDropListData",e.cards),Jw(),wT(e.cards);}}var Ca=class a{data=f(v);auth=f(yE);helpdesk=f(K);dialog=f(fe);snack=f(Qt$1);transfer=f(p);shell=f(o);breakpoints=f(Sh);route=f(sn);isHandset=T(this.breakpoints.observe("(max-width: 768px)").pipe(F(t=>t.matches)),{initialValue:false});filtersTpl=u2("filtersTpl");syncing=W(false);ticketPrioMap=W({});ticketAssigneeMap=W({});teamOnly=W(false);teamHids=W(new Set);puedeVerEquipo=oe(()=>this.data.usesQuarkus()&&this.auth.puedeTransferir());consolidadoManual=W(false);esConsolidado=oe(()=>this.data.usesQuarkus()&&(!this.auth.veTableroCompleto()||this.consolidadoManual()));veTableroCompleto=this.auth.veTableroCompleto;constructor(){this.helpdesk.getHdUsers(),this.helpdesk.getClients(),this.helpdesk.getTicketStatuses(),this.data.ensureInit().then(()=>this.initBoards()),this.auth.ensureRolesPlataforma().then(()=>{!this.mineTocado&&!this.auth.veTableroCompleto()&&this.mineOnly.set(true);}),this.data.usesQuarkus()&&this.auth.puedeTransferir()&&this.transfer.miEquipoMiembros().then(t=>this.teamHids.set(new Set(t.map(e=>String(e.helpdeskUserId||"").trim().toUpperCase()).filter(Boolean)))).catch(()=>{}),pi(()=>this.shell.setFilters(this.filtersTpl()??null)),da$1(()=>{let t=this.helpdesk.ticketMutado();t&&ie(()=>this.reconcileTicketLive(t));});}ngOnDestroy(){this.shell.clear();}toggleTeam(){this.teamOnly.update(t=>!t);}toggleConsolidado(){this.consolidadoManual.update(t=>!t);}boards=oe(()=>this.data.boards());currentBoard=oe(()=>this.data.currentBoard());async initBoards(){if(this.data.usesQuarkus()){let t=await this.data.loadBoards(this.auth.session()?.id??null),e=this.route.snapshot.queryParamMap.get("board"),i=e&&t.some(n=>n.codigo===e)?e:t[0]?.codigo;i&&this.data.switchBoard(i);}this.focusCardFromRoute(),await this.syncTicketStatuses();}async focusCardFromRoute(){let e=this.route.snapshot.queryParamMap.get("card");if(e)for(let i=0;i<15;i++){let n=this.data.stories().find(o=>o.id===e);if(n){let o=document.getElementById("card-"+e);o&&(o.scrollIntoView({behavior:"smooth",block:"center"}),o.classList.add("card-highlight"),setTimeout(()=>o.classList.remove("card-highlight"),2200)),this.openDetail(n);return}await new Promise(o=>setTimeout(o,200));}}async switchBoard(t){!t||t===this.currentBoard()||(this.data.switchBoard(t),await this.syncTicketStatuses());}async syncTicketStatuses(){let e=(this.esConsolidado()?this.misTareas():this.data.getStoriesByBoard()).filter(r=>r.ticket);if(!e.length)return;this.syncing.set(true);let i=this.data.usesQuarkus()?await this.data.getTicketEspejoCache():null,n={},o={};await Promise.all(e.map(async r=>{let l=await this.helpdesk.fetchTicketRaw(r.ticket)??(i?i[r.ticket]:null);if(!l)return;let p=String(l.priority??"").trim();p&&(n[r.ticket]=p),o[r.ticket]={id:String(l.assigned_user_id??l.usuarioAsignado??"").trim().toUpperCase(),name:String(l.assigned_person??l.nombreAsignado??"").trim()};let _={},b=String(l.client_id??"").trim();b&&r.client!==b&&(_.client=b);let M=String(l.cliente??"").trim();M&&r.clientName!==M&&(_.clientName=M),Object.assign(_,Or(r,String(l.estado||""))),Object.keys(_).length&&this.data.patchStory(r.id,_);})),this.ticketPrioMap.set(n),this.ticketAssigneeMap.set(o),this.syncing.set(false);}reconcileTicketLive(t){let e=this.data.getStoriesByBoard().find(i=>i.ticket===t.ticket);if(e){if(t.estado){let i=Or(e,t.estado);Object.keys(i).length&&this.data.patchStory(e.id,i);}t.asignadoId!==void 0&&this.ticketAssigneeMap.set(s(r$1({},this.ticketAssigneeMap()),{[t.ticket]:{id:(t.asignadoId||"").trim().toUpperCase(),name:t.asignadoName||""}}));}}ticketPrio(t){return t&&this.ticketPrioMap()[t]||""}prioBandaDe(t){let e=this.ticketPrio(t.ticket);return e?Kn$1(e):t.priority}prioClase=hn;resolveMember=t=>Yr(t,this.data.team(),this.helpdesk.hdUsers());effAssignee(t){if(t.ticket){let e=this.ticketAssigneeMap()[t.ticket];if(e)return e.id}return String(t.assignee||"").trim()}assigneeView(t){let e=this.effAssignee(t);if(!e)return null;let i=this.resolveMember(e);if(i&&i.name&&i.name!=="\u2014")return {name:i.name,color:i.color};let n=t.ticket?this.ticketAssigneeMap()[t.ticket]?.name:"";return n?{name:n,color:_t$1(e)}:i?{name:i.name,color:i.color}:null}dueInfo=jr;progColor=zr;clientStyle=Nr;pastel=Br;cardTilt=Lr;STATUS_LABELS=Tr;PRIORITY_LABELS=Pr;PRIORITY_FILTER_LABELS=Ir;PRIORITY_FILTERS=["all","alta","media","baja"];priorityFilter=W("all");activeClients=W(new Set);activeAssignees=W(new Set);codeSearch=W("");palabraSearch=W("");matchedTickets=W(null);searchingTickets=W(false);searchedPalabra=W("");searchPending=oe(()=>{let t=this.palabraSearch().trim();return !!t&&t!==this.searchedPalabra()});mineOnly=W(false);mineTocado=false;puedeGestionarTodo=this.auth.puedeGestionarTodo;puedeBorrarBoard=this.auth.puedeBorrarBoard;puedeEliminarTarea=this.auth.puedeEliminarTarea;get myId(){return String(this.auth.session()?.id||"").trim().toUpperCase()}clients=oe(()=>this.data.clients());dedupYcutoff(t){let e=new Date;e.setDate(e.getDate()-2);let i=e.toISOString().split("T")[0],n=t.filter(l=>!(l.status==="done"&&l.approved&&(l.approvedDate||"")<i)),o=l=>parseInt(String(l).replace(/\D/g,""),10)||0,r=new Map;for(let l of n){let p=String(l.ticket||"").trim();if(!p)continue;let _=r.get(p);(!_||o(l.id)<o(_))&&r.set(p,l.id);}return n.filter(l=>{let p=String(l.ticket||"").trim();return !p||r.get(p)===l.id})}visibleStories=oe(()=>{let t=this.data.currentBoard();return this.dedupYcutoff(this.data.stories().filter(e=>!t||(e.board||"CUENCA")===t))});misTareas=oe(()=>{let t=this.myId;return t?this.dedupYcutoff(this.data.stories().filter(e=>this.effAssignee(e).toUpperCase()===t)):[]});feed=oe(()=>this.esConsolidado()?this.misTareas():this.cardsSource());filterSource=oe(()=>this.esConsolidado()?this.misTareas():this.visibleStories());cardsSource=oe(()=>{let t=this.visibleStories(),e=this.myId,i=this.mineOnly(),n=this.teamOnly();if(!i&&!n||!e)return t;let o=this.teamHids(),r=this.data.currentBoard(),l=new Date;l.setDate(l.getDate()-2);let p=l.toISOString().split("T")[0],_=new Set(t.map(M=>M.id)),b=this.data.stories().filter(M=>{if(_.has(M.id)||(M.board||"CUENCA")===(r||"CUENCA")||M.status==="done"&&M.approved&&(M.approvedDate||"")<p)return  false;let S=this.effAssignee(M).toUpperCase();return S?!!(i&&S===e||n&&o.has(S)):false});return b.length?[...t,...b]:t});esForanea(t){let e=this.data.currentBoard();return !!e&&(t.board||"CUENCA")!==e}boardLabel(t){if(!t)return "";let e=this.data.boards().find(i=>i.codigo===t);return e?.equipo||e?.nombre||t}mostrarEquipo(t){return this.esConsolidado()||this.esForanea(t)}assigneeChips=oe(()=>[...new Set(this.filterSource().map(e=>this.effAssignee(e)).filter(Boolean))].map(e=>this.resolveMember(e)).filter(e=>!!e).sort((e,i)=>(e.name||e.id).localeCompare(i.name||i.id,"es")));clientChips=oe(()=>[...new Set(this.filterSource().map(e=>e.client).filter(Boolean))].map(e=>{let i=this.clientOf(e);return {id:e,name:i?.name||e,color:i?.color||_t$1(e)}}).sort((e,i)=>e.name.localeCompare(i.name,"es")));buscarAsignado=W("");buscarCliente=W("");filtraOpc(t,e){let i=e.trim().toLowerCase();return i?t.filter(n=>n.name.toLowerCase().includes(i)||n.id.toLowerCase().includes(i)):t}assigneeOptions=oe(()=>this.filtraOpc(this.assigneeChips(),this.buscarAsignado()));clientOptions=oe(()=>this.filtraOpc(this.clientChips(),this.buscarCliente()));columns=oe(()=>{let t=this.priorityFilter(),e=this.activeClients(),i=this.activeAssignees(),n=this.codeSearch().trim().toLowerCase(),o=this.searchedPalabra().trim().toLowerCase(),r=this.matchedTickets(),l=this.mineOnly(),p=this.teamOnly(),_=this.myId,b=this.esConsolidado(),M=this.feed().filter(S=>{let X=this.effAssignee(S);if(!b&&l&&!p&&X.toUpperCase()!==_||t!=="all"&&this.prioBandaDe(S)!==t||e.size>0&&!(S.client&&e.has(S.client))||!b&&i.size>0&&!(!X||i.has(X)))return  false;if(n){let Se=String(S.ticket||"").toLowerCase(),De=String(S.id||"").toLowerCase();if(!Se.includes(n)&&!De.includes(n))return  false}if(o){let Se=[S.title,S.description,S.clientName,S.client].some(G=>String(G||"").toLowerCase().includes(o)),De=!!(S.ticket&&r?.has(String(S.ticket)));if(!Se&&!De)return  false}return  true});return Er.map(S=>({status:S,label:Tr[S],cards:M.filter(X=>X.status===S)}))});get workDeps(){return {data:this.data,auth:this.auth,dialog:this.dialog,snack:this.snack}}setPriority(t){this.priorityFilter.set(t),this.activeAssignees.set(new Set);}toggleMine(){this.mineTocado=true;let t=!this.mineOnly();this.mineOnly.set(t),t&&this.activeAssignees.set(new Set);}hasFilters=oe(()=>this.priorityFilter()!=="all"||this.mineOnly()||this.selectedAssignees().length>0||this.selectedClients().length>0||!!this.codeSearch().trim()||!!this.palabraSearch().trim());clearFilters(){this.priorityFilter.set("all"),this.mineOnly.set(false),this.activeAssignees.set(new Set),this.activeClients.set(new Set),this.codeSearch.set(""),this.palabraSearch.set(""),this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""),this.buscarAsignado.set(""),this.buscarCliente.set("");}onCodeInput(t){this.codeSearch.set(t);}onBoardSearch(t){let e=t.trim(),i=!e||/^\d+$/.test(e)||/^ta-?\d*$/i.test(e);this.onCodeInput(i?t:""),this.onPalabraInput(i?"":t);}submitBoardSearch(){this.palabraSearch().trim()&&this.submitPalabra();}boardSearchText=oe(()=>this.codeSearch()||this.palabraSearch());onPalabraInput(t){this.palabraSearch.set(t),t.trim()||(this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""));}async submitPalabra(){let t=this.palabraSearch().trim();if(this.searchedPalabra.set(t),!t){this.matchedTickets.set(null),this.searchingTickets.set(false);return}this.searchingTickets.set(true),this.matchedTickets.set(null);let e=await this.helpdesk.searchTicketNumbers(t);this.palabraSearch().trim()===t&&(this.matchedTickets.set(e),this.searchingTickets.set(false));}ticketCopiado=W(null);copiarTicket(t,e){e.stopPropagation(),navigator.clipboard?.writeText(String(t)).then(()=>{this.ticketCopiado.set(t),setTimeout(()=>this.ticketCopiado.set(null),1500);}).catch(()=>{});}selectedAssignees=oe(()=>[...this.activeAssignees()]);onAssigneeSelectChange(t){this.activeAssignees.set(new Set(t));}allAssigneesSelected=oe(()=>this.assigneeChips().length>0&&this.selectedAssignees().length===this.assigneeChips().length);toggleAllAssignees(){this.allAssigneesSelected()?this.activeAssignees.set(new Set):this.activeAssignees.set(new Set(this.assigneeChips().map(t=>t.id)));}shortName=Rr;removeAssignee(t){let e=new Set(this.activeAssignees());e.delete(t),this.activeAssignees.set(e);}clearAssignees(){this.activeAssignees.set(new Set);}selectedClients=oe(()=>[...this.activeClients()]);onClientSelectChange(t){this.activeClients.set(new Set(t));}allClientsSelected=oe(()=>this.clientChips().length>0&&this.selectedClients().length===this.clientChips().length);toggleAllClients(){this.allClientsSelected()?this.activeClients.set(new Set):this.activeClients.set(new Set(this.clientChips().map(t=>t.id)));}removeClient(t){let e=new Set(this.activeClients());e.delete(t),this.activeClients.set(e);}clientNameOf(t){return this.clientChips().find(e=>e.id===t)?.name||t}clientColorOf(t){return this.clientChips().find(e=>e.id===t)?.color||"#9aa0a6"}clientOf(t){if(!t)return;let e=this.data.getClient(t);if(e)return {id:e.id,name:e.name,color:e.color};let i=this.helpdesk.clients().find(n=>n.id===t);return i?{id:i.id,name:i.name}:{id:t,name:t}}puedeOperar(t){if(this.puedeGestionarTodo())return  true;let e=this.effAssignee(t).toUpperCase();return !!e&&e===this.myId}canDrag(t){return this.puedeOperar(t)}avisoSinPermiso(){this.snack.open("No tienes permisos para modificar esta tarea. Solo el asignado, un supervisor o el Helpdesk pueden.","OK",{duration:4e3});}async drop(t,e){await this.moveCard(t.item.data,e);}async moveCard(t,e){if(!(!t||t.status===e)){if(!this.puedeOperar(t)){this.avisoSinPermiso();return}if(e==="todo"&&t.ticket){this.snack.open("Una tarea con ticket no puede volver a To Do.","OK",{duration:3e3});return}if(t.status==="todo"&&e==="in_progress"){if(!await Ur(t,this.workDeps))return}else if(!await o_(this.dialog.open(ut,{data:{title:"Mover tarea",message:`\xBFMover "${t.title}" a "${Tr[e]}"?`,confirmText:"Mover"}}).afterClosed()))return;this.data.updateStoryStatus(t.id,e),this.pushHdEstado(t,Vr[e]);}}pushHdEstado(t,e){!t.ticket||!e||this.helpdesk.setTicketStatus(t.ticket,e).then(i=>{i?this.data.updateStoryHdEstatus(t.id,e):this.snack.open(`No se pudo actualizar el estado del ticket #${t.ticket} en el Helpdesk.`,"OK",{duration:4e3});});}openDetail(t){if(t.tipo==="REUNION")this.dialog.open(ze,{data:{story:t},width:"520px",maxWidth:"95vw"});else {let e=s(r$1({},t),{assignee:this.effAssignee(t)});this.dialog.open(ki,{data:{story:e},width:"560px",maxWidth:"95vw"});}}openNew(){this.dialog.open(ki,{data:{story:null},width:"560px",maxWidth:"95vw"});}openNewReunion(){this.dialog.open(ze,{data:{story:null},width:"520px",maxWidth:"95vw"});}esReunion(t){return t.tipo==="REUNION"}subtipoLabel(t){return t==="PRESENTACION"?"Presentaci\xF3n":t==="CAPACITACION"?"Capacitaci\xF3n":"Reuni\xF3n"}linkHref(t){let e=(t||"").trim();return e?/^[a-z][a-z0-9+.-]*:/i.test(e)?e:"https://"+e:""}fmtReunion(t,e){if(!t)return "";let i=new Date(t);if(isNaN(i.getTime()))return t;let n=i.toLocaleDateString("es-ES",{day:"2-digit",month:"short"}),o=p=>p&&!isNaN(new Date(p).getTime())?new Date(p).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}):"",r=o(t),l=o(e);return `${n} \xB7 ${r}${l?"\u2013"+l:""}`}onProgressChange(t,e){this.data.updateStoryProgress(t.id,Hr(parseInt(e,10)||0));}waitingDays(t){return !t.waitingClient||!t.waitingDate?null:Math.floor((Date.now()-new Date(t.waitingDate+"T00:00:00").getTime())/864e5)}toggleWaiting(t){let e=!t.waitingClient;this.data.setWaitingClient(t.id,e),e&&this.pushHdEstado(t,Fr);}async onCert(t,e){if(!e.checked)return;if(!this.puedeOperar(t)){e.source.checked=false,this.avisoSinPermiso();return}if(!await o_(this.dialog.open(ut,{data:{title:"Certificar tarea",message:`\xBFMarcar "${t.title}" como certificada y moverla a Finalizado?`,confirmText:"Certificar"}}).afterClosed())){e.source.checked=false;return}this.data.updateStoryStatus(t.id,"done"),this.pushHdEstado(t,Vr.done);}async onFinalize(t,e){if(t.ticket)return;if(!this.puedeOperar(t)){e.source.checked=!!t.approved,this.avisoSinPermiso();return}if(!e.checked){this.data.unapproveStory(t.id);return}if(!await o_(this.dialog.open(ut,{data:{title:"Finalizar tarea",message:`\xBFMarcar "${t.title}" como finalizada?`,confirmText:"Finalizar"}}).afterClosed())){e.source.checked=false;return}this.data.approveStory(t.id);}async deleteCard(t){if(t.ticket){this.snack.open("Las tareas con ticket asociado no se pueden eliminar.","OK",{duration:3500});return}if(!this.puedeEliminarTarea()){this.snack.open("Solo el Responsable de Equipo puede eliminar tareas.","OK",{duration:3500});return}await o_(this.dialog.open(ut,{data:{title:"Eliminar tarea",message:`Vas a eliminar la tarea:

"${t.title}"

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Eliminar",danger:true,requireWord:"BORRAR"}}).afterClosed())&&this.data.deleteStory(t.id);}async clearBoard(){let t=this.data.getStoriesByBoard(),e=t.filter(r=>!r.ticket),i=t.length-e.length,n=e.map(r=>r.id);if(!n.length){this.snack.open(i?"Solo hay tareas con ticket asociado (no se pueden borrar).":"No hay tareas en el tablero.","OK",{duration:3500});return}await o_(this.dialog.open(ut,{data:{title:"Borrar board",message:`Vas a eliminar ${n.length} tarea(s) sin ticket del tablero.${i?`

(${i} tarea(s) con ticket asociado NO se borran.)`:""}

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Borrar todo",danger:true,requireWord:"BORRAR"}}).afterClosed())&&n.forEach(r=>this.data.deleteStory(r));}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Kt$1({type:a,selectors:[["app-board"]],viewQuery:function(e,i){e&1&&Dy(i.filtersTpl,vo,5),e&2&&FT();},decls:27,vars:5,consts:[["crearMenu","matMenu"],["filtersTpl",""],["asigSel",""],["cliSel",""],["moveMenu","matMenu"],[1,"board-bar"],["appearance","outline","subscriptSizing","dynamic",1,"board-select"],[1,"board-title"],["type","button","mat-stroked-button","","matTooltip","Ver todas mis tareas de todos los equipos en un solo tablero",1,"mine-toggle","consolidado-toggle",3,"active"],[1,"spacer"],["mat-flat-button","","color","primary",3,"matMenuTriggerFor"],[1,"crear-caret"],["mat-menu-item","",3,"click"],["mat-stroked-button","",1,"danger"],["cdkDropListGroup","",1,"kanban"],[1,"kanban-col"],[3,"selectionChange","value"],[3,"value"],["type","button","mat-stroked-button","","matTooltip","Ver todas mis tareas de todos los equipos en un solo tablero",1,"mine-toggle","consolidado-toggle",3,"click"],["mat-stroked-button","",1,"danger",3,"click"],[1,"board-filters-panel"],[1,"filter-group"],["appearance","outline","subscriptSizing","dynamic",1,"ticket-search"],["matInput","","placeholder","N\xB0, TA-046 o una palabra\u2026",3,"input","keydown.enter","value"],["matSuffix",""],["hideSingleSelectionIndicator","","aria-label","Filtrar por prioridad",1,"prio-filter",3,"change","value"],["type","button","mat-stroked-button","","matTooltip","Mostrar solo mis tareas",1,"mine-toggle",3,"active"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"active"],[1,"assignee-filter"],[1,"client-filter"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters"],["type","button","mat-stroked-button","","matTooltip","Mostrar solo mis tareas",1,"mine-toggle",3,"click"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"click"],[1,"filter-label"],["appearance","outline","subscriptSizing","dynamic",1,"assignee-select"],["multiple","",3,"selectionChange","closed","value"],[1,"sel-head",3,"click"],[1,"sel-head-search"],["placeholder","Buscar consultor\u2026",3,"input","keydown","value"],["type","button","aria-label","Cerrar lista",1,"sel-close",3,"click"],["type","button",1,"sel-head-all",3,"click"],["disabled",""],[1,"assignee-chips"],[1,"achip",3,"background","matTooltip"],[1,"achip",3,"removed","matTooltip"],["matChipRemove",""],["appearance","outline","subscriptSizing","dynamic",1,"client-select"],["placeholder","Buscar cliente\u2026",3,"input","keydown","value"],[1,"achip","cchip",3,"background","matTooltip"],[1,"achip","cchip",3,"removed","matTooltip"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters",3,"click"],[1,"col-header"],[1,"col-dot"],[1,"col-title"],[1,"col-count"],["cdkDropList","",1,"col-cards",3,"cdkDropListDropped","cdkDropListData"],["cdkDrag","",1,"story-card",3,"id","not-mine","overdue","soon","background","color","--accent","--tilt","cdkDragData","cdkDragDisabled"],[1,"empty-col"],["cdkDrag","",1,"story-card",3,"click","id","cdkDragData","cdkDragDisabled"],[1,"card-top"],[1,"reunion-badge"],["matTooltip","Prioridad del ticket",1,"prio-badge",3,"class"],[1,"prio-badge",3,"class"],["matTooltip","Equipo due\xF1o de la tarea",1,"team-badge"],[1,"grow"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn"],[1,"client-name"],[1,"card-title"],[1,"hd-estatus"],[1,"soon-badge"],[1,"card-check"],[1,"card-bottom"],[1,"card-due"],[1,"card-assignee",3,"matTooltip"],["matTooltip","Sin asignar",1,"card-assignee","unassigned"],["inline",""],[1,"card-ticket"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"matTooltip"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"click","matTooltip"],["matTooltip","Prioridad del ticket",1,"prio-badge"],[1,"prio-badge"],["mat-icon-button","","matTooltip","Mover a otra columna","aria-label","Mover tarjeta a otra columna",1,"move-btn",3,"click","matMenuTriggerFor"],["mat-menu-item","",3,"disabled"],["mat-menu-item","",3,"click","disabled"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn",3,"click"],[1,"reunion-horario"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"href"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"click","href"],[1,"prog",3,"click"],["mode","determinate",3,"value"],["type","number","min","0","max","100","step","5",3,"change","value"],[1,"wait-btn",3,"click"],[1,"card-check",3,"click"],["aria-label","Certificado",3,"change","checked"],[1,"check-text"],[3,"change","checked","disabled"],[1,"ca-dot"],[1,"ca-name"]],template:function(e,i){if(e&1&&(La(0,"div",5),yT(1,ko,6,1,"mat-form-field",6),yT(2,Co,4,0,"h2",7),yT(3,wo,4,3,"button",8),Ja$1(4,"span",9),La(5,"button",10)(6,"mat-icon"),iS(7,"add"),mf(),iS(8," Crear "),La(9,"mat-icon",11),iS(10,"arrow_drop_down"),mf()(),La(11,"mat-menu",null,0)(13,"button",12),ec("click",function(){return i.openNew()}),La(14,"mat-icon"),iS(15,"assignment"),mf(),iS(16," Tarea de desarrollo/soporte"),mf(),La(17,"button",12),ec("click",function(){return i.openNewReunion()}),La(18,"mat-icon"),iS(19,"groups"),mf(),iS(20," Reuni\xF3n"),mf()(),yT(21,So,4,0,"button",13),mf(),iy(22,Go,19,8,"ng-template",null,1,vS),La(24,"div",14),IT(25,hr,11,8,"section",15,wa),mf()),e&2){let n=LT(12);Jw(),DT(i.boards().length>1&&!i.esConsolidado()?1:-1),Jw(),DT(i.esConsolidado()&&!i.veTableroCompleto()?2:-1),Jw(),DT(i.veTableroCompleto()?3:-1),Jw(2),uy("matMenuTriggerFor",n),Jw(16),DT(i.puedeBorrarBoard()?21:-1),Jw(4),wT(i.columns());}},dependencies:[la,ca,sa,ra,_,I,Aa$1,Fa$1,eo$1,pa,Qt,vt,ka,Xt,ya,xa,he,Zn$1,me,ue,Io$1,Lr$1,zr$1,Bt$1,Wt$1,W$1,ma,Zt,yt,wt,on,rn,zt$1,mt,Lt$1,P,G,Nt$1],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:block;padding:16px;min-height:100%;box-sizing:border-box;background-color:#efeadf;background-image:linear-gradient(rgba(43,43,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(43,43,58,.04) 1px,transparent 1px);background-size:24px 24px}.board-bar[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding:8px 12px;background:#ffffffbf;border:1px solid rgba(43,43,58,.08);border-radius:12px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.board-bar[_ngcontent-%COMP%]   .board-select[_ngcontent-%COMP%]{width:220px}.board-bar[_ngcontent-%COMP%]   .board-title[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;margin:0;font-size:16px;font-weight:700;color:var(--mat-sys-on-surface)}.board-bar[_ngcontent-%COMP%]   .board-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--brand, #048abf)}.board-bar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}.board-bar[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}.board-filters-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:12px}.board-filters-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .prio-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .assignee-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .ticket-search[_ngcontent-%COMP%]{width:100%}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:8px}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] + .filter-group[_ngcontent-%COMP%]{padding-top:12px;border-top:1px solid var(--mat-sys-outline-variant)}.board-filters-panel[_ngcontent-%COMP%]   .filter-group-title[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mat-sys-on-surface-variant)}.board-filters-panel[_ngcontent-%COMP%]   .clear-filters[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]{--mat-icon-size: 18px;justify-content:flex-start}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle.active[_ngcontent-%COMP%]{background:var(--brand, #048abf);color:#fff;border-color:var(--brand, #048abf)}.board-filters-panel[_ngcontent-%COMP%]   .assignee-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-filter[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.assignee-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.assignee-filter[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.assignee-select[_ngcontent-%COMP%]{width:200px}.assignee-chips[_ngcontent-%COMP%]{display:flex}.achip[_ngcontent-%COMP%]{font-size:11.5px;font-weight:600;color:#3a3a4a;min-height:26px}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]{color:#3a3a4a;opacity:.7}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]:hover{opacity:1}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.client-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.client-select[_ngcontent-%COMP%]{width:200px}.ticket-search[_ngcontent-%COMP%]{width:150px}.cchip[_ngcontent-%COMP%]{max-width:200px}.cchip[_ngcontent-%COMP%]     .mdc-evolution-chip__text-label{overflow:hidden;text-overflow:ellipsis}.kanban[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(220px,1fr));gap:16px;align-items:start}.kanban-col[_ngcontent-%COMP%]{background:#fff6;border:1px solid rgba(43,43,58,.06);border-radius:12px;padding:10px;min-height:140px}.col-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:2px 4px 8px;margin-bottom:6px;border-bottom:2px solid var(--mat-sys-outline-variant)}.col-header[_ngcontent-%COMP%]   .col-title[_ngcontent-%COMP%]{font-size:13px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;color:#2b2b3a}.col-header[_ngcontent-%COMP%]   .col-count[_ngcontent-%COMP%]{margin-left:auto;font-size:12px;font-weight:700;color:#2b2b3a;background:#fff;border:1px solid rgba(43,43,58,.12);border-radius:10px;padding:1px 8px}.col-header.head-todo[_ngcontent-%COMP%]{border-bottom-color:#8a8a9a}.col-header.head-in_progress[_ngcontent-%COMP%]{border-bottom-color:var(--brand)}.col-header.head-review[_ngcontent-%COMP%]{border-bottom-color:var(--accent)}.col-header.head-done[_ngcontent-%COMP%]{border-bottom-color:#27ae60}.col-dot[_ngcontent-%COMP%]{width:9px;height:9px;border-radius:50%}.col-dot.dot-todo[_ngcontent-%COMP%]{background:#8a8a9a}.col-dot.dot-in_progress[_ngcontent-%COMP%]{background:var(--brand)}.col-dot.dot-review[_ngcontent-%COMP%]{background:var(--accent)}.col-dot.dot-done[_ngcontent-%COMP%]{background:#27ae60}.col-cards[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;min-height:60px;padding:4px 2px}.empty-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:24px 0;color:#2b2b3a59;font-size:12px}.story-card.card-highlight[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_card-highlight 2.2s ease-out;position:relative;z-index:3}@keyframes _ngcontent-%COMP%_card-highlight{0%,30%{box-shadow:0 0 0 3px var(--brand, #048abf),0 6px 16px #048abf73}to{box-shadow:var(--shadow)}}.story-card[_ngcontent-%COMP%]{--shadow: 0 4px 10px rgba(43, 43, 58, .16), 0 1px 2px rgba(43, 43, 58, .1);position:relative;padding:11px 12px 10px;border:none;border-top:3px solid var(--accent);border-radius:3px;box-shadow:var(--shadow);cursor:pointer;-webkit-user-select:none;user-select:none;transform:rotate(var(--tilt, 0deg));transition:transform .16s ease,box-shadow .16s ease}.story-card[_ngcontent-%COMP%]:hover{transform:rotate(0) translateY(-3px) scale(1.015);box-shadow:0 10px 22px #2b2b3a38,0 2px 4px #2b2b3a1f;z-index:2}.story-card.not-mine[_ngcontent-%COMP%]{cursor:default;filter:saturate(.85)}.story-card.overdue[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #e74c3c}.story-card.soon[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #f29e3b}.story-card.cdk-drag-dragging[_ngcontent-%COMP%]{transform:rotate(0);box-shadow:0 14px 30px #2b2b3a47}.card-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;row-gap:4px;margin-bottom:4px}.card-top[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%]{flex:1}.card-top[_ngcontent-%COMP%]   .card-ticket[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-left:-4px;padding:0;border:none;background:transparent;color:#6d6d75;cursor:pointer;border-radius:50%}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]:hover{background:#00000014;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]{width:24px;height:24px;line-height:24px;color:#2b2b3a8c}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.prio-badge[_ngcontent-%COMP%]{font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;padding:1px 7px;border-radius:9px;color:#fff}.prio-badge.prio-alta[_ngcontent-%COMP%]{background:#e74c3c}.prio-badge.prio-media[_ngcontent-%COMP%]{background:#f2811d}.prio-badge.prio-baja[_ngcontent-%COMP%]{background:#2b2b3a73}.team-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;letter-spacing:.02em;padding:1px 7px 1px 5px;border-radius:9px;color:#fff;background:#6c5ce7;white-space:nowrap;max-width:100%;overflow:hidden}.team-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;height:13px;width:13px}.client-name[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#2b2b3a;margin-bottom:4px}.client-name[_ngcontent-%COMP%]:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}.card-title[_ngcontent-%COMP%]{font-size:13px;line-height:1.35;color:#2b2b3a;margin-bottom:8px}.soon-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#b5560e;margin-bottom:8px}.hd-estatus[_ngcontent-%COMP%]{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:#2b2b3a;background:#ffffffa6;border:1px solid var(--accent);border-radius:9px;padding:1px 8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{flex:1;border-radius:4px}.prog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:48px;padding:3px 5px;border:1px solid rgba(43,43,58,.2);border-radius:5px;background:#ffffffb3;color:#2b2b3a;font:inherit;font-size:12px;text-align:right}.wait-btn[_ngcontent-%COMP%]{width:100%;border:1px solid rgba(43,43,58,.18);background:#ffffff8c;color:#2b2b3a;border-radius:6px;padding:5px 8px;font-size:12px;cursor:pointer;margin-bottom:8px}.wait-btn.active[_ngcontent-%COMP%]{background:#fef5e7;border-color:#f29e3b;color:#b9770e}.wait-btn.alert[_ngcontent-%COMP%]{background:#fdedec;border-color:#e74c3c;color:#c0392b;font-weight:600;animation:_ngcontent-%COMP%_pulse 1.4s ease-in-out infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{opacity:1}50%{opacity:.55}}.card-check[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;margin-bottom:6px;font-size:13px;color:#2b2b3a}.check-text[_ngcontent-%COMP%]{cursor:default}.card-bottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-top:4px}.card-due[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:11px;color:#2b2b3a99}.card-due[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-due.overdue[_ngcontent-%COMP%]{color:#c0392b;font-weight:700}.card-due.soon[_ngcontent-%COMP%]{color:#b5560e}.card-assignee[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;min-width:0;max-width:150px;padding:3px 8px 3px 6px;border-radius:12px;background:#ffffffb8}.card-assignee[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{flex:none;width:10px;height:10px;border-radius:50%;background:#9aa0a6}.card-assignee[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{min-width:0;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#2b2b3a}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{background:transparent;border:1.5px dashed rgba(43,43,58,.4)}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{font-weight:500;color:#6b6b78}.reunion-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;padding:2px 8px;border-radius:9px;background:#7e57c2;color:#fff}.reunion-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;width:13px;height:13px}.reunion-horario[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#5e35b1;margin-top:4px}.reunion-horario[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.reunion-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:var(--mat-sys-primary, #048abf);text-decoration:none;margin-top:3px}.reunion-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.reunion-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.crear-caret[_ngcontent-%COMP%]{margin-left:-4px}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:3px;box-shadow:0 14px 30px #2b2b3a4d}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.3}.col-cards.cdk-drop-list-dragging[_ngcontent-%COMP%]   .story-card[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .2s cubic-bezier(0,0,.2,1)}@media(max-width:1024px){.kanban[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.kanban[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}.client-select[_ngcontent-%COMP%]{width:100%}}']})};export{Ca as Board};