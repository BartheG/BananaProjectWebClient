class DMRender {
	constructor(torender,basicelemrender) {
		this.data = torender
		this.basicelemrender = basicelemrender;
		this.template = '';
	}

	discountselection(name,i_val,baseval) {
		var opt=''
		for (var i = 0; i < 100; i+=10) {
			if (baseval == i) {
				opt+='<option selected value="'+i+'">'+i+'%</option>'
			} else {
				opt+='<option value="'+i+'">'+i+'%</option>'
			}
		}
		return '<label for='+i_val+'>Classification: '+name+'</label><select id="'+i_val+'">'+opt+'</select>';
	}

	run() {
		for (var i = 0; i < this.data.length; i++) {
			this.template+=this.basicelemrender.newelement(
				'row',
				this.basicelemrender.m_col(),
				this.discountselection(
					this.data[i][1].classification,
					this.data[i][0].id,
					this.data[i][1].discount
				)
			)
		}
		return this.basicelemrender.newelement(
			'container',
			this.basicelemrender.m_col(),
			this.template,
			'discountchanges'
		)
	}
}

module.exports.DMRender = DMRender;