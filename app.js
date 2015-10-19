//<debug>
Ext.Loader.loadScript({
    url: './node_modules/requirejs/require.js',

    /**
     * @override
     */
    onLoad: function () {
        requirejs(['./app/bootstrapT'], function () {
//</debug>
                Ext.application({
                    name: 'ManagementConsole',

                    extend: 'ManagementConsole.Application',

                    requires: [
                        'ManagementConsole.view.main.Main'
                    ],

                    // The name of the initial view to create. With the classic toolkit this class
                    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
                    // modern toolkit, the main view will be added to the Viewport.
                    //
                    mainView: 'ManagementConsole.view.main.Main'

                    //-------------------------------------------------------------------------
                    // Most customizations should be made to ManagementConsole.Application. If you need to
                    // customize this file, doing so below this section reduces the likelihood
                    // of merge conflicts when upgrading to new versions of Sencha Cmd.
                    //-------------------------------------------------------------------------
                });
//<debug>
            }
        );
    }
});
//</debug>
