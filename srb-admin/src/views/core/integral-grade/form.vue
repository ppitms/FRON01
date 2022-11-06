<template>
    <div class="app-container">
      <!-- 输入表单 -->
      <el-form label-width="120px">
        <el-form-item label="借款额度">
          <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
        </el-form-item>
        <el-form-item label="积分区间开始">
          <el-input-number v-model="integralGrade.integralStart" :min="0" />
        </el-form-item>
        <el-form-item label="积分区间结束">
          <el-input-number v-model="integralGrade.integralEnd" :min="0" />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="saveOrUpdate()">
            保存/更新
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
<script>
import integralGradeApi from '@/api/core/integral-grade'
export default{
    data () {
        return {
            integralGrade:{},
            // 是否不可点击
            saveBtnDisabled:false
        }
    },
    created () {
      let id=this.$route.params.id;
      if(id){
        this.integralGrade.id=id;
        // 回显数据
        integralGradeApi.getById(id).then(response=>{
          this.$message.success("数据回显成功 ");
          this.integralGrade=response.data.integralGrade;
        })
      }
    },
    methods:{
        saveOrUpdate(){
            // 不可点击
            this.saveBtnDisabled=true
            // 根据是否携带id提交后端保存/修改数据
            if(this.integralGrade.id){
                this.updateById();
            }else{
                this.save();
            }
            // 返回list页面
            this.back()
        },
        // 返回list页面
        back(){
            this.$router.push('core/integral-grade/list')
        },
        //根据id修改
        updateById(){
            integralGradeApi.updateById(this.integralGrade).then(response=>{
              this.$message.success("修改成功");
                // 返回list页面
                this.back();
            })
        },
        //新增
        save(){
            integralGradeApi.save(this.integralGrade).then(response=>{
                this.$message.success("保存成功");
                // 返回list页面
                this.back();
            })
        }
    }
}
</script>
