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