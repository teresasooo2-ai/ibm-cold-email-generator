/**
 * IBM Sales Cadence Engine - Multi-Touch Cadence Generator
 * Generates 15-day, 8-touch sales sequences with persona-specific messaging
 */

class CadenceGenerator {
    constructor() {
        this.touchTypes = {
            email: 'Email',
            linkedin: 'LinkedIn',
            phone: 'Phone Call',
            voicemail: 'Voicemail'
        };
    }

    /**
     * Generate complete 15-day cadence
     */
    generateCadence(params) {
        const {
            companyName,
            industry,
            problemId,
            persona,
            products,
            businessImpact
        } = params;

        const cadence = [
            this.generateDay1Email(params),
            this.generateDay3LinkedIn(params),
            this.generateDay5Email(params),
            this.generateDay7PhoneScript(params),
            this.generateDay9Email(params),
            this.generateDay11Voicemail(params),
            this.generateDay13Email(params),
            this.generateDay15Email(params)
        ];

        return {
            companyName,
            industry,
            problemId,
            persona,
            cadence,
            totalTouches: cadence.length,
            duration: '15 days'
        };
    }

    /**
     * Day 1: Pain-Focused Email
     */
    generateDay1Email(params) {
        const { companyName, persona, problemName, painPoints, industry } = params;

        const greeting = persona ? `Hi ${persona.split(' ')[0]},` : 'Hi there,';

        const subject = this.generatePainSubject(companyName, problemName, industry);

        const body = `${greeting}

I noticed ${companyName} is ${this.getIndustryContext(industry)}.

Many ${industry} leaders struggle with ${painPoints[0].toLowerCase()}.

Are you the right person to discuss ${this.getProblemFocus(problemName)}?

Best,
[Your Name]
IBM`;

        return {
            day: 1,
            type: this.touchTypes.email,
            title: 'Pain-Focused Email',
            subject,
            content: body,
            wordCount: this.countWords(body),
            goal: 'Establish pain awareness and identify decision maker'
        };
    }

    /**
     * Day 3: LinkedIn Connection Message
     */
    generateDay3LinkedIn(params) {
        const { companyName, persona, problemName, industry } = params;

        const content = `Hi ${persona ? persona.split(' ')[0] : 'there'},

Saw ${companyName}'s ${this.getIndustryInitiative(industry)}.

Curious how you're approaching ${this.getProblemFocus(problemName)} as ${this.getIndustryTrend(industry)}.

Worth a quick conversation?`;

        return {
            day: 3,
            type: this.touchTypes.linkedin,
            title: 'LinkedIn Connection Request',
            subject: 'Connection Request',
            content,
            wordCount: this.countWords(content),
            goal: 'Build social proof and alternative contact channel'
        };
    }

    /**
     * Day 5: Case Study Email
     */
    generateDay5Email(params) {
        const { companyName, persona, problemName, businessImpact, industry, products } = params;

        const greeting = persona ? `Hi ${persona.split(' ')[0]},` : 'Hi there,';

        const subject = `How ${industry} leaders solve ${this.shortenProblem(problemName)}`;

        const body = `${greeting}

Many ${industry} organizations are using AI and data modernization to ${businessImpact[0].toLowerCase()}.

${companyName} could see similar results with ${products[0]}.

Worth a 15-minute conversation?

Best,
[Your Name]
IBM`;

        return {
            day: 5,
            type: this.touchTypes.email,
            title: 'Case Study Email',
            subject,
            content: body,
            wordCount: this.countWords(body),
            goal: 'Provide social proof and demonstrate value'
        };
    }

    /**
     * Day 7: Phone Call Script
     */
    generateDay7PhoneScript(params) {
        const { companyName, persona, problemName, businessImpact, products } = params;

        const content = `Hi ${persona ? persona.split(' ')[0] : 'there'},

This is [Your Name] from IBM.

I've been helping ${this.getIndustryType(params.industry)} organizations improve ${this.getProblemArea(problemName)}.

Specifically, we've helped companies ${businessImpact[0].toLowerCase()} using ${products[0]}.

I wanted to see if this is something ${companyName} is prioritizing right now.

Do you have 5 minutes to discuss?

[If yes, continue with discovery questions]
[If no, ask for better time to reconnect]`;

        return {
            day: 7,
            type: this.touchTypes.phone,
            title: 'Phone Call Script',
            subject: 'Outbound Call',
            content,
            wordCount: this.countWords(content),
            goal: 'Direct conversation and qualification'
        };
    }

    /**
     * Day 9: Industry Benchmark Email
     */
    generateDay9Email(params) {
        const { companyName, persona, problemName, businessImpact, industry } = params;

        const greeting = persona ? `Hi ${persona.split(' ')[0]},` : 'Hi there,';

        const subject = `${industry} benchmark: ${this.shortenProblem(problemName)}`;

        const body = `${greeting}

${industry} operators are seeing ${businessImpact[1].toLowerCase()} with AI-driven solutions.

The gap between leaders and laggards is widening.

Is ${companyName} investing in this area?

Best,
[Your Name]
IBM`;

        return {
            day: 9,
            type: this.touchTypes.email,
            title: 'Industry Benchmark Email',
            subject,
            content: body,
            wordCount: this.countWords(body),
            goal: 'Create urgency through competitive positioning'
        };
    }

    /**
     * Day 11: Voicemail Script
     */
    generateDay11Voicemail(params) {
        const { companyName, persona, problemName } = params;

        const content = `Hi ${persona ? persona.split(' ')[0] : 'there'},

This is [Your Name] from IBM at [phone number].

I wanted to share some ideas around ${this.getProblemFocus(problemName)} that could help ${companyName}.

I'll send over some information via email, but feel free to call me back at [phone number].

Thanks!`;

        return {
            day: 11,
            type: this.touchTypes.voicemail,
            title: 'Voicemail Script',
            subject: 'Voicemail',
            content,
            wordCount: this.countWords(content),
            goal: 'Maintain persistence without being pushy'
        };
    }

    /**
     * Day 13: Executive Value Email
     */
    generateDay13Email(params) {
        const { companyName, persona, problemName, businessImpact, industry } = params;

        const greeting = persona ? `Hi ${persona.split(' ')[0]},` : 'Hi there,';

        const subject = `Executive brief: ${problemName} for ${industry}`;

        const body = `${greeting}

Leading ${industry} organizations are prioritizing ${this.getProblemFocus(problemName)}.

The business case is clear:
• ${businessImpact[0]}
• ${businessImpact[1]}
• ${businessImpact[2] || 'Improved operational efficiency'}

Is this on ${companyName}'s roadmap?

Best,
[Your Name]
IBM`;

        return {
            day: 13,
            type: this.touchTypes.email,
            title: 'Executive Value Email',
            subject,
            content: body,
            wordCount: this.countWords(body),
            goal: 'Present executive-level business case'
        };
    }

    /**
     * Day 15: Breakup Email
     */
    generateDay15Email(params) {
        const { companyName, persona, problemName } = params;

        const greeting = persona ? `Hi ${persona.split(' ')[0]},` : 'Hi there,';

        const subject = 'Close the loop?';

        const body = `${greeting}

I've reached out a few times regarding ${this.getProblemFocus(problemName)} at ${companyName}.

If this isn't a priority right now, I completely understand.

Should I close your file, or would you like to reconnect in Q3/Q4?

Best,
[Your Name]
IBM`;

        return {
            day: 15,
            type: this.touchTypes.email,
            title: 'Breakup Email',
            subject,
            content: body,
            wordCount: this.countWords(body),
            goal: 'Get definitive response or permission to follow up later'
        };
    }

    /**
     * Helper: Generate pain-focused subject line
     */
    generatePainSubject(companyName, problemName, industry) {
        const subjects = [
            `${this.shortenProblem(problemName)} at ${companyName}`,
            `${industry}: ${this.shortenProblem(problemName)}`,
            `Solving ${this.shortenProblem(problemName)}`,
            `${companyName} - ${this.shortenProblem(problemName)}`
        ];
        return subjects[Math.floor(Math.random() * subjects.length)];
    }

    /**
     * Helper: Get industry context
     */
    getIndustryContext(industry) {
        const contexts = {
            'food': 'scaling digital operations and improving supply chain visibility',
            'retail': 'investing in omnichannel capabilities and inventory optimization',
            'financial': 'modernizing core systems and improving fraud detection',
            'healthcare': 'improving patient outcomes and operational efficiency',
            'manufacturing': 'adopting Industry 4.0 and predictive maintenance',
            'telecommunications': 'rolling out 5G and improving customer experience',
            'energy': 'transitioning to renewable energy and smart grids',
            'transportation': 'optimizing logistics and improving supply chain visibility',
            'government': 'modernizing citizen services and improving efficiency',
            'insurance': 'automating claims and improving customer experience',
            'media': 'personalizing content and improving audience engagement',
            'education': 'improving student outcomes and operational efficiency',
            'hospitality': 'enhancing guest experience and optimizing operations',
            'pharma': 'accelerating drug discovery and improving compliance',
            'automotive': 'transitioning to electric vehicles and connected cars',
            'realestate': 'implementing smart building technologies',
            'technology': 'improving product analytics and reducing churn'
        };
        return contexts[industry] || 'investing in digital transformation';
    }

    /**
     * Helper: Get industry initiative
     */
    getIndustryInitiative(industry) {
        const initiatives = {
            'food': 'investment in digital ordering and supply chain modernization',
            'retail': 'omnichannel transformation',
            'financial': 'digital banking initiatives',
            'healthcare': 'patient experience improvements',
            'manufacturing': 'smart factory initiatives',
            'telecommunications': '5G rollout',
            'energy': 'renewable energy transition',
            'transportation': 'logistics optimization efforts',
            'government': 'digital services modernization',
            'insurance': 'claims automation initiatives',
            'media': 'content personalization efforts',
            'education': 'digital learning initiatives',
            'hospitality': 'guest experience enhancements',
            'pharma': 'R&D acceleration programs',
            'automotive': 'EV transition',
            'realestate': 'smart building deployments',
            'technology': 'product innovation'
        };
        return initiatives[industry] || 'digital transformation initiatives';
    }

    /**
     * Helper: Get industry trend
     */
    getIndustryTrend(industry) {
        const trends = {
            'food': 'digital order volumes continue growing',
            'retail': 'customer expectations evolve',
            'financial': 'regulatory requirements increase',
            'healthcare': 'value-based care models expand',
            'manufacturing': 'supply chain complexity grows',
            'telecommunications': 'network demands increase',
            'energy': 'sustainability pressures mount',
            'transportation': 'delivery expectations rise',
            'government': 'citizen service demands grow',
            'insurance': 'customer expectations shift',
            'media': 'content consumption patterns change',
            'education': 'learning models evolve',
            'hospitality': 'guest expectations increase',
            'pharma': 'regulatory requirements tighten',
            'automotive': 'vehicle technology advances',
            'realestate': 'sustainability requirements grow',
            'technology': 'competition intensifies'
        };
        return trends[industry] || 'market dynamics shift';
    }

    /**
     * Helper: Get problem focus phrase
     */
    getProblemFocus(problemName) {
        const focusMap = {
            'Inventory Forecasting Inaccuracies': 'inventory forecasting and demand planning',
            'Food Safety & Traceability Compliance': 'food safety traceability and compliance',
            'Labor Scheduling Optimization': 'labor scheduling and workforce optimization',
            'Customer Analytics Fragmentation': 'customer analytics and data unification',
            'Real-Time Fraud Detection': 'fraud detection and risk management',
            'Predictive Maintenance': 'predictive maintenance and asset optimization',
            'AI Governance & Ethics': 'AI governance and model risk management',
            'Data Silos & Integration': 'data integration and unified analytics',
            'Supply Chain Visibility Gaps': 'supply chain visibility and resilience',
            'Cybersecurity Threats': 'cybersecurity and threat detection',
            'Cloud Migration & Modernization': 'cloud migration and infrastructure modernization',
            'Customer Churn Prediction': 'customer retention and churn prevention'
        };
        return focusMap[problemName] || problemName.toLowerCase();
    }

    /**
     * Helper: Get problem area
     */
    getProblemArea(problemName) {
        if (problemName.includes('Forecasting')) return 'forecasting accuracy';
        if (problemName.includes('Traceability')) return 'supply chain traceability';
        if (problemName.includes('Scheduling')) return 'workforce efficiency';
        if (problemName.includes('Analytics')) return 'data analytics';
        if (problemName.includes('Fraud')) return 'fraud prevention';
        if (problemName.includes('Maintenance')) return 'asset reliability';
        if (problemName.includes('Governance')) return 'AI governance';
        if (problemName.includes('Silos')) return 'data integration';
        if (problemName.includes('Supply Chain')) return 'supply chain resilience';
        if (problemName.includes('Cybersecurity')) return 'security posture';
        if (problemName.includes('Cloud')) return 'infrastructure modernization';
        if (problemName.includes('Churn')) return 'customer retention';
        return 'operational efficiency';
    }

    /**
     * Helper: Get industry type
     */
    getIndustryType(industry) {
        const types = {
            'food': 'food service and restaurant',
            'retail': 'retail and e-commerce',
            'financial': 'financial services',
            'healthcare': 'healthcare and life sciences',
            'manufacturing': 'manufacturing and industrial',
            'telecommunications': 'telecommunications',
            'energy': 'energy and utilities',
            'transportation': 'transportation and logistics',
            'government': 'government and public sector',
            'insurance': 'insurance',
            'media': 'media and entertainment',
            'education': 'education',
            'hospitality': 'hospitality and travel',
            'pharma': 'pharmaceutical and biotech',
            'automotive': 'automotive',
            'realestate': 'real estate',
            'technology': 'technology and software'
        };
        return types[industry] || industry;
    }

    /**
     * Helper: Shorten problem name
     */
    shortenProblem(problemName) {
        if (problemName.length <= 40) return problemName.toLowerCase();

        const shortMap = {
            'Inventory Forecasting Inaccuracies': 'inventory forecasting',
            'Food Safety & Traceability Compliance': 'food safety traceability',
            'Labor Scheduling Optimization': 'labor scheduling',
            'Customer Analytics Fragmentation': 'customer analytics',
            'Real-Time Fraud Detection': 'fraud detection',
            'Predictive Maintenance': 'predictive maintenance',
            'AI Governance & Ethics': 'AI governance',
            'Data Silos & Integration': 'data integration',
            'Supply Chain Visibility Gaps': 'supply chain visibility',
            'Cybersecurity Threats': 'cybersecurity',
            'Cloud Migration & Modernization': 'cloud modernization',
            'Customer Churn Prediction': 'customer churn'
        };

        return shortMap[problemName] || problemName.substring(0, 40).toLowerCase();
    }

    /**
     * Helper: Count words
     */
    countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    /**
     * Export cadence to various formats
     */
    exportCadence(cadence, format = 'text') {
        if (format === 'text') {
            return this.exportAsText(cadence);
        } else if (format === 'json') {
            return JSON.stringify(cadence, null, 2);
        } else if (format === 'csv') {
            return this.exportAsCSV(cadence);
        }
        return cadence;
    }

    /**
     * Export as formatted text
     */
    exportAsText(cadenceData) {
        let output = `IBM SALES CADENCE - ${cadenceData.companyName}\n`;
        output += `Industry: ${cadenceData.industry}\n`;
        output += `Persona: ${cadenceData.persona}\n`;
        output += `Duration: ${cadenceData.duration}\n`;
        output += `Total Touches: ${cadenceData.totalTouches}\n\n`;
        output += '='.repeat(80) + '\n\n';

        cadenceData.cadence.forEach(touch => {
            output += `DAY ${touch.day}: ${touch.title}\n`;
            output += `Type: ${touch.type}\n`;
            output += `Goal: ${touch.goal}\n\n`;

            if (touch.subject) {
                output += `Subject: ${touch.subject}\n\n`;
            }

            output += `${touch.content}\n\n`;
            output += '-'.repeat(80) + '\n\n';
        });

        return output;
    }

    /**
     * Export as CSV
     */
    exportAsCSV(cadenceData) {
        let csv = 'Day,Type,Title,Subject,Content,Word Count,Goal\n';

        cadenceData.cadence.forEach(touch => {
            const content = touch.content.replace(/"/g, '""').replace(/\n/g, ' ');
            const subject = (touch.subject || '').replace(/"/g, '""');
            csv += `${touch.day},"${touch.type}","${touch.title}","${subject}","${content}",${touch.wordCount},"${touch.goal}"\n`;
        });

        return csv;
    }
}

// Create global instance
const cadenceGenerator = new CadenceGenerator();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CadenceGenerator, cadenceGenerator };
}

// Make available globally
window.CadenceGenerator = CadenceGenerator;
window.cadenceGenerator = cadenceGenerator;

// Made with Bob
