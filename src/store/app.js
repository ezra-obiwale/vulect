import Vue from 'vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';
import createdPersistedState from 'vuex-persistedstate';
import http from '@/helpers/http';
import PreviousNext from '@/pages/onboarding/components/previous-next';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createdPersistedState({
    key: 'kpbd'
  })],
  state: {},
  mutations: {
    SET(state, payload) {
      if (payload.key) state[payload.key] = payload.value;
    },
    REMOVE(state, key) {
      delete state[key];
    }
  },
  actions: {
    set({ commit }, data) {
      return commit('SET', data);
    },
    remove({ commit }, key) {
      return commit('REMOVE', key)
    }
  }
});
