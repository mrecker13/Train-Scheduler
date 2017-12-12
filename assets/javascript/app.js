$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCc4mOKps2CeRhtGsWCCjiMiC3s7KurnM4",
        authDomain: "train-scheduler-96604.firebaseapp.com",
        databaseURL: "https://train-scheduler-96604.firebaseio.com",
        projectId: "train-scheduler-96604",
        storageBucket: "",
        messagingSenderId: "718193896038"
    };
    firebase.initializeApp(config);

    // database variable
    var database = firebase.database();

    // when the submit button is clicked
    $("#submit").on("click", function(event) {
        event.preventDefault();

        // grab values of the input fields
        var name = $("#name").val().trim();
        var where = $("#where").val().trim();
        var time = $("#time").val().trim();
        var freq = $("#freq").val().trim();
        // log values
        // console.log(name);
        // console.log(where);
        // console.log(time);
        // console.log(freq);

        // send input to the firebase database
        database.ref().push({
            //create keyword and corresponding variables
            name: name,
            where: where,
            time: time,
            freq: freq,
        });

        // empty the fields after you click submit
        name = $("#name").val("");
        where = $("#where").val("");
        time = $("#time").val("");
        freq = $("#freq").val("");
    })

    // recall the latest child added to firebase
    database.ref().on("child_added", function(childSnapShot) {
        // log the value
        // console.log(childSnapShot.val());

        // variables for all the train data
        var trainName = childSnapShot.val().name;
        var trainWhere = childSnapShot.val().where;
        var trainTime = childSnapShot.val().time;
        var trainFreq = childSnapShot.val().freq;

        // console.log(trainName);
        // console.log(trainWhere);
        // console.log(trainTime);
        // console.log(trainFreq);

        var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(timeConverted);
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment(currentTime).diff(moment(timeConverted), "minutes");
        console.log("difference: " + diffTime);
        var timeRemainder = diffTime % trainFreq;
        console.log("remainder: " + timeRemainder);
        var minutesUntilTrain = trainFreq - timeRemainder;
        console.log("Minutes til train: " + minutesUntilTrain);
        var nextTrain = moment().add(minutesUntilTrain,"minutes").format("hh:mm a");
        console.log("next train: " + nextTrain);

        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainWhere + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + minutesUntilTrain + "</td></tr>");

    })


});