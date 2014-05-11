App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'edit_asset',
        'asset_types/:id/edit': 'edit_asset'
    },
    index: function () {
        var asset_type_list_view = new App.Views.Asset_type_list;
        asset_type_list_view.render();
    },

    edit_asset: function (id) {
        var asset_type_new_view = new App.Views.Asset_type_new;
        asset_type_new_view.render({id: id});
    }

});

