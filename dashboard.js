import { auth } from './firebase-config.js';
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('user-info').textContent = `Logged in as ${user.email}`;
  }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});

// Connect button
document.getElementById('connect-btn').addEventListener('click', () => {
  window.open('https://stream.jetty373.dev', '_blank'); // Replace with your Cloudflare tunnel domain
});
