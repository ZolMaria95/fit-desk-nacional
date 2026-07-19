import {J as J$1,Z as Z$1}from'./chunk-DY8oeC6S.js';import {aT as ih,D,$ as $e$1,u as O,F as Ft,K,O as OE,H as Ht$1,N as Nt,y as zt$1,V as Vt,i as ii$1,Q as QI,w as wc,a as iI,g as gp,k as ky,A as Ap,s as sI,d as cp,M as Mc,G as LE,I as Cl$1,R as qr,T as mr$1,aq as Se,aG as QL,aB as jv,c3 as ts,ap as N,aE as $e$2,b7 as KL,bu as Tc,bw as up,bv as bc,ak as bp,ae as ap,a1 as FI,a2 as Cp,a7 as gh,bK as ge,ah as vt,ax as me,ar as ct,aL as Wo,aD as te,aX as B,aZ as nn,bJ as en,aN as Qh,b5 as Zh,ay as Rh,aI as Hr,l as Ly,aW as $,a$ as YL,_ as II,bN as np,ab as iD,af as Ep,a4 as TI,a5 as bI,a3 as vp,Z as tr$1,aA as Ir,at as q,au as sh,b9 as nh,a0 as DI,r as lp,as as U$1,bm as Pe,bn as Le,ag as VE,aa as Xf,Y as Yp,c as ce,f as ee,c4 as zt$2,j as WL,x as jt$1,B as lI,bg as cI,aV as _I,E as uI,t as Dp,C as CI,W as Wv,z as zv,c5 as _s,c6 as Yt$1,a9 as Tm,bf as pp,b8 as Up,bR as vh,b6 as im,al as mI,am as Yl,v as vI,an as Kl,bc as lu,b0 as Ii$1,aK as Is,aH as Yh,aJ as tn,bW as Pt,bY as j,bZ as xt,m as Qt$1,bV as L,c7 as Xv,bC as aI,c8 as l,bI as ht,c9 as ms,ca as _i$1,ao as tp,cb as d,bd as uu,bh as gr$1,cc as Hl,cd as at$1,bU as Yt$3,ce as wt$1,cf as Kt$1,cg as oe,ch as Me,bA as X,be as ao,c0 as kt,ci as ns,P as Pp,X as XI,b as Op,U as w,bp as kp,cj as mp,c1 as ur$1,ck as fy,aR as Zd}from'./main-ZMINNQ5K.js';import {J,S,U,n as nt$1,Z,r as rt,o as ot,a as at}from'./chunk-NePiXhQX.js';import {Y as Yt,m as mt}from'./chunk-RQJ8UKUO.js';import {Q as Qt}from'./chunk-Cu-iW8om.js';import {y as yt,w as wt}from'./chunk-Dic8pAIj.js';import {c as ba$1,h as ha,f as fe,j as jn,d as de,A as Ar,F as Fr,K as Ko,a as an,Z as Zo,N as Ni$1,U as Ui$1,e as yo,u as ue,k as vt$1,Y as Yt$2,s as st,l as Un}from'./chunk-CjoYLWvU.js';function Xa(a,i){a&1&&up(0,"div",2);}var Qa=new N("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var ba=(()=>{class a{_elementRef=D(mr$1);_ngZone=D(Se);_changeDetectorRef=D(QL);_renderer=D(jv);_cleanupTransitionEnd;constructor(){let e=ts(),t=D(Qa,{optional:true});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),t&&(t.color&&(this.color=this._defaultColor=t.color),this.mode=t.mode||this.mode);}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=fa(e||0),this._changeDetectorRef.markForCheck();}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=fa(e||0),this._changeDetectorRef.markForCheck();}_bufferValue=0;animationEnd=new $e$2;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck();}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler);});}ngOnDestroy(){this._cleanupTransitionEnd?.();}_getPrimaryBarTransform(){return `scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return `${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}));};static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(t,n){t&2&&(ap("aria-valuenow",n._isIndeterminate()?null:n.value)("mode",n.mode),FI("mat-"+n.color),Cp("_mat-animation-noopable",n._isNoopAnimation)("mdc-linear-progress--animation-ready",!n._isNoopAnimation)("mdc-linear-progress--indeterminate",n._isIndeterminate()));},inputs:{color:"color",value:[2,"value","value",KL],bufferValue:[2,"bufferValue","bufferValue",KL],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(t,n){t&1&&(Tc(0,"div",0),up(1,"div",1),iI(2,Xa,1,0,"div",2),bc(),Tc(3,"div",3),up(4,"span",4),bc(),Tc(5,"div",5),up(6,"span",4),bc()),t&2&&(ky(),bp("flex-basis",n._getBufferBarFlexBasis()),ky(),sI(n.mode==="buffer"?2:-1),ky(),bp("transform",n._getPrimaryBarTransform()));},styles:[`.mat-mdc-progress-bar {
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
`],encapsulation:2})}return a})();function fa(a,i=0,e=100){return Math.max(i,Math.min(e,a))}var va=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl$1({imports:[qr]})}return a})();var Za=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Ja=["mat-icon, [matMenuItemIcon]","*"];function ei(a,i){a&1&&(lu(),ii$1(0,"svg",2),lp(1,"polygon",3),wc());}var ti=["*"];function ni(a,i){if(a&1){let e=mI();Tc(0,"div",0),mp("click",function(){Yl(e);let n=vI();return Kl(n.closed.emit("click"))})("animationstart",function(n){Yl(e);let r=vI();return Kl(r._onAnimationStart(n.animationName))})("animationend",function(n){Yl(e);let r=vI();return Kl(r._onAnimationDone(n.animationName))})("animationcancel",function(n){Yl(e);let r=vI();return Kl(r._onAnimationDone(n.animationName))}),Tc(1,"div",1),DI(2),bc()();}if(a&2){let e=vI();FI(e._classList),Cp("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),pp("id",e.panelId),ap("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null);}}var _n=new N("MAT_MENU_PANEL"),Je=(()=>{class a{_elementRef=D(mr$1);_document=D(tr$1);_focusMonitor=D(Ir);_parentMenu=D(_n,{optional:true});_changeDetectorRef=D(QL);role="menuitem";disabled=false;disableRipple=false;_hovered=new te;_focused=new te;_highlighted=false;_triggersSubmenu=false;constructor(){D(q).load(sh),this._parentMenu?.addItem?.(this);}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this);}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,false);}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete();}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation());}_handleMouseEnter(){this._hovered.next(this);}getLabel(){let e=this._elementRef.nativeElement.cloneNode(true),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck();}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck();}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&gp("click",function(o){return n._checkDisabled(o)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(ap("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),Cp("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu));},inputs:{role:"role",disabled:[2,"disabled","disabled",YL],disableRipple:[2,"disableRipple","disableRipple",YL]},exportAs:["matMenuItem"],ngContentSelectors:Ja,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(II(Za),DI(0),ii$1(1,"span",0),DI(2,1),wc(),lp(3,"div",1),iI(4,ei,2,0,":svg:svg",2)),t&2&&(ky(3),cp("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),ky(),sI(n._triggersSubmenu?4:-1));},dependencies:[nh],encapsulation:2})}return a})();var ai=new N("MatMenuContent");var ii=new N("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:false,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),hn="_mat-menu-enter",Lt="_mat-menu-exit",je=(()=>{class a{_elementRef=D(mr$1);_changeDetectorRef=D(QL);_injector=D(me);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=ct();_allItems;_directDescendantItems=new Wo;_classList={};_panelAnimationState="void";_animationDone=new te;_isAnimating=Ft(false);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses();}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses();}templateRef;items;lazyContent;overlapTrigger=false;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let t=this._previousPanelClass,n=B({},this._classList);t&&t.length&&t.split(" ").forEach(r=>{n[r]=false;}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(r=>{n[r]=true;}),this._elementRef.nativeElement.className=""),this._classList=n;}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e;}closed=new $e$2;close=this.closed;panelId=D(nn).getId("mat-menu-panel-");constructor(){let e=D(ii);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop;}ngOnInit(){this.setPositionClasses();}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new en(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Qh(this._directDescendantItems),Zh(e=>Rh(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),r=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[r]&&!n[r].disabled?t.setActiveItem(r):t.setNextItemActive();}});}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout);}_hovered(){return this._directDescendantItems.changes.pipe(Qh(this._directDescendantItems),Zh(t=>Rh(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Hr(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Ly(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus();}},{injector:this._injector});}resetActiveItem(){this._keyManager.setActiveItem(-1);}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=$(B({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck();}_onAnimationDone(e){let t=e===Lt;(t||e===hn)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(false));}_onAnimationStart(e){(e===hn||e===Lt)&&this._isAnimating.set(true);}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0);}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Lt),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?hn:Lt);}),this._changeDetectorRef.markForCheck();}_updateDirectDescendants(){this._allItems.changes.pipe(Qh(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges();});}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-menu"]],contentQueries:function(t,n,r){if(t&1&&vp(r,ai,5)(r,Je,5)(r,Je,4),t&2){let o;TI(o=bI())&&(n.lazyContent=o.first),TI(o=bI())&&(n._allItems=o),TI(o=bI())&&(n.items=o);}},viewQuery:function(t,n){if(t&1&&Ep(ur$1,5),t&2){let r;TI(r=bI())&&(n.templateRef=r.first);}},hostVars:3,hostBindings:function(t,n){t&2&&ap("aria-label",null)("aria-labelledby",null)("aria-describedby",null);},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",YL],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:YL(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[iD([{provide:_n,useExisting:a}])],ngContentSelectors:ti,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(II(),np(0,ni,3,12,"ng-template"));},styles:[`mat-menu {
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
`],encapsulation:2})}return a})(),ri=new N("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let a=D(me);return ()=>kt(a)}});var He=new WeakMap,oi=(()=>{class a{_canHaveBackdrop;_element=D(mr$1);_viewContainerRef=D(Ii$1);_menuItemInstance=D(Je,{optional:true,self:true});_dir=D(Is,{optional:true});_focusMonitor=D(Ir);_ngZone=D(Se);_injector=D(me);_scrollStrategy=D(ri);_changeDetectorRef=D(QL);_animationsDisabled=ct();_portal;_overlayRef=null;_menuOpen=false;_closingActionsSubscription=U$1.EMPTY;_menuCloseSubscription=U$1.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t);})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()));}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=D(_n,{optional:true});this._parentMaterialMenu=t instanceof je?t:void 0;}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&He.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null);}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return !!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit();}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=He.get(t);He.set(t,this),n&&n!==this&&n._closeMenu();let r=this._createOverlay(t),o=r.getConfig(),C=o.positionStrategy;this._setPosition(t,C),this._canHaveBackdrop?o.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:o.hasBackdrop=t.hasBackdrop??false,r.hasAttached()||(r.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(true),t instanceof je&&(t._setIsOpen(true),t._directDescendantItems.changes.pipe(Yh(t.close)).subscribe(()=>{C.withLockedPosition(false).reapplyLastPosition(),C.withLockedPosition(true);}));}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t);}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof je&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(tn(1)).subscribe(()=>{t.detach(),He.has(n)||n.lazyContent?.detach();}),n._setIsOpen(false)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&He.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(false));}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck());}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=Pt(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof je&&this._menu._handleKeydown(n);});}return this._overlayRef}_getOverlayConfig(e){return new j({positionStrategy:xt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let r=n.connectionPair.overlayX==="start"?"after":"before",o=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(r,o);});});}_setPosition(e,t){let[n,r]=e.xPosition==="before"?["end","start"]:["start","end"],[o,C]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[X,B]=[o,C],[pe,qe]=[n,r],We=0;if(this._triggersSubmenu()){if(qe=n=e.xPosition==="before"?"start":"end",r=pe=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let Pn=this._parentMaterialMenu.items.first;this._parentInnerPadding=Pn?Pn._getHostElement().offsetTop:0;}We=o==="bottom"?this._parentInnerPadding:-this._parentInnerPadding;}}else e.overlapTrigger||(X=o==="top"?"bottom":"top",B=C==="top"?"bottom":"top");t.withPositions([{originX:n,originY:X,overlayX:pe,overlayY:o,offsetY:We},{originX:r,originY:X,overlayX:qe,overlayY:o,offsetY:We},{originX:n,originY:B,overlayX:pe,overlayY:C,offsetY:-We},{originX:r,originY:B,overlayX:qe,overlayY:C,offsetY:-We}]);}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:vh(),r=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Qt$1(o=>this._menuOpen&&o!==this._menuItemInstance)):vh();return Rh(e,n,r,t)}_getPortal(e){return (!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new L(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return He.get(e)===this}_triggerIsAriaDisabled(){return YL(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){Xv();};static \u0275dir=VE({type:a})}return a})(),ya=(()=>{class a extends oi{_cleanupTouchstart;_hoverSubscription=U$1.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e;}get menu(){return this._menu}set menu(e){this._menu=e;}menuData;restoreFocus=true;menuOpened=new $e$2;onMenuOpen=this.menuOpened;menuClosed=new $e$2;onMenuClose=this.menuClosed;constructor(){super(true);let e=D(jv);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Pe(t)||(this._openedBy="touch");},{passive:true});}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(true);}closeMenu(){this._closeMenu();}updatePosition(){this._overlayRef?.updatePosition();}ngAfterContentInit(){this._handleHover();}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe();}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Le(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault());}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu());}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu();}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(false));}));}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&gp("click",function(o){return n._handleClick(o)})("mousedown",function(o){return n._handleMousedown(o)})("keydown",function(o){return n._handleKeydown(o)}),t&2&&ap("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu?.panelId:null);},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Xf]})}return a})();var Ca=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl$1({imports:[gh,ge,qr,vt]})}return a})();function gn(a){let i=(a||"").toUpperCase();return i.includes("APROBADO")||i.includes("CERRADO POR EL CLIENTE")||i.includes("CERRADO POR FALTA DE RESPUESTA")}function Da(a){return gn(a)?true:(a||"").toUpperCase().includes("NO ACEPTADA")}function mi(a,i){if(a&1){let e=mI();ii$1(0,"mat-form-field",2)(1,"mat-label"),QI(2),wc(),ii$1(3,"input",6),gp("ngModelChange",function(n){Yl(e);let r=vI();return Kl(r.word.set(n))}),wc(),Wv(),wc();}if(a&2){let e=vI();ky(2),Mc("Escribe ",e.data.requireWord," para confirmar"),ky(),cp("ngModel",e.word()),zv();}}var zt=class a{data=D($e$1);ref=D(O);word=Ft("");canConfirm=K(()=>!this.data.requireWord||this.word().trim()===this.data.requireWord);static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-confirm-dialog"]],decls:11,vars:7,consts:[["mat-dialog-title",""],[1,"msg"],["appearance","outline",1,"full"],["align","end"],["mat-button","",3,"click"],["mat-flat-button","",3,"click","color","disabled"],["matInput","","autocomplete","off",3,"ngModelChange","ngModel"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1),wc(),ii$1(2,"mat-dialog-content")(3,"p",1),QI(4),wc(),iI(5,mi,4,2,"mat-form-field",2),wc(),ii$1(6,"mat-dialog-actions",3)(7,"button",4),gp("click",function(){return t.ref.close(false)}),QI(8),wc(),ii$1(9,"button",5),gp("click",function(){return t.ref.close(true)}),QI(10),wc()()),e&2&&(ky(),Ap(t.data.title),ky(3),Ap(t.data.message),ky(),sI(t.data.requireWord?5:-1),ky(3),Ap(t.data.cancelText||"Cancelar"),ky(),cp("color",t.data.danger?"warn":"primary")("disabled",!t.canConfirm()),ky(),Mc(" ",t.data.confirmText||"Confirmar"," "));},dependencies:[Ht$1,Nt,zt$1,Vt,ba$1,ha,fe,jn,de,Ar,Fr,Ko,an,Zo,Ni$1],styles:[".msg[_ngcontent-%COMP%]{white-space:pre-line;margin:0 0 8px}.full[_ngcontent-%COMP%]{width:100%}"]})};var Mo=["todo","in_progress","review","done"],xo={todo:"To Do",in_progress:"In Progress",review:"En Certificaci\xF3n",done:"Entregado"};function ko(a){let i=(a||"").toUpperCase();return gn(i)?{status:"done",approved:true}:i.includes("ENTREGADO")?{status:"done",approved:false}:i.includes("INSTALADO")||i.includes("CERTIFICAC")?{status:"review"}:i.includes("INFO PENDIENTE")?{status:"in_progress",waiting:true}:i.includes("EN PROCESO")?{status:"in_progress"}:{status:"todo"}}var wo={alta:"Alta",media:"Media",baja:"Baja"};function Ea(a){let i=parseInt(String(a),10);return i<=1?"prio-alta":i===2?"prio-media":"prio-baja"}var Ao={in_progress:"EN PROCESO",review:"INSTALADO PARA CERTIFICACI\xD3N",done:"ENTREGADO"},So="INFO PENDIENTE CLIENTE",Ma=["#04BAF0","#27AE60","#F29E3B","#9B59B6","#E74C3C","#1ABC9C","#2980B9","#F2811D","#8E44AD","#16A085","#C0392B","#D35400"];function Ht(a){let i=0,e=String(a||"");for(let t=0;t<e.length;t++)i=i*31+e.charCodeAt(t)>>>0;return Ma[i%Ma.length]}function xa(a){let i=String(a||"").trim().split(/\s+/).filter(Boolean);return i.length?i.length===1?i[0].slice(0,2).toUpperCase():(i[0][0]+i[1][0]).toUpperCase():"?"}function Eo(a){let i=String(a||"").trim().split(/\s+/).filter(Boolean);return i.length<=2?i.join(" "):`${i[0]} ${i[2]}`}var ka="#2b2b3a",wa="#fffdf2",Aa="#9aa0a6";function Sa(a){let i=a.replace("#",""),e=i.length===3?i.split("").map(n=>n+n).join(""):i,t=parseInt(e,16);return [t>>16&255,t>>8&255,t&255]}function yn(a,i,e){let[t,n,r]=Sa(a),[o,C,X]=Sa(i),B=(pe,qe)=>Math.round(pe*e+qe*(1-e));return `rgb(${B(t,o)}, ${B(n,C)}, ${B(r,X)})`}function To(a){return yn(a,"#ffffff",.3)}function Po(a){if(!a)return {bg:yn(Aa,wa,.14),accent:Aa,ink:ka};let i=a.color||Ht(a.id||"");return {bg:yn(i,wa,.14),accent:i,ink:ka}}function Oo(a){let i=0,e=String(a||"");for(let t=0;t<e.length;t++)i=i*31+e.charCodeAt(t)>>>0;return `${(i%9-4)*.5}deg`}function Io(a,i,e=[]){if(!a)return null;let t=i.find(r=>r.id===a);if(t){let r=t.name||"\u2014";return {id:t.id,name:r,color:t.color||Ht(t.id),label:xa(r),role:t.role||""}}let n=e.find(r=>r.id===a);return n?{id:a,name:n.name,color:Ht(a),label:xa(n.name),role:n.role||""}:{id:a,name:"\u2014",color:Ht(a),label:"\u2014",role:""}}function Vo(a){return a===0?"#E0E0E0":a<=25?"#F29E3B":a<=50?"#F2811D":a<=75?"#04BAF0":"#27AE60"}function Fo(a){let i=Math.min(100,Math.max(0,Math.floor(a)||0));return i%5===0?i:Math.min(100,i+(5-i%5))}function Ro(a,i){if(!a)return {str:"",overdue:false,soon:false,diffDays:null,badge:""};let e=new Date(a+"T00:00:00"),t=new Date;t.setHours(0,0,0,0);let n=Math.ceil((e.getTime()-t.getTime())/864e5),r=i!=="done",o=r&&e<t,C=r&&!o&&n<=3,X=e.toLocaleDateString("es-ES",{day:"2-digit",month:"short"}),B="";return C&&(B=n===0?"hoy":n===1?"ma\xF1ana":`${n}d`),{str:X,overdue:o,soon:C,diffDays:n,badge:B}}async function Bo(a,i){let e=i.auth.session(),t=String(e?.id||"").trim().toUpperCase(),n=t==="MSC001";if(!n&&a.assignee&&t!==String(a.assignee).trim().toUpperCase())return i.snack.open("Solo el t\xE9cnico asignado puede iniciar esta tarea.","OK",{duration:4e3}),false;let r=a.assignee;if(!r){if(n)return i.snack.open("Esta tarea no tiene t\xE9cnico asignado. Asigna un t\xE9cnico antes de iniciarla.","OK",{duration:4e3}),false;r=e?.id??null;}return await ih(i.dialog.open(zt,{data:{title:"Iniciar tarea",message:`\xBFDeseas iniciar a trabajar en "${a.title}"?`,confirmText:"Iniciar"}}).afterClosed())?(!a.assignee&&r&&i.data.updateStoryAssignee(a.id,r),true):false}function jt(a){let i=(a||"").toUpperCase();return i.includes("APROBADO")?{headerBg:"#DDEFD9",badgeBg:"#97C98A",badgeText:"#1B5E20"}:i.includes("CERRADO")?{headerBg:"#F1EFE8",badgeBg:"#D3D1C7",badgeText:"#444441"}:i.includes("ENTREGADO")?{headerBg:"#DDF3F1",badgeBg:"#9FE0D8",badgeText:"#0C5046"}:i.includes("INSTALADO")||i.includes("CERTIFICAC")?{headerBg:"#E3EFFB",badgeBg:"#B5D4F4",badgeText:"#0C447C"}:i.includes("INFO PENDIENTE")?{headerBg:"#FAEEDA",badgeBg:"#FAC775",badgeText:"#633806"}:i.includes("EN PROCESO")?{headerBg:"#EEEDFE",badgeBg:"#CECBF6",badgeText:"#3C3489"}:i.includes("ABIERTO")?{headerBg:"#EAF3DE",badgeBg:"#C0DD97",badgeText:"#27500A"}:{headerBg:"#ECEFF3",badgeBg:"#CFD6DE",badgeText:"#3A4350"}}function Lo(a){let i=(a||"").toUpperCase();return i.includes("INCIDENCIA")?{badgeBg:"#F7C1C1",badgeText:"#791F1F"}:i.includes("REQUERIMIENTO")?{badgeBg:"#C0DD97",badgeText:"#27500A"}:i.includes("CONSULTA")?{badgeBg:"#CECBF6",badgeText:"#3C3489"}:{badgeBg:"#D7DBE0",badgeText:"#3A4350"}}function Ta(a){if(!a)return "";let i=new Date(a);return isNaN(i.getTime())?"":i.toLocaleDateString("es-ES",{day:"numeric",month:"short",year:"numeric"})}function Pa(a){if(!a)return "";let i=new Date(a);if(isNaN(i.getTime()))return "";let e=i.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit",hour12:false}),t=new Date;return i.getFullYear()===t.getFullYear()&&i.getMonth()===t.getMonth()&&i.getDate()===t.getDate()?`Hoy ${e}`:`${i.toLocaleDateString("es-ES",{day:"numeric",month:"short"})} ${e}`}var pi=(a,i)=>i.id;function ui(a,i){if(a&1&&(ii$1(0,"div",2),QI(1," Estado: "),ii$1(2,"span",11),QI(3),wc()()),a&2){let e=vI();ky(2),bp("background",e.estadoStyle(e.ticket.estatus).badgeBg)("color",e.estadoStyle(e.ticket.estatus).badgeText),ky(),Ap(e.ticket.estatus);}}function hi(a,i){if(a&1&&(ii$1(0,"span",15),QI(1),wc()),a&2){let e=vI().$implicit;ky(),Ap(e.role);}}function _i(a,i){a&1&&lp(0,"mat-spinner",16);}function gi(a,i){a&1&&(ii$1(0,"mat-icon",17),QI(1,"check"),wc());}function fi(a,i){if(a&1){let e=mI();ii$1(0,"button",12),gp("click",function(){let n=Yl(e).$implicit,r=vI();return Kl(r.asignar(n))}),ii$1(1,"span",13)(2,"span",14),QI(3),wc(),iI(4,hi,2,1,"span",15),wc(),iI(5,_i,1,0,"mat-spinner",16)(6,gi,2,0,"mat-icon",17),wc();}if(a&2){let e=i.$implicit,t=vI();Cp("current",e.id===t.ticket.usuarioAsignado),cp("disabled",!!t.busy())("matTooltip",e.name+" \xB7 "+e.id),ky(3),Ap(e.name),ky(),sI(e.role?4:-1),ky(),sI(t.busy()===e.id?5:e.id===t.ticket.usuarioAsignado?6:-1);}}function bi(a,i){a&1&&(ii$1(0,"div",8),QI(1,"Sin coincidencias"),wc());}var Ut=class a{hd=D(J);snack=D(Qt);ref=D(O);data=D($e$1);ticket=this.data.ticket;estadoStyle=jt;empleados=Ft(this.hd.hdUsers());filtro=Ft("");busy=Ft(null);filtrados=K(()=>{let i=this.filtro().toLowerCase().trim(),e=this.empleados();return i?e.filter(t=>t.name.toLowerCase().includes(i)||t.id.toLowerCase().includes(i)):e});constructor(){this.hd.getHdUsers().then(i=>this.empleados.set(i));}async asignar(i){if(this.busy())return;this.busy.set(i.id);let e=await this.hd.assignTicket(this.ticket.ticket,i.id);this.busy.set(null),e?(this.snack.open(`Ticket #${this.ticket.ticket} asignado a ${i.name}`,"OK",{duration:3e3}),this.ref.close(true)):this.snack.open("No se pudo asignar el ticket en el Helpdesk.","OK",{duration:4e3});}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-assign-ticket-dialog"]],decls:21,vars:5,consts:[["mat-dialog-title",""],[1,"assign-body"],[1,"actual"],["appearance","outline",1,"search"],["matInput","","placeholder","Nombre\u2026","autocomplete","off",3,"ngModelChange","ngModel"],["matSuffix",""],[1,"emp-list"],[1,"emp",3,"current","disabled","matTooltip"],[1,"empty"],["align","end"],["mat-button","","mat-dialog-close",""],[1,"estado-badge"],[1,"emp",3,"click","disabled","matTooltip"],[1,"emp-main"],[1,"emp-name"],[1,"emp-role"],["diameter","18"],[1,"check"]],template:function(e,t){e&1&&(ii$1(0,"h2",0),QI(1),wc(),ii$1(2,"mat-dialog-content",1),iI(3,ui,4,5,"div",2),ii$1(4,"div",2),QI(5," Asignado actual: "),ii$1(6,"strong"),QI(7),wc()(),ii$1(8,"mat-form-field",3)(9,"mat-label"),QI(10,"Buscar consultor"),wc(),ii$1(11,"input",4),gp("ngModelChange",function(r){return t.filtro.set(r)}),wc(),Wv(),ii$1(12,"mat-icon",5),QI(13,"search"),wc()(),ii$1(14,"div",6),lI(15,fi,7,7,"button",7,pi,false,bi,2,0,"div",8),wc()(),ii$1(18,"mat-dialog-actions",9)(19,"button",10),QI(20,"Cerrar"),wc()()),e&2&&(ky(),Mc("Asignar ticket #",t.ticket.ticket),ky(2),sI(t.ticket.estatus?3:-1),ky(4),Ap(t.ticket.nombreAsignado||"\u2014 Sin asignar \u2014"),ky(4),cp("ngModel",t.filtro()),zv(),ky(4),uI(t.filtrados()));},dependencies:[Ko,an,Zo,Ni$1,Ht$1,jt$1,Nt,zt$1,Vt,ba$1,ha,yt,wt,fe,jn,de,yo,Ar,Fr,J$1,Z$1,Yt,mt],styles:[".assign-body[_ngcontent-%COMP%]{min-width:380px;display:flex;flex-direction:column}.actual[_ngcontent-%COMP%]{font-size:13px;color:var(--mat-sys-on-surface-variant);margin-bottom:10px}.search[_ngcontent-%COMP%]{width:100%}.emp-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px;max-height:46vh;overflow-y:auto}.emp[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1px solid var(--mat-sys-outline-variant);background:var(--mat-sys-surface);border-radius:8px;padding:8px 10px;cursor:pointer;font:inherit}.emp[_ngcontent-%COMP%]:hover:not([disabled]){border-color:var(--mat-sys-primary);background:var(--mat-sys-surface-container-low)}.emp[disabled][_ngcontent-%COMP%]{cursor:default;opacity:.7}.emp.current[_ngcontent-%COMP%]{border-color:var(--mat-sys-primary);background:color-mix(in srgb,var(--mat-sys-primary) 8%,transparent)}.emp[_ngcontent-%COMP%]   .emp-main[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1;min-width:0}.emp[_ngcontent-%COMP%]   .emp-name[_ngcontent-%COMP%]{font-weight:600;font-size:13px;color:var(--mat-sys-on-surface)}.emp[_ngcontent-%COMP%]   .emp-role[_ngcontent-%COMP%]{font-size:11px;color:var(--mat-sys-on-surface-variant)}.emp[_ngcontent-%COMP%]   .emp-id[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:11px;color:var(--mat-sys-on-surface-variant)}.emp[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%]{color:var(--mat-sys-primary)}.empty[_ngcontent-%COMP%]{padding:18px;text-align:center;color:var(--mat-sys-on-surface-variant);font-size:13px}.estado-badge[_ngcontent-%COMP%]{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:700}"]})};var vi=["editor"],Kt=class a{ref=D(O);data=D($e$1);titulo=this.data.titulo||"Redactar respuesta";editor=WL.required("editor");constructor(){Ly(()=>{let i=this.editor().nativeElement;i.innerHTML=this.data.html||"",i.focus();let e=window.getSelection();if(e){let t=document.createRange();t.selectNodeContents(i),t.collapse(false),e.removeAllRanges(),e.addRange(t);}});}format(i){this.editor().nativeElement.focus(),document.execCommand(i,false);}codeBlock(){rt(this.editor().nativeElement);}onPaste(i){let e=i.clipboardData;if(!e)return;i.preventDefault();let t=ot(e.getData("text/html"),e.getData("text/plain"));document.execCommand("insertHTML",false,t);}done(){let i=this.editor().nativeElement;this.ref.close(i.textContent?.trim()||i.querySelector("img")?i.innerHTML:"");}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-compose-dialog"]],viewQuery:function(e,t){e&1&&Dp(t.editor,vi,5),e&2&&CI();},decls:28,vars:1,consts:[["editor",""],["mat-dialog-title","",1,"compose-head"],[1,"spacer"],["mat-icon-button","","mat-dialog-close","","aria-label","Cerrar"],[1,"compose-toolbar"],["mat-icon-button","","type","button","matTooltip","Negrita",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Cursiva",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Subrayado",3,"mousedown","click"],["mat-icon-button","","type","button","matTooltip","Bloque de c\xF3digo",3,"mousedown","click"],[1,"compose-content"],["contenteditable","true","role","textbox","aria-multiline","true","aria-label","Mensaje",1,"compose-editor",3,"paste"],["mat-dialog-actions","","align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"]],template:function(e,t){e&1&&(ii$1(0,"div",1)(1,"span"),QI(2),wc(),lp(3,"span",2),ii$1(4,"button",3)(5,"mat-icon"),QI(6,"close"),wc()()(),ii$1(7,"div",4)(8,"button",5),gp("mousedown",function(r){return r.preventDefault()})("click",function(){return t.format("bold")}),ii$1(9,"mat-icon"),QI(10,"format_bold"),wc()(),ii$1(11,"button",6),gp("mousedown",function(r){return r.preventDefault()})("click",function(){return t.format("italic")}),ii$1(12,"mat-icon"),QI(13,"format_italic"),wc()(),ii$1(14,"button",7),gp("mousedown",function(r){return r.preventDefault()})("click",function(){return t.format("underline")}),ii$1(15,"mat-icon"),QI(16,"format_underlined"),wc()(),ii$1(17,"button",8),gp("mousedown",function(r){return r.preventDefault()})("click",function(){return t.codeBlock()}),ii$1(18,"mat-icon"),QI(19,"code"),wc()()(),ii$1(20,"mat-dialog-content",9)(21,"div",10,0),gp("paste",function(r){return t.onPaste(r)}),wc()(),ii$1(23,"div",11)(24,"button",12),QI(25,"Cancelar"),wc(),ii$1(26,"button",13),gp("click",function(){return t.done()}),QI(27,"Listo"),wc()()),e&2&&(ky(2),Ap(t.titulo));},dependencies:[Ht$1,jt$1,Nt,zt$1,Vt,ba$1,ha,Ui$1,yt,wt,Yt,mt],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:flex;flex-direction:column;max-height:90vh;overflow:hidden}.compose-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin:0;font-size:16px;font-weight:600;flex:0 0 auto}.compose-head[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.compose-toolbar[_ngcontent-%COMP%]{display:flex;gap:4px;padding:0 24px 6px;border-bottom:1px solid var(--mat-sys-outline-variant);flex:0 0 auto}.compose-content[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;display:flex;padding-top:12px}.compose-editor[_ngcontent-%COMP%]{flex:1 1 auto;min-height:160px;overflow-y:auto;box-sizing:border-box;border:1px solid var(--mat-sys-outline);border-radius:8px;padding:12px 14px;font:inherit;font-size:14px;line-height:1.5;outline:none;overflow-wrap:anywhere;white-space:pre-wrap}.compose-editor[_ngcontent-%COMP%]:focus{border-color:var(--mat-sys-primary, #048abf);box-shadow:0 0 0 2px #048abf26}.compose-editor[_ngcontent-%COMP%]:empty:before{content:"Escribe tu respuesta\\2026";color:var(--mat-sys-on-surface-variant)}.compose-editor[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px;white-space:pre-wrap}.compose-editor[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.compose-editor[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.compose-editor[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}[mat-dialog-actions][_ngcontent-%COMP%]{flex:0 0 auto}']})};var yi=["composerInput"],Ci=(a,i)=>i.id;function Di(a,i){if(a&1&&(ii$1(0,"span",10),QI(1),wc()),a&2){let e=vI();ky(),Ap(e.header().cliente);}}function Mi(a,i){if(a&1&&(ii$1(0,"span",11),QI(1),wc()),a&2){let e=vI();ky(),Ap(e.header().tipo);}}function xi(a,i){if(a&1&&(ii$1(0,"span",26),QI(1),wc()),a&2){let e=vI();FI(e.prioClase(e.header().orden)),ky(),Mc("#",e.header().orden);}}function ki(a,i){if(a&1){let e=mI();ii$1(0,"button",27),gp("click",function(){let n=Yl(e).$implicit,r=vI();return Kl(r.changeStatus(n))}),QI(1),wc();}if(a&2){let e=i.$implicit,t=vI();cp("disabled",e===t.header().estatus),ky(),Ap(e);}}function wi(a,i){a&1&&(ii$1(0,"button",16),QI(1,"Cat\xE1logo no disponible"),wc());}function Ai(a,i){if(a&1&&(ii$1(0,"span",28)(1,"mat-icon"),QI(2,"event"),wc(),QI(3),wc()),a&2){let e=vI(2);ky(3),Ap(e.header().fecha);}}function Si(a,i){if(a&1&&(ii$1(0,"span",29)(1,"mat-icon"),QI(2,"update"),wc(),QI(3),wc()),a&2){let e=vI(2);ky(3),Ap(e.header().fechaMod);}}function Ei(a,i){if(a&1&&(ii$1(0,"span",30)(1,"mat-icon"),QI(2,"person"),wc(),QI(3),wc()),a&2){let e=vI(2);ky(3),Ap(e.header().creador);}}function Ti(a,i){if(a&1&&(ii$1(0,"div",17),iI(1,Ai,4,1,"span",28),iI(2,Si,4,1,"span",29),iI(3,Ei,4,1,"span",30),wc()),a&2){let e=vI();ky(),sI(e.header().fecha?1:-1),ky(),sI(e.header().fechaMod?2:-1),ky(),sI(e.header().creador?3:-1);}}function Pi(a,i){if(a&1){let e=mI();ii$1(0,"button",33),gp("click",function(){let n=Yl(e),r=n.$implicit,o=n.$index,C=vI(2);return Kl(C.openAttachment(r,"adjunto-general_"+C.ticketId+(C.ticketAttachments().length>1?"_"+(o+1):"")))}),ii$1(1,"mat-icon"),QI(2,"attach_file"),wc(),QI(3),wc();}if(a&2){let e=i.$index,t=vI(2);ky(3),Mc(" Descargar",t.ticketAttachments().length>1?" "+(e+1):""," ");}}function Oi(a,i){if(a&1&&(ii$1(0,"div",21)(1,"span",31),QI(2,"Adjunto del ticket:"),wc(),lI(3,Pi,4,1,"button",32,cI),wc()),a&2){let e=vI();ky(3),uI(e.ticketAttachments());}}function Ii(a,i){if(a&1){let e=mI();ii$1(0,"div",23)(1,"mat-icon"),QI(2,"lock"),wc(),ii$1(3,"p"),QI(4,"Tu sesi\xF3n expir\xF3. Inicia sesi\xF3n nuevamente para ver la conversaci\xF3n del ticket."),wc(),ii$1(5,"button",34),gp("click",function(){Yl(e);let n=vI();return Kl(n.goToLogin())}),QI(6,"Iniciar sesi\xF3n"),wc()();}}function Vi(a,i){a&1&&(lp(0,"mat-progress-bar",35),ii$1(1,"div",36),QI(2,"Cargando mensajes y adjuntos\u2026"),wc());}function Fi(a,i){a&1&&(ii$1(0,"div",24),QI(1,"Sin mensajes registrados."),wc());}function Ri(a,i){if(a&1){let e=mI();ii$1(0,"div",37)(1,"button",39),gp("click",function(){Yl(e);let n=vI(2);return Kl(n.loadOlder())}),ii$1(2,"mat-icon"),QI(3,"expand_less"),wc(),QI(4," Ver mensajes anteriores "),wc()();}if(a&2){let e=vI(2);ky(),cp("disabled",e.loadingOlder());}}function Bi(a,i){if(a&1){let e=mI();ii$1(0,"button",47),gp("click",function(){Yl(e);let n=vI().$implicit,r=vI(2);return Kl(r.startEdit(n))}),ii$1(1,"mat-icon"),QI(2,"edit"),wc()();}if(a&2){let e=vI(3);cp("disabled",e.sending());}}function Ni(a,i){if(a&1&&lp(0,"div",45),a&2){let e=vI().$implicit;cp("innerHTML",e.html,fy);}}function Li(a,i){if(a&1){let e=mI();ii$1(0,"button",49),gp("click",function(){let n=Yl(e).$implicit,r=vI(4);return Kl(r.openAttachment(n.id,n.nombre))}),ii$1(1,"mat-icon"),QI(2,"attach_file"),wc(),QI(3),wc();}if(a&2){let e=i.$implicit;ky(3),Mc(" ",e.nombre," ");}}function Yi(a,i){if(a&1&&(ii$1(0,"div",46),lI(1,Li,4,1,"button",48,Ci),wc()),a&2){let e=vI().$implicit;ky(),uI(e.adjuntos);}}function zi(a,i){if(a&1&&(ii$1(0,"div",40)(1,"div",41)(2,"span",42),QI(3),wc(),ii$1(4,"span",43),QI(5),wc(),iI(6,Bi,3,1,"button",44),wc(),iI(7,Ni,1,1,"div",45),iI(8,Yi,3,0,"div",46),wc()),a&2){let e=i.$implicit;FI("conv-"+e.tipo),ky(3),Ap(e.autor),ky(2),Ap(e.fecha),ky(),sI(e.canEdit&&e.id?6:-1),ky(),sI(e.html?7:-1),ky(),sI(e.adjuntos.length?8:-1);}}function Hi(a,i){if(a&1&&(iI(0,Ri,5,1,"div",37),lI(1,zi,9,7,"div",38,aI)),a&2){let e=vI();sI(e.hasOlder()?0:-1),ky(),uI(e.messages());}}function ji(a,i){a&1&&(ii$1(0,"div",50)(1,"mat-icon"),QI(2,"lock"),wc(),ii$1(3,"span"),QI(4,"Ticket cerrado \u2014 solo lectura. No se puede responder."),wc()());}function Ui(a,i){if(a&1){let e=mI();ii$1(0,"div",54)(1,"mat-icon"),QI(2,"edit"),wc(),ii$1(3,"span"),QI(4,"Editando tu mensaje"),wc(),lp(5,"span",4),ii$1(6,"button",66),gp("click",function(){Yl(e);let n=vI(3);return Kl(n.cancelEdit())}),QI(7,"Cancelar"),wc()();}if(a&2){let e=vI(3);ky(6),cp("disabled",e.sending());}}function Ki(a,i){a&1&&lp(0,"img",72),a&2&&cp("src",i,Zd);}function $i(a,i){a&1&&(ii$1(0,"mat-icon"),QI(1,"insert_drive_file"),wc());}function qi(a,i){if(a&1){let e=mI();ii$1(0,"span",71),iI(1,Ki,1,1,"img",72)(2,$i,2,0,"mat-icon"),ii$1(3,"span",73),QI(4),wc(),ii$1(5,"button",74),gp("click",function(){let n=Yl(e).$implicit,r=vI(5);return Kl(r.removeFile(n))}),QI(6,"\u2715"),wc()();}if(a&2){let e,t=i.$implicit,n=vI(5);Cp("has-thumb",n.previewUrl(t)),ky(),sI((e=n.previewUrl(t))?1:2,e),ky(3),Ap(t.name),ky(),cp("disabled",n.sending());}}function Wi(a,i){if(a&1&&(ii$1(0,"div",69),lI(1,qi,7,5,"span",70,aI),wc()),a&2){let e=vI(4);ky(),uI(e.composerFiles);}}function Xi(a,i){if(a&1){let e=mI();ii$1(0,"label",67)(1,"mat-icon"),QI(2,"attach_file"),wc(),ii$1(3,"input",68),gp("change",function(n){Yl(e);let r=vI(3);return Kl(r.onFiles(n))}),wc()(),iI(4,Wi,3,0,"div",69);}if(a&2){let e=vI(3);ky(4),sI(e.composerFiles.length?4:-1);}}function Qi(a,i){if(a&1){let e=mI();ii$1(0,"div",52),gp("dragover",function(n){Yl(e);let r=vI(2);return Kl(r.onDragOver(n))})("dragleave",function(n){Yl(e);let r=vI(2);return Kl(r.onDragLeave(n))})("drop",function(n){Yl(e);let r=vI(2);return Kl(r.onDrop(n))}),ii$1(1,"div",53)(2,"mat-icon"),QI(3,"upload_file"),wc(),ii$1(4,"span"),QI(5,"Suelta los archivos para adjuntarlos"),wc()(),iI(6,Ui,8,1,"div",54),ii$1(7,"div",55)(8,"button",56),gp("mousedown",function(n){return n.preventDefault()})("click",function(){Yl(e);let n=vI(2);return Kl(n.format("bold"))}),ii$1(9,"mat-icon"),QI(10,"format_bold"),wc()(),ii$1(11,"button",57),gp("mousedown",function(n){return n.preventDefault()})("click",function(){Yl(e);let n=vI(2);return Kl(n.format("italic"))}),ii$1(12,"mat-icon"),QI(13,"format_italic"),wc()(),ii$1(14,"button",58),gp("mousedown",function(n){return n.preventDefault()})("click",function(){Yl(e);let n=vI(2);return Kl(n.format("underline"))}),ii$1(15,"mat-icon"),QI(16,"format_underlined"),wc()(),ii$1(17,"button",59),gp("mousedown",function(n){return n.preventDefault()})("click",function(){Yl(e);let n=vI(2);return Kl(n.codeBlock())}),ii$1(18,"mat-icon"),QI(19,"code"),wc()(),ii$1(20,"button",60),gp("mousedown",function(n){return n.preventDefault()})("click",function(){Yl(e);let n=vI(2);return Kl(n.removeFormat())}),ii$1(21,"mat-icon"),QI(22,"format_clear"),wc()(),lp(23,"span",4),ii$1(24,"button",61),gp("click",function(){Yl(e);let n=vI(2);return Kl(n.openComposer())}),ii$1(25,"mat-icon"),QI(26,"open_in_full"),wc()()(),ii$1(27,"div",62,1),gp("paste",function(n){Yl(e);let r=vI(2);return Kl(r.onPaste(n))}),wc(),ii$1(29,"div",63),iI(30,Xi,5,1),lp(31,"span",4),ii$1(32,"span",64),QI(33),wc(),ii$1(34,"button",65),gp("click",function(){Yl(e);let n=vI(2);return Kl(n.send())}),QI(35),wc()()();}if(a&2){let e=vI(2);Cp("drag-over",e.dragOver()),ky(6),sI(e.editingId()?6:-1),ky(2),cp("disabled",e.sending()),ky(3),cp("disabled",e.sending()),ky(3),cp("disabled",e.sending()),ky(3),cp("disabled",e.sending()),ky(3),cp("disabled",e.sending()),ky(4),cp("disabled",e.sending()),ky(3),ap("contenteditable",e.sending()?"false":"true"),ky(3),sI(e.editingId()?-1:30),ky(3),Ap(e.sendStatus()),ky(),cp("disabled",e.sending()),ky(),Mc(" ",e.editingId()?"Guardar cambios":"Enviar"," ");}}function Gi(a,i){if(a&1&&iI(0,ji,5,0,"div",50)(1,Qi,36,14,"div",51),a&2){let e=vI();sI(e.soloLectura()?0:1);}}function Zi(a,i){if(a&1){let e=mI();ii$1(0,"div",75),gp("click",function(){Yl(e);let n=vI();return Kl(n.lightbox.set(null))}),ii$1(1,"button",76),gp("click",function(){Yl(e);let n=vI();return Kl(n.lightbox.set(null))}),QI(2,"\u2715"),wc(),lp(3,"img",77),wc();}a&2&&(ky(3),cp("src",i,Zd));}var Va=class a{hd=D(J);auth=D(Yp);router=D(ce);dialogRef=D(O);dialog=D(ee);sanitizer=D(zt$2);snack=D(Qt);data=D($e$1);ticketId=this.data.ticketId||this.data.ticket?.ticket||"";estadoStyle=jt;prioClase=Ea;ticketObj=this.data.ticket??null;header=Ft(this.headerFrom(this.data.ticket??null));headerFrom(i){return {cliente:i?.clienteRaw||"",tipo:i?.tipo||"",estatus:i?.estatus||"",asunto:i?.asunto||"",orden:i?.orden??999,fecha:i?.fechaIngreso?Ta(i.fechaIngreso):"",fechaMod:i?.fechaMod?Pa(i.fechaMod):"",creador:i?.nombreIngreso||"",asignado:i?.nombreAsignado||""}}loading=Ft(true);sessionExpired=Ft(false);statusOptions=K(()=>this.hd.statusNames().filter(i=>i.trim().toUpperCase()!=="ABIERTO"));changingStatus=Ft(false);soloLectura=K(()=>Da(this.header().estatus));puedeEstadoTerminal=K(()=>this.auth.puedeTransferir());asignando=Ft(false);messages=Ft([]);ticketAttachments=Ft([]);lightbox=Ft(null);static CHUNK=15;hasOlder=Ft(false);loadingOlder=Ft(false);sortedRaw=[];cursor=0;adjNumById=new Map;composerInput=WL.required("composerInput");composerFiles=[];sending=Ft(false);sendStatus=Ft("");editingId=Ft(null);dragOver=Ft(false);constructor(){this.load();}async load(){if(this.loading.set(true),!await this.auth.verifySession()){this.sessionExpired.set(true),this.loading.set(false);return}if(!this.ticketObj&&this.ticketId){let t=await this.hd.fetchTicketRaw(this.ticketId);t&&(this.ticketObj=S(t),this.header.set(this.headerFrom(this.ticketObj)));}let i=await this.hd.fetchMessages(this.ticketId);this.sortedRaw=[...i].sort((t,n)=>new Date(t.entry_date||0).getTime()-new Date(n.entry_date||0).getTime()),this.adjNumById=new Map;let e=0;for(let t of this.sortedRaw){let n=[];t.attach_id&&n.push(t.attach_id),Array.isArray(t.attach_ids)&&n.push(...t.attach_ids);for(let r of n){let o=String(r);r&&!this.adjNumById.has(o)&&this.adjNumById.set(o,++e);}}this.cursor=this.sortedRaw.length,this.messages.set([]),this.loading.set(false),await this.loadOlder(),this.ticketObj&&this.hd.ticketAttachmentIds(this.ticketObj).then(t=>this.ticketAttachments.set(t));}async loadOlder(){if(this.loadingOlder()||this.cursor<=0)return;this.loadingOlder.set(true);let i=Math.max(0,this.cursor-a.CHUNK),e=this.sortedRaw.slice(i,this.cursor),t=(await Promise.all(e.map(n=>this.procesar(n)))).filter(n=>!!n);this.messages.set([...t,...this.messages()]),this.cursor=i,this.hasOlder.set(this.cursor>0),this.loadingOlder.set(false);}goToLogin(){this.dialogRef.close(),this.router.navigate(["/login"]);}async changeStatus(i){if(this.changingStatus()||i===this.header().estatus)return;this.changingStatus.set(true);let e=await this.hd.setTicketStatus(this.ticketId,i);this.changingStatus.set(false),e?(this.header.update(t=>$(B({},t),{estatus:i})),this.snack.open(`Ticket #${this.ticketId} \u2192 ${i}`,"",{duration:2500})):this.snack.open(`No se pudo cambiar el estado del ticket #${this.ticketId}.`,"OK",{duration:4e3});}async cambiarAsignado(){if(this.soloLectura()||this.asignando()||!this.ticketObj)return;this.asignando.set(true);let i=await ih(this.dialog.open(Ut,{data:{ticket:this.ticketObj},width:"480px",maxWidth:"95vw",autoFocus:false}).afterClosed());if(this.asignando.set(false),!i)return;let e=await this.hd.fetchTicketRaw(this.ticketId);e&&(this.ticketObj=S(e),this.header.set(this.headerFrom(this.ticketObj)));}esEmpleado(i){let e=String(i.entry_user_role||"").trim().toUpperCase();return e?!e.includes("CLIENTE"):U.has(String(i.entry_user_id||"").trim().toUpperCase())}attachsDeMensaje(i){let e=[];i.attach_id&&e.push(i.attach_id),Array.isArray(i.attach_ids)&&e.push(...i.attach_ids);let t=new Set,n=[];return e.forEach(r=>{let o=String(r);r&&!t.has(o)&&(t.add(o),n.push(o));}),n.map(r=>({id:r,nombre:`adjunto_${this.ticketId}-${this.adjNumById.get(r)??1}`}))}async hidratarImgs(i){let e=new DOMParser().parseFromString(i,"text/html"),t=[...e.querySelectorAll("img[src]")];for(let n of t){let r=n.getAttribute("src")||"",o=/attachments\/(\d+)/.exec(r);if(o){let C=await this.hd.attachmentUrl(o[1]);C&&n.setAttribute("src",C);}}return e.body.innerHTML}async procesar(i){let e=i.system_message===true,t=nt$1(i.detail||""),n=t,r=Z(t).trim(),o=this.attachsDeMensaje(i);return !r&&!t.includes("<img")&&!o.length?null:(t.includes("<img")&&(t=await this.hidratarImgs(t)),{id:String(i.id||""),autor:e?"Sistema":i.entry_user_name||i.entry_user_id||"\u2014",tipo:e?"sys":this.esEmpleado(i)?"emp":"cli",fecha:i.entry_date?String(i.entry_date).replace("T"," ").slice(0,16):"",html:r||t.includes("<img")?this.sanitizer.bypassSecurityTrustHtml(t):null,rawHtml:n,canEdit:i.can_edit===true,adjuntos:o})}onConvClick(i){let e=i.target;if(e.tagName==="IMG"){let t=e.src;t&&this.lightbox.set(t);}}async openAttachment(i,e){let t=await this.hd.fetchAttachment(i);if(!t){this.snack.open("No se pudo abrir el adjunto.","OK",{duration:3e3});return}let n=document.createElement("a");n.href=t.url;let r=(t.filename.match(/\.[^.\s]+$/)||[""])[0];n.download=e?`${e}${e.endsWith(r)?"":r}`:t.filename||`adjunto_${this.ticketId}`,n.click(),setTimeout(()=>URL.revokeObjectURL(t.url),1e4);}onFiles(i){let e=i.target;this.revokeAllPreviews(),this.composerFiles=e.files?[...e.files]:[];}removeFile(i){this.revokePreview(i),this.composerFiles=this.composerFiles.filter(e=>e!==i);}previewUrls=new Map;previewUrl(i){if(!i.type.startsWith("image/"))return "";let e=this.previewUrls.get(i);return e||(e=URL.createObjectURL(i),this.previewUrls.set(i,e)),e}revokePreview(i){let e=this.previewUrls.get(i);e&&(URL.revokeObjectURL(e),this.previewUrls.delete(i));}revokeAllPreviews(){this.previewUrls.forEach(i=>URL.revokeObjectURL(i)),this.previewUrls.clear();}hasFiles(i){return !!i.dataTransfer&&[...i.dataTransfer.types].includes("Files")}onDragOver(i){this.sending()||!this.hasFiles(i)||(i.preventDefault(),i.dataTransfer.dropEffect="copy",this.dragOver.set(true));}onDragLeave(i){let e=i.relatedTarget;e&&i.currentTarget instanceof Node&&i.currentTarget.contains(e)||this.dragOver.set(false);}onDrop(i){if(!this.hasFiles(i)||(i.preventDefault(),this.dragOver.set(false),this.sending()))return;let e=i.dataTransfer?.files?[...i.dataTransfer.files]:[];e.length&&(this.composerFiles=[...this.composerFiles,...e]);}format(i){this.composerInput().nativeElement.focus(),document.execCommand(i,false);}codeBlock(){rt(this.composerInput().nativeElement);}removeFormat(){this.composerInput().nativeElement.focus(),document.execCommand("removeFormat",false);}onPaste(i){let e=i.clipboardData;if(!e)return;i.preventDefault();let t=ot(e.getData("text/html"),e.getData("text/plain"));document.execCommand("insertHTML",false,t);}async openComposer(){let i=this.composerInput().nativeElement,e=await ih(this.dialog.open(Kt,{data:{html:i.innerHTML},width:"720px",maxWidth:"95vw",autoFocus:false}).afterClosed());e!==void 0&&(i.innerHTML=e,i.focus());}startEdit(i){if(!i.canEdit||!i.id)return;let e=this.composerInput().nativeElement;e.innerHTML=i.rawHtml,this.editingId.set(i.id),this.sendStatus.set(""),e.focus();}cancelEdit(){this.editingId.set(null),this.composerInput().nativeElement.innerHTML="",this.sendStatus.set("");}async send(){let i=this.composerInput().nativeElement,e=at(i),t=!i.textContent?.trim()&&!i.querySelector("img"),n=this.editingId();if(n){if(t){this.sendStatus.set("El mensaje no puede quedar vac\xEDo.");return}this.sending.set(true),this.sendStatus.set("Guardando\u2026");let o=await this.hd.editMessage(this.ticketId,n,e);this.sending.set(false),o.ok?(i.innerHTML="",this.editingId.set(null),this.sendStatus.set("Guardado \u2713"),this.load()):this.sendStatus.set(o.error||"No se pudo editar el mensaje.");return}if(t&&!this.composerFiles.length){this.sendStatus.set("Escribe un mensaje o adjunta un archivo.");return}this.sending.set(true),this.sendStatus.set("Enviando...");let r=await this.hd.sendMessage(this.ticketId,e,this.composerFiles);this.sending.set(false),r?(i.innerHTML="",this.revokeAllPreviews(),this.composerFiles=[],this.sendStatus.set("Enviado \u2713"),this.load()):this.sendStatus.set("Error al enviar.");}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["app-ticket-messages-dialog"]],viewQuery:function(e,t){e&1&&Dp(t.composerInput,yi,5),e&2&&CI();},decls:42,vars:21,consts:[["estadoMenu","matMenu"],["composerInput",""],["mat-dialog-title","",1,"conv-head"],[1,"conv-head-label"],[1,"spacer"],["mat-icon-button","","mat-dialog-close","","aria-label","Cerrar"],[1,"conv-summary"],[1,"conv-ticket-no"],[1,"conv-title"],[1,"conv-chips"],[1,"chip","chip-cliente"],[1,"chip","chip-tipo"],[1,"chip","chip-estatus","chip-btn",3,"matMenuTriggerFor","disabled","matTooltip"],[1,"chip-caret"],["matTooltip","Prioridad del ticket",1,"chip","chip-prio",3,"class"],["mat-menu-item","",3,"disabled"],["mat-menu-item","","disabled",""],[1,"conv-byline"],[1,"conv-assignee"],["matTooltip","Asignado",1,"bl-item"],["mat-icon-button","","matTooltip","Cambiar asignado","aria-label","Cambiar asignado",1,"assignee-edit",3,"click","disabled"],[1,"ticket-attach"],[1,"conv-body",3,"click"],[1,"conv-expired"],[1,"conv-empty"],[1,"lightbox"],["matTooltip","Prioridad del ticket",1,"chip","chip-prio"],["mat-menu-item","",3,"click","disabled"],["matTooltip","Fecha de ingreso",1,"bl-item"],["matTooltip","\xDAltima modificaci\xF3n",1,"bl-item"],["matTooltip","Creador",1,"bl-item"],[1,"ticket-attach-label"],["mat-stroked-button",""],["mat-stroked-button","",3,"click"],["mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"],[1,"conv-loading"],[1,"conv-older"],[1,"conv-msg",3,"class"],["mat-stroked-button","",3,"click","disabled"],[1,"conv-msg"],[1,"conv-meta"],[1,"conv-user"],[1,"conv-date"],["matTooltip","Editar mensaje","aria-label","Editar mensaje",1,"conv-edit",3,"disabled"],[1,"conv-text",3,"innerHTML"],[1,"conv-attach-row"],["matTooltip","Editar mensaje","aria-label","Editar mensaje",1,"conv-edit",3,"click","disabled"],[1,"conv-attach"],[1,"conv-attach",3,"click"],[1,"composer-readonly"],[1,"composer",3,"drag-over"],[1,"composer",3,"dragover","dragleave","drop"],[1,"composer-drop-hint"],[1,"composer-editing"],[1,"composer-toolbar"],["mat-icon-button","","matTooltip","Negrita",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Cursiva",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Subrayado",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Bloque de c\xF3digo",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Quitar formato",3,"mousedown","click","disabled"],["mat-icon-button","","matTooltip","Abrir editor ampliado",3,"click","disabled"],["contenteditable","true","role","textbox","aria-multiline","true","aria-label","Escribir mensaje","data-placeholder","Escribir mensaje\u2026",1,"composer-input",3,"paste"],[1,"composer-actions"],[1,"send-status"],["mat-flat-button","","color","primary",3,"click","disabled"],["mat-button","",3,"click","disabled"],["matTooltip","Adjuntar archivo",1,"attach-label"],["type","file","multiple","","hidden","",3,"change"],[1,"files"],[1,"file-chip",3,"has-thumb"],[1,"file-chip"],["alt","",1,"file-thumb",3,"src"],[1,"file-name"],["type","button","aria-label","Quitar adjunto",1,"file-remove",3,"click","disabled"],[1,"lightbox",3,"click"],[1,"lightbox-close",3,"click"],["alt","",3,"src"]],template:function(e,t){if(e&1&&(ii$1(0,"div",2)(1,"span",3),QI(2,"TICKET"),wc(),lp(3,"span",4),ii$1(4,"button",5)(5,"mat-icon"),QI(6,"close"),wc()()(),ii$1(7,"div",6)(8,"div",7),QI(9),wc(),ii$1(10,"h2",8),QI(11),wc(),ii$1(12,"div",9),iI(13,Di,2,1,"span",10),iI(14,Mi,2,1,"span",11),ii$1(15,"button",12),QI(16),ii$1(17,"mat-icon",13),QI(18,"arrow_drop_down"),wc()(),iI(19,xi,2,3,"span",14),wc(),ii$1(20,"mat-menu",null,0),lI(22,ki,2,2,"button",15,cI,false,wi,2,0,"button",16),wc(),iI(25,Ti,4,3,"div",17),ii$1(26,"div",18)(27,"span",19)(28,"mat-icon"),QI(29,"assignment_ind"),wc(),QI(30),wc(),ii$1(31,"button",20),gp("click",function(){return t.cambiarAsignado()}),ii$1(32,"mat-icon"),QI(33,"person_add"),wc()()(),iI(34,Oi,5,0,"div",21),wc(),ii$1(35,"mat-dialog-content",22),gp("click",function(r){return t.onConvClick(r)}),iI(36,Ii,7,0,"div",23)(37,Vi,3,0)(38,Fi,2,0,"div",24)(39,Hi,3,1),wc(),iI(40,Gi,2,1),iI(41,Zi,4,1,"div",25)),e&2){let n,r=_I(21);ky(9),Ap(t.ticketId),ky(2),Ap(t.header().asunto),ky(2),sI(t.header().cliente?13:-1),ky(),sI(t.header().tipo?14:-1),ky(),bp("background",t.header().estatus?t.estadoStyle(t.header().estatus).badgeBg:null)("color",t.header().estatus?t.estadoStyle(t.header().estatus).badgeText:null),cp("matMenuTriggerFor",r)("disabled",t.changingStatus()||t.sessionExpired()||t.soloLectura()&&!t.puedeEstadoTerminal())("matTooltip",t.soloLectura()&&!t.puedeEstadoTerminal()?"Ticket cerrado \u2014 solo el responsable de equipo puede cambiar el estado":"Cambiar estado del ticket"),ky(),Mc(" ",t.header().estatus||"Sin estado"),ky(3),sI(t.header().orden&&t.header().orden!==999?19:-1),ky(3),uI(t.statusOptions()),ky(3),sI(t.header().fecha||t.header().fechaMod||t.header().creador?25:-1),ky(5),Ap(t.header().asignado||"Sin asignar"),ky(),cp("disabled",t.soloLectura()||t.asignando()||t.sessionExpired()),ky(3),sI(t.ticketAttachments().length?34:-1),ky(2),sI(t.sessionExpired()?36:t.loading()?37:t.messages().length?39:38),ky(4),sI(t.sessionExpired()?-1:40),ky(),sI((n=t.lightbox())?41:-1,n);}},dependencies:[Ht$1,jt$1,Nt,Vt,ba$1,ha,Ui$1,yt,wt,Ca,je,Je,ya,va,ba,Yt,mt],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:min(520px,88vh);max-height:88vh;overflow:hidden}.conv-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin:0;flex:0 0 auto;padding:12px 16px 0}.conv-head[_ngcontent-%COMP%]   .conv-head-label[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--mat-sys-on-surface-variant)}.conv-head[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.conv-summary[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;flex-direction:column;gap:12px;padding:4px 16px 12px;border-bottom:1px solid var(--mat-sys-outline-variant)}.conv-summary[_ngcontent-%COMP%]   .conv-ticket-no[_ngcontent-%COMP%]{font-family:JetBrains Mono,ui-monospace,monospace;font-weight:800;font-size:30px;line-height:1.05;color:var(--mat-sys-primary);white-space:nowrap;word-break:keep-all}.conv-summary[_ngcontent-%COMP%]   .conv-title[_ngcontent-%COMP%]{margin:0;font-size:17px;font-weight:600;line-height:1.3;color:var(--mat-sys-on-surface);display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.conv-chips[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.conv-chips[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]{font-size:12px;font-weight:600;padding:3px 10px;border-radius:12px;white-space:nowrap}.conv-chips[_ngcontent-%COMP%]   .chip-cliente[_ngcontent-%COMP%]{background:var(--mat-sys-surface-container-high);color:var(--mat-sys-on-surface)}.conv-chips[_ngcontent-%COMP%]   .chip-tipo[_ngcontent-%COMP%]{border:1px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}.conv-chips[_ngcontent-%COMP%]   .chip-estatus[_ngcontent-%COMP%]{font-weight:700}.conv-chips[_ngcontent-%COMP%]   .chip-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:2px;border:none;cursor:pointer;font-family:inherit;background:var(--mat-sys-surface-container-high);color:var(--mat-sys-on-surface)}.conv-chips[_ngcontent-%COMP%]   .chip-btn[_ngcontent-%COMP%]:disabled{cursor:default;opacity:.7}.conv-chips[_ngcontent-%COMP%]   .chip-btn[_ngcontent-%COMP%]   .chip-caret[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;margin-right:-4px}.conv-chips[_ngcontent-%COMP%]   .chip-prio[_ngcontent-%COMP%]{color:#fff;font-weight:800;letter-spacing:.02em}.conv-chips[_ngcontent-%COMP%]   .chip-prio.prio-alta[_ngcontent-%COMP%]{background:#e74c3c}.conv-chips[_ngcontent-%COMP%]   .chip-prio.prio-media[_ngcontent-%COMP%]{background:#f2811d}.conv-chips[_ngcontent-%COMP%]   .chip-prio.prio-baja[_ngcontent-%COMP%]{background:#2b2b3a73}.conv-byline[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:16px;font-size:12px;color:var(--mat-sys-on-surface-variant)}.conv-byline[_ngcontent-%COMP%]   .bl-item[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px}.conv-byline[_ngcontent-%COMP%]   .bl-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-assignee[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--mat-sys-on-surface-variant)}.conv-assignee[_ngcontent-%COMP%]   .bl-item[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px}.conv-assignee[_ngcontent-%COMP%]   .bl-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-assignee[_ngcontent-%COMP%]   .assignee-edit[_ngcontent-%COMP%]{width:30px;height:30px;line-height:30px}.conv-assignee[_ngcontent-%COMP%]   .assignee-edit[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.composer-readonly[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:14px 16px;border-top:1px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant);font-size:13px}.composer-readonly[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.file-chip[_ngcontent-%COMP%]   .file-thumb[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:6px;object-fit:cover;display:block}.ticket-attach[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ticket-attach[_ngcontent-%COMP%]   .ticket-attach-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--mat-sys-on-surface-variant)}.ticket-attach[_ngcontent-%COMP%]   .mat-mdc-outlined-button[_ngcontent-%COMP%]{--mdc-outlined-button-container-height: 30px;min-height:30px;line-height:30px;padding:0 12px;font-size:12px}.ticket-attach[_ngcontent-%COMP%]   .mat-mdc-outlined-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;margin-right:4px}.conv-body[_ngcontent-%COMP%]{flex:1 1 auto;min-height:0;max-height:none;background:#f4f6f9;padding:12px}.conv-loading[_ngcontent-%COMP%], .conv-empty[_ngcontent-%COMP%]{text-align:center;color:var(--mat-sys-on-surface-variant);padding:24px;font-size:13px}.conv-msg[_ngcontent-%COMP%]{max-width:80%;margin:8px 0;padding:8px 12px;border-radius:10px;font-size:13px;box-shadow:0 1px 2px #00000014}.conv-msg.conv-emp[_ngcontent-%COMP%]{margin-left:auto;background:#e3f0fb;border:1px solid #c6e0f5}.conv-msg.conv-cli[_ngcontent-%COMP%]{margin-right:auto;background:#fff;border:1px solid var(--mat-sys-outline-variant)}.conv-msg.conv-sys[_ngcontent-%COMP%]{margin:8px auto;max-width:90%;background:transparent;box-shadow:none;text-align:center;color:var(--mat-sys-on-surface-variant);font-size:12px;font-style:italic}.conv-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px}.conv-meta[_ngcontent-%COMP%]   .conv-user[_ngcontent-%COMP%]{font-weight:700;font-family:inherit}.conv-meta[_ngcontent-%COMP%]   .conv-date[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);margin-left:auto}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;border:none;background:transparent;padding:2px;border-radius:50%;cursor:pointer;color:var(--mat-sys-on-surface-variant)}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]:hover:not(:disabled){color:var(--mat-sys-primary, #048abf)}.conv-meta[_ngcontent-%COMP%]   .conv-edit[_ngcontent-%COMP%]:disabled{cursor:default;opacity:.5}.conv-text[_ngcontent-%COMP%]{line-height:1.4;overflow-wrap:anywhere;word-break:break-word;overflow-x:auto}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%], code[_ngcontent-%COMP%]){white-space:pre-wrap;overflow-wrap:anywhere;font-family:JetBrains Mono,ui-monospace,monospace}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}.conv-text[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.conv-text[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.conv-text[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}.conv-text[_ngcontent-%COMP%]   :where(li[_ngcontent-%COMP%]){margin:2px 0}.conv-text[_ngcontent-%COMP%]   :where(img[_ngcontent-%COMP%]){max-width:100%;height:auto;border-radius:6px;cursor:zoom-in;margin:4px 0;float:none!important}.conv-text[_ngcontent-%COMP%]   :where(a[_ngcontent-%COMP%]){color:var(--mat-sys-primary);word-break:break-all}.conv-text[_ngcontent-%COMP%]   :where(table[_ngcontent-%COMP%]){max-width:100%;border-collapse:collapse;font-size:12px}.conv-text[_ngcontent-%COMP%]   :where(td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]){border:1px solid var(--mat-sys-outline-variant);padding:2px 6px}.conv-text[_ngcontent-%COMP%]   :where(th[_ngcontent-%COMP%]){background:#0000000a;font-weight:700}.conv-text[_ngcontent-%COMP%]   :where(p[_ngcontent-%COMP%]){margin:4px 0}.conv-text[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){margin:8px 0 4px;line-height:1.25;font-weight:700}.conv-text[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%]){font-size:1.25em}.conv-text[_ngcontent-%COMP%]   :where(h2[_ngcontent-%COMP%]){font-size:1.15em}.conv-text[_ngcontent-%COMP%]   :where(h3[_ngcontent-%COMP%]){font-size:1.08em}.conv-text[_ngcontent-%COMP%]   :where(h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){font-size:1em}.conv-text[_ngcontent-%COMP%]   :where(blockquote[_ngcontent-%COMP%]){margin:6px 0;padding:2px 0 2px 10px;border-left:3px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}.conv-attach-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.conv-attach[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--mat-sys-outline-variant);background:var(--mat-sys-surface);border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer}.conv-attach[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px}.conv-attach[_ngcontent-%COMP%]:hover{border-color:var(--mat-sys-primary)}.composer[_ngcontent-%COMP%]{position:relative;flex:0 1 auto;display:flex;flex-direction:column;max-height:55vh;border-top:1px solid var(--mat-sys-outline-variant);padding:8px 16px 12px}.composer.drag-over[_ngcontent-%COMP%]{background:#048abf0f}.composer.drag-over[_ngcontent-%COMP%]   .composer-drop-hint[_ngcontent-%COMP%]{display:flex}.composer-drop-hint[_ngcontent-%COMP%]{display:none;position:absolute;inset:4px;z-index:2;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:2px dashed var(--mat-sys-primary, #048abf);border-radius:14px;background:#f4f6f9eb;color:var(--mat-sys-primary, #048abf);font-size:13px;font-weight:600;pointer-events:none}.composer-drop-hint[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:28px;width:28px;height:28px}.composer-editing[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:4px 10px;border-radius:10px;background:#048abf14;color:var(--mat-sys-primary, #048abf);font-size:12px;font-weight:600}.composer-editing[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.composer-editing[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-toolbar[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:2px}.composer-toolbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-input[_ngcontent-%COMP%]{flex:0 1 auto;width:100%;box-sizing:border-box;min-height:44px;max-height:none;overflow-y:auto;font:inherit;font-size:14px;line-height:1.4;border:1px solid #d4d6db;border-radius:18px;padding:10px 14px;background:#fff;color:var(--mat-sys-on-surface);outline:none;overflow-wrap:anywhere;white-space:pre-wrap}.composer-input[_ngcontent-%COMP%]:focus{border-color:var(--mat-sys-primary, #048abf);box-shadow:0 0 0 2px #048abf26}.composer-input[_ngcontent-%COMP%]:empty:before{content:attr(data-placeholder);color:var(--mat-sys-on-surface-variant);pointer-events:none}.composer-input[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000d;border:1px solid var(--mat-sys-outline-variant);border-radius:6px;padding:8px 10px;margin:6px 0;font-size:12px}.composer-input[_ngcontent-%COMP%]   :where(code[_ngcontent-%COMP%]){font-family:JetBrains Mono,ui-monospace,monospace;background:#0000000f;border-radius:4px;padding:1px 4px;font-size:.92em}.composer-input[_ngcontent-%COMP%]   :where(pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]){background:none;padding:0;font-size:inherit}.composer-input[_ngcontent-%COMP%]   :where(ul[_ngcontent-%COMP%], ol[_ngcontent-%COMP%]){margin:4px 0;padding-left:22px}.composer-input[_ngcontent-%COMP%]   :where(li[_ngcontent-%COMP%]){margin:2px 0}.composer-input[_ngcontent-%COMP%]   :where(p[_ngcontent-%COMP%]){margin:4px 0}.composer-input[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){margin:8px 0 4px;line-height:1.25;font-weight:700}.composer-input[_ngcontent-%COMP%]   :where(h1[_ngcontent-%COMP%]){font-size:1.25em}.composer-input[_ngcontent-%COMP%]   :where(h2[_ngcontent-%COMP%]){font-size:1.15em}.composer-input[_ngcontent-%COMP%]   :where(h3[_ngcontent-%COMP%]){font-size:1.08em}.composer-input[_ngcontent-%COMP%]   :where(h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]){font-size:1em}.composer-input[_ngcontent-%COMP%]   :where(blockquote[_ngcontent-%COMP%]){margin:6px 0;padding:2px 0 2px 10px;border-left:3px solid var(--mat-sys-outline-variant);color:var(--mat-sys-on-surface-variant)}.composer-input[_ngcontent-%COMP%]   :where(table[_ngcontent-%COMP%]){max-width:100%;border-collapse:collapse;font-size:12px}.composer-input[_ngcontent-%COMP%]   :where(td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]){border:1px solid var(--mat-sys-outline-variant);padding:2px 6px}.composer-input[_ngcontent-%COMP%]   :where(th[_ngcontent-%COMP%]){background:#0000000a;font-weight:700}.composer-actions[_ngcontent-%COMP%]{flex:0 0 auto;display:flex;align-items:center;gap:10px;margin-top:8px}.composer-actions[_ngcontent-%COMP%]   .attach-label[_ngcontent-%COMP%]{display:inline-flex;cursor:pointer;color:var(--mat-sys-on-surface-variant)}.composer-actions[_ngcontent-%COMP%]   .files[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;min-width:0}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;max-width:220px;padding:2px 4px 2px 8px;border:1px solid var(--mat-sys-outline-variant);border-radius:14px;background:var(--mat-sys-surface-container-high, #eef1f5);font-size:12px}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px;color:var(--mat-sys-on-surface-variant)}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]{border:none;background:transparent;cursor:pointer;color:var(--mat-sys-on-surface-variant);font-size:12px;line-height:1;padding:2px 4px;border-radius:50%}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]:hover{color:var(--mat-sys-error, #d32f2f)}.composer-actions[_ngcontent-%COMP%]   .file-chip[_ngcontent-%COMP%]   .file-remove[_ngcontent-%COMP%]:disabled{cursor:default;opacity:.5}.composer-actions[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1}.composer-actions[_ngcontent-%COMP%]   .send-status[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant)}.lightbox[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:1200;background:#000000d9;display:flex;align-items:center;justify-content:center;cursor:zoom-out}.lightbox[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:92vw;max-height:92vh;border-radius:6px}.lightbox[_ngcontent-%COMP%]   .lightbox-close[_ngcontent-%COMP%]{position:absolute;top:16px;right:20px;background:transparent;border:none;color:#fff;font-size:28px;cursor:pointer}.conv-older[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:2px 0 10px}.conv-expired[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:10px;padding:32px 20px;text-align:center;color:var(--mat-sys-on-surface-variant, #555)}.conv-expired[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:40px;width:40px;height:40px;color:var(--brand, #048abf)}.conv-expired[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;max-width:320px}@media(min-width:600px){.conv-head[_ngcontent-%COMP%]{padding:16px 24px 0}.conv-summary[_ngcontent-%COMP%]{padding:4px 24px 14px}.conv-summary[_ngcontent-%COMP%]   .conv-ticket-no[_ngcontent-%COMP%]{font-size:34px}.conv-body[_ngcontent-%COMP%]{padding:16px}.composer[_ngcontent-%COMP%]{padding:8px 24px 16px}}"]})};function Ji(a,i){return this._trackRow(i)}var za=(a,i)=>i.id;function er(a,i){if(a&1&&(Tc(0,"tr",0)(1,"td",3),QI(2),bc()()),a&2){let e=vI();ky(),bp("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),ap("colspan",e.numCols),ky(),Mc(" ",e.label," ");}}function tr(a,i){if(a&1&&(Tc(0,"td",3),QI(1),bc()),a&2){let e=vI(2);bp("padding-top",e._cellPadding)("padding-bottom",e._cellPadding),ap("colspan",e._firstRowOffset),ky(),Mc(" ",e._firstRowOffset>=e.labelMinRequiredCells?e.label:""," ");}}function nr(a,i){if(a&1){let e=mI();Tc(0,"td",6)(1,"button",7),mp("click",function(n){let r=Yl(e).$implicit,o=vI(2);return Kl(o._cellClicked(r,n))})("focus",function(n){let r=Yl(e).$implicit,o=vI(2);return Kl(o._emitActiveDateChange(r,n))}),Tc(2,"span",8),QI(3),bc(),up(4,"span",9),bc()();}if(a&2){let e=i.$implicit,t=i.$index,n=vI().$index,r=vI();bp("width",r._cellWidth)("padding-top",r._cellPadding)("padding-bottom",r._cellPadding),ap("data-mat-row",n)("data-mat-col",t),ky(),FI(e.cssClasses),Cp("mat-calendar-body-disabled",!e.enabled)("mat-calendar-body-active",r._isActiveCell(n,t))("mat-calendar-body-range-start",r._isRangeStart(e.compareValue))("mat-calendar-body-range-end",r._isRangeEnd(e.compareValue))("mat-calendar-body-in-range",r._isInRange(e.compareValue))("mat-calendar-body-comparison-bridge-start",r._isComparisonBridgeStart(e.compareValue,n,t))("mat-calendar-body-comparison-bridge-end",r._isComparisonBridgeEnd(e.compareValue,n,t))("mat-calendar-body-comparison-start",r._isComparisonStart(e.compareValue))("mat-calendar-body-comparison-end",r._isComparisonEnd(e.compareValue))("mat-calendar-body-in-comparison-range",r._isInComparisonRange(e.compareValue))("mat-calendar-body-preview-start",r._isPreviewStart(e.compareValue))("mat-calendar-body-preview-end",r._isPreviewEnd(e.compareValue))("mat-calendar-body-in-preview",r._isInPreview(e.compareValue)),pp("tabIndex",r._isActiveCell(n,t)?0:-1),ap("aria-label",e.ariaLabel)("aria-disabled",!e.enabled||null)("aria-pressed",r._isSelected(e.compareValue))("aria-current",r.todayValue===e.compareValue?"date":null)("aria-describedby",r._getDescribedby(e.compareValue)),ky(),Cp("mat-calendar-body-selected",r._isSelected(e.compareValue))("mat-calendar-body-comparison-identical",r._isComparisonIdentical(e.compareValue))("mat-calendar-body-today",r.todayValue===e.compareValue),ky(),Mc(" ",e.displayValue," ");}}function ar(a,i){if(a&1&&(Tc(0,"tr",1),iI(1,tr,2,6,"td",4),lI(2,nr,5,49,"td",5,za),bc()),a&2){let e=i.$implicit,t=i.$index,n=vI();ky(),sI(t===0&&n._firstRowOffset?1:-1),ky(),uI(e);}}function ir(a,i){if(a&1&&(ii$1(0,"th",2)(1,"span",6),QI(2),wc(),ii$1(3,"span",3),QI(4),wc()()),a&2){let e=i.$implicit;ky(2),Ap(e.long),ky(2),Ap(e.narrow);}}var rr=["*"];function or(a,i){}function sr(a,i){if(a&1){let e=mI();ii$1(0,"mat-month-view",4),Pp("activeDateChange",function(n){Yl(e);let r=vI();return XI(r.activeDate,n)||(r.activeDate=n),Kl(n)}),gp("_userSelection",function(n){Yl(e);let r=vI();return Kl(r._dateSelected(n))})("dragStarted",function(n){Yl(e);let r=vI();return Kl(r._dragStarted(n))})("dragEnded",function(n){Yl(e);let r=vI();return Kl(r._dragEnded(n))}),wc();}if(a&2){let e=vI();Op("activeDate",e.activeDate),cp("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass)("comparisonStart",e.comparisonStart)("comparisonEnd",e.comparisonEnd)("startDateAccessibleName",e.startDateAccessibleName)("endDateAccessibleName",e.endDateAccessibleName)("activeDrag",e._activeDrag);}}function lr(a,i){if(a&1){let e=mI();ii$1(0,"mat-year-view",5),Pp("activeDateChange",function(n){Yl(e);let r=vI();return XI(r.activeDate,n)||(r.activeDate=n),Kl(n)}),gp("monthSelected",function(n){Yl(e);let r=vI();return Kl(r._monthSelectedInYearView(n))})("selectedChange",function(n){Yl(e);let r=vI();return Kl(r._goToDateInView(n,"month"))}),wc();}if(a&2){let e=vI();Op("activeDate",e.activeDate),cp("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass);}}function dr(a,i){if(a&1){let e=mI();ii$1(0,"mat-multi-year-view",6),Pp("activeDateChange",function(n){Yl(e);let r=vI();return XI(r.activeDate,n)||(r.activeDate=n),Kl(n)}),gp("yearSelected",function(n){Yl(e);let r=vI();return Kl(r._yearSelectedInMultiYearView(n))})("selectedChange",function(n){Yl(e);let r=vI();return Kl(r._goToDateInView(n,"year"))}),wc();}if(a&2){let e=vI();Op("activeDate",e.activeDate),cp("selected",e.selected)("dateFilter",e.dateFilter)("maxDate",e.maxDate)("minDate",e.minDate)("dateClass",e.dateClass);}}function cr(a,i){}var mr=["button"],pr=[[["","matDatepickerToggleIcon",""]]],ur=["[matDatepickerToggleIcon]"];function hr(a,i){a&1&&(lu(),ii$1(0,"svg",2),lp(1,"path",3),wc());}var $e=(()=>{class a{changes=new te;calendarLabel="Calendar";openCalendarLabel="Open calendar";closeCalendarLabel="Close calendar";prevMonthLabel="Previous month";nextMonthLabel="Next month";prevYearLabel="Previous year";nextYearLabel="Next year";prevMultiYearLabel="Previous 24 years";nextMultiYearLabel="Next 24 years";switchToMonthViewLabel="Choose date";switchToMultiYearViewLabel="Choose month and year";startDateLabel="Start date";endDateLabel="End date";comparisonDateLabel="Comparison range";formatYearRange(e,t){return `${e} \u2013 ${t}`}formatYearRangeLabel(e,t){return `${e} to ${t}`}static \u0275fac=function(t){return new(t||a)};static \u0275prov=gr$1({token:a,factory:a.\u0275fac})}return a})(),_r=0,tt=class{value;displayValue;ariaLabel;enabled;compareValue;rawValue;id=_r++;cssClasses;constructor(i,e,t,n,r,o=i,C){this.value=i,this.displayValue=e,this.ariaLabel=t,this.enabled=n,this.compareValue=o,this.rawValue=C,this.cssClasses=r instanceof Set?Array.from(r):r;}},gr={passive:false,capture:true},$t={passive:true,capture:true},Fa={passive:true},Ke=(()=>{class a{_elementRef=D(mr$1);_ngZone=D(Se);_platform=D(w);_intl=D($e);_eventCleanups;_skipNextFocus=false;_focusActiveCellAfterViewChecked=false;label;rows;todayValue;startValue;endValue;labelMinRequiredCells;numCols=7;activeCell=0;ngAfterViewChecked(){this._focusActiveCellAfterViewChecked&&(this._focusActiveCell(),this._focusActiveCellAfterViewChecked=false);}isRange=false;cellAspectRatio=1;comparisonStart=null;comparisonEnd=null;previewStart=null;previewEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedValueChange=new $e$2;previewChange=new $e$2;activeDateChange=new $e$2;dragStarted=new $e$2;dragEnded=new $e$2;_firstRowOffset;_cellPadding;_cellWidth;_startDateLabelId;_endDateLabelId;_comparisonStartDateLabelId;_comparisonEndDateLabelId;_didDragSinceMouseDown=false;_injector=D(me);comparisonDateAccessibleName=this._intl.comparisonDateLabel;_trackRow=e=>e;constructor(){let e=D(jv),t=D(nn);this._startDateLabelId=t.getId("mat-calendar-body-start-"),this._endDateLabelId=t.getId("mat-calendar-body-end-"),this._comparisonStartDateLabelId=t.getId("mat-calendar-body-comparison-start-"),this._comparisonEndDateLabelId=t.getId("mat-calendar-body-comparison-end-"),D(q).load(sh),this._ngZone.runOutsideAngular(()=>{let n=this._elementRef.nativeElement,r=[e.listen(n,"touchmove",this._touchmoveHandler,gr),e.listen(n,"mouseenter",this._enterHandler,$t),e.listen(n,"focus",this._enterHandler,$t),e.listen(n,"mouseleave",this._leaveHandler,$t),e.listen(n,"blur",this._leaveHandler,$t),e.listen(n,"mousedown",this._mousedownHandler,Fa),e.listen(n,"touchstart",this._mousedownHandler,Fa)];this._platform.isBrowser&&r.push(e.listen("window","mouseup",this._mouseupHandler),e.listen("window","touchend",this._touchendHandler)),this._eventCleanups=r;});}_cellClicked(e,t){this._didDragSinceMouseDown||e.enabled&&this.selectedValueChange.emit({value:e.value,event:t});}_emitActiveDateChange(e,t){e.enabled&&this.activeDateChange.emit({value:e.value,event:t});}_isSelected(e){return this.startValue===e||this.endValue===e}ngOnChanges(e){let t=e.numCols,{rows:n,numCols:r}=this;(e.rows||t)&&(this._firstRowOffset=n&&n.length&&n[0].length?r-n[0].length:0),(e.cellAspectRatio||t||!this._cellPadding)&&(this._cellPadding=`${50*this.cellAspectRatio/r}%`),(t||!this._cellWidth)&&(this._cellWidth=`${100/r}%`);}ngOnDestroy(){this._eventCleanups.forEach(e=>e());}_isActiveCell(e,t){let n=e*this.numCols+t;return e&&(n-=this._firstRowOffset),n==this.activeCell}_focusActiveCell(e=true){Ly(()=>{setTimeout(()=>{let t=this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");t&&(e||(this._skipNextFocus=true),t.focus());});},{injector:this._injector});}_scheduleFocusActiveCellAfterViewChecked(){this._focusActiveCellAfterViewChecked=true;}_isRangeStart(e){return Mn(e,this.startValue,this.endValue)}_isRangeEnd(e){return xn(e,this.startValue,this.endValue)}_isInRange(e){return kn(e,this.startValue,this.endValue,this.isRange)}_isComparisonStart(e){return Mn(e,this.comparisonStart,this.comparisonEnd)}_isComparisonBridgeStart(e,t,n){if(!this._isComparisonStart(e)||this._isRangeStart(e)||!this._isInRange(e))return  false;let r=this.rows[t][n-1];if(!r){let o=this.rows[t-1];r=o&&o[o.length-1];}return r&&!this._isRangeEnd(r.compareValue)}_isComparisonBridgeEnd(e,t,n){if(!this._isComparisonEnd(e)||this._isRangeEnd(e)||!this._isInRange(e))return  false;let r=this.rows[t][n+1];if(!r){let o=this.rows[t+1];r=o&&o[0];}return r&&!this._isRangeStart(r.compareValue)}_isComparisonEnd(e){return xn(e,this.comparisonStart,this.comparisonEnd)}_isInComparisonRange(e){return kn(e,this.comparisonStart,this.comparisonEnd,this.isRange)}_isComparisonIdentical(e){return this.comparisonStart===this.comparisonEnd&&e===this.comparisonStart}_isPreviewStart(e){return Mn(e,this.previewStart,this.previewEnd)}_isPreviewEnd(e){return xn(e,this.previewStart,this.previewEnd)}_isInPreview(e){return kn(e,this.previewStart,this.previewEnd,this.isRange)}_getDescribedby(e){if(!this.isRange)return null;if(this.startValue===e&&this.endValue===e)return `${this._startDateLabelId} ${this._endDateLabelId}`;if(this.startValue===e)return this._startDateLabelId;if(this.endValue===e)return this._endDateLabelId;if(this.comparisonStart!==null&&this.comparisonEnd!==null){if(e===this.comparisonStart&&e===this.comparisonEnd)return `${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;if(e===this.comparisonStart)return this._comparisonStartDateLabelId;if(e===this.comparisonEnd)return this._comparisonEndDateLabelId}return null}_enterHandler=e=>{if(this._skipNextFocus&&e.type==="focus"){this._skipNextFocus=false;return}if(e.target&&this.isRange){let t=this._getCellFromElement(e.target);t&&this._ngZone.run(()=>this.previewChange.emit({value:t.enabled?t:null,event:e}));}};_touchmoveHandler=e=>{if(!this.isRange)return;let t=Ra(e),n=t?this._getCellFromElement(t):null;t!==e.target&&(this._didDragSinceMouseDown=true),Dn(e.target)&&e.preventDefault(),this._ngZone.run(()=>this.previewChange.emit({value:n?.enabled?n:null,event:e}));};_leaveHandler=e=>{this.previewEnd!==null&&this.isRange&&(e.type!=="blur"&&(this._didDragSinceMouseDown=true),e.target&&this._getCellFromElement(e.target)&&!(e.relatedTarget&&this._getCellFromElement(e.relatedTarget))&&this._ngZone.run(()=>this.previewChange.emit({value:null,event:e})));};_mousedownHandler=e=>{if(!this.isRange)return;this._didDragSinceMouseDown=false;let t=e.target&&this._getCellFromElement(e.target);!t||!this._isInRange(t.compareValue)||this._ngZone.run(()=>{this.dragStarted.emit({value:t.rawValue,event:e});});};_mouseupHandler=e=>{if(!this.isRange)return;let t=Dn(e.target);if(!t){this._ngZone.run(()=>{this.dragEnded.emit({value:null,event:e});});return}t.closest(".mat-calendar-body")===this._elementRef.nativeElement&&this._ngZone.run(()=>{let n=this._getCellFromElement(t);this.dragEnded.emit({value:n?.rawValue??null,event:e});});};_touchendHandler=e=>{let t=Ra(e);t&&this._mouseupHandler({target:t});};_getCellFromElement(e){let t=Dn(e);if(t){let n=t.getAttribute("data-mat-row"),r=t.getAttribute("data-mat-col");if(n&&r)return this.rows[parseInt(n)]?.[parseInt(r)]||null}return null}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["","mat-calendar-body",""]],hostAttrs:[1,"mat-calendar-body"],inputs:{label:"label",rows:"rows",todayValue:"todayValue",startValue:"startValue",endValue:"endValue",labelMinRequiredCells:"labelMinRequiredCells",numCols:"numCols",activeCell:"activeCell",isRange:"isRange",cellAspectRatio:"cellAspectRatio",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",previewStart:"previewStart",previewEnd:"previewEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedValueChange:"selectedValueChange",previewChange:"previewChange",activeDateChange:"activeDateChange",dragStarted:"dragStarted",dragEnded:"dragEnded"},exportAs:["matCalendarBody"],features:[im],decls:11,vars:11,consts:[["aria-hidden","true"],["role","row"],[1,"mat-calendar-body-hidden-label",3,"id"],[1,"mat-calendar-body-label"],[1,"mat-calendar-body-label",3,"paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container",3,"width","paddingTop","paddingBottom"],["role","gridcell",1,"mat-calendar-body-cell-container"],["type","button",1,"mat-calendar-body-cell",3,"click","focus","tabindex"],[1,"mat-calendar-body-cell-content","mat-focus-indicator"],["aria-hidden","true",1,"mat-calendar-body-cell-preview"]],template:function(t,n){t&1&&(iI(0,er,3,6,"tr",0),lI(1,ar,4,1,"tr",1,Ji,true),Tc(3,"span",2),QI(4),bc(),Tc(5,"span",2),QI(6),bc(),Tc(7,"span",2),QI(8),bc(),Tc(9,"span",2),QI(10),bc()),t&2&&(sI(n._firstRowOffset<n.labelMinRequiredCells?0:-1),ky(),uI(n.rows),ky(2),pp("id",n._startDateLabelId),ky(),Mc(" ",n.startDateAccessibleName,`
`),ky(),pp("id",n._endDateLabelId),ky(),Mc(" ",n.endDateAccessibleName,`
`),ky(),pp("id",n._comparisonStartDateLabelId),ky(),kp(" ",n.comparisonDateAccessibleName," ",n.startDateAccessibleName,`
`),ky(),pp("id",n._comparisonEndDateLabelId),ky(),kp(" ",n.comparisonDateAccessibleName," ",n.endDateAccessibleName,`
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
`],encapsulation:2})}return a})();function Cn(a){return a?.nodeName==="TD"}function Dn(a){let i;return Cn(a)?i=a:Cn(a.parentNode)?i=a.parentNode:Cn(a.parentNode?.parentNode)&&(i=a.parentNode.parentNode),i?.getAttribute("data-mat-row")!=null?i:null}function Mn(a,i,e){return e!==null&&i!==e&&a<e&&a===i}function xn(a,i,e){return i!==null&&i!==e&&a>=i&&a===e}function kn(a,i,e,t){return t&&i!==null&&e!==null&&i!==e&&a>=i&&a<=e}function Ra(a){let i=a.changedTouches[0];return document.elementFromPoint(i.clientX,i.clientY)}var Y=class{start;end;_disableStructuralEquivalency;constructor(i,e){this.start=i,this.end=e;}},nt=(()=>{class a{selection;_adapter;_selectionChanged=new te;selectionChanged=this._selectionChanged;constructor(e,t){this.selection=e,this._adapter=t,this.selection=e;}updateSelection(e,t){let n=this.selection;this.selection=e,this._selectionChanged.next({selection:e,source:t,oldValue:n});}ngOnDestroy(){this._selectionChanged.complete();}_isValidDateInstance(e){return this._adapter.isDateInstance(e)&&this._adapter.isValid(e)}static \u0275fac=function(t){Xv();};static \u0275prov=X({token:a,factory:a.\u0275fac})}return a})(),fr=(()=>{class a extends nt{constructor(e){super(null,e);}add(e){super.updateSelection(e,this);}isValid(){return this.selection!=null&&this._isValidDateInstance(this.selection)}isComplete(){return this.selection!=null}clone(){let e=new a(this._adapter);return e.updateSelection(this.selection,this),e}static \u0275fac=function(t){return new(t||a)(Me(l))};static \u0275prov=X({token:a,factory:a.\u0275fac})}return a})();var Ha={provide:nt,useFactory:()=>D(nt,{optional:true,skipSelf:true})||new fr(D(l))};var ja=new N("MAT_DATE_RANGE_SELECTION_STRATEGY");var wn=7,br=0,Ba=(()=>{class a{_changeDetectorRef=D(QL);_dateFormats=D(d,{optional:true});_dateAdapter=D(l,{optional:true});_dir=D(Is,{optional:true});_rangeStrategy=D(ja,{optional:true});_rerenderSubscription=U$1.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),this._hasSameMonthAndYear(t,this._activeDate)||this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Y?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setRanges(this._selected);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;activeDrag=null;selectedChange=new $e$2;_userSelection=new $e$2;dragStarted=new $e$2;dragEnded=new $e$2;activeDateChange=new $e$2;_matCalendarBody;_monthLabel=Ft("");_weeks=Ft([]);_firstWeekOffset=Ft(0);_rangeStart=Ft(null);_rangeEnd=Ft(null);_comparisonRangeStart=Ft(null);_comparisonRangeEnd=Ft(null);_previewStart=Ft(null);_previewEnd=Ft(null);_isRange=Ft(false);_todayDate=Ft(null);_weekdays=Ft([]);constructor(){D(q).load(ht),this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Qh(null)).subscribe(()=>this._init());}ngOnChanges(e){let t=e.comparisonStart||e.comparisonEnd;t&&!t.firstChange&&this._setRanges(this.selected),e.activeDrag&&!this.activeDrag&&this._clearPreview();}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_dateSelected(e){let t=e.value,n=this._getDateFromDayOfMonth(t),r,o;this._selected instanceof Y?(r=this._getDateInCurrentMonth(this._selected.start),o=this._getDateInCurrentMonth(this._selected.end)):r=o=this._getDateInCurrentMonth(this._selected),(r!==t||o!==t)&&this.selectedChange.emit(n),this._userSelection.emit({value:n,event:e.event}),this._clearPreview(),this._changeDetectorRef.markForCheck();}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromDayOfMonth(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this._activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,-7);break;case 40:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,7);break;case 36:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,1-this._dateAdapter.getDate(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarDays(this._activeDate,this._dateAdapter.getNumDaysInMonth(this._activeDate)-this._dateAdapter.getDate(this._activeDate));break;case 33:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,-1):this._dateAdapter.addCalendarMonths(this._activeDate,-1);break;case 34:this.activeDate=e.altKey?this._dateAdapter.addCalendarYears(this._activeDate,1):this._dateAdapter.addCalendarMonths(this._activeDate,1);break;case 13:case 32:this._selectionKeyPressed=true,this._canSelect(this._activeDate)&&e.preventDefault();return;case 27:this._previewEnd()!=null&&!Hr(e)&&(this._clearPreview(),this.activeDrag?this.dragEnded.emit({value:null,event:e}):(this.selectedChange.emit(null),this._userSelection.emit({value:null,event:e})),e.preventDefault(),e.stopPropagation());return;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._canSelect(this._activeDate)&&this._dateSelected({value:this._dateAdapter.getDate(this._activeDate),event:e}),this._selectionKeyPressed=false);}_init(){this._setRanges(this.selected),this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today())),this._monthLabel.set(this._dateFormats.display.monthLabel?this._dateAdapter.format(this.activeDate,this._dateFormats.display.monthLabel):this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());let e=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),1);this._firstWeekOffset.set((wn+this._dateAdapter.getDayOfWeek(e)-this._dateAdapter.getFirstDayOfWeek())%wn),this._initWeekdays(),this._createWeekCells(),this._changeDetectorRef.markForCheck();}_focusActiveCell(e){this._matCalendarBody._focusActiveCell(e);}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_previewChanged({event:e,value:t}){if(this._rangeStrategy){let n=t?t.rawValue:null,r=this._rangeStrategy.createPreview(n,this.selected,e);if(this._previewStart.set(this._getCellCompareValue(r.start)),this._previewEnd.set(this._getCellCompareValue(r.end)),this.activeDrag&&n){let o=this._rangeStrategy.createDrag?.(this.activeDrag.value,this.selected,n,e);o&&(this._previewStart.set(this._getCellCompareValue(o.start)),this._previewEnd.set(this._getCellCompareValue(o.end)));}}}_dragEnded(e){if(this.activeDrag)if(e.value){let t=this._rangeStrategy?.createDrag?.(this.activeDrag.value,this.selected,e.value,e.event);this.dragEnded.emit({value:t??null,event:e.event});}else this.dragEnded.emit({value:null,event:e.event});}_getDateFromDayOfMonth(e){return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),e)}_initWeekdays(){let e=this._dateAdapter.getFirstDayOfWeek(),t=this._dateAdapter.getDayOfWeekNames("narrow"),r=this._dateAdapter.getDayOfWeekNames("long").map((o,C)=>({long:o,narrow:t[C],id:br++}));this._weekdays.set(r.slice(e).concat(r.slice(0,e)));}_createWeekCells(){let e=this._dateAdapter.getNumDaysInMonth(this.activeDate),t=this._dateAdapter.getDateNames(),n=[[]];for(let r=0,o=this._firstWeekOffset();r<e;r++,o++){o==wn&&(n.push([]),o=0);let C=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),this._dateAdapter.getMonth(this.activeDate),r+1),X=this._shouldEnableDate(C),B=this._dateAdapter.format(C,this._dateFormats.display.dateA11yLabel),pe=this.dateClass?this.dateClass(C,"month"):void 0;n[n.length-1].push(new tt(r+1,t[r],B,X,pe,this._getCellCompareValue(C),C));}this._weeks.set(n);}_shouldEnableDate(e){return !!e&&(!this.minDate||this._dateAdapter.compareDate(e,this.minDate)>=0)&&(!this.maxDate||this._dateAdapter.compareDate(e,this.maxDate)<=0)&&(!this.dateFilter||this.dateFilter(e))}_getDateInCurrentMonth(e){return e&&this._hasSameMonthAndYear(e,this.activeDate)?this._dateAdapter.getDate(e):null}_hasSameMonthAndYear(e,t){return !!(e&&t&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(t)&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t))}_getCellCompareValue(e){if(e){let t=this._dateAdapter.getYear(e),n=this._dateAdapter.getMonth(e),r=this._dateAdapter.getDate(e);return new Date(t,n,r).getTime()}return null}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setRanges(e){e instanceof Y?(this._rangeStart.set(this._getCellCompareValue(e.start)),this._rangeEnd.set(this._getCellCompareValue(e.end)),this._isRange.set(true)):(this._rangeStart.set(this._getCellCompareValue(e)),this._rangeEnd.set(this._rangeStart()),this._isRange.set(false)),this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart)),this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd));}_canSelect(e){return !this.dateFilter||this.dateFilter(e)}_clearPreview(){this._previewStart.set(null),this._previewEnd.set(null);}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-month-view"]],viewQuery:function(t,n){if(t&1&&Ep(Ke,5),t&2){let r;TI(r=bI())&&(n._matCalendarBody=r.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName",activeDrag:"activeDrag"},outputs:{selectedChange:"selectedChange",_userSelection:"_userSelection",dragStarted:"dragStarted",dragEnded:"dragEnded",activeDateChange:"activeDateChange"},exportAs:["matMonthView"],features:[im],decls:8,vars:14,consts:[["role","grid",1,"mat-calendar-table"],[1,"mat-calendar-table-header"],["scope","col"],["aria-hidden","true"],["colspan","7",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","previewChange","dragStarted","dragEnded","keyup","keydown","label","rows","todayValue","startValue","endValue","comparisonStart","comparisonEnd","previewStart","previewEnd","isRange","labelMinRequiredCells","activeCell","startDateAccessibleName","endDateAccessibleName"],[1,"cdk-visually-hidden"]],template:function(t,n){t&1&&(ii$1(0,"table",0)(1,"thead",1)(2,"tr"),lI(3,ir,5,2,"th",2,za),wc(),ii$1(5,"tr",3),lp(6,"th",4),wc()(),ii$1(7,"tbody",5),gp("selectedValueChange",function(o){return n._dateSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("previewChange",function(o){return n._previewChanged(o)})("dragStarted",function(o){return n.dragStarted.emit(o)})("dragEnded",function(o){return n._dragEnded(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),wc()()),t&2&&(ky(3),uI(n._weekdays()),ky(4),cp("label",n._monthLabel())("rows",n._weeks())("todayValue",n._todayDate())("startValue",n._rangeStart())("endValue",n._rangeEnd())("comparisonStart",n._comparisonRangeStart())("comparisonEnd",n._comparisonRangeEnd())("previewStart",n._previewStart())("previewEnd",n._previewEnd())("isRange",n._isRange())("labelMinRequiredCells",3)("activeCell",n._dateAdapter.getDate(n.activeDate)-1)("startDateAccessibleName",n.startDateAccessibleName)("endDateAccessibleName",n.endDateAccessibleName));},dependencies:[Ke],encapsulation:2})}return a})(),R=24,An=4,Na=(()=>{class a{_changeDetectorRef=D(QL);_dateAdapter=D(l,{optional:true});_dir=D(Is,{optional:true});_rerenderSubscription=U$1.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),Ua(this._dateAdapter,t,this._activeDate,this.minDate,this.maxDate)||this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Y?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedYear(e);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;selectedChange=new $e$2;yearSelected=new $e$2;activeDateChange=new $e$2;_matCalendarBody;_years=Ft([]);_todayYear=Ft(0);_selectedYear=Ft(null);constructor(){this._dateAdapter,this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Qh(null)).subscribe(()=>this._init());}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_init(){this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));let t=this._dateAdapter.getYear(this._activeDate)-et(this._dateAdapter,this.activeDate,this.minDate,this.maxDate),n=[];for(let r=0,o=[];r<R;r++)o.push(t+r),o.length==An&&(n.push(o.map(C=>this._createCellForYear(C))),o=[]);this._years.set(n),this._changeDetectorRef.markForCheck();}_yearSelected(e){let t=e.value,n=this._dateAdapter.createDate(t,0,1),r=this._getDateFromYear(t);this.yearSelected.emit(n),this.selectedChange.emit(r);}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromYear(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this.activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-An);break;case 40:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,An);break;case 36:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,-et(this._dateAdapter,this.activeDate,this.minDate,this.maxDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,R-et(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)-1);break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-R*10:-R);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?R*10:R);break;case 13:case 32:this._selectionKeyPressed=true;break;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked(),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._yearSelected({value:this._dateAdapter.getYear(this._activeDate),event:e}),this._selectionKeyPressed=false);}_getActiveCell(){return et(this._dateAdapter,this.activeDate,this.minDate,this.maxDate)}_focusActiveCell(){this._matCalendarBody._focusActiveCell();}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_getDateFromYear(e){let t=this._dateAdapter.getMonth(this.activeDate),n=this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(e,t,1));return this._dateAdapter.createDate(e,t,Math.min(this._dateAdapter.getDate(this.activeDate),n))}_createCellForYear(e){let t=this._dateAdapter.createDate(e,0,1),n=this._dateAdapter.getYearName(t),r=this.dateClass?this.dateClass(t,"multi-year"):void 0;return new tt(e,n,n,this._shouldEnableYear(e),r)}_shouldEnableYear(e){if(e==null||this.maxDate&&e>this._dateAdapter.getYear(this.maxDate)||this.minDate&&e<this._dateAdapter.getYear(this.minDate))return  false;if(!this.dateFilter)return  true;let t=this._dateAdapter.createDate(e,0,1);for(let n=t;this._dateAdapter.getYear(n)==e;n=this._dateAdapter.addCalendarDays(n,1))if(this.dateFilter(n))return  true;return  false}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedYear(e){if(this._selectedYear.set(null),e instanceof Y){let t=e.start||e.end;t&&this._selectedYear.set(this._dateAdapter.getYear(t));}else e&&this._selectedYear.set(this._dateAdapter.getYear(e));}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-multi-year-view"]],viewQuery:function(t,n){if(t&1&&Ep(Ke,5),t&2){let r;TI(r=bI())&&(n._matCalendarBody=r.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",activeDateChange:"activeDateChange"},exportAs:["matMultiYearView"],decls:5,vars:7,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","rows","todayValue","startValue","endValue","numCols","cellAspectRatio","activeCell"]],template:function(t,n){t&1&&(ii$1(0,"table",0)(1,"thead",1)(2,"tr"),lp(3,"th",2),wc()(),ii$1(4,"tbody",3),gp("selectedValueChange",function(o){return n._yearSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),wc()()),t&2&&(ky(4),cp("rows",n._years())("todayValue",n._todayYear())("startValue",n._selectedYear())("endValue",n._selectedYear())("numCols",4)("cellAspectRatio",4/7)("activeCell",n._getActiveCell()));},dependencies:[Ke],encapsulation:2})}return a})();function Ua(a,i,e,t,n){let r=a.getYear(i),o=a.getYear(e),C=Ka(a,t,n);return Math.floor((r-C)/R)===Math.floor((o-C)/R)}function et(a,i,e,t){let n=a.getYear(i);return vr(n-Ka(a,e,t),R)}function Ka(a,i,e){let t=0;return e?t=a.getYear(e)-R+1:i&&(t=a.getYear(i)),t}function vr(a,i){return (a%i+i)%i}var La=(()=>{class a{_changeDetectorRef=D(QL);_dateFormats=D(d,{optional:true});_dateAdapter=D(l,{optional:true});_dir=D(Is,{optional:true});_rerenderSubscription=U$1.EMPTY;_selectionKeyPressed=false;get activeDate(){return this._activeDate}set activeDate(e){let t=this._activeDate,n=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e))||this._dateAdapter.today();this._activeDate=this._dateAdapter.clampDate(n,this.minDate,this.maxDate),this._dateAdapter.getYear(t)!==this._dateAdapter.getYear(this._activeDate)&&this._init();}_activeDate;get selected(){return this._selected}set selected(e){e instanceof Y?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e)),this._setSelectedMonth(e);}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;selectedChange=new $e$2;monthSelected=new $e$2;activeDateChange=new $e$2;_matCalendarBody;_months=Ft([]);_yearLabel=Ft("");_todayMonth=Ft(null);_selectedMonth=Ft(null);constructor(){this._activeDate=this._dateAdapter.today();}ngAfterContentInit(){this._rerenderSubscription=this._dateAdapter.localeChanges.pipe(Qh(null)).subscribe(()=>this._init());}ngOnDestroy(){this._rerenderSubscription.unsubscribe();}_monthSelected(e){let t=e.value,n=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),t,1);this.monthSelected.emit(n);let r=this._getDateFromMonth(t);this.selectedChange.emit(r);}_updateActiveDate(e){let t=e.value,n=this._activeDate;this.activeDate=this._getDateFromMonth(t),this._dateAdapter.compareDate(n,this.activeDate)&&this.activeDateChange.emit(this.activeDate);}_handleCalendarBodyKeydown(e){let t=this._activeDate,n=this._isRtl();switch(e.keyCode){case 37:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,n?1:-1);break;case 39:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,n?-1:1);break;case 38:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-4);break;case 40:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,4);break;case 36:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,-this._dateAdapter.getMonth(this._activeDate));break;case 35:this.activeDate=this._dateAdapter.addCalendarMonths(this._activeDate,11-this._dateAdapter.getMonth(this._activeDate));break;case 33:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?-10:-1);break;case 34:this.activeDate=this._dateAdapter.addCalendarYears(this._activeDate,e.altKey?10:1);break;case 13:case 32:this._selectionKeyPressed=true;break;default:return}this._dateAdapter.compareDate(t,this.activeDate)&&(this.activeDateChange.emit(this.activeDate),this._focusActiveCellAfterViewChecked()),e.preventDefault();}_handleCalendarBodyKeyup(e){(e.keyCode===32||e.keyCode===13)&&(this._selectionKeyPressed&&this._monthSelected({value:this._dateAdapter.getMonth(this._activeDate),event:e}),this._selectionKeyPressed=false);}_init(){this._setSelectedMonth(this.selected),this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today())),this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));let e=this._dateAdapter.getMonthNames("short");this._months.set([[0,1,2,3],[4,5,6,7],[8,9,10,11]].map(t=>t.map(n=>this._createCellForMonth(n,e[n])))),this._changeDetectorRef.markForCheck();}_focusActiveCell(){this._matCalendarBody._focusActiveCell();}_focusActiveCellAfterViewChecked(){this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();}_getMonthInCurrentYear(e){return e&&this._dateAdapter.getYear(e)==this._dateAdapter.getYear(this.activeDate)?this._dateAdapter.getMonth(e):null}_getDateFromMonth(e){let t=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),n=this._dateAdapter.getNumDaysInMonth(t);return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,Math.min(this._dateAdapter.getDate(this.activeDate),n))}_createCellForMonth(e,t){let n=this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),e,1),r=this._dateAdapter.format(n,this._dateFormats.display.monthYearA11yLabel),o=this.dateClass?this.dateClass(n,"year"):void 0;return new tt(e,t.toLocaleUpperCase(),r,this._shouldEnableMonth(e),o)}_shouldEnableMonth(e){let t=this._dateAdapter.getYear(this.activeDate);if(e==null||this._isYearAndMonthAfterMaxDate(t,e)||this._isYearAndMonthBeforeMinDate(t,e))return  false;if(!this.dateFilter)return  true;let n=this._dateAdapter.createDate(t,e,1);for(let r=n;this._dateAdapter.getMonth(r)==e;r=this._dateAdapter.addCalendarDays(r,1))if(this.dateFilter(r))return  true;return  false}_isYearAndMonthAfterMaxDate(e,t){if(this.maxDate){let n=this._dateAdapter.getYear(this.maxDate),r=this._dateAdapter.getMonth(this.maxDate);return e>n||e===n&&t>r}return  false}_isYearAndMonthBeforeMinDate(e,t){if(this.minDate){let n=this._dateAdapter.getYear(this.minDate),r=this._dateAdapter.getMonth(this.minDate);return e<n||e===n&&t<r}return  false}_isRtl(){return this._dir&&this._dir.value==="rtl"}_setSelectedMonth(e){e instanceof Y?this._selectedMonth.set(this._getMonthInCurrentYear(e.start)||this._getMonthInCurrentYear(e.end)):this._selectedMonth.set(this._getMonthInCurrentYear(e));}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-year-view"]],viewQuery:function(t,n){if(t&1&&Ep(Ke,5),t&2){let r;TI(r=bI())&&(n._matCalendarBody=r.first);}},inputs:{activeDate:"activeDate",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass"},outputs:{selectedChange:"selectedChange",monthSelected:"monthSelected",activeDateChange:"activeDateChange"},exportAs:["matYearView"],decls:5,vars:9,consts:[["role","grid",1,"mat-calendar-table"],["aria-hidden","true",1,"mat-calendar-table-header"],["colspan","4",1,"mat-calendar-table-header-divider"],["mat-calendar-body","",3,"selectedValueChange","activeDateChange","keyup","keydown","label","rows","todayValue","startValue","endValue","labelMinRequiredCells","numCols","cellAspectRatio","activeCell"]],template:function(t,n){t&1&&(ii$1(0,"table",0)(1,"thead",1)(2,"tr"),lp(3,"th",2),wc()(),ii$1(4,"tbody",3),gp("selectedValueChange",function(o){return n._monthSelected(o)})("activeDateChange",function(o){return n._updateActiveDate(o)})("keyup",function(o){return n._handleCalendarBodyKeyup(o)})("keydown",function(o){return n._handleCalendarBodyKeydown(o)}),wc()()),t&2&&(ky(4),cp("label",n._yearLabel())("rows",n._months())("todayValue",n._todayMonth())("startValue",n._selectedMonth())("endValue",n._selectedMonth())("labelMinRequiredCells",2)("numCols",4)("cellAspectRatio",4/7)("activeCell",n._dateAdapter.getMonth(n.activeDate)));},dependencies:[Ke],encapsulation:2})}return a})(),$a=(()=>{class a{_intl=D($e);calendar=D(Sn);_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_periodButtonText;_periodButtonDescription;_periodButtonLabel;_prevButtonLabel;_nextButtonLabel;constructor(){D(q).load(ht);let e=D(QL);this._updateLabels(),this.calendar.stateChanges.subscribe(()=>{this._updateLabels(),e.markForCheck();});}get periodButtonText(){return this._periodButtonText}get periodButtonDescription(){return this._periodButtonDescription}get periodButtonLabel(){return this._periodButtonLabel}get prevButtonLabel(){return this._prevButtonLabel}get nextButtonLabel(){return this._nextButtonLabel}currentPeriodClicked(){this.calendar.currentView=this.calendar.currentView=="month"?"multi-year":"month";}previousClicked(){this.previousEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,-1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?-1:-R));}nextClicked(){this.nextEnabled()&&(this.calendar.activeDate=this.calendar.currentView=="month"?this._dateAdapter.addCalendarMonths(this.calendar.activeDate,1):this._dateAdapter.addCalendarYears(this.calendar.activeDate,this.calendar.currentView=="year"?1:R));}previousEnabled(){return this.calendar.minDate?!this.calendar.minDate||!this._isSameView(this.calendar.activeDate,this.calendar.minDate):true}nextEnabled(){return !this.calendar.maxDate||!this._isSameView(this.calendar.activeDate,this.calendar.maxDate)}_updateLabels(){let e=this.calendar,t=this._intl,n=this._dateAdapter;e.currentView==="month"?(this._periodButtonText=n.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonDescription=n.format(e.activeDate,this._dateFormats.display.monthYearLabel).toLocaleUpperCase(),this._periodButtonLabel=t.switchToMultiYearViewLabel,this._prevButtonLabel=t.prevMonthLabel,this._nextButtonLabel=t.nextMonthLabel):e.currentView==="year"?(this._periodButtonText=n.getYearName(e.activeDate),this._periodButtonDescription=n.getYearName(e.activeDate),this._periodButtonLabel=t.switchToMonthViewLabel,this._prevButtonLabel=t.prevYearLabel,this._nextButtonLabel=t.nextYearLabel):(this._periodButtonText=t.formatYearRange(...this._formatMinAndMaxYearLabels()),this._periodButtonDescription=t.formatYearRangeLabel(...this._formatMinAndMaxYearLabels()),this._periodButtonLabel=t.switchToMonthViewLabel,this._prevButtonLabel=t.prevMultiYearLabel,this._nextButtonLabel=t.nextMultiYearLabel);}_isSameView(e,t){return this.calendar.currentView=="month"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t)&&this._dateAdapter.getMonth(e)==this._dateAdapter.getMonth(t):this.calendar.currentView=="year"?this._dateAdapter.getYear(e)==this._dateAdapter.getYear(t):Ua(this._dateAdapter,e,t,this.calendar.minDate,this.calendar.maxDate)}_formatMinAndMaxYearLabels(){let t=this._dateAdapter.getYear(this.calendar.activeDate)-et(this._dateAdapter,this.calendar.activeDate,this.calendar.minDate,this.calendar.maxDate),n=t+R-1,r=this._dateAdapter.getYearName(this._dateAdapter.createDate(t,0,1)),o=this._dateAdapter.getYearName(this._dateAdapter.createDate(n,0,1));return [r,o]}_periodButtonLabelId=D(nn).getId("mat-calendar-period-label-");static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-calendar-header"]],exportAs:["matCalendarHeader"],ngContentSelectors:rr,decls:17,vars:13,consts:[[1,"mat-calendar-header"],[1,"mat-calendar-controls"],["aria-live","polite",1,"cdk-visually-hidden",3,"id"],["matButton","","type","button",1,"mat-calendar-period-button",3,"click"],["aria-hidden","true"],["viewBox","0 0 10 5","focusable","false","aria-hidden","true",1,"mat-calendar-arrow"],["points","0,0 5,5 10,0"],[1,"mat-calendar-spacer"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-previous-button",3,"click","disabled","matTooltip"],["viewBox","0 0 24 24","focusable","false","aria-hidden","true"],["d","M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],["matIconButton","","type","button","disabledInteractive","",1,"mat-calendar-next-button",3,"click","disabled","matTooltip"],["d","M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],template:function(t,n){t&1&&(II(),ii$1(0,"div",0)(1,"div",1)(2,"span",2),QI(3),wc(),ii$1(4,"button",3),gp("click",function(){return n.currentPeriodClicked()}),ii$1(5,"span",4),QI(6),wc(),lu(),ii$1(7,"svg",5),lp(8,"polygon",6),wc()(),uu(),lp(9,"div",7),DI(10),ii$1(11,"button",8),gp("click",function(){return n.previousClicked()}),lu(),ii$1(12,"svg",9),lp(13,"path",10),wc()(),uu(),ii$1(14,"button",11),gp("click",function(){return n.nextClicked()}),lu(),ii$1(15,"svg",9),lp(16,"path",12),wc()()()()),t&2&&(ky(2),cp("id",n._periodButtonLabelId),ky(),Ap(n.periodButtonDescription),ky(),ap("aria-label",n.periodButtonLabel)("aria-describedby",n._periodButtonLabelId),ky(2),Ap(n.periodButtonText),ky(),Cp("mat-calendar-invert",n.calendar.currentView!=="month"),ky(4),cp("disabled",!n.previousEnabled())("matTooltip",n.prevButtonLabel),ap("aria-label",n.prevButtonLabel),ky(3),cp("disabled",!n.nextEnabled())("matTooltip",n.nextButtonLabel),ap("aria-label",n.nextButtonLabel));},dependencies:[ha,Ui$1,mt],encapsulation:2})}return a})(),Sn=(()=>{class a{_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_changeDetectorRef=D(QL);_elementRef=D(mr$1);headerComponent;_calendarHeaderPortal;_intlChanges;_moveFocusOnNextTick=false;get startAt(){return this._startAt}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_startAt=null;startView="month";get selected(){return this._selected}set selected(e){e instanceof Y?this._selected=e:this._selected=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_selected=null;get minDate(){return this._minDate}set minDate(e){this._minDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_minDate=null;get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_maxDate=null;dateFilter;dateClass;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;selectedChange=new $e$2;yearSelected=new $e$2;monthSelected=new $e$2;viewChanged=new $e$2(true);_userSelection=new $e$2;_userDragDrop=new $e$2;monthView;yearView;multiYearView;get activeDate(){return this._clampedActiveDate}set activeDate(e){this._clampedActiveDate=this._dateAdapter.clampDate(e,this.minDate,this.maxDate),this.stateChanges.next(),this._changeDetectorRef.markForCheck();}_clampedActiveDate;get currentView(){return this._currentView}set currentView(e){let t=this._currentView!==e?e:null;this._currentView=e,this._moveFocusOnNextTick=true,this._changeDetectorRef.markForCheck(),t&&(this.stateChanges.next(),this.viewChanged.emit(t));}_currentView;_activeDrag=null;stateChanges=new te;constructor(){this._intlChanges=D($e).changes.subscribe(()=>{this._changeDetectorRef.markForCheck(),this.stateChanges.next();});}ngAfterContentInit(){this._calendarHeaderPortal=new wt$1(this.headerComponent||$a),this.activeDate=this.startAt||this._dateAdapter.today(),this._currentView=this.startView;}ngAfterViewChecked(){this._moveFocusOnNextTick&&(this._moveFocusOnNextTick=false,this.focusActiveCell());}ngOnDestroy(){this._intlChanges.unsubscribe(),this.stateChanges.complete();}ngOnChanges(e){let t=e.minDate&&!this._dateAdapter.sameDate(e.minDate.previousValue,e.minDate.currentValue)?e.minDate:void 0,n=e.maxDate&&!this._dateAdapter.sameDate(e.maxDate.previousValue,e.maxDate.currentValue)?e.maxDate:void 0,r=t||n||e.dateFilter;if(r&&!r.firstChange){let o=this._getCurrentViewComponent();o&&(this._elementRef.nativeElement.contains(Yt$3())&&(this._moveFocusOnNextTick=true),this._changeDetectorRef.detectChanges(),o._init());}this.stateChanges.next();}focusActiveCell(){this._getCurrentViewComponent()?._focusActiveCell(false);}updateTodaysDate(){this._getCurrentViewComponent()?._init();}_dateSelected(e){let t=e.value;(this.selected instanceof Y||t&&!this._dateAdapter.sameDate(t,this.selected))&&this.selectedChange.emit(t),this._userSelection.emit(e);}_yearSelectedInMultiYearView(e){this.yearSelected.emit(e);}_monthSelectedInYearView(e){this.monthSelected.emit(e);}_goToDateInView(e,t){this.activeDate=e,this.currentView=t;}_dragStarted(e){this._activeDrag=e;}_dragEnded(e){this._activeDrag&&(e.value&&this._userDragDrop.emit(e),this._activeDrag=null);}_getCurrentViewComponent(){return this.monthView||this.yearView||this.multiYearView}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-calendar"]],viewQuery:function(t,n){if(t&1&&Ep(Ba,5)(La,5)(Na,5),t&2){let r;TI(r=bI())&&(n.monthView=r.first),TI(r=bI())&&(n.yearView=r.first),TI(r=bI())&&(n.multiYearView=r.first);}},hostAttrs:[1,"mat-calendar"],inputs:{headerComponent:"headerComponent",startAt:"startAt",startView:"startView",selected:"selected",minDate:"minDate",maxDate:"maxDate",dateFilter:"dateFilter",dateClass:"dateClass",comparisonStart:"comparisonStart",comparisonEnd:"comparisonEnd",startDateAccessibleName:"startDateAccessibleName",endDateAccessibleName:"endDateAccessibleName"},outputs:{selectedChange:"selectedChange",yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",_userSelection:"_userSelection",_userDragDrop:"_userDragDrop"},exportAs:["matCalendar"],features:[iD([Ha]),im],decls:5,vars:2,consts:[[3,"cdkPortalOutlet"],["cdkMonitorSubtreeFocus","","tabindex","-1",1,"mat-calendar-content"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","_userSelection","dragStarted","dragEnded","activeDate","selected","dateFilter","maxDate","minDate","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName","activeDrag"],[3,"activeDateChange","monthSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"],[3,"activeDateChange","yearSelected","selectedChange","activeDate","selected","dateFilter","maxDate","minDate","dateClass"]],template:function(t,n){if(t&1&&(tp(0,or,0,0,"ng-template",0),ii$1(1,"div",1),iI(2,sr,1,11,"mat-month-view",2)(3,lr,1,6,"mat-year-view",3)(4,dr,1,6,"mat-multi-year-view",3),wc()),t&2){let r;cp("cdkPortalOutlet",n._calendarHeaderPortal),ky(2),sI((r=n.currentView)==="month"?2:r==="year"?3:r==="multi-year"?4:-1);}},dependencies:[_i$1,ns,Ba,La,Na],styles:[`.mat-calendar {
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
`],encapsulation:2})}return a})(),yr=new N("mat-datepicker-scroll-strategy",{providedIn:"root",factory:()=>{let a=D(me);return ()=>kt(a)}}),qa=(()=>{class a{_elementRef=D(mr$1);_animationsDisabled=ct();_changeDetectorRef=D(QL);_globalModel=D(nt);_dateAdapter=D(l);_ngZone=D(Se);_rangeSelectionStrategy=D(ja,{optional:true});_stateChanges;_model;_eventCleanups;_animationFallback;_calendar;color;datepicker;comparisonStart=null;comparisonEnd=null;startDateAccessibleName=null;endDateAccessibleName=null;_isAbove=false;_animationDone=new te;_isAnimating=false;_closeButtonText;_closeButtonFocused=false;_actionsPortal=null;_dialogLabelId=null;constructor(){if(D(q).load(ht),this._closeButtonText=D($e).closeCalendarLabel,!this._animationsDisabled){let e=this._elementRef.nativeElement,t=D(jv);this._eventCleanups=this._ngZone.runOutsideAngular(()=>[t.listen(e,"animationstart",this._handleAnimationEvent),t.listen(e,"animationend",this._handleAnimationEvent),t.listen(e,"animationcancel",this._handleAnimationEvent)]);}}ngAfterViewInit(){this._stateChanges=this.datepicker.stateChanges.subscribe(()=>{this._changeDetectorRef.markForCheck();}),this._calendar.focusActiveCell();}ngOnDestroy(){clearTimeout(this._animationFallback),this._eventCleanups?.forEach(e=>e()),this._stateChanges?.unsubscribe(),this._animationDone.complete();}_handleUserSelection(e){let t=this._model.selection,n=e.value,r=t instanceof Y;if(r&&this._rangeSelectionStrategy){let o=this._rangeSelectionStrategy.selectionFinished(n,t,e.event);this._model.updateSelection(o,this);}else n&&(r||!this._dateAdapter.sameDate(n,t))&&this._model.add(n);(!this._model||this._model.isComplete())&&!this._actionsPortal&&this.datepicker.close();}_handleUserDragDrop(e){this._model.updateSelection(e.value,this);}_startExitAnimation(){this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit"),this._animationsDisabled?this._animationDone.next():(clearTimeout(this._animationFallback),this._animationFallback=setTimeout(()=>{this._isAnimating||this._animationDone.next();},200));}_handleAnimationEvent=e=>{let t=this._elementRef.nativeElement;e.target!==t||!e.animationName.startsWith("_mat-datepicker-content")||(clearTimeout(this._animationFallback),this._isAnimating=e.type==="animationstart",t.classList.toggle("mat-datepicker-content-animating",this._isAnimating),this._isAnimating||this._animationDone.next());};_getSelected(){return this._model.selection}_applyPendingSelection(){this._model!==this._globalModel&&this._globalModel.updateSelection(this._model.selection,this);}_assignActions(e,t){this._model=e?this._globalModel.clone():this._globalModel,this._actionsPortal=e,t&&this._changeDetectorRef.detectChanges();}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-datepicker-content"]],viewQuery:function(t,n){if(t&1&&Ep(Sn,5),t&2){let r;TI(r=bI())&&(n._calendar=r.first);}},hostAttrs:[1,"mat-datepicker-content"],hostVars:6,hostBindings:function(t,n){t&2&&(FI(n.color?"mat-"+n.color:""),Cp("mat-datepicker-content-touch",n.datepicker.touchUi)("mat-datepicker-content-animations-enabled",!n._animationsDisabled));},inputs:{color:"color"},exportAs:["matDatepickerContent"],decls:5,vars:26,consts:[["cdkTrapFocus","","role","dialog",1,"mat-datepicker-content-container"],[3,"yearSelected","monthSelected","viewChanged","_userSelection","_userDragDrop","id","startAt","startView","minDate","maxDate","dateFilter","headerComponent","selected","dateClass","comparisonStart","comparisonEnd","startDateAccessibleName","endDateAccessibleName"],[3,"cdkPortalOutlet"],["type","button","matButton","elevated",1,"mat-datepicker-close-button",3,"focus","blur","click","color"]],template:function(t,n){t&1&&(ii$1(0,"div",0)(1,"mat-calendar",1),gp("yearSelected",function(o){return n.datepicker._selectYear(o)})("monthSelected",function(o){return n.datepicker._selectMonth(o)})("viewChanged",function(o){return n.datepicker._viewChanged(o)})("_userSelection",function(o){return n._handleUserSelection(o)})("_userDragDrop",function(o){return n._handleUserDragDrop(o)}),wc(),tp(2,cr,0,0,"ng-template",2),ii$1(3,"button",3),gp("focus",function(){return n._closeButtonFocused=true})("blur",function(){return n._closeButtonFocused=false})("click",function(){return n.datepicker.close()}),QI(4),wc()()),t&2&&(Cp("mat-datepicker-content-container-with-custom-header",n.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions",n._actionsPortal),ap("aria-modal",true)("aria-labelledby",n._dialogLabelId??void 0),ky(),FI(n.datepicker.panelClass),cp("id",n.datepicker.id)("startAt",n.datepicker.startAt)("startView",n.datepicker.startView)("minDate",n.datepicker._getMinDate())("maxDate",n.datepicker._getMaxDate())("dateFilter",n.datepicker._getDateFilter())("headerComponent",n.datepicker.calendarHeaderComponent)("selected",n._getSelected())("dateClass",n.datepicker.dateClass)("comparisonStart",n.comparisonStart)("comparisonEnd",n.comparisonEnd)("startDateAccessibleName",n.startDateAccessibleName)("endDateAccessibleName",n.endDateAccessibleName),ky(),cp("cdkPortalOutlet",n._actionsPortal),ky(),Cp("cdk-visually-hidden",!n._closeButtonFocused),cp("color",n.color||"primary"),ky(),Ap(n._closeButtonText));},dependencies:[ms,Sn,_i$1,ha],styles:[`@keyframes _mat-datepicker-content-dropdown-enter {
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
`],encapsulation:2})}return a})(),Ya=(()=>{class a{_injector=D(me);_viewContainerRef=D(Ii$1);_dateAdapter=D(l,{optional:true});_dir=D(Is,{optional:true});_model=D(nt);_animationsDisabled=ct();_scrollStrategy=D(yr);_inputStateChanges=U$1.EMPTY;_document=D(tr$1);calendarHeaderComponent;get startAt(){return this._startAt||(this.datepickerInput?this.datepickerInput.getStartValue():null)}set startAt(e){this._startAt=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));}_startAt=null;startView="month";get color(){return this._color||(this.datepickerInput?this.datepickerInput.getThemePalette():void 0)}set color(e){this._color=e;}_color;touchUi=false;get disabled(){return this._disabled===void 0&&this.datepickerInput?this.datepickerInput.disabled:!!this._disabled}set disabled(e){e!==this._disabled&&(this._disabled=e,this.stateChanges.next(void 0));}_disabled;xPosition="start";yPosition="below";restoreFocus=true;yearSelected=new $e$2;monthSelected=new $e$2;viewChanged=new $e$2(true);dateClass;openedStream=new $e$2;closedStream=new $e$2;get panelClass(){return this._panelClass}set panelClass(e){this._panelClass=Hl(e);}_panelClass;get opened(){return this._opened}set opened(e){e?this.open():this.close();}_opened=false;id=D(nn).getId("mat-datepicker-");_getMinDate(){return this.datepickerInput&&this.datepickerInput.min}_getMaxDate(){return this.datepickerInput&&this.datepickerInput.max}_getDateFilter(){return this.datepickerInput&&this.datepickerInput.dateFilter}_overlayRef=null;_componentRef=null;_focusedElementBeforeOpen=null;_backdropHarnessClass=`${this.id}-backdrop`;_actionsPortal=null;datepickerInput;stateChanges=new te;_changeDetectorRef=D(QL);constructor(){this._dateAdapter,this._model.selectionChanged.subscribe(()=>{this._changeDetectorRef.markForCheck();});}ngOnChanges(e){let t=e.xPosition||e.yPosition;if(t&&!t.firstChange&&this._overlayRef){let n=this._overlayRef.getConfig().positionStrategy;n instanceof at$1&&(this._setConnectedPositions(n),this.opened&&this._overlayRef.updatePosition());}this.stateChanges.next(void 0);}ngOnDestroy(){this._destroyOverlay(),this.close(),this._inputStateChanges.unsubscribe(),this.stateChanges.complete();}select(e){this._model.add(e);}_selectYear(e){this.yearSelected.emit(e);}_selectMonth(e){this.monthSelected.emit(e);}_viewChanged(e){this.viewChanged.emit(e);}registerInput(e){return this.datepickerInput,this._inputStateChanges.unsubscribe(),this.datepickerInput=e,this._inputStateChanges=e.stateChanges.subscribe(()=>this.stateChanges.next(void 0)),this._model}registerActions(e){this._actionsPortal,this._actionsPortal=e,this._componentRef?.instance._assignActions(e,true);}removeActions(e){e===this._actionsPortal&&(this._actionsPortal=null,this._componentRef?.instance._assignActions(null,true));}open(){this._opened||this.disabled||this._componentRef?.instance._isAnimating||(this.datepickerInput,this._focusedElementBeforeOpen=Yt$3(),this._openOverlay(),this._opened=true,this.openedStream.emit());}close(){if(!this._opened||this._componentRef?.instance._isAnimating)return;let e=this.restoreFocus&&this._focusedElementBeforeOpen&&typeof this._focusedElementBeforeOpen.focus=="function",t=()=>{this._opened&&(this._opened=false,this.closedStream.emit());};if(this._componentRef){let{instance:n,location:r}=this._componentRef;n._animationDone.pipe(tn(1)).subscribe(()=>{let o=this._document.activeElement;e&&(!o||o===this._document.activeElement||r.nativeElement.contains(o))&&this._focusedElementBeforeOpen.focus(),this._focusedElementBeforeOpen=null,this._destroyOverlay();}),n._startExitAnimation();}e?setTimeout(t):t();}_applyPendingSelection(){this._componentRef?.instance?._applyPendingSelection();}_forwardContentValues(e){e.datepicker=this,e.color=this.color,e._dialogLabelId=this.datepickerInput.getOverlayLabelId(),e._assignActions(this._actionsPortal,false);}_openOverlay(){this._destroyOverlay();let e=this.touchUi,t=new wt$1(qa,this._viewContainerRef),n=this._overlayRef=Pt(this._injector,new j({positionStrategy:e?this._getDialogStrategy():this._getDropdownStrategy(),hasBackdrop:true,backdropClass:[e?"cdk-overlay-dark-backdrop":"mat-overlay-transparent-backdrop",this._backdropHarnessClass],direction:this._dir||"ltr",scrollStrategy:e?Kt$1(this._injector):this._scrollStrategy(),panelClass:`mat-datepicker-${e?"dialog":"popup"}`,disableAnimations:this._animationsDisabled}));this._getCloseStream(n).subscribe(r=>{r&&r.preventDefault(),this.close();}),n.keydownEvents().subscribe(r=>{let o=r.keyCode;(o===38||o===40||o===37||o===39||o===33||o===34)&&r.preventDefault();}),this._componentRef=n.attach(t),this._forwardContentValues(this._componentRef.instance),e||Ly(()=>{n.updatePosition();},{injector:this._injector});}_destroyOverlay(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=this._componentRef=null);}_getDialogStrategy(){return oe(this._injector).centerHorizontally().centerVertically()}_getDropdownStrategy(){let e=xt(this._injector,this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".mat-datepicker-content").withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition();return this._setConnectedPositions(e)}_setConnectedPositions(e){let t=this.xPosition==="end"?"end":"start",n=t==="start"?"end":"start",r=this.yPosition==="above"?"bottom":"top",o=r==="top"?"bottom":"top";return e.withPositions([{originX:t,originY:o,overlayX:t,overlayY:r},{originX:t,originY:r,overlayX:t,overlayY:o},{originX:n,originY:o,overlayX:n,overlayY:r},{originX:n,originY:r,overlayX:n,overlayY:o}])}_getCloseStream(e){let t=["ctrlKey","shiftKey","metaKey"];return Rh(e.backdropClick(),e.detachments(),e.keydownEvents().pipe(Qt$1(n=>n.keyCode===27&&!Hr(n)||this.datepickerInput&&Hr(n,"altKey")&&n.keyCode===38&&t.every(r=>!Hr(n,r)))))}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,inputs:{calendarHeaderComponent:"calendarHeaderComponent",startAt:"startAt",startView:"startView",color:"color",touchUi:[2,"touchUi","touchUi",YL],disabled:[2,"disabled","disabled",YL],xPosition:"xPosition",yPosition:"yPosition",restoreFocus:[2,"restoreFocus","restoreFocus",YL],dateClass:"dateClass",panelClass:"panelClass",opened:[2,"opened","opened",YL]},outputs:{yearSelected:"yearSelected",monthSelected:"monthSelected",viewChanged:"viewChanged",openedStream:"opened",closedStream:"closed"},features:[im]})}return a})(),Cl=(()=>{class a extends Ya{static \u0275fac=(()=>{let e;return function(n){return (e||(e=Tm(a)))(n||a)}})();static \u0275cmp=OE({type:a,selectors:[["mat-datepicker"]],exportAs:["matDatepicker"],features:[iD([Ha,{provide:Ya,useExisting:a}]),Xf],decls:0,vars:0,template:function(t,n){},encapsulation:2})}return a})(),Ue=class{target;targetElement;value=null;constructor(i,e){this.target=i,this.targetElement=e,this.value=this.target.value;}},Cr=(()=>{class a{_elementRef=D(mr$1);_dateAdapter=D(l,{optional:true});_dateFormats=D(d,{optional:true});_isInitialized=false;get value(){return this._model?this._getValueFromModel(this._model.selection):this._pendingValue}set value(e){this._assignValueProgrammatically(e,true);}_model;get disabled(){return !!this._disabled||this._parentDisabled()}set disabled(e){let t=e,n=this._elementRef.nativeElement;this._disabled!==t&&(this._disabled=t,this.stateChanges.next(void 0)),t&&this._isInitialized&&n.blur&&n.blur();}_disabled;dateChange=new $e$2;dateInput=new $e$2;stateChanges=new te;_onTouched=()=>{};_validatorOnChange=()=>{};_cvaOnChange=()=>{};_valueChangesSubscription=U$1.EMPTY;_localeSubscription=U$1.EMPTY;_pendingValue=null;_parseValidator=()=>this._lastValueValid?null:{matDatepickerParse:{text:this._elementRef.nativeElement.value}};_filterValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value));return !t||this._matchesFilter(t)?null:{matDatepickerFilter:true}};_minValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),n=this._getMinDate();return !n||!t||this._dateAdapter.compareDate(n,t)<=0?null:{matDatepickerMin:{min:n,actual:t}}};_maxValidator=e=>{let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e.value)),n=this._getMaxDate();return !n||!t||this._dateAdapter.compareDate(n,t)>=0?null:{matDatepickerMax:{max:n,actual:t}}};_getValidators(){return [this._parseValidator,this._minValidator,this._maxValidator,this._filterValidator]}_registerModel(e){this._model=e,this._valueChangesSubscription.unsubscribe(),this._pendingValue&&this._assignValue(this._pendingValue),this._valueChangesSubscription=this._model.selectionChanged.subscribe(t=>{if(this._shouldHandleChangeEvent(t)){let n=this._getValueFromModel(t.selection);this._lastValueValid=this._isValidValue(n),this._cvaOnChange(n),this._onTouched(),this._formatValue(n),this.dateInput.emit(new Ue(this,this._elementRef.nativeElement)),this.dateChange.emit(new Ue(this,this._elementRef.nativeElement));}});}_lastValueValid=false;constructor(){this._localeSubscription=this._dateAdapter.localeChanges.subscribe(()=>{this._assignValueProgrammatically(this.value,true);});}ngAfterViewInit(){this._isInitialized=true;}ngOnChanges(e){Dr(e,this._dateAdapter)&&this.stateChanges.next(void 0);}ngOnDestroy(){this._valueChangesSubscription.unsubscribe(),this._localeSubscription.unsubscribe(),this.stateChanges.complete();}registerOnValidatorChange(e){this._validatorOnChange=e;}validate(e){return this._validator?this._validator(e):null}writeValue(e){this._assignValueProgrammatically(e,e!==this.value);}registerOnChange(e){this._cvaOnChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e;}_onKeydown(e){let t=["ctrlKey","shiftKey","metaKey"];Hr(e,"altKey")&&e.keyCode===40&&t.every(r=>!Hr(e,r))&&!this._elementRef.nativeElement.readOnly&&(this._openPopup(),e.preventDefault());}_onInput(e){let t=e.target.value,n=this._lastValueValid,r=this._dateAdapter.parse(t,this._dateFormats.parse.dateInput);this._lastValueValid=this._isValidValue(r),r=this._dateAdapter.getValidDateOrNull(r);let o=!this._dateAdapter.sameDate(r,this.value);!r||o?this._cvaOnChange(r):(t&&!this.value&&this._cvaOnChange(r),n!==this._lastValueValid&&this._validatorOnChange()),o&&(this._assignValue(r),this.dateInput.emit(new Ue(this,this._elementRef.nativeElement)));}_onChange(){this.dateChange.emit(new Ue(this,this._elementRef.nativeElement));}_onBlur(){this.value&&this._formatValue(this.value),this._onTouched();}_formatValue(e){this._elementRef.nativeElement.value=e!=null?this._dateAdapter.format(e,this._dateFormats.display.dateInput):"";}_assignValue(e){this._model?(this._assignValueToModel(e),this._pendingValue=null):this._pendingValue=e;}_isValidValue(e){return !e||this._dateAdapter.isValid(e)}_parentDisabled(){return  false}_assignValueProgrammatically(e,t){e=this._dateAdapter.deserialize(e),this._lastValueValid=this._isValidValue(e),e=this._dateAdapter.getValidDateOrNull(e),this._assignValue(e),t&&this._formatValue(e);}_matchesFilter(e){let t=this._getDateFilter();return !t||t(e)}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,inputs:{value:"value",disabled:[2,"disabled","disabled",YL]},outputs:{dateChange:"dateChange",dateInput:"dateInput"},features:[im]})}return a})();function Dr(a,i){let e=Object.keys(a);for(let t of e){let{previousValue:n,currentValue:r}=a[t];if(i.isDateInstance(n)&&i.isDateInstance(r)){if(!i.sameDate(n,r))return  true}else return  true}return  false}var Mr={provide:Yt$2,useExisting:ao(()=>Wa),multi:true},xr={provide:st,useExisting:ao(()=>Wa),multi:true},Wa=(()=>{class a extends Cr{_formField=D(ue,{optional:true});_closedSubscription=U$1.EMPTY;_openedSubscription=U$1.EMPTY;set matDatepicker(e){e&&(this._datepicker=e,this._ariaOwns.set(e.opened?e.id:null),this._closedSubscription=e.closedStream.subscribe(()=>{this._onTouched(),this._ariaOwns.set(null);}),this._openedSubscription=e.openedStream.subscribe(()=>{this._ariaOwns.set(e.id);}),this._registerModel(e.registerInput(this)));}_datepicker;_ariaOwns=Ft(null);get min(){return this._min}set min(e){let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(t,this._min)||(this._min=t,this._validatorOnChange());}_min=null;get max(){return this._max}set max(e){let t=this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(e));this._dateAdapter.sameDate(t,this._max)||(this._max=t,this._validatorOnChange());}_max=null;get dateFilter(){return this._dateFilter}set dateFilter(e){let t=this._matchesFilter(this.value);this._dateFilter=e,this._matchesFilter(this.value)!==t&&this._validatorOnChange();}_dateFilter;_validator=null;constructor(){super(),this._validator=vt$1.compose(super._getValidators());}getConnectedOverlayOrigin(){return this._formField?this._formField.getConnectedOverlayOrigin():this._elementRef}getOverlayLabelId(){return this._formField?this._formField.getLabelId():this._elementRef.nativeElement.getAttribute("aria-labelledby")}getThemePalette(){return this._formField?this._formField.color:void 0}getStartValue(){return this.value}ngOnDestroy(){super.ngOnDestroy(),this._closedSubscription.unsubscribe(),this._openedSubscription.unsubscribe();}_openPopup(){this._datepicker&&this._datepicker.open();}_getValueFromModel(e){return e}_assignValueToModel(e){this._model&&this._model.updateSelection(e,this);}_getMinDate(){return this._min}_getMaxDate(){return this._max}_getDateFilter(){return this._dateFilter}_shouldHandleChangeEvent(e){return e.source!==this}static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["input","matDatepicker",""]],hostAttrs:[1,"mat-datepicker-input"],hostVars:6,hostBindings:function(t,n){t&1&&gp("input",function(o){return n._onInput(o)})("change",function(){return n._onChange()})("blur",function(){return n._onBlur()})("keydown",function(o){return n._onKeydown(o)}),t&2&&(pp("disabled",n.disabled),ap("aria-haspopup",n._datepicker?"dialog":null)("aria-owns",n._ariaOwns())("min",n.min?n._dateAdapter.toIso8601(n.min):null)("max",n.max?n._dateAdapter.toIso8601(n.max):null)("data-mat-calendar",n._datepicker?n._datepicker.id:null));},inputs:{matDatepicker:"matDatepicker",min:"min",max:"max",dateFilter:[0,"matDatepickerFilter","dateFilter"]},exportAs:["matDatepickerInput"],features:[iD([Mr,xr,{provide:Un,useExisting:a}]),Xf]})}return a})(),kr=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275dir=VE({type:a,selectors:[["","matDatepickerToggleIcon",""]]})}return a})(),wr=(()=>{class a{_intl=D($e);_changeDetectorRef=D(QL);_stateChanges=U$1.EMPTY;datepicker;tabIndex=null;ariaLabel;get disabled(){return this._disabled===void 0&&this.datepicker?this.datepicker.disabled:!!this._disabled}set disabled(e){this._disabled=e;}_disabled;disableRipple=false;_customIcon;_button;constructor(){let e=D(new Up("tabindex"),{optional:true}),t=Number(e);this.tabIndex=t||t===0?t:null;}ngOnChanges(e){e.datepicker&&this._watchStateChanges();}ngOnDestroy(){this._stateChanges.unsubscribe();}ngAfterContentInit(){this._watchStateChanges();}_open(e){this.datepicker&&!this.disabled&&(this.datepicker.open(),e.stopPropagation());}_watchStateChanges(){let e=this.datepicker?this.datepicker.stateChanges:vh(),t=this.datepicker&&this.datepicker.datepickerInput?this.datepicker.datepickerInput.stateChanges:vh(),n=this.datepicker?Rh(this.datepicker.openedStream,this.datepicker.closedStream):vh();this._stateChanges.unsubscribe(),this._stateChanges=Rh(this._intl.changes,e,t,n).subscribe(()=>this._changeDetectorRef.markForCheck());}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["mat-datepicker-toggle"]],contentQueries:function(t,n,r){if(t&1&&vp(r,kr,5),t&2){let o;TI(o=bI())&&(n._customIcon=o.first);}},viewQuery:function(t,n){if(t&1&&Ep(mr,5),t&2){let r;TI(r=bI())&&(n._button=r.first);}},hostAttrs:[1,"mat-datepicker-toggle"],hostVars:8,hostBindings:function(t,n){t&1&&gp("click",function(o){return n._open(o)}),t&2&&(ap("tabindex",null)("data-mat-calendar",n.datepicker?n.datepicker.id:null),Cp("mat-datepicker-toggle-active",n.datepicker&&n.datepicker.opened)("mat-accent",n.datepicker&&n.datepicker.color==="accent")("mat-warn",n.datepicker&&n.datepicker.color==="warn"));},inputs:{datepicker:[0,"for","datepicker"],tabIndex:"tabIndex",ariaLabel:[0,"aria-label","ariaLabel"],disabled:[2,"disabled","disabled",YL],disableRipple:"disableRipple"},exportAs:["matDatepickerToggle"],features:[im],ngContentSelectors:ur,decls:4,vars:7,consts:[["button",""],["matIconButton","","type","button",3,"tabIndex","disabled","disableRipple"],["viewBox","0 0 24 24","width","24px","height","24px","fill","currentColor","focusable","false","aria-hidden","true",1,"mat-datepicker-toggle-default-icon"],["d","M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],template:function(t,n){t&1&&(II(pr),ii$1(0,"button",1,0),iI(2,hr,2,0,":svg:svg",2),DI(3),wc()),t&2&&(cp("tabIndex",n.disabled?-1:n.tabIndex)("disabled",n.disabled)("disableRipple",n.disableRipple),ap("aria-haspopup",n.datepicker?"dialog":null)("aria-label",n.ariaLabel||n._intl.openCalendarLabel)("aria-expanded",n.datepicker?n.datepicker.opened:null),ky(2),sI(n._customIcon?-1:2));},dependencies:[Ui$1],styles:[`.mat-datepicker-toggle {
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
`],encapsulation:2})}return a})();var Dl=(()=>{class a{static \u0275fac=function(t){return new(t||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl$1({providers:[$e],imports:[ba$1,ge,_s,Yt$1,qa,wr,$a,qr,vt]})}return a})();export{Ao as A,Bo as B,Ca as C,Dl as D,Ea as E,Fo as F,Ht as H,Io as I,Je as J,Lo as L,Mo as M,Oo as O,Po as P,Ro as R,So as S,To as T,Ut as U,Vo as V,Wa as W,Eo as a,ba as b,Cl as c,wr as d,Va as e,Da as f,gn as g,jt as h,Ta as i,je as j,ko as k,Pa as l,va as v,wo as w,xo as x,ya as y,zt as z};