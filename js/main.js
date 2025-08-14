// Reading progress indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('reading-progress').style.width = scrolled + '%';
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Range input updates
document.querySelectorAll('input[type="range"]').forEach(input => {
    const valueDisplay = document.getElementById(input.id + '-value');
    if (valueDisplay) {
        input.addEventListener('input', () => {
            valueDisplay.textContent = input.value;
        });
    }
});

// Lazy loading for charts with Intersection Observer
let chartsInitialized = false;
let modelChartInitialized = false;

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !chartsInitialized) {
            chartsInitialized = true;
            setTimeout(initCharts, 100); // Small delay for smooth animation
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const modelChartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !modelChartInitialized) {
            modelChartInitialized = true;
            setTimeout(initModelChart, 100);
            modelChartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe chart containers for lazy loading
const featureChart = document.getElementById('feature-importance-chart');
const modelChart = document.getElementById('model-comparison-chart');
if (featureChart) chartObserver.observe(featureChart);
if (modelChart) modelChartObserver.observe(modelChart);

// Initialize Feature Importance chart with animation
function initCharts() {
    // Clear loading indicator
    document.getElementById('feature-importance-chart').innerHTML = '';
    
    // Check if mobile view
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // NYT color palette
    const nytColors = {
        primary: '#326891',
        secondary: '#cccccc',
        accent: '#d62828',
        scale: ['#326891', '#567b9a', '#7a9ab8', '#9eb9d6', '#c2d8f4']
    };

    // Feature Importance Chart
    const featureData = [{
        x: ['Absences', 'Age', 'Weekend Alcohol', 'Composite Risk', 'Health'],
        y: [28, 22, 18, 17, 15],
        type: 'bar',
        marker: {
            color: nytColors.scale,
        },
        text: ['28%', '22%', '18%', '17%', '15%'],
        textposition: 'outside',
        textfont: {
            family: 'Helvetica Neue',
            size: isSmallMobile ? 10 : (isMobile ? 11 : 12),
            color: '#666'
        }
    }];

    const featureLayout = {
        xaxis: {
            title: '',
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: '#666' 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'Importance (%)',
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: '#666' 
            }
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 60 : 40, 
            l: isSmallMobile ? 40 : 50 
        },
        font: { family: 'Helvetica Neue' },
        autosize: true
    };

    Plotly.newPlot('feature-importance-chart', featureData, featureLayout, {
        displayModeBar: false,
        responsive: true
    });
}

// Initialize Model Comparison chart separately
function initModelChart() {
    // Clear loading indicator
    document.getElementById('model-comparison-chart').innerHTML = '';
    
    // Check if mobile view
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // NYT color palette
    const nytColors = {
        primary: '#326891',
        secondary: '#cccccc',
        accent: '#d62828',
        scale: ['#326891', '#567b9a', '#7a9ab8', '#9eb9d6', '#c2d8f4']
    };

    const modelData = [{
        x: ['XGBoost', 'Random Forest', 'Logistic Reg', 'Decision Tree', 'Naive Bayes', 'Baseline'],
        y: [0.82, 0.79, 0.78, 0.75, 0.72, 0.50],
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: nytColors.primary,
            width: 2
        },
        marker: {
            size: isMobile ? 6 : 8,
            color: nytColors.primary
        },
        text: ['82%', '79%', '78%', '75%', '72%', '50%'],
        textposition: 'top',
        textfont: {
            family: 'Helvetica Neue',
            size: isSmallMobile ? 9 : (isMobile ? 10 : 11),
            color: '#666'
        }
    }];

    const modelLayout = {
        xaxis: {
            title: '',
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 8 : (isMobile ? 9 : 11), 
                color: '#666' 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'AUC-ROC Score',
            range: [0.4, 0.9],
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: '#666' 
            }
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 80 : 60, 
            l: isSmallMobile ? 50 : 60 
        },
        font: { family: 'Helvetica Neue' },
        autosize: true,
        annotations: isMobile ? [] : [{
            x: 'XGBoost',
            y: 0.82,
            text: 'Best Performance',
            showarrow: true,
            arrowhead: 2,
            ax: 0,
            ay: -40,
            font: { size: 11, color: '#666' }
        }]
    };

    Plotly.newPlot('model-comparison-chart', modelData, modelLayout, {
        displayModeBar: false,
        responsive: true
    });
}

// Profile comparison chart
function updateProfileChart(age, absences, walc, health) {
    // Check if mobile view
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    const profileData = [
        {
            x: ['Age', 'Absences', 'Weekend Alcohol', 'Health'],
            y: [16.7, 8.2, 2.3, 3.6],
            name: 'Dataset Average',
            type: 'bar',
            marker: { color: '#cccccc' }
        },
        {
            x: ['Age', 'Absences', 'Weekend Alcohol', 'Health'],
            y: [age, absences, walc, health],
            name: 'Your Profile',
            type: 'bar',
            marker: { color: '#326891' }
        }
    ];

    const profileLayout = {
        barmode: 'group',
        xaxis: {
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: '#666' 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'Value',
            gridcolor: '#f0f0f0',
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: '#666' 
            }
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 60 : 40, 
            l: isSmallMobile ? 40 : 50 
        },
        font: { family: 'Helvetica Neue' },
        legend: {
            orientation: isMobile ? 'v' : 'h',
            y: isMobile ? 1.1 : -0.2,
            x: isMobile ? 0 : 0.5,
            xanchor: isMobile ? 'left' : 'center',
            font: { size: isSmallMobile ? 10 : 11 }
        },
        autosize: true
    };

    Plotly.newPlot('profile-comparison-chart', profileData, profileLayout, {
        displayModeBar: false,
        responsive: true
    });
}

// Prediction form handler
document.getElementById('prediction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get values
    const age = parseInt(document.getElementById('age').value);
    const absences = parseInt(document.getElementById('absences').value);
    const walc = parseInt(document.getElementById('walc').value);
    const health = parseInt(document.getElementById('health').value);
    const gender = document.getElementById('gender').value;
    
    // Update comparison chart
    updateProfileChart(age, absences, walc, health);
    
    // Scoring logic based on model insights
    let score = 50;
    let factors = [];
    
    // Absences (28% importance)
    if (absences < 10) {
        score += 15;
        factors.push('<li class="factor-positive">✓ Low absences (strong positive)</li>');
    } else if (absences < 20) {
        score += 5;
        factors.push('<li class="factor-neutral">— Moderate absences</li>');
    } else {
        score -= 10;
        factors.push('<li class="factor-negative">✗ High absences (concern)</li>');
    }
    
    // Age (22% importance)
    if (age <= 17) {
        score += 12;
        factors.push('<li class="factor-positive">✓ Younger age group</li>');
    } else if (age <= 19) {
        score += 5;
        factors.push('<li class="factor-neutral">— Age within typical range</li>');
    } else {
        score -= 5;
        factors.push('<li class="factor-negative">✗ Older than typical</li>');
    }
    
    // Weekend alcohol (18% importance)
    if (walc <= 2) {
        score += 10;
        factors.push('<li class="factor-positive">✓ Low weekend alcohol</li>');
    } else if (walc <= 3) {
        score += 3;
        factors.push('<li class="factor-neutral">— Moderate alcohol use</li>');
    } else {
        score -= 8;
        factors.push('<li class="factor-negative">✗ High alcohol consumption</li>');
    }
    
    // Health (15% importance)
    if (health >= 4) {
        score += 8;
        factors.push('<li class="factor-positive">✓ Good health status</li>');
    } else if (health >= 3) {
        score += 3;
        factors.push('<li class="factor-neutral">— Average health</li>');
    } else {
        score -= 5;
        factors.push('<li class="factor-negative">✗ Poor health status</li>');
    }
    
    // Gender effect
    if (gender === 'female') {
        score += 3;
    }
    
    // Normalize
    score = Math.min(95, Math.max(25, score));
    
    // Update UI
    document.getElementById('confidence').style.width = score + '%';
    document.getElementById('prediction-result').textContent = Math.round(score) + '%';
    
    const label = document.getElementById('prediction-label');
    if (score >= 70) {
        label.textContent = 'Likely to pursue higher education';
    } else if (score >= 50) {
        label.textContent = 'Moderate likelihood of pursuing higher education';
    } else {
        label.textContent = 'Lower likelihood — consider targeted support';
    }
    
    document.getElementById('factors-list').innerHTML = factors.join('');
});

// Trigger initial prediction
document.getElementById('prediction-form').dispatchEvent(new Event('submit'));

// Window resize handler for responsive charts
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Re-initialize charts if they exist
        if (chartsInitialized && document.getElementById('feature-importance-chart').children.length > 0) {
            initCharts();
        }
        if (modelChartInitialized && document.getElementById('model-comparison-chart').children.length > 0) {
            initModelChart();
        }
        // Update profile chart if prediction form has been submitted
        const predictionForm = document.getElementById('prediction-form');
        if (predictionForm && document.getElementById('profile-comparison-chart').children.length > 0) {
            predictionForm.dispatchEvent(new Event('submit'));
        }
    }, 250);
});
