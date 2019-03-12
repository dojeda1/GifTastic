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

    var getTerm = $(this).attr("data-term");
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + getTerm;

    $.ajax({

            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            var imageUrl = response.data.image_original_url;
            var newImage = $("<img>");
            newImage.attr("src", imageUrl);
            newImage.attr("alt", "Gif");

            $("#gifImages").prepend(newImage);

        })
}

$(".gifBtn").on("click", displayGifs)