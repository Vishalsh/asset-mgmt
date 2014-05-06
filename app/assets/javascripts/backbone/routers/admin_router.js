App.Routers.Admin = Backbone.Router.extend({

    routes: {
        'admins': 'index'
    },
    index: function () {
        admin_view.render();
    }
});

new App.Routers.Admin;