<template>
    <div class="drop-down-container">
        <p :id="dropActivateId" @click="toggleClass">{{field}}</p>
        <div :id="dropDownId" :class="'drop-down'">
            <nuxt-link
                :to="`/home/${$auth.user.id}`"
                class="link"
                v-for="(subField, index) in subFields"
                :key="index"
            >{{subField}}</nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
  props: ['field', 'subFields', 'dropDownId', 'dropActivateId'],
  methods: {
      toggleClass(event) {
          const elem = document.getElementById(this.dropDownId);
          elem.classList.toggle('show');
      },

      listener(event) {   
          if (!event.target.matches('#' + this.dropActivateId)) {
              const elem = document.getElementById(this.dropDownId);
              if (elem.classList.contains('show')) {
                  elem.classList.remove('show');
              }
          }         
      }
  },

  mounted() {
    window.addEventListener('click', this.listener);
  },

  destroyed() {
      window.removeEventListener('click', this.listener)
  }
    
}
</script>

<style scoped>

    p, .link {
        font-size: 2vw;
        margin: 0;
        color:rgb(201, 153, 153);
        cursor: pointer;
        text-decoration: none;
    }

    p:hover, .link:hover {
        text-decoration: underline;
    }

    .drop-down-container {
        position: relative;
        padding: 0 10%;
    }

    .drop-down {
        display: none;
        position: absolute;
        min-width: 160px;
        background-color: rgb(46, 45, 45);
        text-align: center;
        z-index: 1;
        border-radius: 5%;
    }

    .drop-down .link {
        padding: 5%;
        display: block;
    }

    .show {
        display: block;
    }
</style>