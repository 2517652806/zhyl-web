<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="tabeledata">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="80" align="center"></el-table-column>
      <el-table-column prop="opinion" label="意见描述" width="600" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="{ row }">
          {{ formatTimestamp(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
        <template slot-scope="{ row }">
          {{ formatTimestamp(row.updateTime) }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页          -->
    <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[3, 10, 20, 30, 40, 50, 100]"
      style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="currentChange"
      @size-change="sizeChange" />
  </div>
</template>

<script>
import { adminopinion } from '@/api/admin'
export default {
  name: "Sku",
  data() {
    return {
      page: 1, // 当前页码
      page1: 1,
      limit: 3, // 每页数量
      limit1: 1,
      total: 0, // 总数量
      total1: 0,
      show: false,
      tabeledata: []
    };
  },
  //组件挂载完毕
  mounted() {
    this.admin()
  },
  methods: {
    async admin() {
      let result = await adminopinion()
      if (result.code == 0) {
        this.$message.success('获取数据成功')
        this.tabeledata = result.data.records
        this.total = result.data.total
        this.getTabelData()
      }
    },
    getTabelData() {
      this.tableData = this.tabeledata.slice((this.page - 1) * this.limit, this.page * this.limit)
    },
    currentChange(val) {
      console.log("翻页，当前为第几页", val)
      this.page = val
      this.getTabelData()
    },
    sizeChange(val) {
      console.log("改变每页多少条", val)
      this.limit = val
      this.page = 1
      this.getTabelData()
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    },
    //获取sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages;
      //解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    edit() {
      this.$message("正在开发中");
    },
    //获取SKU详情的方法
    async getSkuInfo(sku) {
      //展示抽屉
      this.show = true;
      //获取SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    }
  },
};
</script>


<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 10px 10px;
}

>>>.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
