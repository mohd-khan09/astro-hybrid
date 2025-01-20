var l={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c;function R(){if(c)return o;c=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function e(u,t,r){var a=null;if(r!==void 0&&(a=""+r),t.key!==void 0&&(a=""+t.key),"key"in t){r={};for(var i in t)i!=="key"&&(r[i]=t[i])}else r=t;return t=r.ref,{$$typeof:s,type:u,key:a,ref:t!==void 0?t:null,props:r}}return o.Fragment=n,o.jsx=e,o.jsxs=e,o}var d;function _(){return d||(d=1,l.exports=R()),l.exports}var h=_();const f={ASSETS_PREFIX:void 0,BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SITE:void 0,SSR:!1},{PUBLIC_API_URL_FOR_TALKS:p}=f,m=s=>s.toLowerCase().replace(/(\d)\/(\d)/g,"$1-$2").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-"),x=s=>{const n=/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]*)|(?:https?:\/\/)?youtu\.be\/([^?]*)/,e=s?.match(n);return e&&(e[1]||e[2])?e[1]||e[2]:null},S=async()=>(await(await fetch(p)).json()).map(u=>{const t=x(u.link),r=t?`https://img.youtube.com/vi/${t}/hqdefault.jpg`:null;return{...u,slug:m(u.title),videoId:t,thumbnailUrl:r}}),E=async s=>await(await fetch(`${p}`,{method:"POST",body:JSON.stringify({id:s})})).json();export{S as a,E as f,h as j};
