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
    },

    events: {
        'submit .asset-type-form': 'saveAssetType'
    },


    saveAssetType: function (e) {

        e.preventDefault();
        var name = $("#asset_type_name").val();
        var image_path = $("#asset_type_image_path").val();
        var properties = $("#asset_type_properties").val().split(",");
        var assetTypeDetails = {name: name, image_path: image_path, properties: properties};
        var assetType = new App.Models.Asset_type;
        var assetTypeRouter = new App.Routers.Asset_type;
        var assetTypeNewView = new App.Views.Asset_type_new;

        assetType.on('error', function (model, errors) {
            assetTypeNewView.showErrors(errors);
        });

        assetType.save(assetTypeDetails, {

            success: function () {
                assetTypeNewView.navigate(assetTypeRouter);
            }
        });
    },

    navigate: function (assetTypeRouter) {
        assetTypeRouter.navigate('asset_types', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }


});


