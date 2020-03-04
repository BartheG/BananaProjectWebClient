//Find in the database every beacons and their associated informations.

class ParseBle {
	async run(idtofind,data,equivdiscountdata) {
		var export_data = {}
		for (var it_idtofind = 0; it_idtofind<idtofind.length; it_idtofind++) {
			for (var it = 0; it < data.length; it++) {
				if (idtofind[it_idtofind] == data[it][1].ble) {
					var t_classi = data[it][1].classification;
					for (var it_equiv = 0; it_equiv < equivdiscountdata.length; it_equiv++) {
						if ( t_classi == equivdiscountdata[it_equiv][1].classification ) {
							export_data[idtofind[it_idtofind]] = {
								"discount":equivdiscountdata[it_equiv][1].discount,
								"name":data[it][1].name,
								"price":data[it][1].price };
						}
					}
				}
			}
		}
		return export_data
	}
}

module.exports.ParseBle = ParseBle;