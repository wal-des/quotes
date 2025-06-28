document.addEventListener("DOMContentLoaded", () => {
  //Knapp för att öppna formuläret
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  newQuoteBtn.addEventListener("click", () => {
    window.location.href = "/add"; // Omdirigera till sidan för nytt citat
  });
});
