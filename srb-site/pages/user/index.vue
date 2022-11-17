<template>
  <div class="personal-main">
    <div class="pmain-profile">
      <div class="pmain-welcome">
        <span class="fr">上次登录时间： 2020-09-11 14:05:07 </span>
      </div>
      <div class="pmain-user">
        <div class="user-head">
          <span class="head-img" title="点击更换头像">
            <span>
              <img src="~/assets/images/touxiang.png" style="width:88px;height:88px;z-index:0;" />
              <i class="headframe" style="z-index:0;"></i>
            </span>
          </span>
        </div>
        <div class="user-info" v-if="$parent.userType === 2">
          <ul>
            <li>
              用户名<span>tg_gpdt0139</span>
              <NuxtLink v-if="$parent.userType === 2" to="/user/borrower">
                立即借款
              </NuxtLink>
            </li>
            <li>
              您还未开通第三方支付账户，请
              <NuxtLink to="/user/bind">立即开通</NuxtLink>
              以确保您的正常使用和资金安全。
            </li>
          </ul>
        </div>
        <div class="user-info" v-if="$parent.userType !== 2">
          <ul>
            <li>
              <h2>绑定成功</h2>
            </li>
          </ul>
        </div>
      </div>
      <div class="pmain-money">
        <ul v-if="$parent.userType === 1">
          <li class="none">
            <span>
              <em>账户余额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">{{ userAccount.amount }} </i> 元</span>
          </li>
          <li>
            <span>
              <em>冻结金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">{{ userAccount.freezeAmount }} </i>元</span>
          </li>
          <li>
            <span>
              <em>累计收益</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb c-pink">{{ interestSum }} </i> 元</span>
          </li>
        </ul>
        <ul v-if="$parent.userType === 2">
          <li class="none">
            <span>
              <em>账户余额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i> 元</span>
          </li>
          <li>
            <span>
              <em>当前借款金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb">0.00 </i> 元</span>
          </li>
          <li>
            <span>
              <em>累计借款金额</em>
              <i class="markicon"></i>
            </span>
            <span class="truemoney"><i class="f26 fb c-pink">0.00 </i> 元</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 0,
      userAccount: {
        amount: 0.00,
        freezeAmount: 0.00,
      },
      interestSum: 0.00
    }
  },
  mounted() {
    //获取状态
    this.getUserBindStatusByUserId();
    //获取用户账户信息
    this.getUserAccount();
    //获取累计收益
    this.getInterestSum();
  },
  methods: {
    //获取状态
    getUserBindStatusByUserId() {
      this.$axios.$get('/api/core/userBind/getUserBindStatusByUserId').then(response => {
        this.status = response.data.status
      })
    },
    //获取用户账户信息
    getUserAccount() {
      this.$axios.$get('/api/core/userAccount/getUserAccount').then(response => {
        this.userAccount = response.data.userAccount
      })
    },
    //获取累计收益
    getInterestSum(){
      this.$axios.$get('/api/core/lendItemReturn/getInterestSum').then(response => {
        this.interestSum = response.data.interestSum
      })
    }
  }
}
</script>
