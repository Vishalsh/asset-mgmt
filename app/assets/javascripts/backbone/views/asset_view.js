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

    asset: null,

    initialize: function () {
        $(this.el).undelegate('.asset-form', 'submit');
        $(this.el).undelegate('#asset_asset_type', 'appendFieldsForAssetProperties');
    },

    events: {
        'submit .asset-form': 'saveAsset'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var assetModel = new App.Models.Asset();
            assetModel.url = '/assets/' + options.id + '/edit';
            assetModel.fetch({
                success: function (fetchedAsset) {
                    self.asset = fetchedAsset;
                    var template = _.template($("#asset_new").html(), {asset: self.asset, list: '', add_new: '', type: 'assets'});
                    self.$el.html(template);
                    self.applyPlugins();
                }
            });
        }
        else {
            var template = _.template($("#asset_new").html(), {asset: null, list: '', add_new: 'active', type: 'assets'});
            this.$el.html(template);
            self.applyPlugins();
        }


    },

    applyPlugins:  function() {
      this.applyDatepicker();
      this.applySelectBox();
    },

    applyDatepicker: function () {
        setTimeout(function () {
            $("#asset_purchased_date").datepicker().on('changeDate', function () {
                $(this).datepicker('hide');
            });
        }, 500)
    },

    applySelectBox: function () {
        var self = this;
        var element = $("#asset_asset_type");
        $("#asset_warranty").chosen({no_results_text: "Oops, nothing found!"});
        element.chosen({no_results_text: "Oops, nothing found!"});
        self.getAssetTypes();
    },

    getAssetTypes:  function() {
      var self = this;
      var assetTypeModel = new App.Models.Asset_type();
      $.when(assetTypeModel.getAssetTypes()).then(function(asset_types) {
        self.appendOptions(asset_types);
      });
    },

    appendOptions: function (assetTypes) {
      var self = this;
      var element = $("#asset_asset_type");
      $.each(assetTypes, function (key, assetType) {
        element.append('<option value=' + assetType.name + '>' + assetType.name + '</option>');
      });
      element.trigger("chosen:updated");
      element.change(function() {
        self.appendFieldsForAssetProperties(assetTypes);
      });

      if (!$.isEmptyObject(self.asset)) {
        self.setDefaultValuesForSelectBoxes(assetTypes)
      }
    },

    setDefaultValuesForSelectBoxes: function(assetTypes) {
      var self = this;
      var name = self.extractAssetType(assetTypes, self.asset);
      $("#asset_warranty").val(self.asset.get('warranty')).trigger('chosen:updated');
      $("#asset_asset_type").val(name).trigger('chosen:updated');
      self.appendFieldsForAssetProperties(assetTypes);
    },

    extractAssetType: function(assetTypes, asset) {
      var name;
      $.each(assetTypes, function(key, assetType) {
        if(assetType._id.$oid == asset.get('asset_type_id').$oid) {
          name = assetType.name;
        }
      });
      return name;
    },

    getAssetTypeProperties: function (assetTypes, selectedValue) {
        return (_.findWhere(assetTypes, {name: selectedValue})).properties
    },

    appendFieldsForAssetProperties: function (assetTypes) {
      var self = this;
      var asset_properties = $(".asset-properties");
      asset_properties.children().remove();
      var selectedValue = $("#asset_asset_type").val();
      var assetProperties = self.getAssetTypeProperties(assetTypes, selectedValue);

      $.each(assetProperties, function (key, property) {
          var propertyValue = self.asset ? self.asset.get('properties')[property] : '';
          appendingElement = '<div class="form-group">' +
              '<label class="control-label col-md-2">' + property + '<sup>*</sup></label>' +
              '<div class="col-md-6">' +
              '<input type="text" class="form-control" name=' + property + ' id=asset_' + property + ' value=' + propertyValue + '>' +
              '</div>' +
              '<div id="asset_' + property + '_error" class="error">' + '</div>' +
              '</div>';

        asset_properties.append(appendingElement);
      })
    },


    saveAsset: function (e) {

        e.preventDefault();
        var self = this;
        var asset = new App.Models.Asset;
        var assetRouter = new App.Routers.Asset;
        var id = $("#asset_id").val();
        var assetDetails = $.extend(self.serializeObject(), {id: id});
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
