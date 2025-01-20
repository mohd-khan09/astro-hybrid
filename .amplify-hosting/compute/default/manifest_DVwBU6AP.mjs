import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B4cvB5JH.mjs';
import { k as decodeKey } from './chunks/astro/server_BCiH2_Ul.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/mohammedkhan/Work/astro-hybrid/","adapterName":"astro-aws-amplify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"recipes/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recipes","isIndex":true,"type":"page","pattern":"^\\/recipes\\/?$","segments":[[{"content":"recipes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recipes/index.astro","pathname":"/recipes","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"talks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/talks","isIndex":true,"type":"page","pattern":"^\\/talks\\/?$","segments":[[{"content":"talks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/talks/index.astro","pathname":"/talks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.1.7_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TalksLayout.B_xyBTbA.css"}],"routeData":{"route":"/talks/[slug]","isIndex":false,"type":"page","pattern":"^\\/talks\\/([^/]+?)\\/?$","segments":[[{"content":"talks","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/talks/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/mohammedkhan/Work/astro-hybrid/src/pages/recipes/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/recipes/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/work.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/work/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/mohammedkhan/Work/astro-hybrid/src/pages/about.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.1.7_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/recipes/[slug]@_@astro":"pages/recipes/_slug_.astro.mjs","\u0000@astro-page:src/pages/recipes/index@_@astro":"pages/recipes.astro.mjs","\u0000@astro-page:src/pages/talks/[slug]@_@astro":"pages/talks/_slug_.astro.mjs","\u0000@astro-page:src/pages/talks/index@_@astro":"pages/talks.astro.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/work/[...slug]@_@astro":"pages/work/_---slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DVwBU6AP.mjs","/Users/mohammedkhan/Work/astro-hybrid/node_modules/.pnpm/astro@5.1.7_typescript@5.7.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bbardo2v.mjs","/Users/mohammedkhan/Work/astro-hybrid/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/mohammedkhan/Work/astro-hybrid/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B4Rqjvze.mjs","/Users/mohammedkhan/Work/astro-hybrid/src/components/TalksLayout":"_astro/TalksLayout.e_FRRbD1.js","/Users/mohammedkhan/Work/astro-hybrid/src/components/SearchTalk":"_astro/SearchTalk.u6WTOT8F.js","@astrojs/react/client.js":"_astro/client.D5VCDl9Y.js","/Users/mohammedkhan/Work/astro-hybrid/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.Cf-elt_A.js","/Users/mohammedkhan/Work/astro-hybrid/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.iAA4Z6Qc.js","/Users/mohammedkhan/Work/astro-hybrid/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.uzd8m1xC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/mohammedkhan/Work/astro-hybrid/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","addEventListener(\"load\",()=>document.documentElement.classList.add(\"loaded\"));"],["/Users/mohammedkhan/Work/astro-hybrid/src/components/Nav.astro?astro&type=script&index=0&lang.ts","class i extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector(\"template\").content.cloneNode(!0));const n=this.querySelector(\"button\"),t=document.getElementById(\"menu-content\");t.hidden=!0,t.classList.add(\"menu-content\");const d=e=>{n.setAttribute(\"aria-expanded\",e?\"true\":\"false\"),t.hidden=!e};n.addEventListener(\"click\",()=>d(t.hidden));const s=e=>{d(e.matches),n.hidden=e.matches},c=window.matchMedia(\"(min-width: 50em)\");s(c),c.addEventListener(\"change\",s)}}customElements.define(\"menu-button\",i);"],["/Users/mohammedkhan/Work/astro-hybrid/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","class n extends HTMLElement{constructor(){super();const e=this.querySelector(\"button\"),t=s=>{document.documentElement.classList[s?\"add\":\"remove\"](\"theme-dark\"),e.setAttribute(\"aria-pressed\",String(s))};e.addEventListener(\"click\",()=>t(!this.isDark())),t(this.isDark())}isDark(){return document.documentElement.classList.contains(\"theme-dark\")}}customElements.define(\"theme-toggle\",n);"]],"assets":["/_astro/about.DZ3Y8Zob.css","/favicon.svg","/_astro/SearchTalk.DRIjFGGT.css","/_astro/SearchTalk.u6WTOT8F.js","/_astro/TalksLayout.B_xyBTbA.css","/_astro/TalksLayout.e_FRRbD1.js","/_astro/client.D5VCDl9Y.js","/_astro/index.BL7xzsR_.js","/_astro/index.CaYsvabw.js","/assets/at-work.jpg","/assets/portrait.jpg","/assets/stock-1.jpg","/assets/stock-2.jpg","/assets/stock-3.jpg","/assets/stock-4.jpg","/assets/backgrounds/bg-footer-dark-1440w.jpg","/assets/backgrounds/bg-footer-dark-800w.jpg","/assets/backgrounds/bg-footer-light-1440w.jpg","/assets/backgrounds/bg-footer-light-800w.jpg","/assets/backgrounds/bg-main-dark-1440w.jpg","/assets/backgrounds/bg-main-dark-800w.jpg","/assets/backgrounds/bg-main-dark.svg","/assets/backgrounds/bg-main-light-1440w.jpg","/assets/backgrounds/bg-main-light-800w.jpg","/assets/backgrounds/bg-main-light.svg","/assets/backgrounds/bg-subtle-1-dark-1440w.jpg","/assets/backgrounds/bg-subtle-1-dark-800w.jpg","/assets/backgrounds/bg-subtle-1-light-1440w.jpg","/assets/backgrounds/bg-subtle-1-light-800w.jpg","/assets/backgrounds/bg-subtle-2-dark-1440w.jpg","/assets/backgrounds/bg-subtle-2-dark-800w.jpg","/assets/backgrounds/bg-subtle-2-light-1440w.jpg","/assets/backgrounds/bg-subtle-2-light-800w.jpg","/assets/backgrounds/noise.png","/404.html","/about/index.html","/recipes/index.html","/talks/index.html","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"Uz2iVzsxXyUYgzdJMs6Hkz4XgKgWUCTma4dEy82LHq0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
