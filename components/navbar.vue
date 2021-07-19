<template>
    <div id="container">
        <div id="logged-out" v-if="!$auth.loggedIn">
            <link-comp :page="'register'"/>
            <link-comp :page="'login'"/>
        </div>
        <div id="logged-in" v-else>
            <div id="left-side-container">
                <div v-if="this.$route.name !== 'home'">
                    <link-comp :page="'home'"/>
                </div>
                <div id="drop-menus"> 
                    <drop-down
                    v-for="(val, index) in dropDowns"
                    :key="index"
                    :dropDownId="'drop' + index"
                    :dropActivateId="'drop-activate' + index"
                    :field="$auth.user.email" :subFields="dropDowns[index]"/>
                </div>
            </div>
            <p id="logout" @click="$auth.logout()">Log out</p>
        </div>
    </div>
</template>
<script>
import dropDown from './drop-down.vue';
import linkComp from './link-comp.vue';
export default {
  components: { linkComp, dropDown },
  data() {
      return {
          dropDowns: [
              ['Profile']
          ]
      }
  }
}
</script>

<style scoped>
    #container {
        background-color: rgb(46, 45, 45);
        padding: 1%;
        width: 100%;
        margin-top: 0;
        position: sticky;
        z-index: 1;
        top: 0;
    }

    #logged-out {
        display: flex;
        justify-content: flex-end;
    }

    #logged-in {
        display: flex;
        justify-content: space-between;
    }
    
    p {
        font-size: 2vw;
        margin: 0;
        color:rgb(201, 153, 153);
        cursor: pointer;
    }

    p:hover {
        text-decoration: underline;
    }

    #logout {
        cursor: pointer;
    }

    #logout:hover {
        text-decoration: underline;
    }

    #drop-menus {
        display: flex;
    }

    #left-side-container {
        display: flex;
    }
</style>