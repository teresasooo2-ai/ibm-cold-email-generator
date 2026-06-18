/**
 * Personalization Engine
 * Handles dynamic variables and CRM-ready formatting
 */

class PersonalizationEngine {
    constructor() {
        this.variables = {
            first_name: '{{first_name}}',
            last_name: '{{last_name}}',
            title: '{{title}}',
            company: '{{company}}',
            industry: '{{industry}}',
            state: '{{state}}',
            problem: '{{problem}}',
            ibm_product: '{{ibm_product}}'
        };
    }

    /**
     * Apply personalization variables to content
     */
    applyVariables(content, data = {}) {
        let result = content;

        // Replace each variable with actual data or keep placeholder
        Object.keys(this.variables).forEach(key => {
            const placeholder = this.variables[key];
            const value = data[key] || placeholder;
            const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
            result = result.replace(regex, value);
        });

        return result;
    }

    /**
     * Get variable reference guide
     */
    getVariableGuide() {
        return {
            '{{first_name}}': 'Contact first name',
            '{{last_name}}': 'Contact last name',
            '{{title}}': 'Contact job title',
            '{{company}}': 'Company name',
            '{{industry}}': 'Industry sector',
            '{{state}}': 'State/region',
            '{{problem}}': 'Business problem being addressed',
            '{{ibm_product}}': 'IBM product/solution'
        };
    }

    /**
     * Format content for CRM platforms
     */
    formatForCRM(content, platform = 'generic') {
        const formats = {
            outreach: this.formatForOutreach(content),
            salesloft: this.formatForSalesloft(content),
            apollo: this.formatForApollo(content),
            hubspot: this.formatForHubSpot(content),
            salesforce: this.formatForSalesforce(content),
            generic: content
        };

        return formats[platform.toLowerCase()] || content;
    }

    formatForOutreach(content) {
        // Outreach uses {{variable}} format - already compatible
        return content;
    }

    formatForSalesloft(content) {
        // Salesloft uses {{variable}} format - already compatible
        return content;
    }

    formatForApollo(content) {
        // Apollo uses {{variable}} format - already compatible
        return content;
    }

    formatForHubSpot(content) {
        // HubSpot uses {{ contact.property }} format
        return content
            .replace(/\{\{first_name\}\}/g, '{{ contact.firstname }}')
            .replace(/\{\{last_name\}\}/g, '{{ contact.lastname }}')
            .replace(/\{\{title\}\}/g, '{{ contact.jobtitle }}')
            .replace(/\{\{company\}\}/g, '{{ company.name }}')
            .replace(/\{\{industry\}\}/g, '{{ company.industry }}')
            .replace(/\{\{state\}\}/g, '{{ company.state }}');
    }

    formatForSalesforce(content) {
        // Salesforce uses {!Contact.Field} format
        return content
            .replace(/\{\{first_name\}\}/g, '{!Contact.FirstName}')
            .replace(/\{\{last_name\}\}/g, '{!Contact.LastName}')
            .replace(/\{\{title\}\}/g, '{!Contact.Title}')
            .replace(/\{\{company\}\}/g, '{!Account.Name}')
            .replace(/\{\{industry\}\}/g, '{!Account.Industry}')
            .replace(/\{\{state\}\}/g, '{!Account.BillingState}');
    }

    /**
     * Export cadence for specific CRM
     */
    exportForCRM(cadence, platform, format = 'csv') {
        const formattedCadence = cadence.map(touch => ({
            ...touch,
            content: this.formatForCRM(touch.content, platform)
        }));

        if (format === 'csv') {
            return this.generateCSV(formattedCadence, platform);
        } else if (format === 'json') {
            return JSON.stringify(formattedCadence, null, 2);
        }

        return formattedCadence;
    }

    generateCSV(cadence, platform) {
        const headers = ['Day', 'Touch Type', 'Subject', 'Content', 'Platform'];
        const rows = cadence.map(touch => [
            touch.day,
            touch.type,
            touch.subject || '',
            `"${touch.content.replace(/"/g, '""')}"`,
            platform
        ]);

        return [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
    }
}

/**
 * Communication Style Engine
 * Adapts messaging tone based on selected style
 */

class CommunicationStyleEngine {
    constructor() {
        this.styles = {
            executive: {
                name: 'Executive',
                description: 'Direct, strategic, focused on business outcomes',
                tone: 'formal',
                characteristics: ['concise', 'strategic', 'outcome-focused']
            },
            professional: {
                name: 'Professional',
                description: 'Balanced, respectful, industry-standard',
                tone: 'neutral',
                characteristics: ['balanced', 'respectful', 'clear']
            },
            consultative: {
                name: 'Consultative',
                description: 'Advisory, insight-driven, collaborative',
                tone: 'helpful',
                characteristics: ['advisory', 'insightful', 'collaborative']
            },
            casual: {
                name: 'Casual',
                description: 'Friendly, approachable, conversational',
                tone: 'informal',
                characteristics: ['friendly', 'approachable', 'conversational']
            },
            challenger: {
                name: 'Challenger',
                description: 'Provocative, challenges assumptions, thought-provoking',
                tone: 'bold',
                characteristics: ['provocative', 'challenging', 'contrarian']
            },
            aggressive: {
                name: 'Aggressive',
                description: 'Urgent, direct, action-oriented',
                tone: 'assertive',
                characteristics: ['urgent', 'direct', 'action-oriented']
            },
            analytical: {
                name: 'Analytical',
                description: 'Data-driven, logical, evidence-based',
                tone: 'technical',
                characteristics: ['data-driven', 'logical', 'precise']
            },
            relationship: {
                name: 'Relationship-Based',
                description: 'Warm, personal, connection-focused',
                tone: 'warm',
                characteristics: ['personal', 'warm', 'connection-focused']
            }
        };
    }

    getStyle(styleKey) {
        return this.styles[styleKey] || this.styles.professional;
    }

    getAllStyles() {
        return Object.keys(this.styles).map(key => ({
            key,
            ...this.styles[key]
        }));
    }

    /**
     * Adapt content to specific communication style
     */
    adaptContent(content, styleKey, context = {}) {
        const style = this.getStyle(styleKey);

        // Apply style-specific transformations
        switch (styleKey) {
            case 'executive':
                return this.applyExecutiveStyle(content, context);
            case 'professional':
                return this.applyProfessionalStyle(content, context);
            case 'consultative':
                return this.applyConsultativeStyle(content, context);
            case 'casual':
                return this.applyCasualStyle(content, context);
            case 'challenger':
                return this.applyChallengerStyle(content, context);
            case 'aggressive':
                return this.applyAggressiveStyle(content, context);
            case 'analytical':
                return this.applyAnalyticalStyle(content, context);
            case 'relationship':
                return this.applyRelationshipStyle(content, context);
            default:
                return content;
        }
    }

    applyExecutiveStyle(content, context) {
        // Remove filler words, make more direct
        return content
            .replace(/I wanted to reach out/gi, 'Reaching out')
            .replace(/I thought I'd/gi, 'I\'m')
            .replace(/just wanted to/gi, 'wanted to')
            .replace(/I was wondering if/gi, 'Are you');
    }

    applyProfessionalStyle(content, context) {
        // Standard professional tone - minimal changes
        return content;
    }

    applyConsultativeStyle(content, context) {
        // Add advisory language
        return content
            .replace(/We offer/gi, 'We help organizations')
            .replace(/Our solution/gi, 'Our approach');
    }

    applyCasualStyle(content, context) {
        // Make more conversational
        return content
            .replace(/I am reaching out/gi, 'Reaching out')
            .replace(/I wanted to/gi, 'Wanted to')
            .replace(/Would you be interested/gi, 'Interested');
    }

    applyChallengerStyle(content, context) {
        // Add challenging perspective
        const challengerIntros = [
            'Most companies believe',
            'The conventional wisdom suggests',
            'Many organizations assume'
        ];
        return content;
    }

    applyAggressiveStyle(content, context) {
        // Add urgency and directness
        return content
            .replace(/might be/gi, 'is')
            .replace(/could be/gi, 'is')
            .replace(/perhaps/gi, '');
    }

    applyAnalyticalStyle(content, context) {
        // Add data-driven language
        return content;
    }

    applyRelationshipStyle(content, context) {
        // Add personal warmth
        return content
            .replace(/Hi {{first_name}}/gi, 'Hi {{first_name}}, hope you\'re doing well');
    }
}

/**
 * Company Culture Intelligence
 * Suggests communication style based on company culture
 */

class CompanyCultureIntelligence {
    constructor() {
        this.cultureDatabase = {
            // Financial Services
            'jpmorgan': 'executive',
            'goldman sachs': 'executive',
            'morgan stanley': 'executive',
            'bank of america': 'professional',
            'wells fargo': 'professional',
            'citigroup': 'executive',

            // Technology
            'ibm': 'professional',
            'microsoft': 'professional',
            'google': 'casual',
            'apple': 'executive',
            'amazon': 'aggressive',
            'meta': 'casual',
            'nvidia': 'analytical',
            'tesla': 'aggressive',
            'spacex': 'aggressive',

            // Consulting
            'mckinsey': 'executive',
            'bcg': 'executive',
            'bain': 'executive',
            'deloitte': 'professional',
            'pwc': 'professional',
            'ey': 'professional',
            'kpmg': 'professional',
            'accenture': 'consultative',

            // Retail
            'walmart': 'professional',
            'target': 'professional',
            'costco': 'professional',
            'amazon': 'aggressive',

            // Healthcare
            'mayo clinic': 'professional',
            'cleveland clinic': 'professional',
            'kaiser': 'professional',

            // Energy
            'exxon': 'executive',
            'chevron': 'executive',
            'shell': 'professional',

            // Manufacturing
            'ge': 'professional',
            'boeing': 'professional',
            'lockheed martin': 'professional',

            // Startups (general pattern)
            'startup': 'casual'
        };
    }

    suggestStyle(companyName) {
        const lowerName = companyName.toLowerCase();

        // Check exact matches
        for (const [company, style] of Object.entries(this.cultureDatabase)) {
            if (lowerName.includes(company)) {
                return {
                    style,
                    confidence: 'high',
                    reason: `${companyName} typically prefers ${style} communication`
                };
            }
        }

        // Check industry patterns
        if (lowerName.includes('bank') || lowerName.includes('financial')) {
            return {
                style: 'executive',
                confidence: 'medium',
                reason: 'Financial services companies typically prefer executive communication'
            };
        }

        if (lowerName.includes('tech') || lowerName.includes('software')) {
            return {
                style: 'casual',
                confidence: 'medium',
                reason: 'Technology companies often prefer casual communication'
            };
        }

        // Default
        return {
            style: 'professional',
            confidence: 'low',
            reason: 'Professional style is a safe default'
        };
    }

    addCompany(companyName, style) {
        this.cultureDatabase[companyName.toLowerCase()] = style;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.PersonalizationEngine = PersonalizationEngine;
    window.CommunicationStyleEngine = CommunicationStyleEngine;
    window.CompanyCultureIntelligence = CompanyCultureIntelligence;
}

// Made with Bob
