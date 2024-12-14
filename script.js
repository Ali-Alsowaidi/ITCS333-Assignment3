// Endpoint URL for the API
const endpoint = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Function to fetch data from the API
async function fetchData(params) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Check if the response content type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response");
        }

        // Parse the JSON response
        const data = await response.json();
        populateTable(data.results);
    } catch (error) {
        console.error(error);
    }
}

// Function to populate the HTML table with data
function populateTable(records) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // clear existing data in the table

    records.forEach(record => {
        // Log each record to check its structure
        console.log(record);

        // Destructure the fields from the record
        const { year, semester, the_programs, nationality, colleges, number_of_students } = record;
        const row = 
            `<tr>
                <td>${year || "N/A"}</td>
                <td>${semester || "N/A"}</td>
                <td>${the_programs || "N/A"}</td>
                <td>${nationality || "N/A"}</td>
                <td>${colleges || "N/A"}</td>
                <td>${number_of_students || "N/A"}</td>
            </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Call the fetchData function to initiate data fetching
fetchData();
