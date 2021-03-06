/*!
=> getData.js v1.0.0
=> Copyright 2018 Kenny Cruz | github.com/jokenox (zkreations team)
=> Licensed under MIT | github.com/zkreations/GetData/blob/master/LICENSE
*/
var apiKey = "apiKey", // Leer: zkreations.com/get-apikey
    blogId = "blogId",
    fields = "items(url,title)", // Leer: developers.google.com/blogger/docs/3.0/performance#partial-response
    app = document.getElementById("app"),  // Modificar o borrar
    nextPageToken,
    collection = [];

function getData() {
    var script = document.createElement('script'),
        jsonUrl = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts" + "?key=" + apiKey + "&maxResults=500&fields=nextPageToken," + fields + "&callback=manageData";
    if (nextPageToken) {
        jsonUrl += "&pageToken=" + nextPageToken;
        nextPageToken = undefined;
    }
    script.type = 'text/javascript';
    script.src = jsonUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function manageData(json) {
    json.items.forEach(function(element, index) {

        // Codigo con un ejemplo. Puedes borrar de aqui
        var a = document.createElement('a');
        a.href = element.url;
        a.textContent = element.title
        app.appendChild(a);
        // Hasta aqui

        collection.push(element);
    });
    nextPageToken = json.nextPageToken;
    if (nextPageToken) {
        getData();
    }
}
getData();