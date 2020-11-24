
  /**
   * Handles the sign in button press.
   */
  function doSignIn() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
          return;
        } else {
          alert(errorMessage);
          return;
        }
        console.log(error);
        document.getElementById('signinbtn').disabled = false;
      });
    document.getElementById('signinbtn').disabled = true;
  }

  /**
   * Sends an email verification to the user.
   */
  function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }
  function updateName(){
    var name = document.getElementById('name').value;
    var dept = document.getElementById('department').value;
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: ""
    }).then(function() {
      firebase.database().ref('Teachers/'+user.uid).set({
        username: name,department: dept,userid: user.uid
  });
    document.getElementById('changename').hidden = true;
    document.getElementById('verifyemail').hidden = false;
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  function movedashboard(){
    window.open("dashboard.html","_self");
  }
  function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }
  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   */
  function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        document.getElementById('loginpage').hidden = true;

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        if(user && emailVerified){
          window.open("dashboard.html","_self");
        }else{
          document.getElementById('changename').hidden = false;
        }
      } else {
        document.getElementById('signinbtn').textContent = 'Sign in';
      }
      document.getElementById('signinbtn').disabled = false;
    });
    document.getElementById('signinbtn').addEventListener('click', doSignIn, false);
    document.getElementById('passwordresetbtn').addEventListener('click', sendPasswordReset, false);
    document.getElementById('updatenamebtn').addEventListener('click', updateName, false);
    document.getElementById('verifyemailbtn').addEventListener('click', sendEmailVerification, false);
    document.getElementById('dashboardbtn').addEventListener('click', movedashboard, false);
  }
  window.onload = function() {
    initApp();
  };
