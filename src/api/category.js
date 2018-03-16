import request from '@/utils/request'
// import Cookies from 'js-cookie'

export function getGroupList() {
  return request.get('/product_group/list.jhtml')
}

export function addGroup({ name, imageIcon, image, description }) {
  return request.post('/product_group/save.jhtml', {
    name,
    imageIcon,
    image,
    description
  })
}
export function updateGroup({ name, imageIcon, image, description, id }) {
  return request.post('/product_group/update.jhtml', {
    name,
    imageIcon,
    image,
    description,
    id
  })
}
export function deleteGroup(id) {
  return request.post('/product_group/delete.jhtml', { id })
}

export function changeOrder({ id, upOrDown }) {
  return request.post('/product_group/set_order.jhtml', {
    id,
    upOrDown
  })
}

export function updateStatus({ id, isActived }) {
  return request.post('/product_group/update_status.jhtml', {
    id,
    isActived
  })
}

export function getProductList({
  pageNum,
  pageSize,
  firstQueryDate,
  productGroupId,
  isAdded,
  word
}) {
  return request.post('/product_group/get_product_list.jhtml', {
    pageNum,
    pageSize,
    firstQueryDate,
    productGroupId,
    isAdded,
    word
  })
}

export function updateProductsGroup({ productGroupId, ids }) {
  return request.post('/product_group/product_manage.jhtml', {
    productGroupId,
    ids
  })
}
