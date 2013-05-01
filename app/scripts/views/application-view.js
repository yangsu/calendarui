forma.Views.ApplicationView = Backbone.View.extend({
  initialize: function () {
    this.calendar = new forma.Views.TableView({
      el: '#calendar',
      model: this.genMonth()
    }).render();

    this.$el.append(this.calendar.$el);

    this.model.on('change', this.render, this);
  },
  genMonth: function() {
    var moment = this.model.get('moment');
    return this.days(moment.year(), moment.month());
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
    'click #next': 'onNext',
    'click #today': 'onToday'
  },
  onPrevious: function (e) {
    this.model.get('moment').subtract('months', 1);
    this.model.trigger('change');
  },
  onNext: function (e) {
    this.model.get('moment').add('months', 1);
    this.model.trigger('change');
  },
  onToday: function (e) {
    this.model.set('moment', moment());
    this.model.trigger('change');
  },
  render: function () {
    this.calendar.setMonthData(this.genMonth());
    var moment = this.model.get('moment');
    this.$el
      .find('#year').html(moment.year()).end()
      .find('#month').html(moment.format('MMMM')).end()
    return this;
  }
});
