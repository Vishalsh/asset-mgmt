App.Models.Model = Backbone.Model.extend({

    urlRoot: '/models',

    defaults: {
        name: ''
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.name) {
            errors.model_name_error = 'Model must have a name';
        }

        if(!$.isEmptyObject(errors) ) {
            return errors;
        }
    }

});