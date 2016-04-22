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
  text = text.replace(/&quot;/g, "%22");//twitter recognizes %22 but not &quot;
  var tweet = 'https://twitter.com/intent/tweet?text=' + text;
  $("#tweet").attr('xlink:href', tweet);
}

function facebook(){
 text = text.replace(/&quot;/g, "%22");//facebook recognizes %22 but not &quot;
 var fbPost = "https://www.facebook.com/dialog/share?app_id={appIDgoesherewithoutbrackets}&display=popup&href=http%3A%2F%2Futterback.co%2Fcnjm.html&redirect_uri=https%3A%2F%2Fwww.facebook.com&quote=" + text;
 $("#facebook").attr('xlink:href', fbPost);
}

$(document).ready(main);
