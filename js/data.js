$(function () {
      // Identify Model
      var taskModel = new ListTasks([
  			      'Cleaning the dishes', 
  			      'Making a Pizza',
  			      'Watching Breaking Bad Season 1',
  			      'Going for a run',
  			      'Having a shower'
  		]),
      // Identify View
      taskView = new appendTask(taskModel, {
        'list'            : $('#list'), 
        'addButton'       : $('#plusBtn'),
        'createButton'    : $("#send"),
        'delButton'       : $('#minusBtn'),
        'deleteAllButton' : $('#delAllBtn'),
        'newModelTextField' : $('#newModelField'),
      }),
      // Identify Controller
      controller = new ListController(taskModel, taskView);
      // Show View()
      taskView.show();
 });