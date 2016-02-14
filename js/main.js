$(function () {
  var model = new ListModel([
  			      'Cleaning the dishes', 
  			      'Making a Pizza',
  			      'Watching Breaking Bad Season 1',
  			      'Going for a run',
  			      'Having a shower'
  		]),
      view = new ListView(model, {
        'list'            : $('#list'), 
        'addButton'       : $('#plusBtn'),
        'createButton'    : $("#send"),
        'delButton'       : $('#minusBtn'),
        'deleteAllButton' : $('#delAllBtn'),
        'newModelTextField' : $('#newModelField'),
      }),
    controller = new ListController(model, view);
  
    view.show();
 });