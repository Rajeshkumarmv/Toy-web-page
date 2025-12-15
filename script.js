// Product Data
const products = [
    {
        id: 1,
        name: "Racing Car Set",
        category: "vehicles",
        price: 29.99,
        image: "https://www.toyworld.com.au/cdn/shop/files/CARRERA_20GO_20SET_20FLYING_20LAP_20_F1_20_3_6ca27a08-5447-4466-be7e-d186b4b753ae_2048x2048.jpg?v=1732670167",
        rating: 4.3,
        badge: "Popular"
    },
    {
        id: 2,
        name: "Superhero Action Figure",
        category: "action",
        price: 19.99,
        image: "https://tse4.mm.bing.net/th/id/OIP.jHLUQxksik0LPy-gCm307QHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.8,
        badge: "New"
    },
    {
        id: 3,
        name: "Soft Teddy Bear",
        category: "dolls",
        price: 24.99,
        image: "https://tse1.mm.bing.net/th/id/OIP.125EW7gV4SUY-oK3KrlHyQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.7,
        badge: null
    },
    {
        id: 4,
        name: "Building Blocks Deluxe",
        category: "building",
        price: 44.99,
        image: "https://tse2.mm.bing.net/th/id/OIP.CEE-_9d7EMwKZ7gNRKknMQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.9,
        badge: "Premium"
    },
    {
        id: 5,
        name: "Outdoor Soccer Ball",
        category: "outdoor",
        price: 15.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/719AczungSL._AC_SL1500_.jpg",
        rating: 4.2,
        badge: null
    },
    {
        id: 6,
        name: "Robot Warrior",
        category: "action",
        price: 39.99,
        image: "https://tse1.mm.bing.net/th/id/OIP.Btfn6l_lsEOglzRDShsodwHaJD?w=884&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.4,
        badge: "Hot"
    },
    {
        id: 7,
        name: "Train Set Collection",
        category: "vehicles",
        price: 54.99,
        image: "https://tse4.mm.bing.net/th/id/OIP.PeVplZ9bnYCFNjbst_-jFAHaEY?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.8,
        badge: "Deluxe"
    },
    {
        id: 8,
        name: "Princess Doll",
        category: "dolls",
        price: 22.99,
        image: "https://tse1.mm.bing.net/th/id/OIP._QDrXh0pBQN61pmBdU6T9gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        rating: 4.5,
        badge: null
    },
    {
        id: 9,
        name: "Magnetic Tiles Set",
        category: "building",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/81aVJZnRZVL.jpg",
        rating: 4.9,
        badge: "Creative"
    },
    {
        id: 10,
        name: "Toy Airplane",
        category: "vehicles",
        price: 18.99,
        image: "https://m.media-amazon.com/images/I/81QvUnsQPUL._AC_SL1500_.jpg",
        rating: 4.3,
        badge: null
    },
    {
        id: 11,
        name: "Dinosaur Figures",
        category: "action",
        price: 32.99,
        image: "https://m.media-amazon.com/images/I/91t-KjmAx9L.jpg",
        rating: 4.6,
        badge: "Popular"
    },
    {
        id: 12,
        name: "Jump Rope",
        category: "outdoor",
        price: 8.99,
        image: "https://th.bing.com/th/id/R.1c767771eff553dcd677c830774f8ba8?rik=qydW8MSZdVahnw&riu=http%3a%2f%2fmedia.istockphoto.com%2fphotos%2fjump-rope-picture-id481079317%3fk%3d6%26m%3d481079317%26s%3d612x612%26w%3d0%26h%3diYZLfBLS8ESHAwLPM1QdkmgMeu_rpiTGCvV0z2oyg_Y%3d&ehk=xdY9KaSErxFtdSSJCksFCcn3kJ%2fG%2fHLuW%2fuIJlPgSLY%3d&risl=&pid=ImgRaw&r=0",
        rating: 4.1,
        badge: null
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total span');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupEventListeners();
    updateCartUI();
});

// Render Products
function renderProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star"></i>';
    }
    return stars;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #ff6b6b; color: white;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Item removed from cart');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });
    
    // Cart toggle
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            showNotification(`Thank you for subscribing with ${email}!`);
            e.target.reset();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-box i');
    
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length > 2) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            productGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            ${generateStars(product.rating)}
                            <span>(${product.rating})</span>
                        </div>
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
            
            if (filteredProducts.length === 0) {
                productGrid.innerHTML = '<p style="text-align: center; padding: 2rem; grid-column: 1/-1;">No products found</p>';
            }
        } else if (searchTerm.length === 0) {
            renderProducts('all');
        }
    };
    
    searchInput.addEventListener('input', performSearch);
    searchIcon.addEventListener('click', performSearch);
    
    // Category cards click
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const activeFilter = document.querySelector(`[data-filter="${category}"]`);
            if (activeFilter) {
                activeFilter.classList.add('active');
                renderProducts(category);
            }
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
    
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Shop Now') {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            } else if (button.textContent === 'View Catalog') {
                document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                showNotification('Proceeding to checkout...');
                // In a real application, this would navigate to a checkout page
                setTimeout(() => {
                    cart = [];
                    updateCartUI();
                    cartSidebar.classList.remove('active');
                    showNotification('Order placed successfully! Thank you for your purchase.');
                }, 2000);
            } else {
                showNotification('Your cart is empty');
            }
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add loading state for product cards
function addLoadingState() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
}

// Initialize loading states
setTimeout(addLoadingState, 100);

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .deal-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
