import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBKFlNk8EI_7gEVcpgXZsVMnPFBgiODp_0",
  authDomain: "nscf-012.firebaseapp.com",
  databaseURL: "https://nscf-012-default-rtdb.firebaseio.com",
  projectId: "nscf-012",
  storageBucket: "nscf-012.appspot.com",
  messagingSenderId: "949522278527",
  appId: "1:949522278527:web:a68f1c3a68739c1086774a",
  measurementId: "G-XCDL8K61WK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)