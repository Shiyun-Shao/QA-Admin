import request from '@/utils/request';
// import Cookies from 'js-cookie'

export function getOrderList({
  startTime,
  endTime,
  status,
  word,
  firstQueryDate,
  pageNum,
  pageSize
}) {
  return request.post('/order/list.jhtml', {
    startTime,
    endTime,
    status,
    word,
    firstQueryDate,
    pageNum,
    pageSize
  });
}
