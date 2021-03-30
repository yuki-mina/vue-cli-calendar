<template>
<section class="sign-up">
    新規登録
    <button @click="signup">新規登録</button>
    <p>
      ログインは
      <router-link to="/signin">こちら</router-link>
    </p>
</section>
</template>
<script>
export default {
    name: 'Signup',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signup: function () {
        alert("登録されたアドレスにメールを送信しました！確認してください");
        this.$router.push('/signin')
      }
    }
  }
</script>
<style scoped>

</style>
