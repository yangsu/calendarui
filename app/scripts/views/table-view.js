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
      })
      .each(function (days, week, list) {
        var daysMissing = 7 - days.length;
        if (daysMissing) {
          var date = days[0];
          var day = date.day();
          if (day == 0) {
            _.each(_.range(1, daysMissing + 1), function(offset) {
              days.push(moment(date).add('days', offset));
            });
          } else {
            _.each(_.range(1, daysMissing + 1), function(offset) {
              days.unshift(moment(date).subtract('days', offset));
            });
          }
        }
      })
      .map(function (days, week) {
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
