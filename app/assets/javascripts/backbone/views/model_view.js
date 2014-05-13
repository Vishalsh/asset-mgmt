App.Views.Model = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var models = new App.Collections.Model;
        models.fetch({
            success: function (models) {
                var template = _.template($('#model_list').html(), {models: models.models, list: 'active', add_new: '', type: 'models'});
                self.$el.html(template);
            }
        });
    }

});

App.Views.Model_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.model-form', 'submit');
    },

    events: {
        'submit .model-form': 'saveModel'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var model = new App.Models.Model();
            model.url = '/models/' + options.id + '/edit';
            model.fetch({
                success: function (model) {
                    var template = _.template($("#model_new").html(), {model: model, list: '', add_new: '', type: 'models'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#model_new").html(), {model: null, list: '', add_new: 'active', type: 'models'})
            this.$el.html(template);
        }

    },

    saveModel: function (e) {

        e.preventDefault();
        var self = this;
        var name = $("#model_name").val();
        var id = $("#model_id").val();
        var modelDetails = {name: name, id: id};
        var model = new App.Models.Model;
        var modelRouter = new App.Routers.Model;
        var modelEditView = new App.Views.Model_edit;

        model.on('error', function (model, errors) {
            modelEditView.showErrors(errors);
        });

        model.save(modelDetails, {
            success: function () {
                modelEditView.navigate(modelRouter);
            }
        });

    },

    navigate: function (modelRouter) {
        modelRouter.navigate('models', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});

App.Views.Model_delete = Backbone.View.extend({

    deleteModel: function (options) {
        var model = new App.Models.Model({id: options.id});
        var modelRouter = new App.Routers.Model;
        model.destroy({
            success: function () {
                modelRouter.navigate('models', {trigger: true});
            }
        })
    }

});
