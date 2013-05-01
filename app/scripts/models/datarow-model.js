forma.Models.DataRowModel = Backbone.Model.extend({
  toReadable: function() {
    return _.reduce(this.toJSON(), function(memo, value, key) {
      memo[forma.idToColumn[key].name] = value;
      return memo;
    }, {});
  }
});
