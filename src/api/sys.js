import request from '@/utils/request'
import { generateUUID } from '@/utils/uuid';

export function getCaptcha() {
  var id = generateUUID();
  return {
    url: request.defaults.baseURL + '/common/captcha.jhtml?captchaId=' + id,
    id
  }
}
