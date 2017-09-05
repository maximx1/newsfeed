$(document).ready(function() {
  $.getJSON("/api/feeds/query/bydate?limit=100", function(data) {
    if(data.status === "ok") {
      var html = "";
      data.message.forEach(function(x) {
        html += "<div class='date-badge div-row-item'>" + buildDate(x.pubdate) + "</div>";
        html += "<div class='div-row-item collapsed-info-pane info-pane'>";
        html += " <span class='source-text'>" + x["newsfeed-source"] + "</span><span class='time-text'>&nbsp;" + buildTime(x.pubdate) + "</span>";
        html += " <div><a href='" + x.link + "' target='_blank'>" + x.title + "</a></div>";
        html += "</div>";
      })
      html += "";
      $("#feeds-pane").html(html);
    }
  });
});

var buildDate = function(pubdate) {
  return moment(pubdate).format("[<div>]MMM[</div><div>]DD[</div>]")
};

var buildTime = function(pubdate) {
  return moment(pubdate).format("hh:mm:ss a")
}
