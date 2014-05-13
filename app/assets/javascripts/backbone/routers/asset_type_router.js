App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'edit',
        'asset_types/:id/edit': 'edit',
        'asset_types/:id': 'destroy'
    },
    index: function () {
        var asset_type_list_view = new App.Views.Asset_type_list;
        asset_type_list_view.render();
    },

    edit: function (id) {
        var asset_type_edit_view = new App.Views.Asset_type_edit;
        asset_type_edit_view.render({id: id});
    },

    destroy: function (id) {
        var asset_type_delete = new App.Views.Asset_type_delete;
        asset_type_delete.deleteAssetType({id: id});
    }
});

