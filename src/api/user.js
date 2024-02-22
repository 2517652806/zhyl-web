import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export const  useropinion = (opinion)=>request({url:`/userInfo/opinion`,method:'post',data:{opinion}});
export const  userdelete = (id)=>request({url:`/casea/delete/${id}`,method:'delete',});
export const  useraddcase = (name, age,gender,phone,dateOfVisit,hospitalName, attending,purposeOfVisit,nameOfDisease,timeOfOnset,symptom)=>request({url:`/casea/add`,method:'post',data:{name,age,gender,phone,dateOfVisit,hospitalName, attending,purposeOfVisit,nameOfDisease,timeOfOnset,symptom}});
export const  userputcase = (id, name, age,gender,phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease,timeOfOnset,symptom)=>request({url:`/casea/update`,method:'put',data:{id, name, age,gender,phone, dateOfVisit, hospitalName, attending, purposeOfVisit, nameOfDisease,timeOfOnset,symptom}});
export const  usergetcase = (a,b)=>request({url:`/casea/search?pageNum=${a}&pageSize=${b}`,method:'get',});
export const  usergetinfo = ()=>request({url:`/userInfo/get`,method:'get',});
export const  usergetbmi = ()=>request({url:`/userInfo/BMI`,method:'get',});
export const  userputinfo = (name,phone,idCard,age,height,weight,gender,userId)=>request({url:`/userInfo/update`,method:'put',data:{name:name,phone:phone,idCard:idCard,age:age,height:height,weight:weight,gender:gender,userId:userId}});
/* export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
} */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
