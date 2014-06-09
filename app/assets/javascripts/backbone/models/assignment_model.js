App.Models.Assignment = Backbone.Model.extend({

    urlRoot: '/assignments',

    defaults: {
        start_date: '',
        end_date: '',
        assigned_to: ''
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.start_date) {
            errors.assignment_start_date_error = 'Assignment must have a start date';
        }

        if (!attributes.end_date) {
            errors.assignment_end_date_error = 'Assignment must have a end date';
        }

        if (!attributes.assigned_to) {
            errors.assignment_assigned_to_error = 'Assignment must be assigned to someone';
        }

        if (!$.isEmptyObject(errors)) {
            return errors;
        }
    }

});