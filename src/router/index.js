import Vue from 'vue';
import Router from 'vue-router';
import http from '@/helpers/http';
import AppStore from '@/store/app';
import Routes from '@/pages/router.js';

Vue.use(Router);

// var routes = Routes;
const router = new Router({
  routes: Routes,
  mode: 'history'
});

/**
 * Checks domain presence and auth when required in route meta objects
 *
 * meta keys include:
 *
 * subdomainOnly: The route is only accessible from a subdomain
 * requiresAuth: The route requires user to be authenticated
 */
router.beforeEach((to, from, next) => {
  let checkAuth = () => {
    // check user api key exists
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!AppStore.state.sd.uki) return doNext('/login');
    }
    doNext();
  },
    doNext = (path) => {
      if (to.path !== '/login')
        AppStore.dispatch('set', { key: 'lp', value: to.path + location.search });
      next(path);
    },
    parts = location.hostname.split('.');
  if (parts.length > 2 && parts[0] !== 'www') { // subdomain
    if (!AppStore.state.sd || AppStore.state.sd.custom_domain !== parts[0]) {
      // validate domain
      return http.get('/organization/' + parts[0])
        .then(resp => {
          AppStore.dispatch('set', { key: 'sd', value: resp.data });
          // domain exists
          checkAuth();
        })
        .catch(resp => {
          // domain does not exist
          location.href = process.env.FRONTEND_URL;
        });
    }
  }
  else if (to.matched.some(record => record.meta.subdomainOnly)) return next(false);

  checkAuth();
});

export default router;
