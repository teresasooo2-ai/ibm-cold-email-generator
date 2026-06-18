/**
 * IBM Sales Cadence Engine - Persona Intelligence & Buying Committee
 * Maps personas to problems, provides messaging guidance, and identifies buying committees
 */

const PERSONA_DATABASE = {
    // C-Suite Executives
    'CEO': {
        title: 'Chief Executive Officer',
        level: 'C-Suite',
        concerns: ['Revenue growth', 'Market position', 'Shareholder value', 'Strategic transformation'],
        decisionRole: 'Final approver',
        messagingTone: 'Strategic, high-level, business outcomes',
        typicalProblems: ['cloud_migration', 'ai_governance', 'customer_churn'],
        valueDrivers: ['Revenue impact', 'Competitive advantage', 'Market leadership', 'Risk mitigation']
    },

    'CFO': {
        title: 'Chief Financial Officer',
        level: 'C-Suite',
        concerns: ['Cost reduction', 'ROI', 'Budget optimization', 'Financial risk'],
        decisionRole: 'Budget approver',
        messagingTone: 'ROI-focused, cost-benefit analysis, financial metrics',
        typicalProblems: ['cloud_migration', 'predictive_maintenance', 'supply_chain_visibility'],
        valueDrivers: ['Cost savings', 'ROI', 'Operational efficiency', 'Risk reduction']
    },

    'CIO': {
        title: 'Chief Information Officer',
        level: 'C-Suite',
        concerns: ['Technology modernization', 'System reliability', 'Security', 'Innovation'],
        decisionRole: 'Technical approver',
        messagingTone: 'Technical, architecture-focused, integration capabilities',
        typicalProblems: ['data_silos', 'cloud_migration', 'cybersecurity_threats', 'ai_governance'],
        valueDrivers: ['Technical excellence', 'Scalability', 'Security', 'Integration']
    },

    'CTO': {
        title: 'Chief Technology Officer',
        level: 'C-Suite',
        concerns: ['Innovation', 'Product development', 'Technical strategy', 'R&D'],
        decisionRole: 'Technical strategy',
        messagingTone: 'Innovation-focused, cutting-edge technology, competitive advantage',
        typicalProblems: ['ai_governance', 'data_silos', 'cloud_migration'],
        valueDrivers: ['Innovation', 'Time to market', 'Technical capabilities', 'Competitive edge']
    },

    'CDO': {
        title: 'Chief Data Officer',
        level: 'C-Suite',
        concerns: ['Data governance', 'Data quality', 'Analytics', 'AI/ML initiatives'],
        decisionRole: 'Data strategy owner',
        messagingTone: 'Data-centric, governance-focused, analytics capabilities',
        typicalProblems: ['data_silos', 'ai_governance', 'customer_analytics_fragmentation'],
        valueDrivers: ['Data quality', 'Governance', 'Analytics capabilities', 'AI readiness']
    },

    'COO': {
        title: 'Chief Operations Officer',
        level: 'C-Suite',
        concerns: ['Operational efficiency', 'Process optimization', 'Quality', 'Productivity'],
        decisionRole: 'Operations approver',
        messagingTone: 'Operational efficiency, process improvement, productivity gains',
        typicalProblems: ['inventory_forecasting', 'labor_scheduling', 'predictive_maintenance', 'supply_chain_visibility'],
        valueDrivers: ['Efficiency', 'Cost reduction', 'Quality improvement', 'Productivity']
    },

    'CMO': {
        title: 'Chief Marketing Officer',
        level: 'C-Suite',
        concerns: ['Customer acquisition', 'Brand value', 'Marketing ROI', 'Customer insights'],
        decisionRole: 'Marketing strategy',
        messagingTone: 'Customer-centric, personalization, marketing effectiveness',
        typicalProblems: ['customer_analytics_fragmentation', 'customer_churn'],
        valueDrivers: ['Customer engagement', 'Marketing ROI', 'Personalization', 'Brand value']
    },

    'CISO': {
        title: 'Chief Information Security Officer',
        level: 'C-Suite',
        concerns: ['Cybersecurity', 'Compliance', 'Risk management', 'Data protection'],
        decisionRole: 'Security approver',
        messagingTone: 'Security-focused, compliance-driven, risk mitigation',
        typicalProblems: ['cybersecurity_threats', 'ai_governance', 'fraud_detection'],
        valueDrivers: ['Security posture', 'Compliance', 'Risk reduction', 'Threat prevention']
    },

    // VP Level
    'VP Supply Chain': {
        title: 'VP Supply Chain',
        level: 'VP',
        concerns: ['Supply chain efficiency', 'Inventory optimization', 'Supplier management', 'Logistics'],
        decisionRole: 'Functional decision maker',
        messagingTone: 'Operational, supply chain metrics, efficiency gains',
        typicalProblems: ['inventory_forecasting', 'supply_chain_visibility', 'food_safety_traceability'],
        valueDrivers: ['Cost reduction', 'Efficiency', 'Visibility', 'Risk mitigation']
    },

    'VP Operations': {
        title: 'VP Operations',
        level: 'VP',
        concerns: ['Operational excellence', 'Process efficiency', 'Quality control', 'Cost management'],
        decisionRole: 'Functional decision maker',
        messagingTone: 'Operational metrics, efficiency, quality improvement',
        typicalProblems: ['labor_scheduling', 'predictive_maintenance', 'food_safety_traceability'],
        valueDrivers: ['Efficiency', 'Quality', 'Cost reduction', 'Productivity']
    },

    'VP Data & Analytics': {
        title: 'VP Data & Analytics',
        level: 'VP',
        concerns: ['Data strategy', 'Analytics capabilities', 'Data quality', 'Insights generation'],
        decisionRole: 'Functional decision maker',
        messagingTone: 'Data-driven, analytics capabilities, insights generation',
        typicalProblems: ['data_silos', 'customer_analytics_fragmentation', 'ai_governance'],
        valueDrivers: ['Data quality', 'Analytics speed', 'Insights accuracy', 'Data democratization']
    },

    'VP Customer Experience': {
        title: 'VP Customer Experience',
        level: 'VP',
        concerns: ['Customer satisfaction', 'Experience optimization', 'Retention', 'Personalization'],
        decisionRole: 'Functional decision maker',
        messagingTone: 'Customer-centric, experience metrics, personalization',
        typicalProblems: ['customer_analytics_fragmentation', 'customer_churn'],
        valueDrivers: ['Customer satisfaction', 'Retention', 'Personalization', 'Engagement']
    },

    'VP IT': {
        title: 'VP Information Technology',
        level: 'VP',
        concerns: ['IT operations', 'System reliability', 'Infrastructure', 'Support'],
        decisionRole: 'Technical decision maker',
        messagingTone: 'Technical operations, reliability, infrastructure',
        typicalProblems: ['cloud_migration', 'cybersecurity_threats', 'data_silos'],
        valueDrivers: ['Reliability', 'Performance', 'Cost efficiency', 'Scalability']
    },

    // Director Level
    'Director Demand Planning': {
        title: 'Director Demand Planning',
        level: 'Director',
        concerns: ['Forecast accuracy', 'Demand sensing', 'Planning processes', 'Inventory optimization'],
        decisionRole: 'Functional expert',
        messagingTone: 'Forecasting metrics, accuracy improvement, planning efficiency',
        typicalProblems: ['inventory_forecasting'],
        valueDrivers: ['Forecast accuracy', 'Planning efficiency', 'Inventory optimization', 'Cost reduction']
    },

    'Director Data Science': {
        title: 'Director Data Science',
        level: 'Director',
        concerns: ['ML models', 'AI capabilities', 'Model performance', 'Innovation'],
        decisionRole: 'Technical influencer',
        messagingTone: 'Technical, ML/AI capabilities, model performance',
        typicalProblems: ['ai_governance', 'customer_churn', 'fraud_detection'],
        valueDrivers: ['Model accuracy', 'Innovation', 'Technical capabilities', 'Speed to deployment']
    },

    'Director Supply Chain Technology': {
        title: 'Director Supply Chain Technology',
        level: 'Director',
        concerns: ['Supply chain systems', 'Technology integration', 'Automation', 'Visibility'],
        decisionRole: 'Technical influencer',
        messagingTone: 'Supply chain technology, integration, automation',
        typicalProblems: ['supply_chain_visibility', 'inventory_forecasting', 'food_safety_traceability'],
        valueDrivers: ['Integration', 'Automation', 'Visibility', 'Efficiency']
    },

    'Director Quality Assurance': {
        title: 'Director Quality Assurance',
        level: 'Director',
        concerns: ['Quality standards', 'Compliance', 'Testing', 'Process improvement'],
        decisionRole: 'Functional expert',
        messagingTone: 'Quality metrics, compliance, process improvement',
        typicalProblems: ['food_safety_traceability', 'predictive_maintenance'],
        valueDrivers: ['Quality improvement', 'Compliance', 'Risk reduction', 'Process efficiency']
    }
};

/**
 * Buying Committee Builder
 */
class BuyingCommittee {
    constructor() {
        this.personas = PERSONA_DATABASE;
    }

    /**
     * Build buying committee for a specific problem
     */
    buildCommittee(problemId, industry) {
        const problem = window.ProblemSolutionMap?.getProblemById(problemId);
        if (!problem) return null;

        const committee = {
            primary: this.getPersonaDetails(problem.personas.primary),
            secondary: this.getPersonaDetails(problem.personas.secondary),
            influencers: this.getPersonaDetails(problem.personas.influencers)
        };

        return committee;
    }

    /**
     * Get detailed persona information
     */
    getPersonaDetails(personaList) {
        return personaList.map(personaTitle => {
            const persona = this.personas[personaTitle];
            if (!persona) {
                return {
                    title: personaTitle,
                    level: 'Unknown',
                    concerns: [],
                    decisionRole: 'Unknown',
                    messagingTone: 'Professional, business-focused',
                    valueDrivers: []
                };
            }
            return {
                title: personaTitle,
                ...persona
            };
        });
    }

    /**
     * Get persona by title
     */
    getPersona(title) {
        return this.personas[title] || null;
    }

    /**
     * Get recommended outreach order
     */
    getOutreachOrder(committee) {
        // Start with primary, then influencers, then secondary
        const order = [];

        if (committee.primary && committee.primary.length > 0) {
            order.push({
                priority: 1,
                personas: committee.primary,
                reason: 'Primary decision makers - own the problem and budget'
            });
        }

        if (committee.influencers && committee.influencers.length > 0) {
            order.push({
                priority: 2,
                personas: committee.influencers,
                reason: 'Technical influencers - provide input and recommendations'
            });
        }

        if (committee.secondary && committee.secondary.length > 0) {
            order.push({
                priority: 3,
                personas: committee.secondary,
                reason: 'Secondary stakeholders - provide approval or support'
            });
        }

        return order;
    }

    /**
     * Generate persona-specific messaging guidance
     */
    getMessagingGuidance(personaTitle, problemId) {
        const persona = this.getPersona(personaTitle);
        if (!persona) return null;

        const problem = window.ProblemSolutionMap?.getProblemById(problemId);
        if (!problem) return null;

        return {
            persona: personaTitle,
            tone: persona.messagingTone,
            keyMessages: this.generateKeyMessages(persona, problem),
            valueProposition: this.generateValueProposition(persona, problem),
            callToAction: this.generateCallToAction(persona),
            doNotMention: this.getDoNotMention(persona)
        };
    }

    /**
     * Generate key messages for persona
     */
    generateKeyMessages(persona, problem) {
        const messages = [];

        // Match persona concerns with problem impact
        persona.concerns.forEach(concern => {
            const relevantImpact = problem.businessImpact.find(impact =>
                impact.toLowerCase().includes(concern.toLowerCase().split(' ')[0])
            );
            if (relevantImpact) {
                messages.push(`Address ${concern.toLowerCase()}: ${relevantImpact}`);
            }
        });

        // Add value driver messages
        persona.valueDrivers.forEach(driver => {
            const relevantImpact = problem.businessImpact.find(impact =>
                impact.toLowerCase().includes(driver.toLowerCase().split(' ')[0])
            );
            if (relevantImpact) {
                messages.push(`Deliver ${driver.toLowerCase()}: ${relevantImpact}`);
            }
        });

        return messages.slice(0, 3); // Top 3 messages
    }

    /**
     * Generate value proposition for persona
     */
    generateValueProposition(persona, problem) {
        const primaryDriver = persona.valueDrivers[0];
        const primaryImpact = problem.businessImpact[0];

        return `Help ${persona.title} achieve ${primaryDriver.toLowerCase()} through ${problem.name.toLowerCase()}, delivering ${primaryImpact.toLowerCase()}`;
    }

    /**
     * Generate call to action for persona
     */
    generateCallToAction(persona) {
        const ctas = {
            'C-Suite': 'Schedule a 30-minute executive briefing',
            'VP': 'Book a 20-minute discovery call',
            'Director': 'Set up a 15-minute technical discussion'
        };
        return ctas[persona.level] || 'Schedule a brief conversation';
    }

    /**
     * Get what not to mention for persona
     */
    getDoNotMention(persona) {
        const doNotMention = {
            'C-Suite': ['Technical jargon', 'Implementation details', 'Low-level features'],
            'VP': ['Overly technical details', 'Pricing before value'],
            'Director': ['High-level strategy without specifics', 'Vague promises']
        };
        return doNotMention[persona.level] || [];
    }

    /**
     * Get champion identification criteria
     */
    getChampionCriteria() {
        return {
            characteristics: [
                'Has budget authority or influence',
                'Owns the problem area',
                'Responsive to outreach',
                'Willing to introduce you to others',
                'Sees urgency in solving the problem'
            ],
            idealPersonas: ['VP Supply Chain', 'VP Operations', 'CDO', 'VP Data & Analytics'],
            redFlags: [
                'No decision-making authority',
                'Not responsive after 3 touches',
                'Cannot articulate the problem',
                'No access to budget or decision makers'
            ]
        };
    }
}

/**
 * Persona Messaging Templates
 */
class PersonaMessaging {
    constructor() {
        this.buyingCommittee = new BuyingCommittee();
    }

    /**
     * Generate persona-specific email
     */
    generatePersonaEmail(personaTitle, problemId, companyName, industry) {
        const persona = this.buyingCommittee.getPersona(personaTitle);
        const problem = window.ProblemSolutionMap?.getProblemById(problemId);

        if (!persona || !problem) return null;

        const guidance = this.buyingCommittee.getMessagingGuidance(personaTitle, problemId);

        const greeting = `Hi ${personaTitle.split(' ')[personaTitle.split(' ').length - 1]},`;

        let subject = '';
        let body = '';

        // Customize based on persona level
        if (persona.level === 'C-Suite') {
            subject = `${problem.businessImpact[0]} at ${companyName}`;
            body = `${greeting}

${companyName} is ${this.getIndustryContext(industry)}.

Many ${industry} leaders are prioritizing ${problem.name.toLowerCase()} to ${problem.businessImpact[0].toLowerCase()}.

Worth a brief executive conversation?

Best,
[Your Name]
IBM`;
        } else if (persona.level === 'VP') {
            subject = `${problem.name} - ${companyName}`;
            body = `${greeting}

I work with ${industry} organizations on ${problem.name.toLowerCase()}.

Specifically helping teams ${problem.businessImpact[0].toLowerCase()} and ${problem.businessImpact[1].toLowerCase()}.

Are you the right person at ${companyName} to discuss this?

Best,
[Your Name]
IBM`;
        } else {
            subject = `${problem.name} solution for ${industry}`;
            body = `${greeting}

We're helping ${industry} teams solve ${problem.name.toLowerCase()} using ${problem.products[0]}.

Results include:
• ${problem.businessImpact[0]}
• ${problem.businessImpact[1]}

Worth a quick technical discussion?

Best,
[Your Name]
IBM`;
        }

        return {
            persona: personaTitle,
            subject,
            body,
            tone: persona.messagingTone,
            guidance: guidance
        };
    }

    /**
     * Get industry context
     */
    getIndustryContext(industry) {
        const contexts = {
            'food': 'scaling digital operations',
            'retail': 'investing in omnichannel',
            'financial': 'modernizing core systems',
            'healthcare': 'improving patient outcomes',
            'manufacturing': 'adopting Industry 4.0',
            'telecommunications': 'rolling out 5G',
            'energy': 'transitioning to renewables',
            'transportation': 'optimizing logistics',
            'government': 'modernizing services',
            'insurance': 'automating claims',
            'media': 'personalizing content',
            'education': 'improving outcomes',
            'hospitality': 'enhancing experience',
            'pharma': 'accelerating R&D',
            'automotive': 'transitioning to EVs',
            'realestate': 'implementing smart buildings',
            'technology': 'reducing churn'
        };
        return contexts[industry] || 'investing in digital transformation';
    }
}

// Create global instances
const buyingCommittee = new BuyingCommittee();
const personaMessaging = new PersonaMessaging();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PERSONA_DATABASE,
        BuyingCommittee,
        PersonaMessaging,
        buyingCommittee,
        personaMessaging
    };
}

// Make available globally
window.PersonaIntelligence = {
    PERSONA_DATABASE,
    BuyingCommittee,
    PersonaMessaging,
    buyingCommittee,
    personaMessaging
};

// Made with Bob
