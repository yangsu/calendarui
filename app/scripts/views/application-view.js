forma.Views.applicationView = Backbone.View.extend({
  initialize: function () {
    console.log(this.days(2013, 1));
  },
  monthToDay: {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  },
  days: function (year, month) {
    var numdays = (year % 4 == 0 && month == 2) ? 29 : this.monthToDay[month];
    var days = _.range(1, numdays + 1);
    return _.map(days, function(day) {
      return new Date([year, month, day]);
    });
  },
  render: function () {
    // this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
