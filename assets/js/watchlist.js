function fetch_watchlist(username, name)
{
	if(!localStorage.getItem(username + "-watchlist-" + name))
		localStorage.setItem(username + "-watchlist-" + name, "");
	return localStorage.getItem(username + "-watchlist-" + name).replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}


function fetch_watchlist_str(username, name)
{
	if(!localStorage.getItem(username + "-watchlist-" + name))
		localStorage.setItem(username + "-watchlist-" + name, "");
	return localStorage.getItem(username + '-watchlist-' + name).replace(/ /g, "").replace(/;/g, ",").replace(/\n/g,",");
}

function remove_duplicates(x)
{
	return x.filter(function(item, pos) {
	    return x.indexOf(item) == pos;
	})
}

function save_to_watchlist(username, watchlist, name)
{
	var watchlist_str;

	watchlist.sort();

	if(watchlist.length)
		watchlist_str = watchlist[0];

	for(var i=1; i<watchlist.length; i++)
		watchlist_str += "\n" + watchlist[i];

	localStorage.setItem(username + "-watchlist-" + name, watchlist_str);
}

function watch(username, name, id)
{
	var watchlist = fetch_watchlist(username, name);

	var index = watchlist.indexOf(id);
	if(index == -1)
	{
		watchlist[watchlist.length] = id;
		save_to_watchlist(username, watchlist, name);
		alert("added " + id + " to watchlist " + name + " for " + username);
	}
	else
		alert("already watching " + id);
}

function unwatch(username, name, id)
{
	var watchlist = fetch_watchlist(username, name);

	var index = watchlist.indexOf(id);
	if(index != -1)
	{
		watchlist.splice(index, 1);
		save_to_watchlist(username, watchlist, name);
		alert("removed " + id + " from watchlist " + name + " for " + username);
	}
	else
		alert("not watching " + id);
}

function fetch_watchlists(username)
{
	if(!localStorage.getItem(username + "-watchlists"))
		localStorage.setItem(username + "-watchlists", "");

	return localStorage.getItem(username + "-watchlists").replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function fetch_combined_watchlists_str(username)
{
	var watchlists = fetch_watchlists(username);
	var ids = [];

	for(var i=0; i<watchlists.length; i++)
		ids = ids.concat(fetch_watchlist(username, watchlists[i]));

	return remove_duplicates(ids).join(",");
}

function save_watchlists(username, watchlists)
{
	var watchlists_str = "";

	watchlists.sort();

	//if(watchlists.length)
	//	watchlists_str = watchlists[0];

	for(var i=1; i<watchlists.length; i++)
		watchlists_str += "\n" + watchlists[i];

	localStorage.setItem(username + "-watchlists", watchlists_str);
}

function fetch_map(array_var)
{
	var map = {};
	for(var i=0; i<array_var.length; i++)
		map[array_var[i]] = true;
	return map;
}

function add_to_watchlists(username, name)
{
	var watchlists = fetch_watchlists(username);

	if(watchlists.indexOf(name) == -1)
	{
		localStorage.setItem(username + '-watchlist-' + name, "");
		watchlists[watchlists.length] = name;
		save_watchlists(username, watchlists);
		alert("successfully added " + name + " to watchlists for " + username);
	}
	else
		alert(username + " already has a watchlist called " + name);
}

function remove_from_watchlists(username, name)
{
	var watchlists = fetch_watchlists(username);
	var index = watchlists.indexOf(name);

	if(index != -1)
	{
		watchlists.splice(index, 1);
		save_watchlists(username, watchlists);
		localStorage.removeItem(username + "-watchlist-" + name);
		if(localStorage.getItem(username + "-watchlist") == name)
			localStorage.removeItem(username + "-watchlist");
		alert("successfully removed " + name + " from watchlists for " + username)
	}
	else
		alert(username + " has no watchlist called " + name);
}