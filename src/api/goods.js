import request from '@/utils/request';
import Cookies from 'js-cookie';

export function getBazaarProductList({
  token,
  pageNum,
  pageSize,
  firstQueryDate,
  orderType,
  orderProfit,
  startPrice,
  endPrice,
  word
}) {
  return request.post('/bazaar_center/product/list.jhtml', {
    pageNum,
    pageSize,
    firstQueryDate,
    orderType,
    orderProfit,
    startPrice,
    endPrice,
    word
  });
}

export function addBazaarProduct({ token, productId, isMarketable }) {
  return request.post('/bazaar_center/product/add_kol_product.jhtml', {
    productId,
    isMarketable
  });
}

export function getProductList({
  token,
  pageSize,
  pageNum,
  firstQueryDate,
  startTime,
  endTime,
  productGroupId,
  isMarketable,
  word
}) {
  return request.post('/product/list.jhtml', {
    pageSize,
    pageNum,
    firstQueryDate,
    startTime,
    endTime,
    productGroupId,
    isMarketable,
    word
  });
}
export function getSkuData(id) {
  return request.get(`/product/view_sku.jhtml?id=${id}`);
}

export function onSale({ token, id, isMarketable }) {
  return request.post('/product/update_market_stat.jhtml', {
    id,
    isMarketable
  });
}
