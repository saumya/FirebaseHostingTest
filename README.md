Firebase Test
=============
 
 This application is for testing of firebase. This is done with jQuery and Firebase.

The `config.js` file is not committed as it contains the settings. However the config file is as simple as below

```
var allConfig = {
	firebase:{
		apiKey: "your-api-key",
        authDomain: "yourApp.firebaseapp.com",
        databaseURL: "https://yourApp.firebaseio.com",
        storageBucket: "yourApp.appspot.com",
        messagingSenderId: "yourAppSenderID"
	},
	app:{}
}
```

Currently its working fine as a proto.

### Done

- Add payment
- View all

### TODO
 - Check for implemeting this in a framework
 - UI fixing
 - UX fixing
 - Check if Native would be good or PWA