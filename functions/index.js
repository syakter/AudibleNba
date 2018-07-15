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

  function welcome(agent) {
    agent.add(`Welcome to my agent! Trey, you connected to a welcome cloud function `);

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




    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("usersbro");
    var usersRef = ref.child("users");

    var league = db.ref("league");
    var standard = league.child("standard");

    // Attach an asynchronous callback to read the data at our posts reference
    standard.on("value", (snapshot) => {
      snapshot.forEach((playerInt) => {
        console.log(playerInt.val().firstName + playerInt.val().lastName);
        agent.add(playerInt.val().firstName + playerInt.val().lastName);
      });
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });



  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('firstintentt', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
