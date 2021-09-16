// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD2iJ8_xtRMwegAr_aft_2OKloHuniRee8',
	authDomain: 'ecommerce-demo-40371.firebaseapp.com',
	projectId: 'ecommerce-demo-40371',
	storageBucket: 'ecommerce-demo-40371.appspot.com',
	messagingSenderId: '71906522629',
	appId: '1:71906522629:web:d0a4cb8588179a1aeb0e6c',
};

// Initialize Firebase
// if (!firebase.app.length) {
firebase.initializeApp(firebaseConfig);
// }
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
