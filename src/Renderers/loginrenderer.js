class RLogin {
	constructor( torender,basicelemrender ) {
		this.data = torender;
		this.template = '';
		this.basicelemrender = basicelemrender;
	}

	run() {
		this.template=this.basicelemrender.newelement(
			'row',
			this.basicelemrender.m_col(),
			' <form id="m-login-form">'
			+'<input type="email" id="m-mail-field" placeholder="Email Address">'
			+'<input type="password" id="m-pass-field" placeholder="Password">'
			+'<button type="submit">Validate</button>'
			+'</form> '
		)
		return this.basicelemrender.newelement(
			'container',
			this.basicelemrender.m_col(),
			this.template
		);
	}
}

module.exports.RLogin = RLogin;