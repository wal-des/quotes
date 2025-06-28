const express = require("express");
const router = express.Router();
const Airtable = require("airtable");
const {
  fetchQuotes,
  fetchSingleQuote,
  fetchCategories,
} = require("../utils/dataFetcher"); // Importera funktionerna

require("dotenv").config(); // Ladda .env-filen
var quotesTable = process.env.QUOTES_TABLE_ID;

const bodyParser = require("body-parser");
const app = express();

// Body-parser för att läsa POST-data
app.use(bodyParser.urlencoded({ extended: true }));

// Lista över poster
router.get("/", async (req, res) => {
  try {
    const items = await fetchQuotes(); // Huvuddata
    const categories = await fetchCategories(); // Kategorier som filter

    // Filtrera om en kategori har valts
    let filteredItems = items;
    if (req.query.category) {
      filteredItems = items.filter((item) =>
        item.typeValue.includes(req.query.category)
      );
    }

    res.render("layout", {
      title: "Citat",
      items: filteredItems,
      categories,
      req, // Skicka req för att använda query-parametern i EJS
      content: "list",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Airtable");
  }
});

//Sida för att lägga till nytt citat
router.get("/add", async (req, res) => {
  try {
    const categories = await fetchCategories(); // Byt ut mot den länkade tabellens namn
    res.render("layout", {
      title: "Lägg till citat",
      categories,
      content: "newQuote",
    });
  } catch (error) {
    console.error("Error fetching linked data:", error);
    res.status(500).send("Error loading form.");
  }
});

// Konfigurera Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

//Posta formuläret
router.post("/add", async (req, res) => {
  const { quote, sourcePerson, additionalNote, category } = req.body; // Hämta data från formuläret

  try {
    // Lägg till ny post i Airtable
    await base(quotesTable).create([
      {
        fields: {
          quote: quote, // Matcha fältet med ditt Airtable-fält
          sourcePerson: sourcePerson, // Matcha fältet med ditt Airtable-fält
          additionalNote: additionalNote,
          type: [category], // Spara länkade kategorins id som en array
        },
      },
    ]);

    res.redirect("/"); // Omdirigera tillbaka till översiktssidan eller en annan vy
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).send("Error adding item.");
  }
});

module.exports = router;
