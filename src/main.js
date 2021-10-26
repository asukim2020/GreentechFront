import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { onMessage } from "firebase/messaging";
import { getFcmMessaging } from './fcm/firebase'

const app = createApp(App)

app.config.globalProperties.$messaging = getFcmMessaging()

onMessage(getFcmMessaging(), (payload) => {
   console.log('Message received. ', payload);
    const title = 'Title';
    const options = {
        body: payload.data.message,
        icon: '/firebase-logo.png',
    };
    const notification = new Notification(title, options);
    return notification;
});


app.use(router).use(store).mount('#app')
