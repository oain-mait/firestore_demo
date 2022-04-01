
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp, startAfter } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "################",
  authDomain: "######",
  projectId: "##",
  storageBucket: "###",
  messagingSenderId: "##",
  appId: "##",
  measurementId: "###"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = collection(db, 'displays');


// Get all data
async function getAllData(db) {
  const tableSnapshot = await getDocs(table);
  const rowList = tableSnapshot.docs.map(doc => doc.data());
  return rowList;
}

async function createPage(db, limitVal, orderVal) {
  const q = query(table, orderBy(orderVAl), limit(limitVal));
  const page = await getDocs(q);

  const display = page.docs.map(doc => doc.data());
  return display;
}


// Get the next row
async function nextPage(db) {
  const first = query(table, orderBy('employee_id'), limit(25));
  const documentSnapshots = await getDocs(first);

  // Get the last document
  const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  // console.log("last", last.data())

  const next = query(table, orderBy('employee_id'), startAfter(last), limit(25));
  const page = await getDocs(next)
  const display = page.docs.map(doc => doc.data());
  return display;
}

// async function Page(db) {
//   const first = query(table, orderBy('employee_id'), limit(25));
//   const documentSnapshots = await getDocs(first);

//   // Get the last document
//   const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
//   console.log("last", last.data())

//   const next = query(table, orderBy('employee_id'), startAfter(last), limit(25));
// }

//query by vaccination status
async function getVaccinated(db) {
  const q = query(table, where("vaccination_status", "==", true),orderBy("employee_id"), limit(25))
  const tableSnapshot = await getDocs(q);
  const rowList = tableSnapshot.docs.map(doc => doc.data());
  return rowList;
}

async function getPositive(db) {
  const q = query(table, where("testing_status", "==", true),orderBy("employee_id"), limit(25))
  const tableSnapshot = await getDocs(q);
  const rowList = tableSnapshot.docs.map(doc => doc.data());
  return rowList;
}


// console.log(getVaccinated(db));



export { app, db, collection, getDocs, Timestamp, addDoc };
export { query, orderBy, limit, where, onSnapshot };
