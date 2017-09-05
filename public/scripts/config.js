$(document).ready(function() {
  $.getJSON("api/feeds", function(data) {
    if(data.status === "ok") {
      var html = "";
      data.message.forEach(function(x) {
        html += "<div id='" + x._id + "' class='div-row width-100'><div class='feed-source div-row-item'>" + x.source + "</div><div class='feed-url div-row-item'>url: " + x.url + "</div></div>";
      })
      html += "";
      $("#sources-pane").html(html);
    }
  });

  $.getJSON("api/feeds/counts", function(data) {
    if(data.status === "ok") {
      var html = "<ul>";
      data.message.forEach(function(x) {
        html += "<li>source: " + x._id + ", counts: " + x.count + "</li>";
      })
      html += "</ul>";
      $("#counts-pane").html(html);
    }
  });
});
