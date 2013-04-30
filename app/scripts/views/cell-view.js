forma.Views.cellView = Backbone.View.extend({

  template: forma.template('cell'),
  tagName: 'td',
  initialize: function (data) {
    this.$el.html(this.template({
      date: data.date
    }));
  },
  render: function () {
    return this;
  }
});
