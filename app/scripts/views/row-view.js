forma.Views.RowView = Backbone.View.extend({

  tagName: 'tr',
  initialize: function(data) {
    this.cells = _.map(this.model, function(day) {
      return new forma.Views.CellView({
        model: new Backbone.Model({
          date: day
        })
      }).render();
    });

    this.$el.append(_.pluck(this.cells, '$el'));
  },
  setRowData: function(row) {
    if (row) {
      _.each(this.cells, function(cell, i) {
        var date = row[i];
        var dateStr = forma.dateKeyString(date);
        var data = forma.dateToRow[dateStr];
        cell.model.set({
          date: date,
          data: data
        });
      });
    }
  },
  render: function() {
    _.invoke(this.cells, 'render');
    return this;
  }
});
