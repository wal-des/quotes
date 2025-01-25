const filterTableName = 'tblnpED55ch6dkvW9';
const filterViewName = 'byDisplayName';

async function fetchFilterOptions() {
    console.log("Start fetch filter options");
    const url = `https://api.airtable.com/v0/${baseId}/${filterTableName}?view=${filterViewName}&offset=${offset}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        const records = data.records.map(record => {
            const fields = record.fields;
            const mappedData = {
                id: record.id,
                displayName: fields.displayName,
                dataValue: fields.dataValue,
            };
            return mappedData;
        });
        filterRecords = filterRecords.concat(records);
        if (data.offset) {
            offset = data.offset;
            await fetchFilterOptions();
        } else {
            for (var i = 0; i < filterRecords.length; i++) {

                document.querySelector("#filterButtonContainer").innerHTML += `
                            <button class="filterButton" id=${filterRecords[i].dataValue || ''}>
                                ${filterRecords[i].displayName || ''}</button>`;
            }
        }
        console.log("Completed fetch filter options");
    } catch (error) {
        console.error("Error in fetching filter options:", error);

    }
}
fetchFilterOptions()
