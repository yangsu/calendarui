forma.Views.CellView = Backbone.View.extend({

  template: forma.template('cell'),
  tagName: 'td',
  initialize: function (data) {
    this.model
      .on('change', this.render, this);
  },
  render: function () {
    // console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
