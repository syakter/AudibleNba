// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://audiblenba-93f47.firebaseio.com/"
});

var db = admin.database();


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
	agent.add("Hi, You've connected to Audible NBA Back End Service");
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function freethrows(agent) {

   // agent.add("Test Code: In FreeThrows Cloud Function");

    var dict = {}; // create an empty array
    var player = ""; // best player for sort
    var points= 0; // starting points for sort
  
   // Database Connection Code

    var reference = db.ref("league").child("top ten").child("free throw");
    reference.on("value", (snapshot) => {

      snapshot.forEach((playerInt) => {

   	  dict[playerInt.key] = playerInt.val() //adds key value pair to dictionary

      });
	  for(var key in dict) { // loops through dictionary values and chooses best
     
		if (dict[key] > points) {
    	  		player = key;
        		points = dict[key];
   	 	}
      	  }

	//prints to console found out on firebase console-functions-logs/agent to google
	 console.log(player);
	 agent.add("The best free throw shooter is "+player+" with "+points+" points");
   
 }, (errorObject) => {
      console.log("The read failed: heres why " + errorObject.code);
    });
}


  function points(agent) {
	
    var dict = {}; // create an empty array
    var player = ""; // best player for sort
    var points = 0; // starting points for sort

   // Database Connection Code

    var reference = db.ref("league").child("top ten").child("points");
    reference.on("value", (snapshot) => {


      snapshot.forEach((playerInt) => {

        dict[playerInt.key] = playerInt.val() // adds key value pair to dictionary
	
      });
        for(var key in dict) { // loops through dictionary values and chooses best

	    if (dict[key] > points) {
		player = key;
		points = dict[key];
	    }
	}

	// prints to console foubd out on firebase console-functions-logs/agent to google
	console.log(player);
	agent.add("The best scorer is "+player+" with "+points+" points");

}, (errorObject) => {
	console.log("The read failed: here's why " + errorObject.code);
	});
}

  function assists(agent) {

	var dict = {}; // create an empty area
	var player = ""; // best player for sort
	var assists = 0; // starting points for sort

	// Database Connection Code

	var reference = db.ref("league").child("top ten").child("assists");
	reference.on("value", (snapshot) => {

		snapshot.forEach((playerInt) => {

		dict[playerInt.key] = playerInt.val() // adds key value pair to dictionary
		
		});
			for(var key in dict) { // loops through dictionary values and chooses best

				if (dict[key] > assists) {
					player = key;
					assists = dict[key];
				}
			}

			// prints to console found out on firebase console-function-logs/agent to google
			console.log(player);
			agent.add("The best player is "+player+" with "+assists+" assists");

}, (errorObject) => {
	console.log("The read failed: here's why " + errorObject.code);
	});
} 
 
	
  
//add custom function and intent here
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('firstintent', fallback);
  intentMap.set('freeThrow', freethrows);
  intentMap.set('points' , points);
  intentMap.set('assists' , assists);
  agent.handleRequest(intentMap);

});





//Reference Code Below

// This is how you write to database
// ______________________________________

    //	var db = admin.database();
    //var ref = db.ref("usersbro");
    //var usersRef = ref.child("users");
    //usersRef.set({
    //  alanisawesome: {
    //    date_of_birth: "June 23, 1912",
    //    full_name: "Alan Turing"
    // },
    // gracehop: {
    //  date_of_birth: "December 9, 1906",
    // full_name: "Grace Hopper"
    //}
    //});
