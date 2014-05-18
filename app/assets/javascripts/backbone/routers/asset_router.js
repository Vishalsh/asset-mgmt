App.Routers.Asset = Backbone.Router.extend({

    routes: {
        'assets': 'index',
        'assets/new': 'edit',
        'assets/:id/edit': 'edit',
        'assets/:id': 'destroy'
    },

    index: function () {
        var asset_view = new App.Views.Asset;
        asset_view.render();
    },

    edit: function (id) {
        var asset_edit_view = new App.Views.Asset_edit;
        asset_edit_view.render({id: id});
    },

    destroy: function (id) {
        var asset_delete = new App.Views.Asset_delete;
        asset_delete.deleteAssetType({id: id});
    }
});