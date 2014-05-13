#= require_self
#= require_tree ./models
#= require_tree ./views
#= require_tree ./collections
#= require_tree ./routers

window.App =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}

$(document).ready ->
  new App.Routers.Admin
  new App.Routers.Asset;
  new App.Routers.Asset_type;
  new App.Routers.Company;
  new App.Routers.Model;

  Backbone.history.start()


  return