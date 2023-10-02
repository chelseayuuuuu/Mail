import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from './userStore';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart';

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([]);
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    //获取最新购物车列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    //添加
    const addCart = async (goods) => {
      //已添加 - count + 1
      //未添加 - push
      //思路 skuId是否存在
      const { skuId, count } = goods;
      if (isLogin.value) {
        //登陆之后的加入购物车
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count += item.count;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    //删除
    //思路 splice和filter
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };

    //单选
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    //全选
    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected);
    });
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //计算属性 总数 总价
    const allCount = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count, 0);
    });
    const allPrice = computed(() => {
      return cartList.value.reduce((a, c) => a + c.count * c.price, 0);
    });

    //已选择数量，已选择总价
    const selectedCount = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0);
    });
    const selectedPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0);
    });

    return {
      cartList,
      addCart,
      delCart,
      singleCheck,
      allCount,
      allPrice,
      isAll,
      allCheck,
      selectedCount,
      selectedPrice,
    };
  },
  {
    persist: true,
  }
);
