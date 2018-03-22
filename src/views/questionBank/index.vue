<template>
  <div class="question-container">
    <div class="header">
      <div class="title">题库</div>
      <div class="line"></div>
    </div>
    <div class="question-list" v-if="isCreate">
      <el-button type="primary" @click="createQuest">创建题目</el-button>
      <template>
        <el-table style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            label="题目内容">
          </el-table-column>
          <el-table-column 
            label="操作"
            width="180">
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="108"
        :page-size="10">
      </el-pagination>
    </div>
    <div class="create" v-else>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="question-form">
        <el-form-item label="题目内容" prop="title">
          <el-input type="textarea" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="A选项" prop="answers">
          <el-input v-model="ruleForm.answers[0]"></el-input>
        </el-form-item>
        <el-form-item label="B选项" prop="answers">
          <el-input v-model="ruleForm.answers[1]"></el-input>
        </el-form-item>
        <el-form-item label="C选项" prop="answers">
          <el-input v-model="ruleForm.answers[2]"></el-input>
        </el-form-item>
        <el-form-item label="D选项" prop="answers">
          <el-input v-model="ruleForm.answers[3]"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="standard">
          <el-radio-group v-model="ruleForm.standard">
            <el-radio border label="0">A选项</el-radio>
            <el-radio border label="1">B选项</el-radio>
            <el-radio border label="2">C选项</el-radio>
            <el-radio border label="3">D选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型标签" prop="tag" class="tag">
          <el-input v-model="ruleForm.tag"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getQuestion, addQuestion } from '@/api/question';
export default {
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请填写题目内容', trigger: 'blur' }],
        answers: [
          { required: true, message: '请填写选项内容', trigger: 'blur' }
        ],
        standard: [
          { required: true, message: '请设置正确的答案', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请给题目添加类型标签', trigger: 'blur' }
        ]
      },
      ruleForm: {
        title: '',
        answers: [],
        standard: '',
        tag: ''
      },
      isCreate: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addQuestion(this.ruleForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createQuest() {
      this.isCreate = false;
    },
    addQuestion(param) {
      addQuestion({ param }).then(response => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.question-container {
  background-color: #fff;
  padding: 20px;
  .question-form {
    margin-top: 40px;
  }
  .title {
    font-weight: bold;
  }
  .line {
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 1px solid #ccc;
  }
  .el-textarea,
  .el-input {
    width: 50%;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .tag {
    .el-input {
      width: 25%;
    }
  }
}
</style>


