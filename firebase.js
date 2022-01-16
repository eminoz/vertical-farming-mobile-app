import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAQmgOxk5KSIP2Ropxe1LlgO6eUn4ytmms",
  authDomain: "vertical-farming-dfd58.firebaseapp.com",
  databaseURL: "https://vertical-farming-dfd58-default-rtdb.firebaseio.com",
  projectId: "vertical-farming-dfd58",
  storageBucket: "vertical-farming-dfd58.appspot.com",
  messagingSenderId: "623365384217",
  appId: "1:623365384217:web:219c8ead7a5f68dac82288",
};

const app = initializeApp(firebaseConfig);
export { app };

