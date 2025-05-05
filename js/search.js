// Search handling functions
const search = {
    // Store the current search results
    currentResults: [],
    
    // Perform a job search based on the input
    performSearch: async function(query) {
        console.log("Performing search for:", query);
        
        // Clear any existing results
        const resultsTable = document.getElementById("results");
        resultsTable.innerHTML = '';
        
        // Update the search cell with the query
        const searchCell = document.getElementById("searchCell");
        if (searchCell) {
            searchCell.textContent = query;
        }
        
        // Show loading indicator
        app.showLoading();
        
        try {
            // Call the API to search for jobs
            const response = await naukriApi.searchJobs(query, "", "");
            console.log("Search response:", response);
            
            // Store the results
            this.currentResults = response.jobs || [];
            console.log("Current results:", this.currentResults);
            
            // Update the UI with the results
            this.displayResults();
            
            // Hide loading indicator
            app.hideLoading();
        } catch (error) {
            console.error("Search failed:", error);
            app.hideLoading();
            
            // Show error message in results area
            const row = document.createElement("tr");
            const rowHeader = document.createElement("td");
            rowHeader.className = "row-header";
            rowHeader.textContent = "3";
            row.appendChild(rowHeader);
            
            const messageCell = document.createElement("td");
            messageCell.textContent = "Error searching for jobs: " + error.message;
            messageCell.colSpan = 7;
            row.appendChild(messageCell);
            
            resultsTable.appendChild(row);
        }
    },
    
    // Display the search results in the spreadsheet
    displayResults: function() {
        const resultsTable = document.getElementById("results");
        
        if (this.currentResults.length === 0) {
            // No results found
            const row = document.createElement("tr");
            
            // Add row header
            const rowHeader = document.createElement("td");
            rowHeader.className = "row-header";
            rowHeader.textContent = "3";
            row.appendChild(rowHeader);
            
            // Add "No results" message
            const messageCell = document.createElement("td");
            messageCell.textContent = "No matching jobs found";
            messageCell.colSpan = 7;
            row.appendChild(messageCell);
            
            resultsTable.appendChild(row);
            return;
        }
        
        // Add job results
        this.currentResults.forEach((job, index) => {
            const row = document.createElement("tr");
            
            // Add row header
            const rowHeader = document.createElement("td");
            rowHeader.className = "row-header";
            rowHeader.textContent = (index + 3).toString();
            row.appendChild(rowHeader);
            
            // Add company
            const companyCell = document.createElement("td");
            companyCell.textContent = job.company;
            row.appendChild(companyCell);
            
            // Add position/title
            const positionCell = document.createElement("td");
            positionCell.textContent = job.title;
            row.appendChild(positionCell);
            
            // Add location
            const locationCell = document.createElement("td");
            locationCell.textContent = job.location;
            row.appendChild(locationCell);
            
            // Add salary
            const salaryCell = document.createElement("td");
            salaryCell.textContent = job.salary;
            row.appendChild(salaryCell);
            
            // Add experience
            const experienceCell = document.createElement("td");
            experienceCell.textContent = job.experience;
            row.appendChild(experienceCell);
            
            // Add apply button
            const applyCell = document.createElement("td");
            applyCell.textContent = "Apply";
            applyCell.className = "apply-link";
            applyCell.dataset.jobId = job.id;
            applyCell.onclick = function() {
                search.applyForJob(job.id);
            };
            row.appendChild(applyCell);
            
            // Add an empty cell
            const emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
            
            resultsTable.appendChild(row);
        });
    },
    
    // Apply for a job
    applyForJob: async function(jobId) {
        // Check if user is logged in
        const token = localStorage.getItem('naukriAuthToken');
        if (!token) {
            // Show login modal if not logged in
            app.showLoginModal();
            return;
        }
        
        try {
            // Apply for the job
            const result = await naukriApi.applyForJob(jobId);
            
            // Show success message
            alert("Application submitted successfully!");
        } catch (error) {
            console.error("Application failed:", error);
            alert("Failed to apply for the job. Please try again.");
        }
    }
};