// Cross-browser testing utility script
// Include this file only during development and testing

(function() {
    console.log('Cross-browser testing utility loaded');
    
    // Create browser detection banner
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = 'rgba(0,0,0,0.7)';
    banner.style.color = 'white';
    banner.style.padding = '5px 10px';
    banner.style.fontSize = '12px';
    banner.style.zIndex = '9999';
    banner.style.textAlign = 'center';
    banner.id = 'browser-test-banner';
    
    // Detect browser and platform
    const ua = navigator.userAgent;
    const browserInfo = [];
    
    // Browser detection
    if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1 && ua.indexOf('OPR') === -1) {
        browserInfo.push('Chrome');
    } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
        browserInfo.push('Safari');
    } else if (ua.indexOf('Firefox') > -1) {
        browserInfo.push('Firefox');
    } else if (ua.indexOf('Edg') > -1) {
        browserInfo.push('Edge');
    } else if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) {
        browserInfo.push('Opera');
    } else if (ua.indexOf('Trident') > -1) {
        browserInfo.push('Internet Explorer');
    } else {
        browserInfo.push('Unknown Browser');
    }
    
    // Device detection
    if (/Mobi|Android/i.test(ua)) {
        browserInfo.push('Mobile');
        if (/iPad|iPhone|iPod/.test(ua)) {
            browserInfo.push('iOS');
        } else if (/Android/.test(ua)) {
            browserInfo.push('Android');
        }
    } else {
        browserInfo.push('Desktop');
        if (/Win/.test(ua)) {
            browserInfo.push('Windows');
        } else if (/Mac/.test(ua)) {
            browserInfo.push('macOS');
        } else if (/Linux/.test(ua)) {
            browserInfo.push('Linux');
        }
    }
    
    // Screen info
    browserInfo.push(`${window.innerWidth}x${window.innerHeight}`);
    
    // Add browser info to banner
    banner.textContent = browserInfo.join(' | ');
    
    // Add control buttons
    const controlsDiv = document.createElement('div');
    controlsDiv.style.marginTop = '5px';
    
    // Toggle grid button to check alignment
    const gridBtn = document.createElement('button');
    gridBtn.textContent = 'Toggle Layout Grid';
    gridBtn.style.marginRight = '10px';
    gridBtn.style.padding = '3px 8px';
    gridBtn.style.fontSize = '12px';
    gridBtn.style.backgroundColor = '#007bff';
    gridBtn.style.border = 'none';
    gridBtn.style.borderRadius = '3px';
    gridBtn.style.color = 'white';
    gridBtn.style.cursor = 'pointer';
    
    gridBtn.onclick = function() {
        const existingGrid = document.getElementById('debug-grid');
        if (existingGrid) {
            document.body.removeChild(existingGrid);
        } else {
            const grid = document.createElement('div');
            grid.id = 'debug-grid';
            grid.style.position = 'fixed';
            grid.style.top = '0';
            grid.style.left = '0';
            grid.style.width = '100%';
            grid.style.height = '100%';
            grid.style.backgroundImage = 'linear-gradient(to right, rgba(0,123,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,123,255,0.1) 1px, transparent 1px)';
            grid.style.backgroundSize = '20px 20px';
            grid.style.pointerEvents = 'none';
            grid.style.zIndex = '9998';
            document.body.appendChild(grid);
        }
    };
    
    // Highlight issues button
    const issuesBtn = document.createElement('button');
    issuesBtn.textContent = 'Highlight Potential Issues';
    issuesBtn.style.marginRight = '10px';
    issuesBtn.style.padding = '3px 8px';
    issuesBtn.style.fontSize = '12px';
    issuesBtn.style.backgroundColor = '#dc3545';
    issuesBtn.style.border = 'none';
    issuesBtn.style.borderRadius = '3px';
    issuesBtn.style.color = 'white';
    issuesBtn.style.cursor = 'pointer';
    
    issuesBtn.onclick = function() {
        // Highlight potential accessibility issues
        
        // Images without alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            highlightElement(img, 'Missing alt text');
        });
        
        // Small touch targets
        document.querySelectorAll('button, a, [role="button"]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                highlightElement(el, 'Touch target too small');
            }
        });
        
        // Low contrast text
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, label').forEach(el => {
            const style = window.getComputedStyle(el);
            const bgColor = style.backgroundColor;
            if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                // Skip elements with transparent background
                return;
            }
            
            const color = style.color;
            // This is a very simplified contrast check
            if (isSimilarColor(color, bgColor)) {
                highlightElement(el, 'Potential low contrast');
            }
        });
        
        // Display summary after 1 second
        setTimeout(() => {
            const issues = document.querySelectorAll('.compatibility-issue');
            alert(`Found ${issues.length} potential issues. Check elements with red borders.`);
        }, 1000);
    };
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.padding = '3px 8px';
    closeBtn.style.fontSize = '12px';
    closeBtn.style.backgroundColor = '#6c757d';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '3px';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    
    closeBtn.onclick = function() {
        document.body.removeChild(banner);
        
        // Remove any debug elements
        const grid = document.getElementById('debug-grid');
        if (grid) document.body.removeChild(grid);
        
        document.querySelectorAll('.compatibility-issue-tooltip').forEach(el => {
            el.parentNode.removeChild(el);
        });
    };
    
    controlsDiv.appendChild(gridBtn);
    controlsDiv.appendChild(issuesBtn);
    controlsDiv.appendChild(closeBtn);
    banner.appendChild(controlsDiv);
    
    // Add toggle for viewport width display
    const viewportDisplay = document.createElement('div');
    viewportDisplay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    viewportDisplay.style.color = 'white';
    viewportDisplay.style.position = 'fixed';
    viewportDisplay.style.top = '0';
    viewportDisplay.style.right = '0';
    viewportDisplay.style.padding = '5px 10px';
    viewportDisplay.style.fontSize = '12px';
    viewportDisplay.style.zIndex = '9999';
    viewportDisplay.id = 'viewport-display';
    
    function updateViewportDisplay() {
        viewportDisplay.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
    }
    
    updateViewportDisplay();
    window.addEventListener('resize', updateViewportDisplay);
    
    // Add to document
    document.body.appendChild(banner);
    document.body.appendChild(viewportDisplay);
    
    // Helper functions
    function highlightElement(element, message) {
        element.classList.add('compatibility-issue');
        
        const originalOutline = element.style.outline;
        const originalPosition = element.style.position;
        
        element.style.outline = '2px solid red';
        element.style.position = 'relative';
        
        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'compatibility-issue-tooltip';
        tooltip.textContent = message;
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '0';
        tooltip.style.backgroundColor = 'red';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px';
        tooltip.style.fontSize = '12px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.zIndex = '10000';
        tooltip.style.display = 'none';
        
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        
        // Restore original styles after 5 seconds
        setTimeout(() => {
            element.style.outline = originalOutline;
            element.style.position = originalPosition;
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
            element.classList.remove('compatibility-issue');
        }, 5000);
    }
    
    function isSimilarColor(color1, color2) {
        // Extremely simplified - just for demonstration
        // In real world, would use proper color contrast algorithms
        return (color1 === color2);
    }
})();
