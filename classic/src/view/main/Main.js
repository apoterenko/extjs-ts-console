/**
 * ManagementConsole.view.main.Main
 * TODO Все-таки найти место  в конфигурации приложения, где можно бы было заменить путь к Main вьюхе.
 */
Ext.define('ManagementConsole.view.main.Main', {
    extend: 'Ext.Container',

    /**
     * @inheritdoc
     */
    requires: [
        'ManagementConsole.view.main.MainModel',
        'Ext.plugin.Viewport'
    ],

    /**
     * @inheritdoc
     */
    controller: 'main',

    /**
     * @inheritdoc
     */
    viewModel: 'main',

    /**
     * @inheritdoc
     */
    layout: 'card',

    /**
     * @inheritdoc
     */
    items: [
        {
            /**
             * @inheritdoc
             */
            xtype: 'box',

            /**
             * @inheritdoc
             */
            html: 'loading'
        },
        {
            /**
             * @inheritdoc
             */
            xtype: 'main.view'
        }
    ]
});
