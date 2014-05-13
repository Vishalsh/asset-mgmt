App.Routers.Model = Backbone.Router.extend({

    routes: {
        'models': 'index',
        'models/new': 'edit',
        'models/:id/edit': 'edit',
        'models/:id': 'destroy'
    },

    index: function () {
        var model_view = new App.Views.Model;
        model_view.render();
    },

    edit: function(id) {
        var model_edit_view = new App.Views.Model_edit;
        model_edit_view.render({id: id});
    },

    destroy: function(id) {
        var model_delete = new App.Views.Model_delete;
        model_delete.deleteModel({id: id})
    }

});

