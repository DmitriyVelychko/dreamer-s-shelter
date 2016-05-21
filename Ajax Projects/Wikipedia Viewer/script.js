function jsonp(url, callback) {

    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

var inputField = document.querySelector('.search-input');
var articleList = document.querySelector('.article-list');
var searchBtn = document.querySelector('.search-btn');

var getJsonp = function () {

    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + inputField.value + '&callback=JSON_CALLBACK';



    var getWiki = function (data) {

        articleList.innerHTML = "";

        if (!data.query) {
            var err = document.createElement('p');
            err.className = 'error'
            err.innerHTML = "There were no results matching the query."
            articleList.appendChild(err);
            return;
        }

        var data = data.query.pages;
        for (var i in data) {
            var link = document.createElement('a');
            var title = document.createElement('h3');
            var info = document.createElement('p');

            link.className = "wiki-info";
            link.href = "http://en.wikipedia.org/wiki?curid=" + data[i].pageid;
            link.target = "_blank";
            title.innerHTML = data[i].title;
            info.innerHTML = data[i].extract;

            articleList.appendChild(link);
            link.appendChild(title);
            link.appendChild(info);

        }
    };

    jsonp(url, getWiki)
};

searchBtn.addEventListener('click', getJsonp, false);