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
    setupEventListeners: function() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            document.getElementById('searchCell').textContent = query;
        });
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
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