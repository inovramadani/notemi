// Initialize Firebase
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAUoBF_qd6EU9uxq5psMva_eKlwZQEZzmI",
  authDomain: "notemi-f3384.firebaseapp.com",
  databaseURL: "https://notemi-f3384.firebaseio.com",
  projectId: "notemi-f3384",
  storageBucket: "notemi-f3384.appspot.com",
  messagingSenderId: "702277859280"
}
const settings = {timestampsInSnapshots: true}

firebase.initializeApp(config)
firebase.firestore().settings(settings)

export const db = firebase.firestore().collection('notes')
export const docName = 'user1'
export default firebase