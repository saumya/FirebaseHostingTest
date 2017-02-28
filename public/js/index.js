//
$(function() {
  console.log('App ready!');

  var UserObj = {id:'test',firebase:{}};
  
  // initialise
  $("#idHomeScreen").show();
  $("#idMsg").hide();
  $("#idFormToFill").hide();
  
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
	 //console.log('user',user);

	 // Get a reference to the database service
  	 var database = firebase.database();

	 // Save a reference for future use
	 UserObj.firebase.token = token;
	 UserObj.firebase.user = user;
	 UserObj.firebase.database = database;

	 $("#idMsg").html("Welcome back "+user.displayName+". You are now logged in.");
	 $("#idMsg").show();
	 $("#idFormToFill").show();
	 $("#idHomeScreen").hide();

	 console.log('UserObj',UserObj);
	 
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
	$("#idBtnPaid").on('click',function(event){
		console.log('TODO: insert the data');
		//console.log('UserObj',UserObj);
		var paidTo = $("#idPaidTo").val();
		var paidAmmount = $("#idPaidAmmount").val();
		var userId = firebase.auth().currentUser.uid;

		console.log(paidTo,':',paidAmmount);
		/*
		firebase.database().ref('paid/' + UserObj.firebase.user.uid).set({
			person: paidTo,
			ammount: paidAmmount
		});
		*/
		/*
		var userId = firebase.auth().currentUser.uid;
		var paidDbRef = firebase.database().ref('paid/');
		paidDbRef.on('value', function(snapshot) {
			//updateStarCount(postElement, snapshot.val());
			alert('Successfully paid to '+paidTo);
		});
		firebase.database().ref('paid/').set({
			paidById: userId,
			person: paidTo,
			ammount: paidAmmount
		});
		*/

		// Get a reference to the database service
		//var database = firebase.database();
		var databaseRef = firebase.database().ref('paid/');
		databaseRef.on('child_added', function(data) {
			//addCommentElement(postElement, data.key, data.val().text, data.val().author);
			//console.log('Data added');
			$("#idMsg").html(UserObj.firebase.user.displayName+" you just paid to <h3>"+paidTo+"</h3>");
		});
		// Create a new paid reference with an auto-generated id
		var newPaidRef = databaseRef.push();
		newPaidRef.set({
		    paidById: userId,
			paidTo: paidTo,
			ammount: paidAmmount
		});

		return false;
	});
	//
  })
});