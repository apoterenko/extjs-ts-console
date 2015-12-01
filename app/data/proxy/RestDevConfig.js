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
		emulData: {
			'/api/1/accounts': {
				"server_url": "https:\/\/my.server.com",
				"id": 0,
				"login": "alexander.poterenko@server.com"
			},
			'https://my.server.com/api/1/login': {
				"id": 3153,
				"firstname": "Alexander",
				"lastname": "Poterenko",
				"group": {"id": 1, "parent_kind": 0, "kind": 0},
				"brand": 1,
				"login": "alexander.poterenko@server.com",
				"email": "alexander.poterenko@server.com",
				"language": "en"
			},
			'https://my.server.com/api/1/profile': {
				"id": 3153,
				"firstname": "Alexander",
				"lastname": "Poterenko",
				"group": {"id": 1, "parent_kind": 0, "kind": 0},
				"brand": 1,
				"login": "alexander.poterenko@server.com",
				"email": "alexander.poterenko@server.com",
				"language": "en"
			},
			'https://my.server.com/api/1/groups/1': {
				"version": 203,
				"grade": 0,
				"brand": 1,
				"migration_enabled": null,
				"contact": {
					"city": null,
					"firstname": "",
					"zipcode": null,
					"phone": null,
					"lastname": "",
					"address1": null,
					"state": null,
					"address2": null,
					"email": "",
					"country": null
				},
				"external": 0,
				"migration_service": null,
				"kind": 0,
				"parent_id": null,
				"language": "en",
				"id": 1,
				"storage": {"name": "", "id": null},
				"name": "\/",
				"status": 1
			},
			'https://my.server.com/api/1/groups/1/storages': {
				"items": [{
					"version": 7,
					"id": 1,
					"name": "temp.server.com",
					"uid": "111111c-1244-11e4-8901-000c2111111",
					"kind": 2,
					"owner": 1,
					"space_usage": 20977260076031,
					"inherited": 0,
					"active": 1
				}]
			},
			'https://my.server.com/api/1/groups/1/admins': {
				"items": [{
					"version": 4,
					"id": 1,
					"firstname": "Root",
					"lastname": "Administrator",
					"login": "root",
					"email": "root@server.com",
					"status": 1
				}, {
					"version": 139,
					"id": 3153,
					"firstname": "Alexander",
					"lastname": "Poterenko",
					"login": "alexander.poterenko@server.com",
					"email": "alexander.poterenko@server.com",
					"status": 1
				}, {
					"version": 206,
					"id": 16426,
					"firstname": "Mikhail",
					"lastname": "Matrosov",
					"login": "Mikhail.Matrosov@server.com",
					"email": "Mikhail.Matrosov@server.com",
					"status": 1
				}]
			},
			'https://my.server.com/api/1/groups/1/children': {
				"items": [{
					"version": 17,
					"id": 1537,
					"grade": 1,
					"storage": {"id": null},
					"usage": {
						"vm_count": 0,
						"workstation_count": 3,
						"storage_size": 41800622807,
						"service_users": 4,
						"server_count": 2
					},
					"name": "Test 1",
					"has_children": 1,
					"status": 1,
					"kind": 10
				}, {
					"version": 28,
					"id": 21348,
					"grade": 1,
					"storage": {"id": null},
					"usage": {
						"vm_count": 7,
						"workstation_count": 22,
						"storage_size": 564641373976,
						"service_users": 33,
						"server_count": 20
					},
					"name": "Test 2",
					"has_children": 1,
					"status": 1,
					"kind": 0
				}, {
					"version": 12,
					"id": 10877,
					"grade": 1,
					"storage": {"id": 1},
					"usage": {
						"vm_count": 0,
						"workstation_count": 0,
						"storage_size": 0,
						"service_users": 1,
						"server_count": 0
					},
					"name": "Test 3",
					"has_children": 0,
					"status": 1,
					"kind": 40
				}]
			}
		}
	}
});