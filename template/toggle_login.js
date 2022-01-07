<script>
	//sets up login/logout menu link
	if(localStorage.getItem("username"))
	{
		document.getElementById('login_menu_item').innerHTML = "<a href='@pathto(logout)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "' class='menu-link'><span class='menu-icon'><i class='fas fa-sign-out-alt fa-1x'></i></span><span class='menu-text'>logout</span></a>";
		document.getElementById('login_header_item').innerHTML = "logout <i class='fas fa-sign-out-alt fa-1x ms-auto text-theme fs-16px my-n1'></i>";
		document.getElementById('login_header_item').href = "@pathto(logout)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
		document.getElementById('login_footer_item').innerHTML = "<a href='@pathto(logout)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "' title='logout'><i class='fas fa-sign-out-alt fa-2x'></i></a>";
	}
	else
	{
		document.getElementById('login_menu_item').innerHTML = "<a href='@pathto(login)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "' class='menu-link'><span class='menu-icon'><i class='fas fa-sign-in-alt fa-1x'></i></span><span class='menu-text'>login</span></a>";
		document.getElementById('login_header_item').innerHTML = "login <i class='fas fa-sign-in-alt fa-1x ms-auto text-theme fs-16px my-n1'></i>";
		document.getElementById('login_header_item').href = "@pathto(login)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
		document.getElementById('login_footer_item').innerHTML = "<a href='@pathto(login)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "' title='login'><i class='fas fa-sign-in-alt fa-2x'></i></a>";
	}

	//prevent autocomplete
	$(':input').on('focus', function () {
		$(this).attr('autocomplete', 'off')
	});
</script>