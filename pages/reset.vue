<template>
    <form-comp 
    :fields="getFields" 
    @submit="onSubmit" 
    :submitText="'Submit'"
    :task="'forgotPass'"
    :label="true"/>
</template>

<script>
import formComp from '../components/form-comp.vue';
export default {
    auth: false,
    components: {formComp},
    computed: {
        getFields() {
            return this.$store.state.forgotPassFields;
        }
    },
    methods: {
        async onSubmit() {
           await this.$store.dispatch('forgotPass', {
               token: this.$route.query['amp;token'],
               uid: this.$route.query['uid']
           })
           this.$router.push('/login'); 
        }
    },

    mounted() {
        console.log(this.$route.query)
    },

    destroyed() {
        this.$store.commit('changeError', '');
        this.$store.commit('resetForgotPassState');
    },
    
}
</script>