//
var utilsObj = {
	test: function(message){
		if(message===undefined){
			console.log('utilsObj : test :');
		}else{
			console.log('utilsObj : test : message=',message);
		}
	},
	sortByName: function(){
		console.log('utilsObj : sortByName :');
	},
	sortByDate: function(dataSnapshot,isTrue){
		//console.group('utilsObj : sortByDate : Start');
		
		//var dataObj = dataSnapshot.val();
		//console.log(dataArray);
		var dataArray = [];
		var resultArray = [];

		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			/*
			//console.log(obj);
			//console.log(obj.paidOn);
			
			var dt = new Date(obj.paidOn);
			//console.log('obj.paidOn',obj.paidOn);

			var yr = dt.getFullYear();
			var mot = dt.getMonth();
			var dat = dt.getDate();

			//console.log(yr+':'+mot+':'+dat);
			*/

			dataArray.push({obj:obj,childKey:childKey});
		});

		//console.log('dataArray',dataArray);
		dataArray.sort(function(firstObj,nextObj){
			//console.log('first',firstObj);
			//console.log('second',nextObj);
			var firstDate = new Date(firstObj.obj.paidOn);
			var nextDate = new Date(nextObj.obj.paidOn);
			//console.log(firstDate,'::',nextDate);
			//return (firstDate<nextDate);// sort from now to late
			//return (firstDate>nextDate);// sort from last to now
			if(isTrue){
				return (firstDate<nextDate);
			}else{
				return (firstDate>nextDate);
			}
		});
		//console.log('sorted : dataArray',dataArray);


		//console.log('utilsObj : sortByDate : End');
		//console.groupEnd();

		return dataArray;
	},
	getTotalOnDate: function(dataSnapshot,dateString){
		console.group('utilsObj:getTotalOnDate:');
		//var dDt = new Date(dateString);
		var total = 0;

		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			//var childKey = childSnapshot.key;			
			//console.log(obj);
			//console.log(obj.paidOn);

			//var dtPaidOn = new Date(obj.paidOn);
			
			//console.log('obj.paidOn',obj.paidOn);
			//console.log('dtPaidOn',dtPaidOn);
			//console.log('dDt',dDt);

			//if(dDt === dtPaidOn){
			if(dateString === obj.paidOn){
				//console.log("=============================",obj.paidOn);
				total += Number(obj.ammount);
			}
		});

		console.log('Total : ',total);

		console.groupEnd();

		return total;
	},
	getTotalPerPerson: function(dataSnapshot,personName){
		console.group('utilsObj:getTotalOnDate:');
		
		var total = 0;
		dataSnapshot.forEach(function(childSnapshot){
			var obj = childSnapshot.val();
			if(personName === obj.paidTo){
				total += Number(obj.ammount);
			}
		});

		console.groupEnd();

		return total;
	},
	getDataPerDate: function(dataSnapshot,dateString){
		console.log('utilsObj:getDataPerDate:');
		/*
		var dataArray = [];
		var total = 0;
		
		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;

			if(dateString === obj.paidOn){
				total += Number(obj.ammount);
				//console.log('data:',obj);
				//console.log('childKey:',childKey);
				dataArray.push({obj:obj,childKey:childKey});
			}
		});

		var result = {data:dataArray,total:total};
		return result;
		*/
		var total = 0;
		var aPayments = [];
		//
		dataSnapshot.forEach(function(childSnapshot){
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			if((childKey==='persons')||(childKey==='projects')){
				//Do Nothing
				//console.log('Exclude : childKey',childKey,obj);
			}else{
				if(dateString === obj.paidOn){
					// adding childkey to the object as we need it for `delete`
					obj.childKey = childKey;
					aPayments.push(obj);
					total += Number(obj.ammount);
				}
			}
		});
		// sort the array
		aPayments.sort(function(a,b){
			return(
				 (new Date(a['paidOn']).getTime()) - (new Date(b['paidOn']).getTime())
			)
		});
		//
		var result = {data:aPayments,total:total};
		return result;
	},
	getDataPerPerson: function(dataSnapshot,nameString){
		console.log('utilsObj:getDataPerPerson:');
		/*
		var dataArray = [];
		var total = 0;
		
		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;

			if(nameString === obj.paidTo){
				total += Number(obj.ammount);
				//console.log('data:',obj);
				//console.log('childKey:',childKey);
				dataArray.push({obj:obj,childKey:childKey});
			}
		});

		var result = {data:dataArray,total:total};
		*/
		
		var total = 0;
		var aPayments = [];
		//
		dataSnapshot.forEach(function(childSnapshot){
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			if((childKey==='persons')||(childKey==='projects')){
				//Do Nothing
				//console.log('Exclude : childKey',childKey,obj);
			}else{
				if(nameString === obj.paidTo){
					// adding childkey to the object as we need it for `delete`
					obj.childKey = childKey;
					aPayments.push(obj);
					total += Number(obj.ammount);
				}
			}
		});
		// sort the array
		aPayments.sort(function(a,b){
			return(
				 (new Date(a['paidOn']).getTime()) - (new Date(b['paidOn']).getTime())
			)
		});
		//
		var result = {data:aPayments,total:total};
		return result;
	},
	getDataForProject: function(dataSnapshot,nameString){
		console.log('utilsObj:getDataForProject:');
		/*
		var dataArray = [];
		var total = 0;
		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;

			if(nameString === obj.paidForProject){
				total += Number(obj.ammount);
				//console.log('data:',obj);
				//console.log('childKey:',childKey);
				dataArray.push({obj:obj,childKey:childKey});
			}
		});
		*/

		var total = 0;
		var aPayments = [];
		//
		dataSnapshot.forEach(function(childSnapshot){
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			if((childKey==='persons')||(childKey==='projects')){
				//Do Nothing
				//console.log('Exclude : childKey',childKey,obj);
			}else{
				if(nameString === obj.paidForProject){
					// adding childkey to the object as we need it for `delete`
					obj.childKey = childKey;
					aPayments.push(obj);
					total += Number(obj.ammount);
				}
			}
		});
		// sort the array
		aPayments.sort(function(a,b){
			return(
				 (new Date(a['paidOn']).getTime()) - (new Date(b['paidOn']).getTime())
			)
		});
		//
		var result = {data:aPayments,total:total};
		return result;
	},
	// Descending order
	sortAllByDate(allDataSnapshot){
		console.log('sortAllByDate, allDataSnapshot',allDataSnapshot);
		//console.log('sortAllByDate, allDataSnapshot.val()',allDataSnapshot.val());
		
		var aPayments = [];
		allDataSnapshot.forEach(function(childSnapshot){
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			
			//console.log('Key',childKey);
			//paidOn

			if((childKey==='persons')||(childKey==='projects')){
				//Do Nothing
				//console.log('Exclude : childKey',childKey,obj);
			}else{
				// adding childkey to the object as we need it for `delete`
				obj.childKey = childKey;
				aPayments.push(obj)
			}
		});
		//
		//console.log('aPayments: un sorted :',aPayments);
		// sort the array
		aPayments.sort(function(a,b){
			return(
				 (new Date(a['paidOn']).getTime()) - (new Date(b['paidOn']).getTime())
			)
		});
		//console.log('aPayments: sorted :',aPayments);

		return aPayments;
	}
};