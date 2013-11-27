define(function() {

  /*

  */


  function getVideoTitle(id, callback) {
    var url = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?alt=json';
    callApi(url, callback, function(jsonData) {
      return jsonData.entry.title.$t;
    });
  }


// http://gdata.youtube.com/feeds/api/videos/-/blue?v=2&max-results=2&alt=json
  /**
  http://gdata.youtube.com/feeds/api/videos?
    alt=json
    &q=<keyword>
    &start-index=0
    &max-results=10
    &v=2
  */
  function searchVideo(keyword, callback, startIndex) {
    var url = 'http://gdata.youtube.com/feeds/api/videos/-/' + keyword
      + '?v=2' 
      + '&alt=json' 
      + '&max-results=10'
    callApi(url, callback, parseJson);
  }

  function parseJson(jsonData) {
    var entry = jsonData.feed.entry;
    var videos = [];
    for (var i=0; i<entry.length; i++) {
      videos.push(parseEntry(entry[i]));
    }
    return videos;    
  }

  function parseEntry(entry) {
    var contentUrl;
    var thumbnail;
    var title;

    // Content URL
    entry.media$group.media$content.forEach(function(value) {
      if (value.isDefault) {
        contentUrl = value.url;
      }
    });

    // サムネイル
    entry.media$group.media$thumbnail.forEach(function(value) {
      var content = value;
      if (content.yt$name === 'default') {
        thumbnail = content.url;
      }
    });
  
    // Title
    title = entry.media$group.media$title.$t;

    return {contentUrl: contentUrl, thumbnail: thumbnail, title: title};
  }

  function callApi(apiUrl, callback, jsonParser) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
          var jsonData = JSON.parse(xhr.responseText);
          callback(jsonParser(jsonData));
        }
      }
    xhr.send();
  }

  return {
    getVideoTitle: getVideoTitle,
    searchVideo: searchVideo
  };

});

