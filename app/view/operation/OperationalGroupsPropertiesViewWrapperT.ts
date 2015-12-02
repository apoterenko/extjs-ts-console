export import operationalGroupsPropertiesViewT = require("./OperationalGroupsPropertiesViewT");

/**
 * @class OperationalGroupsPropertiesViewWrapperT
 */
export class OperationalGroupsPropertiesViewWrapperT extends Ext.panel.Panel {

    /**
     * @inheritdoc
     */
    alias = ['widget.operational.groups.properties.view.wrapper'];

    /**
     * @inheritdoc
     */
    ui = 'property';

    /**
     * @inheritdoc
     */
    layout = 'fit';

    /**
     * @inheritdoc
     */
    border = false;

    /**
     * @inheritdoc
     */
    tbar = {

        /**
         * @inheritdoc
         */
        ui: 'property',

        /**
         * @inheritdoc
         */
        cls: 'property-top',

        /**
         * @inheritdoc
         */
        defaults: {

            /**
             * @inheritdoc
             */
            scale: 'large',

            /**
             * @inheritdoc
             */
            ui: 'property'
        },

        /**
         * @inheritdoc
         */
        items: [
            '->',
            {
                iconCls: 'icon-search'
            },
            {
                iconCls: 'icon-help'
            },
            {
                iconCls: 'icon-user'
            }
        ]
    };

    /**
     * @inheritdoc
     */
    bbar = {

        /**
         * @inheritdoc
         */
        ui: 'property',

        /**
         * @inheritdoc
         */
        cls: 'property-bottom',

        /**
         * @inheritdoc
         */
        defaults: {

            /**
             * @inheritdoc
             */
            scale: 'large',

            /**
             * @inheritdoc
             */
            ui: 'property'
        },

        /**
         * @inheritdoc
         */
        items: [
            {
                iconCls: 'icon-add',
                text: 'ДОБАВИТЬ'
            },
            {
                iconCls: 'icon-enable-disable',
                text: 'ОТКЛЮЧИТЬ'
            },
            {
                iconCls: 'icon-reset-password',
                text: 'СБРОС ПАРОЛЯ'
            },
            '->',
            {
                iconCls: 'icon-delete',
                text: 'УДАЛИТЬ'
            }
        ]
    };

    /**
     * @inheritdoc
     */
    items = {
        /**
         * @inheritdoc
         */
        xtype: 'operational.groups.properties.view'
    };
}
