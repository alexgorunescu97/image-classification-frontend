<template>
    <div>
      <h1>Welcome!</h1>
    </div>
</template>
<script>
import store from '../store/index.js';
export default {
  auth: false,
  store,
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('home');
    }
  }
}
</script>

<style scoped>
  html, body {
    overflow: hidden;
  }

    div {
        width: 50%;
        margin: 10% auto;
        display: flex;
        justify-content: center;
    }

    h1 {
      font-size: 4vw;
      color: rgb(14, 50, 117);
      font-family: monospace;
    }
</style>