// ===== API.JS CONTENT =====
// API integration with Naukri.com
console.log("API module loaded");

const naukriApi = {
    // Authentication
    login: async function(email, password) {
        try {
            // API PLACEHOLDER: Login to Naukri
            // In a real implementation, this would be:
            // const response = await fetch('https://api.naukri.com/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();
            
            // For demo, simulate successful login
            console.log("Logging in with:", email);
            const mockUserData = {
                id: "user123",
                name: "Demo User",
                email: email,
                token: "mock-jwt-token-xyz"
            };
            
            // Store auth token
            localStorage.setItem('naukriAuthToken', mockUserData.token);
            localStorage.setItem('naukriUser', JSON.stringify(mockUserData));
            
            return mockUserData;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },
    
    // Job Search
    searchJobs: async function(query, location, experience) {
        try {
            // API PLACEHOLDER: Search Naukri jobs
            // In a real implementation, this would be:
            // const token = localStorage.getItem('naukriAuthToken');
            // const response = await fetch(`https://api.naukri.com/jobs/search?keyword=${query}&location=${location}&experience=${experience}`, {
            //     headers: { 'Authorization': `Bearer ${token}` }
            // });
            // const data = await response.json();
            
            // For demo, use mock data that matches Naukri's structure
            console.log("Searching for:", query, location, experience);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Return mock job data
            return mockJobSearch(query);
        } catch (error) {
            console.error("Search error:", error);
            throw error;
        }
    },
    
    // Apply for a job
    applyForJob: async function(jobId) {
        try {
            // API PLACEHOLDER: Apply to job on Naukri
            // In a real implementation, this would be:
            // const token = localStorage.getItem('naukriAuthToken');
            // const response = await fetch(`https://api.naukri.com/jobs/${jobId}/apply`, {
            //     method: 'POST',
            //     headers: { 'Authorization': `Bearer ${token}` }
            // });
            // const data = await response.json();
            
            console.log("Applying for job ID:", jobId);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Return mock response
            return {
                success: true,
                applicationId: "app" + Math.floor(Math.random() * 10000),
                message: "Application submitted successfully"
            };
        } catch (error) {
            console.error("Apply error:", error);
            throw error;
        }
    },
    
    // Logout
    logout: function() {
        // Clear authentication data
        localStorage.removeItem('naukriAuthToken');
        localStorage.removeItem('naukriUser');
    }
};

// Mock data to simulate Naukri's response format
function mockJobSearch(query) {
    console.log("Mock job search for:", query);
    
    const commonJobs = {
        "software developer": [
            { id: "j1", title: "Senior Software Developer", company: "Microsoft", location: "Hyderabad", experience: "5-8 years", salary: "₹20-25 LPA" },
            { id: "j2", title: "Full Stack Developer", company: "Amazon", location: "Bangalore", experience: "3-5 years", salary: "₹18-22 LPA" },
            { id: "j3", title: "Frontend Developer", company: "Flipkart", location: "Mumbai", experience: "2-4 years", salary: "₹15-18 LPA" }
        ],
        "data scientist": [
            { id: "j4", title: "Data Scientist", company: "Google", location: "Bangalore", experience: "4-7 years", salary: "₹22-28 LPA" },
            { id: "j5", title: "ML Engineer", company: "IBM", location: "Pune", experience: "3-6 years", salary: "₹18-24 LPA" },
            { id: "j6", title: "AI Researcher", company: "Microsoft Research", location: "Hyderabad", experience: "5-9 years", salary: "₹25-32 LPA" }
        ],
        "product manager": [
            { id: "j7", title: "Senior Product Manager", company: "Amazon", location: "Gurgaon", experience: "6-10 years", salary: "₹30-40 LPA" },
            { id: "j8", title: "Product Owner", company: "Paytm", location: "Noida", experience: "4-8 years", salary: "₹22-28 LPA" },
            { id: "j9", title: "Associate Product Manager", company: "Swiggy", location: "Bangalore", experience: "2-4 years", salary: "₹16-20 LPA" }
        ]
    };
    
    // Improved search logic
    const normalizedQuery = query.toLowerCase().trim();
    console.log("Normalized query:", normalizedQuery);
    
    // Check for exact or partial matches
    for (const key in commonJobs) {
        console.log("Checking against key:", key);
        
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            console.log("Found match for key:", key);
            return {
                success: true,
                jobs: commonJobs[key],
                total: commonJobs[key].length
            };
        }
    }
    
    // Direct matching for specific terms
    if (normalizedQuery.includes("software") || normalizedQuery.includes("developer")) {
        console.log("Matching software developer via individual terms");
        return {
            success: true,
            jobs: commonJobs["software developer"],
            total: commonJobs["software developer"].length
        };
    }
    
    if (normalizedQuery.includes("data") || normalizedQuery.includes("scientist")) {
        console.log("Matching data scientist via individual terms");
        return {
            success: true,
            jobs: commonJobs["data scientist"],
            total: commonJobs["data scientist"].length
        };
    }
    
    if (normalizedQuery.includes("product") || normalizedQuery.includes("manager")) {
        console.log("Matching product manager via individual terms");
        return {
            success: true,
            jobs: commonJobs["product manager"],
            total: commonJobs["product manager"].length
        };
    }

    // Add this inside the mockJobSearch function, just before the return statement for "No matches found"
    console.log("Query was:", normalizedQuery);
    console.log("Available job types:", Object.keys(commonJobs));
    console.log("Checking if query contains 'product':", normalizedQuery.includes("product"));
    console.log("Checking if query contains 'manager':", normalizedQuery.includes("manager"));
    
    // No matches found
    console.log("No matches found for query:", normalizedQuery);
    return {
        success: true,
        jobs: [],
        total: 0
    };
}

// ===== SEARCH.JS CONTENT =====
console.log("Search module loaded");

// Search handling functions
const search = {
    // Store the current search results
    currentResults: [],
    
    // Perform a job search based on the input
    performSearch: async function(query) {
        console.log("Performing search for:", query);
        
        // Clear any existing results
        const resultsTable = document.getElementById("results");
        while (resultsTable.firstChild) {
            resultsTable.removeChild(resultsTable.firstChild);
        }
        
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
            // Optionally show an error message
        }
    },
    
    // Display the search results in the spreadsheet
    displayResults: function() {
        console.log("Displaying results");
        
        // Clear existing job results (rows 11 and beyond)
        const tbody = document.querySelector('table.spreadsheet > tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Remove job result rows (rows 11-13)
        for (let i = 11; i <= 13; i++) {
            const row = document.querySelector(`tr:nth-child(${i})`);
            if (row) {
                // Keep the row but clear all cells except the row header
                const cells = row.querySelectorAll('td:not(.row-header)');
                cells.forEach(cell => {
                    cell.textContent = "";
                    cell.className = "";
                    cell.style = "";
                    cell.removeAttribute('onclick');
                });
            }
        }
        
        // Clear the query from search cell (A9) - we don't want it showing the search term
        const searchCell = document.getElementById('searchCell');
        if (searchCell) {
            searchCell.textContent = "";
        }
        
        if (this.currentResults.length === 0) {
            // No results found - add a single "No results" row at position 11
            const row = document.querySelector('tr:nth-child(11)');
            if (row) {
                const messageCell = row.querySelector('td:nth-child(2)');
                if (messageCell) {
                    messageCell.textContent = "No matching jobs found";
                    messageCell.colSpan = 7;
                }
            }
            return;
        }
        
        // Add job results starting at row 11
        this.currentResults.forEach((job, index) => {
            if (index > 2) return; // Only show up to 3 results (rows 11-13)
            
            const rowIndex = index + 11; // Start from row 11
            const row = document.querySelector(`tr:nth-child(${rowIndex})`);
            if (row) {
                // Company (cell A)
                const companyCell = row.querySelector('td:nth-child(2)');
                if (companyCell) {
                    companyCell.textContent = job.company;
                }
                
                // Position/title (cell B)
                const positionCell = row.querySelector('td:nth-child(3)');
                if (positionCell) {
                    positionCell.textContent = job.title;
                }
                
                // Location (cell C)
                const locationCell = row.querySelector('td:nth-child(4)');
                if (locationCell) {
                    locationCell.textContent = job.location;
                }
                
                // Salary (cell D)
                const salaryCell = row.querySelector('td:nth-child(5)');
                if (salaryCell) {
                    salaryCell.textContent = job.salary;
                }
                
                // Experience (cell E)
                const experienceCell = row.querySelector('td:nth-child(6)');
                if (experienceCell) {
                    experienceCell.textContent = job.experience;
                }
                
                // Apply button (cell F)
                const applyCell = row.querySelector('td:nth-child(7)');
                if (applyCell) {
                    applyCell.textContent = "Apply";
                    applyCell.className = "apply-link";
                    applyCell.dataset.jobId = job.id;
                    applyCell.onclick = function() {
                        search.applyForJob(job.id);
                    };
                }
            }
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

// ===== EMERGENCY.JS CONTENT =====
console.log("Emergency module loaded");

// Emergency exit functionality
const emergency = {
    // Show a normal spreadsheet view
    showSpreadsheetView: function() {
        // Hide welcome message if visible
        const welcomeMessage = document.getElementById("welcomeMessage");
        if (welcomeMessage) {
            welcomeMessage.style.display = "none";
        }
        
        // Clear search input
        document.getElementById("searchInput").value = "";
        document.getElementById("searchCell").textContent = "";
        
        // Clear results
        const resultsTable = document.getElementById("results");
        while (resultsTable.firstChild) {
            resultsTable.removeChild(resultsTable.firstChild);
        }
        
        // Add budget data
        const budgetData = [
            { category: "Revenue", q1: "₹5,00,00,000", q2: "₹5,50,00,000", q3: "₹6,20,00,000", q4: "₹7,10,00,000" },
            { category: "COGS", q1: "₹3,00,00,000", q2: "₹3,30,00,000", q3: "₹3,72,00,000", q4: "₹4,26,00,000" },
            { category: "Gross Profit", q1: "₹2,00,00,000", q2: "₹2,20,00,000", q3: "₹2,48,00,000", q4: "₹2,84,00,000" },
            { category: "Marketing", q1: "₹50,00,000", q2: "₹55,00,000", q3: "₹62,00,000", q4: "₹71,00,000" },
            { category: "R&D", q1: "₹75,00,000", q2: "₹82,50,000", q3: "₹93,00,000", q4: "₹1,06,50,000" },
            { category: "Admin", q1: "₹25,00,000", q2: "₹27,50,000", q3: "₹31,00,000", q4: "₹35,50,000" },
            { category: "Operating Income", q1: "₹50,00,000", q2: "₹55,00,000", q3: "₹62,00,000", q4: "₹71,00,000" }
        ];
        
        // Update header rows
        document.querySelector("tr:nth-child(2) td:nth-child(1)").textContent = "Category";
        document.querySelector("tr:nth-child(2) td:nth-child(2)").textContent = "Q1";
        document.querySelector("tr:nth-child(2) td:nth-child(3)").textContent = "Q2";
        document.querySelector("tr:nth-child(2) td:nth-child(4)").textContent = "Q3";
        document.querySelector("tr:nth-child(2) td:nth-child(5)").textContent = "Q4";
        document.querySelector("tr:nth-child(2) td:nth-child(6)").textContent = "Total";
        
        // Add budget data rows
        budgetData.forEach((data, index) => {
            const row = document.createElement("tr");
            
            // Add row header
            const rowHeader = document.createElement("td");
            rowHeader.className = "row-header";
            rowHeader.textContent = (index + 3).toString();
            row.appendChild(rowHeader);
            
            // Add category
            const categoryCell = document.createElement("td");
            categoryCell.textContent = data.category;
            row.appendChild(categoryCell);
            
            // Add quarters
            const q1Cell = document.createElement("td");
            q1Cell.textContent = data.q1;
            row.appendChild(q1Cell);
            
            const q2Cell = document.createElement("td");
            q2Cell.textContent = data.q2;
            row.appendChild(q2Cell);
            
            const q3Cell = document.createElement("td");
            q3Cell.textContent = data.q3;
            row.appendChild(q3Cell);
            
            const q4Cell = document.createElement("td");
            q4Cell.textContent = data.q4;
            row.appendChild(q4Cell);
            
            // Add total (sum of quarters)
            const totalCell = document.createElement("td");
            totalCell.textContent = "=SUM(B" + (index + 3) + ":E" + (index + 3) + ")";
            row.appendChild(totalCell);
            
            // Add an empty cell
            const emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
            
            resultsTable.appendChild(row);
        });
    }
};

// ===== MAIN.JS CONTENT =====
console.log("Main app module loaded");

// Main application logic
const app = {
    // Initialize the application
    init: function() {
        console.log("Initializing app");
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check login status
        this.checkLoginStatus();
        
        // Check if welcome message has been seen
        if (localStorage.getItem('welcomeSeen') !== 'true') {
            document.getElementById('welcomeMessage').style.display = 'block';
        } else {
            document.getElementById('welcomeMessage').style.display = 'none';
        }

        console.log("App initialization complete");
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        console.log("Setting up event listeners");
        
        // Search cell event listeners
        const searchCell = document.getElementById('searchCell');
        if (searchCell) {
            searchCell.addEventListener('focus', function() {
                document.querySelector('.cell-reference').textContent = 'A9';
            });
        } else {
            console.error("Search cell element not found!");
        }

        // Function bar search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission
                    const query = this.value.trim();
                    console.log("Search input entered:", query);
                    if (query) {
                        search.performSearch(query);
                    }
                }
            });
            
            searchInput.addEventListener('focus', function() {
                document.querySelector('.cell-reference').textContent = 'A9';
            });
        } else {
            console.error("Search input element not found!");
        }
        
        // Emergency exit via ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.showEmergencyView();
            }
        });
        
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                try {
                    await naukriApi.login(email, password);
                    this.hideLoginModal();
                    this.updateUserInterface();
                } catch (error) {
                    alert('Login failed. Please check your credentials.');
                }
            });
        } else {
            console.error("Login form element not found!");
        }

        console.log("Event listeners setup complete");
    },
    
    // Check login status
    checkLoginStatus: function() {
        const token = localStorage.getItem('naukriAuthToken');
        const user = JSON.parse(localStorage.getItem('naukriUser') || '{}');
        
        if (token && user.name) {
            // Update UI for logged in user
            const avatar = document.getElementById('userAvatar');
            if (avatar) {
                avatar.textContent = user.name.charAt(0).toUpperCase();
            }
            
            // Hide login button
            const loginButton = document.getElementById('loginButton');
            if (loginButton) {
                loginButton.style.display = 'none';
            }
        }
    },
    
    // Update UI after login/logout
    updateUserInterface: function() {
        this.checkLoginStatus();
        
        // If search results are displayed, refresh them
        if (search.currentResults.length > 0) {
            search.displayResults();
        }
    },
    
    // Show loading indicator
    showLoading: function() {
        // You can add a loading spinner here
        document.body.style.cursor = 'wait';
    },
    
    // Hide loading indicator
    hideLoading: function() {
        document.body.style.cursor = 'default';
    },
    
    // Hide welcome message and add financial data
    hideWelcome: function() {
        console.log("Running app.hideWelcome function");
        
        // Hide the welcome message
        document.getElementById('welcomeMessage').style.display = 'none';
        localStorage.setItem('welcomeSeen', 'true');
        
        // Clear any existing styling from the "Got it" button cell
        const gotItCell = document.querySelector('.got-it-cell');
        if (gotItCell) {
            gotItCell.textContent = "HR"; // Change text to HR
            gotItCell.className = ""; // Remove all classes including got-it-cell
            gotItCell.style = ""; // Remove any inline styling
            gotItCell.removeAttribute('onclick'); // Remove onclick handler
        }
        
        // Clear the existing introductory text in the spreadsheet cells
        for (let i = 2; i <= 5; i++) {
            const cell = document.querySelector(`tr:nth-child(${i}) td:nth-child(2)`);
            if (cell) {
                cell.textContent = "";
            }
        }

        // Financial data to display
        const financialData = [
            { category: "Marketing", q1: "₹15,750", q2: "₹18,450", q3: "₹21,200", trend: "+12%", status: "On Track" },
            { category: "Sales", q1: "₹42,800", q2: "₹45,100", q3: "₹48,750", trend: "+8%", status: "Exceeding" },
            { category: "R&D", q1: "₹34,200", q2: "₹33,800", q3: "₹36,500", trend: "+5%", status: "On Track" },
            { category: "Operations", q1: "₹28,300", q2: "₹27,900", q3: "₹29,100", trend: "+3%", status: "On Track" },
            { category: "IT", q1: "₹18,400", q2: "₹22,700", q3: "₹19,800", trend: "-13%", status: "Review" },
            { category: "HR", q1: "₹12,100", q2: "₹12,350", q3: "₹12,600", trend: "+2%", status: "On Track" },
            { category: "Admin", q1: "₹8,750", q2: "₹9,200", q3: "₹9,400", trend: "+2%", status: "On Track" }
        ];
        
        // Create and update header cells for row 1, columns A-F
    const headerRow = document.querySelector('tr:nth-child(1)');
    if (headerRow) {
        // Define headers for the first 6 columns (A-F)
        const headers = ["Category", "Q1 2023", "Q2 2023", "Q3 2023", "Trend", "Status"];
        
        // Update each cell in row 1
        for (let i = 0; i < headers.length; i++) {
            // Get the cell at position (1, i+2) - adding 2 because i starts at 0 and we need to skip the row header
            const cellSelector = `tr:nth-child(1) td:nth-child(${i+2})`;
            const cell = document.querySelector(cellSelector);
            
            if (cell) {
                // Cell exists, update it
                cell.textContent = headers[i];
                cell.className = 'header-cell';
            } else {
                // Cell doesn't exist, create it
                const newCell = document.createElement('td');
                newCell.textContent = headers[i];
                newCell.className = 'header-cell';
                
                // Need to insert in the correct position
                const nextCell = headerRow.querySelector(`td:nth-child(${i+2})`);
                if (nextCell) {
                    headerRow.insertBefore(newCell, nextCell);
                } else {
                    headerRow.appendChild(newCell);
                }
            }
        }
        
        // Fill the rest of the cells in row 1 with empty content
        for (let i = headers.length; i < 15; i++) {
            const cellSelector = `tr:nth-child(1) td:nth-child(${i+2})`;
            const cell = document.querySelector(cellSelector);
            
            if (cell) {
                // Cell exists, clear its content
                cell.textContent = "";
                cell.className = "";
            } else {
                // Cell doesn't exist, create an empty one
                const newCell = document.createElement('td');
                newCell.textContent = "";
                headerRow.appendChild(newCell);
            }
        }
            
            // Fill columns H-Z with empty cells (to ensure spreadsheet looks authentic)
            for (let i = headers.length; i < 20; i++) {
                const cellIndex = i + 1;
                const cell = headerRow.querySelector(`td:nth-child(${cellIndex + 1})`);
                if (!cell) {
                    const newCell = document.createElement('td');
                    newCell.textContent = "";
                    headerRow.appendChild(newCell);
                }
            }
        }
        
        // Add financial data rows (rows 2-8)
        financialData.forEach((data, index) => {
            const rowIndex = index + 2; // Starting from row 2
            const row = document.querySelector(`tr:nth-child(${rowIndex})`);
            
            if (row) {
                // Set the category cell (A column)
                const categoryCell = row.querySelector('td:nth-child(2)');
                if (categoryCell) {
                    categoryCell.textContent = data.category;
                    if (data.category === "Total") {
                        categoryCell.style.fontWeight = "bold";
                    }
                }
                
                // Set Q1 cell (B column)
                const q1Cell = row.querySelector('td:nth-child(3)');
                if (q1Cell) {
                    q1Cell.textContent = data.q1;
                }
                
                // Set Q2 cell (C column)
                const q2Cell = row.querySelector('td:nth-child(4)');
                if (q2Cell) {
                    q2Cell.textContent = data.q2;
                }
                
                // Set Q3 cell (D column)
                const q3Cell = row.querySelector('td:nth-child(5)');
                if (q3Cell) {
                    q3Cell.textContent = data.q3;
                }
                
                // Set Trend cell (E column)
                const trendCell = row.querySelector('td:nth-child(6)');
                if (trendCell) {
                    trendCell.textContent = data.trend;
                    if (data.trend.includes('-')) {
                        trendCell.style.color = "#EA4335"; // Google red
                    } else {
                        trendCell.style.color = "#34A853"; // Google green
                    }
                }
                
                // Set Status cell (F column)
                const statusCell = row.querySelector('td:nth-child(7)');
                if (statusCell) {
                    statusCell.textContent = data.status;
                    if (data.status === "Review") {
                        statusCell.style.color = "#EA4335"; // Google red
                    } else if (data.status === "Exceeding") {
                        statusCell.style.color = "#34A853"; // Google green
                    }
                }
                
                // Add empty cells in columns G-Z for proper spreadsheet appearance
                for (let i = 7; i < 20; i++) {
                    const cellIndex = i + 1;
                    const cell = row.querySelector(`td:nth-child(${cellIndex})`);
                    if (!cell) {
                        const newCell = document.createElement('td');
                        newCell.textContent = "";
                        row.appendChild(newCell);
                    } else {
                        cell.textContent = "";
                    }
                }
            }
        });
        
        // Ensure rows 9-13 have proper cells
    for (let rowIndex = 9; rowIndex <= 13; rowIndex++) {
        const row = document.querySelector(`tr:nth-child(${rowIndex})`);
        
        if (row) {
            // Check if each cell exists, create if missing
            for (let colIndex = 2; colIndex <= 15; colIndex++) {
                const cellSelector = `tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`;
                const cell = document.querySelector(cellSelector);
                
                if (!cell) {
                    // Cell doesn't exist, create an empty one
                    const newCell = document.createElement('td');
                    newCell.textContent = "";
                    
                    // Insert at the correct position
                    const nextCell = row.querySelector(`td:nth-child(${colIndex})`);
                    if (nextCell) {
                        row.insertBefore(newCell, nextCell);
                    } else {
                        row.appendChild(newCell);
                    }
                }
            }
        }
    }


        // Make sure the search cell (cell A9) is empty initially
        const searchCell = document.getElementById('searchCell');
        if (searchCell) {
            searchCell.textContent = "";
        }
        
        // Fill bottom rows with empty cells
        for (let rowIndex = 14; rowIndex <= 25; rowIndex++) {
            // Check if the row exists, create it if not
            let row = document.querySelector(`tr:nth-child(${rowIndex})`);
            if (!row) {
                row = document.createElement('tr');
                
                // Add row header
                const rowHeader = document.createElement('td');
                rowHeader.className = 'row-header';
                rowHeader.textContent = rowIndex.toString();
                row.appendChild(rowHeader);
                
                // Add empty cells for columns A-Z
                for (let i = 0; i < 20; i++) {
                    const emptyCell = document.createElement('td');
                    emptyCell.textContent = "";
                    row.appendChild(emptyCell);
                }
                
                // Append to table body
                const tbody = document.querySelector('table.spreadsheet > tbody');
                if (tbody) {
                    tbody.appendChild(row);
                }
            }
        }
        
        // Focus on the search input field
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    },
    
    // Show login modal
    showLoginModal: function() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'flex';
        }
    },
    
    // Hide login modal
    hideLoginModal: function() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.style.display = 'none';
        }
    },
    
    // Show emergency view
    showEmergencyView: function() {
        emergency.showSpreadsheetView();
    },
    
    // Show help information
    showHelpModal: function() {
        alert("Stealth Naukri Search\n\nThis tool allows you to search for jobs on Naukri.com while keeping your screen looking like a Google Sheet.\n\nTo search: Type a job title in the formula bar and press Enter\nTo apply: Click the 'Apply' link on any job\nEmergency: Press ESC to quickly switch to a spreadsheet view");
    }
};

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    console.log("Initializing app...");
    app.init();
    console.log("App initialized");
    
    // Test if critical elements exist
    console.log("searchInput exists:", !!document.getElementById('searchInput'));
    console.log("searchCell exists:", !!document.getElementById('searchCell'));
    console.log("results container exists:", !!document.getElementById('results'));
});

// Add this at the end of your all.js/app.js file
function hideWelcome() {
    app.hideWelcome();
}

function hideWelcome() {
    if (typeof app !== 'undefined' && app.hideWelcome) {
        app.hideWelcome();
    } else {
        console.error("App object not defined or hideWelcome method not available");
        // Fallback hiding of welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
            localStorage.setItem('welcomeSeen', 'true');
        }
    }
}

// Add this to your app.js file
document.addEventListener('DOMContentLoaded', function() {
    // Password show/hide toggle
    document.querySelector('.gs-show-button').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            this.textContent = 'Show';
        }
    });
    
    // Add this to your app.js file
document.querySelector('.google-login-btn').addEventListener('click', function() {
    // Show a modal or alert explaining this would redirect to Google in production
    alert('In the production version, this would redirect to Google for authentication.');
    
    // Optionally simulate a successful login for demo purposes
    const mockUserData = {
        id: "google_user123",
        name: "Google User",
        email: "user@gmail.com",
        token: "mock-google-auth-token"
    };
    
    // Store mock auth data
    localStorage.setItem('naukriAuthToken', mockUserData.token);
    localStorage.setItem('naukriUser', JSON.stringify(mockUserData));
    
    // Update UI
    app.hideLoginModal();
    app.updateUserInterface();
});
    
    // OTP login functionality
    document.querySelector('.gs-otp-button').addEventListener('click', function() {
        console.log('OTP login clicked - would trigger OTP flow in production');
        // In a real implementation, this would show an OTP input screen
    });
});