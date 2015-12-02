declare module Ext {
    interface IBase {
    }
    interface IComponent {
    }
    interface IButton {
        xtype;
        tooltip;
    }
}

declare module Ext.form {
    interface IPanel {
        layout?:any;
        defaults?;
        dockedItems?;
        items?;
    }
    interface ITextField {
        xtype;
        fieldLabel;
        name;
        bind?:string;
    }
    interface IRadio {
        checked:boolean;
        cls:string;
        name:string;
        inputValue:string;
        boxLabel:string;
    }
    interface IRadioGroup {
        cls;
        layout;
        height;
        width;
        xtype;
        defaultType;
        defaults;
        items;
    }
}
declare module Ext.grid {
    interface IPanel {
    }
}
declare module Ext.panel {
    interface IPanel {
    }
}
declare module Ext.tab {
    interface IPanel {
    }
}
declare module Ext.tree {
    interface IPanel {
    }
}
