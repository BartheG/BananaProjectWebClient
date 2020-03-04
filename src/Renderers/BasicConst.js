class BasicElemConst {
	m_col(lg=12,sm=12,xs=12) {
		return 'col-lg-'+lg.toString()
		+' col-sm-'+sm.toString()
		+' col-xs-'+xs.toString();
	}

	newelement(type,classdata,data='',id='') {
		return '<div id=\''+id+'\' class=\''+type+' '+classdata+'\'>'+data+'</div>';
	}
}

module.exports.BasicElemConst = BasicElemConst