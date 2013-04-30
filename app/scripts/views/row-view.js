forma.Views.rowView = Backbone.View.extend({

  tagName: 'tr',
  initialize: function (data) {
    this.cells = _.map(this.model, function (day) {
      return new forma.Views.cellView({
        date: day
      }).render();
    });

    this.$el.children().remove().end()
      .append(_.map(this.cells, function(r) { return r.$el; }));
  },
  render: function () {
    var that = this;
    _.each(this.cells, function (cell) {
      cell.render();
    });
    return this;
  }
});
