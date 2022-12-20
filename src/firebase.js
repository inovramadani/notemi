// Initialize Firebase
import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId
}

const settings = {timestampsInSnapshots: true}

firebase.initializeApp(config)
firebase.firestore().settings(settings)

export const db = firebase.firestore().collection('notes')
export const docName = 'user1'
export default firebase