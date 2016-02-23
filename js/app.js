// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Following JS is for the main core functionalities of the CS5003 P1 App.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
//
// Component 1: Stopwatch.
//
// Component 2: User Project Input Area.
//
// Component 3: Append Task & Time.
//
// Read: http://alistapart.com/article/javascript-mvc
// Read: https://gist.github.com/sinventor/67dd6159980aca026694
// Read: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 1. STOPWATCH COMPONENT
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// This is rather verbose and non MVC, it is a simple timer
// which we will use to capture time and bind to our user tasks.
// The only MVC implmentation for the stopwatch are some methods
// which extend the stopwatch by use of some simple controller
// event handlers. These handlers will store the stopwatch time upon
// click. For example: If a user hit's start and then hit's 'stop' -
// the current time displayed will be passed through via controller. 
// Then the controller will decides to appened to the view. The view
// contains some simple data binding methods which append the time,
// user task input name, and some other metadata to an area in the HTML.

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 0. Stopwatch Timer Implmentation
// https://jsfiddle.net/Daniel_Hug/pvk6p/
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Set up public variables for the stopwatch to implement. We begin by setting 
// up our timer variables for seconds, minutes, hours and a global interval. 
// We also include some references to our HTML DOM elements for the stopwatch 
// buttons. Our 'timeData' variable will be used for storing the time when a 
// user hits the stop button. 
var h1 = document.getElementById('time_elem'),seconds = 0, minutes = 0, hours = 0, interval;
var timeData;
var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var resetBtn = document.getElementById('reset');
var stopBtn = document.getElementById('stop');
// Perform stopwatch methods when a user clicks start. When a user clicks start
// we begin with incrementing our seconds, minutes and hours using the following
// global time calculations. First function below is used for formatting.
startBtn.onclick = function globalTime() {
  function format() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  // We now call our append and stopWatch functions. These two functions act like 
  // 'the view' model would in a MVC. They simply append the formatted increments
  // from above and add to the HTML. This does our magic and makes the counter tick. 
  // The stopWatch function is called at this point because it uses the JavaScript
  // 'setTimeout' routine.  
  append();
  stopWatch();
  }
  // As previously mentioned, the append function below starts with our timer 
  // values all set to 0, before being incremented.
  function append() {
    h1.textContent = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
    ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
    ":" + (seconds > 9 ? seconds : "0" + seconds);
  }
  // Here is our function for utilising the 'setTimeout' routine.
  function stopWatch() {
    interval = setTimeout(format, 1000);
  }
  // Call the function again for performing the routine.
  stopWatch();
  // Also disable the add project button. We do not want users adding projects
  // in between adding tasks and when the stop watch timer is currently running.
  addProjectBtn.classList.add("disabled");
} 
// Next, we have a simple pause function which uses the 'clearTimeout' routine 
// this time. This is another JavaScript routine which simply clears everything 
// bar the appended incremented values.
function pause() {
  clearTimeout(interval);
  return false;
}
// Our stop function is executed upon click as well. From here we pause the time again
// using the 'clearTimeout' routine. Our 'timeData' variable stores the current 
// incremented values and then we append the data to our chosen project in the ProjectList
// subject created below.
stopBtn.onclick = function stop() {
  clearTimeout(interval);
  timeData = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
  ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
  ":" + (seconds > 9 ? seconds : "0" + seconds);
  console.log(timeData);
  // Append timeData to project with active class. Time can only be appended to objects
  // with the 'active-project' class in the HTML select list.
  var $time = document.getElementsByClassName("active-project");
  var $time = $(".active-project");
  $time.append("<p><b>Total Time:</b> " + timeData + "</p>");
  controlInput.classList.remove("disabled");
  $("#tasksContainer").hide('slow');
  addProjectBtn.classList.remove("disabled");
  // Call reset after stop button is clicked.
  reset();
  // Remove active-project class to stop multiple duplicates of appending tasks.
  $('.active-project').removeClass('active-project');
  $('.list-group-item').removeClass('list-group-item');
  startBtn.classList.add("disabled");
  return false;
}
// Reset function for the timer, which simply overwrites appended HTML DOM elements 
// with our new time: '00:00:00'. This acts like a simple reset updates the UI.
function reset() {
   h1.innerHTML = "00:00:00";
   seconds = 0; 
   minutes = 0; 
   hours = 0;
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2. The Observer MVC Pattern.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// A MVC approach which aims to describe data within JavaScript. 
// The idea is to create more modularity and seperation. 
// Popular MVC pattern Observer & Listners was researched for this assignment.

// The code itself is derived from the Observer pattern. The pattern follows 
// some logical principles, first we begin with an object (known as a subject), 
// which keeps a universal list of objects depending on its observers. 
// Subsequently, by doing this, the pattern can automatically notifying the 
// observers of any changes to state. This makes it a perfect MVC model to 
// implement for a project / task timer management system. Why? Well quite 
// simply, when a subject needs to notify the observers about a change of state
// (deleting an object) happening, it signals a notification to the observers 
// (the data releated is then easily manipulated and structured).

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2.1 Projects Model & Subject.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Set up some default project methods, this will act as our first subject.
// A subject maintains a list of observers, facilitates adding or removing 
// observers. In this case, this will be keeping track of adding projects and 
// removing projects which get appended to our projects container in the HTML.
function ProjectList(){
  this.projectList = [];
}
// Using prototype's to inherit object instances. The First prototype is for 
// adding projects. Projects will be created as objects (obj) and pushed onto
// our inherited subject. The subject will then contain objects which can 
// be later manipulated. 
ProjectList.prototype.add = function( obj ){
  return this.projectList.push( obj );
};
// Next we have a count prototype function which simply keeps track of 
// all objects created and stored into our inherited subject.
ProjectList.prototype.count = function(){
  return this.projectList.length;
};
// Our get prototype function is for identifying the selected index in our
// list of objects created (in this case our projects). 
ProjectList.prototype.get = function( index ){
  if( index > -1 && index < this.projectList.length ){
    return this.projectList[ index ];
  }
};
// Our 'indexOf' prototype is for identifying our list and designating their 
// index numbers. This is mainly for keeping track of all objects. Acts like 
// dynamic filling system.
ProjectList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
  while( i < this.projectList.length ){
    if( this.projectList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};
// The 'removeAt' prototype function is for identifying the selected index and
// then manipulates our list by removing the selected object. This makes use of
// of a splice function upon our objects. 
 ProjectList.prototype.removeAt = function( index ){
  this.projectList.splice( index, 1 );
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2.2 Projects Controller
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Next comes our controller, which models the created subject (projectList) 
// and connects our prototype models together with our view functions. 
// For example, we inherit our projecList and give the projecList the ability 
// to add, remove or notify observers on the observer list. 
function ProController(){
  this.projects = new ProjectList();
}
// We define our first function. This is for adding projects to our subject.
ProController.prototype.addProject = function( project ){
  this.projects.add( project );
};
// Next we have a function which is created for removing projects.
ProController.prototype.removeProject = function( project ){
  this.projects.removeAt( this.projects.indexOf( project, 0 ) );
};
// Finally, we have a notify function for notifying all observers for 
// different states of change.
ProController.prototype.notify = function( context ){
  var projectCount = this.projects.count();
  for(var i=0; i < projectCount; i++){
    this.projects.get(i).update( context );
  }
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2.3 Generic Connectors
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// The Project (Observer) Function. This acts as a simple 'skeleton' 
// for creating new future observers (projects in this case).
function Project() {
  this.updateProject = function(){
    // All updates happen here.
  };
}
// Extend an object with an extension.
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
    console.log(obj[key]);
  }
} 
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2.4 Projects View
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// The projects view area is where we extend and execute our inherited 
// prototypes. We do this by using concrete observer functions. The functions 
// below are what we use to build upon our subject and appened all changes to 
// the applications HTML. First we start with a global array variable. 
// This iscreated to store our 
// inputed project names. 
var data = [];
// A global variable for our users input value is stored. 
// We need this to append into our project object. 
var projectValue;
// Get the document HTML item for the task list area.
var tasksList = document.getElementById("tasksContainer");
// Global variable for project which will be appended. This can then be appended 
// to the projects container in the HTML. From here the input value of any user 
// is added and presented.
var project;
// Here we make some key references to some of our DOM elements. The selected 
// elements our a applications buttons. This buttons provide and call numerous 
// concrete observers in our code to execute tasks upon our subject (projectList).
var controlInput = document.getElementById( "projectName" ),
addBtn = document.getElementById( "addNewProject" ),
removeBtn = document.getElementById( "removeProject" ),
container = document.getElementById( "projectsContainer" );
var addProjectBtn = document.getElementById('addNewProject');
var removeAllBtn = document.getElementById('removeAllProjects');
// Our concrete subject, which we 'extend' by controlling the select options 
// (appended projects) with the subject's class. This basically broadcasts 
// or notifys any observers on any changes of state, which then stores 
// the state and updates our model. This allows us to implement our 
// concrete observers further down.
extend( controlInput, new ProController() );
// Clicking the select option will trigger notifications to the observers.
controlInput.onclick = function(){
  controlInput.notify( controlInput.project );
};
// Some event listners for our add, remove, remove all methods are set up.
addBtn.onclick = addProject;
removeBtn.onclick = removeProject;
removeAllBtn.onclick = removeAllProjects;
// Begin our concrete observers. Each concrete observer stores a reference 
// to the concrete subject. From here, we ensure that any state
// of change is consistent with the subject's (projectList) model above.
function addProject(){
  // We will append our project objects as select options. With select
  // options we have a far more flexible way of manipulating the HTML and
  // it also gives users the ability to actually select objects on the page.
  project = document.createElement( "option" );
  project.className = "list-group-item project-list-item";
  projectValue = document.getElementById( "projectName" );
  value = projectValue.value;
  project.innerHTML = '<h3 class="project-title">' + value + "</h3>";
  // Here we have a simple validation method which we use to identify if
  // the user has inserted any text into the 'Create Project' input bar.
  if (value === '') {
    alert('empty');
    return false;
  } 
  // If the user has entered any text into the input bar area, then our 
  // addProject() function is executed. 
  else {
    // Override our observers with our custom behaviour. This particular
    // behaviour is adding a project. Therefore we pass the input bar value.
    // We need the value to be appended to the new select option. 
    project.updateProject = function( value ){
      this.project = value;
    };
    // Append the new select object / project to the projects area container.
    container.appendChild(project);
    // Push values into empty data[] for testing and storing all data. 
    data.push(value);
    console.log(data);
    // Now we can drop down the tasks input area. This will display to the users
    // another input bar which is only to be used for tasks belonging to the chosen
    // project in the container. The following code below calls the function showTasks().
    showTasks();
  }
}
// We set up another concrete observer which is used for removing a particular object / 
// project from the list. This uses some simple jQuery functionality. 
function removeProject() {
    var selectobject = document.getElementById("projectsContainer");
    selectobject.remove(selectobject.selectedIndex);
    $("#tasksContainer").hide('slow');
}
// Similliar to the concrete observer function above, but this function instead removes
// all current objects listed using some more jQuery functionality.
function removeAllProjects() {
    $(".project-list-item").remove();
    $("#tasksContainer").hide('slow');
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 3. Task model & task creation.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// The following method captures the value from the desired task input bar 
// and at the same time, upon submit - activates the start button for the
// stopwatch. From here, the task value is appended to the selected / created
// project in the select list. However first we must show and drop down our
// input bar once a created has been created.

// The following variable stores the task value from the input bar.
var taskValue;
// Next we reference some more of our DOM elements. These two elements are 
// related to our tasks area. We reference both the task input and the add
// task buttons.
var taskInput = document.getElementById( "taskName" ),
addTaskBtn = document.getElementById( "addNewTask" );
// As previously mentioned, the first thing we must do is show the tasks area 
// after new project creation. The code below uses some simple jQuery animation.
function showTasks() {
    // Fade in tasksContainer.
    $("#tasksContainer").show('slow');
    // This is a crucial component for the program. The toggle function below
    // appeneds a class to our created project. This only happens when a user
    // selects a chosen project to assign a task with. Reasons for doing 
    // this are to stop duplicating any appending values. One way of doing this
    // is by differentiating the created projects in the list. By adding a unique
    // class to a selected project, it enables any task to be appended to that 
    // particular project.
    $('.list-group-item').click(function() {
        $(".list-group-item").toggleClass("active-project");
    });
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 3.1 Tasks Subject & Model.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// For our tasks to be appended and added, we must create another core subject
// to model. Because of the observer / listner MVC, we can just replicate our 
// projects model and our concrete observers. This is because we are using a 
// simillar pattern such as adding tasks. So, first we create a new subject 
// which we will call 'TaskList', which will store all our appended task values 
// to the selected projects only.  
function TaskList(){
  this.taskList = [];
}
// As previously mentioned, we create some prototype functions for adding a 
// task to a selected project. Tasks can only be added to selected projects with
// the 'active-project' class. 
TaskList.prototype.add = function( obj ){
  return this.taskList.push( obj );
};
// Another prototype function for counting tasks.
TaskList.prototype.count = function(){
  return this.taskList.length;
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Tasks Controller
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
function TaskController(){
  this.tasks = new TaskList();
}
 
TaskController.prototype.addTask = function( task ){
  this.tasks.add( task );
};
TaskController.prototype.notify = function( context ){
  var taskCount = this.tasks.count();
  for(var i=0; i < taskCount; i++){
    this.tasks.get(i).update( context );
  }
};
// The Project (Observer) Function.
function Task() {
  this.updateTask = function(){
    // magic 
  };
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Tasks View
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// We perform another extension for connecting our controller functions 
// to our view model.
extend( taskInput, new TaskController() );
// Clicking the select option will trigger notifications to its observers.
taskInput.onclick = function(){
  taskInput.notify( taskInput.task );
};
// Create some event listners for our 'addProject' method.
addTaskBtn.onclick = addTask;

// Concrete Observer for adding tasks is now implemented.
function addTask(){
    // Activate our start button.
    if ($(".active-project")[0]){
      startBtn.classList.remove("disabled");
    } else {
      alert('sorry please click a project');
    }
    // Append our task name to the selectIndex
    taskItem = document.getElementById( "taskName" );
    taskValue = taskItem.value;
    console.log(taskValue);
    // Now appened task name to the selected index of our chosen project 
    // with the class 'active-project'.
    var $option = document.getElementsByClassName("active-project");
    var $option = $('.active-project');
    $option.append('<div class="clearfix"></div>' + "<b>Task:</b> " + taskValue);
    // Override all observer pattern behaviour with our task values.
    taskName.updateTask = function( taskValue ){
        this.taskName = taskValue;
    };
}