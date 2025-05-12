import React, { useState, useRef, useEffect } from 'react';
import '../styles/Home.css';

// Sample product data with badges and categories
const recentlyViewed = [
  {
    id: 1,
    name: 'Premium BWP Plywood (8x4 ft)',
    price: 2499,
    discountedPrice: 1999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: '20% OFF',
    badgeType: 'discount',
    competitorPrices: {
      'Home Depot': 2299,
      'Lowe\'s': 2199
    }
  },
  {
    id: 2,
    name: 'Stainless Steel Cabinet Hinges (5-Pack)',
    price: 1299,
    discountedPrice: 999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'SALE',
    badgeType: 'sale',
    competitorPrices: {
      'Home Depot': 1199,
      'Lowe\'s': 1099
    }
  },
  {
    id: 3,
    name: 'PVA Wood Adhesive (1L)',
    price: 899,
    discountedPrice: 699,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: '',
    badgeType: '',
    competitorPrices: {
      'Home Depot': 799,
      'Lowe\'s': 749
    }
  },
  {
    id: 4,
    name: 'MDF Board (8x4 ft)',
    price: 1899,
    discountedPrice: 1499,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'NEW',
    badgeType: 'new',
    competitorPrices: {
      'Home Depot': 1699,
      'Lowe\'s': 1599
    }
  },
  {
    id: 9,
    name: 'Wood Polish (500ml)',
    price: 599,
    discountedPrice: 449,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'BEST',
    badgeType: 'best',
    competitorPrices: {
      'Home Depot': 499,
      'Lowe\'s': 479
    }
  },
  {
    id: 10,
    name: 'Wall Paint (5L)',
    price: 3499,
    discountedPrice: 2999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'LIMITED',
    badgeType: 'limited',
    competitorPrices: {
      'Home Depot': 3299,
      'Lowe\'s': 3199
    }
  },
];

const recommended = [
  {
    id: 5,
    name: 'Engineered Wood Flooring (Pack of 10)',
    price: 4999,
    discountedPrice: 3999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'BEST SELLER',
    badgeType: 'best',
    competitorPrices: {
      'Home Depot': 4599,
      'Lowe\'s': 4299
    }
  },
  {
    id: 6,
    name: 'Waterproof Sealant (500ml)',
    price: 1499,
    discountedPrice: 1199,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: '',
    badgeType: '',
    competitorPrices: {
      'Home Depot': 1399,
      'Lowe\'s': 1299
    }
  },
  {
    id: 7,
    name: 'Brass Cabinet Knobs (Set of 10)',
    price: 999,
    discountedPrice: 799,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'LIMITED',
    badgeType: 'limited',
    competitorPrices: {
      'Home Depot': 899,
      'Lowe\'s': 849
    }
  },
  {
    id: 8,
    name: 'Marble Countertop (8x4 ft)',
    price: 2799,
    discountedPrice: 2299,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: '',
    badgeType: '',
    competitorPrices: {
      'Home Depot': 2599,
      'Lowe\'s': 2499
    }
  },
  {
    id: 11,
    name: 'Ceramic Tiles (Box of 10)',
    price: 3999,
    discountedPrice: 3499,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'NEW',
    badgeType: 'new',
    competitorPrices: {
      'Home Depot': 3799,
      'Lowe\'s': 3699
    }
  },
  {
    id: 12,
    name: 'LED Light Fixtures (Pack of 4)',
    price: 1799,
    discountedPrice: 1499,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    badge: 'SALE',
    badgeType: 'sale',
    competitorPrices: {
      'Home Depot': 1699,
      'Lowe\'s': 1599
    }
  },
];

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const searchBarRef = useRef(null);

  // Handle search submission
  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchHistory(prev => {
        // Remove if already exists and add to front
        const filtered = prev.filter(item => item !== query);
        return [query, ...filtered].slice(0, 5); // Keep only last 5 searches
      });
      setShowSearchHistory(false);
      // Here you would typically make an API call to fetch search results
    }
  };

  // Handle search history click
  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Close search history when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearchHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate cart totals
  const calculateCartTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
    const discount = subtotal > 5000 ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Placeholder icons for products
  const placeholderIcons = [
    '📄', // file
    'ℹ️', // info
    '⚗️', // flask
    '⚙️', // gear
    '🎚️', // sliders
    '⌨️', // keyboard
    '🔩', // bolt
    '🧩', // puzzle
  ];

  const ProductCard = ({ product, iconIdx }) => {
    const quantity = getCartQuantity(product.id);

    return (
      <div className="product-card-modern">
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-image" />
          ) : (
            <div className="product-image-placeholder">
              <span className="placeholder-icon">{placeholderIcons[iconIdx % placeholderIcons.length]}</span>
            </div>
          )}
          {product.badge && (
            <span className={`badge badge-${product.badgeType}`}>{product.badge}</span>
          )}
        </div>
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-prices">
            <span className="discounted-price">₹{product.discountedPrice.toLocaleString()}</span>
            <span className="original-price">₹{product.price.toLocaleString()}</span>
            <span className="discount-percentage">
              {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
            </span>
          </div>
          <div className="competitor-prices">
            <div className="competitor-prices-header">Compare Prices:</div>
            {Object.entries(product.competitorPrices).map(([competitor, price]) => (
              <div key={competitor} className="competitor-price">
                <span className="competitor-name">{competitor}:</span>
                <span className="competitor-amount">₹{price.toLocaleString()}</span>
                <span className={`price-difference ${price > product.discountedPrice ? 'higher' : 'lower'}`}>
                  {price > product.discountedPrice ? '↑' : '↓'} ₹{Math.abs(price - product.discountedPrice)}
                </span>
              </div>
            ))}
          </div>
          <div className="product-actions">
            {quantity > 0 ? (
              <div className="quantity-controls">
                <button 
                  className="quantity-btn" 
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  -
                </button>
                <span className="quantity-number">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  +
                </button>
              </div>
            ) : (
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            )}
            <button className="wishlist-btn" title="Add to Wishlist">♡</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-modern-container">
      {/* Header */}
      <header className="modern-header">
        <div className="logo"><span className="logo-icon"></span> <span className="logo-text">Multiply</span></div>
        <div className="search-bar-container" ref={searchBarRef}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for hardware materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchHistory(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
          />
          {showSearchHistory && searchHistory.length > 0 && (
            <div className="search-history-dropdown">
              <div className="search-history-header">
                <span>Recent Searches</span>
                <button 
                  className="clear-history-btn"
                  onClick={() => setSearchHistory([])}
                >
                  Clear History
                </button>
              </div>
              {searchHistory.map((query, index) => (
                <div
                  key={index}
                  className="search-history-item"
                  onClick={() => handleHistoryClick(query)}
                >
                  <span className="history-icon">🕒</span>
                  {query}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cart-container">
          <button className="cart-btn" onClick={toggleCart}>
            <span role="img" aria-label="cart">🛒</span>
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content-modern">
        {/* Recently Viewed */}
        <section className="section-modern">
          <div className="section-header">
            <h2>Recently Viewed</h2>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="product-list-horizontal">
            {recentlyViewed.map((product, idx) => (
              <ProductCard key={product.id} product={product} iconIdx={idx} />
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="section-modern">
          <div className="section-header">
            <h2>Recommended For You</h2>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="product-list-horizontal">
            {recommended.map((product, idx) => (
              <ProductCard key={product.id} product={product} iconIdx={idx + 4} />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-sidebar-modern">
          <div className="cart-header-modern">
            <h2>Your Cart</h2>
            <button onClick={toggleCart}>×</button>
          </div>
          <div className="cart-items-modern">
            {cartItems.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-modern">
                  <div className="cart-item-image">
                    <span className="placeholder-icon">{placeholderIcons[item.id % placeholderIcons.length]}</span>
                  </div>
                  <div className="cart-item-details-modern">
                    <h3>{item.name}</h3>
                    <p>₹{item.discountedPrice.toLocaleString()}</p>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <div className="cart-summary">
                {(() => {
                  const { subtotal, discount, total } = calculateCartTotals();
                  return (
                    <>
                      <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="cart-summary-row discount">
                          <span>Discount (10%)</span>
                          <span>-₹{discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="cart-summary-row total">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="cart-actions">
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home; 