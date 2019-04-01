var dundieArray = ["Pam Beesley", "Michael Scott", "Jim Halpert", "Dwight Schrute", "Angela Martin", "Erin Hannon", "Phyllis Vance", "Toby Flenderson", "Kevin Malone", "Oscar Martinez", "Andy Bernard", "Ryan Howard", "Jan Levinson", "Stanley Hudson", "Robert California", "Creed Bratton", "Darryl Philbin", "Kelly Kapoor", "Holly Flax", "Meredith Palmer"];

$(document).ready(function () {
    for (var i = 0; i < dundieArray.length; i++) {
        $("#dundie-buttons").append("<button type='button' onclick='searchGif(\"" + dundieArray[i] + "\")' class='btn btn-primary' value=' " + dundieArray[i] + "'> " + dundieArray[i] + " </button>");
    }
});


function submitButtonClicked() {
    var userInput = $('#dundie-input').val();
    searchGif(userInput);
}

function searchGif(gifName) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=Z8uZ3fAZ8cHzULQyfZwp43QCl9PmXrLl',
        type: 'GET',
    })
        .done(function (response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#dundie').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#dundie').append(image);
    }

    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}