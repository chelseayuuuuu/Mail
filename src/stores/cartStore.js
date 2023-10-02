import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([]);

    const addCart = (goods) => {
      //已添加 - count + 1
      //未添加 - push
      //思路 skuId是否存在
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        item.count += item.count;
      } else {
        cartList.value.push(goods);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
