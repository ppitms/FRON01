<template>
    <div>
        <h1>主页面</h1>
        <NuxtLink to="/about" target="_blank">关于我们</NuxtLink>
        <NuxtLink to="/lend">我要投资</NuxtLink>
        <NuxtLink to="/user">用户页面</NuxtLink>
        {{ip}}
    </div>
</template>
<script>
export default{
    data () {
        return {
            ip:'127.0.0.1'
        }
    },

    // 服务端渲染
    // async asyncData({$axios}){
    //     let response=await $axios.get("/");
    //     return {
    //         ip:response.data
    //     }
    // }

    // 客户端渲染
    mounted () {
      this.getMyIp(); 
    },
    methods: {
        getMyIp(){
            this.$axios.get('/').then(response=>{
                this.ip=response.data;
            })
        }
    },
}
</script>