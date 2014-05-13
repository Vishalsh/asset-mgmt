App.Views.Admin = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var admins = new App.Collections.Admin;
        admins.fetch({
            success: function (admins) {
                var template = _.template($('#admin_list').html(), {admins: admins.models, list: 'active', add_new: '', type: 'admins'});
                self.$el.html(template);
            }
        });
    }
});

App.Views.Admin_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.admin-form', 'submit');
    },

    events: {
        'submit .admin-form': 'saveAdmin'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var admin = new App.Models.Admin();
            admin.url = '/admins/' + options.id + '/edit';
            admin.fetch({
                success: function (admin) {
                    var template = _.template($("#admin_new").html(), {admin: admin, list: '', add_new: '', type: 'admins'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#admin_new").html(), {admin: null, list: '', add_new: 'active', type: 'admins'})
            this.$el.html(template);
        }

    },

    saveAdmin: function (e) {

        e.preventDefault();
        var self = this;
        var ad_id = $("#admin_ad_id").val();
        var name = $("#admin_name").val();
        var id = $("#admin_id").val();
        var adminDetails = {ad_id: ad_id, name: name, id: id};
        var admin = new App.Models.Admin;
        var adminRouter = new App.Routers.Admin;
        var adminEditView = new App.Views.Admin_edit;

        admin.on('error', function (model, errors) {
            adminEditView.showErrors(errors);
        });

        admin.save(adminDetails, {
            success: function () {
                adminEditView.navigate(adminRouter);
            }
        });

    },

    navigate: function (adminRouter) {
        adminRouter.navigate('admins', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});

App.Views.Admin_delete = Backbone.View.extend({

    deleteAdmin: function (options) {
        var admin = new App.Models.Admin({id: options.id});
        var adminRouter = new App.Routers.Admin;
        admin.destroy({
            success: function () {
                adminRouter.navigate('admins', {trigger: true});
            }
        })
    }

});

