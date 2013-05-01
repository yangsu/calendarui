forma.Views.rowView = Backbone.View.extend({

  tagName: 'tr',
  initialize: function (data) {
    this.cells = _.map(this.model, function (day) {
      return new forma.Views.cellView({
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
        if (row[i])
          cell.model.set('date', row[i]);
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
