App.Views.Asset_type = Backbone.View.extend({

    el: '.page',

    render: function () {
        var self = this;
        var asset_types = new App.Collections.Asset_type;
        asset_types.fetch({
            success: function (asset_types) {
                var template = _.template($('#asset_type_list').html(),{asset_types: asset_types.models});
                self.$el.html(template);
            }
        })
    }
});

var asset_type_view = new App.Views.Asset_type;
