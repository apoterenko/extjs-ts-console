/// <reference path="../../../../typings_fix/tsd.d.ts"/>

var EMPTY_TEXT = Array(60).join('.');

/**
 * @class OperationalGroupsAdministratorEditorViewT
 */
export class OperationalGroupsAdministratorEditorViewT extends Ext.form.Panel {

	// @inheritdoc
	requires = [
		'ManagementConsole.plugin.form.field.GroupField',
		'ManagementConsole.plugin.form.field.EditFieldTrigger',
		'ManagementConsole.plugin.form.field.LabelledSlider',
		'ManagementConsole.plugin.form.field.FieldAutoUpdater',
		'Ext.slider.Single'
	];

	// @inheritdoc
	alias = 'widget.operational.groups.administrator.editor.view';

	// @inheritdoc
	defaults = {
		labelWidth: 180,
		width: 400
	};

	// @inheritdoc
	bodyPadding = 20;

	// @inheritdoc
	items = [
		{
			xtype: 'textfield',
			name: 'login',
			bind: '{login}',
			plugins: [
				'field.auto.updater',
				'edit.field.trigger'
			],
			fieldLabel: 'Login',
			emptyText: EMPTY_TEXT
		},
		{
			xtype: 'textfield',
			name: 'email',
			bind: '{email}',
			plugins: [
				'field.auto.updater',
				'edit.field.trigger'
			],
			fieldLabel: 'Email',
			emptyText: EMPTY_TEXT
		},
		{
			xtype: 'textfield',
			name: 'fullname',
			plugins: [
				'field.trigger',
				'group.field',
			],
			fieldLabel: 'Full name',
			emptyText: EMPTY_TEXT,

			groupFieldConfig: {
				master: 'fullNameMaster',
				tpl: '{firstname} {lastname}'
			}
		},
		{
			xtype: 'textfield',
			name: 'firstname',
			bind: '{firstname}',
			plugins: [
				'field.auto.updater',
				'group.field',
				'edit.field.trigger'
			],
			fieldLabel: 'First name',

			groupFieldConfig: {
				head: true,
				relation: 'fullNameMaster'
			}
		},
		{
			xtype: 'textfield',
			name: 'lastname',
			bind: '{lastname}',
			plugins: [
				'field.auto.updater',
				'group.field',
				'edit.field.trigger'
			],
			fieldLabel: 'Last name',

			groupFieldConfig: {
				relation: 'fullNameMaster'
			}
		},
		{
			xtype: 'slider',
			name: 'notifications_backup',
			value: 7,
			plugins: [
				'field.auto.updater',
				'labelled.slider'
			],

			labelledSliderConfig: {
				title: 'BACKUP NOTIFICATIONS',
				labels: [
					'OFF', 'LESS', 'MORE', 'ALL'
				],
				values: [
					0, 1, 3, 7
				]
			}
		}
	]
}