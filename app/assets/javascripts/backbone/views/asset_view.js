App.Views.Asset = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var assets = new App.Collections.Asset;
        assets.fetch({
            success: function (assets) {
                var template = _.template($('#asset_list').html(), {assets: assets.models, list: 'active', add_new: '', type: 'assets'});
                self.$el.html(template);
            }
        });
    }
});


App.Views.Asset_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.asset-form', 'submit');
    },

    events: {
        'submit .asset-form': 'saveAsset'
    },

    render: function (options) {

        var self = this;
        var assetEditView = new App.Views.Asset_edit;
        var assetTypes;

        $.when(assetEditView.getAssetTypes()).then(
            function (asset_types) {
                $.each(asset_types, function (i, asset) {
                    asset['id'] = asset['_id'];
                });

                assetEditView.applySelectBox(asset_types);
            }
        );

        if (options.id) {
            var asset = new App.Models.Asset();
            asset.url = '/assets/' + options.id + '/edit';
            asset.fetch({
                success: function (asset) {
                    var template = _.template($("#asset_new").html(), {asset: asset, list: '', add_new: '', type: 'assets'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#asset_new").html(), {asset: null, list: '', add_new: 'active', type: 'assets'})
            this.$el.html(template);
        }
        assetEditView.applyDatepicker();
    },

    applyDatepicker: function () {
        setTimeout(function () {
            $("#asset_purchased_date").datepicker().on('changeDate', function () {
                $(this).datepicker('hide');
            });
        }, 500)
    },

    applySelectBox: function (assetTypes) {
        $("#asset_warranty").select2();
        $("#asset_asset_type").select2({
            data: { results: assetTypes, text: 'name' },
            formatSelection: format,
            formatResult: format
        });
        function format(item) {
            return item.name;
        }
    },

    getAssetTypes: function () {

        var deferred = $.Deferred();
        $.ajax({
            url: '/asset_types',
            type: 'GET',
            dataType: 'json',
            success: function (asset_types) {
                deferred.resolve(asset_types);
            }
        });
        return deferred.promise();
    },

    saveAsset: function (e) {

        e.preventDefault();
        var self = this;
        var invoice_number = $("#asset_invoice_number").val();
        var serial_number = $("#asset_serial_number").val();
        var purchased_date = $("#asset_purchased_date").val();
        var mac_address = $("#asset_mac_address").val();
        var warranty = $("#asset_warranty").val();
        var id = $("#asset_id").val();
        var assetDetails = {invoice_number: invoice_number, serial_number: serial_number, purchased_date: purchased_date,
            mac_address: mac_address, warranty: warranty, id: id};
        var asset = new App.Models.Asset;
        var assetRouter = new App.Routers.Asset;
        var assetEditView = new App.Views.Asset_edit;

        asset.on('error', function (model, errors) {
            assetEditView.showErrors(errors);
        });

        asset.save(assetDetails, {
            success: function () {
                assetEditView.navigate(assetRouter);
            }
        });

    },

    navigate: function (assetRouter) {
        assetRouter.navigate('assets', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});


App.Views.Asset_delete = Backbone.View.extend({


    deleteAssetType: function (options) {
        var asset = new App.Models.Asset({id: options.id});
        var assetRouter = new App.Routers.Asset;
        asset.destroy({
            success: function () {
                assetRouter.navigate('assets', {trigger: true});
            }
        })
    }

});
