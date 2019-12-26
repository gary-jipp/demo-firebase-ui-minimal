const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Our Custom configurations.  
const uiConfig = {

  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
			console.log(authResult.user);
			//alert(authResult.user.uid);
      return false;
    },
    uiShown() {
      // Note: Need this if you have a loader item (spinner, etc)
      document.getElementById('loader').style.display = 'none';
    },
  },
  
  signInFlow: 'popup',
  signInSuccessUrl: '.',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // Additional login options should be listed here
    // you also need to enable within the console.
  ],
};

// logout the current user
const logout = function () {
	firebase.auth().signOut()
		.then(function() {
			console.log('logged out');
		})
		.catch(function(error) {
			console.log('error logging out: ' + error);
		});
}

// What to do when auth state changes.  You'll use this one a lot!
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('User=' + user.uid);
		//	TODO: Activate logout button
		// logout();
  } else {
    console.log('No User signed in');
  }
});

// Call the 'start' method on our ui class with our custom options
ui.start('#firebaseui-auth-container', uiConfig);