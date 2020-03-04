class RNewProduct {
	constructor( torender,basicelemrender ) {
		this.data = torender;
		this.template = '';
		this.basicelemrender = basicelemrender;
	}

	run() {
		this.template=this.basicelemrender.newelement(
			'row',
			this.basicelemrender.m_col(),
			' <form id="m-new-product-form">'
			+'<input type="text" id="m-name-field" placeholder="Name">'
			+'<input type="text" id="m-bleid-field" placeholder="Bleutooth Beacon ID">'
			+'<input type="number" id="m-price-field" placeholder="Original Price">'
			+'<button type="submit">Validate</button>'
			+'</form>'
		)
		return this.basicelemrender.newelement(
			'container',
			this.basicelemrender.m_col(),
			this.template
		);
	}
}

module.exports.RNewProduct = RNewProduct;