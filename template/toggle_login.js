<script>
	//changes login to logout on page if logged in
	if(localStorage.getItem("username"))
	{
		//document.getElementById('login_menu_item').innerHTML = "<a onclick='logout()'>logout</a>";
		//document.getElementById('login_footer_item').innerHTML = "<a onclick='logout()' title='logout'><i class='fas fa-sign-out-alt fa-2x'></i></a>";
		document.getElementById('login_menu_item').innerHTML = "<a href='@pathto(logout)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "'>logout</a>"
		document.getElementById('login_footer_item').innerHTML = "<a href='@pathto(logout)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "'><i class='fas fa-sign-out-alt fa-2x'></i></a>"
	}
	else
	{
		document.getElementById('login_menu_item').innerHTML = "<a href='@pathto(login)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "'>login</a>"
		document.getElementById('login_footer_item').innerHTML = "<a href='@pathto(login)?return_to=" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1) + "'><i class='fas fa-sign-in-alt fa-2x'></i></a>"
	}
</script>