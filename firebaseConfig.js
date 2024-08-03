import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDqynEc-6gFHuIOOPpyCQHjKC8Dpf2SM9s",
    authDomain: "mystory-4a64a.firebaseapp.com",
    projectId: "mystory-4a64a",
    storageBucket: "mystory-4a64a.appspot.com",
    messagingSenderId: "416274674157",
    appId: "1:416274674157:web:a2b9590b529e27f809f7e4",
    measurementId: "G-8RFH08QMSW"
};

// Check if Firebase app is already initialized
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = getAuth(app) || initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Get Firestore and Storage instances
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
