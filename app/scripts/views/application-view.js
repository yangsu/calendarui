forma.Views.applicationView = Backbone.View.extend({
  initialize: function () {
    this.moment = moment();

    this.calendar = new forma.Views.tableView({
      el: '#calendar',
      model: this.genMonth()
    }).render();

    this.$el.append(this.calendar.$el);
  },
  genMonth: function() {
    return this.days(this.moment.year(), this.moment.month());
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
      return moment(new Date([year, month, day]));
    });
  },
  events: {
    'click #prev': 'onPrevious',
    'click #next': 'onNext'
  },
  onPrevious: function (e) {
    this.moment.subtract('months', 1);
    this.calendar.setMonthData(this.genMonth());
    this.render();
  },
  onNext: function (e) {
    this.moment.add('months', 1);
    this.calendar.setMonthData(this.genMonth());
    this.render();
  },
  render: function () {
    this.$el
      .find('#year').html(this.moment.year()).end()
      .find('#month').html(this.moment.format('MMMM')).end()
    return this;
  }
});
