import Vue from 'vue';
import Vuex from 'vuex';
import createdPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createdPersistedState({
    key: 'onboarding'
  })],
  state: {},
  mutations: {
    INCREMENT_STEP(state) {
      state.step++;
    },
    DECREMENT_STEP(state) {
      if (state.step > 0) state.step--;
    },
    UPDATE(state, payload) {
      if (payload.key) state[payload.key] = payload.value;
    },
    UPDATE_DATA(state, payload) {
      if (payload.key)
        state.data[payload.index][payload.key] = payload.value;
      else
        state.data[payload.index] = payload.value;
    },
    RESET_DATA(state) {
      state.step = 0;
      state.saved = -1;
      state.loading = false;
      state.customDomain = '';
      state.data = [{}, {
        session_name: 'Session',
        division_name: 'Term'
      }, {}];
      state.previous = {};
    }
  },
  actions: {
    incrementStep({ commit }) {
      commit('INCREMENT_STEP');
    },
    decrementStep({ commit }) {
      commit('DECREMENT_STEP');
    },
    update({ commit }, data) {
      return commit('UPDATE', data);
    },
    updateData({ commit }, data) {
      return commit('UPDATE_DATA', data);
    },
    resetData({ commit }) {
      commit('RESET_DATA');
    }
  }
});
