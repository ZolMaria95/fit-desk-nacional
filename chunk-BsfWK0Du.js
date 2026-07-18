import {u}from'./chunk-BGJ9XV7x.js';import {D,cp as gr,J as Jp,bC as Ci,aS as ah,bB as X,B as FE,I as Sl,R as qr,T as mr,ap as N,c5 as es,P as PE,b6 as eF,o as si,al as np,s as si$1,bb as du,u as up,C as Cc,bc as fu,aQ as pp,aU as MI,O as Oy,ae as cp,ak as Cp,l as lp,a1 as jI,a2 as _p,af as Ip,a4 as bI,a5 as CI,q as O,$ as $e,F as Ft,K,H as Ht,r as jt,N as Nt,v as zt,V as Vt,aT as J,Z as ZI,L as Lp,e as eD,y as uI,G as Gv,m as mp,k as kp,b as Pp,Q as Qv,A as dI,E as EI,bs as fD}from'./main-5IYZUA4I.js';import {Q as Qt}from'./chunk-L3k_rXRW.js';import {F as Ft$1,R as Rt}from'./chunk-DF-URMUM.js';import {d as de,n as nt,o as oe,a as nn,t as tn}from'./chunk-xZ5WWEdy.js';import {t as ta,i as ie,X as Xn,b as bn,v as va,g as ga}from'./chunk-CMsGtJPM.js';var v=class t{http=D(gr);auth=D(Jp);base=Ci.quarkusApiUrl;actorOpts(){let r=this.auth.session()?.id;return r?{headers:{"X-Actor-Hid":r}}:{}}crearTransferencia(r){return ah(this.http.post(`${this.base}/api/transferencias`,r,this.actorOpts()))}transferenciasEntrantes(){return ah(this.http.get(`${this.base}/api/transferencias/entrantes`,this.actorOpts()))}transferenciasSalientes(){return ah(this.http.get(`${this.base}/api/transferencias/salientes`,this.actorOpts()))}aceptarTransferencia(r,e){return ah(this.http.post(`${this.base}/api/transferencias/${r}/aceptar`,{asignadoHid:e},this.actorOpts()))}rechazarTransferencia(r,e){return ah(this.http.post(`${this.base}/api/transferencias/${r}/rechazar`,{motivo:e},this.actorOpts()))}miembrosEquipo(r){return ah(this.http.get(`${this.base}/api/transferencias/equipo/${r}/miembros`))}trabajoAceptado(){return ah(this.http.get(`${this.base}/api/transferencias/aceptadas`,this.actorOpts()))}miEquipoMiembros(){return ah(this.http.get(`${this.base}/api/transferencias/mi-equipo/miembros`,this.actorOpts()))}crearSolicitud(r){return ah(this.http.post(`${this.base}/api/solicitudes`,r,this.actorOpts()))}solicitudesEntrantes(){return ah(this.http.get(`${this.base}/api/solicitudes/entrantes`,this.actorOpts()))}misSolicitudes(){return ah(this.http.get(`${this.base}/api/solicitudes/mias`,this.actorOpts()))}aprobarSolicitud(r,e){return ah(this.http.post(`${this.base}/api/solicitudes/${r}/aprobar`,e??{},this.actorOpts()))}rechazarSolicitud(r,e){return ah(this.http.post(`${this.base}/api/solicitudes/${r}/rechazar`,{motivo:e},this.actorOpts()))}static \u0275fac=function(e){return new(e||t)};static \u0275prov=X({token:t,factory:t.\u0275fac,providedIn:"root"})};var ke=["determinateSpinner"];function we(t,r){if(t&1&&(du(),si$1(0,"svg",11),up(1,"circle",12),Cc()),t&2){let e=EI();cp("viewBox",e._viewBox()),Oy(),Cp("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),cp("r",e._circleRadius());}}var De=new N("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:Se})}),Se=100,Ae=10,Ue=(()=>{class t{_elementRef=D(mr);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=D(De),i=es(),n=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=n.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&n.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0;}_diameter=Se;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return (this.diameter-Ae)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return `0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=PE({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,n){if(i&1&&Ip(ke,5),i&2){let s;bI(s=CI())&&(n._determinateCircle=s.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,n){i&2&&(cp("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",n.mode==="determinate"?n.value:null)("mode",n.mode),jI("mat-"+n.color),Cp("width",n.diameter,"px")("height",n.diameter,"px")("--mat-progress-spinner-size",n.diameter+"px")("--mat-progress-spinner-active-indicator-width",n.diameter+"px"),_p("_mat-animation-noopable",n._noopAnimations)("mdc-circular-progress--indeterminate",n.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",eF],diameter:[2,"diameter","diameter",eF],strokeWidth:[2,"strokeWidth","strokeWidth",eF]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,n){if(i&1&&(np(0,we,2,8,"ng-template",null,0,fD),si$1(2,"div",2,1),du(),si$1(4,"svg",3),up(5,"circle",4),Cc()(),fu(),si$1(6,"div",5)(7,"div",6)(8,"div",7),pp(9,8),Cc(),si$1(10,"div",9),pp(11,8),Cc(),si$1(12,"div",10),pp(13,8),Cc()()()),i&2){let s=MI(1);Oy(4),cp("viewBox",n._viewBox()),Oy(),Cp("stroke-dasharray",n._strokeCircumference(),"px")("stroke-dashoffset",n._strokeDashOffset(),"px")("stroke-width",n._circleStrokeWidth(),"%"),cp("r",n._circleRadius()),Oy(4),lp("ngTemplateOutlet",s),Oy(2),lp("ngTemplateOutlet",s),Oy(2),lp("ngTemplateOutlet",s);}},dependencies:[si],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2})}return t})();var Ze=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=FE({type:t});static \u0275inj=Sl({imports:[qr]})}return t})();var Te=(t,r)=>r.id;function qe(t,r){if(t&1&&(si$1(0,"mat-option",4),ZI(1),Cc()),t&2){let e=r.$implicit;lp("value",e.id),Oy(),kp(e.nombre);}}function Ie(t,r){t&1&&(si$1(0,"mat-option",5),ZI(1,"No hay otros equipos"),Cc()),t&2&&lp("value",null);}var Ce=class t{adminApi=D(u);svc=D(v);snack=D(Qt);ref=D(O);data=D($e);equipos=Ft([]);destinos=K(()=>this.equipos().filter(r=>r.activo&&r.codigo!==this.data.boardCodigo));destinoId=null;motivo="";busy=Ft(false);constructor(){this.adminApi.equipos().then(r=>this.equipos.set(r)).catch(()=>{});}async enviar(){if(!(!this.destinoId||this.busy())){this.busy.set(true);try{await this.svc.crearTransferencia({tareaCodigo:this.data.tareaCodigo,equipoDestinoId:this.destinoId,motivo:this.motivo.trim()||void 0}),this.snack.open("Transferencia enviada. El equipo destino la ver\xE1 en su bandeja.","OK",{duration:4e3}),this.ref.close(!0);}catch(r){this.snack.open(Oe(r,"No se pudo enviar la transferencia."),"OK",{duration:5e3});}finally{this.busy.set(false);}}}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=PE({type:t,selectors:[["app-enviar-equipo-dialog"]],decls:24,vars:5,consts:[["mat-dialog-title",""],[1,"hint"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],[3,"value"],["disabled","",3,"value"],["matInput","","rows","3","placeholder","Por qu\xE9 se transfiere\u2026",3,"ngModelChange","ngModel"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","color","primary",3,"click","disabled"]],template:function(e,i){e&1&&(si$1(0,"h2",0),ZI(1,"Enviar a otro equipo"),Cc(),si$1(2,"mat-dialog-content")(3,"p",1),ZI(4," La tarea "),si$1(5,"strong"),ZI(6),Cc(),ZI(7," sigue en su tablero; el equipo destino la recibe en su bandeja y decide a qui\xE9n asignarla. "),Cc(),si$1(8,"mat-form-field",2)(9,"mat-label"),ZI(10,"Equipo destino"),Cc(),si$1(11,"mat-select",3),Lp("ngModelChange",function(s){return eD(i.destinoId,s)||(i.destinoId=s),s}),uI(12,qe,2,2,"mat-option",4,Te,false,Ie,2,1,"mat-option",5),Cc(),Gv(),Cc(),si$1(15,"mat-form-field",2)(16,"mat-label"),ZI(17,"Motivo (opcional)"),Cc(),si$1(18,"textarea",6),Lp("ngModelChange",function(s){return eD(i.motivo,s)||(i.motivo=s),s}),Cc(),Gv(),Cc()(),si$1(19,"mat-dialog-actions",7)(20,"button",8),ZI(21,"Cancelar"),Cc(),si$1(22,"button",9),mp("click",function(){return i.enviar()}),ZI(23,"Enviar"),Cc()()),e&2&&(Oy(6),kp(i.data.tareaCodigo),Oy(5),Pp("ngModel",i.destinoId),Qv(),Oy(),dI(i.destinos()),Oy(6),Pp("ngModel",i.motivo),Qv(),Oy(4),lp("disabled",!i.destinoId||i.busy()));},dependencies:[ta,ie,Xn,bn,Ht,jt,Nt,zt,Vt,va,ga,de,nt,oe,nn,tn,Ft$1,Rt,J],styles:[".full[_ngcontent-%COMP%]{width:100%}.hint[_ngcontent-%COMP%]{margin:0 0 12px;color:var(--mat-sys-on-surface-variant, #666);font-size:.9rem}"]})};function Oe(t,r){return t?.error?.error||r}export{Ce as C,Oe as O,Ue as U,Ze as Z,v};