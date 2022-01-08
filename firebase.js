// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQmgOxk5KSIP2Ropxe1LlgO6eUn4ytmms",
  authDomain: "vertical-farming-dfd58.firebaseapp.com",
  projectId: "vertical-farming-dfd58",
  storageBucket: "vertical-farming-dfd58.appspot.com",
  messagingSenderId: "623365384217",
  appId: "1:623365384217:web:219c8ead7a5f68dac82288",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
