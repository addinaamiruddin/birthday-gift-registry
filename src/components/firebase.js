import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBqjK2q5I6I5WISuB_4dsYVGAQMGoU6uds",
  authDomain: "crud-bday-registry.firebaseapp.com",
  databaseURL: "https://crud-bday-registry-default-rtdb.firebaseio.com",
  projectId: "crud-bday-registry",
  storageBucket: "crud-bday-registry.appspot.com",
  messagingSenderId: "679739584797",
  appId: "1:679739584797:web:f74b22ef14f09b1008b1f4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
