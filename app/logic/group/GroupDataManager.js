/**
 * ManagementConsole.logic.group.GroupDataManager
 * TODO this is temporary solution
 */
Ext.define('ManagementConsole.logic.group.GroupDataManager', {
	extend: 'ManagementConsole.overrides.Injectable',

	requires: [
		'ManagementConsole.model.Brand',
		'ManagementConsole.data.store.Storage',
		'ManagementConsole.data.store.Administrators',
		'ManagementConsole.logic.EntityManager'
	],

	// @private
	inject: [
		'groupsStore',
		'administratorsStore',
		'entityManager'
	],

	// @inheritdoc
	config: {

		/**
		 * Entity manager
		 */
		entityManager: null,

		/**
		 * Groups store
		 */
		groupsStore: null,

		/**
		 * Administrators store
		 */
		administratorsStore: null
	},

	// @protected
	beforeCallParent: function () {
		this.tasks = [
			this.makeLoadGroupAdministratorsPromise,
			this.makeLoadGroupStoragesPromise,
			this.makeLoadGroupChildsPromise
		];
	},

	/**
	 * Do load group data
	 * @param callback
	 * @param scope
	 * @param args
	 */
	load: function (callback, scope, args) {
		var me = this,
			group;

		// TODO
		group = Ext.create('ManagementConsole.model.GroupT', {
			id: args.id,
			expanded: true
		});

		group.on('load', function (model) {
			me.loadGroupProperties(model, callback, scope, args);
		});
		group.load();
	},

	loadGroupProperties: function (model, callback, scope, args) {
		var me = this,
			tasks = me.tasks;

		Ext.Deferred.parallel(tasks, {me: me, group: model})
			.then(function () {
				Ext.callback(callback, scope);
			});
	},

	/**
	 * @private
	 * @returns {Ext.Promise}
	 */
	makeLoadGroupAdministratorsPromise: function () {
		var me = this.me,
			groupId = this.group.getId(),
			store = me.getAdministratorsStore();

		return new Ext.Promise(function (resolve) {
			store.on('load', function (store) {
				resolve(store);
			}, {
				single: true
			});
			store.load({
				params: {
					id: groupId
				}
			});
		});
	},

	/**
	 * @private
	 * @returns {Ext.Promise}
	 */
	makeLoadGroupStoragesPromise: function () {
		var groupId = this.group.getId(),
			store = Ext.create('ManagementConsole.data.store.Storage');

		return new Ext.Promise(function (resolve) {
			store.on('load', function (store) {
				resolve(store);
			}, {
				single: true
			});
			store.load({
				params: {
					id: groupId
				}
			});
		});
	},

	/**
	 * @private
	 * @returns {Ext.Promise}
	 */
	makeLoadGroupChildsPromise: function () {
		var me = this.me,
			group = this.group,
			store = me.getGroupsStore();

		// TODO
		if (store.getRoot().getId() === "root") {
			store.setRoot(group);
		}

		return new Ext.Promise(function (resolve) {
			// TODO load data
			resolve(store);
		});
	}
});