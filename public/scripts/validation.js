document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newQuoteForm");

  // Valideringsfunktion
  function validateField(field, errorId) {
    const errorMessage = document.getElementById(errorId);

    // Hitta motsvarande <label> för fältet
    const label = document.querySelector(`label[for="${field.id}"]`);

    if (!field.value.trim()) {
      field.classList.add("error");
      errorMessage.textContent = `${label.textContent} behöver fyllas i.`;
      errorMessage.style.display = "inline";
      return false;
    } else {
      field.classList.remove("error");
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
      return true;
    }
  }

  // Hantera validering när användaren lämnar fältet
  const quote = document.getElementById("quote");
  const sourcePerson = document.getElementById("sourcePerson");

  quote.addEventListener("blur", () => validateField(quote, "quoteError"));
  sourcePerson.addEventListener("blur", () =>
    validateField(sourcePerson, "sourcePersonError")
  );

  // Kontrollera alla fält vid formulärskick
  form.addEventListener("submit", (event) => {
    const isQuoteValid = validateField(quote, "quoteError");
    const isSourcePersonValid = validateField(
      sourcePerson,
      "sourcePersonError"
    );

    if (!isQuoteValid || !isSourcePersonValid) {
      event.preventDefault(); // Förhindra formulärets skick om validering misslyckas
    }
  });

  //cancel button in form
  const resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", () => {
    form.reset(); // Återställ formuläret
    window.location.href = "/"; // Omdirigera till startsidan
  });
});
