import {l}from'./chunk-qnMPLC6y.js';import {d,f as f$1}from'./chunk-530QPjnU.js';import {T,U}from'./chunk-B5EHog6R.js';import {v}from'./chunk-RommtJhE.js';import {p}from'./chunk-BoobtWGm.js';import {Q as Qt$1}from'./chunk-CLB3wZAk.js';import {K}from'./chunk-BjOnMKI8.js';import {y as yt,w as wt}from'./chunk-DtavzG_0.js';import {f,E as EE,_ as _r,S as Sh,c as fe,M as Me,o as oe,F,W,g as v2,h as da,i as _2,p as pi,l as le,n as ft,K as Kt$1,q as _h,r as qc,R as RN,u as uM,L as La,e as ec,C as CT,a as fS,m as mf,v as vC,J as Ja,s as sb,d as dy,T as TT,D as DC,t as _y,$ as $T,x as vi,y as _t,z as Wo,V as Vo,A as No,B as jo,G as zo,H as AT,w as wf,I as NT,P as $e,Q as Oe,U as e_,X as ge,Y as Te,Z as L,a0 as BT,a1 as HT,a2 as tS,a3 as nc,a4 as tc,a5 as _f,a6 as If,a7 as Kt$2,a8 as v4,a9 as Rh,aa as km,ab as Qt$2,ac as iy,ad as Uy,ae as _i,af as by,ag as FT,j as jT,ah as ay,N as Ny,ai as BE,aj as NE,ak as H,al as yi,am as jE,an as y,ao as U$1,ap as re,aq as Eu,ar as X$1,as as bi,at as Bt,au as zE,av as Re$1,aw as Dy,ax as DR,ay as Xc,az as cr,aA as tt,aB as Oo,aC as Ln,aD as O_,aE as F_,aF as py,aG as De,aH as cg,aI as ug,aJ as iv}from'./main-IEKXYXAF.js';import {d as da$1,l as ln$1,i as ia,j as ji,A as Aa,e as eo,h as he$1,L as Lr,F as Fa}from'./chunk-C1I5MRnT.js';var _e=["*"],Ut=["content"],Ot=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],St=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function Qt(i,a){if(i&1){let e=FT();La(0,"div",1),ec("click",function(){cg(e);let n=jT();return ug(n._onBackdropClicked())}),mf();}if(i&2){let e=jT();nc("mat-drawer-shown",e._isShowingBackdrop());}}function qt(i,a){i&1&&(La(0,"mat-drawer-content"),HT(1,2),mf());}function Wt(i,a){if(i&1){let e=FT();La(0,"div",1),ec("click",function(){cg(e);let n=jT();return ug(n._onBackdropClicked())}),mf();}if(i&2){let e=jT();nc("mat-drawer-shown",e._isShowingBackdrop());}}function Ht(i,a){i&1&&(La(0,"mat-sidenav-content"),HT(1,2),mf());}var Gt=`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`;var $t=new y("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>false}),Fe=new y("MAT_DRAWER_CONTAINER"),X=(()=>{class i extends Qt$2{_platform=f(Te);_changeDetectorRef=f(bi);_element=f(ge);_ngZone=f(H);_isInert=false;_container=f(Re);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck());}_drawerToggled(e){e.opened?this._ngZone.runOutsideAngular(()=>{e._animationEnd.pipe(F_(50),Re$1(1)).subscribe(()=>this._updateInert());}):this._updateInert();}_updateInert(){let e=this._container._isShowingBackdrop();if(e!==this._isInert){let t=this._element.nativeElement;this._isInert=e,e?t.setAttribute("inert","true"):t.removeAttribute("inert");}}_shouldBeHidden(){if(this._platform.isBrowser)return  false;let{start:e,end:t}=this._container;return e!=null&&e.mode!=="over"&&e.opened||t!=null&&t.mode!=="over"&&t.opened}static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(i)))(n||i)}})();static \u0275cmp=Kt$1({type:i,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(t,n){t&2&&(by("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),nc("mat-drawer-content-hidden",n._shouldBeHidden()));},features:[Uy([{provide:Qt$2,useExisting:i}]),iy],ngContentSelectors:_e,decls:1,vars:0,template:function(t,n){t&1&&(BT(),HT(0));},encapsulation:2})}return i})(),Ae=(()=>{class i{_elementRef=f(ge);_focusTrapFactory=f(BE);_focusMonitor=f(NE);_platform=f(Te);_ngZone=f(H);_renderer=f(yi);_interactivityChecker=f(jE);_doc=f(L);_container=f(Fe,{optional:true});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=false;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit());}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next();}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=v4(e);}_disableClose=false;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=v4(e)),this._autoFocus=e;}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(v4(e));}_opened=W(false);_openedVia=null;_animationStarted=new U$1;_animationEnd=new U$1;openedChange=new re(true);_openedStream=this.openedChange.pipe(le(e=>e),F(()=>{}));openedStart=this._animationStarted.pipe(le(()=>this.opened),Eu(void 0));_closedStream=this.openedChange.pipe(le(e=>!e),F(()=>{}));closedStart=this._animationStarted.pipe(le(()=>!this.opened),Eu(void 0));_destroyed=new U$1;onPositionChanged=new re;_content;_modeChanged=new U$1;_injector=f(X$1);_changeDetectorRef=f(bi);constructor(){this.openedChange.pipe(Bt(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program");}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,t=this._elementRef.nativeElement;return [e.listen(t,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!zE(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault();});}),e.listen(t,"transitionend",this._handleTransitionEvent),e.listen(t,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened);});}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&(this._interactivityChecker.isFocusable(n)||(n.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let c=()=>{p(),w(),n.removeAttribute("tabindex");},p=this._renderer.listen(n,"blur",c),w=this._renderer.listen(n,"mousedown",c);})),n.focus(t));}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case  false:case "dialog":return;case  true:case "first-tabbable":pi(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus();},{injector:this._injector});break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null);}_isFocusWithinDrawer(){let e=this._doc.activeElement;return !!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=true,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState());}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete();}open(e){return this.toggle(true,e)}close(){return this.toggle(false)}_closeViaBackdropClick(){return this._setOpen(false,true,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let n=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),n}_setOpen(e,t,n){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(true),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next();}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&t&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(c=>{this.openedChange.pipe(Re$1(1)).subscribe(p=>c(p?"open":"close"));}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e);}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop());}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,n=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,t)),n.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor);}_handleTransitionEvent=e=>{let t=this._elementRef.nativeElement;e.target===t&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(false),this._animationEnd.next(e);});};static \u0275fac=function(t){return new(t||i)};static \u0275cmp=Kt$1({type:i,selectors:[["mat-drawer"]],viewQuery:function(t,n){if(t&1&&Dy(Ut,5),t&2){let c;_f(c=If())&&(n._content=c.first);}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(t,n){t&2&&(_i("align",null)("tabIndex",n.mode!=="side"?"-1":null),by("visibility",!n._container&&!n.opened?"hidden":null),nc("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"));},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:_e,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(BT(),La(0,"div",1,0),HT(2),mf());},dependencies:[Qt$2],encapsulation:2})}return i})(),Re=(()=>{class i{_dir=f(DR,{optional:true});_element=f(ge);_ngZone=f(H);_changeDetectorRef=f(bi);_animationDisabled=Xc();_transitionsEnabled=false;_allDrawers;_drawers=new cr;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=v4(e);}_autosize=f($t);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:v4(e);}_backdropOverride=null;backdropClick=new re;_start=null;_end=null;_left=null;_right=null;_destroyed=new U$1;_doCheckSubject=new U$1;_contentMargins={left:null,right:null};_contentMarginChanges=new U$1;get scrollable(){return this._userContent||this._content}_injector=f(X$1);constructor(){let e=f(Te),t=f(tt);this._dir?.change.pipe(Bt(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins();}),t.change().pipe(Bt(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=true;},200);});}ngAfterContentInit(){this._allDrawers.changes.pipe(Oo(this._allDrawers),Bt(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges();}),this._drawers.changes.pipe(Oo(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e);}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Ln(10),Bt(this._destroyed)).subscribe(()=>this.updateContentMargins());});}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete();}open(){this._drawers.forEach(e=>e.open());}close(){this._drawers.forEach(e=>e.close());}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();e+=n,t-=n;}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();t+=n,e-=n;}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)));}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next());}_watchDrawerToggle(e){e._animationStarted.pipe(Bt(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),e.mode!=="side"&&e.openedChange.pipe(Bt(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened));}_watchDrawerPosition(e){e.onPositionChanged.pipe(Bt(this._drawers.changes)).subscribe(()=>{pi({read:()=>this._validateDrawers()},{injector:this._injector});});}_watchDrawerMode(e){e._modeChanged.pipe(Bt(O_(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();});}_setContainerClass(e){let t=this._element.nativeElement.classList,n="mat-drawer-container-has-open";e?t.add(n):t.remove(n);}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e);}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end);}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop();}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick());}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=Kt$1({type:i,selectors:[["mat-drawer-container"]],contentQueries:function(t,n,c){if(t&1&&tc(c,X,5)(c,Ae,5),t&2){let p;_f(p=If())&&(n._content=p.first),_f(p=If())&&(n._allDrawers=p);}},viewQuery:function(t,n){if(t&1&&Dy(X,5),t&2){let c;_f(c=If())&&(n._userContent=c.first);}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,n){t&2&&nc("mat-drawer-container-explicit-backdrop",n._backdropOverride);},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[Uy([{provide:Fe,useExisting:i}])],ngContentSelectors:St,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(BT(Ot),CT(0,Qt,1,2,"div",0),HT(1),HT(2,1),CT(3,qt,2,0,"mat-drawer-content")),t&2&&(TT(n.hasBackdrop?0:-1),sb(3),TT(n._content?-1:3));},dependencies:[X],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2})}return i})(),he=(()=>{class i extends X{static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(i)))(n||i)}})();static \u0275cmp=Kt$1({type:i,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[Uy([{provide:Qt$2,useExisting:i},{provide:X,useExisting:i}]),iy],ngContentSelectors:_e,decls:1,vars:0,template:function(t,n){t&1&&(BT(),HT(0));},encapsulation:2})}return i})(),Be=(()=>{class i extends Ae{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=v4(e);}_fixedInViewport=false;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=Rh(e);}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=Rh(e);}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(i)))(n||i)}})();static \u0275cmp=Kt$1({type:i,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(t,n){t&2&&(_i("tabIndex",n.mode!=="side"?"-1":null)("align",null),by("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),nc("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport));},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[Uy([{provide:Ae,useExisting:i}]),iy],ngContentSelectors:_e,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,n){t&1&&(BT(),La(0,"div",1,0),HT(2),mf());},dependencies:[Qt$2],encapsulation:2})}return i})(),Tt=(()=>{class i extends Re{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(n){return (e||(e=km(i)))(n||i)}})();static \u0275cmp=Kt$1({type:i,selectors:[["mat-sidenav-container"]],contentQueries:function(t,n,c){if(t&1&&tc(c,he,5)(c,Be,5),t&2){let p;_f(p=If())&&(n._content=p.first),_f(p=If())&&(n._allDrawers=p);}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(t,n){t&2&&nc("mat-drawer-container-explicit-backdrop",n._backdropOverride);},exportAs:["matSidenavContainer"],features:[Uy([{provide:Fe,useExisting:i},{provide:Re,useExisting:i}]),iy],ngContentSelectors:St,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,n){t&1&&(BT(Ot),CT(0,Wt,1,2,"div",0),HT(1),HT(2,1),CT(3,Ht,2,0,"mat-sidenav-content")),t&2&&(TT(n.hasBackdrop?0:-1),sb(3),TT(n._content?-1:3));},dependencies:[he],styles:[Gt],encapsulation:2})}return i})(),At=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=$e({type:i});static \u0275inj=Oe({imports:[Kt$2,e_,Kt$2]})}return i})();var Kt=["*",[["mat-toolbar-row"]]],Yt=["*","mat-toolbar-row"],Jt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=De({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),Rt=(()=>{class i{_elementRef=f(ge);_platform=f(Te);_document=f(L);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=Kt$1({type:i,selectors:[["mat-toolbar"]],contentQueries:function(t,n,c){if(t&1&&tc(c,Jt,5),t&2){let p;_f(p=If())&&(n._toolbarRows=p);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(t,n){t&2&&(tS(n.color?"mat-"+n.color:""),nc("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Yt,decls:2,vars:0,template:function(t,n){t&1&&(BT(Kt),HT(0),HT(1,1));},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2})}return i})();var Ft=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=$e({type:i});static \u0275inj=Oe({imports:[e_]})}return i})();function tn(i,a){i&1&&(Ja(0,"img",19),La(1,"div",20)(2,"mat-icon"),fS(3,"zoom_in"),mf()()),i&2&&dy("src",a,iv);}function nn(i,a){if(i&1&&(La(0,"span"),fS(1),mf()),i&2){let e=jT(2);sb(),Ny(e.iniciales());}}function an(i,a){i&1&&(La(0,"div",6)(1,"mat-icon"),fS(2,"hourglass_top"),mf()());}function on(i,a){if(i&1&&(La(0,"div",9),fS(1),mf()),i&2){let e=jT();sb(),Ny(e.email);}}function rn(i,a){if(i&1&&(La(0,"div",11)(1,"span",12),fS(2,"Rol HelpDesk"),mf(),La(3,"span",13),fS(4),mf()()),i&2){let e=jT();sb(4),Ny(e.apiRole);}}function sn(i,a){if(i&1){let e=FT();La(0,"button",21),ec("click",function(){cg(e);let n=jT(2);return ug(n.quitar())}),La(1,"mat-icon"),fS(2,"delete"),mf(),fS(3," Quitar foto "),mf();}if(i&2){let e=jT(2);dy("disabled",e.subiendo());}}function ln(i,a){if(i&1){let e=FT();La(0,"div",4)(1,"div",5),ec("click",function(){cg(e);let n=jT();return ug(n.abrirFoto())}),CT(2,tn,4,1)(3,nn,2,1,"span"),CT(4,an,3,0,"div",6),mf(),La(5,"div",7)(6,"div",8),fS(7),mf(),CT(8,on,2,1,"div",9),mf()(),La(9,"div",10),CT(10,rn,5,1,"div",11),La(11,"div",11)(12,"span",12),fS(13,"Rol FitDesk"),mf(),La(14,"span",13),fS(15),mf()(),La(16,"div",11)(17,"span",12),fS(18,"Equipo"),mf(),La(19,"span",13),fS(20),mf()()(),La(21,"div",14)(22,"label",15)(23,"mat-icon"),fS(24,"photo_camera"),mf(),fS(25," Cambiar foto "),La(26,"input",16),ec("change",function(n){cg(e);let c=jT();return ug(c.onArchivo(n))}),mf()(),CT(27,sn,4,1,"button",17),mf(),La(28,"p",18),fS(29,"La foto se guarda en tu cuenta (se ve desde cualquier dispositivo y para los dem\xE1s)."),mf();}if(i&2){let e,t=a,n=jT();sb(),by("background",n.foto()?null:t.color),nc("clickable",n.foto()),dy("title",n.foto()?"Ver foto completa":""),sb(),TT((e=n.foto())?2:3,e),sb(2),TT(n.subiendo()?4:-1),sb(3),Ny(t.name),sb(),TT(t.email?8:-1),sb(2),TT(t.apiRole?10:-1),sb(5),Ny(n.rolesFitdesk().length?n.rolesFitdesk().join(", "):"\u2014"),sb(5),Ny(n.equiposTexto()||"\u2014"),sb(2),nc("disabled",n.subiendo()),sb(4),dy("disabled",n.subiendo()),sb(),TT(n.foto()?27:-1);}}function dn(i,a){if(i&1){let e=FT();La(0,"div",22),ec("click",function(){cg(e);let n=jT();return ug(n.verFoto.set(false))}),La(1,"img",23),ec("click",function(n){return n.stopPropagation()}),mf(),La(2,"button",24),ec("click",function(){cg(e);let n=jT();return ug(n.verFoto.set(false))}),La(3,"mat-icon"),fS(4,"close"),mf()()();}if(i&2){let e=jT();sb(),dy("src",e.foto(),iv);}}var be=class i{auth=f(EE);perfil=f(f$1);ref=f(_t);snack=f(Qt$1);session=this.auth.session;subiendo=W(false);verFoto=W(false);equipos=this.perfil.misEquipos;static ROL_LABEL={ADMIN:"Administrador",RESPONSABLE_EQUIPO:"Responsable de equipo",ESPECIALISTA:"Especialista",EQUIPO:"Miembro de equipo",SCRUM_MASTER:"Scrum Master"};rolesFitdesk=oe(()=>this.auth.rolesPlataforma().map(a=>i.ROL_LABEL[a]||this.prettify(a)));equiposTexto=oe(()=>this.equipos().map(a=>a.nombre).join(", "));constructor(){this.auth.ensureRolesPlataforma(),this.perfil.cargarMiPerfil();}prettify(a){return a.toLowerCase().replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}foto(){return this.perfil.fotoDe(this.session()?.id)}abrirFoto(){this.foto()&&this.verFoto.set(true);}iniciales(){return (this.session()?.name||this.session()?.id||"").split(/\s+/).slice(0,2).map(e=>e[0]||"").join("").toUpperCase()||"?"}async onArchivo(a){let e=a.target,t=e.files?.[0];if(e.value="",!!t){if(!t.type.startsWith("image/")){this.snack.open("Selecciona un archivo de imagen","OK",{duration:3e3});return}this.subiendo.set(true);try{let n=await this.comprimir(t,320);await this.perfil.subirFoto(n),this.snack.open("Foto actualizada","OK",{duration:2500});}catch(n){this.snack.open(n?.message||"No se pudo subir la foto","OK",{duration:4e3});}finally{this.subiendo.set(false);}}}async quitar(){this.subiendo.set(true);try{await this.perfil.quitarFoto(),this.snack.open("Foto quitada","OK",{duration:2500});}finally{this.subiendo.set(false);}}cerrar(){this.ref.close();}comprimir(a,e){return new Promise((t,n)=>{let c=new Image,p=URL.createObjectURL(a);c.onload=()=>{URL.revokeObjectURL(p);let w=document.createElement("canvas");w.width=e,w.height=e;let g=w.getContext("2d");if(!g){n(new Error("No se pudo procesar la imagen"));return}let B=Math.min(c.width,c.height),jt=(c.width-B)/2,zt=(c.height-B)/2;g.drawImage(c,jt,zt,B,B,0,0,e,e),t(w.toDataURL("image/jpeg",.85));},c.onerror=()=>{URL.revokeObjectURL(p),n(new Error("Imagen inv\xE1lida"));},c.src=p;})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=Kt$1({type:i,selectors:[["app-perfil-dialog"]],decls:8,vars:2,consts:[["mat-dialog-title",""],["align","end"],["mat-button","",3,"click"],[1,"pf-lightbox"],[1,"pf-top"],[1,"pf-avatar",3,"click","title"],[1,"pf-avatar-loading"],[1,"pf-id"],[1,"pf-name"],[1,"pf-meta"],[1,"pf-rows"],[1,"pf-row"],[1,"pf-label"],[1,"pf-val"],[1,"pf-actions"],[1,"pf-btn"],["type","file","accept","image/*","hidden","",3,"change","disabled"],["mat-stroked-button","",3,"disabled"],[1,"pf-hint"],["alt","Foto de perfil",3,"src"],[1,"pf-avatar-zoom"],["mat-stroked-button","",3,"click","disabled"],[1,"pf-lightbox",3,"click"],["alt","Foto de perfil",3,"click","src"],["aria-label","Cerrar",1,"pf-lightbox-close",3,"click"]],template:function(e,t){if(e&1&&(La(0,"h2",0),fS(1,"Mi perfil"),mf(),La(2,"mat-dialog-content"),CT(3,ln,30,16),mf(),La(4,"mat-dialog-actions",1)(5,"button",2),ec("click",function(){return t.cerrar()}),fS(6,"Cerrar"),mf()(),CT(7,dn,5,1,"div",3)),e&2){let n;sb(3),TT((n=t.session())?3:-1,n),sb(4),TT(t.verFoto()?7:-1);}},dependencies:[Wo,No,jo,zo,Aa,Fa,yt,wt],styles:[".pf-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;margin-bottom:12px}.pf-avatar[_ngcontent-%COMP%]{position:relative;flex:none;width:72px;height:72px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:24px;letter-spacing:.5px}.pf-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.pf-avatar[_ngcontent-%COMP%]   .pf-avatar-loading[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#00000059;color:#fff}.pf-name[_ngcontent-%COMP%]{font-weight:700;font-size:16px}.pf-meta[_ngcontent-%COMP%]{font-size:13px;color:var(--mat-sys-on-surface-variant)}.pf-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}.pf-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid var(--mat-sys-outline, #bdbdbd);border-radius:20px;padding:6px 14px;font:inherit;font-size:14px;font-weight:500;color:var(--mat-sys-primary, #048abf)}.pf-btn.disabled[_ngcontent-%COMP%]{opacity:.6;pointer-events:none}.pf-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.pf-hint[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);margin:4px 0 0}.pf-avatar.clickable[_ngcontent-%COMP%]{cursor:zoom-in}.pf-avatar[_ngcontent-%COMP%]   .pf-avatar-zoom[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#00000040;color:#fff;opacity:0;transition:opacity .15s}.pf-avatar.clickable[_ngcontent-%COMP%]:hover   .pf-avatar-zoom[_ngcontent-%COMP%]{opacity:1}.pf-rows[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;margin:4px 0 10px;padding:8px 0;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.pf-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:8px;font-size:13px}.pf-label[_ngcontent-%COMP%]{flex:none;width:92px;color:var(--mat-sys-on-surface-variant);font-weight:600}.pf-val[_ngcontent-%COMP%]{flex:1;min-width:0}.pf-lightbox[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:2000;background:#000000d9;display:flex;align-items:center;justify-content:center;cursor:zoom-out}.pf-lightbox[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:min(90vw,480px);max-height:90vh;border-radius:8px;box-shadow:0 8px 40px #00000080;cursor:default}.pf-lightbox[_ngcontent-%COMP%]   .pf-lightbox-close[_ngcontent-%COMP%]{position:absolute;top:16px;right:16px;width:40px;height:40px;border:none;border-radius:50%;background:#ffffff26;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center}.pf-lightbox[_ngcontent-%COMP%]   .pf-lightbox-close[_ngcontent-%COMP%]:hover{background:#ffffff4d}"]})};var cn=(i,a)=>a.ticket;function mn(i,a){if(i&1&&(La(0,"span",9),fS(1),mf()),i&2){let e=jT().$implicit;sb(),Ny(e.clienteRaw);}}function pn(i,a){if(i&1&&(La(0,"span",10),fS(1),mf()),i&2){let e=jT().$implicit;sb(),Ny(e.asunto);}}function un(i,a){if(i&1&&(La(0,"span",11)(1,"mat-icon"),fS(2,"sticky_note_2"),mf(),fS(3),mf()),i&2){let e=jT().$implicit;sb(3),Ny(e.nota);}}function fn(i,a){if(i&1&&(La(0,"li")(1,"span",8),fS(2),mf(),CT(3,mn,2,1,"span",9),CT(4,pn,2,1,"span",10),CT(5,un,4,1,"span",11),mf()),i&2){let e=a.$implicit;sb(2),wf("#",e.ticket),sb(),TT(e.clienteRaw?3:-1),sb(),TT(e.asunto?4:-1),sb(),TT(e.nota?5:-1);}}var ve=class i{data=f(vi);ref=f(_t);static \u0275fac=function(e){return new(e||i)};static \u0275cmp=Kt$1({type:i,selectors:[["app-reminder-alert-dialog"]],decls:18,vars:1,consts:[["mat-dialog-title","",1,"ra-head"],[1,"ra-bell"],[1,"ra-body"],[1,"ra-sub"],[1,"ra-list"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"],[1,"ra-tk"],[1,"ra-cli"],[1,"ra-asunto"],[1,"ra-nota"]],template:function(e,t){e&1&&(La(0,"div",0)(1,"mat-icon",1),fS(2,"notifications_active"),mf(),La(3,"span"),fS(4,"Recordatorio de tickets"),mf()(),La(5,"mat-dialog-content",2)(6,"p",3),fS(7),mf(),La(8,"ul",4),AT(9,fn,6,4,"li",null,cn),mf()(),La(11,"mat-dialog-actions",5)(12,"button",6),fS(13,"Cerrar"),mf(),La(14,"button",7),ec("click",function(){return t.ref.close("ver")}),La(15,"mat-icon"),fS(16,"list"),mf(),fS(17," Ver pendientes "),mf()()),e&2&&(sb(7),wf(" ",t.data.items.length===1?"Lleg\xF3 la hora de revisar este ticket:":"Lleg\xF3 la hora de revisar estos tickets:"," "),sb(2),NT(t.data.items));},dependencies:[Wo,Vo,No,jo,zo,Aa,Fa,yt,wt],styles:[".ra-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin:0}.ra-bell[_ngcontent-%COMP%]{color:#f29e3b;animation:_ngcontent-%COMP%_ra-ring 1s ease-in-out infinite}@keyframes _ngcontent-%COMP%_ra-ring{0%,to{transform:rotate(0)}20%{transform:rotate(14deg)}40%{transform:rotate(-12deg)}60%{transform:rotate(8deg)}80%{transform:rotate(-4deg)}}.ra-sub[_ngcontent-%COMP%]{margin:0 0 8px;font-size:13px;color:var(--mat-sys-on-surface-variant)}.ra-list[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}.ra-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px;padding:8px 10px;border:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-left:3px solid #f29e3b;border-radius:8px;background:var(--mat-sys-surface-container-low, #f7f9fc)}.ra-tk[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-weight:700;color:var(--mat-sys-primary, #048abf)}.ra-cli[_ngcontent-%COMP%]{font-size:12px;font-weight:600}.ra-asunto[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);width:100%}.ra-nota[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;width:100%;font-size:12px;color:var(--mat-sys-on-surface)}.ra-nota[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px;color:#f29e3b}"]})};var hn=["shellContent"],gn=["contentEl"];function _n(i,a){if(i&1){let e=FT();La(0,"button",27),ec("click",function(){cg(e);let n=jT();return ug(n.drawerOpen.set(false))}),La(1,"mat-icon"),fS(2,"menu"),mf()();}}function bn(i,a){i&1&&(La(0,"a",11)(1,"mat-icon"),fS(2,"space_dashboard"),mf(),La(3,"span"),fS(4,"Mi Panel"),mf()());}function vn(i,a){if(i&1&&(La(0,"span",29),fS(1),mf()),i&2){let e=jT(2);_i("aria-label",e.bandejaPendientes()+" pendientes en la bandeja"),sb(),Ny(e.bandejaPendientes()>9?"9+":e.bandejaPendientes());}}function wn(i,a){if(i&1&&(La(0,"a",15)(1,"span",28)(2,"mat-icon"),fS(3,"inbox"),mf(),CT(4,vn,2,2,"span",29),mf(),La(5,"span"),fS(6,"Bandeja"),mf()()),i&2){let e=jT();sb(4),TT(e.bandejaPendientes()?4:-1);}}function xn(i,a){i&1&&(La(0,"p",8),fS(1,"Sistema"),mf(),La(2,"a",30)(3,"mat-icon"),fS(4,"settings"),mf(),La(5,"span"),fS(6,"Administraci\xF3n"),mf()());}function yn(i,a){if(i&1){let e=FT();La(0,"button",31),ec("click",function(){cg(e);let n=jT();return ug(n.gBuscar.set(""))}),La(1,"mat-icon"),fS(2,"close"),mf()();}}function Cn(i,a){i&1&&py(0);}function Mn(i,a){i&1&&(La(0,"details",21)(1,"summary",32)(2,"mat-icon",33),fS(3,"tune"),mf(),La(4,"span",34),fS(5,"Filtros"),mf(),La(6,"mat-icon",35),fS(7,"expand_more"),mf()(),La(8,"div",36),ay(9,Cn,1,0,"ng-container",37),mf()()),i&2&&(sb(9),dy("ngTemplateOutlet",a));}function kn(i,a){i&1&&py(0);}function Pn(i,a){i&1&&ay(0,kn,1,0,"ng-container",37),i&2&&dy("ngTemplateOutlet",a);}function Dn(i,a){i&1&&Ja(0,"img",39),i&2&&dy("src",a,iv);}function En(i,a){if(i&1&&fS(0),i&2){let e=jT(),t=jT();wf(" ",t.iniciales(e.name)," ");}}function On(i,a){if(i&1){let e=FT();La(0,"div",23)(1,"button",38),ec("click",function(){cg(e);let n=jT();return ug(n.abrirPerfil())}),CT(2,Dn,1,1,"img",39)(3,En,1,1),mf(),La(4,"span",40),fS(5),mf(),La(6,"button",41),ec("click",function(){cg(e);let n=jT();return ug(n.logout())}),La(7,"mat-icon"),fS(8,"logout"),mf()()();}if(i&2){let e,t=a,n=jT();sb(),by("background",n.perfil.fotoDe(t.id)?"transparent":t.color),nc("has-foto",n.perfil.fotoDe(t.id)),sb(),TT((e=n.perfil.fotoDe(t.id))?2:3,e),sb(3),Ny(t.name);}}function Sn(i,a){i&1&&Ja(0,"img",39),i&2&&dy("src",a,iv);}function Tn(i,a){if(i&1&&fS(0),i&2){let e=jT(),t=jT(2);wf(" ",t.iniciales(e.name)," ");}}function An(i,a){if(i&1){let e=FT();La(0,"button",38),ec("click",function(){cg(e);let n=jT(2);return ug(n.abrirPerfil())}),CT(1,Sn,1,1,"img",39)(2,Tn,1,1),mf();}if(i&2){let e,t=a,n=jT(2);by("background",n.perfil.fotoDe(t.id)?"transparent":t.color),nc("has-foto",n.perfil.fotoDe(t.id)),sb(),TT((e=n.perfil.fotoDe(t.id))?1:2,e);}}function Rn(i,a){if(i&1){let e=FT();La(0,"mat-toolbar",25)(1,"button",42),ec("click",function(){cg(e);let n=jT();return ug(n.drawerOpen.set(!n.opened()))}),La(2,"mat-icon"),fS(3,"menu"),mf()(),La(4,"span",43),fS(5,"Fit-Desk"),mf(),Ja(6,"span",44),CT(7,An,3,5,"button",45),mf();}if(i&2){let e,t=jT();sb(7),TT((e=t.session())?7:-1,e);}}var Vt=class i{auth=f(EE);data=f(v);helpdesk=f(K);router=f(_r);breakpoints=f(Sh);dialog=f(fe);destroyRef=f(Me);shell=f(d);perfil=f(f$1);search=f(l);transferencias=f(p);bandejaPendientes=this.transferencias.pendientesBandeja;bandejaPedida=false;alertOpen=false;audioCtx=null;session=this.auth.session;puedeVerMiPanel=this.auth.puedeVerMiPanel;mostrarAdmin=oe(()=>this.auth.puedeAdministrar()&&this.data.usesQuarkus());mostrarBandeja=oe(()=>this.auth.puedeTransferir()&&this.data.usesQuarkus());isDesktop=T(this.breakpoints.observe("(min-width: 900px)").pipe(F(a=>a.matches)),{initialValue:typeof window<"u"&&window.innerWidth>=900});fixed=oe(()=>this.isDesktop());mode=oe(()=>this.fixed()?"side":"over");currentUrl=W(this.router.url);gBuscar=W("");drawerOpen=W(false);opened=oe(()=>this.fixed()||this.drawerOpen());shellContent=v2("shellContent");contentEl=v2("contentEl");constructor(){da(()=>{!this.auth.session()&&!this.router.url.startsWith("/login")&&(this.dialog.closeAll(),this.router.navigate(["/login"]));}),da(()=>{this.mostrarBandeja()&&!this.bandejaPedida&&(this.bandejaPedida=true,this.transferencias.refrescarPendientesBandeja());}),this.data.ensureInit().then(()=>{this.data.startStreaming(),this.checkReminders();}),this.helpdesk.getHdUsers(),this.helpdesk.getClients(),this.perfil.cargarFotos();let a=setInterval(()=>this.checkReminders(),30*1e3);if(this.destroyRef.onDestroy(()=>clearInterval(a)),typeof window<"u"){let e=()=>{try{this.ensureAudio()?.resume();}catch{}window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e);};window.addEventListener("pointerdown",e),window.addEventListener("keydown",e),this.destroyRef.onDestroy(()=>{window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e);});}_2(()=>{let e=this.fixed()||!this.opened(),t=this.shellContent()?.nativeElement;t&&e&&t.removeAttribute("inert");}),pi(()=>this.shell.registerContent(this.contentEl()?.nativeElement??null)),pi(()=>{let e=this.shellContent()?.nativeElement;if(!e)return;let t=()=>{(this.fixed()||!this.opened())&&e.hasAttribute("inert")&&e.removeAttribute("inert");};t();let n=new MutationObserver(t);n.observe(e,{attributes:true,attributeFilter:["inert"]}),this.destroyRef.onDestroy(()=>n.disconnect());}),this.router.events.pipe(le(e=>e instanceof ft),U()).subscribe(e=>{this.currentUrl.set(e.urlAfterRedirects),this.fixed()||this.drawerOpen.set(false);});}buscarGlobal(){let a=this.gBuscar().trim();a&&(this.search.buscar(/^\d+$/.test(a)?"ticket":"palabra",a),this.gBuscar.set(""),this.router.navigate(["/tickets"]),this.fixed()||this.drawerOpen.set(false));}static ALERTED_KEY="fit-daily_alerted";alarmaCache=[];alarmaCacheAt=0;async getAlarmaList(){let a=Date.now();return this.alarmaCacheAt&&a-this.alarmaCacheAt<45e3?this.alarmaCache:(this.alarmaCache=(await this.data.loadPendientesVisibles()).filter(e=>e.alarma),this.alarmaCacheAt=a,this.alarmaCache)}alertedToday(a,e){try{return JSON.parse(localStorage.getItem(i.ALERTED_KEY)||"{}")[a]===e}catch{return  false}}markAlerted(a,e){try{let t=JSON.parse(localStorage.getItem(i.ALERTED_KEY)||"{}");for(let n of a)t[n]=e;for(let n of Object.keys(t))t[n]!==e&&delete t[n];localStorage.setItem(i.ALERTED_KEY,JSON.stringify(t));}catch{}}async checkReminders(){if(this.alertOpen)return;let a=Date.now(),e=g=>String(g).padStart(2,"0"),t=new Date,n=`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`,p=(await this.getAlarmaList()).filter(g=>!g.dueDate||g.paused||this.alertedToday(`${g.ticket}|${g.owner||""}`,n)?false:new Date(`${g.dueDate}T${g.dueTime||"09:00"}:00`).getTime()<=a);if(!p.length||this.alertOpen)return;this.markAlerted(p.map(g=>`${g.ticket}|${g.owner||""}`),n),this.playAlertSound();let w=p.map(g=>({ticket:g.ticket,clienteRaw:g.clienteRaw,asunto:g.asunto,nota:g.nota}));this.alertOpen=true,this.dialog.open(ve,{data:{items:w},width:"460px",maxWidth:"95vw",autoFocus:false}).afterClosed().subscribe(g=>{this.alertOpen=false,g==="ver"&&this.router.navigate(["/pendientes"],{queryParams:{resaltar:w.map(B=>B.ticket).join(",")}});});}ensureAudio(){if(this.audioCtx)return this.audioCtx;let a=window.AudioContext||window.webkitAudioContext;return a?(this.audioCtx=new a,this.audioCtx):null}playAlertSound(){try{let a=this.ensureAudio();if(!a)return;a.state==="suspended"&&a.resume();let e=[[880,0],[660,.18]];for(let[t,n]of e){let c=a.createOscillator(),p=a.createGain();c.type="sine",c.frequency.value=t;let w=a.currentTime+n;p.gain.setValueAtTime(1e-4,w),p.gain.exponentialRampToValueAtTime(.35,w+.02),p.gain.exponentialRampToValueAtTime(1e-4,w+.55),c.connect(p).connect(a.destination),c.start(w),c.stop(w+.6);}}catch{}}abrirPerfil(){this.dialog.open(be,{width:"380px",maxWidth:"95vw",autoFocus:false});}iniciales(a){let e=(a||"").trim();return e&&e.split(/\s+/).slice(0,2).map(t=>t[0]||"").join("").toUpperCase()||"?"}async logout(){await this.auth.logout(),this.router.navigate(["/login"]);}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=Kt$1({type:i,selectors:[["app-layout"]],viewQuery:function(e,t){e&1&&_y(t.shellContent,hn,5)(t.contentEl,gn,5),e&2&&$T(2);},decls:55,vars:13,consts:[["shellContent",""],["contentEl",""],[1,"shell"],[1,"drawer",3,"openedChange","mode","opened","disableClose"],[1,"drawer-brand"],["mat-icon-button","","aria-label","Ocultar men\xFA",1,"drawer-toggle"],[1,"drawer-brand-text"],[1,"drawer-nav",3,"click"],[1,"nav-group-title"],["routerLink","/board","routerLinkActive","active",1,"nav-item"],["routerLink","/tickets","routerLinkActive","active",1,"nav-item"],["routerLink","/mi-panel","routerLinkActive","active",1,"nav-item"],["routerLink","/pendientes","routerLinkActive","active",1,"nav-item"],["routerLink","/semanal","routerLinkActive","active",1,"nav-item"],["routerLink","/vacaciones","routerLinkActive","active",1,"nav-item"],["routerLink","/bandeja","routerLinkActive","active",1,"nav-item"],[1,"drawer-tools"],[1,"tool-search"],[1,"tool-search-icon"],["type","text","placeholder","Buscar N\xB0 o texto\u2026","aria-label","Buscar por n\xFAmero de ticket o por texto",1,"tool-search-input",3,"ngModelChange","keydown.enter","ngModel"],["type","button","aria-label","Limpiar b\xFAsqueda",1,"tool-search-clear"],[1,"tool-panel"],[1,"drawer-spacer"],[1,"drawer-user"],[1,"shell-content"],["color","primary",1,"topbar"],[1,"content"],["mat-icon-button","","aria-label","Ocultar men\xFA",1,"drawer-toggle",3,"click"],[1,"nav-ic-wrap"],[1,"nav-badge"],["routerLink","/admin","routerLinkActive","active",1,"nav-item"],["type","button","aria-label","Limpiar b\xFAsqueda",1,"tool-search-clear",3,"click"],[1,"tool-panel-head"],[1,"tool-panel-lead"],[1,"tool-panel-label"],[1,"tool-panel-caret"],[1,"tool-panel-body"],[4,"ngTemplateOutlet"],["type","button","title","Mi perfil","aria-label","Mi perfil",1,"user-chip",3,"click"],["alt","Foto de perfil",3,"src"],[1,"user-name"],["mat-icon-button","","title","Cerrar sesi\xF3n","aria-label","Cerrar sesi\xF3n",3,"click"],["mat-icon-button","","aria-label","Abrir men\xFA",3,"click"],[1,"brand"],[1,"spacer"],["type","button","title","Mi perfil","aria-label","Mi perfil",1,"user-chip",3,"has-foto","background"]],template:function(e,t){if(e&1&&(La(0,"mat-sidenav-container",2)(1,"mat-sidenav",3),ec("openedChange",function(c){return t.drawerOpen.set(c)}),La(2,"div",4),CT(3,_n,3,0,"button",5),La(4,"span",6),fS(5,"Fit-Desk"),mf()(),La(6,"nav",7),ec("click",function(){return t.drawerOpen.set(false)}),La(7,"p",8),fS(8,"Principal"),mf(),La(9,"a",9)(10,"mat-icon"),fS(11,"view_kanban"),mf(),La(12,"span"),fS(13,"Board"),mf()(),La(14,"a",10)(15,"mat-icon"),fS(16,"confirmation_number"),mf(),La(17,"span"),fS(18,"Tickets"),mf()(),CT(19,bn,5,0,"a",11),La(20,"p",8),fS(21,"Seguimiento"),mf(),La(22,"a",12)(23,"mat-icon"),fS(24,"alarm"),mf(),La(25,"span"),fS(26,"Recordatorio"),mf()(),La(27,"a",13)(28,"mat-icon"),fS(29,"calendar_month"),mf(),La(30,"span"),fS(31,"HelpDesk Semanal"),mf()(),La(32,"a",14)(33,"mat-icon"),fS(34,"beach_access"),mf(),La(35,"span"),fS(36,"Vacaciones"),mf()(),CT(37,wn,7,1,"a",15),CT(38,xn,7,0),mf(),La(39,"div",16)(40,"div",17)(41,"mat-icon",18),fS(42,"search"),mf(),La(43,"input",19),ec("ngModelChange",function(c){return t.gBuscar.set(c)})("keydown.enter",function(){return t.buscarGlobal()}),mf(),vC(),CT(44,yn,3,0,"button",20),mf(),CT(45,Mn,10,1,"details",21),CT(46,Pn,1,1,"ng-container"),mf(),Ja(47,"span",22),CT(48,On,9,6,"div",23),mf(),La(49,"mat-sidenav-content",24,0),CT(51,Rn,8,1,"mat-toolbar",25),La(52,"main",26,1),Ja(54,"router-outlet"),mf()()()),e&2){let n,c,p;sb(),dy("mode",t.mode())("opened",t.opened())("disableClose",t.fixed()),sb(2),TT(t.fixed()?-1:3),sb(16),TT(t.puedeVerMiPanel()?19:-1),sb(18),TT(t.mostrarBandeja()?37:-1),sb(),TT(t.mostrarAdmin()?38:-1),sb(5),dy("ngModel",t.gBuscar()),DC(),sb(),TT(t.gBuscar()?44:-1),sb(),TT((n=t.shell.filters())?45:-1,n),sb(),TT((c=t.shell.sort())?46:-1,c),sb(2),TT((p=t.session())?48:-1,p),sb(3),TT(t.fixed()?-1:51);}},dependencies:[_h,qc,RN,uM,da$1,ln$1,ia,ji,Ft,Rt,Aa,eo,he$1,Lr,At,Be,Tt,he,yt,wt],styles:[".shell[_ngcontent-%COMP%]{height:100vh;height:100dvh}.drawer[_ngcontent-%COMP%]{width:280px;max-width:85vw;display:flex;flex-direction:column;border-right:1px solid var(--mat-sys-outline-variant, #e0e0e0);background:var(--mat-sys-surface-container-low, #f0f4f9)}.drawer-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-weight:700;letter-spacing:-.5px;font-size:18px;padding:8px 12px;color:var(--brand, #048abf)}.drawer-brand[_ngcontent-%COMP%]   .drawer-toggle[_ngcontent-%COMP%]{color:var(--brand, #048abf)}.drawer-brand[_ngcontent-%COMP%]   .drawer-brand-text[_ngcontent-%COMP%]{margin-left:2px}.drawer-nav[_ngcontent-%COMP%]{padding:4px 8px 10px}.drawer-nav[_ngcontent-%COMP%]   .nav-group-title[_ngcontent-%COMP%]{margin:10px 0 4px;padding:0 8px;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--mat-sys-on-surface-variant, #5a6470)}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 10px;border-radius:8px;color:var(--mat-sys-on-surface, #181c20);text-decoration:none;font-size:14px;line-height:1.2;transition:background .12s}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex:none;font-size:20px;width:20px;height:20px;color:var(--mat-sys-on-surface-variant, #5a6470)}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-ic-wrap[_ngcontent-%COMP%]{flex:none;position:relative;display:inline-flex;align-items:center;overflow:visible}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   .nav-badge[_ngcontent-%COMP%]{position:absolute;top:-6px;right:-8px;display:inline-flex;align-items:center;justify-content:center;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#e11900;color:#fff;font-size:10px;font-weight:700;line-height:1;border:2px solid var(--mat-sys-surface-container-low, #f0f4f9);box-sizing:content-box}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover{background:#0000000d}.drawer-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--brand, #048abf);outline-offset:-2px}.drawer-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--brand, #048abf) 12%,transparent);color:var(--brand-dark, #0390bc);font-weight:600;box-shadow:inset 3px 0 0 var(--brand, #048abf)}.drawer-nav[_ngcontent-%COMP%]   .nav-item.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--brand, #048abf)}.drawer-tools[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:10px 12px 12px;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.tool-search[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;height:36px;padding:0 8px;background:#fff;border:1px solid var(--mat-sys-outline, #bdbdbd);border-radius:8px}.tool-search[_ngcontent-%COMP%]:focus-within{border-color:var(--brand, #048abf);box-shadow:0 0 0 2px color-mix(in srgb,var(--brand, #048abf) 18%,transparent)}.tool-search[_ngcontent-%COMP%]   .tool-search-icon[_ngcontent-%COMP%]{flex:none;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #5a6470)}.tool-search[_ngcontent-%COMP%]   .tool-search-input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:13px;color:inherit}.tool-search[_ngcontent-%COMP%]   .tool-search-input[_ngcontent-%COMP%]::placeholder{color:#8a8a9a}.tool-search[_ngcontent-%COMP%]   .tool-search-clear[_ngcontent-%COMP%]{flex:none;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:transparent;border-radius:50%;cursor:pointer;color:var(--mat-sys-on-surface-variant, #5a6470)}.tool-search[_ngcontent-%COMP%]   .tool-search-clear[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.tool-search[_ngcontent-%COMP%]   .tool-search-clear[_ngcontent-%COMP%]:hover{background:#00000014}.tool-panel[_ngcontent-%COMP%]{border:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-radius:8px;background:#fff}.tool-panel[_ngcontent-%COMP%]   .tool-panel-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;min-height:40px;padding:0 10px;cursor:pointer;list-style:none;font-size:13px;font-weight:600;color:var(--mat-sys-on-surface, #181c20)}.tool-panel[_ngcontent-%COMP%]   .tool-panel-head[_ngcontent-%COMP%]::-webkit-details-marker{display:none}.tool-panel[_ngcontent-%COMP%]   .tool-panel-head[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--brand, #048abf);outline-offset:-2px;border-radius:8px}.tool-panel[_ngcontent-%COMP%]   .tool-panel-lead[_ngcontent-%COMP%]{flex:none;font-size:18px;width:18px;height:18px;color:var(--mat-sys-on-surface-variant, #5a6470)}.tool-panel[_ngcontent-%COMP%]   .tool-panel-label[_ngcontent-%COMP%]{flex:1}.tool-panel[_ngcontent-%COMP%]   .tool-panel-caret[_ngcontent-%COMP%]{flex:none;font-size:20px;width:20px;height:20px;color:var(--mat-sys-on-surface-variant, #5a6470);transition:transform .15s}.tool-panel[open][_ngcontent-%COMP%]   .tool-panel-caret[_ngcontent-%COMP%]{transform:rotate(180deg)}.tool-panel[_ngcontent-%COMP%]   .tool-panel-body[_ngcontent-%COMP%]{padding:2px 10px 10px;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-tools[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]{width:100%;font-size:13px}.drawer-tools[_ngcontent-%COMP%]   .mat-mdc-text-field-wrapper[_ngcontent-%COMP%]{--mat-form-field-container-height: 40px}.drawer-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.drawer-user[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-user[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.user-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:28px;padding:0 8px;border:none;border-radius:14px;color:#fff;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;overflow:hidden;transition:box-shadow .15s}.user-chip[_ngcontent-%COMP%]:hover{box-shadow:0 0 0 2px #048abf73}.user-chip.has-foto[_ngcontent-%COMP%]{min-width:32px;width:32px;height:32px;padding:0;border-radius:50%}.user-chip.has-foto[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.shell-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0}mat-sidenav-content.shell-content[_ngcontent-%COMP%]{overflow:hidden}.topbar[_ngcontent-%COMP%]{flex:0 0 auto;z-index:10;gap:4px}.topbar[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.5px;margin-left:4px}.topbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}.content[_ngcontent-%COMP%]{flex:1 1 auto;min-width:0;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:20px;width:100%;box-sizing:border-box}"]})};export{Vt as Layout};