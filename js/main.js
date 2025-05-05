// Main application logic
const app = {
    // Initialize the application
    init: function() {
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
    },
    
    // Set up event listeners
    sesetupEventListeners: function() {
        // Focus events for cell reference display
        const searchCell = document.getElementById('searchCell');
        const searchInput = document.getElementById('searchInput');
        
        // Update cell reference display
        searchCell.addEventListener('focus', function() {
            document.querySelector('.cell-reference').textContent = 'A9';
        });
        
        searchInput.addEventListener('focus', function() {
            document.querySelector('.cell-reference').textContent = 'A9';
        });
        
        // IMPORTANT: This is the main event listener for the search function
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                const query = this.value.trim();
                console.log("Search query entered:", query); // Debug log
                if (query) {
                    search.performSearch(query);
                }
            }
        });
        
        // Emergency exit via ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.showEmergencyView();
            }
        });
        
        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
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
        
        // Add this line to log when the event listeners are set up
        console.log("Event listeners set up successfully");
    },
    
    // Check login status
    checkLoginStatus: function() {
        const token = localStorage.getItem('naukriAuthToken');
        const user = JSON.parse(localStorage.getItem('naukriUser') || '{}');
        
        if (token && user.name) {
            // Update UI for logged in user
            const avatar = document.getElementById('userAvatar');
            avatar.textContent = user.name.charAt(0).toUpperCase();
            
            // Hide login button
            document.getElementById('loginButton').style.display = 'none';
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
    
    // Hide welcome message
    hideWelcome: function() {
        document.getElementById('welcomeMessage').style.display = 'none';
        localStorage.setItem('welcomeSeen', 'true');
    },
    
    // Show login modal
    showLoginModal: function() {
        document.getElementById('loginModal').style.display = 'flex';
    },
    
    // Hide login modal
    hideLoginModal: function() {
        document.getElementById('loginModal').style.display = 'none';
    },
    
    // Show emergency view
    showEmergencyView: function() {
        emergency.showSpreadsheetView();
    },
    
    // Show help information
    showHelpModal: function() {
        alert("Stealth Naukri Search\n\nThis tool allows you to search for jobs on Naukri.com while keeping your screen looking like a Google Sheet.\n\nTo search: Type a job title in cell A1 and press Enter\nTo apply: Click the 'Apply' link on any job\nEmergency: Press ESC to quickly switch to a spreadsheet view");
    }
};

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});

// Add this to your main.js file:
document.addEventListener('DOMContentLoaded', function() {
    // Add click event for the "Got it" cell
    const gotItCell = document.querySelector('.got-it-cell');
    if (gotItCell) {
        gotItCell.addEventListener('click', function() {
            // Focus on the search cell
            document.getElementById('searchCell').focus();
        });
    }
});

// Function to hide welcome message and insert financial data
function hideWelcome() {
    // Hide the welcome message
    document.getElementById('welcomeMessage').style.display = 'none';
    
    // Get the results container where we'll insert our data
    const resultsContainer = document.getElementById('results');
    
    // Sample financial data (Quarterly Budget Review data)
    const financialData = [
        { category: "Marketing", q1: "$15,750", q2: "$18,450", q3: "$21,200", trend: "+12%", status: "On Track" },
        { category: "Sales", q1: "$42,800", q2: "$45,100", q3: "$48,750", trend: "+8%", status: "Exceeding" },
        { category: "R&D", q1: "$34,200", q2: "$33,800", q3: "$36,500", trend: "+5%", status: "On Track" },
        { category: "Operations", q1: "$28,300", q2: "$27,900", q3: "$29,100", trend: "+3%", status: "On Track" },
        { category: "IT", q1: "$18,400", q2: "$22,700", q3: "$19,800", trend: "-13%", status: "Review" },
        { category: "HR", q1: "$12,100", q2: "$12,350", q3: "$12,600", trend: "+2%", status: "On Track" },
        { category: "Admin", q1: "$8,750", q2: "$9,200", q3: "$9,400", trend: "+2%", status: "On Track" },
        { category: "Total", q1: "$160,300", q2: "$169,500", q3: "$177,350", trend: "+5%", status: "" }
    ];
    
    // Generate fake header row
    const headerRow = document.createElement('tr');
    const headerCells = ["Category", "Q1 2023", "Q2 2023", "Q3 2023", "Trend", "Status"];
    
    // Add row header first (the number)
    const rowHeaderCell = document.createElement('td');
    rowHeaderCell.className = 'row-header';
    rowHeaderCell.textContent = '3';
    headerRow.appendChild(rowHeaderCell);
    
    // Add actual headers
    headerCells.forEach(header => {
        const cell = document.createElement('td');
        cell.textContent = header;
        cell.className = 'header-cell';
        headerRow.appendChild(cell);
    });
    
    // Add the header row
    resultsContainer.appendChild(headerRow);
    
    // Generate rows for each piece of financial data
    financialData.forEach((row, index) => {
        const tableRow = document.createElement('tr');
        
        // Add row header (the row number)
        const rowHeaderCell = document.createElement('td');
        rowHeaderCell.className = 'row-header';
        rowHeaderCell.textContent = (index + 4).toString();
        tableRow.appendChild(rowHeaderCell);
        
        // Add cells for each piece of data
        const cell1 = document.createElement('td');
        cell1.textContent = row.category;
        if (row.category === "Total") {
            cell1.style.fontWeight = "bold";
        }
        tableRow.appendChild(cell1);
        
        const cell2 = document.createElement('td');
        cell2.textContent = row.q1;
        tableRow.appendChild(cell2);
        
        const cell3 = document.createElement('td');
        cell3.textContent = row.q2;
        tableRow.appendChild(cell3);
        
        const cell4 = document.createElement('td');
        cell4.textContent = row.q3;
        tableRow.appendChild(cell4);
        
        const cell5 = document.createElement('td');
        cell5.textContent = row.trend;
        if (row.trend.includes('-')) {
            cell5.style.color = "#EA4335"; // Google red for negative trends
        } else {
            cell5.style.color = "#34A853"; // Google green for positive trends
        }
        tableRow.appendChild(cell5);
        
        const cell6 = document.createElement('td');
        cell6.textContent = row.status;
        if (row.status === "Review") {
            cell6.style.color = "#EA4335"; // Google red for review status
        } else if (row.status === "Exceeding") {
            cell6.style.color = "#34A853"; // Google green for exceeding
        }
        tableRow.appendChild(cell6);
        
        // Add the data row
        resultsContainer.appendChild(tableRow);
    });
    
    // Ensure the A1 search cell is ready for input
    document.getElementById('searchCell').focus();
}

// Make the hideWelcome function globally accessible
window.hideWelcome = hideWelcome;