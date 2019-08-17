$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3Of5UrLHJIhqhyDJsvqEE_zN2N3rkBCc",
    authDomain: "project-1-1555381506180.firebaseapp.com",
    databaseURL: "https://project-1-1555381506180.firebaseio.com",
    projectId: "project-1-1555381506180",
    storageBucket: "project-1-1555381506180.appspot.com",
    messagingSenderId: "670039394224"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#btn").click(function(event) {
    event.preventDefault();
    database.ref().push(
      $("#user-input")
        .val()
        .trim()
    );

    var band = $("#user-input")
      .val()
      .trim();

    database.ref().push({
      band_artist: band
    });
  });
  database.ref().on("child_added", function(childSnapshot) {
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
      "&part=snippet&order=relevance&viewCount&videoCatagoryId=10&type=video&maxResults=10&&key=AIzaSyA0xBiZHOQfj7CI8kqWe_cnIC8M9CilW0w";

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
    });
  }
});
