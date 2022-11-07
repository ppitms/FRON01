<template>
  <!--登录-->
  <div class="wrap">
    <div class="tdbModule loginPage">
      <div class="registerTitle">用户登录</div>
      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            投资人
            <input v-model="userInfo.userType" type="radio" value="2" />
            借款人
          </li>
          <li>
            <span class="dis">手机号：</span>
            <input class="input" v-model="userInfo.mobile" />
          </li>

          <li>
            <span class="dis">密码：</span>
            <input class="input" v-model="userInfo.password" type="password" />
          </li>
          <li class="btn">
            <button @click="login()" :class="{ disabled: !isValid }">
              立即登录
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/register.css'
import cookie from 'js-cookie'

export default {
  data() {
    return {
      userInfo: {
        userType: 1,
      },
      isValid: true, //表单校验是否成功
    }
  },

  methods: {
    //登录
    login() {
      //前端校验
      //正则表达式
      let mobileReg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\d{8}$/
      let passwordReg=/^[_0-9a-z]{6,24}$/
      //前端校验验证手机号
      if(!mobileReg.test(this.userInfo.mobile)){
        this.$message.error("手机格式错误")
        return;
      };
      //验证密码
      if(!passwordReg.test(this.userInfo.password)||this.userInfo.password==null){
        this.$message.error("密码格式不正确")
        return;
      }
      //发送异步请求
      this.$axios.$post('/api/core/userInfo/login',this.userInfo).then(response=>{
        this.$message.success("登陆成功")
        //将令牌写入cookie
        cookie.set('userInfo',response.data.userInfoVO);
        //跳转用户页面
        window.location.href='/user';
      })
    },
  },
}
</script>
