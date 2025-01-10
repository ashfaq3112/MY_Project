
// Page Load Animation
window.onload = () => {
    document.body.classList.add('page-loaded');
  };

    // Dynamic Cart Management
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
    // Function to update cart display
    const updateCartDisplay = () => {
      const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      document.getElementById("cart-count").textContent = cartCount;
      document.getElementById("cart-total").textContent = cartTotal.toFixed(2);
    };
  
    // Add items to cart and update localStorage
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const menuCard = e.target.closest(".menu-card");
        const name = menuCard.querySelector("h3").textContent;
        const price = parseFloat(menuCard.dataset.price);
  
        // Check if item already exists in cart
        const existingItem = cart.find((item) => item.name === name);
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }
  
        localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
        updateCartDisplay(); // Update cart count and total
      });
    });
  
    updateCartDisplay(); // Initial update
  });
  