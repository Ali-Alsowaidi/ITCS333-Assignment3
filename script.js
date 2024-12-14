// Endpoint URL for the API
const endpoint = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Function to fetch data from the API
async function fetchData(params) {
    try {
        const response = await fetch(endpoint);
        if(!response.ok){
            throw new Error ('Failed to fetch data: ${response.statusText}');
        }
        // Parse the JSON response
        const data = await response.json();
        populataTable(data.records);
    } catch(error){
        console.error(error);
    }
}

// Function to populate the HTML table with data
function populataTable(records){
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // clear existing data in the table

    records.forEach(record => {
        const {Year, Semester, The_Programs, Nationality, Colleges, Number_of_Students} = record.record.fields;
        const row = 
            <tr>
                <td>${Year || "N/A"}</td>
                <td>${Semester || "N/A"}</td>
                <td>${The_Programs || "N/A"}</td>
                <td>${Nationality || "N/A"}</td>
                <td>${Colleges || "N/A"}</td>
                <td>${Number_of_Students || "N/A"}</td>
            </tr>
        ;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Call the fetchData function to initiate data fetching
fetchData();