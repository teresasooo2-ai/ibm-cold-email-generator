/**
 * Search Service for Real-Time Company and Industry Research
 * 
 * This service integrates with external APIs to fetch:
 * - Company-specific information and news
 * - Industry regulations and new laws
 * - Technology trends and challenges
 * - Competitive landscape data
 */

class SearchService {
    constructor() {
        this.config = {
            // API Configuration - Replace with your actual API keys
            perplexityApiKey: 'YOUR_PERPLEXITY_API_KEY', // Recommended for research
            serpApiKey: 'YOUR_SERP_API_KEY', // For Google search results
            newsApiKey: 'YOUR_NEWS_API_KEY', // For news articles

            // API Endpoints
            perplexityEndpoint: 'https://api.perplexity.ai/chat/completions',
            serpEndpoint: 'https://serpapi.com/search',
            newsEndpoint: 'https://newsapi.org/v2/everything',

            // Cache settings
            cacheEnabled: true,
            cacheDuration: 3600000 // 1 hour in milliseconds
        };

        this.cache = new Map();
    }

    /**
     * Main search function for company-specific research
     * @param {string} companyName - Name of the company
     * @param {string} industry - Industry sector
     * @returns {Promise<Object>} Research results
     */
    async searchCompanyInfo(companyName, industry) {
        const cacheKey = `company_${companyName}_${industry}`;

        // Check cache first
        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheDuration) {
                console.log('Returning cached results for:', companyName);
                return cached.data;
            }
        }

        try {
            // Parallel API calls for comprehensive research
            const [companyNews, industryRegulations, techTrends] = await Promise.all([
                this.searchCompanyNews(companyName, industry),
                this.searchIndustryRegulations(industry),
                this.searchTechnologyTrends(industry)
            ]);

            const results = {
                company: companyName,
                industry: industry,
                timestamp: new Date().toISOString(),
                news: companyNews,
                regulations: industryRegulations,
                trends: techTrends,
                insights: this.generateInsights(companyNews, industryRegulations, techTrends)
            };

            // Cache the results
            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: results,
                    timestamp: Date.now()
                });
            }

            return results;
        } catch (error) {
            console.error('Search error:', error);
            return this.getFallbackData(companyName, industry);
        }
    }

    /**
     * Search for company-specific news and developments
     */
    async searchCompanyNews(companyName, industry) {
        // Using Perplexity AI for intelligent research
        if (this.config.perplexityApiKey !== 'YOUR_PERPLEXITY_API_KEY') {
            try {
                const response = await fetch(this.config.perplexityEndpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.config.perplexityApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'llama-3.1-sonar-large-128k-online',
                        messages: [{
                            role: 'user',
                            content: `Research ${companyName} in the ${industry} industry. Find:
1. Recent technology investments or initiatives
2. Current business challenges or pain points
3. Digital transformation efforts
4. Data and AI adoption status
Provide concise, factual information from 2026.`
                        }],
                        temperature: 0.2,
                        max_tokens: 500
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return this.parsePerplexityResponse(data);
                }
            } catch (error) {
                console.error('Perplexity API error:', error);
            }
        }

        // Fallback to News API
        return this.searchNewsAPI(companyName, industry);
    }

    /**
     * Search for industry-specific regulations and new laws
     */
    async searchIndustryRegulations(industry) {
        const query = `${industry} industry regulations 2026 compliance requirements new laws`;

        if (this.config.perplexityApiKey !== 'YOUR_PERPLEXITY_API_KEY') {
            try {
                const response = await fetch(this.config.perplexityEndpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.config.perplexityApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'llama-3.1-sonar-large-128k-online',
                        messages: [{
                            role: 'user',
                            content: `What are the latest regulations, compliance requirements, and new laws affecting the ${industry} industry in 2026? Focus on:
1. Data privacy and security regulations
2. AI governance and ethics requirements
3. Industry-specific compliance mandates
4. Technology adoption requirements
Provide specific, actionable information.`
                        }],
                        temperature: 0.2,
                        max_tokens: 400
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return this.parseRegulationsResponse(data);
                }
            } catch (error) {
                console.error('Regulations search error:', error);
            }
        }

        return this.getFallbackRegulations(industry);
    }

    /**
     * Search for technology trends and challenges
     */
    async searchTechnologyTrends(industry) {
        if (this.config.perplexityApiKey !== 'YOUR_PERPLEXITY_API_KEY') {
            try {
                const response = await fetch(this.config.perplexityEndpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.config.perplexityApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'llama-3.1-sonar-large-128k-online',
                        messages: [{
                            role: 'user',
                            content: `What are the top technology trends and challenges in the ${industry} industry for 2026? Focus on:
1. AI and machine learning adoption
2. Data management and analytics needs
3. Cloud infrastructure requirements
4. Automation and efficiency gaps
Provide specific, current information.`
                        }],
                        temperature: 0.2,
                        max_tokens: 400
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return this.parseTrendsResponse(data);
                }
            } catch (error) {
                console.error('Trends search error:', error);
            }
        }

        return this.getFallbackTrends(industry);
    }

    /**
     * Search using News API as fallback
     */
    async searchNewsAPI(companyName, industry) {
        if (this.config.newsApiKey === 'YOUR_NEWS_API_KEY') {
            return { articles: [], summary: 'Configure News API key to fetch real-time news' };
        }

        try {
            const query = encodeURIComponent(`${companyName} ${industry} technology AI data`);
            const url = `${this.config.newsEndpoint}?q=${query}&sortBy=publishedAt&language=en&apiKey=${this.config.newsApiKey}`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return {
                    articles: data.articles.slice(0, 5).map(article => ({
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        publishedAt: article.publishedAt
                    })),
                    summary: this.summarizeNews(data.articles)
                };
            }
        } catch (error) {
            console.error('News API error:', error);
        }

        return { articles: [], summary: 'Unable to fetch news' };
    }

    /**
     * Parse Perplexity AI response
     */
    parsePerplexityResponse(data) {
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const content = data.choices[0].message.content;
            return {
                summary: content,
                sources: data.citations || [],
                confidence: 'high'
            };
        }
        return { summary: 'No data available', sources: [], confidence: 'low' };
    }

    /**
     * Parse regulations response
     */
    parseRegulationsResponse(data) {
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const content = data.choices[0].message.content;
            return {
                regulations: this.extractRegulations(content),
                summary: content,
                lastUpdated: new Date().toISOString()
            };
        }
        return { regulations: [], summary: 'No regulations data', lastUpdated: null };
    }

    /**
     * Parse trends response
     */
    parseTrendsResponse(data) {
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const content = data.choices[0].message.content;
            return {
                trends: this.extractTrends(content),
                summary: content,
                relevance: 'high'
            };
        }
        return { trends: [], summary: 'No trends data', relevance: 'low' };
    }

    /**
     * Extract structured regulations from text
     */
    extractRegulations(text) {
        const regulations = [];
        const lines = text.split('\n');

        lines.forEach(line => {
            if (line.match(/^\d+\.|^-|^•/)) {
                const cleaned = line.replace(/^\d+\.|^-|^•/, '').trim();
                if (cleaned.length > 10) {
                    regulations.push(cleaned);
                }
            }
        });

        return regulations.slice(0, 5);
    }

    /**
     * Extract structured trends from text
     */
    extractTrends(text) {
        const trends = [];
        const lines = text.split('\n');

        lines.forEach(line => {
            if (line.match(/^\d+\.|^-|^•/)) {
                const cleaned = line.replace(/^\d+\.|^-|^•/, '').trim();
                if (cleaned.length > 10) {
                    trends.push(cleaned);
                }
            }
        });

        return trends.slice(0, 5);
    }

    /**
     * Generate insights from all research data
     */
    generateInsights(news, regulations, trends) {
        const insights = [];

        if (regulations.regulations && regulations.regulations.length > 0) {
            insights.push({
                type: 'compliance',
                priority: 'high',
                message: `New compliance requirements detected in ${regulations.regulations.length} areas`,
                action: 'IBM can help ensure regulatory compliance with automated governance solutions'
            });
        }

        if (trends.trends && trends.trends.length > 0) {
            insights.push({
                type: 'opportunity',
                priority: 'medium',
                message: `${trends.trends.length} technology trends identified`,
                action: 'IBM Data & AI solutions can address these emerging needs'
            });
        }

        if (news.summary && news.summary.length > 50) {
            insights.push({
                type: 'context',
                priority: 'medium',
                message: 'Recent company developments found',
                action: 'Tailor IBM solutions to current business initiatives'
            });
        }

        return insights;
    }

    /**
     * Summarize news articles
     */
    summarizeNews(articles) {
        if (!articles || articles.length === 0) return 'No recent news found';

        const topics = articles.slice(0, 3).map(a => a.title).join('. ');
        return topics.substring(0, 200) + '...';
    }

    /**
     * Fallback data when APIs are not configured
     */
    getFallbackData(companyName, industry) {
        return {
            company: companyName,
            industry: industry,
            timestamp: new Date().toISOString(),
            news: {
                summary: 'Configure API keys to fetch real-time company news and developments',
                articles: []
            },
            regulations: this.getFallbackRegulations(industry),
            trends: this.getFallbackTrends(industry),
            insights: [{
                type: 'setup',
                priority: 'high',
                message: 'API integration not configured',
                action: 'Add API keys to enable real-time research capabilities'
            }]
        };
    }

    /**
     * Fallback regulations data
     */
    getFallbackRegulations(industry) {
        const commonRegulations = {
            'Healthcare': ['HIPAA compliance', 'FDA 21 CFR Part 11', 'HITECH Act requirements'],
            'Financial Services': ['SOX compliance', 'PCI DSS', 'GDPR/CCPA data privacy'],
            'Retail': ['PCI DSS', 'Consumer privacy laws', 'E-commerce regulations'],
            'Manufacturing': ['ISO standards', 'Supply chain transparency', 'Environmental compliance']
        };

        return {
            regulations: commonRegulations[industry] || ['Data privacy compliance', 'Industry-specific regulations', 'Security standards'],
            summary: 'Configure API to fetch current regulations',
            lastUpdated: null
        };
    }

    /**
     * Fallback trends data
     */
    getFallbackTrends(industry) {
        return {
            trends: [
                'AI and machine learning adoption',
                'Cloud infrastructure modernization',
                'Data analytics and business intelligence',
                'Automation and process optimization',
                'Cybersecurity enhancement'
            ],
            summary: 'Configure API to fetch current industry trends',
            relevance: 'medium'
        };
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('Search cache cleared');
    }

    /**
     * Update API configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('Search service configuration updated');
    }
}

// Export for use in other modules
window.SearchService = SearchService;

// Made with Bob
