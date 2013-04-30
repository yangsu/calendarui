
window.forma = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');

    var main = new forma.Views.applicationView({
      id: '#calendar'
    });
    main.render();
  },
  template: function(templateName) {
    var path = '/javascripts/templates/' + templateName + '.html';

    return (function(context) {
      if (!forma.Templates[path]) {

        $.ajax({
          url: path,
          async: false
        }).then(function(contents) {
          return forma.Templates[path] = _.template(contents);
        });
      }
      return forma.Templates[path](context);
    });
  }
};

$(document).ready(function(){
  forma.init();
});