(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[250],{9705:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/topics",function(){return n(7511)}])},7511:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return p},default:function(){return a}});var i=n(5893),c=n(1790),l=n(4053),o=n(9290),s=n(7962),r=n(9417),u=n(7294),p=!0;function a(t){let{props:e}=t,n=(0,o.u)(e.structure),p=[],a=[];return e.structure.topicGroups.forEach((t,e)=>{let[c,o]=(0,u.useState)(!0);p.push(o);let s=[],r=0;t.topics.forEach(e=>{let c=n.getTopic(e);c||console.log("Warning: invalid topic ".concat(e," in topic table"));let o=[];for(let t of c.contents){let e=n.getArticle(t),c="/".concat(t);(!e||e.coming)&&(c=void 0),o.push((0,i.jsx)(l.OK,{text:e.title,url:c},r++))}if(t.single){o.forEach(t=>s.push(t));return}let[a,f]=(0,u.useState)(!1);p.push(f),s.push((0,i.jsx)(l.Ih,{expand:a,toggleExpand:()=>{f(!a)},title:c.title,children:o},r++))});let f=t.single?n.getTopicTitle(t.topics[0]):t.title;a.push((0,i.jsx)(l.VI,{title:f,expand:c,toggleExpand:()=>{o(!c)},children:s},e))}),(0,i.jsx)(c.Ar,{title:"主題目錄",gaId:e.gaId,children:(0,i.jsxs)(c.zA,{children:[(0,i.jsx)(s.Lz,{children:"主題目錄"}),(0,i.jsxs)("div",{className:"flex justify-start",children:[(0,i.jsx)(l.MM,{text:"全部展開",icon:r.r8p,onClick:()=>{for(let t of p)t(!0)}}),(0,i.jsx)(l.MM,{text:"全部收合",icon:r.Kl4,onClick:()=>{for(let t of p)t(!1)}})]}),a]})})}}},function(t){t.O(0,[976,444,461,888,774,179],function(){return t(t.s=9705)}),_N_E=t.O()}]);