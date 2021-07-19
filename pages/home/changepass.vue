<template>
    <form-comp 
    :fields="getFields" 
    @submit="onSubmit" 
    :task="'password'"
    :label="true"/>
</template>

<script>
import inputLabel from '../../components/input-label.vue';
export default {
    components: { inputLabel },
    computed: {
        getFields() {
            return this.$store.state.passwordFields;
        }
    },
    methods: {
        async onSubmit() {
            if (confirm('Are you sure?')) {
                await this.$store.dispatch('changePass');
            }
        }
    },
    destroyed() {
        this.$store.commit('changeError', '')
        this.$store.commit('resetPasswordState');
    }
}
</script>