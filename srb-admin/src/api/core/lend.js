import request from '@/utils/request'

export default{
    //获取标的列表
    getList(){
        return request({
            url:'/admin/core/lend/getList',
            method:'get'
        })
    },
    //获取标的详细信息
    show(lendId){
        return request({
            url:`/admin/core/lend/show/${lendId}`,
            method:'get'
        })
    },
    //放款
    makeLoan(lendId){
        return request({
            url:`/admin/core/lend/makeLoan/${lendId}`,
            method:'get'
        })
    }
}