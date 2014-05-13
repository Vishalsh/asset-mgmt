App.Views.Office = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var offices = new App.Collections.Office;
        offices.fetch({
            success: function (offices) {
                var template = _.template($('#office_list').html(), {offices: offices.models, list: 'active', add_new: '', type: 'offices'});
                self.$el.html(template);
            }
        });
    }

});

App.Views.Office_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.office-form', 'submit');
    },

    events: {
        'submit .office-form': 'saveModel'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var office = new App.Models.Office({id: options.id})
            office.fetch({
                success: function (office) {
                    var template = _.template($("#office_new").html(), {office: office, list: '', add_new: '', type: 'offices'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#office_new").html(), {office: null, list: '', add_new: 'active', type: 'offices'})
            this.$el.html(template);
        }

    },

    saveModel: function (e) {

        e.preventDefault();
        var self = this;
        var name = $("#office_name").val();
        var id = $("#office_id").val();
        var officeDetails = {name: name, id: id};
        var office = new App.Models.Office;
        var officeRouter = new App.Routers.Office;
        var officeEditView = new App.Views.Office_edit;

        office.on('error', function (office, errors) {
            officeEditView.showErrors(errors);
        });

        office.save(officeDetails, {
            success: function () {
                officeEditView.navigate(officeRouter);
            }
        });

    },

    navigate: function (officeRouter) {
        officeRouter.navigate('offices', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});

App.Views.Office_delete = Backbone.View.extend({

    deleteOffice: function (options) {
        var office = new App.Models.Office({id: options.id});
        var officeRouter = new App.Routers.Office;
        office.destroy({
            success: function () {
                officeRouter.navigate('offices', {trigger: true});
            }
        })
    }

});
