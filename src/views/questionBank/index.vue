<template>
  <div class="question-container">
    <div class="header">
      <div class="title">题库</div>
      <div class="line"></div>
    </div>
    <div class="question-list" v-if="isCreate">
      <search :title="title" @create="createQuest" @search="search"></search>
      <template>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="130">
          </el-table-column>
          <el-table-column
            label="题目内容"
            prop="title">
          </el-table-column>
          <el-table-column 
            label="操作"
            width="230"
            header-align="center"
            align="center">
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
      <pagination
       @currentChange="handleCurrentChange"
       :currentPage="currentPage"
       :totalCount="totalCount"
       :pagesize="pagesize"></pagination>
    </div>
    <questionTemp
     v-else
     :rules="rules"
     :ruleForm="ruleForm"
     :putType="putType"
     :tagValue="tagValue"
     :questionNum="questionNum"
     @submitClick="submitForm"
     @changeClick="changeForm"
     @returnClick="returnList"></questionTemp>
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
import { checkTag } from '@/api/tag';
import questionTemp from '../../components/questionBank/questionTemp';
import pagination from '../../components/pagination';
import search from '../../components/search';
export default {
  components: {
    questionTemp,
    pagination,
    search
  },
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
        ]
      },
      ruleForm: {
        title: '',
        answers: [],
        standard: '',
        tag: ''
      },
      isCreate: true,
      title: '创建题目',
      keywords: '',
      tagValue: '',
      putType: 1,
      questionNum: '',
      questionIdList: [],
      pagesize: 10,
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
        keyword: this.keywords,
        pagesize: this.pagesize,
        pagenum: this.currentPage,
        order: '',
        sort: ''
      }).then(res => {
        if (res.errCode === 0) {
          _this.questionList = res.data.rows;
          this.totalCount = res.data.count;
        }
      });
    },
    submitForm(ruleForm) {
      addQuestion(ruleForm).then(response => {
        if (response.errCode === 0) {
          this.openMessage(1);
          this.isCreate = true;
          this.getQuestionList();
        }
      });
    },
    changeForm(ruleForm) {
      ruleForm.id = this.questionNum;
      ruleForm.standard = this.questionIdList[this.ruleForm.standard];
      changeQuestion(ruleForm).then(response => {
        this.returnList();
        this.openMessage(3);
        this.getQuestionList();
      });
    },
    search(val) {
      this.keywords = val;
      this.getQuestionList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createQuest() {
      this.clearForm();
      this.tagValue = '';
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
        checkTag(this.ruleForm.tag).then(res => {
          if (res.errCode === 0) {
            this.tagValue = res.data.name;
          }
        });
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getQuestionList();
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
}
</style>


