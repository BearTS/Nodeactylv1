const axios = require('axios');

// GET
const getallservers = require('./methods/getAllServers.js');
const getserverinfo = require('./methods/getServerInfo.js');
const getserverstatus = require('./methods/getServerStatus.js');
const isowner = require('./methods/isOwner.js');
const getcpucores = require('./methods/getCPUCores.js');
const getcpuusage = require('./methods/getCPUUsage.js');
const getramusage = require('./methods/getRAMUsage');
const getdiskusage = require('./methods/getDiskUsage.js');
const getdisk = require('./methods/getDisk.js');
const getram = require('./methods/getRam.js');

// POST
const startserver = require('./methods/startServer.js');
const stopserver = require('./methods/stopServer.js');
const killserver = require('./methods/killServer.js');
const restartserver = require('./methods/restartServer.js');
const sendcommand = require('./methods/sendCommand.js');

/**
 *
 * @param {String} HOST Host to use
 * @param {String} KEY Client API key
 */
function login(HOST, KEY, callback) {
	HOST = HOST.trim();
	if(HOST.endsWith('/')) HOST = HOST.slice(0, -1);

	process.env.CLIENT_NODEACTYL_HOST = HOST;
	process.env.CLIENT_NODEACTYL_KEY = KEY;
	axios.get(HOST + '/api/client', {
		responseEncoding: 'utf8',
		maxRedirects: 5,
		headers: {
			'Authorization': 'Bearer ' + KEY,
			'Content-Type': 'application/json',
			'Accept': 'Application/vnd.pterodactyl.v1+json',
		},
	}).then(function(response) {
		if (response.status == 404) {
			callback(false, 'API Key is not valid! (Application)');
		}
		else {
			callback(true);
		}
	}).catch(error => {
		if (error.response.status == 403) {
			callback(false, 'API Key is not valid! (Application)');
		}
		else {
			throw error;
		}
	});
}

function fastLogin(HOST, KEY) {
	HOST = HOST.trim();
	if(HOST.endsWith('/')) HOST = HOST.slice(0, -1);
	process.env.CLIENT_NODEACTYL_HOST = HOST;
	process.env.CLIENT_NODEACTYL_KEY = KEY;
}


module.exports = {
	login: login,
	fastLogin: fastLogin,

	// GET
	getAllServers: getallservers,
	getServerInfo: getserverinfo,
	getServerStatus: getserverstatus,
	isOwner: isowner,
	getCPUCores: getcpucores,
	getCPUUsage: getcpuusage,
	getRAMUsage: getramusage,
	getDiskUsage: getdiskusage,
	getDisk: getdisk,
	getRam: getram,

	// POST
	startServer: startserver,
	stopServer: stopserver,
	killServer: killserver,
	restartServer: restartserver,
	sendCommand: sendcommand,
};
