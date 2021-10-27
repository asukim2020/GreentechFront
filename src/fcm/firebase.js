import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
   apiKey: "AIzaSyCJDWkYMFUpixPpJ3GSy7peR4oujiDDEkg",
   authDomain: "multiscan-852af.firebaseapp.com",
   projectId: "multiscan-852af",
   storageBucket: "multiscan-852af.appspot.com",
   messagingSenderId: "797646985288",
   appId: "1:797646985288:web:018d921b5ee39d4fe9e07d",
   measurementId: "G-F8TVKLC683"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

const getFcmMessaging = () => {
   return messaging
}

// async function getFcmToken() {
//    const key = 'BNqleNyyhRe8S4lwjudnzQUmoGcZiGfZi8v9CBNZFnqgKXLWknq8Vpf__2KvIOSGIUOY3UgUlJOmztE1F85NYkU'
//    const response = await getToken(messaging, {vapidKey: key})
//    console.log(response);
//    return response
// }

async function getFcmToken(registration) {
   const key = 'BNqleNyyhRe8S4lwjudnzQUmoGcZiGfZi8v9CBNZFnqgKXLWknq8Vpf__2KvIOSGIUOY3UgUlJOmztE1F85NYkU'
   const response = await getToken(messaging, {vapidKey: key}, registration)
   console.log(response);
   return response
}

function registerMessage(app) {
   onMessage(getFcmMessaging(), (payload) => {
      app.$toast.show(payload.data.message);
      // console.log('Message received. ', payload);
      // const title = 'Title';
      // const options = {
      //    body: payload.data.message,
      //    icon: '/img/icons/android-chrome-192x192.png',
      // };
      // const notification = new Notification(title, options);
      // return notification;
   });
}

export {
   getFcmMessaging,
   getFcmToken,
   registerMessage
}