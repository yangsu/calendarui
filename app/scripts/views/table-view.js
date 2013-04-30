forma.Views.tableView = Backbone.View.extend({

  template: forma.template('table'),
  initialize: function () {
    this.rows = [];
    this.$el.html(this.template());
  },
  render: function () {
    var that = this;
    _.each(this.rows, function (row) {
      row.render();
    });
    return this;
  }

});
