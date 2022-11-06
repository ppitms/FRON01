<template>
    <div class="app-container">
        <!-- 表格 -->
        <el-table :data="list" border stripe>
            <el-table-column type="index" width="50" />
            <el-table-column prop="borrowAmount" label="借款额度" />
            <el-table-column prop="integralStart" label="积分区间开始" />
            <el-table-column prop="integralEnd" label="积分区间结束" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="'/core/integral-grade/edit/'+scope.row.id">
                        <el-button icon="el-icon-edit" size="mini" type="primary">
                            修改
                        </el-button>
                    </router-link>
                    <el-button style="margin-left: 10px" icon="el-icon-delete" size="mini" type="danger" @click="deleteById(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade'

export default {
    // 数据模型
    data() {
        return {
            list: [
                { "index": 1, "borrowAmount": 100, "integralStart": 1, "integralEnd": 2 }
                , { "index": 2, "borrowAmount": 200, "integralStart": 1, "integralEnd": 2 }
                , { "index": 3, "borrowAmount": 300, "integralStart": 1, "integralEnd": 2 }
            ]
        }
    },
    // 钩子函数
    created() {
        this.fetchData();
    },
    // 方法
    methods: {
        fetchData() {
            integralGradeApi.getList().then(response => {
                this.list = response.data.list;
                this.$message.success("数据请求成功");
            })
        },
        deleteById(id) {
            if (confirm("确认删除？")) {
                integralGradeApi.deleteById(id).then(response => {
                    this.$message.success("删除成功");
                    this.fetchData();
                })
            }
        }
    }
}
</script>