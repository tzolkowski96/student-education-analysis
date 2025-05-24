// Highlight.js initialization
document.addEventListener('DOMContentLoaded', function() {
    hljs.highlightAll();

    // Define updateFactorImpacts function first to avoid potential issues
    function updateFactorImpacts() {
        const age = Number(document.getElementById('age').value);
        const sex = document.getElementById('sex').value;
        const walc = Number(document.getElementById('walc').value);
        const health = Number(document.getElementById('health').value);
        const absences = Number(document.getElementById('absences').value);
        
        // Update age impact
        const ageImpact = document.getElementById('age-impact');
        if (age <= 17) {
            ageImpact.textContent = 'Ages 15-17 have the strongest positive impact (+2 points)';
            ageImpact.className = 'factor-impact positive-impact';
        } else if (age <= 19) {
            ageImpact.textContent = 'Ages 18-19 have a moderate positive impact (+1 point)';
            ageImpact.className = 'factor-impact neutral-impact';
        } else {
            ageImpact.textContent = 'Ages 20+ have no positive impact (0 points)';
            ageImpact.className = 'factor-impact negative-impact';
        }
        
        // Update gender impact
        const genderImpact = document.getElementById('gender-impact');
        if (sex === 'female') {
            genderImpact.textContent = 'Female students show slightly higher aspiration (+1 point)';
            genderImpact.className = 'factor-impact positive-impact';
        } else {
            genderImpact.textContent = 'Male students have no additional impact (0 points)';
            genderImpact.className = 'factor-impact neutral-impact';
        }
        
        // Update alcohol impact
        const walcImpact = document.getElementById('walc-impact');
        if (walc <= 2) {
            walcImpact.textContent = 'Lower consumption (1-2) correlates with higher aspiration (+1 point)';
            walcImpact.className = 'factor-impact positive-impact';
        } else {
            walcImpact.textContent = 'Higher consumption (3-5) has no positive impact (0 points)';
            walcImpact.className = 'factor-impact negative-impact';
        }
        
        // Update health impact
        const healthImpact = document.getElementById('health-impact');
        if (health >= 4) {
            healthImpact.textContent = 'Better health (4-5) positively influences aspiration (+1 point)';
            healthImpact.className = 'factor-impact positive-impact';
        } else {
            healthImpact.textContent = 'Lower health scores (1-3) have no positive impact (0 points)';
            healthImpact.className = 'factor-impact negative-impact';
        }
        
        // Update absences impact
        const absencesImpact = document.getElementById('absences-impact');
        if (absences < 10) {
            absencesImpact.textContent = 'Few absences (<10) strongly predict higher aspiration (+2 points)';
            absencesImpact.className = 'factor-impact positive-impact';
        } else if (absences < 20) {
            absencesImpact.textContent = 'Moderate absences (10-19) have slight positive impact (+1 point)';
            absencesImpact.className = 'factor-impact neutral-impact';
        } else {
            absencesImpact.textContent = 'High absences (20+) have no positive impact (0 points)';
            absencesImpact.className = 'factor-impact negative-impact';
        }
    }

    // Enhanced form validation and feedback for live demo with visual explanations
    const predictForm = document.getElementById('predict-form');
    if (predictForm) {
        // Initialize with default values
        updateFactorImpacts();
        
        // Add form submission handler
        predictForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values with input validation
            const age = Math.max(15, Math.min(22, Number(document.getElementById('age').value) || 15));
            const sex = document.getElementById('sex').value;
            const walc = Math.max(1, Math.min(5, Number(document.getElementById('walc').value) || 1));
            const health = Math.max(1, Math.min(5, Number(document.getElementById('health').value) || 1));
            const absences = Math.max(0, Math.min(93, Number(document.getElementById('absences').value) || 0));
            
            // Get result div
            const resultDiv = document.getElementById('prediction-result');
            
            // Calculate factors and their individual contributions
            const scores = {
                age: age <= 17 ? 2 : (age <= 19 ? 1 : 0),
                sex: sex === 'female' ? 1 : 0,
                walc: walc <= 2 ? 1 : 0,
                health: health >= 4 ? 1 : 0,
                absences: absences < 10 ? 2 : (absences < 20 ? 1 : 0)
            };
            
            const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
            const result = totalScore >= 5 ?
                'Likely to Aspire to Higher Education' :
                'Less Likely to Aspire to Higher Education';
                
            // Update the result display
            resultDiv.textContent = result;
            resultDiv.className = '';
            resultDiv.style.backgroundColor = totalScore >= 5 ? 'rgba(40, 167, 69, 0.15)' : 'rgba(220, 53, 69, 0.15)';
            resultDiv.style.color = totalScore >= 5 ? '#155724' : '#721c24';
            resultDiv.style.border = totalScore >= 5 ? '1px solid rgba(40, 167, 69, 0.4)' : '1px solid rgba(220, 53, 69, 0.4)';
            
            // Update factor impacts based on input
            updateFactorImpacts();
            
            // Show and update score breakdown
            const scoreBreakdown = document.getElementById('score-breakdown');
            scoreBreakdown.style.display = 'block';
            
            // Update total score display
            document.getElementById('total-score').textContent = totalScore;
            
            // Generate score bars visualization
            const scoreBarsDiv = document.getElementById('score-bars');
            scoreBarsDiv.innerHTML = '';
            
            const factors = {
                age: 'Age',
                sex: 'Gender', 
                walc: 'Weekend Alcohol',
                health: 'Health',
                absences: 'Absences'
            };
            
            // Calculate max possible score for factor
            const maxScores = {
                age: 2,
                sex: 1,
                walc: 1,
                health: 1,
                absences: 2
            };
            
            // Create score bars for each factor
            for (const [key, label] of Object.entries(factors)) {
                const barContainer = document.createElement('div');
                barContainer.style.display = 'flex';
                barContainer.style.alignItems = 'center';
                barContainer.style.marginBottom = '8px';
                
                const labelSpan = document.createElement('span');
                labelSpan.textContent = label + ':';
                labelSpan.style.width = '120px';
                labelSpan.style.fontSize = '0.85em';
                
                const barOuter = document.createElement('div');
                barOuter.style.flex = '1';
                barOuter.style.height = '12px';
                barOuter.style.backgroundColor = '#e9ecef';
                barOuter.style.borderRadius = '6px';
                barOuter.style.overflow = 'hidden';
                
                const barInner = document.createElement('div');
                barInner.style.width = `${(scores[key] / maxScores[key]) * 100}%`;
                barInner.style.height = '100%';
                barInner.style.backgroundColor = scores[key] > 0 ? '#007bff' : '#e9ecef';
                barInner.style.transition = 'width 0.3s ease-in-out';
                
                const scoreText = document.createElement('span');
                scoreText.textContent = `${scores[key]}/${maxScores[key]}`;
                scoreText.style.marginLeft = '8px';
                scoreText.style.fontSize = '0.85em';
                
                barOuter.appendChild(barInner);
                barContainer.appendChild(labelSpan);
                barContainer.appendChild(barOuter);
                barContainer.appendChild(scoreText);
                scoreBarsDiv.appendChild(barContainer);
            }
        });
        
        // Add input event listeners to update explanations in real-time
        document.getElementById('age').addEventListener('input', updateFactorImpacts);
        document.getElementById('sex').addEventListener('change', updateFactorImpacts);
        document.getElementById('walc').addEventListener('input', updateFactorImpacts);
        document.getElementById('health').addEventListener('input', updateFactorImpacts);
        document.getElementById('absences').addEventListener('input', updateFactorImpacts);
        
        // Simulate a form submission with default values to show initial prediction
        document.querySelector('#predict-form button[type="submit"]').click();

        // Add enhanced input validation for all numeric fields
        document.querySelectorAll('#predict-form input[type="number"]').forEach(input => {
            input.addEventListener('input', function() {
                // Get min and max values from attributes
                const min = parseInt(this.getAttribute('min') || 0, 10);
                const max = parseInt(this.getAttribute('max') || 100, 10);
                let value = parseInt(this.value, 10);
                
                // Validate and correct input
                if (isNaN(value)) {
                    this.value = min;
                } else if (value < min) {
                    this.value = min;
                } else if (value > max) {
                    this.value = max;
                }
            });
        });
        
        // Add form reset functionality
        const resetButton = document.querySelector('#predict-form button[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                // Wait for form to reset with default values
                setTimeout(() => {
                    updateFactorImpacts();
                    document.querySelector('#predict-form button[type="submit"]').click();
                }, 10);
            });
        }
        
        // Hide prediction result initially until form is submitted
        const initialResult = document.getElementById('prediction-result');
        if (initialResult) {
            initialResult.style.display = 'none';
        }
    }
    
    // Show the prediction result after form submission
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'predict-form') {
            const resultDiv = document.getElementById('prediction-result');
            if (resultDiv) {
                resultDiv.style.display = 'block';
                
                // Add animation for better user experience
                resultDiv.classList.add('fade-in');
                
                // Scroll to the result if not visible
                setTimeout(() => {
                    if (!isElementInViewport(resultDiv)) {
                        resultDiv.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        }
    });

    // Lightbox functionality (enhanced, accessible version)
    (function() {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return; // Skip if lightbox doesn't exist
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        function closeLightbox() { 
            lightbox.style.display = 'none'; 
            lightboxImg.src = ''; 
            if (lightboxCaption) lightboxCaption.textContent = '';
            
            // Return focus to the element that triggered the lightbox
            if (window.lastFocusedElement) {
                window.lastFocusedElement.focus();
                window.lastFocusedElement = null;
            }
        }
        
        // Close button handler
        if (closeBtn) {
            closeBtn.onclick = closeLightbox;
            closeBtn.onkeydown = function(e) { 
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                    e.preventDefault();
                    closeLightbox(); 
                }
            };
        }
        
        // Background click handler
        lightbox.onclick = function(e) { 
            if (e.target === lightbox) closeLightbox(); 
        };
        
        // Escape key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
        
        // Make all images in visualization sections lightbox-enabled
        const allImages = document.querySelectorAll('.visual-insights img, .visual-insights .fade-in img');
        allImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.tabIndex = 0;
            img.setAttribute('aria-label', img.alt + '. Click to expand image');
            
            img.onclick = function() {
                window.lastFocusedElement = this;
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                if (lightboxCaption) lightboxCaption.textContent = this.alt;
                lightbox.style.display = 'flex';
                closeBtn.focus();
            };
            
            img.onkeydown = function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.onclick();
                }
            };
        });
    })();

    // Accessibility and cross-browser enhancements
    
    // Enhanced alt text for all images and lazy loading
    document.querySelectorAll('img').forEach(function(img) {
        if (!img.alt || img.alt.trim() === '') {
            img.alt = 'Data visualization related to student education analysis';
        }
        
        // Only add lazy loading to images below the fold
        if (!isElementInViewport(img)) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add onerror handler to deal with broken images
        img.onerror = function() {
            this.style.display = 'none'; // Hide broken images
            
            // Create a fallback element to show in place of broken image
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.textContent = 'Image unavailable';
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
    });

    // Improved smooth scroll for navigation links with fallback
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Check for scroll behavior support
                if ('scrollBehavior' in document.documentElement.style) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth', 
                        block: 'start'
                    });
                } else {
                    // Fallback for browsers that don't support smooth scrolling
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo(0, targetPosition);
                }
                
                // Set focus to the target for better accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Enhanced "Back to Top" button with visibility toggle
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        // Initially hide the button
        backToTopButton.style.display = 'none';
        
        // Performance-optimized scroll listener with throttling
        let lastScrollTime = 0;
        window.addEventListener('scroll', function() {
            const now = Date.now();
            
            // Only run every 100ms for better performance
            if (now - lastScrollTime > 100) {
                lastScrollTime = now;
                
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            }
        });
    }

    // Scroll to the top function with smooth animation
    window.scrollToTop = function() {
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback for browsers without smooth scrolling
            window.scrollTo(0, 0);
        }
    };
    
    // Plotly Feature Importance Bar Chart with responsive settings
    const featureImportancePlot = document.getElementById('feature-importance-plot');
    if (featureImportancePlot) {
        Plotly.newPlot('feature-importance-plot', [{
            x: ['Absences', 'Age', 'Walc', 'Health', 'Composite Risk Score'],
            y: [0.28, 0.22, 0.18, 0.15, 0.17],
            type: 'bar',
            marker: {color: '#007BFF'},
        }], {
            title: 'Feature Importances (XGBoost)',
            xaxis: {title: 'Feature'},
            yaxis: {title: 'Importance'},
            margin: { t: 60, l: 60, r: 30, b: 60 },
            plot_bgcolor: '#fff',
            paper_bgcolor: '#fff',
            autosize: true,
            font: {
                family: "'Inter', 'Segoe UI', Arial, sans-serif"
            }
        }, {
            displayModeBar: false, 
            responsive: true,
            useResizeHandler: true
        });
        
        // Make the plot responsive to container changes
        window.addEventListener('resize', function() {
            Plotly.Plots.resize(featureImportancePlot);
        });
    }
    
    // Enhanced functionality for comprehensive portfolio sections
    function initializeSectionTracking() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        // Create intersection observer for section highlighting
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Update active navigation
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Trigger section-specific animations
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Enhanced smooth scrolling with section awareness
    function enhancedSmoothScroll() {
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without causing page jump
                    history.pushState(null, null, targetId);
                    
                    // Focus management for accessibility
                    setTimeout(() => {
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus();
                    }, 500);
                }
            });
        });
    }
    
    // Statistical validation section interactivity
    function initializeStatisticalValidation() {
        const statSection = document.getElementById('statistical-validation');
        if (!statSection) return;
        
        // Add hover effects for statistical metrics
        const metrics = statSection.querySelectorAll('li strong');
        metrics.forEach(metric => {
            metric.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(25, 118, 210, 0.1)';
                this.style.padding = '2px 4px';
                this.style.borderRadius = '3px';
            });
            
            metric.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.padding = '';
                this.style.borderRadius = '';
            });
        });
        
        // Animate confidence intervals on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cis = entry.target.querySelectorAll('li:contains("±")');
                    cis.forEach((ci, index) => {
                        setTimeout(() => {
                            ci.style.opacity = '0';
                            ci.style.transform = 'translateY(20px)';
                            ci.style.transition = 'all 0.5s ease-out';
                            
                            setTimeout(() => {
                                ci.style.opacity = '1';
                                ci.style.transform = 'translateY(0)';
                            }, 100);
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statSection);
    }
    
    // Ethical considerations section interactivity
    function initializeEthicalConsiderations() {
        const ethicsSection = document.getElementById('ethical-considerations');
        if (!ethicsSection) return;
        
        // Add progressive disclosure for detailed ethical points
        const detailSections = ethicsSection.querySelectorAll('h4');
        detailSections.forEach(heading => {
            const content = heading.nextElementSibling;
            if (content && content.tagName === 'UL') {
                // Create expandable sections
                heading.style.cursor = 'pointer';
                heading.style.userSelect = 'none';
                heading.setAttribute('aria-expanded', 'true');
                heading.setAttribute('role', 'button');
                
                heading.addEventListener('click', function() {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    
                    if (isExpanded) {
                        content.style.maxHeight = '0';
                        content.style.opacity = '0';
                        content.style.overflow = 'hidden';
                        this.setAttribute('aria-expanded', 'false');
                        this.style.color = '#999';
                    } else {
                        content.style.maxHeight = 'none';
                        content.style.opacity = '1';
                        content.style.overflow = 'visible';
                        this.setAttribute('aria-expanded', 'true');
                        this.style.color = '#6a1b99';
                    }
                    
                    content.style.transition = 'all 0.3s ease-in-out';
                });
            }
        });
    }
    
    // Reproducibility section code highlighting
    function initializeReproducibilitySection() {
        const reproSection = document.getElementById('reproducibility');
        if (!reproSection) return;
        
        // Enhanced code block styling
        const codeBlocks = reproSection.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Add copy button to code blocks
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.className = 'copy-code-btn';
            copyButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 4px 8px;
                background: rgba(255, 143, 0, 0.1);
                border: 1px solid #ff8f00;
                border-radius: 4px;
                font-size: 0.8em;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            
            const container = block.parentElement;
            container.style.position = 'relative';
            container.appendChild(copyButton);
            
            copyButton.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    this.textContent = 'Copied!';
                    this.style.background = 'rgba(76, 175, 80, 0.1)';
                    this.style.borderColor = '#4caf50';
                    
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.style.background = 'rgba(255, 143, 0, 0.1)';
                        this.style.borderColor = '#ff8f00';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            });
        });
    }
    
    // Enhanced data badge interactivity
    function enhanceDataBadges() {
        const badges = document.querySelectorAll('.data-badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 2px 8px rgba(0, 123, 255, 0.2)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Reading progress indicator
    function initializeReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #007BFF 0%, #00c6ff 100%);
            z-index: 10000;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }
    
    // Initialize all enhanced features
    initializeSectionTracking();
    enhancedSmoothScroll();
    initializeStatisticalValidation();
    initializeEthicalConsiderations();
    initializeReproducibilitySection();
    enhanceDataBadges();
    initializeReadingProgress();
    
    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
            });
        });
        
        try {
            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Fallback for browsers that don't support LCP
            console.log('Performance monitoring not supported');
        }
    }
});

// Utility functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
