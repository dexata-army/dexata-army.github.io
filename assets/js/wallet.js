var username = "guest";

if(localStorage.getItem('username'))
	username = localStorage.getItem('username');
else if(sessionStorage.getItem('username'))
	username = sessionStorage.getItem('username');

function fetch_ignorelist(name)
{
	if(!localStorage.getItem(user + "-ignorelist-" + name))
		localStorage.setItem(user + "-ignorelist-" + name, "");
	return localStorage.getItem(user + "-ignorelist-" + name).toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}


function fetch_ignorelist_str(name)
{
	return localStorage.getItem(user + '-ignorelist-' + name).toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/;/g, ",").replace(/\n/g,",");
}

function fetch_ignorelist_map(name)
{
	var map = {};
	var ignorelist = fetch_ignorelist(name);
	for(var i=0; i<ignorelist.length; i++)
		map[ignorelist[i]] = true;
	return map;
}

function fetch_wallets()
{
	if(username == "guest")
		return {};

	if(!localStorage.getItem(username + "-wallets"))
		localStorage.setItem(username + "-wallets", "");

	return localStorage.getItem(username + "-wallets").replace(/ /g,"").replace(/;/g, "\n").replace(/,/g, "\n").split("\n");
}

function save_wallets(wallets)
{
	var wallets_str = "";

	wallets.sort();

	//if(wallets.length)
	//	wallets_str = wallets[0];

	for(var i=1; i<wallets.length; i++)
		wallets_str += "\n" + wallets[i];

	localStorage.setItem(username + "-wallets", wallets_str);
}

function add_to_wallets(network, name, address)
{
	var wallets = fetch_wallets();

	if(network == "network")
	{
		alert("please select a network");
	}
	else if(wallets.indexOf(name) == -1)
	{
		localStorage.setItem(username + "-wallets-" + name + "-network", network);
		localStorage.setItem(username + "-wallets-" + name + "-address", CryptoJS.AES.encrypt(address, CryptoJS.AES.decrypt(localStorage.getItem('password'), "Go hang a salami, I’m a lasagna hog.").toString(CryptoJS.enc.Utf8)));
		wallets[wallets.length] = name;
		save_wallets(wallets);
		alert("successfully added " + name + " to wallets for " + username);
	}
	else
		alert(username + " already has a wallet called " + name);
}

function remove_from_wallets(name)
{
	var wallets = fetch_wallets();
	var index = wallets.indexOf(name);

	if(index != -1)
	{
		wallets.splice(index, 1);
		save_wallets(wallets);
		//localStorage.removeItem(username + "-wallet-" + name);
		localStorage.removeItem(username + "-wallets-" + name + "-network");
		localStorage.removeItem(username + "-wallets-" + name + "-address");
		localStorage.removeItem(username + "-ignorelist-" + name);
		if(localStorage.getItem(user + "-wallet") == name)
			localStorage.removeItem(user + "-wallet");
		alert("successfully removed " + name + " from wallets for " + username)
	}
	else
		alert(username + " has no wallet called " + name);
}