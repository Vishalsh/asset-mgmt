App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'new'
    },
    index: function () {
        var asset_type_list_view = new App.Views.Asset_type_list;
        asset_type_list_view.render();
    },

    new: function () {
        var asset_type_new_view = new App.Views.Asset_type_new;
        asset_type_new_view.render();
    }

});

