class ManageReq {
	parse(data,idfieldname) {
		delete data[idfieldname];
		var m_key = []
		var m_data = []
		for (var it in data) {
			m_key.push(it);
			m_data.push(data[it])
		}
		return [ m_key,m_data ];
	}
}

module.exports.MReq = ManageReq;