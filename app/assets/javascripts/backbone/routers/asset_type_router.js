App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        'asset_types': 'index',
        'asset_types/new': 'new'
    },
    index: function () {
        asset_type_view.render();
    },
    new: function() {

    }


});

new App.Routers.Asset_type;
