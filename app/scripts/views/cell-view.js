forma.Views.cellView = Backbone.View.extend({

  template: forma.template('cell'),
  initialize: function () {
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
