import firebase from 'firebase/compat/app';
import'firebase/compat/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBebQVKeX2kb82HFOcceXVAwwX7nbbA48Y",
    authDomain: "chat-port.firebaseapp.com",
    projectId: "chat-port",
    storageBucket: "chat-port.appspot.com",
    messagingSenderId: "77161765636",
    appId: "1:77161765636:web:794aca48442d244716ce51",
    measurementId: "G-R661XCC8V2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(); 

export { storage, firebase as default}