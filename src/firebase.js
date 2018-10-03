import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyApcmJlfa9oUaulQoHfKWPBf6xs4VUkEGQ',
  authDomain: 'zwebwriter.firebaseapp.com',
  databaseURL: 'https://zwebwriter.firebaseio.com',
  projectId: 'zwebwriter',
  storageBucket: 'zwebwriter.appspot.com',
  messagingSenderId: '819725404170'
}
firebase.initializeApp(config)
export const db = firebase.database()
export default firebase
