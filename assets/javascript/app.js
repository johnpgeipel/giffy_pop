var titles = ["Rushmore", "Back To The Future", "Fargo", "Jaws", "Titanic", "Star Wars", "Pulp Fiction"];

function renderButtons(titles) {
	$("#buttonsArea").empty();

	titles.forEach((title) => {
		var button = $("<button>");
		button.html(title);
		button.addClass("btn btn-outline-secondary movie-btn");
		button.attr("data-title", title);
		$("#buttonsArea").append(button);
	} )
}

function displayGifs(arg) {
	$("#mainArea").empty();
	var thisMovie = $(this).attr("data-title") || arg;
	console.log(thisMovie);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisMovie + "&api_key=QDRtZXHbk8NwqSV9D7tTZVYXX7qnYwN2&limit=15";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done((response) => {
		console.log(response);
		let movies = response.data;

		movies.forEach((movie) => {
			var gifCard = $("<div>").addClass("gif-card");

			const rating = movie.rating;
			const ratingText = $("<p>").html("Rating: " + rating);
			ratingText.addClass("text-center");

			const gifImage = $("<img>").addClass("gif-image gif");
			gifImage.attr("src", movie.images.fixed_height_still.url);
			gifImage.attr("data-still", movie.images.fixed_height_still.url);
			gifImage.attr("data-animate", movie.images.fixed_height.url);
			gifImage.attr("data-state", "still");

			gifCard.append(ratingText);
			gifCard.prepend(gifImage);

			$("#mainArea").prepend(gifCard);
		})
	});
}

$("#submit-btn").on("click", (e) => {
	e.preventDefault();
	var newShow = $("#userInput").val().trim();
	$("#userInput").val("");
	titles.push(newShow);
	renderButtons(titles);
	displayGifs(newShow);
});

$(document).on("click", ".movie-btn", displayGifs);

$(document).on("click", ".gif-image", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons(titles);

displayGifs("Up");
