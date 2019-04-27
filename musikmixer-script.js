$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOo1Vfv_m2lUqlJ_CWgyej4aKDi0bJt14",
    authDomain: "group-project-1-7d1c9.firebaseapp.com",
    databaseURL: "https://group-project-1-7d1c9.firebaseio.com",
    projectId: "group-project-1-7d1c9",
    storageBucket: "group-project-1-7d1c9.appspot.com",
    messagingSenderId: "317550528842"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#btn").click(function (event) {
    event.preventDefault();
    database.ref().push($("#user-input").val().trim());


    var band = $("#user-input").val().trim();

  database.ref().push({
    band_artist: band,
    

  });
});
database.ref().on("child_added", function (childSnapshot) {

  var band = childSnapshot.val().band;
    
});


  var appearBand = $("#video-results");
  $("#btn").click(function(event) {
    event.preventDefault();
    var searchTerm =
      $("#user-input")
        .val()
        .trim() + "+music+videos";
    youtube(searchTerm);
  });

  function youtube(searchTerm) {
    $("#video-results").empty();

    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?q=" +
      searchTerm +
      "&part=snippet&order=relevance&viewCount&videoCatagoryId=10&type=video&maxResults=10&&key=AIzaSyCAORs5q_pWWueYAyBvhfbLzjJ_nJX5Yu4";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(queryURL);

      console.log(response.items[0].snippet.thumbnails.high.url);

      for (i = 0; i < 10; i++) {
        var imageTitle = response.items[i].snippet.title;

        console.log(imageTitle);

        var imageSrc = response.items[i].snippet.thumbnails.high.url;

        var imageId = response.items[i].id.videoId;

        var imageUrl = `https://www.youtube.com/watch?v=${imageId}`;
        console.log(imageUrl);

        var anchorLink = $("<a>");
        anchorLink.attr("href", imageUrl);
        anchorLink.attr("target", "_blank");

        var bandImage = $("<img>");
        bandImage.attr("src", imageSrc);

        anchorLink.append(bandImage);
        // bandImage.attr('href', imageUrl);

        var title = $("<p>");

        title.text("Title: " + response.items[i].snippet.title);
        $(appearBand).append(title);

        appearBand.append(anchorLink);
      }

      // https://www.youtube.com/watch?v=
    });
 

  //   var results=response.result;

  //  $.each(results.items
});
