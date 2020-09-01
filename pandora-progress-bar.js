const t=new WeakMap; const e=e=>typeof e==="function"&&t.has(e); const s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback; const i=function(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}}; const n={}; const r={}; const o=`{{lit-${String(Math.random()).slice(2)}}}`; const a=`\x3c!--${o}--\x3e`; const l=new RegExp(`${o}|${a}`); const h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;const s=[]; const i=[]; const n=document.createTreeWalker(e.content,133,null,!1);let r=0; let a=-1; let c=0;const{strings:p,values:{length:m}}=t;for(;c<m;){const t=n.nextNode();if(t!==null){if(a++,t.nodeType===1){if(t.hasAttributes()){const e=t.attributes; const {length:s}=e;let i=0;for(let t=0;t<s;t++)d(e[t].name,h)&&i++;for(;i-- >0;){const e=p[c]; const s=_.exec(e)[2]; const i=s.toLowerCase()+h; const n=t.getAttribute(i);t.removeAttribute(i);const r=n.split(l);this.parts.push({type:"attribute",index:a,name:s,strings:r}),c+=r.length-1}}t.tagName==="TEMPLATE"&&(i.push(t),n.currentNode=t.content)}else if(t.nodeType===3){const e=t.data;if(e.indexOf(o)>=0){const i=t.parentNode; const n=e.split(l); const r=n.length-1;for(let e=0;e<r;e++){let s; let r=n[e];if(r==="")s=u();else{const t=_.exec(r);t!==null&&d(t[2],h)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),s=document.createTextNode(r)}i.insertBefore(s,t),this.parts.push({type:"node",index:++a})}n[r]===""?(i.insertBefore(u(),t),s.push(t)):t.data=n[r],c+=r}}else if(t.nodeType===8)if(t.data===o){const e=t.parentNode;t.previousSibling!==null&&a!==r||(a++,e.insertBefore(u(),t)),r=a,this.parts.push({type:"node",index:a}),t.nextSibling===null?t.data="":(s.push(t),a--),c++}else{let e=-1;for(;(e=t.data.indexOf(o,e+1))!==-1;)this.parts.push({type:"node",index:-1}),c++}}else n.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e}; const p=t=>t.index!==-1; const u=()=>document.createComment(""); const _=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}

update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}

_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0); const e=[]; const i=this.template.parts; const n=document.createTreeWalker(t,133,null,!1);let r; let o=0; let a=0; let l=n.nextNode();for(;o<i.length;)if(r=i[o],p(r)){for(;a<r.index;)a++,l.nodeName==="TEMPLATE"&&(e.push(l),n.currentNode=l.content),(l=n.nextNode())===null&&(n.currentNode=e.pop(),l=n.nextNode());if(r.type==="node"){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}const g=` ${o} `;class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}

getHTML(){const t=this.strings.length-1;let e=""; let s=!1;for(let i=0;i<t;i++){const t=this.strings[i]; const n=t.lastIndexOf("\x3c!--");s=(n>-1||s)&&t.indexOf("--\x3e",n+1)===-1;const r=_.exec(t);e+=r===null?t+(s?g:a):t.substr(0,r.index)+r[1]+r[2]+h+r[3]+o}return e+=this.strings[t]}

getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>t===null||!(typeof t==="object"||typeof t==="function"); const v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}

_createPart(){return new w(this)}

_getValue(){const t=this.strings; const e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(y(t)||!v(t))s+=typeof t==="string"?t:String(t);else for(const e of t)s+=typeof e==="string"?e:String(e)}}return s+=t[e]}

commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}

setValue(t){t===n||y(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}

commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class b{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}

appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}

insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}

appendIntoPart(t){t.__insert(this.startNode=u()),t.__insert(this.endNode=u())}

insertAfterPart(t){t.__insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}const t=this.__pendingValue;t!==n&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}

__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}

__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}

__commitText(t){const e=this.startNode.nextSibling; const s=typeof(t=t==null?"":t)==="string"?t:String(t);e===this.endNode.previousSibling&&e.nodeType===3?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}

__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options); const i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}

__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s; let i=0;for(const n of t)void 0===(s=e[i])&&(s=new b(this.options),e.push(s),i===0?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}

clear(){const t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.startNode;i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,s.length!==2||s[0]!==""||s[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=n}}class P extends S{constructor(t,e,s){super(t,e,s),this.single=s.length===2&&s[0]===""&&s[1]===""}

_createPart(){return new C(this)}

_getValue(){return this.single?this.parts[0].value:super._getValue()}

commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends w{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class A{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=(t=>this.handleEvent(t))}

setValue(t){this.__pendingValue=t}

commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=this.__pendingValue; const s=this.value; const i=t==null||s!=null&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive); const r=t!=null&&(s==null||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=n}

handleEvent(t){typeof this.value==="function"?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const E=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return n==="."?new P(t,e.slice(1),s).parts:n==="@"?[new A(t,e.slice(1),i.eventContext)]:n==="?"?[new x(t,e.slice(1),s)]:new S(t,e,s).parts}

handleTextExpression(t){return new b(t)}};function V(t){let e=k.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},k.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(o);return void 0===(s=e.keyString.get(i))&&(s=new c(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const k=new Map; const O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const R=function(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),i=1;i<e;i++)s[i-1]=arguments[i];return new f(t,s,"html",E)}; const U=133;function M(t,e){const{element:{content:s},parts:i}=t; const n=document.createTreeWalker(s,U,null,!1);let r=$(i); let o=i[r]; let a=-1; let l=0;const h=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),c===null&&(c=t)),c!==null&&l++;void 0!==o&&o.index===a;)o.index=c!==null?-1:o.index-l,o=i[r=$(i,r)]}h.forEach(t=>t.parentNode.removeChild(t))}const q=t=>{let e=t.nodeType===11?0:1;const s=document.createTreeWalker(t,U,null,!1);for(;s.nextNode();)e++;return e}; const $=function(t){for(let e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1)+1;e<t.length;e++){const s=t[e];if(p(s))return e}return-1};const j=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),z=!1);const F=t=>e=>{const s=j(e.type,t);let i=k.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},k.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o);if(void 0===(n=i.keyString.get(r))){const s=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(s,t),n=new c(e,s),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n}; const I=["html","svg"]; const L=new Set; const B=(t,e,s)=>{L.add(t);const i=s?s.element:document.createElement("template"); const n=e.querySelectorAll("style"); const {length:r}=n;if(r===0)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{I.forEach(e=>{const s=k.get(j(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t; const s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),M(t,s)})})})(t);const a=i.content;s?function(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const{element:{content:i},parts:n}=t;if(s==null)return void i.appendChild(e);const r=document.createTreeWalker(i,U,null,!1);let o=$(n); let a=0; let l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=q(e),s.parentNode.insertBefore(e,s));o!==-1&&n[o].index===l;){if(a>0){for(;o!==-1;)n[o].index+=a,o=$(n,o);return}o=$(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&l!==null)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),M(s,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return t!==null;case Number:return t===null?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}}; const W=(t,e)=>e!==t&&(e==e||t==t); const J={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W}; const D=Promise.resolve(!0); const G=1; const K=4; const Q=8; const X=16; const Y=32; const Z="finalized";class tt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=D,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}

static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}

static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}

static createProperty(t){const e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:J;if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s=typeof t==="symbol"?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}

static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Z)||t.finalize(),this[Z]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties; const e=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols==="function"?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}

static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:typeof s==="string"?s:typeof t==="string"?t.toLowerCase():void 0}

static _valueHasChanged(t,e){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:W)(t,e)}

static _propertyValueFromAttribute(t,e){const s=e.type; const i=e.converter||H; const n=typeof i==="function"?i:i.fromAttribute;return n?n(t,s):t}

static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type; const i=e.converter;return(i&&i.toAttribute||H.toAttribute)(t,s)}

initialize(){this._saveInstanceProperties(),this._requestUpdate()}

_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}

_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}

connectedCallback(){this._updateState=this._updateState|Y,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}

disconnectedCallback(){}

attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}

_propertyToAttribute(t,e){const s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:J;const i=this.constructor; const n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Q,t==null?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~Q}}

_attributeToProperty(t,e){if(this._updateState&Q)return;const s=this.constructor; const i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||J;this._updateState=this._updateState|X,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~X}}

_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor; const n=i._classProperties.get(t)||J;i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&X||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}

requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}

async _enqueueUpdate(){let t; let e;this._updateState=this._updateState|K;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();t!=null&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}

get _hasConnected(){return this._updateState&Y}

get _hasRequestedUpdate(){return this._updateState&K}

get hasUpdated(){return this._updateState&G}

performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(e)),this.updated(e))}

_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~K}

get updateComplete(){return this._getUpdateComplete()}

_getUpdateComplete(){return this._updatePromise}

shouldUpdate(t){return!0}

update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}

updated(t){}

firstUpdated(t){}}tt[Z]=!0;const et="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype; const st=Symbol();class it{constructor(t,e){if(e!==st)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}

get styleSheet(){return void 0===this._styleSheet&&(et?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}

toString(){return this.cssText}}const nt=function(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),i=1;i<e;i++)s[i-1]=arguments[i];const n=s.reduce((e,s,i)=>e+(t=>{if(t instanceof it)return t.cssText;if(typeof t==="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new it(n,st)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const rt=t=>t.flat?t.flat(1/0):function t(e){const s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let i=0,n=e.length;i<n;i++){const n=e[i];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class ot extends tt{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}

static _getUniqueStyles(){const t=this.styles; const e=[];if(Array.isArray(t)){rt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}

initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}

createRenderRoot(){return this.attachShadow({mode:"open"})}

adoptStyles(){const t=this.constructor._styles;t.length!==0&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?et?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}

connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}

update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}

render(){}}ot.finalized=!0,ot.render=((t,e,s)=>{if(!s||typeof s!=="object"||!s.scopeName)throw new Error("The `scopeName` option is required.");const n=s.scopeName; const r=O.has(e); const o=z&&e.nodeType===11&&!!e.host; const a=o&&!L.has(n); const l=a?document.createDocumentFragment():e;if(((t,e,s)=>{let n=O.get(e);void 0===n&&(i(e,e.firstChild),O.set(e,n=new b({templateFactory:V,...s})),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,{templateFactory:F(n),...s}),a){const t=O.get(l);O.delete(l);const s=t.value instanceof m?t.value.template:void 0;B(n,l,s),i(e,e.firstChild),e.appendChild(l),O.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});window.customElements.define("pandora-progress-bar",class extends ot{static get styles(){return nt`:host{display:block;font-size:14px;font-family:'Open Sans',sans-serif}.container{display:flex;flex-wrap:wrap;padding-bottom:3px}.progress-text{font-weight:300;width:100%}.progress{margin-top:5px;width:100%;background-color:#eee;border-radius:2px;-webkit-box-shadow:0 3px 2px 0 rgba(202,202,202,.9);-moz-box-shadow:0 3px 2px 0 rgba(202,202,202,.9);box-shadow:0 3px 2px 0 rgba(202,202,202,.9)}.bar{height:10px;width:50%;border-radius:2px;text-align:right;background:green;transition:all .6s ease}.bar-text{margin-left:auto;position:unset;margin-top:10px;display:block;font-weight:600}`}

static get properties(){return{title:{type:String},percentage:{type:Number},color:{type:String}}}

constructor(){super(),this.percentage=0,this.color="green"}

render(){return R`<div class="container"><div class="progress-text">${this.title}</div><div class="progress"><div class="bar"></div></div><div class="bar-text">${this.percentage!==100?R`${this.percentage}%`:"Completado"}</div></div>`}

updated(t){t.forEach((t,e)=>{["percentage"].includes(e)&&this.updatePercentage(this.percentage),["color"].includes(e)&&this.updateColor(this.color)})}

updatePercentage(t){this.percentage=Math.min(Math.max(t,0),100),this.shadowRoot.querySelector(".bar").style.width=`${this.percentage}%`,this.shadowRoot.querySelector(".bar-text").style.marginRight=`${100-this.percentage}%`}

updateColor(t){this.shadowRoot.querySelector(".bar").style.background=t}});
// # sourceMappingURL=pandora-progress-bar.js.map
