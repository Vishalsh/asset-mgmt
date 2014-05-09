App.Models.Asset_type = Backbone.Model.extend({
    defaults: {
        name: '',
        properties: ''
    },

    urlRoot: '/asset_types'
});