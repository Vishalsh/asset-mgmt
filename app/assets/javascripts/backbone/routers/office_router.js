App.Routers.Office = Backbone.Router.extend({

    routes: {
        'offices': 'index',
        'offices/new': 'edit',
        'offices/:id/edit': 'edit',
        'offices/:id': 'destroy'
    },

    index: function () {
        var office_view = new App.Views.Office;
        office_view.render();
    },

    edit: function(id) {
        var office_edit_view = new App.Views.Office_edit;
        office_edit_view.render({id: id});
    },

    destroy: function(id) {
        var office_delete = new App.Views.Office_delete;
        office_delete.deleteOffice({id: id})
    }

});

