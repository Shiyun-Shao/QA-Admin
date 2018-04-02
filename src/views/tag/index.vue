<template>
  <div class="tag-container">
      <div class="header">
        <div class="title">标签</div>
        <div class="line"></div>
      </div>
      <div class="tag-list" v-if="isCreate">
        <search :title="title" @create="createTag" @search="search"></search>
        <template>
            <el-table :data="tagList" style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="标签名"
                    prop="name">
                </el-table-column>
                <el-table-column 
                    label="操作"
                    width="250"
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
      <tagTemp
        v-else
        :rules="rules"
        :ruleForm="ruleForm"
        :putType="putType"
        :tagNum="tagNum"
        @submitClick="submitForm"
        @changeClick="changeForm"
        @returnClick="returnList"></tagTemp>
  </div>
</template>
<script>
import { getTagList, addTag, deleteTag, changeTag, checkTag } from '@/api/tag';
import tagTemp from '../../components/Tag/tagTemp';
import pagination from '../../components/pagination';
import search from '../../components/search';
export default {
  components: {
    tagTemp,
    pagination,
    search
  },
  data() {
    return {
      isCreate: true,
      tagList: [],
      currentPage: 1,
      putType: 1,
      pagesize: 10,
      totalCount: 0,
      tagNum: '',
      title: '创建标签',
      keywords: '',
      rules: {
        name: [{ required: true, message: '请填写题目内容', trigger: 'blur' }]
      },
      ruleForm: {
        name: ''
      }
    };
  },
  created() {
    this.getTagList();
  },
  methods: {
    getTagList() {
      getTagList({
        keyword: this.keywords,
        pagenum: this.currentPage,
        pagesize: this.pagesize,
        order: '',
        sort: ''
      }).then(res => {
        if (res.errCode === 0) {
          this.tagList = res.data.rows;
          this.totalCount = res.data.count;
        }
      });
    },
    submitForm(ruleForm) {
      addTag(ruleForm).then(res => {
        if (res.errCode === 0) {
          this.openMessage(1);
          this.isCreate = true;
          this.getTagList();
        }
      });
    },
    changeForm(ruleForm) {
      ruleForm.id = this.tagNum;
      changeTag(ruleForm).then(res => {
        this.returnList();
        this.openMessage(3);
        this.getTagList();
      });
    },
    handleEdit(index, row) {
      var id = row.id;
      this.clearForm();
      checkTag(id).then(res => {
        this.isCreate = false;
        this.putType = 2;
        this.tagNum = res.data.id;
        this.ruleForm.name = res.data.name;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTagList();
    },
    handleDelete(index, row) {
      var id = row.id;
      deleteTag(id).then(res => {
        if (res.errCode === 0) {
          this.openMessage(2);
          this.getTagList();
        }
      });
    },
    search(val) {
      this.keywords = val;
      this.getTagList();
    },
    returnList() {
      this.isCreate = true;
    },
    createTag() {
      this.clearForm();
      this.isCreate = false;
    },
    clearForm() {
      this.ruleForm = {
        name: ''
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
.tag-container {
  background-color: #fff;
  padding: 20px;
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


