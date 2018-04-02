<template>
  <div class="create">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="question-form">
        <el-form-item label="题目内容" prop="title">
          <el-input type="textarea" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="A选项" prop="answers[0]">
          <el-input v-model="ruleForm.answers[0]"></el-input>
        </el-form-item>
        <el-form-item label="B选项" prop="answers[1]">
          <el-input v-model="ruleForm.answers[1]"></el-input>
        </el-form-item>
        <el-form-item label="C选项" prop="answers[2]">
          <el-input v-model="ruleForm.answers[2]"></el-input>
        </el-form-item>
        <el-form-item label="D选项" prop="answers[3]">
          <el-input v-model="ruleForm.answers[3]"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="standard">
          <el-radio-group v-model="ruleForm.standard">
            <el-radio border :label="0">A选项</el-radio>
            <el-radio border :label="1">B选项</el-radio>
            <el-radio border :label="2">C选项</el-radio>
            <el-radio border :label="3">D选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型标签" prop="tag" class="tag">
          <!-- <el-input v-model="ruleForm.tag"></el-input> -->
            <el-select
               v-model="myTagValue"
               filterable
               remote
               reserve-keyword
               placeholder="请输入关键词"
               :remote-method="remoteMethod"
               :loading="loading">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
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
import { getTagList } from '@/api/tag';
export default {
  data() {
    return {
      myTagValue: this.tagValue,
      currentPage: 1,
      pagesize: 10,
      loading: false,
      options: [],
      list: []
    };
  },
  watch: {
    tagValue(val) {
      this.myTagValue = val;
    },
    myTagValue(val) {
      this.$emit('changeTagValue', val);
    }
  },
  props: {
    rules: {},
    ruleForm: {},
    putType: Number,
    tagValue: String,
    questionNum: [String, Number]
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   this.ruleForm.tag = this.tagValue;
          this.$emit('submitClick', this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.myTagValue = '';
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
    },
    remoteMethod(query) {
      getTagList({
        keyword: query,
        pagenum: this.currentPage,
        pagesize: this.pagesize,
        order: '',
        sort: ''
      }).then(res => {
        if (res.errCode === 0) {
          var tagNames = [];
          res.data.rows.map(item => {
            tagNames.push(item.name);
            this.ruleForm.tag = item.id;
          });
          this.list = tagNames.map(item => {
            return { value: item, label: item };
          });
        }
      });
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
          console.log(this.options);
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-textarea,
.el-input {
  width: 50%;
}
.tag {
  .el-input {
    width: 25%;
  }
}
</style>


