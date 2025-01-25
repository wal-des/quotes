import { quoteData } from './fetchData.js';
import { filterData } from './fetchFilters.jsjs';
import { filterFunctions } from './filterButtonsMine.js';

async function runScriptsSequentially() {
  try {
    await quoteData();
    await filterData();
    await filterFunctions();
    console.log("Alla skript är klara");
  } catch (error) {
    console.error("Ett fel inträffade: ", error);
  }
}

runScriptsSequentially();
