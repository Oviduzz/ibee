
document.getElementById('button-search').addEventListener("click", function () {
    //get input value
    var searchField = document.getElementById('input-search').value;
    document.getElementById('response-container').innerHTML = "";
    
    // add input.value to params for POST
    var params = {
        screen_name: searchField
    };
    var paramJson = JSON.stringify(params);
    var callUrl = '/api/tweets/';

    //POST request
    function loadTweetData(paramJson) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", callUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                var reqResponse = JSON.parse(this.response);
                
                if (reqResponse.tweets.length === 0) {
                    //display invalid username error
                  var nodata= document.getElementById('no-data');
                    nodata.classList.add('display-data');
                    
                } else {
                    //remove invalid username error
                    var nodataa= document.getElementById('no-data');
                    nodataa.classList.remove('display-data');
                    
                    //iterate response
                    reqResponse.tweets.forEach(function (object, index) {
                        
                        //format date when tweet was posted
                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];
                        var tweetTime = object.created_at,
                            time = new Date(tweetTime),
                            tDay = time.getDay();
                        var tMonth = monthNames[time.getMonth()];
                        var tYear = time.getFullYear();
                        var posted = tDay + ' ' + tMonth + ' ' + tYear;

                        // define all variables that we need in mainDiv
                        var tweetText = object.text;
                        var tweetUsername = object.user.name;
                        var tweetScreenname = object.user.screen_name;
                        var tweetUserProfileImg = object.user.profile_image_url;
                        var tweetRetweet = object.retweet_count;
                        var tweetFavourite = object.favorite_count;
                        var dataID = object.id_str;

                        //check if we have tweet pictures
                        if (object.entities.hasOwnProperty('media')) {
                            var tweetImage = '<img src="' + object.entities.media[0].media_url + '"/>';

                        } else {
                            tweetImage = '';
                        }
                        
                       //create div and insert into page
                        var html = '<div class="content-section" id="clearBox"><div class="wrapper"><div class="wrap-response"><div class="block-header"><div class="user-detail"><img src="' + tweetUserProfileImg + '" alt="logo"/><div class="detail-wrap"><div class="title-name">' + tweetUsername + '</div><div class="title-who">@' + tweetScreenname + '  •  ' + posted + '</div></div></div><div class="collapse"><i class="fa fa-chevron-up" data-target="target' + index + '" data-text="text'+index+'" aria-hidden="true"></i></div></div><div class="description" id="text'+index+'">' + tweetText + '</div><div class="block-body" id="target' + index + '"><div class="image" >' + tweetImage + '</div><div class="block-footer"><div class="social-icons"><i class="fa fa-reply" aria-hidden="true"></i>' + '<i class="fa fa-retweet" data-retweet=' + dataID + ' aria-hidden="true"></i>' + tweetRetweet + '<i class="fa fa-heart" data-heart=' + dataID + ' aria-hidden="true"></i>' + tweetFavourite + '</div></div></div></div></div></div>';
                        
                        var mainDiv = document.createElement('div');
                        mainDiv.innerHTML = html;
                        document.getElementById('response-container').appendChild(mainDiv);

                    });
                }
                // request function for events
                addEventListeners();
            }
        };

        xhttp.send(paramJson);
    }

    loadTweetData(paramJson);

    function addEventListeners(){
        /// Retweet request
        document.querySelectorAll(".fa-retweet").forEach(function(retweetBtn){
            retweetBtn.addEventListener("click", function(event){
                var paramRetweet = {id: event.target.getAttribute('data-retweet')};
                var paramRetweeted = JSON.stringify(paramRetweet);
                var retweetUrl = '/api/retweets/';
                this.classList.toggle('tweet-active');

                function postData(paramRetweeted) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", retweetUrl, true);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.setRequestHeader("Accept", "application/json");
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var reqResponse = JSON.parse(this.response);

                        }
                    };

                    xhttp.send(paramRetweeted);
                }
                postData(paramRetweeted);
            })
        });

        /// Favorite request
        document.querySelectorAll(".fa-heart").forEach(function(favBtn){
            favBtn.addEventListener("click", function(event){
                var paramFav = {id: event.target.getAttribute('data-heart')};
                var paramFaved = JSON.stringify(paramFav);
                var favUrl = '/api/favorites/';
                this.classList.toggle('heart-active');

                function postData(paramFaved) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("POST", favUrl, true);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.setRequestHeader("Accept", "application/json");
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var reqResponse = JSON.parse(this.response);

                        }
                    };

                    xhttp.send(paramFaved);
                }
                postData(paramFaved);
            })
        });

        //hide tweet body
        document.querySelectorAll(".collapse").forEach(function (btn) {
            btn.addEventListener("click", function (event) {
                this.classList.toggle('toggleChevron');
                document.querySelector("#"+event.target.getAttribute("data-target")).classList.toggle("hide-div");
                document.querySelector("#"+event.target.getAttribute("data-text")).classList.toggle("truncate");

            })
        });


    }
});

