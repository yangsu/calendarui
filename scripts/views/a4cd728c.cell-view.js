forma.Views.CellView = Backbone.View.extend({

  template: forma.template('cell'),
  tagName: 'td',
  initialize: function(data) {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.droppable();
    this.onSetDate();

    this.model
      .on('change', this.render, this)
      .on('change:date', this.onSetDate, this)
      .on('change:data', this.onSetData, this);

    this.items = [];

  },
  events: {
    drop: 'onDrop',
    click: 'onClick'
  },
  onClick: function(e) {
    console.log(e);
  },
  onDrop: function(e) {
    var cid = $(e.srcElement).data('cid');
    var date = this.model.get('date');
    forma.updateItem(cid, date);
  },
  onSetDate: function() {
    this.$('p > strong').html(this.model.get('date').format('MM-DD'));
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

    this.$('.events').append(_.pluck(this.items, '$el'));
  },
  render: function() {
    _.invoke(this.items, 'render');
    return this;
  }
});
