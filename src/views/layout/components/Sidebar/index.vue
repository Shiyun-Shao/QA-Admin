<template>
  <scroll-bar>
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <el-menu mode="vertical" :default-openeds="['ProductCenter']" :default-active="$route.path" :collapse="isCollapse" text-color="#666" active-text-color="#ca303a">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, ScrollBar, Hamburger },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-container {
  line-height: 58px;
  height: 50px; // width: 50px; // float: right;
  display: flex; // justify-content: flex-start;
  align-items: center;
  color: #fcfcfc;
  padding: 0 10px 0 20px;
  fill: currentColor;
}
</style>
