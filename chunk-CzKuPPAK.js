import {x as xa,i as io,r as ro,s as so,_ as _o,o as oo,g as go,t as ka,f as fo,v as vo,l as lo,S as St,a as ca,d as da,z as zs,Y as Ys,k as Ya,n as rr}from'./chunk-C-KjVU29.js';import {C as Ce,Z as Ze,U as Ue,v,O as Oe}from'./chunk-BsfWK0Du.js';import {u}from'./chunk-BGJ9XV7x.js';import {J}from'./chunk-Frm1dzP4.js';import {D,J as Jp,f as ee,q as O,$ as $e,F as Ft,K,aS as ah,P as PE,H as Ht$1,r as jt,N as Nt,v as zt,V as Vt,aT as J$1,am as yI,s as si,Z as ZI,C as Cc,L as Lp,an as Xl,e as eD,ao as eu,G as Gv,a as sI,m as mp,y as uI,u as up,aU as MI,O as Oy,x as xc,b as Pp,Q as Qv,d as aI,l as lp,A as dI,ak as Cp,k as kp,B as FE,I as Sl,a7 as hh,R as qr,bG as d,ap as N$1,aG as KL,T as mr,bH as qL,aq as Se,aA as Ir,av as cn,X as tr,aD as ne$1,ar as ct,aY as nn$2,aE as $e$1,bI as _h,ax as me,at as q,au as nh,bJ as ht,ay as Ph,a_ as XL,Y as DI,a0 as wI,ab as sD,be as hp,ae as cp,a1 as jI,a2 as _p,af as Ip,a4 as bI,a5 as CI,a3 as Ep,a9 as Cm,ag as HE,aa as ep,aK as Ss,aL as Go,aN as Yh,b4 as Kh,bK as en$1,aH as Jh,bt as _c,bu as Mc,b6 as eF,bL as ge,bM as It$1,ah as vt,as as U,U as w,bN as Qt$1,bO as rp,bP as at,bQ as rt,bR as ae$1,a$ as Di$1,aM as T,aB as Hv,W as Wt,aZ as ot,i as Qt$2,bS as Ih,w as we,bT as _,bU as kh,b1 as M,aI as Hr,bV as Yt$1,b3 as eg,aP as Hh,aJ as tn$2,bW as L,bX as Pt,bY as Iu,bZ as j,b_ as xt,b$ as Ct,c0 as wt$1,b5 as am,E as EI,bf as lI,bk as P,j as jy,c1 as kt,bd as ao,bo as Rp,c2 as ur}from'./main-5IYZUA4I.js';import {Y as Yt,m as mt}from'./chunk-CaSQ2CbB.js';import {Q as Qt}from'./chunk-L3k_rXRW.js';import {F as Ft$1,R as Rt}from'./chunk-DF-URMUM.js';import {d as de,n as nt,o as oe,I as It,a as nn$1,t as tn$1,l as le}from'./chunk-xZ5WWEdy.js';import {y as yt,w as wt}from'./chunk-Dow489kD.js';import {t as ta,i as ie$1,X as Xn,b as bn$1,v as va,g as ga,h as ht$1}from'./chunk-CMsGtJPM.js';import {N}from'./chunk-CbtG3Trj.js';var Gi=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Ki=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function Qi(a,n){a&1&&(si(0,"span",3),wI(1,1),Cc());}function Ui(a,n){a&1&&(si(0,"span",6),wI(1,2),Cc());}var Yi=["*"];var Xi=new N$1("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Di=new N$1("MatChipAvatar"),Ii=new N$1("MatChipTrailingIcon"),Ai=new N$1("MatChipEdit"),te=new N$1("MatChipRemove"),Ti=new N$1("MatChip"),Oi=(()=>{class a{_elementRef=D(mr);_parentChip=D(Ti);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(t){this._disabled=t;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){D(q).load(nh),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(e){return new(e||a)};static \u0275dir=HE({type:a,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(e,i){e&2&&(cp("disabled",i._getDisabledAttribute())("aria-disabled",i.disabled),_p("mdc-evolution-chip__action--primary",i._isPrimary)("mdc-evolution-chip__action--secondary",!i._isPrimary)("mdc-evolution-chip__action--trailing",!i._isPrimary&&!i._isLeading));},inputs:{disabled:[2,"disabled","disabled",XL],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?-1:eF(t)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return a})(),Fi=(()=>{class a extends Oi{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(t){!this.disabled&&this._isPrimary&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(t.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(a)))(i||a)}})();static \u0275dir=HE({type:a,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(e,i){e&1&&mp("click",function(r){return i._handleClick(r)})("keydown",function(r){return i._handleKeydown(r)}),e&2&&(cp("tabindex",i._getTabindex()),_p("mdc-evolution-chip__action--presentational",false));},features:[ep]})}return a})();var sa=(()=>{class a extends Fi{_isPrimary=false;_handleClick(t){this.disabled||(t.stopPropagation(),t.preventDefault(),this._parentChip.remove());}_handleKeydown(t){(t.keyCode===13||t.keyCode===32)&&!this.disabled&&(t.stopPropagation(),t.preventDefault(),this._parentChip.remove());}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(a)))(i||a)}})();static \u0275dir=HE({type:a,selectors:[["","matChipRemove",""]],hostAttrs:["role","button",1,"mat-mdc-chip-remove","mat-mdc-chip-trailing-icon","mat-focus-indicator","mdc-evolution-chip__icon","mdc-evolution-chip__icon--trailing"],hostVars:1,hostBindings:function(e,i){e&2&&cp("aria-hidden",null);},features:[sD([{provide:te,useExisting:a}]),ep]})}return a})(),ie=(()=>{class a{_changeDetectorRef=D(KL);_elementRef=D(mr);_tagName=D(qL);_ngZone=D(Se);_focusMonitor=D(Ir);_globalRippleOptions=D(cn,{optional:true});_document=D(tr);_onFocus=new ne$1;_onBlur=new ne$1;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=ct();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=D(nn$2).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(t){this._value=t;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(t){this._disabled=t;}_disabled=false;removed=new $e$1;destroyed=new $e$1;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=D(_h);_injector=D(me);constructor(){let t=D(q);t.load(nh),t.load(ht),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Ph(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe(),this.destroyed.emit({chip:this}),this.destroyed.complete();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(t){(t.keyCode===8&&!t.repeat||t.keyCode===46)&&(t.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(t){return this._getActions().find(e=>{let i=e._elementRef.nativeElement;return i===t||i.contains(t)})}_getActions(){let t=[];return this.editIcon&&t.push(this.editIcon),this.primaryAction&&t.push(this.primaryAction),this.removeIcon&&t.push(this.removeIcon),t}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(t){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(t=>{let e=t!==null;e!==this._hasFocusInternal&&(this._hasFocusInternal=e,e?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=PE({type:a,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(e,i,o){if(e&1&&Ep(o,Di,5)(o,Ai,5)(o,Ii,5)(o,te,5)(o,Di,5)(o,Ii,5)(o,Ai,5)(o,te,5),e&2){let r;bI(r=CI())&&(i.leadingIcon=r.first),bI(r=CI())&&(i.editIcon=r.first),bI(r=CI())&&(i.trailingIcon=r.first),bI(r=CI())&&(i.removeIcon=r.first),bI(r=CI())&&(i._allLeadingIcons=r),bI(r=CI())&&(i._allTrailingIcons=r),bI(r=CI())&&(i._allEditIcons=r),bI(r=CI())&&(i._allRemoveIcons=r);}},viewQuery:function(e,i){if(e&1&&Ip(Fi,5),e&2){let o;bI(o=CI())&&(i.primaryAction=o.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(e,i){e&1&&mp("keydown",function(r){return i._handleKeydown(r)}),e&2&&(hp("id",i.id),cp("role",i.role)("aria-label",i.ariaLabel),jI("mat-"+(i.color||"primary")),_p("mdc-evolution-chip",!i._isBasicChip)("mdc-evolution-chip--disabled",i.disabled)("mdc-evolution-chip--with-trailing-action",i._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",i.leadingIcon)("mdc-evolution-chip--with-primary-icon",i.leadingIcon)("mdc-evolution-chip--with-avatar",i.leadingIcon)("mat-mdc-chip-with-avatar",i.leadingIcon)("mat-mdc-chip-highlighted",i.highlighted)("mat-mdc-chip-disabled",i.disabled)("mat-mdc-basic-chip",i._isBasicChip)("mat-mdc-standard-chip",!i._isBasicChip)("mat-mdc-chip-with-trailing-icon",i._hasTrailingIcon())("_mat-animation-noopable",i._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",XL],highlighted:[2,"highlighted","highlighted",XL],disableRipple:[2,"disableRipple","disableRipple",XL],disabled:[2,"disabled","disabled",XL]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[sD([{provide:Ti,useExisting:a}])],ngContentSelectors:Ki,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(e,i){e&1&&(DI(Gi),up(0,"span",0),si(1,"span",1)(2,"span",2),sI(3,Qi,2,0,"span",3),si(4,"span",4),wI(5),up(6,"span",5),Cc()()(),sI(7,Ui,2,0,"span",6)),e&2&&(Oy(3),aI(i.leadingIcon?3:-1),Oy(4),aI(i._hasTrailingIcon()?7:-1));},dependencies:[Oi],styles:[`.mdc-evolution-chip,
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
`],encapsulation:2})}return a})();var Pi=(()=>{class a{_elementRef=D(mr);_changeDetectorRef=D(KL);_dir=D(Ss,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ne$1;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(t=>t._onFocus)}get chipDestroyedChanges(){return this._getChipStream(t=>t.destroyed)}get chipRemovedChanges(){return this._getChipStream(t=>t.removed)}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(t){this._explicitRole=t;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Go;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(t=>t._hasFocus())}_syncChipsState(){this._chips?.forEach(t=>{t._chipListDisabled=this._disabled,t._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(t){this._originatesFromChip(t)&&this._keyManager.onKeydown(t);}_isValidIndex(t){return t>=0&&t<this._chips.length}_allowFocusEscape(){let t=this._elementRef.nativeElement.tabIndex;t!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=t));}_getChipStream(t){return this._chips.changes.pipe(Yh(null),Kh(()=>Ph(...this._chips.map(t))))}_originatesFromChip(t){let e=t.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-mdc-chip"))return  true;e=e.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(Yh(this._chips)).subscribe(t=>{let e=[];t.forEach(i=>i._getActions().forEach(o=>e.push(o))),this._chipActions.reset(e),this._chipActions.notifyOnChanges();}),this._keyManager=new en$1(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(t=>this._skipPredicate(t)),this.chipFocusChanges.pipe(Jh(this._destroyed)).subscribe(({chip:t})=>{let e=t._getSourceAction(document.activeElement);e&&this._keyManager.updateActiveItem(e);}),this._dir?.change.pipe(Jh(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t));}_skipPredicate(t){return t.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Yh(null),Jh(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Jh(this._destroyed)).subscribe(t=>{let i=this._chips.toArray().indexOf(t.chip),o=t.chip._hasFocus(),r=t.chip._hadFocusOnRemove&&this._keyManager.activeItem&&t.chip._getActions().includes(this._keyManager.activeItem),A=o||r;this._isValidIndex(i)&&A&&(this._lastDestroyedFocusedChipIndex=i);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let t=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),e=this._chips.toArray()[t];e.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():e.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=PE({type:a,selectors:[["mat-chip-set"]],contentQueries:function(e,i,o){if(e&1&&Ep(o,ie,5),e&2){let r;bI(r=CI())&&(i._chips=r);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(e,i){e&1&&mp("keydown",function(r){return i._handleKeydown(r)}),e&2&&cp("role",i.role);},inputs:{disabled:[2,"disabled","disabled",XL],role:"role",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:eF(t)]},ngContentSelectors:Yi,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(e,i){e&1&&(DI(),_c(0,"div",0),wI(1),Mc());},styles:[`.mat-mdc-chip-set {
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
`],encapsulation:2})}return a})();var Ri=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=FE({type:a});static \u0275inj=Sl({providers:[d,{provide:Xi,useValue:{separatorKeyCodes:[13]}}],imports:[hh,qr]})}return a})();var tn=["panel"],en=["*"];function nn(a,n){if(a&1&&(_c(0,"div",1,0),wI(2),Mc()),a&2){let t=n.id,e=EI();jI(e._classList),_p("mat-mdc-autocomplete-visible",e.showPanel)("mat-mdc-autocomplete-hidden",!e.showPanel)("mat-autocomplete-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._color==="primary")("mat-accent",e._color==="accent")("mat-warn",e._color==="warn"),hp("id",e.id),cp("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby(t));}}var ne=class{source;option;constructor(n,t){this.source=n,this.option=t;}},Vi=new N$1("mat-autocomplete-default-options",{providedIn:"root",factory:()=>({autoActiveFirstOption:false,autoSelectActiveOption:false,hideSingleSelectionIndicator:false,requireSelection:false,hasBackdrop:false})}),Hi=(()=>{class a{_changeDetectorRef=D(KL);_elementRef=D(mr);_defaults=D(Vi);_animationsDisabled=ct();_activeOptionChanges=U.EMPTY;_keyManager;showPanel=false;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=false;_latestOpeningTrigger;_setColor(t){this._color=t,this._changeDetectorRef.markForCheck();}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=false;optionSelected=new $e$1;opened=new $e$1;closed=new $e$1;optionActivated=new $e$1;set classList(t){this._classList=t,this._elementRef.nativeElement.className="";}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._syncParentProperties();}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let t of this.options)t._changeDetectorRef.markForCheck();}id=D(nn$2).getId("mat-autocomplete-");inertGroups;constructor(){let t=D(w);this.inertGroups=t?.SAFARI||false,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??false;}ngAfterContentInit(){this._keyManager=new Qt$1(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(t=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[t]||null});}),this._setVisibility();}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe();}_setScrollTop(t){this.panel&&(this.panel.nativeElement.scrollTop=t);}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck();}_emitSelectEvent(t){let e=new ne(this,t);this.optionSelected.emit(e);}_getPanelAriaLabelledby(t){if(this.ariaLabel)return null;let e=t?t+" ":"";return this.ariaLabelledby?e+this.ariaLabelledby:t}_skipPredicate(){return  false}static \u0275fac=function(e){return new(e||a)};static \u0275cmp=PE({type:a,selectors:[["mat-autocomplete"]],contentQueries:function(e,i,o){if(e&1&&Ep(o,J$1,5)(o,rt,5),e&2){let r;bI(r=CI())&&(i.options=r),bI(r=CI())&&(i.optionGroups=r);}},viewQuery:function(e,i){if(e&1&&Ip(ur,7)(tn,5),e&2){let o;bI(o=CI())&&(i.template=o.first),bI(o=CI())&&(i.panel=o.first);}},hostAttrs:[1,"mat-mdc-autocomplete"],inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],displayWith:"displayWith",autoActiveFirstOption:[2,"autoActiveFirstOption","autoActiveFirstOption",XL],autoSelectActiveOption:[2,"autoSelectActiveOption","autoSelectActiveOption",XL],requireSelection:[2,"requireSelection","requireSelection",XL],panelWidth:"panelWidth",disableRipple:[2,"disableRipple","disableRipple",XL],classList:[0,"class","classList"],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",XL]},outputs:{optionSelected:"optionSelected",opened:"opened",closed:"closed",optionActivated:"optionActivated"},exportAs:["matAutocomplete"],features:[sD([{provide:at,useExisting:a}])],ngContentSelectors:en,decls:1,vars:0,consts:[["panel",""],["role","listbox",1,"mat-mdc-autocomplete-panel","mdc-menu-surface","mdc-menu-surface--open",3,"id"]],template:function(e,i){e&1&&(DI(),rp(0,nn,3,17,"ng-template"));},styles:[`div.mat-mdc-autocomplete-panel {
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
`],encapsulation:2})}return a})();var an={provide:ht$1,useExisting:ao(()=>ae),multi:true};var on=new N$1("mat-autocomplete-scroll-strategy",{providedIn:"root",factory:()=>{let a=D(me);return ()=>kt(a)}}),ae=(()=>{class a{_environmentInjector=D(ae$1);_element=D(mr);_injector=D(me);_viewContainerRef=D(Di$1);_zone=D(Se);_changeDetectorRef=D(KL);_dir=D(Ss,{optional:true});_formField=D(le,{optional:true,host:true});_viewportRuler=D(T);_scrollStrategy=D(on);_renderer=D(Hv);_animationsDisabled=ct();_defaults=D(Vi,{optional:true});_overlayRef=null;_portal;_componentDestroyed=false;_initialized=new ne$1;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=false;_closingActionsSubscription;_viewportSubscription=U.EMPTY;_breakpointObserver=D(Wt);_handsetLandscapeSubscription=U.EMPTY;_canOpenOnNextFocus=true;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new ne$1;_overlayPanelClass=ot(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus();};_onChange=()=>{};_onTouched=()=>{};autocomplete;position="auto";connectedTo;autocompleteAttribute="off";autocompleteDisabled=false;_aboveClass="mat-mdc-autocomplete-panel-above";ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen("window","blur",this._windowBlurHandler);}ngOnChanges(t){t.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition());}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=true,this._destroyPanel(),this._closeKeyEventStream.complete();}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=false;openPanel(){this._openPanelInternal();}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit();}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=false,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=false,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges());}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition();}get panelClosingActions(){return Ph(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(Qt$2(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(Qt$2(()=>this._overlayAttached)):Ih()).pipe(we(t=>t instanceof _?t:null))}optionSelections=kh(()=>{let t=this.autocomplete?this.autocomplete.options:null;return t?t.changes.pipe(Yh(t),Kh(()=>Ph(...t.map(e=>e.onSelectionChange)))):this._initialized.pipe(Kh(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new M(t=>{let e=o=>{let r=P(o),A=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,oe=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&r!==this._element.nativeElement&&!this._hasFocus()&&(!A||!A.contains(r))&&(!oe||!oe.contains(r))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(r)&&t.next(o);},i=[this._renderer.listen("document","click",e),this._renderer.listen("document","auxclick",e),this._renderer.listen("document","touchend",e)];return ()=>{i.forEach(o=>o());}})}writeValue(t){Promise.resolve(null).then(()=>this._assignOptionValue(t));}registerOnChange(t){this._onChange=t;}registerOnTouched(t){this._onTouched=t;}setDisabledState(t){this._element.nativeElement.disabled=t;}_handleKeydown(t){let e=t,i=e.keyCode,o=Hr(e);if(i===27&&!o&&e.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&i===13&&this.panelOpen&&!o)this.activeOption._selectViaInteraction(),this._resetActiveItem(),e.preventDefault();else if(this.autocomplete){let r=this.autocomplete._keyManager.activeItem,A=i===38||i===40;i===9||A&&!o&&this.panelOpen?this.autocomplete._keyManager.onKeydown(e):A&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(A||this.autocomplete._keyManager.activeItem!==r)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)));}}_handleInput(t){let e=t.target,i=e.value;if(e.type==="number"&&(i=i==""?null:parseFloat(i)),this._previousValue!==i){if(this._previousValue=i,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(i),!i)this._clearPreviousSelectedOption(null,false);else if(this.panelOpen&&!this.autocomplete.requireSelection){let o=this.autocomplete.options?.find(r=>r.selected);if(o){let r=this._getDisplayValue(o.value);i!==r&&o.deselect(false);}}if(this._canOpen()&&this._hasFocus()){let o=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(o);}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(true)):this._canOpenOnNextFocus=true;}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal();}_hasFocus(){return Yt$1()===this._element.nativeElement}_floatLabel(t=false){this._formField&&this._formField.floatLabel==="auto"&&(t?this._formField._animateAndLockLabel():this._formField.floatLabel="always",this._manuallyFloatingLabel=true);}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel="auto"),this._manuallyFloatingLabel=false);}_subscribeToClosingActions(){let t=new M(i=>{jy(()=>{i.next();},{injector:this._environmentInjector});}),e=this.autocomplete.options?.changes.pipe(eg(()=>this._positionStrategy.reapplyLastPosition()),Hh(0))??Ih();return Ph(t,e).pipe(Kh(()=>this._zone.run(()=>{let i=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),i!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),tn$2(1)).subscribe(i=>this._setValueAndClose(i))}_emitOpened(){this.autocomplete.opened.emit();}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null);}_getDisplayValue(t){let e=this.autocomplete;return e&&e.displayWith?e.displayWith(t):t}_assignOptionValue(t){let e=this._getDisplayValue(t);t==null&&this._clearPreviousSelectedOption(null,false),this._updateNativeInputValue(e??"");}_updateNativeInputValue(t){this._formField?this._formField._control.value=t:this._element.nativeElement.value=t,this._previousValue=t;}_setValueAndClose(t){let e=this.autocomplete,i=t?t.source:this._pendingAutoselectedOption;i?(this._clearPreviousSelectedOption(i),this._assignOptionValue(i.value),this._onChange(i.value),e._emitSelectEvent(i),this._element.nativeElement.focus()):e.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel();}_clearPreviousSelectedOption(t,e){this.autocomplete?.options?.forEach(i=>{i!==t&&i.selected&&i.deselect(e);});}_openPanelInternal(t=this._element.nativeElement.value){this._attachOverlay(t),this._floatLabel();}_attachOverlay(t){if(!this.autocomplete)return;let e=this._overlayRef;e?(this._positionStrategy.setOrigin(this._getConnectedElement()),e.updateSize({width:this._getPanelWidth()})):(this._portal=new L(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),e=Pt(this._injector,this._getOverlayConfig()),this._overlayRef=e,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&e&&e.updateSize({width:this._getPanelWidth()});}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(Iu.HandsetLandscape).subscribe(o=>{o.matches?this._positionStrategy.withFlexibleDimensions(true).withGrowAfterOpen(true).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(false).withGrowAfterOpen(false).withViewportMargin(0);})),e&&!e.hasAttached()&&(e.attach(this._portal),this._valueOnAttach=t,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let i=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=true,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this.panelOpen&&i!==this.panelOpen&&this._emitOpened();}_handlePanelKeydown=t=>{(t.keyCode===27&&!Hr(t)||t.keyCode===38&&Hr(t,"altKey"))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??""),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),t.stopPropagation(),t.preventDefault());};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let t=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=t.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=t.outsidePointerEvents().subscribe());}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0;}_getOverlayConfig(){return new j({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let t=xt(this._injector,this._getConnectedElement()).withFlexibleDimensions(false).withPush(false).withPopoverLocation("inline");return this._setStrategyPositions(t),this._positionStrategy=t,t}_setStrategyPositions(t){let e=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],i=this._aboveClass,o=[{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:i},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:i}],r;this.position==="above"?r=o:this.position==="below"?r=e:r=[...e,...o],t.withPositions(r);}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let t=this.autocomplete;if(t.autoActiveFirstOption){let e=-1;for(let i=0;i<t.options.length;i++)if(!t.options.get(i).disabled){e=i;break}t._keyManager.setActiveItem(e);}else t._keyManager.setActiveItem(-1);}_canOpen(){let t=this._element.nativeElement;return !t.readOnly&&!t.disabled&&!this.autocompleteDisabled}_scrollToOption(t){let e=this.autocomplete,i=Ct(t,e.options,e.optionGroups);if(t===0&&i===1)e._setScrollTop(0);else if(e.panel){let o=e.options.toArray()[t];if(o){let r=o._getHostElement(),A=wt$1(r.offsetTop,r.offsetHeight,e._getScrollTop(),e.panel.nativeElement.offsetHeight);e._setScrollTop(A);}}}static \u0275fac=function(e){return new(e||a)};static \u0275dir=HE({type:a,selectors:[["input","matAutocomplete",""],["textarea","matAutocomplete",""]],hostAttrs:[1,"mat-mdc-autocomplete-trigger"],hostVars:7,hostBindings:function(e,i){e&1&&mp("focusin",function(){return i._handleFocus()})("blur",function(){return i._onTouched()})("input",function(r){return i._handleInput(r)})("keydown",function(r){return i._handleKeydown(r)})("click",function(){return i._handleClick()}),e&2&&cp("autocomplete",i.autocompleteAttribute)("role",i.autocompleteDisabled?null:"combobox")("aria-autocomplete",i.autocompleteDisabled?null:"list")("aria-activedescendant",i.panelOpen&&i.activeOption?i.activeOption.id:null)("aria-expanded",i.autocompleteDisabled?null:i.panelOpen.toString())("aria-controls",i.autocompleteDisabled||!i.panelOpen?null:i.autocomplete?.id)("aria-haspopup",i.autocompleteDisabled?null:"listbox");},inputs:{autocomplete:[0,"matAutocomplete","autocomplete"],position:[0,"matAutocompletePosition","position"],connectedTo:[0,"matAutocompleteConnectedTo","connectedTo"],autocompleteAttribute:[0,"autocomplete","autocompleteAttribute"],autocompleteDisabled:[2,"matAutocompleteDisabled","autocompleteDisabled",XL]},exportAs:["matAutocompleteTrigger"],features:[sD([an]),am]})}return a})(),Ni=(()=>{class a{static \u0275fac=function(e){return new(e||a)};static \u0275mod=FE({type:a});static \u0275inj=Sl({imports:[ge,It$1,vt,It$1,qr]})}return a})();var qi=(a,n)=>n.id;function un(a,n){if(a&1&&(si(0,"mat-option",10),ZI(1),Cc()),a&2){let t=n.$implicit;lp("value",t.id),Oy(),kp(t.nombre);}}function _n(a,n){if(a&1){let t=yI();si(0,"mat-form-field",2)(1,"mat-label"),ZI(2,"Equipo destino sugerido (opcional)"),Cc(),si(3,"mat-select",3),Lp("ngModelChange",function(i){Xl(t);let o=EI();return eD(o.equipoDestinoId,i)||(o.equipoDestinoId=i),eu(i)}),si(4,"mat-option",10),ZI(5,"\u2014 Que decida el responsable \u2014"),Cc(),uI(6,un,2,2,"mat-option",10,qi),Cc(),Gv(),Cc();}if(a&2){let t=EI();Oy(3),Pp("ngModel",t.equipoDestinoId),Qv(),Oy(),lp("value",null),Oy(2),dI(t.destinos());}}function gn(a,n){if(a&1&&(si(0,"mat-option",10),ZI(1),Cc()),a&2){let t=n.$implicit;lp("value",t.id),Oy(),Rp("",t.name," \xB7 ",t.id);}}function fn(a,n){if(a&1){let t=yI();si(0,"mat-form-field",2)(1,"mat-label"),ZI(2,"Persona sugerida (opcional)"),Cc(),si(3,"mat-select",3),Lp("ngModelChange",function(i){Xl(t);let o=EI();return eD(o.asignadoHid,i)||(o.asignadoHid=i),eu(i)}),si(4,"mat-option",10),ZI(5,"\u2014 Que decida el responsable \u2014"),Cc(),uI(6,gn,2,3,"mat-option",10,qi),Cc(),Gv(),Cc();}if(a&2){let t=EI();Oy(3),Pp("ngModel",t.asignadoHid),Qv(),Oy(),lp("value",null),Oy(2),dI(t.usuarios());}}var Ht=class a{svc=D(v);adminApi=D(u);helpdesk=D(J);snack=D(Qt);ref=D(O);data=D($e);tipo="REASIGNACION";equipoDestinoId=null;asignadoHid=null;motivo="";busy=Ft(false);equipos=Ft([]);destinos=K(()=>this.equipos().filter(n=>n.activo&&n.codigo!==this.data.boardCodigo));usuarios=Ft(this.helpdesk.hdUsers());constructor(){this.adminApi.equipos().then(n=>this.equipos.set(n)).catch(()=>{}),this.helpdesk.getHdUsers().then(n=>this.usuarios.set(n)).catch(()=>{});}async enviar(){if(!(!this.motivo.trim()||this.busy())){this.busy.set(true);try{await this.svc.crearSolicitud({tareaCodigo:this.data.tareaCodigo,tipo:this.tipo,motivo:this.motivo.trim(),equipoDestinoId:this.tipo==="TRANSFERENCIA"?this.equipoDestinoId??void 0:void 0,asignadoSugeridoHid:this.tipo==="REASIGNACION"?this.asignadoHid??void 0:void 0}),this.snack.open("Solicitud enviada al Responsable de Equipo.","OK",{duration:4e3}),this.ref.close(!0);}catch(n){this.snack.open(Oe(n,"No se pudo enviar la solicitud."),"OK",{duration:5e3});}finally{this.busy.set(false);}}}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=PE({type:a,selectors:[["app-escalar-dialog"]],decls:27,vars:5,consts:[["mat-dialog-title",""],[1,"hint"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","REASIGNACION"],["value","TRANSFERENCIA"],["matInput","","rows","3","placeholder","Explica por qu\xE9\u2026",3,"ngModelChange","ngModel"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click","disabled"],[3,"value"]],template:function(t,e){t&1&&(si(0,"h2",0),ZI(1,"Escalar solicitud"),Cc(),si(2,"mat-dialog-content")(3,"p",1),ZI(4," Pides al Responsable de Equipo que act\xFAe sobre "),si(5,"strong"),ZI(6),Cc(),ZI(7,". \xC9l decide y ejecuta. "),Cc(),si(8,"mat-form-field",2)(9,"mat-label"),ZI(10,"Tipo de solicitud"),Cc(),si(11,"mat-select",3),Lp("ngModelChange",function(o){return eD(e.tipo,o)||(e.tipo=o),o}),si(12,"mat-option",4),ZI(13,"Reasignar a otra persona"),Cc(),si(14,"mat-option",5),ZI(15,"Transferir a otro equipo"),Cc()(),Gv(),Cc(),sI(16,_n,8,2,"mat-form-field",2)(17,fn,8,2,"mat-form-field",2),si(18,"mat-form-field",2)(19,"mat-label"),ZI(20,"Motivo"),Cc(),si(21,"textarea",6),Lp("ngModelChange",function(o){return eD(e.motivo,o)||(e.motivo=o),o}),Cc(),Gv(),Cc()(),si(22,"mat-dialog-actions",7)(23,"button",8),ZI(24,"Cancelar"),Cc(),si(25,"button",9),mp("click",function(){return e.enviar()}),ZI(26,"Enviar solicitud"),Cc()()),t&2&&(Oy(6),kp(e.data.tareaCodigo),Oy(5),Pp("ngModel",e.tipo),Qv(),Oy(5),aI(e.tipo==="TRANSFERENCIA"?16:17),Oy(5),Pp("ngModel",e.motivo),Qv(),Oy(4),lp("disabled",!e.motivo.trim()||e.busy()));},dependencies:[ta,ie$1,Xn,bn$1,Ht$1,jt,Nt,zt,Vt,va,ga,de,nt,oe,nn$1,tn$1,Ft$1,Rt,J$1],styles:[".full[_ngcontent-%COMP%]{width:100%}.hint[_ngcontent-%COMP%]{margin:0 0 12px;color:var(--mat-sys-on-surface-variant, #666);font-size:.9rem}"]})};var zi=(a,n)=>n.id;function vn(a,n){if(a&1&&(si(0,"mat-option",14),ZI(1),Cc()),a&2){let t=n.$implicit;lp("value",t),Oy(),kp(t.name);}}function yn(a,n){a&1&&(si(0,"mat-option",15),ZI(1,"Sin coincidencias"),Cc()),a&2&&lp("value",null);}function bn(a,n){a&1&&up(0,"mat-spinner",32);}function Cn(a,n){a&1&&(si(0,"mat-icon",12),ZI(1,"search"),Cc());}function wn(a,n){if(a&1){let t=yI();si(0,"mat-form-field",30)(1,"mat-label"),ZI(2,"N\xB0 Ticket"),Cc(),si(3,"input",31),Lp("ngModelChange",function(i){Xl(t);let o=EI(2);return eD(o.ticket,i)||(o.ticket=i),eu(i)}),mp("blur",function(){Xl(t);let i=EI(2);return eu(i.lookupTicket())})("keydown.enter",function(){Xl(t);let i=EI(2);return eu(i.lookupTicket())}),Cc(),Gv(),sI(4,bn,1,0,"mat-spinner",32)(5,Cn,2,0,"mat-icon",12),Cc();}if(a&2){let t=EI(2);Oy(3),Pp("ngModel",t.ticket),Qv(),Oy(),aI(t.ticketLoading()?4:5);}}function xn(a,n){if(a&1){let t=yI();si(0,"div",7)(1,"mat-form-field",16)(2,"mat-label"),ZI(3,"Cliente"),Cc(),si(4,"input",29),mp("ngModelChange",function(i){Xl(t);let o=EI();return eu(o.onClientInput(i))}),Cc(),Gv(),si(5,"mat-icon",12),ZI(6,"search"),Cc(),si(7,"mat-autocomplete",13,2),mp("optionSelected",function(i){Xl(t);let o=EI();return eu(o.onClientPicked(i.option.value))}),si(9,"mat-option",14),ZI(10,"\u2014 Sin cliente \u2014"),Cc(),uI(11,vn,2,2,"mat-option",14,zi,false,yn,2,1,"mat-option",15),Cc()(),sI(14,wn,6,2,"mat-form-field",30),Cc();}if(a&2){let t=MI(8),e=EI();Oy(4),lp("matAutocomplete",t)("ngModel",e.clientModel),Qv(),Oy(3),lp("displayWith",e.displayClient),Oy(2),lp("value",null),Oy(2),dI(e.filteredClients()),Oy(3),aI(e.isNew?14:-1);}}function kn(a,n){if(a&1&&(si(0,"span",33),ZI(1),Cc()),a&2){let t=EI(2);Oy(),xc("#",t.story.ticket);}}function Sn(a,n){if(a&1&&(si(0,"mat-chip-set")(1,"mat-chip",34),ZI(2),Cc()()),a&2){let t=EI(2);Oy(2),kp(t.client.name);}}function Mn(a,n){if(a&1&&(si(0,"div",8),sI(1,kn,2,1,"span",33),sI(2,Sn,3,1,"mat-chip-set"),Cc()),a&2){let t=EI();Oy(),aI(t.story.ticket?1:-1),Oy(),aI(t.client?2:-1);}}function En(a,n){if(a&1&&(si(0,"div",9)(1,"span",35),ZI(2,"Estado del ticket:"),Cc(),si(3,"span",36),ZI(4),Cc()()),a&2){let t=n,e=EI();Oy(3),Cp("background",e.estadoStyle(t).badgeBg)("color",e.estadoStyle(t).badgeText),Oy(),kp(t);}}function Dn(a,n){if(a&1){let t=yI();si(0,"button",37),mp("click",function(){Xl(t);let i=EI();return eu(i.openTicketConversation())}),si(1,"mat-icon"),ZI(2,"forum"),Cc(),ZI(3," Ver conversaci\xF3n del ticket "),Cc();}}function In(a,n){if(a&1&&(si(0,"small",39),ZI(1),Cc()),a&2){let t=EI().$implicit;Oy(),kp(t.role);}}function An(a,n){if(a&1&&(si(0,"mat-option",14)(1,"span",38),ZI(2),Cc(),sI(3,In,2,1,"small",39),Cc()),a&2){let t=n.$implicit;lp("value",t),Oy(2),kp(t.name),Oy(),aI(t.role?3:-1);}}function Tn(a,n){a&1&&(si(0,"mat-option",15),ZI(1,"Sin coincidencias"),Cc()),a&2&&lp("value",null);}function On(a,n){if(a&1&&(si(0,"mat-option",14),ZI(1),Cc()),a&2){let t=n.$implicit,e=EI(2);lp("value",t),Oy(),kp(e.PRIORITY_LABELS[t]);}}function Fn(a,n){if(a&1){let t=yI();si(0,"mat-select",40),Lp("ngModelChange",function(i){Xl(t);let o=EI();return eD(o.priority,i)||(o.priority=i),eu(i)}),uI(1,On,2,2,"mat-option",14,lI),Cc(),Gv();}if(a&2){let t=EI();Pp("ngModel",t.priority),Qv(),Oy(),dI(t.PRIORITIES);}}function Pn(a,n){if(a&1&&up(0,"input",18),a&2){let t=EI();lp("value",t.PRIORITY_LABELS[t.priority]);}}function Rn(a,n){if(a&1){let t=yI();si(0,"button",45),mp("click",function(){Xl(t);let i=EI(2);return eu(i.enviarAotroEquipo())}),si(1,"mat-icon"),ZI(2,"swap_horiz"),Cc(),ZI(3," Enviar a otro equipo "),Cc();}}function Ln(a,n){if(a&1){let t=yI();si(0,"button",46),mp("click",function(){Xl(t);let i=EI(2);return eu(i.escalar())}),si(1,"mat-icon"),ZI(2,"campaign"),Cc(),ZI(3," Escalar "),Cc();}}function Bn(a,n){if(a&1){let t=yI();si(0,"button",41),mp("click",function(){Xl(t);let i=EI();return eu(i.remove())}),ZI(1,"Eliminar"),Cc(),sI(2,Rn,4,0,"button",42),sI(3,Ln,4,0,"button",43),up(4,"span",44);}if(a&2){let t=EI();Oy(2),aI(t.puedeEnviarEquipo()?2:-1),Oy(),aI(t.puedeEscalar()?3:-1);}}var Wi=class a{data=D(N);auth=D(Jp);helpdesk=D(J);dialog=D(ee);snack=D(Qt);ref=D(O);input=D($e);story=this.input.story;isNew=!this.story;ticketEstatus=Ft(this.story?.hdEstatus||this.input.prefill?.estatus||"");estadoStyle=xa;esHelpdesk=this.auth.esMSC001;showClientEditor=K(()=>this.isNew||this.esHelpdesk()&&!this.story?.ticket);puedeEnviarEquipo=K(()=>!this.isNew&&this.data.usesQuarkus()&&this.auth.puedeTransferir());puedeEscalar=K(()=>!this.isNew&&this.data.usesQuarkus()&&this.auth.esEspecialista());enviarAotroEquipo(){this.story&&this.dialog.open(Ce,{data:{tareaCodigo:this.story.id,boardCodigo:this.story.board??null,titulo:this.story.title},width:"460px",maxWidth:"95vw"});}escalar(){this.story&&this.dialog.open(Ht,{data:{tareaCodigo:this.story.id,boardCodigo:this.story.board??null,titulo:this.story.title},width:"460px",maxWidth:"95vw"});}STATUSES=io;STATUS_LABELS=ro;PRIORITIES=["alta","media","baja"];PRIORITY_LABELS=so;get client(){let n=this.story?.client;if(!n)return null;let t=this.helpdesk.clients().find(i=>i.id===n);if(t)return {id:t.id,name:t.name};let e=this.data.getClient(n);return e||{id:n,name:this.story?.clientName||n}}clientes=Ft(this.initialClients());clientFilter=Ft("");clientModel=null;clientTouched=false;filteredClients=K(()=>{let n=this.clientFilter().toLowerCase().trim(),t=this.clientes();return n?t.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)):t});assignees=Ft(this.ensureCurrent(this.helpdesk.hdUsers()));assigneeFilter=Ft("");assigneeModel=null;assigneeTouched=false;filteredAssignees=K(()=>{let n=this.assigneeFilter().toLowerCase().trim(),t=this.assignees();return n?t.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)):t});constructor(){this.syncAssigneeModel(),this.helpdesk.getHdUsers().then(n=>{this.assignees.set(this.ensureCurrent(n)),this.assigneeTouched||this.syncAssigneeModel();}),this.syncClientModel(),this.helpdesk.getClients().then(n=>{n.length&&this.clientes.set(n),this.clientTouched||this.syncClientModel();});}syncClientModel(){let n=this.clientId;if(!n){this.clientModel=null;return}this.clientModel=this.clientes().find(t=>t.id===n)??{id:n,name:this.input.prefill?.clientName||n};}initialClients(){let n=this.helpdesk.clients();return n.length?n:this.data.getClients().map(t=>({id:t.id,name:t.name}))}displayClient=n=>n?typeof n=="string"?n:n.name:"";onClientInput(n){this.clientTouched=true,this.clientFilter.set(typeof n=="string"?n:"");}onClientPicked(n){this.clientTouched=true,this.clientId=n?.id??"",this.clientModel=n,this.clientFilter.set("");}ticketLoading=Ft(false);lastLookup="";async lookupTicket(){let n=this.ticket.trim();if(!n||!/^\d+$/.test(n)||n===this.lastLookup)return;this.lastLookup=n,this.ticketLoading.set(true);let t=await this.helpdesk.searchTicketRemote(n);if(this.ticketLoading.set(false),!t){this.snack.open(`No se encontr\xF3 el ticket #${n}.`,"OK",{duration:3e3});return}this.ticketEstatus.set(t.estatus||""),t.asunto&&(this.title=t.asunto),this.clientTouched=true,this.clientId=t.clientId||"",this.clientModel=this.clientId?this.clientes().find(e=>e.id===this.clientId)??{id:this.clientId,name:t.clienteRaw||this.clientId}:null,this.assigneeTouched=true,this.assignee=t.usuarioAsignado||"",this.assigneeModel=this.assignee?this.assignees().find(e=>e.id===this.assignee)??{id:this.assignee,name:t.nombreAsignado||this.assignee,role:""}:null;}ensureCurrent(n){let t=this.story?.assignee;if(!t||n.some(i=>i.id===t))return n;let e=_o(t,this.data.getTeam(),n);return e?[{id:e.id,name:e.name,role:e.role},...n]:n}syncAssigneeModel(){let n=this.assignee;this.assigneeModel=n?this.assignees().find(t=>t.id===n)??{id:n,name:this.input.prefill?.assigneeName||n,role:""}:null;}displayAssignee=n=>n?typeof n=="string"?n:`${n.name}${n.id?" \xB7 "+n.id:""}`:"";onAssigneeInput(n){this.assigneeTouched=true,this.assigneeFilter.set(typeof n=="string"?n:"");}onAssigneePicked(n){this.assigneeTouched=true,this.assignee=n?.id??"",this.assigneeModel=n,this.assigneeFilter.set("");}title=this.story?.title??this.input.prefill?.title??"";priority=this.story?.priority??"media";description=this.story?.description??"";status=this.story?.status??oo(this.input.prefill?.estatus||"").status;dueDateModel=this.story?.dueDate?new Date(this.story.dueDate+"T00:00:00"):null;assignee=this.story?.assignee??this.input.prefill?.assignee??"";ticket=this.story?.ticket??this.input.prefill?.ticket??"";clientId=this.story?.client??this.input.prefill?.client??"";progress=Ft(this.story?.progress??0);editable=this.status==="todo"||this.status==="in_progress";salioDeTodo=!this.isNew&&this.story.status!=="todo";progBarColor=K(()=>go(this.progress()));onProgress(n){this.progress.set(Math.min(100,Math.max(0,parseInt(n,10)||0)));}dueDateStr(){let n=this.dueDateModel;if(!n)return "";let t=e=>String(e).padStart(2,"0");return `${n.getFullYear()}-${t(n.getMonth()+1)}-${t(n.getDate())}`}openTicketConversation(){let n=this.ticket.trim();n&&this.dialog.open(ka,{data:{ticketId:n},width:"720px",maxWidth:"96vw"});}async save(){let n=this.title.trim();if(!n){this.snack.open("El t\xEDtulo no puede quedar vac\xEDo.","OK",{duration:3e3});return}let t=fo(this.progress()),e=this.assignee||null;if(this.isNew){let r=this.ticket.trim();this.data.addStory({title:n,priority:this.priority,description:this.description.trim(),status:this.status,dueDate:this.dueDateStr(),assignee:e,client:this.clientId||null,ticket:r,progress:t}),this.maybeAssignHd(r,e),this.ref.close(true);return}let i=this.story;if(this.salioDeTodo&&this.status==="todo"){this.snack.open("Una tarea que ya sali\xF3 de To Do no puede volver.","OK",{duration:3e3});return}if(i.status==="todo"&&this.status==="in_progress"&&!await vo(i,{data:this.data,auth:this.auth,dialog:this.dialog,snack:this.snack}))return;this.data.updateStoryTitle(i.id,n),this.data.updateStoryDescription(i.id,this.description.trim()),this.data.updateStoryProgress(i.id,t),this.data.updateStoryStatus(i.id,this.status),this.data.updateStoryDueDate(i.id,this.dueDateStr()),this.data.updateStoryAssignee(i.id,e),this.esHelpdesk()&&!i.ticket&&this.data.updateStoryClient(i.id,this.clientId||null),this.editable&&this.data.updateStoryPriority(i.id,this.priority),this.maybeAssignHd(i.ticket,e,i.assignee);let o=lo[this.status];i.ticket&&this.status!==i.status&&o&&this.helpdesk.setTicketStatus(i.ticket,o).then(r=>{r&&this.data.updateStoryHdEstatus(i.id,o);}),this.ref.close(true);}maybeAssignHd(n,t,e){!n||!t||t===e||this.helpdesk.assignTicket(n,t).then(i=>{i?this.snack.open(`Ticket #${n} asignado a ${t} en el Helpdesk.`,"",{duration:2500}):this.snack.open(`No se pudo asignar el ticket #${n} en el Helpdesk.`,"OK",{duration:4e3});});}async remove(){if(!this.story)return;await ah(this.dialog.open(St,{data:{title:"Eliminar tarea",message:`Vas a eliminar la tarea:

"${this.story.title}"

Esta acci\xF3n NO se puede deshacer.`,confirmText:"Eliminar",danger:true,requireWord:"BORRAR"}}).afterClosed())&&(this.data.deleteStory(this.story.id),this.ref.close(true));}static \u0275fac=function(t){return new(t||a)};static \u0275cmp=PE({type:a,selectors:[["app-card-detail-dialog"]],decls:56,vars:23,consts:[["autoAssignee","matAutocomplete"],["duePicker",""],["autoClient","matAutocomplete"],["mat-dialog-title",""],[1,"detail"],["appearance","outline",1,"full"],["matInput","","placeholder","T\xEDtulo de la tarea",3,"ngModelChange","ngModel"],[1,"row"],[1,"meta"],[1,"ticket-estado"],["mat-stroked-button","","type","button",1,"conv-btn"],["matInput","","placeholder","Buscar por nombre o c\xF3digo...","autocomplete","off",3,"ngModelChange","matAutocomplete","ngModel"],["matSuffix",""],[3,"optionSelected","displayWith"],[3,"value"],["disabled","",3,"value"],["appearance","outline",1,"grow"],[3,"ngModel"],["matInput","","readonly","",3,"value"],["matInput","","rows","3","placeholder","Detalle adicional, contexto, pasos...",3,"ngModelChange","ngModel"],[1,"block-label"],[1,"prog"],["mode","determinate",3,"value"],["type","number","min","0","max","100","step","5",3,"input","value"],["matInput","",3,"ngModelChange","matDatepicker","ngModel"],["matIconSuffix","",3,"for"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"],["matInput","","placeholder","Buscar cliente...","autocomplete","off",3,"ngModelChange","matAutocomplete","ngModel"],["appearance","outline",1,"ticket"],["matInput","","inputmode","numeric","placeholder","Buscar ticket\u2026",3,"ngModelChange","blur","keydown.enter","ngModel"],["matSuffix","","diameter","18"],[1,"ticket-badge"],["disableRipple",""],[1,"te-label"],[1,"te-badge"],["mat-stroked-button","","type","button",1,"conv-btn",3,"click"],[1,"opt-name"],[1,"opt-meta"],[3,"ngModelChange","ngModel"],["mat-button","",1,"danger",3,"click"],["mat-stroked-button","","matTooltip","Transferir a otro equipo"],["mat-stroked-button","","matTooltip","Solicitar reasignaci\xF3n/transferencia al Responsable de Equipo"],[1,"spacer"],["mat-stroked-button","","matTooltip","Transferir a otro equipo",3,"click"],["mat-stroked-button","","matTooltip","Solicitar reasignaci\xF3n/transferencia al Responsable de Equipo",3,"click"]],template:function(t,e){if(t&1){let i=yI();si(0,"h2",3),ZI(1),Cc(),si(2,"mat-dialog-content",4)(3,"mat-form-field",5)(4,"mat-label"),ZI(5,"T\xEDtulo"),Cc(),si(6,"input",6),Lp("ngModelChange",function(r){return Xl(i),eD(e.title,r)||(e.title=r),eu(r)}),Cc(),Gv(),Cc(),sI(7,xn,15,6,"div",7)(8,Mn,3,2,"div",8),sI(9,En,5,5,"div",9),sI(10,Dn,4,0,"button",10),si(11,"mat-form-field",5)(12,"mat-label"),ZI(13,"Asignado a"),Cc(),si(14,"input",11),mp("ngModelChange",function(r){return e.onAssigneeInput(r)}),Cc(),Gv(),si(15,"mat-icon",12),ZI(16,"search"),Cc(),si(17,"mat-autocomplete",13,0),mp("optionSelected",function(r){return e.onAssigneePicked(r.option.value)}),si(19,"mat-option",14),ZI(20,"\u2014 Sin asignar \u2014"),Cc(),uI(21,An,4,3,"mat-option",14,zi,false,Tn,2,1,"mat-option",15),Cc()(),si(24,"div",7)(25,"mat-form-field",16)(26,"mat-label"),ZI(27,"Prioridad"),Cc(),sI(28,Fn,3,1,"mat-select",17)(29,Pn,1,1,"input",18),Cc(),si(30,"mat-form-field",16)(31,"mat-label"),ZI(32,"Estado"),Cc(),up(33,"input",18),Cc()(),si(34,"mat-form-field",5)(35,"mat-label"),ZI(36,"Descripci\xF3n"),Cc(),si(37,"textarea",19),Lp("ngModelChange",function(r){return Xl(i),eD(e.description,r)||(e.description=r),eu(r)}),Cc(),Gv(),Cc(),si(38,"label",20),ZI(39),Cc(),si(40,"div",21),up(41,"mat-progress-bar",22),si(42,"input",23),mp("input",function(r){return e.onProgress(r.target.value)}),Cc()(),si(43,"mat-form-field",5)(44,"mat-label"),ZI(45,"Fecha de entrega"),Cc(),si(46,"input",24),Lp("ngModelChange",function(r){return Xl(i),eD(e.dueDateModel,r)||(e.dueDateModel=r),eu(r)}),Cc(),Gv(),up(47,"mat-datepicker-toggle",25)(48,"mat-datepicker",null,1),Cc()(),si(50,"mat-dialog-actions",26),sI(51,Bn,5,2),si(52,"button",27),ZI(53,"Cancelar"),Cc(),si(54,"button",28),mp("click",function(){return e.save()}),ZI(55),Cc()();}if(t&2){let i,o=MI(18),r=MI(49);Oy(),xc(" ",e.isNew?"Nueva tarea":e.story.id,`
`),Oy(5),Pp("ngModel",e.title),Qv(),Oy(),aI(e.showClientEditor()?7:e.story.ticket||e.client?8:-1),Oy(2),aI((i=e.ticketEstatus())?9:-1,i),Oy(),aI(e.ticket.trim()?10:-1),Oy(4),lp("matAutocomplete",o)("ngModel",e.assigneeModel),Qv(),Oy(3),lp("displayWith",e.displayAssignee),Oy(2),lp("value",null),Oy(2),dI(e.filteredAssignees()),Oy(7),aI(e.editable?28:29),Oy(5),lp("value",e.STATUS_LABELS[e.status]),Oy(4),Pp("ngModel",e.description),Qv(),Oy(2),xc("Progreso \u2014 ",e.progress(),"%"),Oy(2),Cp("--mdc-linear-progress-active-indicator-color",e.progBarColor()),lp("value",e.progress()),Oy(),lp("value",e.progress()),Oy(4),lp("matDatepicker",r),Pp("ngModel",e.dueDateModel),Qv(),Oy(),lp("for",r),Oy(4),aI(e.isNew?-1:51),Oy(4),kp(e.isNew?"Crear":"Guardar");}},dependencies:[ta,ie$1,Xn,bn$1,Ht$1,jt,Nt,zt,Vt,va,ga,de,nt,oe,It,nn$1,tn$1,Ft$1,Rt,J$1,Ni,Hi,ae,Ri,ie,Pi,yt,wt,ca,da,Ze,Ue,zs,Ys,Ya,rr,Yt,mt],styles:[".detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:8px;min-width:460px}.full[_ngcontent-%COMP%]{width:100%}.ticket-estado[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin:2px 0 10px;font-size:13px}.ticket-estado[_ngcontent-%COMP%]   .te-label[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant, #5c5c68)}.ticket-estado[_ngcontent-%COMP%]   .te-badge[_ngcontent-%COMP%]{padding:2px 10px;border-radius:12px;font-size:12px;font-weight:700}.row[_ngcontent-%COMP%]{display:flex;gap:12px}.row[_ngcontent-%COMP%]   .grow[_ngcontent-%COMP%]{flex:1}.row[_ngcontent-%COMP%]   .ticket[_ngcontent-%COMP%]{width:120px}.meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin:0 0 14px}.ticket-badge[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-size:13px;font-weight:600;color:var(--mat-sys-primary)}.block-label[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);margin:2px 0 6px}.prog[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;margin-bottom:16px}.prog[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{flex:1;border-radius:4px}.prog[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:64px;padding:6px 8px;border:1px solid var(--mat-sys-outline);border-radius:6px;background:var(--mat-sys-surface);color:var(--mat-sys-on-surface);font:inherit;text-align:right}.opt-name[_ngcontent-%COMP%]{font-weight:500}.opt-meta[_ngcontent-%COMP%]{margin-left:8px;font-family:JetBrains Mono,monospace;color:var(--mat-sys-on-surface-variant)}.conv-btn[_ngcontent-%COMP%]{align-self:flex-start;margin-bottom:12px}.spacer[_ngcontent-%COMP%]{flex:1}.danger[_ngcontent-%COMP%]{color:var(--mat-sys-error)}@media(max-width:560px){.detail[_ngcontent-%COMP%]{min-width:0}.row[_ngcontent-%COMP%]{flex-direction:column;gap:0}.row[_ngcontent-%COMP%]   .ticket[_ngcontent-%COMP%]{width:100%}}"]})};export{Pi as P,Ri as R,Wi as W,ie as i,sa as s};