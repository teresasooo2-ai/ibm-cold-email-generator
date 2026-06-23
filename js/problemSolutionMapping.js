/**
 * IBM Sales Cadence Engine - Problem-Solution Mapping Database
 * Maps business problems to IBM solutions, personas, and business impact
 */

const PROBLEM_SOLUTION_MAP = {
    // AI & Data Problems
    inventory_forecasting: {
        id: 'inventory_forecasting',
        name: 'Inventory Forecasting Inaccuracies',
        description: 'Poor demand prediction leading to stockouts or excess inventory',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['food', 'retail', 'manufacturing', 'automotive'],
        products: ['watsonx.ai', 'watsonx.data', 'Planning Analytics'],
        personas: {
            primary: ['VP Supply Chain', 'Chief Operations Officer', 'Director Demand Planning'],
            secondary: ['CIO', 'Chief Data Officer', 'VP Analytics'],
            influencers: ['Director Data Science', 'Director Supply Chain Technology']
        },
        businessImpact: [
            'Reduce waste by 15-25%',
            'Improve forecast accuracy by 30-40%',
            'Lower carrying costs by 20%',
            'Reduce stockouts by 50-70%'
        ],
        painPoints: [
            'Manual forecasting processes taking days',
            'Unable to factor in external variables (weather, events, trends)',
            'Siloed data preventing holistic demand view',
            'Legacy systems not built for AI/ML workloads'
        ]
    },

    food_safety_traceability: {
        id: 'food_safety_traceability',
        name: 'Food Safety & Traceability Compliance',
        description: 'Inability to track products from farm to table for regulatory compliance',
        severity: 'Medium',
        ibmFit: 'Strong',
        industries: ['food', 'retail', 'pharma'],
        products: ['Data Fabric', 'watsonx.data', 'Supply Chain Intelligence Suite'],
        personas: {
            primary: ['VP Operations', 'Chief Quality Officer', 'VP Supply Chain'],
            secondary: ['Chief Compliance Officer', 'VP Food Safety', 'CIO'],
            influencers: ['Director Quality Assurance', 'Director Regulatory Affairs']
        },
        businessImpact: [
            'Ensure FDA/FSMA compliance',
            'Reduce recall risk by 60%',
            'Improve traceability from days to minutes',
            'Avoid $10M+ non-compliance fines'
        ],
        painPoints: [
            'Manual traceability taking 7+ days',
            'Disconnected supplier and distribution data',
            'Paper-based tracking systems',
            'Unable to meet FDA Section 204 requirements'
        ]
    },

    labor_scheduling: {
        id: 'labor_scheduling',
        name: 'Labor Scheduling Optimization',
        description: 'Inefficient workforce scheduling leading to overstaffing or understaffing',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['food', 'retail', 'hospitality', 'healthcare'],
        products: ['watsonx.ai', 'watsonx.governance', 'Instana'],
        personas: {
            primary: ['VP Operations', 'Chief Human Resources Officer', 'Director Workforce Management'],
            secondary: ['CFO', 'VP Store Operations', 'CIO'],
            influencers: ['Director Labor Analytics', 'Director Operations Technology']
        },
        businessImpact: [
            'Reduce labor costs by 10-15%',
            'Improve employee satisfaction by 25%',
            'Optimize scheduling accuracy to 91%+',
            'Reduce overtime expenses by 30%'
        ],
        painPoints: [
            'Manual scheduling taking 10+ hours per week',
            'Unable to predict demand spikes',
            'High employee turnover from poor schedules',
            'Compliance issues with labor laws'
        ]
    },

    customer_analytics_fragmentation: {
        id: 'customer_analytics_fragmentation',
        name: 'Customer Analytics Fragmentation',
        description: 'Disconnected customer data preventing unified insights and personalization',
        severity: 'Medium',
        ibmFit: 'Strong',
        industries: ['retail', 'financial', 'telecommunications', 'insurance'],
        products: ['Data Fabric', 'watsonx.data', 'Cognos Analytics'],
        personas: {
            primary: ['Chief Marketing Officer', 'VP Customer Experience', 'Chief Data Officer'],
            secondary: ['VP Digital', 'VP Analytics', 'CIO'],
            influencers: ['Director Customer Insights', 'Director Marketing Analytics']
        },
        businessImpact: [
            'Increase customer lifetime value by 20-30%',
            'Improve personalization accuracy by 40%',
            'Reduce churn by 15-25%',
            'Increase conversion rates by 35%'
        ],
        painPoints: [
            'Customer data in 10+ disconnected systems',
            'Unable to create unified customer profiles',
            'Marketing campaigns based on incomplete data',
            'No real-time customer insights'
        ]
    },

    fraud_detection: {
        id: 'fraud_detection',
        name: 'Real-Time Fraud Detection',
        description: 'Inability to detect sophisticated fraud patterns in real-time',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['financial', 'insurance', 'retail', 'telecommunications'],
        products: ['watsonx.ai', 'QRadar', 'Guardium'],
        personas: {
            primary: ['Chief Risk Officer', 'VP Fraud Prevention', 'Chief Security Officer'],
            secondary: ['CIO', 'Chief Compliance Officer', 'VP Operations'],
            influencers: ['Director Fraud Analytics', 'Director Security Operations']
        },
        businessImpact: [
            'Reduce fraud losses by 45-60%',
            'Decrease false positives by 60%',
            'Detect fraud in milliseconds vs. days',
            'Save $5M+ annually in fraud prevention'
        ],
        painPoints: [
            'Rule-based systems missing new fraud patterns',
            'High false positive rates frustrating customers',
            'Manual review processes taking days',
            'Unable to detect cross-channel fraud'
        ]
    },

    predictive_maintenance: {
        id: 'predictive_maintenance',
        name: 'Predictive Maintenance',
        description: 'Unplanned downtime causing production losses and revenue impact',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['manufacturing', 'energy', 'transportation', 'telecommunications'],
        products: ['Maximo', 'watsonx.ai', 'Instana'],
        personas: {
            primary: ['VP Operations', 'Chief Operations Officer', 'Director Maintenance'],
            secondary: ['VP Manufacturing', 'CIO', 'VP Engineering'],
            influencers: ['Director Plant Operations', 'Director Reliability Engineering']
        },
        businessImpact: [
            'Reduce unplanned downtime by 40-50%',
            'Extend asset life by 20-30%',
            'Lower maintenance costs by 25%',
            'Save $4M+ annually in production losses'
        ],
        painPoints: [
            'Reactive maintenance causing costly downtime',
            'Unable to predict equipment failures',
            'Manual inspection processes',
            'No visibility into asset health'
        ]
    },

    ai_governance: {
        id: 'ai_governance',
        name: 'AI Governance & Ethics',
        description: 'Lack of AI model governance, explainability, and bias detection',
        severity: 'Medium',
        ibmFit: 'Excellent',
        industries: ['financial', 'healthcare', 'insurance', 'government'],
        products: ['watsonx.governance', 'watsonx.ai', 'OpenPages'],
        personas: {
            primary: ['Chief AI Officer', 'Chief Data Officer', 'Chief Risk Officer'],
            secondary: ['Chief Compliance Officer', 'CIO', 'VP Data Science'],
            influencers: ['Director AI Ethics', 'Director Model Risk Management']
        },
        businessImpact: [
            'Ensure regulatory compliance (EU AI Act, etc.)',
            'Reduce model risk by 50%',
            'Improve model explainability and trust',
            'Avoid $10M+ regulatory fines'
        ],
        painPoints: [
            'No visibility into AI model decisions',
            'Unable to detect bias in models',
            'Manual model monitoring processes',
            'Regulatory compliance concerns'
        ]
    },

    data_silos: {
        id: 'data_silos',
        name: 'Data Silos & Integration',
        description: 'Disconnected data systems preventing unified analytics and insights',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['healthcare', 'financial', 'retail', 'manufacturing'],
        products: ['Data Fabric', 'watsonx.data', 'Integration Suite'],
        personas: {
            primary: ['Chief Data Officer', 'VP Data & Analytics', 'CIO'],
            secondary: ['VP IT', 'Chief Analytics Officer', 'VP Digital'],
            influencers: ['Director Data Engineering', 'Director Enterprise Architecture']
        },
        businessImpact: [
            'Reduce data integration time by 60%',
            'Improve data quality by 40%',
            'Enable real-time analytics',
            'Save $3M+ in integration costs'
        ],
        painPoints: [
            'Data in 20+ disconnected systems',
            'Manual ETL processes taking weeks',
            'Inconsistent data definitions',
            'No single source of truth'
        ]
    },

    supply_chain_visibility: {
        id: 'supply_chain_visibility',
        name: 'Supply Chain Visibility Gaps',
        description: 'Lack of end-to-end supply chain visibility causing delays and disruptions',
        severity: 'High',
        ibmFit: 'Strong',
        industries: ['manufacturing', 'retail', 'automotive', 'food'],
        products: ['Supply Chain Intelligence Suite', 'watsonx.ai', 'Data Fabric'],
        personas: {
            primary: ['VP Supply Chain', 'Chief Supply Chain Officer', 'VP Operations'],
            secondary: ['VP Procurement', 'CIO', 'VP Logistics'],
            influencers: ['Director Supply Chain Planning', 'Director Logistics']
        },
        businessImpact: [
            'Reduce supply chain disruptions by 35%',
            'Improve on-time delivery by 30%',
            'Lower inventory costs by 20%',
            'Save $2.5M+ annually'
        ],
        painPoints: [
            'No real-time visibility into shipments',
            'Unable to predict supply disruptions',
            'Manual tracking across partners',
            'Reactive vs. proactive planning'
        ]
    },

    cybersecurity_threats: {
        id: 'cybersecurity_threats',
        name: 'Cybersecurity Threats',
        description: 'Increasing cyber threats and inability to detect/respond in real-time',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['financial', 'healthcare', 'government', 'energy'],
        products: ['QRadar', 'Guardium', 'Verify', 'Resilient'],
        personas: {
            primary: ['Chief Security Officer', 'VP Cybersecurity', 'Chief Risk Officer'],
            secondary: ['CIO', 'Chief Compliance Officer', 'VP IT'],
            influencers: ['Director Security Operations', 'Director Threat Intelligence']
        },
        businessImpact: [
            'Reduce security incidents by 50%',
            'Detect threats 10x faster',
            'Lower breach costs by $3M+',
            'Improve compliance posture'
        ],
        painPoints: [
            'Unable to detect advanced threats',
            'Manual security monitoring',
            'Siloed security tools',
            'Slow incident response times'
        ]
    },

    cloud_migration: {
        id: 'cloud_migration',
        name: 'Cloud Migration & Modernization',
        description: 'Legacy infrastructure preventing digital transformation and agility',
        severity: 'Medium',
        ibmFit: 'Strong',
        industries: ['financial', 'healthcare', 'government', 'insurance'],
        products: ['OpenShift', 'Hybrid Cloud', 'Cloud Pak', 'Turbonomic'],
        personas: {
            primary: ['CIO', 'VP Infrastructure', 'Chief Technology Officer'],
            secondary: ['VP Cloud', 'VP IT Operations', 'Chief Architect'],
            influencers: ['Director Cloud Engineering', 'Director DevOps']
        },
        businessImpact: [
            'Reduce infrastructure costs by 30%',
            'Improve deployment speed by 10x',
            'Increase scalability and resilience',
            'Save $4M+ in operational costs'
        ],
        painPoints: [
            'Legacy systems blocking innovation',
            'High infrastructure costs',
            'Slow deployment cycles',
            'Vendor lock-in concerns'
        ]
    },

    customer_churn: {
        id: 'customer_churn',
        name: 'Customer Churn Prediction',
        description: 'High customer attrition rates impacting revenue and growth',
        severity: 'High',
        ibmFit: 'Excellent',
        industries: ['telecommunications', 'financial', 'insurance', 'technology'],
        products: ['watsonx.ai', 'Cognos Analytics', 'Customer Experience Suite'],
        personas: {
            primary: ['Chief Customer Officer', 'VP Customer Success', 'Chief Marketing Officer'],
            secondary: ['VP Sales', 'Chief Data Officer', 'VP Analytics'],
            influencers: ['Director Customer Analytics', 'Director Retention']
        },
        businessImpact: [
            'Reduce churn by 30-35%',
            'Increase customer lifetime value by 25%',
            'Improve retention campaign ROI by 40%',
            'Save $6M+ in lost revenue'
        ],
        painPoints: [
            'Unable to predict which customers will churn',
            'Reactive vs. proactive retention',
            'Generic retention campaigns',
            'No early warning system'
        ]
    }
};

/**
 * Get problems by industry with company-specific customization
 */
function getProblemsByIndustry(industry, companyName = '') {
    const problems = Object.values(PROBLEM_SOLUTION_MAP).filter(problem =>
        problem.industries.includes(industry)
    );

    // If company name provided, customize problems for that company
    if (companyName) {
        return problems.map(problem => customizeProblemForCompany(problem, companyName, industry))
            .sort((a, b) => {
                // Sort by calculated opportunity score
                const aScore = calculateOpportunityScore(companyName, industry, a.id);
                const bScore = calculateOpportunityScore(companyName, industry, b.id);
                return bScore - aScore;
            });
    }

    // Default sorting without company context
    return problems.sort((a, b) => {
        const severityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        const fitOrder = { 'Excellent': 3, 'Strong': 2, 'Good': 1 };

        const aScore = severityOrder[a.severity] * 10 + fitOrder[a.ibmFit];
        const bScore = severityOrder[b.severity] * 10 + fitOrder[b.ibmFit];

        return bScore - aScore;
    });
}

/**
 * Customize problem description and context for specific company
 */
function customizeProblemForCompany(problem, companyName, industry) {
    const customized = { ...problem };

    // Add company-specific context to description
    const companyContexts = {
        'inventory_forecasting': [
            `${companyName}'s rapid expansion is straining existing forecasting systems`,
            `Seasonal demand fluctuations at ${companyName} require more sophisticated prediction`,
            `${companyName}'s multi-location operations need unified demand planning`,
            `Growing product variety at ${companyName} complicates inventory optimization`
        ],
        'food_safety_traceability': [
            `${companyName}'s supply chain complexity increases traceability challenges`,
            `Recent industry recalls highlight ${companyName}'s need for faster traceability`,
            `${companyName}'s supplier network requires end-to-end visibility`,
            `Regulatory pressure on ${companyName} to improve food safety tracking`
        ],
        'labor_scheduling': [
            `${companyName}'s variable customer traffic patterns complicate scheduling`,
            `High turnover at ${companyName} locations increases scheduling complexity`,
            `${companyName}'s expansion requires scalable workforce management`,
            `Peak hour staffing challenges at ${companyName} impact customer experience`
        ],
        'customer_analytics_fragmentation': [
            `${companyName}'s omnichannel strategy requires unified customer data`,
            `Disconnected systems at ${companyName} prevent personalization at scale`,
            `${companyName}'s loyalty program data is siloed from transaction data`,
            `${companyName} needs real-time customer insights across touchpoints`
        ],
        'fraud_detection': [
            `${companyName}'s transaction volume requires real-time fraud detection`,
            `Sophisticated fraud patterns targeting ${companyName} need AI detection`,
            `${companyName}'s digital expansion increases fraud exposure`,
            `Cross-channel fraud at ${companyName} requires unified monitoring`
        ],
        'predictive_maintenance': [
            `${companyName}'s equipment downtime directly impacts production targets`,
            `Aging infrastructure at ${companyName} increases maintenance urgency`,
            `${companyName}'s 24/7 operations require predictive maintenance`,
            `Equipment failures at ${companyName} cause costly production delays`
        ],
        'ai_governance': [
            `${companyName}'s AI initiatives require governance framework`,
            `Regulatory scrutiny on ${companyName}'s AI models is increasing`,
            `${companyName} needs explainable AI for customer-facing decisions`,
            `Model risk management gaps at ${companyName} pose compliance risk`
        ],
        'data_silos': [
            `${companyName}'s legacy systems create data integration challenges`,
            `M&A activity at ${companyName} has created disconnected data systems`,
            `${companyName}'s data scattered across 20+ systems limits insights`,
            `Real-time analytics at ${companyName} blocked by data silos`
        ],
        'supply_chain_visibility': [
            `${companyName}'s global supply chain lacks end-to-end visibility`,
            `Recent disruptions highlight ${companyName}'s visibility gaps`,
            `${companyName}'s supplier network complexity requires better tracking`,
            `Just-in-time operations at ${companyName} need supply chain transparency`
        ],
        'cybersecurity_threats': [
            `${companyName}'s digital transformation increases attack surface`,
            `Industry-specific threats targeting ${companyName} are evolving`,
            `${companyName}'s customer data requires enhanced protection`,
            `Ransomware threats to ${companyName}'s operations are increasing`
        ],
        'cloud_migration': [
            `${companyName}'s legacy infrastructure limits innovation speed`,
            `${companyName}'s data center costs are unsustainable`,
            `Hybrid cloud strategy at ${companyName} needs modernization`,
            `${companyName}'s applications require cloud-native architecture`
        ],
        'customer_churn': [
            `${companyName}'s competitive market increases churn risk`,
            `Customer acquisition costs at ${companyName} make retention critical`,
            `${companyName} lacks early warning system for at-risk customers`,
            `Personalized retention at ${companyName} requires predictive analytics`
        ]
    };

    // Select a company-specific context based on hash
    if (companyContexts[problem.id]) {
        const contexts = companyContexts[problem.id];
        const hash = getCompanyVariation(companyName, problem.id);
        const selectedContext = contexts[hash % contexts.length];

        // Update description with company-specific context
        customized.companyContext = selectedContext;
        customized.description = `${problem.description}. ${selectedContext}.`;
    }

    return customized;
}

/**
 * Get problem by ID
 */
function getProblemById(problemId) {
    return PROBLEM_SOLUTION_MAP[problemId] || null;
}

/**
 * Get recommended personas for a problem
 */
function getPersonasForProblem(problemId) {
    const problem = getProblemById(problemId);
    return problem ? problem.personas : null;
}

/**
 * Get IBM products for a problem
 */
function getProductsForProblem(problemId) {
    const problem = getProblemById(problemId);
    return problem ? problem.products : [];
}

/**
 * Calculate opportunity score with company-specific variations
 */
function calculateOpportunityScore(companyName, industry, problemId) {
    const problem = getProblemById(problemId);
    if (!problem) return 0;

    let score = 40; // Lower base score for more variation

    // Add points for severity (15-25 points)
    if (problem.severity === 'High') score += 25;
    else if (problem.severity === 'Medium') score += 15;
    else score += 8;

    // Add points for IBM fit (15-25 points)
    if (problem.ibmFit === 'Excellent') score += 25;
    else if (problem.ibmFit === 'Strong') score += 18;
    else score += 10;

    // Add points for industry match (5-15 points)
    if (problem.industries.includes(industry)) {
        score += 15;
    } else {
        score += 5; // Partial credit for adjacent industries
    }

    // Add company-specific variation (0-15 points based on company name hash)
    const companyVariation = getCompanyVariation(companyName, problemId);
    score += companyVariation;

    // Add some randomness for realism (±3 points)
    const randomFactor = Math.floor(Math.random() * 7) - 3;
    score += randomFactor;

    return Math.max(45, Math.min(score, 98)); // Keep between 45-98
}

/**
 * Generate consistent company-specific variation based on company name
 */
function getCompanyVariation(companyName, problemId) {
    // Create a simple hash from company name and problem ID
    const str = (companyName + problemId).toLowerCase();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert hash to 0-15 range
    return Math.abs(hash % 16);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PROBLEM_SOLUTION_MAP,
        getProblemsByIndustry,
        getProblemById,
        getPersonasForProblem,
        getProductsForProblem,
        calculateOpportunityScore
    };
}

// Make available globally
window.ProblemSolutionMap = {
    PROBLEM_SOLUTION_MAP,
    getProblemsByIndustry,
    getProblemById,
    getPersonasForProblem,
    getProductsForProblem,
    calculateOpportunityScore
};

// Made with Bob
