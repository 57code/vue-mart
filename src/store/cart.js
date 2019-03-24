

export default {
  // namespace: true,
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
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
  actions: {}
};
