import {p as FE,N as Nl,q as qr,D,r as mr,ag as Se$1,aw as JL,ar as Hv,bP as es,af as N,au as $e,P as PE,aW as tF,bj as _c,bl as fp,b as sI,bk as Mc,O as Oy,aa as _p,d as aI,a6 as lp,H as jI,I as Mp,$ as hh,an as me,ah as ct,aB as Go,at as ne$1,F as Ft,aL as B,aM as nn,by as en,aC as Kh,aU as fl,ao as Lh,ay as Hr,j as jy,aK as $,aO as eF,A as DI,bB as op,a3 as sD,a7 as Dp,U as bI,V as CI,J as Ip,v as tr,aq as Ir,aj as q,ak as nh,aY as Ql,B as wI,s as si$1,C as Cc,l as dp,u as up,y as yp,ai as U,b9 as Pe,ba as Le$1,a8 as HE,a2 as tp,X as Xp,c as ce,bQ as zt,g as ZL,aH as ch,Z as ZI,x as xc,R as Rp,T as Tp,_ as _I,bR as ys,a1 as Cm,b2 as gp,aX as Gp,bF as Dh,aV as am,a$ as fu,aP as Di$1,aA as Ss,ax as Jh,az as tn,h as Qt$2,bS as eE,E as EI,m as uI,b3 as lI,o as dI,ac as yI,ad as eu,ae as tu,br as cI,bT as l,bx as ht$1,bU as gs,ab as rp,bV as d,b0 as pu,b4 as gr,bW as Ul,bI as Yt$1,bX as Me,bi as X,b1 as ao,bY as ts,a as Fp,e as eD,L as Lp,t as w,bc as Op,bZ as vp,bM as ur,b_ as hy,aG as Jd}from'./main-JCB6ATQO.js';import {J,S,U as U$1,n as nt,Z,r as rt,o as ot,a as at}from'./chunk-BE9bDfBr.js';import {O,e as ee,$ as $e$1,H as Ht$1,j as jt$1,N as Nt,V as Vt,z as zt$2}from'./chunk-CNDLXVWU.js';import {Y as Yt,m as mt}from'./chunk-DlHUVWjS.js';import {Q as Qt$1}from'./chunk-BGZrcXXL.js';import {l as le,b as at$1}from'./chunk-CJfgOu5M.js';import {Q as Qe,I as It,y as yi$1,v as vi$1,m as me$1,H as Ht$2,a as Q,z as zt$1,j,b as mn,c as vt$1,F as Ft$1,O as Oe,d as Fe,B as Bt}from'./chunk-Do4eOssO.js';import {v as va$1,g as ga$1,A as An,p as pt,h as ht,S as S$1}from'./chunk-BQjvA7eC.js';function ma(i,r){i&1&&fp(0,"div",2);}var ua=new N("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var Wn=(()=>{class i{_elementRef=D(mr);_ngZone=D(Se$1);_changeDetectorRef=D(JL);_renderer=D(Hv);_cleanupTransitionEnd;constructor(){let e=es(),t=D(ua,{optional:true});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),t&&(t.color&&(this.color=this._defaultColor=t.color),this.mode=t.mode||this.mode);}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=qn(e||0),this._changeDetectorRef.markForCheck();}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=qn(e||0),this._changeDetectorRef.markForCheck();}_bufferValue=0;animationEnd=new $e;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck();}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler);});}ngOnDestroy(){this._cleanupTransitionEnd?.();}_getPrimaryBarTransform(){return `scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return `${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}));};static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(t,n){t&2&&(lp("aria-valuenow",n._isIndeterminate()?null:n.value)("mode",n.mode),jI("mat-"+n.color),Mp("_mat-animation-noopable",n._isNoopAnimation)("mdc-linear-progress--animation-ready",!n._isNoopAnimation)("mdc-linear-progress--indeterminate",n._isIndeterminate()));},inputs:{color:"color",value:[2,"value","value",tF],bufferValue:[2,"bufferValue","bufferValue",tF],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(t,n){t&1&&(_c(0,"div",0),fp(1,"div",1),sI(2,ma,1,0,"div",2),Mc(),_c(3,"div",3),fp(4,"span",4),Mc(),_c(5,"div",5),fp(6,"span",4),Mc()),t&2&&(Oy(),_p("flex-basis",n._getBufferBarFlexBasis()),Oy(),aI(n.mode==="buffer"?2:-1),Oy(),_p("transform",n._getPrimaryBarTransform()));},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})}return i})();function qn(i,r=0,e=100){return Math.max(r,Math.min(e,i))}var Qn=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=FE({type:i});static \u0275inj=Nl({imports:[qr]})}return i})();var ha=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],_a=["mat-icon, [matMenuItemIcon]","*"];function ga(i,r){i&1&&(fu(),si$1(0,"svg",2),dp(1,"polygon",3),Cc());}var fa=["*"];function ba(i,r){if(i&1){let e=yI();_c(0,"div",0),vp("click",function(){eu(e);let n=EI();return tu(n.closed.emit("click"))})("animationstart",function(n){eu(e);let a=EI();return tu(a._onAnimationStart(n.animationName))})("animationend",function(n){eu(e);let a=EI();return tu(a._onAnimationDone(n.animationName))})("animationcancel",function(n){eu(e);let a=EI();return tu(a._onAnimationDone(n.animationName))}),_c(1,"div",1),wI(2),Mc()();}if(i&2){let e=EI();jI(e._classList),Mp("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),gp("id",e.panelId),lp("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null);}}var Kt=new N("MAT_MENU_PANEL"),jt=(()=>{class i{_elementRef=D(mr);_document=D(tr);_focusMonitor=D(Ir);_parentMenu=D(Kt,{optional:true});_changeDetectorRef=D(JL);role="menuitem";disabled=false;disableRipple=false;_hovered=new ne$1;_focused=new ne$1;_highlighted=false;_triggersSubmenu=false;constructor(){D(q).load(nh),this._parentMenu?.addItem?.(this);}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this);}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,false);}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete();}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}_handleMouseEnter(){this._hovered.next(this);}getLabel(){let e=this._elementRef.nativeElement.cloneNode(true),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck();}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck();}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&yp("click",function(o){return n._checkDisabled(o)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(lp("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),Mp("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu));},inputs:{role:"role",disabled:[2,"disabled","disabled",eF],disableRipple:[2,"disableRipple","disableRipple",eF]},exportAs:["matMenuItem"],ngContentSelectors:_a,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(DI(ha),wI(0),si$1(1,"span",0),wI(2,1),Cc(),dp(3,"div",1),sI(4,ga,2,0,":svg:svg",2)),t&2&&(Oy(3),up("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),Oy(),aI(n._triggersSubmenu?4:-1));},dependencies:[Ql],encapsulation:2})}return i})();var va=new N("MatMenuContent");var ya=new N("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:false,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),Ht="_mat-menu-enter",bt="_mat-menu-exit",vt=(()=>{class i{_elementRef=D(mr);_changeDetectorRef=D(JL);_injector=D(me);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=ct();_allItems;_directDescendantItems=new Go;_classList={};_panelAnimationState="void";_animationDone=new ne$1;_isAnimating=Ft(false);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses();}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses();}templateRef;items;lazyContent;overlapTrigger=false;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,n=B({},this._classList);t&&t.length&&t.split(" ").forEach(a=>{n[a]=false;}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(a=>{n[a]=true;}),this._elementRef.nativeElement.className=""),this._classList=n;}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e;}closed=new $e;close=this.closed;panelId=D(nn).getId("mat-menu-panel-");constructor(){let e=D(ya);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop;}ngOnInit(){this.setPositionClasses();}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new en(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Kh(this._directDescendantItems),fl(e=>Lh(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),a=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[a]&&!n[a].disabled?t.setActiveItem(a):t.setNextItemActive();}});}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout);}_hovered(){return this._directDescendantItems.changes.pipe(Kh(this._directDescendantItems),fl(t=>Lh(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Hr(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=jy(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus();}},{injector:this._injector});}resetActiveItem(){this._keyManager.setActiveItem(-1);}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=$(B({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck();}_onAnimationDone(e){let t=e===bt;(t||e===Ht)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(false));}_onAnimationStart(e){(e===Ht||e===bt)&&this._isAnimating.set(true);}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0);}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(bt),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?Ht:bt);}),this._changeDetectorRef.markForCheck();}_updateDirectDescendants(){this._allItems.changes.pipe(Kh(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges();});}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-menu"]],contentQueries:function(t,n,a){if(t&1&&Ip(a,va,5)(a,jt,5)(a,jt,4),t&2){let o;bI(o=CI())&&(n.lazyContent=o.first),bI(o=CI())&&(n._allItems=o),bI(o=CI())&&(n.items=o);}},viewQuery:function(t,n){if(t&1&&Dp(ur,5),t&2){let a;bI(a=CI())&&(n.templateRef=a.first);}},hostVars:3,hostBindings:function(t,n){t&2&&lp("aria-label",null)("aria-labelledby",null)("aria-describedby",null);},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",eF],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:eF(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[sD([{provide:Kt,useExisting:i}])],ngContentSelectors:fa,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(DI(),op(0,ba,3,12,"ng-template"));},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2})}return i})(),Ca=new N("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=D(me);return ()=>Bt(i)}});var Ae=new WeakMap,Da=(()=>{class i{_canHaveBackdrop;_element=D(mr);_viewContainerRef=D(Di$1);_menuItemInstance=D(jt,{optional:true,self:true});_dir=D(Ss,{optional:true});_focusMonitor=D(Ir);_ngZone=D(Se$1);_injector=D(me);_scrollStrategy=D(Ca);_changeDetectorRef=D(JL);_animationsDisabled=ct();_portal;_overlayRef=null;_menuOpen=false;_closingActionsSubscription=U.EMPTY;_menuCloseSubscription=U.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t);})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()));}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=D(Kt,{optional:true});this._parentMaterialMenu=t instanceof vt?t:void 0;}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Ae.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null);}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return !!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit();}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=Ae.get(t);Ae.set(t,this),n&&n!==this&&n._closeMenu();let a=this._createOverlay(t),o=a.getConfig(),b=o.positionStrategy;this._setPosition(t,b),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??false,a.hasAttached()||(a.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(true),t instanceof vt&&(t._setIsOpen(true),t._directDescendantItems.changes.pipe(Jh(t.close)).subscribe(()=>{b.withLockedPosition(false).reapplyLastPosition(),b.withLockedPosition(true);}));}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof vt&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(tn(1)).subscribe(()=>{t.detach(),Ae.has(n)||n.lazyContent?.detach();}),n._setIsOpen(false)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&Ae.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(false));}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck());}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=Ht$2(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof vt&&this._menu._handleKeydown(n);});}return this._overlayRef}_getOverlayConfig(e){return new Q({positionStrategy:zt$1(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let a=n.connectionPair.overlayX==="start"?"after":"before",o=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(a,o);});});}_setPosition(e,t){let[n,a]=e.xPosition==="before"?["end","start"]:["start","end"],[o,b]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[Ie,Pe]=[o,b],[Oe,wt]=[n,a],Ve=0;if(this._triggersSubmenu()){if(wt=n=e.xPosition==="before"?"start":"end",a=Oe=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let tn=this._parentMaterialMenu.items.first;this._parentInnerPadding=tn?tn._getHostElement().offsetTop:0;}Ve=o==="bottom"?this._parentInnerPadding:-this._parentInnerPadding;}}else e.overlapTrigger||(Ie=o==="top"?"bottom":"top",Pe=b==="top"?"bottom":"top");t.withPositions([{originX:n,originY:Ie,overlayX:Oe,overlayY:o,offsetY:Ve},{originX:a,originY:Ie,overlayX:wt,overlayY:o,offsetY:Ve},{originX:n,originY:Pe,overlayX:Oe,overlayY:b,offsetY:-Ve},{originX:a,originY:Pe,overlayX:wt,overlayY:b,offsetY:-Ve}]);}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:Dh(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Qt$2(o=>this._menuOpen&&o!==this._menuItemInstance)):Dh();return Lh(e,n,a,t)}_getPortal(e){return (!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new j(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Ae.get(e)===this}_triggerIsAriaDisabled(){return eF(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){eE();};static \u0275dir=HE({type:i})}return i})(),sr=(()=>{class i extends Da{_cleanupTouchstart;_hoverSubscription=U.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e;}get menu(){return this._menu}set menu(e){this._menu=e;}menuData;restoreFocus=true;menuOpened=new $e;onMenuOpen=this.menuOpened;menuClosed=new $e;onMenuClose=this.menuClosed;constructor(){super(true);let e=D(Hv);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Pe(t)||(this._openedBy="touch");},{passive:true});}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(true);}closeMenu(){this._closeMenu();}updatePosition(){this._overlayRef?.updatePosition();}ngAfterContentInit(){this._handleHover();}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe();}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Le$1(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault());}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu());}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu();}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(false));}));}static \u0275fac=function(t){return new(t||i)};static \u0275dir=HE({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&yp("click",function(o){return n._handleClick(o)})("mousedown",function(o){return n._handleMousedown(o)})("keydown",function(o){return n._handleKeydown(o)}),t&2&&lp("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu?.panelId:null);},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[tp]})}return i})();var lr=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=FE({type:i});static \u0275inj=Nl({imports:[hh,Qe,qr,It]})}return i})();var Sa=["editor"],Ct=class i{ref=D(O);data=D($e$1);titulo=this.data.titulo||"Redactar respuesta";editor=ZL.required("editor");constructor(){jy(()=>{let r=this.editor().nativeElement;r.innerHTML=this.data.html||"",r.focus();let e=window.getSelection();if(e){let t=document.createRange();t.selectNodeContents(r),t.collapse(false),e.removeAllRanges(),e.addRange(t);}});}format(r){this.editor().nativeElement.focus(),document.execCommand(r,false);}codeBlock(){rt(this.editor().nativeElement);}onPaste(r){let e=r.clipboardData;if(!e)return;r.preventDefault();let t=ot(e.getData("text/html"),e.getData("text/plain"));document.execCommand("insertHTML",false,t);}done(){let r=this.editor().nativeElement;this.ref.close(r.textContent?.trim()||r.querySelector("img")?r.innerHTML:"");}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=PE({type:i,selectors:[["app-compose-dialog"]],viewQuery:function(e,t){e&1&&Tp(t.editor,Sa,5),e&2&&_I();},decls:28,vars:1,consts:[["editor",""],["mat-dialog-title","",1,"compose-head"],[1,"spacer"],["mat-icon-button","","mat-dialog-close","","aria-label","Cerrar"],[1,"compose-toolbar"],["mat-icon-button","","type","button","matTooltip","Negrita",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Cursiva",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Subrayado",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Bloque de c\xF3digo",3,"mousedown","click"],[1,"compose-content"],["contenteditable","true","role","textbox","aria-multiline","true","aria-label","Mensaje",1,"compose-editor",3,"paste"],["mat-dialog-actions","","align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"]],template:function(e,t){e&1&&(si$1(0,"div",1)(1,"span"),ZI(2),Cc(),dp(3,"span",2),si$1(4,"button",3)(5,"mat-icon"),ZI(6,"close"),Cc()()(),si$1(7,"div",4)(8,"button",5),yp("mousedown",function(a){return a.preventDefault()})("click",function(){return t.format("bold")}),si$1(9,"mat-icon"),ZI(10,"format_bold"),Cc()(),si$1(11,"button",6),yp("mousedown",function(a){return a.preventDefault()})("click",function(){return t.format("italic")}),si$1(12,"mat-icon"),ZI(13,"format_italic"),Cc()(),si$1(14,"button",7),yp("mousedown",function(a){return a.preventDefault()})("click",function(){return t.format("underline")}),si$1(15,"mat-icon"),ZI(16,"format_underlined"),Cc()(),si$1(17,"button",8),yp("mousedown",function(a){return a.preventDefault()})("click",function(){return t.codeBlock()}),si$1(18,"mat-icon"),ZI(19,"code"),Cc()()(),si$1(20,"mat-dialog-content",9)(21,"div",10,0),yp("paste",function(a){return t.onPaste(a)}),Cc()(),si$1(23,"div",11)(24,"button",12),ZI(25,"Cancelar"),Cc(),si$1(26,"button",13),yp("click",function(){return t.done()}),ZI(27,"Listo"),Cc()()),e&2&&(Oy(2),Rp(t.titulo));},dependencies:[Ht$1,jt$1,Nt,zt$2,Vt,va$1,ga$1,An,yi$1,vi$1,Yt,mt],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:flex;flex-direction:column;max-height:90vh;overflow:hidden}.compose-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin:0;font-size:16px;font-weight:600;flex:0 0 auto}.compose-head[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.compose-toolbar[_ngcontent-%COMP%]{display:flex;gap:4px;padding:0 24px 6px;border-bottom:1px solid var(--mat-sys-outline-variant);flex:0 0 auto}.compose-content[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;display:flex;padding-top:12px}.compose-editor[_ngcontent-%COMP%]{flex:1 1 auto;min-height:160px;overflow-y:auto;box-sizing:border-box;border:1px solid var(--mat-sys-outline);border-radius:8px;padding:12px 14px;font:inherit;font-size:14px;line-height:1.5;outline:none;overflow-wrap:anywhere;white-space:pre-wrap}.compose-editor[_ngcontent-%COMP%]:focus{border-color:var(--mat-sys-primary, #048abf);box-shadow:0 0 0 2px #048abf26}.compose-editor[_ngcontent-%COMP%]:empty:before{content:"Escribe tu respuesta\\2026";color:var(--mat-sys-on-surface-variant)}.compose-editor[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px;white-space:pre-wrap}.compose-editor[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.compose-editor[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.compose-editor[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}[mat-dialog-actions][_ngcontent-%COMP%]{flex:0 0 auto}']})};function $n(i){let r=(i||"").toUpperCase();return r.includes("APROBADO")?{headerBg:"#DDEFD9",badgeBg:"#97C98A",badgeText:"#1B5E20"}:r.includes("CERRADO")?{headerBg:"#F1EFE8",badgeBg:"#D3D1C7",badgeText:"#444441"}:r.includes("ENTREGADO")?{headerBg:"#DDF3F1",badgeBg:"#9FE0D8",badgeText:"#0C5046"}:r.includes("INSTALADO")||r.includes("CERTIFICAC")?{headerBg:"#E3EFFB",badgeBg:"#B5D4F4",badgeText:"#0C447C"}:r.includes("INFO PENDIENTE")?{headerBg:"#FAEEDA",badgeBg:"#FAC775",badgeText:"#633806"}:r.includes("EN PROCESO")?{headerBg:"#EEEDFE",badgeBg:"#CECBF6",badgeText:"#3C3489"}:r.includes("ABIERTO")?{headerBg:"#EAF3DE",badgeBg:"#C0DD97",badgeText:"#27500A"}:{headerBg:"#ECEFF3",badgeBg:"#CFD6DE",badgeText:"#3A4350"}}function yr(i){let r=(i||"").toUpperCase();return r.includes("INCIDENCIA")?{badgeBg:"#F7C1C1",badgeText:"#791F1F"}:r.includes("REQUERIMIENTO")?{badgeBg:"#C0DD97",badgeText:"#27500A"}:r.includes("CONSULTA")?{badgeBg:"#CECBF6",badgeText:"#3C3489"}:{badgeBg:"#D7DBE0",badgeText:"#3A4350"}}function Cr(i){if(!i)return "";let r=new Date(i);return isNaN(r.getTime())?"":r.toLocaleDateString("es-ES",{day:"numeric",month:"short",year:"numeric"})}function Dr(i){if(!i)return "";let r=new Date(i);if(isNaN(r.getTime()))return "";let e=r.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit",hour12:false}),t=new Date;return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()&&r.getDate()===t.getDate()?`Hoy ${e}`:`${r.toLocaleDateString("es-ES",{day:"numeric",month:"short"})} ${e}`}var Ea=["composerInput"],Ta=(i,r)=>r.id;function Ia(i,r){i&1&&(si$1(0,"span",4),ZI(1),Cc()),i&2&&(Oy(),Rp(r));}function Pa(i,r){if(i&1&&(si$1(0,"span",15),ZI(1),Cc()),i&2){let e=r,t=EI();_p("background",t.estadoStyle(e).badgeBg)("color",t.estadoStyle(e).badgeText),Oy(),Rp(e);}}function Oa(i,r){if(i&1){let e=yI();si$1(0,"button",18),yp("click",function(){let n=eu(e),a=n.$implicit,o=n.$index,b=EI(2);return tu(b.openAttachment(a,"adjunto-general_"+b.ticketId+(b.ticketAttachments().length>1?"_"+(o+1):"")))}),si$1(1,"mat-icon"),ZI(2,"attach_file"),Cc(),ZI(3),Cc();}if(i&2){let e=r.$index,t=EI(2);Oy(3),xc(" Descargar",t.ticketAttachments().length>1?" "+(e+1):""," ");}}function Va(i,r){if(i&1&&(si$1(0,"div",9)(1,"span",16),ZI(2,"Adjunto del ticket:"),Cc(),uI(3,Oa,4,1,"button",17,lI),Cc()),i&2){let e=EI();Oy(3),dI(e.ticketAttachments());}}function Fa(i,r){if(i&1){let e=yI();si$1(0,"div",11)(1,"mat-icon"),ZI(2,"lock"),Cc(),si$1(3,"p"),ZI(4,"Tu sesi\xF3n expir\xF3. Inicia sesi\xF3n nuevamente para ver la conversaci\xF3n del ticket."),Cc(),si$1(5,"button",19),yp("click",function(){eu(e);let n=EI();return tu(n.goToLogin())}),ZI(6,"Iniciar sesi\xF3n"),Cc()();}}function Ra(i,r){i&1&&(dp(0,"mat-progress-bar",20),si$1(1,"div",21),ZI(2,"Cargando mensajes y adjuntos\u2026"),Cc());}function Ba(i,r){i&1&&(si$1(0,"div",12),ZI(1,"Sin mensajes registrados."),Cc());}function Na(i,r){if(i&1){let e=yI();si$1(0,"div",22)(1,"button",24),yp("click",function(){eu(e);let n=EI(2);return tu(n.loadOlder())}),si$1(2,"mat-icon"),ZI(3,"expand_less"),Cc(),ZI(4," Ver mensajes anteriores "),Cc()();}if(i&2){let e=EI(2);Oy(),up("disabled",e.loadingOlder());}}function La(i,r){if(i&1){let e=yI();si$1(0,"button",32),yp("click",function(){eu(e);let n=EI().$implicit,a=EI(2);return tu(a.startEdit(n))}),si$1(1,"mat-icon"),ZI(2,"edit"),Cc()();}if(i&2){let e=EI(3);up("disabled",e.sending());}}function Ya(i,r){if(i&1&&dp(0,"div",30),i&2){let e=EI().$implicit;up("innerHTML",e.html,hy);}}function za(i,r){if(i&1){let e=yI();si$1(0,"button",34),yp("click",function(){let n=eu(e).$implicit,a=EI(4);return tu(a.openAttachment(n.id,n.nombre))}),si$1(1,"mat-icon"),ZI(2,"attach_file"),Cc(),ZI(3),Cc();}if(i&2){let e=r.$implicit;Oy(3),xc(" ",e.nombre," ");}}function Ha(i,r){if(i&1&&(si$1(0,"div",31),uI(1,za,4,1,"button",33,Ta),Cc()),i&2){let e=EI().$implicit;Oy(),dI(e.adjuntos);}}function ja(i,r){if(i&1&&(si$1(0,"div",25)(1,"div",26)(2,"span",27),ZI(3),Cc(),si$1(4,"span",28),ZI(5),Cc(),sI(6,La,3,1,"button",29),Cc(),sI(7,Ya,1,1,"div",30),sI(8,Ha,3,0,"div",31),Cc()),i&2){let e=r.$implicit;jI("conv-"+e.tipo),Oy(3),Rp(e.autor),Oy(2),Rp(e.fecha),Oy(),aI(e.canEdit&&e.id?6:-1),Oy(),aI(e.html?7:-1),Oy(),aI(e.adjuntos.length?8:-1);}}function Ka(i,r){if(i&1&&(sI(0,Na,5,1,"div",22),uI(1,ja,9,7,"div",23,cI)),i&2){let e=EI();aI(e.hasOlder()?0:-1),Oy(),dI(e.messages());}}function Xa(i,r){if(i&1){let e=yI();si$1(0,"div",37)(1,"mat-icon"),ZI(2,"edit"),Cc(),si$1(3,"span"),ZI(4,"Editando tu mensaje"),Cc(),dp(5,"span",6),si$1(6,"button",48),yp("click",function(){eu(e);let n=EI(2);return tu(n.cancelEdit())}),ZI(7,"Cancelar"),Cc()();}if(i&2){let e=EI(2);Oy(6),up("disabled",e.sending());}}function qa(i,r){if(i&1){let e=yI();si$1(0,"span",52)(1,"mat-icon"),ZI(2,"insert_drive_file"),Cc(),si$1(3,"span",53),ZI(4),Cc(),si$1(5,"button",54),yp("click",function(){let n=eu(e).$implicit,a=EI(4);return tu(a.removeFile(n))}),ZI(6,"\u2715"),Cc()();}if(i&2){let e=r.$implicit,t=EI(4);Oy(4),Rp(e.name),Oy(),up("disabled",t.sending());}}function Wa(i,r){if(i&1&&(si$1(0,"div",51),uI(1,qa,7,2,"span",52,cI),Cc()),i&2){let e=EI(3);Oy(),dI(e.composerFiles);}}function Qa(i,r){if(i&1){let e=yI();si$1(0,"label",49)(1,"mat-icon"),ZI(2,"attach_file"),Cc(),si$1(3,"input",50),yp("change",function(n){eu(e);let a=EI(2);return tu(a.onFiles(n))}),Cc()(),sI(4,Wa,3,0,"div",51);}if(i&2){let e=EI(2);Oy(4),aI(e.composerFiles.length?4:-1);}}function $a(i,r){if(i&1){let e=yI();si$1(0,"div",35),yp("dragover",function(n){eu(e);let a=EI();return tu(a.onDragOver(n))})("dragleave",function(n){eu(e);let a=EI();return tu(a.onDragLeave(n))})("drop",function(n){eu(e);let a=EI();return tu(a.onDrop(n))}),si$1(1,"div",36)(2,"mat-icon"),ZI(3,"upload_file"),Cc(),si$1(4,"span"),ZI(5,"Suelta los archivos para adjuntarlos"),Cc()(),sI(6,Xa,8,1,"div",37),si$1(7,"div",38)(8,"button",39),yp("mousedown",function(n){return n.preventDefault()})("click",function(){eu(e);let n=EI();return tu(n.format("bold"))}),si$1(9,"mat-icon"),ZI(10,"format_bold"),Cc()(),si$1(11,"button",40),yp("mousedown",function(n){return n.preventDefault()})("click",function(){eu(e);let n=EI();return tu(n.format("italic"))}),si$1(12,"mat-icon"),ZI(13,"format_italic"),Cc()(),si$1(14,"button",41),yp("mousedown",function(n){return n.preventDefault()})("click",function(){eu(e);let n=EI();return tu(n.format("underline"))}),si$1(15,"mat-icon"),ZI(16,"format_underlined"),Cc()(),si$1(17,"button",42),yp("mousedown",function(n){return n.preventDefault()})("click",function(){eu(e);let n=EI();return tu(n.codeBlock())}),si$1(18,"mat-icon"),ZI(19,"code"),Cc()(),dp(20,"span",6),si$1(21,"button",43),yp("click",function(){eu(e);let n=EI();return tu(n.openComposer())}),si$1(22,"mat-icon"),ZI(23,"open_in_full"),Cc()()(),si$1(24,"div",44,0),yp("paste",function(n){eu(e);let a=EI();return tu(a.onPaste(n))}),Cc(),si$1(26,"div",45),sI(27,Qa,5,1),dp(28,"span",6),si$1(29,"span",46),ZI(30),Cc(),si$1(31,"button",47),yp("click",function(){eu(e);let n=EI();return tu(n.send())}),ZI(32),Cc()()();}if(i&2){let e=EI();Mp("drag-over",e.dragOver()),Oy(6),aI(e.editingId()?6:-1),Oy(2),up("disabled",e.sending()),Oy(3),up("disabled",e.sending()),Oy(3),up("disabled",e.sending()),Oy(3),up("disabled",e.sending()),Oy(4),up("disabled",e.sending()),Oy(3),lp("contenteditable",e.sending()?"false":"true"),Oy(3),aI(e.editingId()?-1:27),Oy(3),Rp(e.sendStatus()),Oy(),up("disabled",e.sending()),Oy(),xc(" ",e.editingId()?"Guardar cambios":"Enviar"," ");}}function Ua(i,r){if(i&1){let e=yI();si$1(0,"div",55),yp("click",function(){eu(e);let n=EI();return tu(n.lightbox.set(null))}),si$1(1,"button",56),yp("click",function(){eu(e);let n=EI();return tu(n.lightbox.set(null))}),ZI(2,"\u2715"),Cc(),dp(3,"img",57),Cc();}i&2&&(Oy(3),up("src",r,Jd));}var Un=class i{hd=D(J);auth=D(Xp);router=D(ce);dialogRef=D(O);dialog=D(ee);sanitizer=D(zt);snack=D(Qt$1);data=D($e$1);ticketId=this.data.ticketId||this.data.ticket?.ticket||"";estadoStyle=$n;ticketObj=this.data.ticket??null;header=Ft({cliente:this.data.ticket?.clienteRaw||"",tipo:this.data.ticket?.tipo||"",estatus:this.data.ticket?.estatus||"",asunto:this.data.ticket?.asunto||""});loading=Ft(true);sessionExpired=Ft(false);messages=Ft([]);ticketAttachments=Ft([]);lightbox=Ft(null);static CHUNK=15;hasOlder=Ft(false);loadingOlder=Ft(false);sortedRaw=[];cursor=0;adjNumById=new Map;composerInput=ZL.required("composerInput");composerFiles=[];sending=Ft(false);sendStatus=Ft("");editingId=Ft(null);dragOver=Ft(false);constructor(){this.load();}async load(){if(this.loading.set(true),!await this.auth.verifySession()){this.sessionExpired.set(true),this.loading.set(false);return}if(!this.ticketObj&&this.ticketId){let t=await this.hd.fetchTicketRaw(this.ticketId);t&&(this.ticketObj=S(t),this.header.set({cliente:this.ticketObj.clienteRaw,tipo:this.ticketObj.tipo,estatus:this.ticketObj.estatus,asunto:this.ticketObj.asunto}));}let r=await this.hd.fetchMessages(this.ticketId);this.sortedRaw=[...r].sort((t,n)=>new Date(t.entry_date||0).getTime()-new Date(n.entry_date||0).getTime()),this.adjNumById=new Map;let e=0;for(let t of this.sortedRaw){let n=[];t.attach_id&&n.push(t.attach_id),Array.isArray(t.attach_ids)&&n.push(...t.attach_ids);for(let a of n){let o=String(a);a&&!this.adjNumById.has(o)&&this.adjNumById.set(o,++e);}}this.cursor=this.sortedRaw.length,this.messages.set([]),this.loading.set(false),await this.loadOlder(),this.ticketObj&&this.hd.ticketAttachmentIds(this.ticketObj).then(t=>this.ticketAttachments.set(t));}async loadOlder(){if(this.loadingOlder()||this.cursor<=0)return;this.loadingOlder.set(true);let r=Math.max(0,this.cursor-i.CHUNK),e=this.sortedRaw.slice(r,this.cursor),t=(await Promise.all(e.map(n=>this.procesar(n)))).filter(n=>!!n);this.messages.set([...t,...this.messages()]),this.cursor=r,this.hasOlder.set(this.cursor>0),this.loadingOlder.set(false);}goToLogin(){this.dialogRef.close(),this.router.navigate(["/login"]);}esEmpleado(r){let e=String(r.entry_user_role||"").trim().toUpperCase();return e?!e.includes("CLIENTE"):U$1.has(String(r.entry_user_id||"").trim().toUpperCase())}attachsDeMensaje(r){let e=[];r.attach_id&&e.push(r.attach_id),Array.isArray(r.attach_ids)&&e.push(...r.attach_ids);let t=new Set,n=[];return e.forEach(a=>{let o=String(a);a&&!t.has(o)&&(t.add(o),n.push(o));}),n.map(a=>({id:a,nombre:`adjunto_${this.ticketId}-${this.adjNumById.get(a)??1}`}))}async hidratarImgs(r){let e=new DOMParser().parseFromString(r,"text/html"),t=[...e.querySelectorAll("img[src]")];for(let n of t){let a=n.getAttribute("src")||"",o=/attachments\/(\d+)/.exec(a);if(o){let b=await this.hd.attachmentUrl(o[1]);b&&n.setAttribute("src",b);}}return e.body.innerHTML}async procesar(r){let e=r.system_message===true,t=nt(r.detail||""),n=t,a=Z(t).trim(),o=this.attachsDeMensaje(r);return !a&&!t.includes("<img")&&!o.length?null:(t.includes("<img")&&(t=await this.hidratarImgs(t)),{id:String(r.id||""),autor:e?"Sistema":r.entry_user_name||r.entry_user_id||"\u2014",tipo:e?"sys":this.esEmpleado(r)?"emp":"cli",fecha:r.entry_date?String(r.entry_date).replace("T"," ").slice(0,16):"",html:a||t.includes("<img")?this.sanitizer.bypassSecurityTrustHtml(t):null,rawHtml:n,canEdit:r.can_edit===true,adjuntos:o})}onConvClick(r){let e=r.target;if(e.tagName==="IMG"){let t=e.src;t&&this.lightbox.set(t);}}async openAttachment(r,e){let t=await this.hd.fetchAttachment(r);if(!t){this.snack.open("No se pudo abrir el adjunto.","OK",{duration:3e3});return}let n=document.createElement("a");n.href=t.url;let a=(t.filename.match(/\.[^.\s]+$/)||[""])[0];n.download=e?`${e}${e.endsWith(a)?"":a}`:t.filename||`adjunto_${this.ticketId}`,n.click(),setTimeout(()=>URL.revokeObjectURL(t.url),1e4);}onFiles(r){let e=r.target;this.composerFiles=e.files?[...e.files]:[];}removeFile(r){this.composerFiles=this.composerFiles.filter(e=>e!==r);}hasFiles(r){return !!r.dataTransfer&&[...r.dataTransfer.types].includes("Files")}onDragOver(r){this.sending()||!this.hasFiles(r)||(r.preventDefault(),r.dataTransfer.dropEffect="copy",this.dragOver.set(true));}onDragLeave(r){let e=r.relatedTarget;e&&r.currentTarget instanceof Node&&r.currentTarget.contains(e)||this.dragOver.set(false);}onDrop(r){if(!this.hasFiles(r)||(r.preventDefault(),this.dragOver.set(false),this.sending()))return;let e=r.dataTransfer?.files?[...r.dataTransfer.files]:[];e.length&&(this.composerFiles=[...this.composerFiles,...e]);}format(r){this.composerInput().nativeElement.focus(),document.execCommand(r,false);}codeBlock(){rt(this.composerInput().nativeElement);}onPaste(r){let e=r.clipboardData;if(!e)return;r.preventDefault();let t=ot(e.getData("text/html"),e.getData("text/plain"));document.execCommand("insertHTML",false,t);}async openComposer(){let r=this.composerInput().nativeElement,e=await ch(this.dialog.open(Ct,{data:{html:r.innerHTML},width:"720px",maxWidth:"95vw",autoFocus:false}).afterClosed());e!==void 0&&(r.innerHTML=e,r.focus());}startEdit(r){if(!r.canEdit||!r.id)return;let e=this.composerInput().nativeElement;e.innerHTML=r.rawHtml,this.editingId.set(r.id),this.sendStatus.set(""),e.focus();}cancelEdit(){this.editingId.set(null),this.composerInput().nativeElement.innerHTML="",this.sendStatus.set("");}async send(){let r=this.composerInput().nativeElement,e=at(r),t=!r.textContent?.trim()&&!r.querySelector("img"),n=this.editingId();if(n){if(t){this.sendStatus.set("El mensaje no puede quedar vac\xEDo.");return}this.sending.set(true),this.sendStatus.set("Guardando\u2026");let o=await this.hd.editMessage(this.ticketId,n,e);this.sending.set(false),o.ok?(r.innerHTML="",this.editingId.set(null),this.sendStatus.set("Guardado \u2713"),this.load()):this.sendStatus.set(o.error||"No se pudo editar el mensaje.");return}if(t&&!this.composerFiles.length){this.sendStatus.set("Escribe un mensaje o adjunta un archivo.");return}this.sending.set(true),this.sendStatus.set("Enviando...");let a=await this.hd.sendMessage(this.ticketId,e,this.composerFiles);this.sending.set(false),a?(r.innerHTML="",this.composerFiles=[],this.sendStatus.set("Enviado \u2713"),this.load()):this.sendStatus.set("Error al enviar.");}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=PE({type:i,selectors:[["app-ticket-messages-dialog"]],viewQuery:function(e,t){e&1&&Tp(t.composerInput,Ea,5),e&2&&_I();},decls:21,vars:9,consts:[["composerInput",""],["mat-dialog-title","",1,"conv-head"],[1,"ticket-id"],[1,"cliente"],[1,"tipo"],[1,"estatus",3,"background","color"],[1,"spacer"],["mat-icon-button","","mat-dialog-close","","aria-label","Cerrar"],[1,"asunto"],[1,"ticket-attach"],[1,"conv-body",3,"click"],[1,"conv-expired"],[1,"conv-empty"],[1,"composer",3,"drag-over"],[1,"lightbox"],[1,"estatus"],[1,"ticket-attach-label"],["mat-stroked-button",""],["mat-stroked-button","",3,"click"],["mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"],[1,"conv-loading"],[1,"conv-older"],[1,"conv-msg",3,"class"],["mat-stroked-button","",3,"click","disabled"],[1,"conv-msg"],[1,"conv-meta"],[1,"conv-user"],[1,"conv-date"],["matTooltip","Editar mensaje","aria-label","Editar mensaje",1,"conv-edit",3,"disabled"],[1,"conv-text",3,"innerHTML"],[1,"conv-attach-row"],["matTooltip","Editar mensaje","aria-label","Editar mensaje",1,"conv-edit",3,"click","disabled"],[1,"conv-attach"],[1,"conv-attach",3,"click"],[1,"composer",3,"dragover","dragleave","drop"],[1,"composer-drop-hint"],[1,"composer-editing"],[1,"composer-toolbar"],["mat-icon-button","","matTooltip","Negrita",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Cursiva",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Subrayado",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Bloque de c\xF3digo",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Abrir editor ampliado",3,"click","disabled"],["contenteditable","true","role","textbox","aria-multiline","true","aria-label","Escribir mensaje","data-placeholder","Escribir mensaje\u2026",1,"composer-input",3,"paste"],[1,"composer-actions"],[1,"send-status"],["mat-flat-button","","color","primary",3,"click","disabled"],["mat-button","",3,"click","disabled"],["matTooltip","Adjuntar archivo",1,"attach-label"],["type","file","multiple","","hidden","",3,"change"],[1,"files"],[1,"file-chip"],[1,"file-name"],["type","button","aria-label","Quitar adjunto",1,"file-remove",3,"click","disabled"],[1,"lightbox",3,"click"],[1,"lightbox-close",3,"click"],["alt","",3,"src"]],template:function(e,t){if(e&1&&(si$1(0,"div",1)(1,"span",2),ZI(2),Cc(),si$1(3,"span",3),ZI(4),Cc(),sI(5,Ia,2,1,"span",4),sI(6,Pa,2,5,"span",5),dp(7,"span",6),si$1(8,"button",7)(9,"mat-icon"),ZI(10,"close"),Cc()()(),si$1(11,"div",8),ZI(12),Cc(),sI(13,Va,5,0,"div",9),si$1(14,"mat-dialog-content",10),yp("click",function(a){return t.onConvClick(a)}),sI(15,Fa,7,0,"div",11)(16,Ra,3,0)(17,Ba,2,0,"div",12)(18,Ka,3,1),Cc(),sI(19,$a,33,13,"div",13),sI(20,Ua,4,1,"div",14)),e&2){let n,a,o;Oy(2),xc("#",t.ticketId),Oy(2),Rp(t.header().cliente),Oy(),aI((n=t.header().tipo)?5:-1,n),Oy(),aI((a=t.header().estatus)?6:-1,a),Oy(6),Rp(t.header().asunto),Oy(),aI(t.ticketAttachments().length?13:-1),Oy(2),aI(t.sessionExpired()?15:t.loading()?16:t.messages().length?18:17),Oy(4),aI(t.sessionExpired()?-1:19),Oy(),aI((o=t.lightbox())?20:-1,o);}},dependencies:[Ht$1,jt$1,Nt,Vt,va$1,ga$1,An,yi$1,vi$1,Qn,Wn,Yt,mt],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:min(520px,88vh);max-height:88vh;overflow:hidden}.conv-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin:0;flex:0 0 auto}.conv-head[_ngcontent-%COMP%]   .ticket-id[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-weight:700;color:var(--mat-sys-primary)}.conv-head[_ngcontent-%COMP%]   .cliente[_ngcontent-%COMP%]{font-size:12px;font-weight:600;background:var(--mat-sys-surface-container-high);padding:2px 8px;border-radius:10px}.conv-head[_ngcontent-%COMP%]   .tipo[_ngcontent-%COMP%]{font-size:12px;font-weight:600;border:1px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant);padding:2px 8px;border-radius:10px}.conv-head[_ngcontent-%COMP%]   .estatus[_ngcontent-%COMP%]{font-size:12px;font-weight:700;padding:2px 10px;border-radius:12px}.conv-head[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.asunto[_ngcontent-%COMP%]{font-weight:600;font-size:14px;padding:0 24px 8px;color:var(--mat-sys-on-surface)}.ticket-attach[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:0 24px 6px}.ticket-attach[_ngcontent-%COMP%]   .ticket-attach-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--mat-sys-on-surface-variant)}.ticket-attach[_ngcontent-%COMP%]   .mat-mdc-outlined-button[_ngcontent-%COMP%]{--mdc-outlined-button-container-height: 30px;min-height:30px;line-height:30px;padding:0 12px;font-size:12px}.ticket-attach[_ngcontent-%COMP%]   .mat-mdc-outlined-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;margin-right:4px}.conv-body[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;max-height:none;background:#f4f6f9;padding:12px}.conv-loading[_ngcontent-%COMP%], .conv-empty[_ngcontent-%COMP%]{text-align:center;color:var(--mat-sys-on-surface-variant);padding:24px;font-size:13px}.conv-msg[_ngcontent-%COMP%]{max-width:80%;margin:8px 0;padding:8px 12px;border-radius:10px;font-size:13px;box-shadow:0 1px 2px #00000014}.conv-msg.conv-emp[_ngcontent-%COMP%]{margin-left:auto;background:#e3f0fb;border:1px solid #c6e0f5}.conv-msg.conv-cli[_ngcontent-%COMP%]{margin-right:auto;background:#fff;border:1px solid var(--mat-sys-outline-variant)}.conv-msg.conv-sys[_ngcontent-%COMP%]{margin:8px auto;max-width:90%;background:transparent;box-shadow:none;text-align:center;color:var(--mat-sys-on-surface-variant);font-size:12px;font-style:italic}.conv-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px}.conv-meta[_ngcontent-%COMP%]   .conv-user[_ngcontent-%COMP%]{font-weight:700;font-family:inherit}.conv-meta[_ngcontent-%COMP%]   .conv-date[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);margin-left:auto}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;border:none;background:transparent;padding:2px;border-radius:50%;cursor:pointer;color:var(--mat-sys-on-surface-variant)}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]:hover:not(:disabled){color:var(--mat-sys-primary, #048abf)}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]:disabled{cursor:default;opacity:.5}.conv-text[_ngcontent-%COMP%]{line-height:1.4;overflow-wrap:anywhere;word-break:break-word;overflow-x:auto}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%], code[_ngcontent-%COMP%]){white-space:pre-wrap;overflow-wrap:anywhere;font-family:JetBrains Mono,ui-monospace,monospace}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}.conv-text[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.conv-text[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}.conv-text[_ngcontent-%COMP%]   :where(li[_ngcontent-%COMP%]){margin:2px 0}.conv-text[_ngcontent-%COMP%]   :where(img[_ngcontent-%COMP%]){max-width:100%;height:auto;border-radius:6px;cursor:zoom-in;margin:4px 0;float:none!important}.conv-text[_ngcontent-%COMP%]   :where(a[_ngcontent-%COMP%]){color:var(--mat-sys-primary);word-break:break-all}.conv-text[_ngcontent-%COMP%]   :where(table[_ngcontent-%COMP%]){max-width:100%;border-collapse:collapse;font-size:12px}.conv-text[_ngcontent-%COMP%]   :where(td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]){border:1px solid var(--mat-sys-outline-variant);padding:2px 6px}.conv-text[_ngcontent-%COMP%]   :where(th[_ngcontent-%COMP%]){background:#0000000a;font-weight:700}.conv-text[_ngcontent-%COMP%]   :where(p[_ngcontent-%COMP%]){margin:4px 0}.conv-text[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){margin:8px 0 4px;line-height:1.25;font-weight:700}.conv-text[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%]){font-size:1.25em}.conv-text[_ngcontent-%COMP%]   :where(h2[_ngcontent-%COMP%]){font-size:1.15em}.conv-text[_ngcontent-%COMP%]   :where(h3[_ngcontent-%COMP%]){font-size:1.08em}.conv-text[_ngcontent-%COMP%]   :where(h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){font-size:1em}.conv-text[_ngcontent-%COMP%]   :where(blockquote[_ngcontent-%COMP%]){margin:6px 0;padding:2px 0 2px 10px;border-left:3px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}.conv-attach-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.conv-attach[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--mat-sys-outline-variant);background:var(--mat-sys-surface);border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer}.conv-attach[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-attach[_ngcontent-%COMP%]:hover{border-color:var(--mat-sys-primary)}.composer[_ngcontent-%COMP%]{position:relative;flex:0 1 auto;display:flex;flex-direction:column;max-height:55vh;border-top:1px solid var(--mat-sys-outline-variant);padding:6px 24px 16px}.composer.drag-over[_ngcontent-%COMP%]{background:#048abf0f}.composer.drag-over[_ngcontent-%COMP%]   .composer-drop-hint[_ngcontent-%COMP%]{display:flex}.composer-drop-hint[_ngcontent-%COMP%]{display:none;position:absolute;inset:4px;z-index:2;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:2px dashed var(--mat-sys-primary, #048abf);border-radius:14px;background:#f4f6f9eb;color:var(--mat-sys-primary, #048abf);font-size:13px;font-weight:600;pointer-events:none}.composer-drop-hint[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:28px;width:28px;height:28px}.composer-editing[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:4px 10px;border-radius:10px;background:#048abf14;color:var(--mat-sys-primary, #048abf);font-size:12px;font-weight:600}.composer-editing[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.composer-editing[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-toolbar[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:2px}.composer-toolbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-input[_ngcontent-%COMP%]{flex:0 1 auto;width:100%;box-sizing:border-box;min-height:44px;max-height:none;overflow-y:auto;font:inherit;font-size:14px;line-height:1.4;border:1px solid #d4d6db;border-radius:18px;padding:10px 14px;background:#fff;color:var(--mat-sys-on-surface);outline:none;overflow-wrap:anywhere;white-space:pre-wrap}.composer-input[_ngcontent-%COMP%]:focus{border-color:var(--mat-sys-primary, #048abf);box-shadow:0 0 0 2px #048abf26}.composer-input[_ngcontent-%COMP%]:empty:before{content:attr(data-placeholder);color:var(--mat-sys-on-surface-variant);pointer-events:none}.composer-input[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}.composer-input[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.composer-input[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.composer-input[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}.composer-input[_ngcontent-%COMP%]   :where(li[_ngcontent-%COMP%]){margin:2px 0}.composer-input[_ngcontent-%COMP%]   :where(p[_ngcontent-%COMP%]){margin:4px 0}.composer-input[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){margin:8px 0 4px;line-height:1.25;font-weight:700}.composer-input[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%]){font-size:1.25em}.composer-input[_ngcontent-%COMP%]   :where(h2[_ngcontent-%COMP%]){font-size:1.15em}.composer-input[_ngcontent-%COMP%]   :where(h3[_ngcontent-%COMP%]){font-size:1.08em}.composer-input[_ngcontent-%COMP%]   :where(h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){font-size:1em}.composer-input[_ngcontent-%COMP%]   :where(blockquote[_ngcontent-%COMP%]){margin:6px 0;padding:2px 0 2px 10px;border-left:3px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}.composer-input[_ngcontent-%COMP%]   :where(table[_ngcontent-%COMP%]){max-width:100%;border-collapse:collapse;font-size:12px}.composer-input[_ngcontent-%COMP%]   :where(td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]){border:1px solid var(--mat-sys-outline-variant);padding:2px 6px}.composer-input[_ngcontent-%COMP%]   :where(th[_ngcontent-%COMP%]){background:#0000000a;font-weight:700}.composer-actions[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:10px;margin-top:8px}.composer-actions[_ngcontent-%COMP%]   .attach-label[_ngcontent-%COMP%]{display:inline-flex;cursor:pointer;color:var(--mat-sys-on-surface-variant)}.composer-actions[_ngcontent-%COMP%]   .files[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;min-width:0}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;max-width:220px;padding:2px 4px 2px 8px;border:1px solid var(--mat-sys-outline-variant);border-radius:14px;background:var(--mat-sys-surface-container-high, #eef1f5);font-size:12px}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px;color:var(--mat-sys-on-surface-variant)}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;color:var(--mat-sys-on-surface-variant);font-size:12px;line-height:1;padding:2px 4px;border-radius:50%}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]:hover{color:var(--mat-sys-error, #d32f2f)}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]:disabled{cursor:default;opacity:.5}.composer-actions[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-actions[_ngcontent-%COMP%]   .send-status[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.lightbox[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:1200;background:#000000d9;display:flex;align-items:center;justify-content:center;cursor:zoom-out}.lightbox[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:92vw;max-height:92vh;border-radius:6px}.lightbox[_ngcontent-%COMP%]   .lightbox-close[_ngcontent-%COMP%]{position:absolute;top:16px;right:20px;background:transparent;border:none;color:#fff;font-size:28px;cursor:pointer}.conv-older[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:2px 0 10px}.conv-expired[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:10px;padding:32px 20px;text-align:center;color:var(--mat-sys-on-surface-variant, #555)}.conv-expired[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:40px;width:40px;height:40px;color:var(--brand, #048abf)}.conv-expired[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;max-width:320px}"]})};function Ga(i,r){return this._trackRow(r)}var aa=(i,r)=>r.id;function Za(i,r){if(i&1&&(_c(0,"tr",0)(1,"td",3),ZI(2),Mc()()),i&2){let e=EI();Oy(),_p("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),lp("colspan",e.numCols),Oy(),xc(" ",e.label," ");}}function Ja(i,r){if(i&1&&(_c(0,"td",3),ZI(1),Mc()),i&2){let e=EI(2);_p("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),lp("colspan",e._firstRowOffset),Oy(),xc(" ",e._firstRowOffset>=e.labelMinRequiredCells?e.label:""," ");}}function ei(i,r){if(i&1){let e=yI();_c(0,"td",6)(1,"button",7),vp("click",function(n){let a=eu(e).$implicit,o=EI(2);return tu(o._cellClicked(a,n))})("focus",function(n){let a=eu(e).$implicit,o=EI(2);return tu(o._emitActiveDateChange(a,n))}),_c(2,"span",8),ZI(3),Mc(),fp(4,"span",9),Mc()();}if(i&2){let e=r.$implicit,t=r.$index,n=EI().$index,a=EI();_p("width",a._cellWidth)("padding-top",a._cellPadding)("padding-bottom",a._cellPadding),lp("data-mat-row",n)("data-mat-col",t),Oy(),jI(e.cssClasses),Mp("mat-calendar-body-disabled",!e.enabled)("mat-calendar-body-active",a._isActiveCell(n,t))("mat-calendar-body-range-start",a._isRangeStart(e.compareValue))("mat-calendar-body-range-end",a._isRangeEnd(e.compareValue))("mat-calendar-body-in-range",a._isInRange(e.compareValue))("mat-calendar-body-comparison-bridge-start",a._isComparisonBridgeStart(e.compareValue,n,t))("mat-calendar-body-comparison-bridge-end",a._isComparisonBridgeEnd(e.compareValue,n,t))("mat-calendar-body-comparison-start",a._isComparisonStart(e.compareValue))("mat-calendar-body-comparison-end",a._isComparisonEnd(e.compareValue))("mat-calendar-body-in-comparison-range",a._isInComparisonRange(e.compareValue))("mat-calendar-body-preview-start",a._isPreviewStart(e.compareValue))("mat-calendar-body-preview-end",a._isPreviewEnd(e.compareValue))("mat-calendar-body-in-preview",a._isInPreview(e.compareValue)),gp("tabIndex",a._isActiveCell(n,t)?0:-1),lp("aria-label",e.ariaLabel)("aria-disabled",!e.enabled||null)("aria-pressed",a._isSelected(e.compareValue))("aria-current",a.todayValue===e.compareValue?"date":null)("aria-describedby",a._getDescribedby(e.compareValue)),Oy(),Mp("mat-calendar-body-selected",a._isSelected(e.compareValue))("mat-calendar-body-comparison-identical",a._isComparisonIdentical(e.compareValue))("mat-calendar-body-today",a.todayValue===e.compareValue),Oy(),xc(" ",e.displayValue," ");}}function ti(i,r){if(i&1&&(_c(0,"tr",1),sI(1,Ja,2,6,"td",4),uI(2,ei,5,49,"td",5,aa),Mc()),i&2){let e=r.$implicit,t=r.$index,n=EI();Oy(),aI(t===0&&n._firstRowOffset?1:-1),Oy(),dI(e);}}function ni(i,r){if(i&1&&(si$1(0,"th",2)(1,"span",6),ZI(2),Cc(),si$1(3,"span",3),ZI(4),Cc()()),i&2){let e=r.$implicit;Oy(2),Rp(e.long),Oy(2),Rp(e.narrow);}}var ai=["*"];function ii(i,r){}function ri(i,r){if(i&1){let e=yI();si$1(0,"mat-month-view",4),Fp("activeDateChange",function(n){eu(e);let a=EI();return eD(a.activeDate,n)||(a.activeDate=n),tu(n)}),yp("_userSelection",function(n){eu(e);let a=EI();return tu(a._dateSelected(n))})("dragStarted",function(n){eu(e);let a=EI();return tu(a._dragStarted(n))})("dragEnded",function(n){eu(e);let a=EI();return tu(a._dragEnded(n))}),Cc();}if(i&2){let e=EI();Lp("activeDate",e.activeDate),up("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)("comparisonStart",e.comparisonStart)("comparisonEnd",e.comparisonEnd)("startDateAccessibleName",e.startDateAccessibleName)("endDateAccessibleName",e.endDateAccessibleName)("activeDrag",e._activeDrag);}}function oi(i,r){if(i&1){let e=yI();si$1(0,"mat-year-view",5),Fp("activeDateChange",function(n){eu(e);let a=EI();return eD(a.activeDate,n)||(a.activeDate=n),tu(n)}),yp("monthSelected",function(n){eu(e);let a=EI();return tu(a._monthSelectedInYearView(n))})("selectedChange",function(n){eu(e);let a=EI();return tu(a._goToDateInView(n,"month"))}),Cc();}if(i&2){let e=EI();Lp("activeDate",e.activeDate),up("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass);}}function si(i,r){if(i&1){let e=yI();si$1(0,"mat-multi-year-view",6),Fp("activeDateChange",function(n){eu(e);let a=EI();return eD(a.activeDate,n)||(a.activeDate=n),tu(n)}),yp("yearSelected",function(n){eu(e);let a=EI();return tu(a._yearSelectedInMultiYearView(n))})("selectedChange",function(n){eu(e);let a=EI();return tu(a._goToDateInView(n,"year"))}),Cc();}if(i&2){let e=EI();Lp("activeDate",e.activeDate),up("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass);}}function li(i,r){}var di=["button"],ci=[[["","matDatepickerToggleIcon",""]]],mi=["[matDatepickerToggleIcon]"];function ui(i,r){i&1&&(fu(),si$1(0,"svg",2),dp(1,"path",3),Cc());}var Te=(()=>{class i{changes=new ne$1;calendarLabel="Calendar";openCalendarLabel="Open calendar";closeCalendarLabel="Close calendar";prevMonthLabel="Previous month";nextMonthLabel="Next month";prevYearLabel="Previous year";nextYearLabel="Next year";prevMultiYearLabel="Previous 24 years";nextMultiYearLabel="Next 24 years";switchToMonthViewLabel="Choose date";switchToMultiYearViewLabel="Choose month and year";startDateLabel="Start date";endDateLabel="End date";comparisonDateLabel="Comparison range";formatYearRange(e,t){return `${e} \u2013 ${t}`}formatYearRangeLabel(e,t){return `${e} to ${t}`}static \u0275fac=function(t){return new(t||i)};static \u0275prov=gr({token:i,factory:i.\u0275fac})}return i})(),pi=0,Ne=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=pi++;cssClasses;constructor(r,e,t,n,a,o=r,b){this.value=r,this.displayValue=e,this.ariaLabel=t,this.enabled=n,this.compareValue=o,this.rawValue=b,this.cssClasses=a instanceof Set?Array.from(a):a;}},hi={passive:false,capture:true},Dt={passive:true,capture:true},Gn={passive:true},Ee=(()=>{class i{_elementRef=D(mr);_ngZone=D(Se$1);_platform=D(w);_intl=D(Te);_eventCleanups;_skipNextFocus=false;_focusActiveCellAfterViewChecked=false;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=false);}isRange=false;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new $e;previewChange=new $e;activeDateChange=new $e;dragStarted=new $e;dragEnded=new $e;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=false;_injector=D(me);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=D(Hv),t=D(nn);this._startDateLabelId=t.getId("mat-calendar-body-start-"),this._endDateLabelId=t.getId("mat-calendar-body-end-"),this._comparisonStartDateLabelId=t.getId("mat-calendar-body-comparison-start-"),this._comparisonEndDateLabelId=t.getId("mat-calendar-body-comparison-end-"),D(q).load(nh),this._ngZone.runOutsideAngular(()=>{let n=this._elementRef.nativeElement,a=[e.listen(n,"touchmove",this._touchmoveHandler,hi),e.listen(n,"mouseenter",this._enterHandler,Dt),e.listen(n,"focus",this._enterHandler,Dt),e.listen(n,"mouseleave",this._leaveHandler,Dt),e.listen(n,"blur",this._leaveHandler,Dt),e.listen(n,"mousedown",this._mousedownHandler,Gn),e.listen(n,"touchstart",this._mousedownHandler,Gn)];this._platform.isBrowser&&a.push(e.listen("window","mouseup",this._mouseupHandler),e.listen("window","touchend",this._touchendHandler)),this._eventCleanups=a;});}_cellClicked(e,t){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:t});}_emitActiveDateChange(e,t){e.enabled&&this.activeDateChange.emit({value:e.value,event:t});}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let t=e.numCols,{rows:n,numCols:a}=this;(e.rows||t)&&(this._firstRowOffset=n&&n.length&&n[0].length?a-n[0].length:0),(e.cellAspectRatio||t||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/a}%`),(t||!this._cellWidth)&&(this._cellWidth=`${100/a}%`);}ngOnDestroy(){this._eventCleanups.forEach(e=>e());}_isActiveCell(e,t){let n=e*this.numCols+t;return e&&(n-=this._firstRowOffset),n==this.activeCell}_focusActiveCell(e=true){jy(()=>{setTimeout(()=>{let t=this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");t&&(e||(this._skipNextFocus=true),t.focus());});},{injector:this._injector});}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=true;}_isRangeStart(e){return Wt(e,this.startValue,this.endValue)}_isRangeEnd(e){return Qt(e,this.startValue,this.endValue)}_isInRange(e){return $t(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return Wt(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,t,n){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return  false;let a=this.rows[t][n-1];if(!a){let o=this.rows[t-1];a=o&&o[o.length-1];}return a&&!this._isRangeEnd(a.compareValue)}_isComparisonBridgeEnd(e,t,n){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return  false;let a=this.rows[t][n+1];if(!a){let o=this.rows[t+1];a=o&&o[0];}return a&&!this._isRangeStart(a.compareValue)}_isComparisonEnd(e){return Qt(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return $t(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return Wt(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return Qt(e,this.previewStart,this.previewEnd)}_isInPreview(e){return $t(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return `${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return `${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type==="focus"){this._skipNextFocus=false;return}if(e.target&&this.isRange){let t=this._getCellFromElement(e.target);t&&this._ngZone.run(()=>this.previewChange.emit({value:t.enabled?t:null,event:e}));}};_touchmoveHandler=e=>{if(!this.isRange)return;let t=Zn(e),n=t?this._getCellFromElement(t):null;t!==e.target&&(this._didDragSinceMouseDown=true),qt(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:n?.enabled?n:null,event:e}));};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!=="blur"&&(this._didDragSinceMouseDown=true),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})));};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=false;let t=e.target&&this._getCellFromElement(e.target);!t||!this._isInRange(t.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:t.rawValue,event:e});});};_mouseupHandler=e=>{if(!this.isRange)return;let t=qt(e.target);if(!t){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e});});return}t.closest(".mat-calendar-body")===this._elementRef.nativeElement&&this._ngZone.run(()=>{let n=this._getCellFromElement(t);this.dragEnded.emit({value:n?.rawValue??null,event:e});});};_touchendHandler=e=>{let t=Zn(e);t&&this._mouseupHandler({target:t});};_getCellFromElement(e){let t=qt(e);if(t){let n=t.getAttribute("data-mat-row"),a=t.getAttribute("data-mat-col");if(n&&a)return this.rows[parseInt(n)]?.[parseInt(a)]||null}return null}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["","mat-calendar-body",""]],hostAttrs:[1,"mat-calendar-body"],inputs:{label:"label",rows:"rows",todayValue:"todayValue",startValue:"startValue",endValue:"endValue",labelMinRequiredCells:"labelMinRequiredCells",numCols:"numCols",activeCell:"activeCell",isRange:"isRange",cellAspectRatio:"cellAspectRatio",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",previewStart:"previewStart",previewEnd:"previewEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedValueChange:"selectedValueChange",previewChange:"previewChange",activeDateChange:"activeDateChange",dragStarted:"dragStarted",dragEnded:"dragEnded"},exportAs:["matCalendarBody"],features:[am],decls:11,vars:11,consts:[["aria-hidden","true"],["role","row"],[1,"mat-calendar-body-hidden-label",3,"id"],[1,"mat-calendar-body-label"],[1,"mat-calendar-body-label",3,"paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container",3,"width","paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container"],["type","button",1,"mat-calendar-body-cell",3,"click","focus","tabindex"],[1,"mat-calendar-body-cell-content","mat-focus-indicator"],["aria-hidden","true",1,"mat-calendar-body-cell-preview"]],template:function(t,n){t&1&&(sI(0,Za,3,6,"tr",0),uI(1,ti,4,1,"tr",1,Ga,true),_c(3,"span",2),ZI(4),Mc(),_c(5,"span",2),ZI(6),Mc(),_c(7,"span",2),ZI(8),Mc(),_c(9,"span",2),ZI(10),Mc()),t&2&&(aI(n._firstRowOffset<n.labelMinRequiredCells?0:-1),Oy(),dI(n.rows),Oy(2),gp("id",n._startDateLabelId),Oy(),xc(" ",n.startDateAccessibleName,`
`),Oy(),gp("id",n._endDateLabelId),Oy(),xc(" ",n.endDateAccessibleName,`
`),Oy(),gp("id",n._comparisonStartDateLabelId),Oy(),Op(" ",n.comparisonDateAccessibleName," ",n.startDateAccessibleName,`
`),Oy(),gp("id",n._comparisonEndDateLabelId),Oy(),Op(" ",n.comparisonDateAccessibleName," ",n.endDateAccessibleName,`
`));},styles:[`.mat-calendar-body {
  min-width: 224px;
}

.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-label {
  height: 0;
  line-height: 0;
  text-align: start;
  padding-left: 4.7142857143%;
  padding-right: 4.7142857143%;
  font-size: var(--mat-datepicker-calendar-body-label-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-body-label-text-weight, var(--mat-sys-title-small-weight));
  color: var(--mat-datepicker-calendar-body-label-text-color, var(--mat-sys-on-surface));
}

.mat-calendar-body-hidden-label {
  display: none;
}

.mat-calendar-body-cell-container {
  position: relative;
  height: 0;
  line-height: 0;
}

.mat-calendar-body-cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  text-align: center;
  outline: none;
  margin: 0;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-calendar-body-cell::-moz-focus-inner {
  border: 0;
}

.mat-calendar-body-cell::before,
.mat-calendar-body-cell::after,
.mat-calendar-body-cell-preview {
  content: "";
  position: absolute;
  top: 5%;
  left: 0;
  z-index: 0;
  box-sizing: border-box;
  display: block;
  height: 90%;
  width: 100%;
}

.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-start::after,
.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
.mat-calendar-body-comparison-start::after,
.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 5%;
  width: 95%;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,
[dir=rtl] .mat-calendar-body-comparison-start::after,
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  left: 0;
  border-radius: 0;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
.mat-calendar-body-comparison-end::after,
.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,
[dir=rtl] .mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,
[dir=rtl] .mat-calendar-body-comparison-end::after,
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  left: 5%;
  border-radius: 0;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,
[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {
  width: 95%;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,
.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,
[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {
  width: 90%;
}

.mat-calendar-body-in-preview {
  color: var(--mat-datepicker-calendar-date-preview-state-outline-color, var(--mat-sys-primary));
}
.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {
  border-top: dashed 1px;
  border-bottom: dashed 1px;
}

.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {
  border-left: 0;
  border-right: dashed 1px;
}

.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: dashed 1px;
}
[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {
  border-right: 0;
  border-left: dashed 1px;
}

.mat-calendar-body-disabled {
  cursor: default;
}
.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  color: var(--mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  border-color: var(--mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-calendar-body-disabled {
    opacity: 0.5;
  }
}

.mat-calendar-body-cell-content {
  top: 5%;
  left: 5%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  line-height: 1;
  border-width: 1px;
  border-style: solid;
  border-radius: 999px;
  color: var(--mat-datepicker-calendar-date-text-color, var(--mat-sys-on-surface));
  border-color: var(--mat-datepicker-calendar-date-outline-color, transparent);
}
.mat-calendar-body-cell-content.mat-focus-indicator {
  position: absolute;
}
@media (forced-colors: active) {
  .mat-calendar-body-cell-content {
    border: none;
  }
}

.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
  background-color: var(--mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}

@media (hover: hover) {
  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {
    background-color: var(--mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
  }
}
.mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-state-background-color, var(--mat-sys-primary));
  color: var(--mat-datepicker-calendar-date-selected-state-text-color, var(--mat-sys-on-primary));
}
.mat-calendar-body-disabled > .mat-calendar-body-selected {
  background-color: var(--mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-calendar-body-selected.mat-calendar-body-today {
  box-shadow: inset 0 0 0 1px var(--mat-datepicker-calendar-date-today-selected-state-outline-color, var(--mat-sys-primary));
}

.mat-calendar-body-in-range::before {
  background: var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range::before {
  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));
}

.mat-calendar-body-comparison-bridge-start::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {
  background: linear-gradient(to right, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-comparison-bridge-end::before,
[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {
  background: linear-gradient(to left, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);
}

.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,
.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--mat-sys-secondary-container));
}

.mat-calendar-body-comparison-identical.mat-calendar-body-selected,
.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {
  background: var(--mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--mat-sys-secondary));
}

@media (forced-colors: active) {
  .mat-datepicker-popup:not(:empty),
  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {
    outline: solid 1px;
  }
  .mat-calendar-body-today {
    outline: dotted 1px;
  }
  .mat-calendar-body-cell::before,
  .mat-calendar-body-cell::after,
  .mat-calendar-body-selected {
    background: none;
  }
  .mat-calendar-body-in-range::before,
  .mat-calendar-body-comparison-bridge-start::before,
  .mat-calendar-body-comparison-bridge-end::before {
    border-top: solid 1px;
    border-bottom: solid 1px;
  }
  .mat-calendar-body-range-start::before {
    border-left: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-start::before {
    border-left: 0;
    border-right: solid 1px;
  }
  .mat-calendar-body-range-end::before {
    border-right: solid 1px;
  }
  [dir=rtl] .mat-calendar-body-range-end::before {
    border-right: 0;
    border-left: solid 1px;
  }
  .mat-calendar-body-in-comparison-range::before {
    border-top: dashed 1px;
    border-bottom: dashed 1px;
  }
  .mat-calendar-body-comparison-start::before {
    border-left: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-start::before {
    border-left: 0;
    border-right: dashed 1px;
  }
  .mat-calendar-body-comparison-end::before {
    border-right: dashed 1px;
  }
  [dir=rtl] .mat-calendar-body-comparison-end::before {
    border-right: 0;
    border-left: dashed 1px;
  }
}
`],encapsulation:2})}return i})();function Xt(i){return i?.nodeName==="TD"}function qt(i){let r;return Xt(i)?r=i:Xt(i.parentNode)?r=i.parentNode:Xt(i.parentNode?.parentNode)&&(r=i.parentNode.parentNode),r?.getAttribute("data-mat-row")!=null?r:null}function Wt(i,r,e){return e!==null&&r!==e&&i<e&&i===r}function Qt(i,r,e){return r!==null&&r!==e&&i>=r&&i===e}function $t(i,r,e,t){return t&&r!==null&&e!==null&&r!==e&&i>=r&&i<=e}function Zn(i){let r=i.changedTouches[0];return document.elementFromPoint(r.clientX,r.clientY)}var R=class{start;end;_disableStructuralEquivalency;constructor(r,e){this.start=r,this.end=e;}},Le=(()=>{class i{selection;_adapter;_selectionChanged=new ne$1;selectionChanged=this._selectionChanged;constructor(e,t){this.selection=e,this._adapter=t,this.selection=e;}updateSelection(e,t){let n=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:t,oldValue:n});}ngOnDestroy(){this._selectionChanged.complete();}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static \u0275fac=function(t){eE();};static \u0275prov=X({token:i,factory:i.\u0275fac})}return i})(),_i=(()=>{class i extends Le{constructor(e){super(null,e);}add(e){super.updateSelection(e,this);}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new i(this._adapter);return e.updateSelection(this.selection,this),e}static \u0275fac=function(t){return new(t||i)(Me(l))};static \u0275prov=X({token:i,factory:i.\u0275fac})}return i})();var ia={provide:Le,useFactory:()=>D(Le,{optional:true,skipSelf:true})||new _i(D(l))};var ra=new N("MAT_DATE_RANGE_SELECTION_STRATEGY");var Ut=7,gi=0,Jn=(()=>{class i{_changeDetectorRef=D(JL);_dateFormats=D(d,{optional:true});_dateAdapter=D(l,{optional:true});_dir=D(Ss,{optional:true});_rangeStrategy=D(ra,{optional:true});_rerenderSubscription=U.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),this._hasSameMonthAndYear(t,this._activeDate)||this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof R?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new $e;_userSelection=new $e;dragStarted=new $e;dragEnded=new $e;activeDateChange=new $e;_matCalendarBody;_monthLabel=Ft("");_weeks=Ft([]);_firstWeekOffset=Ft(0);_rangeStart=Ft(null);_rangeEnd=Ft(null);_comparisonRangeStart=Ft(null);_comparisonRangeEnd=Ft(null);_previewStart=Ft(null);_previewEnd=Ft(null);_isRange=Ft(false);_todayDate=Ft(null);_weekdays=Ft([]);constructor(){D(q).load(ht$1),this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Kh(null)).subscribe(()=>this._init());}ngOnChanges(e){let t=e.comparisonStart||e.comparisonEnd;t&&!t.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview();}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_dateSelected(e){let t=e.value,n=this._getDateFromDayOfMonth(t),a,o;this._selected instanceof R?(a=this._getDateInCurrentMonth(this._selected.start),o=this._getDateInCurrentMonth(this._selected.end)):a=o=this._getDateInCurrentMonth(this._selected),(a!==t||o!==t)&&this.selectedChange.emit(n),this._userSelection.emit({value:n,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck();}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this._activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=true,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!Hr(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=false);}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((Ut+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%Ut),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck();}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e);}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_previewChanged({event:e,value:t}){if(this._rangeStrategy){let n=t?t.rawValue:null,a=this._rangeStrategy.createPreview(n,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(a.start)),this._previewEnd.set(this._getCellCompareValue(a.end)),this.activeDrag&&n){let o=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,n,e);o&&(this._previewStart.set(this._getCellCompareValue(o.start)),this._previewEnd.set(this._getCellCompareValue(o.end)));}}}_dragEnded(e){if(this.activeDrag)if(e.value){let t=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:t??null,event:e.event});}else this.dragEnded.emit({value:null,event:e.event});}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),t=this._dateAdapter.getDayOfWeekNames("narrow"),a=this._dateAdapter.getDayOfWeekNames("long").map((o,b)=>({long:o,narrow:t[b],id:gi++}));this._weekdays.set(a.slice(e).concat(a.slice(0,e)));}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),t=this._dateAdapter.getDateNames(),n=[[]];for(let a=0,o=this._firstWeekOffset();a<e;a++,o++){o==Ut&&(n.push([]),o=0);let b=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),a+1),Ie=this._shouldEnableDate(b),Pe=this._dateAdapter.format(b,this._dateFormats.display.dateA11yLabel),Oe=this.dateClass?this.dateClass(b,"month"):void 0;n[n.length-1].push(new Ne(a+1,t[a],Pe,Ie,Oe,this._getCellCompareValue(b),b));}this._weeks.set(n);}_shouldEnableDate(e){return !!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,t){return !!(e&&t&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(t)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t))}_getCellCompareValue(e){if(e){let t=this._dateAdapter.getYear(e),n=this._dateAdapter.getMonth(e),a=this._dateAdapter.getDate(e);return new Date(t,n,a).getTime()}return null}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setRanges(e){e instanceof R?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(true)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(false)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd));}_canSelect(e){return !this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null);}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-month-view"]],viewQuery:function(t,n){if(t&1&&Dp(Ee,5),t&2){let a;bI(a=CI())&&(n._matCalendarBody=a.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName",activeDrag:"activeDrag"},outputs:{selectedChange:"selectedChange",_userSelection:"_userSelection",dragStarted:"dragStarted",dragEnded:"dragEnded",activeDateChange:"activeDateChange"},exportAs:["matMonthView"],features:[am],decls:8,vars:14,consts:[["role","grid",1,"mat-calendar-table"],[1,"mat-calendar-table-header"],["scope","col"],["aria-hidden","true"],["colspan","7",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","previewChange","dragStarted","dragEnded","keyup","keydown","label","rows","todayValue","startValue","endValue","comparisonStart","comparisonEnd","previewStart","previewEnd","isRange","labelMinRequiredCells","activeCell","startDateAccessibleName","endDateAccessibleName"],[1,"cdk-visually-hidden"]],template:function(t,n){t&1&&(si$1(0,"table",0)(1,"thead",1)(2,"tr"),uI(3,ni,5,2,"th",2,aa),Cc(),si$1(5,"tr",3),dp(6,"th",4),Cc()(),si$1(7,"tbody",5),yp("selectedValueChange",function(o){return n._dateSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("previewChange",function(o){return n._previewChanged(o)})("dragStarted",function(o){return n.dragStarted.emit(o)})("dragEnded",function(o){return n._dragEnded(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),Cc()()),t&2&&(Oy(3),dI(n._weekdays()),Oy(4),up("label",n._monthLabel())("rows",n._weeks())("todayValue",n._todayDate())("startValue",n._rangeStart())("endValue",n._rangeEnd())("comparisonStart",n._comparisonRangeStart())("comparisonEnd",n._comparisonRangeEnd())("previewStart",n._previewStart())("previewEnd",n._previewEnd())("isRange",n._isRange())("labelMinRequiredCells",3)("activeCell",n._dateAdapter.getDate(n.activeDate)-1)("startDateAccessibleName",n.startDateAccessibleName)("endDateAccessibleName",n.endDateAccessibleName));},dependencies:[Ee],encapsulation:2})}return i})(),F=24,Gt=4,ea=(()=>{class i{_changeDetectorRef=D(JL);_dateAdapter=D(l,{optional:true});_dir=D(Ss,{optional:true});_rerenderSubscription=U.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),oa(this._dateAdapter,t,this._activeDate,this.minDate,this.maxDate)||this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof R?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;selectedChange=new $e;yearSelected=new $e;activeDateChange=new $e;_matCalendarBody;_years=Ft([]);_todayYear=Ft(0);_selectedYear=Ft(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Kh(null)).subscribe(()=>this._init());}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let t=this._dateAdapter.getYear(this._activeDate)-Be(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),n=[];for(let a=0,o=[];a<F;a++)o.push(t+a),o.length==Gt&&(n.push(o.map(b=>this._createCellForYear(b))),o=[]);this._years.set(n),this._changeDetectorRef.markForCheck();}_yearSelected(e){let t=e.value,n=this._dateAdapter.createDate(t,0,1),a=this._getDateFromYear(t);this.yearSelected.emit(n),this.selectedChange.emit(a);}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromYear(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this.activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-Gt);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,Gt);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-Be(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,F-Be(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-F*10:-F);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?F*10:F);break;case 13:case 32:this._selectionKeyPressed=true;break;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=false);}_getActiveCell(){return Be(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell();}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_getDateFromYear(e){let t=this._dateAdapter.getMonth(this.activeDate),n=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,t,1));return this._dateAdapter.createDate(e,t,Math.min(this._dateAdapter.getDate(this.activeDate),n))}_createCellForYear(e){let t=this._dateAdapter.createDate(e,0,1),n=this._dateAdapter.getYearName(t),a=this.dateClass?this.dateClass(t,"multi-year"):void 0;return new Ne(e,n,n,this._shouldEnableYear(e),a)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return  false;if(!this.dateFilter)return  true;let t=this._dateAdapter.createDate(e,0,1);for(let n=t;this._dateAdapter.getYear(n)==e;n=this._dateAdapter.addCalendarDays(n,1))if(this.dateFilter(n))return  true;return  false}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof R){let t=e.start||e.end;t&&this._selectedYear.set(this._dateAdapter.getYear(t));}else e&&this._selectedYear.set(this._dateAdapter.getYear(e));}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-multi-year-view"]],viewQuery:function(t,n){if(t&1&&Dp(Ee,5),t&2){let a;bI(a=CI())&&(n._matCalendarBody=a.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",activeDateChange:"activeDateChange"},exportAs:["matMultiYearView"],decls:5,vars:7,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","rows","todayValue","startValue","endValue","numCols","cellAspectRatio","activeCell"]],template:function(t,n){t&1&&(si$1(0,"table",0)(1,"thead",1)(2,"tr"),dp(3,"th",2),Cc()(),si$1(4,"tbody",3),yp("selectedValueChange",function(o){return n._yearSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),Cc()()),t&2&&(Oy(4),up("rows",n._years())("todayValue",n._todayYear())("startValue",n._selectedYear())("endValue",n._selectedYear())("numCols",4)("cellAspectRatio",4/7)("activeCell",n._getActiveCell()));},dependencies:[Ee],encapsulation:2})}return i})();function oa(i,r,e,t,n){let a=i.getYear(r),o=i.getYear(e),b=sa(i,t,n);return Math.floor((a-b)/F)===Math.floor((o-b)/F)}function Be(i,r,e,t){let n=i.getYear(r);return fi(n-sa(i,e,t),F)}function sa(i,r,e){let t=0;return e?t=i.getYear(e)-F+1:r&&(t=i.getYear(r)),t}function fi(i,r){return (i%r+r)%r}var ta=(()=>{class i{_changeDetectorRef=D(JL);_dateFormats=D(d,{optional:true});_dateAdapter=D(l,{optional:true});_dir=D(Ss,{optional:true});_rerenderSubscription=U.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),this._dateAdapter.getYear(t)!==this._dateAdapter.getYear(this._activeDate)&&this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof R?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;selectedChange=new $e;monthSelected=new $e;activeDateChange=new $e;_matCalendarBody;_months=Ft([]);_yearLabel=Ft("");_todayMonth=Ft(null);_selectedMonth=Ft(null);constructor(){this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Kh(null)).subscribe(()=>this._init());}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_monthSelected(e){let t=e.value,n=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),t,1);this.monthSelected.emit(n);let a=this._getDateFromMonth(t);this.selectedChange.emit(a);}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromMonth(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this.activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=true;break;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=false);}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames("short");this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(t=>t.map(n=>this._createCellForMonth(n,e[n])))),this._changeDetectorRef.markForCheck();}_focusActiveCell(){this._matCalendarBody._focusActiveCell();}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let t=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),n=this._dateAdapter.getNumDaysInMonth(t);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),n))}_createCellForMonth(e,t){let n=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),a=this._dateAdapter.format(n,this._dateFormats.display.monthYearA11yLabel),o=this.dateClass?this.dateClass(n,"year"):void 0;return new Ne(e,t.toLocaleUpperCase(),a,this._shouldEnableMonth(e),o)}_shouldEnableMonth(e){let t=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(t,e)||this._isYearAndMonthBeforeMinDate(t,e))return  false;if(!this.dateFilter)return  true;let n=this._dateAdapter.createDate(t,e,1);for(let a=n;this._dateAdapter.getMonth(a)==e;a=this._dateAdapter.addCalendarDays(a,1))if(this.dateFilter(a))return  true;return  false}_isYearAndMonthAfterMaxDate(e,t){if(this.maxDate){let n=this._dateAdapter.getYear(this.maxDate),a=this._dateAdapter.getMonth(this.maxDate);return e>n||e===n&&t>a}return  false}_isYearAndMonthBeforeMinDate(e,t){if(this.minDate){let n=this._dateAdapter.getYear(this.minDate),a=this._dateAdapter.getMonth(this.minDate);return e<n||e===n&&t<a}return  false}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedMonth(e){e instanceof R?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e));}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-year-view"]],viewQuery:function(t,n){if(t&1&&Dp(Ee,5),t&2){let a;bI(a=CI())&&(n._matCalendarBody=a.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",monthSelected:"monthSelected",activeDateChange:"activeDateChange"},exportAs:["matYearView"],decls:5,vars:9,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","label","rows","todayValue","startValue","endValue","labelMinRequiredCells","numCols","cellAspectRatio","activeCell"]],template:function(t,n){t&1&&(si$1(0,"table",0)(1,"thead",1)(2,"tr"),dp(3,"th",2),Cc()(),si$1(4,"tbody",3),yp("selectedValueChange",function(o){return n._monthSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),Cc()()),t&2&&(Oy(4),up("label",n._yearLabel())("rows",n._months())("todayValue",n._todayMonth())("startValue",n._selectedMonth())("endValue",n._selectedMonth())("labelMinRequiredCells",2)("numCols",4)("cellAspectRatio",4/7)("activeCell",n._dateAdapter.getMonth(n.activeDate)));},dependencies:[Ee],encapsulation:2})}return i})(),la=(()=>{class i{_intl=D(Te);calendar=D(Zt);_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){D(q).load(ht$1);let e=D(JL);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck();});}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView=="month"?"multi-year":"month";}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?-1:-F));}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?1:F));}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):true}nextEnabled(){return !this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,t=this._intl,n=this._dateAdapter;e.currentView==="month"?(this._periodButtonText=n.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=n.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=t.switchToMultiYearViewLabel,this._prevButtonLabel=t.prevMonthLabel,this._nextButtonLabel=t.nextMonthLabel):e.currentView==="year"?(this._periodButtonText=n.getYearName(e.activeDate),this._periodButtonDescription=n.getYearName(e.activeDate),this._periodButtonLabel=t.switchToMonthViewLabel,this._prevButtonLabel=t.prevYearLabel,this._nextButtonLabel=t.nextYearLabel):(this._periodButtonText=t.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=t.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=t.switchToMonthViewLabel,this._prevButtonLabel=t.prevMultiYearLabel,this._nextButtonLabel=t.nextMultiYearLabel);}_isSameView(e,t){return this.calendar.currentView=="month"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(t):this.calendar.currentView=="year"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t):oa(this._dateAdapter,e,t,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let t=this._dateAdapter.getYear(this.calendar.activeDate)-Be(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),n=t+F-1,a=this._dateAdapter.getYearName(this._dateAdapter.createDate(t,0,1)),o=this._dateAdapter.getYearName(this._dateAdapter.createDate(n,0,1));return [a,o]}_periodButtonLabelId=D(nn).getId("mat-calendar-period-label-");static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-calendar-header"]],exportAs:["matCalendarHeader"],ngContentSelectors:ai,decls:17,vars:13,consts:[[1,"mat-calendar-header"],[1,"mat-calendar-controls"],["aria-live","polite",1,"cdk-visually-hidden",3,"id"],["matButton","","type","button",1,"mat-calendar-period-button",3,"click"],["aria-hidden","true"],["viewBox","0 0 10 5","focusable","false","aria-hidden","true",1,"mat-calendar-arrow"],["points","0,0 5,5 10,0"],[1,"mat-calendar-spacer"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-previous-button",3,"click","disabled","matTooltip"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-next-button",3,"click","disabled","matTooltip"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],template:function(t,n){t&1&&(DI(),si$1(0,"div",0)(1,"div",1)(2,"span",2),ZI(3),Cc(),si$1(4,"button",3),yp("click",function(){return n.currentPeriodClicked()}),si$1(5,"span",4),ZI(6),Cc(),fu(),si$1(7,"svg",5),dp(8,"polygon",6),Cc()(),pu(),dp(9,"div",7),wI(10),si$1(11,"button",8),yp("click",function(){return n.previousClicked()}),fu(),si$1(12,"svg",9),dp(13,"path",10),Cc()(),pu(),si$1(14,"button",11),yp("click",function(){return n.nextClicked()}),fu(),si$1(15,"svg",9),dp(16,"path",12),Cc()()()()),t&2&&(Oy(2),up("id",n._periodButtonLabelId),Oy(),Rp(n.periodButtonDescription),Oy(),lp("aria-label",n.periodButtonLabel)("aria-describedby",n._periodButtonLabelId),Oy(2),Rp(n.periodButtonText),Oy(),Mp("mat-calendar-invert",n.calendar.currentView!=="month"),Oy(4),up("disabled",!n.previousEnabled())("matTooltip",n.prevButtonLabel),lp("aria-label",n.prevButtonLabel),Oy(3),up("disabled",!n.nextEnabled())("matTooltip",n.nextButtonLabel),lp("aria-label",n.nextButtonLabel));},dependencies:[ga$1,An,mt],encapsulation:2})}return i})(),Zt=(()=>{class i{_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_changeDetectorRef=D(JL);_elementRef=D(mr);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=false;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_startAt=null;startView="month";get selected(){return this._selected}set selected(e){e instanceof R?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new $e;yearSelected=new $e;monthSelected=new $e;viewChanged=new $e(true);_userSelection=new $e;_userDragDrop=new $e;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck();}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let t=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=true,this._changeDetectorRef.markForCheck(),t&&(this.stateChanges.next(),this.viewChanged.emit(t));}_currentView;_activeDrag=null;stateChanges=new ne$1;constructor(){this._intlChanges=D(Te).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next();});}ngAfterContentInit(){this._calendarHeaderPortal=new Ft$1(this.headerComponent||la),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView;}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=false,this.focusActiveCell());}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete();}ngOnChanges(e){let t=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,n=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,a=t||n||e.dateFilter;if(a&&!a.firstChange){let o=this._getCurrentViewComponent();o&&(this._elementRef.nativeElement.contains(Yt$1())&&(this._moveFocusOnNextTick=true),this._changeDetectorRef.detectChanges(),o._init());}this.stateChanges.next();}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(false);}updateTodaysDate(){this._getCurrentViewComponent()?._init();}_dateSelected(e){let t=e.value;(this.selected instanceof R||t&&!this._dateAdapter.sameDate(t,this.selected))&&this.selectedChange.emit(t),this._userSelection.emit(e);}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e);}_monthSelectedInYearView(e){this.monthSelected.emit(e);}_goToDateInView(e,t){this.activeDate=e,this.currentView=t;}_dragStarted(e){this._activeDrag=e;}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null);}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-calendar"]],viewQuery:function(t,n){if(t&1&&Dp(Jn,5)(ta,5)(ea,5),t&2){let a;bI(a=CI())&&(n.monthView=a.first),bI(a=CI())&&(n.yearView=a.first),bI(a=CI())&&(n.multiYearView=a.first);}},hostAttrs:[1,"mat-calendar"],inputs:{headerComponent:"headerComponent",startAt:"startAt",startView:"startView",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",_userSelection:"_userSelection",_userDragDrop:"_userDragDrop"},exportAs:["matCalendar"],features:[sD([ia]),am],decls:5,vars:2,consts:[[3,"cdkPortalOutlet"],["cdkMonitorSubtreeFocus","","tabindex","-1",1,"mat-calendar-content"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","_userSelection","dragStarted","dragEnded","activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDateChange","monthSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","yearSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"]],template:function(t,n){if(t&1&&(rp(0,ii,0,0,"ng-template",0),si$1(1,"div",1),sI(2,ri,1,11,"mat-month-view",2)(3,oi,1,6,"mat-year-view",3)(4,si,1,6,"mat-multi-year-view",3),Cc()),t&2){let a;up("cdkPortalOutlet",n._calendarHeaderPortal),Oy(2),aI((a=n.currentView)==="month"?2:a==="year"?3:a==="multi-year"?4:-1);}},dependencies:[mn,ts,Jn,ta,ea],styles:[`.mat-calendar {
  display: block;
  line-height: normal;
  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));
}

.mat-calendar-header {
  padding: 8px 8px 0 8px;
}

.mat-calendar-content {
  padding: 0 8px 8px 8px;
  outline: none;
}

.mat-calendar-controls {
  display: flex;
  align-items: center;
  margin: 5% calc(4.7142857143% - 16px);
}

.mat-calendar-spacer {
  flex: 1 1 auto;
}

.mat-calendar-period-button {
  min-width: 0;
  margin: 0 8px;
  font-size: var(--mat-datepicker-calendar-period-button-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-period-button-text-weight, var(--mat-sys-title-small-weight));
  --mat-button-text-label-text-color: var(--mat-datepicker-calendar-period-button-text-color, var(--mat-sys-on-surface-variant));
}

.mat-calendar-arrow {
  display: inline-block;
  width: 10px;
  height: 5px;
  margin: 0 0 0 5px;
  vertical-align: middle;
  fill: var(--mat-datepicker-calendar-period-button-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-calendar-arrow.mat-calendar-invert {
  transform: rotate(180deg);
}
[dir=rtl] .mat-calendar-arrow {
  margin: 0 5px 0 0;
}
@media (forced-colors: active) {
  .mat-calendar-arrow {
    fill: CanvasText;
  }
}

.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),
.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {
  color: var(--mat-datepicker-calendar-navigation-button-icon-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-calendar-previous-button,
[dir=rtl] .mat-calendar-next-button {
  transform: rotate(180deg);
}

.mat-calendar-table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.mat-calendar-table-header th {
  text-align: center;
  padding: 0 0 8px 0;
  color: var(--mat-datepicker-calendar-header-text-color, var(--mat-sys-on-surface-variant));
  font-size: var(--mat-datepicker-calendar-header-text-size, var(--mat-sys-title-small-size));
  font-weight: var(--mat-datepicker-calendar-header-text-weight, var(--mat-sys-title-small-weight));
}

.mat-calendar-table-header-divider {
  position: relative;
  height: 1px;
}
.mat-calendar-table-header-divider::after {
  content: "";
  position: absolute;
  top: 0;
  left: -8px;
  right: -8px;
  height: 1px;
  background: var(--mat-datepicker-calendar-header-divider-color, transparent);
}

.mat-calendar-body-cell-content::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return i})(),bi=new N("mat-datepicker-scroll-strategy",{providedIn:"root",factory:()=>{let i=D(me);return ()=>Bt(i)}}),da=(()=>{class i{_elementRef=D(mr);_animationsDisabled=ct();_changeDetectorRef=D(JL);_globalModel=D(Le);_dateAdapter=D(l);_ngZone=D(Se$1);_rangeSelectionStrategy=D(ra,{optional:true});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=false;_animationDone=new ne$1;_isAnimating=false;_closeButtonText;_closeButtonFocused=false;_actionsPortal=null;_dialogLabelId=null;constructor(){if(D(q).load(ht$1),this._closeButtonText=D(Te).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,t=D(Hv);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[t.listen(e,"animationstart",this._handleAnimationEvent),t.listen(e,"animationend",this._handleAnimationEvent),t.listen(e,"animationcancel",this._handleAnimationEvent)]);}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck();}),this._calendar.focusActiveCell();}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete();}_handleUserSelection(e){let t=this._model.selection,n=e.value,a=t instanceof R;if(a&&this._rangeSelectionStrategy){let o=this._rangeSelectionStrategy.selectionFinished(n,t,e.event);this._model.updateSelection(o,this);}else n&&(a||!this._dateAdapter.sameDate(n,t))&&this._model.add(n);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close();}_handleUserDragDrop(e){this._model.updateSelection(e.value,this);}_startExitAnimation(){this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit"),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next();},200));}_handleAnimationEvent=e=>{let t=this._elementRef.nativeElement;e.target!==t||!e.animationName.startsWith("_mat-datepicker-content")||(clearTimeout(this._animationFallback),this._isAnimating=e.type==="animationstart",t.classList.toggle("mat-datepicker-content-animating",this._isAnimating),this._isAnimating||this._animationDone.next());};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this);}_assignActions(e,t){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,t&&this._changeDetectorRef.detectChanges();}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-datepicker-content"]],viewQuery:function(t,n){if(t&1&&Dp(Zt,5),t&2){let a;bI(a=CI())&&(n._calendar=a.first);}},hostAttrs:[1,"mat-datepicker-content"],hostVars:6,hostBindings:function(t,n){t&2&&(jI(n.color?"mat-"+n.color:""),Mp("mat-datepicker-content-touch",n.datepicker.touchUi)("mat-datepicker-content-animations-enabled",!n._animationsDisabled));},inputs:{color:"color"},exportAs:["matDatepickerContent"],decls:5,vars:26,consts:[["cdkTrapFocus","","role","dialog",1,"mat-datepicker-content-container"],[3,"yearSelected","monthSelected","viewChanged","_userSelection","_userDragDrop","id","startAt","startView","minDate","maxDate","dateFilter","headerComponent","selected","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName"],[3,"cdkPortalOutlet"],["type","button","matButton","elevated",1,"mat-datepicker-close-button",3,"focus","blur","click","color"]],template:function(t,n){t&1&&(si$1(0,"div",0)(1,"mat-calendar",1),yp("yearSelected",function(o){return n.datepicker._selectYear(o)})("monthSelected",function(o){return n.datepicker._selectMonth(o)})("viewChanged",function(o){return n.datepicker._viewChanged(o)})("_userSelection",function(o){return n._handleUserSelection(o)})("_userDragDrop",function(o){return n._handleUserDragDrop(o)}),Cc(),rp(2,li,0,0,"ng-template",2),si$1(3,"button",3),yp("focus",function(){return n._closeButtonFocused=true})("blur",function(){return n._closeButtonFocused=false})("click",function(){return n.datepicker.close()}),ZI(4),Cc()()),t&2&&(Mp("mat-datepicker-content-container-with-custom-header",n.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions",n._actionsPortal),lp("aria-modal",true)("aria-labelledby",n._dialogLabelId??void 0),Oy(),jI(n.datepicker.panelClass),up("id",n.datepicker.id)("startAt",n.datepicker.startAt)("startView",n.datepicker.startView)("minDate",n.datepicker._getMinDate())("maxDate",n.datepicker._getMaxDate())("dateFilter",n.datepicker._getDateFilter())("headerComponent",n.datepicker.calendarHeaderComponent)("selected",n._getSelected())("dateClass",n.datepicker.dateClass)("comparisonStart",n.comparisonStart)("comparisonEnd",n.comparisonEnd)("startDateAccessibleName",n.startDateAccessibleName)("endDateAccessibleName",n.endDateAccessibleName),Oy(),up("cdkPortalOutlet",n._actionsPortal),Oy(),Mp("cdk-visually-hidden",!n._closeButtonFocused),up("color",n.color||"primary"),Oy(),Rp(n._closeButtonText));},dependencies:[gs,Zt,mn,ga$1],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-dialog-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-datepicker-content-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-datepicker-content {
  display: block;
  background-color: var(--mat-datepicker-calendar-container-background-color, var(--mat-sys-surface-container-high));
  color: var(--mat-datepicker-calendar-container-text-color, var(--mat-sys-on-surface));
  box-shadow: var(--mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-shape, var(--mat-sys-corner-large));
}
.mat-datepicker-content.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content .mat-calendar {
  width: 296px;
  height: 354px;
}
.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {
  height: auto;
}
.mat-datepicker-content .mat-datepicker-close-button {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
}
.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {
  display: none;
}

.mat-datepicker-content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mat-datepicker-content-touch {
  display: block;
  max-height: 80vh;
  box-shadow: var(--mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
  border-radius: var(--mat-datepicker-calendar-container-touch-shape, var(--mat-sys-corner-extra-large));
  position: relative;
  overflow: visible;
  min-height: fit-content;
}
.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-datepicker-content-touch .mat-datepicker-content-container {
  min-height: 312px;
  max-height: 788px;
  min-width: 250px;
  max-width: 750px;
}
.mat-datepicker-content-touch .mat-calendar {
  width: 100%;
  height: auto;
}

.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {
  animation: _mat-datepicker-content-exit 100ms linear;
}

@media all and (orientation: landscape) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 64vh;
    height: 80vh;
  }
}
@media all and (orientation: portrait) {
  .mat-datepicker-content-touch .mat-datepicker-content-container {
    width: 80vw;
    height: 100vw;
  }
  .mat-datepicker-content-touch .mat-datepicker-content-container-with-actions {
    height: 115vw;
  }
}
`],encapsulation:2})}return i})(),na=(()=>{class i{_injector=D(me);_viewContainerRef=D(Di$1);_dateAdapter=D(l,{optional:true});_dir=D(Ss,{optional:true});_model=D(Le);_animationsDisabled=ct();_scrollStrategy=D(bi);_inputStateChanges=U.EMPTY;_document=D(tr);calendarHeaderComponent;get startAt(){return this._startAt||(this.datepickerInput?this.datepickerInput.getStartValue():null)}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_startAt=null;startView="month";get color(){return this._color||(this.datepickerInput?this.datepickerInput.getThemePalette():void 0)}set color(e){this._color=e;}_color;touchUi=false;get disabled(){return this._disabled===void 0&&this.datepickerInput?this.datepickerInput.disabled:!!this._disabled}set disabled(e){e!==this._disabled&&(this._disabled=e,this.stateChanges.next(void 0));}_disabled;xPosition="start";yPosition="below";restoreFocus=true;yearSelected=new $e;monthSelected=new $e;viewChanged=new $e(true);dateClass;openedStream=new $e;closedStream=new $e;get panelClass(){return this._panelClass}set panelClass(e){this._panelClass=Ul(e);}_panelClass;get opened(){return this._opened}set opened(e){e?this.open():this.close();}_opened=false;id=D(nn).getId("mat-datepicker-");_getMinDate(){return this.datepickerInput&&this.datepickerInput.min}_getMaxDate(){return this.datepickerInput&&this.datepickerInput.max}_getDateFilter(){return this.datepickerInput&&this.datepickerInput.dateFilter}_overlayRef=null;_componentRef=null;_focusedElementBeforeOpen=null;_backdropHarnessClass=`${this.id}-backdrop`;_actionsPortal=null;datepickerInput;stateChanges=new ne$1;_changeDetectorRef=D(JL);constructor(){this._dateAdapter,this._model.selectionChanged.subscribe(()=>{this._changeDetectorRef.markForCheck();});}ngOnChanges(e){let t=e.xPosition||e.yPosition;if(t&&!t.firstChange&&this._overlayRef){let n=this._overlayRef.getConfig().positionStrategy;n instanceof vt$1&&(this._setConnectedPositions(n),this.opened&&this._overlayRef.updatePosition());}this.stateChanges.next(void 0);}ngOnDestroy(){this._destroyOverlay(),this.close(),this._inputStateChanges.unsubscribe(),this.stateChanges.complete();}select(e){this._model.add(e);}_selectYear(e){this.yearSelected.emit(e);}_selectMonth(e){this.monthSelected.emit(e);}_viewChanged(e){this.viewChanged.emit(e);}registerInput(e){return this.datepickerInput,this._inputStateChanges.unsubscribe(),this.datepickerInput=e,this._inputStateChanges=e.stateChanges.subscribe(()=>this.stateChanges.next(void 0)),this._model}registerActions(e){this._actionsPortal,this._actionsPortal=e,this._componentRef?.instance._assignActions(e,true);}removeActions(e){e===this._actionsPortal&&(this._actionsPortal=null,this._componentRef?.instance._assignActions(null,true));}open(){this._opened||this.disabled||this._componentRef?.instance._isAnimating||(this.datepickerInput,this._focusedElementBeforeOpen=Yt$1(),this._openOverlay(),this._opened=true,this.openedStream.emit());}close(){if(!this._opened||this._componentRef?.instance._isAnimating)return;let e=this.restoreFocus&&this._focusedElementBeforeOpen&&typeof this._focusedElementBeforeOpen.focus=="function",t=()=>{this._opened&&(this._opened=false,this.closedStream.emit());};if(this._componentRef){let{instance:n,location:a}=this._componentRef;n._animationDone.pipe(tn(1)).subscribe(()=>{let o=this._document.activeElement;e&&(!o||o===this._document.activeElement||a.nativeElement.contains(o))&&this._focusedElementBeforeOpen.focus(),this._focusedElementBeforeOpen=null,this._destroyOverlay();}),n._startExitAnimation();}e?setTimeout(t):t();}_applyPendingSelection(){this._componentRef?.instance?._applyPendingSelection();}_forwardContentValues(e){e.datepicker=this,e.color=this.color,e._dialogLabelId=this.datepickerInput.getOverlayLabelId(),e._assignActions(this._actionsPortal,false);}_openOverlay(){this._destroyOverlay();let e=this.touchUi,t=new Ft$1(da,this._viewContainerRef),n=this._overlayRef=Ht$2(this._injector,new Q({positionStrategy:e?this._getDialogStrategy():this._getDropdownStrategy(),hasBackdrop:true,backdropClass:[e?"cdk-overlay-dark-backdrop":"mat-overlay-transparent-backdrop",this._backdropHarnessClass],direction:this._dir||"ltr",scrollStrategy:e?Oe(this._injector):this._scrollStrategy(),panelClass:`mat-datepicker-${e?"dialog":"popup"}`,disableAnimations:this._animationsDisabled}));this._getCloseStream(n).subscribe(a=>{a&&a.preventDefault(),this.close();}),n.keydownEvents().subscribe(a=>{let o=a.keyCode;(o===38||o===40||o===37||o===39||o===33||o===34)&&a.preventDefault();}),this._componentRef=n.attach(t),this._forwardContentValues(this._componentRef.instance),e||jy(()=>{n.updatePosition();},{injector:this._injector});}_destroyOverlay(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=this._componentRef=null);}_getDialogStrategy(){return Fe(this._injector).centerHorizontally().centerVertically()}_getDropdownStrategy(){let e=zt$1(this._injector,this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".mat-datepicker-content").withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition();return this._setConnectedPositions(e)}_setConnectedPositions(e){let t=this.xPosition==="end"?"end":"start",n=t==="start"?"end":"start",a=this.yPosition==="above"?"bottom":"top",o=a==="top"?"bottom":"top";return e.withPositions([{originX:t,originY:o,overlayX:t,overlayY:a},{originX:t,originY:a,overlayX:t,overlayY:o},{originX:n,originY:o,overlayX:n,overlayY:a},{originX:n,originY:a,overlayX:n,overlayY:o}])}_getCloseStream(e){let t=["ctrlKey","shiftKey","metaKey"];return Lh(e.backdropClick(),e.detachments(),e.keydownEvents().pipe(Qt$2(n=>n.keyCode===27&&!Hr(n)||this.datepickerInput&&Hr(n,"altKey")&&n.keyCode===38&&t.every(a=>!Hr(n,a)))))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=HE({type:i,inputs:{calendarHeaderComponent:"calendarHeaderComponent",startAt:"startAt",startView:"startView",color:"color",touchUi:[2,"touchUi","touchUi",eF],disabled:[2,"disabled","disabled",eF],xPosition:"xPosition",yPosition:"yPosition",restoreFocus:[2,"restoreFocus","restoreFocus",eF],dateClass:"dateClass",panelClass:"panelClass",opened:[2,"opened","opened",eF]},outputs:{yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",openedStream:"opened",closedStream:"closed"},features:[am]})}return i})(),Eo=(()=>{class i extends na{static \u0275fac=(()=>{let e;return function(n){return (e||(e=Cm(i)))(n||i)}})();static \u0275cmp=PE({type:i,selectors:[["mat-datepicker"]],exportAs:["matDatepicker"],features:[sD([ia,{provide:na,useExisting:i}]),tp],decls:0,vars:0,template:function(t,n){},encapsulation:2})}return i})(),Se=class{target;targetElement;value=null;constructor(r,e){this.target=r,this.targetElement=e,this.value=this.target.value;}},vi=(()=>{class i{_elementRef=D(mr);_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_isInitialized=false;get value(){return this._model?this._getValueFromModel(this._model.selection):this._pendingValue}set value(e){this._assignValueProgrammatically(e,true);}_model;get disabled(){return !!this._disabled||this._parentDisabled()}set disabled(e){let t=e,n=this._elementRef.nativeElement;this._disabled!==t&&(this._disabled=t,this.stateChanges.next(void 0)),t&&this._isInitialized&&n.blur&&n.blur();}_disabled;dateChange=new $e;dateInput=new $e;stateChanges=new ne$1;_onTouched=()=>{};_validatorOnChange=()=>{};_cvaOnChange=()=>{};_valueChangesSubscription=U.EMPTY;_localeSubscription=U.EMPTY;_pendingValue=null;_parseValidator=()=>this._lastValueValid?null:{matDatepickerParse:{text:this._elementRef.nativeElement.value}};_filterValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value));return !t||this._matchesFilter(t)?null:{matDatepickerFilter:true}};_minValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),n=this._getMinDate();return !n||!t||this._dateAdapter.compareDate(n,t)<=0?null:{matDatepickerMin:{min:n,actual:t}}};_maxValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),n=this._getMaxDate();return !n||!t||this._dateAdapter.compareDate(n,t)>=0?null:{matDatepickerMax:{max:n,actual:t}}};_getValidators(){return [this._parseValidator,this._minValidator,this._maxValidator,this._filterValidator]}_registerModel(e){this._model=e,this._valueChangesSubscription.unsubscribe(),this._pendingValue&&this._assignValue(this._pendingValue),this._valueChangesSubscription=this._model.selectionChanged.subscribe(t=>{if(this._shouldHandleChangeEvent(t)){let n=this._getValueFromModel(t.selection);this._lastValueValid=this._isValidValue(n),this._cvaOnChange(n),this._onTouched(),this._formatValue(n),this.dateInput.emit(new Se(this,this._elementRef.nativeElement)),this.dateChange.emit(new Se(this,this._elementRef.nativeElement));}});}_lastValueValid=false;constructor(){this._localeSubscription=this._dateAdapter.localeChanges.subscribe(()=>{this._assignValueProgrammatically(this.value,true);});}ngAfterViewInit(){this._isInitialized=true;}ngOnChanges(e){yi(e,this._dateAdapter)&&this.stateChanges.next(void 0);}ngOnDestroy(){this._valueChangesSubscription.unsubscribe(),this._localeSubscription.unsubscribe(),this.stateChanges.complete();}registerOnValidatorChange(e){this._validatorOnChange=e;}validate(e){return this._validator?this._validator(e):null}writeValue(e){this._assignValueProgrammatically(e,e!==this.value);}registerOnChange(e){this._cvaOnChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_onKeydown(e){let t=["ctrlKey","shiftKey","metaKey"];Hr(e,"altKey")&&e.keyCode===40&&t.every(a=>!Hr(e,a))&&!this._elementRef.nativeElement.readOnly&&(this._openPopup(),e.preventDefault());}_onInput(e){let t=e.target.value,n=this._lastValueValid,a=this._dateAdapter.parse(t,this._dateFormats.parse.dateInput);this._lastValueValid=this._isValidValue(a),a=this._dateAdapter.getValidDateOrNull(a);let o=!this._dateAdapter.sameDate(a,this.value);!a||o?this._cvaOnChange(a):(t&&!this.value&&this._cvaOnChange(a),n!==this._lastValueValid&&this._validatorOnChange()),o&&(this._assignValue(a),this.dateInput.emit(new Se(this,this._elementRef.nativeElement)));}_onChange(){this.dateChange.emit(new Se(this,this._elementRef.nativeElement));}_onBlur(){this.value&&this._formatValue(this.value),this._onTouched();}_formatValue(e){this._elementRef.nativeElement.value=e!=null?this._dateAdapter.format(e,this._dateFormats.display.dateInput):"";}_assignValue(e){this._model?(this._assignValueToModel(e),this._pendingValue=null):this._pendingValue=e;}_isValidValue(e){return !e||this._dateAdapter.isValid(e)}_parentDisabled(){return  false}_assignValueProgrammatically(e,t){e=this._dateAdapter.deserialize(e),this._lastValueValid=this._isValidValue(e),e=this._dateAdapter.getValidDateOrNull(e),this._assignValue(e),t&&this._formatValue(e);}_matchesFilter(e){let t=this._getDateFilter();return !t||t(e)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=HE({type:i,inputs:{value:"value",disabled:[2,"disabled","disabled",eF]},outputs:{dateChange:"dateChange",dateInput:"dateInput"},features:[am]})}return i})();function yi(i,r){let e=Object.keys(i);for(let t of e){let{previousValue:n,currentValue:a}=i[t];if(r.isDateInstance(n)&&r.isDateInstance(a)){if(!r.sameDate(n,a))return  true}else return  true}return  false}var Ci={provide:ht,useExisting:ao(()=>ca),multi:true},Di={provide:S$1,useExisting:ao(()=>ca),multi:true},ca=(()=>{class i extends vi{_formField=D(le,{optional:true});_closedSubscription=U.EMPTY;_openedSubscription=U.EMPTY;set matDatepicker(e){e&&(this._datepicker=e,this._ariaOwns.set(e.opened?e.id:null),this._closedSubscription=e.closedStream.subscribe(()=>{this._onTouched(),this._ariaOwns.set(null);}),this._openedSubscription=e.openedStream.subscribe(()=>{this._ariaOwns.set(e.id);}),this._registerModel(e.registerInput(this)));}_datepicker;_ariaOwns=Ft(null);get min(){return this._min}set min(e){let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(t,this._min)||(this._min=t,this._validatorOnChange());}_min=null;get max(){return this._max}set max(e){let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(t,this._max)||(this._max=t,this._validatorOnChange());}_max=null;get dateFilter(){return this._dateFilter}set dateFilter(e){let t=this._matchesFilter(this.value);this._dateFilter=e,this._matchesFilter(this.value)!==t&&this._validatorOnChange();}_dateFilter;_validator=null;constructor(){super(),this._validator=pt.compose(super._getValidators());}getConnectedOverlayOrigin(){return this._formField?this._formField.getConnectedOverlayOrigin():this._elementRef}getOverlayLabelId(){return this._formField?this._formField.getLabelId():this._elementRef.nativeElement.getAttribute("aria-labelledby")}getThemePalette(){return this._formField?this._formField.color:void 0}getStartValue(){return this.value}ngOnDestroy(){super.ngOnDestroy(),this._closedSubscription.unsubscribe(),this._openedSubscription.unsubscribe();}_openPopup(){this._datepicker&&this._datepicker.open();}_getValueFromModel(e){return e}_assignValueToModel(e){this._model&&this._model.updateSelection(e,this);}_getMinDate(){return this._min}_getMaxDate(){return this._max}_getDateFilter(){return this._dateFilter}_shouldHandleChangeEvent(e){return e.source!==this}static \u0275fac=function(t){return new(t||i)};static \u0275dir=HE({type:i,selectors:[["input","matDatepicker",""]],hostAttrs:[1,"mat-datepicker-input"],hostVars:6,hostBindings:function(t,n){t&1&&yp("input",function(o){return n._onInput(o)})("change",function(){return n._onChange()})("blur",function(){return n._onBlur()})("keydown",function(o){return n._onKeydown(o)}),t&2&&(gp("disabled",n.disabled),lp("aria-haspopup",n._datepicker?"dialog":null)("aria-owns",n._ariaOwns())("min",n.min?n._dateAdapter.toIso8601(n.min):null)("max",n.max?n._dateAdapter.toIso8601(n.max):null)("data-mat-calendar",n._datepicker?n._datepicker.id:null));},inputs:{matDatepicker:"matDatepicker",min:"min",max:"max",dateFilter:[0,"matDatepickerFilter","dateFilter"]},exportAs:["matDatepickerInput"],features:[sD([Ci,Di,{provide:at$1,useExisting:i}]),tp]})}return i})(),Mi=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=HE({type:i,selectors:[["","matDatepickerToggleIcon",""]]})}return i})(),xi=(()=>{class i{_intl=D(Te);_changeDetectorRef=D(JL);_stateChanges=U.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e;}_disabled;disableRipple=false;_customIcon;_button;constructor(){let e=D(new Gp("tabindex"),{optional:true}),t=Number(e);this.tabIndex=t||t===0?t:null;}ngOnChanges(e){e.datepicker&&this._watchStateChanges();}ngOnDestroy(){this._stateChanges.unsubscribe();}ngAfterContentInit(){this._watchStateChanges();}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation());}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:Dh(),t=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:Dh(),n=this.datepicker?Lh(this.datepicker.openedStream,this.datepicker.closedStream):Dh();this._stateChanges.unsubscribe(),this._stateChanges=Lh(this._intl.changes,e,t,n).subscribe(()=>this._changeDetectorRef.markForCheck());}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=PE({type:i,selectors:[["mat-datepicker-toggle"]],contentQueries:function(t,n,a){if(t&1&&Ip(a,Mi,5),t&2){let o;bI(o=CI())&&(n._customIcon=o.first);}},viewQuery:function(t,n){if(t&1&&Dp(di,5),t&2){let a;bI(a=CI())&&(n._button=a.first);}},hostAttrs:[1,"mat-datepicker-toggle"],hostVars:8,hostBindings:function(t,n){t&1&&yp("click",function(o){return n._open(o)}),t&2&&(lp("tabindex",null)("data-mat-calendar",n.datepicker?n.datepicker.id:null),Mp("mat-datepicker-toggle-active",n.datepicker&&n.datepicker.opened)("mat-accent",n.datepicker&&n.datepicker.color==="accent")("mat-warn",n.datepicker&&n.datepicker.color==="warn"));},inputs:{datepicker:[0,"for","datepicker"],tabIndex:"tabIndex",ariaLabel:[0,"aria-label","ariaLabel"],disabled:[2,"disabled","disabled",eF],disableRipple:"disableRipple"},exportAs:["matDatepickerToggle"],features:[am],ngContentSelectors:mi,decls:4,vars:7,consts:[["button",""],["matIconButton","","type","button",3,"tabIndex","disabled","disableRipple"],["viewBox","0 0 24 24","width","24px","height","24px","fill","currentColor","focusable","false","aria-hidden","true",1,"mat-datepicker-toggle-default-icon"],["d","M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],template:function(t,n){t&1&&(DI(ci),si$1(0,"button",1,0),sI(2,ui,2,0,":svg:svg",2),wI(3),Cc()),t&2&&(up("tabIndex",n.disabled?-1:n.tabIndex)("disabled",n.disabled)("disableRipple",n.disableRipple),lp("aria-haspopup",n.datepicker?"dialog":null)("aria-label",n.ariaLabel||n._intl.openCalendarLabel)("aria-expanded",n.datepicker?n.datepicker.opened:null),Oy(2),aI(n._customIcon?-1:2));},dependencies:[An],styles:[`.mat-datepicker-toggle {
  pointer-events: auto;
  color: var(--mat-datepicker-toggle-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-datepicker-toggle button {
  color: inherit;
}

.mat-datepicker-toggle-active {
  color: var(--mat-datepicker-toggle-active-state-icon-color, var(--mat-sys-primary));
}

@media (forced-colors: active) {
  .mat-datepicker-toggle-default-icon {
    color: CanvasText;
  }
}
`],encapsulation:2})}return i})();var To=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=FE({type:i});static \u0275inj=Nl({providers:[Te],imports:[va$1,Qe,ys,me$1,da,xi,la,qr,It]})}return i})();export{$n as $,Cr as C,Dr as D,Eo as E,Qn as Q,To as T,Un as U,Wn as W,ca as c,jt as j,lr as l,sr as s,vt as v,xi as x,yr as y};