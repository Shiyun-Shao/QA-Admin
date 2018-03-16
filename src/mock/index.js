import Mock from 'mockjs';
// import Bazaar from './bazaar.js'
import bazaar from './bazaar.json';
import KOLOrderList from './KOLOrderList.json';
import viewsku from './viewsku.json';

var Random = Mock.Random;

Mock.setup({
  timeout: '350-600'
});

Mock.mock(/\/user\/info/, 'get', {
  code: '0',
  data: {
    name: Random.cfirst(),
    role: ['test'],
    avatar: Random.dataImage('200x54')
  }
});
Mock.mock(/\/order\/list.jhtml/, 'post', KOLOrderList);
// Mock.mock(/\/product\/list.jhtml/, 'post', productlist)
// Mock.mock(/\/product\/update_market_stat.jhtml/, 'post', {
//   code: '0',
//   msg: 'success',
//   data: '下架成功！'
// })
// Mock.mock(/\/product\/view_sku.jhtml/, 'get', viewsku)
// Mock.mock(/\/bazaar_center\/product\/list.jhtml/, 'post', bazaar)
// Mock.mock(/\/login.jhtml/, 'post', {
//   code: '0',
//   data: {}
// })
// Mock.mock(/\/logout.jhtml/, 'post', {
//   code: '0',
//   data: {}
// })
export default Mock;
