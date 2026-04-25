import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDP74CtnayXDcp9613I4LmXhO34-hhYzY8',
  authDomain: 'full-stack-team-project.firebaseapp.com',
  projectId: 'full-stack-team-project',
  storageBucket: 'full-stack-team-project.appspot.com',
  messagingSenderId: '713764981443',
  appId: '1:713764981443:web:2eb338ac422595361b7076',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
