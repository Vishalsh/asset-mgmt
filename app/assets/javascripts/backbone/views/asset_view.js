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
        var asset = null;

        if (options.id) {
            var assetModel = new App.Models.Asset();
            assetModel.url = '/assets/' + options.id + '/edit';
            assetModel.fetch({
                success: function (fetchedAsset) {
                    asset = fetchedAsset;
                    var template = _.template($("#asset_new").html(), {asset: asset, list: '', add_new: '', type: 'assets'});
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#asset_new").html(), {asset: asset, list: '', add_new: 'active', type: 'assets'});
            this.$el.html(template);
        }

        $.when(self.getAssetTypes()).then(
            function (asset_types) {
                $.each(asset_types, function (i, asset) {
                    asset['id'] = asset['_id'];
                });

                self.applySelectBox(asset_types, asset);
            }
        );
        self.applyDatepicker();
    },

    applyDatepicker: function () {
        setTimeout(function () {
            $("#asset_purchased_date").datepicker().on('changeDate', function () {
                $(this).datepicker('hide');
            });
        }, 500)
    },

    applySelectBox: function (assetTypes, asset) {
        var self = this;
        $("#asset_warranty").select2();
        $("#asset_asset_type").select2({
            data: { results: assetTypes, text: 'name' },
            formatSelection: format,
            formatResult: format
        }).on('change', function () {
                var selectedValue = $(this).select2('data').name;
                var selectedAssetProperties = self.getAssetTypeProperties(assetTypes, selectedValue);
                self.appendFieldsForAssetProperties(selectedAssetProperties, asset);
            });
        function format(item) {
            return item.name;
        }

        if (asset) {
            var selectedValue = $("#asset_asset_type").select2('data').name;
            var selectedAssetProperties = self.getAssetTypeProperties(assetTypes, selectedValue);
            self.appendFieldsForAssetProperties(selectedAssetProperties, asset);
        }
    },


    getAssetTypeProperties: function (assetTypes, selectedValue) {
        return (_.findWhere(assetTypes, {name: selectedValue})).properties
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


    appendFieldsForAssetProperties: function (assetProperties, asset) {

        $.each(assetProperties, function (key, property) {
            var propertyValue = asset ? asset.get('properties')[property] : '';
            appendingElement = '<div class="form-group">' +
                '<label class="control-label col-md-2">' + property + '<sup>*</sup></label>' +
                '<div class="col-md-6">' +
                '<input type="text" class="form-control" name=' + property + ' id=asset_' + property + ' value=' + propertyValue + '>' +
                '</div>' +
                '<div id="asset_' + property + '_error" class="error">' + '</div>' +
                '</div>';

            $(".asset-properties").append(appendingElement)
        })
    },


    saveAsset: function (e) {

        e.preventDefault();
        var self = this;
        var asset = new App.Models.Asset;
        var assetRouter = new App.Routers.Asset;
        var assetDetails = self.serializeObject();
        var asset_Type = $("#asset_asset_type").select2('data')
        assetDetails["asset_type"] = asset_Type ? asset_Type.name : '';

        asset.on('error', function (model, errors) {
            self.showErrors(errors);
        });

        asset.save(assetDetails, {
            success: function () {
                self.navigate(assetRouter);
            }
        });
    },

    serializeObject: function () {
        var o = {};
        var a = $('.asset-form').serializeArray();
        $.each(a, function () {
            if (o[this.id]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
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
