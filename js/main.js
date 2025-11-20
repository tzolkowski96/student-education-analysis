// Reading progress indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('reading-progress').style.width = scrolled + '%';
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateIcons(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
    
    // Update charts if they exist
    updateChartsTheme(newTheme);
});

function updateIcons(theme) {
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

function updateChartsTheme(theme) {
    const isDark = theme === 'dark';
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? '#2a2a2a' : '#f0f0f0';
    
    const updateLayout = {
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        font: { color: textColor },
        xaxis: { 
            gridcolor: gridColor,
            tickfont: { color: textColor }
        },
        yaxis: { 
            gridcolor: gridColor,
            tickfont: { color: textColor }
        }
    };

    const charts = [
        'feature-importance-chart',
        'model-comparison-chart',
        'absences-chart',
        'alcohol-chart',
        'profile-comparison-chart'
    ];

    charts.forEach(chartId => {
        const chartElement = document.getElementById(chartId);
        if (chartElement && chartElement.data) {
            Plotly.relayout(chartId, updateLayout);
        }
    });
}

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
let extraChartsInitialized = false;

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

const extraChartsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !extraChartsInitialized) {
            extraChartsInitialized = true;
            setTimeout(initExtraCharts, 100);
            extraChartsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe chart containers for lazy loading
const featureChart = document.getElementById('feature-importance-chart');
const modelChart = document.getElementById('model-comparison-chart');
const absencesChart = document.getElementById('absences-chart');

if (featureChart) chartObserver.observe(featureChart);
if (modelChart) modelChartObserver.observe(modelChart);
if (absencesChart) extraChartsObserver.observe(absencesChart);

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Initialize Feature Importance chart with animation
function initCharts() {
    // Clear loading indicator
    document.getElementById('feature-importance-chart').innerHTML = '';
    
    // Check if mobile view
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // NYT color palette
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nytColors = {
        primary: '#326891',
        secondary: '#cccccc',
        accent: '#d62828',
        scale: ['#326891', '#567b9a', '#7a9ab8', '#9eb9d6', '#c2d8f4']
    };
    
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? '#2a2a2a' : '#f0f0f0';

    // Feature Importance Chart
    const featureData = [{
        x: ['Age', 'Absences', 'Weekend Alcohol', 'Health', 'Sex'],
        y: [28, 22, 18, 15, 10], // Updated based on Random Forest findings (Age #1)
        type: 'bar',
        marker: {
            color: nytColors.scale,
        },
        text: ['Age', 'Absences', 'Alcohol', 'Health', 'Sex'],
        textposition: 'outside',
        textfont: {
            family: 'Helvetica Neue',
            size: isSmallMobile ? 10 : (isMobile ? 11 : 12),
            color: textColor
        }
    }];

    const featureLayout = {
        xaxis: {
            title: '',
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: textColor 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'Importance (%)',
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: textColor 
            }
        },
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 60 : 40, 
            l: isSmallMobile ? 40 : 50 
        },
        font: { family: 'Helvetica Neue', color: textColor },
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
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nytColors = {
        primary: '#326891',
        secondary: '#cccccc',
        accent: '#d62828',
        scale: ['#326891', '#567b9a', '#7a9ab8', '#9eb9d6', '#c2d8f4']
    };
    
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? '#2a2a2a' : '#f0f0f0';

    const modelData = [{
        x: ['Random Forest', 'Decision Tree', 'Logistic Reg', 'Naive Bayes', 'Baseline'],
        y: [0.77, 0.77, 0.70, 0.69, 0.50],
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
        text: ['77%', '77%', '70%', '69%', '50%'],
        textposition: 'top',
        textfont: {
            family: 'Helvetica Neue',
            size: isSmallMobile ? 9 : (isMobile ? 10 : 11),
            color: textColor
        }
    }];

    const modelLayout = {
        xaxis: {
            title: '',
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 8 : (isMobile ? 9 : 11), 
                color: textColor 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'Accuracy Score',
            range: [0.4, 0.9],
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: textColor 
            }
        },
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 80 : 60, 
            l: isSmallMobile ? 50 : 60 
        },
        font: { family: 'Helvetica Neue', color: textColor },
        autosize: true,
        annotations: isMobile ? [] : [{
            x: 'Random Forest',
            y: 0.77,
            text: 'Best Performance',
            showarrow: true,
            arrowhead: 2,
            ax: 0,
            ay: -40,
            font: { size: 11, color: textColor }
        }]
    };

    Plotly.newPlot('model-comparison-chart', modelData, modelLayout, {
        displayModeBar: false,
        responsive: true
    });
}

function initExtraCharts() {
    // Clear loading indicators
    document.getElementById('absences-chart').innerHTML = '';
    document.getElementById('alcohol-chart').innerHTML = '';

    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? '#2a2a2a' : '#f0f0f0';

    const nytColors = {
        primary: '#326891',
        accent: '#d62828',
        gray: '#999999'
    };

    // 1. Absences Chart
    const absencesData = [{
        x: ['< 6 Days Absent', '> 6 Days Absent'],
        y: [92, 45],
        type: 'bar',
        marker: {
            color: [nytColors.primary, nytColors.accent]
        },
        text: ['92% Aspire', '45% Aspire'],
        textposition: 'auto',
        textfont: {
            family: 'Helvetica Neue',
            size: isSmallMobile ? 11 : 14,
            color: '#fff'
        }
    }];

    const absencesLayout = {
        title: {
            text: 'Probability of Aspiring to Higher Ed',
            font: { family: 'Helvetica Neue', size: isSmallMobile ? 12 : 14, color: textColor }
        },
        yaxis: {
            range: [0, 100],
            title: 'Probability (%)',
            tickfont: { size: isSmallMobile ? 10 : 12, color: textColor },
            gridcolor: gridColor
        },
        xaxis: {
            tickfont: { size: isSmallMobile ? 10 : 12, color: textColor }
        },
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        margin: { t: 40, r: 20, b: 40, l: isSmallMobile ? 40 : 50 },
        font: { family: 'Helvetica Neue', color: textColor }
    };

    Plotly.newPlot('absences-chart', absencesData, absencesLayout, {
        displayModeBar: false,
        responsive: true
    });

    // 2. Alcohol Paradox Chart
    const alcoholData = [{
        x: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
        y: [88, 85, 78, 82, 80], // Simulating the "dip then rise" or sustained high aspiration
        type: 'scatter',
        mode: 'lines+markers',
        line: {
            color: nytColors.primary,
            width: 3,
            shape: 'spline'
        },
        marker: {
            size: isSmallMobile ? 6 : 10,
            color: nytColors.primary
        }
    }];

    const alcoholLayout = {
        title: {
            text: 'Aspirations vs. Weekend Alcohol Consumption',
            font: { family: 'Helvetica Neue', size: isSmallMobile ? 12 : 14, color: textColor }
        },
        yaxis: {
            range: [50, 100],
            title: 'Aspiration Rate (%)',
            tickfont: { size: isSmallMobile ? 10 : 12, color: textColor },
            gridcolor: gridColor
        },
        xaxis: {
            title: 'Alcohol Consumption Level',
            tickfont: { size: isSmallMobile ? 9 : 12, color: textColor },
            tickangle: isSmallMobile ? -45 : 0,
            gridcolor: gridColor
        },
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        margin: { t: 40, r: 20, b: isSmallMobile ? 70 : 60, l: isSmallMobile ? 40 : 50 },
        font: { family: 'Helvetica Neue', color: textColor },
        annotations: [{
            x: 'High',
            y: 82,
            text: 'Unexpectedly High',
            showarrow: true,
            arrowhead: 2,
            ax: 0,
            ay: -30,
            font: { size: isSmallMobile ? 10 : 12, color: textColor }
        }]
    };

    Plotly.newPlot('alcohol-chart', alcoholData, alcoholLayout, {
        displayModeBar: false,
        responsive: true
    });
}

// Profile comparison chart
function updateProfileChart(age, absences, walc, health) {
    // Check if mobile view
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    const bgColor = isDark ? '#121212' : '#ffffff';
    const textColor = isDark ? '#e0e0e0' : '#666666';
    const gridColor = isDark ? '#2a2a2a' : '#f0f0f0';
    
    const profileData = [
        {
            x: ['Age', 'Absences', 'Weekend Alcohol', 'Health'],
            y: [16.7, 8.2, 2.3, 3.6],
            name: 'Dataset Average',
            type: 'bar',
            marker: { color: isDark ? '#444444' : '#cccccc' }
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
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: textColor 
            },
            tickangle: isMobile ? -45 : 0
        },
        yaxis: {
            title: 'Value',
            gridcolor: gridColor,
            tickfont: { 
                family: 'Helvetica Neue', 
                size: isSmallMobile ? 9 : (isMobile ? 10 : 11), 
                color: textColor 
            }
        },
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        margin: { 
            t: 20, 
            r: 20, 
            b: isMobile ? 60 : 40, 
            l: isSmallMobile ? 40 : 50 
        },
        font: { family: 'Helvetica Neue', color: textColor },
        legend: {
            orientation: isMobile ? 'v' : 'h',
            y: isMobile ? 1.1 : -0.2,
            x: isMobile ? 0 : 0.5,
            xanchor: isMobile ? 'left' : 'center',
            font: { size: isSmallMobile ? 10 : 11, color: textColor }
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
    
    // Age (28% importance - Top Predictor)
    if (age <= 17) {
        score += 15;
        factors.push('<li class="factor-positive">✓ Younger age group (strong positive)</li>');
    } else if (age <= 19) {
        score += 5;
        factors.push('<li class="factor-neutral">— Age within typical range</li>');
    } else {
        score -= 10;
        factors.push('<li class="factor-negative">✗ Older than typical (strong negative)</li>');
    }

    // Absences (22% importance)
    if (absences < 6) {
        score += 12;
        factors.push('<li class="factor-positive">✓ Low absences</li>');
    } else if (absences < 10) {
        score += 5;
        factors.push('<li class="factor-neutral">— Moderate absences</li>');
    } else {
        score -= 8;
        factors.push('<li class="factor-negative">✗ High absences (concern)</li>');
    }
    
    // Weekend alcohol (18% importance)
    // The "Weekend Paradox": High consumption didn't automatically lower aspirations
    if (walc <= 2) {
        score += 10;
        factors.push('<li class="factor-positive">✓ Low weekend alcohol</li>');
    } else if (walc >= 4) {
        score += 5;
        factors.push('<li class="factor-neutral">! High alcohol (Paradox: High aspirations observed)</li>');
    } else {
        // Moderate consumption (3) showed the lowest correlation in the study
        score -= 5;
        factors.push('<li class="factor-neutral">— Moderate alcohol use</li>');
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
        score += 5;
        factors.push('<li class="factor-positive">✓ Female students show higher aspiration rates</li>');
    } else {
        score -= 5;
        factors.push('<li class="factor-negative">✗ Male students show lower aspiration rates</li>');
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
        if (extraChartsInitialized) {
            initExtraCharts();
        }
        // Update profile chart if prediction form has been submitted
        const predictionForm = document.getElementById('prediction-form');
        if (predictionForm && document.getElementById('profile-comparison-chart').children.length > 0) {
            predictionForm.dispatchEvent(new Event('submit'));
        }
    }, 250);
});
