importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyC7TpSmv552I6SxascoQrCADUj3ChbLejA",
  authDomain: "readmailinboxes.firebaseapp.com",
  projectId: "readmailinboxes",
  storageBucket: "readmailinboxes.appspot.com",
  messagingSenderId: "406545441773",
  appId: "1:406545441773:web:04ecb1f260c0ca76a7bde4",
  measurementId: "G-WJ8K6PJT3X",
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
