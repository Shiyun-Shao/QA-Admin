import request from '@/utils/request';

export function getQuestion() {
  return request({
    url: '/subjects',
    method: 'get'
  });
}
export function addQuestion(title, answers, tag, standard) {
  return request.post('/subjects', {
    title,
    answers,
    tag,
    standard
  });
}
