var param_array = [];
var param_map = new Map();

if(location.search.indexOf('?') > -1)
	param_array = location.search.split(/\?(.+)/)[1].replace("%20", " ").split('&');

for(var i=0; i<param_array.length; i++)
{
	param_array[i] = param_array[i].split(/=(.+)/);
	param_map.set(param_array[i][0], param_array[i][1].toLowerCase());
}