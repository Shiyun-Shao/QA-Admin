import request from '@/utils/request';

export function getTagList({ keyword, pagenum, pagesize, order, sort }) {
  return request.get(
    '/tags?keyword=' +
      keyword +
      '&pagenum=' +
      pagenum +
      '&pagesize=' +
      pagesize +
      '&order=' +
      order +
      '&sort=' +
      sort
  );
}
export function addTag({ name }) {
  return request.post('/tags', { name });
}
export function deleteTag(id) {
  return request.delete('/tags/' + id);
}
export function changeTag({ id, name }) {
  return request.put('/tags/' + id, { name });
}
export function checkTag(id) {
  return request.get('/tags/' + id);
}
