//can remove this later
/*if(localStorage.getItem('dexata_watchlist'))
{
	localStorage.setItem('watchlist', localStorage.getItem('dexata_watchlist'));
	localStorage.setItem('ignorelist', localStorage.getItem('dexata_ignorelist'));
	localStorage.removeItem('dexata_watchlist');
	localStorage.removeItem('dexata_ignorelist');
}*/

if(localStorage.getItem('refresh_sec'))
{
	localStorage.setItem('guest-refresh_sec', localStorage.getItem('refresh_sec'));
	localStorage.removeItem('refresh_sec');
}
if(localStorage.getItem('bsc_address'))
	localStorage.removeItem('bsc_address');
if(localStorage.getItem('bscscan_api_key'))
	localStorage.removeItem('bscscan_api_key');
if(localStorage.getItem('covalenthq_api_key'))
	localStorage.removeItem('covalenthq_api_key');
if(localStorage.getItem('watchlist'))
{
	localStorage.setItem('guest-watchlists', "\nmain");
	localStorage.setItem('guest-watchlist', "main");
	localStorage.setItem('guest-watchlist-main', localStorage.getItem('watchlist'));
	localStorage.removeItem('watchlist');
}

var user = "guest";

if(localStorage.getItem('username'))
	user = localStorage.getItem('username');
else if(sessionStorage.getItem('username'))
	user = sessionStorage.getItem('username');

function fetch_watchlist(name)
{
	if(!localStorage.getItem(user + "-watchlist-" + name))
		localStorage.setItem(user + "-watchlist-" + name, "");
	return localStorage.getItem(user + "-watchlist-" + name).replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}


function fetch_watchlist_str(name)
{
	return localStorage.getItem(user + '-watchlist-' + name).replace(/ /g, "").replace(/;/g, ",").replace(/\n/g,",");
}

function watch(watchlist, name, id)
{
	var index = watchlist.indexOf(id);
	if(index == -1)
	{
		watchlist[watchlist.length] = id;
		save_to_watchlist(watchlist, name);
		alert("added " + id + " to watchlist " + name + " for " + user);
	}
	else
		alert("already watching " + id);
}

function unwatch(watchlist, name, id)
{
	var index = watchlist.indexOf(id);
	if(index != -1)
	{
		watchlist.splice(index, 1);
		save_to_watchlist(watchlist, name);
		alert("removed " + id + " from watchlist " + name + " for " + user);
	}
	else
		alert("not watching " + id);
}

function save_to_watchlist(watchlist, name)
{
	var watchlist_str;

	watchlist.sort();

	if(watchlist.length)
		watchlist_str = watchlist[0];

	for(var i=1; i<watchlist.length; i++)
		watchlist_str += "\n" + watchlist[i];

	localStorage.setItem(user + "-watchlist-" + name, watchlist_str);
}

function fetch_watchlists()
{
	if(!localStorage.getItem(user + "-watchlists"))
		localStorage.setItem(user + "-watchlists", "");

	return localStorage.getItem(user + "-watchlists").replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function save_watchlists(watchlists)
{
	var watchlists_str = "";

	watchlists.sort();

	//if(watchlists.length)
	//	watchlists_str = watchlists[0];

	for(var i=1; i<watchlists.length; i++)
		watchlists_str += "\n" + watchlists[i];

	localStorage.setItem(user + "-watchlists", watchlists_str);
}

function fetch_map(array_var)
{
	var map = {};
	for(var i=0; i<array_var.length; i++)
		map[array_var[i]] = true;
	return map;
}

function add_to_watchlists(name)
{
	var watchlists = fetch_watchlists();

	if(watchlists.indexOf(name) == -1)
	{
		watchlists[watchlists.length] = name;
		save_watchlists(watchlists);
		alert("successfully added " + name + " to watchlists for " + user);
	}
	else
		alert(user + " already has a watchlist called " + name);
}

function remove_from_watchlists(name)
{
	var watchlists = fetch_watchlists();
	var index = watchlists.indexOf(name);

	if(index != -1)
	{
		watchlists.splice(index, 1);
		save_watchlists(watchlists);
		localStorage.removeItem(user + "-watchlist-" + name);
		alert("successfully removed " + name + " from watchlists for " + user)
	}
	else
		alert(user + " has no watchlist called " + name);
}