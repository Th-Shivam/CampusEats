let cart = [];

// Object to store image URLs for each product
const productImages = {
    'Deluxe Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
    'Ramen Bowl': 'https://images.unsplash.com/photo-1552611052-33e04de081de',
    'NY Cheesecake': 'https://images.unsplash.com/photo-1551024506-0bccd828d307'
};

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1,
            id: Date.now(),
            image: productImages[itemName] // Add the image URL from our mapping
        });
    }
    
    updateCartDisplay();
    showToast(`Added ${itemName} to cart!`);
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    if (cart.length === 0) {
        cartElement.innerHTML = `
            <p class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                Your cart is empty
            </p>`;
        return;
    }

    let cartHTML = '';
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item slide-in">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartElement.innerHTML = cartHTML;
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 2.99 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `₹${deliveryFee.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `₹${total.toFixed(2)}`;
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(itemId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

function showToast(message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create and show toast
    const toast = document.createElement('div');
    toast.className = 'toast slide-in';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Handle delivery time selection
document.getElementById('delivery-time').addEventListener('change', function(e) {
    const scheduledTime = document.getElementById('scheduled-time');
    if (e.target.value === 'schedule') {
        scheduledTime.classList.remove('hidden');
    } else {
        scheduledTime.classList.add('hidden');
    }
});

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Please add items to your cart first!');
        return;
    }
    
    // Add your checkout logic here
    showToast('Proceeding to checkout...');
}

// Add this to your existing CSS
const toastStyles = `
.toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.toast {
    background: white;
    color: var(--secondary-color);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: var(--card-shadow);
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.toast i {
    color: #28a745;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);