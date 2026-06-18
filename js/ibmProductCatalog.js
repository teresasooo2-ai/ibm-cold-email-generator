/**
 * IBM Product Catalog
 * Comprehensive mapping of IBM products from ibm.com/products
 * Organized by category for solution mapping
 */

const IBM_PRODUCT_CATALOG = {
    // AI & Data
    ai_data: {
        category: 'AI & Data',
        products: {
            'watsonx.ai': {
                name: 'watsonx.ai',
                description: 'AI studio for training, validating, tuning and deploying AI models',
                useCases: ['Model development', 'AI deployment', 'Foundation models', 'Generative AI'],
                url: 'https://www.ibm.com/products/watsonx-ai'
            },
            'watsonx.data': {
                name: 'watsonx.data',
                description: 'Data store built on open lakehouse architecture',
                useCases: ['Data lakehouse', 'Data integration', 'Multi-cloud data', 'Analytics'],
                url: 'https://www.ibm.com/products/watsonx-data'
            },
            'watsonx.governance': {
                name: 'watsonx.governance',
                description: 'AI governance toolkit for responsible, transparent and explainable AI',
                useCases: ['AI governance', 'Model monitoring', 'Bias detection', 'Compliance'],
                url: 'https://www.ibm.com/products/watsonx-governance'
            },
            'Watson Studio': {
                name: 'Watson Studio',
                description: 'Build, run and manage AI models',
                useCases: ['Data science', 'ML operations', 'Model building', 'Collaboration'],
                url: 'https://www.ibm.com/products/watson-studio'
            },
            'Watson Machine Learning': {
                name: 'Watson Machine Learning',
                description: 'Deploy and manage ML models at scale',
                useCases: ['Model deployment', 'ML operations', 'Scoring', 'Monitoring'],
                url: 'https://www.ibm.com/products/machine-learning'
            },
            'Cognos Analytics': {
                name: 'Cognos Analytics',
                description: 'AI-powered business intelligence platform',
                useCases: ['Business intelligence', 'Reporting', 'Dashboards', 'Self-service analytics'],
                url: 'https://www.ibm.com/products/cognos-analytics'
            },
            'Planning Analytics': {
                name: 'Planning Analytics',
                description: 'Integrated planning and analytics solution',
                useCases: ['Financial planning', 'Forecasting', 'Budgeting', 'Scenario modeling'],
                url: 'https://www.ibm.com/products/planning-analytics'
            },
            'Db2': {
                name: 'Db2',
                description: 'AI-powered database for mission-critical workloads',
                useCases: ['Transactional database', 'Data warehousing', 'Hybrid cloud', 'High availability'],
                url: 'https://www.ibm.com/products/db2'
            },
            'Db2 Warehouse': {
                name: 'Db2 Warehouse',
                description: 'Cloud-native data warehouse',
                useCases: ['Data warehousing', 'Analytics', 'Big data', 'Cloud-native'],
                url: 'https://www.ibm.com/products/db2-warehouse'
            },
            'Data Fabric': {
                name: 'IBM Data Fabric',
                description: 'Unified data architecture for hybrid cloud',
                useCases: ['Data integration', 'Data governance', 'Data catalog', 'Metadata management'],
                url: 'https://www.ibm.com/data-fabric'
            },
            'DataStage': {
                name: 'DataStage',
                description: 'Data integration and ETL platform',
                useCases: ['ETL', 'Data integration', 'Data migration', 'Data quality'],
                url: 'https://www.ibm.com/products/datastage'
            },
            'InfoSphere': {
                name: 'InfoSphere',
                description: 'Data integration and governance platform',
                useCases: ['Master data management', 'Data quality', 'Data governance', 'Metadata'],
                url: 'https://www.ibm.com/products/infosphere'
            }
        }
    },

    // Automation
    automation: {
        category: 'Automation',
        products: {
            'Instana': {
                name: 'Instana',
                description: 'Real-time application performance monitoring',
                useCases: ['APM', 'Observability', 'Microservices monitoring', 'AIOps'],
                url: 'https://www.ibm.com/products/instana'
            },
            'Turbonomic': {
                name: 'Turbonomic',
                description: 'Application resource management',
                useCases: ['Resource optimization', 'Cost management', 'Performance assurance', 'Automation'],
                url: 'https://www.ibm.com/products/turbonomic'
            },
            'Apptio': {
                name: 'Apptio',
                description: 'Technology business management',
                useCases: ['IT financial management', 'Cloud cost optimization', 'Technology planning', 'Budgeting'],
                url: 'https://www.ibm.com/products/apptio'
            },
            'Maximo': {
                name: 'Maximo',
                description: 'Enterprise asset management',
                useCases: ['Asset management', 'Predictive maintenance', 'Work management', 'IoT'],
                url: 'https://www.ibm.com/products/maximo'
            },
            'Business Automation Workflow': {
                name: 'Business Automation Workflow',
                description: 'Workflow automation and case management',
                useCases: ['Process automation', 'Case management', 'Workflow', 'Document processing'],
                url: 'https://www.ibm.com/products/business-automation-workflow'
            },
            'Robotic Process Automation': {
                name: 'IBM RPA',
                description: 'Intelligent automation with RPA',
                useCases: ['RPA', 'Task automation', 'Bot development', 'Process mining'],
                url: 'https://www.ibm.com/products/robotic-process-automation'
            }
        }
    },

    // Security
    security: {
        category: 'Security',
        products: {
            'QRadar': {
                name: 'QRadar',
                description: 'Security intelligence and analytics platform',
                useCases: ['SIEM', 'Threat detection', 'Security analytics', 'Compliance'],
                url: 'https://www.ibm.com/products/qradar-siem'
            },
            'Guardium': {
                name: 'Guardium',
                description: 'Data security and protection',
                useCases: ['Data security', 'Database protection', 'Compliance', 'Data privacy'],
                url: 'https://www.ibm.com/products/guardium-data-protection'
            },
            'Verify': {
                name: 'IBM Security Verify',
                description: 'Identity and access management',
                useCases: ['IAM', 'SSO', 'MFA', 'Identity governance'],
                url: 'https://www.ibm.com/products/verify-identity'
            },
            'Resilient': {
                name: 'IBM Security Resilient',
                description: 'Security orchestration, automation and response',
                useCases: ['SOAR', 'Incident response', 'Security orchestration', 'Threat intelligence'],
                url: 'https://www.ibm.com/products/resilient-soar'
            },
            'X-Force': {
                name: 'IBM X-Force',
                description: 'Threat intelligence and research',
                useCases: ['Threat intelligence', 'Security research', 'Vulnerability management', 'Red team'],
                url: 'https://www.ibm.com/security/xforce'
            }
        }
    },

    // Integration
    integration: {
        category: 'Integration',
        products: {
            'App Connect': {
                name: 'IBM App Connect',
                description: 'Application and data integration',
                useCases: ['API management', 'Application integration', 'Data integration', 'Event streaming'],
                url: 'https://www.ibm.com/products/app-connect'
            },
            'API Connect': {
                name: 'IBM API Connect',
                description: 'API lifecycle management',
                useCases: ['API management', 'API gateway', 'Developer portal', 'API security'],
                url: 'https://www.ibm.com/products/api-connect'
            },
            'MQ': {
                name: 'IBM MQ',
                description: 'Enterprise messaging',
                useCases: ['Message queuing', 'Reliable messaging', 'Integration', 'Event-driven architecture'],
                url: 'https://www.ibm.com/products/mq'
            },
            'Event Streams': {
                name: 'IBM Event Streams',
                description: 'Event streaming platform based on Apache Kafka',
                useCases: ['Event streaming', 'Real-time data', 'Kafka', 'Event-driven architecture'],
                url: 'https://www.ibm.com/products/event-streams'
            }
        }
    },

    // Hybrid Cloud & Infrastructure
    hybrid_cloud: {
        category: 'Hybrid Cloud & Infrastructure',
        products: {
            'OpenShift': {
                name: 'Red Hat OpenShift',
                description: 'Enterprise Kubernetes platform',
                useCases: ['Container platform', 'Kubernetes', 'Cloud-native', 'DevOps'],
                url: 'https://www.ibm.com/products/openshift'
            },
            'Cloud Pak for Data': {
                name: 'Cloud Pak for Data',
                description: 'Data and AI platform',
                useCases: ['Data platform', 'AI platform', 'Data fabric', 'Analytics'],
                url: 'https://www.ibm.com/products/cloud-pak-for-data'
            },
            'Cloud Pak for Integration': {
                name: 'Cloud Pak for Integration',
                description: 'Integration platform',
                useCases: ['Integration', 'API management', 'Messaging', 'Event streaming'],
                url: 'https://www.ibm.com/products/cloud-pak-for-integration'
            },
            'Cloud Pak for Security': {
                name: 'Cloud Pak for Security',
                description: 'Security platform',
                useCases: ['Security', 'Threat management', 'SOAR', 'Data security'],
                url: 'https://www.ibm.com/products/cloud-pak-for-security'
            },
            'Cloud Pak for Business Automation': {
                name: 'Cloud Pak for Business Automation',
                description: 'Business automation platform',
                useCases: ['Process automation', 'Workflow', 'RPA', 'Document processing'],
                url: 'https://www.ibm.com/products/cloud-pak-for-business-automation'
            },
            'Power Systems': {
                name: 'IBM Power Systems',
                description: 'Enterprise servers for mission-critical workloads',
                useCases: ['Enterprise servers', 'High availability', 'SAP HANA', 'AIX'],
                url: 'https://www.ibm.com/power'
            },
            'Storage': {
                name: 'IBM Storage',
                description: 'Enterprise storage solutions',
                useCases: ['Block storage', 'File storage', 'Object storage', 'Data protection'],
                url: 'https://www.ibm.com/storage'
            },
            'FlashSystem': {
                name: 'IBM FlashSystem',
                description: 'All-flash storage arrays',
                useCases: ['Flash storage', 'High performance', 'Data reduction', 'Cyber resilience'],
                url: 'https://www.ibm.com/flashsystem'
            }
        }
    },

    // Supply Chain & Operations
    supply_chain: {
        category: 'Supply Chain & Operations',
        products: {
            'Supply Chain Intelligence Suite': {
                name: 'IBM Supply Chain Intelligence Suite',
                description: 'AI-powered supply chain optimization',
                useCases: ['Supply chain visibility', 'Demand forecasting', 'Inventory optimization', 'Risk management'],
                url: 'https://www.ibm.com/supply-chain'
            },
            'Sterling Order Management': {
                name: 'IBM Sterling Order Management',
                description: 'Omnichannel order management',
                useCases: ['Order management', 'Inventory visibility', 'Fulfillment', 'Returns'],
                url: 'https://www.ibm.com/products/order-management'
            },
            'Sterling B2B Integration': {
                name: 'IBM Sterling B2B Integration',
                description: 'B2B integration and EDI',
                useCases: ['B2B integration', 'EDI', 'Partner onboarding', 'Supply chain collaboration'],
                url: 'https://www.ibm.com/products/b2b-integration'
            }
        }
    },

    // Sustainability
    sustainability: {
        category: 'Sustainability',
        products: {
            'Environmental Intelligence Suite': {
                name: 'IBM Environmental Intelligence Suite',
                description: 'Climate risk analytics and carbon accounting',
                useCases: ['Climate risk', 'Carbon accounting', 'ESG reporting', 'Sustainability'],
                url: 'https://www.ibm.com/products/environmental-intelligence-suite'
            },
            'Envizi': {
                name: 'IBM Envizi',
                description: 'ESG data and reporting platform',
                useCases: ['ESG reporting', 'Carbon accounting', 'Sustainability management', 'Compliance'],
                url: 'https://www.ibm.com/products/envizi'
            }
        }
    }
};

/**
 * Product Mapper
 * Maps business problems to relevant IBM products
 */
class IBMProductMapper {
    constructor() {
        this.catalog = IBM_PRODUCT_CATALOG;
    }

    /**
     * Get products by category
     */
    getProductsByCategory(category) {
        return this.catalog[category]?.products || {};
    }

    /**
     * Get product by name
     */
    getProduct(productName) {
        for (const category in this.catalog) {
            const products = this.catalog[category].products;
            if (products[productName]) {
                return {
                    ...products[productName],
                    category: this.catalog[category].category
                };
            }
        }
        return null;
    }

    /**
     * Map problem to products
     */
    mapProblemToProducts(problemId) {
        // Use existing problem-solution mapping
        const problem = window.ProblemSolutionMap?.getProblemById(problemId);
        if (!problem) return [];

        // Get full product details
        return problem.products.map(productName => {
            return this.getProduct(productName) || { name: productName };
        });
    }

    /**
     * Search products by use case
     */
    searchByUseCase(useCase) {
        const results = [];
        const lowerUseCase = useCase.toLowerCase();

        for (const category in this.catalog) {
            const products = this.catalog[category].products;
            for (const productName in products) {
                const product = products[productName];
                const matchesUseCase = product.useCases.some(uc =>
                    uc.toLowerCase().includes(lowerUseCase)
                );
                if (matchesUseCase) {
                    results.push({
                        ...product,
                        category: this.catalog[category].category
                    });
                }
            }
        }

        return results;
    }

    /**
     * Get all products as flat list
     */
    getAllProducts() {
        const allProducts = [];

        for (const category in this.catalog) {
            const products = this.catalog[category].products;
            for (const productName in products) {
                allProducts.push({
                    ...products[productName],
                    category: this.catalog[category].category
                });
            }
        }

        return allProducts;
    }

    /**
     * Get product recommendations based on narrative
     */
    getRecommendationsFromNarrative(narrative) {
        // Extract key concepts from narrative
        const concepts = this.extractConcepts(narrative.fullNarrative);

        // Search for matching products
        const recommendations = [];
        concepts.forEach(concept => {
            const matches = this.searchByUseCase(concept);
            recommendations.push(...matches);
        });

        // Remove duplicates
        const unique = [...new Map(recommendations.map(p => [p.name, p])).values()];

        return unique.slice(0, 5); // Top 5 recommendations
    }

    /**
     * Extract key concepts from text
     */
    extractConcepts(text) {
        const keywords = [
            'forecasting', 'inventory', 'supply chain', 'data', 'analytics',
            'security', 'fraud', 'compliance', 'automation', 'AI', 'cloud',
            'integration', 'monitoring', 'governance', 'maintenance'
        ];

        const lowerText = text.toLowerCase();
        return keywords.filter(keyword => lowerText.includes(keyword));
    }
}

// Create global instance
const ibmProductMapper = new IBMProductMapper();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IBM_PRODUCT_CATALOG,
        IBMProductMapper,
        ibmProductMapper
    };
}

// Make available globally
window.IBMProductCatalog = {
    IBM_PRODUCT_CATALOG,
    IBMProductMapper,
    ibmProductMapper
};

// Made with Bob
