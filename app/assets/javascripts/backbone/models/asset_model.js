App.Models.Asset = Backbone.Model.extend({

    urlRoot: '/assets',

    defaults: {
        invoice_number: '',
        serial_number: '',
        purchased_date: '',
        mac_address: '',
        warranty: ''
    },

    validate: function (attributes) {

        var errors = {};

        for (var key in attributes) {

            if (!attributes[key]) {

                errors['asset_' + key + '_error'] = 'Asset must have a ' + key;
            }
        }

        if (!$.isEmptyObject(errors)) {
            return errors;
        }
    }

});