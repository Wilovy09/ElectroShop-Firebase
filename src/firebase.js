// importamos get auth de firebase
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADaIPFoCSfk8K2kdZ1cXQX0CuzNvw4wvU",
  authDomain: "electroshop-1be54.firebaseapp.com",
  projectId: "electroshop-1be54",
  storageBucket: "electroshop-1be54.appspot.com",
  messagingSenderId: "890976254986",
  appId: "1:890976254986:web:770a4b02f56a51369fb3f3",
};

const app = initializeApp(firebaseConfig);
// exportar el getauth con una instancia de app
export const auth = getAuth(app);
