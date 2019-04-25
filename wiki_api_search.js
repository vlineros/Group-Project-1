// ************************ NEED TO CHECK YOUTUBE FOR CORRECT CATEGORY FIRST **************************
function parseIntro(targetString) {
  var newString = targetString.split(".", 4);
  var formatString = "";
  for (var i = 0; i < newString.length; i++) {
    formatString += newString[i] + ".";
  }
  return formatString;
}
$(document).ready(function() {
  $("#btn").on("click", function(event) {
    event.preventDefault();
    var searchObject = $("#user-input")
      .val()
      .trim();
    if (searchObject != "") {
      function parseIntro(targetString) {
        var newString = targetString.split(".", 4);
        var formatString = "";
        for (var i = 0; i < newString.length; i++) {
          formatString += newString[i] + ".";
        }
        return formatString;
      }
      console.log(searchObject);
      var pageId;
      var url;
      $.ajax({
        url:
          "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=" +
          searchObject +
          "&srlimit=1&format=json",
        method: "GET"
      }).then(function(response) {
        pageId = response.query.search[0].pageid;
        console.log(response);
        $.ajax({
          url:
            "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=info&pageids=" +
            pageId +
            "&inprop=url&format=json",
          method: "GET"
        }).then(function(response) {
          console.log(response);
          url = response.query.pages[pageId].fullurl;
          $.ajax({
            url:
              "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=" +
              searchObject,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            console.log(pageId);
            var bio = response.query.pages[pageId].extract;
            var intro = parseIntro(bio);
            $("#bio-results").text(intro);
            $("<a>Learn More<a>")
              .attr("href", url)
              .appendTo($("#bio-link-results"));
          });
        });
      });
    }
  });
});
