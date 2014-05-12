App.Routers.Admin = Backbone.Router.extend({

    routes: {
        'admins': 'index',
        'admins/new': 'edit',
        'admins/:id/edit': 'edit',
        'admins/:id': 'destroy'
    },
    index: function () {
        var admin_view = new App.Views.Admin;
        admin_view.render();
    },

    edit: function(id) {
        var admin_edit_view = new App.Views.Admin_edit;
        admin_edit_view.render({id: id});
    },

    destroy: function(id) {
        var admin_delete = new App.Views.Admin_delete;
        admin_delete.deleteAdmin({id: id})
    }
});

