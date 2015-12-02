/// <reference path="../../../typings_fix/tsd.d.ts"/>
export import operationalGroupsAdministratorsViewControllerT = require("./OperationalGroupsAdministratorsViewControllerT");

/**
 * @class OperationalGroupsAdministratorsViewT
 */
export class OperationalGroupsAdministratorsViewT extends Ext.grid.Panel {

    /**
     * @inheritdoc
     */
    alias = ['widget.operational.groups.administrators.view'];

    /**
     * @private
     */
    inject = [
        'administratorsStore'
    ];
    getAdministratorsStore;

    /**
     * @inheritdoc
     */
    config = {

        /**
         * Administrators store
         */
        administratorsStore: null
    };

    /**
     * @inheritdoc
     */
    controller = 'operational.groups.administrators';

    /**
     * @inheritdoc
     */
    border = false;

    /**
     * @inheritdoc
     */
    cls = 'property-action';

    /**
     * @inheritdoc
     */
    viewConfig = {

        /**
         * @inheritdoc
         */
        listeners: {
            itemclick: 'onItemClick'
        }
    };

    /**
     * @inheritdoc
     */
    columns = [
        {
            /**
             * @inheritdoc
             */
            width: 40,

            /**
             * @inheritdoc
             */
            renderer: function (value, o, record) {
                // TODO
                return record.get('status') === -1 ? '' : '<div class="icon-status"></div>';
            }
        },
        {
            /**
             * @inheritdoc
             */
            text: 'ИМЯ',

            /**
             * @inheritdoc
             */
            flex: 1,

            /**
             * @inheritdoc
             */
            renderer: function (value, o, record) {
                return (record.get('firstname') + ' ' + record.get('lastname')).trim() || record.get('login');
            }
        },
        {
            /**
             * @inheritdoc
             */
            text: 'ИМЯ ПОЛЬЗОВАТЕЛЯ',

            /**
             * @inheritdoc
             */
            dataIndex: 'login',

            /**
             * @inheritdoc
             */
            flex: 1
        }
    ];

    private beforeCallParent() {
        this.store = this.getAdministratorsStore();
    }
}
