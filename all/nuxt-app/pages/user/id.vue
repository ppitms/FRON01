<template>
    <div>
        <h2>{{id}}号用户</h2>
    </div>
</template>
<script>


export default{
    data () {
        return {
            id:0
        }
    },
    created(){
        this.id=this.$route.params.id
    },
    layout:'my'
}
</script>
