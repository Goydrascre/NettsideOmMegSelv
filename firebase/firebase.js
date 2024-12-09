import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDowTLQuvBOqY387JK18udZJIq2g-ZlZHg",
    authDomain: "groot-swag-clicker.firebaseapp.com",
    projectId: "groot-swag-clicker",
    storageBucket: "groot-swag-clicker.firebasestorage.app",
    messagingSenderId: "860325173475",
    appId: "1:860325173475:web:2e0e0480449454bd5ccdd6",
    measurementId: "G-XCQ3WPHM3C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, limit, getDocs };
