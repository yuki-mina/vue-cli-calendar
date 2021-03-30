<template>
<div class="sign-in">
  <section class="left-section">
    <div>
      
    </div>
  </section>
  <section class="right-section">
    <div class="login-container">

    ログイン
    <button @click="signin">ログイン</button>
    <p>
      新規登録は
      <router-link to="/signup">こちら</router-link>
    </p>
    </div>
  </section>
  <div>
    
  </div>
</div>
</template>
<script>
export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signin: function () {
        this.$router.push('/weekly')
      }
    }
}
</script>
<style scoped>
.sign-in{
  position:relative;
  /* background: olive; */
  height:auto;
}
.left-section{
  position: absolute;
  /* background: salmon;  */
  width:50vw;
  height:auto;
}
.right-section{
  position: absolute;
  right:0;
  width:50vw;
  height:auto;
  /* background:sandybrown; */
}
.login-container{
  border: 1px solid #ccc;
  border-radius: 30px;
  background:rgba(140, 181, 241, 0.3);
  width:300px;
  height:400px;
  margin: 10% auto;
  padding:30px;
}

</style>
