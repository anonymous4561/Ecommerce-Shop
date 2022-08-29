// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9pOwG8m4_MgLH-EwNgLryqtgi7fyB4fw",
  authDomain: "shara-collection.firebaseapp.com",
  projectId: "shara-collection",
  storageBucket: "shara-collection.appspot.com",
  messagingSenderId: "872398348057",
  appId: "1:872398348057:web:c7ee466ce9c386ebfcaf88",
  measurementId: "G-TXQV9W5N0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;     