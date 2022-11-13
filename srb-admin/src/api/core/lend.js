import request from '@/utils/request'

export default{
    getList(){
        return request({
            url:'/admin/core/lend/getList',
            method:'get'
        })
    },
    show(lendId){
        return request({
            url:`/admin/core/lend/show/${lendId}`,
            method:'get'
        })
    }
}