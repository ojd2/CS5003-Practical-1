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
// Stopwatch Timer Implmentation
// https://jsfiddle.net/Daniel_Hug/pvk6p/
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Set up public vars
var h1 = document.getElementById('time_elem'),seconds = 0, minutes = 0, hours = 0, interval;
var timeData;
var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var resetBtn = document.getElementById('reset');
var stopBtn = document.getElementById('stop');



// Perform stopwatch methods
startBtn.onclick = function globalTime() {
  // Set up function to format time.
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
  append();
  stopWatch();
  }
  // Start our append() function to add elements of timer.
  function append() {
    h1.textContent = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
    ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
    ":" + (seconds > 9 ? seconds : "0" + seconds);
  }
  // Stop our stopwatch() function which 
  function stopWatch() {
    interval = setTimeout(format, 1000);
  }
  // Call our timer();
  stopWatch();
  // Also disable the add project button.
  addProjectBtn.classList.add("disabled");
} 


// Pause function for StopWatch()
function pause() {
  clearTimeout(interval);
  // timeData = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
  // ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
  // ":" + (seconds > 9 ? seconds : "0" + seconds);
  //console.log(timeData);
  return false;
}

// Stop function which then appends time
// to project with active state.
stopBtn.onclick = function stop() {
  
  clearTimeout(interval);
  timeData = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
  ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
  ":" + (seconds > 9 ? seconds : "0" + seconds);
  console.log(timeData);
  

  // Append timeData to project with active class.
  var $time = document.getElementsByClassName("active-project");
  var $time = $(".active-project");
  alert("stop");
  $time.append("<p><b>Total Time:</b> " + timeData + "</p>");

  controlInput.classList.remove("disabled");
  $("#tasksContainer").hide('slow');
  addProjectBtn.classList.remove("disabled");
  // Call reset after stop.
  reset();
  // Remove active-project class to stop multiple
  // duplicates of appending tasks.
  $('.active-project').removeClass('active-project');
  $('.list-group-item').removeClass('list-group-item');
  
  return false;

}

// Reset function for StopWatch()
function reset() {
   h1.innerHTML = "00:00:00";
   seconds = 0; 
   minutes = 0; 
   hours = 0;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 2. USER TASK INPUT FIELD PROJECT MODEL
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// A MVC approach which aims to describe data within JavaScript. 
// The idea that we create more modularity and seperation. 
// Popular MVC pattern Observer & Listners.

// Initially, we need to make sure users when filling out their tasks
// are actually typing into the input bar before submit. User's cannot
// add a task if they have not added anything to the input bar. 

// Therefore we must begin by implementing a validation method upon our
// input bar. To validate our data, we provide an array of key/value pairs. 
// The key is the 'field name' and the 'value' is what the user entered 
// into the input field.

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Projects Model
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Set up some default project methods 
// for our model subject.
function ProjectList(){
  this.projectList = [];
}
ProjectList.prototype.add = function( obj ){
  return this.projectList.push( obj );
};
ProjectList.prototype.count = function(){
  return this.projectList.length;
};
ProjectList.prototype.get = function( index ){
  if( index > -1 && index < this.projectList.length ){
    return this.projectList[ index ];
  }
};
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
 ProjectList.prototype.removeAt = function( index ){
  this.projectList.splice( index, 1 );
};


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Projects Controller
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
function ProController(){
  this.projects = new ProjectList();
}
 
ProController.prototype.addProject = function( project ){
  this.projects.add( project );
};

ProController.prototype.removeProject = function( project ){
  this.projects.removeAt( this.projects.indexOf( project, 0 ) );
};

ProController.prototype.notify = function( context ){
  var projectCount = this.projects.count();
  for(var i=0; i < projectCount; i++){
    this.projects.get(i).update( context );
  }
};
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Generic Connectors
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// The Project (Observer) Function.
function Project() {
  this.updateProject = function(){
    // magic 
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
// Projects View
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Some global variable to store our inputed project names.
var data = [];
// Some global variables for our input value.
var projectValue;
// Get the document HTML item for the task list area.
var tasksList = document.getElementById("tasksContainer");

// Global var for project which will be appended.
var project;

// References to our DOM elements.
var controlInput = document.getElementById( "projectName" ),
addBtn = document.getElementById( "addNewProject" ),
removeBtn = document.getElementById( "removeProject" ),
container = document.getElementById( "projectsContainer" );
var addProjectBtn = document.getElementById('addNewProject');
var removeAllBtn = document.getElementById('removeAllProjects');

// Concrete Subject which we extend 
// the controlling select options 
// with the subject class.
extend( controlInput, new ProController() );
 
// Clicking the select option will trigger 
// notifications to its observers.
controlInput.onclick = function(){
  controlInput.notify( controlInput.project );
};

// Create some event listners for our add Project
// method and remove project method.
addBtn.onclick = addProject;
removeBtn.onclick = removeProject;
removeAllBtn.onclick = removeAllProjects;
 
// Concrete Observer
function addProject(){
  // Create a new select option to be added.
  project = document.createElement( "option" );
  project.className = "list-group-item project-list-item";
  projectValue = document.getElementById( "projectName" );
  value = projectValue.value;
  project.innerHTML = "<h3>" + value + "</h3>";

 
  if (value === '') {
    alert('empty');
    return false;
  } else {
    // Override with custom update behaviour.
    project.updateProject = function( value ){
      this.project = value;
    };
    // Append the project to the container.
    container.appendChild(project);
    // Push values into empty data[]
    data.push(value);
    console.log(data);
    // Drop down the tasks input area.
    showTasks();
  }
}
function removeProject() {
    // http://www.thimbleopensource.com/tutorials-snippets/handling-select-items-javascript
    var selectobject = document.getElementById("projectsContainer");
    selectobject.remove(selectobject.selectedIndex);
    $("#tasksContainer").hide('slow');
}

function removeAllProjects() {
    $(".project-list-item").remove();
    $("#tasksContainer").hide('slow');
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Add Tasks
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// The following method captures the value from the desired task input bar 
// and at the same time, upon submit - activates the start button for the
// stopwatch. From here, the task value is appended to the selected / created
// project in the select list. 

// Some global variables.
var taskValue;

// References to our DOM elements.
var taskInput = document.getElementById( "taskName" ),
addTaskBtn = document.getElementById( "addNewTask" );

// Show tasks area after Project creation.
function showTasks() {
    // Fade in tasksContainer.
    $("#tasksContainer").show('slow');
    
    $('.list-group-item').click(function() {
        $(".list-group-item").toggleClass("active-project");
    });
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Tasks Model
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Set up some default task methods 
// for our model subject.
function TaskList(){
  this.taskList = [];
}

TaskList.prototype.add = function( obj ){
  return this.taskList.push( obj );
};

TaskList.prototype.count = function(){
  return this.taskList.length;
};

TaskList.prototype.get = function( index ){
  if( index > -1 && index < this.taskList.length ){
    return this.taskList[ index ];
  }
};

TaskList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
  while( i < this.projectList.length ){
    if( this.taskList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};

TaskList.prototype.removeAt = function( index ){
  this.taskList.splice( index, 1 );
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

TaskController.prototype.removeTask = function( task ){
  this.tasks.removeAt( this.tasks.indexOf( task, 0 ) );
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

// Concrete Subject which we extend 
// the controlling select options 
// with the subject class.
extend( taskInput, new TaskController() );
 
// Clicking the select option will trigger 
// notifications to its observers.
taskInput.onclick = function(){
  taskInput.notify( taskInput.task );
};

// Create some event listners for our add Project
// method and remove project method.
addTaskBtn.onclick = addTask;


// Concrete Observer
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
    
    var $option = document.getElementsByClassName("active-project");
    var $option = $('.active-project');
    $option.append("<br>" + "<b>Task:</b> " + taskValue);

    // Override with custom update behaviour
    taskName.updateTask = function( taskValue ){
        this.taskName = taskValue;
    };
}


