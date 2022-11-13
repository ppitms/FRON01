import request from '@/utils/request'

export default{
    //获取借款数据
    getList(){
        return request({
            url:'/admin/core/borrowInfo/getList',
            method:'get'
        })
    },
    show(BorrowInfoId){
        return request({
            url:`/admin/core/borrowInfo/show/${BorrowInfoId}`,
            mehtod:'get',
        })
    },
    approvalSubmit(borrowInfoApproval){
        return request({
            url:`/admin/core/borrowInfo/approvalSubmit`,
            method:'post',
            data:borrowInfoApproval
        })
    }
}