// Simulate orders data (in a real-world scenario, this would come from a database or API)
const orders = [
    { id: 1, item: 'Burger', quantity: 2, price: 100 },
    { id: 2, item: 'Pizza', quantity: 1, price: 200 },
    { id: 3, item: 'Beverages', quantity: 3, price: 150 }
  ];
  
  // Function to display the orders
  function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = ''; // Clear the list first
  
    // Loop through the orders and display them
    orders.forEach(order => {
      const orderCard = document.createElement('div');
      orderCard.classList.add('order-card');
      orderCard.innerHTML = `
        <h3>${order.item}</h3>
        <p>Quantity: ${order.quantity}</p>
        <p>Price: ₹${order.price}</p>
        <button class="cancel-btn" onclick="cancelOrder(${order.id})">Cancel Order</button>
      `;
      ordersList.appendChild(orderCard);
    });
  }
  
  // Function to handle order cancellation
  function cancelOrder(orderId) {
    // Find the index of the order
    const orderIndex = orders.findIndex(order => order.id === orderId);
  
    if (orderIndex !== -1) {
      // Remove the order from the orders array
      orders.splice(orderIndex, 1);
      alert('Your order has been cancelled!');
      displayOrders(); // Update the displayed orders
    } else {
      alert('Order not found!');
    }
  }
  
  // Display orders when the page loads
  document.addEventListener("DOMContentLoaded", function() {
    displayOrders(); // Initially load orders
  
    // Select all cancel buttons and add event listeners for cancellation
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    // Add event listener for each cancel button
    cancelButtons.forEach(button => {
      button.addEventListener('click', function() {
        const orderCard = this.closest('.order-card'); // Find the closest order card to the clicked button
        if (orderCard) {
          orderCard.remove(); // Remove the order card from the DOM
          alert('Order has been canceled successfully!');
        } else {
          console.error('Order card not found');
        }
      });
    });
  });

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

  