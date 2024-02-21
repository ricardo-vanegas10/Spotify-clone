// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AAIzaSyC35SSvuJrOKZvczTH1ui7q0sK20Sc04fI',
  authDomain: 'spotify-clon2.firebaseapp.com',
  projectId: 'spotify-clon2',
  storageBucket: 'spotify-clon2.appspot.com',
  messagingSenderId: '470646101226',
  appId: '1:470646101226:web:4901ee48157fe7261ab393',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new FacebookAuthProvider();

export { auth, provider };
