App.Models.Company = Backbone.Model.extend({

    urlRoot: '/companies',

    defaults: {
        name: ''
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.name) {
            errors.company_name_error = 'Company must have a name';
        }

        if(!$.isEmptyObject(errors) ) {
            return errors;
        }
    }

});