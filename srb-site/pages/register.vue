<template>
  <!--注册-->
  <div class="wrap">
    <div v-if="step === 1" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc1">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>

      <div class="registerCont">
        <ul>
          <li>
            <span class="dis"></span>
            <input v-model="userInfo.userType" type="radio" value="1" />
            我要投资
            <input v-model="userInfo.userType" type="radio" value="2" />
            我要借钱
          </li>
          <li class="telNumber">
            <span class="dis">手机号码</span>
            <input class="input" v-model="userInfo.mobile" />
            <button v-if="!sending" class="button" @click="send()">
              获取验证码
            </button>
            <button v-else disabled class="button disabled">
              {{ leftSecond }}秒后重发
            </button>
          </li>

          <li>
            <span class="dis">短信验证码</span>
            <input class="input" v-model="userInfo.code" />
            <span class="info">
              请输入验证码
            </span>
          </li>

          <li>
            <span class="dis">密码</span>
            <input type="password" v-model="userInfo.password" class="input" />
            <span class="info">
              6-24个字符，英文、数字组成，区分大小写
            </span>
          </li>

          <li class="agree">
            <input type="checkbox" checked />
            我同意《<NuxtLink to="#" target="_black">尚融宝注册协议</NuxtLink>》
            <span>请查看协议</span>
          </li>
          <li class="btn">
            <button @click="register()">
              下一步
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="step === 2" class="tdbModule register">
      <div class="registerTitle">注册账户</div>
      <div class="registerLc2">
        <p class="p1">填写账户信息</p>
        <p class="p2">注册成功</p>
      </div>
      <div class="registerCont">
        <ul>
          <li class="scses">
            {{ this.userInfo.mobile }} 恭喜您注册成功！
            <NuxtLink class="blue" to="/login">
              请登录
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/register.css'
export default {
  data() {
    return {
      step: 1, //注册步骤
      userInfo: {
        userType: 1,
      },
      sending: false, // 是否发送验证码
      second: 10, // 倒计时间
      leftSecond: 0, //剩余时间
    }
  },

  methods: {
    //发短信（点击获取验证码）
    send() {
      //前端校验验证手机号
      let mobile=this.userInfo.mobile;
      let reg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\d{8}$/
      if(!reg.test(mobile)){
        this.$message.error("手机格式错误")
        return;
      }
      //发送验证码
      this.$axios.get('/api/sms/sendRegistCode/'+this.userInfo.mobile).then(response=>{
        this.$message.success("发送成功");
        //倒计时
        this.timeDown();
      })
    },

    //倒计时
    timeDown() {
      //倒计时按钮
      this.sending=true;
      this.leftSecond=this.second;
      //循环函数
      let timer=setInterval(()=>{
        this.leftSecond--;
        if(this.leftSecond<=0){
          this.sending=false;
          //结束循环恢复按钮（杀掉循环，不可用return，循环会继续叠加）
          clearInterval(timer);
        }
      },1000)
    },

    //注册
    register() {
      //前端校验
      //正则表达式
      let mobileReg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\d{8}$/
      let codeReg=/^\d{4}|\d{6}$/
      let passwordReg=/^[_0-9a-z]{6,24}$/
      //前端校验验证手机号
      if(!mobileReg.test(this.userInfo.mobile)){
        this.$message.error("手机格式错误")
        return;
      };
      //验证验证码是否为空
      if(!codeReg.test(this.userInfo.code)){
        this.$message.error("验证码格式不正确")
        return;
      }
      //验证密码
      if(!passwordReg.test(this.userInfo.password)||this.userInfo.password==null){
        this.$message.error("密码格式不正确")
        return;
      }
      //发送验证码
      this.$axios.post('/api/core/userInfo/register',this.userInfo).then(response=>{
        this.$message.success("注册成功");
        //切换页面
        this.step=2;
      })
    },
  },
}
</script>
