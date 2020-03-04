const ldatarender = require('./ldatarender');
const dmrender = require('./discountmanagerender');
const stockm = require('./stockadminmanage');
const logrender = require('./loginrenderer');
const nprod = require('./NewProduct');

const BasicConstR = require('./BasicConst');

class GlobalRenderer {
	constructor() {
		this.equiv={
			'ldata':ldatarender.LDataRender,
			'discmanage':dmrender.DMRender,
			'prodmanage':stockm.SAManage,
			'login':logrender.RLogin,
			'nproduct':nprod.RNewProduct
		};
		this.constr = new BasicConstR.BasicElemConst();
	}

	run(state,torender) {
		if (!(state in this.equiv)) {
			//Faire page 404 et Render la page 404;;
			return '<p>Error: Rendering page...</p>';
		}
		var renderer = new this.equiv[ state ](torender,this.constr);
		return renderer.run();
	}
}

module.exports.GlobalRenderer = GlobalRenderer;