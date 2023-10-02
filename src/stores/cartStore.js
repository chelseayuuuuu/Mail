import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
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

    //单选
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => (item.skuId = skuId));
      item.selected = selected;
    };

    //计算属性 总数 总价
    const allCount = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    });
    const allPrice = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count * c.price, 0);
    });

    return {
      cartList,
      addCart,
      delCart,
      singleCheck,
      allCount,
      allPrice,
    };
  },
  {
    persist: true,
  }
);
