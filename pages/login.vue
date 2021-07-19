<template>
  <main>
    <form-comp 
      :fields="getFields" 
      @submit="onSubmit" 
      :submitText="'Submit'"
      :task="'login'"
      :label="true"/>
  </main>
</template>
<script>
import formComp from '../components/form-comp.vue';
export default {
    components: { formComp },
    computed: {
        getFields() {
            return this.$store.state.loginFields;
        }
    },
    methods: {
        async onSubmit() {
            const userLogin = {
                email: this.getFields[0].value,
                password: this.getFields[1].value,
            };
            /*await this.$axios.post('http://127.0.0.1:8000/login/', userLogin)
                                            .then(res => {
                                            const userData = res.data;
                                            this.$store.commit('changeError', '');
                                            this.$store.commit('loadUser', userData);
                                            this.$router.push('home');
                                            })
                                            .catch(err => this.$store.commit('changeError', 'Wrong username or password'))
            */
          try {
            await this.$auth.loginWith('local', {data: userLogin})
          } catch(e) {
              this.$store.commit('changeError', 'Wrong username or password')
          }  
        }
    },

    destroyed() {
        this.$store.commit('changeError', '')
        this.$store.commit('resetLoginState');
    }
}
</script>

<style scoped>
  html, body {
    overflow: hidden;
  }
</style>