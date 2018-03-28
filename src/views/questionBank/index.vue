<template>
  <div class="question-container">
    <div class="header">
      <div class="title">题库</div>
      <div class="line"></div>
    </div>
    <div class="question-list" v-if="isCreate">
      <el-button type="primary" @click="createQuest">创建题目</el-button>
      <template>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            label="题目内容"
            prop="title">
          </el-table-column>
          <el-table-column 
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :total="totalCount"
        :page-size="pagesize">
      </el-pagination>
    </div>
    <div class="create" v-else>
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
          <el-input v-model="ruleForm.tag"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="putType === 1">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')" v-if="putType === 1">重置</el-button>
          <el-button type="primary" @click="changeForm()" v-if="putType === 2">保存</el-button>
          <el-button @click="returnList">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getQuestion,
  addQuestion,
  deleteQuestion,
  changeQuestion,
  checkQuestion
} from '@/api/question';
import Vue from 'vue';
export default {
  data() {
    return {
      questionList: [],
      rules: {
        title: [{ required: true, message: '请填写题目内容', trigger: 'blur' }],
        answers: [
          { required: true, message: '请填写选项内容', trigger: 'blur' },
          { required: true, message: '请填写选项内容', trigger: 'blur' },
          { required: true, message: '请填写选项内容', trigger: 'blur' },
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
      isCreate: true,
      putType: 1,
      questionNum: '',
      questionIdList: [],
      pagesize: 10,
      pagenum: 1,
      currentPage: 1,
      totalCount: 0
    };
  },
  created() {
    this.getQuestionList();
  },
  methods: {
    getQuestionList() {
      var _this = this;
      getQuestion({
        keyword: '',
        pagesize: this.pagesize,
        pagenum: this.pagenum,
        order: '',
        sort: ''
      }).then(res => {
        if (res.errCode === 0) {
          _this.questionList = res.data.rows;
          this.totalCount = res.data.count;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addQuestion(this.ruleForm).then(response => {
            if (response.errCode === 0) {
              this.openMessage(1);
              this.isCreate = true;
              this.getQuestionList();
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeForm() {
      this.ruleForm.id = this.questionNum;
      this.ruleForm.standard = this.questionIdList[this.ruleForm.standard];
      changeQuestion(this.ruleForm).then(response => {
        this.returnList();
        this.openMessage(3);
        this.getQuestionList();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createQuest() {
      this.clearForm();
      this.isCreate = false;
    },
    returnList() {
      this.isCreate = true;
    },
    handleEdit(index, row) {
      var id = row.id;
      this.clearForm();
      checkQuestion(id).then(res => {
        var questionList = [];
        var standard = res.data.question.standard;
        this.isCreate = false;
        this.putType = 2;
        this.ruleForm.title = res.data.question.title;
        this.ruleForm.tag = res.data.question.tag;
        this.questionNum = res.data.question.id;
        res.data.answers.map((item, index) => {
          questionList.push(item.id);
          this.ruleForm.answers.push(item.content);
          if (item.id === standard) {
            this.ruleForm.standard = index;
          }
        });
        this.questionIdList = questionList;
        console.log(this.questionIdList);
      });
    },
    handleDelete(index, row) {
      var id = row.id;
      deleteQuestion(id).then(res => {
        if (res.errCode === 0) {
          this.openMessage(2);
          this.getQuestionList();
        }
      });
    },
    clearForm() {
      this.ruleForm = {
        title: '',
        answers: [],
        standard: '',
        tag: ''
      };
    },
    openMessage(id) {
      if (id === 1) {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      }
      if (id === 2) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }
      if (id === 3) {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }
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


