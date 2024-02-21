import request from '@/utils/request'

export const getadmin = ()=>request({url:`/admin/statistics`,method:'get'});