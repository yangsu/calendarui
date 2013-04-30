forma.Views.tableView = Backbone.View.extend({

  template: forma.template('table'),
  initialize: function () {
    this.$el.html(this.template());
  },
  setMonthData: function (month) {
    this.month = month;
    var rows = _.chain(month)
      .groupBy(function (day) {
        return day.week();
      }).map(function (days, week) {
        return new forma.Views.rowView({
          model: days
        }).render();
      }).value();

    var childrenEls = _.map(rows, function(r) { return r.$el; });

    this.$('tbody').children().remove().end()
      .append(childrenEls);

    this.rows = rows;
    return this;
  },
  render: function () {
    var that = this;
    _.each(this.rows, function (row) {
      row.render();
    });
    return this;
  }

});
