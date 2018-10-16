const fetch = require('node-fetch')
var Twit = require('twit');
var config = require('./config.js');
var T = Twit(config);
const API_KEY = require('./youtubeKey.js')


function PostVideo(){
    console.log("I am running");
    const url = `https://www.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${API_KEY}`
    fetch(url)
        .then(response => response.json())
        .then((myJson) => {
            var allRegions = myJson.items;
            var randomNumber = Math.floor((Math.random() * allRegions.length) + 1);
            var cRegion = allRegions[randomNumber];
            return cRegion
        })
        .then((cRegion) =>{
            var regionCode = cRegion.snippet.gl;
            var regionName = cRegion.snippet.name;
            var url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=2&key=${API_KEY}&videoCategoryId=`
            //extra info for parts (contentDetails)
            fetch(url)
                .then(response => response.json())
                .then(function(myJson){
                    var title = getPostTitle(myJson);
                    var postURL = getPostURL(myJson);
                    var viewCount = getViews(myJson);
                    var getCommentCount = getComments(myJson);
                    var postText = `'${title}' is currently the number 1 trending video in ${regionName} with ${viewCount} views and ${getCommentCount} comments. ${postURL}`
                    console.log(postText);
                    return postText;
                })
                .then(function(text){
                    T.post('statuses/update', { status: `${text}` }, function(err, data, response) {
                         })
                    })
        })
}

function getPostURL(myJson){
    var id = myJson.items[0].id;
    var URL = `https://www.youtube.com/watch?v=${id}`
    return URL;
}
function getPostTitle(myJson){
    var title = myJson.items[0].snippet.title;
    return title;
}
function getViews(myJson){
    var view = myJson.items[0].statistics.viewCount;
    return view;
}
function getComments(myJson){
    var comments = myJson.items[0].statistics.commentCount;
    return comments;
}

//getMyTweets();
PostVideo();
setInterval(function(){PostVideo()},1000*60*60);//run every hour