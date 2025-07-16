import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1siwGA84xmb3yU5AWGff51zkwyscfY-Y",
  authDomain: "cv-webapp-45ace.firebaseapp.com",
  projectId: "cv-webapp-45ace",
  storageBucket: "cv-webapp-45ace.appspot.com",
  messagingSenderId: "753143702937",
  appId: "1:753143702937:web:a3ed8f161baa472f325f08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);