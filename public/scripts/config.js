$(document).ready(function() {
  $.getJSON("api/feeds", function(data) {
    if(data.status === "ok") {
      var html = "<ul>";
      data.message.forEach(function(x) {
        html += "<li>source: " + x.source + ", url: " + x.url + "</li>";
      })
      html += "</ul>";
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
