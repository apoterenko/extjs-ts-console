import editorViewModule = require("../../view/editor/EditorViewT");
import editorAnimatorFactoryModule = require("./EditorAnimatorFactoryT");

import EditorViewT = editorViewModule.EditorViewT;
import EditorAnimatorFactoryT = editorAnimatorFactoryModule.EditorAnimatorFactoryT;

/**
 * @class EditorManagerT
 */
export class EditorManagerT {

	// @inheritdoc
	private mixins = {
		observable: 'Ext.util.Observable'
	};

	private inject = [
		'editorAnimatorFactory'
	];

	// @inheritdoc
	private config = {
		editorAnimatorFactory: null
	};

	private hiddenXOffset = -10000;

	private editor:EditorViewT;
	private view:Ext.Component;

	fireEvent;
	getEditorAnimatorFactory:()=>EditorAnimatorFactoryT;

	// @inheritdoc
	constructor(config) {
		Deft.Injector.inject(this.inject, this);
		this.mixins.observable.constructor.call(this, config);
	}

	showEditor(item:Ext.Component, view:Ext.Component):EditorManagerT {
		var editor,
			editorOpened = this.isEditorOpened();

		this.view = view;
		editor = this.getEditor();

		this.setEditorItem(item);

		if (editorOpened) {
			this.onAfterShowAnimate();
		} else {
			this.getEditor().show();

			this.getEditorAnimatorFactory().animationShow({
				target: editor,
				view: view,

				listeners: {
					scope: this,
					afteranimate: this.onAfterShowAnimate
				}
			});
		}

		this.bindTo(view);
		return this;
	}

	hideEditor() {
		this.getEditorAnimatorFactory().animationHide({
			target: this.getEditor(),
			view: this.view,

			listeners: {
				scope: this,
				afteranimate: this.onAfterHideAnimate
			}
		});

		this.view.un('resize', this.onResizeTarget, this);
		this.view = null;
	}

	isEditorOpened():boolean {
		return !Ext.isEmpty(this.view);
	}

	setEditorTitle(title) {
		this.getEditor().setEditorTitle(title);
	}

	private setEditorItem(item:Ext.Component) {
		var editor = this.getEditor();
		editor.removeAll();
		editor.add(item);
	}

	private bindTo(view:Ext.Component) {
		view.on('resize', this.onResizeTarget, this);
	}

	private getEditor():EditorViewT {
		return this.editor = this.editor || Ext.create('ManagementConsole.view.editor.EditorViewT', {
				height: this.view.getHeight()
			});
	}

	private onResizeTarget(scope:Ext.Component, width:number, height:number) {
		var editor = this.getEditor();

		editor.setHeight(height);
		editor.setX(this.view.getWidth() - editor.getWidth(), false);
	}

	private onAfterHideAnimate() {
		var editor = this.getEditor();
		editor.setX(this.hiddenXOffset, false);
		editor.removeAll();

		this.fireEvent('afterhide', this);
	}

	private onAfterShowAnimate() {
		this.fireEvent('aftershow', this);
	}
}