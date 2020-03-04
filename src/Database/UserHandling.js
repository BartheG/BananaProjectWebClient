const firebase = require('firebase');
require('firebase/auth');

const firebaseConfig = require('./fbconf.js').firebaseConfig

firebase.initializeApp(firebaseConfig);

//User connection handled with Firebase.

class User {
	m_isConnected() {
		var user = firebase.auth().currentUser;
		return (user) ? true : false;
	}

	async m_login(mail,pass) {
		return firebase
			.auth()
			.signInWithEmailAndPassword(
				mail,
				pass
			).then((_) => {
				return true;
			})
			.catch((err) => {
				var errCode = err.code;
				var errMsg = err.message;
				console.log(errCode,' ',errMsg);
				return false;
			});
	}

	async m_SignOut() {
		return firebase.auth().signOut()
	}
}

module.exports.User = User;