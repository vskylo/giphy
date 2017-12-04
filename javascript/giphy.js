 var animals = ["cat", "rabbit", "dog", "bear"];

      // Function for displaying animal data
function renderButtons() {
  


  // Deleting the animal buttons prior to adding new animal buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#animals-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generating buttons for each animal in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animal");
    // Adding a data-attribute with a value of the animal at index i
    a.attr("data-name", animals[i]);
    // Providing the button's text with a value of the animal at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#animals-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The animal from the textbox is then added to our array
  animals.push(animal);

  // calling renderButtons which handles the processing of our animal array
  renderButtons();
});



$(document).on("click",".animal", function(event) {
  console.log($(this).attr("data-name"));
  $("#gifs-appear-here").empty();
  var animalName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
    })
    // After the HTTP request is finished.
    .done(function(response) {
      var results = response.data;
      console.log(results);
      console.log(response);
      for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div>");
              gifDiv.addClass("gDiv");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");
              personImage.addClass("gif");
              personImage.attr("animated-source",results[i].images.fixed_height.url);
              personImage.attr("non-animated-source",results[i].images.fixed_height_still.url);
              personImage.attr("state","still");
              personImage.attr("src", results[i].images.fixed_height_still.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
    });
});

//Our click event for pausing the gifs
$(document).on("click",".gif",function(){
    var state = $(this).attr("state");
    //console.log(state);
    if (state === "still"){
      $(this).attr("state","animated");
      $(this).attr("src", $(this).attr("animated-source"));
    }
    else {
      $(this).attr("state","still");
      $(this).attr("src", $(this).attr("non-animated-source"));
    }
});

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();