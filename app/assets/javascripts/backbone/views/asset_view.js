App.Views.Asset = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        this.$el.html("!Asset functionality here!")
    }
});

var asset_view = new App.Views.Asset;
