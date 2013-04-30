forma.Views.applicationView = Backbone.View.extend({
  initialize: function () {
    var date = moment();
    this.year = date.year();
    this.month = date.month();

    this.calendar = new forma.Views.tableView({
      el: '#calendar',
      model: this.genMonth()
    }).render();

    this.$el.append(this.calendar.$el);
  },
  genMonth: function() {
    return this.days(this.year, this.month);
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
  prevMonth: function() {
    if (this.month == 0) {
      this.year--;
    }
    this.month = (11 + this.month) % 12;
    // console.log(this.year, this.month);
  },
  nextMonth: function() {
    if (this.month == 11) {
      this.year++;
    }
    this.month = (this.month + 1) % 12;
    // console.log(this.year, this.month);
  },
  onPrevious: function (e) {
    this.prevMonth();
    this.calendar.setMonthData(this.genMonth());
  },
  onNext: function (e) {
    this.nextMonth();
    this.calendar.setMonthData(this.genMonth());
  },
  render: function () {
    // this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
