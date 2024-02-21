import request from '@/utils/request'

//在注册时根据邮箱名获取验证码
export function getEmailCode(email) {
  return request({
    url: '/vue-admin-template/register/getEmailCode',
    method: 'post',
    email
  })
}

//提交注册
/* export function register(code, data) {
  return request({
    url: '/vue-admin-template/register?code=' + code,
    method: 'post',
    data
  })
} */

export const getCaptcha = (emailNum)=>request({url:`/user/getCaptcha?emailNum=${emailNum}`,method:'get'});
export const register= (username,pwd,cpwd,email,code)=>request({url:`/user/register?userName=${username}&password=${pwd}&confirmPassword=${cpwd}&email=${email}&captcha=${code}`,method:'post',data:{userName:username,password:pwd,confirmPassword:cpwd,email,captcha:code}});

