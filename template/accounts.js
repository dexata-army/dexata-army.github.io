<script>
	var user = "guest";

	if(localStorage.getItem('username'))
		user = localStorage.getItem('username');
	else if(sessionStorage.getItem('username'))
		user = sessionStorage.getItem('username');

	//alert(user);

	function logout()
	{
		//alert("logged out debug message");
		localStorage.removeItem('no_dexata_tabs');
		localStorage.removeItem('last_load_time');
		localStorage.removeItem('last_seen');
		localStorage.removeItem('username');
		sessionStorage.removeItem('username');
		localStorage.removeItem('password');
		sessionStorage.removeItem('password');
		//location.reload();
	}

	function check_for_logout(username)
	{
		sleep(2000).then(() => { 
			if((!sessionStorate.getItem('username') && !localStorage.getItem('username')) || 
				(sessionStorage.getItem('username') != username && localStorage.getItem('username') != username))
				location.reload();
			else
				check_for_logout(username);
		});
	}

	function update_last_seen()
	{
		localStorage.setItem('last_seen', Math.round((new Date()).getTime() / 1000));
		sleep(2000).then(() => {
			update_last_seen();
		});
	}

	var session_timeout_sec = localStorage.getItem(user + '-session_timeout')*60;

	if(session_timeout_sec != undefined && session_timeout_sec > 0)
	{
		if(sessionStorage.getItem('username') || localStorage.getItem('username'))
		{
			var curr_time = Math.round((new Date()).getTime() / 1000);

			//checks last page load time
			if(localStorage.getItem("last_load_time"))
			{
				if(curr_time - localStorage.getItem("last_load_time") > session_timeout_sec)
				{
					logout();
					location.reload();
				}
				else
					localStorage.setItem("last_load_time", curr_time);
			}
			else
			{
				logout();
				location.reload();
			}
		}
	}

	if(sessionStorage.getItem("username") && !localStorage.getItem("username"))
	{
		var curr_time = Math.round((new Date()).getTime() / 1000);
		if(!localStorage.getItem("last_seen") ||
		     curr_time - localStorage.getItem("last_seen") > 5)
		{
			alert("wtf");
			logout();
			location.reload();
		}
		else
		{
			localStorage.setItem("no_dexata_tabs", 0);
			localStorage.setItem("username", sessionStorage.getItem("username"));
			localStorage.setItem("password", sessionStorage.getItem("password"));
		}
	}
	else if(!sessionStorage.getItem("username") && localStorage.getItem("username"))
	{
		sessionStorage.setItem("username", localStorage.getItem("username"));
		sessionStorage.setItem("password", localStorage.getItem("password"));
	}

	var load_host = window.location.hostname;
	if(localStorage.getItem("username"))
	{
		//updates number of dexata tabs open
		if(localStorage.getItem('no_dexata_tabs') != undefined &&
			localStorage.getItem('no_dexata_tabs') >= 0)
			localStorage.setItem('no_dexata_tabs', parseFloat(localStorage.getItem('no_dexata_tabs'))+1);
		else
			localStorage.setItem('no_dexata_tabs', 1);

		window.addEventListener('beforeunload', function (e) {
			if(localStorage.getItem('no_dexata_tabs'))
			{
			    localStorage.setItem('no_dexata_tabs', parseFloat(localStorage.getItem('no_dexata_tabs'))-1);

			    if(localStorage.getItem('no_dexata_tabs') == 0)
			    {
			    	localStorage.removeItem('no_dexata_tabs');
			    	localStorage.removeItem('username');
			    	localStorage.removeItem('password');
			    }
			}
			else
			{
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('password');
			}
		});

		//reloads page if user has logged out
		$(document).ready(function(){
			check_for_logout(localStorage.getItem('username'));
		});
	}

	window.addEventListener("pageshow", function (event) {
		var historyTraversal = event.persisted || 
		                     ( typeof window.performance != "undefined" && 
		                          window.performance.navigation.type === 2 );
		if(historyTraversal &&
			sessionStorage.getItem('username') &&
			curr_time - localStorage.getItem('last_seen') > 5)
		{
			// Handle page restore.
			window.location.reload();
		}
	});

	window.onbeforeunload = function(){
		if(sessionStorage.getItem('username') || localStorage.getItem('username'))
			localStorage.setItem('last_seen', Math.round((new Date()).getTime() / 1000));
	};

	//updates last seen every 2 seconds
	/*$(document).ready(function(){
		update_last_seen();
	});*/
</script>