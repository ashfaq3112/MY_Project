// Initialize Slick Carousel
$(document).ready(function () {
  $('.carousel').slick({
    autoplay: true,        // Enables autoplay
    autoplaySpeed: 2000,   // Speed of the autoplay (2 seconds)
    dots: true,            // Show navigation dots
    arrows: false,         // Hide navigation arrows
    infinite: true,        // Loop the carousel
    speed: 1000,           // Transition speed (ms)
  });
});

// Smooth scroll to menu section on 'Order Now' button click
document.querySelector(".hero button").addEventListener("click", () => {
  const menuSection = document.getElementById("menu");
  menuSection.scrollIntoView({ behavior: "smooth" });
});
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Function to update cart display
  const updateCartDisplay = () => {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = `₹${cartTotal.toFixed(2)}`;
  };

  // Add items to cart and update localStorage
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const menuCard = e.target.closest(".menu-card");
      const name = menuCard.querySelector("h3").textContent;
      const price = parseFloat(menuCard.dataset.price);
      const image = menuCard.querySelector("img")?.src || "./images/placeholder.png"; // Default image

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1, image });
      }

      localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
      updateCartDisplay(); // Update cart count and total
      alert(`${name} has been added to the cart!`);
    });
  });

  updateCartDisplay(); // Initial update
});

// Function to render cart items (if applicable on cart page)
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = ""; // Clear previous items

  cart.forEach((item) => {
    const cartCard = document.createElement("div");
    cartCard.classList.add("cart-item-card");

    cartCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <div class="quantity-control">
        <span>Quantity: ${item.quantity}</span>
      </div>
    `;

    cartItemsContainer.appendChild(cartCard);
  });

  const cartTotalPrice = document.getElementById("cart-total-price");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotalPrice) cartTotalPrice.textContent = `₹${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderCartItems);

// Simulate orders data
const orders = [
  { id: 1, item: 'Burger', quantity: 2, price: 100 },
  { id: 2, item: 'Pizza', quantity: 1, price: 200 },
  { id: 3, item: 'Beverages', quantity: 3, price: 150 },
];

// Function to display orders
function displayOrders() {
  const ordersList = document.getElementById('orders-list');
  if (!ordersList) return;

  ordersList.innerHTML = ''; // Clear the list first

  // Loop through the orders and display them
  orders.forEach((order) => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');
    orderCard.innerHTML = `
      <h3>${order.item}</h3>
      <p>Quantity: ${order.quantity}</p>
      <p>Price: ₹${order.price}</p>
      <button onclick="cancelOrder(${order.id})">Cancel Order</button>
    `;
    ordersList.appendChild(orderCard);
  });
}

// Function to handle order cancellation
function cancelOrder(orderId) {
  // Find the index of the order
  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    // Remove the order from the orders array
    orders.splice(orderIndex, 1);
    alert('Your order has been cancelled!');
    displayOrders(); // Update the displayed orders
  }
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Page Load Animation
window.onload = () => {
  document.body.classList.add('page-loaded');
};

// Display orders on page load (if the orders-list exists)
document.addEventListener("DOMContentLoaded", displayOrders);

// Navbar Scroll Effect Enhancement
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
