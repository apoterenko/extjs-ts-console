/// <reference path="../../../typings_fix/tsd.d.ts"/>

export import editorViewControllerT = require("./EditorViewControllerT");

/**
 * @class EditorViewT
 */
export class EditorViewT extends Ext.window.Window {

	// @inheritdoc
	alias = 'widget.editor.view';

	// @inheritdoc
	layout = 'fit';

	// @inheritdoc
	ui = 'editor';

	// @inheritdoc
	controller = 'editor.view';

	// @inheritdoc
	resizable = false;

	// @inheritdoc
	header = false;

	// @inheritdoc
	width = 576;

	private editorTitle:Ext.form.Label;

	// @inheritdoc
	tbar = {
		// @inheritdoc
		ui: 'property',

		// @inheritdoc
		defaults: {

			// @inheritdoc
			scale: 'large',

			// @inheritdoc
			ui: 'property'
		},

		// @inheritdoc
		items: [
			{
				// @inheritdoc
				iconCls: 'icon-close',

				// @inheritdoc
				handler: 'onEditorViewClose'
			},
			{
				// @inheritdoc
				xtype: 'label',

				// @inheritdoc
				itemId: 'editorTitle'
			}
		]
	};

	setEditorTitle(title:string) {
		this.editorTitle.setText(title);
	}
}