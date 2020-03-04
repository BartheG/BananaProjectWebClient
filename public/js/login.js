$().ready(function () {
	loginReq = (m_url,m_data) => {
		$.ajax({
			type:'POST',
			url:m_url,
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(m_data),
			success: (_) => {
				window.location.replace(document.location.origin);
			},
			error: (_,status,err) => {
				console.log('Status:',status,'- Error:',err);
			}
		});
	}

	$('#m-login-form').submit((e) => {
		e.preventDefault();
		var mail = $('#m-mail-field').val();
		var pass = $('#m-pass-field').val();

		if ((mail.length>0) && (pass.length>0))
			loginReq(
				document.location.origin+'/login',
				{
					username:mail,
					password:pass
				}
			)
	});
});