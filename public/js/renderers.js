$().ready(function () {
	updateContent = (m_url,m_data) => {
		$.ajax({
			type:'POST',
			url:m_url,
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(m_data),
			success: (_) => {
				console.log('Success!');
			},
			error: (_,status,err) => {
				console.log('Status:',status,'- Error:',err);
			}
		});
	}

	postReq = (m_url,m_data) => {
		$.ajax({
			type:'POST',
			url:m_url,
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(m_data),
			success: (_) => {
				console.log('Success!')
			},
			error: (_,status,err) => {
				console.log('Status:',status,'- Error:',err);
			}
		});
	}

	if ($('#discountchanges').length) {
		var opt = $('#discountchanges select');
		opt.change((e) => {
			updateContent(
				document.location.origin+'/manage/update',
				{
					"id_tochange":e.target.id,
					"discount":parseInt(e.target.value)
				}
			)
		});
	}

	$('body').on('click','[id^="delete_"]', (e) => {
		var id = e.target.id
		var id_db = id.split('_')[1];
		var m_confirm = confirm('Do you really want to delete this??');

		if (m_confirm) {
			updateContent(
				document.location.origin+'/products/delete',
				{
					"id_todelete":id_db
				}
			);
			$('#main_'+id_db).hide(500);
		}
	});

	$('body').on('click','[id^="update_"]', (e) => {
		var id = e.target.id
		var id_db = id.split('_')[1];

		var v_price = $('#price_'+id_db).val();
		var v_name = $('#name_'+id_db).val();

		updateContent(
			document.location.origin+'/products/update',
			{
				"id_tochange":id_db,
				"name":v_name,
				"price": parseInt(v_price)
			}
		)
	});

	$('#m-new-product-form').submit((e) => {
		e.preventDefault();
		var bleid = $('#m-bleid-field').val();
		var name = $('#m-name-field').val();
		var price = $('#m-price-field').val();

		if ((bleid.length>0) && (name.length>0) && (price.length>0)) {
			postReq(
				document.location.origin+'/newproduct/add',
				{
					bleid:bleid,
					name:name,
					price:parseInt(price)
				}
			)
		}
	})
});