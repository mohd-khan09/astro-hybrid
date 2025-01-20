import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_R0TKVODx.mjs';
import { manifest } from './manifest_DdAR0yrV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/recipes/_slug_.astro.mjs');
const _page4 = () => import('./pages/recipes.astro.mjs');
const _page5 = () => import('./pages/talks/_slug_.astro.mjs');
const _page6 = () => import('./pages/talks.astro.mjs');
const _page7 = () => import('./pages/work.astro.mjs');
const _page8 = () => import('./pages/work/_---slug_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.1.7_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/recipes/[slug].astro", _page3],
    ["src/pages/recipes/index.astro", _page4],
    ["src/pages/talks/[slug].astro", _page5],
    ["src/pages/talks/index.astro", _page6],
    ["src/pages/work.astro", _page7],
    ["src/pages/work/[...slug].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "client": "file:///Users/mohammedkhan/Work/astro-hybrid/.amplify-hosting/static/",
    "server": "file:///Users/mohammedkhan/Work/astro-hybrid/.amplify-hosting/compute/default/",
    "host": false,
    "port": 3000,
    "assets": "_astro"
};

const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { pageMap };
