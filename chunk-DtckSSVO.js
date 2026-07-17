import {af as N$1,p as FE,N as Nl,a8 as HE,cD as Ii,ar as Hv,r as mr,a2 as tp,a3 as sD,y as yp,I as Mp,aO as eF,a1 as Cm,a6 as lp,au as $e$1,aw as JL,an as me$1,aV as am,cE as UE,cF as gD,K,F as Ft,$ as hh,q as qr,P as PE,A as DI,bl as fp,B as wI,bj as _c,bk as Mc,b as sI,O as Oy,d as aI,cG as U$1,f as Le$1,ai as U$2,cd as wu,aK as $,aL as B,D,ag as Se$1,ah as ct$1,aq as Ir,bw as _h,bs as QL,aj as q,ak as nh,H as jI,b1 as ao,at as ne$1,bO as C,ct as Oh,w as we$1,aW as tF,cH as Dc,cI as be$1}from'./main-HCJR7QRM.js';var ne=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,a){this._renderer=t,this._elementRef=a;}setProperty(t,a){this._renderer.setProperty(this._elementRef.nativeElement,t,a);}registerOnTouched(t){this.onTouched=t;}registerOnChange(t){this.onChange=t;}setDisabledState(t){this.setProperty("disabled",t);}static \u0275fac=function(a){return new(a||n)(Ii(Hv),Ii(mr))};static \u0275dir=HE({type:n})}return n})(),ae=(()=>{class n extends ne{static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,features:[tp]})}return n})(),ht=new N$1("");var Fe={provide:ht,useExisting:ao(()=>ie),multi:true};function Ie(){let n=U$1()?U$1().getUserAgent():"";return /android (\d+)/.test(n.toLowerCase())}var ke=new N$1(""),ie=(()=>{class n extends ne{_compositionMode;_composing=false;constructor(t,a,i){super(t,a),this._compositionMode=i,this._compositionMode==null&&(this._compositionMode=!Ie());}writeValue(t){let a=t??"";this.setProperty("value",a);}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t);}_compositionStart(){this._composing=true;}_compositionEnd(t){this._composing=false,this._compositionMode&&this.onChange(t);}static \u0275fac=function(a){return new(a||n)(Ii(Hv),Ii(mr),Ii(ke,8))};static \u0275dir=HE({type:n,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(a,i){a&1&&yp("input",function(s){return i._handleInput(s.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(s){return i._compositionEnd(s.target.value)});},standalone:false,features:[sD([Fe]),tp]})}return n})();function gt(n){return n==null||vt(n)===0}function vt(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var S=new N$1(""),yt=new N$1(""),Ne=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,pt=class{static min(e){return oe(e)}static max(e){return Se(e)}static required(e){return re(e)}static requiredTrue(e){return Oe(e)}static email(e){return Re(e)}static minLength(e){return Pe(e)}static maxLength(e){return se(e)}static pattern(e){return Be(e)}static nullValidator(e){return Q()}static compose(e){return pe(e)}static composeAsync(e){return fe(e)}};function oe(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return !isNaN(t)&&t<n?{min:{min:n,actual:e.value}}:null}}function Se(n){return e=>{if(e.value==null||n==null)return null;let t=parseFloat(e.value);return !isNaN(t)&&t>n?{max:{max:n,actual:e.value}}:null}}function re(n){return gt(n.value)?{required:true}:null}function Oe(n){return n.value===true?null:{required:true}}function Re(n){return gt(n.value)||Ne.test(n.value)?null:{email:true}}function Pe(n){return e=>{let t=e.value?.length??vt(e.value);return t===null||t===0?null:t<n?{minlength:{requiredLength:n,actualLength:t}}:null}}function se(n){return e=>{let t=e.value?.length??vt(e.value);return t!==null&&t>n?{maxlength:{requiredLength:n,actualLength:t}}:null}}function Be(n){if(!n)return Q;let e,t;return typeof n=="string"?(t="",n.charAt(0)!=="^"&&(t+="^"),t+=n,n.charAt(n.length-1)!=="$"&&(t+="$"),e=new RegExp(t)):(t=n.toString(),e=n),a=>{if(gt(a.value))return null;let i=a.value;return e.test(i)?null:{pattern:{requiredPattern:t,actualValue:i}}}}function Q(n){return null}function le(n){return n!=null}function de(n){return Dc(n)?be$1(n):n}function ce(n){let e={};return n.forEach(t=>{e=t!=null?B(B({},e),t):e;}),Object.keys(e).length===0?null:e}function ue(n,e){return e.map(t=>t(n))}function je(n){return !n.validate}function me(n){return n.map(e=>je(e)?e:t=>e.validate(t))}function pe(n){if(!n)return null;let e=n.filter(le);return e.length==0?null:function(t){return ce(ue(t,e))}}function _t(n){return n!=null?pe(me(n)):null}function fe(n){if(!n)return null;let e=n.filter(le);return e.length==0?null:function(t){let a=ue(t,e).map(de);return Oh(a).pipe(we$1(ce))}}function Ct(n){return n!=null?fe(me(n)):null}function $t(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function be(n){return n._rawValidators}function he(n){return n._rawAsyncValidators}function ft(n){return n?Array.isArray(n)?n:[n]:[]}function tt(n,e){return Array.isArray(n)?n.includes(e):n===e}function Zt(n,e){let t=ft(e);return ft(n).forEach(i=>{tt(t,i)||t.push(i);}),t}function Yt(n,e){return ft(e).filter(t=>!tt(n,t))}var et=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=_t(this._rawValidators);}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Ct(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[];}reset(e=void 0){this.control?.reset(e);}hasError(e,t){return this.control?this.control.hasError(e,t):false}getError(e,t){return this.control?this.control.getError(e,t):null}},y=class extends et{name;get formDirective(){return null}get path(){return null}};var G="VALID",J="INVALID",F="PENDING",z="DISABLED",_=class{},nt=class extends _{value;source;constructor(e,t){super(),this.value=e,this.source=t;}},H=class extends _{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t;}},L=class extends _{touched;source;constructor(e,t){super(),this.touched=e,this.source=t;}},I=class extends _{status;source;constructor(e,t){super(),this.status=e,this.source=t;}},at=class extends _{source;constructor(e){super(),this.source=e;}},k=class extends _{source;constructor(e){super(),this.source=e;}};function ge(n){return (dt(n)?n.validators:n)||null}function Te(n){return Array.isArray(n)?_t(n):n||null}function ve(n,e){return (dt(e)?e.asyncValidators:n)||null}function Ge(n){return Array.isArray(n)?Ct(n):n||null}function dt(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function ze(n,e,t){let a=n.controls;if(!(Object.keys(a)).length)throw new C(1e3,"");if(!a[t])throw new C(1001,"")}function Ue(n,e,t){n._forEachChild((a,i)=>{if(t[i]===void 0)throw new C(-1002,"")});}var it=class{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=Ft(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t);}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e;}get parent(){return this._parent}get status(){return gD(this.statusReactive)}set status(e){gD(()=>this.statusReactive.set(e));}_status=K(()=>this.statusReactive());statusReactive=Ft(void 0);get valid(){return this.status===G}get invalid(){return this.status===J}get pending(){return this.status===F}get disabled(){return this.status===z}get enabled(){return this.status!==z}errors;get pristine(){return gD(this.pristineReactive)}set pristine(e){gD(()=>this.pristineReactive.set(e));}_pristine=K(()=>this.pristineReactive());pristineReactive=Ft(true);get dirty(){return !this.pristine}get touched(){return gD(this.touchedReactive)}set touched(e){gD(()=>this.touchedReactive.set(e));}_touched=K(()=>this.touchedReactive());touchedReactive=Ft(false);get untouched(){return !this.touched}_events=new ne$1;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e);}setAsyncValidators(e){this._assignAsyncValidators(e);}addValidators(e){this.setValidators(Zt(e,this._rawValidators));}addAsyncValidators(e){this.setAsyncValidators(Zt(e,this._rawAsyncValidators));}removeValidators(e){this.setValidators(Yt(e,this._rawValidators));}removeAsyncValidators(e){this.setAsyncValidators(Yt(e,this._rawAsyncValidators));}hasValidator(e){return tt(this._rawValidators,e)}hasAsyncValidator(e){return tt(this._rawAsyncValidators,e)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(e={}){let t=this.touched===false;this.touched=true;let a=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched($(B({},e),{sourceControl:a})),t&&e.emitEvent!==false&&this._events.next(new L(true,a));}markAllAsDirty(e={}){this.markAsDirty({onlySelf:true,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e));}markAllAsTouched(e={}){this.markAsTouched({onlySelf:true,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e));}markAsUntouched(e={}){let t=this.touched===true;this.touched=false,this._pendingTouched=false;let a=e.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:true,emitEvent:e.emitEvent,sourceControl:a});}),e.onlySelf||this._parent?._updateTouched(e,a),t&&e.emitEvent!==false&&this._events.next(new L(false,a));}markAsDirty(e={}){let t=this.pristine===true;this.pristine=false;let a=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty($(B({},e),{sourceControl:a})),t&&e.emitEvent!==false&&this._events.next(new H(false,a));}markAsPristine(e={}){let t=this.pristine===false;this.pristine=true,this._pendingDirty=false;let a=e.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:true,emitEvent:e.emitEvent});}),e.onlySelf||this._parent?._updatePristine(e,a),t&&e.emitEvent!==false&&this._events.next(new H(true,a));}markAsPending(e={}){this.status=F;let t=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new I(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending($(B({},e),{sourceControl:t}));}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=z,this.errors=null,this._forEachChild(i=>{i.disable($(B({},e),{onlySelf:true}));}),this._updateValue();let a=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new nt(this.value,a)),this._events.next(new I(this.status,a)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors($(B({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(true));}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=G,this._forEachChild(a=>{a.enable($(B({},e),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:e.emitEvent}),this._updateAncestors($(B({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(a=>a(false));}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t));}setParent(e){this._parent=e;}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let a=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===G||this.status===F)&&this._runAsyncValidator(a,e.emitEvent);}let t=e.sourceControl??this;e.emitEvent!==false&&(this._events.next(new nt(this.value,t)),this._events.next(new I(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity($(B({},e),{sourceControl:t}));}_updateTreeValidity(e={emitEvent:true}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:true,emitEvent:e.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?z:G;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=F,this._hasOwnPendingAsyncValidator={emitEvent:t!==false,shouldHaveEmitted:e!==false};let a=de(this.asyncValidator(this));this._asyncValidationSubscription=a.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:t,shouldHaveEmitted:e});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,e}return  false}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==false,this,t.shouldHaveEmitted);}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((a,i)=>a&&a._find(i),this)}getError(e,t){let a=t?this.get(t):this;return a?.errors?a.errors[e]:null}hasError(e,t){return !!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,a){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||a)&&this._events.next(new I(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,a);}_initObservables(){this.valueChanges=new $e$1,this.statusChanges=new $e$1;}_calculateStatus(){return this._allControlsDisabled()?z:this.errors?J:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(F)?F:this._anyControlsHaveStatus(J)?J:G}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let a=!this._anyControlsDirty(),i=this.pristine!==a;this.pristine=a,e.onlySelf||this._parent?._updatePristine(e,t),i&&this._events.next(new H(this.pristine,t));}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new L(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t);}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e;}_setUpdateStrategy(e){dt(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn);}_parentMarkedDirty(e){return !e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Te(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Ge(this._rawAsyncValidators);}_updateHasRequiredValidator(){gD(()=>this._hasRequired.set(this.hasValidator(pt.required)));}};function He(n){return n.tagName==="INPUT"||n.tagName==="SELECT"||n.tagName==="TEXTAREA"}function Le(n,e,t,a){switch(t){case "name":n.setAttribute(e,t,a);break;case "disabled":case "readonly":case "required":a?n.setAttribute(e,t,""):n.removeAttribute(e,t);break;case "max":case "min":case "minLength":case "maxLength":a!==void 0?n.setAttribute(e,t,a.toString()):n.removeAttribute(e,t);break}}var bt=class{kind;context;control;message;constructor({kind:e,context:t,control:a}){this.kind=e,this.context=t,this.control=a;}};function We(n){return typeof n=="number"?n:parseInt(n,10)}function qe(n){return typeof n=="number"?n:parseFloat(n)}var xt=(()=>{class n{_validator=Q;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let a=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(a),this._validator=this._enabled?this.createValidator(a):Q,this._onChange?.();}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t;}enabled(t){return t!=null}static \u0275fac=function(a){return new(a||n)};static \u0275dir=HE({type:n,features:[am]})}return n})();var $e={provide:S,useExisting:ao(()=>Ze),multi:true},Ze=(()=>{class n extends xt{min;inputName="min";normalizeInput=t=>qe(t);createValidator=t=>oe(t);static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(a,i){a&2&&lp("min",i._enabled?i.min:null);},inputs:{min:"min"},standalone:false,features:[sD([$e]),tp]})}return n})(),Ye={provide:S,useExisting:ao(()=>ye),multi:true};var ye=(()=>{class n extends xt{required;inputName="required";normalizeInput=eF;createValidator=t=>re;enabled(t){return t}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(a,i){a&2&&lp("required",i._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[sD([Ye]),tp]})}return n})();var Xe={provide:S,useExisting:ao(()=>Ke),multi:true},Ke=(()=>{class n extends xt{maxlength;inputName="maxlength";normalizeInput=t=>We(t);createValidator=t=>se(t);static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,selectors:[["","maxlength","","formControlName",""],["","maxlength","","formControl",""],["","maxlength","","ngModel",""]],hostVars:1,hostBindings:function(a,i){a&2&&lp("maxlength",i._enabled?i.maxlength:null);},inputs:{maxlength:"maxlength"},standalone:false,features:[sD([Xe]),tp]})}return n})();var Je=new N$1(""),ct=new N$1("",{factory:()=>Vt}),Vt="always";function Qe(n,e){return [...e.path,n]}function Xt(n,e,t=Vt){Dt(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),en(n,e),an(n,e),nn(n,e),tn(n,e);}function Kt(n,e,t=true){let a=()=>{};e?.valueAccessor?.registerOnChange(a),e?.valueAccessor?.registerOnTouched(a),rt(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}));}function ot(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e);});}function tn(n,e){if(e.valueAccessor.setDisabledState){let t=a=>{e.valueAccessor.setDisabledState(a);};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t);});}}function Dt(n,e){let t=be(n);e.validator!==null?n.setValidators($t(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let a=he(n);e.asyncValidator!==null?n.setAsyncValidators($t(a,e.asyncValidator)):typeof a=="function"&&n.setAsyncValidators([a]);let i=()=>n.updateValueAndValidity();ot(e._rawValidators,i),ot(e._rawAsyncValidators,i);}function rt(n,e){let t=false;if(n!==null){if(e.validator!==null){let i=be(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(s=>s!==e.validator);o.length!==i.length&&(t=true,n.setValidators(o));}}if(e.asyncValidator!==null){let i=he(n);if(Array.isArray(i)&&i.length>0){let o=i.filter(s=>s!==e.asyncValidator);o.length!==i.length&&(t=true,n.setAsyncValidators(o));}}}let a=()=>{};return ot(e._rawValidators,a),ot(e._rawAsyncValidators,a),t}function en(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=true,n._pendingDirty=true,n.updateOn==="change"&&_e(n,e);});}function nn(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=true,n.updateOn==="blur"&&n._pendingChange&&_e(n,e),n.updateOn!=="submit"&&n.markAsTouched();});}function _e(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:false}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=false;}function an(n,e){let t=(a,i)=>{e.valueAccessor.writeValue(a),i&&e.viewToModelUpdate(a);};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t);});}function Ce(n,e){Dt(n,e);}function on(n,e){return rt(n,e)}function rn(n,e){if(!n.hasOwnProperty("model"))return  false;let t=n.model;return t.isFirstChange()?true:!Object.is(e,t.currentValue)}function sn(n){return Object.getPrototypeOf(n.constructor)===ae}function xe(n,e){n._syncPendingControls(),e.forEach(t=>{let a=t.control;a.updateOn==="submit"&&a._pendingChange&&(t.viewToModelUpdate(a._pendingValue),a._pendingChange=false);});}function ln(n,e){if(!e)return null;let t,a,i;return e.forEach(o=>{o.constructor===ie?t=o:sn(o)?a=o:i=o;}),i||a||t||null}function dn(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1);}var cn={provide:Je,useFactory:()=>{let n=D(N,{self:true});return {setParseErrors:e=>{n.setParseErrorSource(e);},set onReset(e){n.onReset=e;}}}},N=class extends et{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(e){this.userOnReset=e,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof k&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=ln(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(e,t,a){super(),this.injector=e,this.renderer=t,this.rawValueAccessors=a,this.injector?.get(Le$1)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let e=this.injector?.get(JL);if(!this.control||!e)return;let t=e.markForCheck.bind(e);this.subscription=new U$2,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(a=>{a instanceof k&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(e){!e.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!e.customControl||(this.isCustomControlBased=true,e.listenToCustomControlModel(i=>{this.control?.setValue(i,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(i);}),e.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=He(e.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(i=>i instanceof ye));}ngControlUpdate(e,t){if(!this.isCustomControlBased)return;let a=this.control,i=this.customControlBindings;Object.is(i.value,a.value)||(i.value=a.value,e.setCustomControlModelInput(a.value)),this.bindControlProperty(e,i,"touched",a.touched),this.bindControlProperty(e,i,"dirty",a.dirty),this.bindControlProperty(e,i,"valid",a.valid),this.bindControlProperty(e,i,"invalid",a.invalid),this.bindControlProperty(e,i,"pending",a.pending),this.bindControlProperty(e,i,"disabled",a.disabled),this.shouldBindRequired&&this.bindControlProperty(e,i,"required",this.isRequired);let o=a.errors;if(i.errors!==o){i.errors=o;let s=this._convertErrors(o);e.setInputOnDirectives("errors",s);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(e,t,a,i){if(t[a]===i)return;t[a]=i;let o=e.setInputOnDirectives(a,i);this.isNativeFormElement&&!o&&(a==="disabled"||a==="required")&&this.renderer&&Le(this.renderer,e.nativeElement,a,i);}_convertErrors(e){if(e===null)return [];let t=this.control;return Object.entries(e).map(([a,i])=>new bt({context:i,kind:a,control:t}))}setParseErrorSource(e){if(e===void 0)return;let t=null,a=K(()=>{let i=e();return i.length===0?null:i.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>t).bind(this),wu(()=>{t=a(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(e){this.parseErrorsValidator&&(e?.removeValidators(this.parseErrorsValidator),e?.updateValueAndValidity({emitEvent:false}));}},st=class{_cd;constructor(e){this._cd=e;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Xn=(()=>{class n extends st{constructor(t){super(t);}static \u0275fac=function(a){return new(a||n)(Ii(N,2))};static \u0275dir=HE({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(a,i){a&2&&Mp("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending);},standalone:false,features:[tp]})}return n})(),Kn=(()=>{class n extends st{constructor(t){super(t);}static \u0275fac=function(a){return new(a||n)(Ii(y,10))};static \u0275dir=HE({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(a,i){a&2&&Mp("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)("ng-submitted",i.isSubmitted);},standalone:false,features:[tp]})}return n})(),lt=class extends it{constructor(e,t,a){super(ge(t),ve(a,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(e,t){return this.controls[e]?this.controls[e]:(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,a={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:a.emitEvent}),this._onCollectionChange();}removeControl(e,t={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange();}setControl(e,t,a={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:a.emitEvent}),this._onCollectionChange();}contains(e){return this.controls.hasOwnProperty(e)&&this.controls[e].enabled}setValue(e,t={}){gD(()=>{Ue(this,true,e),Object.keys(e).forEach(a=>{ze(this,true,a),this.controls[a].setValue(e[a],{onlySelf:true,emitEvent:t.emitEvent});}),this.updateValueAndValidity(t);});}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(a=>{let i=this.controls[a];i&&i.patchValue(e[a],{onlySelf:true,emitEvent:t.emitEvent});}),this.updateValueAndValidity(t));}reset(e={},t={}){this._forEachChild((a,i)=>{a.reset(e?e[i]:null,$(B({},t),{onlySelf:true}));}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==false&&this._events.next(new k(this));}getRawValue(){return this._reduceChildren({},(e,t,a)=>(e[a]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(false,(t,a)=>a._syncPendingControls()?true:t);return e&&this.updateValueAndValidity({onlySelf:true}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let a=this.controls[t];a&&e(a,t);});}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(e){for(let[t,a]of Object.entries(this.controls))if(this.contains(t)&&e(a))return  true;return  false}_reduceValue(){let e={};return this._reduceChildren(e,(t,a,i)=>((a.enabled||this.disabled)&&(t[i]=a.value),t))}_reduceChildren(e,t){let a=e;return this._forEachChild((i,o)=>{a=t(a,i,o);}),a}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(e){return this.controls.hasOwnProperty(e)?this.controls[e]:null}};var un={provide:y,useExisting:ao(()=>mn)},U=Promise.resolve(),mn=(()=>{class n extends y{callSetDisabledState;get submitted(){return gD(this.submittedReactive)}_submitted=K(()=>this.submittedReactive());submittedReactive=Ft(false);_directives=new Set;form;ngSubmit=new $e$1;options;constructor(t,a,i){super(),this.callSetDisabledState=i,this.form=new lt({},_t(t),Ct(a));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(t){U.then(()=>{let a=this._findContainer(t.path);t.control=a.registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:false}),this._directives.add(t);});}getControl(t){return this.form.get(t.path)}removeControl(t){U.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t);});}addFormGroup(t){U.then(()=>{let a=this._findContainer(t.path),i=new lt({});Ce(i,t),a.registerControl(t.name,i),i.updateValueAndValidity({emitEvent:false});});}removeFormGroup(t){U.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name);});}getFormGroup(t){return this.form.get(t.path)}updateModel(t,a){U.then(()=>{this.form.get(t.path).setValue(a);});}setValue(t){this.control.setValue(t);}onSubmit(t){return this.submittedReactive.set(true),xe(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new at(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(a){return new(a||n)(Ii(S,10),Ii(yt,10),Ii(ct,8))};static \u0275dir=HE({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(a,i){a&1&&yp("submit",function(s){return i.onSubmit(s)})("reset",function(){return i.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[sD([un]),tp]})}return n})();function Jt(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1);}function Qt(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var Ve=class extends it{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(e=null,t,a){super(ge(t),ve(a,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),dt(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Qt(e)?this.defaultValue=e.value:this.defaultValue=e);}setValue(e,t={}){gD(()=>{this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==false&&this._onChange.forEach(a=>a(this.value,t.emitViewToModelChange!==false)),this.updateValueAndValidity(t);});}patchValue(e,t={}){this.setValue(e,t);}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,t?.emitEvent!==false&&this._events.next(new k(this));}_updateValue(){}_anyControls(e){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e);}_unregisterOnChange(e){Jt(this._onChange,e);}registerOnDisabledChange(e){this._onDisabledChange.push(e);}_unregisterOnDisabledChange(e){Jt(this._onDisabledChange,e);}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(e){Qt(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=e;}};var pn=n=>n instanceof Ve;var fn={provide:N,useExisting:ao(()=>bn)},te=Promise.resolve(),bn=(()=>{class n extends N{_changeDetectorRef;callSetDisabledState;control=new Ve;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new $e$1;constructor(t,a,i,o,s,Ae,Me,Ee){super(Me,Ee,o),this._changeDetectorRef=s,this.callSetDisabledState=Ae,this._parent=t,this._setValidators(a),this._setAsyncValidators(i);}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let a=t.name.previousValue;this.formDirective.removeControl({name:a,path:this._getPath(a)});}this._setUpControl();}"isDisabled"in t&&this._updateDisabled(t),rn(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.formDirective?.removeControl(this);}\u0275ngControlCreate(t){super.ngControlCreate(t);}\u0275ngControlUpdate(t){super.ngControlUpdate(t,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Xt(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(t){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Xt(this.control,this,t));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(t){te.then(()=>{this.control.setValue(t,{emitViewToModelChange:false}),this._changeDetectorRef?.markForCheck();});}_updateDisabled(t){let a=t.isDisabled.currentValue,i=a!==0&&eF(a);te.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck();});}_getPath(t){return this._parent?Qe(t,this._parent):[t]}static \u0275fac=function(a){return new(a||n)(Ii(y,9),Ii(S,10),Ii(yt,10),Ii(ht,10),Ii(JL,8),Ii(ct,8),Ii(me$1,8),Ii(Hv,8))};static \u0275dir=HE({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[sD([fn,cn]),tp,am,UE(null)]})}return n})();var Qn=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275dir=HE({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:false})}return n})(),hn={provide:ht,useExisting:ao(()=>gn),multi:true},gn=(()=>{class n extends ae{writeValue(t){let a=t??"";this.setProperty("value",a);}registerOnChange(t){this.onChange=a=>{t(a==""?null:parseFloat(a));};}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,selectors:[["input","type","number","formControlName","",3,"ngNoCva",""],["input","type","number","formControl","",3,"ngNoCva",""],["input","type","number","ngModel","",3,"ngNoCva",""]],hostBindings:function(a,i){a&1&&yp("input",function(s){return i.onChange(s.target.value)})("blur",function(){return i.onTouched()});},standalone:false,features:[sD([hn]),tp]})}return n})();var vn=(()=>{class n extends y{callSetDisabledState;get submitted(){return gD(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t);}_submitted=K(()=>this._submittedReactive());_submittedReactive=Ft(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,a,i){super(),this.callSetDisabledState=i,this._setValidators(t),this._setAsyncValidators(a);}ngOnChanges(t){this.onChanges(t);}ngOnDestroy(){this.onDestroy();}onChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(rt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(t){let a=this.form.get(t.path);return t._setupWithForm(a,this.callSetDisabledState),a.updateValueAndValidity({emitEvent:false}),this.directives.push(t),a}getControl(t){return this.form.get(t.path)}removeControl(t){Kt(t.control||null,t,false),dn(this.directives,t);}addFormGroup(t){this._setUpFormContainer(t);}removeFormGroup(t){this._cleanUpFormContainer(t);}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t);}removeFormArray(t){this._cleanUpFormContainer(t);}updateModel(t,a){this.form.get(t.path).setValue(a);}onReset(){this.resetForm();}resetForm(t=void 0,a={}){this.form.reset(t,a),this._submittedReactive.set(false);}onSubmit(t){return this.submitted=true,xe(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new at(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let a=t.control,i=this.form.get(t.path);a!==i&&(Kt(a||null,t),pn(i)&&t._setupWithForm(i,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(t){let a=this.form.get(t.path);Ce(a,t),a.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(t){let a=this.form?.get(t.path);a&&on(a,t)&&a.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Dt(this.form,this),this._oldForm&&rt(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(a){return new(a||n)(Ii(S,10),Ii(yt,10),Ii(ct,8))};static \u0275dir=HE({type:n,features:[tp,am]})}return n})();var yn={provide:y,useExisting:ao(()=>_n)},_n=(()=>{class n extends vn{form=null;ngSubmit=new $e$1;get control(){return this.form}static \u0275fac=(()=>{let t;return function(i){return (t||(t=Cm(n)))(i||n)}})();static \u0275dir=HE({type:n,selectors:[["","formGroup",""]],hostBindings:function(a,i){a&1&&yp("submit",function(s){return i.onSubmit(s)})("reset",function(){return i.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[sD([yn]),tp]})}return n})();var Cn=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275mod=FE({type:n});static \u0275inj=Nl({})}return n})();var ta=(()=>{class n{static withConfig(t){return {ngModule:n,providers:[{provide:ct,useValue:t.callSetDisabledState??Vt}]}}static \u0275fac=function(a){return new(a||n)};static \u0275mod=FE({type:n});static \u0275inj=Nl({imports:[Cn]})}return n})();var xn=["*",[["","progressIndicator",""]]],Vn=["*","[progressIndicator]"];function Dn(n,e){n&1&&(_c(0,"div",1),wI(1,1),Mc());}var wn=new N$1("MAT_BUTTON_CONFIG");function De(n){return n==null?void 0:tF(n)}var wt=(()=>{class n{_elementRef=D(mr);_ngZone=D(Se$1);_animationsDisabled=ct$1();_config=D(wn,{optional:true});_focusMonitor=D(Ir);_cleanupClick;_renderer=D(Hv);_rippleLoader=D(_h);_isAnchor;_isFab=false;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled();}_disableRipple=false;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled();}_disabled=false;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t;}showProgress=QL(false,{transform:eF});constructor(){D(q).load(nh);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??false,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"});}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,true),this._isAnchor&&this._setupAsAnchor();}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);}focus(t="program",a){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,a):this._elementRef.nativeElement.focus(a);}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?true:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:true}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled);}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation());}));}static \u0275fac=function(a){return new(a||n)};static \u0275dir=HE({type:n,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(a,i){a&2&&(lp("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),jI(i.color?"mat-"+i.color:""),Mp("mat-mdc-button-progress-indicator-shown",i.showProgress())("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled));},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",eF],disabled:[2,"disabled","disabled",eF],ariaDisabled:[2,"aria-disabled","ariaDisabled",eF],disabledInteractive:[2,"disabledInteractive","disabledInteractive",eF],tabIndex:[2,"tabIndex","tabIndex",De],_tabindex:[2,"tabindex","_tabindex",De],showProgress:[1,"showProgress"]}})}return n})(),An=(()=>{class n extends wt{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:true});}static \u0275fac=function(a){return new(a||n)};static \u0275cmp=PE({type:n,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[tp],ngContentSelectors:Vn,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,i){a&1&&(DI(xn),fp(0,"span",0),wI(1),sI(2,Dn,2,0,"div",1),fp(3,"span",2)(4,"span",3)),a&2&&(Oy(2),aI(i.showProgress()?2:-1));},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return n})();var Mn=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],En=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function Fn(n,e){n&1&&(_c(0,"div",2),wI(1,3),Mc());}var we=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),ga=(()=>{class n extends wt{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text");}_appearance=null;constructor(){super();let t=In(this._elementRef.nativeElement);t&&this.setAppearance(t);}setAppearance(t){if(t===this._appearance)return;let a=this._elementRef.nativeElement.classList,i=this._appearance?we.get(this._appearance):null,o=we.get(t);i&&a.remove(...i),a.add(...o),this._appearance=t;}static \u0275fac=function(a){return new(a||n)};static \u0275cmp=PE({type:n,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[tp],ngContentSelectors:En,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,i){a&1&&(DI(Mn),fp(0,"span",0),wI(1),_c(2,"span",1),wI(3,1),Mc(),wI(4,2),sI(5,Fn,2,0,"div",2),fp(6,"span",3)(7,"span",4)),a&2&&(Mp("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab),Oy(5),aI(i.showProgress()?5:-1));},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return n})();function In(n){return n.hasAttribute("mat-raised-button")?"elevated":n.hasAttribute("mat-stroked-button")?"outlined":n.hasAttribute("mat-flat-button")?"filled":n.hasAttribute("mat-button")?"text":null}var va=(()=>{class n{static \u0275fac=function(a){return new(a||n)};static \u0275mod=FE({type:n});static \u0275inj=Nl({imports:[hh,qr]})}return n})();export{An as A,Kn as K,N,Qn as Q,S,Xn as X,Ze as Z,_n as _,gn as a,bn as b,Ke as c,ga as g,ht as h,ie as i,mn as m,pt as p,ta as t,va as v,ye as y};