/**
 * @class OperationalGroupsTreeViewT
 */
export class OperationalGroupsTreeViewT extends Ext.tree.Panel {

    /**
     * @inheritdoc
     */
    alias = ['widget.operational.groups.tree.view'];

    /**
     * @inheritdoc
     */
    requires = [
        'Ext.tree.Panel'
    ];

    /**
     * @private
     */
    inject = [
        'groupsStore'
    ];

    /**
     * @private
     */
    getGroupsStore;

    /**
     * @inheritdoc
     */
    config = {
        /**
         * Groups store
         */
        groupsStore: null
    };

    /**
     * @inheritdoc
     */
    ui = 'navigation-tree';

    /**
     * @inheritdoc
     */
    viewConfig = {

        /**
         * @inheritdoc
         */
        loadMask: false,

        /**
         * @inheritdoc
         */
        itemId: 'operationalGroupsTreeViewItem'
    };

    private beforeCallParent() {
        this.store = this.getGroupsStore();
    }
}
