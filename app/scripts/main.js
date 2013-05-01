
window.forma = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  changeDataKey: function(key) {
    forma.dateToData = forma.rows[key];
  },
  init: function() {
    forma.dateOptions = {};
    forma.rows = {};

    forma.idToColumn = _.reduce(data.columns, function(memo, item) {
      memo[item.id] = item;
      if (item.type == 'date') {
        forma.dateOptions[item.id] = item.name;
        forma.rows[item.id] = {};
      }
      return memo;
    }, {});

    var dateKeys = _.keys(forma.dateOptions);

    $('#option').html(forma.template('select')({
      options: forma.dateOptions
    }));

    _.each(data.rows, function(item) {
      var model = new forma.Models.RowModel(item);

      _.each(dateKeys, function(key) {
        var date = item[key];
        var row = forma.rows[key];
        if (date.indexOf(' ') > 0) {
          date = moment(date, 'MM/DD/YY hh:mma');
        } else {
          date = moment(date);
        }
        var dateStr = date.format('MM-DD-YY');
        row[dateStr] = row[dateStr] || [];
        row[dateStr].push(model);
      });
    });

    forma.changeDataKey(dateKeys[0]);

    var main = new forma.Views.ApplicationView({
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
