define(["require", "exports", "ExtJS"], function (require, exports, Ext) {
    describe("store.Storage", function () {
        it("mock", function (done) {
            Ext.Loader.setPath('ManagementConsole', '/base/app');
            Ext.Loader.setPath('ManagementConsole.mocks', '/base/tests/mocks');
            Ext.syncRequire('ManagementConsole.data.store.Storage');
            Ext.syncRequire('ManagementConsole.mocks.RestProxy');
            //ManagementConsole.mocks.proxy.RestConfig.setHost("https://mc-vz02-08-12-17-52-11394.msp.ru.corp.acronis.com");
            var store = Ext.create('ManagementConsole.data.store.Storage');
            store.load({
                params: {
                    groupId: 2
                },
                callback: function (data) {
                    expect(data[0].data.uid).toMatch(/[0-9a-f\-]+/);
                    done();
                }
            });
        });
    });
});
