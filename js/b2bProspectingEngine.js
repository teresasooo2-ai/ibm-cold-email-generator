/**
 * IBM B2B Prospecting Engine
 * Expert-driven email and call script generation
 * 
 * Constraints:
 * - Email: 3-word subject, ≤75 words, no product names, one question max
 * - Calls: Emotional resonance framework (Jeb Blount)
 * - LinkedIn: Connection notes, DMs, content shares
 * 
 * SMEs: Jen Allen-Knuth, Jeb Blount, Will Allred, Becc Holland, Kyle Coleman
 */

class B2BProspectingEngine {
    constructor() {
        this.emailConstraints = {
            maxWords: 75,
            subjectWords: 3,
            maxQuestions: 1,
            noProductNames: true,
            mobileOptimized: true
        };

        this.emotionalTriggers = [
            'upset', 'frustrated', 'anxious', 'worried',
            'overwhelmed', 'frightened', 'concerned', 'stressed'
        ];
    }

    /**
     * Generate first-touch email from Why Change narrative
     * Constraints: 3-word subject, ≤75 words, no products, 1 question, mobile-optimized
     * SMEs: Jen Allen-Knuth, Becc Holland, Will Allred
     */
    generateFirstTouchEmail(narrative, contactInfo) {
        const { firstName, title, company } = contactInfo;
        const { diqThread, unconsideredNeed } = narrative;

        // Generate 3-word subject (no dashes, no em dashes)
        const subject = this.generate3WordSubject(diqThread, unconsideredNeed);

        // Build email body (≤75 words, one question)
        const body = this.buildEmailBody(firstName, company, diqThread, unconsideredNeed);

        // Validate constraints
        const validation = this.validateEmail(subject, body);

        return {
            subject,
            body,
            wordCount: this.countWords(body),
            validation,
            constraints: {
                subjectWords: subject.split(' ').length,
                bodyWords: this.countWords(body),
                questions: this.countQuestions(body),
                productNames: this.detectProductNames(body)
            }
        };
    }

    /**
     * Generate 3-word subject line
     * No dashes, no em dashes, no product names
     */
    generate3WordSubject(diqThread, unconsideredNeed) {
        // Extract key concept from DIQ or unconsidered need
        const concepts = this.extractKeyConcepts(diqThread.insight + ' ' + unconsideredNeed);

        // Select 3 most impactful words
        const words = concepts.slice(0, 3);

        return words.join(' ');
    }

    /**
     * Build email body (≤75 words, one question)
     * Rules:
     * - Do NOT tell subject what they already know about themselves
     * - Do NOT ask to compare notes or company performance to peers
     * - Do NOT mention IBM products
     * - Mobile-optimized (short paragraphs, clear structure)
     */
    buildEmailBody(firstName, company, diqThread, unconsideredNeed) {
        // Structure: Context → Insight → Question
        const greeting = `Hi ${firstName},`;

        // Context (what's changing in their world)
        const context = `${diqThread.data}.`;

        // Insight (what this means for them - the unconsidered need)
        const insight = `${unconsideredNeed}.`;

        // Question (DIQ question - invites conversation)
        const question = `${diqThread.question}`;

        // Signature
        const signature = `\n\n[Your Name]\nIBM`;

        const body = `${greeting}\n\n${context}\n\n${insight}\n\n${question}${signature}`;

        // Trim if over 75 words
        return this.trimToWordLimit(body, 75);
    }

    /**
     * Generate cold calling script with emotional resonance
     * Framework from Jeb Blount
     * 
     * Structure:
     * "Hi [name], this is [my name] calling with IBM. 
     * The purpose of my call is to schedule an appointment.
     * [Optional: Company-specific observation]
     * Most [title] I speak with are [emotion] because of [industry data point].
     * I'm curious what you're seeing.
     * How's Tuesday at 8:45am for a 15-minute discussion?"
     */
    generateColdCallScript(contactInfo, industryDataPoint, companyDataPoint = null) {
        const { firstName, title, company } = contactInfo;

        // Select appropriate emotion based on data point severity
        const emotion = this.selectEmotion(industryDataPoint);

        let script = `Hi ${firstName}, this is [Your Name] calling with IBM.\n\n`;
        script += `The purpose of my call is to schedule an appointment.\n\n`;

        // Add company-specific observation if available
        if (companyDataPoint) {
            script += `I saw ${company} is facing ${companyDataPoint.observation}.\n\n`;
        }

        // Emotional statement with industry data
        script += `Most ${title}s I speak with are ${emotion} because of ${industryDataPoint.statement}.\n\n`;

        // Curiosity question
        script += `I'm curious what you're seeing.\n\n`;

        // Direct ask with specific time
        script += `How's Tuesday at 8:45am for a 15-minute discussion?`;

        return {
            script,
            emotion,
            dataPoints: {
                industry: industryDataPoint,
                company: companyDataPoint
            },
            sources: {
                industry: industryDataPoint.source,
                company: companyDataPoint?.source
            }
        };
    }

    /**
     * Generate LinkedIn overlay touches
     * Types: Connection note, Public comment, DM, Content share
     */
    generateLinkedInTouches(narrative, contactInfo) {
        return {
            connectionNote: this.generateConnectionNote(narrative, contactInfo),
            publicComment: this.generatePublicComment(narrative, contactInfo),
            directMessage: this.generateDirectMessage(narrative, contactInfo),
            contentShare: this.generateContentShare(narrative, contactInfo)
        };
    }

    /**
     * Generate LinkedIn connection note (≤300 characters)
     */
    generateConnectionNote(narrative, contactInfo) {
        const { firstName, company } = contactInfo;
        const { diqThread } = narrative;

        const note = `Hi ${firstName}, ${diqThread.insight}. ${diqThread.question}`;

        return {
            note: this.trimToCharLimit(note, 300),
            charCount: note.length
        };
    }

    /**
     * Generate public comment on their LinkedIn post
     */
    generatePublicComment(narrative, contactInfo) {
        const { diqThread } = narrative;

        // Thoughtful comment that adds value
        const comment = `Great point. ${diqThread.insight}. Have you seen ${diqThread.data}?`;

        return {
            comment,
            tone: 'Value-adding, not salesy'
        };
    }

    /**
     * Generate LinkedIn DM (after connection accepted)
     */
    generateDirectMessage(narrative, contactInfo) {
        const { firstName } = contactInfo;
        const { diqThread, unconsideredNeed } = narrative;

        const message = `Hi ${firstName},\n\n${unconsideredNeed}\n\n${diqThread.question}\n\nWorth a quick call?`;

        return {
            message,
            wordCount: this.countWords(message)
        };
    }

    /**
     * Generate content share message
     */
    generateContentShare(narrative, contactInfo) {
        const { firstName } = contactInfo;
        const { diqThread } = narrative;

        const message = `${firstName}, thought you'd find this relevant given ${diqThread.data}.`;

        return {
            message,
            contentType: 'Industry report, case study, or thought leadership'
        };
    }

    /**
     * Generate 8-step prospecting cadence
     * 4 emails + 4 call scripts
     * Email 1 and Call 1 reuse first-touch content
     * Map touches to Why Change narrative steps
     */
    generateProspectingCadence(narrative, contactInfo, industryData, companyData) {
        const cadence = [];

        // Touch 1: Email (Day 1) - First touch
        const email1 = this.generateFirstTouchEmail(narrative, contactInfo);
        cadence.push({
            day: 1,
            type: 'Email',
            title: 'First Touch - Why Change',
            ...email1,
            narrativeStep: 'Anchor on Goals + Context of Change'
        });

        // Touch 2: Call (Day 2) - First call
        const call1 = this.generateColdCallScript(contactInfo, industryData, companyData);
        cadence.push({
            day: 2,
            type: 'Phone Call',
            title: 'First Call - Emotional Resonance',
            ...call1,
            narrativeStep: 'Unconsidered Need'
        });

        // Touch 3: LinkedIn Connection (Day 3)
        const linkedin1 = this.generateLinkedInTouches(narrative, contactInfo);
        cadence.push({
            day: 3,
            type: 'LinkedIn',
            title: 'Connection Request',
            ...linkedin1.connectionNote,
            narrativeStep: 'DIQ Thread'
        });

        // Touch 4: Email (Day 5) - Consequences
        const email2 = this.generateConsequencesEmail(narrative, contactInfo);
        cadence.push({
            day: 5,
            type: 'Email',
            title: 'Consequences of No Change',
            ...email2,
            narrativeStep: 'Consequences of No Change'
        });

        // Touch 5: Call (Day 7) - New Way
        const call2 = this.generateNewWayCall(narrative, contactInfo, industryData);
        cadence.push({
            day: 7,
            type: 'Phone Call',
            title: 'New Way Forward',
            ...call2,
            narrativeStep: 'New Way'
        });

        // Touch 6: LinkedIn DM (Day 9)
        cadence.push({
            day: 9,
            type: 'LinkedIn DM',
            title: 'Direct Message',
            ...linkedin1.directMessage,
            narrativeStep: 'Likely Outcome'
        });

        // Touch 7: Email (Day 11) - Outcome
        const email3 = this.generateOutcomeEmail(narrative, contactInfo);
        cadence.push({
            day: 11,
            type: 'Email',
            title: 'Likely Outcome',
            ...email3,
            narrativeStep: 'Likely Outcome'
        });

        // Touch 8: Call (Day 13) - Final attempt
        const call3 = this.generateFinalCall(narrative, contactInfo, industryData);
        cadence.push({
            day: 13,
            type: 'Phone Call',
            title: 'Final Attempt',
            ...call3,
            narrativeStep: 'Full Narrative'
        });

        return {
            cadence,
            totalTouches: cadence.length,
            duration: '13 days',
            emailCount: cadence.filter(t => t.type === 'Email').length,
            callCount: cadence.filter(t => t.type === 'Phone Call').length,
            linkedInCount: cadence.filter(t => t.type.includes('LinkedIn')).length
        };
    }

    /**
     * Generate consequences email (Touch 4)
     */
    generateConsequencesEmail(narrative, contactInfo) {
        const { firstName, company } = contactInfo;
        const { consequencesOfNoChange, diqThread } = narrative;

        const subject = this.generate3WordSubject(diqThread, consequencesOfNoChange);
        const body = `Hi ${firstName},\n\n${consequencesOfNoChange}\n\n${diqThread.question}\n\n[Your Name]\nIBM`;

        return {
            subject,
            body: this.trimToWordLimit(body, 75),
            wordCount: this.countWords(body)
        };
    }

    /**
     * Generate new way call script (Touch 5)
     */
    generateNewWayCall(narrative, contactInfo, industryData) {
        const { firstName, title } = contactInfo;
        const { newWay } = narrative;
        const emotion = this.selectEmotion(industryData);

        const script = `Hi ${firstName}, this is [Your Name] with IBM.\n\n${newWay}\n\nMost ${title}s I speak with are ${emotion} because they're still using the old approach.\n\nI'm curious if you're seeing this.\n\nHow's Thursday at 2pm for a 15-minute discussion?`;

        return {
            script,
            emotion
        };
    }

    /**
     * Generate outcome email (Touch 7)
     */
    generateOutcomeEmail(narrative, contactInfo) {
        const { firstName } = contactInfo;
        const { likelyOutcome, diqThread } = narrative;

        const subject = this.generate3WordSubject(diqThread, likelyOutcome);
        const body = `Hi ${firstName},\n\n${likelyOutcome}\n\n${diqThread.question}\n\n[Your Name]\nIBM`;

        return {
            subject,
            body: this.trimToWordLimit(body, 75),
            wordCount: this.countWords(body)
        };
    }

    /**
     * Generate final call script (Touch 8)
     */
    generateFinalCall(narrative, contactInfo, industryData) {
        const { firstName, title } = contactInfo;
        const emotion = this.selectEmotion(industryData);

        const script = `Hi ${firstName}, this is [Your Name] with IBM.\n\nI've reached out a few times about ${industryData.statement}.\n\nMost ${title}s I speak with are ${emotion} about this.\n\nI'm curious what you're seeing.\n\nHow's Friday at 10am for a quick 15-minute discussion?`;

        return {
            script,
            emotion
        };
    }

    /**
     * Helper: Select appropriate emotion based on data severity
     */
    selectEmotion(dataPoint) {
        const severity = dataPoint.severity || 'medium';

        const emotionMap = {
            'high': ['overwhelmed', 'frightened', 'anxious'],
            'medium': ['frustrated', 'worried', 'concerned'],
            'low': ['upset', 'stressed']
        };

        const emotions = emotionMap[severity] || emotionMap['medium'];
        return emotions[Math.floor(Math.random() * emotions.length)];
    }

    /**
     * Helper: Extract key concepts for subject line
     */
    extractKeyConcepts(text) {
        // Remove common words, extract impactful terms
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
        const words = text.toLowerCase().split(/\s+/)
            .filter(w => w.length > 3 && !stopWords.includes(w))
            .slice(0, 10);

        return words;
    }

    /**
     * Helper: Count words
     */
    countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    /**
     * Helper: Count questions
     */
    countQuestions(text) {
        return (text.match(/\?/g) || []).length;
    }

    /**
     * Helper: Detect product names
     */
    detectProductNames(text) {
        const productKeywords = ['watsonx', 'watson', 'db2', 'cognos', 'qradar', 'guardium', 'maximo', 'instana', 'openshift', 'cloud pak'];
        const lowerText = text.toLowerCase();

        return productKeywords.filter(keyword => lowerText.includes(keyword));
    }

    /**
     * Helper: Trim to word limit
     */
    trimToWordLimit(text, limit) {
        const words = text.split(/\s+/);
        if (words.length <= limit) return text;

        return words.slice(0, limit).join(' ') + '...';
    }

    /**
     * Helper: Trim to character limit
     */
    trimToCharLimit(text, limit) {
        if (text.length <= limit) return text;
        return text.substring(0, limit - 3) + '...';
    }

    /**
     * Validate email against constraints
     */
    validateEmail(subject, body) {
        const errors = [];

        // Subject: 3 words
        const subjectWords = subject.split(' ').length;
        if (subjectWords !== 3) {
            errors.push(`Subject must be exactly 3 words (found ${subjectWords})`);
        }

        // Subject: No dashes or em dashes
        if (subject.includes('-') || subject.includes('—')) {
            errors.push('Subject cannot contain dashes or em dashes');
        }

        // Body: ≤75 words
        const bodyWords = this.countWords(body);
        if (bodyWords > 75) {
            errors.push(`Body must be ≤75 words (found ${bodyWords})`);
        }

        // Body: Max 1 question
        const questions = this.countQuestions(body);
        if (questions > 1) {
            errors.push(`Body must have max 1 question (found ${questions})`);
        }

        // Body: No product names
        const products = this.detectProductNames(body);
        if (products.length > 0) {
            errors.push(`Body cannot mention products: ${products.join(', ')}`);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

// Create global instance
const b2bProspectingEngine = new B2BProspectingEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        B2BProspectingEngine,
        b2bProspectingEngine
    };
}

// Make available globally
window.B2BProspectingEngine = {
    B2BProspectingEngine,
    b2bProspectingEngine
};

// Made with Bob
