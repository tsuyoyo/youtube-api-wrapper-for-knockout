define(function() {

  function getVideoTitle(id, callback) {
    var url = 'http://gdata.youtube.com/feeds/api/videos/' + id + '?alt=json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
          var jsonData = JSON.parse(xhr.responseText);
          callback(jsonData.entry.title.$t);
        }
      }
    xhr.send();
  }
  
  return {
    getVideoTitle: getVideoTitle
  };

});

