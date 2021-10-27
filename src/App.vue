<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { onMounted } from '@vue/runtime-core';
// import { getFcmToken, registerMessage } from './fcm/firebase'

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      // getFcmToken().then(
      //   registerMessage()
      // )
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
