import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getFcmToken, registerMessage } from './fcm/firebase'
import Toaster from "@meforma/vue-toaster";
import './registerServiceWorker'

const app = createApp(App)
app.use(Toaster, {
  position: "bottom",
});
app.config.productionTip = false;
app.use(router).use(store).mount('#app')

if ('serviceWorker' in navigator){
  navigator.serviceWorker
  .register("firebase-messaging-sw.js", {
    scope: "firebase-cloud-messaging-push-scope",
  })
  .then((registration) => {
    registration
    // app.$toast.show(`Hey! I'm here`);
    Notification.requestPermission()
    .then((permission) => {
      console.log('permission ', permission)
      if (permission !== 'granted') {
        // alert('알림을 허용해주세요')
      } else {
        getFcmToken(registration).then(response =>
          registerMessage(response, app, router, store)
        )
      }
    })
  })
  .catch((err) => {
    console.log(err);
  });
} else{
  console.log('service workers are not supported.');
}