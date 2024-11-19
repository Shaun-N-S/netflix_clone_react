import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAZNIKUMR67jb7h1bcgWQ0p01cPh0_G9AM",
  authDomain: "netflix-clone-80804.firebaseapp.com",
  projectId: "netflix-clone-80804",
  storageBucket: "netflix-clone-80804.firebasestorage.app",
  messagingSenderId: "581858387700",
  appId: "1:581858387700:web:331cbad5424538faf960a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password );
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};