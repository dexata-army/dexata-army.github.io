function remove_duplicates(x)
{
	return x.filter(function(item, pos) {
	    return x.indexOf(item) == pos;
	})
}

function fetch_ignorelist(username, name)
{
	if(!localStorage.getItem(username + "-ignorelist-" + name))
		localStorage.setItem(username + "-ignorelist-" + name, "");
	return localStorage.getItem(username + "-ignorelist-" + name).toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function fetch_ignorelist_str(username, name)
{
	return localStorage.getItem(username + '-ignorelist-' + name).toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/;/g, ",").replace(/\n/g,",");
}

function fetch_combined_ignorelist(username, names)
{
	var ids = [];

	for(var i=0; i<names.length; i++)
		ids = ids.concat(fetch_ignorelist(username, names[i]));

	return remove_duplicates(ids);
}

function fetch_combined_ignorelist_str(username, names)
{
	return fetch_combined_ignorelist(username, names).join(',');
}

function fetch_combined_ignorelist_map(username, names)
{
	var map = {};
	var ignorelist = fetch_combined_ignorelist(username, names);
	for(var i=0; i<ignorelist.length; i++)
		map[ignorelist[i]] = true;
	return map;
}



function fetch_ignorelist_map(username, name)
{
	var map = {};
	var ignorelist = fetch_ignorelist(username, name);
	for(var i=0; i<ignorelist.length; i++)
		map[ignorelist[i]] = true;
	return map;
}

function save_to_ignorelist(username, ignorelist, name)
{
	var ignorelist_str;

	ignorelist.sort();

	if(ignorelist.length)
		ignorelist_str = ignorelist[0];

	for(var i=1; i<ignorelist.length; i++)
		ignorelist_str += "\n" + ignorelist[i];

	localStorage.setItem(username + "-ignorelist-" + name, ignorelist_str);
}

function ignore(username, ignorelist, name, id)
{
	var index = ignorelist.indexOf(id);
	if(index == -1)
	{
		ignorelist[ignorelist.length] = id;
		save_to_ignorelist(username, ignorelist, name);
		//alert("added " + id + " to ignorelist " + name + " for " + username);
	}
	else
		alert("already ignoring " + id);
}

function unignore(username, ignorelist, name, id)
{
	var index = ignorelist.indexOf(id);
	if(index != -1)
	{
		ignorelist.splice(index, 1);
		save_to_ignorelist(username, ignorelist, name);
		//alert("removed " + id + " from ignorelist " + name + " for " + username);
	}
	else
		alert("not ignoring " + id);
}

function fetch_wallets(username)
{
	if(username == "guest")
		return {};

	if(!localStorage.getItem(username + "-wallets"))
		localStorage.setItem(username + "-wallets", "");

	return localStorage.getItem(username + "-wallets").replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function save_wallets(username, wallets)
{
	var wallets_str = "";

	wallets.sort();

	//if(wallets.length)
	//	wallets_str = wallets[0];

	for(var i=1; i<wallets.length; i++)
		wallets_str += "\n" + wallets[i];

	localStorage.setItem(username + "-wallets", wallets_str);
}

function add_to_wallets(username, network, name, address)
{
	var wallets = fetch_wallets(username);

	if(network == "network")
	{
		alert("please select a network");
	}
	else if(wallets.indexOf(name) == -1)
	{
		localStorage.setItem(username + "-wallets-" + name + "-network", network);
		localStorage.setItem(username + "-wallets-" + name + "-address", CryptoJS.AES.encrypt(address, CryptoJS.AES.decrypt(localStorage.getItem('password'), "Go hang a salami, I’m a lasagna hog.").toString(CryptoJS.enc.Utf8)));
		wallets[wallets.length] = name;
		save_wallets(username, wallets);
		alert("successfully added " + name + " to wallets for " + username);
	}
	else
		alert(username + " already has a wallet called " + name);
}

function remove_from_wallets(username, name)
{
	var wallets = fetch_wallets(username);
	var index = wallets.indexOf(name);

	if(index != -1)
	{
		wallets.splice(index, 1);
		save_wallets(username, wallets);
		//localStorage.removeItem(username + "-wallet-" + name);
		localStorage.removeItem(username + "-wallets-" + name + "-network");
		localStorage.removeItem(username + "-wallets-" + name + "-address");
		localStorage.removeItem(username + "-ignorelist-" + name);
		if(localStorage.getItem(username + "-wallet") == name)
			localStorage.removeItem(username + "-wallet");
		alert("successfully removed " + name + " from wallets for " + username)
	}
	else
		alert(username + " has no wallet called " + name);
}