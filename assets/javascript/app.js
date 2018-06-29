$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAjLL5b07IVCDO-ZAXzNbEZR9gsaxZ_2fA",
        authDomain: "june-2018-48693.firebaseapp.com",
        databaseURL: "https://june-2018-48693.firebaseio.com",
        projectId: "june-2018-48693",
        storageBucket: "june-2018-48693.appspot.com",
        messagingSenderId: "977127869466"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#submit").on("click", function () {
        event.preventDefault();
        var name = $("#name").val().trim();
        var dest = $("#dest").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();
        var freq = $("#freq").val().trim();

        database.ref("/trainData").push({
            name: name,
            destination: dest,
            start: firstTrainTime,
            frequency: freq
        });

        $("#name").val("");
        $("#dest").val("");
        $("#firstTrainTime").val("");
        $("#freq").val("");
    });

    /*function makeTable() {
    $("table").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tStart + "</td><td>" + tFreq + "</td></tr> "/*<td></tr>" + monthsWorked + "</td><td>" + total + "</td></tr>"*///);
//}

    database.ref("/trainData").on("child_added", function(snap){
        var tName = snap.val().name;
        var tDest = snap.val().destination;
        var tStart = snap.val().start;
        var tFreq = snap.val().frequency;

        var tStartConverted = moment(tStart, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(tStartConverted), "minutes");
        var tRemaining = diffTime % tFreq;
        var tMinutes = tFreq - tRemaining;
        var nextArrival = moment().add(tMinutes, "minutes");



        $("table").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + moment(nextArrival).format("hh:mm a") + "</td><td>" + tMinutes + "</td></tr>");
        console.log(moment(tMinutes, "X").format("m"));

    });

});