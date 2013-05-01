forma.Views.CellView = Backbone.View.extend({

  template: forma.template('cell'),
  tagName: 'td',
  initialize: function (data) {
    this.model
      .on('change', this.render, this)
      .on('change:data', this.onSetData, this);
    this.items = [];

  },
  onSetData: function() {
    _.each(this.items, function(itemView) {
      itemView.$el.remove();
      itemView.undelegateEvents();
    });

    this.items = _.map(this.model.get('data'), function(item) {
      return new forma.Views.ItemView({
        model: item
      }).render();
    });

    var els = _.map(this.items, function(i) { return i.$el; });

    this.$('.events').append(els);
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    _.each(this.items, function (item) {
      item.render();
    });

    return this;
  }
});
