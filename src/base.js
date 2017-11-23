import Rebase from 're-base';
import Firebase from 'firebase';
import database from 'firebase/database';

const app = Firebase.initializeApp({
  apiKey: "AIzaSyDG9CyWAN8s_BpIKFmyqGYpSmMdc8lS6CA",
  authDomain: "votepls-20001.firebaseapp.com",
  databaseURL: "https://votepls-20001.firebaseio.com",
  messagingSenderId: "232346185001"
});
const db = Firebase.database(app);
const base = Rebase.createClass(db);
// const rebase = Rebase.createClass(app.database());


// let isSigned = false;

// rebase.auth().onAuthStateChanged(function(user) {
//   if(user) isSigned = true;
//   else isSigned = false;
// });

// const base = {
//   isUserSignedIn: () => Promise.resolve(isSigned),
//   signInAnonymously: () => rebase.auth().signInAnonymously(),
//   fetch: (id, context) => rebase.fetch(`${id}`, { context: context }),
//   post: (id, data) => rebase.post(`${id}`, {data}),
//   update: (id, data) => rebase.update(`${id}`, {data}),
//   listenTo: (id, context, callbackFct) => rebase.listenTo(`${id}`, { context: context, then(data){callbackFct(data)}}),
// };

export default base;
