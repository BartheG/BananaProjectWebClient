class LDataRender {
	constructor(torender,basicelemrender) {
		this.data = torender;
		this.template = '';
		this.basicelemrender = basicelemrender;
	}

	run() {
		for (var it = 0; it < this.data.length; it++) {
			this.template+=this.basicelemrender.newelement(
				'',
				this.basicelemrender.m_col(4,6,12),
				this.basicelemrender.newelement(
					'',
					this.basicelemrender.m_col(),
					'<img style="width:100%;height:100%;" src="data:image/png;base64,'+this.data[it][1].picture+'">',
					'datadump_'+it+'_pic'
				)+this.basicelemrender.newelement(
					'',
					this.basicelemrender.m_col(),
					this.data[it][1].classification,
					'datadump_'+it+'_classification'
				)
			);
		}
		return this.basicelemrender.newelement(
			'container',
			this.basicelemrender.m_col(),
			this.template
		)
	}
};

module.exports.LDataRender = LDataRender;