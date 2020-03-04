$().ready(function () {
	loadContent = (m_url) => {
		$.ajax({
			type:'GET',
			url:m_url,
			beforeSend: () => {
				$('#index-loadinganim').show();
			},
			success: (data) => {
				$('body').append(data);
			},
			error: (_,status,err) => {
				console.log('Status:',status,'- Error:',err);
			},
			complete: () => {
				$('#index-loadinganim').hide();
			}
		});
	}

	var title = document.title.toLocaleLowerCase().replace(/\s+/g, '');
	if ($('.navbar #'+title).length) {
		$('.navbar #'+title).addClass('active')
		if ($('#index-loadinganim').length) {
			loadContent(document.URL+'/load');
		}
	}
});