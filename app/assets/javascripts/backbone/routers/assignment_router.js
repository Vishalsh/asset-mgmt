App.Routers.Assignment = Backbone.Router.extend({

    routes: {
        'assignments': 'index',
        'assignments/new': 'edit',
        'assignments/:id/edit': 'edit',
        'assignments/:id': 'destroy'
    },
    index: function () {
        var assignment_list_view = new App.Views.Assignment_list;
        assignment_list_view.render();
    },

    edit: function (id) {
        var assignment_edit_view = new App.Views.Assignment_edit;
        assignment_edit_view.render({id: id});
    },

    destroy: function (id) {
        var assignment_delete = new App.Views.Assignment_delete;
        assignment_delete.deleteAssignment({id: id});
    }
});

