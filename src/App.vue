<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'App',
  setup() {
    const firebaseConfig = {
      apiKey: "AIzaSyCJDWkYMFUpixPpJ3GSy7peR4oujiDDEkg",
      authDomain: "multiscan-852af.firebaseapp.com",
      projectId: "multiscan-852af",
      storageBucket: "multiscan-852af.appspot.com",
      messagingSenderId: "797646985288",
      appId: "1:797646985288:web:018d921b5ee39d4fe9e07d",
      measurementId: "G-F8TVKLC683"
      };

      const app = initializeApp(firebaseConfig);
      // const analytics = getAnalytics(app);
      const messaging = getMessaging(app);
      const key = 'BNqleNyyhRe8S4lwjudnzQUmoGcZiGfZi8v9CBNZFnqgKXLWknq8Vpf__2KvIOSGIUOY3UgUlJOmztE1F85NYkU'

      onMounted(() => {
        getToken(messaging, { vapidKey: key })
        .then((currentToken) => {
          if (currentToken) {
              console.log(currentToken);
              // Send the token to your server and update the UI if necessary
              // ...
          } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
