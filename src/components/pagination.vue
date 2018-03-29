<template>
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="totalCount"
    :page-size="pagesize">
  </el-pagination>
</template>

<script>
export default {
  props: ['currentPage', 'totalCount', 'pagesize'],
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>

