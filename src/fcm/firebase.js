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

function registerMessage(app, router, store) {
   onMessage(getFcmMessaging(), (payload) => {
      // app.$toast.show(payload.data.message);
      console.log(payload);
      let path = router.currentRoute._rawValue.matched[0].path
      switch(path) {
         case '/list/:id':
            store.dispatch('dataLogger/actionDataLoggerList', router.currentRoute._rawValue.params.id)
            break
         case '/analyze/:id':
            store.dispatch('measureData/actionMeasureLastData', router.currentRoute._rawValue.params.id)
            break
         case '/graph/:id':
            store.dispatch('measureData/actionMeasureDataList', router.currentRoute._rawValue.params.id)
            break
      }
   });
}

export {
   getFcmMessaging,
   getFcmToken,
   registerMessage
}