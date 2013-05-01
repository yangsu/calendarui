
window.forma = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  changeDataKey: function(key) {
    forma.currentDataKey = key;
    forma.dateToData = forma.rows[key];
  },
  updateItem: function(cid, newDate) {
    var model = forma.cidToModel[cid];
    if (!model) return;
    var dateStr = newDate.format('MM-DD-YY');
    var rows = forma.dateToData;
    _.each(rows, function(models, date) {
      rows[date] = _.without(models, model);
    });
    rows[dateStr] = rows[dateStr] || [];
    rows[dateStr].push(model);

    var oldDate = model.get(forma.currentDataKey);
    model.set(forma.currentDataKey, oldDate.replace(/\d+\/\d+\/\d+/, newDate.format('MM/DD/YY')));

    forma.main.render();

  },
  deleteItem: function(model) {
    _.each(forma.rows, function(rows) {
      _.each(rows, function(models, date) {
        rows[date] = _.without(models, model);
      });
    });
    model.destroy();
    forma.main.render();

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

    $('#createModal .modal-body').html(forma.template('create')({
      options: forma.dateOptions
    }));

    forma.cidToModel = {};

    forma.data = _.map(data.rows, function(row) {
      var model = new forma.Models.RowModel(row);
      forma.cidToModel[model.cid] = model;
      return model;
    });

    _.each(forma.data, function(model) {
      var item = model.toJSON();

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

    forma.main = main;

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
