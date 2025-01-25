

$(document).ready(function() {
  console.log( "document ready!" );

// Add active class to the current button (highlight it)

$(document).on("click", ".filterButton", function() { 

  console.log("Clicked " + this.id);

  $(".filterButton").removeClass("selected");
  $(this).addClass("selected");

  if(this.id === "all") {
      clearFilter();
  }
  else {
      filterCardList(this.id);
  }

});

//Function to filter the cards in the list
function filterCardList(value){
  $(".card").addClass("hidden");
  $("." + value).removeClass("hidden");
  console.log("Filter card list ");
}

function clearFilter(){
  $(".card").removeClass("hidden");
  console.log("Clear filter");
}

});
