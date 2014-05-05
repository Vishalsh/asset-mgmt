App.Views.Admin = Backbone.View.extend({

    el: '.page',

    render: function () {
        this.$el.html("!Admin functionality here!")
    }
});

var admin_view = new App.Views.Admin;
