import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCxOfSd4CVLqRqa-VWf44eU2dtBNtSVrCc",
  authDomain: "test-d40fb.firebaseapp.com",
  projectId: "test-d40fb",
  storageBucket: "test-d40fb.appspot.com",
  messagingSenderId: "313013510186",
  appId: "1:313013510186:web:125e035c5a0fa1024f2353",
  measurementId: "G-VMZP9X5YY3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      return getToken(messaging, {
        vapidKey:
          "BB4RqxfMWd8C1hevOO7feEo8Np6lT45_2AAzlgSGxpJ6AS6-ZbxCMcqfrkZYb5ixckgDm6gWwTr-5BFmUN5aLrA",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
          } else {
            console.log("Failed to generate the app registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
