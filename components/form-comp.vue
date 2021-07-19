<template>
    <div id="form-container">
      <form @submit.prevent="$emit('submit')" action="">
          <input-label 
              v-for="(field, index) in fields"
              :index="index"
              :key='field.id'
              :type='field.type' 
              :name="field.name"
              :task="task"
              :label="label"/>
          <p @click="onClick" id="forgot-pass" v-if="task === 'login'">Forgot Password</p>
          <radio-comp 
          v-if="task === 'register'"
          :question="'What is your profession?'"/>
          <p v-if="getError">{{getError}}</p>
          <submit v-if="fieldsChange" :value="submitText"/>
      </form>
    </div>
</template>
<script>
import inputLabel from './input-label.vue';
import radioComp from './radio-comp.vue'
import submit from './submit.vue';
export default {
  components: { inputLabel, submit, radioComp },
  emits: ['submit'],
  props: ['fields', 'submitText', 'task', 'label'],
  computed: {
    getError() {
      return this.$store.state.error;
    },
    fieldsChange() {
        if (this.$route.name !== 'home-id') {
          return true;
        } else {
            let oldUser = JSON.stringify(Object.values(this.$auth.user).slice(0, 4));
            let newUser = JSON.stringify(Object.values(this.$store.state.newRegisterFields.map(elem=>elem.value)));
            return oldUser !== newUser && newUser !== '["","",""]';
        }
    }
  },

  methods: {
    onClick() {
      this.$router.push('forgotpass');
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #form-container {
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: rgb(71, 55, 55);
    opacity: 0.8;
    padding: 4.5% 0;
    border-radius: 5%;
  }

  p {
    color: red;
    font-size: 1.5vw;
    margin-bottom: 1%;
    font-weight: bold;
  }

  #forgot-pass {
    font-weight: bold;
    color: rgb(0, 0, 126);
    text-decoration: underline;
    cursor: pointer;
  }

  #forgot-pass:hover {
    color: rgb(2, 2, 204);
  }

</style>