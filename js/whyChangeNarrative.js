/**
 * IBM Sales Cadence Engine - Why Change Narrative Builder
 * Based on Jen Allen-Knuth methodology and B2B prospecting best practices
 * 
 * Experts Referenced:
 * - Jen Allen-Knuth: Buyer psychology, status quo bias, narrative structure
 * - Jeb Blount: Cold calling, emotional resonance, objection handling
 * - Will Allred: Email clarity, mobile optimization, cognitive load
 * - Becc Holland: Flip the Script methodology
 * - Kyle Coleman: Personalization at scale, message-market fit
 */

class WhyChangeNarrative {
    constructor() {
        this.narrativeStructure = {
            anchorOnGoals: '',
            contextOfChange: '',
            unconsideredNeed: '',
            consequencesOfNoChange: '',
            newWay: '',
            likelyOutcome: '',
            diqThread: ''
        };
    }

    /**
     * Generate Why Change narrative from company intelligence
     * @param {Object} companyIntel - Company intelligence data
     * @param {Object} focusArea - Selected opportunity or challenge
     * @param {Array} ibmProducts - Relevant IBM products (optional, not mentioned in narrative)
     * @returns {Object} Complete narrative structure
     */
    generateNarrative(companyIntel, focusArea, ibmProducts = []) {
        const narrative = {
            anchorOnGoals: this.buildAnchorOnGoals(companyIntel, focusArea),
            contextOfChange: this.buildContextOfChange(companyIntel, focusArea),
            unconsideredNeed: this.buildUnconsideredNeed(focusArea),
            consequencesOfNoChange: this.buildConsequences(focusArea),
            newWay: this.buildNewWay(focusArea, ibmProducts),
            likelyOutcome: this.buildLikelyOutcome(focusArea),
            diqThread: this.buildDIQThread(companyIntel, focusArea)
        };

        // Combine into full narrative (150-250 words, conversational, second person)
        const fullNarrative = this.assembleNarrative(narrative);

        return {
            ...narrative,
            fullNarrative,
            wordCount: this.countWords(fullNarrative),
            ibmProducts: ibmProducts // Store but don't mention in narrative
        };
    }

    /**
     * A) Anchor on Goals
     * Start with what the buyer wants to achieve
     */
    buildAnchorOnGoals(companyIntel, focusArea) {
        const { company, industry, opportunities } = companyIntel;

        // Use company's stated goals from earnings/reports
        if (focusArea.type === 'opportunity') {
            return `You're focused on ${focusArea.goal.toLowerCase()}. ${focusArea.context}`;
        } else {
            return `You need to ${focusArea.goal.toLowerCase()} to stay competitive in ${industry}.`;
        }
    }

    /**
     * B) Context of Change
     * Why now? What's changed in the market/industry?
     */
    buildContextOfChange(companyIntel, focusArea) {
        const { industry, recentChanges } = companyIntel;

        return `The ${industry} landscape has shifted. ${recentChanges[0]} This means ${focusArea.marketImpact}.`;
    }

    /**
     * C) Unconsidered Need
     * What haven't they thought about? The hidden problem.
     */
    buildUnconsideredNeed(focusArea) {
        return `But here's what most ${focusArea.persona || 'leaders'} miss: ${focusArea.unconsideredNeed}. ${focusArea.whyItMatters}`;
    }

    /**
     * D) Consequences of No Change
     * What happens if they do nothing? Create urgency.
     */
    buildConsequences(focusArea) {
        return `If you don't address this, ${focusArea.consequence}. ${focusArea.quantifiedRisk}`;
    }

    /**
     * E) New Way
     * How to solve it (without product names)
     */
    buildNewWay(focusArea, ibmProducts) {
        // Describe the approach, not the product
        return `The solution isn't more ${focusArea.oldApproach}. It's ${focusArea.newApproach}. ${focusArea.howItWorks}`;
    }

    /**
     * F) Likely Outcome
     * What success looks like
     */
    buildLikelyOutcome(focusArea) {
        return `When you do this right, ${focusArea.outcome}. ${focusArea.quantifiedBenefit}`;
    }

    /**
     * G) DIQ Thread (Data → Insight → Question)
     * Connect data to insight to question
     */
    buildDIQThread(companyIntel, focusArea) {
        return {
            data: focusArea.dataPoint,
            insight: focusArea.insight,
            question: focusArea.question
        };
    }

    /**
     * Assemble full narrative (150-250 words, conversational, second person)
     */
    assembleNarrative(narrative) {
        return `${narrative.anchorOnGoals}

${narrative.contextOfChange}

${narrative.unconsideredNeed}

${narrative.consequencesOfNoChange}

${narrative.newWay}

${narrative.likelyOutcome}

${narrative.diqThread.question}`;
    }

    /**
     * Count words in text
     */
    countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    /**
     * Validate narrative meets constraints
     */
    validateNarrative(narrative) {
        const wordCount = this.countWords(narrative.fullNarrative);
        const errors = [];

        if (wordCount < 150) {
            errors.push(`Narrative too short: ${wordCount} words (minimum 150)`);
        }
        if (wordCount > 250) {
            errors.push(`Narrative too long: ${wordCount} words (maximum 250)`);
        }

        // Check for product names (should not be present)
        const productKeywords = ['watsonx', 'watson', 'db2', 'cognos', 'qradar', 'guardium', 'maximo', 'instana'];
        const lowerNarrative = narrative.fullNarrative.toLowerCase();

        productKeywords.forEach(keyword => {
            if (lowerNarrative.includes(keyword)) {
                errors.push(`Product name detected: ${keyword} (narratives should not mention products)`);
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            wordCount
        };
    }
}

/**
 * Company Intelligence Gatherer
 * Pulls latest public info (10-K, Annual Report, Quarterly Earnings)
 * Focus on 2025-2026 data only
 */
class CompanyIntelligence {
    constructor() {
        this.dataYear = 2025; // Only use 2025-2026 data
    }

    /**
     * Gather company intelligence
     * @param {string} companyName - Target company
     * @param {string} industry - Industry sector
     * @returns {Object} Company intelligence with opportunities and challenges
     */
    async gatherIntelligence(companyName, industry) {
        // In production, this would call APIs to fetch:
        // - 10-K filings
        // - Annual reports
        // - Quarterly earnings
        // - Press releases
        // - Industry reports

        // For now, return structured format
        return {
            company: companyName,
            industry: industry,
            dataYear: '2025-2026',
            opportunities: [],
            challenges: [],
            recentChanges: [],
            kpis: []
        };
    }

    /**
     * Parse opportunities and challenges from company data
     * Output Format: Category | Insight | KPIs Impacted | Source
     */
    parseOpportunitiesAndChallenges(rawData) {
        const opportunities = [];
        const challenges = [];

        // Parse and structure data
        // This would use NLP/AI to extract from documents

        return {
            opportunities,
            challenges
        };
    }

    /**
     * Validate data is from 2025-2026 only
     */
    validateDataYear(data) {
        const year = new Date(data.date).getFullYear();
        return year >= 2025 && year <= 2026;
    }
}

/**
 * DIQ Framework (Data → Insight → Question)
 * Transforms data into compelling questions
 */
class DIQFramework {
    /**
     * Generate DIQ from company data
     * @param {Object} data - Company data point
     * @param {string} context - Industry/company context
     * @returns {Object} Data, Insight, Question
     */
    generateDIQ(data, context) {
        return {
            data: this.formatData(data),
            insight: this.deriveInsight(data, context),
            question: this.craftQuestion(data, context)
        };
    }

    formatData(data) {
        // Format data point clearly
        return `${data.metric}: ${data.value} (${data.change})`;
    }

    deriveInsight(data, context) {
        // Connect data to business impact
        return `This suggests ${data.implication} in ${context}`;
    }

    craftQuestion(data, context) {
        // Create open-ended question that invites conversation
        return `How is this affecting your ${data.affectedArea}?`;
    }
}

/**
 * Persona Boolean String Generator
 * Creates LinkedIn search strings for target personas
 */
class PersonaBooleanGenerator {
    /**
     * Generate boolean string for LinkedIn search
     * @param {Array} personas - List of target personas
     * @param {string} industry - Industry filter
     * @returns {string} Boolean search string (max 10 terms, OR-only)
     */
    generateBooleanString(personas, industry) {
        // Extract key titles
        const titles = personas.map(p => this.extractKeyTitle(p));

        // Limit to 10 terms
        const limitedTitles = titles.slice(0, 10);

        // Create OR-only string
        const booleanString = limitedTitles.join(' OR ');

        return {
            booleanString,
            personas: limitedTitles,
            reasoning: this.explainReasoning(personas, industry)
        };
    }

    extractKeyTitle(persona) {
        // Extract searchable title
        // "VP Supply Chain" → "VP Supply Chain"
        // "Chief Data Officer" → "Chief Data Officer" OR "CDO"
        return persona.title || persona;
    }

    explainReasoning(personas, industry) {
        return `These personas in ${industry} are most likely to care about this narrative because they own the problem area and have budget authority.`;
    }
}

// Create global instances
const whyChangeNarrative = new WhyChangeNarrative();
const companyIntelligence = new CompanyIntelligence();
const diqFramework = new DIQFramework();
const personaBooleanGenerator = new PersonaBooleanGenerator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WhyChangeNarrative,
        CompanyIntelligence,
        DIQFramework,
        PersonaBooleanGenerator,
        whyChangeNarrative,
        companyIntelligence,
        diqFramework,
        personaBooleanGenerator
    };
}

// Make available globally
window.WhyChangeNarrative = {
    WhyChangeNarrative,
    CompanyIntelligence,
    DIQFramework,
    PersonaBooleanGenerator,
    whyChangeNarrative,
    companyIntelligence,
    diqFramework,
    personaBooleanGenerator
};

// Made with Bob
