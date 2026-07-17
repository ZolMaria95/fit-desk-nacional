import {D,X as Xp,F as Ft,K,aK as $,aL as B,aH as ch,P as PE,s as si$1,Z as ZI,C as Cc,y as yp,l as dp,m as uI,b as sI,O as Oy,u as up,x as xc,o as dI,d as aI,a as Fp,e as eD,G as Gv,R as Rp,L as Lp,Q as Qv,aI as J$1,c2 as aD,b3 as lI,aa as _p,p as FE,N as Nl,q as qr,aP as Di,af as N,at as ne$1,aj as q,ak as nh,aV as am,aO as eF,A as DI,bB as op,a3 as sD,a6 as lp,a7 as Dp,U as bI,V as CI,J as Ip,bM as ur,r as mr,aw as JL,ag as Se,ai as U,ah as ct,aB as Go,au as $e$1,t as w,aM as nn$1,aC as Kh,ao as Lh,aW as tF,bY as ts,aY as Ql,bo as cp,I as Mp,H as jI,E as EI,bc as Op,ac as yI,ad as eu,ae as tu,aq as Ir,aX as Gp,a_ as m,B as wI,aJ as MI,b1 as ao,b2 as gp,a1 as Cm,a8 as HE,a2 as tp,a5 as Ed,aA as Ss,an as me,ar as Hv,j as jy,ab as rp,a$ as fu,bF as Dh,aD as Hh,ax as Jh,by as en,c3 as ht$1,aU as fl,aR as M,c4 as Yh,h as Qt$1,ay as Hr,c5 as mt$1}from'./main-2FXQ4DFR.js';import {u}from'./chunk-D6p8RrZl.js';import {J}from'./chunk-Dcm_iBl2.js';import {e as ee,O,$ as $e,H as Ht,N as Nt,z as zt,V as Vt}from'./chunk-B6lZExrY.js';import {Q as Qt}from'./chunk-CblPchTW.js';import {F as Ft$1,R as Rt}from'./chunk-BTz4KASc.js';import {d as de,n as nt,o as oe,r as re,a as nn,t as tn,j as je$1}from'./chunk-1d0ktQxC.js';import {y as yi$1,v as vi$1,j,b as mn$1,g as gn$1,X as Xe,Y}from'./chunk-j47hLwaf.js';import {v as va,g as ga,A as An$1,t as ta,i as ie,X as Xn,b as bn$1,h as ht,S}from'./chunk-BcegIiMq.js';var Ot=["*"];function kn(l,a){l&1&&wI(0);}var Pn=["tabListContainer"],Tn=["tabList"],In=["tabListInner"],On=["nextPaginator"],Dn=["previousPaginator"],En=["content"];function Sn(l,a){}var An=["tabBodyWrapper"],Rn=["tabHeader"];function Bn(l,a){}function Ln(l,a){if(l&1&&rp(0,Bn,0,0,"ng-template",12),l&2){let e=EI().$implicit;up("cdkPortalOutlet",e.templateLabel);}}function Nn(l,a){if(l&1&&ZI(0),l&2){let e=EI().$implicit;Rp(e.textLabel);}}function Fn(l,a){if(l&1){let e=yI();si$1(0,"div",7,2),yp("click",function(){let n=eu(e),i=n.$implicit,p=n.$index,_=EI(),P=MI(1);return tu(_._handleClick(i,P,p))})("cdkFocusChange",function(n){let i=eu(e).$index,p=EI();return tu(p._tabFocusChanged(n,i))}),dp(2,"span",8)(3,"div",9),si$1(4,"span",10)(5,"span",11),sI(6,Ln,1,1,null,12)(7,Nn,1,1),Cc()()();}if(l&2){let e=a.$implicit,t=a.$index,n=MI(1),i=EI();jI(e.labelClass),Mp("mdc-tab--active",i.selectedIndex===t),up("id",i._getTabLabelId(e,t))("disabled",e.disabled)("fitInkBarToContent",i.fitInkBarToContent),lp("tabIndex",i._getTabIndex(t))("aria-posinset",t+1)("aria-setsize",i._tabs.length)("aria-controls",i._getTabContentId(t))("aria-selected",i.selectedIndex===t)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null),Oy(3),up("matRippleTrigger",n)("matRippleDisabled",e.disabled||i.disableRipple),Oy(3),aI(e.templateLabel?6:7);}}function qn(l,a){l&1&&wI(0);}function zn(l,a){if(l&1){let e=yI();si$1(0,"mat-tab-body",13),yp("_onCentered",function(){eu(e);let n=EI();return tu(n._removeTabBodyWrapperHeight())})("_onCentering",function(n){eu(e);let i=EI();return tu(i._setTabBodyWrapperHeight(n))})("_beforeCentering",function(n){eu(e);let i=EI();return tu(i._bodyCentered(n))}),Cc();}if(l&2){let e=a.$implicit,t=a.$index,n=EI();jI(e.bodyClass),up("id",n._getTabContentId(t))("content",e.content)("position",e.position)("animationDuration",n._bodyAnimationDuration)("preserveContent",n.preserveContent),lp("tabindex",n.contentTabIndex!=null&&n.selectedIndex===t?n.contentTabIndex:null)("aria-labelledby",n._getTabLabelId(e,t))("aria-hidden",n.selectedIndex!==t);}}var Hn=new N("MatTabContent"),Vn=(()=>{class l{template=D(ur);static \u0275fac=function(t){return new(t||l)};static \u0275dir=HE({type:l,selectors:[["","matTabContent",""]],features:[sD([{provide:Hn,useExisting:l}])]})}return l})(),Wn=new N("MatTabLabel"),pn=new N("MAT_TAB"),jn=(()=>{class l extends gn$1{_closestTab=D(pn,{optional:true});static \u0275fac=(()=>{let e;return function(n){return (e||(e=Cm(l)))(n||l)}})();static \u0275dir=HE({type:l,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[sD([{provide:Wn,useExisting:l}]),tp]})}return l})(),gn=new N("MAT_TAB_GROUP"),Dt=(()=>{class l{_viewContainerRef=D(Di);_closestTabGroup=D(gn,{optional:true});disabled=false;get templateLabel(){return this._templateLabel}set templateLabel(e){this._setTemplateLabelInput(e);}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new ne$1;position=null;origin=null;isActive=false;constructor(){D(q).load(nh);}ngOnChanges(e){(e.hasOwnProperty("textLabel")||e.hasOwnProperty("disabled"))&&this._stateChanges.next();}ngOnDestroy(){this._stateChanges.complete();}ngOnInit(){this._contentPortal=new j(this._explicitContent||this._implicitContent,this._viewContainerRef);}_setTemplateLabelInput(e){e&&e._closestTab===this&&(this._templateLabel=e);}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=PE({type:l,selectors:[["mat-tab"]],contentQueries:function(t,n,i){if(t&1&&Ip(i,jn,5)(i,Vn,7,ur),t&2){let p;bI(p=CI())&&(n.templateLabel=p.first),bI(p=CI())&&(n._explicitContent=p.first);}},viewQuery:function(t,n){if(t&1&&Dp(ur,7),t&2){let i;bI(i=CI())&&(n._implicitContent=i.first);}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(t,n){t&2&&lp("id",null);},inputs:{disabled:[2,"disabled","disabled",eF],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[sD([{provide:pn,useExisting:l}]),am],ngContentSelectors:Ot,decls:1,vars:0,template:function(t,n){t&1&&(DI(),op(0,kn,1,0,"ng-template"));},encapsulation:2,changeDetection:1})}return l})(),Mt="mdc-tab-indicator--active",dn="mdc-tab-indicator--no-transition",Pt=class{_items;_currentItem;constructor(a){this._items=a;}hide(){this._items.forEach(a=>a.deactivateInkBar()),this._currentItem=void 0;}alignToElement(a){let e=this._items.find(n=>n.elementRef.nativeElement===a),t=this._currentItem;if(e!==t&&(t?.deactivateInkBar(),e)){let n=t?.elementRef.nativeElement.getBoundingClientRect?.();e.activateInkBar(n),this._currentItem=e;}}},Qn=(()=>{class l{_elementRef=D(mr);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=false;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(e){this._fitToContent!==e&&(this._fitToContent=e,this._inkBarElement&&this._appendInkBarElement());}activateInkBar(e){let t=this._elementRef.nativeElement;if(!e||!t.getBoundingClientRect||!this._inkBarContentElement){t.classList.add(Mt);return}let n=t.getBoundingClientRect(),i=e.width/n.width,p=e.left-n.left;t.classList.add(dn),this._inkBarContentElement.style.setProperty("transform",`translateX(${p}px) scaleX(${i})`),t.getBoundingClientRect(),t.classList.remove(dn),t.classList.add(Mt),this._inkBarContentElement.style.setProperty("transform","");}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Mt);}ngOnInit(){this._createInkBarElement();}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null;}_createInkBarElement(){let e=this._elementRef.nativeElement.ownerDocument||document,t=this._inkBarElement=e.createElement("span"),n=this._inkBarContentElement=e.createElement("span");t.className="mdc-tab-indicator",n.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",t.appendChild(this._inkBarContentElement),this._appendInkBarElement();}_appendInkBarElement(){this._inkBarElement;let e=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;e.appendChild(this._inkBarElement);}static \u0275fac=function(t){return new(t||l)};static \u0275dir=HE({type:l,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",eF]}})}return l})();var bn=(()=>{class l extends Qn{elementRef=D(mr);disabled=false;focus(){this.elementRef.nativeElement.focus();}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Cm(l)))(n||l)}})();static \u0275dir=HE({type:l,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(t,n){t&2&&(lp("aria-disabled",!!n.disabled),Mp("mat-mdc-tab-disabled",n.disabled));},inputs:{disabled:[2,"disabled","disabled",eF]},features:[tp]})}return l})(),cn={passive:true},Gn=650,Un=100,$n=(()=>{class l{_elementRef=D(mr);_changeDetectorRef=D(JL);_viewportRuler=D(Y);_dir=D(Ss,{optional:true});_ngZone=D(Se);_platform=D(w);_sharedResizeObserver=D(je$1);_injector=D(me);_renderer=D(Hv);_animationsDisabled=ct();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=false;_destroyed=new ne$1;_showPaginationControls=false;_disableScrollAfter=true;_disableScrollBefore=true;_tabLabelCount;_scrollDistanceChanged=false;_keyManager;_currentTextContent;_stopScrolling=new ne$1;disablePagination=false;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){let t=isNaN(e)?0:e;this._selectedIndex!=t&&(this._selectedIndexChanged=true,this._selectedIndex=t,this._keyManager&&this._keyManager.updateActiveItem(t));}_selectedIndex=0;selectFocusedIndex=new $e$1;indexFocused=new $e$1;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())]);}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),cn),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),cn));}ngAfterContentInit(){let e=this._dir?this._dir.change:Dh("ltr"),t=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Hh(32),Jh(this._destroyed)),n=this._viewportRuler.change(150).pipe(Jh(this._destroyed)),i=()=>{this.updatePagination(),this._alignInkBarToSelectedTab();};this._keyManager=new en(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>false),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),jy(i,{injector:this._injector}),Lh(e,n,t,this._items.changes,this._itemsResized()).pipe(Jh(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),i();});}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection());}),this._keyManager.change.subscribe(p=>{this.indexFocused.emit(p),this._setTabFocus(p);});}_itemsResized(){return typeof ResizeObserver!="function"?ht$1:this._items.changes.pipe(Kh(this._items),fl(e=>new M(t=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(i=>t.next(i));return e.forEach(i=>n.observe(i.elementRef.nativeElement)),()=>{n.disconnect();}}))),Yh(1),Qt$1(e=>e.some(t=>t.contentRect.width>0&&t.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=false,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=false,this._changeDetectorRef.markForCheck());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete();}_handleKeydown(e){if(!Hr(e))switch(e.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let t=this._items.get(this.focusIndex);t&&!t.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(e));}break;default:this._keyManager?.onKeydown(e);}}_onContentChanges(){let e=this._elementRef.nativeElement.textContent;e!==this._currentTextContent&&(this._currentTextContent=e||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck();}));}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition();}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(e){!this._isValidIndex(e)||this.focusIndex===e||!this._keyManager||this._keyManager.setActiveItem(e);}_isValidIndex(e){return this._items?!!this._items.toArray()[e]:true}_setTabFocus(e){if(this._showPaginationControls&&this._scrollToLabel(e),this._items&&this._items.length){this._items.toArray()[e].focus();let t=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?t.scrollLeft=0:t.scrollLeft=t.scrollWidth-t.offsetWidth;}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let e=this.scrollDistance,t=this._getLayoutDirection()==="ltr"?-e:e;this._tabList.nativeElement.style.transform=`translateX(${Math.round(t)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0);}get scrollDistance(){return this._scrollDistance}set scrollDistance(e){this._scrollTo(e);}_scrollHeader(e){let t=this._tabListContainer.nativeElement.offsetWidth,n=(e=="before"?-1:1)*t/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(e){this._stopInterval(),this._scrollHeader(e);}_scrollToLabel(e){if(this.disablePagination)return;let t=this._items?this._items.toArray()[e]:null;if(!t)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:i,offsetWidth:p}=t.elementRef.nativeElement,_,P;this._getLayoutDirection()=="ltr"?(_=i,P=_+p):(P=this._tabListInner.nativeElement.offsetWidth-i,_=P-p);let ye=this.scrollDistance,Ee=this.scrollDistance+n;_<ye?this.scrollDistance-=ye-_:P>Ee&&(this.scrollDistance+=Math.min(P-Ee,_-ye));}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=false;else {let e=this._tabListInner.nativeElement.scrollWidth,t=this._elementRef.nativeElement.offsetWidth,n=e-t>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck());}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=true:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck());}_getMaxScrollDistance(){let e=this._tabListInner.nativeElement.scrollWidth,t=this._tabListContainer.nativeElement.offsetWidth;return e-t||0}_alignInkBarToSelectedTab(){let e=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,t=e?e.elementRef.nativeElement:null;t?this._inkBar.alignToElement(t):this._inkBar.hide();}_stopInterval(){this._stopScrolling.next();}_handlePaginatorPress(e,t){t&&t.button!=null&&t.button!==0||(this._stopInterval(),mt$1(Gn,Un).pipe(Jh(Lh(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:i}=this._scrollHeader(e);(i===0||i>=n)&&this._stopInterval();}));}_scrollTo(e){if(this.disablePagination)return {maxScrollDistance:0,distance:0};let t=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(t,e)),this._scrollDistanceChanged=true,this._checkScrollingControls(),{maxScrollDistance:t,distance:this._scrollDistance}}static \u0275fac=function(t){return new(t||l)};static \u0275dir=HE({type:l,inputs:{disablePagination:[2,"disablePagination","disablePagination",eF],selectedIndex:[2,"selectedIndex","selectedIndex",tF]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return l})(),Kn=(()=>{class l extends $n{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=false;ngAfterContentInit(){this._inkBar=new Pt(this._items),super.ngAfterContentInit();}_itemSelected(e){e.preventDefault();}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Cm(l)))(n||l)}})();static \u0275cmp=PE({type:l,selectors:[["mat-tab-header"]],contentQueries:function(t,n,i){if(t&1&&Ip(i,bn,4),t&2){let p;bI(p=CI())&&(n._items=p);}},viewQuery:function(t,n){if(t&1&&Dp(Pn,7)(Tn,7)(In,7)(On,5)(Dn,5),t&2){let i;bI(i=CI())&&(n._tabListContainer=i.first),bI(i=CI())&&(n._tabList=i.first),bI(i=CI())&&(n._tabListInner=i.first),bI(i=CI())&&(n._nextPaginator=i.first),bI(i=CI())&&(n._previousPaginator=i.first);}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(t,n){t&2&&Mp("mat-mdc-tab-header-pagination-controls-enabled",n._showPaginationControls)("mat-mdc-tab-header-rtl",n._getLayoutDirection()=="rtl");},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",eF]},features:[tp],ngContentSelectors:Ot,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(t,n){t&1&&(DI(),si$1(0,"div",5,0),yp("click",function(){return n._handlePaginatorClick("before")})("mousedown",function(p){return n._handlePaginatorPress("before",p)})("touchend",function(){return n._stopInterval()}),dp(2,"div",6),Cc(),si$1(3,"div",7,1),yp("keydown",function(p){return n._handleKeydown(p)}),si$1(5,"div",8,2),yp("cdkObserveContent",function(){return n._onContentChanges()}),si$1(7,"div",9,3),wI(9),Cc()()(),si$1(10,"div",10,4),yp("mousedown",function(p){return n._handlePaginatorPress("after",p)})("click",function(){return n._handlePaginatorClick("after")})("touchend",function(){return n._stopInterval()}),dp(12,"div",6),Cc()),t&2&&(Mp("mat-mdc-tab-header-pagination-disabled",n._disableScrollBefore),up("matRippleDisabled",n._disableScrollBefore||n.disableRipple),Oy(3),Mp("_mat-animation-noopable",n._animationsDisabled),Oy(2),lp("aria-label",n.ariaLabel||null)("aria-labelledby",n.ariaLabelledby||null),Oy(5),Mp("mat-mdc-tab-header-pagination-disabled",n._disableScrollAfter),up("matRippleDisabled",n._disableScrollAfter||n.disableRipple));},dependencies:[Ql,Ed],styles:[`.mat-mdc-tab-header {
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
`],encapsulation:2,changeDetection:1})}return l})(),Zn=new N("MAT_TABS_CONFIG"),mn=(()=>{class l extends mn$1{_host=D(Tt);_ngZone=D(Se);_centeringSub=U.EMPTY;_leavingSub=U.EMPTY;ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Kh(this._host._isCenterPosition())).subscribe(e=>{this._host._content&&e&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content);});}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach());});}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe();}static \u0275fac=(()=>{let e;return function(n){return (e||(e=Cm(l)))(n||l)}})();static \u0275dir=HE({type:l,selectors:[["","matTabBodyHost",""]],features:[tp]})}return l})(),Tt=(()=>{class l{_elementRef=D(mr);_dir=D(Ss,{optional:true});_ngZone=D(Se);_injector=D(me);_renderer=D(Hv);_diAnimationsDisabled=ct();_eventCleanups;_initialized=false;_fallbackTimer;_positionIndex;_dirChangeSubscription=U.EMPTY;_position;_previousPosition;_onCentering=new $e$1;_beforeCentering=new $e$1;_afterLeavingCenter=new $e$1;_onCentered=new $e$1(true);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=false;set position(e){this._positionIndex=e,this._computePositionAnimationState();}constructor(){if(this._dir){let e=D(JL);this._dirChangeSubscription=this._dir.change.subscribe(t=>{this._computePositionAnimationState(t),e.markForCheck();});}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(true),jy(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=true;}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(e=>e()),this._dirChangeSubscription.unsubscribe();}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let e=this._elementRef.nativeElement,t=n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),n.type==="transitionend"&&this._transitionDone());};this._eventCleanups=[this._renderer.listen(e,"transitionstart",n=>{n.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted());}),this._renderer.listen(e,"transitionend",t),this._renderer.listen(e,"transitioncancel",t)];});}_transitionStarted(){clearTimeout(this._fallbackTimer);let e=this._position==="center";this._beforeCentering.emit(e),e&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight);}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit();}_setActiveClass(e){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",e);}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(e=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=e=="ltr"?"left":"right":this._positionIndex>0?this._position=e=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)));}_simulateTransitionEvents(){this._transitionStarted(),jy(()=>this._transitionDone(),{injector:this._injector});}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=PE({type:l,selectors:[["mat-tab-body"]],viewQuery:function(t,n){if(t&1&&Dp(mn,5)(En,5),t&2){let i;bI(i=CI())&&(n._portalHost=i.first),bI(i=CI())&&(n._contentElement=i.first);}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(t,n){t&2&&lp("inert",n._position==="center"?null:"");},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(t,n){t&1&&(si$1(0,"div",1,0),rp(2,Sn,0,0,"ng-template",2),Cc()),t&2&&Mp("mat-tab-body-content-left",n._position==="left")("mat-tab-body-content-right",n._position==="right")("mat-tab-body-content-can-animate",n._position==="center"||n._previousPosition==="center");},dependencies:[mn,Xe],styles:[`.mat-mdc-tab-body {
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
`],encapsulation:2,changeDetection:1})}return l})(),un=(()=>{class l{_elementRef=D(mr);_changeDetectorRef=D(JL);_ngZone=D(Se);_tabsSubscription=U.EMPTY;_tabLabelSubscription=U.EMPTY;_tabBodySubscription=U.EMPTY;_diAnimationsDisabled=ct();_bodyAnimationDuration;_headerAnimationDuration;_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new Go;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(e){this._fitInkBarToContent=e,this._changeDetectorRef.markForCheck();}_fitInkBarToContent=false;stretchTabs=true;alignTabs=null;dynamicHeight=false;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._indexToSelect=isNaN(e)?null:e;}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(e){this._animationDuration=e,e&&typeof e=="object"?(this._bodyAnimationDuration=kt(e.body),this._headerAnimationDuration=kt(e.header)):this._headerAnimationDuration=this._bodyAnimationDuration=kt(e);}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(e){this._contentTabIndex=isNaN(e)?null:e;}_contentTabIndex=null;disablePagination=false;disableRipple=false;preserveContent=false;get backgroundColor(){return this._backgroundColor}set backgroundColor(e){let t=this._elementRef.nativeElement.classList;t.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),e&&t.add("mat-tabs-with-background",`mat-background-${e}`),this._backgroundColor=e;}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new $e$1;focusChange=new $e$1;animationDone=new $e$1;selectedTabChange=new $e$1(true);_groupId;_isServer=!D(w).isBrowser;constructor(){let e=D(Zn,{optional:true});this._groupId=D(nn$1).getId("mat-tab-group-"),this.animationDuration=e&&e.animationDuration?e.animationDuration:"500ms",this.disablePagination=e&&e.disablePagination!=null?e.disablePagination:false,this.dynamicHeight=e&&e.dynamicHeight!=null?e.dynamicHeight:false,e?.contentTabIndex!=null&&(this.contentTabIndex=e.contentTabIndex),this.preserveContent=!!e?.preserveContent,this.fitInkBarToContent=e&&e.fitInkBarToContent!=null?e.fitInkBarToContent:false,this.stretchTabs=e&&e.stretchTabs!=null?e.stretchTabs:true,this.alignTabs=e&&e.alignTabs!=null?e.alignTabs:null;}ngAfterContentChecked(){let e=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=e){let t=this._selectedIndex==null;if(!t){this.selectedTabChange.emit(this._createChangeEvent(e));let n=this._tabBodyWrapper.nativeElement;n.style.minHeight=n.clientHeight+"px";}Promise.resolve().then(()=>{this._tabs.forEach((n,i)=>n.isActive=i===e),t||(this.selectedIndexChange.emit(e),this._tabBodyWrapper.nativeElement.style.minHeight="");});}this._tabs.forEach((t,n)=>{t.position=n-e,this._selectedIndex!=null&&t.position==0&&!t.origin&&(t.origin=e-this._selectedIndex);}),this._selectedIndex!==e&&(this._selectedIndex=e,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck());}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let e=this._clampTabIndex(this._indexToSelect);if(e===this._selectedIndex){let t=this._tabs.toArray(),n;for(let i=0;i<t.length;i++)if(t[i].isActive){this._indexToSelect=this._selectedIndex=i,this._lastFocusedTabIndex=null,n=t[i];break}!n&&t[e]&&Promise.resolve().then(()=>{t[e].isActive=true,this.selectedTabChange.emit(this._createChangeEvent(e));});}this._changeDetectorRef.markForCheck();});}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(true));}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Kh(this._allTabs)).subscribe(e=>{this._tabs.reset(e.filter(t=>t._closestTabGroup===this||!t._closestTabGroup)),this._tabs.notifyOnChanges();});}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe();}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab();}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination();}focusTab(e){let t=this._tabHeader;t&&(t.focusIndex=e);}_focusChanged(e){this._lastFocusedTabIndex=e,this.focusChange.emit(this._createChangeEvent(e));}_createChangeEvent(e){let t=new It;return t.index=e,this._tabs&&this._tabs.length&&(t.tab=this._tabs.toArray()[e]),t}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=Lh(...this._tabs.map(e=>e._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck());}_clampTabIndex(e){return Math.min(this._tabs.length-1,Math.max(e||0,0))}_getTabLabelId(e,t){return e.id||`${this._groupId}-label-${t}`}_getTabContentId(e){return `${this._groupId}-content-${e}`}_setTabBodyWrapperHeight(e){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=e;return}let t=this._tabBodyWrapper.nativeElement;t.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(t.style.height=e+"px");}_removeTabBodyWrapperHeight(){let e=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=e.clientHeight,e.style.height="",this._ngZone.run(()=>this.animationDone.emit());}_handleClick(e,t,n){t.focusIndex=n,e.disabled||(this.selectedIndex=n);}_getTabIndex(e){let t=this._lastFocusedTabIndex??this.selectedIndex;return e===t?0:-1}_tabFocusChanged(e,t){e&&e!=="mouse"&&e!=="touch"&&(this._tabHeader.focusIndex=t);}_bodyCentered(e){e&&this._tabBodies?.forEach((t,n)=>t._setActiveClass(n===this._selectedIndex));}_bodyAnimationsDisabled(){return this._diAnimationsDisabled||this._bodyAnimationDuration==="0"||this._bodyAnimationDuration==="0ms"}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=PE({type:l,selectors:[["mat-tab-group"]],contentQueries:function(t,n,i){if(t&1&&Ip(i,Dt,5),t&2){let p;bI(p=CI())&&(n._allTabs=p);}},viewQuery:function(t,n){if(t&1&&Dp(An,5)(Rn,5)(Tt,5),t&2){let i;bI(i=CI())&&(n._tabBodyWrapper=i.first),bI(i=CI())&&(n._tabHeader=i.first),bI(i=CI())&&(n._tabBodies=i);}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:13,hostBindings:function(t,n){t&2&&(lp("mat-align-tabs",n.alignTabs),jI("mat-"+(n.color||"primary")),_p("--mat-tab-body-animation-duration",n._bodyAnimationDuration)("--mat-tab-header-animation-duration",n._headerAnimationDuration),Mp("mat-mdc-tab-group-dynamic-height",n.dynamicHeight)("mat-mdc-tab-group-inverted-header",n.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",n.stretchTabs));},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",eF],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",eF],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",eF],selectedIndex:[2,"selectedIndex","selectedIndex",tF],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",tF],disablePagination:[2,"disablePagination","disablePagination",eF],disableRipple:[2,"disableRipple","disableRipple",eF],preserveContent:[2,"preserveContent","preserveContent",eF],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[sD([{provide:gn,useExisting:l}])],ngContentSelectors:Ot,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(t,n){t&1&&(DI(),si$1(0,"mat-tab-header",3,0),yp("indexFocused",function(p){return n._focusChanged(p)})("selectFocusedIndex",function(p){return n.selectedIndex=p}),uI(2,Fn,8,17,"div",4,lI),Cc(),sI(4,qn,1,0),si$1(5,"div",5,1),uI(7,zn,1,10,"mat-tab-body",6,lI),Cc()),t&2&&(up("selectedIndex",n.selectedIndex||0)("disableRipple",n.disableRipple)("disablePagination",n.disablePagination),cp("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledby),Oy(2),dI(n._tabs),Oy(2),aI(n._isServer?4:-1),Oy(),Mp("_mat-animation-noopable",n._bodyAnimationsDisabled()),Oy(2),dI(n._tabs));},dependencies:[Kn,bn,ts,Ql,mn$1,Tt],styles:[`.mdc-tab {
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
`],encapsulation:2,changeDetection:1})}return l})(),It=class{index;tab};function kt(l){let a=l+"";return /^\d+$/.test(a)?l+"ms":a}var hn=(()=>{class l{static \u0275fac=function(t){return new(t||l)};static \u0275mod=FE({type:l});static \u0275inj=Nl({imports:[qr]})}return l})();var Yn=()=>({standalone:true}),Et=(l,a)=>a.id;function Jn(l,a){if(l&1&&(si$1(0,"mat-form-field",2)(1,"mat-label"),ZI(2,"Usuario"),Cc(),dp(3,"input",12),Cc()),l&2){let e=EI();Oy(3),up("value",e.data.asignacion?.usuarioNombre||"");}}function ei(l,a){if(l&1&&(si$1(0,"mat-option",5),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Rp(e.name);}}function ti(l,a){if(l&1){let e=yI();si$1(0,"mat-form-field",2)(1,"mat-label"),ZI(2,"Usuario (empleado del HelpDesk)"),Cc(),si$1(3,"mat-select",13),Fp("ngModelChange",function(n){eu(e);let i=EI();return eD(i.form.usuarioHid,n)||(i.form.usuarioHid=n),tu(n)}),si$1(4,"div",14),yp("click",function(n){return n.stopPropagation()}),si$1(5,"input",15),yp("ngModelChange",function(n){eu(e);let i=EI();return tu(i.hdBuscar.set(n))})("click",function(n){return n.stopPropagation()})("keydown",function(n){return n.stopPropagation()}),Cc(),Gv(),Cc(),uI(6,ei,2,2,"mat-option",5,Et),Cc(),Gv(),Cc();}if(l&2){let e=EI();Oy(3),Lp("ngModel",e.form.usuarioHid),Qv(),Oy(2),up("ngModel",e.hdBuscar())("ngModelOptions",aD(3,Yn)),Qv(),Oy(),dI(e.hdFiltrados());}}function ni(l,a){if(l&1&&(si$1(0,"mat-option",5),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Rp(e.nombre);}}function ii(l,a){if(l&1&&(si$1(0,"mat-option",5),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e),Oy(),Rp(e);}}function ai(l,a){if(l&1&&(si$1(0,"mat-option",5),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Rp(e.label);}}function oi(l,a){if(l&1){let e=yI();si$1(0,"mat-form-field",2)(1,"mat-label"),ZI(2),Cc(),si$1(3,"mat-select",16),Fp("ngModelChange",function(n){eu(e);let i=EI();return eD(i.form.objetivoId,n)||(i.form.objetivoId=n),tu(n)}),uI(4,ai,2,2,"mat-option",5,Et),Cc(),Gv(),Cc();}if(l&2){let e=EI();Oy(2),Rp(e.tipo()==="EQUIPO"?"Equipo":e.tipo()==="CLIENTE"?"Cliente":"Regional"),Oy(),Lp("ngModel",e.form.objetivoId),Qv(),Oy(),dI(e.objetivos());}}var ze=class l{api=D(u);hd=D(J);auth=D(Xp);snack=D(Qt);ref=D(O);data=D($e);roles=this.data.roles;guardando=Ft(false);tipo=Ft("EQUIPO");editando=!!this.data.asignacion;puedeAsignarAdmin=this.auth.puedeAsignarAdmin;rolesVisibles=K(()=>this.puedeAsignarAdmin()||this.data.asignacion?.rolCodigo==="ADMIN"?this.roles:this.roles.filter(a=>a.codigo!=="ADMIN"));tipos=["EQUIPO","CLIENTE","REGIONAL","GLOBAL"];hdUsers=this.hd.hdUsers;hdBuscar=Ft("");hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=this.hdUsers();return a?e.filter(t=>t.name.toLowerCase().includes(a)||String(t.id).toLowerCase().includes(a)):e});objetivos=K(()=>{switch(this.tipo()){case "EQUIPO":return this.data.equipos.map(a=>({id:a.id,label:`${a.nombre} \xB7 ${a.regionalNombre}`}));case "CLIENTE":return this.data.clientes.map(a=>({id:a.id,label:a.nombre}));case "REGIONAL":return this.data.regionales.map(a=>({id:a.id,label:a.nombre}));default:return []}});form={usuarioHid:this.data.usuarioPreHid??null,rolId:null,objetivoId:null,vigenteDesde:"",vigenteHasta:""};constructor(){this.hd.getHdUsers();let a=this.data.asignacion;a&&(this.tipo.set(a.alcanceTipo||"EQUIPO"),this.form={usuarioHid:null,rolId:a.rolId,objetivoId:a.alcanceObjetivoId??null,vigenteDesde:a.vigenteDesde??"",vigenteHasta:a.vigenteHasta??""});}onTipoChange(a){this.tipo.set(a),this.form.objetivoId=null;}async crear(){let{usuarioHid:a,rolId:e,objetivoId:t,vigenteDesde:n,vigenteHasta:i}=this.form,p=this.tipo();if(!this.editando&&!a||!e||p!=="GLOBAL"&&!t){this.snack.open("Eleg\xED usuario, rol y el alcance.","OK",{duration:3500});return}if(this.roles.find(P=>P.id===e)?.codigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede asignar el rol ADMIN.","OK",{duration:4e3});return}let _={rolId:e,alcanceTipo:p};p==="EQUIPO"&&(_.alcanceEquipoId=t),p==="CLIENTE"&&(_.alcanceClienteId=t),p==="REGIONAL"&&(_.alcanceRegionalId=t),n&&(_.vigenteDesde=n),this.editando||(_.helpdeskUserId=String(a),_.usuarioNombre=this.hdUsers().find(P=>String(P.id)===String(a))?.name),this.guardando.set(true);try{let P=this.editando?await this.api.actualizarAsignacion(this.data.asignacion.id,$(B({},_),{vigenteHasta:i||null})):await this.api.crearAsignacion(i?$(B({},_),{vigenteHasta:i}):_);this.ref.close(P);}catch(P){let ye=P?.error?.error,Ee=this.editando?"editar":"crear";this.snack.open(ye?`No se pudo ${Ee} la asignaci\xF3n. ${ye}`:`No se pudo ${Ee} la asignaci\xF3n.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-crear-asignacion-dialog"]],decls:34,vars:10,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["appearance","outline"],["name","r",3,"ngModelChange","ngModel"],[3,"value"],["name","t",3,"selectionChange","value"],["matInput","","type","date","name","vd",3,"ngModelChange","ngModel"],["matInput","","type","date","name","vh",3,"ngModelChange","ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["matInput","","disabled","",3,"value"],["name","u",3,"ngModelChange","ngModel"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar empleado\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],["name","o",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(si$1(0,"h2",0),ZI(1),Cc(),si$1(2,"mat-dialog-content")(3,"div",1),sI(4,Jn,4,1,"mat-form-field",2)(5,ti,8,4,"mat-form-field",2),si$1(6,"mat-form-field",3)(7,"mat-label"),ZI(8,"Rol"),Cc(),si$1(9,"mat-select",4),Fp("ngModelChange",function(i){return eD(t.form.rolId,i)||(t.form.rolId=i),i}),uI(10,ni,2,2,"mat-option",5,Et),Cc(),Gv(),Cc(),si$1(12,"mat-form-field",3)(13,"mat-label"),ZI(14,"Alcance"),Cc(),si$1(15,"mat-select",6),yp("selectionChange",function(i){return t.onTipoChange(i.value)}),uI(16,ii,2,2,"mat-option",5,lI),Cc()(),sI(18,oi,6,2,"mat-form-field",2),si$1(19,"mat-form-field",3)(20,"mat-label"),ZI(21,"Vigente desde"),Cc(),si$1(22,"input",7),Fp("ngModelChange",function(i){return eD(t.form.vigenteDesde,i)||(t.form.vigenteDesde=i),i}),Cc(),Gv(),Cc(),si$1(23,"mat-form-field",3)(24,"mat-label"),ZI(25,"Vigente hasta (opcional)"),Cc(),si$1(26,"input",8),Fp("ngModelChange",function(i){return eD(t.form.vigenteHasta,i)||(t.form.vigenteHasta=i),i}),Cc(),Gv(),Cc()()(),si$1(27,"mat-dialog-actions",9)(28,"button",10),yp("click",function(){return t.cancelar()}),ZI(29,"Cancelar"),Cc(),si$1(30,"button",11),yp("click",function(){return t.crear()}),si$1(31,"mat-icon"),ZI(32),Cc(),ZI(33),Cc()()),e&2&&(Oy(),Rp(t.editando?"Editar asignaci\xF3n":"Nueva asignaci\xF3n"),Oy(3),aI(t.editando?4:5),Oy(5),Lp("ngModel",t.form.rolId),Qv(),Oy(),dI(t.rolesVisibles()),Oy(5),up("value",t.tipo()),Oy(),dI(t.tipos),Oy(2),aI(t.tipo()!=="GLOBAL"?18:-1),Oy(4),Lp("ngModel",t.form.vigenteDesde),Qv(),Oy(4),Lp("ngModel",t.form.vigenteHasta),Qv(),Oy(4),up("disabled",t.guardando()),Oy(2),Rp(t.editando?"save":"add"),Oy(),xc(" ",t.editando?"Guardar":"Crear asignaci\xF3n"," "));},dependencies:[ta,ie,Xn,bn$1,Ht,Nt,zt,Vt,va,ga,yi$1,vi$1,de,nt,oe,nn,tn,Ft$1,Rt,J$1],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var fn=()=>({standalone:true}),vn=(l,a)=>a.id;function ri(l,a){if(l&1&&(si$1(0,"mat-option",6),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Op("#",e.id," \xB7 ",e.name);}}function li(l,a){if(l&1&&(si$1(0,"mat-option",6),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Op("",e.nombre," \xB7 ",e.regionalNombre);}}function si(l,a){if(l&1){let e=yI();si$1(0,"button",22),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.elegirColor(n))}),Cc();}if(l&2){let e=a.$implicit,t=EI();_p("background",e),Mp("sel",t.mismoColor(t.form.color,e)),up("title",e),lp("aria-label","Color "+e);}}function di(l,a){if(l&1){let e=yI();si$1(0,"button",23),yp("click",function(){eu(e);let n=EI();return tu(n.elegirColor(""))}),si$1(1,"mat-icon"),ZI(2,"close"),Cc()();}}var mt=class l{api=D(u);hd=D(J);snack=D(Qt);ref=D(O);data=D($e);equipos=this.data.equipos;hdClientes=this.hd.clients;hdBuscar=Ft("");guardando=Ft(false);hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=new Set(this.data.yaRegistrados.map(n=>String(n))),t=this.hdClientes().filter(n=>!e.has(String(n.id)));return a?t.filter(n=>n.name.toLowerCase().includes(a)||String(n.id).includes(a)):t});form={codigo:"",nombre:"",equipoResponsableId:null,helpdeskClientId:"",color:""};palette=["#E74C3C","#E67E22","#F2811D","#F1C40F","#27AE60","#16A085","#1ABC9C","#2980B9","#04BAF0","#3498DB","#9B59B6","#8E44AD","#D35400","#C0392B","#2C3E50","#7F8C8D"];constructor(){this.hd.getClients();}elegirColor(a){this.form.color=a;}mismoColor(a,e){return !!a&&!!e&&a.toLowerCase()===e.toLowerCase()}elegirHdCliente(a){let e=this.hdClientes().find(t=>String(t.id)===String(a));e&&(this.form.helpdeskClientId=String(e.id),this.form.nombre=e.name,this.form.codigo.trim()||(this.form.codigo=e.name.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,40)));}async crear(){let{codigo:a,nombre:e,equipoResponsableId:t,helpdeskClientId:n,color:i}=this.form;if(!a.trim()||!e.trim()||!t){this.snack.open("Complet\xE1 c\xF3digo, nombre y equipo responsable.","OK",{duration:3500});return}this.guardando.set(true);try{let p=await this.api.crearCliente({codigo:a.trim().toLowerCase(),nombre:e.trim(),equipoResponsableId:t,helpdeskClientId:n.trim()||void 0,color:i.trim()||void 0});this.ref.close(p);}catch(p){let _=p?.error?.error;this.snack.open(_?`No se pudo crear el cliente. ${_}`:"No se pudo crear el cliente.","OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-crear-cliente-dialog"]],decls:48,vars:15,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["placeholder","Buscar cliente del API\u2026",3,"selectionChange","value"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],[3,"value"],["appearance","outline"],["matInput","","name","cc","placeholder","visandes",3,"ngModelChange","ngModel"],["matInput","","name","cn","placeholder","VISANDES",3,"ngModelChange","ngModel"],["name","ce",3,"ngModelChange","ngModel"],["matInput","","name","ch","placeholder","15",3,"ngModelChange","ngModel"],[1,"color-field","full"],[1,"color-label"],[1,"swatches"],["type","button",1,"swatch",3,"background","sel","title"],["title","Color personalizado",1,"swatch","custom"],["type","color","name","colp",3,"ngModelChange","ngModel","ngModelOptions"],["type","button","title","Sin color",1,"swatch","clear"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["type","button",1,"swatch",3,"click","title"],["type","button","title","Sin color",1,"swatch","clear",3,"click"]],template:function(e,t){e&1&&(si$1(0,"h2",0),ZI(1,"Nuevo cliente"),Cc(),si$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),ZI(6,"Tomar del HelpDesk"),Cc(),si$1(7,"mat-select",3),yp("selectionChange",function(i){return t.elegirHdCliente(i.value)}),si$1(8,"div",4),yp("click",function(i){return i.stopPropagation()}),si$1(9,"input",5),yp("ngModelChange",function(i){return t.hdBuscar.set(i)})("click",function(i){return i.stopPropagation()})("keydown",function(i){return i.stopPropagation()}),Cc(),Gv(),Cc(),uI(10,ri,2,3,"mat-option",6,vn),Cc()(),si$1(12,"mat-form-field",7)(13,"mat-label"),ZI(14,"C\xF3digo (slug)"),Cc(),si$1(15,"input",8),Fp("ngModelChange",function(i){return eD(t.form.codigo,i)||(t.form.codigo=i),i}),Cc(),Gv(),Cc(),si$1(16,"mat-form-field",7)(17,"mat-label"),ZI(18,"Nombre"),Cc(),si$1(19,"input",9),Fp("ngModelChange",function(i){return eD(t.form.nombre,i)||(t.form.nombre=i),i}),Cc(),Gv(),Cc(),si$1(20,"mat-form-field",2)(21,"mat-label"),ZI(22,"Equipo responsable (define la regional)"),Cc(),si$1(23,"mat-select",10),Fp("ngModelChange",function(i){return eD(t.form.equipoResponsableId,i)||(t.form.equipoResponsableId=i),i}),uI(24,li,2,3,"mat-option",6,vn),Cc(),Gv(),Cc(),si$1(26,"mat-form-field",7)(27,"mat-label"),ZI(28,"ID HelpDesk"),Cc(),si$1(29,"input",11),Fp("ngModelChange",function(i){return eD(t.form.helpdeskClientId,i)||(t.form.helpdeskClientId=i),i}),Cc(),Gv(),Cc(),si$1(30,"div",12)(31,"span",13),ZI(32,"Color"),Cc(),si$1(33,"div",14),uI(34,si,1,6,"button",15,lI),si$1(36,"label",16)(37,"mat-icon"),ZI(38,"colorize"),Cc(),si$1(39,"input",17),yp("ngModelChange",function(i){return t.elegirColor(i)}),Cc(),Gv(),Cc(),sI(40,di,3,0,"button",18),Cc()()()(),si$1(41,"mat-dialog-actions",19)(42,"button",20),yp("click",function(){return t.cancelar()}),ZI(43,"Cancelar"),Cc(),si$1(44,"button",21),yp("click",function(){return t.crear()}),si$1(45,"mat-icon"),ZI(46,"add"),Cc(),ZI(47," Crear cliente "),Cc()()),e&2&&(Oy(7),up("value",t.form.helpdeskClientId),Oy(2),up("ngModel",t.hdBuscar())("ngModelOptions",aD(13,fn)),Qv(),Oy(),dI(t.hdFiltrados()),Oy(5),Lp("ngModel",t.form.codigo),Qv(),Oy(4),Lp("ngModel",t.form.nombre),Qv(),Oy(4),Lp("ngModel",t.form.equipoResponsableId),Qv(),Oy(),dI(t.equipos),Oy(5),Lp("ngModel",t.form.helpdeskClientId),Qv(),Oy(5),dI(t.palette),Oy(2),_p("background",t.form.color||"transparent"),Oy(3),up("ngModel",t.form.color||"#888888")("ngModelOptions",aD(14,fn)),Qv(),Oy(),aI(t.form.color?40:-1),Oy(4),up("disabled",t.guardando()));},dependencies:[ta,ie,Xn,bn$1,Ht,Nt,zt,Vt,va,ga,yi$1,vi$1,de,nt,oe,nn,tn,Ft$1,Rt,J$1],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var ci=["switch"],mi=["*"];function pi(l,a){l&1&&(si$1(0,"span",11),fu(),si$1(1,"svg",13),dp(2,"path",14),Cc(),si$1(3,"svg",15),dp(4,"path",16),Cc()());}var gi=new N("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:false,hideIcon:false,disabledInteractive:false})}),pt=class{source;checked;constructor(a,e){this.source=a,this.checked=e;}},je=(()=>{class l{_elementRef=D(mr);_focusMonitor=D(Ir);_changeDetectorRef=D(JL);defaults=D(gi);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=false;_createChangeEvent(e){return new pt(this,e)}_labelId;get buttonId(){return `${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus();}_noopAnimations=ct();_focused=false;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=false;color;disabled=false;disableRipple=false;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck();}hideIcon;disabledInteractive;change=new $e$1;toggleChange=new $e$1;get inputId(){return `${this.id||this._uniqueId}-input`}constructor(){D(q).load(nh);let e=D(new Gp("tabindex"),{optional:true}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=D(nn$1).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??false,this.disabledInteractive=t.disabledInteractive??false,this._labelId=this._uniqueId+"-label";}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,true).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=true,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=false,this._onTouched(),this._changeDetectorRef.markForCheck();});});}ngOnChanges(e){e.required&&this._validatorOnChange();}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef);}writeValue(e){this.checked=!!e;}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}validate(e){return this.required&&e.value!==true?{required:true}:null}registerOnValidatorChange(e){this._validatorOnChange=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck();}toggle(){this.checked=!this.checked,this._onChange(this.checked);}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked));}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new pt(this,this.checked))));}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||l)};static \u0275cmp=PE({type:l,selectors:[["mat-slide-toggle"]],viewQuery:function(t,n){if(t&1&&Dp(ci,5),t&2){let i;bI(i=CI())&&(n._switchElement=i.first);}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,n){t&2&&(gp("id",n.id),lp("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),jI(n.color?"mat-"+n.color:""),Mp("mat-mdc-slide-toggle-focused",n._focused)("mat-mdc-slide-toggle-checked",n.checked)("_mat-animation-noopable",n._noopAnimations));},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",eF],color:"color",disabled:[2,"disabled","disabled",eF],disableRipple:[2,"disableRipple","disableRipple",eF],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:tF(e)],checked:[2,"checked","checked",eF],hideIcon:[2,"hideIcon","hideIcon",eF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",eF]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[sD([{provide:ht,useExisting:ao(()=>l),multi:true},{provide:S,useExisting:l,multi:true}]),am],ngContentSelectors:mi,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,n){if(t&1&&(DI(),si$1(0,"div",1)(1,"button",2,0),yp("click",function(){return n._handleClick()}),dp(3,"div",3)(4,"span",4),si$1(5,"span",5)(6,"span",6)(7,"span",7),dp(8,"span",8),Cc(),si$1(9,"span",9),dp(10,"span",10),Cc(),sI(11,pi,5,0,"span",11),Cc()()(),si$1(12,"label",12),yp("click",function(p){return p.stopPropagation()}),wI(13),Cc()()),t&2){let i=MI(2);up("labelPosition",n.labelPosition),Oy(),Mp("mdc-switch--selected",n.checked)("mdc-switch--unselected",!n.checked)("mdc-switch--checked",n.checked)("mdc-switch--disabled",n.disabled)("mat-mdc-slide-toggle-disabled-interactive",n.disabledInteractive),up("tabIndex",n.disabled&&!n.disabledInteractive?-1:n.tabIndex)("disabled",n.disabled&&!n.disabledInteractive),lp("id",n.buttonId)("name",n.name)("aria-label",n.ariaLabel)("aria-labelledby",n._getAriaLabelledBy())("aria-describedby",n.ariaDescribedby)("aria-required",n.required||null)("aria-checked",n.checked)("aria-disabled",n.disabled&&n.disabledInteractive?"true":null),Oy(9),up("matRippleTrigger",i)("matRippleDisabled",n.disableRipple||n.disabled)("matRippleCentered",true),Oy(),aI(n.hideIcon?-1:11),Oy(),up("for",n.buttonId),lp("id",n._labelId);}},dependencies:[Ql,m],styles:[`.mdc-switch {
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
`],encapsulation:2})}return l})(),gt=(()=>{class l{static \u0275fac=function(t){return new(t||l)};static \u0275mod=FE({type:l});static \u0275inj=Nl({imports:[je,qr]})}return l})();var bi=()=>({standalone:true}),Cn=(l,a)=>a.id;function ui(l,a){if(l&1&&(si$1(0,"mat-option",4),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Rp(e.nombre);}}function hi(l,a){if(l&1&&(si$1(0,"mat-option",4),ZI(1),Cc()),l&2){let e=a.$implicit;up("value",e.id),Oy(),Rp(e.name);}}function _i(l,a){if(l&1){let e=yI();si$1(0,"mat-slide-toggle",15),Fp("ngModelChange",function(n){eu(e);let i=EI();return eD(i.form.activo,n)||(i.form.activo=n),tu(n)}),ZI(1),Cc(),Gv();}if(l&2){let e=EI();Lp("ngModel",e.form.activo),Qv(),Oy(),xc(" ",e.form.activo?"Activo":"Inactivo"," ");}}var Qe=class l{api=D(u);hd=D(J);snack=D(Qt);ref=D(O);data=D($e);regionales=this.data.regionales;guardando=Ft(false);editando=!!this.data.equipo;hdUsers=this.hd.hdUsers;hdBuscar=Ft("");hdFiltrados=K(()=>{let a=this.hdBuscar().trim().toLowerCase(),e=this.hdUsers();return a?e.filter(t=>t.name.toLowerCase().includes(a)||String(t.id).toLowerCase().includes(a)):e});form={regionalId:null,codigo:"",nombre:"",responsableHid:null,activo:true};constructor(){this.hd.getHdUsers();let a=this.data.equipo;a&&(this.form={regionalId:a.regionalId,codigo:a.codigo,nombre:a.nombre,responsableHid:a.responsableHelpdeskUserId??null,activo:a.activo});}async crear(){let{regionalId:a,codigo:e,nombre:t,responsableHid:n,activo:i}=this.form;if(!a||!e.trim()||!t.trim()){this.snack.open("Complet\xE1 regional, c\xF3digo y nombre.","OK",{duration:3500});return}this.guardando.set(true);try{let p={};n&&(p.responsableHelpdeskUserId=String(n),p.responsableNombre=this.hdUsers().find(P=>String(P.id)===String(n))?.name);let _;this.editando?_=await this.api.actualizarEquipo(this.data.equipo.id,B({regionalId:a,nombre:t.trim(),activo:i},p)):_=await this.api.crearEquipo(B({regionalId:a,codigo:e.trim().toUpperCase(),nombre:t.trim()},p)),this.ref.close(_);}catch(p){let _=p?.error?.error,P=this.editando?"editar":"crear";this.snack.open(_?`No se pudo ${P} el equipo. ${_}`:`No se pudo ${P} el equipo.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-crear-equipo-dialog"]],decls:36,vars:14,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline",1,"full"],["name","er",3,"ngModelChange","ngModel"],[3,"value"],["appearance","outline"],["matInput","","name","ec","placeholder","QUITO",3,"ngModelChange","ngModel","disabled"],["matInput","","name","en","placeholder","Equipo Quito",3,"ngModelChange","ngModel"],["name","resp",3,"ngModelChange","ngModel"],[1,"opt-buscar-wrap",3,"click"],["placeholder","Buscar empleado\u2026",1,"opt-buscar",3,"ngModelChange","click","keydown","ngModel","ngModelOptions"],["name","ea",1,"full",3,"ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["name","ea",1,"full",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(si$1(0,"h2",0),ZI(1),Cc(),si$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),ZI(6,"Regional"),Cc(),si$1(7,"mat-select",3),Fp("ngModelChange",function(i){return eD(t.form.regionalId,i)||(t.form.regionalId=i),i}),uI(8,ui,2,2,"mat-option",4,Cn),Cc(),Gv(),Cc(),si$1(10,"mat-form-field",5)(11,"mat-label"),ZI(12,"C\xF3digo"),Cc(),si$1(13,"input",6),Fp("ngModelChange",function(i){return eD(t.form.codigo,i)||(t.form.codigo=i),i}),Cc(),Gv(),Cc(),si$1(14,"mat-form-field",5)(15,"mat-label"),ZI(16,"Nombre"),Cc(),si$1(17,"input",7),Fp("ngModelChange",function(i){return eD(t.form.nombre,i)||(t.form.nombre=i),i}),Cc(),Gv(),Cc(),si$1(18,"mat-form-field",2)(19,"mat-label"),ZI(20,"Responsable de equipo (opcional, del HelpDesk)"),Cc(),si$1(21,"mat-select",8),Fp("ngModelChange",function(i){return eD(t.form.responsableHid,i)||(t.form.responsableHid=i),i}),si$1(22,"div",9),yp("click",function(i){return i.stopPropagation()}),si$1(23,"input",10),yp("ngModelChange",function(i){return t.hdBuscar.set(i)})("click",function(i){return i.stopPropagation()})("keydown",function(i){return i.stopPropagation()}),Cc(),Gv(),Cc(),si$1(24,"mat-option",4),ZI(25,"\u2014 sin responsable \u2014"),Cc(),uI(26,hi,2,2,"mat-option",4,Cn),Cc(),Gv(),Cc(),sI(28,_i,2,2,"mat-slide-toggle",11),Cc()(),si$1(29,"mat-dialog-actions",12)(30,"button",13),yp("click",function(){return t.cancelar()}),ZI(31,"Cancelar"),Cc(),si$1(32,"button",14),yp("click",function(){return t.crear()}),si$1(33,"mat-icon"),ZI(34),Cc(),ZI(35),Cc()()),e&2&&(Oy(),Rp(t.editando?"Editar equipo":"Nuevo equipo"),Oy(6),Lp("ngModel",t.form.regionalId),Qv(),Oy(),dI(t.regionales),Oy(5),Lp("ngModel",t.form.codigo),up("disabled",t.editando),Qv(),Oy(4),Lp("ngModel",t.form.nombre),Qv(),Oy(4),Lp("ngModel",t.form.responsableHid),Qv(),Oy(2),up("ngModel",t.hdBuscar())("ngModelOptions",aD(13,bi)),Qv(),Oy(),up("value",null),Oy(2),dI(t.hdFiltrados()),Oy(2),aI(t.editando?28:-1),Oy(4),up("disabled",t.guardando()),Oy(2),Rp(t.editando?"save":"add"),Oy(),xc(" ",t.editando?"Guardar":"Crear equipo"," "));},dependencies:[ta,ie,Xn,bn$1,Ht,Nt,zt,Vt,va,ga,yi$1,vi$1,de,nt,oe,nn,tn,Ft$1,Rt,J$1,gt,je],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};function fi(l,a){if(l&1){let e=yI();si$1(0,"mat-slide-toggle",9),Fp("ngModelChange",function(n){eu(e);let i=EI();return eD(i.form.activo,n)||(i.form.activo=n),tu(n)}),ZI(1,"Activa"),Cc(),Gv();}if(l&2){let e=EI();Lp("ngModel",e.form.activo),Qv();}}var Ge=class l{api=D(u);snack=D(Qt);ref=D(O);data=D($e)??{};editando=!!this.data.regional;guardando=Ft(false);form={codigo:"",nombre:"",activo:true};constructor(){let a=this.data.regional;a&&(this.form={codigo:a.codigo,nombre:a.nombre,activo:a.activo});}async crear(){let a=this.form.codigo.trim(),e=this.form.nombre.trim();if(!a||!e){this.snack.open("Complet\xE1 c\xF3digo y nombre.","OK",{duration:3500});return}this.guardando.set(true);try{let t=this.editando?await this.api.actualizarRegional(this.data.regional.id,{codigo:a.toUpperCase(),nombre:e,activo:this.form.activo}):await this.api.crearRegional({codigo:a.toUpperCase(),nombre:e});this.ref.close(t);}catch(t){let n=t?.error?.error,i=this.editando?"editar":"crear";this.snack.open(n?`No se pudo ${i} la regional. ${n}`:`No se pudo ${i} la regional.`,"OK",{duration:4e3});}finally{this.guardando.set(false);}}cancelar(){this.ref.close();}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-crear-regional-dialog"]],decls:22,vars:7,consts:[["mat-dialog-title",""],[1,"dialog-form"],["appearance","outline"],["matInput","","name","rc","placeholder","QUITO",3,"ngModelChange","ngModel"],["matInput","","name","rn","placeholder","Quito",3,"ngModelChange","ngModel"],["name","ra",3,"ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","primary",3,"click","disabled"],["name","ra",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(si$1(0,"h2",0),ZI(1),Cc(),si$1(2,"mat-dialog-content")(3,"div",1)(4,"mat-form-field",2)(5,"mat-label"),ZI(6,"C\xF3digo"),Cc(),si$1(7,"input",3),Fp("ngModelChange",function(i){return eD(t.form.codigo,i)||(t.form.codigo=i),i}),Cc(),Gv(),si$1(8,"mat-hint"),ZI(9,"Se guarda en MAY\xDASCULAS. Debe ser \xFAnico."),Cc()(),si$1(10,"mat-form-field",2)(11,"mat-label"),ZI(12,"Nombre"),Cc(),si$1(13,"input",4),Fp("ngModelChange",function(i){return eD(t.form.nombre,i)||(t.form.nombre=i),i}),Cc(),Gv(),Cc(),sI(14,fi,2,1,"mat-slide-toggle",5),Cc()(),si$1(15,"mat-dialog-actions",6)(16,"button",7),yp("click",function(){return t.cancelar()}),ZI(17,"Cancelar"),Cc(),si$1(18,"button",8),yp("click",function(){return t.crear()}),si$1(19,"mat-icon"),ZI(20),Cc(),ZI(21),Cc()()),e&2&&(Oy(),Rp(t.editando?"Editar regional":"Nueva regional"),Oy(6),Lp("ngModel",t.form.codigo),Qv(),Oy(6),Lp("ngModel",t.form.nombre),Qv(),Oy(),aI(t.editando?14:-1),Oy(4),up("disabled",t.guardando()),Oy(2),Rp(t.editando?"save":"add"),Oy(),xc(" ",t.editando?"Guardar":"Crear regional"," "));},dependencies:[ta,ie,Xn,bn$1,Ht,Nt,zt,Vt,va,ga,yi$1,vi$1,de,nt,oe,re,nn,tn,gt,je],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};var bt=class l{ref=D(O);data=D($e);texto=Ft("");coincide=K(()=>this.texto().trim().toUpperCase()===this.data.codigo.trim().toUpperCase());confirmar(){this.coincide()&&this.ref.close(true);}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-eliminar-region-dialog"]],decls:28,vars:5,consts:[["mat-dialog-title","",1,"warn-title"],[1,"muted"],["appearance","outline",1,"full"],["matInput","","name","verif","autocomplete","off",3,"ngModelChange","keydown.enter","ngModel"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","","color","warn",3,"click","disabled"]],template:function(e,t){e&1&&(si$1(0,"h2",0)(1,"mat-icon"),ZI(2,"warning"),Cc(),ZI(3," Eliminar regi\xF3n"),Cc(),si$1(4,"mat-dialog-content")(5,"p"),ZI(6,"Vas a eliminar la regi\xF3n "),si$1(7,"strong"),ZI(8),Cc(),ZI(9),Cc(),si$1(10,"p",1),ZI(11," Se borrar\xE1n tambi\xE9n sus "),si$1(12,"strong"),ZI(13,"equipos vac\xEDos"),Cc(),ZI(14," con su tablero y sprints. Se bloquea si alg\xFAn equipo tiene tareas o t\xE9cnicos exclusivos de esta regi\xF3n. "),si$1(15,"strong"),ZI(16,"Esta acci\xF3n no se puede deshacer."),Cc()(),si$1(17,"mat-form-field",2)(18,"mat-label"),ZI(19),Cc(),si$1(20,"input",3),yp("ngModelChange",function(i){return t.texto.set(i)})("keydown.enter",function(){return t.confirmar()}),Cc(),Gv(),Cc()(),si$1(21,"mat-dialog-actions",4)(22,"button",5),yp("click",function(){return t.ref.close(false)}),ZI(23,"Cancelar"),Cc(),si$1(24,"button",6),yp("click",function(){return t.confirmar()}),si$1(25,"mat-icon"),ZI(26,"delete_outline"),Cc(),ZI(27," Eliminar regi\xF3n "),Cc()()),e&2&&(Oy(8),Rp(t.data.nombre),Oy(),xc(" (",t.data.codigo,")."),Oy(10),xc("Escribe ",t.data.codigo," para confirmar"),Oy(),up("ngModel",t.texto()),Qv(),Oy(4),up("disabled",!t.coincide()));},dependencies:[ta,ie,Xn,bn$1,Ht,Nt,zt,Vt,va,ga,yi$1,vi$1,de,nt,oe,nn,tn],styles:[".full[_ngcontent-%COMP%]{width:100%}.muted[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #666);font-size:.9rem}.warn-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.warn-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#d32f2f}"]})};var ut=(l,a)=>a.id;function vi(l,a){if(l&1){let e=yI();si$1(0,"tr")(1,"td"),ZI(2),Cc(),si$1(3,"td"),ZI(4),Cc(),si$1(5,"td"),ZI(6),Cc(),si$1(7,"td",16)(8,"button",17),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.editarRegional(n))}),si$1(9,"mat-icon"),ZI(10,"edit"),Cc()(),si$1(11,"button",18),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.quitarRegional(n))}),si$1(12,"mat-icon"),ZI(13,"delete_outline"),Cc()()()();}if(l&2){let e=a.$implicit;Mp("fila-inactiva",!e.activo),Oy(2),Rp(e.codigo),Oy(2),Rp(e.nombre),Oy(2),Rp(e.activo?"S\xED":"No");}}function yi(l,a){if(l&1){let e=yI();si$1(0,"tr")(1,"td"),ZI(2),Cc(),si$1(3,"td"),ZI(4),Cc(),si$1(5,"td"),ZI(6),Cc(),si$1(7,"td"),ZI(8),Cc(),si$1(9,"td"),ZI(10),Cc(),si$1(11,"td",19)(12,"button",20),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.editarEquipo(n))}),si$1(13,"mat-icon"),ZI(14,"edit"),Cc()()()();}if(l&2){let e=a.$implicit;Mp("fila-inactiva",!e.activo),Oy(2),Rp(e.codigo),Oy(2),Rp(e.nombre),Oy(2),Rp(e.regionalNombre),Oy(2),Rp(e.responsableNombre||"\u2014"),Oy(2),Rp(e.activo?"S\xED":"No");}}function Ci(l,a){if(l&1){let e=yI();si$1(0,"tr")(1,"td"),ZI(2),Cc(),si$1(3,"td"),ZI(4),Cc(),si$1(5,"td"),ZI(6),Cc(),si$1(7,"td"),ZI(8),Cc(),si$1(9,"td"),ZI(10),Cc(),si$1(11,"td",19)(12,"button",21),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.quitarCliente(n))}),si$1(13,"mat-icon"),ZI(14,"delete_outline"),Cc()()()();}if(l&2){let e=a.$implicit;Oy(2),Rp(e.codigo),Oy(2),Rp(e.nombre),Oy(2),Rp(e.helpdeskClientId||"\u2014"),Oy(2),Rp(e.equipoResponsableNombre),Oy(2),Rp(e.activo?"S\xED":"No");}}function wi(l,a){if(l&1&&(si$1(0,"span",15),ZI(1),Cc()),l&2){let e=EI();Oy(),Op("",e.asignacionesFiltradas().length," de ",e.asignaciones().length);}}function xi(l,a){if(l&1){let e=yI();si$1(0,"tr")(1,"td"),ZI(2),Cc(),si$1(3,"td"),ZI(4),Cc(),si$1(5,"td"),ZI(6),Cc(),si$1(7,"td"),ZI(8),Cc(),si$1(9,"td"),ZI(10),Cc(),si$1(11,"td"),ZI(12),Cc(),si$1(13,"td",16)(14,"button",22),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.editarAsignacion(n))}),si$1(15,"mat-icon"),ZI(16,"edit"),Cc()(),si$1(17,"button",23),yp("click",function(){let n=eu(e).$implicit,i=EI();return tu(i.quitarAsignacion(n))}),si$1(18,"mat-icon"),ZI(19,"delete_outline"),Cc()()()();}if(l&2){let e=a.$implicit;Oy(2),Rp(e.usuarioNombre),Oy(2),Rp(e.rolNombre),Oy(2),Rp(e.alcanceTipo),Oy(2),Rp(e.alcanceNombre),Oy(2),Rp(e.vigenteDesde),Oy(2),Rp(e.vigenteHasta||"\u2014");}}var wn=class l{api=D(u);hd=D(J);auth=D(Xp);snack=D(Qt);dialog=D(ee);puedeAsignarAdmin=this.auth.puedeAsignarAdmin;regionales=Ft([]);equipos=Ft([]);clientes=Ft([]);roles=Ft([]);asignaciones=Ft([]);cargando=Ft(false);hdUsers=this.hd.hdUsers;asignacionesVista=K(()=>{let a=new Map(this.hdUsers().map(e=>[String(e.id),e.name]));return this.asignaciones().map(e=>{let t=e.helpdeskUserId?String(e.helpdeskUserId):"",n=t?a.get(t):void 0;return n&&n!==t?$(B({},e),{usuarioNombre:n}):e})});equiposVista=K(()=>{let a=new Map(this.hdUsers().map(e=>[String(e.id),e.name]));return this.equipos().map(e=>{let t=e.responsableHelpdeskUserId?String(e.responsableHelpdeskUserId):"",n=t?a.get(t):void 0;return n&&n!==t?$(B({},e),{responsableNombre:n}):e})});asigBuscar=Ft("");asignacionesFiltradas=K(()=>{let a=this.asigBuscar().trim().toLowerCase(),e=this.asignacionesVista();return a?e.filter(t=>(t.usuarioNombre??"").toLowerCase().includes(a)||(t.helpdeskUserId??"").toLowerCase().includes(a)||(t.rolNombre??"").toLowerCase().includes(a)||(t.alcanceNombre??"").toLowerCase().includes(a)):e});sortReg=Ft({col:"nombre",dir:1});sortEq=Ft({col:"nombre",dir:1});sortCli=Ft({col:"nombre",dir:1});sortAsig=Ft({col:"usuarioNombre",dir:1});sorts={reg:this.sortReg,eq:this.sortEq,cli:this.sortCli,asig:this.sortAsig};regionalesOrd=this.ordenar(this.regionales,this.sortReg);equiposOrd=this.ordenar(this.equiposVista,this.sortEq);clientesOrd=this.ordenar(this.clientes,this.sortCli);asignacionesOrd=this.ordenar(this.asignacionesFiltradas,this.sortAsig);constructor(){this.recargar(),this.hd.getHdUsers();}ordenar(a,e){return K(()=>{let{col:t,dir:n}=e();return [...a()].sort((i,p)=>this.cmp(i[t],p[t])*n)})}cmp(a,e){return a==null&&e==null?0:a==null?-1:e==null?1:typeof a=="number"&&typeof e=="number"?a-e:typeof a=="boolean"&&typeof e=="boolean"?a===e?0:a?1:-1:String(a).localeCompare(String(e),"es",{numeric:true,sensitivity:"base"})}ordenarPor(a,e){let t=this.sorts[a];if(!t)return;let n=t();t.set({col:e,dir:n.col===e?n.dir*-1:1});}flecha(a,e){let t=this.sorts[a]?.();return t&&t.col===e?t.dir===1?" \u25B2":" \u25BC":""}async recargar(){this.cargando.set(true);try{let[a,e,t,n,i]=await Promise.all([this.api.regionales(),this.api.equipos(),this.api.clientes(),this.api.roles(),this.api.asignaciones()]);this.regionales.set(a),this.equipos.set(e),this.clientes.set(t),this.roles.set(n),this.asignaciones.set(i);}catch{this.snack.open("No se pudieron cargar los datos de administraci\xF3n.","OK",{duration:4e3});}finally{this.cargando.set(false);}}async nuevaRegional(){await ch(this.dialog.open(Ge,{width:"420px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarRegional(a){await ch(this.dialog.open(Ge,{data:{regional:a},width:"420px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarRegional(a){if(await ch(this.dialog.open(bt,{data:{codigo:a.codigo,nombre:a.nombre},width:"440px",maxWidth:"95vw"}).afterClosed()))try{await this.api.eliminarRegional(a.id),this.snack.open("Regional eliminada","",{duration:2e3}),await this.recargar();}catch(t){let n=t?.error?.error;this.snack.open(n??"No se pudo eliminar la regional.","OK",{duration:5e3});}}async nuevoEquipo(){await ch(this.dialog.open(Qe,{data:{regionales:this.regionales()},width:"460px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarEquipo(a){await ch(this.dialog.open(Qe,{data:{regionales:this.regionales(),equipo:a},width:"460px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}equiposParaSelector(a){let e=this.equipos().filter(t=>t.activo);if(a!=null&&!e.some(t=>t.id===a)){let t=this.equipos().find(n=>n.id===a);if(t)return [...e,t]}return e}async nuevoCliente(){await ch(this.dialog.open(mt,{data:{equipos:this.equiposParaSelector(),yaRegistrados:this.clientes().map(e=>String(e.helpdeskClientId))},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarCliente(a){if(confirm(`\xBFQuitar el cliente "${a.nombre}"? Se desliga de su equipo/regi\xF3n y se borra.`))try{await this.api.eliminarCliente(a.id),this.snack.open("Cliente quitado","",{duration:2e3}),await this.recargar();}catch{this.snack.open("No se pudo quitar el cliente.","OK",{duration:4e3});}}async nuevaAsignacion(a){await ch(this.dialog.open(ze,{data:{roles:this.roles(),equipos:this.equiposParaSelector(),clientes:this.clientes(),regionales:this.regionales(),usuarioPreHid:a},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async editarAsignacion(a){if(a.rolCodigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede modificar asignaciones de rol ADMIN.","OK",{duration:4e3});return}await ch(this.dialog.open(ze,{data:{roles:this.roles(),equipos:this.equiposParaSelector(a.alcanceTipo==="EQUIPO"?a.alcanceObjetivoId:null),clientes:this.clientes(),regionales:this.regionales(),asignacion:a},width:"560px",maxWidth:"95vw"}).afterClosed())&&await this.recargar();}async quitarAsignacion(a){if(a.rolCodigo==="ADMIN"&&!this.puedeAsignarAdmin()){this.snack.open("Solo un ADMIN puede quitar asignaciones de rol ADMIN.","OK",{duration:4e3});return}if(confirm(`\xBFQuitar la asignaci\xF3n "${a.usuarioNombre} \xB7 ${a.rolCodigo} \xB7 ${a.alcanceNombre??""}"?`))try{await this.api.eliminarAsignacion(a.id),this.snack.open("Asignaci\xF3n quitada","",{duration:2e3}),await this.recargar();}catch{this.snack.open("No se pudo quitar la asignaci\xF3n.","OK",{duration:4e3});}}static \u0275fac=function(e){return new(e||l)};static \u0275cmp=PE({type:l,selectors:[["app-administracion"]],decls:108,vars:21,consts:[[1,"admin"],[1,"admin-head"],["mat-stroked-button","",3,"click","disabled"],["label","Regionales"],[1,"tab-body"],[1,"tab-actions"],["mat-flat-button","","color","primary",3,"click"],[1,"grid"],[1,"sortable",3,"click"],[3,"fila-inactiva"],["label","Equipos"],["label","Clientes"],["label","Asignaciones"],[1,"buscador"],["type","search","placeholder","Buscar por nombre, rol o alcance\u2026",3,"input","value"],[1,"muted"],[1,"acciones","acciones-2"],["mat-icon-button","","title","Editar regional","aria-label","Editar regional",3,"click"],["mat-icon-button","","color","warn","title","Eliminar regional","aria-label","Eliminar regional",3,"click"],[1,"acciones"],["mat-icon-button","","title","Editar equipo","aria-label","Editar equipo",3,"click"],["mat-icon-button","","color","warn","title","Quitar cliente","aria-label","Quitar cliente",3,"click"],["mat-icon-button","","title","Editar asignaci\xF3n","aria-label","Editar asignaci\xF3n",3,"click"],["mat-icon-button","","color","warn","title","Quitar asignaci\xF3n","aria-label","Quitar asignaci\xF3n",3,"click"]],template:function(e,t){e&1&&(si$1(0,"div",0)(1,"header",1)(2,"h1"),ZI(3,"Administraci\xF3n"),Cc(),si$1(4,"button",2),yp("click",function(){return t.recargar()}),si$1(5,"mat-icon"),ZI(6,"refresh"),Cc(),ZI(7," Recargar "),Cc()(),si$1(8,"mat-tab-group")(9,"mat-tab",3)(10,"div",4)(11,"div",5)(12,"button",6),yp("click",function(){return t.nuevaRegional()}),si$1(13,"mat-icon"),ZI(14,"add"),Cc(),ZI(15," Nueva regional "),Cc()(),si$1(16,"table",7)(17,"thead")(18,"tr")(19,"th",8),yp("click",function(){return t.ordenarPor("reg","codigo")}),ZI(20),Cc(),si$1(21,"th",8),yp("click",function(){return t.ordenarPor("reg","nombre")}),ZI(22),Cc(),si$1(23,"th",8),yp("click",function(){return t.ordenarPor("reg","activo")}),ZI(24),Cc(),dp(25,"th"),Cc()(),si$1(26,"tbody"),uI(27,vi,14,5,"tr",9,ut),Cc()()()(),si$1(29,"mat-tab",10)(30,"div",4)(31,"div",5)(32,"button",6),yp("click",function(){return t.nuevoEquipo()}),si$1(33,"mat-icon"),ZI(34,"add"),Cc(),ZI(35," Nuevo equipo "),Cc()(),si$1(36,"table",7)(37,"thead")(38,"tr")(39,"th",8),yp("click",function(){return t.ordenarPor("eq","codigo")}),ZI(40),Cc(),si$1(41,"th",8),yp("click",function(){return t.ordenarPor("eq","nombre")}),ZI(42),Cc(),si$1(43,"th",8),yp("click",function(){return t.ordenarPor("eq","regionalNombre")}),ZI(44),Cc(),si$1(45,"th",8),yp("click",function(){return t.ordenarPor("eq","responsableNombre")}),ZI(46),Cc(),si$1(47,"th",8),yp("click",function(){return t.ordenarPor("eq","activo")}),ZI(48),Cc(),dp(49,"th"),Cc()(),si$1(50,"tbody"),uI(51,yi,15,7,"tr",9,ut),Cc()()()(),si$1(53,"mat-tab",11)(54,"div",4)(55,"div",5)(56,"button",6),yp("click",function(){return t.nuevoCliente()}),si$1(57,"mat-icon"),ZI(58,"add"),Cc(),ZI(59," Nuevo cliente "),Cc()(),si$1(60,"table",7)(61,"thead")(62,"tr")(63,"th",8),yp("click",function(){return t.ordenarPor("cli","codigo")}),ZI(64),Cc(),si$1(65,"th",8),yp("click",function(){return t.ordenarPor("cli","nombre")}),ZI(66),Cc(),si$1(67,"th",8),yp("click",function(){return t.ordenarPor("cli","helpdeskClientId")}),ZI(68),Cc(),si$1(69,"th",8),yp("click",function(){return t.ordenarPor("cli","equipoResponsableNombre")}),ZI(70),Cc(),si$1(71,"th",8),yp("click",function(){return t.ordenarPor("cli","activo")}),ZI(72),Cc(),dp(73,"th"),Cc()(),si$1(74,"tbody"),uI(75,Ci,15,5,"tr",null,ut),Cc()()()(),si$1(77,"mat-tab",12)(78,"div",4)(79,"div",5)(80,"div",13)(81,"mat-icon"),ZI(82,"search"),Cc(),si$1(83,"input",14),yp("input",function(i){return t.asigBuscar.set(i.target.value)}),Cc()(),sI(84,wi,2,2,"span",15),si$1(85,"button",6),yp("click",function(){return t.nuevaAsignacion()}),si$1(86,"mat-icon"),ZI(87,"add"),Cc(),ZI(88," Nueva asignaci\xF3n "),Cc()(),si$1(89,"table",7)(90,"thead")(91,"tr")(92,"th",8),yp("click",function(){return t.ordenarPor("asig","usuarioNombre")}),ZI(93),Cc(),si$1(94,"th",8),yp("click",function(){return t.ordenarPor("asig","rolCodigo")}),ZI(95),Cc(),si$1(96,"th",8),yp("click",function(){return t.ordenarPor("asig","alcanceTipo")}),ZI(97),Cc(),si$1(98,"th",8),yp("click",function(){return t.ordenarPor("asig","alcanceNombre")}),ZI(99),Cc(),si$1(100,"th",8),yp("click",function(){return t.ordenarPor("asig","vigenteDesde")}),ZI(101),Cc(),si$1(102,"th"),ZI(103,"Hasta"),Cc(),dp(104,"th"),Cc()(),si$1(105,"tbody"),uI(106,xi,20,6,"tr",null,ut),Cc()()()()()()),e&2&&(Oy(4),up("disabled",t.cargando()),Oy(16),xc("C\xF3digo",t.flecha("reg","codigo")),Oy(2),xc("Nombre",t.flecha("reg","nombre")),Oy(2),xc("Activo",t.flecha("reg","activo")),Oy(3),dI(t.regionalesOrd()),Oy(13),xc("C\xF3digo",t.flecha("eq","codigo")),Oy(2),xc("Nombre",t.flecha("eq","nombre")),Oy(2),xc("Regional",t.flecha("eq","regionalNombre")),Oy(2),xc("Responsable",t.flecha("eq","responsableNombre")),Oy(2),xc("Activo",t.flecha("eq","activo")),Oy(3),dI(t.equiposOrd()),Oy(13),xc("C\xF3digo",t.flecha("cli","codigo")),Oy(2),xc("Nombre",t.flecha("cli","nombre")),Oy(2),xc("ID HD",t.flecha("cli","helpdeskClientId")),Oy(2),xc("Equipo responsable",t.flecha("cli","equipoResponsableNombre")),Oy(2),xc("Activo",t.flecha("cli","activo")),Oy(3),dI(t.clientesOrd()),Oy(8),up("value",t.asigBuscar()),Oy(),aI(t.asigBuscar().trim()?84:-1),Oy(9),xc("Usuario",t.flecha("asig","usuarioNombre")),Oy(2),xc("Rol",t.flecha("asig","rolCodigo")),Oy(2),xc("Alcance",t.flecha("asig","alcanceTipo")),Oy(2),xc("Objetivo",t.flecha("asig","alcanceNombre")),Oy(2),xc("Desde",t.flecha("asig","vigenteDesde")),Oy(5),dI(t.asignacionesOrd()));},dependencies:[hn,Dt,un,va,ga,An$1,yi$1,vi$1],styles:[".admin[_ngcontent-%COMP%]{padding:16px;max-width:1100px;margin:0 auto}.admin-head[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem}.tab-body[_ngcontent-%COMP%]{padding:16px 4px}.tab-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:12px}.buscador[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;margin-right:auto;padding:4px 10px;border:1px solid rgba(0,0,0,.18);border-radius:20px;background:#fff;min-width:260px}.buscador[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#0006;font-size:20px;width:20px;height:20px}.buscador[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:14px}.crear[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:12px}.crear[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.crear[_ngcontent-%COMP%]   mat-form-field.ancho[_ngcontent-%COMP%]{width:300px}.crear[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:48px}.opt-buscar[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;border:none;outline:none;padding:6px 4px;font:inherit;background:transparent}.acciones[_ngcontent-%COMP%]{width:48px;text-align:center}.acciones.acciones-2[_ngcontent-%COMP%]{width:96px;white-space:nowrap}.rolchips[_ngcontent-%COMP%]{display:inline-flex;flex-wrap:wrap;gap:6px}.chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 4px 2px 8px;border-radius:999px;background:#3f51b51f;color:#303f9f;font-size:.78rem;white-space:nowrap}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]{cursor:pointer}.chip[_ngcontent-%COMP%]   .chip-txt[_ngcontent-%COMP%]:hover{text-decoration:underline}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]{border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;line-height:1;padding:0 2px;border-radius:999px;opacity:.6}.chip[_ngcontent-%COMP%]   .chip-x[_ngcontent-%COMP%]:hover{opacity:1;background:#0000001a}.muted[_ngcontent-%COMP%]{color:#0006;font-style:italic}.dialog-form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:8px;box-sizing:border-box}.dialog-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 200px;min-width:0}.dialog-form[_ngcontent-%COMP%]   mat-form-field.full[_ngcontent-%COMP%]{flex:1 1 100%}mat-dialog-content[_ngcontent-%COMP%]{overflow-x:hidden}.color-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px}.color-field.full[_ngcontent-%COMP%]{width:100%}.color-label[_ngcontent-%COMP%]{font-size:.75rem;color:#0009}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.swatch[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:6px;border:2px solid rgba(0,0,0,.12);cursor:pointer;padding:0;position:relative;display:inline-flex;align-items:center;justify-content:center}.swatch.sel[_ngcontent-%COMP%]{border-color:#000000d9;box-shadow:0 0 0 2px #fff inset}.swatch[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0000008c}.swatch.custom[_ngcontent-%COMP%]{overflow:hidden;background:repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 50%/12px 12px}.swatch.custom[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%]{position:absolute;inset:0;opacity:0;cursor:pointer;border:none;padding:0}.swatch.clear[_ngcontent-%COMP%]{background:#fff}.grid[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:.9rem}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:left;padding:8px 12px;border-bottom:1px solid rgba(0,0,0,.08)}.grid[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;color:#0009;white-space:nowrap}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]{cursor:pointer;-webkit-user-select:none;user-select:none}.grid[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover{color:#000000d9}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#00000008}.grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.fila-inactiva[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{color:#00000061;font-style:italic}"]})};export{wn as Administracion};