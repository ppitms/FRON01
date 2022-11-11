import request from "@/utils/request";

export default {
  // 查询数据 分页显示
  getListPage(page, limit, keyword) {
    return request({
      url: `/admin/core/borrower/getListPage/${page}/${limit}`,
      method: 'get',
      params: { keyword },//等于 ?k=v
    });
  },
  //获取数据 
  show(borrowerId){
    return request({
        url:`/admin/core/borrower/show/${borrowerId}`,
        method:'get',
    })
  },
  //提交积分数据
  approvalSubmit(approvalForm){
    return request({
      url:`/admin/core/borrower/approvalSubmit`,
      method:'post',
      data:approvalForm
    })
  }
};
