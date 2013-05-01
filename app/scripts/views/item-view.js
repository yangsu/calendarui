forma.Views.ItemView = Backbone.View.extend({

  tagName: 'li',
  template: forma.template('item'),
  initialize: function (data) {
  },
  events: {
    // 'click': 'onClick',
  },
  onClick: function(e) {
    this.$('.popover').popover('show');
  },
  render: function () {
    this.$el.html(this.template(_.extend(this.model.toReadable(), {
      cid: this.model.cid
    })));
    this.$( ".draggable" ).draggable({
      // revert: true,
      snap: '.events'
    });
    return this;
  }
});
