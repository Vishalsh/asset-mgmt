App.Routers.Admin = Backbone.Router.extend({

    routes: {
        'admins': 'index'
    },
    index: function () {
        var admin_view = new App.Views.Admin;
        admin_view.render();
    }
});

