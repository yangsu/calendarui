forma.Models.RowModel = Backbone.Model.extend({
  initialize: function() {
    // console.log(this.toReadable());
  },
  toReadable: function() {
    return _.reduce(this.toJSON(), function(memo, value, key) {
      memo[forma.idToColumn[key].name] = value;
      return memo;
    }, {});
  }
});
