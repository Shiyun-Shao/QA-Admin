<template>
  <div class="create">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="tag-form">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="putType === 1">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')" v-if="putType === 1">重置</el-button>
          <el-button type="primary" @click="changeForm('ruleForm')" v-if="putType === 2">保存</el-button>
          <el-button @click="returnList">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  props: {
    rules: {},
    ruleForm: {},
    putType: Number,
    tagNum: [String, Number]
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitClick', this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('changeClick', this.ruleForm);
        } else {
          return false;
        }
      });
    },
    returnList() {
      this.$emit('returnClick');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-input {
  width: 50%;
}
</style>


