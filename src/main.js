import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getFcmToken, registerMessage } from './fcm/firebase'
import './registerServiceWorker'

const app = createApp(App)
app.config.productionTip = false;

if ('serviceWorker' in navigator){
  navigator.serviceWorker
  .register("firebase-messaging-sw.js", {
    scope: "firebase-cloud-messaging-push-scope",
  })
  .then((registration) => {
          getFcmToken(registration).then(
        registerMessage()
      )
  })
  .catch((err) => {
    console.log(err);
  });
} else{
  console.log('service workers are not supported.');
}

app.use(router).use(store).mount('#app')
