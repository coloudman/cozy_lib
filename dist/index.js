!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.packages=e}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(2));class s{constructor(e,t,n){this.codeLoader=e,this.controllerLoaders=t,this.mixData=n,this.linkingPoints={},this.linkedControllerses={},this.controllers={},Object.entries(n.linkingPointsData).forEach(([e,t])=>{this.addLinkingPoint(e),this.link(e,t)}),this.code=this.codeLoader.load(n.codeData,this)}loadMix(e){return new s(this.codeLoader,this.controllerLoaders,e)}addDefaultLinkingPoints(e){e.forEach(e=>{this.linkingPoints[e]||this.addLinkingPoint(e)})}addLinkingPoint(e){this.linkingPoints[e]=new r.default}removeLinkingPoint(e){delete this.linkingPoints[e]}link(e,t){this.mixData.linkingPointsData[e]={codeData:t.codeData,linkingPointsData:t.linkingPointsData},this.linkingPoints[e].link(this.loadMix(t)),Object.entries(this.linkedControllerses).forEach(([t,n])=>{n[e]=this.linkingPoints[e].linked.addController(t)})}unlink(e){delete this.linkingPoints[e],delete this.mixData.linkingPointsData[e]}runOnExistLinkingPoints(e){Object.entries(this.linkingPoints).forEach(([t,n])=>{n.linked&&e(t,n.linked)})}addController(e){const t={};this.runOnExistLinkingPoints((n,i)=>{t[n]=i.addController(e)}),this.linkedControllerses[e]=t;const n=this.controllerLoaders[e].load(this.code,this.mixData.codeData,t);return this.controllers[e]=n,n}removeController(e){this.runOnExistLinkingPoints((t,n)=>{n.removeController(e)}),delete this.linkedControllerses[e],delete this.controllers[e]}}t.default=s},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(7));class s extends r.default{constructor(e){super(),this.linked=e}link(e){this.emit("link",e),this.linked=e}unlink(){this.emit("unlink",this.linked),this.linked=void 0}}t.default=s},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(4));t.Code=r.default;const s=i(n(5));t.Controller=s.default;const o=i(n(0));t.Loader=o.default;const l=i(n(6));t.CodeLoader=l.default;const a=i(n(1));t.Mix=a.default;const u=i(n(8));t.Area=u.default;const c=i(n(9));t.ControllerLoader=c.default;const d=i(n(2));t.LinkingPoint=d.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.data=e,this.linkingPoints=t.linkingPoints,this.addLinkingPoint=t.addLinkingPoint.bind(t),this.addDefaultLinkingPoints=t.addDefaultLinkingPoints.bind(t),this.init()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.code=e,this.linkedControllers=t,this.init()}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(0));class s extends r.default{load(e,t){return new(0,Object.values(this.packages).find(t=>e.packageId===t.id&&e.packageVersion===t.version).body[e.id])(e.data,t)}}t.default=s},function(e,t,n){var i;
/*!
 * EventEmitter v5.2.8 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */!function(t){"use strict";function r(){}var s=r.prototype,o=t.EventEmitter;function l(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function a(e){return function(){return this[e].apply(this,arguments)}}s.getListeners=function(e){var t,n,i=this._getEvents();if(e instanceof RegExp)for(n in t={},i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n]);else t=i[e]||(i[e]=[]);return t},s.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},s.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&((t={})[e]=n),t||n},s.addListener=function(e,t){if(!function e(t){return"function"==typeof t||t instanceof RegExp||!(!t||"object"!=typeof t)&&e(t.listener)}(t))throw new TypeError("listener must be a function");var n,i=this.getListenersAsObject(e),r="object"==typeof t;for(n in i)i.hasOwnProperty(n)&&-1===l(i[n],t)&&i[n].push(r?t:{listener:t,once:!1});return this},s.on=a("addListener"),s.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},s.once=a("addOnceListener"),s.defineEvent=function(e){return this.getListeners(e),this},s.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},s.removeListener=function(e,t){var n,i,r=this.getListenersAsObject(e);for(i in r)r.hasOwnProperty(i)&&-1!==(n=l(r[i],t))&&r[i].splice(n,1);return this},s.off=a("removeListener"),s.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},s.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},s.manipulateListeners=function(e,t,n){var i,r,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)s.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?s.call(this,i,r):o.call(this,i,r));return this},s.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if(e instanceof RegExp)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},s.removeAllListeners=a("removeEvent"),s.emitEvent=function(e,t){var n,i,r,s,o=this.getListenersAsObject(e);for(s in o)if(o.hasOwnProperty(s))for(n=o[s].slice(0),r=0;r<n.length;r++)!0===(i=n[r]).once&&this.removeListener(e,i.listener),i.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,i.listener);return this},s.trigger=a("emitEvent"),s.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},s.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},s._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},s._getEvents=function(){return this._events||(this._events={})},r.noConflict=function(){return t.EventEmitter=o,r},void 0===(i=function(){return r}.call(t,n,t,e))||(e.exports=i)}("undefined"!=typeof window?window:this||{})},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(1));t.default=class{constructor(e,t,n){this.codeLoader=e,this.controllerLoaders=t,this.mixes=[],this.controllerNames=[],this.mixDatas=n,n.forEach(e=>{this.addMix(e)})}addMix(e){const t=new r.default(this.codeLoader,this.controllerLoaders,e);return this.controllerNames.forEach(e=>{t.addController(e)}),this.mixes.push(t),this.mixDatas.push(e),t}removeMix(e){const t=this.mixes.indexOf(e);this.mixes.splice(t,1),this.mixDatas.splice(t,1)}getController(e){const t=[];return this.mixes.forEach(n=>{t.push(n.controllers[e])}),t}addController(e){this.mixes.forEach(t=>{t.addController(e)}),this.controllerNames.push(e)}}},function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(n(0));class s extends r.default{load(e,t,n){return new(0,Object.values(this.packages).find(e=>t.packageId===e.for_id&&t.packageVersion===e.for_version).body[t.id])(e,n)}}t.default=s}]));