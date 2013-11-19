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
    callApi(url, callback, function(jsonData) {
      var entry = jsonData.feed.entry;

      // てきとう。entryのフィールドをしらべて、json objectをつくる
      for (var i=0; i<entry.length; i++) {
        
        // contentUrl = entry[i].content.src;
        
        // コンテンツのURL
        for (var j=0; j<entry[i].media$group.media$content.length; j++) {
          var content = entry[i].media$group.media$content[j];
          if (content.isDefault) {
            var contentUrl = content.url;
          }
        }

        // サムネイル
        for (var j=0; j<entry[i].media$group.media$thumbnail.length; j++) {
          var content = entry[i].media$group.media$thumbnail[j];
          if (content.yt$name === 'default') {
            var thumbnail = content.url;
          }
        }        

        // Title
        var title = entry[i].media$group.media$title.$t;

      }

      return null;
    });

  }

  function callApi(apiUrl, callback, resultGenerator) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
          var jsonData = JSON.parse(xhr.responseText);
          callback(resultGenerator(jsonData));
        }
      }
    xhr.send();
  }

  return {
    getVideoTitle: getVideoTitle,
    searchVideo: searchVideo
  };

});

