
window.forma = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  init: function() {
    forma.idToColumn = _.reduce(data.columns, function(memo, item) {
      memo[item.id] = item;
      return memo;
    }, {});

    var dateKey = 914737;
    dateKey = 52213;
    forma.dateToData = _.reduce(data.rows, function(memo, item) {
      var date = item[dateKey];
      if (date.indexOf(' ') > 0) {
        date = moment(date, 'MM/DD/YY hh:mma');
      } else {
        date = moment(date);
      }
      var dateStr = date.format('MM-DD-YY');
      memo[dateStr] = memo[dateStr] || [];
      memo[dateStr].push(item);
      return memo;
    }, {});

    var main = new forma.Views.applicationView({
      el: '#main',
      model: new Backbone.Model({
        moment: moment()
      })
    });
    main.render();

  },
  template: function(templateName) {
    var path = '/scripts/templates/' + templateName + '.html';

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
