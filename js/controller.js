// Controller
function ListController(taskModel, taskView) {
  this._model = taskModel;
  this._view = taskView;

  var _this = this;

  this._view.listModified.attach(function (sender, args) {
    _this.updateSelected(args.index);
  });

  this._view.addButtonClicked.attach(function () {
    _this.addTask();
  });
  this._view.createButtonClicked.attach(function(){
    _this.createTask();
  })

  this._view.delButtonClicked.attach(function () {
    _this.delTask();
  });
  this._view.delAllButtonClicked.attach(function(){
    _this.delAll();
  });
}

ListController.prototype.addItem = function () {
  this._view.getElements().newModelTextField.fadeIn(10).focus();
  this._view.getElements().createButton.fadeIn(80);
}

ListController.prototype.createItem = function () {
  var item="ss";
  item = this._view.getElements().newModelTextField.val();
  this._view.getElements().newModelTextField.fadeOut();
  this._view.getElements().createButton.fadeOut();
  if (item) {
    this._model.createItem(item);
  }
}

ListController.prototype.delItem = function () {
  var index;
  index = this._model.getSelectedIndex();
  if (index !== -1) {
    this._model.removeItemAt(this._model.getSelectedIndex());
  }
}

ListController.prototype.delAll = function () {
  if (this._model.getItems().length===0)
    return;
  this._model.removeAllItems();
}
ListController.prototype.updateSelected = function (index) {
  this._model.setSelectedIndex(index);
}
// end Controller