<template>
  <main>
    <form-comp 
      :fields="getFields"
      :submitText="'Submit'" 
      @submit="onSubmit"
      :task="'register'"
      :label="true"/>
  </main>
</template>
<script>
import formComp from '../components/form-comp.vue';
export default {
  auth: false,
  components: { formComp },
  computed: {
    getFields() {
      return this.$store.state.registerFields;
    },
    getRadio() {
      return this.$store.state.radio;
    }
  },
  methods: {
    async onSubmit() {
      const userRegister = {
        first_name: this.getFields[0].value, 
        last_name: this.getFields[1].value, 
        email: this.getFields[2].value,
        user: this.getFields[3].value,
        password: this.getFields[4].value,
        profession: this.getRadio.value
      };

      if (userRegister.password.length < 8) {
        this.$store.commit('changeError', 'Password must be at least 8 characters');
      } else if (/^\d+$/.test(userRegister.password)) {
          this.$store.commit('changeError', 'Password contains only digits');
      } else if (/^[a-z,A-Z]+$/.test(userRegister.password)) {
          this.$store.commit('changeError', 'Password contains only letters');
      } else {
          try {
              await this.$axios.post('accounts/users/', userRegister)
              this.$router.push('login');
          } catch(e) {
              console.log('changeError', 'Something went wrong');
          }
                                        
      }
    }
  },
  mounted() {
    this.$store.commit('changeError', '')
    if (this.$auth.loggedIn) {
      this.$router.push('home');
    }
  },

  destroyed() {
    this.$store.commit('changeError', '');
    this.$store.commit('resetRegisterState');
  }
}
</script>

<style scoped>
  html, body {
    overflow: hidden;
  }
</style>