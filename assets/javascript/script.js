var searchButtons = ["cat", "dog", "fish"];
var offsetNum = 0;
var queryURL = "";


placeButtons();

function placeButtons() {

    console.log("start")

    $("#gifButtons").empty();

    for (i = 0; i < searchButtons.length; i++) {

        var newBtn = $("<button>");
        newBtn.addClass("gifBtn btn btn-secondary m-1");
        newBtn.attr("data-term", searchButtons[i]);
        newBtn.text(searchButtons[i]);
        console.log(newBtn);
        $("#gifButtons").append(newBtn);
        console.log("end of round")

    }

}

$("#addButton").on("click", function () {

    var newTerm = $("#newInput").val().trim();
    searchButtons.push(newTerm);

    placeButtons();

});

function displayGifs() {

    $("#gifImages").empty();

    offsetNum = 0;
    console.log("offset Num: " + offsetNum);


    var key = "ztB99PNKQy7VmLwq0qAKqeMoWmxy8NMA"
    // var keyB = "dc6zaTOxFJmzC"


    var getTerm = $(this).attr("data-term");
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + getTerm + "&limit=10&rating=PG";

    $.ajax({

            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            var results = response.data

            console.log(response)

            for (var i = 0; i < results.length; i++) {

                var div = $("<div>");
                div.addClass("col-sm-3");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var imageUrl = results[i].images.fixed_height_still.url;
                var newImage = $("<img>");
                newImage.attr("data-still", results[i].images.fixed_height_still.url);
                newImage.attr("data-animate", results[i].images.fixed_height.url);
                newImage.attr("data-state", "still");
                newImage.addClass("gif fullWidth");

                newImage.attr("src", imageUrl);
                newImage.attr("alt", "Gif");


                $(div).prepend(p);
                $(div).prepend(newImage);
                $("#gifImages").prepend(div);


            }


        });

}

function toggleAnimate() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };

};

$(document).on("click", ".gifBtn", displayGifs);
$(document).on("click", ".gif", toggleAnimate);
$("#moreButton").on("click", function () {

    offsetNum += 10;
    console.log("offset num:" + offsetNum)
    var queryUrlOffset = queryURL + "&offset=" + offsetNum
    console.log(queryUrlOffset)
    $.ajax({

            url: queryUrlOffset,
            method: "GET"
        })

        .then(function (response) {

            var results = response.data

            console.log(response)

            for (var i = 0; i < results.length; i++) {

                var div = $("<div>");
                div.addClass("col-sm-3");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var imageUrl = results[i].images.fixed_height_still.url;
                var newImage = $("<img>");
                newImage.attr("data-still", results[i].images.fixed_height_still.url);
                newImage.attr("data-animate", results[i].images.fixed_height.url);
                newImage.attr("data-state", "still");
                newImage.addClass("gif fullWidth");

                newImage.attr("src", imageUrl);
                newImage.attr("alt", "Gif");


                $(div).prepend(p);
                $(div).prepend(newImage);
                $("#gifImages").prepend(div);

            }

        });

});