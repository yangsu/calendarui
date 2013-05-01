forma.Views.ItemView = Backbone.View.extend({

  tagName: 'li',
  template: forma.template('item'),
  initialize: function (data) {
    console.log(this.model.toReadable());
  },
  events: {
    'click': 'onClick'
  },
  onClick: function(e) {
    this.$('.popover').popover('show');
  },
  render: function () {
    this.$el.html(this.template(this.model.toReadable()));
    return this;
  }
});
