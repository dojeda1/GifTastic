var searchButtons = ["cat", "dog", "fish"];

function placeButtons() {

    console.log("start")

    $("#gifButtons").empty();

    for (i = 0; i < searchButtons.length; i++) {

        var newBtn = $("<button>");
        newBtn.addClass("gifBtn");
        newBtn.attr("data-term", searchButtons[i]);
        newBtn.text(searchButtons[i]);
        console.log(newBtn);
        $("#gifButtons").append(newBtn);
        console.log("end of round")

    }


}

placeButtons();