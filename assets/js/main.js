// Highlight.js initialization
hljs.highlightAll();

// Improved form validation and feedback for live demo
window.addEventListener('DOMContentLoaded', function() {
    const predictForm = document.getElementById('predict-form');
    if (predictForm) {
        predictForm.onsubmit = function(e) {
            e.preventDefault();
            const age = Number(document.getElementById('age').value);
            const sex = document.getElementById('sex').value;
            const walc = Number(document.getElementById('walc').value);
            const health = Number(document.getElementById('health').value);
            const absences = Number(document.getElementById('absences').value);
            const resultDiv = document.getElementById('prediction-result');
            // Validation
            if (isNaN(age) || age < 15 || age > 22) {
                resultDiv.textContent = 'Please enter a valid age (15-22).';
                resultDiv.className = 'negative';
                return;
            }
            if (isNaN(walc) || walc < 1 || walc > 5) {
                resultDiv.textContent = 'Weekend alcohol consumption must be between 1 and 5.';
                resultDiv.className = 'negative';
                return;
            }
            if (isNaN(health) || health < 1 || health > 5) {
                resultDiv.textContent = 'Health must be between 1 and 5.';
                resultDiv.className = 'negative';
                return;
            }
            if (isNaN(absences) || absences < 0 || absences > 93) {
                resultDiv.textContent = 'Absences must be between 0 and 93.';
                resultDiv.className = 'negative';
                return;
            }
            let score = 0;
            if (age <= 17) score += 2; else if (age <= 19) score += 1;
            if (sex === 'female') score += 1;
            if (walc <= 2) score += 1;
            if (health >= 4) score += 1;
            if (absences < 10) score += 2; else if (absences < 20) score += 1;
            let result = score >= 5 ?
                'Likely to Aspire to Higher Education' :
                'Less Likely to Aspire to Higher Education';
            resultDiv.textContent = result;
            resultDiv.classList.remove('positive', 'negative');
            setTimeout(() => {
                resultDiv.classList.add(score >= 5 ? 'positive' : 'negative');
            }, 50);
        };
    }

    // Lightbox functionality (single, accessible version)
    (function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<span class="lightbox-close" tabindex="0" aria-label="Close image">&times;</span><img src="" alt="Expanded visualization">';
        document.body.appendChild(lightbox);
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        function closeLightbox() { lightbox.style.display = 'none'; lightboxImg.src = ''; }
        closeBtn.onclick = closeLightbox;
        closeBtn.onkeydown = function(e) { if (e.key === 'Enter' || e.key === ' ') closeLightbox(); };
        lightbox.onclick = function(e) { if (e.target === lightbox) closeLightbox(); };
        document.querySelectorAll('.visual-insights img, .visual-insights .fade-in img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.tabIndex = 0;
            img.setAttribute('aria-label', 'Expand image');
            img.onclick = function() {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.style.display = 'flex';
                closeBtn.focus();
            };
            img.onkeydown = function(e) {
                if (e.key === 'Enter' || e.key === ' ') this.onclick();
            };
        });
    })();

    // Accessibility: Add alt text to all images and lazy loading
    document.querySelectorAll('img').forEach(function(img) {
        if (!img.alt || img.alt.trim() === '') {
            img.alt = 'Data visualization related to student education analysis';
        }
        img.setAttribute('loading', 'lazy');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show "Back to Top" button when scrolling down
    window.onscroll = function() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    // Scroll to the top of the document
    window.scrollToTop = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // Plotly Feature Importance Bar Chart
    if (document.getElementById('feature-importance-plot')) {
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
        }, {displayModeBar: false, responsive: true});
    }
});
