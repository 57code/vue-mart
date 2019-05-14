import Vue from "vue";
import Vuex from "vuex";
import user from './user';
import cart from './cart';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {user,cart}
});

export default store;
