// Model
function ListTasks(tasks) {
  this._tasks = tasks;
  this._selectedIndex = -1;

  this.taskadded = new Event(this);
  this.taskRemoved = new Event(this);
  this.selectedIndexChanged = new Event(this);
}

ListTasks.prototype = {
  gettasks : function () {
    return [].concat(this._tasks);
  },
  addtask : function (task) {
    console.log('added task'); 
  },
  createtask: function(task){
    this._tasks.push(task);
    this.taskAdded.notify({ task : task });
  },
  removetaskAt : function (index) {
    var task;

    task = this._tasks[index];
    this._tasks.splice(index, 1);
    this.taskRemoved.notify({ task : task });
    if (index === this._selectedIndex) {
      this.setSelectedIndex(-1);
    }
  },
  removeAlltasks : function() {
    this.setSelectedIndex(-1);
    this._tasks = [];
    this.taskRemoved.notify({});
  },

  getSelectedIndex : function () {
    return this._selectedIndex;
  },

  setSelectedIndex : function (index) {
    var previousIndex;

    previousIndex = this._selectedIndex;
    this._selectedIndex = index;
    this.selectedIndexChanged.notify({ previous : previousIndex });
  }
};
// end Model