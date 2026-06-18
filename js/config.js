/**
 * IBM B2B Prospecting Engine - API Configuration
 * Configure your API keys here for real-time company research
 */

const API_CONFIG = {
    // Perplexity AI (Recommended for company research)
    // Get your API key at: https://www.perplexity.ai/settings/api
    perplexity: {
        apiKey: '', // Add your Perplexity API key here
        endpoint: 'https://api.perplexity.ai/chat/completions',
        model: 'llama-3.1-sonar-large-128k-online',
        enabled: false // Set to true when API key is added
    },

    // OpenAI (Alternative for narrative generation)
    // Get your API key at: https://platform.openai.com/api-keys
    openai: {
        apiKey: '', // Add your OpenAI API key here
        endpoint: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-4-turbo-preview',
        enabled: false // Set to true when API key is added
    },

    // News API (For company news and updates)
    // Get your API key at: https://newsapi.org/register
    newsApi: {
        apiKey: '', // Add your News API key here
        endpoint: 'https://newsapi.org/v2/everything',
        enabled: false // Set to true when API key is added
    },

    // SERP API (For Google search results)
    // Get your API key at: https://serpapi.com/manage-api-key
    serpApi: {
        apiKey: '', // Add your SERP API key here
        endpoint: 'https://serpapi.com/search',
        enabled: false // Set to true when API key is added
    },

    // Cache settings
    cache: {
        enabled: true,
        duration: 3600000 // 1 hour in milliseconds
    },

    // Rate limiting
    rateLimit: {
        enabled: true,
        maxRequestsPerMinute: 10
    }
};

/**
 * API Service Manager
 * Handles API calls with error handling and fallbacks
 */
class APIService {
    constructor() {
        this.config = API_CONFIG;
        this.cache = new Map();
        this.requestCount = 0;
        this.lastResetTime = Date.now();
    }

    /**
     * Check if any API is configured
     */
    isConfigured() {
        return this.config.perplexity.enabled ||
            this.config.openai.enabled ||
            this.config.newsApi.enabled ||
            this.config.serpApi.enabled;
    }

    /**
     * Get company intelligence using configured APIs
     */
    async getCompanyIntelligence(companyName, industry) {
        // Check rate limit
        if (!this.checkRateLimit()) {
            throw new Error('Rate limit exceeded. Please wait a moment.');
        }

        // Check cache
        const cacheKey = `intel_${companyName}_${industry}`;
        if (this.config.cache.enabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cache.duration) {
                console.log('Returning cached intelligence for:', companyName);
                return cached.data;
            }
        }

        try {
            let intelligence = null;

            // Try Perplexity first (best for research)
            if (this.config.perplexity.enabled) {
                intelligence = await this.fetchFromPerplexity(companyName, industry);
            }
            // Fallback to OpenAI
            else if (this.config.openai.enabled) {
                intelligence = await this.fetchFromOpenAI(companyName, industry);
            }
            // Use demo data if no APIs configured
            else {
                intelligence = this.getDemoIntelligence(companyName, industry);
            }

            // Cache the result
            if (this.config.cache.enabled) {
                this.cache.set(cacheKey, {
                    data: intelligence,
                    timestamp: Date.now()
                });
            }

            return intelligence;
        } catch (error) {
            console.error('API error:', error);
            // Return demo data as fallback
            return this.getDemoIntelligence(companyName, industry);
        }
    }

    /**
     * Fetch from Perplexity AI
     */
    async fetchFromPerplexity(companyName, industry) {
        const response = await fetch(this.config.perplexity.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.config.perplexity.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.config.perplexity.model,
                messages: [{
                    role: 'user',
                    content: `Research ${companyName} in the ${industry} industry. Provide:
1. Top 3 strategic opportunities (2025-2026 focus)
2. Top 3 business challenges
3. Recent changes or initiatives
4. Key performance indicators
Focus on 2025-2026 data only. Be specific and cite sources.`
                }],
                temperature: 0.2,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        return this.parsePerplexityResponse(data, companyName, industry);
    }

    /**
     * Fetch from OpenAI
     */
    async fetchFromOpenAI(companyName, industry) {
        const response = await fetch(this.config.openai.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.config.openai.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.config.openai.model,
                messages: [{
                    role: 'user',
                    content: `Research ${companyName} in the ${industry} industry. Provide:
1. Top 3 strategic opportunities (2025-2026 focus)
2. Top 3 business challenges
3. Recent changes or initiatives
Focus on 2025-2026 data. Be specific.`
                }],
                temperature: 0.2,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return this.parseOpenAIResponse(data, companyName, industry);
    }

    /**
     * Parse Perplexity response
     */
    parsePerplexityResponse(data, companyName, industry) {
        const content = data.choices?.[0]?.message?.content || '';

        return {
            company: companyName,
            industry: industry,
            dataYear: '2025-2026',
            opportunities: this.extractOpportunities(content),
            challenges: this.extractChallenges(content),
            recentChanges: this.extractChanges(content),
            kpis: this.extractKPIs(content),
            source: 'Perplexity AI',
            citations: data.citations || []
        };
    }

    /**
     * Parse OpenAI response
     */
    parseOpenAIResponse(data, companyName, industry) {
        const content = data.choices?.[0]?.message?.content || '';

        return {
            company: companyName,
            industry: industry,
            dataYear: '2025-2026',
            opportunities: this.extractOpportunities(content),
            challenges: this.extractChallenges(content),
            recentChanges: this.extractChanges(content),
            kpis: this.extractKPIs(content),
            source: 'OpenAI'
        };
    }

    /**
     * Extract opportunities from text
     */
    extractOpportunities(text) {
        const lines = text.split('\n');
        const opportunities = [];

        lines.forEach(line => {
            if (line.match(/opportunit|growth|expand|invest/i)) {
                opportunities.push(line.trim());
            }
        });

        return opportunities.slice(0, 3);
    }

    /**
     * Extract challenges from text
     */
    extractChallenges(text) {
        const lines = text.split('\n');
        const challenges = [];

        lines.forEach(line => {
            if (line.match(/challenge|problem|issue|concern|risk/i)) {
                challenges.push(line.trim());
            }
        });

        return challenges.slice(0, 3);
    }

    /**
     * Extract changes from text
     */
    extractChanges(text) {
        const lines = text.split('\n');
        const changes = [];

        lines.forEach(line => {
            if (line.match(/recent|new|launch|implement|adopt/i)) {
                changes.push(line.trim());
            }
        });

        return changes.slice(0, 3);
    }

    /**
     * Extract KPIs from text
     */
    extractKPIs(text) {
        const kpis = [];
        const matches = text.match(/\d+%|\$\d+[BMK]?|revenue|growth|margin/gi);

        if (matches) {
            kpis.push(...matches.slice(0, 5));
        }

        return kpis;
    }

    /**
     * Get demo intelligence (fallback)
     */
    getDemoIntelligence(companyName, industry) {
        return {
            company: companyName,
            industry: industry,
            dataYear: '2025-2026',
            opportunities: [
                `${companyName} is investing in digital transformation`,
                `Expanding ${industry} operations`,
                `Modernizing technology infrastructure`
            ],
            challenges: [
                `Legacy systems limiting innovation`,
                `Data silos preventing insights`,
                `Increasing operational costs`
            ],
            recentChanges: [
                `Announced new technology initiatives`,
                `Expanding market presence`,
                `Focusing on operational efficiency`
            ],
            kpis: ['Revenue growth', 'Market share', 'Customer satisfaction'],
            source: 'Demo Data',
            note: 'Configure API keys in config.js for real-time research'
        };
    }

    /**
     * Check rate limit
     */
    checkRateLimit() {
        if (!this.config.rateLimit.enabled) return true;

        const now = Date.now();
        const timeSinceReset = now - this.lastResetTime;

        // Reset counter every minute
        if (timeSinceReset >= 60000) {
            this.requestCount = 0;
            this.lastResetTime = now;
        }

        if (this.requestCount >= this.config.rateLimit.maxRequestsPerMinute) {
            return false;
        }

        this.requestCount++;
        return true;
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('API cache cleared');
    }
}

// Create global instance
const apiService = new APIService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, APIService, apiService };
}

// Make available globally
window.APIService = apiService;
window.API_CONFIG = API_CONFIG;

// Made with Bob
