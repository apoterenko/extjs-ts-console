/// <reference path="../../../typings_fix/tsd.d.ts"/>
import editor_manager_module = require("../../service/editor/EditorManagerT");
import EditorManagerT = editor_manager_module.EditorManagerT;
export import operationalGroupsAdministratorEditorViewT = require("../operation/group/OperationalGroupsAdministratorEditorViewT");

/**
 * @class MainControllerT
 */
export class MainControllerT extends Ext.app.ViewController {

    /**
     * @inheritdoc
     */
    alias = ['controller.main'];

    /**
     * @inheritdoc
     */
    requires = [
        'ManagementConsole.logic.DataManager',
        'ManagementConsole.logic.AccessManager'
    ];

    /**
     * @private
     */
    private inject = [
        'dataManager',
        'groupDataManager',
        'accessManager',
        'editorManager'
    ];

    getAccessManager;
    getDataManager;
    getGroupDataManager;

    getEditorManager:()=>EditorManagerT;

    /**
     * @inheritdoc
     */
    config = {
        /**
         * Data manager
         */
        dataManager: null,

        /**
         * Group data manager
         */
        groupDataManager: null,

        /**
         * Access manager
         */
        accessManager: null,

        /**
         * Editor manager
         */
        editorManager: null
    };

    /**
     * @inheritdoc
     */
    routes = {
        ':target': {
            action: 'onTargetAction',
            before: 'onBeforeTargetAction'
        },
        'group': {
            action: 'onGroupAction',
            before: 'onBeforeGroupAction'
        }
    };

    /**
     * @inheritdoc
     */
    init() {
        this.listen({
            controller: {
                '*': {
                    'operationalmodule': 'onOperationalModule',
                    'open-editor': 'onOpenEditor',
                    'closeeditor': 'onCloseEditor'
                }
            },
            component: {
                '#operationalGroupsTreeViewItem': {
                    itemclick: this.onSelectGroup
                }
            }
        });
    }

    /**
     * Select group handler
     *
     * @private
     * @param scope Scope
     * @param model Model
     */
    private onSelectGroup(scope, model) {
        this.getGroupDataManager().loadGroupProperties(
            model,
            Ext.emptyFn, // TODO
            scope
        );
    }

    /**
     * @private
     */
    private onGroupAction() {
        this.showGroupPage();
    }

    /**
     * @private
     */
    private onBeforeGroupAction(action) {
        this.getDataManager().loadGroupData(action.resume, action);
    }

    /**
     *
     * @param target
     * @param action
     */
    onBeforeTargetAction(target, action) {
        this.getAccessManager().checkAccess(target);

        // TODO check access
        action.resume();
    }

    /**
     * @param target
     * @param action
     */
    onTargetAction(target, action) {
        // TODO
    }

    /**
     * Operational module handler
     *
     * @private
     * @param scope Scope
     * @param operationalModule Operational module name
     */
    private onOperationalModule(scope:Object, operationalModule:string) {
    }

    /**
     * @private
     * @param scope Scope
     * @param record Record
     */
    private onOpenEditor(scope, record) {
        var editorView = Ext.widget('operational.groups.administrator.editor.view');
        editorView.loadRecord(record);

        this.getEditorManager()
            .showEditor(editorView, this.getView());
    }

    /**
     * @private
     * @param scope
     * @param record
     */
    private onCloseEditor() {
        this.getEditorManager().hideEditor();
    }

    /**
     * Show group page
     */
    showGroupPage() {
        this.getView().layout.setActiveItem(1);
    }
}
