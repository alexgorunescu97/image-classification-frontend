<template>
    <div id="container">
        <div id="info-container">
            <p>{{`You have visited this site ${entries === 1 ? 'once' : `${entries} times`}.`}}</p>
            <form-comp
                id="form-container"
                :fields="getFields"
                :submitText="'Save'"
                :task="'newRegister'"
                :label="true"
                @submit="onSubmit"
            />
        </div>
        <div id="btn-container">
            <button id="btn1" @click="dispatchDelete">Delete</button>
            <button id="btn2" @click="changePass">Change Password</button>
        </div>
    </div>
</template>

<script>
import infoUser from '../../components/info-user.vue'
export default {
    data() {
        return {
            entries: this.$auth.user.entries
        }
    },
    components: { infoUser },
    computed: {
        getFields() {
            return this.$store.state.newRegisterFields;
        }
    },
    methods: {
        async dispatchDelete() {
            if (confirm('Are you sure?')) {
                await this.$store.dispatch('delete');
            }
        },

        changePass() {
            this.$router.push('changepass')
        },

        async onSubmit() {
            await this.$store.dispatch('updateUser');
        }
    },
    mounted() {
        this.$store.commit('resetNewRegisterState');
    },
}
</script>

<style scoped>

 #container {
    width: 50%;
    margin: 5% auto;
    background-color: rgb(71, 55, 55);
    opacity: 0.8;
    padding: 4.5% 0;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #info-container {
      width: 100%;
  }

  button {
      font-size: 2vw;
      margin-top: 4%;
      cursor: pointer;
      color: white;
      border-style: none;
      padding: 1%;
      border-radius: 5%;
  }

  #btn-container {
      display: flex;
      justify-content: center;
      width: 100%;
  }

  #btn1 {
      background-color: rgb(177, 0, 0);
      margin-right: 2.5%;
  }

  #btn2 {
      background-color: rgb(15, 190, 15);
      margin-left: 2.5%;
  }

  #form-container {
      width: 80% !important;
  }

  p {
      font-size: 2vw;
      font-weight: bold;
      color: white;
      text-align: center;
      margin-bottom: 0;
  }
</style>