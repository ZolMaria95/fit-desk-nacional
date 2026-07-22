import {D,Y as Yp,f as ee,F as Ft,K,aY as $,aZ as B,aT as ih,O as OE,i as ii$1,Q as QI,w as wc,g as gp,r as lp,B as lI,a as iI,k as ky,d as cp,M as Mc,E as uI,s as sI,u as O,$ as $e,H as Ht,N as Nt,y as zt,V as Vt,P as Pp,X as XI,W as Wv,A as Ap,b as Op,z as zv,aU as J,co as sD,bi as cI,ak as bp,G as LE,I as Cl,R as qr,b2 as Ii,ap as N,aD as te,at as q$1,au as sh,bX as L,b8 as im,b1 as YL,_ as II,bP as np,ab as iD,ae as ap,af as Ep,a4 as TI,a5 as bI,a3 as vp,c3 as ur,T as mr,aG as QL,aq as Se,as as U$1,ar as ct,aL as Wo,aE as $e$1,U as w,a$ as nn,aN as Qh,ay as Rh,b9 as KL,ck as ns,bb as nh,cc as _i$1,bB as sp,a2 as Cp,a1 as FI,v as vI,br as kp,al as mI,am as Yl,an as Kl,aA as Ir,ba as Up,bd as m,a0 as DI,aX as _I,bg as ao,bh as pp,cp as pi$1,a9 as Tm,ag as VE,aa as Xf,ad as wd,aK as Is,ax as me,aB as jv,l as Ly,aj as he,ao as tp,be as lu,aM as T,bT as vh,aO as Fh,aH as Yh,bL as en,cq as ht,b7 as Zh,b4 as M,cr as zh,m as Qt$1,aI as Hr,cs as mt$1}from'./main-XG4N53P4.js';import {u}from'./chunk-D687Y7pF.js';import {q}from'./chunk-BM3kfVgo.js';import {Q as Qt}from'./chunk-CC8y3nsQ.js';import {F as Ft$1,R as Rt}from'./chunk-DQc2nXSP.js';import {y as yt,w as wt}from'./chunk-C0ttiOLj.js';import {c as ba,h as ha,U as Ui,K as Ko,a as an,Z as Zo,N as Ni,f as fe,j as jn$1,d as de,g as ce,A as Ar,F as Fr,Y as Yt,s as st,m as An$1}from'./chunk-CjcrUZxm.js';var Ot=["*"];function kn(l,a){l&1&&DI(0);}var Pn=["tabListContainer"],Tn=["tabList"],In=["tabListInner"],On=["nextPaginator"],Dn=["previousPaginator"],En=["content"];function Sn(l,a){}var An=["tabBodyWrapper"],Rn=["tabHeader"];function Bn(l,a){}function Ln(l,a){if(l&1&&tp(0,Bn,0,0,"ng-template",12),l&2){let e=vI().$implicit;cp("cdkPortalOutlet",e.templateLabel);}}function Nn(l,a){if(l&1&&QI(0),l&2){let e=vI().$implicit;Ap(e.textLabel);}}function Fn(l,a){if(l&1){let e=mI();ii$1(0,"div",7,2),gp("click",function(){let n=Yl(e),i=n.$implicit,p=n.$index,_=vI(),P=_I(1);return Kl(_._handleClick(i,P,p))})("cdkFocusChange",function(n){let i=Yl(e).$index,p=vI();return Kl(p._tabFocusChanged(n,i))}),lp(2,"span",8)(3,"div",9),ii$1(4,"span",10)(5,"span",11),iI(6,Ln,1,1,null,12)(7,Nn,1,1),wc()()();}if(l&2){let e=a.$implicit,t=a.$index,n=_I(1),i=vI();FI(e.labelClass),Cp("mdc-tab--active",i.selectedIndex===t),cp("id",i._getTabLabelId(e,t))("disabled",e.disabled)("fitInkBarToContent",i.fitInkBarToContent),ap("tabIndex",i._getTabIndex(t))("aria-posinset",t+1)("aria-setsize",i._tabs.length)("aria-controls",i._getTabContentId(t))("aria-selected",i.selectedIndex===t)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),ky(3),cp("matRippleTrigger",n)("matRippleDisabled",e.disabled||i.disableRipple),ky(3),sI(e.templateLabel?6:7);}}function qn(l,a){l&1&&DI(0);}function zn(l,a){if(l&1){let e=mI();ii$1(0,"mat-tab-body",13),gp("_onCentered",function(){Yl(e);let n=vI();return Kl(n._removeTabBodyWrapperHeight())})("_onCentering",function(n){Yl(e);let i=vI();return Kl(i._setTabBodyWrapperHeight(n))})("_beforeCentering",function(n){Yl(e);let i=vI();return Kl(i._bodyCentered(n))}),wc();}if(l&2){let e=a.$implicit,t=a.$index,n=vI();FI(e.bodyClass),cp("id",n._getTabContentId(t))("content",e.content)("position",e.position)("animationDuration",n._bodyAnimationDuration)("preserveContent",n.preserveContent),ap("tabindex",n.contentTabIndex!=null&&n.selectedIndex===t?n.contentTabIndex:null)("aria-labelledby",n._getTabLabelId(e,t))("aria-hidden",n.selectedIndex!==t);}}var Hn=new N("MatTabContent"),Vn=(()=>{class l{template=D(ur);static \u0275fac=function(t){return new(t||l)};static \u0275dir=VE({type:l,selectors:[["","matTabContent",""]],features:[iD([{provide:Hn,useExisting:l}])]})}return l})(),Wn=new N("MatTabLabel"),pn=new N("MAT_TAB"),jn=(()=>{class l extends pi$1{_closestTab=D(pn,{optional:true});static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(l)))(n||l)}})();static \u0275dir=VE({type:l,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[iD([{provide:Wn,useExisting:l}]),Xf]})}return l})(),gn=new N("MAT_TAB_GROUP"),Dt=(()=>{class l{_viewContainerRef=D(Ii);_closestTabGroup=D(gn,{optional:true});disabled=false;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e);}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new te;position=null;origin=null;isActive=false;constructor(){D(q$1).load(sh);}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next();}ngOnDestroy(){this._stateChanges.complete();}ngOnInit(){this._contentPortal=new L(this._explicitContent||this._implicitContent,this._viewContainerRef);}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e);}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=OE({type:l,selectors:[["mat-tab"]],contentQueries:function(t,n,i){if(t&1&&vp(i,jn,5)(i,Vn,7,ur),t&2){let p;TI(p=bI())&&(n.templateLabel=p.first),TI(p=bI())&&(n._explicitContent=p.first);}},viewQuery:function(t,n){if(t&1&&Ep(ur,7),t&2){let i;TI(i=bI())&&(n._implicitContent=i.first);}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(t,n){t&2&&ap("id",null);},inputs:{disabled:[2,"disabled","disabled",YL],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[iD([{provide:pn,useExisting:l}]),im],ngContentSelectors:Ot,decls:1,vars:0,template:function(t,n){t&1&&(II(),np(0,kn,1,0,"ng-template"));},encapsulation:2,changeDetection:1})}return l})(),Mt="mdc-tab-indicator--active",dn="mdc-tab-indicator--no-transition",Pt=class{_items;_currentItem;constructor(a){this._items=a;}hide(){this._items.forEach(a=>a.deactivateInkBar()),this._currentItem=void 0;}alignToElement(a){let e=this._items.find(n=>n.elementRef.nativeElement===a),t=this._currentItem;if(e!==t&&(t?.deactivateInkBar(),e)){let n=t?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(n),this._currentItem=e;}}},Qn=(()=>{class l{_elementRef=D(mr);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=false;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement());}activateInkBar(e){let t=this._elementRef.nativeElement;if(!e||!t.getBoundingClientRect||!this._inkBarContentElement){t.classList.add(Mt);return}let n=t.getBoundingClientRect(),i=e.width/n.width,p=e.left-n.left;t.classList.add(dn),this._inkBarContentElement.style.setProperty("transform",`translateX(${p}px) scaleX(${i})`),t.getBoundingClientRect(),t.classList.remove(dn),t.classList.add(Mt),this._inkBarContentElement.style.setProperty("transform","");}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Mt);}ngOnInit(){this._createInkBarElement();}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null;}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,t=this._inkBarElement=e.createElement("span"),n=this._inkBarContentElement=e.createElement("span");t.className="mdc-tab-indicator",n.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",t.appendChild(this._inkBarContentElement),this._appendInkBarElement();}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement);}static \u0275fac=function(t){return new(t||l)};static \u0275dir=VE({type:l,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",YL]}})}return l})();var bn=(()=>{class l extends Qn{elementRef=D(mr);disabled=false;focus(){this.elementRef.nativeElement.focus();}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(l)))(n||l)}})();static \u0275dir=VE({type:l,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(t,n){t&2&&(ap("aria-disabled",!!n.disabled),Cp("mat-mdc-tab-disabled",n.disabled));},inputs:{disabled:[2,"disabled","disabled",YL]},features:[Xf]})}return l})(),cn={passive:true},Gn=650,Un=100,$n=(()=>{class l{_elementRef=D(mr);_changeDetectorRef=D(QL);_viewportRuler=D(T);_dir=D(Is,{optional:true});_ngZone=D(Se);_platform=D(w);_sharedResizeObserver=D(An$1);_injector=D(me);_renderer=D(jv);_animationsDisabled=ct();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=false;_destroyed=new te;_showPaginationControls=false;_disableScrollAfter=true;_disableScrollBefore=true;_tabLabelCount;_scrollDistanceChanged=false;_keyManager;_currentTextContent;_stopScrolling=new te;disablePagination=false;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let t=isNaN(e)?0:e;this._selectedIndex!=t&&(this._selectedIndexChanged=true,this._selectedIndex=t,this._keyManager&&this._keyManager.updateActiveItem(t));}_selectedIndex=0;selectFocusedIndex=new $e$1;indexFocused=new $e$1;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())]);}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),cn),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),cn));}ngAfterContentInit(){let e=this._dir?this._dir.change:vh("ltr"),t=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Fh(32),Yh(this._destroyed)),n=this._viewportRuler.change(150).pipe(Yh(this._destroyed)),i=()=>{this.updatePagination(),this._alignInkBarToSelectedTab();};this._keyManager=new en(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>false),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),Ly(i,{injector:this._injector}),Rh(e,n,t,this._items.changes,this._itemsResized()).pipe(Yh(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),i();});}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection());}),this._keyManager.change.subscribe(p=>{this.indexFocused.emit(p),this._setTabFocus(p);});}_itemsResized(){return typeof ResizeObserver!="function"?ht:this._items.changes.pipe(Qh(this._items),Zh(e=>new M(t=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(i=>t.next(i));return e.forEach(i=>n.observe(i.elementRef.nativeElement)),()=>{n.disconnect();}}))),zh(1),Qt$1(e=>e.some(t=>t.contentRect.width>0&&t.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=false,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=false,this._changeDetectorRef.markForCheck());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete();}_handleKeydown(e){if(!Hr(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let t=this._items.get(this.focusIndex);t&&!t.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e));}break;default:this._keyManager?.onKeydown(e);}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck();}));}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition();}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e);}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:true}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let t=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?t.scrollLeft=0:t.scrollLeft=t.scrollWidth-t.offsetWidth;}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,t=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(t)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0);}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e);}_scrollHeader(e){let t=this._tabListContainer.nativeElement.offsetWidth,n=(e=="before"?-1:1)*t/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e);}_scrollToLabel(e){if(this.disablePagination)return;let t=this._items?this._items.toArray()[e]:null;if(!t)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:i,offsetWidth:p}=t.elementRef.nativeElement,_,P;this._getLayoutDirection()=="ltr"?(_=i,P=_+p):(P=this._tabListInner.nativeElement.offsetWidth-i,_=P-p);let ye=this.scrollDistance,Ee=this.scrollDistance+n;_<ye?this.scrollDistance-=ye-_:P>Ee&&(this.scrollDistance+=Math.min(P-Ee,_-ye));}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=false;else {let e=this._tabListInner.nativeElement.scrollWidth,t=this._elementRef.nativeElement.offsetWidth,n=e-t>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck());}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=true:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck());}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,t=this._tabListContainer.nativeElement.offsetWidth;return e-t||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,t=e?e.elementRef.nativeElement:null;t?this._inkBar.alignToElement(t):this._inkBar.hide();}_stopInterval(){this._stopScrolling.next();}_handlePaginatorPress(e,t){t&&t.button!=null&&t.button!==0||(this._stopInterval(),mt$1(Gn,Un).pipe(Yh(Rh(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:i}=this._scrollHeader(e);(i===0||i>=n)&&this._stopInterval();}));}_scrollTo(e){if(this.disablePagination)return {maxScrollDistance:0,distance:0};let t=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(t,e)),this._scrollDistanceChanged=true,this._checkScrollingControls(),{maxScrollDistance:t,distance:this._scrollDistance}}static \u0275fac=function(t){return new(t||l)};static \u0275dir=VE({type:l,inputs:{disablePagination:[2,"disablePagination","disablePagination",YL],selectedIndex:[2,"selectedIndex","selectedIndex",KL]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return l})(),Kn=(()=>{class l extends $n{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=false;ngAfterContentInit(){this._inkBar=new Pt(this._items),super.ngAfterContentInit();}_itemSelected(e){e.preventDefault();}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(l)))(n||l)}})();static \u0275cmp=OE({type:l,selectors:[["mat-tab-header"]],contentQueries:function(t,n,i){if(t&1&&vp(i,bn,4),t&2){let p;TI(p=bI())&&(n._items=p);}},viewQuery:function(t,n){if(t&1&&Ep(Pn,7)(Tn,7)(In,7)(On,5)(Dn,5),t&2){let i;TI(i=bI())&&(n._tabListContainer=i.first),TI(i=bI())&&(n._tabList=i.first),TI(i=bI())&&(n._tabListInner=i.first),TI(i=bI())&&(n._nextPaginator=i.first),TI(i=bI())&&(n._previousPaginator=i.first);}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(t,n){t&2&&Cp("mat-mdc-tab-header-pagination-controls-enabled",n._showPaginationControls)("mat-mdc-tab-header-rtl",n._getLayoutDirection()=="rtl");},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",YL]},features:[Xf],ngContentSelectors:Ot,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(t,n){t&1&&(II(),ii$1(0,"div",5,0),gp("click",function(){return n._handlePaginatorClick("before")})("mousedown",function(p){return n._handlePaginatorPress("before",p)})("touchend",function(){return n._stopInterval()}),lp(2,"div",6),wc(),ii$1(3,"div",7,1),gp("keydown",function(p){return n._handleKeydown(p)}),ii$1(5,"div",8,2),gp("cdkObserveContent",function(){return n._onContentChanges()}),ii$1(7,"div",9,3),DI(9),wc()()(),ii$1(10,"div",10,4),gp("mousedown",function(p){return n._handlePaginatorPress("after",p)})("click",function(){return n._handlePaginatorClick("after")})("touchend",function(){return n._stopInterval()}),lp(12,"div",6),wc()),t&2&&(Cp("mat-mdc-tab-header-pagination-disabled",n._disableScrollBefore),cp("matRippleDisabled",n._disableScrollBefore||n.disableRipple),ky(3),Cp("_mat-animation-noopable",n._animationsDisabled),ky(2),ap("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby||null),ky(5),Cp("mat-mdc-tab-header-pagination-disabled",n._disableScrollAfter),cp("matRippleDisabled",n._disableScrollAfter||n.disableRipple));},dependencies:[nh,wd],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-header-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2,changeDetection:1})}return l})(),Zn=new N("MAT_TABS_CONFIG"),mn=(()=>{class l extends _i$1{_host=D(Tt);_ngZone=D(Se);_centeringSub=U$1.EMPTY;_leavingSub=U$1.EMPTY;ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Qh(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content);});}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach());});}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe();}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(l)))(n||l)}})();static \u0275dir=VE({type:l,selectors:[["","matTabBodyHost",""]],features:[Xf]})}return l})(),Tt=(()=>{class l{_elementRef=D(mr);_dir=D(Is,{optional:true});_ngZone=D(Se);_injector=D(me);_renderer=D(jv);_diAnimationsDisabled=ct();_eventCleanups;_initialized=false;_fallbackTimer;_positionIndex;_dirChangeSubscription=U$1.EMPTY;_position;_previousPosition;_onCentering=new $e$1;_beforeCentering=new $e$1;_afterLeavingCenter=new $e$1;_onCentered=new $e$1(true);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=false;set position(e){this._positionIndex=e,this._computePositionAnimationState();}constructor(){if(this._dir){let e=D(QL);this._dirChangeSubscription=this._dir.change.subscribe(t=>{this._computePositionAnimationState(t),e.markForCheck();});}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(true),Ly(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=true;}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe();}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,t=n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),n.type==="transitionend"&&this._transitionDone());};this._eventCleanups=[this._renderer.listen(e,"transitionstart",n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted());}),this._renderer.listen(e,"transitionend",t),this._renderer.listen(e,"transitioncancel",t)];});}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight);}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit();}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e);}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)));}_simulateTransitionEvents(){this._transitionStarted(),Ly(()=>this._transitionDone(),{injector:this._injector});}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=OE({type:l,selectors:[["mat-tab-body"]],viewQuery:function(t,n){if(t&1&&Ep(mn,5)(En,5),t&2){let i;TI(i=bI())&&(n._portalHost=i.first),TI(i=bI())&&(n._contentElement=i.first);}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(t,n){t&2&&ap("inert",n._position==="center"?null:"");},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(t,n){t&1&&(ii$1(0,"div",1,0),tp(2,Sn,0,0,"ng-template",2),wc()),t&2&&Cp("mat-tab-body-content-left",n._position==="left")("mat-tab-body-content-right",n._position==="right")("mat-tab-body-content-can-animate",n._position==="center"||n._previousPosition==="center");},dependencies:[mn,he],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-body-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2,changeDetection:1})}return l})(),un=(()=>{class l{_elementRef=D(mr);_changeDetectorRef=D(QL);_ngZone=D(Se);_tabsSubscription=U$1.EMPTY;_tabLabelSubscription=U$1.EMPTY;_tabBodySubscription=U$1.EMPTY;_diAnimationsDisabled=ct();_bodyAnimationDuration;_headerAnimationDuration;_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Wo;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck();}_fitInkBarToContent=false;stretchTabs=true;alignTabs=null;dynamicHeight=false;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e;}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){this._animationDuration=e,e&&typeof e=="object"?(this._bodyAnimationDuration=kt(e.body),this._headerAnimationDuration=kt(e.header)):this._headerAnimationDuration=this._bodyAnimationDuration=kt(e);}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e;}_contentTabIndex=null;disablePagination=false;disableRipple=false;preserveContent=false;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let t=this._elementRef.nativeElement.classList;t.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&t.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e;}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new $e$1;focusChange=new $e$1;animationDone=new $e$1;selectedTabChange=new $e$1(true);_groupId;_isServer=!D(w).isBrowser;constructor(){let e=D(Zn,{optional:true});this._groupId=D(nn).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:false,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:false,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:false,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:true,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null;}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let t=this._selectedIndex==null;if(!t){this.selectedTabChange.emit(this._createChangeEvent(e));let n=this._tabBodyWrapper.nativeElement;n.style.minHeight=n.clientHeight+"px";}Promise.resolve().then(()=>{this._tabs.forEach((n,i)=>n.isActive=i===e),t||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="");});}this._tabs.forEach((t,n)=>{t.position=n-e,this._selectedIndex!=null&&t.position==0&&!t.origin&&(t.origin=e-this._selectedIndex);}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck());}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let t=this._tabs.toArray(),n;for(let i=0;i<t.length;i++)if(t[i].isActive){this._indexToSelect=this._selectedIndex=i,this._lastFocusedTabIndex=null,n=t[i];break}!n&&t[e]&&Promise.resolve().then(()=>{t[e].isActive=true,this.selectedTabChange.emit(this._createChangeEvent(e));});}this._changeDetectorRef.markForCheck();});}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(true));}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Qh(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(t=>t._closestTabGroup===this||!t._closestTabGroup)),this._tabs.notifyOnChanges();});}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe();}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab();}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination();}focusTab(e){let t=this._tabHeader;t&&(t.focusIndex=e);}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e));}_createChangeEvent(e){let t=new It;return t.index=e,this._tabs&&this._tabs.length&&(t.tab=this._tabs.toArray()[e]),t}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Rh(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck());}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,t){return e.id||`${this._groupId}-label-${t}`}_getTabContentId(e){return `${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let t=this._tabBodyWrapper.nativeElement;t.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(t.style.height=e+"px");}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit());}_handleClick(e,t,n){t.focusIndex=n,e.disabled||(this.selectedIndex=n);}_getTabIndex(e){let t=this._lastFocusedTabIndex??this.selectedIndex;return e===t?0:-1}_tabFocusChanged(e,t){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=t);}_bodyCentered(e){e&&this._tabBodies?.forEach((t,n)=>t._setActiveClass(n===this._selectedIndex));}_bodyAnimationsDisabled(){return this._diAnimationsDisabled||this._bodyAnimationDuration==="0"||this._bodyAnimationDuration==="0ms"}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=OE({type:l,selectors:[["mat-tab-group"]],contentQueries:function(t,n,i){if(t&1&&vp(i,Dt,5),t&2){let p;TI(p=bI())&&(n._allTabs=p);}},viewQuery:function(t,n){if(t&1&&Ep(An,5)(Rn,5)(Tt,5),t&2){let i;TI(i=bI())&&(n._tabBodyWrapper=i.first),TI(i=bI())&&(n._tabHeader=i.first),TI(i=bI())&&(n._tabBodies=i);}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:13,hostBindings:function(t,n){t&2&&(ap("mat-align-tabs",n.alignTabs),FI("mat-"+(n.color||"primary")),bp("--mat-tab-body-animation-duration",n._bodyAnimationDuration)("--mat-tab-header-animation-duration",n._headerAnimationDuration),Cp("mat-mdc-tab-group-dynamic-height",n.dynamicHeight)("mat-mdc-tab-group-inverted-header",n.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",n.stretchTabs));},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",YL],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",YL],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",YL],selectedIndex:[2,"selectedIndex","selectedIndex",KL],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",KL],disablePagination:[2,"disablePagination","disablePagination",YL],disableRipple:[2,"disableRipple","disableRipple",YL],preserveContent:[2,"preserveContent","preserveContent",YL],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[iD([{provide:gn,useExisting:l}])],ngContentSelectors:Ot,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(t,n){t&1&&(II(),ii$1(0,"mat-tab-header",3,0),gp("indexFocused",function(p){return n._focusChanged(p)})("selectFocusedIndex",function(p){return n.selectedIndex=p}),lI(2,Fn,8,17,"div",4,cI),wc(),iI(4,qn,1,0),ii$1(5,"div",5,1),lI(7,zn,1,10,"mat-tab-body",6,cI),wc()),t&2&&(cp("selectedIndex",n.selectedIndex||0)("disableRipple",n.disableRipple)("disablePagination",n.disablePagination),sp("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby),ky(2),uI(n._tabs),ky(2),sI(n._isServer?4:-1),ky(),Cp("_mat-animation-noopable",n._bodyAnimationsDisabled()),ky(2),uI(n._tabs));},dependencies:[Kn,bn,ns,nh,_i$1,Tt],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-header-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2,changeDetection:1})}return l})(),It=class{index;tab};function kt(l){let a=l+"";return /^\d+$/.test(a)?l+"ms":a}var hn=(()=>{class l{static \u0275fac=function(t){return new(t||l)};static \u0275mod=LE({type:l});static \u0275inj=Cl({imports:[qr]})}return l})();var Yn=()=>({standalone:true}),Et=(l,a)=>a.id;function Jn(l,a){if(l&1&&(ii$1(0,"mat-form-field",2)(1,"mat-label"),QI(2,"Usuario"),wc(),lp(3,"input",12),wc()),l&2){let e=vI();ky(3),cp("value",e.data.asignacion?.usuarioNombre||"");}}function ei(l,a){if(l&1&&(ii$1(0,"mat-option",5),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function ti(l,a){if(l&1){let e=mI();ii$1(0,"mat-form-field",2)(1,"mat-label"),QI(2,"Usuario (empleado del HelpDesk)"),wc(),ii$1(3,"mat-select",13),Pp("ngModelChange",function(n){Yl(e);let i=vI();return XI(i.form.usuarioHid,n)||(i.form.usuarioHid=n),Kl(n)}),ii$1(4,"div",14),gp("click",function(n){return n.stopPropagation()}),ii$1(5,"input",15),gp("ngModelChange",function(n){Yl(e);let i=vI();return Kl(i.hdBuscar.set(n))})("click",function(n){return n.stopPropagation()})("keydown",function(n){return n.stopPropagation()}),wc(),Wv(),wc(),lI(6,ei,2,2,"mat-option",5,Et),wc(),Wv(),wc();}if(l&2){let e=vI();ky(3),Op("ngModel",e.form.usuarioHid),zv(),ky(2),cp("ngModel",e.hdBuscar())("ngModelOptions",sD(3,Yn)),zv(),ky(),uI(e.hdFiltrados());}}function ni(l,a){if(l&1&&(ii$1(0,"mat-option",5),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.nombre);}}function ii(l,a){if(l&1&&(ii$1(0,"mat-option",5),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e),ky(),Ap(e);}}function ai(l,a){if(l&1&&(ii$1(0,"mat-option",5),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.label);}}function oi(l,a){if(l&1){let e=mI();ii$1(0,"mat-form-field",2)(1,"mat-label"),QI(2),wc(),ii$1(3,"mat-select",16),Pp("ngModelChange",function(n){Yl(e);let i=vI();return XI(i.form.objetivoId,n)||(i.form.objetivoId=n),Kl(n)}),lI(4,ai,2,2,"mat-option",5,Et),wc(),Wv(),wc();}if(l&2){let e=vI();ky(2),Ap(e.tipo()==="EQUIPO"?"Equipo":e.tipo()==="CLIENTE"?"Cliente":"Regional"),ky(),Op("ngModel",e.form.objetivoId),zv(),ky(),uI(e.objetivos());}}var qe=class l{api=D(u);hd=D(q);auth=D(Yp);snack=D(Qt);ref=D(O);data=D($e);roles=this.data.roles;guardando=Ft(false);tipo=Ft("EQUIPO");editando=!!this.data.asignacion;puedeAsignarAdmin=this.auth.puedeAsignarAdmin;rolesVisibles=K(()=>this.puedeAsignarAdmin()||this.data.asignacion?.rolCodigo==="ADMIN"?this.roles:this.roles.filter(a=>a.codigo!=="ADMIN"));tipos=["EQUIPO","CLIENTE","REGIONAL","GLOBAL"];hdUsers=this.hd.hdUsers;hdBuscar=Ft("");hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=this.hdUsers();return a?e.filter(t=>t.name.toLowerCase().includes(a)||String(t.id).toLowerCase().includes(a)):e});objetivos=K(()=>{switch(this.tipo()){case "EQUIPO":return this.data.equipos.map(a=>({id:a.id,label:`${a.nombre} \xB7 ${a.regionalNombre}`}));case "CLIENTE":return this.data.clientes.map(a=>({id:a.id,label:a.nombre}));case "REGIONAL":return this.data.regionales.map(a=>({id:a.id,label:a.nombre}));default:return []}});form={usuarioHid:this.data.usuarioPreHid??null,rolId:null,objetivoId:null,vigenteDesde:"",vigenteHasta:""};constructor(){this.hd.getHdUsers();let a=this.data.asignacion;a&&(this.tipo.set(a.alcanceTipo||"EQUIPO"),this.form={usuarioHid:null,rolId:a.rolId,objetivoId:a.alcanceObjetivoId??null,vigenteDesde:a.vigenteDesde??"",vigenteHasta:a.vigenteHasta??""});}onTipoChange(a){this.tipo.set(a),this.form.objetivoId=null;}async crear(){let{usuarioHid:a,rolId:e,objetivoId:t,vigenteDesde:n,vigenteHasta:i}=this.form,p=this.tipo();if(!this.editando&&!a||!e||p!=="GLOBAL"&&!t){this.snack.open("Eleg\xED usuario, rol y el alcance.","OK",{duration:3500});return}if(this.roles.find(P=>P.id===e)?.codigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede asignar el rol ADMIN.","OK",{duration:4e3});return}let _={rolId:e,alcanceTipo:p};p==="EQUIPO"&&(_.alcanceEquipoId=t),p==="CLIENTE"&&(_.alcanceClienteId=t),p==="REGIONAL"&&(_.alcanceRegionalId=t),n&&(_.vigenteDesde=n),this.editando||(_.helpdeskUserId=String(a),_.usuarioNombre=this.hdUsers().find(P=>String(P.id)===String(a))?.name),this.guardando.set(true);try{let P=this.editando?await this.api.actualizarAsignacion(this.data.asignacion.id,$(B({},_),{vigenteHasta:i||null})):await this.api.crearAsignacion(i?$(B({},_),{vigenteHasta:i}):_);this.ref.close(P);}catch(P){let ye=P?.error?.error,Ee=this.editando?"editar":"crear";this.snack.open(ye?`No se pudo ${Ee} la asignaci\xF3n. ${ye}`:`No se pudo ${Ee} la asignaci\xF3n.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-crear-asignacion-dialog"]],decls:34,vars:10,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["appearance","outline"],["name","r",3,"ngModelChange","ngModel"],[3,"value"],["name","t",3,"selectionChange","value"],["matInput","","type","date","name","vd",3,"ngModelChange","ngModel"],["matInput","","type","date","name","vh",3,"ngModelChange","ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["matInput","","disabled","",3,"value"],["name","u",3,"ngModelChange","ngModel"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar empleado\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],["name","o",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1),wc(),ii$1(2,"mat-dialog-content")(3,"div",1),iI(4,Jn,4,1,"mat-form-field",2)(5,ti,8,4,"mat-form-field",2),ii$1(6,"mat-form-field",3)(7,"mat-label"),QI(8,"Rol"),wc(),ii$1(9,"mat-select",4),Pp("ngModelChange",function(i){return XI(t.form.rolId,i)||(t.form.rolId=i),i}),lI(10,ni,2,2,"mat-option",5,Et),wc(),Wv(),wc(),ii$1(12,"mat-form-field",3)(13,"mat-label"),QI(14,"Alcance"),wc(),ii$1(15,"mat-select",6),gp("selectionChange",function(i){return t.onTipoChange(i.value)}),lI(16,ii,2,2,"mat-option",5,cI),wc()(),iI(18,oi,6,2,"mat-form-field",2),ii$1(19,"mat-form-field",3)(20,"mat-label"),QI(21,"Vigente desde"),wc(),ii$1(22,"input",7),Pp("ngModelChange",function(i){return XI(t.form.vigenteDesde,i)||(t.form.vigenteDesde=i),i}),wc(),Wv(),wc(),ii$1(23,"mat-form-field",3)(24,"mat-label"),QI(25,"Vigente hasta (opcional)"),wc(),ii$1(26,"input",8),Pp("ngModelChange",function(i){return XI(t.form.vigenteHasta,i)||(t.form.vigenteHasta=i),i}),wc(),Wv(),wc()()(),ii$1(27,"mat-dialog-actions",9)(28,"button",10),gp("click",function(){return t.cancelar()}),QI(29,"Cancelar"),wc(),ii$1(30,"button",11),gp("click",function(){return t.crear()}),ii$1(31,"mat-icon"),QI(32),wc(),QI(33),wc()()),e&2&&(ky(),Ap(t.editando?"Editar asignaci\xF3n":"Nueva asignaci\xF3n"),ky(3),sI(t.editando?4:5),ky(5),Op("ngModel",t.form.rolId),zv(),ky(),uI(t.rolesVisibles()),ky(5),cp("value",t.tipo()),ky(),uI(t.tipos),ky(2),sI(t.tipo()!=="GLOBAL"?18:-1),ky(4),Op("ngModel",t.form.vigenteDesde),zv(),ky(4),Op("ngModel",t.form.vigenteHasta),zv(),ky(4),cp("disabled",t.guardando()),ky(2),Ap(t.editando?"save":"add"),ky(),Mc(" ",t.editando?"Guardar":"Crear asignaci\xF3n"," "));},dependencies:[Ko,an,Zo,Ni,Ht,Nt,zt,Vt,ba,ha,yt,wt,fe,jn$1,de,Ar,Fr,Ft$1,Rt,J],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var fn=()=>({standalone:true}),vn=(l,a)=>a.id;function ri(l,a){if(l&1&&(ii$1(0,"mat-option",6),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function li(l,a){if(l&1&&(ii$1(0,"mat-option",6),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),kp("",e.nombre," \xB7 ",e.regionalNombre);}}function si(l,a){if(l&1){let e=mI();ii$1(0,"button",22),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.elegirColor(n))}),wc();}if(l&2){let e=a.$implicit,t=vI();bp("background",e),Cp("sel",t.mismoColor(t.form.color,e)),cp("title",e),ap("aria-label","Color "+e);}}function di(l,a){if(l&1){let e=mI();ii$1(0,"button",23),gp("click",function(){Yl(e);let n=vI();return Kl(n.elegirColor(""))}),ii$1(1,"mat-icon"),QI(2,"close"),wc()();}}var mt=class l{api=D(u);hd=D(q);snack=D(Qt);ref=D(O);data=D($e);equipos=this.data.equipos;hdClientes=this.hd.clients;hdBuscar=Ft("");guardando=Ft(false);hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=new Set(this.data.yaRegistrados.map(n=>String(n))),t=this.hdClientes().filter(n=>!e.has(String(n.id)));return a?t.filter(n=>n.name.toLowerCase().includes(a)||String(n.id).includes(a)):t});form={codigo:"",nombre:"",equipoResponsableId:null,helpdeskClientId:"",color:""};palette=["#E74C3C","#E67E22","#F2811D","#F1C40F","#27AE60","#16A085","#1ABC9C","#2980B9","#04BAF0","#3498DB","#9B59B6","#8E44AD","#D35400","#C0392B","#2C3E50","#7F8C8D"];constructor(){this.hd.getClients();}elegirColor(a){this.form.color=a;}mismoColor(a,e){return !!a&&!!e&&a.toLowerCase()===e.toLowerCase()}elegirHdCliente(a){let e=this.hdClientes().find(t=>String(t.id)===String(a));e&&(this.form.helpdeskClientId=String(e.id),this.form.nombre=e.name,this.form.codigo.trim()||(this.form.codigo=e.name.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,40)));}async crear(){let{codigo:a,nombre:e,equipoResponsableId:t,helpdeskClientId:n,color:i}=this.form;if(!a.trim()||!e.trim()||!t){this.snack.open("Complet\xE1 c\xF3digo, nombre y equipo responsable.","OK",{duration:3500});return}this.guardando.set(true);try{let p=await this.api.crearCliente({codigo:a.trim().toLowerCase(),nombre:e.trim(),equipoResponsableId:t,helpdeskClientId:n.trim()||void 0,color:i.trim()||void 0});this.ref.close(p);}catch(p){let _=p?.error?.error;this.snack.open(_?`No se pudo crear el cliente. ${_}`:"No se pudo crear el cliente.","OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-crear-cliente-dialog"]],decls:48,vars:15,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["placeholder","Buscar cliente del API\u2026",3,"selectionChange","value"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],[3,"value"],["appearance","outline"],["matInput","","name","cc","placeholder","visandes",3,"ngModelChange","ngModel"],["matInput","","name","cn","placeholder","VISANDES",3,"ngModelChange","ngModel"],["name","ce",3,"ngModelChange","ngModel"],["matInput","","name","ch","placeholder","15",3,"ngModelChange","ngModel"],[1,"color-field","full"],[1,"color-label"],[1,"swatches"],["type","button",1,"swatch",3,"background","sel","title"],["title","Color personalizado",1,"swatch","custom"],["type","color","name","colp",3,"ngModelChange","ngModel","ngModelOptions"],["type","button","title","Sin color",1,"swatch","clear"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["type","button",1,"swatch",3,"click","title"],["type","button","title","Sin color",1,"swatch","clear",3,"click"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1,"Nuevo cliente"),wc(),ii$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),QI(6,"Tomar del HelpDesk"),wc(),ii$1(7,"mat-select",3),gp("selectionChange",function(i){return t.elegirHdCliente(i.value)}),ii$1(8,"div",4),gp("click",function(i){return i.stopPropagation()}),ii$1(9,"input",5),gp("ngModelChange",function(i){return t.hdBuscar.set(i)})("click",function(i){return i.stopPropagation()})("keydown",function(i){return i.stopPropagation()}),wc(),Wv(),wc(),lI(10,ri,2,2,"mat-option",6,vn),wc()(),ii$1(12,"mat-form-field",7)(13,"mat-label"),QI(14,"C\xF3digo (slug)"),wc(),ii$1(15,"input",8),Pp("ngModelChange",function(i){return XI(t.form.codigo,i)||(t.form.codigo=i),i}),wc(),Wv(),wc(),ii$1(16,"mat-form-field",7)(17,"mat-label"),QI(18,"Nombre"),wc(),ii$1(19,"input",9),Pp("ngModelChange",function(i){return XI(t.form.nombre,i)||(t.form.nombre=i),i}),wc(),Wv(),wc(),ii$1(20,"mat-form-field",2)(21,"mat-label"),QI(22,"Equipo responsable (define la regional)"),wc(),ii$1(23,"mat-select",10),Pp("ngModelChange",function(i){return XI(t.form.equipoResponsableId,i)||(t.form.equipoResponsableId=i),i}),lI(24,li,2,3,"mat-option",6,vn),wc(),Wv(),wc(),ii$1(26,"mat-form-field",7)(27,"mat-label"),QI(28,"ID HelpDesk"),wc(),ii$1(29,"input",11),Pp("ngModelChange",function(i){return XI(t.form.helpdeskClientId,i)||(t.form.helpdeskClientId=i),i}),wc(),Wv(),wc(),ii$1(30,"div",12)(31,"span",13),QI(32,"Color"),wc(),ii$1(33,"div",14),lI(34,si,1,6,"button",15,cI),ii$1(36,"label",16)(37,"mat-icon"),QI(38,"colorize"),wc(),ii$1(39,"input",17),gp("ngModelChange",function(i){return t.elegirColor(i)}),wc(),Wv(),wc(),iI(40,di,3,0,"button",18),wc()()()(),ii$1(41,"mat-dialog-actions",19)(42,"button",20),gp("click",function(){return t.cancelar()}),QI(43,"Cancelar"),wc(),ii$1(44,"button",21),gp("click",function(){return t.crear()}),ii$1(45,"mat-icon"),QI(46,"add"),wc(),QI(47," Crear cliente "),wc()()),e&2&&(ky(7),cp("value",t.form.helpdeskClientId),ky(2),cp("ngModel",t.hdBuscar())("ngModelOptions",sD(13,fn)),zv(),ky(),uI(t.hdFiltrados()),ky(5),Op("ngModel",t.form.codigo),zv(),ky(4),Op("ngModel",t.form.nombre),zv(),ky(4),Op("ngModel",t.form.equipoResponsableId),zv(),ky(),uI(t.equipos),ky(5),Op("ngModel",t.form.helpdeskClientId),zv(),ky(5),uI(t.palette),ky(2),bp("background",t.form.color||"transparent"),ky(3),cp("ngModel",t.form.color||"#888888")("ngModelOptions",sD(14,fn)),zv(),ky(),sI(t.form.color?40:-1),ky(4),cp("disabled",t.guardando()));},dependencies:[Ko,an,Zo,Ni,Ht,Nt,zt,Vt,ba,ha,yt,wt,fe,jn$1,de,Ar,Fr,Ft$1,Rt,J],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var ci=["switch"],mi=["*"];function pi(l,a){l&1&&(ii$1(0,"span",11),lu(),ii$1(1,"svg",13),lp(2,"path",14),wc(),ii$1(3,"svg",15),lp(4,"path",16),wc()());}var gi=new N("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:false,hideIcon:false,disabledInteractive:false})}),pt=class{source;checked;constructor(a,e){this.source=a,this.checked=e;}},We=(()=>{class l{_elementRef=D(mr);_focusMonitor=D(Ir);_changeDetectorRef=D(QL);defaults=D(gi);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=false;_createChangeEvent(e){return new pt(this,e)}_labelId;get buttonId(){return `${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus();}_noopAnimations=ct();_focused=false;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=false;color;disabled=false;disableRipple=false;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck();}hideIcon;disabledInteractive;change=new $e$1;toggleChange=new $e$1;get inputId(){return `${this.id||this._uniqueId}-input`}constructor(){D(q$1).load(sh);let e=D(new Up("tabindex"),{optional:true}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=D(nn).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??false,this.disabledInteractive=t.disabledInteractive??false,this._labelId=this._uniqueId+"-label";}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=true,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=false,this._onTouched(),this._changeDetectorRef.markForCheck();});});}ngOnChanges(e){e.required&&this._validatorOnChange();}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef);}writeValue(e){this.checked=!!e;}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorOnChange=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck();}toggle(){this.checked=!this.checked,this._onChange(this.checked);}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked));}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new pt(this,this.checked))));}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=OE({type:l,selectors:[["mat-slide-toggle"]],viewQuery:function(t,n){if(t&1&&Ep(ci,5),t&2){let i;TI(i=bI())&&(n._switchElement=i.first);}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,n){t&2&&(pp("id",n.id),ap("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),FI(n.color?"mat-"+n.color:""),Cp("mat-mdc-slide-toggle-focused",n._focused)("mat-mdc-slide-toggle-checked",n.checked)("_mat-animation-noopable",n._noopAnimations));},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",YL],color:"color",disabled:[2,"disabled","disabled",YL],disableRipple:[2,"disableRipple","disableRipple",YL],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:KL(e)],checked:[2,"checked","checked",YL],hideIcon:[2,"hideIcon","hideIcon",YL],disabledInteractive:[2,"disabledInteractive","disabledInteractive",YL]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[iD([{provide:Yt,useExisting:ao(()=>l),multi:true},{provide:st,useExisting:l,multi:true}]),im],ngContentSelectors:mi,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,n){if(t&1&&(II(),ii$1(0,"div",1)(1,"button",2,0),gp("click",function(){return n._handleClick()}),lp(3,"div",3)(4,"span",4),ii$1(5,"span",5)(6,"span",6)(7,"span",7),lp(8,"span",8),wc(),ii$1(9,"span",9),lp(10,"span",10),wc(),iI(11,pi,5,0,"span",11),wc()()(),ii$1(12,"label",12),gp("click",function(p){return p.stopPropagation()}),DI(13),wc()()),t&2){let i=_I(2);cp("labelPosition",n.labelPosition),ky(),Cp("mdc-switch--selected",n.checked)("mdc-switch--unselected",!n.checked)("mdc-switch--checked",n.checked)("mdc-switch--disabled",n.disabled)("mat-mdc-slide-toggle-disabled-interactive",n.disabledInteractive),cp("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("disabled",n.disabled&&!n.disabledInteractive),ap("id",n.buttonId)("name",n.name)("aria-label",n.ariaLabel)("aria-labelledby",n._getAriaLabelledBy())("aria-describedby",n.ariaDescribedby)("aria-required",n.required||null)("aria-checked",n.checked)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),ky(9),cp("matRippleTrigger",i)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",true),ky(),sI(n.hideIcon?-1:11),ky(),cp("for",n.buttonId),ap("id",n._labelId);}},dependencies:[nh,m],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return l})(),gt=(()=>{class l{static \u0275fac=function(t){return new(t||l)};static \u0275mod=LE({type:l});static \u0275inj=Cl({imports:[We,qr]})}return l})();var bi=()=>({standalone:true}),Cn=(l,a)=>a.id;function ui(l,a){if(l&1&&(ii$1(0,"mat-option",4),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.nombre);}}function hi(l,a){if(l&1&&(ii$1(0,"mat-option",4),QI(1),wc()),l&2){let e=a.$implicit;cp("value",e.id),ky(),Ap(e.name);}}function _i(l,a){if(l&1){let e=mI();ii$1(0,"mat-slide-toggle",15),Pp("ngModelChange",function(n){Yl(e);let i=vI();return XI(i.form.activo,n)||(i.form.activo=n),Kl(n)}),QI(1),wc(),Wv();}if(l&2){let e=vI();Op("ngModel",e.form.activo),zv(),ky(),Mc(" ",e.form.activo?"Activo":"Inactivo"," ");}}var je=class l{api=D(u);hd=D(q);snack=D(Qt);ref=D(O);data=D($e);regionales=this.data.regionales;guardando=Ft(false);editando=!!this.data.equipo;hdUsers=this.hd.hdUsers;hdBuscar=Ft("");hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=this.hdUsers();return a?e.filter(t=>t.name.toLowerCase().includes(a)||String(t.id).toLowerCase().includes(a)):e});form={regionalId:null,codigo:"",nombre:"",responsableHid:null,activo:true};constructor(){this.hd.getHdUsers();let a=this.data.equipo;a&&(this.form={regionalId:a.regionalId,codigo:a.codigo,nombre:a.nombre,responsableHid:a.responsableHelpdeskUserId??null,activo:a.activo});}async crear(){let{regionalId:a,codigo:e,nombre:t,responsableHid:n,activo:i}=this.form;if(!a||!e.trim()||!t.trim()){this.snack.open("Complet\xE1 regional, c\xF3digo y nombre.","OK",{duration:3500});return}this.guardando.set(true);try{let p={};n&&(p.responsableHelpdeskUserId=String(n),p.responsableNombre=this.hdUsers().find(P=>String(P.id)===String(n))?.name);let _;this.editando?_=await this.api.actualizarEquipo(this.data.equipo.id,B({regionalId:a,nombre:t.trim(),activo:i},p)):_=await this.api.crearEquipo(B({regionalId:a,codigo:e.trim().toUpperCase(),nombre:t.trim()},p)),this.ref.close(_);}catch(p){let _=p?.error?.error,P=this.editando?"editar":"crear";this.snack.open(_?`No se pudo ${P} el equipo. ${_}`:`No se pudo ${P} el equipo.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-crear-equipo-dialog"]],decls:36,vars:14,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["name","er",3,"ngModelChange","ngModel"],[3,"value"],["appearance","outline"],["matInput","","name","ec","placeholder","QUITO",3,"ngModelChange","ngModel","disabled"],["matInput","","name","en","placeholder","Equipo Quito",3,"ngModelChange","ngModel"],["name","resp",3,"ngModelChange","ngModel"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar empleado\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],["name","ea",1,"full",3,"ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["name","ea",1,"full",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1),wc(),ii$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),QI(6,"Regional"),wc(),ii$1(7,"mat-select",3),Pp("ngModelChange",function(i){return XI(t.form.regionalId,i)||(t.form.regionalId=i),i}),lI(8,ui,2,2,"mat-option",4,Cn),wc(),Wv(),wc(),ii$1(10,"mat-form-field",5)(11,"mat-label"),QI(12,"C\xF3digo"),wc(),ii$1(13,"input",6),Pp("ngModelChange",function(i){return XI(t.form.codigo,i)||(t.form.codigo=i),i}),wc(),Wv(),wc(),ii$1(14,"mat-form-field",5)(15,"mat-label"),QI(16,"Nombre"),wc(),ii$1(17,"input",7),Pp("ngModelChange",function(i){return XI(t.form.nombre,i)||(t.form.nombre=i),i}),wc(),Wv(),wc(),ii$1(18,"mat-form-field",2)(19,"mat-label"),QI(20,"Responsable de equipo (opcional, del HelpDesk)"),wc(),ii$1(21,"mat-select",8),Pp("ngModelChange",function(i){return XI(t.form.responsableHid,i)||(t.form.responsableHid=i),i}),ii$1(22,"div",9),gp("click",function(i){return i.stopPropagation()}),ii$1(23,"input",10),gp("ngModelChange",function(i){return t.hdBuscar.set(i)})("click",function(i){return i.stopPropagation()})("keydown",function(i){return i.stopPropagation()}),wc(),Wv(),wc(),ii$1(24,"mat-option",4),QI(25,"\u2014 sin responsable \u2014"),wc(),lI(26,hi,2,2,"mat-option",4,Cn),wc(),Wv(),wc(),iI(28,_i,2,2,"mat-slide-toggle",11),wc()(),ii$1(29,"mat-dialog-actions",12)(30,"button",13),gp("click",function(){return t.cancelar()}),QI(31,"Cancelar"),wc(),ii$1(32,"button",14),gp("click",function(){return t.crear()}),ii$1(33,"mat-icon"),QI(34),wc(),QI(35),wc()()),e&2&&(ky(),Ap(t.editando?"Editar equipo":"Nuevo equipo"),ky(6),Op("ngModel",t.form.regionalId),zv(),ky(),uI(t.regionales),ky(5),Op("ngModel",t.form.codigo),cp("disabled",t.editando),zv(),ky(4),Op("ngModel",t.form.nombre),zv(),ky(4),Op("ngModel",t.form.responsableHid),zv(),ky(2),cp("ngModel",t.hdBuscar())("ngModelOptions",sD(13,bi)),zv(),ky(),cp("value",null),ky(2),uI(t.hdFiltrados()),ky(2),sI(t.editando?28:-1),ky(4),cp("disabled",t.guardando()),ky(2),Ap(t.editando?"save":"add"),ky(),Mc(" ",t.editando?"Guardar":"Crear equipo"," "));},dependencies:[Ko,an,Zo,Ni,Ht,Nt,zt,Vt,ba,ha,yt,wt,fe,jn$1,de,Ar,Fr,Ft$1,Rt,J,gt,We],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};function fi(l,a){if(l&1){let e=mI();ii$1(0,"mat-slide-toggle",9),Pp("ngModelChange",function(n){Yl(e);let i=vI();return XI(i.form.activo,n)||(i.form.activo=n),Kl(n)}),QI(1,"Activa"),wc(),Wv();}if(l&2){let e=vI();Op("ngModel",e.form.activo),zv();}}var Qe=class l{api=D(u);snack=D(Qt);ref=D(O);data=D($e)??{};editando=!!this.data.regional;guardando=Ft(false);form={codigo:"",nombre:"",activo:true};constructor(){let a=this.data.regional;a&&(this.form={codigo:a.codigo,nombre:a.nombre,activo:a.activo});}async crear(){let a=this.form.codigo.trim(),e=this.form.nombre.trim();if(!a||!e){this.snack.open("Complet\xE1 c\xF3digo y nombre.","OK",{duration:3500});return}this.guardando.set(true);try{let t=this.editando?await this.api.actualizarRegional(this.data.regional.id,{codigo:a.toUpperCase(),nombre:e,activo:this.form.activo}):await this.api.crearRegional({codigo:a.toUpperCase(),nombre:e});this.ref.close(t);}catch(t){let n=t?.error?.error,i=this.editando?"editar":"crear";this.snack.open(n?`No se pudo ${i} la regional. ${n}`:`No se pudo ${i} la regional.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-crear-regional-dialog"]],decls:22,vars:7,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline"],["matInput","","name","rc","placeholder","QUITO",3,"ngModelChange","ngModel"],["matInput","","name","rn","placeholder","Quito",3,"ngModelChange","ngModel"],["name","ra",3,"ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["name","ra",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1),wc(),ii$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),QI(6,"C\xF3digo"),wc(),ii$1(7,"input",3),Pp("ngModelChange",function(i){return XI(t.form.codigo,i)||(t.form.codigo=i),i}),wc(),Wv(),ii$1(8,"mat-hint"),QI(9,"Se guarda en MAY\xDASCULAS. Debe ser \xFAnico."),wc()(),ii$1(10,"mat-form-field",2)(11,"mat-label"),QI(12,"Nombre"),wc(),ii$1(13,"input",4),Pp("ngModelChange",function(i){return XI(t.form.nombre,i)||(t.form.nombre=i),i}),wc(),Wv(),wc(),iI(14,fi,2,1,"mat-slide-toggle",5),wc()(),ii$1(15,"mat-dialog-actions",6)(16,"button",7),gp("click",function(){return t.cancelar()}),QI(17,"Cancelar"),wc(),ii$1(18,"button",8),gp("click",function(){return t.crear()}),ii$1(19,"mat-icon"),QI(20),wc(),QI(21),wc()()),e&2&&(ky(),Ap(t.editando?"Editar regional":"Nueva regional"),ky(6),Op("ngModel",t.form.codigo),zv(),ky(6),Op("ngModel",t.form.nombre),zv(),ky(),sI(t.editando?14:-1),ky(4),cp("disabled",t.guardando()),ky(2),Ap(t.editando?"save":"add"),ky(),Mc(" ",t.editando?"Guardar":"Crear regional"," "));},dependencies:[Ko,an,Zo,Ni,Ht,Nt,zt,Vt,ba,ha,yt,wt,fe,jn$1,de,ce,Ar,Fr,gt,We],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var bt=class l{ref=D(O);data=D($e);texto=Ft("");coincide=K(()=>this.texto().trim().toUpperCase()===this.data.codigo.trim().toUpperCase());confirmar(){this.coincide()&&this.ref.close(true);}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-eliminar-region-dialog"]],decls:28,vars:5,consts:[["mat-dialog-title","",1,"warn-title"],[1,"muted"],["appearance","outline",1,"full"],["matInput","","name","verif","autocomplete","off",3,"ngModelChange","keydown.enter","ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","warn",3,"click","disabled"]],template:function(e,t){e&1&&(ii$1(0,"h2",0)(1,"mat-icon"),QI(2,"warning"),wc(),QI(3," Eliminar regi\xF3n"),wc(),ii$1(4,"mat-dialog-content")(5,"p"),QI(6,"Vas a eliminar la regi\xF3n "),ii$1(7,"strong"),QI(8),wc(),QI(9),wc(),ii$1(10,"p",1),QI(11," Se borrar\xE1n tambi\xE9n sus "),ii$1(12,"strong"),QI(13,"equipos vac\xEDos"),wc(),QI(14," con su tablero y sprints. Se bloquea si alg\xFAn equipo tiene tareas o t\xE9cnicos exclusivos de esta regi\xF3n. "),ii$1(15,"strong"),QI(16,"Esta acci\xF3n no se puede deshacer."),wc()(),ii$1(17,"mat-form-field",2)(18,"mat-label"),QI(19),wc(),ii$1(20,"input",3),gp("ngModelChange",function(i){return t.texto.set(i)})("keydown.enter",function(){return t.confirmar()}),wc(),Wv(),wc()(),ii$1(21,"mat-dialog-actions",4)(22,"button",5),gp("click",function(){return t.ref.close(false)}),QI(23,"Cancelar"),wc(),ii$1(24,"button",6),gp("click",function(){return t.confirmar()}),ii$1(25,"mat-icon"),QI(26,"delete_outline"),wc(),QI(27," Eliminar regi\xF3n "),wc()()),e&2&&(ky(8),Ap(t.data.nombre),ky(),Mc(" (",t.data.codigo,")."),ky(10),Mc("Escribe ",t.data.codigo," para confirmar"),ky(),cp("ngModel",t.texto()),zv(),ky(4),cp("disabled",!t.coincide()));},dependencies:[Ko,an,Zo,Ni,Ht,Nt,zt,Vt,ba,ha,yt,wt,fe,jn$1,de,Ar,Fr],styles:[".full[_ngcontent-%COMP%]{width:100%}.muted[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #666);font-size:.9rem}.warn-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.warn-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#d32f2f}"]})};var ut=(l,a)=>a.id;function vi(l,a){if(l&1){let e=mI();ii$1(0,"tr")(1,"td"),QI(2),wc(),ii$1(3,"td"),QI(4),wc(),ii$1(5,"td"),QI(6),wc(),ii$1(7,"td",16)(8,"button",17),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.editarRegional(n))}),ii$1(9,"mat-icon"),QI(10,"edit"),wc()(),ii$1(11,"button",18),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.quitarRegional(n))}),ii$1(12,"mat-icon"),QI(13,"delete_outline"),wc()()()();}if(l&2){let e=a.$implicit;Cp("fila-inactiva",!e.activo),ky(2),Ap(e.codigo),ky(2),Ap(e.nombre),ky(2),Ap(e.activo?"S\xED":"No");}}function yi(l,a){if(l&1){let e=mI();ii$1(0,"tr")(1,"td"),QI(2),wc(),ii$1(3,"td"),QI(4),wc(),ii$1(5,"td"),QI(6),wc(),ii$1(7,"td"),QI(8),wc(),ii$1(9,"td"),QI(10),wc(),ii$1(11,"td",19)(12,"button",20),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.editarEquipo(n))}),ii$1(13,"mat-icon"),QI(14,"edit"),wc()()()();}if(l&2){let e=a.$implicit;Cp("fila-inactiva",!e.activo),ky(2),Ap(e.codigo),ky(2),Ap(e.nombre),ky(2),Ap(e.regionalNombre),ky(2),Ap(e.responsableNombre||"\u2014"),ky(2),Ap(e.activo?"S\xED":"No");}}function Ci(l,a){if(l&1){let e=mI();ii$1(0,"tr")(1,"td"),QI(2),wc(),ii$1(3,"td"),QI(4),wc(),ii$1(5,"td"),QI(6),wc(),ii$1(7,"td"),QI(8),wc(),ii$1(9,"td"),QI(10),wc(),ii$1(11,"td",19)(12,"button",21),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.quitarCliente(n))}),ii$1(13,"mat-icon"),QI(14,"delete_outline"),wc()()()();}if(l&2){let e=a.$implicit;ky(2),Ap(e.codigo),ky(2),Ap(e.nombre),ky(2),Ap(e.helpdeskClientId||"\u2014"),ky(2),Ap(e.equipoResponsableNombre),ky(2),Ap(e.activo?"S\xED":"No");}}function wi(l,a){if(l&1&&(ii$1(0,"span",15),QI(1),wc()),l&2){let e=vI();ky(),kp("",e.asignacionesFiltradas().length," de ",e.asignaciones().length);}}function xi(l,a){if(l&1){let e=mI();ii$1(0,"tr")(1,"td"),QI(2),wc(),ii$1(3,"td"),QI(4),wc(),ii$1(5,"td"),QI(6),wc(),ii$1(7,"td"),QI(8),wc(),ii$1(9,"td"),QI(10),wc(),ii$1(11,"td"),QI(12),wc(),ii$1(13,"td",16)(14,"button",22),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.editarAsignacion(n))}),ii$1(15,"mat-icon"),QI(16,"edit"),wc()(),ii$1(17,"button",23),gp("click",function(){let n=Yl(e).$implicit,i=vI();return Kl(i.quitarAsignacion(n))}),ii$1(18,"mat-icon"),QI(19,"delete_outline"),wc()()()();}if(l&2){let e=a.$implicit;ky(2),Ap(e.usuarioNombre),ky(2),Ap(e.rolNombre),ky(2),Ap(e.alcanceTipo),ky(2),Ap(e.alcanceNombre),ky(2),Ap(e.vigenteDesde),ky(2),Ap(e.vigenteHasta||"\u2014");}}var wn=class l{api=D(u);hd=D(q);auth=D(Yp);snack=D(Qt);dialog=D(ee);puedeAsignarAdmin=this.auth.puedeAsignarAdmin;regionales=Ft([]);equipos=Ft([]);clientes=Ft([]);roles=Ft([]);asignaciones=Ft([]);cargando=Ft(false);hdUsers=this.hd.hdUsers;asignacionesVista=K(()=>{let a=new Map(this.hdUsers().map(e=>[String(e.id),e.name]));return this.asignaciones().map(e=>{let t=e.helpdeskUserId?String(e.helpdeskUserId):"",n=t?a.get(t):void 0;return n&&n!==t?$(B({},e),{usuarioNombre:n}):e})});equiposVista=K(()=>{let a=new Map(this.hdUsers().map(e=>[String(e.id),e.name]));return this.equipos().map(e=>{let t=e.responsableHelpdeskUserId?String(e.responsableHelpdeskUserId):"",n=t?a.get(t):void 0;return n&&n!==t?$(B({},e),{responsableNombre:n}):e})});asigBuscar=Ft("");asignacionesFiltradas=K(()=>{let a=this.asigBuscar().trim().toLowerCase(),e=this.asignacionesVista();return a?e.filter(t=>(t.usuarioNombre??"").toLowerCase().includes(a)||(t.helpdeskUserId??"").toLowerCase().includes(a)||(t.rolNombre??"").toLowerCase().includes(a)||(t.alcanceNombre??"").toLowerCase().includes(a)):e});sortReg=Ft({col:"nombre",dir:1});sortEq=Ft({col:"nombre",dir:1});sortCli=Ft({col:"nombre",dir:1});sortAsig=Ft({col:"usuarioNombre",dir:1});sorts={reg:this.sortReg,eq:this.sortEq,cli:this.sortCli,asig:this.sortAsig};regionalesOrd=this.ordenar(this.regionales,this.sortReg);equiposOrd=this.ordenar(this.equiposVista,this.sortEq);clientesOrd=this.ordenar(this.clientes,this.sortCli);asignacionesOrd=this.ordenar(this.asignacionesFiltradas,this.sortAsig);constructor(){this.recargar(),this.hd.getHdUsers();}ordenar(a,e){return K(()=>{let{col:t,dir:n}=e();return [...a()].sort((i,p)=>this.cmp(i[t],p[t])*n)})}cmp(a,e){return a==null&&e==null?0:a==null?-1:e==null?1:typeof a=="number"&&typeof e=="number"?a-e:typeof a=="boolean"&&typeof e=="boolean"?a===e?0:a?1:-1:String(a).localeCompare(String(e),"es",{numeric:true,sensitivity:"base"})}ordenarPor(a,e){let t=this.sorts[a];if(!t)return;let n=t();t.set({col:e,dir:n.col===e?n.dir*-1:1});}flecha(a,e){let t=this.sorts[a]?.();return t&&t.col===e?t.dir===1?" \u25B2":" \u25BC":""}async recargar(){this.cargando.set(true);try{let[a,e,t,n,i]=await Promise.all([this.api.regionales(),this.api.equipos(),this.api.clientes(),this.api.roles(),this.api.asignaciones()]);this.regionales.set(a),this.equipos.set(e),this.clientes.set(t),this.roles.set(n),this.asignaciones.set(i);}catch{this.snack.open("No se pudieron cargar los datos de administraci\xF3n.","OK",{duration:4e3});}finally{this.cargando.set(false);}}async nuevaRegional(){await ih(this.dialog.open(Qe,{width:"420px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarRegional(a){await ih(this.dialog.open(Qe,{data:{regional:a},width:"420px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarRegional(a){if(await ih(this.dialog.open(bt,{data:{codigo:a.codigo,nombre:a.nombre},width:"440px",maxWidth:"95vw"}).afterClosed()))try{await this.api.eliminarRegional(a.id),this.snack.open("Regional eliminada","",{duration:2e3}),await this.recargar();}catch(t){let n=t?.error?.error;this.snack.open(n??"No se pudo eliminar la regional.","OK",{duration:5e3});}}async nuevoEquipo(){await ih(this.dialog.open(je,{data:{regionales:this.regionales()},width:"460px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarEquipo(a){await ih(this.dialog.open(je,{data:{regionales:this.regionales(),equipo:a},width:"460px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}equiposParaSelector(a){let e=this.equipos().filter(t=>t.activo);if(a!=null&&!e.some(t=>t.id===a)){let t=this.equipos().find(n=>n.id===a);if(t)return [...e,t]}return e}async nuevoCliente(){await ih(this.dialog.open(mt,{data:{equipos:this.equiposParaSelector(),yaRegistrados:this.clientes().map(e=>String(e.helpdeskClientId))},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarCliente(a){if(confirm(`\xBFQuitar el cliente "${a.nombre}"? Se desliga de su equipo/regi\xF3n y se borra.`))try{await this.api.eliminarCliente(a.id),this.snack.open("Cliente quitado","",{duration:2e3}),await this.recargar();}catch{this.snack.open("No se pudo quitar el cliente.","OK",{duration:4e3});}}async nuevaAsignacion(a){await ih(this.dialog.open(qe,{data:{roles:this.roles(),equipos:this.equiposParaSelector(),clientes:this.clientes(),regionales:this.regionales(),usuarioPreHid:a},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarAsignacion(a){if(a.rolCodigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede modificar asignaciones de rol ADMIN.","OK",{duration:4e3});return}await ih(this.dialog.open(qe,{data:{roles:this.roles(),equipos:this.equiposParaSelector(a.alcanceTipo==="EQUIPO"?a.alcanceObjetivoId:null),clientes:this.clientes(),regionales:this.regionales(),asignacion:a},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarAsignacion(a){if(a.rolCodigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede quitar asignaciones de rol ADMIN.","OK",{duration:4e3});return}if(confirm(`\xBFQuitar la asignaci\xF3n "${a.usuarioNombre} \xB7 ${a.rolCodigo} \xB7 ${a.alcanceNombre??""}"?`))try{await this.api.eliminarAsignacion(a.id),this.snack.open("Asignaci\xF3n quitada","",{duration:2e3}),await this.recargar();}catch{this.snack.open("No se pudo quitar la asignaci\xF3n.","OK",{duration:4e3});}}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=OE({type:l,selectors:[["app-administracion"]],decls:108,vars:21,consts:[[1,"admin"],[1,"admin-head"],["mat-stroked-button","",3,"click","disabled"],["label","Regionales"],[1,"tab-body"],[1,"tab-actions"],["mat-flat-button","","color","primary",3,"click"],[1,"grid"],[1,"sortable",3,"click"],[3,"fila-inactiva"],["label","Equipos"],["label","Clientes"],["label","Asignaciones"],[1,"buscador"],["type","search","placeholder","Buscar por nombre, rol o alcance\u2026",3,"input","value"],[1,"muted"],[1,"acciones","acciones-2"],["mat-icon-button","","title","Editar regional","aria-label","Editar regional",3,"click"],["mat-icon-button","","color","warn","title","Eliminar regional","aria-label","Eliminar regional",3,"click"],[1,"acciones"],["mat-icon-button","","title","Editar equipo","aria-label","Editar equipo",3,"click"],["mat-icon-button","","color","warn","title","Quitar cliente","aria-label","Quitar cliente",3,"click"],["mat-icon-button","","title","Editar asignaci\xF3n","aria-label","Editar asignaci\xF3n",3,"click"],["mat-icon-button","","color","warn","title","Quitar asignaci\xF3n","aria-label","Quitar asignaci\xF3n",3,"click"]],template:function(e,t){e&1&&(ii$1(0,"div",0)(1,"header",1)(2,"h1"),QI(3,"Administraci\xF3n"),wc(),ii$1(4,"button",2),gp("click",function(){return t.recargar()}),ii$1(5,"mat-icon"),QI(6,"refresh"),wc(),QI(7," Recargar "),wc()(),ii$1(8,"mat-tab-group")(9,"mat-tab",3)(10,"div",4)(11,"div",5)(12,"button",6),gp("click",function(){return t.nuevaRegional()}),ii$1(13,"mat-icon"),QI(14,"add"),wc(),QI(15," Nueva regional "),wc()(),ii$1(16,"table",7)(17,"thead")(18,"tr")(19,"th",8),gp("click",function(){return t.ordenarPor("reg","codigo")}),QI(20),wc(),ii$1(21,"th",8),gp("click",function(){return t.ordenarPor("reg","nombre")}),QI(22),wc(),ii$1(23,"th",8),gp("click",function(){return t.ordenarPor("reg","activo")}),QI(24),wc(),lp(25,"th"),wc()(),ii$1(26,"tbody"),lI(27,vi,14,5,"tr",9,ut),wc()()()(),ii$1(29,"mat-tab",10)(30,"div",4)(31,"div",5)(32,"button",6),gp("click",function(){return t.nuevoEquipo()}),ii$1(33,"mat-icon"),QI(34,"add"),wc(),QI(35," Nuevo equipo "),wc()(),ii$1(36,"table",7)(37,"thead")(38,"tr")(39,"th",8),gp("click",function(){return t.ordenarPor("eq","codigo")}),QI(40),wc(),ii$1(41,"th",8),gp("click",function(){return t.ordenarPor("eq","nombre")}),QI(42),wc(),ii$1(43,"th",8),gp("click",function(){return t.ordenarPor("eq","regionalNombre")}),QI(44),wc(),ii$1(45,"th",8),gp("click",function(){return t.ordenarPor("eq","responsableNombre")}),QI(46),wc(),ii$1(47,"th",8),gp("click",function(){return t.ordenarPor("eq","activo")}),QI(48),wc(),lp(49,"th"),wc()(),ii$1(50,"tbody"),lI(51,yi,15,7,"tr",9,ut),wc()()()(),ii$1(53,"mat-tab",11)(54,"div",4)(55,"div",5)(56,"button",6),gp("click",function(){return t.nuevoCliente()}),ii$1(57,"mat-icon"),QI(58,"add"),wc(),QI(59," Nuevo cliente "),wc()(),ii$1(60,"table",7)(61,"thead")(62,"tr")(63,"th",8),gp("click",function(){return t.ordenarPor("cli","codigo")}),QI(64),wc(),ii$1(65,"th",8),gp("click",function(){return t.ordenarPor("cli","nombre")}),QI(66),wc(),ii$1(67,"th",8),gp("click",function(){return t.ordenarPor("cli","helpdeskClientId")}),QI(68),wc(),ii$1(69,"th",8),gp("click",function(){return t.ordenarPor("cli","equipoResponsableNombre")}),QI(70),wc(),ii$1(71,"th",8),gp("click",function(){return t.ordenarPor("cli","activo")}),QI(72),wc(),lp(73,"th"),wc()(),ii$1(74,"tbody"),lI(75,Ci,15,5,"tr",null,ut),wc()()()(),ii$1(77,"mat-tab",12)(78,"div",4)(79,"div",5)(80,"div",13)(81,"mat-icon"),QI(82,"search"),wc(),ii$1(83,"input",14),gp("input",function(i){return t.asigBuscar.set(i.target.value)}),wc()(),iI(84,wi,2,2,"span",15),ii$1(85,"button",6),gp("click",function(){return t.nuevaAsignacion()}),ii$1(86,"mat-icon"),QI(87,"add"),wc(),QI(88," Nueva asignaci\xF3n "),wc()(),ii$1(89,"table",7)(90,"thead")(91,"tr")(92,"th",8),gp("click",function(){return t.ordenarPor("asig","usuarioNombre")}),QI(93),wc(),ii$1(94,"th",8),gp("click",function(){return t.ordenarPor("asig","rolCodigo")}),QI(95),wc(),ii$1(96,"th",8),gp("click",function(){return t.ordenarPor("asig","alcanceTipo")}),QI(97),wc(),ii$1(98,"th",8),gp("click",function(){return t.ordenarPor("asig","alcanceNombre")}),QI(99),wc(),ii$1(100,"th",8),gp("click",function(){return t.ordenarPor("asig","vigenteDesde")}),QI(101),wc(),ii$1(102,"th"),QI(103,"Hasta"),wc(),lp(104,"th"),wc()(),ii$1(105,"tbody"),lI(106,xi,20,6,"tr",null,ut),wc()()()()()()),e&2&&(ky(4),cp("disabled",t.cargando()),ky(16),Mc("C\xF3digo",t.flecha("reg","codigo")),ky(2),Mc("Nombre",t.flecha("reg","nombre")),ky(2),Mc("Activo",t.flecha("reg","activo")),ky(3),uI(t.regionalesOrd()),ky(13),Mc("C\xF3digo",t.flecha("eq","codigo")),ky(2),Mc("Nombre",t.flecha("eq","nombre")),ky(2),Mc("Regional",t.flecha("eq","regionalNombre")),ky(2),Mc("Responsable",t.flecha("eq","responsableNombre")),ky(2),Mc("Activo",t.flecha("eq","activo")),ky(3),uI(t.equiposOrd()),ky(13),Mc("C\xF3digo",t.flecha("cli","codigo")),ky(2),Mc("Nombre",t.flecha("cli","nombre")),ky(2),Mc("ID HD",t.flecha("cli","helpdeskClientId")),ky(2),Mc("Equipo responsable",t.flecha("cli","equipoResponsableNombre")),ky(2),Mc("Activo",t.flecha("cli","activo")),ky(3),uI(t.clientesOrd()),ky(8),cp("value",t.asigBuscar()),ky(),sI(t.asigBuscar().trim()?84:-1),ky(9),Mc("Usuario",t.flecha("asig","usuarioNombre")),ky(2),Mc("Rol",t.flecha("asig","rolCodigo")),ky(2),Mc("Alcance",t.flecha("asig","alcanceTipo")),ky(2),Mc("Objetivo",t.flecha("asig","alcanceNombre")),ky(2),Mc("Desde",t.flecha("asig","vigenteDesde")),ky(5),uI(t.asignacionesOrd()));},dependencies:[hn,Dt,un,ba,ha,Ui,yt,wt],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};export{wn as Administracion};