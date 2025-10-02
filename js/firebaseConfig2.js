// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtaYz_AV8mf5H81CS1upnRJZJURtlotI4",
    authDomain: "sitenoticia-a3c3d.firebaseapp.com",
    databaseURL: "https://sitenoticia-a3c3d-default-rtdb.firebaseio.com",
    projectId: "sitenoticia-a3c3d",
    storageBucket: "sitenoticia-a3c3d.firebasestorage.app",
    messagingSenderId: "46442438021",
    appId: "1:46442438021:web:eb23a44e70e36f666ff8ec",
    measurementId: "G-H5MGKQ329J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db }