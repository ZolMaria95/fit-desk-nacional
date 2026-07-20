import {h as jt,M as Mo,x as xo,w as wo,I as Io,k as ko,V as Vo,e as Va,F as Fo,B as Bo,A as Ao,z as zt,v as va,b as ba$1,D as Dl,c as Cl,W as Wa,d as wr}from'./chunk-EUKKJDIX.js';import {Y,m,a as at}from'./chunk-DSdXJTzV.js';import {J as J$1,Z}from'./chunk-XnmFgT9P.js';import {u}from'./chunk-CNkrQDxP.js';import {K}from'./chunk-D_eKqY8N.js';import {D,Y as Yp,f as ee$1,u as O,$ as $e,F as Ft,K as K$1,aT as ih,O as OE,H as Ht,x as jt$1,N as Nt$1,y as zt$1,V as Vt,aU as J,aV as zt$2,aW as mt,al as mI,i as ii,Q as QI,w as wc,P as Pp,am as Yl,X as XI,an as Kl,W as Wv,a as iI,g as gp,B as lI,r as lp,aX as _I,k as ky,M as Mc,b as Op,z as zv,s as sI,d as cp,E as uI,ak as bp,A as Ap,G as LE,I as Cl$1,a7 as gh,R as qr,bH as Ou,ap as N$1,aG as QL,T as mr,bI as BL,aq as Se,aA as Ir,av as cn,Z as tr,aD as te,ar as ct,a$ as nn$1,aE as $e$1,bJ as bh,ax as me,at as q,au as sh,bK as ht,ay as Rh,b1 as YL,_ as II,a0 as DI,ab as iD,bh as pp,ae as ap,a1 as FI,a2 as Cp,af as Ep,a4 as TI,a5 as bI,a3 as vp,a9 as Tm,ag as VE,aa as Xf,aK as Is,aL as Wo,aN as Qh,b7 as Zh,bL as en$1,aH as Yh,bw as Tc,bx as bc,b9 as KL,bM as ge,bN as It,ah as vt,as as U$1,U as w,bO as Qt$1,bP as np,bQ as at$1,bR as rt,bS as ae$1,b2 as Ii$1,aM as T,aB as jv,e as Wt,b0 as ot,m as Qt$2,bT as vh,h as we,bU as _,bV as xh,b4 as M,aI as Hr,bW as Yt,b6 as Jh,aP as jh,aJ as tn$1,bX as L,bY as Pt,bZ as Mu,b_ as j,b$ as xt,c0 as Ct,c1 as wt$1,b8 as im,v as vI,bi as cI,bn as P,l as Ly,c2 as kt,bg as ao,br as kp,c3 as ur}from'./main-PFC74EX3.js';import {Q as Qt}from'./chunk-h5x9e9VL.js';import {F as Ft$1,R as Rt}from'./chunk-BkSTFTtH.js';import {y as yt,w as wt}from'./chunk-AInMTij0.js';import {K as Ko,a as an$1,Z as Zo,N as Ni$1,c as ba,h as ha,f as fe,j as jn,d as de,e as yo,A as Ar,F as Fr,u as ue,Y as Yt$1}from'./chunk-Ds3yxCqe.js';import {N}from'./chunk-BM_U05Ph.js';var Gi=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Ki=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Qi(a,n){a&1&&(ii(0,"span",3),DI(1,1),wc());}function Ui(a,n){a&1&&(ii(0,"span",6),DI(1,2),wc());}var Yi=["*"];var Xi=new N$1("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Di=new N$1("MatChipAvatar"),Ii=new N$1("MatChipTrailingIcon"),Ai=new N$1("MatChipEdit"),ee=new N$1("MatChipRemove"),Ti=new N$1("MatChip"),Oi=(()=>{class a{_elementRef=D(mr);_parentChip=D(Ti);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(t){this._disabled=t;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){D(q).load(sh),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(e){return new(e||a)};static \u0275dir=VE({type:a,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(e,i){e&2&&(ap("disabled",i._getDisabledAttribute())("aria-disabled",i.disabled),Cp("mdc-evolution-chip__action--primary",i._isPrimary)("mdc-evolution-chip__action--secondary",!i._isPrimary)("mdc-evolution-chip__action--trailing",!i._isPrimary&&!i._isLeading));},inputs:{disabled:[2,"disabled","disabled",YL],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?-1:KL(t)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return a})(),Fi=(()=>{class a extends Oi{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(t){!this.disabled&&this._isPrimary&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Tm(a)))(i||a)}})();static \u0275dir=VE({type:a,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(e,i){e&1&&gp("click",function(r){return i._handleClick(r)})("keydown",function(r){return i._handleKeydown(r)}),e&2&&(ap("tabindex",i._getTabindex()),Cp("mdc-evolution-chip__action--presentational",false));},features:[Xf]})}return a})();var pa=(()=>{class a extends Fi{_isPrimary=false;_handleClick(t){this.disabled||(t.stopPropagation(),t.preventDefault(),this._parentChip.remove());}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&(t.stopPropagation(),t.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Tm(a)))(i||a)}})();static \u0275dir=VE({type:a,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(e,i){e&2&&ap("aria-hidden",null);},features:[iD([{provide:ee,useExisting:a}]),Xf]})}return a})(),ne=(()=>{class a{_changeDetectorRef=D(QL);_elementRef=D(mr);_tagName=D(BL);_ngZone=D(Se);_focusMonitor=D(Ir);_globalRippleOptions=D(cn,{optional:true});_document=D(tr);_onFocus=new te;_onBlur=new te;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=ct();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=D(nn$1).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(t){this._value=t;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(t){this._disabled=t;}_disabled=false;removed=new $e$1;destroyed=new $e$1;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=D(bh);_injector=D(me);constructor(){let t=D(q);t.load(sh),t.load(ht),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Rh(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(t){(t.keyCode===8&&!t.repeat||t.keyCode===46)&&(t.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(t){return this._getActions().find(e=>{let i=e._elementRef.nativeElement;return i===t||i.contains(t)})}_getActions(){let t=[];return this.editIcon&&t.push(this.editIcon),this.primaryAction&&t.push(this.primaryAction),this.removeIcon&&t.push(this.removeIcon),t}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(t){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(t=>{let e=t!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(e,i,o){if(e&1&&vp(o,Di,5)(o,Ai,5)(o,Ii,5)(o,ee,5)(o,Di,5)(o,Ii,5)(o,Ai,5)(o,ee,5),e&2){let r;TI(r=bI())&&(i.leadingIcon=r.first),TI(r=bI())&&(i.editIcon=r.first),TI(r=bI())&&(i.trailingIcon=r.first),TI(r=bI())&&(i.removeIcon=r.first),TI(r=bI())&&(i._allLeadingIcons=r),TI(r=bI())&&(i._allTrailingIcons=r),TI(r=bI())&&(i._allEditIcons=r),TI(r=bI())&&(i._allRemoveIcons=r);}},viewQuery:function(e,i){if(e&1&&Ep(Fi,5),e&2){let o;TI(o=bI())&&(i.primaryAction=o.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(e,i){e&1&&gp("keydown",function(r){return i._handleKeydown(r)}),e&2&&(pp("id",i.id),ap("role",i.role)("aria-label",i.ariaLabel),FI("mat-"+(i.color||"primary")),Cp("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",i.leadingIcon)("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-basic-chip",i._isBasicChip)("mat-mdc-standard-chip",!i._isBasicChip)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon())("_mat-animation-noopable",i._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",YL],highlighted:[2,"highlighted","highlighted",YL],disableRipple:[2,"disableRipple","disableRipple",YL],disabled:[2,"disabled","disabled",YL]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[iD([{provide:Ti,useExisting:a}])],ngContentSelectors:Ki,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(e,i){e&1&&(II(Gi),lp(0,"span",0),ii(1,"span",1)(2,"span",2),iI(3,Qi,2,0,"span",3),ii(4,"span",4),DI(5),lp(6,"span",5),wc()()(),iI(7,Ui,2,0,"span",6)),e&2&&(ky(3),sI(i.leadingIcon?3:-1),ky(4),sI(i._hasTrailingIcon()?7:-1));},dependencies:[Oi],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return a})();var Pi=(()=>{class a{_elementRef=D(mr);_changeDetectorRef=D(QL);_dir=D(Is,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new te;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(t=>t._onFocus)}get chipDestroyedChanges(){return this._getChipStream(t=>t.destroyed)}get chipRemovedChanges(){return this._getChipStream(t=>t.removed)}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(t){this._explicitRole=t;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Wo;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(t=>t._hasFocus())}_syncChipsState(){this._chips?.forEach(t=>{t._chipListDisabled=this._disabled,t._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(t){this._originatesFromChip(t)&&this._keyManager.onKeydown(t);}_isValidIndex(t){return t>=0&&t<this._chips.length}_allowFocusEscape(){let t=this._elementRef.nativeElement.tabIndex;t!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=t));}_getChipStream(t){return this._chips.changes.pipe(Qh(null),Zh(()=>Rh(...this._chips.map(t))))}_originatesFromChip(t){let e=t.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-mdc-chip"))return  true;e=e.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Qh(this._chips)).subscribe(t=>{let e=[];t.forEach(i=>i._getActions().forEach(o=>e.push(o))),this._chipActions.reset(e),this._chipActions.notifyOnChanges();}),this._keyManager=new en$1(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(t=>this._skipPredicate(t)),this.chipFocusChanges.pipe(Yh(this._destroyed)).subscribe(({chip:t})=>{let e=t._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e);}),this._dir?.change.pipe(Yh(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t));}_skipPredicate(t){return t.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Qh(null),Yh(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Yh(this._destroyed)).subscribe(t=>{let i=this._chips.toArray().indexOf(t.chip),o=t.chip._hasFocus(),r=t.chip._hadFocusOnRemove&&this._keyManager.activeItem&&t.chip._getActions().includes(this._keyManager.activeItem),A=o||r;this._isValidIndex(i)&&A&&(this._lastDestroyedFocusedChipIndex=i);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let t=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[t];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["mat-chip-set"]],contentQueries:function(e,i,o){if(e&1&&vp(o,ne,5),e&2){let r;TI(r=bI())&&(i._chips=r);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(e,i){e&1&&gp("keydown",function(r){return i._handleKeydown(r)}),e&2&&ap("role",i.role);},inputs:{disabled:[2,"disabled","disabled",YL],role:"role",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:KL(t)]},ngContentSelectors:Yi,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,i){e&1&&(II(),Tc(0,"div",0),DI(1),bc());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return a})();var Ri=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl$1({providers:[Ou,{provide:Xi,useValue:{separatorKeyCodes:[13]}}],imports:[gh,qr]})}return a})();var tn=["panel"],en=["*"];function nn(a,n){if(a&1&&(Tc(0,"div",1,0),DI(2),bc()),a&2){let t=n.id,e=vI();FI(e._classList),Cp("mat-mdc-autocomplete-visible",e.showPanel)("mat-mdc-autocomplete-hidden",!e.showPanel)("mat-autocomplete-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._color==="primary")("mat-accent",e._color==="accent")("mat-warn",e._color==="warn"),pp("id",e.id),ap("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby(t));}}var ae=class{source;option;constructor(n,t){this.source=n,this.option=t;}},Vi=new N$1("mat-autocomplete-default-options",{providedIn:"root",factory:()=>({autoActiveFirstOption:false,autoSelectActiveOption:false,hideSingleSelectionIndicator:false,requireSelection:false,hasBackdrop:false})}),Ni=(()=>{class a{_changeDetectorRef=D(QL);_elementRef=D(mr);_defaults=D(Vi);_animationsDisabled=ct();_activeOptionChanges=U$1.EMPTY;_keyManager;showPanel=false;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=false;_latestOpeningTrigger;_setColor(t){this._color=t,this._changeDetectorRef.markForCheck();}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=false;optionSelected=new $e$1;opened=new $e$1;closed=new $e$1;optionActivated=new $e$1;set classList(t){this._classList=t,this._elementRef.nativeElement.className="";}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._syncParentProperties();}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let t of this.options)t._changeDetectorRef.markForCheck();}id=D(nn$1).getId("mat-autocomplete-");inertGroups;constructor(){let t=D(w);this.inertGroups=t?.SAFARI||false,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??false;}ngAfterContentInit(){this._keyManager=new Qt$1(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(t=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[t]||null});}),this._setVisibility();}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe();}_setScrollTop(t){this.panel&&(this.panel.nativeElement.scrollTop=t);}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck();}_emitSelectEvent(t){let e=new ae(this,t);this.optionSelected.emit(e);}_getPanelAriaLabelledby(t){if(this.ariaLabel)return null;let e=t?t+" ":"";return this.ariaLabelledby?e+this.ariaLabelledby:t}_skipPredicate(){return  false}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=OE({type:a,selectors:[["mat-autocomplete"]],contentQueries:function(e,i,o){if(e&1&&vp(o,J,5)(o,rt,5),e&2){let r;TI(r=bI())&&(i.options=r),TI(r=bI())&&(i.optionGroups=r);}},viewQuery:function(e,i){if(e&1&&Ep(ur,7)(tn,5),e&2){let o;TI(o=bI())&&(i.template=o.first),TI(o=bI())&&(i.panel=o.first);}},hostAttrs:[1,"mat-mdc-autocomplete"],inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],displayWith:"displayWith",autoActiveFirstOption:[2,"autoActiveFirstOption","autoActiveFirstOption",YL],autoSelectActiveOption:[2,"autoSelectActiveOption","autoSelectActiveOption",YL],requireSelection:[2,"requireSelection","requireSelection",YL],panelWidth:"panelWidth",disableRipple:[2,"disableRipple","disableRipple",YL],classList:[0,"class","classList"],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",YL]},outputs:{optionSelected:"optionSelected",opened:"opened",closed:"closed",optionActivated:"optionActivated"},exportAs:["matAutocomplete"],features:[iD([{provide:at$1,useExisting:a}])],ngContentSelectors:en,decls:1,vars:0,consts:[["panel",""],["role","listbox",1,"mat-mdc-autocomplete-panel","mdc-menu-surface","mdc-menu-surface--open",3,"id"]],template:function(e,i){e&1&&(II(),np(0,nn,3,17,"ng-template"));},styles:[`div.mat-mdc-autocomplete-panel {
  width: 100%;
  max-height: 256px;
  visibility: hidden;
  transform-origin: center top;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  position: relative;
  border-radius: var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));
  box-shadow: var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  background-color: var(--mat-autocomplete-background-color, var(--mat-sys-surface-container));
}
@media (forced-colors: active) {
  div.mat-mdc-autocomplete-panel {
    outline: solid 1px;
  }
}
.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transform-origin: center bottom;
}
div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible {
  visibility: visible;
}

div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,
.cdk-overlay-pane:has(> .mat-mdc-autocomplete-hidden) {
  visibility: hidden;
  pointer-events: none;
}

@keyframes _mat-autocomplete-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.mat-autocomplete-panel-animations-enabled {
  animation: _mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}

mat-autocomplete {
  display: none;
}
`],encapsulation:2})}return a})();var an={provide:Yt$1,useExisting:ao(()=>oe),multi:true};var on=new N$1("mat-autocomplete-scroll-strategy",{providedIn:"root",factory:()=>{let a=D(me);return ()=>kt(a)}}),oe=(()=>{class a{_environmentInjector=D(ae$1);_element=D(mr);_injector=D(me);_viewContainerRef=D(Ii$1);_zone=D(Se);_changeDetectorRef=D(QL);_dir=D(Is,{optional:true});_formField=D(ue,{optional:true,host:true});_viewportRuler=D(T);_scrollStrategy=D(on);_renderer=D(jv);_animationsDisabled=ct();_defaults=D(Vi,{optional:true});_overlayRef=null;_portal;_componentDestroyed=false;_initialized=new te;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=false;_closingActionsSubscription;_viewportSubscription=U$1.EMPTY;_breakpointObserver=D(Wt);_handsetLandscapeSubscription=U$1.EMPTY;_canOpenOnNextFocus=true;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new te;_overlayPanelClass=ot(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus();};_onChange=()=>{};_onTouched=()=>{};autocomplete;position="auto";connectedTo;autocompleteAttribute="off";autocompleteDisabled=false;_aboveClass="mat-mdc-autocomplete-panel-above";ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen("window","blur",this._windowBlurHandler);}ngOnChanges(t){t.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition());}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=true,this._destroyPanel(),this._closeKeyEventStream.complete();}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=false;openPanel(){this._openPanelInternal();}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit();}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=false,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=false,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges());}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition();}get panelClosingActions(){return Rh(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(Qt$2(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(Qt$2(()=>this._overlayAttached)):vh()).pipe(we(t=>t instanceof _?t:null))}optionSelections=xh(()=>{let t=this.autocomplete?this.autocomplete.options:null;return t?t.changes.pipe(Qh(t),Zh(()=>Rh(...t.map(e=>e.onSelectionChange)))):this._initialized.pipe(Zh(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new M(t=>{let e=o=>{let r=P(o),A=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,re=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&r!==this._element.nativeElement&&!this._hasFocus()&&(!A||!A.contains(r))&&(!re||!re.contains(r))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(r)&&t.next(o);},i=[this._renderer.listen("document","click",e),this._renderer.listen("document","auxclick",e),this._renderer.listen("document","touchend",e)];return ()=>{i.forEach(o=>o());}})}writeValue(t){Promise.resolve(null).then(()=>this._assignOptionValue(t));}registerOnChange(t){this._onChange=t;}registerOnTouched(t){this._onTouched=t;}setDisabledState(t){this._element.nativeElement.disabled=t;}_handleKeydown(t){let e=t,i=e.keyCode,o=Hr(e);if(i===27&&!o&&e.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&i===13&&this.panelOpen&&!o)this.activeOption._selectViaInteraction(),this._resetActiveItem(),e.preventDefault();else if(this.autocomplete){let r=this.autocomplete._keyManager.activeItem,A=i===38||i===40;i===9||A&&!o&&this.panelOpen?this.autocomplete._keyManager.onKeydown(e):A&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(A||this.autocomplete._keyManager.activeItem!==r)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)));}}_handleInput(t){let e=t.target,i=e.value;if(e.type==="number"&&(i=i==""?null:parseFloat(i)),this._previousValue!==i){if(this._previousValue=i,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(i),!i)this._clearPreviousSelectedOption(null,false);else if(this.panelOpen&&!this.autocomplete.requireSelection){let o=this.autocomplete.options?.find(r=>r.selected);if(o){let r=this._getDisplayValue(o.value);i!==r&&o.deselect(false);}}if(this._canOpen()&&this._hasFocus()){let o=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(o);}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(true)):this._canOpenOnNextFocus=true;}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal();}_hasFocus(){return Yt()===this._element.nativeElement}_floatLabel(t=false){this._formField&&this._formField.floatLabel==="auto"&&(t?this._formField._animateAndLockLabel():this._formField.floatLabel="always",this._manuallyFloatingLabel=true);}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel="auto"),this._manuallyFloatingLabel=false);}_subscribeToClosingActions(){let t=new M(i=>{Ly(()=>{i.next();},{injector:this._environmentInjector});}),e=this.autocomplete.options?.changes.pipe(Jh(()=>this._positionStrategy.reapplyLastPosition()),jh(0))??vh();return Rh(t,e).pipe(Zh(()=>this._zone.run(()=>{let i=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),i!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),tn$1(1)).subscribe(i=>this._setValueAndClose(i))}_emitOpened(){this.autocomplete.opened.emit();}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null);}_getDisplayValue(t){let e=this.autocomplete;return e&&e.displayWith?e.displayWith(t):t}_assignOptionValue(t){let e=this._getDisplayValue(t);t==null&&this._clearPreviousSelectedOption(null,false),this._updateNativeInputValue(e??"");}_updateNativeInputValue(t){this._formField?this._formField._control.value=t:this._element.nativeElement.value=t,this._previousValue=t;}_setValueAndClose(t){let e=this.autocomplete,i=t?t.source:this._pendingAutoselectedOption;i?(this._clearPreviousSelectedOption(i),this._assignOptionValue(i.value),this._onChange(i.value),e._emitSelectEvent(i),this._element.nativeElement.focus()):e.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel();}_clearPreviousSelectedOption(t,e){this.autocomplete?.options?.forEach(i=>{i!==t&&i.selected&&i.deselect(e);});}_openPanelInternal(t=this._element.nativeElement.value){this._attachOverlay(t),this._floatLabel();}_attachOverlay(t){if(!this.autocomplete)return;let e=this._overlayRef;e?(this._positionStrategy.setOrigin(this._getConnectedElement()),e.updateSize({width:this._getPanelWidth()})):(this._portal=new L(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),e=Pt(this._injector,this._getOverlayConfig()),this._overlayRef=e,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&e&&e.updateSize({width:this._getPanelWidth()});}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(Mu.HandsetLandscape).subscribe(o=>{o.matches?this._positionStrategy.withFlexibleDimensions(true).withGrowAfterOpen(true).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(false).withGrowAfterOpen(false).withViewportMargin(0);})),e&&!e.hasAttached()&&(e.attach(this._portal),this._valueOnAttach=t,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let i=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=true,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this.panelOpen&&i!==this.panelOpen&&this._emitOpened();}_handlePanelKeydown=t=>{(t.keyCode===27&&!Hr(t)||t.keyCode===38&&Hr(t,"altKey"))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??""),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),t.stopPropagation(),t.preventDefault());};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let t=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=t.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=t.outsidePointerEvents().subscribe());}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0;}_getOverlayConfig(){return new j({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let t=xt(this._injector,this._getConnectedElement()).withFlexibleDimensions(false).withPush(false).withPopoverLocation("inline");return this._setStrategyPositions(t),this._positionStrategy=t,t}_setStrategyPositions(t){let e=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],i=this._aboveClass,o=[{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:i},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:i}],r;this.position==="above"?r=o:this.position==="below"?r=e:r=[...e,...o],t.withPositions(r);}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let t=this.autocomplete;if(t.autoActiveFirstOption){let e=-1;for(let i=0;i<t.options.length;i++)if(!t.options.get(i).disabled){e=i;break}t._keyManager.setActiveItem(e);}else t._keyManager.setActiveItem(-1);}_canOpen(){let t=this._element.nativeElement;return !t.readOnly&&!t.disabled&&!this.autocompleteDisabled}_scrollToOption(t){let e=this.autocomplete,i=Ct(t,e.options,e.optionGroups);if(t===0&&i===1)e._setScrollTop(0);else if(e.panel){let o=e.options.toArray()[t];if(o){let r=o._getHostElement(),A=wt$1(r.offsetTop,r.offsetHeight,e._getScrollTop(),e.panel.nativeElement.offsetHeight);e._setScrollTop(A);}}}static \u0275fac=function(e){return new(e||a)};static \u0275dir=VE({type:a,selectors:[["input","matAutocomplete",""],["textarea","matAutocomplete",""]],hostAttrs:[1,"mat-mdc-autocomplete-trigger"],hostVars:7,hostBindings:function(e,i){e&1&&gp("focusin",function(){return i._handleFocus()})("blur",function(){return i._onTouched()})("input",function(r){return i._handleInput(r)})("keydown",function(r){return i._handleKeydown(r)})("click",function(){return i._handleClick()}),e&2&&ap("autocomplete",i.autocompleteAttribute)("role",i.autocompleteDisabled?null:"combobox")("aria-autocomplete",i.autocompleteDisabled?null:"list")("aria-activedescendant",i.panelOpen&&i.activeOption?i.activeOption.id:null)("aria-expanded",i.autocompleteDisabled?null:i.panelOpen.toString())("aria-controls",i.autocompleteDisabled||!i.panelOpen?null:i.autocomplete?.id)("aria-haspopup",i.autocompleteDisabled?null:"listbox");},inputs:{autocomplete:[0,"matAutocomplete","autocomplete"],position:[0,"matAutocompletePosition","position"],connectedTo:[0,"matAutocompleteConnectedTo","connectedTo"],autocompleteAttribute:[0,"autocomplete","autocompleteAttribute"],autocompleteDisabled:[2,"matAutocompleteDisabled","autocompleteDisabled",YL]},exportAs:["matAutocompleteTrigger"],features:[iD([an]),im]})}return a})(),Hi=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=LE({type:a});static \u0275inj=Cl$1({imports:[ge,It,vt,It,qr]})}return a})();var qi=(a,n)=>n.id;function un(a,n){if(a&1&&(ii(0,"mat-option",10),QI(1),wc()),a&2){let t=n.$implicit;cp("value",t.id),ky(),Ap(t.nombre);}}function _n(a,n){if(a&1){let t=mI();ii(0,"mat-form-field",2)(1,"mat-label"),QI(2,"Equipo destino sugerido (opcional)"),wc(),ii(3,"mat-select",3),Pp("ngModelChange",function(i){Yl(t);let o=vI();return XI(o.equipoDestinoId,i)||(o.equipoDestinoId=i),Kl(i)}),ii(4,"mat-option",10),QI(5,"\u2014 Que decida el responsable \u2014"),wc(),lI(6,un,2,2,"mat-option",10,qi),wc(),Wv(),wc();}if(a&2){let t=vI();ky(3),Op("ngModel",t.equipoDestinoId),zv(),ky(),cp("value",null),ky(2),uI(t.destinos());}}function gn(a,n){if(a&1&&(ii(0,"mat-option",10),QI(1),wc()),a&2){let t=n.$implicit;cp("value",t.id),ky(),kp("",t.name," \xB7 ",t.id);}}function fn(a,n){if(a&1){let t=mI();ii(0,"mat-form-field",2)(1,"mat-label"),QI(2,"Persona sugerida (opcional)"),wc(),ii(3,"mat-select",3),Pp("ngModelChange",function(i){Yl(t);let o=vI();return XI(o.asignadoHid,i)||(o.asignadoHid=i),Kl(i)}),ii(4,"mat-option",10),QI(5,"\u2014 Que decida el responsable \u2014"),wc(),lI(6,gn,2,3,"mat-option",10,qi),wc(),Wv(),wc();}if(a&2){let t=vI();ky(3),Op("ngModel",t.asignadoHid),zv(),ky(),cp("value",null),ky(2),uI(t.usuarios());}}var Nt=class a{svc=D(m);adminApi=D(u);helpdesk=D(K);snack=D(Qt);ref=D(O);data=D($e);tipo="REASIGNACION";equipoDestinoId=null;asignadoHid=null;motivo="";busy=Ft(false);equipos=Ft([]);destinos=K$1(()=>this.equipos().filter(n=>n.activo&&n.codigo!==this.data.boardCodigo));usuarios=Ft(this.helpdesk.hdUsers());constructor(){this.adminApi.equipos().then(n=>this.equipos.set(n)).catch(()=>{}),this.helpdesk.getHdUsers().then(n=>this.usuarios.set(n)).catch(()=>{});}async enviar(){if(!(!this.motivo.trim()||this.busy())){this.busy.set(true);try{await this.svc.crearSolicitud({tareaCodigo:this.data.tareaCodigo,tipo:this.tipo,motivo:this.motivo.trim(),equipoDestinoId:this.tipo==="TRANSFERENCIA"?this.equipoDestinoId??void 0:void 0,asignadoSugeridoHid:this.tipo==="REASIGNACION"?this.asignadoHid??void 0:void 0}),this.snack.open("Solicitud enviada al Responsable de Equipo.","OK",{duration:4e3}),this.ref.close(!0);}catch(n){this.snack.open(at(n,"No se pudo enviar la solicitud."),"OK",{duration:5e3});}finally{this.busy.set(false);}}}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["app-escalar-dialog"]],decls:27,vars:5,consts:[["mat-dialog-title",""],[1,"hint"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","REASIGNACION"],["value","TRANSFERENCIA"],["matInput","","rows","3","placeholder","Explica por qu\xE9\u2026",3,"ngModelChange","ngModel"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click","disabled"],[3,"value"]],template:function(t,e){t&1&&(ii(0,"h2",0),QI(1,"Escalar solicitud"),wc(),ii(2,"mat-dialog-content")(3,"p",1),QI(4," Pides al Responsable de Equipo que act\xFAe sobre "),ii(5,"strong"),QI(6),wc(),QI(7,". \xC9l decide y ejecuta. "),wc(),ii(8,"mat-form-field",2)(9,"mat-label"),QI(10,"Tipo de solicitud"),wc(),ii(11,"mat-select",3),Pp("ngModelChange",function(o){return XI(e.tipo,o)||(e.tipo=o),o}),ii(12,"mat-option",4),QI(13,"Reasignar a otra persona"),wc(),ii(14,"mat-option",5),QI(15,"Transferir a otro equipo"),wc()(),Wv(),wc(),iI(16,_n,8,2,"mat-form-field",2)(17,fn,8,2,"mat-form-field",2),ii(18,"mat-form-field",2)(19,"mat-label"),QI(20,"Motivo"),wc(),ii(21,"textarea",6),Pp("ngModelChange",function(o){return XI(e.motivo,o)||(e.motivo=o),o}),wc(),Wv(),wc()(),ii(22,"mat-dialog-actions",7)(23,"button",8),QI(24,"Cancelar"),wc(),ii(25,"button",9),gp("click",function(){return e.enviar()}),QI(26,"Enviar solicitud"),wc()()),t&2&&(ky(6),Ap(e.data.tareaCodigo),ky(5),Op("ngModel",e.tipo),zv(),ky(5),sI(e.tipo==="TRANSFERENCIA"?16:17),ky(5),Op("ngModel",e.motivo),zv(),ky(4),cp("disabled",!e.motivo.trim()||e.busy()));},dependencies:[Ko,an$1,Zo,Ni$1,Ht,jt$1,Nt$1,zt$1,Vt,ba,ha,fe,jn,de,Ar,Fr,Ft$1,Rt,J],styles:[".full[_ngcontent-%COMP%]{width:100%}.hint[_ngcontent-%COMP%]{margin:0 0 12px;color:var(--mat-sys-on-surface-variant, #666);font-size:.9rem}"]})};var zi=(a,n)=>n.id;function vn(a,n){if(a&1&&(ii(0,"mat-option",14),QI(1),wc()),a&2){let t=n.$implicit;cp("value",t),ky(),Ap(t.name);}}function yn(a,n){a&1&&(ii(0,"mat-option",15),QI(1,"Sin coincidencias"),wc()),a&2&&cp("value",null);}function bn(a,n){a&1&&lp(0,"mat-spinner",32);}function Cn(a,n){a&1&&(ii(0,"mat-icon",12),QI(1,"search"),wc());}function wn(a,n){if(a&1){let t=mI();ii(0,"mat-form-field",30)(1,"mat-label"),QI(2,"N\xB0 Ticket"),wc(),ii(3,"input",31),Pp("ngModelChange",function(i){Yl(t);let o=vI(2);return XI(o.ticket,i)||(o.ticket=i),Kl(i)}),gp("blur",function(){Yl(t);let i=vI(2);return Kl(i.lookupTicket())})("keydown.enter",function(){Yl(t);let i=vI(2);return Kl(i.lookupTicket())}),wc(),Wv(),iI(4,bn,1,0,"mat-spinner",32)(5,Cn,2,0,"mat-icon",12),wc();}if(a&2){let t=vI(2);ky(3),Op("ngModel",t.ticket),zv(),ky(),sI(t.ticketLoading()?4:5);}}function xn(a,n){if(a&1){let t=mI();ii(0,"div",7)(1,"mat-form-field",16)(2,"mat-label"),QI(3,"Cliente"),wc(),ii(4,"input",29),gp("ngModelChange",function(i){Yl(t);let o=vI();return Kl(o.onClientInput(i))}),wc(),Wv(),ii(5,"mat-icon",12),QI(6,"search"),wc(),ii(7,"mat-autocomplete",13,2),gp("optionSelected",function(i){Yl(t);let o=vI();return Kl(o.onClientPicked(i.option.value))}),ii(9,"mat-option",14),QI(10,"\u2014 Sin cliente \u2014"),wc(),lI(11,vn,2,2,"mat-option",14,zi,false,yn,2,1,"mat-option",15),wc()(),iI(14,wn,6,2,"mat-form-field",30),wc();}if(a&2){let t=_I(8),e=vI();ky(4),cp("matAutocomplete",t)("ngModel",e.clientModel),zv(),ky(3),cp("displayWith",e.displayClient),ky(2),cp("value",null),ky(2),uI(e.filteredClients()),ky(3),sI(e.isNew?14:-1);}}function Sn(a,n){if(a&1&&(ii(0,"span",33),QI(1),wc()),a&2){let t=vI(2);ky(),Mc("#",t.story.ticket);}}function kn(a,n){if(a&1&&(ii(0,"mat-chip-set")(1,"mat-chip",34),QI(2),wc()()),a&2){let t=vI(2);ky(2),Ap(t.client.name);}}function Mn(a,n){if(a&1&&(ii(0,"div",8),iI(1,Sn,2,1,"span",33),iI(2,kn,3,1,"mat-chip-set"),wc()),a&2){let t=vI();ky(),sI(t.story.ticket?1:-1),ky(),sI(t.client?2:-1);}}function En(a,n){if(a&1&&(ii(0,"div",9)(1,"span",35),QI(2,"Estado del ticket:"),wc(),ii(3,"span",36),QI(4),wc()()),a&2){let t=n,e=vI();ky(3),bp("background",e.estadoStyle(t).badgeBg)("color",e.estadoStyle(t).badgeText),ky(),Ap(t);}}function Dn(a,n){if(a&1){let t=mI();ii(0,"button",37),gp("click",function(){Yl(t);let i=vI();return Kl(i.openTicketConversation())}),ii(1,"mat-icon"),QI(2,"forum"),wc(),QI(3," Ver conversaci\xF3n del ticket "),wc();}}function In(a,n){if(a&1&&(ii(0,"small",39),QI(1),wc()),a&2){let t=vI().$implicit;ky(),Ap(t.role);}}function An(a,n){if(a&1&&(ii(0,"mat-option",14)(1,"span",38),QI(2),wc(),iI(3,In,2,1,"small",39),wc()),a&2){let t=n.$implicit;cp("value",t),ky(2),Ap(t.name),ky(),sI(t.role?3:-1);}}function Tn(a,n){a&1&&(ii(0,"mat-option",15),QI(1,"Sin coincidencias"),wc()),a&2&&cp("value",null);}function On(a,n){if(a&1&&(ii(0,"mat-option",14),QI(1),wc()),a&2){let t=n.$implicit,e=vI(2);cp("value",t),ky(),Ap(e.PRIORITY_LABELS[t]);}}function Fn(a,n){if(a&1){let t=mI();ii(0,"mat-select",40),Pp("ngModelChange",function(i){Yl(t);let o=vI();return XI(o.priority,i)||(o.priority=i),Kl(i)}),lI(1,On,2,2,"mat-option",14,cI),wc(),Wv();}if(a&2){let t=vI();Op("ngModel",t.priority),zv(),ky(),uI(t.PRIORITIES);}}function Pn(a,n){if(a&1&&lp(0,"input",18),a&2){let t=vI();cp("value",t.PRIORITY_LABELS[t.priority]);}}function Rn(a,n){if(a&1&&(ii(0,"mat-option",41),QI(1),wc()),a&2){let t=n.$implicit,e=vI(2);cp("value",t)("disabled",e.salioDeTodo&&t==="todo"),ky(),Ap(e.STATUS_LABELS[t]);}}function Ln(a,n){if(a&1){let t=mI();ii(0,"mat-select",40),Pp("ngModelChange",function(i){Yl(t);let o=vI();return XI(o.status,i)||(o.status=i),Kl(i)}),lI(1,Rn,2,3,"mat-option",41,cI),wc(),Wv();}if(a&2){let t=vI();Op("ngModel",t.status),zv(),ky(),uI(t.STATUSES);}}function Bn(a,n){if(a&1&&lp(0,"input",18),a&2){let t=vI();cp("value",t.STATUS_LABELS[t.status]);}}function Vn(a,n){if(a&1){let t=mI();ii(0,"button",46),gp("click",function(){Yl(t);let i=vI(2);return Kl(i.enviarAotroEquipo())}),ii(1,"mat-icon"),QI(2,"swap_horiz"),wc(),QI(3," Enviar a otro equipo "),wc();}}function Nn(a,n){if(a&1){let t=mI();ii(0,"button",47),gp("click",function(){Yl(t);let i=vI(2);return Kl(i.escalar())}),ii(1,"mat-icon"),QI(2,"campaign"),wc(),QI(3," Escalar "),wc();}}function Hn(a,n){if(a&1){let t=mI();ii(0,"button",42),gp("click",function(){Yl(t);let i=vI();return Kl(i.remove())}),QI(1,"Eliminar"),wc(),iI(2,Vn,4,0,"button",43),iI(3,Nn,4,0,"button",44),lp(4,"span",45);}if(a&2){let t=vI();ky(2),sI(t.puedeEnviarEquipo()?2:-1),ky(),sI(t.puedeEscalar()?3:-1);}}var Wi=class a{data=D(N);auth=D(Yp);helpdesk=D(K);dialog=D(ee$1);snack=D(Qt);ref=D(O);input=D($e);story=this.input.story;isNew=!this.story;ticketEstatus=Ft(this.story?.hdEstatus||this.input.prefill?.estatus||"");estadoStyle=jt;esHelpdesk=this.auth.esMSC001;showClientEditor=K$1(()=>this.isNew||this.esHelpdesk()&&!this.story?.ticket);puedeEnviarEquipo=K$1(()=>!this.isNew&&this.data.usesQuarkus()&&this.auth.puedeTransferir());puedeEscalar=K$1(()=>!this.isNew&&this.data.usesQuarkus()&&this.auth.esEspecialista());puedeMover=K$1(()=>{if(this.isNew)return  false;if(this.auth.puedeGestionarTodo())return  true;let n=String(this.story?.assignee||"").trim().toUpperCase();return !!n&&n===String(this.auth.session()?.id||"").trim().toUpperCase()});enviarAotroEquipo(){this.story&&this.dialog.open(Y,{data:{tareaCodigo:this.story.id,boardCodigo:this.story.board??null,titulo:this.story.title},width:"460px",maxWidth:"95vw"});}escalar(){this.story&&this.dialog.open(Nt,{data:{tareaCodigo:this.story.id,boardCodigo:this.story.board??null,titulo:this.story.title},width:"460px",maxWidth:"95vw"});}STATUSES=Mo;STATUS_LABELS=xo;PRIORITIES=["alta","media","baja"];PRIORITY_LABELS=wo;get client(){let n=this.story?.client;if(!n)return null;let t=this.helpdesk.clients().find(i=>i.id===n);if(t)return {id:t.id,name:t.name};let e=this.data.getClient(n);return e||{id:n,name:this.story?.clientName||n}}clientes=Ft(this.initialClients());clientFilter=Ft("");clientModel=null;clientTouched=false;filteredClients=K$1(()=>{let n=this.clientFilter().toLowerCase().trim(),t=this.clientes();return n?t.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)):t});assignees=Ft(this.ensureCurrent(this.helpdesk.hdUsers()));assigneeFilter=Ft("");assigneeModel=null;assigneeTouched=false;filteredAssignees=K$1(()=>{let n=this.assigneeFilter().toLowerCase().trim(),t=this.assignees();return n?t.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)):t});constructor(){this.syncAssigneeModel(),this.helpdesk.getHdUsers().then(n=>{this.assignees.set(this.ensureCurrent(n)),this.assigneeTouched||this.syncAssigneeModel();}),this.syncClientModel(),this.helpdesk.getClients().then(n=>{n.length&&this.clientes.set(n),this.clientTouched||this.syncClientModel();});}syncClientModel(){let n=this.clientId;if(!n){this.clientModel=null;return}this.clientModel=this.clientes().find(t=>t.id===n)??{id:n,name:this.input.prefill?.clientName||n};}initialClients(){let n=this.helpdesk.clients();return n.length?n:this.data.getClients().map(t=>({id:t.id,name:t.name}))}displayClient=n=>n?typeof n=="string"?n:n.name:"";onClientInput(n){this.clientTouched=true,this.clientFilter.set(typeof n=="string"?n:"");}onClientPicked(n){this.clientTouched=true,this.clientId=n?.id??"",this.clientModel=n,this.clientFilter.set("");}ticketLoading=Ft(false);lastLookup="";async lookupTicket(){let n=this.ticket.trim();if(!n||!/^\d+$/.test(n)||n===this.lastLookup)return;this.lastLookup=n,this.ticketLoading.set(true);let t=await this.helpdesk.searchTicketRemote(n);if(this.ticketLoading.set(false),!t){this.snack.open(`No se encontr\xF3 el ticket #${n}.`,"OK",{duration:3e3});return}this.ticketEstatus.set(t.estatus||""),t.asunto&&(this.title=t.asunto),this.clientTouched=true,this.clientId=t.clientId||"",this.clientModel=this.clientId?this.clientes().find(e=>e.id===this.clientId)??{id:this.clientId,name:t.clienteRaw||this.clientId}:null,this.assigneeTouched=true,this.assignee=t.usuarioAsignado||"",this.assigneeModel=this.assignee?this.assignees().find(e=>e.id===this.assignee)??{id:this.assignee,name:t.nombreAsignado||this.assignee,role:""}:null;}ensureCurrent(n){let t=this.story?.assignee;if(!t||n.some(i=>i.id===t))return n;let e=Io(t,this.data.getTeam(),n);return e?[{id:e.id,name:e.name,role:e.role},...n]:n}syncAssigneeModel(){let n=this.assignee;this.assigneeModel=n?this.assignees().find(t=>t.id===n)??{id:n,name:this.input.prefill?.assigneeName||n,role:""}:null;}displayAssignee=n=>n?typeof n=="string"?n:`${n.name}${n.id?" \xB7 "+n.id:""}`:"";onAssigneeInput(n){this.assigneeTouched=true,this.assigneeFilter.set(typeof n=="string"?n:"");}onAssigneePicked(n){this.assigneeTouched=true,this.assignee=n?.id??"",this.assigneeModel=n,this.assigneeFilter.set("");}title=this.story?.title??this.input.prefill?.title??"";priority=this.story?.priority??"media";description=this.story?.description??"";status=this.story?.status??ko(this.input.prefill?.estatus||"").status;dueDateModel=this.story?.dueDate?new Date(this.story.dueDate+"T00:00:00"):null;assignee=this.story?.assignee??this.input.prefill?.assignee??"";ticket=this.story?.ticket??this.input.prefill?.ticket??"";clientId=this.story?.client??this.input.prefill?.client??"";progress=Ft(this.story?.progress??0);editable=this.status==="todo"||this.status==="in_progress";salioDeTodo=!this.isNew&&this.story.status!=="todo";progBarColor=K$1(()=>Vo(this.progress()));onProgress(n){this.progress.set(Math.min(100,Math.max(0,parseInt(n,10)||0)));}dueDateStr(){let n=this.dueDateModel;if(!n)return "";let t=e=>String(e).padStart(2,"0");return `${n.getFullYear()}-${t(n.getMonth()+1)}-${t(n.getDate())}`}openTicketConversation(){let n=this.ticket.trim();n&&this.dialog.open(Va,{data:{ticketId:n},width:"720px",maxWidth:"96vw"});}async save(){let n=this.title.trim();if(!n){this.snack.open("El t\xEDtulo no puede quedar vac\xEDo.","OK",{duration:3e3});return}let t=Fo(this.progress()),e=this.assignee||null;if(this.isNew){let r=this.ticket.trim();this.data.addStory({title:n,priority:this.priority,description:this.description.trim(),status:this.status,dueDate:this.dueDateStr(),assignee:e,client:this.clientId||null,ticket:r,progress:t}),this.maybeAssignHd(r,e),this.ref.close(true);return}let i=this.story;if(this.salioDeTodo&&this.status==="todo"){this.snack.open("Una tarea que ya sali\xF3 de To Do no puede volver.","OK",{duration:3e3});return}if(i.status==="todo"&&this.status==="in_progress"&&!await Bo(i,{data:this.data,auth:this.auth,dialog:this.dialog,snack:this.snack}))return;this.data.updateStoryTitle(i.id,n),this.data.updateStoryDescription(i.id,this.description.trim()),this.data.updateStoryProgress(i.id,t),this.data.updateStoryStatus(i.id,this.status),this.data.updateStoryDueDate(i.id,this.dueDateStr()),this.data.updateStoryAssignee(i.id,e),this.esHelpdesk()&&!i.ticket&&this.data.updateStoryClient(i.id,this.clientId||null),this.editable&&this.data.updateStoryPriority(i.id,this.priority),this.maybeAssignHd(i.ticket,e,i.assignee);let o=Ao[this.status];i.ticket&&this.status!==i.status&&o&&this.helpdesk.setTicketStatus(i.ticket,o).then(r=>{r&&this.data.updateStoryHdEstatus(i.id,o);}),this.ref.close(true);}maybeAssignHd(n,t,e){!n||!t||t===e||this.helpdesk.assignTicket(n,t).then(i=>{i?this.snack.open(`Ticket #${n} asignado a ${t} en el Helpdesk.`,"",{duration:2500}):this.snack.open(`No se pudo asignar el ticket #${n} en el Helpdesk.`,"OK",{duration:4e3});});}async remove(){if(!this.story)return;await ih(this.dialog.open(zt,{data:{title:"Eliminar tarea",message:`Vas a eliminar la tarea:

"${this.story.title}"

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Eliminar",danger:true,requireWord:"BORRAR"}}).afterClosed())&&(this.data.deleteStory(this.story.id),this.ref.close(true));}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=OE({type:a,selectors:[["app-card-detail-dialog"]],decls:57,vars:23,consts:[["autoAssignee","matAutocomplete"],["duePicker",""],["autoClient","matAutocomplete"],["mat-dialog-title",""],[1,"detail"],["appearance","outline",1,"full"],["matInput","","placeholder","T\xEDtulo de la tarea",3,"ngModelChange","ngModel"],[1,"row"],[1,"meta"],[1,"ticket-estado"],["mat-stroked-button","","type","button",1,"conv-btn"],["matInput","","placeholder","Buscar por nombre o c\xF3digo...","autocomplete","off",3,"ngModelChange","matAutocomplete","ngModel"],["matSuffix",""],[3,"optionSelected","displayWith"],[3,"value"],["disabled","",3,"value"],["appearance","outline",1,"grow"],[3,"ngModel"],["matInput","","readonly","",3,"value"],["matInput","","rows","3","placeholder","Detalle adicional, contexto, pasos...",3,"ngModelChange","ngModel"],[1,"block-label"],[1,"prog"],["mode","determinate",3,"value"],["type","number","min","0","max","100","step","5",3,"input","value"],["matInput","",3,"ngModelChange","matDatepicker","ngModel"],["matIconSuffix","",3,"for"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"],["matInput","","placeholder","Buscar cliente...","autocomplete","off",3,"ngModelChange","matAutocomplete","ngModel"],["appearance","outline",1,"ticket"],["matInput","","inputmode","numeric","placeholder","Buscar ticket\u2026",3,"ngModelChange","blur","keydown.enter","ngModel"],["matSuffix","","diameter","18"],[1,"ticket-badge"],["disableRipple",""],[1,"te-label"],[1,"te-badge"],["mat-stroked-button","","type","button",1,"conv-btn",3,"click"],[1,"opt-name"],[1,"opt-meta"],[3,"ngModelChange","ngModel"],[3,"value","disabled"],["mat-button","",1,"danger",3,"click"],["mat-stroked-button","","matTooltip","Transferir a otro equipo"],["mat-stroked-button","","matTooltip","Solicitar reasignaci\xF3n/transferencia al Responsable de Equipo"],[1,"spacer"],["mat-stroked-button","","matTooltip","Transferir a otro equipo",3,"click"],["mat-stroked-button","","matTooltip","Solicitar reasignaci\xF3n/transferencia al Responsable de Equipo",3,"click"]],template:function(t,e){if(t&1){let i=mI();ii(0,"h2",3),QI(1),wc(),ii(2,"mat-dialog-content",4)(3,"mat-form-field",5)(4,"mat-label"),QI(5,"T\xEDtulo"),wc(),ii(6,"input",6),Pp("ngModelChange",function(r){return Yl(i),XI(e.title,r)||(e.title=r),Kl(r)}),wc(),Wv(),wc(),iI(7,xn,15,6,"div",7)(8,Mn,3,2,"div",8),iI(9,En,5,5,"div",9),iI(10,Dn,4,0,"button",10),ii(11,"mat-form-field",5)(12,"mat-label"),QI(13,"Asignado a"),wc(),ii(14,"input",11),gp("ngModelChange",function(r){return e.onAssigneeInput(r)}),wc(),Wv(),ii(15,"mat-icon",12),QI(16,"search"),wc(),ii(17,"mat-autocomplete",13,0),gp("optionSelected",function(r){return e.onAssigneePicked(r.option.value)}),ii(19,"mat-option",14),QI(20,"\u2014 Sin asignar \u2014"),wc(),lI(21,An,4,3,"mat-option",14,zi,false,Tn,2,1,"mat-option",15),wc()(),ii(24,"div",7)(25,"mat-form-field",16)(26,"mat-label"),QI(27,"Prioridad"),wc(),iI(28,Fn,3,1,"mat-select",17)(29,Pn,1,1,"input",18),wc(),ii(30,"mat-form-field",16)(31,"mat-label"),QI(32,"Estado (mover)"),wc(),iI(33,Ln,3,1,"mat-select",17)(34,Bn,1,1,"input",18),wc()(),ii(35,"mat-form-field",5)(36,"mat-label"),QI(37,"Descripci\xF3n"),wc(),ii(38,"textarea",19),Pp("ngModelChange",function(r){return Yl(i),XI(e.description,r)||(e.description=r),Kl(r)}),wc(),Wv(),wc(),ii(39,"label",20),QI(40),wc(),ii(41,"div",21),lp(42,"mat-progress-bar",22),ii(43,"input",23),gp("input",function(r){return e.onProgress(r.target.value)}),wc()(),ii(44,"mat-form-field",5)(45,"mat-label"),QI(46,"Fecha de entrega"),wc(),ii(47,"input",24),Pp("ngModelChange",function(r){return Yl(i),XI(e.dueDateModel,r)||(e.dueDateModel=r),Kl(r)}),wc(),Wv(),lp(48,"mat-datepicker-toggle",25)(49,"mat-datepicker",null,1),wc()(),ii(51,"mat-dialog-actions",26),iI(52,Hn,5,2),ii(53,"button",27),QI(54,"Cancelar"),wc(),ii(55,"button",28),gp("click",function(){return e.save()}),QI(56),wc()();}if(t&2){let i,o=_I(18),r=_I(50);ky(),Mc(" ",e.isNew?"Nueva tarea":e.story.id,`
`),ky(5),Op("ngModel",e.title),zv(),ky(),sI(e.showClientEditor()?7:e.story.ticket||e.client?8:-1),ky(2),sI((i=e.ticketEstatus())?9:-1,i),ky(),sI(e.ticket.trim()?10:-1),ky(4),cp("matAutocomplete",o)("ngModel",e.assigneeModel),zv(),ky(3),cp("displayWith",e.displayAssignee),ky(2),cp("value",null),ky(2),uI(e.filteredAssignees()),ky(7),sI(e.editable?28:29),ky(5),sI(e.puedeMover()?33:34),ky(5),Op("ngModel",e.description),zv(),ky(2),Mc("Progreso \u2014 ",e.progress(),"%"),ky(2),bp("--mdc-linear-progress-active-indicator-color",e.progBarColor()),cp("value",e.progress()),ky(),cp("value",e.progress()),ky(4),cp("matDatepicker",r),Op("ngModel",e.dueDateModel),zv(),ky(),cp("for",r),ky(4),sI(e.isNew?-1:52),ky(4),Ap(e.isNew?"Crear":"Guardar");}},dependencies:[Ko,an$1,Zo,Ni$1,Ht,jt$1,Nt$1,zt$1,Vt,ba,ha,fe,jn,de,yo,Ar,Fr,Ft$1,Rt,J,Hi,Ni,oe,Ri,ne,Pi,yt,wt,va,ba$1,J$1,Z,Dl,Cl,Wa,wr,zt$2,mt],styles:[".detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:8px;min-width:460px}.full[_ngcontent-%COMP%]{width:100%}.ticket-estado[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin:2px 0 10px;font-size:13px}.ticket-estado[_ngcontent-%COMP%]   .te-label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #5c5c68)}.ticket-estado[_ngcontent-%COMP%]   .te-badge[_ngcontent-%COMP%]{padding:2px 10px;border-radius:12px;font-size:12px;font-weight:700}.row[_ngcontent-%COMP%]{display:flex;gap:12px}.row[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%]{flex:1}.row[_ngcontent-%COMP%]   .ticket[_ngcontent-%COMP%]{width:120px}.meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin:0 0 14px}.ticket-badge[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:13px;font-weight:600;color:var(--mat-sys-primary)}.block-label[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);margin:2px 0 6px}.prog[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:16px}.prog[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{flex:1;border-radius:4px}.prog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:64px;padding:6px 8px;border:1px solid var(--mat-sys-outline);border-radius:6px;background:var(--mat-sys-surface);color:var(--mat-sys-on-surface);font:inherit;text-align:right}.opt-name[_ngcontent-%COMP%]{font-weight:500}.opt-meta[_ngcontent-%COMP%]{margin-left:8px;font-family:JetBrains Mono,monospace;color:var(--mat-sys-on-surface-variant)}.conv-btn[_ngcontent-%COMP%]{align-self:flex-start;margin-bottom:12px}.spacer[_ngcontent-%COMP%]{flex:1}.danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}@media(max-width:560px){.detail[_ngcontent-%COMP%]{min-width:0}.row[_ngcontent-%COMP%]{flex-direction:column;gap:0}.row[_ngcontent-%COMP%]   .ticket[_ngcontent-%COMP%]{width:100%}}"]})};export{Pi as P,Ri as R,Wi as W,ne as n,pa as p};