
window.forma = {
  Models: {},
  Views: {},
  Templates: {},
  dateKeyString: function(date) {
    return date.format('MM-DD-YY');
  },
  changeColumnId: function(columnId) {
    forma.currentColumnId = columnId;
    forma.dateToRow = forma.columnToDateToRow[columnId];
  },
  updateItem: function(cid, newDate) {
    var model = forma.cidToModel[cid];
    if (!model) return;
    var dateStr = forma.dateKeyString(newDate);
    var dateToRow = forma.dateToRow;

    _.each(dateToRow, function(models, date) {
      dateToRow[date] = _.without(models, model);
    });

    dateToRow[dateStr] = dateToRow[dateStr] || [];
    dateToRow[dateStr].push(model);

    var oldDate = model.get(forma.currentColumnId);
    var updatedStr = oldDate.replace(/\d+\/\d+\/\d+/, newDate.format('MM/DD/YY'));
    model.set(forma.currentColumnId, updatedStr);

    forma.main.render();
  },
  deleteItem: function(model) {
    _.each(forma.columnToDateToRow, function(dateToRow) {
      _.each(dateToRow, function(models, date) {
        dateToRow[date] = _.without(models, model);
      });
    });
    model.destroy();
    forma.main.render();
  },
  init: function() {
    forma.columnToDateToRow = {};
    var dateColumns = {};

    forma.idToColumn = _.reduce(data.columns, function(memo, column) {
      memo[column.id] = column;
      if (column.type == 'date') {
        dateColumns[column.id] = column.name;
        forma.columnToDateToRow[column.id] = {};
      }
      return memo;
    }, {});

    forma.cidToModel = _.reduce(data.rows, function(memo, row) {
      var model = new forma.Models.DataRowModel(row);
      memo[model.cid] = model;
      return memo;
    }, {});

    var columnIds = _.keys(dateColumns);
    _.each(forma.cidToModel, function(model) {
      var row = model.toJSON();
      _.each(columnIds, function(columnId) {
        var date = row[columnId];
        var dateToRow = forma.columnToDateToRow[columnId];

        if (date.indexOf(' ') > 0) {
          date = moment(date, 'MM/DD/YY hh:mma');
        } else {
          date = moment(date);
        }
        var dateStr = forma.dateKeyString(date);
        dateToRow[dateStr] = dateToRow[dateStr] || [];
        dateToRow[dateStr].push(model);
      });
    });

    forma.changeColumnId(columnIds[0]);

    forma.main = new forma.Views.ApplicationView({
      el: '#main',
      model: new Backbone.Model({
        moment: moment()
      })
    }).render();

    $('#option').html(forma.template('select')({
      options: dateColumns
    }));

    $('#createModal .modal-body').html(forma.template('create')({
      options: dateColumns
    }));
  },
  template: function(templateName) {
    return JST[templateName];
  }
};

$(document).ready(function() {
  forma.init();
});
