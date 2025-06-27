// Admin Dashboard Management
class AdminManager {
  constructor() {
    this.products = [
      {
        id: 1,
        nameEn: 'Royal Espresso',
        nameAr: 'إسبريسو ملكي',
        category: 'hot-drinks',
        price: 45
      },
      {
        id: 2,
        nameEn: 'Golden Caramel Frappé',
        nameAr: 'فرابيه الكراميل الذهبي',
        category: 'frappe',
        price: 70
      },
      {
        id: 3,
        nameEn: 'Royal Orange Juice',
        nameAr: 'عصير البرتقال الملكي',
        category: 'fresh-juices',
        price: 40
      },
      {
        id: 4,
        nameEn: 'Decadent Chocolate',
        nameAr: 'شوكولاتة فاخرة',
        category: 'milkshakes',
        price: 65
      }
    ];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupSearch();
  }
  
  setupEventListeners() {
    // Add product form
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
      addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddProduct(e);
      });
    }
    
    // Save price buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('save-price') || e.target.closest('.save-price')) {
        this.handleSavePrice(e);
      }
      
      if (e.target.classList.contains('delete-product') || e.target.closest('.delete-product')) {
        this.handleDeleteProduct(e);
      }
    });
  }
  
  setupSearch() {
    const searchInput = document.getElementById('search-products');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }
  }
  
  handleAddProduct(e) {
    const form = e.target;
    const formData = new FormData(form);
    
    const nameEn = form.querySelector('input[type="text"]').value;
    const nameAr = form.querySelectorAll('input[type="text"]')[1].value;
    const price = form.querySelector('input[type="number"]').value;
    const category = form.querySelector('select').value;
    const description = form.querySelector('textarea').value;
    
    // Validation
    if (!nameEn || !nameAr || !price || !category) {
      const isArabic = document.documentElement.dir === 'rtl';
      alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }
    
    // Add to products array
    const newProduct = {
      id: this.products.length + 1,
      nameEn,
      nameAr,
      category,
      price: parseInt(price),
      description
    };
    
    this.products.push(newProduct);
    
    // Show success message
    const isArabic = document.documentElement.dir === 'rtl';
    const message = isArabic 
      ? `تم إضافة ${nameAr} بنجاح!`
      : `${nameEn} added successfully!`;
    
    this.showSuccessMessage(message);
    
    // Reset form
    form.reset();
    
    // Update tables
    this.updateProductTables();
  }
  
  handleSavePrice(e) {
    const button = e.target.closest('.save-price');
    const row = button.closest('tr');
    const priceInput = row.querySelector('.price-input');
    const newPrice = parseInt(priceInput.value);
    
    if (newPrice <= 0) {
      const isArabic = document.documentElement.dir === 'rtl';
      alert(isArabic ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price');
      return;
    }
    
    // Find and update product
    const productName = row.cells[0].textContent.split(' / ')[0];
    const product = this.products.find(p => p.nameEn === productName);
    
    if (product) {
      product.price = newPrice;
      
      const isArabic = document.documentElement.dir === 'rtl';
      const message = isArabic 
        ? 'تم تحديث السعر بنجاح!'
        : 'Price updated successfully!';
      
      this.showSuccessMessage(message);
    }
  }
  
  handleDeleteProduct(e) {
    const button = e.target.closest('.delete-product');
    const row = button.closest('tr');
    const productName = row.cells[0].textContent.split(' / ')[0];
    
    const isArabic = document.documentElement.dir === 'rtl';
    const confirmMessage = isArabic 
      ? 'هل أنت متأكد من حذف هذا المنتج؟'
      : 'Are you sure you want to delete this product?';
    
    if (confirm(confirmMessage)) {
      // Remove from products array
      this.products = this.products.filter(p => p.nameEn !== productName);
      
      // Remove row from table
      row.remove();
      
      const successMessage = isArabic 
        ? 'تم حذف المنتج بنجاح!'
        : 'Product deleted successfully!';
      
      this.showSuccessMessage(successMessage);
      
      // Update manage products table
      this.updateProductTables();
    }
  }
  
  handleSearch(searchTerm) {
    const table = document.getElementById('products-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
      const productName = row.cells[0].textContent.toLowerCase();
      const category = row.cells[1].textContent.toLowerCase();
      
      if (productName.includes(searchTerm.toLowerCase()) || 
          category.includes(searchTerm.toLowerCase())) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  updateProductTables() {
    // Update manage products table
    const manageTable = document.getElementById('products-table');
    if (manageTable) {
      this.populateManageTable(manageTable);
    }
    
    // Update delete products table
    const deleteTable = document.getElementById('delete-products-table');
    if (deleteTable) {
      this.populateDeleteTable(deleteTable);
    }
  }
  
  populateManageTable(table) {
    table.innerHTML = '';
    
    this.products.forEach(product => {
      const row = table.insertRow();
      const categoryName = this.getCategoryName(product.category);
      
      row.innerHTML = `
        <td>${product.nameEn} / ${product.nameAr}</td>
        <td data-en="${categoryName.en}" data-ar="${categoryName.ar}">${categoryName.en}</td>
        <td>
          <input type="number" class="form-control luxury-input price-input" value="${product.price}" min="0">
        </td>
        <td>
          <button class="btn luxury-btn-outline btn-sm save-price">
            <i class="fas fa-save"></i>
          </button>
        </td>
      `;
    });
  }
  
  populateDeleteTable(table) {
    table.innerHTML = '';
    
    this.products.forEach(product => {
      const row = table.insertRow();
      const categoryName = this.getCategoryName(product.category);
      
      row.innerHTML = `
        <td>${product.nameEn} / ${product.nameAr}</td>
        <td data-en="${categoryName.en}" data-ar="${categoryName.ar}">${categoryName.en}</td>
        <td>${product.price} EGP</td>
        <td>
          <button class="btn btn-danger btn-sm delete-product">
            <i class="fas fa-trash me-1"></i>
            <span data-en="Delete" data-ar="حذف">Delete</span>
          </button>
        </td>
      `;
    });
  }
  
  getCategoryName(category) {
    const categories = {
      'hot-drinks': { en: 'Hot Drinks', ar: 'المشروبات الساخنة' },
      'frappe': { en: 'Frappé', ar: 'فرابيه' },
      'fresh-juices': { en: 'Fresh Juices', ar: 'العصائر الطازجة' },
      'milkshakes': { en: 'Milkshakes', ar: 'الميلك شيك' }
    };
    
    return categories[category] || { en: category, ar: category };
  }
  
  showSuccessMessage(message) {
    // Create and show success toast
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed';
    toast.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    toast.innerHTML = `
      <i class="fas fa-check-circle me-2"></i>
      ${message}
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

// Initialize admin manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize on dashboard page
  if (window.location.pathname.includes('dashboard.html')) {
    window.adminManager = new AdminManager();
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminManager;
}