import request from '@/utils/request'

export const getadmin = ()=>request({url:`/admin/statistics`,method:'get'});
export const adminsearch = (pageNum,pageSize)=>request({url:`/admin/search?pageNum=${pageNum}&pageSize=${pageSize}`,method:'get'});
export const adminfeedback = ()=>request({url:`/admin/opinion`,method:'get'});
export const adminloginlogs = (type,pageSize)=>request({url:`/admin/loginlogs?type=${type}&pageSize=${pageSize}`,method:'get'});
export const adminisdisable = (userId,isDisable)=>request({url:`/admin/isDisable`,method:'put',data:{userId,isDisable}});
export const adminivcase = (pageNum,pageSize)=>request({url:`/casea/search?pageNum=${pageNum}&pageSize=${pageSize}`,method:'get'});
export const adminicase = (id,type)=>request({url:`/admin/cases`,method:'put',data:{id,type}});
export const adminexcel = (name,phone,idCard)=>request({url:`/admin/excel?name=${name}&phone=${phone}&idCard=${idCard}`,method:'get',});
export const adminopinion = (pageNum,pageSize)=>request({url:`/admin/opinion?pageNum=${pageNum}&pageSize=${pageSize}`,method:'get',});