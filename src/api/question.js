import request from '@/utils/request';

export function getQuestion({ keyword, pagesize, pagenum, order, sort }) {
  return request.get('/subjects?keyword=' + keyword + '&pagesize=' + pagesize + '&pagenum=' + pagenum + '&order=' + order + '&sort=' + sort);
}
export function addQuestion({ title, answers, tag, standard }) {
  return request.post('/subjects', {
    title,
    answers,
    tag,
    standard
  });
}
export function deleteQuestion(id) {
  return request.delete('/subjects/' + id);
}
export function changeQuestion({ id, title, answers, tag, standard }) {
  return request.put('/subjects/' + id, {
    title,
    answers,
    tag,
    standard
  });
}
export function checkQuestion(id) {
  return request.get('/subjects/' + id);
}
