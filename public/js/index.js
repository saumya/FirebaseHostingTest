//
$(function() {
  console.log('App ready!');
  // initialise Firebase
  firebase.initializeApp(allConfig.firebase);
  // event handlers
  $("#btnLogin").on('click',function(){
  	console.log('login');
  	//console.log(allConfig.firebase);
  	
  	// Using a popup.
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	firebase.auth().signInWithPopup(provider).then(function(result) {
	 // This gives you a Google Access Token.
	 var token = result.credential.accessToken;
	 // The signed-in user info.
	 var user = result.user;
	 console.log('user',user);

	});
	
	/*
	// Using a redirect.
	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Google Access Token.
	    var token = result.credential.accessToken;
	  }
	  var user = result.user;
	  console.log('user',user);
	});

	// Start a sign in process for an unauthenticated user.
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	firebase.auth().signInWithRedirect(provider);
	*/
  })
});