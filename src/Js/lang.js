// Language Management System
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translations = {
      en: {
        font: 'var(--font-english)'
      },
      ar: {
        font: 'var(--font-arabic)'
      }
    };
    
    this.init();
  }
  
  init() {
    this.setupLanguageToggle();
    this.applyLanguage(this.currentLang);
  }
  
  setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    
    if (langToggle && langText) {
      // Set initial text
      langText.textContent = this.currentLang === 'en' ? 'عربي' : 'EN';
      
      langToggle.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }
  }
  
  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.applyLanguage(this.currentLang);
    localStorage.setItem('selectedLanguage', this.currentLang);
    
    // Update toggle button text
    const langText = document.getElementById('lang-text');
    if (langText) {
      langText.textContent = this.currentLang === 'en' ? 'عربي' : 'EN';
    }
  }
  
  applyLanguage(lang) {
    const html = document.documentElement;
    const body = document.body;
    
    // Always keep LTR direction
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lang);
    
    // Apply font family based on language
    if (lang === 'ar') {
      body.style.fontFamily = this.translations[lang].font;
    } else {
      body.style.fontFamily = this.translations[lang].font;
    }
    
    // Update all translatable elements
    this.updateTranslatableElements(lang);
    
    // Update page title
    this.updatePageTitle(lang);
    
    // Update form placeholders
    this.updateFormPlaceholders(lang);
  }
  
  updateTranslatableElements(lang) {
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    
    elements.forEach(element => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });
  }
  
  updatePageTitle(lang) {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      const titleText = titleElement.getAttribute(`data-${lang}`);
      if (titleText) {
        titleElement.textContent = titleText;
      }
    }
  }
  
  updateFormPlaceholders(lang) {
    // Update search placeholder
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
      searchInput.placeholder = lang === 'en' ? 'Search products...' : 'البحث عن المنتجات...';
    }
  }
  
  getCurrentLanguage() {
    return this.currentLang;
  }
  
  isArabic() {
    return this.currentLang === 'ar';
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.languageManager = new LanguageManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageManager;
}