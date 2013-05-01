forma.Views.ItemView = Backbone.View.extend({

  tagName: 'li',
  template: forma.template('item'),
  initialize: function (data) {
  },
  events: {
    'click': 'onClick',
  },
  shown: false,
  onClick: function(e) {
    this.shown = !this.shown;
    if (this.shown) {
      this.$('.popover').html(forma.template('popover')(this.model.toReadable()))
    }
    this.$('.label').popover(this.shown ? 'show': 'hide');
  },
  render: function () {
    var ctx = _.extend(this.model.toReadable(), {
      cid: this.model.cid
    });
    this.$el.html(this.template(ctx));
    this.$( ".draggable" ).draggable({
      // revert: true,
      snap: '.events'
    });
    this.$('.label').popover({
      title: ctx.Name,
      html: true,
      placement: 'bottom'
    });
    return this;
  }
});
