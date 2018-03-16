<template>
  <div class="login-container" :style="{background: 'url('+bgImg+') no-repeat'}">
    <div class="mask">
      <div class="content">
        <!-- <div class="logo">
        <img :src="logo" alt="logo">
        </div> -->
      <!-- <div class="welcome">欢迎你回来</div> -->
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
        <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="输入手机/账号" />
        </el-form-item>
        <el-form-item prop="password">
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
        <!-- <el-form-item style="margin-bottom: 54px">
        <el-col :span="16">
          <el-input name="code" type="text" v-model="loginForm.codenum" autoComplete="on" placeholder="验证码" />
        </el-col>
        <el-col :span="8" class="captcha-panel">
          <img :src="captchaUrl"  @click="refreshCode"/>
        </el-col>
        </el-form-item> -->
        <el-form-item class="form-btn">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          <span v-show="!loading">登录</span>
        </el-button>
        </el-form-item>
        <div class="tips">
        </div>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import { generateUUID } from '@/utils/uuid';
import { getCaptcha } from '@/api/sys';
import bgone from '@/assets/login_images/bgone.jpg';
import bgtwo from '@/assets/login_images/bgtwo.jpg';
import bgthree from '@/assets/login_images/bgthree.jpg';
import bgfour from '@/assets/login_images/bgfour.jpg';
import bgfive from '@/assets/login_images/bgfive.jpg';

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    var imgs = [bgone, bgtwo, bgthree, bgfour, bgfive];
    var count = 0;
    imgs.forEach(item => {
      var img = new Image();
      img.src = item;
      count++;
    });
    return {
      loginForm: {
        username: '',
        password: '',
        codenum: '',
        clientId: null
      },
      captchaUrl: null,
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      bgImgList: [bgone, bgtwo, bgthree, bgfour, bgfive],
      bgImg: bgone,
      timer: null,
      count: count
    };
  },
  created() {
    if (this.count === 5) {
      this.refreshCode();
      this.timer = setInterval(() => {
        this.switchBg();
      }, 4000);
    }
  },
  methods: {
    refreshCode() {
      var captcha = getCaptcha();
      this.loginForm.clientId = captcha.id;
      this.captchaUrl = captcha.url;
    },
    switchBg() {
      var self = this;
      self.bgImg = self.bgImgList[0];
      var removeItem = self.bgImgList.pop();
      self.bgImgList.unshift(removeItem);
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
            })
            .catch(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(111);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$white: #fff;

.login-container {
  @include relative;
  height: 100vh;
  transition: background-image 2s;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px $white inset !important;
    -webkit-text-fill-color: $bg !important;
  }
  .mask {
    background-color: rgba(#111, $alpha: 0.7);
    height: 100%;
    // padding-top: 116px;
    .content {
      position: absolute;
      top: 50%;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      transform: translateY(-30%);
      .logo,
      .welcome {
        text-align: center;
        // margin: 0 auto;
      }
      .welcome {
        margin-top: 57px;
        color: $white;
        font-size: 36px;
      }
    }
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    // padding: 12px 5px 12px 15px;
    color: $bg;
    // height: 44px;
  }
  .el-input {
    display: inline-block;
    height: 44px;
    width: 100%;
    padding: 0 25px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    // position: absolute;
    // left: 0;
    // right: 0;
    width: 430px;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    height: 44px;
    // background: rgba(255, 255, 255);
    background-color: $white;
    border-radius: 22px;
    color: #454545;
    margin-bottom: 30px;
    .el-form-item__content {
      height: 44px;
    }
    input {
      text-align: center;
    }
    .el-form-item__error {
      margin: 5px 20px;
    }
    .captcha-panel {
      height: 44px;
      overflow: hidden;
      border-radius: 0px 22px 22px 0px;
      box-shadow: inset 0px 0px 10px 22px; // background-color: white;
    }
    .captcha-panel img {
      width: 100%;
      height: 44px;
      // margin-top: 2px; // object-fit: cover;
    }
    .el-form-item__content {
      line-height: 44px;
    }
  }
  .form-btn {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 10px;
    border: 1px solid rgba($white, $alpha: 0.7);
    border-radius: 50%;
    position: relative;
    background-color: transparent;
    .el-form-item__content {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto !important;
      .el-button {
        text-align: center;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 2px solid #fff;
        font-size: 18px;
        z-index: 1;
        background: transparent;
        border-radius: 50%;
        &:hover {
          color: #fff;
          transform: scale(0.93);
        }
        &:focus {
          color: $white;
        }
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 20px;
    top: 1px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    color: $bg;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
