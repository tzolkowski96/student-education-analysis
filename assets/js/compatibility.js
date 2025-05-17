// Cross-browser compatibility enhancements

// Polyfill for forEach on NodeList for older browsers like IE11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill for matches() and closest() for older browsers
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// Browser and device detection for targeted fixes
document.addEventListener('DOMContentLoaded', function() {
  // Add a class to the body based on browser for targeted CSS if needed
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  const isEdge = !isIE && !!window.StyleMedia;
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // More reliable Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                   (navigator.userAgent.includes('AppleWebKit') && !navigator.userAgent.includes('Chrome'));
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  
  if (isIE) document.body.classList.add('browser-ie');
  if (isEdge) document.body.classList.add('browser-edge');
  if (isFirefox) document.body.classList.add('browser-firefox');
  if (isSafari) document.body.classList.add('browser-safari');
  if (isChrome) document.body.classList.add('browser-chrome');
  
  // Add additional checks for mobile Safari
  const isMobileSafari = isSafari && /iPhone|iPad|iPod/.test(navigator.userAgent);
  if (isMobileSafari) document.body.classList.add('mobile-safari');
  
  // Add a class for touch devices to enhance touch interactions
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
  }
  
  // Fix for Safari's issue with vh units and mobile address bar
  function fixVhForMobile() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  window.addEventListener('resize', fixVhForMobile);
  fixVhForMobile();
  
  // Fix for Safari's issue with flexbox and nested flex items
  if (isSafari) {
    const demoContainer = document.querySelector('.demo-container');
    if (demoContainer) {
      const flexItems = demoContainer.querySelectorAll('.explanation-panel, #predict-form');
      flexItems.forEach(item => {
        item.style.webkitFlex = '1';
        item.style.flex = '1';
      });
    }
  }
  
  // Fix for mobile Safari viewport issues
  if (isMobileSafari) {
    // Add meta viewport tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      metaViewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no';
      document.head.appendChild(metaViewport);
    }
    
    // Fix for 100vh in mobile Safari
    const applyFullHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Apply to any full-height elements
      document.querySelectorAll('.full-height').forEach(el => {
        el.style.height = `calc(var(--vh, 1vh) * 100)`;
      });
    };
    
    window.addEventListener('resize', applyFullHeight);
    window.addEventListener('orientationchange', applyFullHeight);
    applyFullHeight();
  }
  
  // Handle slow network connections better
  if ('connection' in navigator) {
    const conn = navigator.connection;
    if (conn.saveData || conn.effectiveType.includes('2g')) {
      // Reduce image quality or defer loading
      const images = document.querySelectorAll('img:not([loading="eager"])');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add placeholder for images that haven't loaded yet
        if (!img.complete) {
          img.style.backgroundColor = '#e9f0fa';
        }
      });
    }
  }
  
  // Input event compatibility for the live demo
  const numericInputs = document.querySelectorAll('#live-demo input[type="number"]');
  numericInputs.forEach(input => {
    // Add simple validation for browsers that don't fully support number inputs
    input.addEventListener('input', function() {
      const min = parseInt(this.getAttribute('min'), 10);
      const max = parseInt(this.getAttribute('max'), 10);
      let value = parseInt(this.value, 10);
      
      if (isNaN(value)) {
        this.value = min;
      } else if (value < min) {
        this.value = min;
      } else if (value > max) {
        this.value = max;
      }
    });
  });
  
  // Cross-browser focus for better accessibility
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach(el => {
    el.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    el.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  });
});
