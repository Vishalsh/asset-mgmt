App.Models.Asset_type = Backbone.Model.extend({

    urlRoot: '/asset_types',

    defaults: {
        name: '',
        image_path: '',
        properties: []
    },

    validate: function (attributes) {

        var errors = {};

        if (!attributes.name) {
            errors.asset_type_name_error = 'Asset type must have a name';
        }

        if (!attributes.image_path) {
            errors.asset_type_image_path_error = 'Asset type must have a image path';
        }

        if (!attributes.properties.toString()) {
            errors.asset_type_properties_error = 'Asset type must have a property';
        }

        if(!$.isEmptyObject(errors) ) {
            return errors;
        }
    }

});