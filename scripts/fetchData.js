        const quotesTableName = 'tblFmBF2s4kRBVsf5';
        const quotesViewName = 'By source';

        async function fetchQuoteData() {
            console.log("Start fetch data records");
            const url = `https://api.airtable.com/v0/${baseId}/${quotesTableName}?view=${quotesViewName}&offset=${offset}`;
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
                        quote: fields.quote,
                        sourceperson: fields.sourceperson,
                        additionalNote: fields.additionalNote,
                        typeDisplayName: fields.typeDisplayName,
                        typeValue: fields.typeValue,
                    };
                    return mappedData;
                });
                allRecords = allRecords.concat(records);
                if (data.offset) {
                    offset = data.offset;
                    await fetchQuoteData();
                } else {
                    for (var i = 0; i < allRecords.length; i++) {

                        document.querySelector("#cardList").innerHTML += `
                        <li class="listItem" id="${allRecords[i].id}">
                            <div class="card ${allRecords[i].typeValue || ''}" id="quote-${allRecords[i].id}" tabindex="0">
                                <p class="quote-text clamped">${allRecords[i].quote || ''}</p>
                                <div class="quote-details">
                                    <div class="quote-source">
                                        <p class="quote-source label">${allRecords[i].sourceperson || ''}</p>
                                        <p class="additionalNote label-small">${allRecords[i].additionalNote || ''}</p>
                                    </div>
                                    <div class="quote-tag">
                                        <p class="quote-type label-small">${allRecords[i].typeDisplayName || ''}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal" id="quoteDetails-${allRecords[i].id}">
                                <div class="modal-container">
                                    <p class="quote-text">${allRecords[i].quote || ''}</p>
                                    <div class="quote-details">
                                        <div class="quote-source">
                                        <p class="quote-source label">
                                            ${allRecords[i].sourceperson || ''}
                                        </p>
                                        <p class="additionalNote label-small">
                                            ${allRecords[i].additionalNote || ''}
                                        </p>
                                        </div>
                                        <div class="quote-tag">
                                        <p class="quote-type label-small">${allRecords[i].typeDisplayName || ''}</p>
                                        </div>
                                    </div>
                                    <div class="button-container">
                                        <button type="button" class="btn-primary" onclick="closeDetails()">
                                            Stäng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
                    }
                }
                console.log("Complete fetch data records");
            } catch (error) {
                console.error("Error in fetching data records:", error);

            }
        }
        fetchQuoteData()
