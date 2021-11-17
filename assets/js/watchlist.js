var watchlist;
var watching;

if(!localStorage.getItem('dexata_watchlist'))
	localStorage.setItem('dexata_watchlist', "");

function load_watchlist()
{
	watchlist = localStorage.getItem('dexata_watchlist').replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function create_watching()
{
	watching = {};
	for(var i=0; i<watchlist.length; i++)
		watching[watchlist[i]] = true;
}

function fetch_watchlist_str()
{
	return localStorage.getItem('dexata_watchlist').replace(/ /g, "").replace(/;/g, ",").replace(/\n/g,",");
}

function watch(id)
{
	var index = watchlist.indexOf(id);
	if(index == -1)
	{
		watchlist[watchlist.length] = id;
		watching[id] = true;
		save_watchlist();
	}
	else
		alert("already watching " + id);
}

function unwatch(id)
{
	var index = watchlist.indexOf(id);
	if(index != -1)
	{
		watchlist.splice(index, 1);
		create_watching();
		save_watchlist();
	}
	else
		alert("not watching " + id);
}

function save_watchlist()
{
	var watchlist_str;

	watchlist.sort();

	if(watchlist.length)
		watchlist_str = watchlist[0];

	for(var i=1; i<watchlist.length; i++)
		watchlist_str += "\n" + watchlist[i];

	localStorage.setItem('dexata_watchlist', watchlist_str);
}
