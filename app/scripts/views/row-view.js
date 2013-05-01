forma.Views.RowView = Backbone.View.extend({

  tagName: 'tr',
  initialize: function (data) {
    this.cells = _.map(this.model, function (day) {
      return new forma.Views.CellView({
        model: new Backbone.Model({
          date: day
        })
      }).render();
    });

    this.$el.children().remove().end()
      .append(_.map(this.cells, function(r) { return r.$el; }));
  },
  setRowData: function(row) {
    if (row) {
      _.each(this.cells, function(cell, i) {
        var date = row[i];
        var dateStr = date.format('MM-DD-YY');
        var data = forma.dateToData[dateStr];
        cell.model.set({
          date: date,
          data: data
        });
      });
    }
  },
  render: function () {
    var that = this;
    _.each(this.cells, function (cell) {
      cell.render();
    });
    return this;
  }
});
