// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Following JS is for the main core functionalities of the CS5003 P1 App.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
//
// Component 1: Stopwatch.
//
// Component 2: User input area.

// Read: http://alistapart.com/article/javascript-mvc
// Read: https://gist.github.com/sinventor/67dd6159980aca026694

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
// Original Timer Plugin
// https://jsfiddle.net/Daniel_Hug/pvk6p/
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Set up public vars
var h1 = document.getElementById('time_elem'),seconds = 0, minutes = 0, hours = 0, interval;
var timeData;
var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var resetBtn = document.getElementById('reset');


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
appenedTaskName();
}

// Pause function for StopWatch()
function pause() {
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearTimeout
  clearTimeout(interval);
  timeData = (hours ? hours > 9 ? hours : "0" + hours : "00") + 
  ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + 
  ":" + (seconds > 9 ? seconds : "0" + seconds);
  console.log(timeData);
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
// Model Tasks
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Set up some default project methods 
// for our model subject.
function ObserverList(){
  this.observerList = [];
}
ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};
ObserverList.prototype.count = function(){
  return this.observerList.length;
};
ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};
ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};
 ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Controller Tasks
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
function Subject(){
  this.observers = new ObserverList();
}
 
Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};
// The Observer Function.
function Observer() {
  this.update = function(){
    // magic 
  };
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// View Tasks
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
var data = [];

// Extend an object with an extension.
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
    console.log(obj[key]);
  }
} 
// References to our DOM elements.
var controlInput = document.getElementById( "projectName" ),
addBtn = document.getElementById( "addNewObserver" ),
removeBtn = document.getElementById( "removeObserver" ),
container = document.getElementById( "projectsContainer" );

// Concrete Subject which we extend 
// the controlling select options 
// with the subject class.
extend( controlInput, new Subject() );
 
// Clicking the select option will trigger 
// notifications to its observers.
controlInput.onclick = function(){
  controlInput.notify( controlInput.task );
};
 


 // Some global variables for our input value.
var projectValue;
// Some global tasks users can use to select.
var tasks = ['Plan Essay', 'Begin Essay', 'Check Bank Account'];

// Create some event listners for our add Task
// method and remove project method.
addBtn.onclick = addObserver;
removeBtn.onclick = removeObserver;
 
// Concrete Observer
function addObserver(){
  // Create a new select option to be added.
  var project = document.createElement( "option" );
  project.className = "list-group-item task-list-item";
  projectValue = document.getElementById( "projectName" );
  value = projectValue.value;
  project.innerHTML = value;
 
  if (value === '') {
    alert('empty');
    return false;
  } else {
    // Override with custom update behaviour
    project.update = function( value ){
      this.task = value;
    };
    // Append the project to the container
    container.appendChild(project);
    // Push values into empty data[]
    data.push(value);
    console.log(data);
    
    //addTime();
    alert('now select task');
    showTasks();
  }
}
function removeObserver() {
    // http://www.thimbleopensource.com/tutorials-snippets/handling-select-items-javascript
    var selectobject = document.getElementById("projectsContainer");
    selectobject.remove(selectobject.selectedIndex);
    $("#tasksContainer").hide('slow');
}

function showTasks() {
    // Fade in tasksContainer
    $("#tasksContainer").show('slow');
    // Set up tasks to be appended.
    var tasksList = document.getElementById("tasksContainer");
    for (var task in tasks) {
        if (tasks.hasOwnProperty(task)) {
            var pair = tasks[task];
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.class = "task-checkbox";
            checkbox.name = pair;
            checkbox.value = pair;
            tasksList.appendChild(checkbox);
    
            var label = document.createElement('label')
            label.htmlFor = pair;
            label.appendChild(document.createTextNode(pair));

            tasksList.appendChild(label);
            tasksList.appendChild(document.createElement("br"));    
        }
    }
  }
  
  document.getElementById("projectsContainer").onclick=function() {       
        alert($("#projectsContainer").prop('selectedIndex'));
}

