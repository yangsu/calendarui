forma.Views.CellView = Backbone.View.extend({

  template: forma.template('cell'),
  tagName: 'td',
  initialize: function (data) {
    this.model
      .on('change', this.render, this);
  },
  render: function () {
    var json = {
      date: this.model.get('date')
    };
    json.data = _.map(this.model.get('data'), function(d) {
      return d.toReadable();
    });
    this.$el.html(this.template(json));
    return this;
  }
});
