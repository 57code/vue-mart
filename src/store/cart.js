export default {
    state: { // 购物车初始状态
      list: JSON.parse(localStorage.getItem("cart")) || []
    },
    mutations: {
      addcart(state, item) { // 添加商品至购物车
        const good = state.list.find(v => v.title == item.title);
        if (good) {
          good.cartCount += 1;
        } else {
          state.list.push({
            ...item,
            cartCount: 1
          });
        }
      },
      cartremove(state, index) { // count-1
        if (state.list[index].cartCount > 1) {
          state.list[index].cartCount -= 1;
        }
      },
      cartadd(state, index) { // count+1
        state.list[index].cartCount += 1;
      }
    },
    getters: {
      cartTotal: state => { // 商品总数
        let num = 0;
        state.list.forEach(v => {
          num += v.cartCount;
        });
        return num;
      },
      total: state => { // 总价
        return state.list.reduce(
          (total, item) => total + item.cartCount * item.price,
          0
        );
      }
    }
  }