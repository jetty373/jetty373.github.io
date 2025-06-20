// db.js - Firebase setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDV0BajS19_2QlTP7V7NlMdSYUeYBVsXNQ",
  authDomain: "jetty373auth.firebaseapp.com",
  databaseURL: "https://jetty373auth-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jetty373auth",
  storageBucket: "jetty373auth.firebasestorage.app",
  messagingSenderId: "328185729230",
  appId: "1:328185729230:web:ddf10eb9fe7bf20a83c09f",
  measurementId: "G-G6MTXSB8J0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
