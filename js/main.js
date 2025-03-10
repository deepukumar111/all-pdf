// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeDropdowns();
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Initialize search functionality if on home page
    if (document.getElementById('search-tools')) {
        initializeSearch();
    }
});

// Initialize Bootstrap dropdowns
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        new bootstrap.Dropdown(dropdown);
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-tools');
    const toolsContainer = document.getElementById('popular-tools-container');
    
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterTools(searchTerm);
    }, 300));
}

// Filter tools based on search term
function filterTools(searchTerm) {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.card-title').textContent.toLowerCase();
        const toolDescription = card.querySelector('.card-text').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Debounce function to limit search input processing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load categories data
const categories = [
    {
        name: 'Image Tools',
        icon: 'fas fa-image',
        tools: ['PNG Converter', 'JPG Converter', 'Image Resizer']
    },
    {
        name: 'SEO Tools',
        icon: 'fas fa-search',
        tools: ['Meta Tag Generator', 'Keyword Density', 'Sitemap Generator']
    },
    {
        name: 'Text Tools',
        icon: 'fas fa-font',
        tools: ['Word Counter', 'Case Converter', 'Text to Speech']
    }
    // Add more categories as needed
];

// Populate categories on home page
function populateCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    if (!categoriesContainer) return;

    categories.forEach(category => {
        const categoryHTML = `
            <div class="col-md-4 mb-4">
                <div class="category-card">
                    <i class="${category.icon} tool-icon"></i>
                    <h3>${category.name}</h3>
                    <p>${category.tools.length} tools</p>
                </div>
            </div>
        `;
        categoriesContainer.innerHTML += categoryHTML;
    });
}

// Initialize categories when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateCategories();
}); 