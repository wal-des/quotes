

$(document).on("click", ".card", function() { 
    console.log("Clicked " + this.id);

    $(".modal").removeClass("modalOpen");
    $(this).siblings('.modal').addClass("modalOpen");
    $('body').css('overflow', 'hidden');
  
  });

  function closeDetails() {
    console.log("Clicked close button");
    $(".modal").removeClass("modalOpen");
    $('body').css('overflow', 'auto');
  }


          // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }


// $(document).on("click", "#newQuoteBtn", function() {

//     $("#newQuoteForm").showModal();
// });