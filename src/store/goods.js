import gs from "@/service/goods";

export default {
  // namespace: true,
  state: {
    slider: [],
    keys: [],
    goodsInfo: {}
  },
  mutations: {
    setGoodsInfo(state, { goodsInfo, slider, keys }) {
      state.goodsInfo = goodsInfo;
      state.slider = slider;
      state.keys = keys;
    }
  },
  getters: {
    goods: state => {
      return state.keys
        .map(key => state.goodsInfo[key])
        .reduce((prev, next) => prev.concat(next), []);
    }
  },
  actions: {
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
};
