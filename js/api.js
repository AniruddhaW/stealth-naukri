// API integration with Naukri.com
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
    
    // Loop through keys and check for matches
    for (const key in commonJobs) {
        console.log("Checking against key:", key);
        
        // Check if the query contains the key or the key contains the query
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            console.log("Match found for key:", key);
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
    
    // No matches found
    console.log("No matches found for query:", normalizedQuery);
    return {
        success: true,
        jobs: [],
        total: 0
    };
}