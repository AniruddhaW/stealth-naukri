// Sample job database
const jobDatabase = {
    "software engineer": [
        {id: 1, company: "Microsoft", position: "Software Engineer", location: "Hyderabad", salary: "₹1,00,00,000", rating: "4.8", description: "Join our team to build cutting-edge software solutions."},
        {id: 2, company: "Flipkart", position: "Backend Developer", location: "Bangalore", salary: "₹95,00,000", rating: "4.6", description: "Work on scalable backend systems for India's leading e-commerce platform."},
        {id: 3, company: "Amazon", position: "Full Stack Developer", location: "Pune", salary: "₹1,10,00,000", rating: "4.7", description: "Develop and maintain full stack applications for the world's largest online retailer."},
        {id: 4, company: "Google", position: "SDE II", location: "Bangalore", salary: "₹1,20,00,000", rating: "4.9", description: "Create innovative solutions that impact billions of users worldwide."},
        {id: 5, company: "Swiggy", position: "Frontend Engineer", location: "Gurgaon", salary: "₹90,00,000", rating: "4.5", description: "Build responsive and intuitive user interfaces for our food delivery platform."}
    ],
    "data scientist": [
        {id: 10, company: "Microsoft", position: "Data Scientist", location: "Bangalore", salary: "₹95,00,000", rating: "4.7", description: "Apply machine learning to solve complex business problems."},
        {id: 11, company: "Amazon", position: "ML Engineer", location: "Hyderabad", salary: "₹1,00,00,000", rating: "4.8", description: "Build and deploy machine learning models at scale."},
        {id: 12, company: "Flipkart", position: "Data Analyst", location: "Bangalore", salary: "₹85,00,000", rating: "4.5", description: "Extract insights from large datasets to drive business decisions."},
        {id: 13, company: "Google", position: "AI Researcher", location: "Bangalore", salary: "₹1,20,00,000", rating: "4.9", description: "Conduct research in artificial intelligence and machine learning."}
    ],
    "product manager": [
        {id: 6, company: "Amazon", position: "Product Manager", location: "Bangalore", salary: "₹1,10,00,000", rating: "4.6", description: "Drive product strategy and roadmap for consumer products."},
        {id: 7, company: "Flipkart", position: "Senior PM", location: "Bangalore", salary: "₹1,15,00,000", rating: "4.7", description: "Lead product development for our core shopping experience."},
        {id: 8, company: "Microsoft", position: "Product Lead", location: "Hyderabad", salary: "₹1,20,00,000", rating: "4.8", description: "Shape the future of Microsoft's productivity applications."},
        {id: 9, company: "Google", position: "PM", location: "Gurgaon", salary: "₹1,25,00,000", rating: "4.9", description: "Manage product development for Google's advertising platform."}
    ],
    "ux designer": [
        {id: 14, company: "Google", position: "UX Designer", location: "Bangalore", salary: "₹90,00,000", rating: "4.8", description: "Create user experiences that delight and inspire."},
        {id: 15, company: "Amazon", position: "Product Designer", location: "Hyderabad", salary: "₹85,00,000", rating: "4.7", description: "Design intuitive and engaging user interfaces for our e-commerce platform."},
        {id: 16, company: "Flipkart", position: "UI/UX Lead", location: "Bangalore", salary: "₹95,00,000", rating: "4.6", description: "Lead the design team in creating beautiful and functional interfaces."}
    ],
    "marketing manager": [
        {id: 17, company: "Google", position: "Marketing Manager", location: "Bangalore", salary: "₹80,00,000", rating: "4.8", description: "Develop and execute marketing strategies for Google products."},
        {id: 18, company: "Amazon", position: "Brand Manager", location: "Mumbai", salary: "₹75,00,000", rating: "4.7", description: "Build and maintain Amazon's brand presence in India."},
        {id: 19, company: "Zomato", position: "Growth Marketer", location: "Delhi", salary: "₹70,00,000", rating: "4.5", description: "Drive user acquisition and retention through innovative marketing campaigns."}
    ],
    "hr manager": [
        {id: 20, company: "TCS", position: "HR Manager", location: "Mumbai", salary: "₹70,00,000", rating: "4.2", description: "Lead HR initiatives for a large workforce in a global IT company."},
        {id: 21, company: "Infosys", position: "Talent Acquisition Lead", location: "Bangalore", salary: "₹75,00,000", rating: "4.3", description: "Develop and implement strategies to attract top talent."},
        {id: 22, company: "Wipro", position: "People Operations Head", location: "Pune", salary: "₹80,00,000", rating: "4.4", description: "Oversee all aspects of HR operations for the organization."}
    ],
    "project manager": [
        {id: 23, company: "Accenture", position: "Project Manager", location: "Bangalore", salary: "₹85,00,000", rating: "4.4", description: "Lead cross-functional teams to deliver complex IT projects."},
        {id: 24, company: "Cognizant", position: "Program Manager", location: "Chennai", salary: "₹90,00,000", rating: "4.3", description: "Manage multiple related projects to achieve strategic objectives."},
        {id: 25, company: "TCS", position: "Delivery Manager", location: "Hyderabad", salary: "₹95,00,000", rating: "4.2", description: "Ensure successful delivery of projects within scope, time, and budget."}
    ],
    "business analyst": [
        {id: 26, company: "Deloitte", position: "Business Analyst", location: "Gurgaon", salary: "₹70,00,000", rating: "4.5", description: "Analyze business processes and identify opportunities for improvement."},
        {id: 27, company: "EY", position: "Data Analyst", location: "Mumbai", salary: "₹65,00,000", rating: "4.4", description: "Extract insights from data to support business decision-making."},
        {id: 28, company: "KPMG", position: "Financial Analyst", location: "Bangalore", salary: "₹75,00,000", rating: "4.6", description: "Analyze financial data to provide strategic insights to clients."}
    ],
    "java developer": [
        {id: 29, company: "Oracle", position: "Java Developer", location: "Hyderabad", salary: "₹90,00,000", rating: "4.5", description: "Build enterprise-scale applications using Java and related technologies."},
        {id: 30, company: "IBM", position: "Java Architect", location: "Pune", salary: "₹1,10,00,000", rating: "4.4", description: "Design and develop large-scale Java applications for enterprise clients."},
        {id: 31, company: "Infosys", position: "Java Team Lead", location: "Chennai", salary: "₹85,00,000", rating: "4.3", description: "Lead a team of Java developers working on enterprise applications."}
    ],
    "devops engineer": [
        {id: 32, company: "Amazon", position: "DevOps Engineer", location: "Mumbai", salary: "₹95,00,000", rating: "4.7", description: "Build and maintain scalable infrastructure for cloud-based applications."},
        {id: 33, company: "Microsoft", position: "Cloud Engineer", location: "Bangalore", salary: "₹1,00,00,000", rating: "4.8", description: "Design and implement Azure-based cloud solutions."},
        {id: 34, company: "Google", position: "SRE", location: "Hyderabad", salary: "₹1,10,00,000", rating: "4.9", description: "Ensure reliability and performance of Google's production systems."}
    ],
    "android developer": [
        {id: 35, company: "Flipkart", position: "Android Developer", location: "Bangalore", salary: "₹85,00,000", rating: "4.5", description: "Build and maintain Android applications for India's leading e-commerce platform."},
        {id: 36, company: "Swiggy", position: "Mobile Engineer", location: "Gurgaon", salary: "₹80,00,000", rating: "4.4", description: "Develop features for Swiggy's food delivery app used by millions."},
        {id: 37, company: "Paytm", position: "Android Lead", location: "Noida", salary: "₹90,00,000", rating: "4.3", description: "Lead development of Android applications for India's largest payment platform."}
    ],
    "ios developer": [
        {id: 38, company: "Amazon", position: "iOS Developer", location: "Hyderabad", salary: "₹90,00,000", rating: "4.6", description: "Build iPhone and iPad applications for Amazon's e-commerce platform."},
        {id: 39, company: "Zomato", position: "iOS Engineer", location: "Gurgaon", salary: "₹85,00,000", rating: "4.5", description: "Develop features for Zomato's iOS food delivery app."},
        {id: 40, company: "PhonePe", position: "iOS Lead", location: "Bangalore", salary: "₹95,00,000", rating: "4.7", description: "Lead development of iOS applications for digital payment services."}
    ],
    "data engineer": [
        {id: 41, company: "Amazon", position: "Data Engineer", location: "Hyderabad", salary: "₹90,00,000", rating: "4.7", description: "Build and maintain data processing systems at scale."},
        {id: 42, company: "Microsoft", position: "Big Data Engineer", location: "Bangalore", salary: "₹95,00,000", rating: "4.6", description: "Design and implement large-scale data processing pipelines."},
        {id: 43, company: "Walmart Labs", position: "ETL Developer", location: "Bangalore", salary: "₹85,00,000", rating: "4.5", description: "Develop data extraction, transformation, and loading processes."}
    ],
    "qa engineer": [
        {id: 44, company: "Google", position: "QA Engineer", location: "Bangalore", salary: "₹80,00,000", rating: "4.7", description: "Ensure quality of Google products through automated and manual testing."},
        {id: 45, company: "Microsoft", position: "Test Engineer", location: "Hyderabad", salary: "₹75,00,000", rating: "4.6", description: "Design and implement test strategies for Microsoft products."},
        {id: 46, company: "Amazon", position: "SDET", location: "Pune", salary: "₹85,00,000", rating: "4.8", description: "Develop automated test frameworks for Amazon services."}
    ],
    "react developer": [
        {id: 47, company: "Facebook", position: "React Developer", location: "Hyderabad", salary: "₹95,00,000", rating: "4.8", description: "Build user interfaces using React for Facebook products."},
        {id: 48, company: "Flipkart", position: "Frontend Engineer", location: "Bangalore", salary: "₹90,00,000", rating: "4.6", description: "Develop responsive web interfaces using React."},
        {id: 49, company: "PayPal", position: "UI Developer", location: "Chennai", salary: "₹85,00,000", rating: "4.5", description: "Create compelling user experiences using React and related technologies."}
    ],
    "python developer": [
        {id: 50, company: "Google", position: "Python Developer", location: "Bangalore", salary: "₹90,00,000", rating: "4.9", description: "Build backend services and tools using Python."},
        {id: 51, company: "Amazon", position: "Python Engineer", location: "Hyderabad", salary: "₹85,00,000", rating: "4.7", description: "Develop data processing and analysis tools using Python."},
        {id: 52, company: "Microsoft", position: "Software Engineer", location: "Pune", salary: "₹95,00,000", rating: "4.8", description: "Develop Python applications for cloud services."}
    ],
    "content writer": [
        {id: 53, company: "Amazon", position: "Content Writer", location: "Bangalore", salary: "₹60,00,000", rating: "4.3", description: "Create compelling content for Amazon's product pages and marketing materials."},
        {id: 54, company: "Google", position: "Technical Writer", location: "Hyderabad", salary: "₹65,00,000", rating: "4.5", description: "Create technical documentation and user guides for Google products."},
        {id: 55, company: "Microsoft", psosition: "Content Strategist", location: "Gurgaon", salary: "₹70,00,000", rating: "4.4", description: "Develop content strategy for Microsoft's products and services."}
    ],
    "accountant": [
        {id: 56, company: "Deloitte", position: "Accountant", location: "Mumbai", salary: "₹65,00,000", rating: "4.2", description: "Manage financial records and prepare reports for clients."},
        {id: 57, company: "EY", position: "Financial Analyst", location: "Bangalore", salary: "₹70,00,000", rating: "4.3", description: "Analyze financial data and prepare reports for management."},
        {id: 58, company: "PwC", position: "Tax Consultant", location: "Delhi", salary: "₹75,00,000", rating: "4.4", description: "Provide tax planning and compliance services to clients."}
    ],
    "graphic designer": [
        {id: 59, company: "Amazon", position: "Graphic Designer", location: "Bangalore", salary: "₹65,00,000", rating: "4.4", description: "Create visual concepts for Amazon's marketing campaigns."},
        {id: 60, company: "Google", position: "Visual Designer", location: "Hyderabad", salary: "₹70,00,000", rating: "4.6", description: "Design visual elements for Google products and marketing materials."},
        {id: 61, company: "Flipkart", position: "UI Designer", location: "Bangalore", salary: "₹60,00,000", rating: "4.3", description: "Design user interfaces for Flipkart's web and mobile applications."}
    ]
};