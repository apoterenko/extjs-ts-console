/**
 * ManagementConsole.logic.ExceptionProcessor
 */
Ext.define('ManagementConsole.logic.ExceptionProcessor', {

    requires: [
        'ManagementConsole.logic.RouteManager',
        'ManagementConsole.logic.entity.Exception'
    ],

    /**
     * @private
     */
    inject: [
        'routeManager'
    ],

    /**
     * @inherited
     */
    config: {
        /**
         * Router navigator
         */
        routeManager: null
    },

    /**
     * @public
     */
    process: function (response) {
        var error,
            errorConfig = {};

        if (response instanceof Ext.data.Operation) {
            error = response.getError();

            Ext.apply(errorConfig, {
                status: error.status,
                name: error.statusText,
                description: error.response.responseText
            });
        }

        this.getRouteManager().goErrorPage(
            Ext.create('exception', errorConfig)
        );
    }
});
