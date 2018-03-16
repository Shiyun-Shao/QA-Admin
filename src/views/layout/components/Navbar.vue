<template>
  <el-menu class="navbar" mode="horizontal">
    <svg-icon :icon-class="'logo'"></svg-icon>
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <!-- <breadcrumb></breadcrumb> -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src='user.avatar'>
        <div class="shop-name">{{user.name}}</div>
        <!-- <i class="el-icon-caret-bottom"></i> -->
        <svg-icon icon-class="arrow" />
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  background-color: #fcfcfc;
}

.navbar {
  height: 85px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  align-items: center; // justify-content: space-between;
  padding: 0 40px;
  // position: relative;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  .svg-icon {
    width: 47px;
    height: 49px;
  } // .hamburger-container {
  //   line-height: 58px;
  //   height: 50px;
  //   float: left;
  //   padding: 0 10px;
  // }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 40px;
    .avatar-wrapper {
      cursor: pointer; // margin-top: 5px;
      // position: relative;
      display: flex;
      align-items: center;
      .user-avatar {
        // width: 40px;
        height: 54px;
        border-radius: 10px;
        margin-right: 24px;
      }
      .shop-name {
        font-size: 16px;
        color: #333;
      }
      .svg-icon {
        height: 32px;
      }
    }
  }
}
</style>

