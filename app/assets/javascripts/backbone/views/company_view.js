App.Views.Company = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var companies = new App.Collections.Company;
        companies.fetch({
            success: function (companies) {
                var template = _.template($('#company_list').html(), {companies: companies.models, list: 'active', add_new: '', type: 'companies'});
                self.$el.html(template);
            }
        });
    }

});

App.Views.Company_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.company-form', 'submit');
    },

    events: {
        'submit .company-form': 'saveCompany'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var company = new App.Models.Company();
            company.url = '/companies/' + options.id + '/edit';
            company.fetch({
                success: function (company) {
                    var template = _.template($("#company_new").html(), {company: company, list: '', add_new: '', type: 'companies'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#company_new").html(), {company: null, list: '', add_new: 'active', type: 'companies'})
            this.$el.html(template);
        }

    },

    saveCompany: function (e) {

        e.preventDefault();
        var self = this;
        var name = $("#company_name").val();
        var id = $("#company_id").val();
        var companyDetails = {name: name, id: id};
        var company = new App.Models.Company;
        var companyRouter = new App.Routers.Company;
        var companyEditView = new App.Views.Company_edit;

        company.on('error', function (model, errors) {
            companyEditView.showErrors(errors);
        });

        company.save(companyDetails, {
            success: function () {
                companyEditView.navigate(companyRouter);
            }
        });

    },

    navigate: function (companyRouter) {
        companyRouter.navigate('companies', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});

App.Views.Company_delete = Backbone.View.extend({

    deleteCompany: function (options) {
        var company = new App.Models.Company({id: options.id});
        var companyRouter = new App.Routers.Company;
        company.destroy({
            success: function () {
                companyRouter.navigate('companies', {trigger: true});
            }
        })
    }

});
