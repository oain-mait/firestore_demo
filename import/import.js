// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    // console.log('Initialzing Firebase');
    // await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);

    console.log('Initializing Firebase');
    var admin = require("firebase-admin");
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL
    });


    console.log('Firebase Initialized');

    await firestoreService.restore('./show_data.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();