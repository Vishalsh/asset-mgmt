App.Collections.Asset_type = Backbone.Collection.extend({

    model: App.Models.Asset_type,

    url: '/asset_types',

    parse: function (res) {
        return res.Asset_types.valid.response.asset_types;
    }
});