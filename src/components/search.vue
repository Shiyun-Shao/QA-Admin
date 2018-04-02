<template>
    <div style="display: flex; flex-direction: row; justify-content:space-between">
      <el-button type="primary" @click="create">{{title}}</el-button>
      <div>
        <el-input placeholder="查询关键字" v-model.trim="keywords" style="width:50%"></el-input> 
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ''
    };
  },
  props: ['title'],
  methods: {
    create() {
      this.$emit('create');
    },
    search() {
      this.$emit('search', this.keywords);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
