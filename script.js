let cart = [];

// Object to store image URLs for each product
const productImages = {
    'Deluxe Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
    'Ramen Bowl': 'https://images.unsplash.com/photo-1552611052-33e04de081de',
    'NY Cheesecake': 'https://images.unsplash.com/photo-1551024506-0bccd828d307'
};

// Menu items for each canteen
const canteenMenus = {
  'ab-dakshin': [
    {
      name: 'Masala Dosa',
      description: 'Crispy rice crepe with spiced potato filling',
      price: 60,
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1643268972535-a2b100ff3632?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge: 'Bestseller'
    },
    {
      name: 'Idli Sambar',
      description: 'Steamed rice cakes with lentil soup and chutneys',
      price: 45,
      category: 'South Indian',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc'
    },
    {
      name: 'Chicken Biryani',
      description: 'Fragrant rice cooked with spiced chicken',
      price: 120,
      category: 'North Indian',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      badge: 'Spicy'
    }
  ],
  'mayuri': [
    {
      name: 'Butter Chicken',
      description: 'Creamy tomato-based curry with tender chicken',
      price: 180,
      category: 'North Indian',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
      badge: 'Popular'
    },
    {
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with spices',
      price: 140,
      category: 'North Indian',
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'
    },
    {
      name: 'Schezwan Noodles',
      description: 'Spicy Chinese-style noodles with vegetables',
      price: 110,
      category: 'Chinese',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246'
    }
  ],
  'crcl': [
    {
      name: 'Vada Pav',
      description: 'Spiced potato fritter in a bun',
      price: 30,
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84',
      badge: 'Quick Bite'
    },
    {
      name: 'Masala Maggi',
      description: 'Instant noodles with special spice blend',
      price: 50,
      category: 'Snacks',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841',
      badge: 'Student Favorite'
    },
    {
      name: 'Cold Coffee',
      description: 'Creamy blended coffee with ice cream',
      price: 60,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
    }
  ]
};

function addToCart(itemName, price, image) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1,
            id: Date.now(),
            image: image
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

function selectCanteen(canteen) {
  const selectedCanteenDiv = document.getElementById('selected-canteen');
  const menuItems = document.querySelector('.menu-items');
  
  // Update selected canteen display
  selectedCanteenDiv.innerHTML = `<h3>${canteen.toUpperCase().replace('-', ' ')} Menu</h3>`;
  
  // Load menu items for selected canteen
  const menu = canteenMenus[canteen];
  let menuHTML = '';
  
  menu.forEach(item => {
    menuHTML += `
      <div class="item" data-category="${item.category}">
        <div class="item-img-container">
          <img src="${item.image}" alt="${item.name}">
          ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
          <div class="item-footer">
            <p class="price">₹${item.price}</p>
            <button class="btn" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  menuItems.innerHTML = menuHTML;
  
  // Update product images mapping
  menu.forEach(item => {
    productImages[item.name] = item.image;
  });
  
  // Scroll to menu section
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}