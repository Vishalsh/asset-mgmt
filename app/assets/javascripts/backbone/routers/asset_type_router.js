App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'edit',
        'asset_types/:id/edit': 'edit',
        'asset_types/:id': 'delete'
    },
    index: function () {
        var asset_type_list_view = new App.Views.Asset_type_list;
        asset_type_list_view.render();
    },

    edit: function (id) {
        var asset_type_new_view = new App.Views.Asset_type_new;
        asset_type_new_view.render({id: id});
    },

    delete: function(id) {
        var asset_type_delete = new App.Views.Asset_type_delete;
        asset_type_delete.deleteAssetType({id: id})
    }

});

