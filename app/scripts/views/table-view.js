forma.Views.applicationView = Backbone.View.extend({

  template: forma.template('table'),
  initialize: function () {
    this.rows = [];
    this.$el.html(this.template(this.model.toJSON()));

  },
  render: function () {
    var that = this;
    _.each(this.rows, function (row) {
      row.render();
    });
    return this;
  }

});
