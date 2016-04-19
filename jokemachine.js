//set a global variable used by all functions

var text = "";

//load a joke on page load
var main=function(){
  var xmlhttp = new XMLHttpRequest();//api for sight uses xml notation instead of JSON
  xmlhttp.addEventListener("load", getQuote)
  xmlhttp.open("GET", "http://api.icndb.com/jokes/random");
  xmlhttp.send();

//call for new joke on click
  $("#change").on('click', function() {
    xmlhttp.addEventListener("load", getQuote)
    xmlhttp.open("GET", "http://api.icndb.com/jokes/random");
    xmlhttp.send();
  });
};

//format xml response to be displayed on page
function getQuote() {
    var patts = /joke/i;
    var patte = /categories/i;
    var s = this.responseText.search(patts);
    var e = this.responseText.search(patte);
    s += 8;
    e -= 4;
    text = this.responseText.slice(s,e);
    $("#quote-text").html(text);
    twitter(text);
    facebook(text);
}

function twitter(text){
  var tweet = 'https://twitter.com/intent/tweet?text=' + text;
  $("#tweet").attr('xlink:href', tweet);
}

function facebook(){
 var fbPost = "https://www.facebook.com/dialog/share?app_id=241657646188348&display=popup&href=http%3A%2F%2Futterback.co%2Fcnjm.html&redirect_uri=https%3A%2F%2Fwww.facebook.com&quote=" + text;
 $("#facebook").attr('xlink:href', fbPost);
}

$(document).ready(main);
