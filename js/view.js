// View
function ListView(model, elements) {
    this._model    = model;
    this._elements = elements;

    this.listModified        = new Event(this);
    this.addButtonClicked    = new Event(this);
    this.delButtonClicked    = new Event(this);
    this.delAllButtonClicked = new Event(this);
    this.createButtonClicked = new Event(this);
    var _this = this;

    // attach model listeners
    this._model.itemAdded.attach(function () {
        _this.rebuildList();
    });
    this._model.itemRemoved.attach(function () {
        _this.rebuildList();
    });

    // attach listeners to HTML controls
    this._elements.list.change(function (e) {
      _this.listModified.notify({ index : e.target.selectedIndex });
    });
    this._elements.addButton.click(function () {
      _this.addButtonClicked.notify();
    });
    this._elements.delButton.click(function () {
      _this.delButtonClicked.notify();
    });
    this._elements.deleteAllButton.click(function(){
      alert('Are you sure?');
      _this.delAllButtonClicked.notify();
    });
    this._elements.createButton.click(function(){
      _this.createButtonClicked.notify();
    });
}

ListView.prototype = {
  show : function () {
    this.rebuildList();
  },

  rebuildList : function () {
    var list, items, key;

    list = this._elements.list;
    list.html('');

    items = this._model.getItems();
    for (key in items) {
      if (items.hasOwnProperty(key)) {
        list.append($('<option>' + items[key] + '</option>'));
      }
    }
    this._model.setSelectedIndex(-1);
  }
};

ListView.prototype.getElements = function() {
  return this._elements;
}

function Event(sender) {
  this._sender = sender;
  this._listeners = [];
}

Event.prototype = {
  attach : function (listener) {
    this._listeners.push(listener);
  },
  notify : function (args) {
    var index;
    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};
// end View
