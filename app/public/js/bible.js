var apiURL = "http://www.esvapi.org/v2/rest/passageQuery?key=";
var authorization = "52b49e872584ce09ba2944bd4e86d922bb9bef7f";
var input = $(".bible");
var bible = $(".bibleText");
var button = $(".submit");

$(document).ready(function() {
    function getBible() {
        axios.get(apiURL + authorization + input.value)
        .then(function(response){
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    }

    button.on("click", function() {
        getBible();
    })
});