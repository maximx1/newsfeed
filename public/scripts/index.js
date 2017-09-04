$(document).ready(function() {
  $.getJSON("/api/feeds/query/bydate", function(data) {
    if(data.status === "ok") {
      var html = "<ul>";
      data.message.forEach(function(x) {
        html += "<li><div>" + x.pubdate + "</div><div>" + x["newsfeed-source"] + "</div><div>" + x.title + "</div></li>";
      })
      html += "</ul>";
      $("#feeds-pane").html(html);
    }
  });

});
