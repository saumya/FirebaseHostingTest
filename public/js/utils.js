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
	sortByDate: function(dataSnapshot){
		//console.group('utilsObj : sortByDate : Start');
		
		//var dataObj = dataSnapshot.val();
		//console.log(dataArray);
		var dataArray = [];
		var resultArray = [];

		dataSnapshot.forEach(function(childSnapshot){
			
			var obj = childSnapshot.val();
			var childKey = childSnapshot.key;
			
			//console.log(obj);
			//console.log(obj.paidOn);
			
			var dt = new Date(obj.paidOn);
			//console.log('obj.paidOn',obj.paidOn);

			var yr = dt.getFullYear();
			var mot = dt.getMonth();
			var dat = dt.getDate();

			//console.log(yr+':'+mot+':'+dat);
			dataArray.push({obj:obj,childKey:childKey});
		});

		//console.log('dataArray',dataArray);
		dataArray.sort(function(firstObj,nextObj){
			//console.log('first',firstObj);
			//console.log('second',nextObj);
			var firstDate = new Date(firstObj.obj.paidOn);
			var nextDate = new Date(nextObj.obj.paidOn);
			//console.log(firstDate,'::',nextDate);
			return (firstDate<nextDate);// sort from now to late
			//return (firstDate>nextDate);// sort from last to now
		});
		//console.log('sorted : dataArray',dataArray);


		//console.log('utilsObj : sortByDate : End');
		//console.groupEnd();

		return dataArray;
	}
};