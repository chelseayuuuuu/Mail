import httpInstance from '@/utils/http';

export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  });
};

export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart',
  });
};

export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  });
};
