//
$(function() {
	console.log('App ready!');

	var UserObj = {id:'test',firebase:{}};
	var dataSnapshot = {};
	var currentUserDBPath = '';
	var isBtnPaidClicked = false;

	// initialise
	$("#idHomeScreen").show();
	$("#idMsg").hide();
	$("#idFormToFill").hide();
	$("#idDataToShow").hide();
	$("#idShortInfo").hide();
	//

	$("#btnLogin").show();
	$("#btnLogout").hide();
	$("#btnAddPay").hide();
	$("#btnViewPay").hide();
	//$("#btnRemovePay").hide();
	//$("#idTableOfPaid")
	//$("#btnSortByName")
	//$("#btnSortByDate")
  
	// initialise Firebase
	firebase.initializeApp(allConfig.firebase);

  // user event handlers
  $("#btnLogin").on('click',function(){
  	console.log('login');
  	//console.log(allConfig.firebase);
  	
  	// Google Login : Using a popup. 
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

		//currentUserDBPath = 'paid/'+userId;
		currentUserDBPath = 'paid/'+result.user.uid;

		//$("#idMsg").html("Welcome back "+user.displayName+". You are now logged in.");
		//$("#idMsg").show();
		$("#idFormToFill").show();
		$("#idHomeScreen").hide();
		$("#idloggedInUser").html(" of "+user.displayName+".");
		
		//$("#idShortInfo").html("Wait a min till I am visible.");
		$("#idShortInfo").html("<span class='label label-danger'>Wait a min till I am visible.</span>");
		$("#idShortInfo").show();

		//
		$("#btnLogin").hide();
		//$("#btnLogout").show();
		$("#btnAddPay").show();
		$("#btnViewPay").show();

		//console.log('UserObj',UserObj);

		var databaseRef = firebase.database().ref(currentUserDBPath);

		databaseRef.on('child_added', function(data) {
			//addCommentElement(postElement, data.key, data.val().text, data.val().author);
			//console.log('child_added:data:',data.val().paidTo);
			
			console.log('child_added : event');
			console.log('isBtnPaidClicked',isBtnPaidClicked);

			if (isBtnPaidClicked==true) {
				$("#idMsg").html(UserObj.firebase.user.displayName+" you just paid to <h3>"+data.val().paidTo+"</h3>");
				$("#idMsg").show();
				isBtnPaidClicked = false;
			}else{
				// Do Nothing
			}
			
		});
		databaseRef.on('value', function(snapshot) {
			
			//addCommentElement(postElement, data.key, data.val().text, data.val().author);
			console.log('value: event');
			
			//$("#idMsg").html(UserObj.firebase.user.displayName+" you just paid to <h3>"+paidTo+"</h3>");
			//$("#idMsg").show();
			//console.log('snapshot:',snapshot);
			//console.log('snapshot.val():',snapshot.val());

			dataSnapshot = snapshot;
			console.log('dataSnapshot',dataSnapshot);
			//
			$("#idShortInfo").hide();
		});

	 
	});

	/*
	// Google Login : Using a redirect. 
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
		//console.log('TODO: insert the data');
		//console.log('UserObj',UserObj);
		
		isBtnPaidClicked = true;
		console.log('click: isBtnPaidClicked',isBtnPaidClicked);

		var paidTo = $("#idPaidTo").val();
		var paidAmmount = $("#idPaidAmmount").val();
		//var paidDate = $("#idPaidDate").value;
		var paidDate = $("#idPaidDate")[0].value;
		// var a = new Date("2017-03-01"); // this is how we will get and use

		var userId = firebase.auth().currentUser.uid;

		//console.log(paidTo,':',paidAmmount,':',paidDate);
		

		var databaseRef = firebase.database().ref(currentUserDBPath);
		// Create a new paid reference with an auto-generated id
		var newPaidRef = databaseRef.push();
		newPaidRef.set({
		    paidById: userId,
			paidTo: paidTo,
			paidOn: paidDate,
			ammount: paidAmmount
		});


		

		return false;
	});
	//
	//$("#btnLogin").hide();
	$("#btnLogout").on('click',function(event){
		alert('TODO: Logout');
		return false;
	});
	$("#btnAddPay").on('click',function(event){
		//alert('TODO: Show Add View');
		$("#idFormToFill").show();
		$("#idDataToShow").hide();
		$("#idMsg").hide();
		return false;
	});
	$("#btnViewPay").on('click',function(event){
		//alert('TODO: Show PaidView');
		$("#idFormToFill").hide();
		$("#idDataToShow").show();
		$("#idMsg").hide();
		//
		//$("#idTableOfPaid").empty();
		var tblHeader = '<tr class="info"><td>To</td><td>Ammount</td><td>On</td><td>Remove</td></tr>';
		$("#idTableOfPaid").html(tblHeader);
		//
		var userId = firebase.auth().currentUser.uid;
		//var databaseRef = firebase.database().ref('paid/');
		var allDataRows = '';
		var totalPaid = 0;

		dataSnapshot.forEach(function(childSnapshot) {
			//snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			//console.log('childData:',childData);
			//console.log('childKey',childKey);
			//console.log('userId',userId,':: paidById',childData.paidById)
			
			// NO need for this check now. As each user has its DB url unique
			/*
			if(childData.paidById === userId){
				//console.log('childData:',childData);
				// render this data
				var s = "<tr><td>"+childData.paidTo+"</td><td>"+childData.ammount+"</td><td>"+childData.paidOn+"</td><td>"+'<button id="'+childKey+'" type="button" class="btn btn-danger btnRemovePay"> X </button>'+"</td></tr>";
				//console.log(s);
				allDataRows += s;
				//
				totalPaid += Number(childData.ammount);
			}
			*/
			
			var s = "<tr><td>"+childData.paidTo+"</td><td>"+childData.ammount+"</td><td>"+childData.paidOn+"</td><td>"+'<button id="'+childKey+'" type="button" class="btn btn-danger btnRemovePay"> X </button>'+"</td></tr>";
			allDataRows += s;
			totalPaid += Number(childData.ammount);

		});

		//console.log('Total Paid : ',totalPaid);
		$("#idTotalExpense").html(' Total '+totalPaid+' Rupees.');

		//console.log('allDataRows',allDataRows);
		$("#idTableOfPaid").append(allDataRows);
		//
		return false;
	});
	//$(".btnRemovePay").on('click',function(event){
	$("#idTableOfPaid").on('click','.btnRemovePay',function(event){
		//alert('TODO: Delete the entry');
		//console.log(event.target);
		//console.log(event.target.id);
		
		var idToDelete = event.target.id;
		
		var deletePath = currentUserDBPath+'/'+idToDelete;
		console.log('Delete:deletePath:'+deletePath);
		//var databaseRef = firebase.database().ref('paid/'+idToDelete);
		var databaseRef = firebase.database().ref(deletePath);
		databaseRef.remove(function (error) {
			if (!error) {
				alert('Successfully Deleted.');
			}else{
				alert('Error!');
			}
		});

		return false;
	});
	//
	$("#btnSortByName").on('click',function(event){
		console.log('SortByName : TODO');
		utilsObj.test('SortByName : TODO');
	});
	$("#btnSortByDate").on('click',function(event){
		//console.log('SortByDate : WIP');
		console.group('SortByDate : Start :');
		
		var sortedArray = utilsObj.sortByDate(dataSnapshot);
		
		var oneItemInArray,sSingleRow,allDataRows,childKey;
		allDataRows = '';

		console.log('sortedArray',sortedArray);
		
		// rendering the table again
		
		var tblHeader = '<tr class="info"><td>To</td><td>Ammount</td><td>On</td><td>Remove</td></tr>';
		$("#idTableOfPaid").html(tblHeader);

		for (var i = 0; i < sortedArray.length; i++) {
			oneItemInArray = sortedArray[i];
			console.log('oneItemInArray:',oneItemInArray);

			var sSingleRow = "<tr><td>"+oneItemInArray.obj.paidTo+"</td><td>"+oneItemInArray.obj.ammount+"</td><td>"+oneItemInArray.obj.paidOn+"</td><td>"+'<button id="'+oneItemInArray.childKey+'" type="button" class="btn btn-danger btnRemovePay"> X </button>'+"</td></tr>";
			allDataRows += sSingleRow;
		}
		$("#idTableOfPaid").append(allDataRows);

		//
		console.log('SortByDate : End :');
		console.groupEnd();
	});
	//
  })
});