import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjQMd1N7Mw7LkKCCAml3jed4T1v5t5ODQ",
  authDomain: "mentorsharthi.firebaseapp.com",
  projectId: "mentorsharthi",
  storageBucket: "mentorsharthi.firebasestorage.app",
  messagingSenderId: "614372685983",
  appId: "1:614372685983:web:7156459936fbb30e4a0aaa",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
