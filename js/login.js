// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Following JS is for the main core functionalities of the CS5003 P1 App.
// Below is the main login session authentication JS for the application.
// Uses a mixture of Google's auth API and custom jQuery animations.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
var auth2 = {};
var login = (function() {
return {
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Hides the sign in button and starts the post-authorization operations.
// @param {Object} authResult:
// An Object which contains the access token and
// other authentication information.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
onSignInCallback: function(authResult) {
  // Show hidden area of application once signed in.
  if (authResult.isSignedIn.get()) {
    $('#app-portal').show('slow');
    $('footer').show('slow');
    $('#gConnect').hide();
    $('#sign-in-title').hide();
    // Call our functions for Stopwatch & Append.
    // Append our elements to the title h1.
    append();
    // Call our stopwatch();
    stopWatch();
    // Original
    //login.people();
  } 
  else {
    if (authResult['error'] || authResult.currentUser.get().getAuthResponse() == null) {
      // There was an error, which means the user is not signed in.
      // As an example, you can handle by writing to the console:
      console.log('There was an error with your login attempt: ' + authResult['error']);
    }
      $('#app-portal').hide('slow');
      $('footer').hide('slow');
      $('#gConnect').show();
      $('#sign-in-title').show();
  }
    console.log('authResult', authResult);
}, // End onSignInCallback()
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Calls the OAuth2 endpoint to disconnect the app for the user.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
disconnect: function() {
  // Revoke the access token.
  auth2.disconnect();
},
    
}; // End login return

})(); // End login

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// jQuery initialization
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
$(document).ready(function() {
  $('#disconnect').click(login.disconnect);
  $('#loaderror').hide();
});
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Handler for when the sign-in state changes.
// @param {boolean} isSignedIn:
// The new signed in state.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
var updateSignIn = function() {
  console.log('update sign in state');
  if (auth2.isSignedIn.get()) {
      console.log('signed in');
      login.onSignInCallback(gapi.auth2.getAuthInstance());
  } else {
      console.log('signed out');
      login.onSignInCallback(gapi.auth2.getAuthInstance());
  }
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// This method sets up the sign-in listener after the client library loads.
// Uses Google's generic GAPI Load script.
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
function startApp() {
  gapi.load('auth2', function() {
    gapi.client.load('plus','v1').then(function() {
      gapi.signin2.render('signin-button', {
          scope: 'https://www.googleapis.com/auth/plus.login',
          fetch_basic_profile: false });
      gapi.auth2.init({fetch_basic_profile: false,
          scope:'https://www.googleapis.com/auth/plus.login'}).then(
            function (){
              console.log('init');
              auth2 = gapi.auth2.getAuthInstance();
              auth2.isSignedIn.listen(updateSignIn);
              auth2.then(updateSignIn);
            });
    });
  });
}