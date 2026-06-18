/**
 * IBM Cold Email Generator - Email Template Engine
 * Generates concise, personalized cold emails for IBM Data & AI solutions
 */

class EmailGenerator {
    constructor() {
        this.templates = {
            subjects: {
                ai: [
                    "AI for {industry} - {companyName}",
                    "Solving {painPointShort} with Watson AI",
                    "{industry} AI transformation",
                    "Watson AI for {companyName}"
                ],
                data_fabric: [
                    "Unified data for {companyName}",
                    "Data Fabric for {industry}",
                    "Breaking data silos at {companyName}",
                    "{industry} data integration"
                ],
                database: [
                    "Modern database for {industry}",
                    "Database modernization - {companyName}",
                    "High-performance data for {industry}",
                    "Db2 for {companyName}"
                ],
                bi_analytics: [
                    "Real-time insights for {industry}",
                    "BI & Analytics for {companyName}",
                    "{industry} analytics transformation",
                    "Cognos Analytics for {companyName}"
                ],
                ai_data: [
                    "AI + Data for {companyName}",
                    "{industry} data & AI platform",
                    "Complete data & AI stack",
                    "Transform {companyName} with IBM"
                ],
                all: [
                    "Complete Data & AI for {industry}",
                    "IBM Data & AI Platform - {companyName}",
                    "End-to-end data & AI solutions",
                    "{industry} digital transformation"
                ]
            }
        };
    }

    /**
     * Generate a complete email based on input parameters
     */
    generateEmail(params) {
        const {
            companyName,
            industry,
            contactName,
            solutionFocus
        } = params;

        // Get industry data
        const industryData = getIndustryData(industry);
        if (!industryData) {
            throw new Error('Invalid industry selected');
        }

        // Select random pain point, trend, and recent change
        const painPoint = getRandomItem(industryData.painPoints);
        const metric = getRandomItem(industryData.metrics);
        const industryTrend = getRandomItem(industryData.industryTrends);
        const recentChange = getRandomItem(industryData.recentChanges);

        // Get solution-specific data based on focus
        const solutions = this.getSolutionData(solutionFocus, industryData);

        // Create variables object
        const variables = {
            companyName,
            industry: industryData.name,
            contactName: contactName || 'there',
            painPoint,
            painPointShort: this.shortenPainPoint(painPoint),
            industryTrend,
            recentChange,
            ...solutions,
            metric
        };

        // Generate subject line
        const subject = this.generateSubject(solutionFocus, variables);

        // Generate email body (shorter format with context)
        const body = this.generateShortBody(solutionFocus, variables);

        return {
            subject,
            body,
            wordCount: this.countWords(body),
            charCount: body.length,
            readTime: Math.ceil(this.countWords(body) / 200)
        };
    }

    /**
     * Get solution data based on focus
     */
    getSolutionData(focus, industryData) {
        const solutions = industryData.ibmSolutions;

        // Generate specific topic based on solution focus (no product names)
        let specificTopic = '';
        switch (focus) {
            case 'ai':
                specificTopic = 'AI evaluation, observability, and governance';
                break;
            case 'data_fabric':
                specificTopic = 'data lineage and visibility into data flows';
                break;
            case 'database':
                specificTopic = 'real-time transaction processing and database performance';
                break;
            case 'bi_analytics':
                specificTopic = 'data dashboards and finding root causes of broken analytics';
                break;
            case 'ai_data':
                specificTopic = 'data and AI transformation';
                break;
            case 'all':
                specificTopic = 'your complete data and AI strategy';
                break;
            default:
                specificTopic = 'your technology initiatives';
        }

        switch (focus) {
            case 'ai':
                return {
                    solution: solutions.ai.name,
                    benefit: solutions.ai.benefit,
                    specificTopic
                };
            case 'data_fabric':
                return {
                    solution: solutions.data_fabric.name,
                    benefit: solutions.data_fabric.benefit,
                    specificTopic
                };
            case 'database':
                return {
                    solution: solutions.database.name,
                    benefit: solutions.database.benefit,
                    specificTopic
                };
            case 'bi_analytics':
                return {
                    solution: solutions.bi_analytics.name,
                    benefit: solutions.bi_analytics.benefit,
                    specificTopic
                };
            case 'ai_data':
                return {
                    solution1: solutions.ai.name,
                    benefit1: solutions.ai.benefit,
                    solution2: solutions.data_fabric.name,
                    benefit2: solutions.data_fabric.benefit,
                    specificTopic
                };
            case 'all':
                return {
                    solution1: solutions.ai.name,
                    solution2: solutions.data_fabric.name,
                    solution3: solutions.database.name,
                    solution4: solutions.bi_analytics.name,
                    benefit: "complete data & AI capabilities",
                    specificTopic
                };
            default:
                return {
                    solution: solutions.ai.name,
                    benefit: solutions.ai.benefit,
                    specificTopic
                };
        }
    }

    /**
     * Generate subject line
     */
    generateSubject(solutionFocus, variables) {
        const template = getRandomItem(this.templates.subjects[solutionFocus] || this.templates.subjects.ai_data);
        return this.replaceVariables(template, variables);
    }

    /**
     * Generate short email body - problem-focused, no product mentions
     */
    generateShortBody(solutionFocus, variables) {
        const greeting = `Hi ${variables.contactName},`;

        // Problem-focused email without product mentions
        const body = `${greeting}

I noticed ${variables.companyName} is ${variables.industryTrend}. Many ${variables.industry} companies struggle with ${variables.painPointShort}.

I'm looking for the right person to discuss ${variables.specificTopic}. Are you the right person for this conversation?

Best,
[Your Name]
IBM`;

        return body;
    }

    /**
     * Replace template variables with actual values
     */
    replaceVariables(template, variables) {
        let result = template;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{${key}}`, 'g');
            result = result.replace(regex, value);
        }
        return result;
    }

    /**
     * Shorten pain point for subject line and body
     */
    shortenPainPoint(painPoint) {
        // Extract key phrase
        const shortPhrases = [
            'data silos', 'legacy systems', 'compliance', 'security threats',
            'integration challenges', 'downtime', 'fraud detection', 'customer churn',
            'inventory management', 'supply chain', 'network optimization', 'data fragmentation',
            'slow processes', 'cost overruns', 'quality issues', 'visibility gaps',
            'outdated models', 'manual processes', 'scalability issues', 'performance problems'
        ];

        const lowerPainPoint = painPoint.toLowerCase();
        for (const phrase of shortPhrases) {
            if (lowerPainPoint.includes(phrase)) {
                return phrase;
            }
        }

        // Default: take first 4-5 words
        const words = painPoint.split(' ');
        return words.slice(0, Math.min(5, words.length)).join(' ').toLowerCase();
    }

    /**
     * Count words in text
     */
    countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    /**
     * Generate multiple email variations
     */
    generateVariations(params, count = 3) {
        const variations = [];
        for (let i = 0; i < count; i++) {
            variations.push(this.generateEmail(params));
        }
        return variations;
    }
}

// Create global instance
const emailGenerator = new EmailGenerator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmailGenerator, emailGenerator };
}

// Made with Bob
