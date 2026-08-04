import {f,E as EE,c as fe,S as Sh,aK as sn,F,g as v2,W,o as oe,p as pi,aL as d_,aM as j,aN as m,K as Kt$1,aO as W$1,aP as zt$1,aQ as mt,L as La,C as CT,J as Ja$1,a as fS,m as mf,e as ec,ah as ay,H as AT,aR as zT,s as sb,T as TT,d as dy,I as NT,t as _y,$ as $T,y as _t$2,x as vi,z as Wo$1,A as No$1,B as jo$1,G as zo$1,ag as FT,v as vC,N as Ny,a3 as nc,ae as _i,D as DC,w as wf,P as $e,Q as Oe$1,a7 as Kt$2,X as ge,as as bi,aS as ct,ax as DR,an as y,ao as U,aT as Lh,ap as re,ar as X,aB as Oo$1,at as Bt$2,aU as Zc,a9 as Rh,aD as O_,aG as De,aV as Xt$1,ad as Uy,ak as H$1,aW as wn,aX as de,aY as x,aZ as Pt,av as Re$1,a_ as xe,a$ as Fe$1,b0 as At$1,b1 as E2,b2 as $4,U as e_,au as zE,a4 as tc,a5 as _f,a6 as If,aj as NE,ay as Xc,b3 as wr,b4 as P4,b5 as sc,b6 as x4,b7 as J,a0 as BT,a1 as HT,aw as Dy,b8 as c3,b9 as g2,ba as Vh,Z as L,bb as K4,bc as nu,bd as gy,a2 as tS,aa as km,ac as iy,az as cr,be as Ph,bf as vf,bg as yf,bh as m$1,bi as _g,bj as Ig,bk as Vs,j as jT,aH as cg,aI as ug,bl as b$1,aA as tt,bm as ut$2,al as yi,bn as ee,bo as x_,bp as Ah,bq as ht,br as Ki,bs as Yi,bt as MT,af as by,bu as g_,bv as Fy,bw as yS,bx as DS,by as bS,aJ as iv}from'./main-IEKXYXAF.js';import {_,I}from'./chunk-7DxJ0p2j.js';import {d,f as f$1}from'./chunk-530QPjnU.js';import {T}from'./chunk-B5EHog6R.js';import {O as Oi}from'./chunk-Det_NsBX.js';import {T as Tr,$ as $n$1,h as hn,L as Lr,_ as _t$1,H as Hr,Y as Yr,B as Br,R as Rr,N as Nr,E as Er,O as Or,P as Pr,S as Sr,F as Fr,j as jr,u as ut$1,I as Ir,z as zr,V as Vr,o as on,r as rn,a as Ys,b as Ls,c as Rn}from'./chunk-blkL-qnM.js';import'./chunk-CzMhc9Y9.js';import {L as Lt$1,P,G,N as Nt$1}from'./chunk-BLn7h3vD.js';import {v}from'./chunk-RommtJhE.js';import'./chunk-D4C5L8R9.js';import {s}from'./chunk-DL780i6E.js';import'./chunk-CZ7c4DUg.js';import {p}from'./chunk-BoobtWGm.js';import {Q as Qt$1}from'./chunk-CLB3wZAk.js';import {B as Bt$1,W as Wt$1,b}from'./chunk-9A3fR52R.js';import {K}from'./chunk-BjOnMKI8.js';import {y as yt,w as wt}from'./chunk-DtavzG_0.js';import {A as Aa$1,F as Fa$1,e as eo$1,h as he,Z as Zn$1,m as me,u as ue,I as Io$1,L as Lr$1,z as zr$1,d as da$1,l as ln,i as ia$1,a as Di,j as ji,_ as _t$3,K as K$1}from'./chunk-C1I5MRnT.js';function At(a){let i=a.cloneNode(true),e=i.querySelectorAll("[id]"),t=a.nodeName.toLowerCase();i.removeAttribute("id");for(let n=0;n<e.length;n++)e[n].removeAttribute("id");return t==="canvas"?Bn(a,i):(t==="input"||t==="select"||t==="textarea")&&An(a,i),Fn("canvas",a,i,Bn),Fn("input, textarea, select",a,i,An),i}function Fn(a,i,e,t){let n=i.querySelectorAll(a);if(n.length){let o=e.querySelectorAll(a);for(let r=0;r<n.length;r++)t(n[r],o[r]);}}var wa=0;function An(a,i){i.type!=="file"&&(i.value=a.value),i.type==="radio"&&i.name&&(i.name=`mat-clone-${i.name}-${wa++}`);}function Bn(a,i){let e=i.getContext("2d");if(e)try{e.drawImage(a,0,0);}catch{}}function Gt(a){let i=a.getBoundingClientRect();return {top:i.top,right:i.right,bottom:i.bottom,left:i.left,width:i.width,height:i.height,x:i.x,y:i.y}}function Bt(a,i,e){let{top:t,bottom:n,left:o,right:r}=a;return e>=t&&e<=n&&i>=o&&i<=r}function Sa(a,i){let e=i.left<a.left,t=i.left+i.width>a.right,n=i.top<a.top,o=i.top+i.height>a.bottom;return e||t||n||o}function Oe(a,i,e){a.top+=i,a.bottom=a.top+a.height,a.left+=e,a.right=a.left+a.width;}function Ln(a,i,e,t){let{top:n,right:o,bottom:r,left:l,width:p,height:_}=a,v=p*i,b=_*i;return t>n-b&&t<r+b&&e>l-v&&e<o+v}var ut=class{_document;positions=new Map;constructor(i){this._document=i;}clear(){this.positions.clear();}cache(i){this.clear(),this.positions.set(this._document,{scrollPosition:this.getViewportScrollPosition()}),i.forEach(e=>{this.positions.set(e,{scrollPosition:{top:e.scrollTop,left:e.scrollLeft},clientRect:Gt(e)});});}handleScroll(i){let e=ht(i),t=this.positions.get(e);if(!t)return null;let n=t.scrollPosition,o,r;if(e===this._document){let _=this.getViewportScrollPosition();o=_.top,r=_.left;}else o=e.scrollTop,r=e.scrollLeft;let l=n.top-o,p=n.left-r;return this.positions.forEach((_,v)=>{_.clientRect&&e!==v&&e.contains(v)&&Oe(_.clientRect,l,p);}),n.top=o,n.left=r,{top:l,left:p}}getViewportScrollPosition(){return {top:window.scrollY,left:window.scrollX}}};function Kn(a,i){let e=a.rootNodes;if(e.length===1&&e[0].nodeType===i.ELEMENT_NODE)return e[0];let t=i.createElement("div");return e.forEach(n=>t.appendChild(n)),t}function qt(a,i,e){for(let t in i)if(i.hasOwnProperty(t)){let n=i[t];n?a.setProperty(t,n,e?.has(t)?"important":""):a.removeProperty(t);}return a}function we(a,i){let e=i?"":"none";qt(a.style,{"touch-action":i?"":"none","-webkit-user-drag":i?"":"none","-webkit-tap-highlight-color":i?"":"transparent","user-select":e,"-ms-user-select":e,"-webkit-user-select":e,"-moz-user-select":e});}function Nn(a,i,e){qt(a.style,{position:i?"":"fixed",top:i?"":"0",opacity:i?"":"0",left:i?"":"-999em"},e);}function gt(a,i){return i&&i!="none"?a+" "+i:a}function Vn(a,i){a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,a.style.transform=Fe(i.left,i.top);}function Fe(a,i){return `translate3d(${Math.round(a)}px, ${Math.round(i)}px, 0)`}var Te={capture:true},Ot={passive:false,capture:true},Da=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275cmp=Kt$1({type:a,selectors:[["ng-component"]],hostAttrs:["cdk-drag-resets-container",""],decls:0,vars:0,template:function(t,n){},styles:[`@layer cdk-resets {
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
`],encapsulation:2})}return a})(),jt=(()=>{class a{_ngZone=f(H$1);_document=f(L);_styleLoader=f(wr);_renderer=f(ut$2).createRenderer(null,null);_cleanupDocumentTouchmove;_scroll=new U;_dropInstances=new Set;_dragInstances=new Set;_activeDragInstances=W([]);_globalListeners;_draggingPredicate=e=>e.isDragging();_domNodesToDirectives=null;pointerMove=new U;pointerUp=new U;registerDropContainer(e){this._dropInstances.has(e)||this._dropInstances.add(e);}registerDragItem(e){this._dragInstances.add(e),this._dragInstances.size===1&&this._ngZone.runOutsideAngular(()=>{this._cleanupDocumentTouchmove?.(),this._cleanupDocumentTouchmove=this._renderer.listen(this._document,"touchmove",this._persistentTouchmoveListener,Ot);});}removeDropContainer(e){this._dropInstances.delete(e);}removeDragItem(e){this._dragInstances.delete(e),this.stopDragging(e),this._dragInstances.size===0&&this._cleanupDocumentTouchmove?.();}startDragging(e,t){if(!(this._activeDragInstances().indexOf(e)>-1)&&(this._styleLoader.load(Da),this._activeDragInstances.update(n=>[...n,e]),this._activeDragInstances().length===1)){let n=t.type.startsWith("touch"),o=l=>this.pointerUp.next(l),r=[["scroll",l=>this._scroll.next(l),Te],["selectstart",this._preventDefaultWhileDragging,Ot]];n?r.push(["touchend",o,Te],["touchcancel",o,Te]):r.push(["mouseup",o,Te]),n||r.push(["mousemove",l=>this.pointerMove.next(l),Ot]),this._ngZone.runOutsideAngular(()=>{this._globalListeners=r.map(([l,p,_])=>this._renderer.listen(this._document,l,p,_));});}}stopDragging(e){this._activeDragInstances.update(t=>{let n=t.indexOf(e);return n>-1?(t.splice(n,1),[...t]):t}),this._activeDragInstances().length===0&&this._clearGlobalListeners();}isDragging(e){return this._activeDragInstances().indexOf(e)>-1}scrolled(e){let t=[this._scroll];return e&&e!==this._document&&t.push(new x(n=>this._ngZone.runOutsideAngular(()=>{let o=this._renderer.listen(e,"scroll",r=>{this._activeDragInstances().length&&n.next(r);},Te);return ()=>{o();}}))),O_(...t)}registerDirectiveNode(e,t){this._domNodesToDirectives??=new WeakMap,this._domNodesToDirectives.set(e,t);}removeDirectiveNode(e){this._domNodesToDirectives?.delete(e);}getDragDirectiveForNode(e){return this._domNodesToDirectives?.get(e)||null}ngOnDestroy(){this._dragInstances.forEach(e=>this.removeDragItem(e)),this._dropInstances.forEach(e=>this.removeDropContainer(e)),this._domNodesToDirectives=null,this._clearGlobalListeners(),this.pointerMove.complete(),this.pointerUp.complete();}_preventDefaultWhileDragging=e=>{this._activeDragInstances().length>0&&e.preventDefault();};_persistentTouchmoveListener=e=>{this._activeDragInstances().length>0&&(this._activeDragInstances().some(this._draggingPredicate)&&e.preventDefault(),this.pointerMove.next(e));};_clearGlobalListeners(){this._globalListeners?.forEach(e=>e()),this._globalListeners=void 0;}static \u0275fac=function(t){return new(t||a)};static \u0275prov=b$1({token:a,factory:a.\u0275fac})}return a})();function zn(a){let i=a.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(a)*i}function Pa(a){let i=getComputedStyle(a),e=Ft(i,"transition-property"),t=e.find(l=>l==="transform"||l==="all");if(!t)return 0;let n=e.indexOf(t),o=Ft(i,"transition-duration"),r=Ft(i,"transition-delay");return zn(o[n])+zn(r[n])}function Ft(a,i){return a.getPropertyValue(i).split(",").map(t=>t.trim())}var Ma=new Set(["position"]),Lt=class{_document;_rootElement;_direction;_initialDomRect;_previewTemplate;_previewClass;_pickupPositionOnPage;_initialTransform;_zIndex;_renderer;_previewEmbeddedView=null;_preview;get element(){return this._preview}constructor(i,e,t,n,o,r,l,p,_,v){this._document=i,this._rootElement=e,this._direction=t,this._initialDomRect=n,this._previewTemplate=o,this._previewClass=r,this._pickupPositionOnPage=l,this._initialTransform=p,this._zIndex=_,this._renderer=v;}attach(i){this._preview=this._createPreview(),i.appendChild(this._preview),Hn(this._preview)&&this._preview.showPopover();}destroy(){this._preview.remove(),this._previewEmbeddedView?.destroy(),this._preview=this._previewEmbeddedView=null;}setTransform(i){this._preview.style.transform=i;}getBoundingClientRect(){return this._preview.getBoundingClientRect()}addClass(i){this._preview.classList.add(i);}getTransitionDuration(){return Pa(this._preview)}addEventListener(i,e){return this._renderer.listen(this._preview,i,e)}_createPreview(){let i=this._previewTemplate,e=this._previewClass,t=i?i.template:null,n;if(t&&i){let o=i.matchSize?this._initialDomRect:null,r=i.viewContainer.createEmbeddedView(t,i.context);r.detectChanges(),n=Kn(r,this._document),this._previewEmbeddedView=r,i.matchSize?Vn(n,o):n.style.transform=Fe(this._pickupPositionOnPage.x,this._pickupPositionOnPage.y);}else n=At(this._rootElement),Vn(n,this._initialDomRect),this._initialTransform&&(n.style.transform=this._initialTransform);return qt(n.style,{"pointer-events":"none",margin:Hn(n)?"0 auto 0 0":"0",position:"fixed",top:"0",left:"0","z-index":this._zIndex+""},Ma),we(n,false),n.classList.add("cdk-drag-preview"),n.setAttribute("popover","manual"),n.setAttribute("dir",this._direction),e&&(Array.isArray(e)?e.forEach(o=>n.classList.add(o)):n.classList.add(e)),n}};function Hn(a){return "showPopover"in a}var Ea={passive:true},Gn={passive:false},Ia={passive:false,capture:true},Ta=800,qn="cdk-drag-placeholder",jn=new Set(["position"]);function Zn(a,i,e={dragStartThreshold:5,pointerDirectionChangeThreshold:5}){let t=a.get(yi,null,{optional:true})||a.get(ut$2).createRenderer(null,null);return new Nt(i,e,a.get(L),a.get(H$1),a.get(tt),a.get(jt),t)}var Nt=class{_config;_document;_ngZone;_viewportRuler;_dragDropRegistry;_renderer;_rootElementCleanups;_cleanupShadowRootSelectStart;_preview=null;_previewContainer;_placeholderRef=null;_placeholder;_pickupPositionInElement;_pickupPositionOnPage;_marker;_anchor=null;_passiveTransform={x:0,y:0};_activeTransform={x:0,y:0};_initialTransform;_hasStartedDragging=W(false);_hasMoved=false;_initialContainer;_initialIndex;_parentPositions;_moveEvents=new U;_pointerDirectionDelta;_pointerPositionAtLastDirectionChange;_lastKnownPointerPosition;_rootElement;_ownerSVGElement=null;_rootElementTapHighlight;_pointerMoveSubscription=ee.EMPTY;_pointerUpSubscription=ee.EMPTY;_scrollSubscription=ee.EMPTY;_resizeSubscription=ee.EMPTY;_lastTouchEventTime;_dragStartTime;_boundaryElement=null;_nativeInteractionsEnabled=true;_initialDomRect;_previewRect;_boundaryRect;_previewTemplate;_placeholderTemplate;_handles=[];_disabledHandles=new Set;_dropContainer;_direction="ltr";_parentDragRef=null;_cachedShadowRoot;lockAxis=null;dragStartDelay=0;previewClass;scale=1;get disabled(){return this._disabled||!!(this._dropContainer&&this._dropContainer.disabled)}set disabled(i){i!==this._disabled&&(this._disabled=i,this._toggleNativeDragInteractions(),this._handles.forEach(e=>we(e,i)));}_disabled=false;beforeStarted=new U;started=new U;released=new U;ended=new U;entered=new U;exited=new U;dropped=new U;moved=this._moveEvents;data;constrainPosition;constructor(i,e,t,n,o,r,l){this._config=e,this._document=t,this._ngZone=n,this._viewportRuler=o,this._dragDropRegistry=r,this._renderer=l,this.withRootElement(i).withParent(e.parentDragRef||null),this._parentPositions=new ut(t),r.registerDragItem(this);}getPlaceholderElement(){return this._placeholder}getRootElement(){return this._rootElement}getVisibleElement(){return this.isDragging()?this.getPlaceholderElement():this.getRootElement()}withHandles(i){this._handles=i.map(t=>Pt(t)),this._handles.forEach(t=>we(t,this.disabled)),this._toggleNativeDragInteractions();let e=new Set;return this._disabledHandles.forEach(t=>{this._handles.indexOf(t)>-1&&e.add(t);}),this._disabledHandles=e,this}withPreviewTemplate(i){return this._previewTemplate=i,this}withPlaceholderTemplate(i){return this._placeholderTemplate=i,this}withRootElement(i){let e=Pt(i);if(e!==this._rootElement){this._removeRootElementListeners();let t=this._renderer;this._rootElementCleanups=this._ngZone.runOutsideAngular(()=>[t.listen(e,"mousedown",this._pointerDown,Gn),t.listen(e,"touchstart",this._pointerDown,Ea),t.listen(e,"dragstart",this._nativeDragStart,Gn)]),this._initialTransform=void 0,this._rootElement=e;}return typeof SVGElement<"u"&&this._rootElement instanceof SVGElement&&(this._ownerSVGElement=this._rootElement.ownerSVGElement),this}withBoundaryElement(i){return this._boundaryElement=i?Pt(i):null,this._resizeSubscription.unsubscribe(),i&&(this._resizeSubscription=this._viewportRuler.change(10).subscribe(()=>this._containInsideBoundaryOnResize())),this}withParent(i){return this._parentDragRef=i,this}dispose(){this._removeRootElementListeners(),this.isDragging()&&this._rootElement?.remove(),this._marker?.remove(),this._destroyPreview(),this._destroyPlaceholder(),this._dragDropRegistry.removeDragItem(this),this._removeListeners(),this.beforeStarted.complete(),this.started.complete(),this.released.complete(),this.ended.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this._moveEvents.complete(),this._handles=[],this._disabledHandles.clear(),this._dropContainer=void 0,this._resizeSubscription.unsubscribe(),this._parentPositions.clear(),this._boundaryElement=this._rootElement=this._ownerSVGElement=this._placeholderTemplate=this._previewTemplate=this._marker=this._parentDragRef=null;}isDragging(){return this._hasStartedDragging()&&this._dragDropRegistry.isDragging(this)}reset(){this._rootElement.style.transform=this._initialTransform||"",this._activeTransform={x:0,y:0},this._passiveTransform={x:0,y:0};}resetToBoundary(){if(this._boundaryElement&&this._rootElement&&Sa(this._boundaryElement.getBoundingClientRect(),this._rootElement.getBoundingClientRect())){let i=this._boundaryElement.getBoundingClientRect(),e=this._rootElement.getBoundingClientRect(),t=0,n=0;e.left<i.left?t=i.left-e.left:e.right>i.right&&(t=i.right-e.right),e.top<i.top?n=i.top-e.top:e.bottom>i.bottom&&(n=i.bottom-e.bottom);let o=this._activeTransform.x,r=this._activeTransform.y,l=o+t,p=r+n;this._rootElement.style.transform=Fe(l,p),this._activeTransform={x:l,y:p},this._passiveTransform={x:l,y:p};}}disableHandle(i){!this._disabledHandles.has(i)&&this._handles.indexOf(i)>-1&&(this._disabledHandles.add(i),we(i,true));}enableHandle(i){this._disabledHandles.has(i)&&(this._disabledHandles.delete(i),we(i,this.disabled));}withDirection(i){return this._direction=i,this}_withDropContainer(i){this._dropContainer=i;}getFreeDragPosition(){let i=this.isDragging()?this._activeTransform:this._passiveTransform;return {x:i.x,y:i.y}}setFreeDragPosition(i){return this._activeTransform={x:0,y:0},this._passiveTransform.x=i.x,this._passiveTransform.y=i.y,this._dropContainer||this._applyRootElementTransform(i.x,i.y),this}withPreviewContainer(i){return this._previewContainer=i,this}_sortFromLastPointerPosition(){let i=this._lastKnownPointerPosition;i&&this._dropContainer&&this._updateActiveDropContainer(this._getConstrainedPointerPosition(i),i);}_removeListeners(){this._pointerMoveSubscription.unsubscribe(),this._pointerUpSubscription.unsubscribe(),this._scrollSubscription.unsubscribe(),this._cleanupShadowRootSelectStart?.(),this._cleanupShadowRootSelectStart=void 0;}_destroyPreview(){this._preview?.destroy(),this._preview=null;}_destroyPlaceholder(){this._anchor?.remove(),this._placeholder?.remove(),this._placeholderRef?.destroy(),this._placeholder=this._anchor=this._placeholderRef=null;}_pointerDown=i=>{if(this.beforeStarted.next(),this._handles.length){let e=this._getTargetHandle(i);e&&!this._disabledHandles.has(e)&&!this.disabled&&this._initializeDragSequence(e,i);}else this.disabled||this._initializeDragSequence(this._rootElement,i);};_pointerMove=i=>{let e=this._getPointerPositionOnPage(i);if(!this._hasStartedDragging()){let n=Math.abs(e.x-this._pickupPositionOnPage.x),o=Math.abs(e.y-this._pickupPositionOnPage.y);if(n+o>=this._config.dragStartThreshold){let l=Date.now()>=this._dragStartTime+this._getDragStartDelay(i),p=this._dropContainer;if(!l){this._endDragSequence(i);return}(!p||!p.isDragging()&&!p.isReceiving())&&(i.cancelable&&i.preventDefault(),this._hasStartedDragging.set(true),this._ngZone.run(()=>this._startDragSequence(i)));}return}i.cancelable&&i.preventDefault();let t=this._getConstrainedPointerPosition(e);if(this._hasMoved=true,this._lastKnownPointerPosition=e,this._updatePointerDirectionDelta(t),this._dropContainer)this._updateActiveDropContainer(t,e);else {let n=this.constrainPosition?this._initialDomRect:this._pickupPositionOnPage,o=this._activeTransform;o.x=t.x-n.x+this._passiveTransform.x,o.y=t.y-n.y+this._passiveTransform.y,this._applyRootElementTransform(o.x,o.y);}this._moveEvents.observers.length&&this._ngZone.run(()=>{this._moveEvents.next({source:this,pointerPosition:t,event:i,distance:this._getDragDistance(t),delta:this._pointerDirectionDelta});});};_pointerUp=i=>{this._endDragSequence(i);};_endDragSequence(i){if(this._dragDropRegistry.isDragging(this)&&(this._removeListeners(),this._dragDropRegistry.stopDragging(this),this._toggleNativeDragInteractions(),this._handles&&(this._rootElement.style.webkitTapHighlightColor=this._rootElementTapHighlight),!!this._hasStartedDragging()))if(this.released.next({source:this,event:i}),this._dropContainer)this._dropContainer._stopScrolling(),this._animatePreviewToPlaceholder().then(()=>{this._cleanupDragArtifacts(i),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);});else {this._passiveTransform.x=this._activeTransform.x;let e=this._getPointerPositionOnPage(i);this._passiveTransform.y=this._activeTransform.y,this._ngZone.run(()=>{this.ended.next({source:this,distance:this._getDragDistance(e),dropPoint:e,event:i});}),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);}}_startDragSequence(i){Re(i)&&(this._lastTouchEventTime=Date.now()),this._toggleNativeDragInteractions();let e=this._getShadowRoot(),t=this._dropContainer;if(e&&this._ngZone.runOutsideAngular(()=>{this._cleanupShadowRootSelectStart=this._renderer.listen(e,"selectstart",Ra,Ia);}),t){let n=this._rootElement,o=n.parentNode,r=this._placeholder=this._createPlaceholderElement(),l=this._marker=this._marker||this._document.createComment("");o.insertBefore(l,n),this._initialTransform=n.style.transform||"",this._preview=new Lt(this._document,this._rootElement,this._direction,this._initialDomRect,this._previewTemplate||null,this.previewClass||null,this._pickupPositionOnPage,this._initialTransform,this._config.zIndex||1e3,this._renderer),this._preview.attach(this._getPreviewInsertionPoint(o,e)),Nn(n,false,jn),this._document.body.appendChild(o.replaceChild(r,n)),this.started.next({source:this,event:i}),t.start(),this._initialContainer=t,this._initialIndex=t.getItemIndex(this);}else this.started.next({source:this,event:i}),this._initialContainer=this._initialIndex=void 0;this._parentPositions.cache(t?t.getScrollableParents():[]);}_initializeDragSequence(i,e){this._parentDragRef&&e.stopPropagation();let t=this.isDragging(),n=Re(e),o=!n&&e.button!==0,r=this._rootElement,l=ht(e),p=!n&&this._lastTouchEventTime&&this._lastTouchEventTime+Ta>Date.now(),_=n?Ki(e):Yi(e);if(l&&l.draggable&&e.type==="mousedown"&&e.preventDefault(),t||o||p||_)return;if(this._handles.length){let P=r.style;this._rootElementTapHighlight=P.webkitTapHighlightColor||"",P.webkitTapHighlightColor="transparent";}this._hasMoved=false,this._hasStartedDragging.set(this._hasMoved),this._removeListeners(),this._initialDomRect=this._rootElement.getBoundingClientRect(),this._pointerMoveSubscription=this._dragDropRegistry.pointerMove.subscribe(this._pointerMove),this._pointerUpSubscription=this._dragDropRegistry.pointerUp.subscribe(this._pointerUp),this._scrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(P=>this._updateOnScroll(P)),this._boundaryElement&&(this._boundaryRect=Gt(this._boundaryElement));let v=this._previewTemplate;this._pickupPositionInElement=v&&v.template&&!v.matchSize?{x:0,y:0}:this._getPointerPositionInElement(this._initialDomRect,i,e);let b=this._pickupPositionOnPage=this._lastKnownPointerPosition=this._getPointerPositionOnPage(e);this._pointerDirectionDelta={x:0,y:0},this._pointerPositionAtLastDirectionChange={x:b.x,y:b.y},this._dragStartTime=Date.now(),this._dragDropRegistry.startDragging(this,e);}_cleanupDragArtifacts(i){Nn(this._rootElement,true,jn),this._marker.parentNode.replaceChild(this._rootElement,this._marker),this._destroyPreview(),this._destroyPlaceholder(),this._initialDomRect=this._boundaryRect=this._previewRect=this._initialTransform=void 0,this._ngZone.run(()=>{let e=this._dropContainer,t=e.getItemIndex(this),n=this._getPointerPositionOnPage(i),o=this._getDragDistance(n),r=e._isOverContainer(n.x,n.y);this.ended.next({source:this,distance:o,dropPoint:n,event:i}),this.dropped.next({item:this,currentIndex:t,previousIndex:this._initialIndex,container:e,previousContainer:this._initialContainer,isPointerOverContainer:r,distance:o,dropPoint:n,event:i}),e.drop(this,t,this._initialIndex,this._initialContainer,r,o,n,i),this._dropContainer=this._initialContainer;});}_updateActiveDropContainer({x:i,y:e},{x:t,y:n}){let o=this._initialContainer._getSiblingContainerFromPosition(this,i,e);!o&&this._dropContainer!==this._initialContainer&&this._initialContainer._isOverContainer(i,e)&&(o=this._initialContainer),o&&o!==this._dropContainer&&this._ngZone.run(()=>{let r=this._dropContainer.getItemIndex(this),l=this._dropContainer.getItemAtIndex(r+1)?.getVisibleElement()||null;this.exited.next({item:this,container:this._dropContainer}),this._dropContainer.exit(this),this._conditionallyInsertAnchor(o,this._dropContainer,l),this._dropContainer=o,this._dropContainer.enter(this,i,e,o===this._initialContainer&&o.sortingDisabled?this._initialIndex:void 0),this.entered.next({item:this,container:o,currentIndex:o.getItemIndex(this)});}),this.isDragging()&&(this._dropContainer._startScrollingIfNecessary(t,n),this._dropContainer._sortItem(this,i,e,this._pointerDirectionDelta),this.constrainPosition?this._applyPreviewTransform(i,e):this._applyPreviewTransform(i-this._pickupPositionInElement.x,e-this._pickupPositionInElement.y));}_animatePreviewToPlaceholder(){if(!this._hasMoved)return Promise.resolve();let i=this._placeholder.getBoundingClientRect();this._preview.addClass("cdk-drag-animating"),this._applyPreviewTransform(i.left,i.top);let e=this._preview.getTransitionDuration();return e===0?Promise.resolve():this._ngZone.runOutsideAngular(()=>new Promise(t=>{let n=l=>{(!l||this._preview&&ht(l)===this._preview.element&&l.propertyName==="transform")&&(r(),t(),clearTimeout(o));},o=setTimeout(n,e*1.5),r=this._preview.addEventListener("transitionend",n);}))}_createPlaceholderElement(){let i=this._placeholderTemplate,e=i?i.template:null,t;return e?(this._placeholderRef=i.viewContainer.createEmbeddedView(e,i.context),this._placeholderRef.detectChanges(),t=Kn(this._placeholderRef,this._document)):t=At(this._rootElement),t.style.pointerEvents="none",t.classList.add(qn),t}_getPointerPositionInElement(i,e,t){let n=e===this._rootElement?null:e,o=n?n.getBoundingClientRect():i,r=Re(t)?t.targetTouches[0]:t,l=this._getViewportScrollPosition(),p=r.pageX-o.left-l.left,_=r.pageY-o.top-l.top;return {x:o.left-i.left+p,y:o.top-i.top+_}}_getPointerPositionOnPage(i){let e=this._getViewportScrollPosition(),t=Re(i)?i.touches[0]||i.changedTouches[0]||{pageX:0,pageY:0}:i,n=t.pageX-e.left,o=t.pageY-e.top;if(this._ownerSVGElement){let r=this._ownerSVGElement.getScreenCTM();if(r){let l=this._ownerSVGElement.createSVGPoint();return l.x=n,l.y=o,l.matrixTransform(r.inverse())}}return {x:n,y:o}}_getConstrainedPointerPosition(i){let e=this._dropContainer?this._dropContainer.lockAxis:null,{x:t,y:n}=this.constrainPosition?this.constrainPosition(i,this,this._initialDomRect,this._pickupPositionInElement):i;if(this.lockAxis==="x"||e==="x"?n=this._pickupPositionOnPage.y-(this.constrainPosition?this._pickupPositionInElement.y:0):(this.lockAxis==="y"||e==="y")&&(t=this._pickupPositionOnPage.x-(this.constrainPosition?this._pickupPositionInElement.x:0)),this._boundaryRect){let{x:o,y:r}=this.constrainPosition?{x:0,y:0}:this._pickupPositionInElement,l=this._boundaryRect,{width:p,height:_}=this._getPreviewRect(),v=l.top+r,b=l.bottom-(_-r),P=l.left+o,se=l.right-(p-o);t=Un(t,P,se),n=Un(n,v,b);}return {x:t,y:n}}_updatePointerDirectionDelta(i){let{x:e,y:t}=i,n=this._pointerDirectionDelta,o=this._pointerPositionAtLastDirectionChange,r=Math.abs(e-o.x),l=Math.abs(t-o.y);return r>this._config.pointerDirectionChangeThreshold&&(n.x=e>o.x?1:-1,o.x=e),l>this._config.pointerDirectionChangeThreshold&&(n.y=t>o.y?1:-1,o.y=t),n}_toggleNativeDragInteractions(){if(!this._rootElement||!this._handles)return;let i=this._handles.length>0||!this.isDragging();i!==this._nativeInteractionsEnabled&&(this._nativeInteractionsEnabled=i,we(this._rootElement,i));}_removeRootElementListeners(){this._rootElementCleanups?.forEach(i=>i()),this._rootElementCleanups=void 0;}_applyRootElementTransform(i,e){let t=1/this.scale,n=Fe(i*t,e*t),o=this._rootElement.style;this._initialTransform==null&&(this._initialTransform=o.transform&&o.transform!="none"?o.transform:""),o.transform=gt(n,this._initialTransform);}_applyPreviewTransform(i,e){let t=this._previewTemplate?.template?void 0:this._initialTransform,n=Fe(i,e);this._preview.setTransform(gt(n,t));}_getDragDistance(i){let e=this._pickupPositionOnPage;return e?{x:i.x-e.x,y:i.y-e.y}:{x:0,y:0}}_cleanupCachedDimensions(){this._boundaryRect=this._previewRect=void 0,this._parentPositions.clear();}_containInsideBoundaryOnResize(){let{x:i,y:e}=this._passiveTransform;if(i===0&&e===0||this.isDragging()||!this._boundaryElement)return;let t=this._rootElement.getBoundingClientRect(),n=this._boundaryElement.getBoundingClientRect();if(n.width===0&&n.height===0||t.width===0&&t.height===0)return;let o=n.left-t.left,r=t.right-n.right,l=n.top-t.top,p=t.bottom-n.bottom;n.width>t.width?(o>0&&(i+=o),r>0&&(i-=r)):i=0,n.height>t.height?(l>0&&(e+=l),p>0&&(e-=p)):e=0,(i!==this._passiveTransform.x||e!==this._passiveTransform.y)&&this.setFreeDragPosition({y:e,x:i});}_getDragStartDelay(i){let e=this.dragStartDelay;return typeof e=="number"?e:Re(i)?e.touch:e?e.mouse:0}_updateOnScroll(i){let e=this._parentPositions.handleScroll(i);if(e){let t=ht(i);this._boundaryRect&&t!==this._boundaryElement&&t.contains(this._boundaryElement)&&Oe(this._boundaryRect,e.top,e.left),this._pickupPositionOnPage.x+=e.left,this._pickupPositionOnPage.y+=e.top,this._dropContainer||(this._activeTransform.x-=e.left,this._activeTransform.y-=e.top,this._applyRootElementTransform(this._activeTransform.x,this._activeTransform.y));}}_getViewportScrollPosition(){return this._parentPositions.positions.get(this._document)?.scrollPosition||this._parentPositions.getViewportScrollPosition()}_getShadowRoot(){return this._cachedShadowRoot===void 0&&(this._cachedShadowRoot=Ah(this._rootElement)),this._cachedShadowRoot}_getPreviewInsertionPoint(i,e){let t=this._previewContainer||"global";if(t==="parent")return i;if(t==="global"){let n=this._document;return e||n.fullscreenElement||n.webkitFullscreenElement||n.mozFullScreenElement||n.msFullscreenElement||n.body}return Pt(t)}_getPreviewRect(){return (!this._previewRect||!this._previewRect.width&&!this._previewRect.height)&&(this._previewRect=this._preview?this._preview.getBoundingClientRect():this._initialDomRect),this._previewRect}_nativeDragStart=i=>{if(this._handles.length){let e=this._getTargetHandle(i);e&&!this._disabledHandles.has(e)&&!this.disabled&&i.preventDefault();}else this.disabled||i.preventDefault();};_getTargetHandle(i){return this._handles.find(e=>i.target&&(i.target===e||e.contains(i.target)))}_conditionallyInsertAnchor(i,e,t){if(i===this._initialContainer)this._anchor?.remove(),this._anchor=null;else if(e===this._initialContainer&&e.hasAnchor){let n=this._anchor??=At(this._placeholder);n.classList.remove(qn),n.classList.add("cdk-drag-anchor"),n.style.transform="",t?t.before(n):Pt(e.element).appendChild(n);}}};function Un(a,i,e){return Math.max(i,Math.min(e,a))}function Re(a){return a.type[0]==="t"}function Ra(a){a.preventDefault();}function Yn(a,i,e){let t=$n(i,a.length-1),n=$n(e,a.length-1);if(t===n)return;let o=a[t],r=n<t?-1:1;for(let l=t;l!==n;l+=r)a[l]=a[l+r];a[n]=o;}function $n(a,i){return Math.max(0,Math.min(i,a))}var _t=class{_dragDropRegistry;_element;_sortPredicate;_itemPositions=[];_activeDraggables;orientation="vertical";direction="ltr";constructor(i){this._dragDropRegistry=i;}_previousSwap={drag:null,delta:0,overlaps:false};start(i){this.withItems(i);}sort(i,e,t,n){let o=this._itemPositions,r=this._getItemIndexFromPointerPosition(i,e,t,n);if(r===-1&&o.length>0)return null;let l=this.orientation==="horizontal",p=o.findIndex(U=>U.drag===i),_=o[r],v=o[p].clientRect,b=_.clientRect,P=p>r?1:-1,se=this._getItemOffsetPx(v,b,P),Se=this._getSiblingOffsetPx(p,o,P),vt=o.slice();return Yn(o,p,r),o.forEach((U,Ca)=>{if(vt[Ca]===U)return;let Jt=U.drag===i,yt=Jt?se:Se,ei=Jt?i.getPlaceholderElement():U.drag.getRootElement();U.offset+=yt;let ti=Math.round(U.offset*(1/U.drag.scale));l?(ei.style.transform=gt(`translate3d(${ti}px, 0, 0)`,U.initialTransform),Oe(U.clientRect,0,yt)):(ei.style.transform=gt(`translate3d(0, ${ti}px, 0)`,U.initialTransform),Oe(U.clientRect,yt,0));}),this._previousSwap.overlaps=Bt(b,e,t),this._previousSwap.drag=_.drag,this._previousSwap.delta=l?n.x:n.y,{previousIndex:p,currentIndex:r}}enter(i,e,t,n){let o=this._activeDraggables,r=o.indexOf(i),l=i.getPlaceholderElement();r>-1&&o.splice(r,1);let p=n==null||n<0?this._getItemIndexFromPointerPosition(i,e,t):n,_=o[p];if(_===i&&(_=o[p+1]),!_&&(p==null||p===-1||p<o.length-1)&&this._shouldEnterAsFirstChild(e,t)&&(_=o[0]),_&&!this._dragDropRegistry.isDragging(_)){let v=_.getRootElement();v.parentElement.insertBefore(l,v),o.splice(p,0,i);}else this._element.appendChild(l),o.push(i);l.style.transform="",this._cacheItemPositions();}withItems(i){this._activeDraggables=i.slice(),this._cacheItemPositions();}withSortPredicate(i){this._sortPredicate=i;}reset(){this._activeDraggables?.forEach(i=>{let e=i.getRootElement();if(e){let t=this._itemPositions.find(n=>n.drag===i)?.initialTransform;e.style.transform=t||"";}}),this._itemPositions=[],this._activeDraggables=[],this._previousSwap.drag=null,this._previousSwap.delta=0,this._previousSwap.overlaps=false;}getActiveItemsSnapshot(){return this._activeDraggables}getItemIndex(i){return this._getVisualItemPositions().findIndex(e=>e.drag===i)}getItemAtIndex(i){return this._getVisualItemPositions()[i]?.drag||null}updateOnScroll(i,e){this._itemPositions.forEach(({clientRect:t})=>{Oe(t,i,e);}),this._itemPositions.forEach(({drag:t})=>{this._dragDropRegistry.isDragging(t)&&t._sortFromLastPointerPosition();});}withElementContainer(i){this._element=i;}_cacheItemPositions(){let i=this.orientation==="horizontal";this._itemPositions=this._activeDraggables.map(e=>{let t=e.getVisibleElement();return {drag:e,offset:0,initialTransform:t.style.transform||"",clientRect:Gt(t)}}).sort((e,t)=>i?e.clientRect.left-t.clientRect.left:e.clientRect.top-t.clientRect.top);}_getVisualItemPositions(){return this.orientation==="horizontal"&&this.direction==="rtl"?this._itemPositions.slice().reverse():this._itemPositions}_getItemOffsetPx(i,e,t){let n=this.orientation==="horizontal",o=n?e.left-i.left:e.top-i.top;return t===-1&&(o+=n?e.width-i.width:e.height-i.height),o}_getSiblingOffsetPx(i,e,t){let n=this.orientation==="horizontal",o=e[i].clientRect,r=e[i+t*-1],l=o[n?"width":"height"]*t;if(r){let p=n?"left":"top",_=n?"right":"bottom";t===-1?l-=r.clientRect[p]-o[_]:l+=o[p]-r.clientRect[_];}return l}_shouldEnterAsFirstChild(i,e){if(!this._activeDraggables.length)return  false;let t=this._itemPositions,n=this.orientation==="horizontal";if(t[0].drag!==this._activeDraggables[0]){let r=t[t.length-1].clientRect;return n?i>=r.right:e>=r.bottom}else {let r=t[0].clientRect;return n?i<=r.left:e<=r.top}}_getItemIndexFromPointerPosition(i,e,t,n){let o=this.orientation==="horizontal",r=this._itemPositions.findIndex(({drag:l,clientRect:p})=>{if(l===i)return  false;if(n){let _=o?n.x:n.y;if(l===this._previousSwap.drag&&this._previousSwap.overlaps&&_===this._previousSwap.delta)return  false}return o?e>=Math.floor(p.left)&&e<Math.floor(p.right):t>=Math.floor(p.top)&&t<Math.floor(p.bottom)});return r===-1||!this._sortPredicate(r,i)?-1:r}},Vt=class{_document;_dragDropRegistry;_element;_sortPredicate;_rootNode;_activeItems;_previousSwap={drag:null,deltaX:0,deltaY:0,overlaps:false};_relatedNodes=[];constructor(i,e){this._document=i,this._dragDropRegistry=e;}start(i){let e=this._element.childNodes;this._relatedNodes=[];for(let t=0;t<e.length;t++){let n=e[t];this._relatedNodes.push([n,n.nextSibling]);}this.withItems(i);}sort(i,e,t,n){let o=this._getItemIndexFromPointerPosition(i,e,t),r=this._previousSwap;if(o===-1||this._activeItems[o]===i)return null;let l=this._activeItems[o];if(r.drag===l&&r.overlaps&&r.deltaX===n.x&&r.deltaY===n.y)return null;let p=this.getItemIndex(i),_=i.getPlaceholderElement(),v=l.getRootElement();o>p?v.after(_):v.before(_),Yn(this._activeItems,p,o);let b=this._getRootNode().elementFromPoint(e,t);return r.deltaX=n.x,r.deltaY=n.y,r.drag=l,r.overlaps=v===b||v.contains(b),{previousIndex:p,currentIndex:o}}enter(i,e,t,n){let o=this._activeItems.indexOf(i);o>-1&&this._activeItems.splice(o,1);let r=n==null||n<0?this._getItemIndexFromPointerPosition(i,e,t):n;r===-1&&(r=this._getClosestItemIndexToPointer(i,e,t));let l=this._activeItems[r];l&&!this._dragDropRegistry.isDragging(l)?(this._activeItems.splice(r,0,i),l.getRootElement().before(i.getPlaceholderElement())):(this._activeItems.push(i),this._element.appendChild(i.getPlaceholderElement()));}withItems(i){this._activeItems=i.slice();}withSortPredicate(i){this._sortPredicate=i;}reset(){let i=this._element,e=this._previousSwap;for(let t=this._relatedNodes.length-1;t>-1;t--){let[n,o]=this._relatedNodes[t];n.parentNode===i&&n.nextSibling!==o&&(o===null?i.appendChild(n):o.parentNode===i&&i.insertBefore(n,o));}this._relatedNodes=[],this._activeItems=[],e.drag=null,e.deltaX=e.deltaY=0,e.overlaps=false;}getActiveItemsSnapshot(){return this._activeItems}getItemIndex(i){return this._activeItems.indexOf(i)}getItemAtIndex(i){return this._activeItems[i]||null}updateOnScroll(){this._activeItems.forEach(i=>{this._dragDropRegistry.isDragging(i)&&i._sortFromLastPointerPosition();});}withElementContainer(i){i!==this._element&&(this._element=i,this._rootNode=void 0);}_getItemIndexFromPointerPosition(i,e,t){let n=this._getRootNode().elementFromPoint(Math.floor(e),Math.floor(t)),o=n?this._activeItems.findIndex(r=>{let l=r.getRootElement();return n===l||l.contains(n)}):-1;return o===-1||!this._sortPredicate(o,i)?-1:o}_getRootNode(){return this._rootNode||(this._rootNode=Ah(this._element)||this._document),this._rootNode}_getClosestItemIndexToPointer(i,e,t){if(this._activeItems.length===0)return  -1;if(this._activeItems.length===1)return 0;let n=1/0,o=-1;for(let r=0;r<this._activeItems.length;r++){let l=this._activeItems[r];if(l!==i){let{x:p,y:_}=l.getRootElement().getBoundingClientRect(),v=Math.hypot(e-p,t-_);v<n&&(n=v,o=r);}}return o}},Qn=.05,Xn=.05,$=(function(a){return a[a.NONE=0]="NONE",a[a.UP=1]="UP",a[a.DOWN=2]="DOWN",a})($||{}),H=(function(a){return a[a.NONE=0]="NONE",a[a.LEFT=1]="LEFT",a[a.RIGHT=2]="RIGHT",a})(H||{});function Jn(a,i){return new zt(i,a.get(jt),a.get(L),a.get(H$1),a.get(tt))}var zt=class{_dragDropRegistry;_ngZone;_viewportRuler;element;disabled=false;sortingDisabled=false;lockAxis=null;autoScrollDisabled=false;autoScrollStep=2;hasAnchor=false;enterPredicate=()=>true;sortPredicate=()=>true;beforeStarted=new U;entered=new U;exited=new U;dropped=new U;sorted=new U;receivingStarted=new U;receivingStopped=new U;data;_container;_isDragging=false;_parentPositions;_sortStrategy;_domRect;_draggables=[];_siblings=[];_activeSiblings=new Set;_viewportScrollSubscription=ee.EMPTY;_verticalScrollDirection=$.NONE;_horizontalScrollDirection=H.NONE;_scrollNode;_stopScrollTimers=new U;_cachedShadowRoot=null;_document;_scrollableElements=[];_initialScrollSnap;_direction="ltr";constructor(i,e,t,n,o){this._dragDropRegistry=e,this._ngZone=n,this._viewportRuler=o;let r=this.element=Pt(i);this._document=t,this.withOrientation("vertical").withElementContainer(r),e.registerDropContainer(this),this._parentPositions=new ut(t);}dispose(){this._stopScrolling(),this._stopScrollTimers.complete(),this._viewportScrollSubscription.unsubscribe(),this.beforeStarted.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this.sorted.complete(),this.receivingStarted.complete(),this.receivingStopped.complete(),this._activeSiblings.clear(),this._scrollNode=null,this._parentPositions.clear(),this._dragDropRegistry.removeDropContainer(this);}isDragging(){return this._isDragging}start(){this._draggingStarted(),this._notifyReceivingSiblings();}enter(i,e,t,n){this._draggingStarted(),n==null&&this.sortingDisabled&&(n=this._draggables.indexOf(i)),this._sortStrategy.enter(i,e,t,n),this._cacheParentPositions(),this._notifyReceivingSiblings(),this.entered.next({item:i,container:this,currentIndex:this.getItemIndex(i)});}exit(i){this._reset(),this.exited.next({item:i,container:this});}drop(i,e,t,n,o,r,l,p){this._reset(),this.dropped.next({item:i,currentIndex:e,previousIndex:t,container:this,previousContainer:n,isPointerOverContainer:o,distance:r,dropPoint:l,event:p});}withItems(i){let e=this._draggables;return this._draggables=i,i.forEach(t=>t._withDropContainer(this)),this.isDragging()&&(e.filter(n=>n.isDragging()).every(n=>i.indexOf(n)===-1)?this._reset():this._sortStrategy.withItems(this._draggables)),this}withDirection(i){return this._direction=i,this._sortStrategy instanceof _t&&(this._sortStrategy.direction=i),this}connectedTo(i){return this._siblings=i.slice(),this}withOrientation(i){if(i==="mixed")this._sortStrategy=new Vt(this._document,this._dragDropRegistry);else {let e=new _t(this._dragDropRegistry);e.direction=this._direction,e.orientation=i,this._sortStrategy=e;}return this._sortStrategy.withElementContainer(this._container),this._sortStrategy.withSortPredicate((e,t)=>this.sortPredicate(e,t,this)),this}withScrollableParents(i){let e=this._container;return this._scrollableElements=i.indexOf(e)===-1?[e,...i]:i.slice(),this}withElementContainer(i){if(i===this._container)return this;Pt(this.element);let t=this._scrollableElements.indexOf(this._container),n=this._scrollableElements.indexOf(i);return t>-1&&this._scrollableElements.splice(t,1),n>-1&&this._scrollableElements.splice(n,1),this._sortStrategy&&this._sortStrategy.withElementContainer(i),this._cachedShadowRoot=null,this._scrollableElements.unshift(i),this._container=i,this}getScrollableParents(){return this._scrollableElements}getItemIndex(i){return this._isDragging?this._sortStrategy.getItemIndex(i):this._draggables.indexOf(i)}getItemAtIndex(i){return this._isDragging?this._sortStrategy.getItemAtIndex(i):this._draggables[i]||null}isReceiving(){return this._activeSiblings.size>0}_sortItem(i,e,t,n){if(this.sortingDisabled||!this._domRect||!Ln(this._domRect,Qn,e,t))return;let o=this._sortStrategy.sort(i,e,t,n);o&&this.sorted.next({previousIndex:o.previousIndex,currentIndex:o.currentIndex,container:this,item:i});}_startScrollingIfNecessary(i,e){if(this.autoScrollDisabled)return;let t,n=$.NONE,o=H.NONE;if(this._parentPositions.positions.forEach((r,l)=>{l===this._document||!r.clientRect||t||Ln(r.clientRect,Qn,i,e)&&([n,o]=Oa(l,r.clientRect,this._direction,i,e),(n||o)&&(t=l));}),!n&&!o){let{width:r,height:l}=this._viewportRuler.getViewportSize(),p={width:r,height:l,top:0,right:r,bottom:l,left:0};n=ea(p,e),o=ta(p,i),t=window;}t&&(n!==this._verticalScrollDirection||o!==this._horizontalScrollDirection||t!==this._scrollNode)&&(this._verticalScrollDirection=n,this._horizontalScrollDirection=o,this._scrollNode=t,(n||o)&&t?this._ngZone.runOutsideAngular(this._startScrollInterval):this._stopScrolling());}_stopScrolling(){this._stopScrollTimers.next();}_draggingStarted(){let i=this._container.style;this.beforeStarted.next(),this._isDragging=true,this._initialScrollSnap=i.msScrollSnapType||i.scrollSnapType||"",i.scrollSnapType=i.msScrollSnapType="none",this._sortStrategy.start(this._draggables),this._cacheParentPositions(),this._viewportScrollSubscription.unsubscribe(),this._listenToScrollEvents();}_cacheParentPositions(){this._parentPositions.cache(this._scrollableElements),this._domRect=this._parentPositions.positions.get(this._container).clientRect;}_reset(){this._isDragging=false;let i=this._container.style;i.scrollSnapType=i.msScrollSnapType=this._initialScrollSnap,this._siblings.forEach(e=>e._stopReceiving(this)),this._sortStrategy.reset(),this._stopScrolling(),this._viewportScrollSubscription.unsubscribe(),this._parentPositions.clear();}_startScrollInterval=()=>{this._stopScrolling(),x_(0,g_).pipe(Bt$2(this._stopScrollTimers)).subscribe(()=>{let i=this._scrollNode,e=this.autoScrollStep;this._verticalScrollDirection===$.UP?i.scrollBy(0,-e):this._verticalScrollDirection===$.DOWN&&i.scrollBy(0,e),this._horizontalScrollDirection===H.LEFT?i.scrollBy(-e,0):this._horizontalScrollDirection===H.RIGHT&&i.scrollBy(e,0);});};_isOverContainer(i,e){return this._domRect!=null&&Bt(this._domRect,i,e)}_getSiblingContainerFromPosition(i,e,t){return this._siblings.find(n=>n._canReceive(i,e,t))}_canReceive(i,e,t){if(!this._domRect||!Bt(this._domRect,e,t)||!this.enterPredicate(i,this))return  false;let n=this._getShadowRoot().elementFromPoint(e,t);return n?n===this._container||this._container.contains(n):false}_startReceiving(i,e){let t=this._activeSiblings;!t.has(i)&&e.every(n=>this.enterPredicate(n,this)||this._draggables.indexOf(n)>-1)&&(t.add(i),this._cacheParentPositions(),this._listenToScrollEvents(),this.receivingStarted.next({initiator:i,receiver:this,items:e}));}_stopReceiving(i){this._activeSiblings.delete(i),this._viewportScrollSubscription.unsubscribe(),this.receivingStopped.next({initiator:i,receiver:this});}_listenToScrollEvents(){this._viewportScrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(i=>{if(this.isDragging()){let e=this._parentPositions.handleScroll(i);e&&this._sortStrategy.updateOnScroll(e.top,e.left);}else this.isReceiving()&&this._cacheParentPositions();});}_getShadowRoot(){if(!this._cachedShadowRoot){let i=Ah(this._container);this._cachedShadowRoot=i||this._document;}return this._cachedShadowRoot}_notifyReceivingSiblings(){let i=this._sortStrategy.getActiveItemsSnapshot().filter(e=>e.isDragging());this._siblings.forEach(e=>e._startReceiving(this,i));}};function ea(a,i){let{top:e,bottom:t,height:n}=a,o=n*Xn;return i>=e-o&&i<=e+o?$.UP:i>=t-o&&i<=t+o?$.DOWN:$.NONE}function ta(a,i){let{left:e,right:t,width:n}=a,o=n*Xn;return i>=e-o&&i<=e+o?H.LEFT:i>=t-o&&i<=t+o?H.RIGHT:H.NONE}function Oa(a,i,e,t,n){let o=ea(i,n),r=ta(i,t),l=$.NONE,p=H.NONE;if(o){let _=a.scrollTop;o===$.UP?_>0&&(l=$.UP):a.scrollHeight-_>a.clientHeight&&(l=$.DOWN);}if(r){let _=a.scrollLeft;e==="rtl"?r===H.RIGHT?_<0&&(p=H.RIGHT):a.scrollWidth+_>a.clientWidth&&(p=H.LEFT):r===H.LEFT?_>0&&(p=H.LEFT):a.scrollWidth-_>a.clientWidth&&(p=H.RIGHT);}return [l,p]}var Fa=(()=>{class a{_injector=f(X);createDrag(e,t){return Zn(this._injector,e,t)}createDropList(e){return Jn(this._injector,e)}static \u0275fac=function(t){return new(t||a)};static \u0275prov=b$1({token:a,factory:a.\u0275fac})}return a})(),Wn=new y("CDK_DRAG_PARENT");var Aa=new y("CdkDragHandle");var ia=new y("CDK_DRAG_CONFIG"),na=new y("CdkDropList"),aa=(()=>{class a{element=f(ge);dropContainer=f(na,{optional:true,skipSelf:true});_ngZone=f(H$1);_viewContainerRef=f(wn);_dir=f(DR,{optional:true});_changeDetectorRef=f(bi);_selfHandle=f(Aa,{optional:true,self:true});_parentDrag=f(Wn,{optional:true,skipSelf:true});_dragDropRegistry=f(jt);_destroyed=new U;_handles=new de([]);_previewTemplate=null;_placeholderTemplate=null;_dragRef;data;lockAxis=null;rootElementSelector;boundaryElement;dragStartDelay;freeDragPosition;get disabled(){return this._disabled||!!(this.dropContainer&&this.dropContainer.disabled)}set disabled(e){this._disabled=e,this._dragRef.disabled=this._disabled;}_disabled=false;constrainPosition;previewClass;previewContainer;scale=1;started=new re;released=new re;ended=new re;entered=new re;exited=new re;dropped=new re;moved=new x(e=>{let t=this._dragRef.moved.pipe(F(n=>({source:this,pointerPosition:n.pointerPosition,event:n.event,delta:n.delta,distance:n.distance}))).subscribe(e);return ()=>{t.unsubscribe();}});_injector=f(X);constructor(){let e=this.dropContainer,t=f(ia,{optional:true});this._dragRef=Zn(this._injector,this.element,{dragStartThreshold:t&&t.dragStartThreshold!=null?t.dragStartThreshold:5,pointerDirectionChangeThreshold:t&&t.pointerDirectionChangeThreshold!=null?t.pointerDirectionChangeThreshold:5,zIndex:t?.zIndex}),this._dragRef.data=this,this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement,this),t&&this._assignDefaults(t),e&&(e.addItem(this),e._dropListRef.beforeStarted.pipe(Bt$2(this._destroyed)).subscribe(()=>{this._dragRef.scale=this.scale;})),this._syncInputs(this._dragRef),this._handleEvents(this._dragRef);}getPlaceholderElement(){return this._dragRef.getPlaceholderElement()}getRootElement(){return this._dragRef.getRootElement()}reset(){this._dragRef.reset();}resetToBoundary(){this._dragRef.resetToBoundary();}getFreeDragPosition(){return this._dragRef.getFreeDragPosition()}setFreeDragPosition(e){this._dragRef.setFreeDragPosition(e);}ngAfterViewInit(){pi(()=>{this._updateRootElement(),this._setupHandlesListener(),this._dragRef.scale=this.scale,this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);},{injector:this._injector});}ngOnChanges(e){let t=e.rootElementSelector,n=e.freeDragPosition;t&&!t.firstChange&&this._updateRootElement(),this._dragRef.scale=this.scale,n&&!n.firstChange&&this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);}ngOnDestroy(){this.dropContainer&&this.dropContainer.removeItem(this),this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement),this._ngZone.runOutsideAngular(()=>{this._handles.complete(),this._destroyed.next(),this._destroyed.complete(),this._dragRef.dispose();});}_addHandle(e){let t=this._handles.getValue();t.push(e),this._handles.next(t);}_removeHandle(e){let t=this._handles.getValue(),n=t.indexOf(e);n>-1&&(t.splice(n,1),this._handles.next(t));}_setPreviewTemplate(e){this._previewTemplate=e;}_resetPreviewTemplate(e){e===this._previewTemplate&&(this._previewTemplate=null);}_setPlaceholderTemplate(e){this._placeholderTemplate=e;}_resetPlaceholderTemplate(e){e===this._placeholderTemplate&&(this._placeholderTemplate=null);}_updateRootElement(){let e=this.element.nativeElement,t=e;this.rootElementSelector&&(t=e.closest!==void 0?e.closest(this.rootElementSelector):e.parentElement?.closest(this.rootElementSelector)),this._dragRef.withRootElement(t||e);}_getBoundaryElement(){let e=this.boundaryElement;return e?typeof e=="string"?this.element.nativeElement.closest(e):Pt(e):null}_syncInputs(e){e.beforeStarted.subscribe(()=>{if(!e.isDragging()){let t=this._dir,n=this.dragStartDelay,o=this._placeholderTemplate?{template:this._placeholderTemplate.templateRef,context:this._placeholderTemplate.data,viewContainer:this._viewContainerRef}:null,r=this._previewTemplate?{template:this._previewTemplate.templateRef,context:this._previewTemplate.data,matchSize:this._previewTemplate.matchSize,viewContainer:this._viewContainerRef}:null;e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.scale=this.scale,e.dragStartDelay=typeof n=="object"&&n?n:Rh(n),e.constrainPosition=this.constrainPosition,e.previewClass=this.previewClass,e.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(o).withPreviewTemplate(r).withPreviewContainer(this.previewContainer||"global"),t&&e.withDirection(t.value);}}),e.beforeStarted.pipe(Re$1(1)).subscribe(()=>{if(this._parentDrag){e.withParent(this._parentDrag._dragRef);return}let t=this.element.nativeElement.parentElement;for(;t;){let n=this._dragDropRegistry.getDragDirectiveForNode(t);if(n){e.withParent(n._dragRef);break}t=t.parentElement;}});}_handleEvents(e){e.started.subscribe(t=>{this.started.emit({source:this,event:t.event}),this._changeDetectorRef.markForCheck();}),e.released.subscribe(t=>{this.released.emit({source:this,event:t.event});}),e.ended.subscribe(t=>{this.ended.emit({source:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(t=>{this.entered.emit({container:t.container.data,item:this,currentIndex:t.currentIndex});}),e.exited.subscribe(t=>{this.exited.emit({container:t.container.data,item:this});}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,isPointerOverContainer:t.isPointerOverContainer,item:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event});});}_assignDefaults(e){let{lockAxis:t,dragStartDelay:n,constrainPosition:o,previewClass:r,boundaryElement:l,draggingDisabled:p,rootElementSelector:_,previewContainer:v}=e;this.disabled=p??false,this.dragStartDelay=n||0,this.lockAxis=t||null,o&&(this.constrainPosition=o),r&&(this.previewClass=r),l&&(this.boundaryElement=l),_&&(this.rootElementSelector=_),v&&(this.previewContainer=v);}_setupHandlesListener(){this._handles.pipe(xe(e=>{let t=e.map(n=>n.element);this._selfHandle&&this.rootElementSelector&&t.push(this.element),this._dragRef.withHandles(t);}),Fe$1(e=>O_(...e.map(t=>t._stateChanges.pipe(Oo$1(t))))),Bt$2(this._destroyed)).subscribe(e=>{let t=this._dragRef,n=e.element.nativeElement;e.disabled?t.disableHandle(n):t.enableHandle(n);});}static \u0275fac=function(t){return new(t||a)};static \u0275dir=De({type:a,selectors:[["","cdkDrag",""]],hostAttrs:[1,"cdk-drag"],hostVars:4,hostBindings:function(t,n){t&2&&nc("cdk-drag-disabled",n.disabled)("cdk-drag-dragging",n._dragRef.isDragging());},inputs:{data:[0,"cdkDragData","data"],lockAxis:[0,"cdkDragLockAxis","lockAxis"],rootElementSelector:[0,"cdkDragRootElement","rootElementSelector"],boundaryElement:[0,"cdkDragBoundary","boundaryElement"],dragStartDelay:[0,"cdkDragStartDelay","dragStartDelay"],freeDragPosition:[0,"cdkDragFreeDragPosition","freeDragPosition"],disabled:[2,"cdkDragDisabled","disabled",Xt$1],constrainPosition:[0,"cdkDragConstrainPosition","constrainPosition"],previewClass:[0,"cdkDragPreviewClass","previewClass"],previewContainer:[0,"cdkDragPreviewContainer","previewContainer"],scale:[2,"cdkDragScale","scale",E2]},outputs:{started:"cdkDragStarted",released:"cdkDragReleased",ended:"cdkDragEnded",entered:"cdkDragEntered",exited:"cdkDragExited",dropped:"cdkDragDropped",moved:"cdkDragMoved"},exportAs:["cdkDrag"],features:[Uy([{provide:Wn,useExisting:a}]),At$1]})}return a})(),Ht=new y("CdkDropListGroup"),oa=(()=>{class a{_items=new Set;disabled=false;ngOnDestroy(){this._items.clear();}static \u0275fac=function(t){return new(t||a)};static \u0275dir=De({type:a,selectors:[["","cdkDropListGroup",""]],inputs:{disabled:[2,"cdkDropListGroupDisabled","disabled",Xt$1]},exportAs:["cdkDropListGroup"],features:[Uy([{provide:Ht,useExisting:a}])]})}return a})(),ra=(()=>{class a{element=f(ge);_changeDetectorRef=f(bi);_scrollDispatcher=f(ct);_dir=f(DR,{optional:true});_group=f(Ht,{optional:true,skipSelf:true});_latestSortedRefs;_destroyed=new U;_scrollableParentsResolved=false;static _dropLists=[];_dropListRef;connectedTo=[];data;orientation="vertical";id=f(Lh).getId("cdk-drop-list-");lockAxis=null;get disabled(){return this._disabled||!!this._group&&this._group.disabled}set disabled(e){this._dropListRef.disabled=this._disabled=e;}_disabled=false;sortingDisabled=false;enterPredicate=()=>true;sortPredicate=()=>true;autoScrollDisabled=false;autoScrollStep;elementContainerSelector=null;hasAnchor=false;dropped=new re;entered=new re;exited=new re;sorted=new re;_unsortedItems=new Set;constructor(){let e=f(ia,{optional:true}),t=f(X);this._dropListRef=Jn(t,this.element),this._dropListRef.data=this,e&&this._assignDefaults(e),this._dropListRef.enterPredicate=(n,o)=>this.enterPredicate(n.data,o.data),this._dropListRef.sortPredicate=(n,o,r)=>this.sortPredicate(n,o.data,r.data),this._setupInputSyncSubscription(this._dropListRef),this._handleEvents(this._dropListRef),a._dropLists.push(this),this._group&&this._group._items.add(this);}addItem(e){this._unsortedItems.add(e),e._dragRef._withDropContainer(this._dropListRef),this._dropListRef.isDragging()&&this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef));}removeItem(e){if(this._unsortedItems.delete(e),this._latestSortedRefs){let t=this._latestSortedRefs.indexOf(e._dragRef);t>-1&&(this._latestSortedRefs.splice(t,1),this._syncItemsWithRef(this._latestSortedRefs));}}getSortedItems(){return Array.from(this._unsortedItems).sort((e,t)=>e._dragRef.getVisibleElement().compareDocumentPosition(t._dragRef.getVisibleElement())&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}ngOnDestroy(){let e=a._dropLists.indexOf(this);e>-1&&a._dropLists.splice(e,1),this._group&&this._group._items.delete(this),this._latestSortedRefs=void 0,this._unsortedItems.clear(),this._dropListRef.dispose(),this._destroyed.next(),this._destroyed.complete();}_setupInputSyncSubscription(e){this._dir&&this._dir.change.pipe(Oo$1(this._dir.value),Bt$2(this._destroyed)).subscribe(t=>e.withDirection(t)),e.beforeStarted.subscribe(()=>{let t=Zc(this.connectedTo).map(n=>{if(typeof n=="string"){let o=a._dropLists.find(r=>r.id===n);return o}return n});if(this._group&&this._group._items.forEach(n=>{t.indexOf(n)===-1&&t.push(n);}),!this._scrollableParentsResolved){let n=this._scrollDispatcher.getAncestorScrollContainers(this.element).map(o=>o.getElementRef().nativeElement);this._dropListRef.withScrollableParents(n),this._scrollableParentsResolved=true;}if(this.elementContainerSelector){let n=this.element.nativeElement.querySelector(this.elementContainerSelector);e.withElementContainer(n);}e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.sortingDisabled=this.sortingDisabled,e.autoScrollDisabled=this.autoScrollDisabled,e.autoScrollStep=Rh(this.autoScrollStep,2),e.hasAnchor=this.hasAnchor,e.connectedTo(t.filter(n=>n&&n!==this).map(n=>n._dropListRef)).withOrientation(this.orientation);});}_handleEvents(e){e.beforeStarted.subscribe(()=>{this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef)),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(t=>{this.entered.emit({container:this,item:t.item.data,currentIndex:t.currentIndex});}),e.exited.subscribe(t=>{this.exited.emit({container:this,item:t.item.data}),this._changeDetectorRef.markForCheck();}),e.sorted.subscribe(t=>{this.sorted.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,container:this,item:t.item.data});}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,item:t.item.data,isPointerOverContainer:t.isPointerOverContainer,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck();}),O_(e.receivingStarted,e.receivingStopped).subscribe(()=>this._changeDetectorRef.markForCheck());}_assignDefaults(e){let{lockAxis:t,draggingDisabled:n,sortingDisabled:o,listAutoScrollDisabled:r,listOrientation:l}=e;this.disabled=n??false,this.sortingDisabled=o??false,this.autoScrollDisabled=r??false,this.orientation=l||"vertical",this.lockAxis=t||null;}_syncItemsWithRef(e){this._latestSortedRefs=e,this._dropListRef.withItems(e);}static \u0275fac=function(t){return new(t||a)};static \u0275dir=De({type:a,selectors:[["","cdkDropList",""],["cdk-drop-list"]],hostAttrs:[1,"cdk-drop-list"],hostVars:7,hostBindings:function(t,n){t&2&&(_i("id",n.id),nc("cdk-drop-list-disabled",n.disabled)("cdk-drop-list-dragging",n._dropListRef.isDragging())("cdk-drop-list-receiving",n._dropListRef.isReceiving()));},inputs:{connectedTo:[0,"cdkDropListConnectedTo","connectedTo"],data:[0,"cdkDropListData","data"],orientation:[0,"cdkDropListOrientation","orientation"],id:"id",lockAxis:[0,"cdkDropListLockAxis","lockAxis"],disabled:[2,"cdkDropListDisabled","disabled",Xt$1],sortingDisabled:[2,"cdkDropListSortingDisabled","sortingDisabled",Xt$1],enterPredicate:[0,"cdkDropListEnterPredicate","enterPredicate"],sortPredicate:[0,"cdkDropListSortPredicate","sortPredicate"],autoScrollDisabled:[2,"cdkDropListAutoScrollDisabled","autoScrollDisabled",Xt$1],autoScrollStep:[0,"cdkDropListAutoScrollStep","autoScrollStep"],elementContainerSelector:[0,"cdkDropListElementContainer","elementContainerSelector"],hasAnchor:[2,"cdkDropListHasAnchor","hasAnchor",Xt$1]},outputs:{dropped:"cdkDropListDropped",entered:"cdkDropListEntered",exited:"cdkDropListExited",sorted:"cdkDropListSorted"},exportAs:["cdkDropList"],features:[Uy([{provide:Ht,useValue:void 0},{provide:na,useExisting:a}])]})}return a})();var ca=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe$1({providers:[Fa],imports:[Kt$2]})}return a})();var Ha=["button"],Ga=["*"];function qa(a,i){if(a&1&&(La(0,"div",2),Ja$1(1,"mat-pseudo-checkbox",6),mf()),a&2){let e=jT();sb(),dy("disabled",e.disabled);}}var sa=new y("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),la=new y("MatButtonToggleGroup"),ja={provide:_t$3,useExisting:Vs(()=>$t),multi:true},ft=class{source;value;constructor(i,e){this.source=i,this.value=e;}},$t=(()=>{class a{_changeDetector=f(bi);_dir=f(DR,{optional:true});_multiple=false;_disabled=false;_disabledInteractive=false;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck();}_name=f(Lh).getId("mat-button-toggle-group-");vertical=false;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(t=>t.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value);}valueChange=new re;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck();}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck();}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck();}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new re;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck();}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck();}_hideMultipleSelectionIndicator;constructor(){let e=f(sa,{optional:true});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??false,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??false;}ngOnInit(){this._selectionModel=new b(this.multiple,void 0,false);}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex();}writeValue(e){this.value=e,this._changeDetector.markForCheck();}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_keydown(e){if(this.multiple||this.disabled||zE(e))return;let n=e.target.id,o=this._buttonToggles.toArray().findIndex(l=>l.buttonId===n),r=null;switch(e.keyCode){case 32:case 13:r=this._buttonToggles.get(o)||null;break;case 38:r=this._getNextButton(o,-1);break;case 37:r=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:r=this._getNextButton(o,1);break;case 39:r=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}r&&(e.preventDefault(),r._onButtonClick(),r.focus());}_emitChangeEvent(e){let t=new ft(e,this.value);this._rawValue=t.value,this._controlValueAccessorChangeFn(t.value),this.change.emit(t);}_syncButtonToggle(e,t,n=false,o=false){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=false),this._selectionModel?t?this._selectionModel.select(e):this._selectionModel.deselect(e):o=true,o?Promise.resolve().then(()=>this._updateModelValue(e,n)):this._updateModelValue(e,n);}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?false:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(t=>e.value!=null&&t===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1;}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let t=this._buttonToggles.get(e);if(!t.disabled){t.tabIndex=0;break}}}_getNextButton(e,t){let n=this._buttonToggles;for(let o=1;o<=n.length;o++){let r=(e+t*o+n.length)%n.length,l=n.get(r);if(l&&!l.disabled)return l}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let t=this._buttonToggles.toArray();if(this.multiple&&e?(this._clearSelection(),e.forEach(n=>this._selectValue(n,t))):(this._clearSelection(),this._selectValue(e,t)),!this.multiple&&t.every(n=>n.tabIndex===-1)){for(let n of t)if(!n.disabled){n.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=false,this.multiple||(e.tabIndex=-1);});}_selectValue(e,t){for(let n of t)if(n.value===e){n.checked=true,this._selectionModel.select(n),this.multiple||(n.tabIndex=0);break}}_updateModelValue(e,t){t&&this._emitChangeEvent(e),this.valueChange.emit(this.value);}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck());}static \u0275fac=function(t){return new(t||a)};static \u0275dir=De({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,n,o){if(t&1&&tc(o,bt,5),t&2){let r;_f(r=If())&&(n._buttonToggles=r);}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(t,n){t&1&&ec("keydown",function(r){return n._keydown(r)}),t&2&&(_i("role",n.multiple?"group":"radiogroup")("aria-disabled",n.disabled),nc("mat-button-toggle-vertical",n.vertical)("mat-button-toggle-group-appearance-standard",n.appearance==="standard"));},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",Xt$1],value:"value",multiple:[2,"multiple","multiple",Xt$1],disabled:[2,"disabled","disabled",Xt$1],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",Xt$1],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",Xt$1]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Uy([ja,{provide:la,useExisting:a}])]})}return a})(),bt=(()=>{class a{_changeDetectorRef=f(bi);_elementRef=f(ge);_focusMonitor=f(NE);_idGenerator=f(Lh);_animationDisabled=Xc();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new re;constructor(){f(wr).load(P4);let e=f(la,{optional:true}),t=f(new sc("tabindex"),{optional:true})||"",n=f(sa,{optional:true});this._tabIndex=W(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0;}this.change.emit(new ft(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(t,n){if(t&1&&Dy(Ha,5),t&2){let o;_f(o=If())&&(n._buttonElement=o.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,n){t&1&&ec("focus",function(){return n.focus()}),t&2&&(_i("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),nc("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",Xt$1],appearance:"appearance",checked:[2,"checked","checked",Xt$1],disabled:[2,"disabled","disabled",Xt$1],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Ga,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,n){if(t&1&&(BT(),La(0,"button",1,0),ec("click",function(){return n._onButtonClick()}),CT(2,qa,2,1,"div",2),La(3,"span",3),HT(4),mf()(),Ja$1(5,"span",4)(6,"span",5)),t&2){let o=zT(1);dy("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),_i("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),sb(2),TT(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),sb(4),dy("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[x4,J],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),da=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe$1({imports:[$4,bt,e_]})}return a})();var $a=["input"],Qa=["label"],Wa=["*"],Qt={color:"accent",clickAction:"check-indeterminate",disabledInteractive:false},Ka=new y("mat-checkbox-default-options",{providedIn:"root",factory:()=>Qt}),z=(function(a){return a[a.Init=0]="Init",a[a.Checked=1]="Checked",a[a.Unchecked=2]="Unchecked",a[a.Indeterminate=3]="Indeterminate",a})(z||{}),Wt=class{source;checked},Kt=(()=>{class a{_elementRef=f(ge);_changeDetectorRef=f(bi);_ngZone=f(H$1);_animationsDisabled=Xc();_options=f(Ka,{optional:true});focus(){this._inputElement.nativeElement.focus();}_createChangeEvent(e){let t=new Wt;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return `${this.id||this._uniqueId}-input`}required=false;labelPosition="after";name=null;change=new re;indeterminateChange=new re;value;disableRipple=false;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=z.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){f(wr).load(P4);let e=f(new sc("tabindex"),{optional:true});this._options=this._options||Qt,this.color=this._options.color||Qt.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=f(Lh).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??false;}ngOnChanges(e){e.required&&this._validatorChangeFn();}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate);}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck());}_checked=false;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck());}_disabled=false;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(z.Indeterminate):this._transitionCheckState(this.checked?z.Checked:z.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e);}_indeterminate=W(false);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges();}writeValue(e){this.checked=!!e;}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorChangeFn=e;}_transitionCheckState(e){let t=this._currentCheckState,n=this._getAnimationTargetElement();if(!(t===e||!n)&&(this._currentAnimationClass&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(o);},1e3);});}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked);}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked);}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(false),this.indeterminateChange.emit(false);}),this._checked=!this._checked,this._transitionCheckState(this._checked?z.Checked:z.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate);}_onInteractionEvent(e){e.stopPropagation();}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck();});}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return "";switch(e){case z.Init:if(t===z.Checked)return this._animationClasses.uncheckedToChecked;if(t==z.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case z.Unchecked:return t===z.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case z.Checked:return t===z.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case z.Indeterminate:return t===z.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return ""}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e);}_onInputClick(){this._handleInputClick();}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus();}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation();}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-checkbox"]],viewQuery:function(t,n){if(t&1&&Dy($a,5)(Qa,5),t&2){let o;_f(o=If())&&(n._inputElement=o.first),_f(o=If())&&(n._labelElement=o.first);}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(t,n){t&2&&(gy("id",n.id),_i("tabindex",null)("aria-label",null)("aria-labelledby",null),tS(n.color?"mat-"+n.color:"mat-accent"),nc("_mat-animation-noopable",n._animationsDisabled)("mdc-checkbox--disabled",n.disabled)("mat-mdc-checkbox-disabled",n.disabled)("mat-mdc-checkbox-checked",n.checked)("mat-mdc-checkbox-disabled-interactive",n.disabledInteractive));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",Xt$1],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",Xt$1],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",Xt$1],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:E2(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",Xt$1],checked:[2,"checked","checked",Xt$1],disabled:[2,"disabled","disabled",Xt$1],indeterminate:[2,"indeterminate","indeterminate",Xt$1]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[Uy([{provide:_t$3,useExisting:Vs(()=>a),multi:true},{provide:K$1,useExisting:a,multi:true}]),At$1],ngContentSelectors:Wa,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(t,n){if(t&1&&(BT(),La(0,"div",3),ec("click",function(r){return n._preventBubblingFromLabel(r)}),La(1,"div",4,0)(3,"div",5),ec("click",function(){return n._onTouchTargetClick()}),mf(),La(4,"input",6,1),ec("blur",function(){return n._onBlur()})("click",function(){return n._onInputClick()})("change",function(r){return n._onInteractionEvent(r)}),mf(),Ja$1(6,"div",7),La(7,"div",8),_g(),La(8,"svg",9),Ja$1(9,"path",10),mf(),Ig(),Ja$1(10,"div",11),mf(),Ja$1(11,"div",12),mf(),La(12,"label",13,2),HT(14),mf()()),t&2){let o=zT(2);dy("labelPosition",n.labelPosition),sb(4),nc("mdc-checkbox--selected",n.checked),dy("checked",n.checked)("indeterminate",n.indeterminate)("disabled",n.disabled&&!n.disabledInteractive)("id",n.inputId)("required",n.required)("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex),_i("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby)("aria-checked",n.indeterminate?"mixed":null)("aria-controls",n.ariaControls)("aria-disabled",n.disabled&&n.disabledInteractive?true:null)("aria-expanded",n.ariaExpanded)("aria-owns",n.ariaOwns)("name",n.name)("value",n.value),sb(7),dy("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",true),sb(),dy("for",n.inputId);}},dependencies:[x4,m$1],styles:[`.mdc-checkbox {
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
`],encapsulation:2})}return a})(),ha=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe$1({imports:[Kt,e_]})}return a})();var Ya=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Xa=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Ja(a,i){a&1&&(La(0,"span",3),HT(1,1),mf());}function eo(a,i){a&1&&(La(0,"span",6),HT(1,2),mf());}var to=["*"];var io=new y("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),pa=new y("MatChipAvatar"),ma=new y("MatChipTrailingIcon"),ua=new y("MatChipEdit"),Zt=new y("MatChipRemove"),ga=new y("MatChip"),_a=(()=>{class a{_elementRef=f(ge);_parentChip=f(ga);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(e){this._disabled=e;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){f(wr).load(P4),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(t){return new(t||a)};static \u0275dir=De({type:a,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(t,n){t&2&&(_i("disabled",n._getDisabledAttribute())("aria-disabled",n.disabled),nc("mdc-evolution-chip__action--primary",n._isPrimary)("mdc-evolution-chip__action--secondary",!n._isPrimary)("mdc-evolution-chip__action--trailing",!n._isPrimary&&!n._isLeading));},inputs:{disabled:[2,"disabled","disabled",Xt$1],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:E2(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return a})(),fa=(()=>{class a extends _a{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(a)))(n||a)}})();static \u0275dir=De({type:a,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(t,n){t&1&&ec("click",function(r){return n._handleClick(r)})("keydown",function(r){return n._handleKeydown(r)}),t&2&&(_i("tabindex",n._getTabindex()),nc("mdc-evolution-chip__action--presentational",false));},features:[iy]})}return a})();var ba=(()=>{class a extends fa{_isPrimary=false;_handleClick(e){this.disabled||(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(a)))(n||a)}})();static \u0275dir=De({type:a,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(t,n){t&2&&_i("aria-hidden",null);},features:[Uy([{provide:Zt,useExisting:a}]),iy]})}return a})(),Yt=(()=>{class a{_changeDetectorRef=f(bi);_elementRef=f(ge);_tagName=f(g2);_ngZone=f(H$1);_focusMonitor=f(NE);_globalRippleOptions=f(Vh,{optional:true});_document=f(L);_onFocus=new U;_onBlur=new U;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=Xc();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=f(Lh).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e;}_disabled=false;removed=new re;destroyed=new re;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=f(K4);_injector=f(X);constructor(){let e=f(wr);e.load(P4),e.load(nu),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=O_(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(e){return this._getActions().find(t=>{let n=t._elementRef.nativeElement;return n===e||n.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{let t=e!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,n,o){if(t&1&&tc(o,pa,5)(o,ua,5)(o,ma,5)(o,Zt,5)(o,pa,5)(o,ma,5)(o,ua,5)(o,Zt,5),t&2){let r;_f(r=If())&&(n.leadingIcon=r.first),_f(r=If())&&(n.editIcon=r.first),_f(r=If())&&(n.trailingIcon=r.first),_f(r=If())&&(n.removeIcon=r.first),_f(r=If())&&(n._allLeadingIcons=r),_f(r=If())&&(n._allTrailingIcons=r),_f(r=If())&&(n._allEditIcons=r),_f(r=If())&&(n._allRemoveIcons=r);}},viewQuery:function(t,n){if(t&1&&Dy(fa,5),t&2){let o;_f(o=If())&&(n.primaryAction=o.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(t,n){t&1&&ec("keydown",function(r){return n._handleKeydown(r)}),t&2&&(gy("id",n.id),_i("role",n.role)("aria-label",n.ariaLabel),tS("mat-"+(n.color||"primary")),nc("mdc-evolution-chip",!n._isBasicChip)("mdc-evolution-chip--disabled",n.disabled)("mdc-evolution-chip--with-trailing-action",n._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",n.leadingIcon)("mdc-evolution-chip--with-primary-icon",n.leadingIcon)("mdc-evolution-chip--with-avatar",n.leadingIcon)("mat-mdc-chip-with-avatar",n.leadingIcon)("mat-mdc-chip-highlighted",n.highlighted)("mat-mdc-chip-disabled",n.disabled)("mat-mdc-basic-chip",n._isBasicChip)("mat-mdc-standard-chip",!n._isBasicChip)("mat-mdc-chip-with-trailing-icon",n._hasTrailingIcon())("_mat-animation-noopable",n._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",Xt$1],highlighted:[2,"highlighted","highlighted",Xt$1],disableRipple:[2,"disableRipple","disableRipple",Xt$1],disabled:[2,"disabled","disabled",Xt$1]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[Uy([{provide:ga,useExisting:a}])],ngContentSelectors:Xa,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(t,n){t&1&&(BT(Ya),Ja$1(0,"span",0),La(1,"span",1)(2,"span",2),CT(3,Ja,2,0,"span",3),La(4,"span",4),HT(5),Ja$1(6,"span",5),mf()()(),CT(7,eo,2,0,"span",6)),t&2&&(sb(3),TT(n.leadingIcon?3:-1),sb(4),TT(n._hasTrailingIcon()?7:-1));},dependencies:[_a],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return a})();var va=(()=>{class a{_elementRef=f(ge);_changeDetectorRef=f(bi);_dir=f(DR,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new U;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new cr;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e);}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e));}_getChipStream(e){return this._chips.changes.pipe(Oo$1(null),Fe$1(()=>O_(...this._chips.map(e))))}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-mdc-chip"))return  true;t=t.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Oo$1(this._chips)).subscribe(e=>{let t=[];e.forEach(n=>n._getActions().forEach(o=>t.push(o))),this._chipActions.reset(t),this._chipActions.notifyOnChanges();}),this._keyManager=new Ph(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(Bt$2(this._destroyed)).subscribe(({chip:e})=>{let t=e._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t);}),this._dir?.change.pipe(Bt$2(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e));}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Oo$1(null),Bt$2(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Bt$2(this._destroyed)).subscribe(e=>{let n=this._chips.toArray().indexOf(e.chip),o=e.chip._hasFocus(),r=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),l=o||r;this._isValidIndex(n)&&l&&(this._lastDestroyedFocusedChipIndex=n);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[e];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=Kt$1({type:a,selectors:[["mat-chip-set"]],contentQueries:function(t,n,o){if(t&1&&tc(o,Yt,5),t&2){let r;_f(r=If())&&(n._chips=r);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(t,n){t&1&&ec("keydown",function(r){return n._handleKeydown(r)}),t&2&&_i("role",n.role);},inputs:{disabled:[2,"disabled","disabled",Xt$1],role:"role",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:E2(e)]},ngContentSelectors:to,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,n){t&1&&(BT(),vf(0,"div",0),HT(1),yf());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return a})();var ya=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=$e({type:a});static \u0275inj=Oe$1({providers:[c3,{provide:io,useValue:{separatorKeyCodes:[13]}}],imports:[$4,e_]})}return a})();var lo=(a,i)=>i.codigo,ho=(a,i)=>i.id;function po(a,i){if(a&1){let e=FT();La(0,"button",36),ec("click",function(){let n=cg(e).$implicit,o=jT(2);return ug(o.assignee.set(n.id))}),fS(1),mf();}if(a&2){let e=i.$implicit,t=jT(2);nc("rf-on",t.assignee()===e.id),sb(),Ny(e.name);}}function mo(a,i){if(a&1){let e=FT();La(0,"div",13)(1,"label",24),fS(2,"Responsable "),La(3,"span",15),fS(4,"*"),mf()(),La(5,"button",46)(6,"mat-icon",20),fS(7,"person"),mf(),La(8,"span",31),fS(9),mf(),La(10,"mat-icon",32),fS(11,"expand_more"),mf()()(),La(12,"mat-menu",33,3)(14,"div",34),ec("click",function(n){return n.stopPropagation()})("keydown",function(n){return n.stopPropagation()}),La(15,"mat-icon"),fS(16,"search"),mf(),La(17,"input",47),ec("ngModelChange",function(n){cg(e);let o=jT();return ug(o.buscarResp.set(n))}),mf(),vC(),mf(),La(18,"button",36),ec("click",function(){cg(e);let n=jT();return ug(n.assignee.set(""))}),fS(19,"\u2014 Sin asignar \u2014"),mf(),AT(20,po,2,3,"button",37,ho),mf();}if(a&2){let e=zT(13),t=jT();sb(5),dy("matMenuTriggerFor",e),sb(3),nc("rf-placeholder",!t.assignee()),sb(),Ny(t.assigneeLabel()||"Sin asignar"),sb(8),dy("ngModel",t.buscarResp()),DC(),sb(),nc("rf-on",!t.assignee()),sb(2),NT(t.usuariosF());}}function uo(a,i){if(a&1&&(La(0,"div",29)(1,"label",24),fS(2,"Responsable "),La(3,"span",15),fS(4,"*"),mf()(),La(5,"div",16)(6,"mat-icon",20),fS(7,"person"),mf(),La(8,"span",31),fS(9),La(10,"span",48),fS(11,"\xB7 t\xFA"),mf()()()()),a&2){let e=jT();sb(9),wf("",e.nombreYo()," ");}}function go(a,i){if(a&1){let e=FT();La(0,"button",36),ec("click",function(){let n=cg(e).$implicit,o=jT();return ug(o.clientId.set(n.codigo))}),fS(1),mf();}if(a&2){let e=i.$implicit,t=jT();nc("rf-on",t.clientId()===e.codigo),sb(),Ny(e.nombre);}}function _o(a,i){if(a&1){let e=FT();La(0,"button",49),ec("click",function(){cg(e);let n=jT();return ug(n.eliminar())}),La(1,"mat-icon"),fS(2,"delete"),mf(),La(3,"span",50),fS(4,"Eliminar"),mf()();}}var Le=class a{data=f(v);hd=f(K);perfil=f(f$1);auth=f(EE);ref=f(_t$2);snack=f(Qt$1);dlg=f(vi);story=this.dlg.story;isNew=!this.story;puedeAsignarAOtros=oe(()=>this.auth.esResponsableEquipo()||this.auth.esAdminPlataforma());subtipo=W(this.story?.subtipo||"CAPACITACION");tema=W(this.story?.tema||this.story?.title||"");link=W(this.story?.link||"");assignee=W("");clientId=W(this.story?.client||"");inicioFecha=W(null);inicioHora=W("09:00");finFecha=W(null);finHora=W("10:00");buscarResp=W("");buscarCli=W("");usuariosF=oe(()=>{let i=this.buscarResp().trim().toLowerCase(),e=this.hd.hdUsers();return i?e.filter(t=>t.name.toLowerCase().includes(i)):e});clientesF=oe(()=>{let i=this.buscarCli().trim().toLowerCase(),e=this.perfil.misClientes();return i?e.filter(t=>t.nombre.toLowerCase().includes(i)):e});assigneeLabel=oe(()=>{let i=this.assignee();return i?this.hd.hdUsers().find(e=>e.id===i)?.name||i:""});clienteLabel=oe(()=>{let i=this.clientId();return i?this.perfil.misClientes().find(e=>e.codigo===i)?.nombre||i:""});constructor(){s(this.ref),this.perfil.cargarMiPerfil();let i=this.parseDT(this.story?.inicio);i&&(this.inicioFecha.set(i.fecha),this.inicioHora.set(i.hora));let e=this.parseDT(this.story?.fin);e&&(this.finFecha.set(e.fecha),this.finHora.set(e.hora)),this.story?this.assignee.set(this.story.assignee||""):this.puedeAsignarAOtros()||this.assignee.set(this.auth.session()?.id||"");}nombreYo(){return this.auth.session()?.name||"Yo"}guardar(){let i=this.tema().trim();if(!i){this.snack.open("El tema es obligatorio.","OK",{duration:3e3});return}let e=this.combinar(this.inicioFecha(),this.inicioHora());if(!e){this.snack.open("La fecha y hora de inicio es obligatoria.","OK",{duration:3e3});return}let t=this.combinar(this.finFecha(),this.finHora());if(t&&t<e){this.snack.open("El fin no puede ser anterior al inicio.","OK",{duration:3500});return}let n=this.puedeAsignarAOtros()?this.assignee()||null:this.auth.session()?.id||null,o=this.clientId(),r=this.perfil.misClientes().find(p=>p.codigo===o),l={title:i,tipo:"REUNION",subtipo:this.subtipo(),tema:i,link:this.link().trim(),inicio:e,fin:t,assignee:n,client:o||null,clientName:r?.nombre||""};this.isNew?this.data.addStory(j(m({},l),{status:"todo",priority:"media"})):this.data.updateStoryReunion(this.story.id,l),this.ref.close(true);}eliminar(){this.story&&this.auth.puedeEliminarTarea()&&(this.data.deleteStory(this.story.id),this.ref.close(true));}cerrar(){this.ref.close();}parseDT(i){if(!i)return null;let[e,t]=i.split("T"),[n,o,r]=(e||"").split("-").map(Number);return !n||!o||!r?null:{fecha:new Date(n,o-1,r),hora:(t||"09:00").slice(0,5)}}combinar(i,e){if(!i)return "";let t=n=>String(n).padStart(2,"0");return `${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}T${e||"00:00"}`}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Kt$1({type:a,selectors:[["app-reunion-dialog"]],decls:126,vars:25,consts:[["dpI",""],["dpF",""],["cliMenu","matMenu"],["respMenu","matMenu"],["mat-dialog-title","",1,"rf-head"],[1,"rf-head-icon"],[1,"rf-head-text"],[1,"rf-title"],[1,"rf-sub"],["mat-icon-button","","type","button","aria-label","Cerrar",1,"rf-close",3,"click"],[1,"rf-body"],["role","radiogroup","aria-label","Tipo de reuni\xF3n",1,"rf-seg"],["type","button","role","radio",1,"rf-seg-btn",3,"click"],[1,"rf-field"],["for","rf-tema",1,"rf-label"],[1,"rf-req"],[1,"rf-control"],["id","rf-tema","placeholder","Ej. Capacitaci\xF3n uso de Fit-Desk","maxlength","300",1,"rf-input",3,"ngModelChange","ngModel"],[1,"rf-trailing"],["for","rf-link",1,"rf-label"],[1,"rf-lead"],["id","rf-link","placeholder","Ej. https://meet.google.com/abc-defg-hij",1,"rf-input",3,"ngModelChange","ngModel"],[1,"rf-2col"],[1,"rf-field","rf-clickable",3,"click"],[1,"rf-label"],[1,"rf-label-icon"],["readonly","","placeholder","Selecciona la fecha",1,"rf-input",3,"ngModelChange","matDatepicker","ngModel"],["type","time","aria-label","Hora de inicio",1,"rf-input","rf-time",3,"ngModelChange","ngModel"],["type","time","aria-label","Hora de fin",1,"rf-input","rf-time",3,"ngModelChange","ngModel"],[1,"rf-field","rf-field-static"],["type","button","aria-label","Elegir cliente",1,"rf-control","rf-trigger",3,"matMenuTriggerFor"],[1,"rf-value"],[1,"rf-caret"],[1,"rf-menu"],[1,"rf-menu-search",3,"click","keydown"],["placeholder","Buscar cliente\u2026","aria-label","Buscar cliente",3,"ngModelChange","ngModel"],["mat-menu-item","",3,"click"],["mat-menu-item","",3,"rf-on"],[1,"rf-tip"],[1,"rf-tip-icon"],[1,"rf-tip-text"],[1,"rf-actions"],["mat-button","","type","button","matTooltip","Eliminar reuni\xF3n","aria-label","Eliminar reuni\xF3n",1,"rf-danger"],[1,"rf-spacer"],["mat-button","","type","button",3,"click"],["mat-flat-button","","color","primary","type","button",1,"rf-save",3,"click"],["type","button","aria-label","Elegir responsable",1,"rf-control","rf-trigger",3,"matMenuTriggerFor"],["placeholder","Buscar consultor\u2026","aria-label","Buscar consultor",3,"ngModelChange","ngModel"],[1,"rf-you"],["mat-button","","type","button","matTooltip","Eliminar reuni\xF3n","aria-label","Eliminar reuni\xF3n",1,"rf-danger",3,"click"],[1,"rf-btn-txt"]],template:function(e,t){if(e&1){let n=FT();La(0,"div",4)(1,"mat-icon",5),fS(2,"groups"),mf(),La(3,"div",6)(4,"h2",7),fS(5),mf(),La(6,"p",8),fS(7,"Crea y agenda una capacitaci\xF3n o presentaci\xF3n."),mf()(),La(8,"button",9),ec("click",function(){return t.cerrar()}),La(9,"mat-icon"),fS(10,"close"),mf()()(),La(11,"mat-dialog-content",10)(12,"div",11)(13,"button",12),ec("click",function(){return t.subtipo.set("CAPACITACION")}),La(14,"mat-icon"),fS(15,"school"),mf(),fS(16," Capacitaci\xF3n "),mf(),La(17,"button",12),ec("click",function(){return t.subtipo.set("PRESENTACION")}),La(18,"mat-icon"),fS(19,"co_present"),mf(),fS(20," Presentaci\xF3n "),mf()(),La(21,"div",13)(22,"label",14),fS(23,"Tema "),La(24,"span",15),fS(25,"*"),mf()(),La(26,"div",16)(27,"input",17),ec("ngModelChange",function(r){return t.tema.set(r)}),mf(),vC(),La(28,"mat-icon",18),fS(29,"article"),mf()()(),La(30,"div",13)(31,"label",19),fS(32,"Link (opcional)"),mf(),La(33,"div",16)(34,"mat-icon",20),fS(35,"link"),mf(),La(36,"input",21),ec("ngModelChange",function(r){return t.link.set(r)}),mf(),vC(),mf()(),La(37,"div",22)(38,"div",23),ec("click",function(){cg(n);let r=zT(50);return ug(r.open())}),La(39,"label",24),fS(40,"Fecha de inicio "),La(41,"span",15),fS(42,"*"),mf(),La(43,"mat-icon",25),fS(44,"event"),mf()(),La(45,"div",16)(46,"mat-icon",20),fS(47,"calendar_today"),mf(),La(48,"input",26),ec("ngModelChange",function(r){return t.inicioFecha.set(r)}),mf(),vC(),Ja$1(49,"mat-datepicker",null,0),mf()(),La(51,"div",13)(52,"label",24),fS(53,"Hora de inicio "),La(54,"span",15),fS(55,"*"),mf(),La(56,"mat-icon",25),fS(57,"schedule"),mf()(),La(58,"div",16)(59,"mat-icon",20),fS(60,"schedule"),mf(),La(61,"input",27),ec("ngModelChange",function(r){return t.inicioHora.set(r)}),mf(),vC(),mf()()(),La(62,"div",22)(63,"div",23),ec("click",function(){cg(n);let r=zT(75);return ug(r.open())}),La(64,"label",24),fS(65,"Fecha de fin "),La(66,"span",15),fS(67,"*"),mf(),La(68,"mat-icon",25),fS(69,"event"),mf()(),La(70,"div",16)(71,"mat-icon",20),fS(72,"calendar_today"),mf(),La(73,"input",26),ec("ngModelChange",function(r){return t.finFecha.set(r)}),mf(),vC(),Ja$1(74,"mat-datepicker",null,1),mf()(),La(76,"div",13)(77,"label",24),fS(78,"Hora de fin "),La(79,"span",15),fS(80,"*"),mf(),La(81,"mat-icon",25),fS(82,"schedule"),mf()(),La(83,"div",16)(84,"mat-icon",20),fS(85,"schedule"),mf(),La(86,"input",28),ec("ngModelChange",function(r){return t.finHora.set(r)}),mf(),vC(),mf()()(),CT(87,mo,22,7)(88,uo,12,1,"div",29),La(89,"div",13)(90,"label",24),fS(91,"Cliente (opcional)"),mf(),La(92,"button",30)(93,"mat-icon",20),fS(94,"apartment"),mf(),La(95,"span",31),fS(96),mf(),La(97,"mat-icon",32),fS(98,"expand_more"),mf()()(),La(99,"mat-menu",33,2)(101,"div",34),ec("click",function(r){return r.stopPropagation()})("keydown",function(r){return r.stopPropagation()}),La(102,"mat-icon"),fS(103,"search"),mf(),La(104,"input",35),ec("ngModelChange",function(r){return t.buscarCli.set(r)}),mf(),vC(),mf(),La(105,"button",36),ec("click",function(){return t.clientId.set("")}),fS(106,"\u2014 Sin cliente \u2014"),mf(),AT(107,go,2,3,"button",37,lo),mf(),La(109,"div",38)(110,"mat-icon",39),fS(111,"info"),mf(),La(112,"div",40)(113,"strong"),fS(114,"Consejo"),mf(),La(115,"p"),fS(116,"Aseg\xFArate de revisar la fecha, hora y el enlace antes de guardar la reuni\xF3n."),mf()()()(),La(117,"mat-dialog-actions",41),CT(118,_o,5,0,"button",42),Ja$1(119,"span",43),La(120,"button",44),ec("click",function(){return t.cerrar()}),fS(121,"Cancelar"),mf(),La(122,"button",45),ec("click",function(){return t.guardar()}),La(123,"mat-icon"),fS(124,"event"),mf(),fS(125),mf()();}if(e&2){let n=zT(50),o=zT(75),r=zT(100);sb(5),Ny(t.isNew?"Nueva reuni\xF3n":"Editar reuni\xF3n"),sb(8),nc("on",t.subtipo()==="CAPACITACION"),_i("aria-checked",t.subtipo()==="CAPACITACION"),sb(4),nc("on",t.subtipo()==="PRESENTACION"),_i("aria-checked",t.subtipo()==="PRESENTACION"),sb(10),dy("ngModel",t.tema()),DC(),sb(9),dy("ngModel",t.link()),DC(),sb(12),dy("matDatepicker",n)("ngModel",t.inicioFecha()),DC(),sb(13),dy("ngModel",t.inicioHora()),DC(),sb(12),dy("matDatepicker",o)("ngModel",t.finFecha()),DC(),sb(13),dy("ngModel",t.finHora()),DC(),sb(),TT(t.puedeAsignarAOtros()?87:88),sb(5),dy("matMenuTriggerFor",r),sb(3),nc("rf-placeholder",!t.clientId()),sb(),Ny(t.clienteLabel()||"Sin cliente"),sb(8),dy("ngModel",t.buscarCli()),DC(),sb(),nc("rf-on",!t.clientId()),sb(2),NT(t.clientesF()),sb(11),TT(!t.isNew&&t.auth.puedeEliminarTarea()?118:-1),sb(7),wf(" ",t.isNew?"Guardar reuni\xF3n":"Guardar cambios"," ");}},dependencies:[da$1,ln,ia$1,Di,ji,Wo$1,No$1,jo$1,zo$1,Aa$1,Fa$1,eo$1,yt,wt,Ys,Ls,Rn,Lt$1,P,G,Nt$1,zt$1,mt],styles:["[_nghost-%COMP%]{--rf-border: #dfe4ea;--rf-border-focus: var(--brand, #048abf);--rf-lead-bg: color-mix(in srgb, var(--brand, #048abf) 10%, transparent);--rf-radius: 12px}.rf-head[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;margin:0;padding:20px 24px 10px}.rf-head[_ngcontent-%COMP%]   .rf-head-icon[_ngcontent-%COMP%]{flex:none;color:var(--brand, #048abf);font-size:28px;width:28px;height:28px;margin-top:2px}.rf-head[_ngcontent-%COMP%]   .rf-head-text[_ngcontent-%COMP%]{flex:1;min-width:0}.rf-head[_ngcontent-%COMP%]   .rf-title[_ngcontent-%COMP%]{margin:0;font-size:22px;font-weight:700;letter-spacing:-.3px;line-height:1.15;color:var(--mat-sys-on-surface, #16202a)}.rf-head[_ngcontent-%COMP%]   .rf-sub[_ngcontent-%COMP%]{margin:3px 0 0;font-size:13px;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-head[_ngcontent-%COMP%]   .rf-close[_ngcontent-%COMP%]{flex:none;margin:-6px -8px 0 0;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;padding-top:6px;min-width:472px;overflow-x:hidden}.rf-seg[_ngcontent-%COMP%]{display:flex;gap:6px;width:100%;padding:4px;border-radius:14px;background:var(--mat-sys-surface-container-low, #eef2f6)}.rf-seg-btn[_ngcontent-%COMP%]{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;border:1px solid transparent;border-radius:10px;background:transparent;color:var(--mat-sys-on-surface-variant, #5a6470);font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .12s,color .12s,border-color .12s}.rf-seg-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px}.rf-seg-btn[_ngcontent-%COMP%]:hover:not(.on){background:#0000000a}.rf-seg-btn[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--brand, #048abf);outline-offset:2px}.rf-seg-btn.on[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--brand, #048abf) 12%,#fff);border-color:color-mix(in srgb,var(--brand, #048abf) 45%,transparent);color:var(--brand-dark, #0390bc);box-shadow:0 1px 2px #0000000f}.rf-field[_ngcontent-%COMP%]{border:1px solid var(--rf-border);border-radius:var(--rf-radius);padding:11px 16px 12px;background:#fff;transition:border-color .12s,box-shadow .12s}.rf-field[_ngcontent-%COMP%]:focus-within{border-color:var(--rf-border-focus);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand, #048abf) 14%,transparent)}.rf-clickable[_ngcontent-%COMP%]{cursor:pointer}.rf-field-static[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container-low, #f6f8fa)}.rf-label[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--mat-sys-on-surface, #384552);margin-bottom:8px}.rf-label[_ngcontent-%COMP%]   .rf-req[_ngcontent-%COMP%]{color:var(--brand, #048abf);font-weight:700}.rf-label[_ngcontent-%COMP%]   .rf-label-icon[_ngcontent-%COMP%]{margin-left:auto;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #97a1ab)}.rf-control[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;width:100%}.rf-lead[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:var(--rf-lead-bg);color:var(--brand, #048abf);font-size:19px}.rf-input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:15px;color:var(--mat-sys-on-surface, #16202a);padding:0}.rf-input[_ngcontent-%COMP%]::placeholder{color:#9aa4ae}.rf-time[_ngcontent-%COMP%]{font-variant-numeric:tabular-nums}.rf-trailing[_ngcontent-%COMP%]{flex:none;color:var(--mat-sys-on-surface-variant, #97a1ab);font-size:20px;width:20px;height:20px}.rf-trigger[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;text-align:left;padding:0;font:inherit}.rf-value[_ngcontent-%COMP%]{flex:1;min-width:0;font-size:15px;color:var(--mat-sys-on-surface, #16202a);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rf-value.rf-placeholder[_ngcontent-%COMP%]{color:#9aa4ae}.rf-value[_ngcontent-%COMP%]   .rf-you[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #5a6470);font-size:13px}.rf-caret[_ngcontent-%COMP%]{flex:none;color:var(--mat-sys-on-surface-variant, #97a1ab);font-size:22px;width:22px;height:22px}.rf-2col[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}@media(max-width:520px){.rf-2col[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}}.rf-menu-search[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:8px 12px;margin:-8px 0 4px;border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.rf-menu-search[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex:none;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #97a1ab)}.rf-menu-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:14px}.rf-menu-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#9aa4ae}.rf-tip[_ngcontent-%COMP%]{display:flex;gap:12px;padding:14px 16px;border-radius:var(--rf-radius);background:color-mix(in srgb,var(--brand, #048abf) 7%,transparent);border:1px solid color-mix(in srgb,var(--brand, #048abf) 18%,transparent)}.rf-tip[_ngcontent-%COMP%]   .rf-tip-icon[_ngcontent-%COMP%]{flex:none;color:var(--brand, #048abf);font-size:22px;width:22px;height:22px}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]{min-width:0}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:13px;color:var(--brand-dark, #0390bc);margin-bottom:2px}.rf-tip[_ngcontent-%COMP%]   .rf-tip-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:13px;line-height:1.4;color:var(--mat-sys-on-surface-variant, #5a6470)}.rf-actions[_ngcontent-%COMP%]{position:sticky;bottom:0;z-index:1;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:14px 24px;background:var(--mat-sys-surface-container-low, #fff);border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.rf-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.rf-danger[_ngcontent-%COMP%]{color:var(--mat-sys-error, #ba1a1a)}.rf-save[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:4px}@media(max-width:560px){.rf-body[_ngcontent-%COMP%]{min-width:0}.rf-head[_ngcontent-%COMP%]{padding:16px 18px 8px}.rf-actions[_ngcontent-%COMP%]{padding:12px 18px;gap:4px;justify-content:flex-end}.rf-actions[_ngcontent-%COMP%]   .rf-btn-txt[_ngcontent-%COMP%]{display:none}.rf-actions[_ngcontent-%COMP%]   .rf-danger[_ngcontent-%COMP%]{min-width:40px;padding:0 8px}}"]})};var fo=["filtersTpl"],ka=(a,i)=>i.status,bo=(a,i)=>i.codigo,Xt=(a,i)=>i.id;function vo(a,i){if(a&1&&(La(0,"mat-option",15),fS(1),mf()),a&2){let e=i.$implicit;dy("value",e.codigo),sb(),Ny(e.equipo||e.nombre);}}function yo(a,i){if(a&1){let e=FT();La(0,"mat-form-field",6)(1,"mat-label"),fS(2,"Equipo / Tablero"),mf(),La(3,"mat-select",14),ec("selectionChange",function(n){cg(e);let o=jT();return ug(o.switchBoard(n.value))}),AT(4,vo,2,2,"mat-option",15,bo),mf()();}if(a&2){let e=jT();sb(3),dy("value",e.currentBoard()),sb(),NT(e.boards());}}function xo(a,i){if(a&1){let e=FT();La(0,"button",16),ec("click",function(){cg(e);let n=jT();return ug(n.clearBoard())}),La(1,"mat-icon"),fS(2,"delete_sweep"),mf(),fS(3," Borrar Board "),mf();}}function ko(a,i){a&1&&(La(0,"mat-hint"),fS(1,"Buscando en el HelpDesk\u2026"),mf());}function Co(a,i){a&1&&(La(0,"mat-hint"),fS(1,"Presiona Enter para buscar por palabra"),mf());}function wo(a,i){if(a&1&&(La(0,"mat-button-toggle",15),fS(1),mf()),a&2){let e=i.$implicit,t=jT(2);dy("value",e),sb(),Ny(e==="all"?"Todas":t.PRIORITY_FILTER_LABELS[e]);}}function So(a,i){if(a&1){let e=FT();La(0,"button",28),ec("click",function(){cg(e);let n=jT(2);return ug(n.toggleTeam())}),La(1,"mat-icon"),fS(2,"groups"),mf(),fS(3," Mi equipo "),mf();}if(a&2){let e=jT(2);nc("active",e.teamOnly()),_i("aria-pressed",e.teamOnly());}}function Do(a,i){if(a&1&&(La(0,"mat-option",15),fS(1),mf()),a&2){let e=i.$implicit;dy("value",e.id),sb(),Ny(e.name);}}function Po(a,i){a&1&&(La(0,"mat-option",37),fS(1,"Sin coincidencias"),mf());}function Mo(a,i){if(a&1){let e=FT();La(0,"mat-chip",40),ec("removed",function(){let n=cg(e).$implicit,o=jT(4);return ug(o.removeAssignee(n))}),fS(1),La(2,"button",41)(3,"mat-icon"),fS(4,"close"),mf()()();}if(a&2){let e=i.$implicit,t=jT(4),n=t.resolveMember(e);by("background",t.pastel(n?.color||"#9aa0a6")),dy("matTooltip",n?.name||"\u2014"),sb(),wf(" ",t.shortName(n?.name||"\u2014")," "),sb(),_i("aria-label","Quitar "+(n?.name||"\u2014"));}}function Eo(a,i){if(a&1&&(La(0,"mat-chip-set",38),AT(1,Mo,5,5,"mat-chip",39,MT),mf()),a&2){let e=jT(3);sb(),NT(e.selectedAssignees());}}function Io(a,i){if(a&1){let e=FT();La(0,"div",25)(1,"span",29),fS(2,"Asignado a:"),mf(),La(3,"mat-form-field",30)(4,"mat-label"),fS(5,"Consultores"),mf(),La(6,"mat-select",31,2),ec("selectionChange",function(n){cg(e);let o=jT(2);return ug(o.onAssigneeSelectChange(n.value))})("closed",function(){cg(e);let n=jT(2);return ug(n.buscarAsignado.set(""))}),La(8,"div",32),ec("click",function(n){return n.stopPropagation()}),La(9,"div",33)(10,"mat-icon"),fS(11,"search"),mf(),La(12,"input",34),ec("input",function(n){cg(e);let o=jT(2);return ug(o.buscarAsignado.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),mf(),La(13,"button",35),ec("click",function(){cg(e);let n=zT(7);return ug(n.close())}),La(14,"mat-icon"),fS(15,"close"),mf(),fS(16,"Cerrar"),mf()(),La(17,"button",36),ec("click",function(n){return cg(e),jT(2).toggleAllAssignees(),ug(n.stopPropagation())}),fS(18),mf()(),AT(19,Do,2,2,"mat-option",15,Xt,false,Po,2,0,"mat-option",37),mf()(),CT(22,Eo,3,0,"mat-chip-set",38),mf();}if(a&2){let e=jT(2);sb(6),dy("value",e.selectedAssignees()),sb(6),dy("value",e.buscarAsignado()),sb(6),wf(" ",e.allAssigneesSelected()?"Quitar todos":"Seleccionar todos"," "),sb(),NT(e.assigneeOptions()),sb(3),TT(e.selectedAssignees().length?22:-1);}}function To(a,i){if(a&1&&(La(0,"mat-option",15),fS(1),mf()),a&2){let e=i.$implicit;dy("value",e.id),sb(),Ny(e.name);}}function Ro(a,i){a&1&&(La(0,"mat-option",37),fS(1,"Sin coincidencias"),mf());}function Oo(a,i){if(a&1){let e=FT();La(0,"mat-chip",45),ec("removed",function(){let n=cg(e).$implicit,o=jT(4);return ug(o.removeClient(n))}),fS(1),La(2,"button",41)(3,"mat-icon"),fS(4,"close"),mf()()();}if(a&2){let e=i.$implicit,t=jT(4);by("background",t.pastel(t.clientColorOf(e))),dy("matTooltip",t.clientNameOf(e)),sb(),wf(" ",t.clientNameOf(e)," "),sb(),_i("aria-label","Quitar "+t.clientNameOf(e));}}function Fo(a,i){if(a&1&&(La(0,"mat-chip-set",38),AT(1,Oo,5,5,"mat-chip",44,MT),mf()),a&2){let e=jT(3);sb(),NT(e.selectedClients());}}function Ao(a,i){if(a&1){let e=FT();La(0,"div",26)(1,"span",29),fS(2,"Cliente:"),mf(),La(3,"mat-form-field",42)(4,"mat-label"),fS(5,"Clientes"),mf(),La(6,"mat-select",31,3),ec("selectionChange",function(n){cg(e);let o=jT(2);return ug(o.onClientSelectChange(n.value))})("closed",function(){cg(e);let n=jT(2);return ug(n.buscarCliente.set(""))}),La(8,"div",32),ec("click",function(n){return n.stopPropagation()}),La(9,"div",33)(10,"mat-icon"),fS(11,"search"),mf(),La(12,"input",43),ec("input",function(n){cg(e);let o=jT(2);return ug(o.buscarCliente.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),mf(),La(13,"button",35),ec("click",function(){cg(e);let n=zT(7);return ug(n.close())}),La(14,"mat-icon"),fS(15,"close"),mf(),fS(16,"Cerrar"),mf()(),La(17,"button",36),ec("click",function(n){return cg(e),jT(2).toggleAllClients(),ug(n.stopPropagation())}),fS(18),mf()(),AT(19,To,2,2,"mat-option",15,Xt,false,Ro,2,0,"mat-option",37),mf()(),CT(22,Fo,3,0,"mat-chip-set",38),mf();}if(a&2){let e=jT(2);sb(6),dy("value",e.selectedClients()),sb(6),dy("value",e.buscarCliente()),sb(6),wf(" ",e.allClientsSelected()?"Quitar todos":"Seleccionar todos"," "),sb(),NT(e.clientOptions()),sb(3),TT(e.selectedClients().length?22:-1);}}function Bo(a,i){if(a&1){let e=FT();La(0,"button",46),ec("click",function(){cg(e);let n=jT(2);return ug(n.clearFilters())}),La(1,"mat-icon"),fS(2,"filter_alt_off"),mf(),fS(3," Limpiar filtros "),mf();}}function Lo(a,i){if(a&1){let e=FT();La(0,"div",17)(1,"div",18)(2,"mat-form-field",19)(3,"mat-label"),fS(4,"Buscar en el tablero"),mf(),La(5,"input",20),ec("input",function(n){cg(e);let o=jT();return ug(o.onBoardSearch(n.target.value))})("keydown.enter",function(){cg(e);let n=jT();return ug(n.submitBoardSearch())}),mf(),La(6,"mat-icon",21),fS(7,"search"),mf(),CT(8,ko,2,0,"mat-hint")(9,Co,2,0,"mat-hint"),mf()(),La(10,"div",18)(11,"mat-button-toggle-group",22),ec("change",function(n){cg(e);let o=jT();return ug(o.setPriority(n.value))}),AT(12,wo,2,2,"mat-button-toggle",15,MT),mf(),La(14,"button",23),ec("click",function(){cg(e);let n=jT();return ug(n.toggleMine())}),La(15,"mat-icon"),fS(16,"person"),mf(),fS(17," Asignados a m\xED "),mf(),CT(18,So,4,3,"button",24),CT(19,Io,23,5,"div",25),CT(20,Ao,23,5,"div",26),mf(),CT(21,Bo,4,0,"button",27),mf();}if(a&2){let e=jT();sb(5),dy("value",e.boardSearchText()),sb(3),TT(e.searchingTickets()?8:e.searchPending()?9:-1),sb(3),dy("value",e.priorityFilter()),sb(),NT(e.PRIORITY_FILTERS),sb(2),nc("active",e.mineOnly()),_i("aria-pressed",e.mineOnly()),sb(4),TT(e.puedeVerEquipo()?18:-1),sb(),TT(e.assigneeChips().length?19:-1),sb(),TT(e.clientChips().length?20:-1),sb(),TT(e.hasFilters()?21:-1);}}function No(a,i){if(a&1&&(La(0,"span",56)(1,"mat-icon",71),fS(2,"groups"),mf(),fS(3),mf()),a&2){let e=jT().$implicit,t=jT(2);sb(3),wf(" ",t.subtipoLabel(e.subtipo));}}function Vo(a,i){if(a&1){let e=FT();La(0,"button",74),ec("click",function(n){cg(e);let o=jT(2).$implicit,r=jT(2);return ug(r.copiarTicket(o.ticket,n))}),La(1,"mat-icon"),fS(2),mf()();}if(a&2){let e=jT(2).$implicit,t=jT(2);dy("matTooltip",t.ticketCopiado()===e.ticket?"Copiado":"Copiar n\xFAmero"),sb(2),Ny(t.ticketCopiado()===e.ticket?"check":"content_copy");}}function zo(a,i){if(a&1&&(La(0,"span",72),fS(1),mf(),CT(2,Vo,3,2,"button",73)),a&2){let e=jT().$implicit;sb(),Ny(e.ticket?"#"+e.ticket:e.id),sb(),TT(e.ticket?2:-1);}}function Ho(a,i){if(a&1&&(La(0,"span",75),fS(1),mf()),a&2){let e=jT().$implicit,t=jT(2);tS(t.prioClase(t.ticketPrio(e.ticket))),sb(),wf("#",t.ticketPrio(e.ticket));}}function Go(a,i){if(a&1&&(La(0,"span",76),fS(1),mf()),a&2){let e=jT().$implicit,t=jT(2);tS("prio-"+e.priority),sb(),Ny(t.PRIORITY_LABELS[e.priority]);}}function qo(a,i){if(a&1&&(La(0,"span",59)(1,"mat-icon",71),fS(2,"groups"),mf(),fS(3),mf()),a&2){let e=jT().$implicit,t=jT(2);sb(3),wf("",t.boardLabel(e.board)," ");}}function jo(a,i){if(a&1){let e=FT();La(0,"button",79),ec("click",function(){let n=cg(e).$implicit,o=jT(2).$implicit,r=jT(2);return ug(r.moveCard(o,n.status))}),La(1,"mat-icon"),fS(2),mf(),fS(3),mf();}if(a&2){let e=i.$implicit,t=jT(2).$implicit;dy("disabled",e.status===t.status),sb(2),Ny(e.status===t.status?"radio_button_checked":"radio_button_unchecked"),sb(),wf(" ",e.label," ");}}function Uo(a,i){if(a&1&&(La(0,"button",77),ec("click",function(t){return t.stopPropagation()}),La(1,"mat-icon"),fS(2,"drive_file_move"),mf()(),La(3,"mat-menu",null,4),AT(5,jo,4,3,"button",78,ka),mf()),a&2){let e=zT(4),t=jT(3);dy("matMenuTriggerFor",e),sb(5),NT(t.columns());}}function $o(a,i){if(a&1){let e=FT();La(0,"button",80),ec("click",function(n){cg(e);let o=jT().$implicit,r=jT(2);return n.stopPropagation(),ug(r.deleteCard(o))}),La(1,"mat-icon"),fS(2,"close"),mf()();}}function Qo(a,i){if(a&1&&(La(0,"span",62),fS(1),mf()),a&2){let e=jT().$implicit,t=DS(1);sb(),Ny(e.clientName||t?.name);}}function Wo(a,i){if(a&1&&(La(0,"div",81)(1,"mat-icon",71),fS(2,"schedule"),mf(),fS(3),mf()),a&2){let e=jT(2).$implicit,t=jT(2);sb(3),wf(" ",t.fmtReunion(e.inicio,e.fin));}}function Ko(a,i){if(a&1&&(La(0,"a",83),ec("click",function(t){return t.stopPropagation()}),La(1,"mat-icon",71),fS(2,"link"),mf(),fS(3," Abrir enlace "),mf()),a&2){let e=jT(2).$implicit,t=jT(2);dy("href",t.linkHref(e.link),iv);}}function Zo(a,i){if(a&1&&(CT(0,Wo,4,1,"div",81),CT(1,Ko,4,1,"a",82)),a&2){let e=jT().$implicit;TT(e.inicio?0:-1),sb(),TT(e.link?1:-1);}}function Yo(a,i){if(a&1&&(La(0,"span",64),fS(1),mf()),a&2){let e=jT().$implicit;sb(),Ny(e.hdEstatus);}}function Xo(a,i){if(a&1&&(La(0,"div",65),fS(1),mf()),a&2){jT();let e=DS(2);sb(),wf("\u26A0 Pr\xF3ximo a vencer \u2014 ",e.badge);}}function Jo(a,i){if(a&1){let e=FT();La(0,"div",84),ec("click",function(n){return n.stopPropagation()}),Ja$1(1,"mat-progress-bar",85),La(2,"input",86),ec("change",function(n){cg(e);let o=jT().$implicit,r=jT(2);return ug(r.onProgressChange(o,n.target.value))}),mf()(),La(3,"button",87),ec("click",function(n){cg(e);let o=jT().$implicit,r=jT(2);return n.stopPropagation(),ug(r.toggleWaiting(o))}),fS(4),mf();}if(a&2){let e=jT().$implicit,t=jT(2);sb(),by("--mdc-linear-progress-active-indicator-color",t.progColor(e.progress)),dy("value",e.progress),sb(),dy("value",e.progress);let n=t.waitingDays(e);sb(),nc("active",n!==null&&n<3)("alert",n!==null&&n>=3),sb(),wf(" ",n!==null&&n>=3?"\u26A0 Notificar al cliente":"\u23F3 Esperando cliente"," ");}}function er(a,i){if(a&1){let e=FT();La(0,"div",88),ec("click",function(n){return n.stopPropagation()}),La(1,"mat-checkbox",89),ec("change",function(n){cg(e);let o=jT().$implicit,r=jT(2);return ug(r.onCert(o,n))}),mf(),La(2,"span",90),fS(3,"Certificado"),mf()();}a&2&&(sb(),dy("checked",false));}function tr(a,i){if(a&1){let e=FT();La(0,"div",88),ec("click",function(n){return n.stopPropagation()}),La(1,"mat-checkbox",91),ec("change",function(n){cg(e);let o=jT().$implicit,r=jT(2);return ug(r.onFinalize(o,n))}),fS(2),mf()();}if(a&2){let e=jT().$implicit;sb(),dy("checked",e.approved)("disabled",!!e.ticket),sb(),wf(" ",e.approved?"Finalizado \u2713":"Finalizado"," ");}}function ir(a,i){if(a&1&&(La(0,"span",69),Ja$1(1,"span",92),La(2,"span",93),fS(3),mf()()),a&2){jT();let e=DS(0),t=jT(2);dy("matTooltip",e.name),sb(),by("background",e.color),sb(2),Ny(t.shortName(e.name));}}function nr(a,i){a&1&&(La(0,"span",70),Ja$1(1,"span",92),La(2,"span",93),fS(3,"Sin asignar"),mf()());}function ar(a,i){if(a&1){let e=FT();Fy(0)(1)(2),La(3,"mat-card",54),ec("click",function(){let n=cg(e).$implicit,o=jT(2);return ug(o.openDetail(n))}),La(4,"div",55),CT(5,No,4,1,"span",56)(6,zo,3,2),CT(7,Ho,2,3,"span",57)(8,Go,2,3,"span",58),CT(9,qo,4,1,"span",59),Ja$1(10,"span",60),CT(11,Uo,7,1),CT(12,$o,3,0,"button",61),mf(),CT(13,Qo,2,1,"span",62),La(14,"div",63),fS(15),mf(),CT(16,Zo,2,2),CT(17,Yo,2,1,"span",64),CT(18,Xo,2,1,"div",65),CT(19,Jo,5,9)(20,er,4,1,"div",66)(21,tr,3,3,"div",66),La(22,"div",67)(23,"span",68)(24,"mat-icon"),fS(25,"event"),mf(),fS(26),mf(),CT(27,ir,4,4,"span",69)(28,nr,4,0,"span",70),mf()();}if(a&2){let e,t=i.$implicit,n=jT(2),o=yS(n.assigneeView(t));sb();let r=yS(n.clientOf(t.client)),l=n.clientStyle(r);sb();let p=yS(n.dueInfo(t.dueDate,t.status));sb(),by("background",l.bg)("color",l.ink)("--accent",l.accent)("--tilt",n.cardTilt(t.id)),nc("not-mine",!n.canDrag(t))("overdue",p.overdue)("soon",p.soon),dy("id","card-"+t.id)("cdkDragData",t)("cdkDragDisabled",n.isHandset()||!n.canDrag(t)),sb(2),TT(n.esReunion(t)?5:6),sb(2),TT(t.ticket&&n.ticketPrio(t.ticket)?7:8),sb(2),TT(n.esForanea(t)?9:-1),sb(2),TT(n.canDrag(t)?11:-1),sb(),TT(n.puedeEliminarTarea()&&!t.ticket?12:-1),sb(),TT(t.clientName||r?13:-1),sb(2),Ny(t.title),sb(),TT(n.esReunion(t)?16:-1),sb(),TT(t.ticket&&t.hdEstatus?17:-1),sb(),TT(p.soon?18:-1),sb(),TT((e=t.status)==="in_progress"?19:e==="review"?20:e==="done"?21:-1),sb(4),nc("overdue",p.overdue)("soon",p.soon),sb(3),wf("",p.str||"\u2014"," "),sb(),TT(o?27:28);}}function or(a,i){a&1&&(La(0,"div",53)(1,"span"),fS(2,"\u25CB"),mf(),La(3,"span"),fS(4,"Sin tareas"),mf()());}function rr(a,i){if(a&1){let e=FT();La(0,"section",13)(1,"header",47),Ja$1(2,"span",48),La(3,"span",49),fS(4),mf(),La(5,"span",50),fS(6),mf()(),La(7,"div",51),ec("cdkDropListDropped",function(n){let o=cg(e).$implicit,r=jT();return ug(r.drop(n,o.status))}),AT(8,ar,29,37,"mat-card",52,Xt,false,or,5,0,"div",53),mf()();}if(a&2){let e=i.$implicit;sb(),tS("head-"+e.status),sb(),tS("dot-"+e.status),sb(2),Ny(e.label),sb(2),Ny(e.cards.length),sb(),dy("cdkDropListData",e.cards),sb(),NT(e.cards);}}var xa=class a{data=f(v);auth=f(EE);helpdesk=f(K);dialog=f(fe);snack=f(Qt$1);transfer=f(p);shell=f(d);breakpoints=f(Sh);route=f(sn);isHandset=T(this.breakpoints.observe("(max-width: 768px)").pipe(F(i=>i.matches)),{initialValue:false});filtersTpl=v2("filtersTpl");syncing=W(false);ticketPrioMap=W({});ticketAssigneeMap=W({});teamOnly=W(false);teamHids=W(new Set);puedeVerEquipo=oe(()=>this.data.usesQuarkus()&&this.auth.puedeTransferir());constructor(){this.helpdesk.getHdUsers(),this.helpdesk.getClients(),this.helpdesk.getTicketStatuses(),this.data.ensureInit().then(()=>this.initBoards()),this.auth.ensureRolesPlataforma().then(()=>{!this.mineTocado&&!this.auth.veTableroCompleto()&&this.mineOnly.set(true);}),this.data.usesQuarkus()&&this.auth.puedeTransferir()&&this.transfer.miEquipoMiembros().then(i=>this.teamHids.set(new Set(i.map(e=>String(e.helpdeskUserId||"").trim().toUpperCase()).filter(Boolean)))).catch(()=>{}),pi(()=>this.shell.setFilters(this.filtersTpl()??null));}ngOnDestroy(){this.shell.clear();}toggleTeam(){this.teamOnly.update(i=>!i);}boards=oe(()=>this.data.boards());currentBoard=oe(()=>this.data.currentBoard());async initBoards(){if(this.data.usesQuarkus()){let i=await this.data.loadBoards(this.auth.session()?.id??null),e=this.route.snapshot.queryParamMap.get("board"),t=e&&i.some(n=>n.codigo===e)?e:i[0]?.codigo;t&&this.data.switchBoard(t);}this.focusCardFromRoute(),await this.syncTicketStatuses();}async focusCardFromRoute(){let e=this.route.snapshot.queryParamMap.get("card");if(e)for(let t=0;t<15;t++){let n=this.data.stories().find(o=>o.id===e);if(n){let o=document.getElementById("card-"+e);o&&(o.scrollIntoView({behavior:"smooth",block:"center"}),o.classList.add("card-highlight"),setTimeout(()=>o.classList.remove("card-highlight"),2200)),this.openDetail(n);return}await new Promise(o=>setTimeout(o,200));}}async switchBoard(i){!i||i===this.currentBoard()||(this.data.switchBoard(i),await this.syncTicketStatuses());}async syncTicketStatuses(){let i=this.data.getStoriesByBoard().filter(o=>o.ticket);if(!i.length)return;this.syncing.set(true);let e=this.data.usesQuarkus()?await this.data.getTicketEspejoCache():null,t={},n={};await Promise.all(i.map(async o=>{let r=await this.helpdesk.fetchTicketRaw(o.ticket)??(e?e[o.ticket]:null);if(!r)return;let l=String(r.priority??"").trim();l&&(t[o.ticket]=l),n[o.ticket]={id:String(r.assigned_user_id??r.usuarioAsignado??"").trim().toUpperCase(),name:String(r.assigned_person??r.nombreAsignado??"").trim()};let p={},_=String(r.client_id??"").trim();_&&o.client!==_&&(p.client=_);let v=String(r.cliente??"").trim();v&&o.clientName!==v&&(p.clientName=v);let b=String(r.estado||"");b&&o.hdEstatus!==b&&(p.hdEstatus=b);let P=Tr(b);o.status!==P.status&&(p.status=P.status),P.approved!==void 0&&!!o.approved!==P.approved&&(p.approved=P.approved,p.approvedDate=P.approved?new Date().toISOString().split("T")[0]:null),P.waiting&&!o.waitingClient&&(p.waitingClient=true,p.waitingDate=new Date().toISOString().split("T")[0]),Object.keys(p).length&&this.data.patchStory(o.id,p);})),this.ticketPrioMap.set(t),this.ticketAssigneeMap.set(n),this.syncing.set(false);}ticketPrio(i){return i&&this.ticketPrioMap()[i]||""}prioBandaDe(i){let e=this.ticketPrio(i.ticket);return e?$n$1(e):i.priority}prioClase=hn;resolveMember=i=>Lr(i,this.data.team(),this.helpdesk.hdUsers());effAssignee(i){if(i.ticket){let e=this.ticketAssigneeMap()[i.ticket];if(e)return e.id}return String(i.assignee||"").trim()}assigneeView(i){let e=this.effAssignee(i);if(!e)return null;let t=this.resolveMember(e);if(t&&t.name&&t.name!=="\u2014")return {name:t.name,color:t.color};let n=i.ticket?this.ticketAssigneeMap()[i.ticket]?.name:"";return n?{name:n,color:_t$1(e)}:t?{name:t.name,color:t.color}:null}dueInfo=Hr;progColor=Yr;clientStyle=Br;pastel=Rr;cardTilt=Nr;STATUS_LABELS=Er;PRIORITY_LABELS=Or;PRIORITY_FILTER_LABELS=Pr;PRIORITY_FILTERS=["all","alta","media","baja"];priorityFilter=W("all");activeClients=W(new Set);activeAssignees=W(new Set);codeSearch=W("");palabraSearch=W("");matchedTickets=W(null);searchingTickets=W(false);searchedPalabra=W("");searchPending=oe(()=>{let i=this.palabraSearch().trim();return !!i&&i!==this.searchedPalabra()});mineOnly=W(false);mineTocado=false;puedeGestionarTodo=this.auth.puedeGestionarTodo;puedeBorrarBoard=this.auth.puedeBorrarBoard;puedeEliminarTarea=this.auth.puedeEliminarTarea;get myId(){return String(this.auth.session()?.id||"").trim().toUpperCase()}clients=oe(()=>this.data.clients());visibleStories=oe(()=>{let i=this.data.currentBoard(),e=new Date;e.setDate(e.getDate()-2);let t=e.toISOString().split("T")[0],n=this.data.stories().filter(l=>!i||(l.board||"CUENCA")===i).filter(l=>!(l.status==="done"&&l.approved&&(l.approvedDate||"")<t)),o=l=>parseInt(String(l).replace(/\D/g,""),10)||0,r=new Map;for(let l of n){let p=String(l.ticket||"").trim();if(!p)continue;let _=r.get(p);(!_||o(l.id)<o(_))&&r.set(p,l.id);}return n.filter(l=>{let p=String(l.ticket||"").trim();return !p||r.get(p)===l.id})});cardsSource=oe(()=>{let i=this.visibleStories(),e=this.myId,t=this.mineOnly(),n=this.teamOnly();if(!t&&!n||!e)return i;let o=this.teamHids(),r=this.data.currentBoard(),l=new Date;l.setDate(l.getDate()-2);let p=l.toISOString().split("T")[0],_=new Set(i.map(b=>b.id)),v=this.data.stories().filter(b=>{if(_.has(b.id)||(b.board||"CUENCA")===(r||"CUENCA")||b.status==="done"&&b.approved&&(b.approvedDate||"")<p)return  false;let P=this.effAssignee(b).toUpperCase();return P?!!(t&&P===e||n&&o.has(P)):false});return v.length?[...i,...v]:i});esForanea(i){let e=this.data.currentBoard();return !!e&&(i.board||"CUENCA")!==e}boardLabel(i){if(!i)return "";let e=this.data.boards().find(t=>t.codigo===i);return e?.equipo||e?.nombre||i}assigneeChips=oe(()=>[...new Set(this.visibleStories().map(e=>this.effAssignee(e)).filter(Boolean))].map(e=>this.resolveMember(e)).filter(e=>!!e).sort((e,t)=>(e.name||e.id).localeCompare(t.name||t.id,"es")));clientChips=oe(()=>[...new Set(this.visibleStories().map(e=>e.client).filter(Boolean))].map(e=>{let t=this.clientOf(e);return {id:e,name:t?.name||e,color:t?.color||_t$1(e)}}).sort((e,t)=>e.name.localeCompare(t.name,"es")));buscarAsignado=W("");buscarCliente=W("");filtraOpc(i,e){let t=e.trim().toLowerCase();return t?i.filter(n=>n.name.toLowerCase().includes(t)||n.id.toLowerCase().includes(t)):i}assigneeOptions=oe(()=>this.filtraOpc(this.assigneeChips(),this.buscarAsignado()));clientOptions=oe(()=>this.filtraOpc(this.clientChips(),this.buscarCliente()));columns=oe(()=>{let i=this.priorityFilter(),e=this.activeClients(),t=this.activeAssignees(),n=this.codeSearch().trim().toLowerCase(),o=this.searchedPalabra().trim().toLowerCase(),r=this.matchedTickets(),l=this.mineOnly(),p=this.teamOnly(),_=this.myId,v=this.cardsSource().filter(b=>{let P=this.effAssignee(b);if(l&&!p&&P.toUpperCase()!==_||i!=="all"&&this.prioBandaDe(b)!==i||e.size>0&&!(b.client&&e.has(b.client))||t.size>0&&!(!P||t.has(P)))return  false;if(n){let se=String(b.ticket||"").toLowerCase(),Se=String(b.id||"").toLowerCase();if(!se.includes(n)&&!Se.includes(n))return  false}if(o){let se=[b.title,b.description,b.clientName,b.client].some(vt=>String(vt||"").toLowerCase().includes(o)),Se=!!(b.ticket&&r?.has(String(b.ticket)));if(!se&&!Se)return  false}return  true});return Sr.map(b=>({status:b,label:Er[b],cards:v.filter(P=>P.status===b)}))});get workDeps(){return {data:this.data,auth:this.auth,dialog:this.dialog,snack:this.snack}}setPriority(i){this.priorityFilter.set(i),this.activeAssignees.set(new Set);}toggleMine(){this.mineTocado=true;let i=!this.mineOnly();this.mineOnly.set(i),i&&this.activeAssignees.set(new Set);}hasFilters=oe(()=>this.priorityFilter()!=="all"||this.mineOnly()||this.selectedAssignees().length>0||this.selectedClients().length>0||!!this.codeSearch().trim()||!!this.palabraSearch().trim());clearFilters(){this.priorityFilter.set("all"),this.mineOnly.set(false),this.activeAssignees.set(new Set),this.activeClients.set(new Set),this.codeSearch.set(""),this.palabraSearch.set(""),this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""),this.buscarAsignado.set(""),this.buscarCliente.set("");}onCodeInput(i){this.codeSearch.set(i);}onBoardSearch(i){let e=i.trim(),t=!e||/^\d+$/.test(e)||/^ta-?\d*$/i.test(e);this.onCodeInput(t?i:""),this.onPalabraInput(t?"":i);}submitBoardSearch(){this.palabraSearch().trim()&&this.submitPalabra();}boardSearchText=oe(()=>this.codeSearch()||this.palabraSearch());onPalabraInput(i){this.palabraSearch.set(i),i.trim()||(this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""));}async submitPalabra(){let i=this.palabraSearch().trim();if(this.searchedPalabra.set(i),!i){this.matchedTickets.set(null),this.searchingTickets.set(false);return}this.searchingTickets.set(true),this.matchedTickets.set(null);let e=await this.helpdesk.searchTicketNumbers(i);this.palabraSearch().trim()===i&&(this.matchedTickets.set(e),this.searchingTickets.set(false));}ticketCopiado=W(null);copiarTicket(i,e){e.stopPropagation(),navigator.clipboard?.writeText(String(i)).then(()=>{this.ticketCopiado.set(i),setTimeout(()=>this.ticketCopiado.set(null),1500);}).catch(()=>{});}selectedAssignees=oe(()=>[...this.activeAssignees()]);onAssigneeSelectChange(i){this.activeAssignees.set(new Set(i));}allAssigneesSelected=oe(()=>this.assigneeChips().length>0&&this.selectedAssignees().length===this.assigneeChips().length);toggleAllAssignees(){this.allAssigneesSelected()?this.activeAssignees.set(new Set):this.activeAssignees.set(new Set(this.assigneeChips().map(i=>i.id)));}shortName=Fr;removeAssignee(i){let e=new Set(this.activeAssignees());e.delete(i),this.activeAssignees.set(e);}clearAssignees(){this.activeAssignees.set(new Set);}selectedClients=oe(()=>[...this.activeClients()]);onClientSelectChange(i){this.activeClients.set(new Set(i));}allClientsSelected=oe(()=>this.clientChips().length>0&&this.selectedClients().length===this.clientChips().length);toggleAllClients(){this.allClientsSelected()?this.activeClients.set(new Set):this.activeClients.set(new Set(this.clientChips().map(i=>i.id)));}removeClient(i){let e=new Set(this.activeClients());e.delete(i),this.activeClients.set(e);}clientNameOf(i){return this.clientChips().find(e=>e.id===i)?.name||i}clientColorOf(i){return this.clientChips().find(e=>e.id===i)?.color||"#9aa0a6"}clientOf(i){if(!i)return;let e=this.data.getClient(i);if(e)return {id:e.id,name:e.name,color:e.color};let t=this.helpdesk.clients().find(n=>n.id===i);return t?{id:t.id,name:t.name}:{id:i,name:i}}puedeOperar(i){if(this.puedeGestionarTodo())return  true;let e=this.effAssignee(i).toUpperCase();return !!e&&e===this.myId}canDrag(i){return this.puedeOperar(i)}avisoSinPermiso(){this.snack.open("No tienes permisos para modificar esta tarea. Solo el asignado, un supervisor o el Helpdesk pueden.","OK",{duration:4e3});}async drop(i,e){await this.moveCard(i.item.data,e);}async moveCard(i,e){if(!(!i||i.status===e)){if(!this.puedeOperar(i)){this.avisoSinPermiso();return}if(e==="todo"&&i.ticket){this.snack.open("Una tarea con ticket no puede volver a To Do.","OK",{duration:3e3});return}if(i.status==="todo"&&e==="in_progress"){if(!await jr(i,this.workDeps))return}else if(!await d_(this.dialog.open(ut$1,{data:{title:"Mover tarea",message:`\xBFMover "${i.title}" a "${Er[e]}"?`,confirmText:"Mover"}}).afterClosed()))return;this.data.updateStoryStatus(i.id,e),this.pushHdEstado(i,Ir[e]);}}pushHdEstado(i,e){!i.ticket||!e||this.helpdesk.setTicketStatus(i.ticket,e).then(t=>{t?this.data.updateStoryHdEstatus(i.id,e):this.snack.open(`No se pudo actualizar el estado del ticket #${i.ticket} en el Helpdesk.`,"OK",{duration:4e3});});}openDetail(i){if(i.tipo==="REUNION")this.dialog.open(Le,{data:{story:i},width:"520px",maxWidth:"95vw"});else {let e=j(m({},i),{assignee:this.effAssignee(i)});this.dialog.open(Oi,{data:{story:e},width:"560px",maxWidth:"95vw"});}}openNew(){this.dialog.open(Oi,{data:{story:null},width:"560px",maxWidth:"95vw"});}openNewReunion(){this.dialog.open(Le,{data:{story:null},width:"520px",maxWidth:"95vw"});}esReunion(i){return i.tipo==="REUNION"}subtipoLabel(i){return i==="PRESENTACION"?"Presentaci\xF3n":i==="CAPACITACION"?"Capacitaci\xF3n":"Reuni\xF3n"}linkHref(i){let e=(i||"").trim();return e?/^[a-z][a-z0-9+.-]*:/i.test(e)?e:"https://"+e:""}fmtReunion(i,e){if(!i)return "";let t=new Date(i);if(isNaN(t.getTime()))return i;let n=t.toLocaleDateString("es-ES",{day:"2-digit",month:"short"}),o=p=>p&&!isNaN(new Date(p).getTime())?new Date(p).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}):"",r=o(i),l=o(e);return `${n} \xB7 ${r}${l?"\u2013"+l:""}`}onProgressChange(i,e){this.data.updateStoryProgress(i.id,zr(parseInt(e,10)||0));}waitingDays(i){return !i.waitingClient||!i.waitingDate?null:Math.floor((Date.now()-new Date(i.waitingDate+"T00:00:00").getTime())/864e5)}toggleWaiting(i){let e=!i.waitingClient;this.data.setWaitingClient(i.id,e),e&&this.pushHdEstado(i,Vr);}async onCert(i,e){if(!e.checked)return;if(!this.puedeOperar(i)){e.source.checked=false,this.avisoSinPermiso();return}if(!await d_(this.dialog.open(ut$1,{data:{title:"Certificar tarea",message:`\xBFMarcar "${i.title}" como certificada y moverla a Finalizado?`,confirmText:"Certificar"}}).afterClosed())){e.source.checked=false;return}this.data.updateStoryStatus(i.id,"done"),this.pushHdEstado(i,Ir.done);}async onFinalize(i,e){if(i.ticket)return;if(!this.puedeOperar(i)){e.source.checked=!!i.approved,this.avisoSinPermiso();return}if(!e.checked){this.data.unapproveStory(i.id);return}if(!await d_(this.dialog.open(ut$1,{data:{title:"Finalizar tarea",message:`\xBFMarcar "${i.title}" como finalizada?`,confirmText:"Finalizar"}}).afterClosed())){e.source.checked=false;return}this.data.approveStory(i.id);}async deleteCard(i){if(i.ticket){this.snack.open("Las tareas con ticket asociado no se pueden eliminar.","OK",{duration:3500});return}if(!this.puedeEliminarTarea()){this.snack.open("Solo el Responsable de Equipo puede eliminar tareas.","OK",{duration:3500});return}await d_(this.dialog.open(ut$1,{data:{title:"Eliminar tarea",message:`Vas a eliminar la tarea:

"${i.title}"

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Eliminar",danger:true,requireWord:"BORRAR"}}).afterClosed())&&this.data.deleteStory(i.id);}async clearBoard(){let i=this.data.getStoriesByBoard(),e=i.filter(r=>!r.ticket),t=i.length-e.length,n=e.map(r=>r.id);if(!n.length){this.snack.open(t?"Solo hay tareas con ticket asociado (no se pueden borrar).":"No hay tareas en el tablero.","OK",{duration:3500});return}await d_(this.dialog.open(ut$1,{data:{title:"Borrar board",message:`Vas a eliminar ${n.length} tarea(s) sin ticket del tablero.${t?`

(${t} tarea(s) con ticket asociado NO se borran.)`:""}

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Borrar todo",danger:true,requireWord:"BORRAR"}}).afterClosed())&&n.forEach(r=>this.data.deleteStory(r));}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=Kt$1({type:a,selectors:[["app-board"]],viewQuery:function(e,t){e&1&&_y(t.filtersTpl,fo,5),e&2&&$T();},decls:25,vars:3,consts:[["crearMenu","matMenu"],["filtersTpl",""],["asigSel",""],["cliSel",""],["moveMenu","matMenu"],[1,"board-bar"],["appearance","outline","subscriptSizing","dynamic",1,"board-select"],[1,"spacer"],["mat-flat-button","","color","primary",3,"matMenuTriggerFor"],[1,"crear-caret"],["mat-menu-item","",3,"click"],["mat-stroked-button","",1,"danger"],["cdkDropListGroup","",1,"kanban"],[1,"kanban-col"],[3,"selectionChange","value"],[3,"value"],["mat-stroked-button","",1,"danger",3,"click"],[1,"board-filters-panel"],[1,"filter-group"],["appearance","outline","subscriptSizing","dynamic",1,"ticket-search"],["matInput","","placeholder","N\xB0, TA-046 o una palabra\u2026",3,"input","keydown.enter","value"],["matSuffix",""],["hideSingleSelectionIndicator","","aria-label","Filtrar por prioridad",1,"prio-filter",3,"change","value"],["type","button","mat-stroked-button","","matTooltip","Mostrar solo mis tareas",1,"mine-toggle",3,"click"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"active"],[1,"assignee-filter"],[1,"client-filter"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"click"],[1,"filter-label"],["appearance","outline","subscriptSizing","dynamic",1,"assignee-select"],["multiple","",3,"selectionChange","closed","value"],[1,"sel-head",3,"click"],[1,"sel-head-search"],["placeholder","Buscar consultor\u2026",3,"input","keydown","value"],["type","button","aria-label","Cerrar lista",1,"sel-close",3,"click"],["type","button",1,"sel-head-all",3,"click"],["disabled",""],[1,"assignee-chips"],[1,"achip",3,"background","matTooltip"],[1,"achip",3,"removed","matTooltip"],["matChipRemove",""],["appearance","outline","subscriptSizing","dynamic",1,"client-select"],["placeholder","Buscar cliente\u2026",3,"input","keydown","value"],[1,"achip","cchip",3,"background","matTooltip"],[1,"achip","cchip",3,"removed","matTooltip"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters",3,"click"],[1,"col-header"],[1,"col-dot"],[1,"col-title"],[1,"col-count"],["cdkDropList","",1,"col-cards",3,"cdkDropListDropped","cdkDropListData"],["cdkDrag","",1,"story-card",3,"id","not-mine","overdue","soon","background","color","--accent","--tilt","cdkDragData","cdkDragDisabled"],[1,"empty-col"],["cdkDrag","",1,"story-card",3,"click","id","cdkDragData","cdkDragDisabled"],[1,"card-top"],[1,"reunion-badge"],["matTooltip","Prioridad del ticket",1,"prio-badge",3,"class"],[1,"prio-badge",3,"class"],["matTooltip","Tarea de otro equipo (sigue en su tablero); te la asignaron",1,"team-badge"],[1,"grow"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn"],[1,"client-name"],[1,"card-title"],[1,"hd-estatus"],[1,"soon-badge"],[1,"card-check"],[1,"card-bottom"],[1,"card-due"],[1,"card-assignee",3,"matTooltip"],["matTooltip","Sin asignar",1,"card-assignee","unassigned"],["inline",""],[1,"card-ticket"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"matTooltip"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"click","matTooltip"],["matTooltip","Prioridad del ticket",1,"prio-badge"],[1,"prio-badge"],["mat-icon-button","","matTooltip","Mover a otra columna","aria-label","Mover tarjeta a otra columna",1,"move-btn",3,"click","matMenuTriggerFor"],["mat-menu-item","",3,"disabled"],["mat-menu-item","",3,"click","disabled"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn",3,"click"],[1,"reunion-horario"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"href"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"click","href"],[1,"prog",3,"click"],["mode","determinate",3,"value"],["type","number","min","0","max","100","step","5",3,"change","value"],[1,"wait-btn",3,"click"],[1,"card-check",3,"click"],["aria-label","Certificado",3,"change","checked"],[1,"check-text"],[3,"change","checked","disabled"],[1,"ca-dot"],[1,"ca-name"]],template:function(e,t){if(e&1&&(La(0,"div",5),CT(1,yo,6,1,"mat-form-field",6),Ja$1(2,"span",7),La(3,"button",8)(4,"mat-icon"),fS(5,"add"),mf(),fS(6," Crear "),La(7,"mat-icon",9),fS(8,"arrow_drop_down"),mf()(),La(9,"mat-menu",null,0)(11,"button",10),ec("click",function(){return t.openNew()}),La(12,"mat-icon"),fS(13,"assignment"),mf(),fS(14," Tarea de desarrollo/soporte"),mf(),La(15,"button",10),ec("click",function(){return t.openNewReunion()}),La(16,"mat-icon"),fS(17,"groups"),mf(),fS(18," Reuni\xF3n"),mf()(),CT(19,xo,4,0,"button",11),mf(),ay(20,Lo,22,10,"ng-template",null,1,bS),La(22,"div",12),AT(23,rr,11,8,"section",13,ka),mf()),e&2){let n=zT(10);sb(),TT(t.boards().length>1?1:-1),sb(2),dy("matMenuTriggerFor",n),sb(16),TT(t.puedeBorrarBoard()?19:-1),sb(4),NT(t.columns());}},dependencies:[ca,ra,oa,aa,_,I,Aa$1,Fa$1,eo$1,da,$t,bt,ya,Yt,ba,va,he,Zn$1,me,ue,Io$1,Lr$1,zr$1,Bt$1,Wt$1,W$1,ha,Kt,yt,wt,on,rn,zt$1,mt,Lt$1,P,G,Nt$1],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:block;padding:16px;min-height:100%;box-sizing:border-box;background-color:#efeadf;background-image:linear-gradient(rgba(43,43,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(43,43,58,.04) 1px,transparent 1px);background-size:24px 24px}.board-bar[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding:8px 12px;background:#ffffffbf;border:1px solid rgba(43,43,58,.08);border-radius:12px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.board-bar[_ngcontent-%COMP%]   .board-select[_ngcontent-%COMP%]{width:220px}.board-bar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}.board-bar[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}.board-filters-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:12px}.board-filters-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .prio-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .assignee-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .ticket-search[_ngcontent-%COMP%]{width:100%}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:8px}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] + .filter-group[_ngcontent-%COMP%]{padding-top:12px;border-top:1px solid var(--mat-sys-outline-variant)}.board-filters-panel[_ngcontent-%COMP%]   .filter-group-title[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mat-sys-on-surface-variant)}.board-filters-panel[_ngcontent-%COMP%]   .clear-filters[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]{--mat-icon-size: 18px;justify-content:flex-start}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle.active[_ngcontent-%COMP%]{background:var(--brand, #048abf);color:#fff;border-color:var(--brand, #048abf)}.board-filters-panel[_ngcontent-%COMP%]   .assignee-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-filter[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.assignee-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.assignee-filter[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.assignee-select[_ngcontent-%COMP%]{width:200px}.assignee-chips[_ngcontent-%COMP%]{display:flex}.achip[_ngcontent-%COMP%]{font-size:11.5px;font-weight:600;color:#3a3a4a;min-height:26px}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]{color:#3a3a4a;opacity:.7}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]:hover{opacity:1}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.client-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.client-select[_ngcontent-%COMP%]{width:200px}.ticket-search[_ngcontent-%COMP%]{width:150px}.cchip[_ngcontent-%COMP%]{max-width:200px}.cchip[_ngcontent-%COMP%]     .mdc-evolution-chip__text-label{overflow:hidden;text-overflow:ellipsis}.kanban[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(220px,1fr));gap:16px;align-items:start}.kanban-col[_ngcontent-%COMP%]{background:#fff6;border:1px solid rgba(43,43,58,.06);border-radius:12px;padding:10px;min-height:140px}.col-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:2px 4px 8px;margin-bottom:6px;border-bottom:2px solid var(--mat-sys-outline-variant)}.col-header[_ngcontent-%COMP%]   .col-title[_ngcontent-%COMP%]{font-size:13px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;color:#2b2b3a}.col-header[_ngcontent-%COMP%]   .col-count[_ngcontent-%COMP%]{margin-left:auto;font-size:12px;font-weight:700;color:#2b2b3a;background:#fff;border:1px solid rgba(43,43,58,.12);border-radius:10px;padding:1px 8px}.col-header.head-todo[_ngcontent-%COMP%]{border-bottom-color:#8a8a9a}.col-header.head-in_progress[_ngcontent-%COMP%]{border-bottom-color:var(--brand)}.col-header.head-review[_ngcontent-%COMP%]{border-bottom-color:var(--accent)}.col-header.head-done[_ngcontent-%COMP%]{border-bottom-color:#27ae60}.col-dot[_ngcontent-%COMP%]{width:9px;height:9px;border-radius:50%}.col-dot.dot-todo[_ngcontent-%COMP%]{background:#8a8a9a}.col-dot.dot-in_progress[_ngcontent-%COMP%]{background:var(--brand)}.col-dot.dot-review[_ngcontent-%COMP%]{background:var(--accent)}.col-dot.dot-done[_ngcontent-%COMP%]{background:#27ae60}.col-cards[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;min-height:60px;padding:4px 2px}.empty-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:24px 0;color:#2b2b3a59;font-size:12px}.story-card.card-highlight[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_card-highlight 2.2s ease-out;position:relative;z-index:3}@keyframes _ngcontent-%COMP%_card-highlight{0%,30%{box-shadow:0 0 0 3px var(--brand, #048abf),0 6px 16px #048abf73}to{box-shadow:var(--shadow)}}.story-card[_ngcontent-%COMP%]{--shadow: 0 4px 10px rgba(43, 43, 58, .16), 0 1px 2px rgba(43, 43, 58, .1);position:relative;padding:11px 12px 10px;border:none;border-top:3px solid var(--accent);border-radius:3px;box-shadow:var(--shadow);cursor:pointer;-webkit-user-select:none;user-select:none;transform:rotate(var(--tilt, 0deg));transition:transform .16s ease,box-shadow .16s ease}.story-card[_ngcontent-%COMP%]:hover{transform:rotate(0) translateY(-3px) scale(1.015);box-shadow:0 10px 22px #2b2b3a38,0 2px 4px #2b2b3a1f;z-index:2}.story-card.not-mine[_ngcontent-%COMP%]{cursor:default;filter:saturate(.85)}.story-card.overdue[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #e74c3c}.story-card.soon[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #f29e3b}.story-card.cdk-drag-dragging[_ngcontent-%COMP%]{transform:rotate(0);box-shadow:0 14px 30px #2b2b3a47}.card-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;row-gap:4px;margin-bottom:4px}.card-top[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%]{flex:1}.card-top[_ngcontent-%COMP%]   .card-ticket[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-left:-4px;padding:0;border:none;background:transparent;color:#6d6d75;cursor:pointer;border-radius:50%}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]:hover{background:#00000014;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]{width:24px;height:24px;line-height:24px;color:#2b2b3a8c}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.prio-badge[_ngcontent-%COMP%]{font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;padding:1px 7px;border-radius:9px;color:#fff}.prio-badge.prio-alta[_ngcontent-%COMP%]{background:#e74c3c}.prio-badge.prio-media[_ngcontent-%COMP%]{background:#f2811d}.prio-badge.prio-baja[_ngcontent-%COMP%]{background:#2b2b3a73}.team-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;letter-spacing:.02em;padding:1px 7px 1px 5px;border-radius:9px;color:#fff;background:#6c5ce7;white-space:nowrap;max-width:100%;overflow:hidden}.team-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;height:13px;width:13px}.client-name[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#2b2b3a;margin-bottom:4px}.client-name[_ngcontent-%COMP%]:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}.card-title[_ngcontent-%COMP%]{font-size:13px;line-height:1.35;color:#2b2b3a;margin-bottom:8px}.soon-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#b5560e;margin-bottom:8px}.hd-estatus[_ngcontent-%COMP%]{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:#2b2b3a;background:#ffffffa6;border:1px solid var(--accent);border-radius:9px;padding:1px 8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{flex:1;border-radius:4px}.prog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:48px;padding:3px 5px;border:1px solid rgba(43,43,58,.2);border-radius:5px;background:#ffffffb3;color:#2b2b3a;font:inherit;font-size:12px;text-align:right}.wait-btn[_ngcontent-%COMP%]{width:100%;border:1px solid rgba(43,43,58,.18);background:#ffffff8c;color:#2b2b3a;border-radius:6px;padding:5px 8px;font-size:12px;cursor:pointer;margin-bottom:8px}.wait-btn.active[_ngcontent-%COMP%]{background:#fef5e7;border-color:#f29e3b;color:#b9770e}.wait-btn.alert[_ngcontent-%COMP%]{background:#fdedec;border-color:#e74c3c;color:#c0392b;font-weight:600;animation:_ngcontent-%COMP%_pulse 1.4s ease-in-out infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{opacity:1}50%{opacity:.55}}.card-check[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;margin-bottom:6px;font-size:13px;color:#2b2b3a}.check-text[_ngcontent-%COMP%]{cursor:default}.card-bottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-top:4px}.card-due[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:11px;color:#2b2b3a99}.card-due[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-due.overdue[_ngcontent-%COMP%]{color:#c0392b;font-weight:700}.card-due.soon[_ngcontent-%COMP%]{color:#b5560e}.card-assignee[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;min-width:0;max-width:150px;padding:3px 8px 3px 6px;border-radius:12px;background:#ffffffb8}.card-assignee[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{flex:none;width:10px;height:10px;border-radius:50%;background:#9aa0a6}.card-assignee[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{min-width:0;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#2b2b3a}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{background:transparent;border:1.5px dashed rgba(43,43,58,.4)}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{font-weight:500;color:#6b6b78}.reunion-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;padding:2px 8px;border-radius:9px;background:#7e57c2;color:#fff}.reunion-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;width:13px;height:13px}.reunion-horario[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#5e35b1;margin-top:4px}.reunion-horario[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.reunion-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:var(--mat-sys-primary, #048abf);text-decoration:none;margin-top:3px}.reunion-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.reunion-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.crear-caret[_ngcontent-%COMP%]{margin-left:-4px}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:3px;box-shadow:0 14px 30px #2b2b3a4d}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.3}.col-cards.cdk-drop-list-dragging[_ngcontent-%COMP%]   .story-card[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .2s cubic-bezier(0,0,.2,1)}@media(max-width:1024px){.kanban[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.kanban[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}.client-select[_ngcontent-%COMP%]{width:100%}}']})};export{xa as Board};