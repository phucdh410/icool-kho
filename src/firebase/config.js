import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyC7TpSmv552I6SxascoQrCADUj3ChbLejA",
  authDomain: "readmailinboxes.firebaseapp.com",
  projectId: "readmailinboxes",
  storageBucket: "readmailinboxes.appspot.com",
  messagingSenderId: "406545441773",
  appId: "1:406545441773:web:04ecb1f260c0ca76a7bde4",
  measurementId: "G-WJ8K6PJT3X",
};

export const app = initializeApp(firebaseConfig);
