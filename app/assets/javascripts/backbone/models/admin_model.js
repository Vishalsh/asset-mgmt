App.Models.Admin = Backbone.Model.extend({

    urlRoot: '/admins',

    defaults: {
        ad_id: '',
        name: ''
    },

    getNames: function () {

        var defer = $.Deferred();
        this.url = '/admins/names';

        $.get(this.url, function (names) {
            defer.resolve(names)
        });

        return defer.promise();
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.ad_id) {
            errors.admin_ad_id_error = 'Admin must have an ad id';
        }

        if (!attributes.name) {
            errors.admin_name_error = 'Admin must have a name';
        }

        if (!$.isEmptyObject(errors)) {
            return errors;
        }
    }

});