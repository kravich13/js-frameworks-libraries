// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA0p8DXBRtaEL1ilQA9e0iaBN1wGARC7JU',
  authDomain: 'kravich-auth.firebaseapp.com',
  projectId: 'kravich-auth',
  storageBucket: 'kravich-auth.appspot.com',
  messagingSenderId: '884283500966',
  appId: '1:884283500966:web:7ceeb3d1d4a802aa1ec767',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// IOS 0Auth ID 884283500966-v4d33p5p5k0u7nlb49066tv30s7po40t.apps.googleusercontent.com

// Android 0Auth ID 884283500966-50a5fbq2eqcpmpmrg4d26i85eadvvvc9.apps.googleusercontent.com
