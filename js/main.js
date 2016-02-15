$(function () {
      // Identify Model
      var model = new ListModel([
  			      'Cleaning the dishes', 
  			      'Making a Pizza',
  			      'Watching Breaking Bad Season 1',
  			      'Going for a run',
  			      'Having a shower'
  		]),
      // Identify View
      view = new ListView(model, {
        'list'            : $('#list'), 
        'addButton'       : $('#plusBtn'),
        'createButton'    : $("#send"),
        'delButton'       : $('#minusBtn'),
        'deleteAllButton' : $('#delAllBtn'),
        'newModelTextField' : $('#newModelField'),
      }),
      // Identify Controller
      controller = new ListController(model, view);
      // Show View()
      view.show();
 });