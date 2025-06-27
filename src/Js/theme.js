// Theme Management System
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('selectedTheme') || 'dark';
    this.init();
  }
  
  init() {
    this.setupThemeToggle();
    this.applyTheme(this.currentTheme);
  }
  
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('selectedTheme', this.currentTheme);
  }
  
  applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-toggle i');
    
    // Remove existing theme classes
    body.classList.remove('dark-theme', 'light-theme');
    
    // Apply new theme
    body.classList.add(`${theme}-theme`);
    
    // Update toggle icon
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
      } else {
        themeIcon.className = 'fas fa-moon';
      }
    }
    
    // Apply theme-specific styles
    this.applyThemeStyles(theme);
  }
  
  applyThemeStyles(theme) {
    // Update CSS custom properties for theme switching
    const root = document.documentElement;
    
    if (theme === 'light') {
      // Light theme adjustments
      root.style.setProperty('--shadow-gold', '0 0 20px rgba(212, 175, 55, 0.2)');
    } else {
      // Dark theme adjustments
      root.style.setProperty('--shadow-gold', '0 0 20px rgba(212, 175, 55, 0.3)');
    }
    
    // Update navbar background for smooth transition
    this.updateNavbarTheme(theme);
  }
  
  updateNavbarTheme(theme) {
    const navbar = document.querySelector('.luxury-navbar');
    if (navbar) {
      if (theme === 'light') {
        navbar.style.background = 'rgba(245, 245, 220, 0.95)';
      } else {
        navbar.style.background = 'rgba(11, 11, 11, 0.95)';
      }
    }
  }
  
  getCurrentTheme() {
    return this.currentTheme;
  }
  
  isDarkMode() {
    return this.currentTheme === 'dark';
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.themeManager = new ThemeManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}