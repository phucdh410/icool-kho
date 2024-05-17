importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCxOfSd4CVLqRqa-VWf44eU2dtBNtSVrCc",
  authDomain: "test-d40fb.firebaseapp.com",
  projectId: "test-d40fb",
  storageBucket: "test-d40fb.appspot.com",
  messagingSenderId: "313013510186",
  appId: "1:313013510186:web:125e035c5a0fa1024f2353",
  measurementId: "G-VMZP9X5YY3",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
