import firebase from '@firebase/app';

import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCy6gePCn95u8zMOLT4UTORjrHDvhRrO2g',
	authDomain: 'chat-49c1d.firebaseapp.com',
	databaseURL: 'https://chat-49c1d.firebaseio.com',
	projectId: 'chat-49c1d',
	storageBucket: 'chat-49c1d.appspot.com',
	messagingSenderId: '689541832725',
	appId: '1:689541832725:web:a747e231a0e0f9998e2e1c',
	measurementId: 'G-H8CSC7SKMV',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// const provider = new firebase.auth.GoogleAuthProvider();

// export {  provider };
export { db, auth, timestamp };
