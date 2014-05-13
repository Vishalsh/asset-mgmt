App.Views.Asset_type_list = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var asset_types = new App.Collections.Asset_type;
        asset_types.fetch({
            success: function (asset_types) {
                var template = _.template($('#asset_type_list').html(), {asset_types: asset_types.models, list: 'active', add_new: '', type: 'asset_types'});
                self.$el.html(template);
            }
        });
    }
});


App.Views.Asset_type_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.asset-type-form', 'submit');
    },

    events: {
        'submit .asset-type-form': 'saveAssetType'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var asset_type = new App.Models.Asset_type();
            asset_type.url = '/asset_types/' + options.id + '/edit';
            asset_type.fetch({
                success: function (asset_type) {
                    var template = _.template($("#asset_type_new").html(), {asset_type: asset_type, list: '', add_new: '', type: 'asset_types'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#asset_type_new").html(), {asset_type: null, list: '', add_new: 'active', type: 'asset_types'})
            this.$el.html(template);
        }

    },

    saveAssetType: function (e) {

        e.preventDefault();
        var self = this;
        var name = $("#asset_type_name").val();
        var image_path = $("#asset_type_image_path").val();
        var properties = $("#asset_type_properties").val().split(",");
        var id = $("#asset_type_id").val();
        var assetTypeDetails = {name: name, image_path: image_path, properties: properties, id: id};
        var assetType = new App.Models.Asset_type;
        var assetTypeRouter = new App.Routers.Asset_type;
        var assetTypeEditView = new App.Views.Asset_type_edit;

        assetType.on('error', function (model, errors) {
            assetTypeEditView.showErrors(errors);
        });

        assetType.save(assetTypeDetails, {
            success: function () {
                assetTypeEditView.navigate(assetTypeRouter);
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


App.Views.Asset_type_delete = Backbone.View.extend({


    deleteAssetType: function (options) {
        var asset_type = new App.Models.Asset_type({id: options.id});
        var assetTypeRouter = new App.Routers.Asset_type;
        asset_type.destroy({
            success: function () {
                assetTypeRouter.navigate('asset_types', {trigger: true});
            }
        })
    }

});
