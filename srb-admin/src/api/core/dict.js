import request from '@/utils/request'
export default{
    getDictListByParentId(parentId){
        return request({
            url:`/admin/core/dict/getDictListByParentId/${parentId}`,
            method:'get'
        })
    }
}