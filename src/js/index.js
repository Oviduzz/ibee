//get input value
function searchAccount(){
    return document.getElementById('input-search').value;
}
document.getElementById('button-search').addEventListener("click", searchAccount);
var params = {screen_name: "twitterapi"};
var paramJson =  JSON.stringify(params);

var callUrl =  '/api/tweets/';

function loadXMLDoc(paramJson) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", callUrl, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    xhttp.send(paramJson);
}
loadXMLDoc(paramJson);
