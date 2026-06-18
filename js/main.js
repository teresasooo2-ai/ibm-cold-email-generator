/**
 * IBM Sales Cadence Engine - Main Application Controller
 * Orchestrates the 5-screen workflow
 */

class SalesCadenceApp {
    constructor() {
        this.currentScreen = 1;
        this.appState = {
            companies: [],
            practiceArea: '',
            industry: '',
            selectedCompany: null,
            selectedProblem: null,
            selectedPersonas: [], // Changed to array for multi-select
            communicationStyle: 'professional',
            accountIntelligence: null,
            cadence: null
        };

        // Initialize engines
        this.personalizationEngine = new PersonalizationEngine();
        this.styleEngine = new CommunicationStyleEngine();
        this.cultureIntelligence = new CompanyCultureIntelligence();

        this.init();
    }

    init() {
        this.attachEventListeners();
        this.showScreen(1);
    }

    attachEventListeners() {
        // Screen 1: Research button
        document.getElementById('researchBtn')?.addEventListener('click', () => this.handleResearch());

        // Screen 5: Export buttons
        document.getElementById('exportCSVBtn')?.addEventListener('click', () => this.exportCadence('csv'));
        document.getElementById('exportOutreachBtn')?.addEventListener('click', () => this.exportForCRM('outreach'));
        document.getElementById('exportSalesloftBtn')?.addEventListener('click', () => this.exportForCRM('salesloft'));
        document.getElementById('exportApolloBtn')?.addEventListener('click', () => this.exportForCRM('apollo'));
        document.getElementById('exportHubSpotBtn')?.addEventListener('click', () => this.exportForCRM('hubspot'));
        document.getElementById('exportSalesforceBtn')?.addEventListener('click', () => this.exportForCRM('salesforce'));
        document.getElementById('copyCadenceBtn')?.addEventListener('click', () => this.copyCadence());
        document.getElementById('startOverBtn')?.addEventListener('click', () => this.startOver());
    }

    /**
     * Screen navigation
     */
    showScreen(screenNumber) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(`screen${screenNumber}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Update progress bar
        this.updateProgressBar(screenNumber);
        this.currentScreen = screenNumber;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgressBar(activeStep) {
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');

            if (stepNum === activeStep) {
                step.classList.add('active');
            } else if (stepNum < activeStep) {
                step.classList.add('completed');
            }
        });
    }

    /**
     * Screen 1: Handle Research
     */
    async handleResearch() {
        const companyInput = document.getElementById('companyInput').value.trim();
        const practiceArea = document.getElementById('practiceArea').value;
        const industry = document.getElementById('industrySelect').value;

        // Validation
        if (!companyInput) {
            this.showError('Please enter at least one company name');
            return;
        }

        if (!practiceArea) {
            this.showError('Please select an IBM practice area');
            return;
        }

        // Parse companies
        const companies = this.parseCompanies(companyInput);

        this.appState.companies = companies;
        this.appState.practiceArea = practiceArea;
        this.appState.industry = industry;

        // Show loading
        this.showLoading(`Researching ${companies.length} account${companies.length > 1 ? 's' : ''}...`);

        // Simulate research delay
        await this.delay(1500);

        // If multiple companies, show ranking table
        if (companies.length > 1) {
            this.generateBatchIntelligence();
        } else {
            // Single company - go directly to detailed view
            this.appState.selectedCompany = companies[0];
            this.generateAccountIntelligence();
        }

        // Move to screen 2
        this.showScreen(2);
    }

    parseCompanies(input) {
        // Split by newlines or commas
        return input
            .split(/[\n,]+/)
            .map(c => c.trim())
            .filter(c => c.length > 0);
    }

    /**
     * Screen 2: Generate Batch Intelligence (Multiple Companies)
     */
    generateBatchIntelligence() {
        const companies = this.appState.companies;

        // Generate intelligence for each company
        const companyIntelligence = companies.map(company => {
            const industry = this.appState.industry || this.detectIndustry(company);
            const problems = window.ProblemSolutionMap.getProblemsByIndustry(industry);
            const opportunityScore = this.calculateOverallScore(problems, industry);
            const topProblem = problems[0];

            return {
                company,
                industry,
                opportunityScore,
                topProblem: topProblem ? topProblem.name : 'N/A',
                productFit: topProblem ? topProblem.ibmFit : 'N/A',
                problems
            };
        });

        // Sort by opportunity score (highest first)
        companyIntelligence.sort((a, b) => b.opportunityScore - a.opportunityScore);

        this.appState.batchIntelligence = companyIntelligence;
        this.renderBatchIntelligence();
    }

    /**
     * Screen 2: Generate Account Intelligence (Single Company)
     */
    generateAccountIntelligence() {
        const company = this.appState.selectedCompany;
        const industry = this.appState.industry || this.detectIndustry(company);

        // Get problems for industry
        const problems = window.ProblemSolutionMap.getProblemsByIndustry(industry);

        // Calculate opportunity score
        const opportunityScore = this.calculateOverallScore(problems, industry);

        this.appState.accountIntelligence = {
            company,
            industry,
            problems: problems.slice(0, 5), // Top 5 problems
            opportunityScore
        };

        this.renderAccountIntelligence();
    }

    detectIndustry(companyName) {
        const lowerName = companyName.toLowerCase();

        if (lowerName.includes('chipotle') || lowerName.includes('mcdonald') || lowerName.includes('starbucks')) {
            return 'food';
        }
        if (lowerName.includes('target') || lowerName.includes('walmart') || lowerName.includes('amazon')) {
            return 'retail';
        }
        if (lowerName.includes('chevron') || lowerName.includes('exxon') || lowerName.includes('shell')) {
            return 'energy';
        }
        if (lowerName.includes('hca') || lowerName.includes('kaiser') || lowerName.includes('mayo')) {
            return 'healthcare';
        }

        return 'retail'; // Default
    }

    calculateOverallScore(problems, industry) {
        if (problems.length === 0) return 50;

        const avgScore = problems.reduce((sum, p) => {
            return sum + window.ProblemSolutionMap.calculateOpportunityScore('', industry, p.id);
        }, 0) / problems.length;

        return Math.round(avgScore);
    }

    renderBatchIntelligence() {
        const batchIntel = this.appState.batchIntelligence;
        const container = document.getElementById('accountIntelligence');

        let html = `
            <div class="batch-intelligence-header">
                <h3>Account Opportunity Ranking</h3>
                <p class="section-description">Researched ${batchIntel.length} companies - Click any row to drill into details</p>
            </div>

            <div class="problems-table">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Company</th>
                            <th>Industry</th>
                            <th>Opportunity Score</th>
                            <th>Top Problem</th>
                            <th>Product Fit</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        batchIntel.forEach((intel, index) => {
            const scoreClass = intel.opportunityScore >= 80 ? 'excellent' :
                intel.opportunityScore >= 60 ? 'strong' : 'good';

            html += `
                <tr class="company-row" data-company="${intel.company}" style="cursor: pointer;">
                    <td><strong>${index + 1}</strong></td>
                    <td><strong>${intel.company}</strong></td>
                    <td>${this.getIndustryName(intel.industry)}</td>
                    <td>
                        <div class="score-badge score-${scoreClass}">${intel.opportunityScore}</div>
                    </td>
                    <td>${intel.topProblem}</td>
                    <td><span class="badge badge-${intel.productFit.toLowerCase()}">${intel.productFit}</span></td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #f4f4f4; border-radius: 4px;">
                <strong>💡 Tip:</strong> Click on any company row to view detailed problems and generate a sales cadence.
            </div>
        `;

        container.innerHTML = html;

        // Add click handlers to company rows
        document.querySelectorAll('.company-row').forEach(row => {
            row.addEventListener('click', () => {
                const companyName = row.dataset.company;
                this.selectCompanyFromBatch(companyName);
            });
        });
    }

    selectCompanyFromBatch(companyName) {
        // Set selected company
        this.appState.selectedCompany = companyName;

        // Generate detailed intelligence for this company
        this.generateAccountIntelligence();

        // Re-render with single company view
        this.renderAccountIntelligence();
    }

    renderAccountIntelligence() {
        const intel = this.appState.accountIntelligence;
        const container = document.getElementById('accountIntelligence');

        // Add back button if we came from batch view
        const backButton = this.appState.batchIntelligence ?
            `<button class="btn-secondary" onclick="app.backToBatchView()" style="margin-bottom: 16px;">
                ← Back to All Companies
            </button>` : '';

        let html = `
            ${backButton}
            <div class="intelligence-summary">
                <div class="intel-header">
                    <h3>${intel.company}</h3>
                    <div class="opportunity-score">
                        <div class="score-circle">${intel.opportunityScore}</div>
                        <span>Opportunity Score</span>
                    </div>
                </div>
                
                <div class="intel-details">
                    <div class="intel-item">
                        <strong>Industry:</strong> ${this.getIndustryName(intel.industry)}
                    </div>
                </div>
            </div>

            <h3 style="margin-top: 32px;">Top Business Problems</h3>
            <p class="section-description">Ranked by severity and IBM fit</p>
            
            <div class="problems-table">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Problem</th>
                            <th>Severity</th>
                            <th>IBM Fit</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        intel.problems.forEach((problem, index) => {
            html += `
                <tr class="problem-row" data-problem-id="${problem.id}">
                    <td><strong>${index + 1}</strong></td>
                    <td>${problem.name}</td>
                    <td><span class="badge badge-${problem.severity.toLowerCase()}">${problem.severity}</span></td>
                    <td><span class="badge badge-${problem.ibmFit.toLowerCase()}">${problem.ibmFit}</span></td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>

            <button class="btn-primary" style="margin-top: 24px;" onclick="app.moveToScreen3()">
                Select Problem to Target
            </button>
        `;

        container.innerHTML = html;

        // Add click handlers to problem rows
        document.querySelectorAll('.problem-row').forEach(row => {
            row.addEventListener('click', () => {
                const problemId = row.dataset.problemId;
                this.selectProblem(problemId);
            });
        });
    }

    backToBatchView() {
        this.renderBatchIntelligence();
    }

    getIndustryName(industryKey) {
        const names = {
            'food': 'Food & Beverage',
            'retail': 'Retail & E-commerce',
            'financial': 'Financial Services',
            'healthcare': 'Healthcare & Life Sciences',
            'manufacturing': 'Manufacturing',
            'energy': 'Energy & Utilities',
            'telecommunications': 'Telecommunications',
            'transportation': 'Transportation & Logistics',
            'government': 'Government',
            'insurance': 'Insurance',
            'automotive': 'Automotive',
            'pharma': 'Pharmaceutical & Biotech'
        };
        return names[industryKey] || industryKey;
    }

    /**
     * Screen 3: Problem Selection
     */
    moveToScreen3() {
        this.showScreen(3);
        this.renderProblemSelection();
    }

    renderProblemSelection() {
        const intel = this.appState.accountIntelligence;
        const container = document.getElementById('problemSelection');

        let html = '<div class="problem-cards">';

        intel.problems.forEach(problem => {
            html += `
                <div class="problem-card" data-problem-id="${problem.id}">
                    <h3>${problem.name}</h3>
                    <p>${problem.description}</p>
                    
                    <div class="problem-meta">
                        <span class="badge badge-${problem.severity.toLowerCase()}">${problem.severity} Severity</span>
                        <span class="badge badge-${problem.ibmFit.toLowerCase()}">${problem.ibmFit} IBM Fit</span>
                    </div>

                    <div class="problem-products">
                        <strong>IBM Solutions:</strong>
                        <ul>
                            ${problem.products.slice(0, 3).map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="problem-impact">
                        <strong>Business Impact:</strong>
                        <ul>
                            ${problem.businessImpact.slice(0, 2).map(i => `<li>${i}</li>`).join('')}
                        </ul>
                    </div>

                    <button class="btn-secondary" onclick="app.selectProblem('${problem.id}')">
                        Select This Problem
                    </button>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    selectProblem(problemId) {
        this.appState.selectedProblem = window.ProblemSolutionMap.getProblemById(problemId);
        this.showScreen(4);
        this.renderBuyingCommittee();
    }

    /**
     * Screen 4: Buying Committee
     */
    renderBuyingCommittee() {
        const problem = this.appState.selectedProblem;
        const committee = window.PersonaIntelligence.buyingCommittee.buildCommittee(
            problem.id,
            this.appState.accountIntelligence.industry
        );

        const container = document.getElementById('buyingCommittee');

        let html = `
            <div class="committee-overview">
                <h3>Recommended Buying Committee for: ${problem.name}</h3>
                <p>Target these personas in order of priority</p>
            </div>
        `;

        // Primary personas
        html += `
            <div class="persona-group">
                <h4>Primary Decision Makers</h4>
                <p class="group-description">Own the problem and budget</p>
                <div class="persona-cards">
        `;

        committee.primary.forEach(persona => {
            html += this.renderPersonaCard(persona, 'primary');
        });

        html += '</div></div>';

        // Secondary personas
        html += `
            <div class="persona-group">
                <h4>Secondary Stakeholders</h4>
                <p class="group-description">Provide approval or support</p>
                <div class="persona-cards">
        `;

        committee.secondary.forEach(persona => {
            html += this.renderPersonaCard(persona, 'secondary');
        });

        html += '</div></div>';

        // Influencers
        html += `
            <div class="persona-group">
                <h4>Technical Influencers</h4>
                <p class="group-description">Provide input and recommendations</p>
                <div class="persona-cards">
        `;

        committee.influencers.forEach(persona => {
            html += this.renderPersonaCard(persona, 'influencer');
        });

        html += '</div></div>';

        container.innerHTML = html;

        // Render persona selection with checkboxes
        this.renderPersonaSelection(committee);

        // Render communication style selector
        this.renderCommunicationStyleSelector();

        // Attach generate button handler
        document.getElementById('generateCadenceBtn')?.addEventListener('click', () => {
            this.generateCadence();
        });
    }

    renderPersonaCard(persona, type) {
        return `
            <div class="persona-card ${type}">
                <h5>${persona.title}</h5>
                <div class="persona-role">${persona.decisionRole}</div>
                <div class="persona-concerns">
                    <strong>Key Concerns:</strong>
                    <ul>
                        ${persona.concerns.slice(0, 3).map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    renderPersonaSelection(committee) {
        const container = document.getElementById('personaList');

        let html = '';

        // Primary personas with checkboxes
        html += '<div class="persona-checkbox-group"><h4>Primary Personas</h4>';
        committee.primary.forEach(persona => {
            html += `
                <label class="persona-checkbox-item">
                    <input type="checkbox" name="targetPersonas" value="${persona.title}" data-type="primary">
                    <span>☑ ${persona.title}</span>
                </label>
            `;
        });
        html += '</div>';

        // Secondary personas with checkboxes
        html += '<div class="persona-checkbox-group"><h4>Secondary Personas</h4>';
        committee.secondary.forEach(persona => {
            html += `
                <label class="persona-checkbox-item">
                    <input type="checkbox" name="targetPersonas" value="${persona.title}" data-type="secondary">
                    <span>☑ ${persona.title}</span>
                </label>
            `;
        });
        html += '</div>';

        // Influencers with checkboxes
        html += '<div class="persona-checkbox-group"><h4>Influencers</h4>';
        committee.influencers.forEach(persona => {
            html += `
                <label class="persona-checkbox-item">
                    <input type="checkbox" name="targetPersonas" value="${persona.title}" data-type="influencer">
                    <span>☑ ${persona.title}</span>
                </label>
            `;
        });
        html += '</div>';

        container.innerHTML = html;
    }

    renderCommunicationStyleSelector() {
        // Get company culture suggestion
        const companyName = this.appState.selectedCompany;
        const suggestion = this.cultureIntelligence.suggestStyle(companyName);

        // Set default style
        this.appState.communicationStyle = suggestion.style;

        // Display suggestion
        const suggestionContainer = document.getElementById('cultureSuggestion');
        if (suggestionContainer) {
            suggestionContainer.innerHTML = `
                <div class="culture-suggestion-box">
                    <strong>💡 Suggested Style for ${companyName}:</strong>
                    <span class="suggested-style">${this.styleEngine.getStyle(suggestion.style).name}</span>
                    <span class="suggestion-reason">${suggestion.reason}</span>
                </div>
            `;
        }

        // Render style selector
        const container = document.getElementById('styleSelector');
        if (!container) return;

        const styles = this.styleEngine.getAllStyles();

        let html = '<div class="style-options">';

        styles.forEach(style => {
            const isRecommended = style.key === suggestion.style;
            html += `
                <label class="style-option ${isRecommended ? 'recommended' : ''}">
                    <input type="radio" name="communicationStyle" value="${style.key}" ${isRecommended ? 'checked' : ''}>
                    <div class="style-content">
                        <strong>${style.name}</strong>
                        <p>${style.description}</p>
                        ${isRecommended ? '<span class="recommended-badge">Recommended</span>' : ''}
                    </div>
                </label>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Add change listener to update appState
        document.querySelectorAll('input[name="communicationStyle"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.appState.communicationStyle = e.target.value;
            });
        });
    }

    /**
     * Screen 5: Generate Cadence
     */
    async generateCadence() {
        try {
            // Get selected personas (checkboxes)
            const selectedPersonas = Array.from(document.querySelectorAll('input[name="targetPersonas"]:checked'))
                .map(cb => cb.value);

            if (selectedPersonas.length === 0) {
                alert('⚠️ Please select at least one target persona from the checkboxes above.');
                return;
            }

            // Get selected communication style (use default if none selected)
            const selectedStyleElement = document.querySelector('input[name="communicationStyle"]:checked');
            const selectedStyle = selectedStyleElement ? selectedStyleElement.value : this.appState.communicationStyle;

            if (!selectedStyle) {
                // Fallback to professional if still not set
                this.appState.communicationStyle = 'professional';
            } else {
                this.appState.communicationStyle = selectedStyle;
            }

            this.appState.selectedPersonas = selectedPersonas;

            // Show loading
            this.showLoading(`Generating cadences for ${selectedPersonas.length} persona${selectedPersonas.length > 1 ? 's' : ''}...`);

            await this.delay(2000);

            // Generate cadence for each persona
            const problem = this.appState.selectedProblem;
            const allCadences = [];

            for (const persona of selectedPersonas) {
                const cadenceParams = {
                    companyName: this.appState.selectedCompany,
                    industry: this.appState.accountIntelligence.industry,
                    problemId: problem.id,
                    problemName: problem.name,
                    persona: persona,
                    products: problem.products,
                    businessImpact: problem.businessImpact,
                    painPoints: problem.painPoints,
                    communicationStyle: this.appState.communicationStyle
                };

                const cadenceResult = window.cadenceGenerator.generateCadence(cadenceParams);

                // Apply personalization variables and communication style
                // cadenceResult.cadence is the array of touches
                const enhancedCadence = this.enhanceCadenceWithPersonalization(cadenceResult.cadence, persona);

                allCadences.push({
                    persona,
                    cadence: enhancedCadence
                });
            }

            this.appState.cadence = allCadences;

            this.showScreen(5);
            this.renderCadence();
        } catch (error) {
            console.error('Error generating cadence:', error);
            alert('❌ Error generating cadence. Please check the console for details.');
        }
    }

    enhanceCadenceWithPersonalization(cadence, persona) {
        const problem = this.appState.selectedProblem;
        const industry = this.appState.accountIntelligence.industry;

        // Add personalization variables to each touch
        return cadence.map(touch => {
            let content = touch.content;

            // Replace company name with variable
            content = content.replace(new RegExp(this.appState.selectedCompany, 'g'), '{{company}}');

            // Add greeting with first_name variable if email
            if (touch.type === 'Email' && !content.startsWith('Hi {{first_name}}')) {
                content = `Hi {{first_name}},\n\n` + content;
            }

            // Add industry variable
            content = content.replace(new RegExp(this.getIndustryName(industry), 'g'), '{{industry}}');

            // Add problem variable
            content = content.replace(new RegExp(problem.name, 'gi'), '{{problem}}');

            // Add IBM product variable if mentioned
            if (problem.products && problem.products.length > 0) {
                const firstProduct = problem.products[0];
                content = content.replace(new RegExp(firstProduct, 'g'), '{{ibm_product}}');
            }

            // Apply communication style
            content = this.styleEngine.adaptContent(content, this.appState.communicationStyle, {
                company: this.appState.selectedCompany,
                industry: industry,
                persona: persona
            });

            return {
                ...touch,
                content,
                persona
            };
        });
    }

    renderCadence() {
        const allCadences = this.appState.cadence;
        const container = document.getElementById('cadenceTimeline');

        let html = `
            <div class="cadence-summary">
                <h3>${this.appState.selectedCompany} - ${this.appState.selectedPersonas.length} Persona${this.appState.selectedPersonas.length > 1 ? 's' : ''}</h3>
                <div class="cadence-meta">
                    <span><strong>Communication Style:</strong> ${this.styleEngine.getStyle(this.appState.communicationStyle).name}</span>
                    <span><strong>Industry:</strong> ${this.getIndustryName(this.appState.accountIntelligence.industry)}</span>
                    <span><strong>Problem:</strong> ${this.appState.selectedProblem.name}</span>
                </div>
            </div>
        `;

        // Render cadence for each persona
        allCadences.forEach(({ persona, cadence }) => {
            html += `
                <div class="persona-cadence-section">
                    <h3 class="persona-cadence-title">📧 Cadence for ${persona}</h3>
                    <div class="cadence-timeline">
            `;

            cadence.forEach(touch => {
                html += `
                    <div class="cadence-touch">
                        <div class="touch-header">
                            <div class="touch-day">Day ${touch.day}</div>
                            <div class="touch-type">${touch.type}</div>
                        </div>
                        
                        <div class="touch-content">
                            <h4>${touch.title}</h4>
                            <p class="touch-goal"><strong>Goal:</strong> ${touch.goal}</p>
                            
                            ${touch.subject ? `<div class="touch-subject"><strong>Subject:</strong> ${touch.subject}</div>` : ''}
                            
                            <div class="touch-body">
                                <pre>${touch.content}</pre>
                            </div>
                            
                            <div class="touch-meta">
                                <span>${touch.wordCount} words</span>
                                <span class="variable-indicator">✓ Includes personalization variables</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Export functionality
     */
    exportCadence(format) {
        const allCadences = this.appState.cadence;
        if (!allCadences) return;

        // Flatten all cadences into single array
        const flatCadence = [];
        allCadences.forEach(({ persona, cadence }) => {
            cadence.forEach(touch => {
                flatCadence.push({
                    persona,
                    day: touch.day,
                    type: touch.type,
                    subject: touch.subject || '',
                    content: touch.content,
                    goal: touch.goal
                });
            });
        });

        let exported;
        if (format === 'csv') {
            const headers = ['Persona', 'Day', 'Type', 'Subject', 'Content', 'Goal'];
            const rows = flatCadence.map(touch => [
                touch.persona,
                touch.day,
                touch.type,
                touch.subject,
                `"${touch.content.replace(/"/g, '""')}"`,
                touch.goal
            ]);
            exported = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
        } else {
            exported = flatCadence.map(touch =>
                `${touch.persona} - Day ${touch.day} - ${touch.type}\n${touch.subject ? 'Subject: ' + touch.subject + '\n' : ''}${touch.content}\n\n---\n\n`
            ).join('');
        }

        const blob = new Blob([exported], {
            type: format === 'csv' ? 'text/csv' : 'text/plain'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.appState.selectedCompany}_cadence.${format === 'csv' ? 'csv' : 'txt'}`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportForCRM(platform) {
        const allCadences = this.appState.cadence;
        if (!allCadences) return;

        // Flatten all cadences
        const flatCadence = [];
        allCadences.forEach(({ persona, cadence }) => {
            cadence.forEach(touch => {
                flatCadence.push({
                    persona,
                    day: touch.day,
                    type: touch.type,
                    subject: touch.subject || '',
                    content: touch.content,
                    goal: touch.goal
                });
            });
        });

        // Format for specific CRM
        const formatted = this.personalizationEngine.exportForCRM(flatCadence, platform, 'csv');

        const blob = new Blob([formatted], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.appState.selectedCompany}_${platform}_cadence.csv`;
        a.click();
        URL.revokeObjectURL(url);

        // Show success message
        alert(`✅ Cadence exported for ${platform}!\n\nAll personalization variables are included and ready for import.`);
    }

    copyCadence() {
        const allCadences = this.appState.cadence;
        if (!allCadences) return;

        let text = `${this.appState.selectedCompany} - Sales Cadence\n`;
        text += `Communication Style: ${this.styleEngine.getStyle(this.appState.communicationStyle).name}\n`;
        text += `Problem: ${this.appState.selectedProblem.name}\n\n`;
        text += `${'='.repeat(60)}\n\n`;

        allCadences.forEach(({ persona, cadence }) => {
            text += `PERSONA: ${persona}\n`;
            text += `${'='.repeat(60)}\n\n`;

            cadence.forEach(touch => {
                text += `Day ${touch.day} - ${touch.type}\n`;
                if (touch.subject) text += `Subject: ${touch.subject}\n`;
                text += `\n${touch.content}\n\n`;
                text += `${'-'.repeat(60)}\n\n`;
            });
        });

        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Cadence copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('❌ Failed to copy to clipboard');
        });
    }

    startOver() {
        this.appState = {
            companies: [],
            practiceArea: '',
            industry: '',
            selectedCompany: null,
            selectedProblem: null,
            selectedPersonas: [],
            communicationStyle: 'professional',
            accountIntelligence: null,
            cadence: null
        };

        // Reset form
        document.getElementById('companyInput').value = '';
        document.getElementById('practiceArea').value = '';
        document.getElementById('industrySelect').value = '';

        this.showScreen(1);
    }

    /**
     * Utility functions
     */
    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }

    showLoading(message) {
        // Simple loading implementation
        console.log('Loading:', message);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SalesCadenceApp();
});

// Made with Bob
