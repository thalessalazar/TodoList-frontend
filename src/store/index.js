import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/user';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// eslint-disable-next-line
export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
    },
});
