/**
 * Ext loader apply configuration
 */
//<debug>
Ext.Loader.setPath({
    'Deft': 'packages/deft/src/js'
});
//</debug>

/**
 * Load IoC injector
 */
//<debug>
Ext.syncRequire('Deft.Injector');
//</debug>

/**
 * ManagementConsole.Application
 */
Ext.define('ManagementConsole.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'ManagementConsole.service.EventManager',
        'ManagementConsole.logic.DataManager',
        'ManagementConsole.logic.AccessManager',
        'ManagementConsole.logic.RouteManager',
        'ManagementConsole.logic.group.GroupDataManager',
        'ManagementConsole.logic.ExceptionProcessor',
        'ManagementConsole.logic.EntityManager',
        'ManagementConsole.data.proxy.RestConfig',
        'ManagementConsole.data.proxy.RestDevConfig',
        'ManagementConsole.data.store.Groups',
        'ManagementConsole.data.store.Administrators',
        'ManagementConsole.controller.Group',
        'ManagementConsole.overrides.Ajax',
        'ManagementConsole.overrides.Model',
        'ManagementConsole.overrides.Injectable',
        'ManagementConsole.overrides.Panel',
        'ManagementConsole.RuntimeDependencies'
    ],

    /**
     * @inheritdoc
     */
    name: 'ManagementConsole',

    /**
     * @inheritdoc
     */
    controllers: [
        'Group'
    ],

    /**
     * @private
     */
    inject: [
        'routeManager'
    ],

    /**
     * @inheritdoc
     */
    config: {
        /**
         * Router navigator
         * @private
         */
        routeManager: null
    },

    /**
     * @inheritdoc
     */
    constructor: function () {
        /**
         * IoC init configuration
         * TODO Переименовать папку logic в services.
         * Т.к. именно сервисы по сути тут и инжектируются.
         */
        Deft.Injector.configure({
            eventManager: 'ManagementConsole.service.EventManager',
            dataManager: 'ManagementConsole.logic.DataManager',
            editorAnimatorFactory: 'ManagementConsole.service.editor.EditorAnimatorFactoryT',
            editorManager: 'ManagementConsole.service.editor.EditorManagerT',
            accessManager: 'ManagementConsole.logic.AccessManager',
            routeManager: 'ManagementConsole.logic.RouteManager',
            groupDataManager: 'ManagementConsole.logic.group.GroupDataManager',
            exceptionProcessor: 'ManagementConsole.logic.ExceptionProcessor',
            restConfig: 'ManagementConsole.data.proxy.RestDevConfig',
            entityManager: 'ManagementConsole.logic.EntityManager',
            groupsStore: 'ManagementConsole.data.store.Groups',
            administratorsStore: 'ManagementConsole.data.store.Administrators',
            application: {value: this}
        });

        this.callParent(arguments);
    },

    /**
     * @inheritdoc
     */
    launch: function () {
        this.getRouteManager().goGroupPage();
    }
});
