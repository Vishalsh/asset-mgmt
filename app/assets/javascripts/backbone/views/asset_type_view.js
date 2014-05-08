App.Views.Asset_type_list = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var asset_types = new App.Collections.Asset_type;
        asset_types.fetch({
            success: function (asset_types) {
                var template = _.template($('#asset_type_list').html(), {asset_types: asset_types.models, list_assets: 'active', new_asset: ''});
                self.$el.html(template);
            }
        });
    }
});


App.Views.Asset_type_new = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var template = _.template($("#asset_type_new").html(), { list_assets: '', new_asset: 'active'})
        this.$el.html(template);
    }
});


