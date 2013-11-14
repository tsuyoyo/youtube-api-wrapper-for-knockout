define(function() {

  function getVideoTitle(id, callback) {
    var url = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?alt=json';
    callApi(url, callback, function(jsonData) {
      return jsonData.entry.title.$t;
    });
  }

  /**
  http://gdata.youtube.com/feeds/api/videos?
    alt=json
    &q=<keyword>
    &start-index=0
    &max-results=10
    &v=2
  */
  function searchVideo(keyword, callback) {


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
    getVideoTitle: getVideoTitle
  };

});

