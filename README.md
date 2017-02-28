Firebase Test
=============
 
 This application is for testing of firebase.

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