class SAManage {
	constructor(torender,basicelemrender) {
		this.data = torender;
		this.basicelemrender = basicelemrender;
		this.template = '';

	}

	option(m_id) {
		return this.basicelemrender.newelement(
			'',
			this.basicelemrender.m_col(),
			'<button id="update_'+m_id+'">Update</button>',
		)+this.basicelemrender.newelement(
			'',
			this.basicelemrender.m_col(),
			'<button id="delete_'+m_id+'">Delete</button>',
		)
	}

	run() {
		for (var it = 0; it < this.data.length; it++) {
			if (this.data[it][1].classification == -1)
				continue;
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
					'Number: '+it,
					''
				)+this.basicelemrender.newelement(
					'',
					this.basicelemrender.m_col(),
					'Date: '+ this.data[it][1].date.toDate(),
					''
				)+this.basicelemrender.newelement(
					'',
					this.basicelemrender.m_col(),
					'Name: <input type="text" id="name_'
						+this.data[it][0].id+'" value="'
						+this.data[it][1].name
						+'"/>',
					''
				)+this.basicelemrender.newelement(
					'',
					this.basicelemrender.m_col(),
					'Price: <input type="number" id="price_'
						+this.data[it][0].id+'" value="'
						+this.data[it][1].price
						+'"/>',
					''
				)+this.option(this.data[it][0].id),
				'main_'+this.data[it][0].id
			);
		}
		return this.basicelemrender.newelement(
			'container',
			this.basicelemrender.m_col(),
			this.template
		)
	}
}

module.exports.SAManage = SAManage;