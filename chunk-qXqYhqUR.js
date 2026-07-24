import {D,Y as Yp,f as ee,e as Wt,aK as G,h as we,j as WL,F as Ft,G as G$1,l as Ly,aL as ih,O as OE,aM as W,aN as zt$2,aO as mt,i as ii,a as iI,Q as QI,w as wc,g as gp,B as lI,r as lp,aj as tp,aP as _I,k as ky,s as sI,d as cp,I as uI,t as Dp,C as CI,u as O,$ as $e,aQ as $,aR as B,H as Ht$2,x as jt,N as Nt,y as zt$3,V as Vt$1,ag as mI,P as Pp,ah as Yl,X as XI,ai as Kl,W as Wv,A as Ap,b as Op,z as zv,M as Mc,K as LE,R as Cl,a7 as vt,U as mr$1,av as QL,aS as Y,aA as Is,aq as N$1,ar as te,aT as nn,as as $e$1,au as me,aE as Qh,aw as Yh,aU as ot,a9 as Xt,aG as Rh,ak as VE,aV as YL,ad as iD,ae as ap,a3 as Cp,an as Se,aW as Ii,aX as xn,aY as M,aZ as k,ay as tn,a_ as Jh,a$ as Zh,b0 as im,b1 as KL,b2 as gh,T as qr,ax as Hr,a4 as vp,a5 as TI,a6 as bI,am as Ir,aB as ct,b3 as q,b4 as sh,b5 as Up,b6 as nh,b7 as J,a0 as II,a1 as DI,az as Ep,b8 as Ou,b9 as BL,ba as cn,_ as tr$1,bb as bh,bc as ht,bd as pp,a2 as FI,aa as Tm,ab as Xf,aC as Wo$1,be as en,bf as Tc,bg as bc,bh as m$1,bi as lu,bj as uu,bk as ao$1,v as vI,bl as cI,bm as gr$1,aD as T$1,bn as dr$1,ao as jv,bo as U$1,bp as kh,bq as Zt,br as P,bs as Pe,bt as Le,af as bp,bu as uh,bv as kp,bw as Fp,bx as eD,by as tD,bz as aD,aJ as Zd}from'./main-G2PG7UZJ.js';import {_,I}from'./chunk-BkPCnytW.js';import {v as vi$1}from'./chunk-CYwsvKGW.js';import {S as So$1,u as ui$1,T as Ta,B as Bo$1,H as Ht$1,Y as Yo$1,N as No$1,F as Fo$1,V as Vo$1,R as Ro$1,A as Ao$1,E as Eo$1,a as To$1,w as wo$1,I as Io$1,z as zo$1,b as zt$1,P as Po,L as Lo$1,O as Oo$1,v as va$1,c as ba$2,C as Ca$1,j as je,J as Je$1,y as ya,d as Al,e as wl,X as Xa,f as Er}from'./chunk-br03s1T2.js';import {m}from'./chunk-B2OGnHVH.js';import'./chunk-D8Zo5wxE.js';import'./chunk-BnnABenM.js';import {d,f}from'./chunk-BvJ4POKx.js';import {T}from'./chunk-CM0uX779.js';import {K}from'./chunk-Yrye1-Bc.js';import {Q as Qt}from'./chunk-BVxfZJUI.js';import {B as Bt,W as Wt$1,b}from'./chunk-C0_KAoOa.js';import {y as yt,w as wt}from'./chunk-nHi2ohhT.js';import {c as ba$1,h as ha$1,U as Ui,f as fe,j as jn$1,d as de,e as ce,g as yo,A as Ar,F as Fr,K as Ko$1,a as an,T as Ti,Z as Zo$1,i as hi$1,N as Ni,v as vi$2,_ as _o$1,Y as Yt,s as st}from'./chunk-CXg7RvlE.js';import {N}from'./chunk-ByFr5ZEt.js';function ci(a){let i=a.cloneNode(true),e=i.querySelectorAll("[id]"),t=a.nodeName.toLowerCase();i.removeAttribute("id");for(let n=0;n<e.length;n++)e[n].removeAttribute("id");return t==="canvas"?jn(a,i):(t==="input"||t==="select"||t==="textarea")&&Wn(a,i),Un("canvas",a,i,jn),Un("input, textarea, select",a,i,Wn),i}function Un(a,i,e,t){let n=i.querySelectorAll(a);if(n.length){let o=e.querySelectorAll(a);for(let r=0;r<n.length;r++)t(n[r],o[r]);}}var Va=0;function Wn(a,i){i.type!=="file"&&(i.value=a.value),i.type==="radio"&&i.name&&(i.name=`mat-clone-${i.name}-${Va++}`);}function jn(a,i){let e=i.getContext("2d");if(e)try{e.drawImage(a,0,0);}catch{}}function gi(a){let i=a.getBoundingClientRect();return {top:i.top,right:i.right,bottom:i.bottom,left:i.left,width:i.width,height:i.height,x:i.x,y:i.y}}function li(a,i,e){let{top:t,bottom:n,left:o,right:r}=a;return e>=t&&e<=n&&i>=o&&i<=r}function za(a,i){let e=i.left<a.left,t=i.left+i.width>a.right,n=i.top<a.top,o=i.top+i.height>a.bottom;return e||t||n||o}function Xe(a,i,e){a.top+=i,a.bottom=a.top+a.height,a.left+=e,a.right=a.left+a.width;}function $n(a,i,e,t){let{top:n,right:o,bottom:r,left:l,width:u,height:f}=a,x=u*i,y=f*i;return t>n-y&&t<r+y&&e>l-x&&e<o+x}var Vt=class{_document;positions=new Map;constructor(i){this._document=i;}clear(){this.positions.clear();}cache(i){this.clear(),this.positions.set(this._document,{scrollPosition:this.getViewportScrollPosition()}),i.forEach(e=>{this.positions.set(e,{scrollPosition:{top:e.scrollTop,left:e.scrollLeft},clientRect:gi(e)});});}handleScroll(i){let e=P(i),t=this.positions.get(e);if(!t)return null;let n=t.scrollPosition,o,r;if(e===this._document){let f=this.getViewportScrollPosition();o=f.top,r=f.left;}else o=e.scrollTop,r=e.scrollLeft;let l=n.top-o,u=n.left-r;return this.positions.forEach((f,x)=>{f.clientRect&&e!==x&&e.contains(x)&&Xe(f.clientRect,l,u);}),n.top=o,n.left=r,{top:l,left:u}}getViewportScrollPosition(){return {top:window.scrollY,left:window.scrollX}}};function oa(a,i){let e=a.rootNodes;if(e.length===1&&e[0].nodeType===i.ELEMENT_NODE)return e[0];let t=i.createElement("div");return e.forEach(n=>t.appendChild(n)),t}function _i(a,i,e){for(let t in i)if(i.hasOwnProperty(t)){let n=i[t];n?a.setProperty(t,n,e?.has(t)?"important":""):a.removeProperty(t);}return a}function He(a,i){let e=i?"":"none";_i(a.style,{"touch-action":i?"":"none","-webkit-user-drag":i?"":"none","-webkit-tap-highlight-color":i?"":"transparent","user-select":e,"-ms-user-select":e,"-webkit-user-select":e,"-moz-user-select":e});}function Qn(a,i,e){_i(a.style,{position:i?"":"fixed",top:i?"":"0",opacity:i?"":"0",left:i?"":"-999em"},e);}function zt(a,i){return i&&i!="none"?a+" "+i:a}function Kn(a,i){a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,a.style.transform=Je(i.left,i.top);}function Je(a,i){return `translate3d(${Math.round(a)}px, ${Math.round(i)}px, 0)`}var Ze={capture:true},ri={passive:false,capture:true},Ha=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["ng-component"]],hostAttrs:["cdk-drag-resets-container",""],decls:0,vars:0,template:function(t,n){},styles:[`@layer cdk-resets {
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
`],encapsulation:2})}return a})(),fi=(()=>{class a{_ngZone=D(Se);_document=D(tr$1);_styleLoader=D(q);_renderer=D(dr$1).createRenderer(null,null);_cleanupDocumentTouchmove;_scroll=new te;_dropInstances=new Set;_dragInstances=new Set;_activeDragInstances=Ft([]);_globalListeners;_draggingPredicate=e=>e.isDragging();_domNodesToDirectives=null;pointerMove=new te;pointerUp=new te;registerDropContainer(e){this._dropInstances.has(e)||this._dropInstances.add(e);}registerDragItem(e){this._dragInstances.add(e),this._dragInstances.size===1&&this._ngZone.runOutsideAngular(()=>{this._cleanupDocumentTouchmove?.(),this._cleanupDocumentTouchmove=this._renderer.listen(this._document,"touchmove",this._persistentTouchmoveListener,ri);});}removeDropContainer(e){this._dropInstances.delete(e);}removeDragItem(e){this._dragInstances.delete(e),this.stopDragging(e),this._dragInstances.size===0&&this._cleanupDocumentTouchmove?.();}startDragging(e,t){if(!(this._activeDragInstances().indexOf(e)>-1)&&(this._styleLoader.load(Ha),this._activeDragInstances.update(n=>[...n,e]),this._activeDragInstances().length===1)){let n=t.type.startsWith("touch"),o=l=>this.pointerUp.next(l),r=[["scroll",l=>this._scroll.next(l),Ze],["selectstart",this._preventDefaultWhileDragging,ri]];n?r.push(["touchend",o,Ze],["touchcancel",o,Ze]):r.push(["mouseup",o,Ze]),n||r.push(["mousemove",l=>this.pointerMove.next(l),ri]),this._ngZone.runOutsideAngular(()=>{this._globalListeners=r.map(([l,u,f])=>this._renderer.listen(this._document,l,u,f));});}}stopDragging(e){this._activeDragInstances.update(t=>{let n=t.indexOf(e);return n>-1?(t.splice(n,1),[...t]):t}),this._activeDragInstances().length===0&&this._clearGlobalListeners();}isDragging(e){return this._activeDragInstances().indexOf(e)>-1}scrolled(e){let t=[this._scroll];return e&&e!==this._document&&t.push(new M(n=>this._ngZone.runOutsideAngular(()=>{let o=this._renderer.listen(e,"scroll",r=>{this._activeDragInstances().length&&n.next(r);},Ze);return ()=>{o();}}))),Rh(...t)}registerDirectiveNode(e,t){this._domNodesToDirectives??=new WeakMap,this._domNodesToDirectives.set(e,t);}removeDirectiveNode(e){this._domNodesToDirectives?.delete(e);}getDragDirectiveForNode(e){return this._domNodesToDirectives?.get(e)||null}ngOnDestroy(){this._dragInstances.forEach(e=>this.removeDragItem(e)),this._dropInstances.forEach(e=>this.removeDropContainer(e)),this._domNodesToDirectives=null,this._clearGlobalListeners(),this.pointerMove.complete(),this.pointerUp.complete();}_preventDefaultWhileDragging=e=>{this._activeDragInstances().length>0&&e.preventDefault();};_persistentTouchmoveListener=e=>{this._activeDragInstances().length>0&&(this._activeDragInstances().some(this._draggingPredicate)&&e.preventDefault(),this.pointerMove.next(e));};_clearGlobalListeners(){this._globalListeners?.forEach(e=>e()),this._globalListeners=void 0;}static \u0275fac=function(t){return new(t||a)};static \u0275prov=gr$1({token:a,factory:a.\u0275fac})}return a})();function Zn(a){let i=a.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(a)*i}function Ga(a){let i=getComputedStyle(a),e=si(i,"transition-property"),t=e.find(l=>l==="transform"||l==="all");if(!t)return 0;let n=e.indexOf(t),o=si(i,"transition-duration"),r=si(i,"transition-delay");return Zn(o[n])+Zn(r[n])}function si(a,i){return a.getPropertyValue(i).split(",").map(t=>t.trim())}var qa=new Set(["position"]),di=class{_document;_rootElement;_direction;_initialDomRect;_previewTemplate;_previewClass;_pickupPositionOnPage;_initialTransform;_zIndex;_renderer;_previewEmbeddedView=null;_preview;get element(){return this._preview}constructor(i,e,t,n,o,r,l,u,f,x){this._document=i,this._rootElement=e,this._direction=t,this._initialDomRect=n,this._previewTemplate=o,this._previewClass=r,this._pickupPositionOnPage=l,this._initialTransform=u,this._zIndex=f,this._renderer=x;}attach(i){this._preview=this._createPreview(),i.appendChild(this._preview),Yn(this._preview)&&this._preview.showPopover();}destroy(){this._preview.remove(),this._previewEmbeddedView?.destroy(),this._preview=this._previewEmbeddedView=null;}setTransform(i){this._preview.style.transform=i;}getBoundingClientRect(){return this._preview.getBoundingClientRect()}addClass(i){this._preview.classList.add(i);}getTransitionDuration(){return Ga(this._preview)}addEventListener(i,e){return this._renderer.listen(this._preview,i,e)}_createPreview(){let i=this._previewTemplate,e=this._previewClass,t=i?i.template:null,n;if(t&&i){let o=i.matchSize?this._initialDomRect:null,r=i.viewContainer.createEmbeddedView(t,i.context);r.detectChanges(),n=oa(r,this._document),this._previewEmbeddedView=r,i.matchSize?Kn(n,o):n.style.transform=Je(this._pickupPositionOnPage.x,this._pickupPositionOnPage.y);}else n=ci(this._rootElement),Kn(n,this._initialDomRect),this._initialTransform&&(n.style.transform=this._initialTransform);return _i(n.style,{"pointer-events":"none",margin:Yn(n)?"0 auto 0 0":"0",position:"fixed",top:"0",left:"0","z-index":this._zIndex+""},qa),He(n,false),n.classList.add("cdk-drag-preview"),n.setAttribute("popover","manual"),n.setAttribute("dir",this._direction),e&&(Array.isArray(e)?e.forEach(o=>n.classList.add(o)):n.classList.add(e)),n}};function Yn(a){return "showPopover"in a}var Ua={passive:true},Xn={passive:false},Wa={passive:false,capture:true},ja=800,Jn="cdk-drag-placeholder",ea=new Set(["position"]);function ra(a,i,e={dragStartThreshold:5,pointerDirectionChangeThreshold:5}){let t=a.get(jv,null,{optional:true})||a.get(dr$1).createRenderer(null,null);return new hi(i,e,a.get(tr$1),a.get(Se),a.get(T$1),a.get(fi),t)}var hi=class{_config;_document;_ngZone;_viewportRuler;_dragDropRegistry;_renderer;_rootElementCleanups;_cleanupShadowRootSelectStart;_preview=null;_previewContainer;_placeholderRef=null;_placeholder;_pickupPositionInElement;_pickupPositionOnPage;_marker;_anchor=null;_passiveTransform={x:0,y:0};_activeTransform={x:0,y:0};_initialTransform;_hasStartedDragging=Ft(false);_hasMoved=false;_initialContainer;_initialIndex;_parentPositions;_moveEvents=new te;_pointerDirectionDelta;_pointerPositionAtLastDirectionChange;_lastKnownPointerPosition;_rootElement;_ownerSVGElement=null;_rootElementTapHighlight;_pointerMoveSubscription=U$1.EMPTY;_pointerUpSubscription=U$1.EMPTY;_scrollSubscription=U$1.EMPTY;_resizeSubscription=U$1.EMPTY;_lastTouchEventTime;_dragStartTime;_boundaryElement=null;_nativeInteractionsEnabled=true;_initialDomRect;_previewRect;_boundaryRect;_previewTemplate;_placeholderTemplate;_handles=[];_disabledHandles=new Set;_dropContainer;_direction="ltr";_parentDragRef=null;_cachedShadowRoot;lockAxis=null;dragStartDelay=0;previewClass;scale=1;get disabled(){return this._disabled||!!(this._dropContainer&&this._dropContainer.disabled)}set disabled(i){i!==this._disabled&&(this._disabled=i,this._toggleNativeDragInteractions(),this._handles.forEach(e=>He(e,i)));}_disabled=false;beforeStarted=new te;started=new te;released=new te;ended=new te;entered=new te;exited=new te;dropped=new te;moved=this._moveEvents;data;constrainPosition;constructor(i,e,t,n,o,r,l){this._config=e,this._document=t,this._ngZone=n,this._viewportRuler=o,this._dragDropRegistry=r,this._renderer=l,this.withRootElement(i).withParent(e.parentDragRef||null),this._parentPositions=new Vt(t),r.registerDragItem(this);}getPlaceholderElement(){return this._placeholder}getRootElement(){return this._rootElement}getVisibleElement(){return this.isDragging()?this.getPlaceholderElement():this.getRootElement()}withHandles(i){this._handles=i.map(t=>k(t)),this._handles.forEach(t=>He(t,this.disabled)),this._toggleNativeDragInteractions();let e=new Set;return this._disabledHandles.forEach(t=>{this._handles.indexOf(t)>-1&&e.add(t);}),this._disabledHandles=e,this}withPreviewTemplate(i){return this._previewTemplate=i,this}withPlaceholderTemplate(i){return this._placeholderTemplate=i,this}withRootElement(i){let e=k(i);if(e!==this._rootElement){this._removeRootElementListeners();let t=this._renderer;this._rootElementCleanups=this._ngZone.runOutsideAngular(()=>[t.listen(e,"mousedown",this._pointerDown,Xn),t.listen(e,"touchstart",this._pointerDown,Ua),t.listen(e,"dragstart",this._nativeDragStart,Xn)]),this._initialTransform=void 0,this._rootElement=e;}return typeof SVGElement<"u"&&this._rootElement instanceof SVGElement&&(this._ownerSVGElement=this._rootElement.ownerSVGElement),this}withBoundaryElement(i){return this._boundaryElement=i?k(i):null,this._resizeSubscription.unsubscribe(),i&&(this._resizeSubscription=this._viewportRuler.change(10).subscribe(()=>this._containInsideBoundaryOnResize())),this}withParent(i){return this._parentDragRef=i,this}dispose(){this._removeRootElementListeners(),this.isDragging()&&this._rootElement?.remove(),this._marker?.remove(),this._destroyPreview(),this._destroyPlaceholder(),this._dragDropRegistry.removeDragItem(this),this._removeListeners(),this.beforeStarted.complete(),this.started.complete(),this.released.complete(),this.ended.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this._moveEvents.complete(),this._handles=[],this._disabledHandles.clear(),this._dropContainer=void 0,this._resizeSubscription.unsubscribe(),this._parentPositions.clear(),this._boundaryElement=this._rootElement=this._ownerSVGElement=this._placeholderTemplate=this._previewTemplate=this._marker=this._parentDragRef=null;}isDragging(){return this._hasStartedDragging()&&this._dragDropRegistry.isDragging(this)}reset(){this._rootElement.style.transform=this._initialTransform||"",this._activeTransform={x:0,y:0},this._passiveTransform={x:0,y:0};}resetToBoundary(){if(this._boundaryElement&&this._rootElement&&za(this._boundaryElement.getBoundingClientRect(),this._rootElement.getBoundingClientRect())){let i=this._boundaryElement.getBoundingClientRect(),e=this._rootElement.getBoundingClientRect(),t=0,n=0;e.left<i.left?t=i.left-e.left:e.right>i.right&&(t=i.right-e.right),e.top<i.top?n=i.top-e.top:e.bottom>i.bottom&&(n=i.bottom-e.bottom);let o=this._activeTransform.x,r=this._activeTransform.y,l=o+t,u=r+n;this._rootElement.style.transform=Je(l,u),this._activeTransform={x:l,y:u},this._passiveTransform={x:l,y:u};}}disableHandle(i){!this._disabledHandles.has(i)&&this._handles.indexOf(i)>-1&&(this._disabledHandles.add(i),He(i,true));}enableHandle(i){this._disabledHandles.has(i)&&(this._disabledHandles.delete(i),He(i,this.disabled));}withDirection(i){return this._direction=i,this}_withDropContainer(i){this._dropContainer=i;}getFreeDragPosition(){let i=this.isDragging()?this._activeTransform:this._passiveTransform;return {x:i.x,y:i.y}}setFreeDragPosition(i){return this._activeTransform={x:0,y:0},this._passiveTransform.x=i.x,this._passiveTransform.y=i.y,this._dropContainer||this._applyRootElementTransform(i.x,i.y),this}withPreviewContainer(i){return this._previewContainer=i,this}_sortFromLastPointerPosition(){let i=this._lastKnownPointerPosition;i&&this._dropContainer&&this._updateActiveDropContainer(this._getConstrainedPointerPosition(i),i);}_removeListeners(){this._pointerMoveSubscription.unsubscribe(),this._pointerUpSubscription.unsubscribe(),this._scrollSubscription.unsubscribe(),this._cleanupShadowRootSelectStart?.(),this._cleanupShadowRootSelectStart=void 0;}_destroyPreview(){this._preview?.destroy(),this._preview=null;}_destroyPlaceholder(){this._anchor?.remove(),this._placeholder?.remove(),this._placeholderRef?.destroy(),this._placeholder=this._anchor=this._placeholderRef=null;}_pointerDown=i=>{if(this.beforeStarted.next(),this._handles.length){let e=this._getTargetHandle(i);e&&!this._disabledHandles.has(e)&&!this.disabled&&this._initializeDragSequence(e,i);}else this.disabled||this._initializeDragSequence(this._rootElement,i);};_pointerMove=i=>{let e=this._getPointerPositionOnPage(i);if(!this._hasStartedDragging()){let n=Math.abs(e.x-this._pickupPositionOnPage.x),o=Math.abs(e.y-this._pickupPositionOnPage.y);if(n+o>=this._config.dragStartThreshold){let l=Date.now()>=this._dragStartTime+this._getDragStartDelay(i),u=this._dropContainer;if(!l){this._endDragSequence(i);return}(!u||!u.isDragging()&&!u.isReceiving())&&(i.cancelable&&i.preventDefault(),this._hasStartedDragging.set(true),this._ngZone.run(()=>this._startDragSequence(i)));}return}i.cancelable&&i.preventDefault();let t=this._getConstrainedPointerPosition(e);if(this._hasMoved=true,this._lastKnownPointerPosition=e,this._updatePointerDirectionDelta(t),this._dropContainer)this._updateActiveDropContainer(t,e);else {let n=this.constrainPosition?this._initialDomRect:this._pickupPositionOnPage,o=this._activeTransform;o.x=t.x-n.x+this._passiveTransform.x,o.y=t.y-n.y+this._passiveTransform.y,this._applyRootElementTransform(o.x,o.y);}this._moveEvents.observers.length&&this._ngZone.run(()=>{this._moveEvents.next({source:this,pointerPosition:t,event:i,distance:this._getDragDistance(t),delta:this._pointerDirectionDelta});});};_pointerUp=i=>{this._endDragSequence(i);};_endDragSequence(i){if(this._dragDropRegistry.isDragging(this)&&(this._removeListeners(),this._dragDropRegistry.stopDragging(this),this._toggleNativeDragInteractions(),this._handles&&(this._rootElement.style.webkitTapHighlightColor=this._rootElementTapHighlight),!!this._hasStartedDragging()))if(this.released.next({source:this,event:i}),this._dropContainer)this._dropContainer._stopScrolling(),this._animatePreviewToPlaceholder().then(()=>{this._cleanupDragArtifacts(i),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);});else {this._passiveTransform.x=this._activeTransform.x;let e=this._getPointerPositionOnPage(i);this._passiveTransform.y=this._activeTransform.y,this._ngZone.run(()=>{this.ended.next({source:this,distance:this._getDragDistance(e),dropPoint:e,event:i});}),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this);}}_startDragSequence(i){Ye(i)&&(this._lastTouchEventTime=Date.now()),this._toggleNativeDragInteractions();let e=this._getShadowRoot(),t=this._dropContainer;if(e&&this._ngZone.runOutsideAngular(()=>{this._cleanupShadowRootSelectStart=this._renderer.listen(e,"selectstart",$a,Wa);}),t){let n=this._rootElement,o=n.parentNode,r=this._placeholder=this._createPlaceholderElement(),l=this._marker=this._marker||this._document.createComment("");o.insertBefore(l,n),this._initialTransform=n.style.transform||"",this._preview=new di(this._document,this._rootElement,this._direction,this._initialDomRect,this._previewTemplate||null,this.previewClass||null,this._pickupPositionOnPage,this._initialTransform,this._config.zIndex||1e3,this._renderer),this._preview.attach(this._getPreviewInsertionPoint(o,e)),Qn(n,false,ea),this._document.body.appendChild(o.replaceChild(r,n)),this.started.next({source:this,event:i}),t.start(),this._initialContainer=t,this._initialIndex=t.getItemIndex(this);}else this.started.next({source:this,event:i}),this._initialContainer=this._initialIndex=void 0;this._parentPositions.cache(t?t.getScrollableParents():[]);}_initializeDragSequence(i,e){this._parentDragRef&&e.stopPropagation();let t=this.isDragging(),n=Ye(e),o=!n&&e.button!==0,r=this._rootElement,l=P(e),u=!n&&this._lastTouchEventTime&&this._lastTouchEventTime+ja>Date.now(),f=n?Pe(e):Le(e);if(l&&l.draggable&&e.type==="mousedown"&&e.preventDefault(),t||o||u||f)return;if(this._handles.length){let D=r.style;this._rootElementTapHighlight=D.webkitTapHighlightColor||"",D.webkitTapHighlightColor="transparent";}this._hasMoved=false,this._hasStartedDragging.set(this._hasMoved),this._removeListeners(),this._initialDomRect=this._rootElement.getBoundingClientRect(),this._pointerMoveSubscription=this._dragDropRegistry.pointerMove.subscribe(this._pointerMove),this._pointerUpSubscription=this._dragDropRegistry.pointerUp.subscribe(this._pointerUp),this._scrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(D=>this._updateOnScroll(D)),this._boundaryElement&&(this._boundaryRect=gi(this._boundaryElement));let x=this._previewTemplate;this._pickupPositionInElement=x&&x.template&&!x.matchSize?{x:0,y:0}:this._getPointerPositionInElement(this._initialDomRect,i,e);let y=this._pickupPositionOnPage=this._lastKnownPointerPosition=this._getPointerPositionOnPage(e);this._pointerDirectionDelta={x:0,y:0},this._pointerPositionAtLastDirectionChange={x:y.x,y:y.y},this._dragStartTime=Date.now(),this._dragDropRegistry.startDragging(this,e);}_cleanupDragArtifacts(i){Qn(this._rootElement,true,ea),this._marker.parentNode.replaceChild(this._rootElement,this._marker),this._destroyPreview(),this._destroyPlaceholder(),this._initialDomRect=this._boundaryRect=this._previewRect=this._initialTransform=void 0,this._ngZone.run(()=>{let e=this._dropContainer,t=e.getItemIndex(this),n=this._getPointerPositionOnPage(i),o=this._getDragDistance(n),r=e._isOverContainer(n.x,n.y);this.ended.next({source:this,distance:o,dropPoint:n,event:i}),this.dropped.next({item:this,currentIndex:t,previousIndex:this._initialIndex,container:e,previousContainer:this._initialContainer,isPointerOverContainer:r,distance:o,dropPoint:n,event:i}),e.drop(this,t,this._initialIndex,this._initialContainer,r,o,n,i),this._dropContainer=this._initialContainer;});}_updateActiveDropContainer({x:i,y:e},{x:t,y:n}){let o=this._initialContainer._getSiblingContainerFromPosition(this,i,e);!o&&this._dropContainer!==this._initialContainer&&this._initialContainer._isOverContainer(i,e)&&(o=this._initialContainer),o&&o!==this._dropContainer&&this._ngZone.run(()=>{let r=this._dropContainer.getItemIndex(this),l=this._dropContainer.getItemAtIndex(r+1)?.getVisibleElement()||null;this.exited.next({item:this,container:this._dropContainer}),this._dropContainer.exit(this),this._conditionallyInsertAnchor(o,this._dropContainer,l),this._dropContainer=o,this._dropContainer.enter(this,i,e,o===this._initialContainer&&o.sortingDisabled?this._initialIndex:void 0),this.entered.next({item:this,container:o,currentIndex:o.getItemIndex(this)});}),this.isDragging()&&(this._dropContainer._startScrollingIfNecessary(t,n),this._dropContainer._sortItem(this,i,e,this._pointerDirectionDelta),this.constrainPosition?this._applyPreviewTransform(i,e):this._applyPreviewTransform(i-this._pickupPositionInElement.x,e-this._pickupPositionInElement.y));}_animatePreviewToPlaceholder(){if(!this._hasMoved)return Promise.resolve();let i=this._placeholder.getBoundingClientRect();this._preview.addClass("cdk-drag-animating"),this._applyPreviewTransform(i.left,i.top);let e=this._preview.getTransitionDuration();return e===0?Promise.resolve():this._ngZone.runOutsideAngular(()=>new Promise(t=>{let n=l=>{(!l||this._preview&&P(l)===this._preview.element&&l.propertyName==="transform")&&(r(),t(),clearTimeout(o));},o=setTimeout(n,e*1.5),r=this._preview.addEventListener("transitionend",n);}))}_createPlaceholderElement(){let i=this._placeholderTemplate,e=i?i.template:null,t;return e?(this._placeholderRef=i.viewContainer.createEmbeddedView(e,i.context),this._placeholderRef.detectChanges(),t=oa(this._placeholderRef,this._document)):t=ci(this._rootElement),t.style.pointerEvents="none",t.classList.add(Jn),t}_getPointerPositionInElement(i,e,t){let n=e===this._rootElement?null:e,o=n?n.getBoundingClientRect():i,r=Ye(t)?t.targetTouches[0]:t,l=this._getViewportScrollPosition(),u=r.pageX-o.left-l.left,f=r.pageY-o.top-l.top;return {x:o.left-i.left+u,y:o.top-i.top+f}}_getPointerPositionOnPage(i){let e=this._getViewportScrollPosition(),t=Ye(i)?i.touches[0]||i.changedTouches[0]||{pageX:0,pageY:0}:i,n=t.pageX-e.left,o=t.pageY-e.top;if(this._ownerSVGElement){let r=this._ownerSVGElement.getScreenCTM();if(r){let l=this._ownerSVGElement.createSVGPoint();return l.x=n,l.y=o,l.matrixTransform(r.inverse())}}return {x:n,y:o}}_getConstrainedPointerPosition(i){let e=this._dropContainer?this._dropContainer.lockAxis:null,{x:t,y:n}=this.constrainPosition?this.constrainPosition(i,this,this._initialDomRect,this._pickupPositionInElement):i;if(this.lockAxis==="x"||e==="x"?n=this._pickupPositionOnPage.y-(this.constrainPosition?this._pickupPositionInElement.y:0):(this.lockAxis==="y"||e==="y")&&(t=this._pickupPositionOnPage.x-(this.constrainPosition?this._pickupPositionInElement.x:0)),this._boundaryRect){let{x:o,y:r}=this.constrainPosition?{x:0,y:0}:this._pickupPositionInElement,l=this._boundaryRect,{width:u,height:f}=this._getPreviewRect(),x=l.top+r,y=l.bottom-(f-r),D=l.left+o,de=l.right-(u-o);t=ta(t,D,de),n=ta(n,x,y);}return {x:t,y:n}}_updatePointerDirectionDelta(i){let{x:e,y:t}=i,n=this._pointerDirectionDelta,o=this._pointerPositionAtLastDirectionChange,r=Math.abs(e-o.x),l=Math.abs(t-o.y);return r>this._config.pointerDirectionChangeThreshold&&(n.x=e>o.x?1:-1,o.x=e),l>this._config.pointerDirectionChangeThreshold&&(n.y=t>o.y?1:-1,o.y=t),n}_toggleNativeDragInteractions(){if(!this._rootElement||!this._handles)return;let i=this._handles.length>0||!this.isDragging();i!==this._nativeInteractionsEnabled&&(this._nativeInteractionsEnabled=i,He(this._rootElement,i));}_removeRootElementListeners(){this._rootElementCleanups?.forEach(i=>i()),this._rootElementCleanups=void 0;}_applyRootElementTransform(i,e){let t=1/this.scale,n=Je(i*t,e*t),o=this._rootElement.style;this._initialTransform==null&&(this._initialTransform=o.transform&&o.transform!="none"?o.transform:""),o.transform=zt(n,this._initialTransform);}_applyPreviewTransform(i,e){let t=this._previewTemplate?.template?void 0:this._initialTransform,n=Je(i,e);this._preview.setTransform(zt(n,t));}_getDragDistance(i){let e=this._pickupPositionOnPage;return e?{x:i.x-e.x,y:i.y-e.y}:{x:0,y:0}}_cleanupCachedDimensions(){this._boundaryRect=this._previewRect=void 0,this._parentPositions.clear();}_containInsideBoundaryOnResize(){let{x:i,y:e}=this._passiveTransform;if(i===0&&e===0||this.isDragging()||!this._boundaryElement)return;let t=this._rootElement.getBoundingClientRect(),n=this._boundaryElement.getBoundingClientRect();if(n.width===0&&n.height===0||t.width===0&&t.height===0)return;let o=n.left-t.left,r=t.right-n.right,l=n.top-t.top,u=t.bottom-n.bottom;n.width>t.width?(o>0&&(i+=o),r>0&&(i-=r)):i=0,n.height>t.height?(l>0&&(e+=l),u>0&&(e-=u)):e=0,(i!==this._passiveTransform.x||e!==this._passiveTransform.y)&&this.setFreeDragPosition({y:e,x:i});}_getDragStartDelay(i){let e=this.dragStartDelay;return typeof e=="number"?e:Ye(i)?e.touch:e?e.mouse:0}_updateOnScroll(i){let e=this._parentPositions.handleScroll(i);if(e){let t=P(i);this._boundaryRect&&t!==this._boundaryElement&&t.contains(this._boundaryElement)&&Xe(this._boundaryRect,e.top,e.left),this._pickupPositionOnPage.x+=e.left,this._pickupPositionOnPage.y+=e.top,this._dropContainer||(this._activeTransform.x-=e.left,this._activeTransform.y-=e.top,this._applyRootElementTransform(this._activeTransform.x,this._activeTransform.y));}}_getViewportScrollPosition(){return this._parentPositions.positions.get(this._document)?.scrollPosition||this._parentPositions.getViewportScrollPosition()}_getShadowRoot(){return this._cachedShadowRoot===void 0&&(this._cachedShadowRoot=Zt(this._rootElement)),this._cachedShadowRoot}_getPreviewInsertionPoint(i,e){let t=this._previewContainer||"global";if(t==="parent")return i;if(t==="global"){let n=this._document;return e||n.fullscreenElement||n.webkitFullscreenElement||n.mozFullScreenElement||n.msFullscreenElement||n.body}return k(t)}_getPreviewRect(){return (!this._previewRect||!this._previewRect.width&&!this._previewRect.height)&&(this._previewRect=this._preview?this._preview.getBoundingClientRect():this._initialDomRect),this._previewRect}_nativeDragStart=i=>{if(this._handles.length){let e=this._getTargetHandle(i);e&&!this._disabledHandles.has(e)&&!this.disabled&&i.preventDefault();}else this.disabled||i.preventDefault();};_getTargetHandle(i){return this._handles.find(e=>i.target&&(i.target===e||e.contains(i.target)))}_conditionallyInsertAnchor(i,e,t){if(i===this._initialContainer)this._anchor?.remove(),this._anchor=null;else if(e===this._initialContainer&&e.hasAnchor){let n=this._anchor??=ci(this._placeholder);n.classList.remove(Jn),n.classList.add("cdk-drag-anchor"),n.style.transform="",t?t.before(n):k(e.element).appendChild(n);}}};function ta(a,i,e){return Math.max(i,Math.min(e,a))}function Ye(a){return a.type[0]==="t"}function $a(a){a.preventDefault();}function sa(a,i,e){let t=ia(i,a.length-1),n=ia(e,a.length-1);if(t===n)return;let o=a[t],r=n<t?-1:1;for(let l=t;l!==n;l+=r)a[l]=a[l+r];a[n]=o;}function ia(a,i){return Math.max(0,Math.min(i,a))}var Ht=class{_dragDropRegistry;_element;_sortPredicate;_itemPositions=[];_activeDraggables;orientation="vertical";direction="ltr";constructor(i){this._dragDropRegistry=i;}_previousSwap={drag:null,delta:0,overlaps:false};start(i){this.withItems(i);}sort(i,e,t,n){let o=this._itemPositions,r=this._getItemIndexFromPointerPosition(i,e,t,n);if(r===-1&&o.length>0)return null;let l=this.orientation==="horizontal",u=o.findIndex($=>$.drag===i),f=o[r],x=o[u].clientRect,y=f.clientRect,D=u>r?1:-1,de=this._getItemOffsetPx(x,y,D),Ue=this._getSiblingOffsetPx(u,o,D),Wt=o.slice();return sa(o,u,r),o.forEach(($,La)=>{if(Wt[La]===$)return;let wi=$.drag===i,jt=wi?de:Ue,Si=wi?i.getPlaceholderElement():$.drag.getRootElement();$.offset+=jt;let Di=Math.round($.offset*(1/$.drag.scale));l?(Si.style.transform=zt(`translate3d(${Di}px, 0, 0)`,$.initialTransform),Xe($.clientRect,0,jt)):(Si.style.transform=zt(`translate3d(0, ${Di}px, 0)`,$.initialTransform),Xe($.clientRect,jt,0));}),this._previousSwap.overlaps=li(y,e,t),this._previousSwap.drag=f.drag,this._previousSwap.delta=l?n.x:n.y,{previousIndex:u,currentIndex:r}}enter(i,e,t,n){let o=this._activeDraggables,r=o.indexOf(i),l=i.getPlaceholderElement();r>-1&&o.splice(r,1);let u=n==null||n<0?this._getItemIndexFromPointerPosition(i,e,t):n,f=o[u];if(f===i&&(f=o[u+1]),!f&&(u==null||u===-1||u<o.length-1)&&this._shouldEnterAsFirstChild(e,t)&&(f=o[0]),f&&!this._dragDropRegistry.isDragging(f)){let x=f.getRootElement();x.parentElement.insertBefore(l,x),o.splice(u,0,i);}else this._element.appendChild(l),o.push(i);l.style.transform="",this._cacheItemPositions();}withItems(i){this._activeDraggables=i.slice(),this._cacheItemPositions();}withSortPredicate(i){this._sortPredicate=i;}reset(){this._activeDraggables?.forEach(i=>{let e=i.getRootElement();if(e){let t=this._itemPositions.find(n=>n.drag===i)?.initialTransform;e.style.transform=t||"";}}),this._itemPositions=[],this._activeDraggables=[],this._previousSwap.drag=null,this._previousSwap.delta=0,this._previousSwap.overlaps=false;}getActiveItemsSnapshot(){return this._activeDraggables}getItemIndex(i){return this._getVisualItemPositions().findIndex(e=>e.drag===i)}getItemAtIndex(i){return this._getVisualItemPositions()[i]?.drag||null}updateOnScroll(i,e){this._itemPositions.forEach(({clientRect:t})=>{Xe(t,i,e);}),this._itemPositions.forEach(({drag:t})=>{this._dragDropRegistry.isDragging(t)&&t._sortFromLastPointerPosition();});}withElementContainer(i){this._element=i;}_cacheItemPositions(){let i=this.orientation==="horizontal";this._itemPositions=this._activeDraggables.map(e=>{let t=e.getVisibleElement();return {drag:e,offset:0,initialTransform:t.style.transform||"",clientRect:gi(t)}}).sort((e,t)=>i?e.clientRect.left-t.clientRect.left:e.clientRect.top-t.clientRect.top);}_getVisualItemPositions(){return this.orientation==="horizontal"&&this.direction==="rtl"?this._itemPositions.slice().reverse():this._itemPositions}_getItemOffsetPx(i,e,t){let n=this.orientation==="horizontal",o=n?e.left-i.left:e.top-i.top;return t===-1&&(o+=n?e.width-i.width:e.height-i.height),o}_getSiblingOffsetPx(i,e,t){let n=this.orientation==="horizontal",o=e[i].clientRect,r=e[i+t*-1],l=o[n?"width":"height"]*t;if(r){let u=n?"left":"top",f=n?"right":"bottom";t===-1?l-=r.clientRect[u]-o[f]:l+=o[u]-r.clientRect[f];}return l}_shouldEnterAsFirstChild(i,e){if(!this._activeDraggables.length)return  false;let t=this._itemPositions,n=this.orientation==="horizontal";if(t[0].drag!==this._activeDraggables[0]){let r=t[t.length-1].clientRect;return n?i>=r.right:e>=r.bottom}else {let r=t[0].clientRect;return n?i<=r.left:e<=r.top}}_getItemIndexFromPointerPosition(i,e,t,n){let o=this.orientation==="horizontal",r=this._itemPositions.findIndex(({drag:l,clientRect:u})=>{if(l===i)return  false;if(n){let f=o?n.x:n.y;if(l===this._previousSwap.drag&&this._previousSwap.overlaps&&f===this._previousSwap.delta)return  false}return o?e>=Math.floor(u.left)&&e<Math.floor(u.right):t>=Math.floor(u.top)&&t<Math.floor(u.bottom)});return r===-1||!this._sortPredicate(r,i)?-1:r}},pi=class{_document;_dragDropRegistry;_element;_sortPredicate;_rootNode;_activeItems;_previousSwap={drag:null,deltaX:0,deltaY:0,overlaps:false};_relatedNodes=[];constructor(i,e){this._document=i,this._dragDropRegistry=e;}start(i){let e=this._element.childNodes;this._relatedNodes=[];for(let t=0;t<e.length;t++){let n=e[t];this._relatedNodes.push([n,n.nextSibling]);}this.withItems(i);}sort(i,e,t,n){let o=this._getItemIndexFromPointerPosition(i,e,t),r=this._previousSwap;if(o===-1||this._activeItems[o]===i)return null;let l=this._activeItems[o];if(r.drag===l&&r.overlaps&&r.deltaX===n.x&&r.deltaY===n.y)return null;let u=this.getItemIndex(i),f=i.getPlaceholderElement(),x=l.getRootElement();o>u?x.after(f):x.before(f),sa(this._activeItems,u,o);let y=this._getRootNode().elementFromPoint(e,t);return r.deltaX=n.x,r.deltaY=n.y,r.drag=l,r.overlaps=x===y||x.contains(y),{previousIndex:u,currentIndex:o}}enter(i,e,t,n){let o=this._activeItems.indexOf(i);o>-1&&this._activeItems.splice(o,1);let r=n==null||n<0?this._getItemIndexFromPointerPosition(i,e,t):n;r===-1&&(r=this._getClosestItemIndexToPointer(i,e,t));let l=this._activeItems[r];l&&!this._dragDropRegistry.isDragging(l)?(this._activeItems.splice(r,0,i),l.getRootElement().before(i.getPlaceholderElement())):(this._activeItems.push(i),this._element.appendChild(i.getPlaceholderElement()));}withItems(i){this._activeItems=i.slice();}withSortPredicate(i){this._sortPredicate=i;}reset(){let i=this._element,e=this._previousSwap;for(let t=this._relatedNodes.length-1;t>-1;t--){let[n,o]=this._relatedNodes[t];n.parentNode===i&&n.nextSibling!==o&&(o===null?i.appendChild(n):o.parentNode===i&&i.insertBefore(n,o));}this._relatedNodes=[],this._activeItems=[],e.drag=null,e.deltaX=e.deltaY=0,e.overlaps=false;}getActiveItemsSnapshot(){return this._activeItems}getItemIndex(i){return this._activeItems.indexOf(i)}getItemAtIndex(i){return this._activeItems[i]||null}updateOnScroll(){this._activeItems.forEach(i=>{this._dragDropRegistry.isDragging(i)&&i._sortFromLastPointerPosition();});}withElementContainer(i){i!==this._element&&(this._element=i,this._rootNode=void 0);}_getItemIndexFromPointerPosition(i,e,t){let n=this._getRootNode().elementFromPoint(Math.floor(e),Math.floor(t)),o=n?this._activeItems.findIndex(r=>{let l=r.getRootElement();return n===l||l.contains(n)}):-1;return o===-1||!this._sortPredicate(o,i)?-1:o}_getRootNode(){return this._rootNode||(this._rootNode=Zt(this._element)||this._document),this._rootNode}_getClosestItemIndexToPointer(i,e,t){if(this._activeItems.length===0)return  -1;if(this._activeItems.length===1)return 0;let n=1/0,o=-1;for(let r=0;r<this._activeItems.length;r++){let l=this._activeItems[r];if(l!==i){let{x:u,y:f}=l.getRootElement().getBoundingClientRect(),x=Math.hypot(e-u,t-f);x<n&&(n=x,o=r);}}return o}},na=.05,ca=.05,Q=(function(a){return a[a.NONE=0]="NONE",a[a.UP=1]="UP",a[a.DOWN=2]="DOWN",a})(Q||{}),j=(function(a){return a[a.NONE=0]="NONE",a[a.LEFT=1]="LEFT",a[a.RIGHT=2]="RIGHT",a})(j||{});function la(a,i){return new mi(i,a.get(fi),a.get(tr$1),a.get(Se),a.get(T$1))}var mi=class{_dragDropRegistry;_ngZone;_viewportRuler;element;disabled=false;sortingDisabled=false;lockAxis=null;autoScrollDisabled=false;autoScrollStep=2;hasAnchor=false;enterPredicate=()=>true;sortPredicate=()=>true;beforeStarted=new te;entered=new te;exited=new te;dropped=new te;sorted=new te;receivingStarted=new te;receivingStopped=new te;data;_container;_isDragging=false;_parentPositions;_sortStrategy;_domRect;_draggables=[];_siblings=[];_activeSiblings=new Set;_viewportScrollSubscription=U$1.EMPTY;_verticalScrollDirection=Q.NONE;_horizontalScrollDirection=j.NONE;_scrollNode;_stopScrollTimers=new te;_cachedShadowRoot=null;_document;_scrollableElements=[];_initialScrollSnap;_direction="ltr";constructor(i,e,t,n,o){this._dragDropRegistry=e,this._ngZone=n,this._viewportRuler=o;let r=this.element=k(i);this._document=t,this.withOrientation("vertical").withElementContainer(r),e.registerDropContainer(this),this._parentPositions=new Vt(t);}dispose(){this._stopScrolling(),this._stopScrollTimers.complete(),this._viewportScrollSubscription.unsubscribe(),this.beforeStarted.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this.sorted.complete(),this.receivingStarted.complete(),this.receivingStopped.complete(),this._activeSiblings.clear(),this._scrollNode=null,this._parentPositions.clear(),this._dragDropRegistry.removeDropContainer(this);}isDragging(){return this._isDragging}start(){this._draggingStarted(),this._notifyReceivingSiblings();}enter(i,e,t,n){this._draggingStarted(),n==null&&this.sortingDisabled&&(n=this._draggables.indexOf(i)),this._sortStrategy.enter(i,e,t,n),this._cacheParentPositions(),this._notifyReceivingSiblings(),this.entered.next({item:i,container:this,currentIndex:this.getItemIndex(i)});}exit(i){this._reset(),this.exited.next({item:i,container:this});}drop(i,e,t,n,o,r,l,u){this._reset(),this.dropped.next({item:i,currentIndex:e,previousIndex:t,container:this,previousContainer:n,isPointerOverContainer:o,distance:r,dropPoint:l,event:u});}withItems(i){let e=this._draggables;return this._draggables=i,i.forEach(t=>t._withDropContainer(this)),this.isDragging()&&(e.filter(n=>n.isDragging()).every(n=>i.indexOf(n)===-1)?this._reset():this._sortStrategy.withItems(this._draggables)),this}withDirection(i){return this._direction=i,this._sortStrategy instanceof Ht&&(this._sortStrategy.direction=i),this}connectedTo(i){return this._siblings=i.slice(),this}withOrientation(i){if(i==="mixed")this._sortStrategy=new pi(this._document,this._dragDropRegistry);else {let e=new Ht(this._dragDropRegistry);e.direction=this._direction,e.orientation=i,this._sortStrategy=e;}return this._sortStrategy.withElementContainer(this._container),this._sortStrategy.withSortPredicate((e,t)=>this.sortPredicate(e,t,this)),this}withScrollableParents(i){let e=this._container;return this._scrollableElements=i.indexOf(e)===-1?[e,...i]:i.slice(),this}withElementContainer(i){if(i===this._container)return this;k(this.element);let t=this._scrollableElements.indexOf(this._container),n=this._scrollableElements.indexOf(i);return t>-1&&this._scrollableElements.splice(t,1),n>-1&&this._scrollableElements.splice(n,1),this._sortStrategy&&this._sortStrategy.withElementContainer(i),this._cachedShadowRoot=null,this._scrollableElements.unshift(i),this._container=i,this}getScrollableParents(){return this._scrollableElements}getItemIndex(i){return this._isDragging?this._sortStrategy.getItemIndex(i):this._draggables.indexOf(i)}getItemAtIndex(i){return this._isDragging?this._sortStrategy.getItemAtIndex(i):this._draggables[i]||null}isReceiving(){return this._activeSiblings.size>0}_sortItem(i,e,t,n){if(this.sortingDisabled||!this._domRect||!$n(this._domRect,na,e,t))return;let o=this._sortStrategy.sort(i,e,t,n);o&&this.sorted.next({previousIndex:o.previousIndex,currentIndex:o.currentIndex,container:this,item:i});}_startScrollingIfNecessary(i,e){if(this.autoScrollDisabled)return;let t,n=Q.NONE,o=j.NONE;if(this._parentPositions.positions.forEach((r,l)=>{l===this._document||!r.clientRect||t||$n(r.clientRect,na,i,e)&&([n,o]=Qa(l,r.clientRect,this._direction,i,e),(n||o)&&(t=l));}),!n&&!o){let{width:r,height:l}=this._viewportRuler.getViewportSize(),u={width:r,height:l,top:0,right:r,bottom:l,left:0};n=da(u,e),o=ha(u,i),t=window;}t&&(n!==this._verticalScrollDirection||o!==this._horizontalScrollDirection||t!==this._scrollNode)&&(this._verticalScrollDirection=n,this._horizontalScrollDirection=o,this._scrollNode=t,(n||o)&&t?this._ngZone.runOutsideAngular(this._startScrollInterval):this._stopScrolling());}_stopScrolling(){this._stopScrollTimers.next();}_draggingStarted(){let i=this._container.style;this.beforeStarted.next(),this._isDragging=true,this._initialScrollSnap=i.msScrollSnapType||i.scrollSnapType||"",i.scrollSnapType=i.msScrollSnapType="none",this._sortStrategy.start(this._draggables),this._cacheParentPositions(),this._viewportScrollSubscription.unsubscribe(),this._listenToScrollEvents();}_cacheParentPositions(){this._parentPositions.cache(this._scrollableElements),this._domRect=this._parentPositions.positions.get(this._container).clientRect;}_reset(){this._isDragging=false;let i=this._container.style;i.scrollSnapType=i.msScrollSnapType=this._initialScrollSnap,this._siblings.forEach(e=>e._stopReceiving(this)),this._sortStrategy.reset(),this._stopScrolling(),this._viewportScrollSubscription.unsubscribe(),this._parentPositions.clear();}_startScrollInterval=()=>{this._stopScrolling(),kh(0,uh).pipe(Yh(this._stopScrollTimers)).subscribe(()=>{let i=this._scrollNode,e=this.autoScrollStep;this._verticalScrollDirection===Q.UP?i.scrollBy(0,-e):this._verticalScrollDirection===Q.DOWN&&i.scrollBy(0,e),this._horizontalScrollDirection===j.LEFT?i.scrollBy(-e,0):this._horizontalScrollDirection===j.RIGHT&&i.scrollBy(e,0);});};_isOverContainer(i,e){return this._domRect!=null&&li(this._domRect,i,e)}_getSiblingContainerFromPosition(i,e,t){return this._siblings.find(n=>n._canReceive(i,e,t))}_canReceive(i,e,t){if(!this._domRect||!li(this._domRect,e,t)||!this.enterPredicate(i,this))return  false;let n=this._getShadowRoot().elementFromPoint(e,t);return n?n===this._container||this._container.contains(n):false}_startReceiving(i,e){let t=this._activeSiblings;!t.has(i)&&e.every(n=>this.enterPredicate(n,this)||this._draggables.indexOf(n)>-1)&&(t.add(i),this._cacheParentPositions(),this._listenToScrollEvents(),this.receivingStarted.next({initiator:i,receiver:this,items:e}));}_stopReceiving(i){this._activeSiblings.delete(i),this._viewportScrollSubscription.unsubscribe(),this.receivingStopped.next({initiator:i,receiver:this});}_listenToScrollEvents(){this._viewportScrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(i=>{if(this.isDragging()){let e=this._parentPositions.handleScroll(i);e&&this._sortStrategy.updateOnScroll(e.top,e.left);}else this.isReceiving()&&this._cacheParentPositions();});}_getShadowRoot(){if(!this._cachedShadowRoot){let i=Zt(this._container);this._cachedShadowRoot=i||this._document;}return this._cachedShadowRoot}_notifyReceivingSiblings(){let i=this._sortStrategy.getActiveItemsSnapshot().filter(e=>e.isDragging());this._siblings.forEach(e=>e._startReceiving(this,i));}};function da(a,i){let{top:e,bottom:t,height:n}=a,o=n*ca;return i>=e-o&&i<=e+o?Q.UP:i>=t-o&&i<=t+o?Q.DOWN:Q.NONE}function ha(a,i){let{left:e,right:t,width:n}=a,o=n*ca;return i>=e-o&&i<=e+o?j.LEFT:i>=t-o&&i<=t+o?j.RIGHT:j.NONE}function Qa(a,i,e,t,n){let o=da(i,n),r=ha(i,t),l=Q.NONE,u=j.NONE;if(o){let f=a.scrollTop;o===Q.UP?f>0&&(l=Q.UP):a.scrollHeight-f>a.clientHeight&&(l=Q.DOWN);}if(r){let f=a.scrollLeft;e==="rtl"?r===j.RIGHT?f<0&&(u=j.RIGHT):a.scrollWidth+f>a.clientWidth&&(u=j.LEFT):r===j.LEFT?f>0&&(u=j.LEFT):a.scrollWidth-f>a.clientWidth&&(u=j.RIGHT);}return [l,u]}var Ka=(()=>{class a{_injector=D(me);createDrag(e,t){return ra(this._injector,e,t)}createDropList(e){return la(this._injector,e)}static \u0275fac=function(t){return new(t||a)};static \u0275prov=gr$1({token:a,factory:a.\u0275fac})}return a})(),aa=new N$1("CDK_DRAG_PARENT");var Za=new N$1("CdkDragHandle");var pa=new N$1("CDK_DRAG_CONFIG"),ma=new N$1("CdkDropList"),ua=(()=>{class a{element=D(mr$1);dropContainer=D(ma,{optional:true,skipSelf:true});_ngZone=D(Se);_viewContainerRef=D(Ii);_dir=D(Is,{optional:true});_changeDetectorRef=D(QL);_selfHandle=D(Za,{optional:true,self:true});_parentDrag=D(aa,{optional:true,skipSelf:true});_dragDropRegistry=D(fi);_destroyed=new te;_handles=new xn([]);_previewTemplate=null;_placeholderTemplate=null;_dragRef;data;lockAxis=null;rootElementSelector;boundaryElement;dragStartDelay;freeDragPosition;get disabled(){return this._disabled||!!(this.dropContainer&&this.dropContainer.disabled)}set disabled(e){this._disabled=e,this._dragRef.disabled=this._disabled;}_disabled=false;constrainPosition;previewClass;previewContainer;scale=1;started=new $e$1;released=new $e$1;ended=new $e$1;entered=new $e$1;exited=new $e$1;dropped=new $e$1;moved=new M(e=>{let t=this._dragRef.moved.pipe(we(n=>({source:this,pointerPosition:n.pointerPosition,event:n.event,delta:n.delta,distance:n.distance}))).subscribe(e);return ()=>{t.unsubscribe();}});_injector=D(me);constructor(){let e=this.dropContainer,t=D(pa,{optional:true});this._dragRef=ra(this._injector,this.element,{dragStartThreshold:t&&t.dragStartThreshold!=null?t.dragStartThreshold:5,pointerDirectionChangeThreshold:t&&t.pointerDirectionChangeThreshold!=null?t.pointerDirectionChangeThreshold:5,zIndex:t?.zIndex}),this._dragRef.data=this,this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement,this),t&&this._assignDefaults(t),e&&(e.addItem(this),e._dropListRef.beforeStarted.pipe(Yh(this._destroyed)).subscribe(()=>{this._dragRef.scale=this.scale;})),this._syncInputs(this._dragRef),this._handleEvents(this._dragRef);}getPlaceholderElement(){return this._dragRef.getPlaceholderElement()}getRootElement(){return this._dragRef.getRootElement()}reset(){this._dragRef.reset();}resetToBoundary(){this._dragRef.resetToBoundary();}getFreeDragPosition(){return this._dragRef.getFreeDragPosition()}setFreeDragPosition(e){this._dragRef.setFreeDragPosition(e);}ngAfterViewInit(){Ly(()=>{this._updateRootElement(),this._setupHandlesListener(),this._dragRef.scale=this.scale,this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);},{injector:this._injector});}ngOnChanges(e){let t=e.rootElementSelector,n=e.freeDragPosition;t&&!t.firstChange&&this._updateRootElement(),this._dragRef.scale=this.scale,n&&!n.firstChange&&this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition);}ngOnDestroy(){this.dropContainer&&this.dropContainer.removeItem(this),this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement),this._ngZone.runOutsideAngular(()=>{this._handles.complete(),this._destroyed.next(),this._destroyed.complete(),this._dragRef.dispose();});}_addHandle(e){let t=this._handles.getValue();t.push(e),this._handles.next(t);}_removeHandle(e){let t=this._handles.getValue(),n=t.indexOf(e);n>-1&&(t.splice(n,1),this._handles.next(t));}_setPreviewTemplate(e){this._previewTemplate=e;}_resetPreviewTemplate(e){e===this._previewTemplate&&(this._previewTemplate=null);}_setPlaceholderTemplate(e){this._placeholderTemplate=e;}_resetPlaceholderTemplate(e){e===this._placeholderTemplate&&(this._placeholderTemplate=null);}_updateRootElement(){let e=this.element.nativeElement,t=e;this.rootElementSelector&&(t=e.closest!==void 0?e.closest(this.rootElementSelector):e.parentElement?.closest(this.rootElementSelector)),this._dragRef.withRootElement(t||e);}_getBoundaryElement(){let e=this.boundaryElement;return e?typeof e=="string"?this.element.nativeElement.closest(e):k(e):null}_syncInputs(e){e.beforeStarted.subscribe(()=>{if(!e.isDragging()){let t=this._dir,n=this.dragStartDelay,o=this._placeholderTemplate?{template:this._placeholderTemplate.templateRef,context:this._placeholderTemplate.data,viewContainer:this._viewContainerRef}:null,r=this._previewTemplate?{template:this._previewTemplate.templateRef,context:this._previewTemplate.data,matchSize:this._previewTemplate.matchSize,viewContainer:this._viewContainerRef}:null;e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.scale=this.scale,e.dragStartDelay=typeof n=="object"&&n?n:Xt(n),e.constrainPosition=this.constrainPosition,e.previewClass=this.previewClass,e.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(o).withPreviewTemplate(r).withPreviewContainer(this.previewContainer||"global"),t&&e.withDirection(t.value);}}),e.beforeStarted.pipe(tn(1)).subscribe(()=>{if(this._parentDrag){e.withParent(this._parentDrag._dragRef);return}let t=this.element.nativeElement.parentElement;for(;t;){let n=this._dragDropRegistry.getDragDirectiveForNode(t);if(n){e.withParent(n._dragRef);break}t=t.parentElement;}});}_handleEvents(e){e.started.subscribe(t=>{this.started.emit({source:this,event:t.event}),this._changeDetectorRef.markForCheck();}),e.released.subscribe(t=>{this.released.emit({source:this,event:t.event});}),e.ended.subscribe(t=>{this.ended.emit({source:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(t=>{this.entered.emit({container:t.container.data,item:this,currentIndex:t.currentIndex});}),e.exited.subscribe(t=>{this.exited.emit({container:t.container.data,item:this});}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,isPointerOverContainer:t.isPointerOverContainer,item:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event});});}_assignDefaults(e){let{lockAxis:t,dragStartDelay:n,constrainPosition:o,previewClass:r,boundaryElement:l,draggingDisabled:u,rootElementSelector:f,previewContainer:x}=e;this.disabled=u??false,this.dragStartDelay=n||0,this.lockAxis=t||null,o&&(this.constrainPosition=o),r&&(this.previewClass=r),l&&(this.boundaryElement=l),f&&(this.rootElementSelector=f),x&&(this.previewContainer=x);}_setupHandlesListener(){this._handles.pipe(Jh(e=>{let t=e.map(n=>n.element);this._selfHandle&&this.rootElementSelector&&t.push(this.element),this._dragRef.withHandles(t);}),Zh(e=>Rh(...e.map(t=>t._stateChanges.pipe(Qh(t))))),Yh(this._destroyed)).subscribe(e=>{let t=this._dragRef,n=e.element.nativeElement;e.disabled?t.disableHandle(n):t.enableHandle(n);});}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","cdkDrag",""]],hostAttrs:[1,"cdk-drag"],hostVars:4,hostBindings:function(t,n){t&2&&Cp("cdk-drag-disabled",n.disabled)("cdk-drag-dragging",n._dragRef.isDragging());},inputs:{data:[0,"cdkDragData","data"],lockAxis:[0,"cdkDragLockAxis","lockAxis"],rootElementSelector:[0,"cdkDragRootElement","rootElementSelector"],boundaryElement:[0,"cdkDragBoundary","boundaryElement"],dragStartDelay:[0,"cdkDragStartDelay","dragStartDelay"],freeDragPosition:[0,"cdkDragFreeDragPosition","freeDragPosition"],disabled:[2,"cdkDragDisabled","disabled",YL],constrainPosition:[0,"cdkDragConstrainPosition","constrainPosition"],previewClass:[0,"cdkDragPreviewClass","previewClass"],previewContainer:[0,"cdkDragPreviewContainer","previewContainer"],scale:[2,"cdkDragScale","scale",KL]},outputs:{started:"cdkDragStarted",released:"cdkDragReleased",ended:"cdkDragEnded",entered:"cdkDragEntered",exited:"cdkDragExited",dropped:"cdkDragDropped",moved:"cdkDragMoved"},exportAs:["cdkDrag"],features:[iD([{provide:aa,useExisting:a}]),im]})}return a})(),ui=new N$1("CdkDropListGroup"),ga=(()=>{class a{_items=new Set;disabled=false;ngOnDestroy(){this._items.clear();}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","cdkDropListGroup",""]],inputs:{disabled:[2,"cdkDropListGroupDisabled","disabled",YL]},exportAs:["cdkDropListGroup"],features:[iD([{provide:ui,useExisting:a}])]})}return a})(),_a=(()=>{class a{element=D(mr$1);_changeDetectorRef=D(QL);_scrollDispatcher=D(Y);_dir=D(Is,{optional:true});_group=D(ui,{optional:true,skipSelf:true});_latestSortedRefs;_destroyed=new te;_scrollableParentsResolved=false;static _dropLists=[];_dropListRef;connectedTo=[];data;orientation="vertical";id=D(nn).getId("cdk-drop-list-");lockAxis=null;get disabled(){return this._disabled||!!this._group&&this._group.disabled}set disabled(e){this._dropListRef.disabled=this._disabled=e;}_disabled=false;sortingDisabled=false;enterPredicate=()=>true;sortPredicate=()=>true;autoScrollDisabled=false;autoScrollStep;elementContainerSelector=null;hasAnchor=false;dropped=new $e$1;entered=new $e$1;exited=new $e$1;sorted=new $e$1;_unsortedItems=new Set;constructor(){let e=D(pa,{optional:true}),t=D(me);this._dropListRef=la(t,this.element),this._dropListRef.data=this,e&&this._assignDefaults(e),this._dropListRef.enterPredicate=(n,o)=>this.enterPredicate(n.data,o.data),this._dropListRef.sortPredicate=(n,o,r)=>this.sortPredicate(n,o.data,r.data),this._setupInputSyncSubscription(this._dropListRef),this._handleEvents(this._dropListRef),a._dropLists.push(this),this._group&&this._group._items.add(this);}addItem(e){this._unsortedItems.add(e),e._dragRef._withDropContainer(this._dropListRef),this._dropListRef.isDragging()&&this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef));}removeItem(e){if(this._unsortedItems.delete(e),this._latestSortedRefs){let t=this._latestSortedRefs.indexOf(e._dragRef);t>-1&&(this._latestSortedRefs.splice(t,1),this._syncItemsWithRef(this._latestSortedRefs));}}getSortedItems(){return Array.from(this._unsortedItems).sort((e,t)=>e._dragRef.getVisibleElement().compareDocumentPosition(t._dragRef.getVisibleElement())&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}ngOnDestroy(){let e=a._dropLists.indexOf(this);e>-1&&a._dropLists.splice(e,1),this._group&&this._group._items.delete(this),this._latestSortedRefs=void 0,this._unsortedItems.clear(),this._dropListRef.dispose(),this._destroyed.next(),this._destroyed.complete();}_setupInputSyncSubscription(e){this._dir&&this._dir.change.pipe(Qh(this._dir.value),Yh(this._destroyed)).subscribe(t=>e.withDirection(t)),e.beforeStarted.subscribe(()=>{let t=ot(this.connectedTo).map(n=>{if(typeof n=="string"){let o=a._dropLists.find(r=>r.id===n);return o}return n});if(this._group&&this._group._items.forEach(n=>{t.indexOf(n)===-1&&t.push(n);}),!this._scrollableParentsResolved){let n=this._scrollDispatcher.getAncestorScrollContainers(this.element).map(o=>o.getElementRef().nativeElement);this._dropListRef.withScrollableParents(n),this._scrollableParentsResolved=true;}if(this.elementContainerSelector){let n=this.element.nativeElement.querySelector(this.elementContainerSelector);e.withElementContainer(n);}e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.sortingDisabled=this.sortingDisabled,e.autoScrollDisabled=this.autoScrollDisabled,e.autoScrollStep=Xt(this.autoScrollStep,2),e.hasAnchor=this.hasAnchor,e.connectedTo(t.filter(n=>n&&n!==this).map(n=>n._dropListRef)).withOrientation(this.orientation);});}_handleEvents(e){e.beforeStarted.subscribe(()=>{this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef)),this._changeDetectorRef.markForCheck();}),e.entered.subscribe(t=>{this.entered.emit({container:this,item:t.item.data,currentIndex:t.currentIndex});}),e.exited.subscribe(t=>{this.exited.emit({container:this,item:t.item.data}),this._changeDetectorRef.markForCheck();}),e.sorted.subscribe(t=>{this.sorted.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,container:this,item:t.item.data});}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,item:t.item.data,isPointerOverContainer:t.isPointerOverContainer,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck();}),Rh(e.receivingStarted,e.receivingStopped).subscribe(()=>this._changeDetectorRef.markForCheck());}_assignDefaults(e){let{lockAxis:t,draggingDisabled:n,sortingDisabled:o,listAutoScrollDisabled:r,listOrientation:l}=e;this.disabled=n??false,this.sortingDisabled=o??false,this.autoScrollDisabled=r??false,this.orientation=l||"vertical",this.lockAxis=t||null;}_syncItemsWithRef(e){this._latestSortedRefs=e,this._dropListRef.withItems(e);}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","cdkDropList",""],["cdk-drop-list"]],hostAttrs:[1,"cdk-drop-list"],hostVars:7,hostBindings:function(t,n){t&2&&(ap("id",n.id),Cp("cdk-drop-list-disabled",n.disabled)("cdk-drop-list-dragging",n._dropListRef.isDragging())("cdk-drop-list-receiving",n._dropListRef.isReceiving()));},inputs:{connectedTo:[0,"cdkDropListConnectedTo","connectedTo"],data:[0,"cdkDropListData","data"],orientation:[0,"cdkDropListOrientation","orientation"],id:"id",lockAxis:[0,"cdkDropListLockAxis","lockAxis"],disabled:[2,"cdkDropListDisabled","disabled",YL],sortingDisabled:[2,"cdkDropListSortingDisabled","sortingDisabled",YL],enterPredicate:[0,"cdkDropListEnterPredicate","enterPredicate"],sortPredicate:[0,"cdkDropListSortPredicate","sortPredicate"],autoScrollDisabled:[2,"cdkDropListAutoScrollDisabled","autoScrollDisabled",YL],autoScrollStep:[0,"cdkDropListAutoScrollStep","autoScrollStep"],elementContainerSelector:[0,"cdkDropListElementContainer","elementContainerSelector"],hasAnchor:[2,"cdkDropListHasAnchor","hasAnchor",YL]},outputs:{dropped:"cdkDropListDropped",entered:"cdkDropListEntered",exited:"cdkDropListExited",sorted:"cdkDropListSorted"},exportAs:["cdkDropList"],features:[iD([{provide:ui,useValue:void 0},{provide:ma,useExisting:a}])]})}return a})();var fa=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl({providers:[Ka],imports:[vt]})}return a})();var io=["button"],no=["*"];function ao(a,i){if(a&1&&(ii(0,"div",2),lp(1,"mat-pseudo-checkbox",6),wc()),a&2){let e=vI();ky(),cp("disabled",e.disabled);}}var ba=new N$1("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:false,hideMultipleSelectionIndicator:false,disabledInteractive:false})}),va=new N$1("MatButtonToggleGroup"),oo={provide:Yt,useExisting:ao$1(()=>tt),multi:true},Gt=class{source;value;constructor(i,e){this.source=i,this.value=e;}},tt=(()=>{class a{_changeDetector=D(QL);_dir=D(Is,{optional:true});_multiple=false;_disabled=false;_disabledInteractive=false;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck();}_name=D(nn).getId("mat-button-toggle-group-");vertical=false;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(t=>t.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value);}valueChange=new $e$1;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck();}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck();}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck();}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new $e$1;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck();}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck();}_hideMultipleSelectionIndicator;constructor(){let e=D(ba,{optional:true});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??false,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??false;}ngOnInit(){this._selectionModel=new b(this.multiple,void 0,false);}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex();}writeValue(e){this.value=e,this._changeDetector.markForCheck();}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_keydown(e){if(this.multiple||this.disabled||Hr(e))return;let n=e.target.id,o=this._buttonToggles.toArray().findIndex(l=>l.buttonId===n),r=null;switch(e.keyCode){case 32:case 13:r=this._buttonToggles.get(o)||null;break;case 38:r=this._getNextButton(o,-1);break;case 37:r=this._getNextButton(o,this.dir==="ltr"?-1:1);break;case 40:r=this._getNextButton(o,1);break;case 39:r=this._getNextButton(o,this.dir==="ltr"?1:-1);break;default:return}r&&(e.preventDefault(),r._onButtonClick(),r.focus());}_emitChangeEvent(e){let t=new Gt(e,this.value);this._rawValue=t.value,this._controlValueAccessorChangeFn(t.value),this.change.emit(t);}_syncButtonToggle(e,t,n=false,o=false){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=false),this._selectionModel?t?this._selectionModel.select(e):this._selectionModel.deselect(e):o=true,o?Promise.resolve().then(()=>this._updateModelValue(e,n)):this._updateModelValue(e,n);}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?false:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(t=>e.value!=null&&t===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1;}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let t=this._buttonToggles.get(e);if(!t.disabled){t.tabIndex=0;break}}}_getNextButton(e,t){let n=this._buttonToggles;for(let o=1;o<=n.length;o++){let r=(e+t*o+n.length)%n.length,l=n.get(r);if(l&&!l.disabled)return l}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let t=this._buttonToggles.toArray();if(this.multiple&&e?(this._clearSelection(),e.forEach(n=>this._selectValue(n,t))):(this._clearSelection(),this._selectValue(e,t)),!this.multiple&&t.every(n=>n.tabIndex===-1)){for(let n of t)if(!n.disabled){n.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=false,this.multiple||(e.tabIndex=-1);});}_selectValue(e,t){for(let n of t)if(n.value===e){n.checked=true,this._selectionModel.select(n),this.multiple||(n.tabIndex=0);break}}_updateModelValue(e,t){t&&this._emitChangeEvent(e),this.valueChange.emit(this.value);}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck());}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,n,o){if(t&1&&vp(o,qe,5),t&2){let r;TI(r=bI())&&(n._buttonToggles=r);}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(t,n){t&1&&gp("keydown",function(r){return n._keydown(r)}),t&2&&(ap("role",n.multiple?"group":"radiogroup")("aria-disabled",n.disabled),Cp("mat-button-toggle-vertical",n.vertical)("mat-button-toggle-group-appearance-standard",n.appearance==="standard"));},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",YL],value:"value",multiple:[2,"multiple","multiple",YL],disabled:[2,"disabled","disabled",YL],disabledInteractive:[2,"disabledInteractive","disabledInteractive",YL],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",YL],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",YL]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[iD([oo,{provide:va,useExisting:a}])]})}return a})(),qe=(()=>{class a{_changeDetectorRef=D(QL);_elementRef=D(mr$1);_focusMonitor=D(Ir);_idGenerator=D(nn);_animationDisabled=ct();_checked=false;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return `${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e);}_tabIndex;disableRipple=false;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e;}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck());}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e;}_disabled=false;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e;}_disabledInteractive;change=new $e$1;constructor(){D(q).load(sh);let e=D(va,{optional:true}),t=D(new Up("tabindex"),{optional:true})||"",n=D(ba,{optional:true});this._tabIndex=Ft(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=n&&n.appearance?n.appearance:"standard",this._disabledInteractive=n?.disabledInteractive??false;}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=true:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked));}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,true);}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,false,false,true);}focus(e){this._buttonElement.nativeElement.focus(e);}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?true:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,true),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(n=>n.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0;}this.change.emit(new Gt(this,this.value));}_markForCheck(){this._changeDetectorRef.markForCheck();}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-button-toggle"]],viewQuery:function(t,n){if(t&1&&Ep(io,5),t&2){let o;TI(o=bI())&&(n._buttonElement=o.first);}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,n){t&1&&gp("focus",function(){return n.focus()}),t&2&&(ap("aria-label",null)("aria-labelledby",null)("id",n.id)("name",null),Cp("mat-button-toggle-standalone",!n.buttonToggleGroup)("mat-button-toggle-checked",n.checked)("mat-button-toggle-disabled",n.disabled)("mat-button-toggle-disabled-interactive",n.disabledInteractive)("mat-button-toggle-appearance-standard",n.appearance==="standard"));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",YL],appearance:"appearance",checked:[2,"checked","checked",YL],disabled:[2,"disabled","disabled",YL],disabledInteractive:[2,"disabledInteractive","disabledInteractive",YL]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:no,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,n){if(t&1&&(II(),ii(0,"button",1,0),gp("click",function(){return n._onButtonClick()}),iI(2,ao,2,1,"div",2),ii(3,"span",3),DI(4),wc()(),lp(5,"span",4)(6,"span",5)),t&2){let o=_I(1);cp("id",n.buttonId)("disabled",n.disabled&&!n.disabledInteractive||null),ap("role",n.isSingleSelector()?"radio":"button")("tabindex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("aria-pressed",n.isSingleSelector()?null:n.checked)("aria-checked",n.isSingleSelector()?n.checked:null)("name",n._getButtonName())("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),ky(2),sI(n.buttonToggleGroup&&(!n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideSingleSelectionIndicator||n.buttonToggleGroup.multiple&&!n.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ky(4),cp("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled);}},dependencies:[nh,J],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return a})(),qt=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl({imports:[gh,qe,qr]})}return a})();var ro=["input"],so=["label"],co=["*"],vi={color:"accent",clickAction:"check-indeterminate",disabledInteractive:false},lo=new N$1("mat-checkbox-default-options",{providedIn:"root",factory:()=>vi}),U=(function(a){return a[a.Init=0]="Init",a[a.Checked=1]="Checked",a[a.Unchecked=2]="Unchecked",a[a.Indeterminate=3]="Indeterminate",a})(U||{}),yi=class{source;checked},xi=(()=>{class a{_elementRef=D(mr$1);_changeDetectorRef=D(QL);_ngZone=D(Se);_animationsDisabled=ct();_options=D(lo,{optional:true});focus(){this._inputElement.nativeElement.focus();}_createChangeEvent(e){let t=new yi;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return `${this.id||this._uniqueId}-input`}required=false;labelPosition="after";name=null;change=new $e$1;indeterminateChange=new $e$1;value;disableRipple=false;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=U.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){D(q).load(sh);let e=D(new Up("tabindex"),{optional:true});this._options=this._options||vi,this.color=this._options.color||vi.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=D(nn).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??false;}ngOnChanges(e){e.required&&this._validatorChangeFn();}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate);}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck());}_checked=false;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck());}_disabled=false;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(U.Indeterminate):this._transitionCheckState(this.checked?U.Checked:U.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e);}_indeterminate=Ft(false);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges();}writeValue(e){this.checked=!!e;}registerOnChange(e){this._controlValueAccessorChangeFn=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorChangeFn=e;}_transitionCheckState(e){let t=this._currentCheckState,n=this._getAnimationTargetElement();if(!(t===e||!n)&&(this._currentAnimationClass&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(o);},1e3);});}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked);}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked);}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(false),this.indeterminateChange.emit(false);}),this._checked=!this._checked,this._transitionCheckState(this._checked?U.Checked:U.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate);}_onInteractionEvent(e){e.stopPropagation();}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck();});}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return "";switch(e){case U.Init:if(t===U.Checked)return this._animationClasses.uncheckedToChecked;if(t==U.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case U.Unchecked:return t===U.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case U.Checked:return t===U.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case U.Indeterminate:return t===U.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return ""}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e);}_onInputClick(){this._handleInputClick();}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus();}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation();}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-checkbox"]],viewQuery:function(t,n){if(t&1&&Ep(ro,5)(so,5),t&2){let o;TI(o=bI())&&(n._inputElement=o.first),TI(o=bI())&&(n._labelElement=o.first);}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(t,n){t&2&&(pp("id",n.id),ap("tabindex",null)("aria-label",null)("aria-labelledby",null),FI(n.color?"mat-"+n.color:"mat-accent"),Cp("_mat-animation-noopable",n._animationsDisabled)("mdc-checkbox--disabled",n.disabled)("mat-mdc-checkbox-disabled",n.disabled)("mat-mdc-checkbox-checked",n.checked)("mat-mdc-checkbox-disabled-interactive",n.disabledInteractive));},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",YL],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",YL],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",YL],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:KL(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",YL],checked:[2,"checked","checked",YL],disabled:[2,"disabled","disabled",YL],indeterminate:[2,"indeterminate","indeterminate",YL]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[iD([{provide:Yt,useExisting:ao$1(()=>a),multi:true},{provide:st,useExisting:a,multi:true}]),im],ngContentSelectors:co,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(t,n){if(t&1&&(II(),ii(0,"div",3),gp("click",function(r){return n._preventBubblingFromLabel(r)}),ii(1,"div",4,0)(3,"div",5),gp("click",function(){return n._onTouchTargetClick()}),wc(),ii(4,"input",6,1),gp("blur",function(){return n._onBlur()})("click",function(){return n._onInputClick()})("change",function(r){return n._onInteractionEvent(r)}),wc(),lp(6,"div",7),ii(7,"div",8),lu(),ii(8,"svg",9),lp(9,"path",10),wc(),uu(),lp(10,"div",11),wc(),lp(11,"div",12),wc(),ii(12,"label",13,2),DI(14),wc()()),t&2){let o=_I(2);cp("labelPosition",n.labelPosition),ky(4),Cp("mdc-checkbox--selected",n.checked),cp("checked",n.checked)("indeterminate",n.indeterminate)("disabled",n.disabled&&!n.disabledInteractive)("id",n.inputId)("required",n.required)("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex),ap("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby)("aria-describedby",n.ariaDescribedby)("aria-checked",n.indeterminate?"mixed":null)("aria-controls",n.ariaControls)("aria-disabled",n.disabled&&n.disabledInteractive?true:null)("aria-expanded",n.ariaExpanded)("aria-owns",n.ariaOwns)("name",n.name)("value",n.value),ky(7),cp("matRippleTrigger",o)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",true),ky(),cp("for",n.inputId);}},dependencies:[nh,m$1],styles:[`.mdc-checkbox {
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
`],encapsulation:2})}return a})(),xa=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl({imports:[xi,qr]})}return a})();var po=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],mo=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function uo(a,i){a&1&&(ii(0,"span",3),DI(1,1),wc());}function go(a,i){a&1&&(ii(0,"span",6),DI(1,2),wc());}var _o=["*"];var fo=new N$1("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),ka=new N$1("MatChipAvatar"),Ca=new N$1("MatChipTrailingIcon"),wa=new N$1("MatChipEdit"),ki=new N$1("MatChipRemove"),Sa=new N$1("MatChip"),Da=(()=>{class a{_elementRef=D(mr$1);_parentChip=D(Sa);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(e){this._disabled=e;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){D(q).load(sh),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(t,n){t&2&&(ap("disabled",n._getDisabledAttribute())("aria-disabled",n.disabled),Cp("mdc-evolution-chip__action--primary",n._isPrimary)("mdc-evolution-chip__action--secondary",!n._isPrimary)("mdc-evolution-chip__action--trailing",!n._isPrimary&&!n._isLeading));},inputs:{disabled:[2,"disabled","disabled",YL],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:KL(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return a})(),Ma=(()=>{class a extends Da{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(a)))(n||a)}})();static \u0275dir=VE({type:a,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(t,n){t&1&&gp("click",function(r){return n._handleClick(r)})("keydown",function(r){return n._handleKeydown(r)}),t&2&&(ap("tabindex",n._getTabindex()),Cp("mdc-evolution-chip__action--presentational",false));},features:[Xf]})}return a})();var Ia=(()=>{class a extends Ma{_isPrimary=false;_handleClick(e){this.disabled||(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&(e.stopPropagation(),e.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(a)))(n||a)}})();static \u0275dir=VE({type:a,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(t,n){t&2&&ap("aria-hidden",null);},features:[iD([{provide:ki,useExisting:a}]),Xf]})}return a})(),Ci=(()=>{class a{_changeDetectorRef=D(QL);_elementRef=D(mr$1);_tagName=D(BL);_ngZone=D(Se);_focusMonitor=D(Ir);_globalRippleOptions=D(cn,{optional:true});_document=D(tr$1);_onFocus=new te;_onBlur=new te;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=ct();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=D(nn).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e;}_disabled=false;removed=new $e$1;destroyed=new $e$1;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=D(bh);_injector=D(me);constructor(){let e=D(q);e.load(sh),e.load(ht),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Rh(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(e){return this._getActions().find(t=>{let n=t._elementRef.nativeElement;return n===e||n.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{let t=e!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,n,o){if(t&1&&vp(o,ka,5)(o,wa,5)(o,Ca,5)(o,ki,5)(o,ka,5)(o,Ca,5)(o,wa,5)(o,ki,5),t&2){let r;TI(r=bI())&&(n.leadingIcon=r.first),TI(r=bI())&&(n.editIcon=r.first),TI(r=bI())&&(n.trailingIcon=r.first),TI(r=bI())&&(n.removeIcon=r.first),TI(r=bI())&&(n._allLeadingIcons=r),TI(r=bI())&&(n._allTrailingIcons=r),TI(r=bI())&&(n._allEditIcons=r),TI(r=bI())&&(n._allRemoveIcons=r);}},viewQuery:function(t,n){if(t&1&&Ep(Ma,5),t&2){let o;TI(o=bI())&&(n.primaryAction=o.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(t,n){t&1&&gp("keydown",function(r){return n._handleKeydown(r)}),t&2&&(pp("id",n.id),ap("role",n.role)("aria-label",n.ariaLabel),FI("mat-"+(n.color||"primary")),Cp("mdc-evolution-chip",!n._isBasicChip)("mdc-evolution-chip--disabled",n.disabled)("mdc-evolution-chip--with-trailing-action",n._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",n.leadingIcon)("mdc-evolution-chip--with-primary-icon",n.leadingIcon)("mdc-evolution-chip--with-avatar",n.leadingIcon)("mat-mdc-chip-with-avatar",n.leadingIcon)("mat-mdc-chip-highlighted",n.highlighted)("mat-mdc-chip-disabled",n.disabled)("mat-mdc-basic-chip",n._isBasicChip)("mat-mdc-standard-chip",!n._isBasicChip)("mat-mdc-chip-with-trailing-icon",n._hasTrailingIcon())("_mat-animation-noopable",n._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",YL],highlighted:[2,"highlighted","highlighted",YL],disableRipple:[2,"disableRipple","disableRipple",YL],disabled:[2,"disabled","disabled",YL]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[iD([{provide:Sa,useExisting:a}])],ngContentSelectors:mo,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(t,n){t&1&&(II(po),lp(0,"span",0),ii(1,"span",1)(2,"span",2),iI(3,uo,2,0,"span",3),ii(4,"span",4),DI(5),lp(6,"span",5),wc()()(),iI(7,go,2,0,"span",6)),t&2&&(ky(3),sI(n.leadingIcon?3:-1),ky(4),sI(n._hasTrailingIcon()?7:-1));},dependencies:[Da],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return a})();var Ea=(()=>{class a{_elementRef=D(mr$1);_changeDetectorRef=D(QL);_dir=D(Is,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new te;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Wo$1;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e);}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e));}_getChipStream(e){return this._chips.changes.pipe(Qh(null),Zh(()=>Rh(...this._chips.map(e))))}_originatesFromChip(e){let t=e.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-mdc-chip"))return  true;t=t.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Qh(this._chips)).subscribe(e=>{let t=[];e.forEach(n=>n._getActions().forEach(o=>t.push(o))),this._chipActions.reset(t),this._chipActions.notifyOnChanges();}),this._keyManager=new en(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(Yh(this._destroyed)).subscribe(({chip:e})=>{let t=e._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t);}),this._dir?.change.pipe(Yh(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e));}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Qh(null),Yh(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Yh(this._destroyed)).subscribe(e=>{let n=this._chips.toArray().indexOf(e.chip),o=e.chip._hasFocus(),r=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),l=o||r;this._isValidIndex(n)&&l&&(this._lastDestroyedFocusedChipIndex=n);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[e];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-chip-set"]],contentQueries:function(t,n,o){if(t&1&&vp(o,Ci,5),t&2){let r;TI(r=bI())&&(n._chips=r);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(t,n){t&1&&gp("keydown",function(r){return n._handleKeydown(r)}),t&2&&ap("role",n.role);},inputs:{disabled:[2,"disabled","disabled",YL],role:"role",tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:KL(e)]},ngContentSelectors:_o,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,n){t&1&&(II(),Tc(0,"div",0),DI(1),bc());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return a})();var Pa=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl({providers:[Ou,{provide:fo,useValue:{separatorKeyCodes:[13]}}],imports:[gh,qr]})}return a})();var Co=(a,i)=>i.codigo,wo=(a,i)=>i.id;function So(a,i){if(a&1&&(ii(0,"mat-option",21),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function Do(a,i){if(a&1){let e=mI();ii(0,"mat-form-field",7)(1,"mat-label"),QI(2,"Responsable"),wc(),ii(3,"mat-select",16),gp("selectionChange",function(n){Yl(e);let o=vI();return Kl(o.assignee.set(n.value))})("closed",function(){Yl(e);let n=vI();return Kl(n.buscarResp.set(""))}),ii(4,"div",17),gp("click",function(n){return n.stopPropagation()}),ii(5,"mat-icon",18),QI(6,"search"),wc(),ii(7,"input",26),gp("ngModelChange",function(n){Yl(e);let o=vI();return Kl(o.buscarResp.set(n))})("keydown",function(n){return n.stopPropagation()}),wc(),Wv(),wc(),ii(8,"mat-option",20),QI(9,"\u2014 Sin asignar \u2014"),wc(),lI(10,So,2,2,"mat-option",21,wo),wc()();}if(a&2){let e=vI();ky(3),cp("value",e.assignee()),ky(4),cp("ngModel",e.buscarResp()),zv(),ky(3),uI(e.usuariosF());}}function Mo(a,i){if(a&1&&(ii(0,"div",15)(1,"mat-icon"),QI(2,"person"),wc(),QI(3," Responsable: "),ii(4,"strong"),QI(5),wc(),QI(6," (t\xFA)"),wc()),a&2){let e=vI();ky(5),Ap(e.nombreYo());}}function Io(a,i){if(a&1&&(ii(0,"mat-option",21),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.codigo),ky(),Ap(e.nombre);}}function Eo(a,i){if(a&1){let e=mI();ii(0,"button",27),gp("click",function(){Yl(e);let n=vI();return Kl(n.eliminar())}),ii(1,"mat-icon"),QI(2,"delete"),wc(),QI(3," Eliminar"),wc();}}var it=class a{data=D(N);hd=D(K);perfil=D(f);auth=D(Yp);ref=D(O);snack=D(Qt);dlg=D($e);story=this.dlg.story;isNew=!this.story;puedeAsignarAOtros=G$1(()=>this.auth.esResponsableEquipo()||this.auth.esAdminPlataforma());subtipo=Ft(this.story?.subtipo||"CAPACITACION");tema=Ft(this.story?.tema||this.story?.title||"");link=Ft(this.story?.link||"");assignee=Ft("");clientId=Ft(this.story?.client||"");inicioFecha=Ft(null);inicioHora=Ft("09:00");finFecha=Ft(null);finHora=Ft("10:00");buscarResp=Ft("");buscarCli=Ft("");usuariosF=G$1(()=>{let i=this.buscarResp().trim().toLowerCase(),e=this.hd.hdUsers();return i?e.filter(t=>t.name.toLowerCase().includes(i)):e});clientesF=G$1(()=>{let i=this.buscarCli().trim().toLowerCase(),e=this.perfil.misClientes();return i?e.filter(t=>t.nombre.toLowerCase().includes(i)):e});constructor(){this.perfil.cargarMiPerfil();let i=this.parseDT(this.story?.inicio);i&&(this.inicioFecha.set(i.fecha),this.inicioHora.set(i.hora));let e=this.parseDT(this.story?.fin);e&&(this.finFecha.set(e.fecha),this.finHora.set(e.hora)),this.story?this.assignee.set(this.story.assignee||""):this.puedeAsignarAOtros()||this.assignee.set(this.auth.session()?.id||"");}nombreYo(){return this.auth.session()?.name||"Yo"}guardar(){let i=this.tema().trim();if(!i){this.snack.open("El tema es obligatorio.","OK",{duration:3e3});return}let e=this.combinar(this.inicioFecha(),this.inicioHora());if(!e){this.snack.open("La fecha y hora de inicio es obligatoria.","OK",{duration:3e3});return}let t=this.combinar(this.finFecha(),this.finHora());if(t&&t<e){this.snack.open("El fin no puede ser anterior al inicio.","OK",{duration:3500});return}let n=this.puedeAsignarAOtros()?this.assignee()||null:this.auth.session()?.id||null,o=this.clientId(),r=this.perfil.misClientes().find(u=>u.codigo===o),l={title:i,tipo:"REUNION",subtipo:this.subtipo(),tema:i,link:this.link().trim(),inicio:e,fin:t,assignee:n,client:o||null,clientName:r?.nombre||""};this.isNew?this.data.addStory($(B({},l),{status:"todo",priority:"media"})):this.data.updateStoryReunion(this.story.id,l),this.ref.close(true);}eliminar(){this.story&&(this.data.deleteStory(this.story.id),this.ref.close(true));}cerrar(){this.ref.close();}parseDT(i){if(!i)return null;let[e,t]=i.split("T"),[n,o,r]=(e||"").split("-").map(Number);return !n||!o||!r?null:{fecha:new Date(n,o-1,r),hora:(t||"09:00").slice(0,5)}}combinar(i,e){if(!i)return "";let t=n=>String(n).padStart(2,"0");return `${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}T${e||"00:00"}`}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-reunion-dialog"]],decls:69,vars:16,consts:[["dpI",""],["dpF",""],["mat-dialog-title",""],[1,"rn-form"],["hideSingleSelectionIndicator","","aria-label","Tipo de reuni\xF3n",1,"rn-subtipo",3,"change","value"],["value","CAPACITACION"],["value","PRESENTACION"],["appearance","outline","subscriptSizing","dynamic"],["matInput","","placeholder","Tema de la reuni\xF3n","maxlength","300",3,"ngModelChange","ngModel"],["matPrefix",""],["matInput","","placeholder","https://meet\u2026",3,"ngModelChange","ngModel"],[1,"rn-2col"],["matInput","","readonly","",3,"ngModelChange","click","matDatepicker","ngModel"],["matSuffix","",3,"for"],["matInput","","type","time",3,"ngModelChange","ngModel"],[1,"rn-self"],[3,"selectionChange","closed","value"],[1,"sel-search",3,"click"],[1,"sel-search-icon"],["matInput","","placeholder","Buscar cliente\u2026",3,"ngModelChange","keydown","ngModel"],["value",""],[3,"value"],["mat-button","","color","warn"],[1,"rn-spacer"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click"],["matInput","","placeholder","Buscar consultor\u2026",3,"ngModelChange","keydown","ngModel"],["mat-button","","color","warn",3,"click"]],template:function(e,t){if(e&1){let n=mI();ii(0,"h2",2)(1,"mat-icon"),QI(2,"groups"),wc(),QI(3),wc(),ii(4,"mat-dialog-content",3)(5,"mat-button-toggle-group",4),gp("change",function(r){return t.subtipo.set(r.value)}),ii(6,"mat-button-toggle",5)(7,"mat-icon"),QI(8,"school"),wc(),QI(9," Capacitaci\xF3n"),wc(),ii(10,"mat-button-toggle",6)(11,"mat-icon"),QI(12,"co_present"),wc(),QI(13," Presentaci\xF3n"),wc()(),ii(14,"mat-form-field",7)(15,"mat-label"),QI(16,"Tema"),wc(),ii(17,"input",8),gp("ngModelChange",function(r){return t.tema.set(r)}),wc(),Wv(),wc(),ii(18,"mat-form-field",7)(19,"mat-label"),QI(20,"Link (opcional)"),wc(),ii(21,"mat-icon",9),QI(22,"link"),wc(),ii(23,"input",10),gp("ngModelChange",function(r){return t.link.set(r)}),wc(),Wv(),wc(),ii(24,"div",11)(25,"mat-form-field",7)(26,"mat-label"),QI(27,"Fecha inicio"),wc(),ii(28,"input",12),gp("ngModelChange",function(r){return t.inicioFecha.set(r)})("click",function(){Yl(n);let r=_I(31);return Kl(r.open())}),wc(),Wv(),lp(29,"mat-datepicker-toggle",13)(30,"mat-datepicker",null,0),wc(),ii(32,"mat-form-field",7)(33,"mat-label"),QI(34,"Hora inicio"),wc(),ii(35,"input",14),gp("ngModelChange",function(r){return t.inicioHora.set(r)}),wc(),Wv(),wc()(),ii(36,"div",11)(37,"mat-form-field",7)(38,"mat-label"),QI(39,"Fecha fin"),wc(),ii(40,"input",12),gp("ngModelChange",function(r){return t.finFecha.set(r)})("click",function(){Yl(n);let r=_I(43);return Kl(r.open())}),wc(),Wv(),lp(41,"mat-datepicker-toggle",13)(42,"mat-datepicker",null,1),wc(),ii(44,"mat-form-field",7)(45,"mat-label"),QI(46,"Hora fin"),wc(),ii(47,"input",14),gp("ngModelChange",function(r){return t.finHora.set(r)}),wc(),Wv(),wc()(),iI(48,Do,12,2,"mat-form-field",7)(49,Mo,7,1,"div",15),ii(50,"mat-form-field",7)(51,"mat-label"),QI(52,"Cliente (opcional)"),wc(),ii(53,"mat-select",16),gp("selectionChange",function(r){return t.clientId.set(r.value)})("closed",function(){return t.buscarCli.set("")}),ii(54,"div",17),gp("click",function(r){return r.stopPropagation()}),ii(55,"mat-icon",18),QI(56,"search"),wc(),ii(57,"input",19),gp("ngModelChange",function(r){return t.buscarCli.set(r)})("keydown",function(r){return r.stopPropagation()}),wc(),Wv(),wc(),ii(58,"mat-option",20),QI(59,"\u2014 Sin cliente \u2014"),wc(),lI(60,Io,2,2,"mat-option",21,Co),wc()()(),ii(62,"mat-dialog-actions"),iI(63,Eo,4,0,"button",22),lp(64,"span",23),ii(65,"button",24),gp("click",function(){return t.cerrar()}),QI(66,"Cancelar"),wc(),ii(67,"button",25),gp("click",function(){return t.guardar()}),QI(68,"Guardar"),wc()();}if(e&2){let n=_I(31),o=_I(43);ky(3),Mc(" ",t.isNew?"Nueva reuni\xF3n":"Editar reuni\xF3n",`
`),ky(2),cp("value",t.subtipo()),ky(12),cp("ngModel",t.tema()),zv(),ky(6),cp("ngModel",t.link()),zv(),ky(5),cp("matDatepicker",n)("ngModel",t.inicioFecha()),zv(),ky(),cp("for",n),ky(6),cp("ngModel",t.inicioHora()),zv(),ky(5),cp("matDatepicker",o)("ngModel",t.finFecha()),zv(),ky(),cp("for",o),ky(6),cp("ngModel",t.finHora()),zv(),ky(),sI(t.puedeAsignarAOtros()?48:49),ky(5),cp("value",t.clientId()),ky(4),cp("ngModel",t.buscarCli()),zv(),ky(3),uI(t.clientesF()),ky(3),sI(t.isNew?-1:63);}},dependencies:[Ko$1,an,Zo$1,vi$2,Ni,Ht$2,Nt,zt$3,Vt$1,fe,jn$1,de,_o$1,yo,Ar,Fr,Bt,Wt$1,W,ba$1,ha$1,qt,tt,qe,yt,wt,Al,wl,Xa,Er],styles:["h2[mat-dialog-title][_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}h2[mat-dialog-title][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--mat-sys-primary, #048abf)}.rn-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;padding-top:6px}.rn-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.rn-subtipo[_ngcontent-%COMP%]{align-self:flex-start}.rn-subtipo[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:4px}.rn-2col[_ngcontent-%COMP%]{display:flex;gap:10px}.rn-2col[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1}@media(max-width:480px){.rn-2col[_ngcontent-%COMP%]{flex-direction:column;gap:10px}}.rn-self[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:14px;color:var(--mat-sys-on-surface);padding:2px}.rn-self[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:20px;width:20px;height:20px}.rn-spacer[_ngcontent-%COMP%]{flex:1 1 auto}"]})};function To(a,i){if(a&1&&(ii(0,"mat-option",16),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e),ky(),Ap(e);}}function Ro(a,i){if(a&1){let e=mI();ii(0,"mat-form-field",8)(1,"mat-label"),QI(2,"Estado"),wc(),ii(3,"mat-select",15),Pp("ngModelChange",function(n){Yl(e);let o=vI();return XI(o.status,n)||(o.status=n),Kl(n)}),lI(4,To,2,2,"mat-option",16,cI),wc(),Wv(),wc();}if(a&2){let e=vI();ky(3),Op("ngModel",e.status),zv(),ky(),uI(e.STATUSES);}}function Oo(a,i){if(a&1){let e=mI();ii(0,"button",17),gp("click",function(){Yl(e);let n=vI();return Kl(n.remove())}),QI(1,"Borrar"),wc(),lp(2,"span",18);}if(a&2){let e=vI();cp("disabled",e.esUnico)("matTooltip",e.esUnico?"No se puede borrar el \xFAnico sprint":"");}}var nt=class a{data=D(N);dialog=D(ee);snack=D(Qt);ref=D(O);input=D($e);sprint=this.input.sprint;isNew=!this.sprint;STATUSES=["active","completed","planned"];esUnico=this.data.getSprints().sprints.length<=1;name=this.sprint?.name??"";goal=this.sprint?.goal??"";capacity=this.sprint?.capacity??0;status=this.sprint?.status??"active";startModel=this.sprint?.start?new Date(this.sprint.start+"T00:00:00"):null;endModel=this.sprint?.end?new Date(this.sprint.end+"T00:00:00"):null;toIso(i){if(!i)return "";let e=t=>String(t).padStart(2,"0");return `${i.getFullYear()}-${e(i.getMonth()+1)}-${e(i.getDate())}`}save(){let i=this.name.trim();if(!i){this.snack.open("El nombre del sprint no puede quedar vac\xEDo.","OK",{duration:3e3});return}let e={name:i,goal:this.goal.trim(),start:this.toIso(this.startModel),end:this.toIso(this.endModel),capacity:Number(this.capacity)||0};this.isNew?(this.data.addSprint(e),this.snack.open("Sprint creado. El anterior se cerr\xF3 y las tareas no aprobadas migraron.","OK",{duration:4e3})):this.data.updateSprint(this.sprint.id,$(B({},e),{status:this.status})),this.ref.close(true);}async remove(){if(!this.sprint||this.esUnico)return;await ih(this.dialog.open(zt$1,{data:{title:"Borrar sprint",message:`Vas a borrar "${this.sprint.name}".

Las tareas del sprint NO se eliminan.`,confirmText:"Borrar",danger:true}}).afterClosed())&&(this.data.deleteSprint(this.sprint.id),this.ref.close(true));}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-sprint-dialog"]],decls:38,vars:13,consts:[["startP",""],["endP",""],["mat-dialog-title",""],[1,"sprint-form"],["appearance","outline",1,"full"],["matInput","","placeholder","Sprint 3",3,"ngModelChange","ngModel"],["matInput","","rows","2","placeholder","Objetivo del sprint",3,"ngModelChange","ngModel"],[1,"row"],["appearance","outline",1,"grow"],["matInput","",3,"ngModelChange","matDatepicker","ngModel"],["matIconSuffix","",3,"for"],["matInput","","type","number","min","0",3,"ngModelChange","ngModel"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"],[3,"ngModelChange","ngModel"],[3,"value"],["mat-button","",1,"danger",3,"click","disabled","matTooltip"],[1,"spacer"]],template:function(e,t){if(e&1){let n=mI();ii(0,"h2",2),QI(1),wc(),ii(2,"mat-dialog-content",3)(3,"mat-form-field",4)(4,"mat-label"),QI(5,"Nombre"),wc(),ii(6,"input",5),Pp("ngModelChange",function(r){return Yl(n),XI(t.name,r)||(t.name=r),Kl(r)}),wc(),Wv(),wc(),ii(7,"mat-form-field",4)(8,"mat-label"),QI(9,"Objetivo"),wc(),ii(10,"textarea",6),Pp("ngModelChange",function(r){return Yl(n),XI(t.goal,r)||(t.goal=r),Kl(r)}),wc(),Wv(),wc(),ii(11,"div",7)(12,"mat-form-field",8)(13,"mat-label"),QI(14,"Inicio"),wc(),ii(15,"input",9),Pp("ngModelChange",function(r){return Yl(n),XI(t.startModel,r)||(t.startModel=r),Kl(r)}),wc(),Wv(),lp(16,"mat-datepicker-toggle",10)(17,"mat-datepicker",null,0),wc(),ii(19,"mat-form-field",8)(20,"mat-label"),QI(21,"Fin"),wc(),ii(22,"input",9),Pp("ngModelChange",function(r){return Yl(n),XI(t.endModel,r)||(t.endModel=r),Kl(r)}),wc(),Wv(),lp(23,"mat-datepicker-toggle",10)(24,"mat-datepicker",null,1),wc()(),ii(26,"div",7)(27,"mat-form-field",8)(28,"mat-label"),QI(29,"Capacidad (pts)"),wc(),ii(30,"input",11),Pp("ngModelChange",function(r){return Yl(n),XI(t.capacity,r)||(t.capacity=r),Kl(r)}),wc(),Wv(),wc(),iI(31,Ro,6,1,"mat-form-field",8),wc()(),ii(32,"mat-dialog-actions",12),iI(33,Oo,3,2),ii(34,"button",13),QI(35,"Cancelar"),wc(),ii(36,"button",14),gp("click",function(){return t.save()}),QI(37),wc()();}if(e&2){let n=_I(18),o=_I(25);ky(),Ap(t.isNew?"Nuevo sprint":"Editar "+t.sprint.id),ky(5),Op("ngModel",t.name),zv(),ky(4),Op("ngModel",t.goal),zv(),ky(5),cp("matDatepicker",n),Op("ngModel",t.startModel),zv(),ky(),cp("for",n),ky(6),cp("matDatepicker",o),Op("ngModel",t.endModel),zv(),ky(),cp("for",o),ky(7),Op("ngModel",t.capacity),zv(),ky(),sI(t.isNew?-1:31),ky(2),sI(t.isNew?-1:33),ky(4),Ap(t.isNew?"Crear":"Guardar");}},dependencies:[Ko$1,an,Ti,Zo$1,hi$1,Ni,Ht$2,jt,Nt,zt$3,Vt$1,ba$1,ha$1,fe,jn$1,de,yo,Ar,Fr,Bt,Wt$1,W,Al,wl,Xa,Er,zt$2,mt],styles:[".sprint-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:8px;min-width:420px}.full[_ngcontent-%COMP%]{width:100%}.row[_ngcontent-%COMP%]{display:flex;gap:12px}.row[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%], .spacer[_ngcontent-%COMP%]{flex:1}.danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}@media(max-width:520px){.sprint-form[_ngcontent-%COMP%]{min-width:0}.row[_ngcontent-%COMP%]{flex-direction:column;gap:0}}"]})};var Fo=["filtersTpl"],Ut=(a,i)=>i.id,Na=(a,i)=>i.status,Ao=(a,i)=>i.codigo;function Bo(a,i){if(a&1&&(ii(0,"mat-option",8),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.codigo),ky(),Ap(e.equipo||e.nombre);}}function No(a,i){if(a&1){let e=mI();ii(0,"mat-form-field",6)(1,"mat-label"),QI(2,"Equipo / Tablero"),wc(),ii(3,"mat-select",7),gp("selectionChange",function(n){Yl(e);let o=vI();return Kl(o.switchBoard(n.value))}),lI(4,Bo,2,2,"mat-option",8,Ao),wc()();}if(a&2){let e=vI();ky(3),cp("value",e.currentBoard()),ky(),uI(e.boards());}}function Lo(a,i){if(a&1&&(ii(0,"mat-option",8),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.id),ky(),kp("",e.name,"",e.status==="completed"?" \u2713":"");}}function Vo(a,i){if(a&1&&(ii(0,"span",20),QI(1),wc()),a&2){let e=vI();ky(),Mc("\u2014 ",e.goal);}}function zo(a,i){if(a&1&&(ii(0,"span",24),QI(1),wc(),ii(2,"span",21),QI(3,"\xB7"),wc()),a&2){let e=vI(),t=vI();ky(),kp("",t.fmtSprintDate(e.start)," \u2192 ",t.fmtSprintDate(e.end));}}function Ho(a,i){if(a&1&&(ii(0,"div",11)(1,"span",19),QI(2),wc(),iI(3,Vo,2,1,"span",20),ii(4,"span",21),QI(5,"\xB7"),wc(),iI(6,zo,4,2),ii(7,"span",22),QI(8),wc(),ii(9,"span",23),QI(10),wc()()),a&2){let e=i;ky(2),Ap(e.name),ky(),sI(e.goal?3:-1),ky(3),sI(e.start||e.end?6:-1),ky(2),Mc("",e.capacity," pts"),ky(),FI("st-"+e.status),ky(),Ap(e.status);}}function Go(a,i){if(a&1){let e=mI();ii(0,"button",25),gp("click",function(){Yl(e);let n=vI();return Kl(n.clearBoard())}),ii(1,"mat-icon"),QI(2,"delete_sweep"),wc(),QI(3," Borrar Board "),wc();}}function qo(a,i){a&1&&(ii(0,"mat-hint"),QI(1,"Buscando en el HelpDesk\u2026"),wc());}function Uo(a,i){a&1&&(ii(0,"mat-hint"),QI(1,"Presiona Enter para buscar por palabra"),wc());}function Wo(a,i){if(a&1&&(ii(0,"mat-button-toggle",8),QI(1),wc()),a&2){let e=i.$implicit,t=vI(2);cp("value",e),ky(),Ap(e==="all"?"Todas":t.PRIORITY_FILTER_LABELS[e]);}}function jo(a,i){if(a&1){let e=mI();ii(0,"button",37),gp("click",function(){Yl(e);let n=vI(2);return Kl(n.toggleTeam())}),ii(1,"mat-icon"),QI(2,"groups"),wc(),QI(3," Mi equipo "),wc();}if(a&2){let e=vI(2);Cp("active",e.teamOnly()),ap("aria-pressed",e.teamOnly());}}function $o(a,i){if(a&1&&(ii(0,"mat-option",8),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function Qo(a,i){a&1&&(ii(0,"mat-option",46),QI(1,"Sin coincidencias"),wc());}function Ko(a,i){if(a&1){let e=mI();ii(0,"mat-chip",49),gp("removed",function(){let n=Yl(e).$implicit,o=vI(4);return Kl(o.removeAssignee(n))}),QI(1),ii(2,"button",50)(3,"mat-icon"),QI(4,"close"),wc()()();}if(a&2){let e=i.$implicit,t=vI(4),n=t.resolveMember(e);bp("background",t.pastel(n?.color||"#9aa0a6")),cp("matTooltip",n?.name||"\u2014"),ky(),Mc(" ",t.shortName(n?.name||"\u2014")," "),ky(),ap("aria-label","Quitar "+(n?.name||"\u2014"));}}function Zo(a,i){if(a&1&&(ii(0,"mat-chip-set",47),lI(1,Ko,5,5,"mat-chip",48,cI),wc()),a&2){let e=vI(3);ky(),uI(e.selectedAssignees());}}function Yo(a,i){if(a&1){let e=mI();ii(0,"div",34)(1,"span",38),QI(2,"Asignado a:"),wc(),ii(3,"mat-form-field",39)(4,"mat-label"),QI(5,"Consultores"),wc(),ii(6,"mat-select",40,2),gp("selectionChange",function(n){Yl(e);let o=vI(2);return Kl(o.onAssigneeSelectChange(n.value))})("closed",function(){Yl(e);let n=vI(2);return Kl(n.buscarAsignado.set(""))}),ii(8,"div",41),gp("click",function(n){return n.stopPropagation()}),ii(9,"div",42)(10,"mat-icon"),QI(11,"search"),wc(),ii(12,"input",43),gp("input",function(n){Yl(e);let o=vI(2);return Kl(o.buscarAsignado.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),wc(),ii(13,"button",44),gp("click",function(){Yl(e);let n=_I(7);return Kl(n.close())}),ii(14,"mat-icon"),QI(15,"close"),wc(),QI(16,"Cerrar"),wc()(),ii(17,"button",45),gp("click",function(n){return Yl(e),vI(2).toggleAllAssignees(),Kl(n.stopPropagation())}),QI(18),wc()(),lI(19,$o,2,2,"mat-option",8,Ut,false,Qo,2,0,"mat-option",46),wc()(),iI(22,Zo,3,0,"mat-chip-set",47),wc();}if(a&2){let e=vI(2);ky(6),cp("value",e.selectedAssignees()),ky(6),cp("value",e.buscarAsignado()),ky(6),Mc(" ",e.allAssigneesSelected()?"Quitar todos":"Seleccionar todos"," "),ky(),uI(e.assigneeOptions()),ky(3),sI(e.selectedAssignees().length?22:-1);}}function Xo(a,i){if(a&1&&(ii(0,"mat-option",8),QI(1),wc()),a&2){let e=i.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function Jo(a,i){a&1&&(ii(0,"mat-option",46),QI(1,"Sin coincidencias"),wc());}function er(a,i){if(a&1){let e=mI();ii(0,"mat-chip",54),gp("removed",function(){let n=Yl(e).$implicit,o=vI(4);return Kl(o.removeClient(n))}),QI(1),ii(2,"button",50)(3,"mat-icon"),QI(4,"close"),wc()()();}if(a&2){let e=i.$implicit,t=vI(4);bp("background",t.pastel(t.clientColorOf(e))),cp("matTooltip",t.clientNameOf(e)),ky(),Mc(" ",t.clientNameOf(e)," "),ky(),ap("aria-label","Quitar "+t.clientNameOf(e));}}function tr(a,i){if(a&1&&(ii(0,"mat-chip-set",47),lI(1,er,5,5,"mat-chip",53,cI),wc()),a&2){let e=vI(3);ky(),uI(e.selectedClients());}}function ir(a,i){if(a&1){let e=mI();ii(0,"div",35)(1,"span",38),QI(2,"Cliente:"),wc(),ii(3,"mat-form-field",51)(4,"mat-label"),QI(5,"Clientes"),wc(),ii(6,"mat-select",40,3),gp("selectionChange",function(n){Yl(e);let o=vI(2);return Kl(o.onClientSelectChange(n.value))})("closed",function(){Yl(e);let n=vI(2);return Kl(n.buscarCliente.set(""))}),ii(8,"div",41),gp("click",function(n){return n.stopPropagation()}),ii(9,"div",42)(10,"mat-icon"),QI(11,"search"),wc(),ii(12,"input",52),gp("input",function(n){Yl(e);let o=vI(2);return Kl(o.buscarCliente.set(n.target.value))})("keydown",function(n){return n.stopPropagation()}),wc(),ii(13,"button",44),gp("click",function(){Yl(e);let n=_I(7);return Kl(n.close())}),ii(14,"mat-icon"),QI(15,"close"),wc(),QI(16,"Cerrar"),wc()(),ii(17,"button",45),gp("click",function(n){return Yl(e),vI(2).toggleAllClients(),Kl(n.stopPropagation())}),QI(18),wc()(),lI(19,Xo,2,2,"mat-option",8,Ut,false,Jo,2,0,"mat-option",46),wc()(),iI(22,tr,3,0,"mat-chip-set",47),wc();}if(a&2){let e=vI(2);ky(6),cp("value",e.selectedClients()),ky(6),cp("value",e.buscarCliente()),ky(6),Mc(" ",e.allClientsSelected()?"Quitar todos":"Seleccionar todos"," "),ky(),uI(e.clientOptions()),ky(3),sI(e.selectedClients().length?22:-1);}}function nr(a,i){if(a&1){let e=mI();ii(0,"button",55),gp("click",function(){Yl(e);let n=vI(2);return Kl(n.clearFilters())}),ii(1,"mat-icon"),QI(2,"filter_alt_off"),wc(),QI(3," Limpiar filtros "),wc();}}function ar(a,i){if(a&1){let e=mI();ii(0,"div",26)(1,"div",27)(2,"mat-form-field",28)(3,"mat-label"),QI(4,"Buscar en el tablero"),wc(),ii(5,"input",29),gp("input",function(n){Yl(e);let o=vI();return Kl(o.onBoardSearch(n.target.value))})("keydown.enter",function(){Yl(e);let n=vI();return Kl(n.submitBoardSearch())}),wc(),ii(6,"mat-icon",30),QI(7,"search"),wc(),iI(8,qo,2,0,"mat-hint")(9,Uo,2,0,"mat-hint"),wc()(),ii(10,"div",27)(11,"mat-button-toggle-group",31),gp("change",function(n){Yl(e);let o=vI();return Kl(o.setPriority(n.value))}),lI(12,Wo,2,2,"mat-button-toggle",8,cI),wc(),ii(14,"button",32),gp("click",function(){Yl(e);let n=vI();return Kl(n.toggleMine())}),ii(15,"mat-icon"),QI(16,"person"),wc(),QI(17," Asignados a m\xED "),wc(),iI(18,jo,4,3,"button",33),iI(19,Yo,23,5,"div",34),iI(20,ir,23,5,"div",35),wc(),iI(21,nr,4,0,"button",36),wc();}if(a&2){let e=vI();ky(5),cp("value",e.boardSearchText()),ky(3),sI(e.searchingTickets()?8:e.searchPending()?9:-1),ky(3),cp("value",e.priorityFilter()),ky(),uI(e.PRIORITY_FILTERS),ky(2),Cp("active",e.mineOnly()),ap("aria-pressed",e.mineOnly()),ky(4),sI(e.puedeVerEquipo()?18:-1),ky(),sI(e.assigneeChips().length?19:-1),ky(),sI(e.clientChips().length?20:-1),ky(),sI(e.hasFilters()?21:-1);}}function or(a,i){if(a&1&&(ii(0,"span",65)(1,"mat-icon",80),QI(2,"groups"),wc(),QI(3),wc()),a&2){let e=vI().$implicit,t=vI(2);ky(3),Mc(" ",t.subtipoLabel(e.subtipo));}}function rr(a,i){if(a&1){let e=mI();ii(0,"button",83),gp("click",function(n){Yl(e);let o=vI(2).$implicit,r=vI(2);return Kl(r.copiarTicket(o.ticket,n))}),ii(1,"mat-icon"),QI(2),wc()();}if(a&2){let e=vI(2).$implicit,t=vI(2);cp("matTooltip",t.ticketCopiado()===e.ticket?"Copiado":"Copiar n\xFAmero"),ky(2),Ap(t.ticketCopiado()===e.ticket?"check":"content_copy");}}function sr(a,i){if(a&1&&(ii(0,"span",81),QI(1),wc(),iI(2,rr,3,2,"button",82)),a&2){let e=vI().$implicit;ky(),Ap(e.ticket?"#"+e.ticket:e.id),ky(),sI(e.ticket?2:-1);}}function cr(a,i){if(a&1&&(ii(0,"span",84),QI(1),wc()),a&2){let e=vI().$implicit,t=vI(2);FI(t.prioClase(t.ticketPrio(e.ticket))),ky(),Mc("#",t.ticketPrio(e.ticket));}}function lr(a,i){if(a&1&&(ii(0,"span",85),QI(1),wc()),a&2){let e=vI().$implicit,t=vI(2);FI("prio-"+e.priority),ky(),Ap(t.PRIORITY_LABELS[e.priority]);}}function dr(a,i){if(a&1&&(ii(0,"span",68)(1,"mat-icon",80),QI(2,"groups"),wc(),QI(3),wc()),a&2){let e=vI().$implicit,t=vI(2);ky(3),Mc("",t.boardLabel(e.board)," ");}}function hr(a,i){if(a&1){let e=mI();ii(0,"button",88),gp("click",function(){let n=Yl(e).$implicit,o=vI(2).$implicit,r=vI(2);return Kl(r.moveCard(o,n.status))}),ii(1,"mat-icon"),QI(2),wc(),QI(3),wc();}if(a&2){let e=i.$implicit,t=vI(2).$implicit;cp("disabled",e.status===t.status),ky(2),Ap(e.status===t.status?"radio_button_checked":"radio_button_unchecked"),ky(),Mc(" ",e.label," ");}}function pr(a,i){if(a&1&&(ii(0,"button",86),gp("click",function(t){return t.stopPropagation()}),ii(1,"mat-icon"),QI(2,"drive_file_move"),wc()(),ii(3,"mat-menu",null,4),lI(5,hr,4,3,"button",87,Na),wc()),a&2){let e=_I(4),t=vI(3);cp("matMenuTriggerFor",e),ky(5),uI(t.columns());}}function mr(a,i){if(a&1){let e=mI();ii(0,"button",89),gp("click",function(n){Yl(e);let o=vI().$implicit,r=vI(2);return n.stopPropagation(),Kl(r.deleteCard(o))}),ii(1,"mat-icon"),QI(2,"close"),wc()();}}function ur(a,i){if(a&1&&(ii(0,"span",71),QI(1),wc()),a&2){let e=vI().$implicit,t=tD(1);ky(),Ap(e.clientName||t?.name);}}function gr(a,i){if(a&1&&(ii(0,"div",90)(1,"mat-icon",80),QI(2,"schedule"),wc(),QI(3),wc()),a&2){let e=vI(2).$implicit,t=vI(2);ky(3),Mc(" ",t.fmtReunion(e.inicio,e.fin));}}function _r(a,i){if(a&1&&(ii(0,"a",92),gp("click",function(t){return t.stopPropagation()}),ii(1,"mat-icon",80),QI(2,"link"),wc(),QI(3," Abrir enlace "),wc()),a&2){let e=vI(2).$implicit,t=vI(2);cp("href",t.linkHref(e.link),Zd);}}function fr(a,i){if(a&1&&(iI(0,gr,4,1,"div",90),iI(1,_r,4,1,"a",91)),a&2){let e=vI().$implicit;sI(e.inicio?0:-1),ky(),sI(e.link?1:-1);}}function br(a,i){if(a&1&&(ii(0,"span",73),QI(1),wc()),a&2){let e=vI().$implicit;ky(),Ap(e.hdEstatus);}}function vr(a,i){if(a&1&&(ii(0,"div",74),QI(1),wc()),a&2){vI();let e=tD(2);ky(),Mc("\u26A0 Pr\xF3ximo a vencer \u2014 ",e.badge);}}function yr(a,i){if(a&1){let e=mI();ii(0,"div",93),gp("click",function(n){return n.stopPropagation()}),lp(1,"mat-progress-bar",94),ii(2,"input",95),gp("change",function(n){Yl(e);let o=vI().$implicit,r=vI(2);return Kl(r.onProgressChange(o,n.target.value))}),wc()(),ii(3,"button",96),gp("click",function(n){Yl(e);let o=vI().$implicit,r=vI(2);return n.stopPropagation(),Kl(r.toggleWaiting(o))}),QI(4),wc();}if(a&2){let e=vI().$implicit,t=vI(2);ky(),bp("--mdc-linear-progress-active-indicator-color",t.progColor(e.progress)),cp("value",e.progress),ky(),cp("value",e.progress);let n=t.waitingDays(e);ky(),Cp("active",n!==null&&n<3)("alert",n!==null&&n>=3),ky(),Mc(" ",n!==null&&n>=3?"\u26A0 Notificar al cliente":"\u23F3 Esperando cliente"," ");}}function xr(a,i){if(a&1){let e=mI();ii(0,"div",97),gp("click",function(n){return n.stopPropagation()}),ii(1,"mat-checkbox",98),gp("change",function(n){Yl(e);let o=vI().$implicit,r=vI(2);return Kl(r.onCert(o,n))}),wc(),ii(2,"span",99),QI(3,"Certificado"),wc()();}a&2&&(ky(),cp("checked",false));}function kr(a,i){if(a&1){let e=mI();ii(0,"div",97),gp("click",function(n){return n.stopPropagation()}),ii(1,"mat-checkbox",100),gp("change",function(n){Yl(e);let o=vI().$implicit,r=vI(2);return Kl(r.onFinalize(o,n))}),QI(2),wc()();}if(a&2){let e=vI().$implicit;ky(),cp("checked",e.approved)("disabled",!!e.ticket),ky(),Mc(" ",e.approved?"Finalizado \u2713":"Finalizado"," ");}}function Cr(a,i){if(a&1&&(ii(0,"span",78),lp(1,"span",101),ii(2,"span",102),QI(3),wc()()),a&2){vI();let e=tD(0),t=vI(2);cp("matTooltip",e.name),ky(),bp("background",e.color),ky(2),Ap(t.shortName(e.name));}}function wr(a,i){a&1&&(ii(0,"span",79),lp(1,"span",101),ii(2,"span",102),QI(3,"Sin asignar"),wc()());}function Sr(a,i){if(a&1){let e=mI();Fp(0)(1)(2),ii(3,"mat-card",63),gp("click",function(){let n=Yl(e).$implicit,o=vI(2);return Kl(o.openDetail(n))}),ii(4,"div",64),iI(5,or,4,1,"span",65)(6,sr,3,2),iI(7,cr,2,3,"span",66)(8,lr,2,3,"span",67),iI(9,dr,4,1,"span",68),lp(10,"span",69),iI(11,pr,7,1),iI(12,mr,3,0,"button",70),wc(),iI(13,ur,2,1,"span",71),ii(14,"div",72),QI(15),wc(),iI(16,fr,2,2),iI(17,br,2,1,"span",73),iI(18,vr,2,1,"div",74),iI(19,yr,5,9)(20,xr,4,1,"div",75)(21,kr,3,3,"div",75),ii(22,"div",76)(23,"span",77)(24,"mat-icon"),QI(25,"event"),wc(),QI(26),wc(),iI(27,Cr,4,4,"span",78)(28,wr,4,0,"span",79),wc()();}if(a&2){let e,t=i.$implicit,n=vI(2),o=eD(n.assigneeView(t));ky();let r=eD(n.clientOf(t.client)),l=n.clientStyle(r);ky();let u=eD(n.dueInfo(t.dueDate,t.status));ky(),bp("background",l.bg)("color",l.ink)("--accent",l.accent)("--tilt",n.cardTilt(t.id)),Cp("not-mine",!n.canDrag(t))("overdue",u.overdue)("soon",u.soon),cp("id","card-"+t.id)("cdkDragData",t)("cdkDragDisabled",n.isHandset()||!n.canDrag(t)),ky(2),sI(n.esReunion(t)?5:6),ky(2),sI(t.ticket&&n.ticketPrio(t.ticket)?7:8),ky(2),sI(n.esForanea(t)?9:-1),ky(2),sI(n.canDrag(t)?11:-1),ky(),sI(n.puedeGestionarTodo()&&!t.ticket?12:-1),ky(),sI(t.clientName||r?13:-1),ky(2),Ap(t.title),ky(),sI(n.esReunion(t)?16:-1),ky(),sI(t.ticket&&t.hdEstatus?17:-1),ky(),sI(u.soon?18:-1),ky(),sI((e=t.status)==="in_progress"?19:e==="review"?20:e==="done"?21:-1),ky(4),Cp("overdue",u.overdue)("soon",u.soon),ky(3),Mc("",u.str||"\u2014"," "),ky(),sI(o?27:28);}}function Dr(a,i){a&1&&(ii(0,"div",62)(1,"span"),QI(2,"\u25CB"),wc(),ii(3,"span"),QI(4,"Sin tareas"),wc()());}function Mr(a,i){if(a&1){let e=mI();ii(0,"section",18)(1,"header",56),lp(2,"span",57),ii(3,"span",58),QI(4),wc(),ii(5,"span",59),QI(6),wc()(),ii(7,"div",60),gp("cdkDropListDropped",function(n){let o=Yl(e).$implicit,r=vI();return Kl(r.drop(n,o.status))}),lI(8,Sr,29,37,"mat-card",61,Ut,false,Dr,5,0,"div",62),wc()();}if(a&2){let e=i.$implicit;ky(),FI("head-"+e.status),ky(),FI("dot-"+e.status),ky(2),Ap(e.label),ky(2),Ap(e.cards.length),ky(),cp("cdkDropListData",e.cards),ky(),uI(e.cards);}}var Ba=class a{data=D(N);auth=D(Yp);helpdesk=D(K);dialog=D(ee);snack=D(Qt);transfer=D(m);shell=D(d);breakpoints=D(Wt);route=D(G);isHandset=T(this.breakpoints.observe("(max-width: 768px)").pipe(we(i=>i.matches)),{initialValue:false});filtersTpl=WL("filtersTpl");syncing=Ft(false);ticketPrioMap=Ft({});ticketAssigneeMap=Ft({});teamOnly=Ft(false);teamHids=Ft(new Set);puedeVerEquipo=G$1(()=>this.data.usesQuarkus()&&this.auth.puedeTransferir());constructor(){this.helpdesk.getHdUsers(),this.helpdesk.getClients(),this.helpdesk.getTicketStatuses(),this.data.ensureInit().then(()=>this.initBoards()),this.auth.ensureRolesPlataforma().then(()=>{!this.mineTocado&&!this.auth.veTableroCompleto()&&this.mineOnly.set(true);}),this.data.usesQuarkus()&&this.auth.puedeTransferir()&&this.transfer.miEquipoMiembros().then(i=>this.teamHids.set(new Set(i.map(e=>String(e.helpdeskUserId||"").trim().toUpperCase()).filter(Boolean)))).catch(()=>{}),Ly(()=>this.shell.setFilters(this.filtersTpl()??null));}ngOnDestroy(){this.shell.clear();}toggleTeam(){this.teamOnly.update(i=>!i);}boards=G$1(()=>this.data.boards());currentBoard=G$1(()=>this.data.currentBoard());async initBoards(){if(this.data.usesQuarkus()){let i=await this.data.loadBoards(this.auth.session()?.id??null),e=this.route.snapshot.queryParamMap.get("board"),t=e&&i.some(n=>n.codigo===e)?e:i[0]?.codigo;t&&await this.data.switchBoard(t);}this.focusCardFromRoute(),await this.syncTicketStatuses();}async focusCardFromRoute(){let i=this.route.snapshot.queryParamMap,e=i.get("card");if(!e)return;let t=i.get("sprint");t&&this.setSprint(t);for(let n=0;n<15;n++){let o=this.data.stories().find(r=>r.id===e);if(o){let r=document.getElementById("card-"+e);r&&(r.scrollIntoView({behavior:"smooth",block:"center"}),r.classList.add("card-highlight"),setTimeout(()=>r.classList.remove("card-highlight"),2200)),this.openDetail(o);return}await new Promise(r=>setTimeout(r,200));}}async switchBoard(i){!i||i===this.currentBoard()||(await this.data.switchBoard(i),await this.syncTicketStatuses());}async syncTicketStatuses(){let i=this.data.sprints().active,e=this.data.getStoriesBySprint(i).filter(r=>r.ticket);if(!e.length)return;this.syncing.set(true);let t=this.data.usesQuarkus()?await this.data.getTicketEspejoCache():null,n={},o={};await Promise.all(e.map(async r=>{let l=await this.helpdesk.fetchTicketRaw(r.ticket)??(t?t[r.ticket]:null);if(!l)return;let u=String(l.priority??"").trim();u&&(n[r.ticket]=u),o[r.ticket]={id:String(l.assigned_user_id??l.usuarioAsignado??"").trim().toUpperCase(),name:String(l.assigned_person??l.nombreAsignado??"").trim()};let f=String(l.client_id??"").trim();f&&r.client!==f&&this.data.updateStoryClient(r.id,f);let x=String(l.cliente??"").trim();x&&r.clientName!==x&&this.data.updateStoryClientName(r.id,x);let y=String(l.estado||"");y&&r.hdEstatus!==y&&this.data.updateStoryHdEstatus(r.id,y);let D=So$1(y);r.status!==D.status&&this.data.updateStoryStatus(r.id,D.status),D.approved!==void 0&&!!r.approved!==D.approved&&(D.approved?this.data.approveStory(r.id):this.data.unapproveStory(r.id)),D.waiting&&!r.waitingClient&&this.data.setWaitingClient(r.id,true);})),this.ticketPrioMap.set(n),this.ticketAssigneeMap.set(o),this.syncing.set(false);}ticketPrio(i){return i&&this.ticketPrioMap()[i]||""}prioBandaDe(i){let e=this.ticketPrio(i.ticket);return e?ui$1(e):i.priority}prioClase=Ta;resolveMember=i=>Bo$1(i,this.data.team(),this.helpdesk.hdUsers());effAssignee(i){if(i.ticket){let e=this.ticketAssigneeMap()[i.ticket];if(e)return e.id}return String(i.assignee||"").trim()}assigneeView(i){let e=this.effAssignee(i);if(!e)return null;let t=this.resolveMember(e);if(t&&t.name&&t.name!=="\u2014")return {name:t.name,color:t.color};let n=i.ticket?this.ticketAssigneeMap()[i.ticket]?.name:"";return n?{name:n,color:Ht$1(e)}:t?{name:t.name,color:t.color}:null}dueInfo=Yo$1;progColor=No$1;clientStyle=Fo$1;pastel=Vo$1;cardTilt=Ro$1;STATUS_LABELS=Ao$1;PRIORITY_LABELS=Eo$1;PRIORITY_FILTER_LABELS=To$1;PRIORITY_FILTERS=["all","alta","media","baja"];priorityFilter=Ft("all");activeClients=Ft(new Set);activeAssignees=Ft(new Set);codeSearch=Ft("");palabraSearch=Ft("");matchedTickets=Ft(null);searchingTickets=Ft(false);searchedPalabra=Ft("");searchPending=G$1(()=>{let i=this.palabraSearch().trim();return !!i&&i!==this.searchedPalabra()});mineOnly=Ft(false);mineTocado=false;puedeGestionarTodo=this.auth.puedeGestionarTodo;puedeBorrarBoard=this.auth.puedeBorrarBoard;get myId(){return String(this.auth.session()?.id||"").trim().toUpperCase()}sprints=G$1(()=>this.data.sprints().sprints);activeSprintId=G$1(()=>this.data.sprints().active);activeSprint=G$1(()=>this.data.getActiveSprint());setSprint(i){this.data.setActiveSprint(i);}openNewSprint(){this.dialog.open(nt,{data:{sprint:null},width:"480px",maxWidth:"95vw"});}openEditSprint(){let i=this.activeSprint();i&&this.dialog.open(nt,{data:{sprint:i},width:"480px",maxWidth:"95vw"});}fmtSprintDate(i){return i?new Date(i+"T00:00:00").toLocaleDateString("es-ES",{day:"2-digit",month:"short",year:"numeric"}):""}clients=G$1(()=>this.data.clients());visibleStories=G$1(()=>{let i=this.data.sprints().active,e=this.data.currentBoard(),t=new Date;t.setDate(t.getDate()-2);let n=t.toISOString().split("T")[0];return this.data.stories().filter(o=>o.sprint===i&&(!e||(o.board||"CUENCA")===e)).filter(o=>!(o.status==="done"&&o.approved&&(o.approvedDate||"")<n))});cardsSource=G$1(()=>{let i=this.visibleStories(),e=this.myId,t=this.mineOnly(),n=this.teamOnly();if(!t&&!n||!e)return i;let o=this.teamHids(),r=this.data.currentBoard(),l=new Date;l.setDate(l.getDate()-2);let u=l.toISOString().split("T")[0],f=new Set(i.map(y=>y.id)),x=this.data.stories().filter(y=>{if(f.has(y.id)||(y.board||"CUENCA")===(r||"CUENCA")||y.status==="done"&&y.approved&&(y.approvedDate||"")<u)return  false;let D=this.effAssignee(y).toUpperCase();return D?!!(t&&D===e||n&&o.has(D)):false});return x.length?[...i,...x]:i});esForanea(i){let e=this.data.currentBoard();return !!e&&(i.board||"CUENCA")!==e}boardLabel(i){if(!i)return "";let e=this.data.boards().find(t=>t.codigo===i);return e?.equipo||e?.nombre||i}assigneeChips=G$1(()=>[...new Set(this.visibleStories().map(e=>this.effAssignee(e)).filter(Boolean))].map(e=>this.resolveMember(e)).filter(e=>!!e).sort((e,t)=>(e.name||e.id).localeCompare(t.name||t.id,"es")));clientChips=G$1(()=>[...new Set(this.visibleStories().map(e=>e.client).filter(Boolean))].map(e=>{let t=this.clientOf(e);return {id:e,name:t?.name||e,color:t?.color||Ht$1(e)}}).sort((e,t)=>e.name.localeCompare(t.name,"es")));buscarAsignado=Ft("");buscarCliente=Ft("");filtraOpc(i,e){let t=e.trim().toLowerCase();return t?i.filter(n=>n.name.toLowerCase().includes(t)||n.id.toLowerCase().includes(t)):i}assigneeOptions=G$1(()=>this.filtraOpc(this.assigneeChips(),this.buscarAsignado()));clientOptions=G$1(()=>this.filtraOpc(this.clientChips(),this.buscarCliente()));columns=G$1(()=>{let i=this.priorityFilter(),e=this.activeClients(),t=this.activeAssignees(),n=this.codeSearch().trim().toLowerCase(),o=this.searchedPalabra().trim().toLowerCase(),r=this.matchedTickets(),l=this.mineOnly(),u=this.teamOnly(),f=this.myId,x=this.cardsSource().filter(y=>{let D=this.effAssignee(y);if(l&&!u&&D.toUpperCase()!==f||i!=="all"&&this.prioBandaDe(y)!==i||e.size>0&&!(y.client&&e.has(y.client))||t.size>0&&!(!D||t.has(D)))return  false;if(n){let de=String(y.ticket||"").toLowerCase(),Ue=String(y.id||"").toLowerCase();if(!de.includes(n)&&!Ue.includes(n))return  false}if(o){let de=[y.title,y.description,y.clientName,y.client].some(Wt=>String(Wt||"").toLowerCase().includes(o)),Ue=!!(y.ticket&&r?.has(String(y.ticket)));if(!de&&!Ue)return  false}return  true});return wo$1.map(y=>({status:y,label:Ao$1[y],cards:x.filter(D=>D.status===y)}))});get workDeps(){return {data:this.data,auth:this.auth,dialog:this.dialog,snack:this.snack}}setPriority(i){this.priorityFilter.set(i),this.activeAssignees.set(new Set);}toggleMine(){this.mineTocado=true;let i=!this.mineOnly();this.mineOnly.set(i),i&&this.activeAssignees.set(new Set);}hasFilters=G$1(()=>this.priorityFilter()!=="all"||this.mineOnly()||this.selectedAssignees().length>0||this.selectedClients().length>0||!!this.codeSearch().trim()||!!this.palabraSearch().trim());clearFilters(){this.priorityFilter.set("all"),this.mineOnly.set(false),this.activeAssignees.set(new Set),this.activeClients.set(new Set),this.codeSearch.set(""),this.palabraSearch.set(""),this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""),this.buscarAsignado.set(""),this.buscarCliente.set("");}onCodeInput(i){this.codeSearch.set(i);}onBoardSearch(i){let e=i.trim(),t=!e||/^\d+$/.test(e)||/^ta-?\d*$/i.test(e);this.onCodeInput(t?i:""),this.onPalabraInput(t?"":i);}submitBoardSearch(){this.palabraSearch().trim()&&this.submitPalabra();}boardSearchText=G$1(()=>this.codeSearch()||this.palabraSearch());onPalabraInput(i){this.palabraSearch.set(i),i.trim()||(this.matchedTickets.set(null),this.searchingTickets.set(false),this.searchedPalabra.set(""));}async submitPalabra(){let i=this.palabraSearch().trim();if(this.searchedPalabra.set(i),!i){this.matchedTickets.set(null),this.searchingTickets.set(false);return}this.searchingTickets.set(true),this.matchedTickets.set(null);let e=await this.helpdesk.searchTicketNumbers(i);this.palabraSearch().trim()===i&&(this.matchedTickets.set(e),this.searchingTickets.set(false));}ticketCopiado=Ft(null);copiarTicket(i,e){e.stopPropagation(),navigator.clipboard?.writeText(String(i)).then(()=>{this.ticketCopiado.set(i),setTimeout(()=>this.ticketCopiado.set(null),1500);}).catch(()=>{});}selectedAssignees=G$1(()=>[...this.activeAssignees()]);onAssigneeSelectChange(i){this.activeAssignees.set(new Set(i));}allAssigneesSelected=G$1(()=>this.assigneeChips().length>0&&this.selectedAssignees().length===this.assigneeChips().length);toggleAllAssignees(){this.allAssigneesSelected()?this.activeAssignees.set(new Set):this.activeAssignees.set(new Set(this.assigneeChips().map(i=>i.id)));}shortName=Io$1;removeAssignee(i){let e=new Set(this.activeAssignees());e.delete(i),this.activeAssignees.set(e);}clearAssignees(){this.activeAssignees.set(new Set);}selectedClients=G$1(()=>[...this.activeClients()]);onClientSelectChange(i){this.activeClients.set(new Set(i));}allClientsSelected=G$1(()=>this.clientChips().length>0&&this.selectedClients().length===this.clientChips().length);toggleAllClients(){this.allClientsSelected()?this.activeClients.set(new Set):this.activeClients.set(new Set(this.clientChips().map(i=>i.id)));}removeClient(i){let e=new Set(this.activeClients());e.delete(i),this.activeClients.set(e);}clientNameOf(i){return this.clientChips().find(e=>e.id===i)?.name||i}clientColorOf(i){return this.clientChips().find(e=>e.id===i)?.color||"#9aa0a6"}clientOf(i){if(!i)return;let e=this.data.getClient(i);if(e)return {id:e.id,name:e.name,color:e.color};let t=this.helpdesk.clients().find(n=>n.id===i);return t?{id:t.id,name:t.name}:{id:i,name:i}}puedeOperar(i){if(this.puedeGestionarTodo())return  true;let e=this.effAssignee(i).toUpperCase();return !!e&&e===this.myId}canDrag(i){return this.puedeOperar(i)}avisoSinPermiso(){this.snack.open("No tienes permisos para modificar esta tarea. Solo el asignado, un supervisor o el Helpdesk pueden.","OK",{duration:4e3});}async drop(i,e){await this.moveCard(i.item.data,e);}async moveCard(i,e){if(!(!i||i.status===e)){if(!this.puedeOperar(i)){this.avisoSinPermiso();return}if(e==="todo"&&i.ticket){this.snack.open("Una tarea con ticket no puede volver a To Do.","OK",{duration:3e3});return}if(i.status==="todo"&&e==="in_progress"){if(!await zo$1(i,this.workDeps))return}else if(!await ih(this.dialog.open(zt$1,{data:{title:"Mover tarea",message:`\xBFMover "${i.title}" a "${Ao$1[e]}"?`,confirmText:"Mover"}}).afterClosed()))return;this.data.updateStoryStatus(i.id,e),this.pushHdEstado(i,Po[e]);}}pushHdEstado(i,e){!i.ticket||!e||this.helpdesk.setTicketStatus(i.ticket,e).then(t=>{t?this.data.updateStoryHdEstatus(i.id,e):this.snack.open(`No se pudo actualizar el estado del ticket #${i.ticket} en el Helpdesk.`,"OK",{duration:4e3});});}openDetail(i){i.tipo==="REUNION"?this.dialog.open(it,{data:{story:i},width:"520px",maxWidth:"95vw"}):this.dialog.open(vi$1,{data:{story:i},width:"560px",maxWidth:"95vw"});}openNew(){this.dialog.open(vi$1,{data:{story:null},width:"560px",maxWidth:"95vw"});}openNewReunion(){this.dialog.open(it,{data:{story:null},width:"520px",maxWidth:"95vw"});}esReunion(i){return i.tipo==="REUNION"}subtipoLabel(i){return i==="PRESENTACION"?"Presentaci\xF3n":i==="CAPACITACION"?"Capacitaci\xF3n":"Reuni\xF3n"}linkHref(i){let e=(i||"").trim();return e?/^[a-z][a-z0-9+.-]*:/i.test(e)?e:"https://"+e:""}fmtReunion(i,e){if(!i)return "";let t=new Date(i);if(isNaN(t.getTime()))return i;let n=t.toLocaleDateString("es-ES",{day:"2-digit",month:"short"}),o=u=>u&&!isNaN(new Date(u).getTime())?new Date(u).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}):"",r=o(i),l=o(e);return `${n} \xB7 ${r}${l?"\u2013"+l:""}`}onProgressChange(i,e){this.data.updateStoryProgress(i.id,Lo$1(parseInt(e,10)||0));}waitingDays(i){return !i.waitingClient||!i.waitingDate?null:Math.floor((Date.now()-new Date(i.waitingDate+"T00:00:00").getTime())/864e5)}toggleWaiting(i){let e=!i.waitingClient;this.data.setWaitingClient(i.id,e),e&&this.pushHdEstado(i,Oo$1);}async onCert(i,e){if(!e.checked)return;if(!this.puedeOperar(i)){e.source.checked=false,this.avisoSinPermiso();return}if(!await ih(this.dialog.open(zt$1,{data:{title:"Certificar tarea",message:`\xBFMarcar "${i.title}" como certificada y moverla a Finalizado?`,confirmText:"Certificar"}}).afterClosed())){e.source.checked=false;return}this.data.updateStoryStatus(i.id,"done"),this.pushHdEstado(i,Po.done);}async onFinalize(i,e){if(i.ticket)return;if(!this.puedeOperar(i)){e.source.checked=!!i.approved,this.avisoSinPermiso();return}if(!e.checked){this.data.unapproveStory(i.id);return}if(!await ih(this.dialog.open(zt$1,{data:{title:"Finalizar tarea",message:`\xBFMarcar "${i.title}" como finalizada?`,confirmText:"Finalizar"}}).afterClosed())){e.source.checked=false;return}this.data.approveStory(i.id);}async deleteCard(i){if(i.ticket){this.snack.open("Las tareas con ticket asociado no se pueden eliminar.","OK",{duration:3500});return}await ih(this.dialog.open(zt$1,{data:{title:"Eliminar tarea",message:`Vas a eliminar la tarea:

"${i.title}"

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Eliminar",danger:true,requireWord:"BORRAR"}}).afterClosed())&&this.data.deleteStory(i.id);}async clearBoard(){let i=this.data.sprints().active,e=this.data.getStoriesBySprint(i),t=e.filter(l=>!l.ticket),n=e.length-t.length,o=t.map(l=>l.id);if(!o.length){this.snack.open(n?"Solo hay tareas con ticket asociado (no se pueden borrar).":"No hay tareas en el sprint.","OK",{duration:3500});return}await ih(this.dialog.open(zt$1,{data:{title:"Borrar board",message:`Vas a eliminar ${o.length} tarea(s) sin ticket del sprint activo.${n?`

(${n} tarea(s) con ticket asociado NO se borran.)`:""}

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Borrar todo",danger:true,requireWord:"BORRAR"}}).afterClosed())&&o.forEach(l=>this.data.deleteStory(l));}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-board"]],viewQuery:function(e,t){e&1&&Dp(t.filtersTpl,Fo,5),e&2&&CI();},decls:38,vars:6,consts:[["crearMenu","matMenu"],["filtersTpl",""],["asigSel",""],["cliSel",""],["moveMenu","matMenu"],[1,"sprint-bar"],["appearance","outline","subscriptSizing","dynamic",1,"sprint-select"],[3,"selectionChange","value"],[3,"value"],["mat-icon-button","","matTooltip","Editar sprint actual",3,"click","disabled"],["mat-icon-button","","matTooltip","Nuevo sprint",3,"click"],[1,"sprint-banner"],[1,"spacer"],["mat-flat-button","","color","primary",3,"matMenuTriggerFor"],[1,"crear-caret"],["mat-menu-item","",3,"click"],["mat-stroked-button","",1,"danger"],["cdkDropListGroup","",1,"kanban"],[1,"kanban-col"],[1,"sb-name"],[1,"sb-goal"],[1,"sb-sep"],[1,"sb-cap"],[1,"sb-status"],[1,"sb-dates"],["mat-stroked-button","",1,"danger",3,"click"],[1,"board-filters-panel"],[1,"filter-group"],["appearance","outline","subscriptSizing","dynamic",1,"ticket-search"],["matInput","","placeholder","N\xB0, TA-046 o una palabra\u2026",3,"input","keydown.enter","value"],["matSuffix",""],["hideSingleSelectionIndicator","","aria-label","Filtrar por prioridad",1,"prio-filter",3,"change","value"],["type","button","mat-stroked-button","","matTooltip","Mostrar solo mis tareas",1,"mine-toggle",3,"click"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"active"],[1,"assignee-filter"],[1,"client-filter"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters"],["type","button","mat-stroked-button","","matTooltip","Incluir tareas de otros tableros que lleva mi equipo",1,"mine-toggle",3,"click"],[1,"filter-label"],["appearance","outline","subscriptSizing","dynamic",1,"assignee-select"],["multiple","",3,"selectionChange","closed","value"],[1,"sel-head",3,"click"],[1,"sel-head-search"],["placeholder","Buscar consultor\u2026",3,"input","keydown","value"],["type","button","aria-label","Cerrar lista",1,"sel-close",3,"click"],["type","button",1,"sel-head-all",3,"click"],["disabled",""],[1,"assignee-chips"],[1,"achip",3,"background","matTooltip"],[1,"achip",3,"removed","matTooltip"],["matChipRemove",""],["appearance","outline","subscriptSizing","dynamic",1,"client-select"],["placeholder","Buscar cliente\u2026",3,"input","keydown","value"],[1,"achip","cchip",3,"background","matTooltip"],[1,"achip","cchip",3,"removed","matTooltip"],["mat-stroked-button","","matTooltip","Quitar todos los filtros",1,"clear-filters",3,"click"],[1,"col-header"],[1,"col-dot"],[1,"col-title"],[1,"col-count"],["cdkDropList","",1,"col-cards",3,"cdkDropListDropped","cdkDropListData"],["cdkDrag","",1,"story-card",3,"id","not-mine","overdue","soon","background","color","--accent","--tilt","cdkDragData","cdkDragDisabled"],[1,"empty-col"],["cdkDrag","",1,"story-card",3,"click","id","cdkDragData","cdkDragDisabled"],[1,"card-top"],[1,"reunion-badge"],["matTooltip","Prioridad del ticket",1,"prio-badge",3,"class"],[1,"prio-badge",3,"class"],["matTooltip","Tarea de otro equipo (sigue en su tablero); te la asignaron",1,"team-badge"],[1,"grow"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn"],[1,"client-name"],[1,"card-title"],[1,"hd-estatus"],[1,"soon-badge"],[1,"card-check"],[1,"card-bottom"],[1,"card-due"],[1,"card-assignee",3,"matTooltip"],["matTooltip","Sin asignar",1,"card-assignee","unassigned"],["inline",""],[1,"card-ticket"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"matTooltip"],["aria-label","Copiar n\xFAmero de ticket",1,"card-copy",3,"click","matTooltip"],["matTooltip","Prioridad del ticket",1,"prio-badge"],[1,"prio-badge"],["mat-icon-button","","matTooltip","Mover a otra columna","aria-label","Mover tarjeta a otra columna",1,"move-btn",3,"click","matMenuTriggerFor"],["mat-menu-item","",3,"disabled"],["mat-menu-item","",3,"click","disabled"],["mat-icon-button","","matTooltip","Eliminar tarea",1,"del-btn",3,"click"],[1,"reunion-horario"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"href"],["target","_blank","rel","noopener noreferrer",1,"reunion-link",3,"click","href"],[1,"prog",3,"click"],["mode","determinate",3,"value"],["type","number","min","0","max","100","step","5",3,"change","value"],[1,"wait-btn",3,"click"],[1,"card-check",3,"click"],["aria-label","Certificado",3,"change","checked"],[1,"check-text"],[3,"change","checked","disabled"],[1,"ca-dot"],[1,"ca-name"]],template:function(e,t){if(e&1&&(ii(0,"div",5),iI(1,No,6,1,"mat-form-field",6),ii(2,"mat-form-field",6)(3,"mat-label"),QI(4,"Sprint"),wc(),ii(5,"mat-select",7),gp("selectionChange",function(o){return t.setSprint(o.value)}),lI(6,Lo,2,3,"mat-option",8,Ut),wc()(),ii(8,"button",9),gp("click",function(){return t.openEditSprint()}),ii(9,"mat-icon"),QI(10,"edit"),wc()(),ii(11,"button",10),gp("click",function(){return t.openNewSprint()}),ii(12,"mat-icon"),QI(13,"add"),wc()(),iI(14,Ho,11,7,"div",11),lp(15,"span",12),ii(16,"button",13)(17,"mat-icon"),QI(18,"add"),wc(),QI(19," Crear "),ii(20,"mat-icon",14),QI(21,"arrow_drop_down"),wc()(),ii(22,"mat-menu",null,0)(24,"button",15),gp("click",function(){return t.openNew()}),ii(25,"mat-icon"),QI(26,"assignment"),wc(),QI(27," Tarea de desarrollo/soporte"),wc(),ii(28,"button",15),gp("click",function(){return t.openNewReunion()}),ii(29,"mat-icon"),QI(30,"groups"),wc(),QI(31," Reuni\xF3n"),wc()(),iI(32,Go,4,0,"button",16),wc(),tp(33,ar,22,10,"ng-template",null,1,aD),ii(35,"div",17),lI(36,Mr,11,8,"section",18,Na),wc()),e&2){let n,o=_I(23);ky(),sI(t.boards().length>1?1:-1),ky(4),cp("value",t.activeSprintId()),ky(),uI(t.sprints()),ky(2),cp("disabled",!t.activeSprint()),ky(6),sI((n=t.activeSprint())?14:-1,n),ky(2),cp("matMenuTriggerFor",o),ky(16),sI(t.puedeBorrarBoard()?32:-1),ky(4),uI(t.columns());}},dependencies:[fa,_a,ga,ua,_,I,ba$1,ha$1,Ui,qt,tt,qe,Pa,Ci,Ia,Ea,fe,jn$1,de,ce,yo,Ar,Fr,Bt,Wt$1,W,xa,xi,yt,wt,va$1,ba$2,zt$2,mt,Ca$1,je,Je$1,ya],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:block;padding:16px;min-height:100%;box-sizing:border-box;background-color:#efeadf;background-image:linear-gradient(rgba(43,43,58,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(43,43,58,.04) 1px,transparent 1px);background-size:24px 24px}.sprint-bar[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding:8px 12px;background:#ffffffbf;border:1px solid rgba(43,43,58,.08);border-radius:12px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.sprint-bar[_ngcontent-%COMP%]   .sprint-select[_ngcontent-%COMP%]{width:180px}.sprint-bar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}.sprint-bar[_ngcontent-%COMP%]   .danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}.sprint-banner[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-left:8px;font-size:13px;color:#2b2b3a}.sprint-banner[_ngcontent-%COMP%]   .sb-name[_ngcontent-%COMP%]{font-weight:700}.sprint-banner[_ngcontent-%COMP%]   .sb-goal[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.sprint-banner[_ngcontent-%COMP%]   .sb-sep[_ngcontent-%COMP%]{color:var(--mat-sys-outline)}.sprint-banner[_ngcontent-%COMP%]   .sb-dates[_ngcontent-%COMP%], .sprint-banner[_ngcontent-%COMP%]   .sb-cap[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.sprint-banner[_ngcontent-%COMP%]   .sb-status[_ngcontent-%COMP%]{font-size:10px;font-weight:700;text-transform:uppercase;padding:1px 8px;border-radius:9px;color:#fff}.sprint-banner[_ngcontent-%COMP%]   .sb-status.st-active[_ngcontent-%COMP%]{background:#27ae60}.sprint-banner[_ngcontent-%COMP%]   .sb-status.st-completed[_ngcontent-%COMP%]{background:#8a8a9a}.sprint-banner[_ngcontent-%COMP%]   .sb-status.st-planned[_ngcontent-%COMP%]{background:var(--brand)}.board-filters-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:12px}.board-filters-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .prio-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .assignee-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-select[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .ticket-search[_ngcontent-%COMP%]{width:100%}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;gap:8px}.board-filters-panel[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] + .filter-group[_ngcontent-%COMP%]{padding-top:12px;border-top:1px solid var(--mat-sys-outline-variant)}.board-filters-panel[_ngcontent-%COMP%]   .filter-group-title[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mat-sys-on-surface-variant)}.board-filters-panel[_ngcontent-%COMP%]   .clear-filters[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]{--mat-icon-size: 18px;justify-content:flex-start}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;margin-right:2px}.board-filters-panel[_ngcontent-%COMP%]   .mine-toggle.active[_ngcontent-%COMP%]{background:var(--brand, #048abf);color:#fff;border-color:var(--brand, #048abf)}.board-filters-panel[_ngcontent-%COMP%]   .assignee-filter[_ngcontent-%COMP%], .board-filters-panel[_ngcontent-%COMP%]   .client-filter[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}.assignee-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.assignee-filter[_ngcontent-%COMP%]   .filter-label[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.assignee-select[_ngcontent-%COMP%]{width:200px}.assignee-chips[_ngcontent-%COMP%]{display:flex}.achip[_ngcontent-%COMP%]{font-size:11.5px;font-weight:600;color:#3a3a4a;min-height:26px}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]{color:#3a3a4a;opacity:.7}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]:hover{opacity:1}.achip[_ngcontent-%COMP%]   button[matChipRemove][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.client-filter[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.client-select[_ngcontent-%COMP%]{width:200px}.ticket-search[_ngcontent-%COMP%]{width:150px}.cchip[_ngcontent-%COMP%]{max-width:200px}.cchip[_ngcontent-%COMP%]     .mdc-evolution-chip__text-label{overflow:hidden;text-overflow:ellipsis}.kanban[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(220px,1fr));gap:16px;align-items:start}.kanban-col[_ngcontent-%COMP%]{background:#fff6;border:1px solid rgba(43,43,58,.06);border-radius:12px;padding:10px;min-height:140px}.col-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:2px 4px 8px;margin-bottom:6px;border-bottom:2px solid var(--mat-sys-outline-variant)}.col-header[_ngcontent-%COMP%]   .col-title[_ngcontent-%COMP%]{font-size:13px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;color:#2b2b3a}.col-header[_ngcontent-%COMP%]   .col-count[_ngcontent-%COMP%]{margin-left:auto;font-size:12px;font-weight:700;color:#2b2b3a;background:#fff;border:1px solid rgba(43,43,58,.12);border-radius:10px;padding:1px 8px}.col-header.head-todo[_ngcontent-%COMP%]{border-bottom-color:#8a8a9a}.col-header.head-in_progress[_ngcontent-%COMP%]{border-bottom-color:var(--brand)}.col-header.head-review[_ngcontent-%COMP%]{border-bottom-color:var(--accent)}.col-header.head-done[_ngcontent-%COMP%]{border-bottom-color:#27ae60}.col-dot[_ngcontent-%COMP%]{width:9px;height:9px;border-radius:50%}.col-dot.dot-todo[_ngcontent-%COMP%]{background:#8a8a9a}.col-dot.dot-in_progress[_ngcontent-%COMP%]{background:var(--brand)}.col-dot.dot-review[_ngcontent-%COMP%]{background:var(--accent)}.col-dot.dot-done[_ngcontent-%COMP%]{background:#27ae60}.col-cards[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;min-height:60px;padding:4px 2px}.empty-col[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:24px 0;color:#2b2b3a59;font-size:12px}.story-card.card-highlight[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_card-highlight 2.2s ease-out;position:relative;z-index:3}@keyframes _ngcontent-%COMP%_card-highlight{0%,30%{box-shadow:0 0 0 3px var(--brand, #048abf),0 6px 16px #048abf73}to{box-shadow:var(--shadow)}}.story-card[_ngcontent-%COMP%]{--shadow: 0 4px 10px rgba(43, 43, 58, .16), 0 1px 2px rgba(43, 43, 58, .1);position:relative;padding:11px 12px 10px;border:none;border-top:3px solid var(--accent);border-radius:3px;box-shadow:var(--shadow);cursor:pointer;-webkit-user-select:none;user-select:none;transform:rotate(var(--tilt, 0deg));transition:transform .16s ease,box-shadow .16s ease}.story-card[_ngcontent-%COMP%]:hover{transform:rotate(0) translateY(-3px) scale(1.015);box-shadow:0 10px 22px #2b2b3a38,0 2px 4px #2b2b3a1f;z-index:2}.story-card.not-mine[_ngcontent-%COMP%]{cursor:default;filter:saturate(.85)}.story-card.overdue[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #e74c3c}.story-card.soon[_ngcontent-%COMP%]{box-shadow:var(--shadow),0 0 0 2px #f29e3b}.story-card.cdk-drag-dragging[_ngcontent-%COMP%]{transform:rotate(0);box-shadow:0 14px 30px #2b2b3a47}.card-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;row-gap:4px;margin-bottom:4px}.card-top[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%]{flex:1}.card-top[_ngcontent-%COMP%]   .card-ticket[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:12px;font-weight:700;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-left:-4px;padding:0;border:none;background:transparent;color:#6d6d75;cursor:pointer;border-radius:50%}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-top[_ngcontent-%COMP%]   .card-copy[_ngcontent-%COMP%]:hover{background:#00000014;color:#2b2b3a}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]{width:24px;height:24px;line-height:24px;color:#2b2b3a8c}.card-top[_ngcontent-%COMP%]   .del-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.prio-badge[_ngcontent-%COMP%]{font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;padding:1px 7px;border-radius:9px;color:#fff}.prio-badge.prio-alta[_ngcontent-%COMP%]{background:#e74c3c}.prio-badge.prio-media[_ngcontent-%COMP%]{background:#f2811d}.prio-badge.prio-baja[_ngcontent-%COMP%]{background:#2b2b3a73}.team-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;letter-spacing:.02em;padding:1px 7px 1px 5px;border-radius:9px;color:#fff;background:#6c5ce7;white-space:nowrap;max-width:100%;overflow:hidden}.team-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;height:13px;width:13px}.client-name[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#2b2b3a;margin-bottom:4px}.client-name[_ngcontent-%COMP%]:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}.card-title[_ngcontent-%COMP%]{font-size:13px;line-height:1.35;color:#2b2b3a;margin-bottom:8px}.soon-badge[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#b5560e;margin-bottom:8px}.hd-estatus[_ngcontent-%COMP%]{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:#2b2b3a;background:#ffffffa6;border:1px solid var(--accent);border-radius:9px;padding:1px 8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:8px}.prog[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{flex:1;border-radius:4px}.prog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:48px;padding:3px 5px;border:1px solid rgba(43,43,58,.2);border-radius:5px;background:#ffffffb3;color:#2b2b3a;font:inherit;font-size:12px;text-align:right}.wait-btn[_ngcontent-%COMP%]{width:100%;border:1px solid rgba(43,43,58,.18);background:#ffffff8c;color:#2b2b3a;border-radius:6px;padding:5px 8px;font-size:12px;cursor:pointer;margin-bottom:8px}.wait-btn.active[_ngcontent-%COMP%]{background:#fef5e7;border-color:#f29e3b;color:#b9770e}.wait-btn.alert[_ngcontent-%COMP%]{background:#fdedec;border-color:#e74c3c;color:#c0392b;font-weight:600;animation:_ngcontent-%COMP%_pulse 1.4s ease-in-out infinite}@keyframes _ngcontent-%COMP%_pulse{0%,to{opacity:1}50%{opacity:.55}}.card-check[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;margin-bottom:6px;font-size:13px;color:#2b2b3a}.check-text[_ngcontent-%COMP%]{cursor:default}.card-bottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-top:4px}.card-due[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:11px;color:#2b2b3a99}.card-due[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.card-due.overdue[_ngcontent-%COMP%]{color:#c0392b;font-weight:700}.card-due.soon[_ngcontent-%COMP%]{color:#b5560e}.card-assignee[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;min-width:0;max-width:150px;padding:3px 8px 3px 6px;border-radius:12px;background:#ffffffb8}.card-assignee[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{flex:none;width:10px;height:10px;border-radius:50%;background:#9aa0a6}.card-assignee[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{min-width:0;font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#2b2b3a}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-dot[_ngcontent-%COMP%]{background:transparent;border:1.5px dashed rgba(43,43,58,.4)}.card-assignee.unassigned[_ngcontent-%COMP%]   .ca-name[_ngcontent-%COMP%]{font-weight:500;color:#6b6b78}.reunion-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.02em;padding:2px 8px;border-radius:9px;background:#7e57c2;color:#fff}.reunion-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;width:13px;height:13px}.reunion-horario[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#5e35b1;margin-top:4px}.reunion-horario[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.reunion-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:var(--mat-sys-primary, #048abf);text-decoration:none;margin-top:3px}.reunion-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.reunion-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.crear-caret[_ngcontent-%COMP%]{margin-left:-4px}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:3px;box-shadow:0 14px 30px #2b2b3a4d}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.3}.col-cards.cdk-drop-list-dragging[_ngcontent-%COMP%]   .story-card[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .2s cubic-bezier(0,0,.2,1)}@media(max-width:1024px){.kanban[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.kanban[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}.client-select[_ngcontent-%COMP%]{width:100%}}']})};export{Ba as Board};