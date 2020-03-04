const admin = require('firebase-admin');

let serviceAcc = require('./iotbanana.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAcc)
});

//Communication with database wrapped in one class
//Every method is an action inside the database (update, get, delete, ...)

class DatabaseOperations {
	constructor() {
		this.db = admin.firestore();
	}

	async reader(path) {
		const snap = await this.db.collection(path).get();
		return snap.docs.map( doc => [{"id":doc.id},doc.data()] );
	}

	updater(where,m_id,toup,towrite) {
		if (towrite.length!=toup.length)
			return;
		var data = {}

		for (var i = 0; i < towrite.length; i++) {
			if (isNaN(towrite[i]))
				continue
			data[toup[i]]=towrite[i]
		}
		this.db.collection(where).doc(m_id).update(data);
	}

	deleter(where,m_id) {
		this.db.collection(where).doc(m_id).delete();
	}

	m_new(where,data) {
		if (data.date == null) {
			data.date = admin.firestore.Timestamp.fromDate(new Date())
		}
		this.db.collection(where).doc().set(data)
	}
};

module.exports.DatabaseOperations = DatabaseOperations;