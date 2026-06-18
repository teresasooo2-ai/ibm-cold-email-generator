/**
 * IBM Narrative Evaluation Framework
 * Evaluates narratives, emails, and cadences against expert criteria
 * 
 * Evaluation Dimensions:
 * - Narrative Strength (Jen Allen-Knuth)
 * - Emotional Resonance (Jeb Blount)
 * - Email Clarity (Will Allred)
 * - Personalization (Kyle Coleman)
 * - Cadence Flow (Best practices)
 */

class NarrativeEvaluator {
    constructor() {
        this.scoringCriteria = {
            narrativeStrength: {
                weight: 0.25,
                criteria: [
                    'Clear anchor on goals',
                    'Compelling context of change',
                    'Unconsidered need identified',
                    'Consequences articulated',
                    'New way presented',
                    'Likely outcome described',
                    'DIQ thread present'
                ]
            },
            emotionalResonance: {
                weight: 0.20,
                criteria: [
                    'Emotional trigger used',
                    'Urgency created',
                    'Status quo challenged',
                    'Fear of missing out',
                    'Buyer psychology applied'
                ]
            },
            emailClarity: {
                weight: 0.20,
                criteria: [
                    'Mobile-optimized',
                    'Under 75 words',
                    'One question max',
                    'No product names',
                    'Clear call to action',
                    'Low cognitive load'
                ]
            },
            personalization: {
                weight: 0.20,
                criteria: [
                    'Company-specific data',
                    'Industry context',
                    'Persona-appropriate tone',
                    'Relevant pain points',
                    'Timely/current'
                ]
            },
            cadenceFlow: {
                weight: 0.15,
                criteria: [
                    'Logical progression',
                    'Multi-channel approach',
                    'Appropriate timing',
                    'Value escalation',
                    'Persistence without pushiness'
                ]
            }
        };
    }

    /**
     * Evaluate complete narrative
     */
    evaluateNarrative(narrative) {
        const scores = {
            narrativeStrength: this.scoreNarrativeStrength(narrative),
            emotionalResonance: this.scoreEmotionalResonance(narrative),
            overall: 0
        };

        // Calculate weighted overall score
        scores.overall = (
            scores.narrativeStrength.score * this.scoringCriteria.narrativeStrength.weight +
            scores.emotionalResonance.score * this.scoringCriteria.emotionalResonance.weight
        ) / (this.scoringCriteria.narrativeStrength.weight + this.scoringCriteria.emotionalResonance.weight);

        return {
            scores,
            grade: this.getGrade(scores.overall),
            recommendations: this.generateNarrativeRecommendations(scores)
        };
    }

    /**
     * Evaluate email
     */
    evaluateEmail(email, narrative = null) {
        const scores = {
            emailClarity: this.scoreEmailClarity(email),
            personalization: narrative ? this.scorePersonalization(email, narrative) : null,
            overall: 0
        };

        // Calculate weighted overall score
        let totalWeight = this.scoringCriteria.emailClarity.weight;
        scores.overall = scores.emailClarity.score * this.scoringCriteria.emailClarity.weight;

        if (scores.personalization) {
            totalWeight += this.scoringCriteria.personalization.weight;
            scores.overall += scores.personalization.score * this.scoringCriteria.personalization.weight;
        }

        scores.overall = scores.overall / totalWeight;

        return {
            scores,
            grade: this.getGrade(scores.overall),
            recommendations: this.generateEmailRecommendations(scores)
        };
    }

    /**
     * Evaluate cadence
     */
    evaluateCadence(cadence, narrative = null) {
        const scores = {
            cadenceFlow: this.scoreCadenceFlow(cadence),
            emotionalResonance: this.scoreCadenceEmotionalResonance(cadence),
            overall: 0
        };

        // Calculate weighted overall score
        scores.overall = (
            scores.cadenceFlow.score * this.scoringCriteria.cadenceFlow.weight +
            scores.emotionalResonance.score * this.scoringCriteria.emotionalResonance.weight
        ) / (this.scoringCriteria.cadenceFlow.weight + this.scoringCriteria.emotionalResonance.weight);

        return {
            scores,
            grade: this.getGrade(scores.overall),
            recommendations: this.generateCadenceRecommendations(scores)
        };
    }

    /**
     * Score narrative strength (Jen Allen-Knuth criteria)
     */
    scoreNarrativeStrength(narrative) {
        const checks = {
            hasAnchor: !!narrative.anchorOnGoals && narrative.anchorOnGoals.length > 20,
            hasContext: !!narrative.contextOfChange && narrative.contextOfChange.length > 20,
            hasUnconsideredNeed: !!narrative.unconsideredNeed && narrative.unconsideredNeed.length > 20,
            hasConsequences: !!narrative.consequencesOfNoChange && narrative.consequencesOfNoChange.length > 20,
            hasNewWay: !!narrative.newWay && narrative.newWay.length > 20,
            hasOutcome: !!narrative.likelyOutcome && narrative.likelyOutcome.length > 20,
            hasDIQ: !!narrative.diqThread && narrative.diqThread.question
        };

        const passedChecks = Object.values(checks).filter(v => v).length;
        const score = (passedChecks / Object.keys(checks).length) * 100;

        return {
            score,
            checks,
            details: this.getNarrativeStrengthDetails(checks)
        };
    }

    /**
     * Score emotional resonance (Jeb Blount criteria)
     */
    scoreEmotionalResonance(narrative) {
        const text = narrative.fullNarrative || '';
        const lowerText = text.toLowerCase();

        const checks = {
            hasEmotionalTrigger: this.detectEmotionalTriggers(text),
            createsUrgency: lowerText.includes('now') || lowerText.includes('today') || lowerText.includes('soon'),
            challengesStatusQuo: lowerText.includes('old way') || lowerText.includes('traditional') || lowerText.includes('current'),
            createsFOMO: lowerText.includes('leaders') || lowerText.includes('competitors') || lowerText.includes('falling behind'),
            usesBuyerPsychology: this.detectBuyerPsychology(text)
        };

        const passedChecks = Object.values(checks).filter(v => v).length;
        const score = (passedChecks / Object.keys(checks).length) * 100;

        return {
            score,
            checks,
            details: this.getEmotionalResonanceDetails(checks)
        };
    }

    /**
     * Score email clarity (Will Allred criteria)
     */
    scoreEmailClarity(email) {
        const { subject, body, wordCount, validation } = email;

        const checks = {
            mobileOptimized: wordCount <= 75,
            under75Words: wordCount <= 75,
            oneQuestion: (body.match(/\?/g) || []).length <= 1,
            noProductNames: !this.detectProductNames(body).length,
            hasCTA: this.detectCallToAction(body),
            lowCognitiveLoad: this.assessCognitiveLoad(body)
        };

        const passedChecks = Object.values(checks).filter(v => v).length;
        const score = (passedChecks / Object.keys(checks).length) * 100;

        return {
            score,
            checks,
            details: this.getEmailClarityDetails(checks, email)
        };
    }

    /**
     * Score personalization (Kyle Coleman criteria)
     */
    scorePersonalization(email, narrative) {
        const { body } = email;
        const lowerBody = body.toLowerCase();

        const checks = {
            hasCompanyData: this.detectCompanySpecificData(body),
            hasIndustryContext: this.detectIndustryContext(body, narrative),
            appropriateTone: this.assessTone(body),
            relevantPainPoints: this.detectRelevantPainPoints(body, narrative),
            timely: this.assessTimeliness(narrative)
        };

        const passedChecks = Object.values(checks).filter(v => v).length;
        const score = (passedChecks / Object.keys(checks).length) * 100;

        return {
            score,
            checks,
            details: this.getPersonalizationDetails(checks)
        };
    }

    /**
     * Score cadence flow
     */
    scoreCadenceFlow(cadence) {
        const checks = {
            logicalProgression: this.assessProgression(cadence.cadence),
            multiChannel: this.assessChannelMix(cadence.cadence),
            appropriateTiming: this.assessTiming(cadence.cadence),
            valueEscalation: this.assessValueEscalation(cadence.cadence),
            persistence: cadence.totalTouches >= 6 && cadence.totalTouches <= 10
        };

        const passedChecks = Object.values(checks).filter(v => v).length;
        const score = (passedChecks / Object.keys(checks).length) * 100;

        return {
            score,
            checks,
            details: this.getCadenceFlowDetails(checks)
        };
    }

    /**
     * Score cadence emotional resonance
     */
    scoreCadenceEmotionalResonance(cadence) {
        let emotionalTouches = 0;
        let totalTouches = cadence.cadence.length;

        cadence.cadence.forEach(touch => {
            if (touch.script && this.detectEmotionalTriggers(touch.script)) {
                emotionalTouches++;
            }
            if (touch.body && this.detectEmotionalTriggers(touch.body)) {
                emotionalTouches++;
            }
        });

        const score = (emotionalTouches / totalTouches) * 100;

        return {
            score,
            emotionalTouches,
            totalTouches
        };
    }

    /**
     * Helper: Detect emotional triggers
     */
    detectEmotionalTriggers(text) {
        const triggers = ['upset', 'frustrated', 'anxious', 'worried', 'overwhelmed', 'frightened', 'concerned', 'stressed'];
        const lowerText = text.toLowerCase();
        return triggers.some(trigger => lowerText.includes(trigger));
    }

    /**
     * Helper: Detect buyer psychology
     */
    detectBuyerPsychology(text) {
        const patterns = ['status quo', 'risk', 'opportunity cost', 'competitive', 'falling behind', 'leaders'];
        const lowerText = text.toLowerCase();
        return patterns.some(pattern => lowerText.includes(pattern));
    }

    /**
     * Helper: Detect product names
     */
    detectProductNames(text) {
        const products = ['watsonx', 'watson', 'db2', 'cognos', 'qradar', 'guardium', 'maximo', 'instana'];
        const lowerText = text.toLowerCase();
        return products.filter(product => lowerText.includes(product));
    }

    /**
     * Helper: Detect call to action
     */
    detectCallToAction(text) {
        const ctaPatterns = ['call', 'meeting', 'discussion', 'conversation', 'connect', 'schedule', 'worth'];
        const lowerText = text.toLowerCase();
        return ctaPatterns.some(pattern => lowerText.includes(pattern));
    }

    /**
     * Helper: Assess cognitive load
     */
    assessCognitiveLoad(text) {
        // Simple heuristic: short sentences, clear structure
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
        return avgSentenceLength < 15; // Good if average sentence < 15 words
    }

    /**
     * Helper: Detect company-specific data
     */
    detectCompanySpecificData(text) {
        // Check for specific numbers, initiatives, or company names
        return /\d+%|\$\d+|Q[1-4]|initiative|program|announcement/.test(text);
    }

    /**
     * Helper: Detect industry context
     */
    detectIndustryContext(text, narrative) {
        if (!narrative) return false;
        const industry = narrative.industry || '';
        return text.toLowerCase().includes(industry.toLowerCase());
    }

    /**
     * Helper: Assess tone
     */
    assessTone(text) {
        // Check for professional, conversational tone
        const hasConversationalMarkers = /you're|you've|I'm|curious|seeing|worth/.test(text);
        const avoidsSalesy = !/buy|purchase|demo|trial|offer/.test(text.toLowerCase());
        return hasConversationalMarkers && avoidsSalesy;
    }

    /**
     * Helper: Detect relevant pain points
     */
    detectRelevantPainPoints(text, narrative) {
        if (!narrative || !narrative.unconsideredNeed) return false;
        const painKeywords = narrative.unconsideredNeed.toLowerCase().split(' ').slice(0, 5);
        const lowerText = text.toLowerCase();
        return painKeywords.some(keyword => lowerText.includes(keyword));
    }

    /**
     * Helper: Assess timeliness
     */
    assessTimeliness(narrative) {
        // Check if narrative references current year (2025-2026)
        const text = narrative.fullNarrative || '';
        return /2025|2026|current|recent|now|today/.test(text);
    }

    /**
     * Helper: Assess progression
     */
    assessProgression(touches) {
        // Check if touches follow logical narrative arc
        const narrativeSteps = touches.map(t => t.narrativeStep);
        const expectedOrder = ['Anchor', 'Context', 'Unconsidered', 'Consequences', 'New Way', 'Outcome'];

        let orderScore = 0;
        for (let i = 0; i < narrativeSteps.length - 1; i++) {
            const current = narrativeSteps[i];
            const next = narrativeSteps[i + 1];
            // Check if progression makes sense
            if (current && next) orderScore++;
        }

        return orderScore >= touches.length * 0.6;
    }

    /**
     * Helper: Assess channel mix
     */
    assessChannelMix(touches) {
        const channels = new Set(touches.map(t => t.type));
        return channels.size >= 3; // At least 3 different channels
    }

    /**
     * Helper: Assess timing
     */
    assessTiming(touches) {
        // Check for appropriate spacing (not all on same day)
        const days = touches.map(t => t.day);
        const uniqueDays = new Set(days);
        return uniqueDays.size >= touches.length * 0.7;
    }

    /**
     * Helper: Assess value escalation
     */
    assessValueEscalation(touches) {
        // Later touches should provide more value/specificity
        const firstHalf = touches.slice(0, Math.floor(touches.length / 2));
        const secondHalf = touches.slice(Math.floor(touches.length / 2));

        const firstAvgLength = firstHalf.reduce((sum, t) => sum + (t.body || t.script || '').length, 0) / firstHalf.length;
        const secondAvgLength = secondHalf.reduce((sum, t) => sum + (t.body || t.script || '').length, 0) / secondHalf.length;

        return secondAvgLength >= firstAvgLength * 0.9; // Later touches maintain or increase detail
    }

    /**
     * Get letter grade from score
     */
    getGrade(score) {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }

    /**
     * Generate recommendations
     */
    generateNarrativeRecommendations(scores) {
        const recommendations = [];

        if (scores.narrativeStrength.score < 80) {
            recommendations.push('Strengthen narrative structure - ensure all 7 elements are present and well-developed');
        }

        if (scores.emotionalResonance.score < 70) {
            recommendations.push('Add emotional triggers and urgency to create buyer motivation');
        }

        return recommendations;
    }

    generateEmailRecommendations(scores) {
        const recommendations = [];

        if (scores.emailClarity.score < 80) {
            recommendations.push('Simplify email - reduce word count, remove jargon, focus on one clear message');
        }

        if (scores.personalization && scores.personalization.score < 70) {
            recommendations.push('Add company-specific data and industry context for better personalization');
        }

        return recommendations;
    }

    generateCadenceRecommendations(scores) {
        const recommendations = [];

        if (scores.cadenceFlow.score < 80) {
            recommendations.push('Improve cadence flow - ensure logical progression and appropriate timing');
        }

        if (scores.emotionalResonance.score < 70) {
            recommendations.push('Add emotional resonance to more touches, especially call scripts');
        }

        return recommendations;
    }

    getNarrativeStrengthDetails(checks) {
        return Object.entries(checks).map(([key, passed]) => ({
            criterion: key,
            passed,
            importance: 'high'
        }));
    }

    getEmotionalResonanceDetails(checks) {
        return Object.entries(checks).map(([key, passed]) => ({
            criterion: key,
            passed,
            importance: 'high'
        }));
    }

    getEmailClarityDetails(checks, email) {
        return Object.entries(checks).map(([key, passed]) => ({
            criterion: key,
            passed,
            importance: 'high',
            currentValue: key === 'under75Words' ? email.wordCount : null
        }));
    }

    getPersonalizationDetails(checks) {
        return Object.entries(checks).map(([key, passed]) => ({
            criterion: key,
            passed,
            importance: 'medium'
        }));
    }

    getCadenceFlowDetails(checks) {
        return Object.entries(checks).map(([key, passed]) => ({
            criterion: key,
            passed,
            importance: 'high'
        }));
    }
}

// Create global instance
const narrativeEvaluator = new NarrativeEvaluator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NarrativeEvaluator,
        narrativeEvaluator
    };
}

// Make available globally
window.NarrativeEvaluator = {
    NarrativeEvaluator,
    narrativeEvaluator
};

// Made with Bob
