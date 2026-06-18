<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IBM Cold Email Generator - Data & AI Solutions</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet">
    <!-- API Configuration (optional - for real-time research) -->
    <script src="config.js"></script>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="#0F62FE" />
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24"
                        font-weight="bold" font-family="IBM Plex Sans, sans-serif">IBM</text>
                </svg>
            </div>
            <h1>IBM Data & AI Cold Email Generator</h1>
            <p class="subtitle">Personalized Outreach for IBM Data & AI Solutions</p>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Input Section -->
            <section class="input-section">
                <div class="card">
                    <h2>Company Information</h2>

                    <div class="form-group">
                        <label for="companyName">Company Name *</label>
                        <input type="text" id="companyName" placeholder="e.g., Acme Corporation" autocomplete="off">
                        <span class="helper-text">Enter the target company name</span>
                    </div>

                    <div class="form-group">
                        <label for="industry">Industry *</label>
                        <select id="industry">
                            <option value="">Select an industry...</option>
                            <option value="healthcare">Healthcare & Life Sciences</option>
                            <option value="financial">Financial Services & Banking</option>
                            <option value="retail">Retail & E-commerce</option>
                            <option value="food">Food & Beverage</option>
                            <option value="manufacturing">Manufacturing & Industrial</option>
                            <option value="telecommunications">Telecommunications</option>
                            <option value="energy">Energy & Utilities</option>
                            <option value="transportation">Transportation & Logistics</option>
                            <option value="government">Government & Public Sector</option>
                            <option value="insurance">Insurance</option>
                            <option value="media">Media & Entertainment</option>
                            <option value="education">Education & Research</option>
                            <option value="hospitality">Hospitality & Travel</option>
                            <option value="pharma">Pharmaceutical & Biotech</option>
                            <option value="automotive">Automotive</option>
                            <option value="realestate">Real Estate & Construction</option>
                            <option value="technology">Technology & Software</option>
                        </select>
                        <span class="helper-text">Select the company's primary industry</span>
                    </div>

                    <div class="form-group">
                        <label for="contactName">Contact Name (Optional)</label>
                        <input type="text" id="contactName" placeholder="e.g., John Smith" autocomplete="off">
                        <span class="helper-text">Leave blank for generic greeting</span>
                    </div>

                    <div class="form-group">
                        <label for="solutionFocus">IBM Data & AI Solution Focus</label>
                        <select id="solutionFocus">
                            <option value="ai_data">AI + Data Platform (Recommended)</option>
                            <option value="ai">Watson AI & Machine Learning</option>
                            <option value="data_fabric">Data Fabric & Integration</option>
                            <option value="database">Database & Data Management</option>
                            <option value="bi_analytics">Business Intelligence & Analytics</option>
                            <option value="all">Complete Data & AI Stack</option>
                        </select>
                    </div>

                    <button id="researchBtn" class="btn-secondary" style="width: 100%; margin-bottom: 12px;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
                            <path d="M13 13L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        Research Company (Real-time)
                    </button>

                    <button id="generateBtn" class="btn-primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2L10 18M10 18L16 12M10 18L4 12" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Generate Email
                    </button>

                    <div id="errorMessage" class="error-message" style="display: none;"></div>
                </div>

                <!-- Industry Insights -->
                <div class="card insights-card" id="insightsCard" style="display: none;">
                    <h3>Industry Insights</h3>
                    <div id="insightsContent"></div>
                </div>
            </section>

            <!-- Output Section -->
            <section class="output-section">
                <div class="card" id="emailPreview" style="display: none;">
                    <div class="card-header">
                        <h2>Generated Email</h2>
                        <div class="card-actions">
                            <button id="copyBtn" class="btn-secondary" title="Copy to clipboard">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 6V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V12C18 13.1046 17.1046 14 16 14H14M4 8H12C13.1046 8 14 8.89543 14 10V16C14 17.1046 13.1046 18 12 18H4C2.89543 18 2 17.1046 2 16V10C2 8.89543 2.89543 8 4 8Z"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                Copy
                            </button>
                            <button id="regenerateBtn" class="btn-secondary" title="Generate new version">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C8.34315 16 6.84315 15.3284 5.75736 14.2426M4 10V6M4 10H8"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                Regenerate
                            </button>
                        </div>
                    </div>

                    <div class="email-container">
                        <div class="email-field">
                            <label>Subject:</label>
                            <div id="emailSubject" class="email-subject" contenteditable="true"></div>
                        </div>

                        <div class="email-field">
                            <label>Body:</label>
                            <div id="emailBody" class="email-body" contenteditable="true"></div>
                        </div>

                        <div class="email-stats">
                            <span id="wordCount" class="stat-item">0 words</span>
                            <span class="stat-divider">•</span>
                            <span id="charCount" class="stat-item">0 characters</span>
                            <span class="stat-divider">•</span>
                            <span id="readTime" class="stat-item">~0 sec read</span>
                        </div>
                    </div>

                    <div class="success-message" id="copySuccess" style="display: none;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Email copied to clipboard!
                    </div>
                </div>

                <!-- Placeholder -->
                <div class="card placeholder-card" id="placeholderCard">
                    <div class="placeholder-content">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="38" stroke="#E0E0E0" stroke-width="4" />
                            <path d="M40 20V40M40 40V60M40 40H60M40 40H20" stroke="#E0E0E0" stroke-width="4"
                                stroke-linecap="round" />
                        </svg>
                        <h3>Ready to Generate</h3>
                        <p>Enter company information and select an industry to generate a personalized cold email.</p>
                    </div>
                </div>

                <!-- Tips Card -->
                <div class="card tips-card">
                    <h3>Cold Email Best Practices</h3>
                    <ul class="tips-list">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#42BE65" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Keep it under 100 words (75-100 is ideal)
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#42BE65" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Lead with their pain point, not your product
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#42BE65" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Show results, not features
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#42BE65" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            One clear ask: 15-minute call
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#42BE65" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Personalize before sending
                        </li>
                    </ul>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <p>&copy; 2026 IBM Cold Email Generator. Built for IBM Sales Teams.</p>
            <p class="footer-note">Note: This tool generates template emails. Always review and personalize before
                sending.</p>
        </footer>
    </div>

    <!-- Scripts -->
    <script src="js/industries.js"></script>
    <script src="js/emailGenerator.js"></script>
    <script src="js/demoResearch.js"></script>
    <script src="js/searchService.js"></script>
    <script src="js/app.js"></script>
</body>

</html>
