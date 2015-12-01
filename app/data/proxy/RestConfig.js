/**
 * @class ManagementConsole.data.proxy.RestConfig
 */
Ext.define('ManagementConsole.data.proxy.RestConfig', {

	/**
	 * Application target host
	 */
	host: null,

	/**
	 * Application rest API version
	 */
	version: 1,

	/**
	 * Application API name
	 */
	api: 'api',

	/**
	 *  Application context path
	 */
	contextPath: '/',

	/**
	 * Proxy config
	 */
	proxyConfig: {},

	/**
	 * Get application target host
	 */
	getHost: function () {
		return this.host;
	},

	/**
	 * @param host Host
	 */
	setHost: function (host) {
		this.host = host;
	},

	/**
	 * @returns {number}
	 */
	getVersion: function () {
		return this.version;
	},

	/**
	 * @returns {string}
	 */
	getApi: function () {
		return this.api;
	},

	/**
	 * @returns {string}
	 */
	getContextPath: function () {
		return this.contextPath;
	}
});