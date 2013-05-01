var data={};data.columns=[{name:"Name",type:"text",id:75723},{name:"Cell Number",type:"phoneNumber",id:113509},{name:"Profile Photo",type:"picture",id:9299},{name:"Interview Start Time",type:"date",id:48929},{name:"Interview End Time",type:"date",id:52213},{name:"Birthday",type:"date",id:914737},{name:"Application Submission Date",type:"date",id:13221}],data.rows=[{75723:"John Doe",113509:"3214231175",9299:{large:"https://graph.facebook.com/howietl/picture?type=large",small:"https://graph.facebook.com/howietl/picture?type=small"},48929:"5/4/13 3:00PM",52213:"5/4/13 5:00PM",914737:"4/3/77",13221:"4/29/13"},{75723:"Jane Smith",113509:"9791023214",9299:{large:"https://graph.facebook.com/1193/picture?type=large",small:"https://graph.facebook.com/1193/picture?type=small"},48929:"5/4/13 2:30PM",52213:"5/4/13 3:30PM",914737:"2/1/84",13221:"4/13/13"},{75723:"Mary Bazker",113509:"9921012954",9299:{large:"https://graph.facebook.com/1467/picture?type=large",small:"https://graph.facebook.com/1467/picture?type=small"},48929:"5/7/13 1PM",52213:"5/7/13 8PM",914737:"4/2/91",13221:"3/29/13"},{75723:"Blake Bruno",113509:"8372125313",9299:{large:"https://graph.facebook.com/3500/picture?type=large",small:"https://graph.facebook.com/3500/picture?type=small"},48929:"5/15/13 2PM",52213:"5/15/13 2:30PM",914737:"3/5/87",13221:"4/30/13"}],window.forma={Models:{},Views:{},Templates:{},dateKeyString:function(t){return t.format("MM-DD-YY")},changeColumnId:function(t){forma.currentColumnId=t,forma.dateToRow=forma.columnToDateToRow[t]},updateItem:function(t,e){var i=forma.cidToModel[t];if(i){var n=forma.dateKeyString(e),s=forma.dateToRow;_.each(s,function(t,e){s[e]=_.without(t,i)}),s[n]=s[n]||[],s[n].push(i);var o=i.get(forma.currentColumnId),r=o.replace(/\d+\/\d+\/\d+/,e.format("MM/DD/YY"));i.set(forma.currentColumnId,r),forma.main.render()}},deleteItem:function(t){_.each(forma.columnToDateToRow,function(e){_.each(e,function(i,n){e[n]=_.without(i,t)})}),t.destroy(),forma.main.render()},init:function(){forma.columnToDateToRow={};var t={};forma.idToColumn=_.reduce(data.columns,function(e,i){return e[i.id]=i,"date"==i.type&&(t[i.id]=i.name,forma.columnToDateToRow[i.id]={}),e},{}),forma.cidToModel=_.reduce(data.rows,function(t,e){var i=new forma.Models.DataRowModel(e);return t[i.cid]=i,t},{});var e=_.keys(t);_.each(forma.cidToModel,function(t){var i=t.toJSON();_.each(e,function(e){var n=i[e],s=forma.columnToDateToRow[e];n=n.indexOf(" ")>0?moment(n,"MM/DD/YY hh:mma"):moment(n);var o=forma.dateKeyString(n);s[o]=s[o]||[],s[o].push(t)})}),forma.changeColumnId(e[0]),forma.main=new forma.Views.ApplicationView({el:"#main",model:new Backbone.Model({moment:moment()})}).render(),$("#option").html(forma.template("select")({options:t})),$("#createModal .modal-body").html(forma.template("create")({options:t}))},template:function(t){return JST[t]}},$(document).ready(function(){forma.init()}),forma.Models.DataRowModel=Backbone.Model.extend({toReadable:function(){return _.reduce(this.toJSON(),function(t,e,i){return t[forma.idToColumn[i].name]=e,t},{})}}),this.JST=this.JST||{},this.JST.cell=function(obj){obj||(obj={});var __p="";with(_.escape,obj)__p+='<p><strong></strong></p>\n<ul class="events">\n</ul>';return __p},this.JST.create=function(obj){obj||(obj={});var __t,__p="";with(_.escape,Array.prototype.join,obj)__p+='<form class="form-horizontal">\n    ',_.each(options,function(t,e){__p+='\n        <div class="control-group">\n            <label class="control-label" for="'+(null==(__t=e)?"":__t)+'">'+(null==(__t=t)?"":__t)+'</label>\n            <div class="controls">\n                <input type="text" id="'+(null==(__t=e)?"":__t)+'" name="'+(null==(__t=e)?"":__t)+'" placeholder="'+(null==(__t=t)?"":__t)+'"></div>\n        </div>\n    '}),__p+='\n    <div class="control-group">\n        <div class="controls">\n            <button type="submit" class="btn btn-primary">Sign in</button>\n        </div>\n    </div>\n</form>';return __p},this.JST.item=function(obj){obj||(obj={});var __t,__p="";with(_.escape,obj)__p+='<span class="label label-info draggable droppable" data-cid="'+(null==(__t=cid)?"":__t)+'">'+(null==(__t=Name)?"":__t)+"</span>";return __p},this.JST.popover=function(obj){obj||(obj={});var __t,__p="";with(_.escape,Array.prototype.join,obj)__p+='<div class="arrow"></div>\n<h3 class="popover-title">'+(null==(__t=arguments[0].Name)?"":__t)+'</h3>\n<div class="popover-content">\n    ',_.each(arguments[0],function(t,e){_.isObject(t)||(__p+="\n        <div>\n            <strong>"+(null==(__t=e)?"":__t)+"</strong>\n            <span>"+(null==(__t=t)?"":__t)+"</span>\n        </div>\n    ")}),__p+='\n    <button class="btn btn-danger">delete</button>\n</div>\n';return __p},this.JST.select=function(obj){obj||(obj={});var __t,__p="";with(_.escape,Array.prototype.join,obj)_.each(options,function(t,e){__p+='\n<option value="'+(null==(__t=e)?"":__t)+'">'+(null==(__t=t)?"":__t)+"</option>\n"});return __p},this.JST.table=function(obj){obj||(obj={});var __p="";with(_.escape,obj)__p+='<table class="table table-bordered">\n    <thead>\n        <tr class="info">\n            <th>Sunday</th>\n            <th>Monday</th>\n            <th>Tuesday</th>\n            <th>Wednesday</th>\n            <th>Thursday</th>\n            <th>Friday</th>\n            <th>Saturday</th>\n        </tr>\n    </thead>\n    <tbody>\n\n    </tbody>\n</table>';return __p},forma.Views.ApplicationView=Backbone.View.extend({initialize:function(){this.calendar=new forma.Views.TableView({el:"#calendar",model:this.genMonth()}).render(),this.$el.append(this.calendar.$el),this.model.on("change",this.render,this)},genMonth:function(){var t=this.model.get("moment");return this.days(t.year(),t.month())},monthToDay:{1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31},days:function(t,e){var i=0==t%4&&2==e?29:this.monthToDay[e],n=_.range(1,i+1);return _.map(n,function(i){return moment(new Date([t,e+1,i]))})},events:{"change #option":"onDateKeyChange","click #prev":"onPrevious","click #next":"onNext","click #today":"onToday"},onDateKeyChange:function(t){var e=$(t.currentTarget).val();forma.changeColumnId(e),this.model.trigger("change")},onPrevious:function(){this.model.get("moment").subtract("months",1),this.model.trigger("change")},onNext:function(){this.model.get("moment").add("months",1),this.model.trigger("change")},onToday:function(){this.model.set("moment",moment()),this.model.trigger("change")},render:function(){this.calendar.setMonthData(this.genMonth());var t=this.model.get("moment");return this.$el.find("#year").html(t.year()).end().find("#month").html(t.format("MMMM")).end(),this}}),forma.Views.CellView=Backbone.View.extend({template:forma.template("cell"),tagName:"td",initialize:function(){this.$el.html(this.template(this.model.toJSON())),this.$el.droppable(),this.onSetDate(),this.model.on("change",this.render,this).on("change:date",this.onSetDate,this).on("change:data",this.onSetData,this),this.items=[]},events:{drop:"onDrop",click:"onClick"},onClick:function(t){console.log(t)},onDrop:function(t){var e=$(t.srcElement||t.toElement).data("cid"),i=this.model.get("date");forma.updateItem(e,i)},onSetDate:function(){this.$("p > strong").html(this.model.get("date").format("MM-DD"))},onSetData:function(){_.each(this.items,function(t){t.$el.remove(),t.undelegateEvents()}),this.items=_.map(this.model.get("data"),function(t){return new forma.Views.ItemView({model:t}).render()}),this.$(".events").append(_.pluck(this.items,"$el"))},render:function(){return _.invoke(this.items,"render"),this}}),forma.Views.ItemView=Backbone.View.extend({tagName:"li",template:forma.template("item"),events:{"click .label":"onClick","click .btn":"onDelete"},shown:!1,onClick:function(){if(this.shown=!this.shown,this.shown){var t=forma.template("popover")(this.model.toReadable());this.$(".popover").html(t)}this.$(".label").popover(this.shown?"show":"hide")},onDelete:function(){forma.deleteItem(this.model)},render:function(){var t=_.extend(this.model.toReadable(),{cid:this.model.cid});return this.$el.html(this.template(t)),this.$(".draggable").draggable({snap:".events"}),this.$(".label").popover({title:t.Name,html:!0,placement:"bottom"}),this}}),forma.Views.RowView=Backbone.View.extend({tagName:"tr",initialize:function(){this.cells=_.map(this.model,function(t){return new forma.Views.CellView({model:new Backbone.Model({date:t})}).render()}),this.$el.append(_.pluck(this.cells,"$el"))},setRowData:function(t){t&&_.each(this.cells,function(e,i){var n=t[i],s=forma.dateKeyString(n),o=forma.dateToRow[s];e.model.set({date:n,data:o})})},render:function(){return _.invoke(this.cells,"render"),this}}),forma.Views.TableView=Backbone.View.extend({template:forma.template("table"),initialize:function(){this.$el.html(this.template()),this.rows=_.map(this.groupByWeek(this.model),function(t){return new forma.Views.RowView({model:t}).render()}),this.$("tbody").append(_.pluck(this.rows,"$el"))},groupByWeek:function(t){var e=t[0].week(),i=_.chain(t).groupBy(function(t){return t.week()-e}).map(function(t){var e=7-t.length;if(e){var i=t[0],n=i.day();0==n?(i=t[t.length-1],_.each(_.range(1,e+1),function(e){t.push(moment(i).add("days",e))})):_.each(_.range(1,e+1),function(e){t.unshift(moment(i).subtract("days",e))})}return t}).value(),n=i[i.length-1],s=n[n.length-1];return 6>i.length&&i.push(_.map(_.range(1,8),function(t){return moment(s).add("days",t)})),i},setMonthData:function(t){var e=this.groupByWeek(t);return _.each(this.rows,function(t,i){t.setRowData(e[i])}),this.model=e,this},render:function(){return _.invoke(this.rows,"render"),this}});