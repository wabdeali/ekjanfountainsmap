  import firebase from 'firebase'
  import 'firebase/storage'
  import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCqvVmcSo4aeHQEvBe65F4TwfrUhCpGy9k",
    authDomain: "ekjanfountains-map.firebaseapp.com",
    databaseURL: "https://ekjanfountains-map.firebaseio.com",
    projectId: "ekjanfountains-map",
    storageBucket: "ekjanfountains-map.appspot.com",
    messagingSenderId: "289965747765",
    appId: "1:289965747765:web:7863401b8519253012cb7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();

  export { db, storage }

