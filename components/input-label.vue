<template>
    <div id="input-label">
        <label v-if="label" :for="name"> {{name}} </label>
        <input :type="type" :name="name" v-model="getValue" :placeholder="placeholder" required/>
    </div>
</template>

<script>
export default {
  props: ['name', 'type', 'index', 'task', 'placeholder', 'label'],
  computed: {
      getValue: {
          get() {
              return this.$store.state[this.task + "Fields"][this.index].value;
          },

          set(value) {
              let mutation = "change" + this.task[0].toUpperCase() + this.task.substring(1) + "Field";
              this.$store.commit(mutation, {value, index: this.index});
          }        
      },
  }
    
}
</script>

<style scoped>
    #input-label {
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin-bottom: 2%;
        font-size: 2vw;
        color: white;
    }

    input {
        width: 70%;
        border-style: none;
        border-bottom-style: solid;
        border-bottom-color: white;
        color: white;
        font-size: 2vw;
        background-color: inherit;
    }

    input:focus {
        outline: none;
    }

    input:-internal-autofill-selected {
        background-color: rgb(71, 55, 55) !important;
    }

    input::placeholder {
        color: white;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px rgb(71, 55, 55) inset !important;
        box-shadow: 0 0 0 30px rgb(71, 55, 55) inset;
        -webkit-text-fill-color: white !important;
        caret-color: white;
    }
</style>