var searchButtons = ["cat", "dog", "fish"];


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

    var getTerm = $(this).attr("data-term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + getTerm + "&limit=5";

    $.ajax({

            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            var results = response.data

            console.log(response)

            for (var i = 0; i < results.length; i++) {

                var p = $("<p>").text("Rating: " + results[i].rating);

                var imageUrl = results[i].images.fixed_height_still.url;
                var newImage = $("<img>");
                newImage.attr("data-still", results[i].images.fixed_height_still.url);
                newImage.attr("data-animate", results[i].images.fixed_height.url);
                newImage.attr("data-state", "still");
                newImage.addClass("gif");

                newImage.attr("src", imageUrl);
                newImage.attr("alt", "Gif");

                $("#gifImages").prepend(newImage);
                $("#gifImages").prepend(p);
            }
        })
}

function toggleAnimate() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

}

$(document).on("click", ".gifBtn", displayGifs);
$(document).on("click", ".gif", toggleAnimate);