importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
   apiKey: "AIzaSyCJDWkYMFUpixPpJ3GSy7peR4oujiDDEkg",
   authDomain: "multiscan-852af.firebaseapp.com",
   projectId: "multiscan-852af",
   storageBucket: "multiscan-852af.appspot.com",
   messagingSenderId: "797646985288",
   appId: "1:797646985288:web:018d921b5ee39d4fe9e07d",
   measurementId: "G-F8TVKLC683"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/img/icons/android-chrome-192x192.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
