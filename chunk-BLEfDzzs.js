import {l as l$1}from'./chunk-DLkJ0Otm.js';import {l,f}from'./chunk-Cd0jwS8_.js';import {T,U}from'./chunk-Btk1wiim.js';import {K}from'./chunk-De9u4x5z.js';import {D,Y as Yp,c as ce,e as Wt,f as ee,L as Le,K as K$1,h as we,F as Ft$1,j as WL,J as JL,l as Ly,m as Qt,n as z,O as OE,o as cr,p as Mt$1,S as So,q as oi$1,i as ii$1,g as gp,Q as QI,w as wc,a as iI,r as lp,k as ky,d as cp,s as sI,t as Dp,C as CI,$ as $e$1,u as O,H as Ht,x as jt$1,N as Nt,y as zt$1,V as Vt,B as lI,M as Mc,E as uI,G as LE,I as Cl,R as qr,T as mr,U as w,Z as tr,_ as II,a0 as DI,a1 as FI,a2 as Cp,a3 as vp,a4 as TI,a5 as bI,a6 as Or,a7 as gh,a8 as h,a9 as Tm,aa as Xf,ab as iD,ac as $l,ad as wd,ae as ap,af as Ep,ag as VE,ah as vt,ai as Xt,aj as he,ak as bp,al as mI,am as Yl,v as vI,an as Kl,W as Wv,z as zv,ao as tp,A as Ap,ap as N$1,aq as Se,ar as ct,as as U$1,at as q,au as sh,av as cn,aw as je,ax as me,ay as Rh,az as Br,aA as Ir,aB as jv,aC as kr,aD as te,aE as $e$2,aF as Li$1,aG as QL,aH as Yh,aI as Hr,aJ as tn$1,aK as Is,aL as Wo,aM as T$1,aN as Qh,aO as Fh,aP as jh,aQ as fp,aR as Zd}from'./main-LWNN6IBX.js';import {Q as Qt$1}from'./chunk-CIOavJ-p.js';import {y as yt,w as wt}from'./chunk-IjnehQ9G.js';import {K as Ko,a as an$1,Z as Zo,N as Ni$1,c as ba,U as Ui$1,f as fe,j as jn,d as de,e as yo,A as Ar,F as Fr,h as ha}from'./chunk-CV58Og2d.js';import {N}from'./chunk-COXnClX7.js';var Ne=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=LE({type:i});static \u0275inj=Cl({imports:[qr]})}return i})();var oi=["*"],ri=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`,si=["unscopedContent"],li=["text"],ci=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],di=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var mi=new N$1("ListOption"),hi=(()=>{class i{_elementRef=D(mr);static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return i})(),pi=(()=>{class i{_elementRef=D(mr);static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return i})(),_i=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return i})(),Qe=(()=>{class i{_listOption=D(mi,{optional:true});_isAlignedAtStart(){return !this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,hostVars:4,hostBindings:function(e,n){e&2&&Cp("mdc-list-item__start",n._isAlignedAtStart())("mdc-list-item__end",!n._isAlignedAtStart());}})}return i})(),ui=(()=>{class i extends Qe{static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275dir=VE({type:i,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[Xf]})}return i})(),gi=(()=>{class i extends Qe{static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275dir=VE({type:i,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[Xf]})}return i})(),fi=new N$1("MAT_LIST_CONFIG"),Rt=(()=>{class i{_isNonInteractive=true;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=$l(t);}_disableRipple=false;get disabled(){return this._disabled()}set disabled(t){this._disabled.set($l(t));}_disabled=Ft$1(false);_defaultOptions=D(fi,{optional:true});static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,hostVars:1,hostBindings:function(e,n){e&2&&ap("aria-disabled",n.disabled);},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return i})(),bi=(()=>{class i{_elementRef=D(mr);_ngZone=D(Se);_listBase=D(Rt,{optional:true});_platform=D(w);_hostElement;_isButtonElement;_noopAnimations=ct();_avatars;_icons;set lines(t){this._explicitLines=Xt(t,null),this._updateItemLines(false);}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(t){this._disableRipple=$l(t);}_disableRipple=false;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(t){this._disabled.set($l(t));}_disabled=Ft$1(false);_subscriptions=new U$1;_rippleRenderer=null;_hasUnscopedTextContent=false;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){D(q).load(sh);let t=D(cn,{optional:true});this.rippleConfig=t||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button");}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(true);}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents();}_hasIconOrAvatar(){return !!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new je(this,this._ngZone,this._hostElement,this._platform,D(me)),this._rippleRenderer.setupTriggerEvents(this._hostElement);}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Rh(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(false)));});}_updateItemLines(t){if(!this._lines||!this._titles||!this._unscopedContent)return;t&&this._checkDomForUnscopedTextContent();let e=this._explicitLines??this._inferLinesFromContent(),n=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",e<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",e<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",e===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",e===3),this._hasUnscopedTextContent){let s=this._titles.length===0&&e===1;n.classList.toggle("mdc-list-item__primary-text",s),n.classList.toggle("mdc-list-item__secondary-text",!s);}else n.classList.remove("mdc-list-item__primary-text"),n.classList.remove("mdc-list-item__secondary-text");}_inferLinesFromContent(){let t=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(t+=1),t}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(t=>t.nodeType!==t.COMMENT_NODE).some(t=>!!(t.textContent&&t.textContent.trim()));}static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,contentQueries:function(e,n,s){if(e&1&&vp(s,ui,4)(s,gi,4),e&2){let m;TI(m=bI())&&(n._avatars=m),TI(m=bI())&&(n._icons=m);}},hostVars:4,hostBindings:function(e,n){e&2&&(ap("aria-disabled",n.disabled)("disabled",n._isButtonElement&&n.disabled||null),Cp("mdc-list-item--disabled",n.disabled));},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return i})();var Ue=(()=>{class i extends bi{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(t){this._activated=$l(t);}_activated=false;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(e,n,s){if(e&1&&vp(s,pi,5)(s,hi,5)(s,_i,5),e&2){let m;TI(m=bI())&&(n._lines=m),TI(m=bI())&&(n._titles=m),TI(m=bI())&&(n._meta=m);}},viewQuery:function(e,n){if(e&1&&Ep(si,5)(li,5),e&2){let s;TI(s=bI())&&(n._unscopedContent=s.first),TI(s=bI())&&(n._itemText=s.first);}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(e,n){e&2&&(ap("aria-current",n._getAriaCurrent()),Cp("mdc-list-item--activated",n.activated)("mdc-list-item--with-leading-avatar",n._avatars.length!==0)("mdc-list-item--with-leading-icon",n._icons.length!==0)("mdc-list-item--with-trailing-meta",n._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",n._hasBothLeadingAndTrailing())("_mat-animation-noopable",n._noopAnimations));},inputs:{activated:"activated"},exportAs:["matListItem"],features:[Xf],ngContentSelectors:di,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(e,n){e&1&&(II(ci),DI(0),ii$1(1,"span",1),DI(2,1),DI(3,2),ii$1(4,"span",2,0),gp("cdkObserveContent",function(){return n._updateItemLines(true)}),DI(6,3),wc()(),DI(7,4),DI(8,5),lp(9,"div",3));},dependencies:[wd],encapsulation:2})}return i})();var qe=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,selectors:[["","mat-subheader",""],["","matSubheader",""]],hostAttrs:[1,"mat-mdc-subheader","mdc-list-group__subheader"]})}return i})();var Ge=(()=>{class i extends Rt{_isNonInteractive=false;static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-nav-list"]],hostAttrs:["role","navigation",1,"mat-mdc-nav-list","mat-mdc-list-base","mdc-list"],exportAs:["matNavList"],features:[iD([{provide:Rt,useExisting:i}]),Xf],ngContentSelectors:oi,decls:1,vars:0,template:function(e,n){e&1&&(II(),DI(0));},styles:[ri],encapsulation:2})}return i})();var He=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=LE({type:i});static \u0275inj=Cl({imports:[Or,gh,h,qr,Ne]})}return i})();var Ct=["*"],wi=["content"],We=[[["mat-drawer"],["mat-sidenav"]],[["mat-drawer-content"],["mat-sidenav-content"]],"*"],Ze=["mat-drawer, mat-sidenav","mat-drawer-content, mat-sidenav-content","*"];function yi(i,a){if(i&1){let t=mI();ii$1(0,"div",1),gp("click",function(){Yl(t);let n=vI();return Kl(n._onBackdropClicked())}),wc();}if(i&2){let t=vI();Cp("mat-drawer-shown",t._isShowingBackdrop());}}function ki(i,a){i&1&&(ii$1(0,"mat-drawer-content"),DI(1,2),wc());}function Ci(i,a){if(i&1){let t=mI();ii$1(0,"div",1),gp("click",function(){Yl(t);let n=vI();return Kl(n._onBackdropClicked())}),wc();}if(i&2){let t=vI();Cp("mat-drawer-shown",t._isShowingBackdrop());}}function Mi(i,a){i&1&&(ii$1(0,"mat-sidenav-content"),DI(1,2),wc());}var Di=`.mat-drawer-container {
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
`;var Ei=new N$1("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>false}),Bt=new N$1("MAT_DRAWER_CONTAINER"),mt=(()=>{class i extends he{_platform=D(w);_changeDetectorRef=D(QL);_element=D(mr);_ngZone=D(Se);_isInert=false;_container=D(zt);ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>this._changeDetectorRef.markForCheck());}_drawerToggled(t){t.opened?this._ngZone.runOutsideAngular(()=>{t._animationEnd.pipe(jh(50),tn$1(1)).subscribe(()=>this._updateInert());}):this._updateInert();}_updateInert(){let t=this._container._isShowingBackdrop();if(t!==this._isInert){let e=this._element.nativeElement;this._isInert=t,t?e.setAttribute("inert","true"):e.removeAttribute("inert");}}_shouldBeHidden(){if(this._platform.isBrowser)return  false;let{start:t,end:e}=this._container;return t!=null&&t.mode!=="over"&&t.opened||e!=null&&e.mode!=="over"&&e.opened}static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(e,n){e&2&&(bp("margin-left",n._container._contentMargins.left,"px")("margin-right",n._container._contentMargins.right,"px"),Cp("mat-drawer-content-hidden",n._shouldBeHidden()));},features:[iD([{provide:he,useExisting:i}]),Xf],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,n){e&1&&(II(),DI(0));},encapsulation:2})}return i})(),Ft=(()=>{class i{_elementRef=D(mr);_focusTrapFactory=D(Br);_focusMonitor=D(Ir);_platform=D(w);_ngZone=D(Se);_renderer=D(jv);_interactivityChecker=D(kr);_doc=D(tr);_container=D(Bt,{optional:true});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=false;_anchor=null;get position(){return this._position}set position(t){t=t==="end"?"end":"start",t!==this._position&&(this._isAttached&&this._updatePositionInParent(t),this._position=t,this.onPositionChanged.emit());}_position="start";get mode(){return this._mode}set mode(t){this._mode=t,this._updateFocusTrapState(),this._modeChanged.next();}_mode="over";get disableClose(){return this._disableClose}set disableClose(t){this._disableClose=$l(t);}_disableClose=false;get autoFocus(){let t=this._autoFocus;return t??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(t){(t==="true"||t==="false"||t==null)&&(t=$l(t)),this._autoFocus=t;}_autoFocus;get opened(){return this._opened()}set opened(t){this.toggle($l(t));}_opened=Ft$1(false);_openedVia=null;_animationStarted=new te;_animationEnd=new te;openedChange=new $e$2(true);_openedStream=this.openedChange.pipe(Qt(t=>t),we(()=>{}));openedStart=this._animationStarted.pipe(Qt(()=>this.opened),Li$1(void 0));_closedStream=this.openedChange.pipe(Qt(t=>!t),we(()=>{}));closedStart=this._animationStarted.pipe(Qt(()=>!this.opened),Li$1(void 0));_destroyed=new te;onPositionChanged=new $e$2;_content;_modeChanged=new te;_injector=D(me);_changeDetectorRef=D(QL);constructor(){this.openedChange.pipe(Yh(this._destroyed)).subscribe(t=>{t?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program");}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let t=this._renderer,e=this._elementRef.nativeElement;return [t.listen(e,"keydown",n=>{n.keyCode===27&&!this.disableClose&&!Hr(n)&&this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault();});}),t.listen(e,"transitionend",this._handleTransitionEvent),t.listen(e,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened);});}_focusByCssSelector(t,e){let n=this._elementRef.nativeElement.querySelector(t);n&&(this._interactivityChecker.isFocusable(n)||(n.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let s=()=>{m(),C(),n.removeAttribute("tabindex");},m=this._renderer.listen(n,"blur",s),C=this._renderer.listen(n,"mousedown",s);})),n.focus(e));}_takeFocus(){if(!this._focusTrap)return;let t=this._elementRef.nativeElement;switch(this.autoFocus){case  false:case "dialog":return;case  true:case "first-tabbable":Ly(()=>{!this._focusTrap.focusInitialElement()&&typeof t.focus=="function"&&t.focus();},{injector:this._injector});break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(t){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,t):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null);}_isFocusWithinDrawer(){let t=this._doc.activeElement;return !!t&&this._elementRef.nativeElement.contains(t)}ngAfterViewInit(){this._isAttached=true,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState());}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete();}open(t){return this.toggle(true,t)}close(){return this.toggle(false)}_closeViaBackdropClick(){return this._setOpen(false,true,"mouse")}toggle(t=!this.opened,e){t&&e&&(this._openedVia=e);let n=this._setOpen(t,!t&&this._isFocusWithinDrawer(),this._openedVia||"program");return t||(this._openedVia=null),n}_setOpen(t,e,n){return t===this.opened?Promise.resolve(t?"open":"close"):(this._opened.set(t),(this._container?._content||this._container?._userContent)?._drawerToggled(this),this._container?._transitionsEnabled?(this._setIsAnimating(true),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next();}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",t),!t&&e&&this._restoreFocus(n),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(s=>{this.openedChange.pipe(tn$1(1)).subscribe(m=>s(m?"open":"close"));}))}_setIsAnimating(t){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",t);}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop());}_updatePositionInParent(t){if(!this._platform.isBrowser)return;let e=this._elementRef.nativeElement,n=e.parentNode;t==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),n.insertBefore(this._anchor,e)),n.appendChild(e)):this._anchor&&this._anchor.parentNode.insertBefore(e,this._anchor);}_handleTransitionEvent=t=>{let e=this._elementRef.nativeElement;t.target===e&&this._ngZone.run(()=>{t.type==="transitionend"&&this._setIsAnimating(false),this._animationEnd.next(t);});};static \u0275fac=function(e){return new(e||i)};static \u0275cmp=OE({type:i,selectors:[["mat-drawer"]],viewQuery:function(e,n){if(e&1&&Ep(wi,5),e&2){let s;TI(s=bI())&&(n._content=s.first);}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(e,n){e&2&&(ap("align",null)("tabIndex",n.mode!=="side"?"-1":null),bp("visibility",!n._container&&!n.opened?"hidden":null),Cp("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side"));},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Ct,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(e,n){e&1&&(II(),ii$1(0,"div",1,0),DI(2),wc());},dependencies:[he],encapsulation:2})}return i})(),zt=(()=>{class i{_dir=D(Is,{optional:true});_element=D(mr);_ngZone=D(Se);_changeDetectorRef=D(QL);_animationDisabled=ct();_transitionsEnabled=false;_allDrawers;_drawers=new Wo;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(t){this._autosize=$l(t);}_autosize=D(Ei);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(t){this._backdropOverride=t==null?null:$l(t);}_backdropOverride=null;backdropClick=new $e$2;_start=null;_end=null;_left=null;_right=null;_destroyed=new te;_doCheckSubject=new te;_contentMargins={left:null,right:null};_contentMarginChanges=new te;get scrollable(){return this._userContent||this._content}_injector=D(me);constructor(){let t=D(w),e=D(T$1);this._dir?.change.pipe(Yh(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins();}),e.change().pipe(Yh(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&t.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=true;},200);});}ngAfterContentInit(){this._allDrawers.changes.pipe(Qh(this._allDrawers),Yh(this._destroyed)).subscribe(t=>{this._drawers.reset(t.filter(e=>!e._container||e._container===this)),this._drawers.notifyOnChanges();}),this._drawers.changes.pipe(Qh(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(t=>{this._watchDrawerToggle(t),this._watchDrawerPosition(t),this._watchDrawerMode(t);}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(Fh(10),Yh(this._destroyed)).subscribe(()=>this.updateContentMargins());});}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete();}open(){this._drawers.forEach(t=>t.open());}close(){this._drawers.forEach(t=>t.close());}updateContentMargins(){let t=0,e=0;if(this._left&&this._left.opened){if(this._left.mode=="side")t+=this._left._getWidth();else if(this._left.mode=="push"){let n=this._left._getWidth();t+=n,e-=n;}}if(this._right&&this._right.opened){if(this._right.mode=="side")e+=this._right._getWidth();else if(this._right.mode=="push"){let n=this._right._getWidth();e+=n,t-=n;}}t=t||null,e=e||null,(t!==this._contentMargins.left||e!==this._contentMargins.right)&&(this._contentMargins={left:t,right:e},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)));}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next());}_watchDrawerToggle(t){t._animationStarted.pipe(Yh(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();}),t.mode!=="side"&&t.openedChange.pipe(Yh(this._drawers.changes)).subscribe(()=>this._setContainerClass(t.opened));}_watchDrawerPosition(t){t.onPositionChanged.pipe(Yh(this._drawers.changes)).subscribe(()=>{Ly({read:()=>this._validateDrawers()},{injector:this._injector});});}_watchDrawerMode(t){t._modeChanged.pipe(Yh(Rh(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck();});}_setContainerClass(t){let e=this._element.nativeElement.classList,n="mat-drawer-container-has-open";t?e.add(n):e.remove(n);}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(t=>{t.position=="end"?(this._end!=null,this._end=t):(this._start!=null,this._start=t);}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end);}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop();}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(t=>t&&!t.disableClose&&this._drawerHasBackdrop(t)).forEach(t=>t._closeViaBackdropClick());}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(t){return t!=null&&t.opened}_drawerHasBackdrop(t){return this._backdropOverride==null?!!t&&t.mode!=="side":this._backdropOverride}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=OE({type:i,selectors:[["mat-drawer-container"]],contentQueries:function(e,n,s){if(e&1&&vp(s,mt,5)(s,Ft,5),e&2){let m;TI(m=bI())&&(n._content=m.first),TI(m=bI())&&(n._allDrawers=m);}},viewQuery:function(e,n){if(e&1&&Ep(mt,5),e&2){let s;TI(s=bI())&&(n._userContent=s.first);}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(e,n){e&2&&Cp("mat-drawer-container-explicit-backdrop",n._backdropOverride);},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[iD([{provide:Bt,useExisting:i}])],ngContentSelectors:Ze,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(e,n){e&1&&(II(We),iI(0,yi,1,2,"div",0),DI(1),DI(2,1),iI(3,ki,2,0,"mat-drawer-content")),e&2&&(sI(n.hasBackdrop?0:-1),ky(3),sI(n._content?-1:3));},dependencies:[mt],styles:[`.mat-drawer-container {
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
`],encapsulation:2})}return i})(),kt=(()=>{class i extends mt{static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[iD([{provide:he,useExisting:i},{provide:mt,useExisting:i}]),Xf],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,n){e&1&&(II(),DI(0));},encapsulation:2})}return i})(),jt=(()=>{class i extends Ft{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(t){this._fixedInViewport=$l(t);}_fixedInViewport=false;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(t){this._fixedTopGap=Xt(t);}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(t){this._fixedBottomGap=Xt(t);}_fixedBottomGap=0;static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(e,n){e&2&&(ap("tabIndex",n.mode!=="side"?"-1":null)("align",null),bp("top",n.fixedInViewport?n.fixedTopGap:null,"px")("bottom",n.fixedInViewport?n.fixedBottomGap:null,"px"),Cp("mat-drawer-end",n.position==="end")("mat-drawer-over",n.mode==="over")("mat-drawer-push",n.mode==="push")("mat-drawer-side",n.mode==="side")("mat-sidenav-fixed",n.fixedInViewport));},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[iD([{provide:Ft,useExisting:i}]),Xf],ngContentSelectors:Ct,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(e,n){e&1&&(II(),ii$1(0,"div",1,0),DI(2),wc());},dependencies:[he],encapsulation:2})}return i})(),Ke=(()=>{class i extends zt{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let t;return function(n){return (t||(t=Tm(i)))(n||i)}})();static \u0275cmp=OE({type:i,selectors:[["mat-sidenav-container"]],contentQueries:function(e,n,s){if(e&1&&vp(s,kt,5)(s,jt,5),e&2){let m;TI(m=bI())&&(n._content=m.first),TI(m=bI())&&(n._allDrawers=m);}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(e,n){e&2&&Cp("mat-drawer-container-explicit-backdrop",n._backdropOverride);},exportAs:["matSidenavContainer"],features:[iD([{provide:Bt,useExisting:i},{provide:zt,useExisting:i}]),Xf],ngContentSelectors:Ze,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(e,n){e&1&&(II(We),iI(0,Ci,1,2,"div",0),DI(1),DI(2,1),iI(3,Mi,2,0,"mat-sidenav-content")),e&2&&(sI(n.hasBackdrop?0:-1),ky(3),sI(n._content?-1:3));},dependencies:[kt],styles:[Di],encapsulation:2})}return i})(),$e=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=LE({type:i});static \u0275inj=Cl({imports:[vt,qr,vt]})}return i})();var Ti=["*",[["mat-toolbar-row"]]],Oi=["*","mat-toolbar-row"],Li=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=VE({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),Ye=(()=>{class i{_elementRef=D(mr);_platform=D(w);_document=D(tr);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()));}_checkToolbarMixedModes(){this._toolbarRows.length;}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=OE({type:i,selectors:[["mat-toolbar"]],contentQueries:function(e,n,s){if(e&1&&vp(s,Li,5),e&2){let m;TI(m=bI())&&(n._toolbarRows=m);}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(e,n){e&2&&(FI(n.color?"mat-"+n.color:""),Cp("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0));},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Oi,decls:2,vars:0,template:function(e,n){e&1&&(II(Ti),DI(0),DI(1,1));},styles:[`.mat-toolbar {
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
`],encapsulation:2})}return i})();var Xe=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=LE({type:i});static \u0275inj=Cl({imports:[qr]})}return i})();function Ii(i,a){i&1&&(lp(0,"img",19),ii$1(1,"div",20)(2,"mat-icon"),QI(3,"zoom_in"),wc()()),i&2&&cp("src",a,Zd);}function Ri(i,a){if(i&1&&(ii$1(0,"span"),QI(1),wc()),i&2){let t=vI(2);ky(),Ap(t.iniciales());}}function Fi(i,a){i&1&&(ii$1(0,"div",6)(1,"mat-icon"),QI(2,"hourglass_top"),wc()());}function zi(i,a){if(i&1&&(ii$1(0,"div",9),QI(1),wc()),i&2){let t=vI();ky(),Ap(t.email);}}function Bi(i,a){if(i&1&&(ii$1(0,"div",11)(1,"span",12),QI(2,"Rol HelpDesk"),wc(),ii$1(3,"span",13),QI(4),wc()()),i&2){let t=vI();ky(4),Ap(t.apiRole);}}function ji(i,a){if(i&1){let t=mI();ii$1(0,"button",21),gp("click",function(){Yl(t);let n=vI(2);return Kl(n.quitar())}),ii$1(1,"mat-icon"),QI(2,"delete"),wc(),QI(3," Quitar foto "),wc();}if(i&2){let t=vI(2);cp("disabled",t.subiendo());}}function Vi(i,a){if(i&1){let t=mI();ii$1(0,"div",4)(1,"div",5),gp("click",function(){Yl(t);let n=vI();return Kl(n.abrirFoto())}),iI(2,Ii,4,1)(3,Ri,2,1,"span"),iI(4,Fi,3,0,"div",6),wc(),ii$1(5,"div",7)(6,"div",8),QI(7),wc(),iI(8,zi,2,1,"div",9),wc()(),ii$1(9,"div",10),iI(10,Bi,5,1,"div",11),ii$1(11,"div",11)(12,"span",12),QI(13,"Rol FitDesk"),wc(),ii$1(14,"span",13),QI(15),wc()(),ii$1(16,"div",11)(17,"span",12),QI(18,"Equipo"),wc(),ii$1(19,"span",13),QI(20),wc()()(),ii$1(21,"div",14)(22,"label",15)(23,"mat-icon"),QI(24,"photo_camera"),wc(),QI(25," Cambiar foto "),ii$1(26,"input",16),gp("change",function(n){Yl(t);let s=vI();return Kl(s.onArchivo(n))}),wc()(),iI(27,ji,4,1,"button",17),wc(),ii$1(28,"p",18),QI(29,"La foto se guarda en tu cuenta (se ve desde cualquier dispositivo y para los dem\xE1s)."),wc();}if(i&2){let t,e=a,n=vI();ky(),bp("background",n.foto()?null:e.color),Cp("clickable",n.foto()),cp("title",n.foto()?"Ver foto completa":""),ky(),sI((t=n.foto())?2:3,t),ky(2),sI(n.subiendo()?4:-1),ky(3),Ap(e.name),ky(),sI(e.email?8:-1),ky(2),sI(e.apiRole?10:-1),ky(5),Ap(n.rolesFitdesk().length?n.rolesFitdesk().join(", "):"\u2014"),ky(5),Ap(n.equiposTexto()||"\u2014"),ky(2),Cp("disabled",n.subiendo()),ky(4),cp("disabled",n.subiendo()),ky(),sI(n.foto()?27:-1);}}function Ni(i,a){if(i&1){let t=mI();ii$1(0,"div",22),gp("click",function(){Yl(t);let n=vI();return Kl(n.verFoto.set(false))}),ii$1(1,"img",23),gp("click",function(n){return n.stopPropagation()}),wc(),ii$1(2,"button",24),gp("click",function(){Yl(t);let n=vI();return Kl(n.verFoto.set(false))}),ii$1(3,"mat-icon"),QI(4,"close"),wc()()();}if(i&2){let t=vI();ky(),cp("src",t.foto(),Zd);}}var Mt=class i{auth=D(Yp);perfil=D(f);ref=D(O);snack=D(Qt$1);session=this.auth.session;subiendo=Ft$1(false);verFoto=Ft$1(false);equipos=this.perfil.misEquipos;static ROL_LABEL={ADMIN:"Administrador",RESPONSABLE_EQUIPO:"Responsable de equipo",ESPECIALISTA:"Especialista",EQUIPO:"Miembro de equipo",SCRUM_MASTER:"Scrum Master"};rolesFitdesk=K$1(()=>this.auth.rolesPlataforma().map(a=>i.ROL_LABEL[a]||this.prettify(a)));equiposTexto=K$1(()=>this.equipos().map(a=>a.nombre).join(", "));constructor(){this.auth.ensureRolesPlataforma(),this.perfil.cargarMiPerfil();}prettify(a){return a.toLowerCase().replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}foto(){return this.perfil.fotoDe(this.session()?.id)}abrirFoto(){this.foto()&&this.verFoto.set(true);}iniciales(){return (this.session()?.name||this.session()?.id||"").split(/\s+/).slice(0,2).map(t=>t[0]||"").join("").toUpperCase()||"?"}async onArchivo(a){let t=a.target,e=t.files?.[0];if(t.value="",!!e){if(!e.type.startsWith("image/")){this.snack.open("Selecciona un archivo de imagen","OK",{duration:3e3});return}this.subiendo.set(true);try{let n=await this.comprimir(e,320);await this.perfil.subirFoto(n),this.snack.open("Foto actualizada","OK",{duration:2500});}catch(n){this.snack.open(n?.message||"No se pudo subir la foto","OK",{duration:4e3});}finally{this.subiendo.set(false);}}}async quitar(){this.subiendo.set(true);try{await this.perfil.quitarFoto(),this.snack.open("Foto quitada","OK",{duration:2500});}finally{this.subiendo.set(false);}}cerrar(){this.ref.close();}comprimir(a,t){return new Promise((e,n)=>{let s=new Image,m=URL.createObjectURL(a);s.onload=()=>{URL.revokeObjectURL(m);let C=document.createElement("canvas");C.width=t,C.height=t;let f=C.getContext("2d");if(!f){n(new Error("No se pudo procesar la imagen"));return}let W=Math.min(s.width,s.height),ni=(s.width-W)/2,ai=(s.height-W)/2;f.drawImage(s,ni,ai,W,W,0,0,t,t),e(C.toDataURL("image/jpeg",.85));},s.onerror=()=>{URL.revokeObjectURL(m),n(new Error("Imagen inv\xE1lida"));},s.src=m;})}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=OE({type:i,selectors:[["app-perfil-dialog"]],decls:8,vars:2,consts:[["mat-dialog-title",""],["align","end"],["mat-button","",3,"click"],[1,"pf-lightbox"],[1,"pf-top"],[1,"pf-avatar",3,"click","title"],[1,"pf-avatar-loading"],[1,"pf-id"],[1,"pf-name"],[1,"pf-meta"],[1,"pf-rows"],[1,"pf-row"],[1,"pf-label"],[1,"pf-val"],[1,"pf-actions"],[1,"pf-btn"],["type","file","accept","image/*","hidden","",3,"change","disabled"],["mat-stroked-button","",3,"disabled"],[1,"pf-hint"],["alt","Foto de perfil",3,"src"],[1,"pf-avatar-zoom"],["mat-stroked-button","",3,"click","disabled"],[1,"pf-lightbox",3,"click"],["alt","Foto de perfil",3,"click","src"],["aria-label","Cerrar",1,"pf-lightbox-close",3,"click"]],template:function(t,e){if(t&1&&(ii$1(0,"h2",0),QI(1,"Mi perfil"),wc(),ii$1(2,"mat-dialog-content"),iI(3,Vi,30,16),wc(),ii$1(4,"mat-dialog-actions",1)(5,"button",2),gp("click",function(){return e.cerrar()}),QI(6,"Cerrar"),wc()(),iI(7,Ni,5,1,"div",3)),t&2){let n;ky(3),sI((n=e.session())?3:-1,n),ky(4),sI(e.verFoto()?7:-1);}},dependencies:[Ht,Nt,zt$1,Vt,ba,ha,yt,wt],styles:[".pf-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;margin-bottom:12px}.pf-avatar[_ngcontent-%COMP%]{position:relative;flex:none;width:72px;height:72px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:24px;letter-spacing:.5px}.pf-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.pf-avatar[_ngcontent-%COMP%]   .pf-avatar-loading[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#00000059;color:#fff}.pf-name[_ngcontent-%COMP%]{font-weight:700;font-size:16px}.pf-meta[_ngcontent-%COMP%]{font-size:13px;color:var(--mat-sys-on-surface-variant)}.pf-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}.pf-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid var(--mat-sys-outline, #bdbdbd);border-radius:20px;padding:6px 14px;font:inherit;font-size:14px;font-weight:500;color:var(--mat-sys-primary, #048abf)}.pf-btn.disabled[_ngcontent-%COMP%]{opacity:.6;pointer-events:none}.pf-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.pf-hint[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);margin:4px 0 0}.pf-avatar.clickable[_ngcontent-%COMP%]{cursor:zoom-in}.pf-avatar[_ngcontent-%COMP%]   .pf-avatar-zoom[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#00000040;color:#fff;opacity:0;transition:opacity .15s}.pf-avatar.clickable[_ngcontent-%COMP%]:hover   .pf-avatar-zoom[_ngcontent-%COMP%]{opacity:1}.pf-rows[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;margin:4px 0 10px;padding:8px 0;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.pf-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:8px;font-size:13px}.pf-label[_ngcontent-%COMP%]{flex:none;width:92px;color:var(--mat-sys-on-surface-variant);font-weight:600}.pf-val[_ngcontent-%COMP%]{flex:1;min-width:0}.pf-lightbox[_ngcontent-%COMP%]{position:fixed;inset:0;z-index:2000;background:#000000d9;display:flex;align-items:center;justify-content:center;cursor:zoom-out}.pf-lightbox[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:min(90vw,480px);max-height:90vh;border-radius:8px;box-shadow:0 8px 40px #00000080;cursor:default}.pf-lightbox[_ngcontent-%COMP%]   .pf-lightbox-close[_ngcontent-%COMP%]{position:absolute;top:16px;right:16px;width:40px;height:40px;border:none;border-radius:50%;background:#ffffff26;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center}.pf-lightbox[_ngcontent-%COMP%]   .pf-lightbox-close[_ngcontent-%COMP%]:hover{background:#ffffff4d}"]})};var Qi=(i,a)=>a.ticket;function Ui(i,a){if(i&1&&(ii$1(0,"span",9),QI(1),wc()),i&2){let t=vI().$implicit;ky(),Ap(t.clienteRaw);}}function qi(i,a){if(i&1&&(ii$1(0,"span",10),QI(1),wc()),i&2){let t=vI().$implicit;ky(),Ap(t.asunto);}}function Gi(i,a){if(i&1&&(ii$1(0,"span",11)(1,"mat-icon"),QI(2,"sticky_note_2"),wc(),QI(3),wc()),i&2){let t=vI().$implicit;ky(3),Ap(t.nota);}}function Hi(i,a){if(i&1&&(ii$1(0,"li")(1,"span",8),QI(2),wc(),iI(3,Ui,2,1,"span",9),iI(4,qi,2,1,"span",10),iI(5,Gi,4,1,"span",11),wc()),i&2){let t=a.$implicit;ky(2),Mc("#",t.ticket),ky(),sI(t.clienteRaw?3:-1),ky(),sI(t.asunto?4:-1),ky(),sI(t.nota?5:-1);}}var Dt=class i{data=D($e$1);ref=D(O);static \u0275fac=function(t){return new(t||i)};static \u0275cmp=OE({type:i,selectors:[["app-reminder-alert-dialog"]],decls:18,vars:1,consts:[["mat-dialog-title","",1,"ra-head"],[1,"ra-bell"],[1,"ra-body"],[1,"ra-sub"],[1,"ra-list"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click"],[1,"ra-tk"],[1,"ra-cli"],[1,"ra-asunto"],[1,"ra-nota"]],template:function(t,e){t&1&&(ii$1(0,"div",0)(1,"mat-icon",1),QI(2,"notifications_active"),wc(),ii$1(3,"span"),QI(4,"Recordatorio de tickets"),wc()(),ii$1(5,"mat-dialog-content",2)(6,"p",3),QI(7),wc(),ii$1(8,"ul",4),lI(9,Hi,6,4,"li",null,Qi),wc()(),ii$1(11,"mat-dialog-actions",5)(12,"button",6),QI(13,"Cerrar"),wc(),ii$1(14,"button",7),gp("click",function(){return e.ref.close("ver")}),ii$1(15,"mat-icon"),QI(16,"list"),wc(),QI(17," Ver pendientes "),wc()()),t&2&&(ky(7),Mc(" ",e.data.items.length===1?"Lleg\xF3 la hora de revisar este ticket:":"Lleg\xF3 la hora de revisar estos tickets:"," "),ky(2),uI(e.data.items));},dependencies:[Ht,jt$1,Nt,zt$1,Vt,ba,ha,yt,wt],styles:[".ra-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin:0}.ra-bell[_ngcontent-%COMP%]{color:#f29e3b;animation:_ngcontent-%COMP%_ra-ring 1s ease-in-out infinite}@keyframes _ngcontent-%COMP%_ra-ring{0%,to{transform:rotate(0)}20%{transform:rotate(14deg)}40%{transform:rotate(-12deg)}60%{transform:rotate(8deg)}80%{transform:rotate(-4deg)}}.ra-sub[_ngcontent-%COMP%]{margin:0 0 8px;font-size:13px;color:var(--mat-sys-on-surface-variant)}.ra-list[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}.ra-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px;padding:8px 10px;border:1px solid var(--mat-sys-outline-variant, #e0e0e0);border-left:3px solid #f29e3b;border-radius:8px;background:var(--mat-sys-surface-container-low, #f7f9fc)}.ra-tk[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;font-weight:700;color:var(--mat-sys-primary, #048abf)}.ra-cli[_ngcontent-%COMP%]{font-size:12px;font-weight:600}.ra-asunto[_ngcontent-%COMP%]{font-size:12px;color:var(--mat-sys-on-surface-variant);width:100%}.ra-nota[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;width:100%;font-size:12px;color:var(--mat-sys-on-surface)}.ra-nota[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:15px;width:15px;height:15px;color:#f29e3b}"]})};var Wi=["shellContent"];function Zi(i,a){if(i&1){let t=mI();ii$1(0,"div",4)(1,"div",19),QI(2,"Buscar ticket"),wc(),ii$1(3,"mat-form-field",20)(4,"mat-label"),QI(5,"N\xB0 de ticket"),wc(),ii$1(6,"input",21),gp("ngModelChange",function(n){Yl(t);let s=vI();return Kl(s.gTicket.set(n))})("keydown.enter",function(){Yl(t);let n=vI();return Kl(n.buscarTicketGlobal())}),wc(),Wv(),ii$1(7,"button",22),gp("click",function(){Yl(t);let n=vI();return Kl(n.buscarTicketGlobal())}),ii$1(8,"mat-icon"),QI(9,"search"),wc()()(),ii$1(10,"mat-form-field",20)(11,"mat-label"),QI(12,"Palabra"),wc(),ii$1(13,"input",23),gp("ngModelChange",function(n){Yl(t);let s=vI();return Kl(s.gPalabra.set(n))})("keydown.enter",function(){Yl(t);let n=vI();return Kl(n.buscarPalabraGlobal())}),wc(),Wv(),ii$1(14,"button",24),gp("click",function(){Yl(t);let n=vI();return Kl(n.buscarPalabraGlobal())}),ii$1(15,"mat-icon"),QI(16,"search"),wc()()()();}if(i&2){let t=vI();ky(6),cp("ngModel",t.gTicket()),zv(),ky(7),cp("ngModel",t.gPalabra()),zv();}}function Ki(i,a){i&1&&fp(0);}function $i(i,a){i&1&&(ii$1(0,"div",5),tp(1,Ki,1,0,"ng-container",25),wc()),i&2&&(ky(),cp("ngTemplateOutlet",a));}function Yi(i,a){i&1&&(ii$1(0,"a",11),QI(1,"Mi Panel"),wc());}function Xi(i,a){i&1&&(ii$1(0,"a",13),QI(1,"Bandeja"),wc());}function Ji(i,a){i&1&&(ii$1(0,"h3",7),QI(1,"Administraci\xF3n"),wc(),ii$1(2,"a",26),QI(3,"Administraci\xF3n"),wc());}function tn(i,a){i&1&&lp(0,"img",28),i&2&&cp("src",a,Zd);}function en(i,a){if(i&1&&QI(0),i&2){let t=vI(),e=vI();Mc(" ",e.iniciales(t.name)," ");}}function nn(i,a){if(i&1){let t=mI();ii$1(0,"div",15)(1,"button",27),gp("click",function(){Yl(t);let n=vI();return Kl(n.abrirPerfil())}),iI(2,tn,1,1,"img",28)(3,en,1,1),wc(),ii$1(4,"span",29),QI(5),wc(),ii$1(6,"button",30),gp("click",function(){Yl(t);let n=vI();return Kl(n.logout())}),ii$1(7,"mat-icon"),QI(8,"logout"),wc()()();}if(i&2){let t,e=a,n=vI();ky(),bp("background",n.perfil.fotoDe(e.id)?"transparent":e.color),Cp("has-foto",n.perfil.fotoDe(e.id)),ky(),sI((t=n.perfil.fotoDe(e.id))?2:3,t),ky(3),Ap(e.name);}}function an(i,a){i&1&&lp(0,"img",28),i&2&&cp("src",a,Zd);}function on(i,a){if(i&1&&QI(0),i&2){let t=vI(),e=vI(2);Mc(" ",e.iniciales(t.name)," ");}}function rn(i,a){if(i&1){let t=mI();ii$1(0,"button",27),gp("click",function(){Yl(t);let n=vI(2);return Kl(n.abrirPerfil())}),iI(1,an,1,1,"img",28)(2,on,1,1),wc();}if(i&2){let t,e=a,n=vI(2);bp("background",n.perfil.fotoDe(e.id)?"transparent":e.color),Cp("has-foto",n.perfil.fotoDe(e.id)),ky(),sI((t=n.perfil.fotoDe(e.id))?1:2,t);}}function sn(i,a){if(i&1){let t=mI();ii$1(0,"mat-toolbar",17)(1,"button",31),gp("click",function(){Yl(t);let n=vI();return Kl(n.drawerOpen.set(!n.opened()))}),ii$1(2,"mat-icon"),QI(3,"menu"),wc()(),ii$1(4,"span",32),QI(5,"Fit-Desk"),wc(),lp(6,"span",33),iI(7,rn,3,5,"button",34),wc();}if(i&2){let t,e=vI();ky(7),sI((t=e.session())?7:-1,t);}}var ii=class i{auth=D(Yp);data=D(N);helpdesk=D(K);router=D(ce);breakpoints=D(Wt);dialog=D(ee);destroyRef=D(Le);shell=D(l);perfil=D(f);search=D(l$1);alertOpen=false;audioCtx=null;session=this.auth.session;puedeVerMiPanel=this.auth.puedeVerMiPanel;mostrarAdmin=K$1(()=>this.auth.puedeAdministrar()&&this.data.usesQuarkus());mostrarBandeja=K$1(()=>this.auth.puedeTransferir()&&this.data.usesQuarkus());isDesktop=T(this.breakpoints.observe("(min-width: 900px)").pipe(we(a=>a.matches)),{initialValue:typeof window<"u"&&window.innerWidth>=900});fixed=K$1(()=>this.isDesktop());mode=K$1(()=>this.fixed()?"side":"over");currentUrl=Ft$1(this.router.url);enTickets=K$1(()=>this.currentUrl().startsWith("/tickets"));gTicket=Ft$1("");gPalabra=Ft$1("");drawerOpen=Ft$1(false);opened=K$1(()=>this.fixed()||this.drawerOpen());shellContent=WL("shellContent");constructor(){this.data.ensureInit().then(()=>{this.data.startStreaming(),this.checkReminders();}),this.helpdesk.getHdUsers(),this.helpdesk.getClients(),this.perfil.cargarFotos();let a=setInterval(()=>this.checkReminders(),30*1e3);if(this.destroyRef.onDestroy(()=>clearInterval(a)),typeof window<"u"){let t=()=>{try{this.ensureAudio()?.resume();}catch{}window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t);};window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),this.destroyRef.onDestroy(()=>{window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t);});}JL(()=>{let t=this.fixed()||!this.opened(),e=this.shellContent()?.nativeElement;e&&t&&e.removeAttribute("inert");}),Ly(()=>{let t=this.shellContent()?.nativeElement;if(!t)return;let e=()=>{(this.fixed()||!this.opened())&&t.hasAttribute("inert")&&t.removeAttribute("inert");};e();let n=new MutationObserver(e);n.observe(t,{attributes:true,attributeFilter:["inert"]}),this.destroyRef.onDestroy(()=>n.disconnect());}),this.router.events.pipe(Qt(t=>t instanceof z),U()).subscribe(t=>{this.currentUrl.set(t.urlAfterRedirects),this.fixed()||this.drawerOpen.set(false);});}buscarTicketGlobal(){let a=this.gTicket().trim();a&&(this.search.buscar("ticket",a),this.gTicket.set(""),this.router.navigate(["/tickets"]),this.fixed()||this.drawerOpen.set(false));}buscarPalabraGlobal(){let a=this.gPalabra().trim();a&&(this.search.buscar("palabra",a),this.gPalabra.set(""),this.router.navigate(["/tickets"]),this.fixed()||this.drawerOpen.set(false));}static ALERTED_KEY="fit-daily_alerted";alarmaCache=[];alarmaCacheAt=0;async getAlarmaList(){let a=Date.now();return this.alarmaCacheAt&&a-this.alarmaCacheAt<45e3?this.alarmaCache:(this.alarmaCache=(await this.data.loadPendientesVisibles()).filter(t=>t.alarma),this.alarmaCacheAt=a,this.alarmaCache)}alertedToday(a,t){try{return JSON.parse(localStorage.getItem(i.ALERTED_KEY)||"{}")[a]===t}catch{return  false}}markAlerted(a,t){try{let e=JSON.parse(localStorage.getItem(i.ALERTED_KEY)||"{}");for(let n of a)e[n]=t;for(let n of Object.keys(e))e[n]!==t&&delete e[n];localStorage.setItem(i.ALERTED_KEY,JSON.stringify(e));}catch{}}async checkReminders(){if(this.alertOpen)return;let a=Date.now(),t=f=>String(f).padStart(2,"0"),e=new Date,n=`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`,m=(await this.getAlarmaList()).filter(f=>!f.dueDate||f.paused||this.alertedToday(`${f.ticket}|${f.owner||""}`,n)?false:new Date(`${f.dueDate}T${f.dueTime||"09:00"}:00`).getTime()<=a);if(!m.length||this.alertOpen)return;this.markAlerted(m.map(f=>`${f.ticket}|${f.owner||""}`),n),this.playAlertSound();let C=m.map(f=>({ticket:f.ticket,clienteRaw:f.clienteRaw,asunto:f.asunto,nota:f.nota}));this.alertOpen=true,this.dialog.open(Dt,{data:{items:C},width:"460px",maxWidth:"95vw",autoFocus:false}).afterClosed().subscribe(f=>{this.alertOpen=false,f==="ver"&&this.router.navigate(["/pendientes"],{queryParams:{resaltar:C.map(W=>W.ticket).join(",")}});});}ensureAudio(){if(this.audioCtx)return this.audioCtx;let a=window.AudioContext||window.webkitAudioContext;return a?(this.audioCtx=new a,this.audioCtx):null}playAlertSound(){try{let a=this.ensureAudio();if(!a)return;a.state==="suspended"&&a.resume();let t=[[880,0],[660,.18]];for(let[e,n]of t){let s=a.createOscillator(),m=a.createGain();s.type="sine",s.frequency.value=e;let C=a.currentTime+n;m.gain.setValueAtTime(1e-4,C),m.gain.exponentialRampToValueAtTime(.35,C+.02),m.gain.exponentialRampToValueAtTime(1e-4,C+.55),s.connect(m).connect(a.destination),s.start(C),s.stop(C+.6);}}catch{}}abrirPerfil(){this.dialog.open(Mt,{width:"380px",maxWidth:"95vw",autoFocus:false});}iniciales(a){let t=(a||"").trim();return t&&t.split(/\s+/).slice(0,2).map(e=>e[0]||"").join("").toUpperCase()||"?"}async logout(){await this.auth.logout(),this.router.navigate(["/login"]);}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=OE({type:i,selectors:[["app-layout"]],viewQuery:function(t,e){t&1&&Dp(e.shellContent,Wi,5),t&2&&CI();},decls:29,vars:10,consts:[["shellContent",""],[1,"shell"],[1,"drawer",3,"openedChange","mode","opened","disableClose"],[1,"drawer-brand"],[1,"drawer-search"],[1,"drawer-filters"],[1,"drawer-nav",3,"click"],["matSubheader",""],["mat-list-item","","routerLink","/board","routerLinkActive","active"],["mat-list-item","","routerLink","/tickets","routerLinkActive","active"],["mat-list-item","","routerLink","/semanal","routerLinkActive","active"],["mat-list-item","","routerLink","/mi-panel","routerLinkActive","active"],["mat-list-item","","routerLink","/pendientes","routerLinkActive","active"],["mat-list-item","","routerLink","/bandeja","routerLinkActive","active"],[1,"drawer-spacer"],[1,"drawer-user"],[1,"shell-content"],["color","primary",1,"topbar"],[1,"content"],[1,"drawer-search-title"],["appearance","outline","subscriptSizing","dynamic",1,"ds-field"],["matInput","","inputmode","numeric","placeholder","Ej. 33281",3,"ngModelChange","keydown.enter","ngModel"],["matSuffix","","mat-icon-button","","aria-label","Buscar ticket",3,"click"],["matInput","","placeholder","Ej. cr\xE9dito",3,"ngModelChange","keydown.enter","ngModel"],["matSuffix","","mat-icon-button","","aria-label","Buscar palabra",3,"click"],[4,"ngTemplateOutlet"],["mat-list-item","","routerLink","/admin","routerLinkActive","active"],["type","button","title","Mi perfil","aria-label","Mi perfil",1,"user-chip",3,"click"],["alt","Foto de perfil",3,"src"],[1,"user-name"],["mat-icon-button","","title","Cerrar sesi\xF3n","aria-label","Cerrar sesi\xF3n",3,"click"],["mat-icon-button","","aria-label","Abrir men\xFA",3,"click"],[1,"brand"],[1,"spacer"],["type","button","title","Mi perfil","aria-label","Mi perfil",1,"user-chip",3,"has-foto","background"]],template:function(t,e){if(t&1&&(ii$1(0,"mat-sidenav-container",1)(1,"mat-sidenav",2),gp("openedChange",function(s){return e.drawerOpen.set(s)}),ii$1(2,"div",3),QI(3,"Fit-Desk"),wc(),iI(4,Zi,17,2,"div",4),iI(5,$i,2,1,"div",5),ii$1(6,"mat-nav-list",6),gp("click",function(){return e.drawerOpen.set(false)}),ii$1(7,"h3",7),QI(8,"Scrum"),wc(),ii$1(9,"a",8),QI(10,"Board"),wc(),ii$1(11,"h3",7),QI(12,"Helpdesk"),wc(),ii$1(13,"a",9),QI(14,"Tickets"),wc(),ii$1(15,"a",10),QI(16,"HelpDesk Semanal"),wc(),iI(17,Yi,2,0,"a",11),ii$1(18,"a",12),QI(19,"Pendientes"),wc(),iI(20,Xi,2,0,"a",13),iI(21,Ji,4,0),wc(),lp(22,"span",14),iI(23,nn,9,6,"div",15),wc(),ii$1(24,"mat-sidenav-content",16,0),iI(26,sn,8,1,"mat-toolbar",17),ii$1(27,"main",18),lp(28,"router-outlet"),wc()()()),t&2){let n,s;ky(),cp("mode",e.mode())("opened",e.opened())("disableClose",e.fixed()),ky(3),sI(e.enTickets()?-1:4),ky(),sI((n=e.shell.filters())?5:-1,n),ky(12),sI(e.puedeVerMiPanel()?17:-1),ky(3),sI(e.mostrarBandeja()?20:-1),ky(),sI(e.mostrarAdmin()?21:-1),ky(2),sI((s=e.session())?23:-1,s),ky(3),sI(e.fixed()?-1:26);}},dependencies:[cr,Mt$1,So,oi$1,Ko,an$1,Zo,Ni$1,Xe,Ye,ba,Ui$1,fe,jn,de,yo,Ar,Fr,He,Ge,Ue,qe,$e,jt,Ke,kt,yt,wt],styles:[".shell[_ngcontent-%COMP%]{height:100vh}.drawer[_ngcontent-%COMP%]{width:280px;max-width:85vw;display:flex;flex-direction:column;border-right:1px solid var(--mat-sys-outline-variant, #e0e0e0);background:var(--mat-sys-surface-container-low, #f0f4f9)}.drawer-brand[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.5px;font-size:18px;padding:16px;color:var(--brand, #048abf)}.drawer-filters[_ngcontent-%COMP%]{padding:8px 12px 12px;border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-search[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:8px 12px 12px;border-bottom:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-search[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.drawer-search-title[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--mat-sys-on-surface-variant)}.drawer-nav[_ngcontent-%COMP%]{padding-top:4px}.drawer-nav[_ngcontent-%COMP%]   h3[matSubheader][_ngcontent-%COMP%]{color:var(--brand-dark, #0390bc);font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.5px}.drawer-nav[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{background:color-mix(in srgb,var(--brand, #048abf) 14%,transparent);font-weight:600}.drawer-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.drawer-user[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid var(--mat-sys-outline-variant, #e0e0e0)}.drawer-user[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%]{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.user-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:28px;padding:0 8px;border:none;border-radius:14px;color:#fff;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;overflow:hidden;transition:box-shadow .15s}.user-chip[_ngcontent-%COMP%]:hover{box-shadow:0 0 0 2px #048abf73}.user-chip.has-foto[_ngcontent-%COMP%]{min-width:32px;width:32px;height:32px;padding:0;border-radius:50%}.user-chip.has-foto[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;display:block}.shell-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0}mat-sidenav-content.shell-content[_ngcontent-%COMP%]{overflow:hidden}.topbar[_ngcontent-%COMP%]{flex:0 0 auto;z-index:10;gap:4px}.topbar[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{font-weight:700;letter-spacing:-.5px;margin-left:4px}.topbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}.content[_ngcontent-%COMP%]{flex:1 1 auto;min-width:0;min-height:0;overflow-y:auto;padding:20px;width:100%;box-sizing:border-box}"]})};export{ii as Layout};