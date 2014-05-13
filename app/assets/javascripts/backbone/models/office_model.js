App.Models.Office = Backbone.Model.extend({

    urlRoot: '/offices',

    defaults: {
        name: ''
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.name) {
            errors.office_name_error = 'Office must have a name';
        }

        if(!$.isEmptyObject(errors) ) {
            return errors;
        }
    }

});