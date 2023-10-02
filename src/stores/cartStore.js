import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([]);

    //添加
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

    //删除
    //思路 splice和filter
    const delCart = (skuId) => {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };
    return {
      cartList,
      addCart,
      delCart,
    };
  },
  {
    persist: true,
  }
);
