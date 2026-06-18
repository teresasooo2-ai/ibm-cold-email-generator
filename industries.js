/**
 * IBM Cold Email Generator - Industry Database
 * Contains industry-specific pain points, trends, and IBM Data & AI solutions
 */

const INDUSTRIES = {
    healthcare: {
        name: "Healthcare & Life Sciences",
        painPoints: [
            "Fragmented patient data preventing unified care insights",
            "Inability to extract value from unstructured clinical data",
            "Slow drug discovery and clinical trial processes",
            "Compliance challenges with evolving healthcare regulations"
        ],
        industryTrends: [
            "shifting to value-based care models requiring real-time data integration",
            "investing heavily in AI for clinical decision support and diagnostics",
            "facing pressure to reduce readmission rates while managing costs",
            "accelerating digital health initiatives post-pandemic"
        ],
        recentChanges: [
            "implementing interoperability standards (FHIR) across systems",
            "adopting cloud infrastructure for scalability and compliance",
            "expanding telehealth capabilities and remote patient monitoring",
            "modernizing legacy EHR systems to support AI/ML workloads"
        ],
        ibmSolutions: {
            ai: { name: "Watson Health AI", benefit: "accelerate diagnosis and treatment decisions with AI-powered insights" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify patient data across systems for 360° care visibility" },
            database: { name: "IBM Db2 & Cloud Databases", benefit: "ensure HIPAA-compliant, high-performance data management" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "visualize clinical outcomes and operational metrics in real-time" }
        },
        metrics: ["30% faster diagnosis", "40% reduction in readmissions", "$2M annual cost savings"]
    },

    financial: {
        name: "Financial Services & Banking",
        painPoints: [
            "Real-time fraud detection across millions of transactions",
            "Regulatory compliance reporting consuming excessive resources",
            "Siloed customer data limiting personalization",
            "Legacy systems blocking digital transformation"
        ],
        industryTrends: [
            "racing to deploy AI for fraud detection and risk management",
            "under pressure from regulators to modernize compliance systems",
            "competing with fintechs on digital customer experience",
            "migrating core banking systems to cloud infrastructure"
        ],
        recentChanges: [
            "implementing real-time payment systems and open banking APIs",
            "replacing mainframe systems with cloud-native architectures",
            "adopting AI/ML for credit decisioning and personalization",
            "consolidating data lakes to break down product silos"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Financial Services", benefit: "detect fraud in real-time with 60% fewer false positives" },
            data_fabric: { name: "IBM Data Fabric", benefit: "create unified customer views across all touchpoints" },
            database: { name: "IBM Db2 for Banking", benefit: "process millions of transactions with sub-second latency" },
            bi_analytics: { name: "IBM Planning Analytics", benefit: "automate regulatory reporting and risk analysis" }
        },
        metrics: ["45% reduction in fraud losses", "70% faster compliance reporting", "$5M annual savings"]
    },

    food: {
        name: "Food & Beverage",
        painPoints: [
            "Food safety tracking and traceability compliance gaps",
            "Inventory forecasting failures leading to stockouts or waste",
            "Kitchen display and POS system failures during peak hours",
            "Poor data quality in operational dashboards affecting decisions"
        ],
        industryTrends: [
            "shifting to 65%+ digital orders requiring infrastructure modernization",
            "facing FDA traceability requirements with $10M+ non-compliance fines",
            "investing heavily in AI for demand forecasting and labor scheduling",
            "struggling with legacy systems not built for high digital order volumes"
        ],
        recentChanges: [
            "implementing real-time supply chain visibility for food safety",
            "adopting AI-powered demand sensing to reduce stockouts by 67%",
            "modernizing kitchen display systems for concurrent order processing",
            "deploying data observability tools to fix broken analytics dashboards"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Food Service", benefit: "optimize demand forecasting and labor scheduling with 91% accuracy" },
            data_fabric: { name: "IBM Data Fabric", benefit: "enable farm-to-table traceability with real-time data integration" },
            database: { name: "IBM Cloud Databases", benefit: "scale to handle peak mobile ordering loads without downtime" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "fix broken dashboards with data lineage and quality monitoring" }
        },
        metrics: ["67% reduction in stockouts", "$28B saved from better forecasting", "91% AI scheduling accuracy"]
    },

    retail: {
        name: "Retail & E-commerce",
        painPoints: [
            "Inventory optimization across omnichannel operations",
            "Inability to predict demand and prevent stockouts",
            "Disconnected customer experiences online and in-store",
            "Supply chain visibility gaps impacting margins"
        ],
        industryTrends: [
            "investing in AI-powered demand forecasting and inventory optimization",
            "struggling with supply chain disruptions and rising costs",
            "competing on personalization and seamless omnichannel experiences",
            "adopting real-time analytics for dynamic pricing"
        ],
        recentChanges: [
            "implementing unified commerce platforms across channels",
            "deploying computer vision for inventory tracking and loss prevention",
            "migrating to cloud-based POS and inventory systems",
            "building customer data platforms for personalization at scale"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Retail", benefit: "predict demand with 40% better accuracy using ML models" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify inventory, sales, and customer data in real-time" },
            database: { name: "IBM Cloud Databases", benefit: "scale seamlessly during peak shopping seasons" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "optimize pricing and promotions with real-time insights" }
        },
        metrics: ["25% reduction in stockouts", "35% increase in conversion", "$3M additional revenue"]
    },

    manufacturing: {
        name: "Manufacturing & Industrial",
        painPoints: [
            "Unplanned downtime costing millions in lost production",
            "Quality defects discovered too late in production",
            "Supply chain disruptions causing material shortages",
            "Inability to optimize production schedules"
        ],
        industryTrends: [
            "adopting Industry 4.0 and smart factory initiatives",
            "implementing predictive maintenance to reduce downtime",
            "facing pressure to improve sustainability and reduce waste",
            "struggling with skilled labor shortages and knowledge transfer"
        ],
        recentChanges: [
            "deploying IoT sensors across factory floors for real-time monitoring",
            "migrating MES and ERP systems to cloud platforms",
            "implementing digital twins for production optimization",
            "adopting AI for quality inspection and defect detection"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI & Maximo", benefit: "predict equipment failures 30% earlier with IoT analytics" },
            data_fabric: { name: "IBM Data Fabric", benefit: "connect factory floor data to enterprise systems" },
            database: { name: "IBM Db2 Warehouse", benefit: "analyze sensor data from thousands of machines in real-time" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "optimize production schedules and resource allocation" }
        },
        metrics: ["40% reduction in downtime", "50% fewer defects", "$4M annual savings"]
    },

    telecommunications: {
        name: "Telecommunications",
        painPoints: [
            "Network performance issues impacting customer experience",
            "High customer churn in competitive markets",
            "Massive data volumes requiring real-time analysis",
            "5G infrastructure optimization challenges"
        ],
        industryTrends: [
            "rolling out 5G networks requiring intelligent optimization",
            "competing on customer experience in saturated markets",
            "monetizing network data while ensuring privacy compliance",
            "managing exponential growth in IoT device connections"
        ],
        recentChanges: [
            "deploying AI-powered network operations centers (NOCs)",
            "implementing edge computing for low-latency applications",
            "migrating to cloud-native network functions (NFV)",
            "building real-time analytics platforms for churn prediction"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Telecom", benefit: "predict and prevent network issues before customer impact" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify network, customer, and billing data" },
            database: { name: "IBM Cloud Databases", benefit: "handle billions of network events with low latency" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "identify churn risk and optimize retention campaigns" }
        },
        metrics: ["35% reduction in churn", "50% faster issue resolution", "$6M revenue increase"]
    },

    energy: {
        name: "Energy & Utilities",
        painPoints: [
            "Aging infrastructure requiring predictive maintenance",
            "Renewable energy integration and grid optimization",
            "Demand forecasting accuracy impacting operations",
            "Regulatory compliance and sustainability reporting"
        ],
        industryTrends: [
            "transitioning to renewable energy sources and smart grids",
            "under pressure to meet carbon neutrality commitments",
            "adopting AI for grid optimization and demand response",
            "facing cybersecurity threats to critical infrastructure"
        ],
        recentChanges: [
            "deploying smart meters and IoT sensors across infrastructure",
            "implementing predictive maintenance for aging assets",
            "building energy trading platforms with real-time analytics",
            "migrating SCADA systems to secure cloud environments"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Energy", benefit: "optimize grid operations and predict equipment failures" },
            data_fabric: { name: "IBM Data Fabric", benefit: "integrate smart meter data with operational systems" },
            database: { name: "IBM Db2 Warehouse", benefit: "process billions of IoT sensor readings" },
            bi_analytics: { name: "IBM Planning Analytics", benefit: "forecast demand and optimize energy distribution" }
        },
        metrics: ["30% reduction in outages", "20% improved efficiency", "$3.5M annual savings"]
    },

    transportation: {
        name: "Transportation & Logistics",
        painPoints: [
            "Supply chain visibility gaps causing delays",
            "Route optimization with dynamic conditions",
            "Asset tracking across multi-modal networks",
            "Rising fuel costs and carbon emission pressures"
        ],
        industryTrends: [
            "adopting autonomous vehicles and delivery drones",
            "under pressure to reduce carbon emissions and improve sustainability",
            "implementing real-time tracking and predictive ETAs",
            "competing on last-mile delivery speed and reliability"
        ],
        recentChanges: [
            "deploying IoT sensors for real-time asset tracking",
            "implementing AI-powered route optimization systems",
            "migrating TMS and WMS to cloud platforms",
            "building control towers for end-to-end supply chain visibility"
        ],
        ibmSolutions: {
            ai: { name: "Watson Supply Chain AI", benefit: "optimize routes and predict delays with ML" },
            data_fabric: { name: "IBM Data Fabric", benefit: "track shipments in real-time across partners" },
            database: { name: "IBM Cloud Databases", benefit: "manage millions of shipment records with high availability" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "analyze fleet performance and identify cost savings" }
        },
        metrics: ["25% cost reduction", "30% on-time improvement", "$2.5M annual savings"]
    },

    government: {
        name: "Government & Public Sector",
        painPoints: [
            "Legacy systems hindering digital citizen services",
            "Data silos preventing inter-agency collaboration",
            "Cybersecurity threats to critical infrastructure",
            "Budget constraints with increasing service demands"
        ],
        industryTrends: [
            "modernizing legacy systems to improve citizen services",
            "adopting cloud-first strategies for cost savings",
            "implementing AI for fraud detection and case management",
            "facing increasing cybersecurity threats and compliance requirements"
        ],
        recentChanges: [
            "migrating to FedRAMP-authorized cloud platforms",
            "implementing zero-trust security architectures",
            "deploying AI chatbots for citizen service automation",
            "consolidating data across agencies for better insights"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Government", benefit: "automate citizen services and document processing" },
            data_fabric: { name: "IBM Data Fabric", benefit: "enable secure data sharing across agencies" },
            database: { name: "IBM Db2 (FedRAMP)", benefit: "ensure compliance with government security standards" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "provide data-driven insights for policy decisions" }
        },
        metrics: ["60% faster response times", "40% cost reduction", "$4M annual savings"]
    },

    insurance: {
        name: "Insurance",
        painPoints: [
            "Claims processing taking weeks instead of days",
            "Fraud detection missing sophisticated schemes",
            "Risk assessment relying on outdated models",
            "Customer experience lagging digital expectations"
        ],
        industryTrends: [
            "adopting AI for automated claims processing and fraud detection",
            "competing with insurtechs on digital customer experience",
            "implementing usage-based insurance models with IoT data",
            "facing pressure to improve underwriting accuracy"
        ],
        recentChanges: [
            "deploying AI-powered claims automation platforms",
            "implementing real-time fraud detection systems",
            "migrating policy administration systems to cloud",
            "building customer data platforms for personalization"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Insurance", benefit: "automate claims processing and detect fraud patterns" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify policy, claims, and customer data" },
            database: { name: "IBM Db2", benefit: "manage millions of policies with sub-second query performance" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "improve risk models with real-time analytics" }
        },
        metrics: ["50% faster claims processing", "40% fraud reduction", "$3M annual savings"]
    },

    media: {
        name: "Media & Entertainment",
        painPoints: [
            "Content personalization at scale for millions of users",
            "Monetization challenges with changing consumption patterns",
            "Managing massive media libraries and metadata",
            "Real-time audience insights for programming decisions"
        ],
        industryTrends: [
            "competing with streaming giants on content recommendations",
            "adopting AI for content creation and automated editing",
            "implementing real-time analytics for audience engagement",
            "facing pressure to monetize content across platforms"
        ],
        recentChanges: [
            "deploying AI-powered recommendation engines",
            "migrating media workflows to cloud infrastructure",
            "implementing automated content tagging and metadata management",
            "building unified analytics platforms across distribution channels"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI & Media", benefit: "personalize content recommendations with ML" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify content, audience, and advertising data" },
            database: { name: "IBM Cloud Databases", benefit: "manage petabytes of media assets with fast retrieval" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "analyze viewer behavior and optimize content strategy" }
        },
        metrics: ["35% engagement increase", "25% revenue growth", "40% faster content delivery"]
    },

    education: {
        name: "Education & Research",
        painPoints: [
            "Student data scattered across disconnected systems",
            "Inability to identify at-risk students early",
            "Research data management and collaboration challenges",
            "Administrative processes consuming faculty time"
        ],
        industryTrends: [
            "adopting AI for personalized learning and student success prediction",
            "implementing hybrid learning models post-pandemic",
            "facing pressure to improve student outcomes and retention",
            "modernizing legacy student information systems"
        ],
        recentChanges: [
            "deploying learning analytics platforms for early intervention",
            "migrating to cloud-based learning management systems",
            "implementing AI tutoring and adaptive learning systems",
            "consolidating student data for 360-degree views"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Education", benefit: "predict student success and personalize learning paths" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify student, academic, and administrative data" },
            database: { name: "IBM Db2", benefit: "securely manage sensitive student and research data" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "track outcomes and optimize resource allocation" }
        },
        metrics: ["30% improvement in retention", "40% faster research insights", "$2M cost savings"]
    },

    hospitality: {
        name: "Hospitality & Travel",
        painPoints: [
            "Guest personalization across properties and channels",
            "Revenue optimization with dynamic pricing",
            "Operational efficiency in housekeeping and services",
            "Loyalty program effectiveness and engagement"
        ],
        industryTrends: [
            "recovering from pandemic with focus on contactless experiences",
            "adopting AI for dynamic pricing and revenue management",
            "competing on personalization and guest experience",
            "implementing sustainability initiatives to attract eco-conscious travelers"
        ],
        recentChanges: [
            "deploying mobile check-in and contactless payment systems",
            "implementing AI-powered chatbots for guest services",
            "migrating property management systems to cloud",
            "building unified guest profiles across properties"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Hospitality", benefit: "personalize guest experiences and optimize pricing" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify reservation, guest, and operational data" },
            database: { name: "IBM Cloud Databases", benefit: "handle booking surges with elastic scalability" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "analyze occupancy trends and maximize revenue" }
        },
        metrics: ["25% revenue increase", "40% guest satisfaction improvement", "30% operational efficiency"]
    },

    pharma: {
        name: "Pharmaceutical & Biotech",
        painPoints: [
            "Drug discovery timelines taking 10+ years",
            "Clinical trial recruitment and patient matching",
            "Supply chain complexity for temperature-sensitive products",
            "Regulatory compliance across global markets"
        ],
        industryTrends: [
            "adopting AI to accelerate drug discovery and development",
            "implementing precision medicine and personalized therapies",
            "facing pressure to reduce R&D costs and time-to-market",
            "managing complex global supply chains for biologics"
        ],
        recentChanges: [
            "deploying AI for molecule identification and clinical trial optimization",
            "implementing blockchain for supply chain traceability",
            "migrating research data to cloud-based platforms",
            "building real-world evidence platforms for post-market surveillance"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Drug Discovery", benefit: "accelerate molecule identification with AI" },
            data_fabric: { name: "IBM Data Fabric", benefit: "integrate research, clinical, and manufacturing data" },
            database: { name: "IBM Db2", benefit: "manage complex molecular and patient data securely" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "track trial progress and regulatory compliance" }
        },
        metrics: ["40% faster drug discovery", "50% better trial recruitment", "$5M R&D savings"]
    },

    automotive: {
        name: "Automotive",
        painPoints: [
            "Connected vehicle data management at scale",
            "Supply chain disruptions impacting production",
            "Quality control across complex manufacturing",
            "Customer experience in digital sales channels"
        ],
        industryTrends: [
            "transitioning to electric vehicles and autonomous driving",
            "adopting software-defined vehicles and over-the-air updates",
            "implementing AI for predictive maintenance and quality control",
            "facing semiconductor shortages and supply chain challenges"
        ],
        recentChanges: [
            "deploying connected vehicle platforms for telematics data",
            "implementing AI-powered quality inspection systems",
            "migrating to cloud-based manufacturing execution systems",
            "building digital twin models for vehicle development"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI for Automotive", benefit: "predict maintenance needs and optimize production" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify vehicle, manufacturing, and customer data" },
            database: { name: "IBM Db2 Warehouse", benefit: "analyze telematics from millions of vehicles" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "optimize supply chain and quality metrics" }
        },
        metrics: ["35% defect reduction", "30% supply chain improvement", "$4M annual savings"]
    },

    realestate: {
        name: "Real Estate & Construction",
        painPoints: [
            "Project delays and cost overruns",
            "Building performance and energy optimization",
            "Tenant experience and smart building management",
            "Portfolio analytics across properties"
        ],
        industryTrends: [
            "adopting smart building technologies and IoT sensors",
            "implementing AI for energy optimization and sustainability",
            "facing pressure to improve tenant experience and retention",
            "modernizing property management systems"
        ],
        recentChanges: [
            "deploying IoT sensors for building performance monitoring",
            "implementing AI-powered HVAC and lighting optimization",
            "migrating to cloud-based property management platforms",
            "building tenant experience apps and digital services"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI & IoT", benefit: "optimize building operations and predict maintenance" },
            data_fabric: { name: "IBM Data Fabric", benefit: "integrate property, tenant, and IoT sensor data" },
            database: { name: "IBM Cloud Databases", benefit: "manage property portfolios with real-time updates" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "analyze occupancy, energy, and financial performance" }
        },
        metrics: ["25% energy savings", "40% faster project delivery", "$3M operational savings"]
    },

    technology: {
        name: "Technology & Software",
        painPoints: [
            "Customer churn prediction and retention",
            "Product usage analytics at scale",
            "DevOps and application performance monitoring",
            "Competitive intelligence and market insights"
        ],
        industryTrends: [
            "adopting AI for product recommendations and churn prediction",
            "implementing real-time analytics for product optimization",
            "competing on data-driven product development",
            "facing pressure to improve customer lifetime value"
        ],
        recentChanges: [
            "deploying AI-powered customer success platforms",
            "implementing real-time product analytics and A/B testing",
            "migrating to cloud-native architectures and microservices",
            "building customer data platforms for personalization"
        ],
        ibmSolutions: {
            ai: { name: "Watson AI & ML", benefit: "predict churn and personalize user experiences" },
            data_fabric: { name: "IBM Data Fabric", benefit: "unify product, customer, and operational data" },
            database: { name: "IBM Cloud Databases", benefit: "scale to billions of events with high performance" },
            bi_analytics: { name: "IBM Cognos Analytics", benefit: "track KPIs and optimize product roadmaps" }
        },
        metrics: ["30% churn reduction", "50% faster insights", "40% revenue growth"]
    }
};

// Helper function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get industry data
function getIndustryData(industryKey) {
    return INDUSTRIES[industryKey] || null;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { INDUSTRIES, getRandomItem, getIndustryData };
}

// Made with Bob
