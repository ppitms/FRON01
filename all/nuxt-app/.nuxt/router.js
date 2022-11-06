import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ca31b02e = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _6a304b43 = () => interopDefault(import('..\\pages\\lend.vue' /* webpackChunkName: "pages/lend" */))
const _2b933042 = () => interopDefault(import('..\\pages\\lend\\index.vue' /* webpackChunkName: "pages/lend/index" */))
const _58bd1a7a = () => interopDefault(import('..\\pages\\lend\\account.vue' /* webpackChunkName: "pages/lend/account" */))
const _7629fb83 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _1c4f1fba = () => interopDefault(import('..\\pages\\user\\id.vue' /* webpackChunkName: "pages/user/id" */))
const _0b770788 = () => interopDefault(import('..\\pages\\user\\_h.vue' /* webpackChunkName: "pages/user/_h" */))
const _8ac1faa4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _ca31b02e,
    name: "about"
  }, {
    path: "/lend",
    component: _6a304b43,
    children: [{
      path: "",
      component: _2b933042,
      name: "lend"
    }, {
      path: "account",
      component: _58bd1a7a,
      name: "lend-account"
    }]
  }, {
    path: "/user",
    component: _7629fb83,
    name: "user"
  }, {
    path: "/user/id",
    component: _1c4f1fba,
    name: "user-id"
  }, {
    path: "/user/:h",
    component: _0b770788,
    name: "user-h"
  }, {
    path: "/",
    component: _8ac1faa4,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
