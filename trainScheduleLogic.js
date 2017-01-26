// Initialize Firebase
var config = {
  apiKey: "AIzaSyCnQreFLEiP-hSPchfPpYL2LFRmi8N4mjQ",
  authDomain: "week7train-cd938.firebaseapp.com",
  databaseURL: "https://week7train-cd938.firebaseio.com",
  storageBucket: "week7train-cd938.appspot.com",
  messagingSenderId: "180185344355"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Calculating next arrival of train
  var tFrequency = trainFrequency;

  // First Time set back 1 year
  var firstTime = moment().subtract(1, "years");

  // Current time
  var currentTime = moment();

  // Difference between times
  var timeDiff = moment().diff(moment(firstTime), "minutes");

  // Time apart
  var tRemainder = timeDiff % tFrequency;

  // Minutes until train
  var tTillTrain = tFrequency - tRemainder;

  // Arrival of next train
  var nextTrain = moment().add(tTillTrain, "minutes");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + "" + "</td></tr>");
});
