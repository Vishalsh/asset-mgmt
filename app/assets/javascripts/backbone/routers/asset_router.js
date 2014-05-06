App.Routers.Asset = Backbone.Router.extend({

    routes: {
        'assets': 'index'
    },

    index: function () {
        var asset_view = new App.Views.Asset;
        asset_view.render();
    }
});