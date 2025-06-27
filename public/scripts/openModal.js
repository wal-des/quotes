$(document).on("click", ".card", function () {
  console.log("Clicked " + this.id);

  $(".modal").removeClass("modalOpen");
  $(this).siblings(".modal").addClass("modalOpen");
  $("body").css("overflow", "hidden");
});

function closeDetails() {
  console.log("Clicked close button");
  $(".modal").removeClass("modalOpen");
  $("body").css("overflow", "auto");
}
