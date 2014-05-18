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

        if (!attributes.invoice_number) {
            errors.asset_invoice_number_error = 'Asset must have an invoice number';
        }

        if (!attributes.serial_number) {
            errors.asset_serial_number_error = 'Asset type must have a serial number';
        }

        if (!attributes.purchased_date) {
            errors.asset_purchased_date_error = 'Asset type must have a purchased date';
        }

        if (!attributes.mac_address) {
            errors.asset_mac_address_error = 'Asset type must have a mac address';
        }

        if (!attributes.warranty) {
            errors.asset_warranty_error = 'Asset type must have a warranty';
        }

        if(!$.isEmptyObject(errors) ) {
            return errors;
        }
    }

});