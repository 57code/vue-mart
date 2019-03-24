import Vue from "vue";
import Vuex from "vuex";
import us from "./service/user";
import gs from "./service/goods";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("token") ? true : false,
    slider: [],
    keys: [],
    goodsInfo: {},
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
    setLoginState(state, b) {
      state.isLogin = b;
    },
    setGoodsInfo(state, { goodsInfo, slider, keys }) {
      state.goodsInfo = goodsInfo;
      state.slider = slider;
      state.keys = keys;
    },
    addcart(state, item) {
      const good = state.cart.find(v => v.title == item.title);
      if (good) {
        good.cartCount += 1;
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        });
      }
    },
    cartremove(state, index) {
      if (state.cart[index].cartCount > 1) {
        state.cart[index].cartCount -= 1;
      }
    },
    cartadd(state, index) {
      state.cart[index].cartCount += 1;
    }
  },
  getters: {
    goods: state => {
      return state.keys
        .map(key => state.goodsInfo[key])
        .reduce((prev, next) => prev.concat(next), []);
    },
    cartTotal: state => {
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
    total: state => {
      // let num = 0;
      // state.cart.forEach(v => {
      //   num += v.cartCount * v.price;
      // });
      return state.cart.reduce(
        (total, item) => total + item.cartCount * item.price,
        0
      );
    }
  },
  actions: {
    login({ commit }, user) {
      // 登录请求
      return us.login(user).then(res => {
        const { code, token } = res.data;
        if (code) {
          // 登录成功
          commit("setLoginState", true);
          localStorage.setItem("token", token);
        }
        return code;
      });
    },
    logout({ commit }) {
      // 清缓存
      localStorage.removeItem("token");
      // 重置状态
      commit("setLoginState", false);
    },
    getGoods({ state, commit }) {
      if (!state.keys.length) {
        // 首次查询
        gs.getGoodsInfo().then(goodsInfo => {
          // 缓存
          commit("setGoodsInfo", goodsInfo);
        });
      }
    }
  }
});
store.subscribe((mutations, state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
  // console.log(mutations, state)
});

export default store;
