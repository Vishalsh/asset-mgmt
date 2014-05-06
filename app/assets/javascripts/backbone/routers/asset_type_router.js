App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'new'
    },
    index: function () {
        asset_type_list_view.render();
    },

    new: function () {
        asset_type_new_view.render();
    }

});

new App.Routers.Asset_type;
