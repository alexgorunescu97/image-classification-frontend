<template>
    <div>
        <form-comp 
        :fields="getFields" 
        @submit="onSubmit" 
        :submitText="'Submit'"
        :task="'email'"
        :label="true"/>
        <h1 v-if="reset" id="check-email">Check your email for password reset link!</h1>
    </div>
</template>

<script>
import formComp from '../components/form-comp.vue';
export default {
  data() {
      return {
          reset: false
      }
  },
  components: { formComp },
    auth: false,
    computed: {
        getFields() {
            return this.$store.state.emailFields;
        }
    },
    methods: {
        async onSubmit() {
            this.reset = true;
            await this.$store.dispatch('sendResetEmail');
        }
    },
    destroyed() {
        this.$store.commit('changeError', '');
        this.$store.commit('resetEmailState');
    }
}
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        color: rgb(71, 55, 55);
    }
</style>