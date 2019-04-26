$(document).ready(function() {
  var appearBand = $("#video-results");
  $("#btn").click(function(event) {
    event.preventDefault();
    var searchTerm =
      $("#user-input")
        .val()
        .trim() + "+videos";
    youtube(searchTerm);
  });

  function youtube(searchTerm) {
    $("#video-results").empty();

    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?q=" +
      searchTerm +
      "&part=snippet&order=viewCount&videoCatagoryId=10&type=video&maxResults=10&&key=AIzaSyCAORs5q_pWWueYAyBvhfbLzjJ_nJX5Yu4";

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
  }

  //   var results=response.result;

  //  $.each(results.items
});
