App.Routers.Asset = Backbone.Router.extend({

    routes: {
        'assets': 'index'
    },

    index: function () {
        asset_view.render();
    }
});

new App.Routers.Asset;
