forma.Views.rowView = Backbone.View.extend({

  template: forma.template('row'),
  initialize: function () {
    this.cells = [];
    this.$el.html(this.template(this.model.toJSON()));
  },
  render: function () {
    var that = this;
    _.each(this.cells, function (cell) {
      cell.render();
    });
    return this;
  }
});
