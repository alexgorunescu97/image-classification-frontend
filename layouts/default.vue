<template>
    <div>
        <particles-bg type="circle" num="200" :canvas="{height: '180%'}" :bg="true" /> 
        <navbar></navbar>
        <Nuxt/>
    </div>
</template>
<script>
import navbar from '../components/navbar';
import { ParticlesBg } from 'particles-bg-vue';
export default {
    components: { navbar, ParticlesBg }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
</style>