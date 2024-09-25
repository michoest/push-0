import{c as _,a as u,h as y,d as B,S as H,U as M,r as I,V as O,H as z,W as T,g as $,i as L,e as m,l as U,f as G,X,z as Q,A as K,B as a,C as n,Y as f,Q as S,Z as w,_ as h,L as Y,$ as Z,a0 as J,a1 as ee}from"./index.bb5e1eb1.js";import{u as N,a as R,b as te,Q as ae}from"./store.7b67e786.js";import{api as F}from"./axios.eeaa2ad0.js";import"./notify.5c379c96.js";var C=_({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:r}){const l=u(()=>parseInt(e.lines,10)),i=u(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),c=u(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>y("div",{style:c.value,class:i.value},B(r.default))}}),b=_({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:r}){const l=u(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>y("div",{class:l.value},B(r.default))}}),g=_({name:"QItem",props:{...N,...H,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:r,emit:l}){const{proxy:{$q:i}}=$(),c=R(e,i),{hasLink:d,linkAttrs:v,linkClass:t,linkTag:o,navigateOnClick:x}=M(),k=I(null),q=I(null),P=u(()=>e.clickable===!0||d.value===!0||e.tag==="label"),p=u(()=>e.disable!==!0&&P.value===!0),V=u(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(c.value===!0?" q-item--dark":"")+(d.value===!0&&e.active===null?t.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(p.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),j=u(()=>{if(e.insetLevel===void 0)return null;const s=i.lang.rtl===!0?"Right":"Left";return{["padding"+s]:16+e.insetLevel*56+"px"}});function A(s){p.value===!0&&(q.value!==null&&(s.qKeyEvent!==!0&&document.activeElement===k.value?q.value.focus():document.activeElement===q.value&&k.value.focus()),x(s))}function D(s){if(p.value===!0&&O(s,[13,32])===!0){z(s),s.qKeyEvent=!0;const E=new MouseEvent("click",s);E.qKeyEvent=!0,k.value.dispatchEvent(E)}l("keyup",s)}function W(){const s=T(r.default,[]);return p.value===!0&&s.unshift(y("div",{class:"q-focus-helper",tabindex:-1,ref:q})),s}return()=>{const s={ref:k,class:V.value,style:j.value,role:"listitem",onClick:A,onKeyup:D};return p.value===!0?(s.tabindex=e.tabindex||"0",Object.assign(s,v.value)):P.value===!0&&(s["aria-disabled"]="true"),y(o.value,s,W())}}});const ne=["ul","ol"];var le=_({name:"QList",props:{...N,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:r}){const l=$(),i=R(e,l.proxy.$q),c=u(()=>ne.includes(e.tag)?null:"list"),d=u(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(i.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>y(e.tag,{class:d.value,role:c.value},B(r.default))}}),ie=_({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:r}){const{proxy:{$q:l}}=$(),i=L(U,m);if(i===m)return console.error("QPage needs to be a deep child of QLayout"),m;if(L(G,m)===m)return console.error("QPage needs to be child of QPageContainer"),m;const d=u(()=>{const t=(i.header.space===!0?i.header.size:0)+(i.footer.space===!0?i.footer.size:0);if(typeof e.styleFn=="function"){const o=i.isContainer.value===!0?i.containerHeight.value:l.screen.height;return e.styleFn(t,o)}return{minHeight:i.isContainer.value===!0?i.containerHeight.value-t+"px":l.screen.height===0?t!==0?`calc(100vh - ${t}px)`:"100vh":l.screen.height-t+"px"}}),v=u(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>y("main",{class:v.value,style:d.value},B(r.default))}});const ce=Object.assign({name:"MainPage"},{__name:"main.page",setup(e){const r=L("notify"),l=te();X();const i=async()=>{await l.notify()},c=async()=>{await l.getSubscriptions()},d=async()=>{if("serviceWorker"in navigator&&"PushManager"in window)try{console.log("Starting subscription...");const v=await navigator.serviceWorker.ready;console.log(2);const t=(await F.get("/vapid")).data;console.log(t);const o=await v.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t});console.log("subscription",o);const x=await F.post("/subscribe",o);r(x.data),console.log("Push notification subscription successful")}catch(v){console.error("Error subscribing to push notifications:",v)}else console.log("Push notifications are not supported")};return(v,t)=>(Q(),K(ie,null,{default:a(()=>[n(le,null,{default:a(()=>[n(C,{header:""},{default:a(()=>t[1]||(t[1]=[f("Subscriptions")])),_:1}),n(g,null,{default:a(()=>[n(b,null,{default:a(()=>[n(S,{onClick:d},{default:a(()=>t[2]||(t[2]=[f("Subscribe")])),_:1})]),_:1})]),_:1}),n(g,null,{default:a(()=>[n(b,null,{default:a(()=>[n(S,{onClick:c},{default:a(()=>t[3]||(t[3]=[f("Get subscriptions")])),_:1})]),_:1})]),_:1}),n(g,null,{default:a(()=>[n(b,null,{default:a(()=>[f(w(h(l).subscriptions),1)]),_:1})]),_:1}),n(C,{header:""},{default:a(()=>t[4]||(t[4]=[f("Notifications")])),_:1}),n(g,null,{default:a(()=>[n(b,null,{default:a(()=>[n(S,{onClick:i},{default:a(()=>t[5]||(t[5]=[f("Notify")])),_:1})]),_:1})]),_:1}),n(g,null,{default:a(()=>[n(b,null,{default:a(()=>[n(ae,{modelValue:h(l).global.id,"onUpdate:modelValue":t[0]||(t[0]=o=>h(l).global.id=o)},{prepend:a(()=>[n(Y,{name:"fingerprint"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),(Q(!0),Z(ee,null,J(h(l).notifications,o=>(Q(),K(g,{key:o},{default:a(()=>[n(b,null,{default:a(()=>[n(C,null,{default:a(()=>[f(w(o.title),1)]),_:2},1024),n(C,{caption:""},{default:a(()=>[f(w(o.body),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}))}});export{ce as default};
