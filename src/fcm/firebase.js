import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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

async function getFcmToken() {
   const key = 'BNqleNyyhRe8S4lwjudnzQUmoGcZiGfZi8v9CBNZFnqgKXLWknq8Vpf__2KvIOSGIUOY3UgUlJOmztE1F85NYkU'
   const response = await getToken(messaging, {vapidKey: key})
   console.log(response);
   return response
}

export {
   getFcmMessaging,
   getFcmToken
}