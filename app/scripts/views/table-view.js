forma.Views.TableView = Backbone.View.extend({

  template: forma.template('table'),
  initialize: function() {
    this.$el.html(this.template());

    this.rows = _.map(this.groupByWeek(this.model), function(days, week) {
      return new forma.Views.RowView({
        model: days
      }).render();
    });

    this.$('tbody').append(_.pluck(this.rows, '$el'));
  },
  groupByWeek: function(month) {
    var firstWeek = month[0].week();
    var returnVal = _.chain(month)
      .groupBy(function(day) {
          return day.week() - firstWeek;
        })
      .map(function(days, week, list) {
          var daysMissing = 7 - days.length;
          if (daysMissing) {
            var date = days[0];
            var day = date.day();
            if (day == 0) {
              date = days[days.length - 1];
              _.each(_.range(1, daysMissing + 1), function(offset) {
                days.push(moment(date).add('days', offset));
              });
            } else {
              _.each(_.range(1, daysMissing + 1), function(offset) {
                days.unshift(moment(date).subtract('days', offset));
              });
            }
          }
          return days;
        })
      .value();

    var lastWeek = returnVal[returnVal.length - 1];
    var lastDate = lastWeek[lastWeek.length - 1];

    if (returnVal.length < 6) {
      returnVal.push(_.map(_.range(1, 8), function(offset) {
        return moment(lastDate).add('days', offset);
      }));
    }

    return returnVal;
  },
  setMonthData: function(month) {
    var model = this.groupByWeek(month);

    _.each(this.rows, function(row, i) {
      row.setRowData(model[i]);
    });

    this.model = model;
    return this;
  },
  render: function() {
    _.invoke(this.rows, 'render');
    return this;
  }
});
