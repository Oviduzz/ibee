//get input value

document.getElementById('button-search').addEventListener("click", function () {
    var searchField = document.getElementById('input-search').value;
    document.getElementById('response-container').innerHTML = "";
    var params = {
        screen_name: searchField
    };

    var paramJson = JSON.stringify(params);

    var callUrl = '/api/tweets/';

    function loadTweetData(paramJson) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", callUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var reqResponse = JSON.parse(this.response);
                reqResponse.tweets.forEach(function (object) {
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];
                    var tweetTime = object.created_at,
                        time = new Date(tweetTime),
                        tDay = time.getDay();
                    var tMonth = monthNames[time.getMonth()];
                    var tYear = time.getFullYear();
                    var posted = tDay + ' ' + tMonth +' '+ tYear;

                    var tweetText = object.text;

                    var tweetUsername = object.user.name;
                    var tweetScreenname = object.user.screen_name;
                    var tweetUserProfileImg = object.user.profile_image_url;
                    var tweetRetweet = object.retweet_count;
                    var tweetFavourite = object.favorite_count;


                    if (object.entities.hasOwnProperty('media')) {
                        var tweetImage = '<img src="'+object.entities.media[0].media_url+'"/>';

                    } else {
                        tweetImage = '';
                    }
                     var html = '<div class="content-section" id="clearBox"><div class="wrapper"><div class="wrap-response"><div class="block-header"><div class="user-detail"><img src="' + tweetUserProfileImg + '" alt="logo"/><div class="detail-wrap"><div class="title-name">' + tweetUsername + '</div><div class="title-who">@' + tweetScreenname + '  •  ' + posted + '</div></div></div><div class="collapse"><i class="fa fa-chevron-up" aria-hidden="true"></i></div></div><div class="block-body"><div class="description">' + tweetText + '</div><div class="image">' + tweetImage +'</div></div><div class="block-footer"><div class="social-icons"><i class="fa fa-reply" aria-hidden="true"></i>' +  '<i class="fa fa-retweet" aria-hidden="true"></i>' + tweetRetweet + '<i class="fa fa-heart" aria-hidden="true"></i>' + tweetFavourite + '</div></div></div></div></div>';


                    var mainDiv = document.createElement('div');
                    mainDiv.innerHTML = html;
                    document.getElementById('response-container').appendChild(mainDiv);
                });
                var img = document.querySelectorAll('.image');
                var footer = document.getElementsByClassName('block-footer');
                document.querySelectorAll(".collapse").forEach(function(btn){
                    btn.addEventListener("click", function () {
                        this.classList.toggle('toggleChevron');
                    })
                });


                // collapse.addEventListener("click", function(){
                //    this.classList.toggle('toggleChevron');
                //     img.classList.toggle('hide-div');
                //     footer.classList.toggle('hide-div');
                //
                // });
            }
        };

        xhttp.send(paramJson);
    }
    loadTweetData(paramJson);
});



