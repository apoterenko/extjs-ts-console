/**
 * 'ManagementConsole.overrides.Ajax'
 * This override is needed in order to pass the Etag header to the proxy.RestProxy
 */
Ext.define('ManagementConsole.overrides.Ajax', {
	override: 'Ext.data.request.Ajax',

	// @inheritdoc
	createResponse: function (xhr) {
		var me = this,
			isXdr = me.isXdr,
			allResponseHeaders = isXdr ? '' : xhr.getAllResponseHeaders(),
			response;

		response = this.callParent(arguments);

		if (!Ext.isEmpty(allResponseHeaders)) {
			this.overrideHeaderFunctions(
				response,
				allResponseHeaders.replace(/\r\n/g, '\n').split('\n')
			);
		}
		return response;
	},

	/**
	 * @private
	 * @param {Object} response Response
	 * @param {String[]} allResponseHeaders All response headers strings array
	 */
	overrideHeaderFunctions: function (response, allResponseHeaders) {
		var headers = {};

		Ext.Array.each(allResponseHeaders, function (header) {
			header = header.replace(' ', '').split(':');
			headers[header[0]] = header[1];
		});

		Ext.apply(response, {

			// @inheritdoc
			getResponseHeader: function (name) {
				return headers[name];
			},

			// @inheritdoc
			getAllResponseHeaders: function () {
				return headers;
			}
		});
	}
});