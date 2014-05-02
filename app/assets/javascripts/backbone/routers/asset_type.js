App.Routers.Asset_type = Backbone.Router.extend({

    routes: {
        '': 'index'
    },
    index: function () {
        console.log("Home page loaded");
        asset_type_view.render();
    }

});

new App.Routers.Asset_type;
Backbone.history.start();