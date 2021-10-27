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
    // app.$toast.show(`Hey! I'm here`);
    getFcmToken(registration).then(
      registerMessage(app, router, store)
    )
  })
  .catch((err) => {
    console.log(err);
  });
} else{
  console.log('service workers are not supported.');
}