/**
 * @class ManagementConsole.data.proxy.RestDevConfig
 *
 * The usage example:
 *
 * 1) Development/Test mode
 *      Deft.Injector.configure({restConfig: 'ManagementConsole.data.proxy.RestDevConfig'});
 *
 * 2) Production mode
 *      Deft.Injector.configure({restConfig: 'ManagementConsole.data.proxy.RestConfig'});
 */
Ext.define('ManagementConsole.data.proxy.RestDevConfig', {
	extend: 'ManagementConsole.data.proxy.RestConfig',

	// @inheritdoc
	proxyConfig: {

		/**
		 * Emulation enabled flag
		 */
		emulationEnabled: true,

		/**
		 * For each emulation data iterator
		 */
		forEachEmulData: function (requestUrl, callback) {
			var questionMark,
				me = this;

			if (!this.emulationEnabled) {
				return;
			}

			questionMark = requestUrl.indexOf("?");

			Ext.Object.each(this.emulData, function (emulUrl, emulResponseText) {
				if (questionMark > -1) {
					// Exclude query params
					requestUrl = requestUrl.substr(0, questionMark);
				}

				if (emulUrl === requestUrl) {
					Ext.callback(callback, me, [emulUrl, emulResponseText]);
					return false;
				}
			});
		},

		// @inheritdoc
		sendRequest: function (request) {
			var emulationResponse = false;

			this.forEachEmulData(request.getUrl(), function () {
				emulationResponse = true;
			});

			if (emulationResponse) {
				Ext.callback(request.getCallback());
			} else {
				return this.superclass.sendRequest.apply(this, arguments);
			}
			return request;
		},

		// @inheritdoc
		createRequestCallback: function (request, operation) {
			var me = this;

			return function (options, success, response) {

				me.forEachEmulData(request.getUrl(), function (emulUrl, emulResponseText) {
					// Emulation response
					response = {
						getAllResponseHeaders: function () {
						},
						getResponseHeader: function (name) {
						},
						request: request,
						responseText: Ext.JSON.encode(emulResponseText),
						status: 200,
						statusText: "OK"
					};

					success = true;
				});

				me.processResponse(success, operation, request, response);
			};
		},

		/**
		 * Emulation data
		 */
		emulData: {}
	}
});