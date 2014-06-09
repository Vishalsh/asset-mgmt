App.Views.Assignment_list = Backbone.View.extend({

    el: '.page-content',

    render: function () {
        var self = this;
        var assignments = new App.Collections.Assignment;
        assignments.fetch({
            success: function (assignments) {
                var template = _.template($('#assignment_list').html(), {assignments: assignments.models, list: 'active', add_new: '', type: 'assignments'});
                self.$el.html(template);
            }
        });
    }

});

App.Views.Assignment_edit = Backbone.View.extend({

    el: '.page-content',

    initialize: function () {
        $(this.el).undelegate('.assignment-form', 'submit');
    },

    events: {
        'submit .assignment-form': 'saveAssignment'
    },

    render: function (options) {

        var self = this;

        if (options.id) {
            var assignment = new App.Models.Assignment();
            assignment.url = '/assignments/' + options.id + '/edit';
            assignment.fetch({
                success: function (assignment) {
                    var template = _.template($("#assignment_new").html(), {assignment: assignment, list: '', add_new: '', type: 'assignments'})
                    self.$el.html(template);
                }
            });
        }
        else {
            var template = _.template($("#assignment_new").html(), {assignment: null, list: '', add_new: 'active', type: 'assignments'})
            this.$el.html(template);
        }

        self.applyDatepicker();
    },

    applyDatepicker: function () {

        setTimeout(function () {
            $("#assignment_start_date").datepicker().on('changeDate', function () {
                $(this).datepicker('hide');
            });
            $("#assignment_end_date").datepicker().on('changeDate', function () {
                $(this).datepicker('hide');
            });

        }, 500)

    },

    saveAssignment: function (e) {

        e.preventDefault();
        var self = this;
        var start_date = $("#assignment_start_date").val();
        var end_date = $("#assignment_end_date").val();
        var assigned_to = $("#assignment_assigned_to").val();
        var id = $("#assignment_id").val();
        var assignmentDetails = {start_date: start_date, end_date: end_date, assigned_to: assigned_to, id: id};
        var assignment = new App.Models.Assignment;
        var assignmentRouter = new App.Routers.Assignment;
        var assignmentEditView = new App.Views.Assignment_edit;

        assignment.on('error', function (model, errors) {
            assignmentEditView.showErrors(errors);
        });

        assignment.save(assignmentDetails, {
            success: function () {
                assignmentEditView.navigate(assignmentRouter);
            }
        });

    },

    navigate: function (assignmentRouter) {
        assignmentRouter.navigate('assignments', {trigger: true})
    },

    showErrors: function (errors) {
        $(".error").text('');
        for (var error in errors) {
            $("#" + error).text(errors[error]);
        }
    }

});

App.Views.Assignment_delete = Backbone.View.extend({

    deleteAssignment: function (options) {
        var assignment = new App.Models.Assignment({id: options.id});
        var assignmentRouter = new App.Routers.Assignment;
        assignment.destroy({
            success: function () {
                assignmentRouter.navigate('assignments', {trigger: true});
            }
        })
    }

});
