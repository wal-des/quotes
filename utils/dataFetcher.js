const Airtable = require("airtable");
require("dotenv").config(); // Ladda .env-filen
var quotesTable = process.env.QUOTES_TABLE_ID;
var categoriesTable = process.env.CATEGORIES_TABLE_ID;

// Konfigurera Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Funktion för att hämta och mappa data
async function fetchQuotes() {
  const records = await base(quotesTable)
    .select({
      sort: [{ field: "id", direction: "desc" }], // Sortera på id i stigande ordning
    })
    .all();
  return records.map((record) => ({
    id: record.id,
    quote: record.get("quote"),
    sourcePerson: record.get("sourcePerson"),
    additionalNote: record.get("additionalNote"),
    typeDisplay: record.get("typeDisplayName") || [0],
    typeValue: record.get("typeValue") || [0],
  }));
}

// Funktion för att hämta en specifik post baserat på ID
async function fetchSingleQuote(id) {
  const record = await base(quotesTable).find(id);
  return {
    id: record.id,
    quote: record.get("quote"),
    sourcePerson: record.get("sourcePerson"),
    additionalNote: record.get("additionalNote"),
    typeDisplay: record.get("typeDisplayName") || [0],
    typeValue: record.get("typeValue") || [0],
  };
}

// Funktion för att hämta och mappa kategorier
async function fetchCategories() {
  const records = await base(categoriesTable)
    .select({
      sort: [{ field: "displayName", direction: "asc" }], // Sortera på displayName i stigande ordning
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    typeDisplay: record.get("displayName"),
    typeValue: record.get("dataValue"),
  }));
}

module.exports = {
  fetchQuotes,
  fetchSingleQuote,
  fetchCategories,
};
