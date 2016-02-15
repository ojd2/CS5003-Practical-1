
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Following JS is for the main core functionalities of the CS5003 P1 App.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Component 0: Login.
//
// Component 1: Stopwatch.
//
// Component 2: User input area.


// Read: http://alistapart.com/article/javascript-mvc
// Read: https://gist.github.com/sinventor/67dd6159980aca026694

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 0. LOGIN MODEL
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------




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

// Start our stopwatch() function which 
function stopWatch() {
    interval = setTimeout(format, 1000);
}

// Call our timer();
stopWatch();

function pause() {
   // https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearTimeout
   clearTimeout(interval);
}

/* Clear button */
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

// Initially, we need to make sure users when filling out their tasks
// are actually typing into the input bar before submit. User's cannot
// add a task if they have not added anything to the input bar. 

// Therefore we must begin by implementing a validation method upon our
// input bar. To validate our data, we provide an array of key/value pairs. 
// The key is the 'field name' and the 'value' is what the user entered 
// into the input field.




