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




process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  var db = admin.database();

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
    var points = 0; // starting points for sort

    // Database Connection Code

    var reference = db.ref("league").child("top ten").child("free throw");
    reference.on("value", (snapshot) => {

      snapshot.forEach((playerInt) => {

        dict[playerInt.key] = playerInt.val() //adds key value pair to dictionary

      });
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > points) {
          player = key;
          points = dict[key];
        }
      }

      //prints to console found out on firebase console-functions-logs/agent to google
      console.log(player);
      agent.add("The player who made the most free throws in the 2018 NBA playoffs was " + player + " with " + points + " ");

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
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > points) {
          player = key;
          points = dict[key];
        }
      }

      // prints to console foubd out on firebase console-functions-logs/agent to google
      console.log(player);
      agent.add("The player with the most points in the 2018 NBA playoffs was " + player + " with " + points + " ");

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
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > assists) {
          player = key;
          assists = dict[key];
        }
      }

      // prints to console found out on firebase console-function-logs/agent to google
      console.log(player);
      agent.add("The player with the most assists in the 2018 NBA playoffs was " + player + " with " + assists + " ");

    }, (errorObject) => {
      console.log("The read failed: here's why " + errorObject.code);
    });
  }

  function steals(agent) {

    var dict = {}; // create an empty area
    var player = ""; // best player for sort
    var steals = 0; // starting points for sort

    // Database Connection Code

    var reference = db.ref("league").child("top ten").child("steals");
    reference.on("value", (snapshot) => {

      snapshot.forEach((playerInt) => {

        dict[playerInt.key] = playerInt.val() // adds key value pair to dictionary

      });
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > steals) {
          player = key;
          steals = dict[key];
        }
      }

      // prints to console found out on firebase console-function-logs/agent to google
      console.log(player);
      agent.add("The player with most steals in the 2018 NBA playoffs was " + player + " with " + steals + " ");

    }, (errorObject) => {
      console.log("The read failed: here's why " + errorObject.code);
    });
  }

  function rebounds(agent) {

    // agent.add("Test Code: In FreeThrows Cloud Function");

    var dict = {}; // create an empty array
    var player = ""; // best player for sort
    var rebounds = 0; // starting points for sort

    // Database Connection Code

    var reference = db.ref("league").child("top ten").child("rebounds");
    reference.on("value", (snapshot) => {

      snapshot.forEach((playerInt) => {

        dict[playerInt.key] = playerInt.val() //adds key value pair to dictionary

      });
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > rebounds) {
          player = key;
          rebounds = dict[key];
        }
      }

      //prints to console found out on firebase console-functions-logs/agent to google
      console.log(player);
      agent.add("The player with the most rebounds in the 2018 NBA playoffs was " + player + " with " + rebounds + " ");

    }, (errorObject) => {
      console.log("The read failed: heres why " + errorObject.code);
    });
  }

  function threepointers(agent) {

    // agent.add("Test Code: In FreeThrows Cloud Function");

    var dict = {}; // create an empty array
    var player = ""; // best player for sort
    var threepointers = 0; // starting points for sort

    // Database Connection Code

    var reference = db.ref("league").child("top ten").child("three point");
    reference.on("value", (snapshot) => {

      snapshot.forEach((playerInt) => {

        dict[playerInt.key] = playerInt.val() //adds key value pair to dictionary

      });
      for (var key in dict) { // loops through dictionary values and chooses best

        if (dict[key] > threepointers) {
          player = key;
          threepointers = dict[key];
        }
      }

      //prints to console found out on firebase console-functions-logs/agent to google
      console.log(player);
      agent.add("The player who made the most threes in the 2018 playoffs was " + player + " with " + threepointers + " ");

    }, (errorObject) => {
      console.log("The read failed: heres why " + errorObject.code);
    });
  }





  //add custom function and intent here
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('firstintent', fallback);
  intentMap.set('freeThrow', freethrows);
  intentMap.set('points', points);
  intentMap.set('assists', assists);
  intentMap.set('steals' , steals);
  intentMap.set('rebounds' , rebounds);
  intentMap.set('threePoints' , threepointers);
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
