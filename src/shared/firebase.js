import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2SpWMbAG49ixBiqW1Jx2CWBfuB_mGoOA",
  authDomain: "authex-17c4f.firebaseapp.com",
  projectId: "authex-17c4f",
  storageBucket: "authex-17c4f.appspot.com",
  messagingSenderId: "1043787276869",
  appId: "1:1043787276869:web:a5042856181e882fed392c",
  measurementId: "G-96ZXJPR3H7",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;
