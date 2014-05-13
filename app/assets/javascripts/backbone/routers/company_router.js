App.Routers.Company = Backbone.Router.extend({

    routes: {
        'companies': 'index',
        'companies/new': 'edit',
        'companies/:id/edit': 'edit',
        'companies/:id': 'destroy'
    },

    index: function () {
        var company_view = new App.Views.Company;
        company_view.render();
    },

    edit: function(id) {
        var company_edit_view = new App.Views.Company_edit;
        company_edit_view.render({id: id});
    },

    destroy: function(id) {
        var company_delete = new App.Views.Company_delete;
        company_delete.deleteCompany({id: id})
    }

});

