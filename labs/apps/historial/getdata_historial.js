/*!
=> GetData Historial v1.0.1
=> Copyright 2018 Kenny Cruz | github.com/jokenox (zkreations team)
=> Licensed under MIT | github.com/zkreations/GetData/blob/master/LICENSE
*/
var _app = document.getElementById("wjs-history"),
    _blogId = _app.dataset.blogid,
    _apiKey = _app.dataset.apikey,
    _months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    _div = document.createElement("div"),
    _ul = document.createElement("ul"),
    _collection = [],
    _nextPageToken,
    lastDate;

function getData(){
    var script = document.createElement('script'),
        jsonUrl = "https://www.googleapis.com/blogger/v3/blogs/" + _blogId + "/posts" + "?key=" + _apiKey + "&maxResults=500&fields=nextPageToken%2Citems(published,url,title)&callback=manageData";

  if(_nextPageToken){
    jsonUrl += "&pageToken=" + _nextPageToken;
    _nextPageToken = undefined;
  }
  script.type = 'text/javascript';
  script.src = jsonUrl;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function manageData(json){
  json.items.forEach(function(element, index){
    var url = element.url.substring(0, element.url.indexOf("/", 8) + 1),
        date = element.published.substring(0, 10).split("-"),
        li = document.createElement("li");
        li.className = "wjs-history__list-element";
        li.innerHTML = "<div class='list-element__count'>" + date[2] + "</div><div class='list-element__data'><a class='list-element__title' target='_blank' href='" + element.url + "'>" + element.title + "</a><span class='list-element__date'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'/><path d='M0 0h24v24H0z' fill='none'/><path d='M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'/></svg>" + date.join("-") + "</span></div>";

    if(date[0] + date[1] == lastDate){
      _ul.appendChild(li);
      lastDate = date[0] + date[1];
    }
  else{
      _div.appendChild(_ul);
      if(lastDate) _app.appendChild(_div);
      _div = document.createElement("div");
      _div.className = "wjs-history";
      _div.innerHTML = "<h2 class='wjs-history__title'><a class='wjs-history__title-url' target='_blank' href='" + url + date[0] + "_" + date[1] + "_01_archive.html'>" + _months[Number(date[1]) - 1] + " " + date[0] + "</a></h2>";
      _ul = document.createElement("ul");
      _ul.className = "wjs-history__list";
      _ul.appendChild(li);
      lastDate = date[0] + date[1];
    }

    _collection.push(element);
  });
  _nextPageToken = json.nextPageToken;

  if(_nextPageToken){
    getData();
  }
}

getData();