<template>
  <div class="app-container">
    <!-- 借款信息borrowinfo列表 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="param.name" label="借款人姓名" width="90" />
      <el-table-column prop="param.mobile" label="手机" />
      <el-table-column prop="amount" label="借款金额" />
      <el-table-column label="借款期限" width="90">
        <template slot-scope="scope">{{ scope.row.period }}个月</template>
      </el-table-column>
      <el-table-column prop="param.returnMethod" label="还款方式" width="150" />
      <el-table-column prop="param.moneyUse" label="资金用途" width="100" />
      <el-table-column label="年化利率" width="90">
        <template slot-scope="scope">
          {{ scope.row.borrowYearRate * 100 }}%
        </template>
      </el-table-column>
      <el-table-column prop="param.status" label="状态" width="100" />

      <el-table-column prop="createTime" label="申请时间" width="150" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="'/core/borrower/info-detail/' + scope.row.id">
              查看
            </router-link>
          </el-button>

          <el-button
            v-if="scope.row.status === 1"
            type="warning"
            size="mini"
            @click="approvalShow(scope.row)"
          >
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批对话框 -->
    <el-dialog title="审批" :visible.sync="dialogVisible" width="490px">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="是否通过">
          <el-radio-group v-model="borrowInfoApproval.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的名称">
          <el-input v-model="borrowInfoApproval.title" />
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="起息日">
          <el-date-picker
            v-model="borrowInfoApproval.lendStartDate"
            type="date"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="年化收益率">
          <el-input v-model="borrowInfoApproval.lendYearRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="服务费率">
          <el-input v-model="borrowInfoApproval.serviceRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的描述">
          <el-input v-model="borrowInfoApproval.lendInfo" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="approvalSubmit"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import borrowInfoApi from '@/api/core/borrow-info'
export default {
  data() {
    return {
      dialogVisible:false,
      list: [],
      borrowInfoApproval:{
        id:2,
        lendYearRate:12,
        serviceRate:1,
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    //点击审批按钮，弹出框
    approvalShow(row) {
      // alert("提交借款审核dialog对话框"),
      this.dialogVisible = true;
      this.borrowInfoApproval.id = row.id
    },
    //获取借款数据
    fetchData() {
      borrowInfoApi.getList().then(response => {
        this.list = response.data.list
      })
    },
    //点击确认审批
    approvalSubmit() {
      //发送请求提交审核
      borrowInfoApi.approvalSubmit(this.borrowInfoApproval).then(response=>{
        this.$message.success("审批成功")
        //关闭对话框
        this.dialogVisible=false
        //重新加载数据
        this.fetchData();
      })
    },
  }
}
</script>
  