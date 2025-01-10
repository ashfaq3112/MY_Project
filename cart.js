document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalPrice = document.getElementById("cart-total-price");

  const renderCartItems = () => {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
      const cartCard = document.createElement("div");
      cartCard.classList.add("cart-item-card");

      // Render the cart item
      cartCard.innerHTML = `
        <img src="${item.image || "./images/Burger.png   "}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <div class="quantity-control">
          <button class="decrease-quantity" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity" data-index="${index}">+</button>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;

      total += item.price * item.quantity;
      cartItemsContainer.appendChild(cartCard);
    });

    cartTotalPrice.textContent = `₹${total.toFixed(2)}`;

    // Update cart icon dynamically
    updateCartIcon();
  };

  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");

    if (e.target.classList.contains("decrease-quantity") && cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    } else if (e.target.classList.contains("increase-quantity")) {
      cartItems[index].quantity += 1;
    } else if (e.target.classList.contains("remove-item")) {
      cartItems.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCartItems();
  });

  const updateCartIcon = () => {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartCountElement = document.querySelector(".cart-count");

    // Update the cart count and total dynamically
    let totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;

    if (totalItems > 0) {
      cartCountElement.classList.add("show");
    } else {
      cartCountElement.classList.remove("show");
    }
  };

  renderCartItems();

  document.getElementById("checkout-btn")?.addEventListener("click", () => {
    const totalAmount = cartTotalPrice.textContent;
    localStorage.setItem("totalAmount", totalAmount);
    alert(`Checkout successful! Total Amount: ₹${totalAmount}`);
  });
});

// Add new items to the cart from the menu
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const menuCard = button.closest(".menu-card");
    const itemId = menuCard.dataset.id || Math.random().toString(36).substring(7); // Generate fallback ID
    const itemName = menuCard.querySelector("h3").textContent;
    const itemPrice = parseFloat(menuCard.dataset.price);
    const itemImage = menuCard.querySelector("img")?.src || "./images/placeholder.png";

    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
    alert(`${itemName} added to the cart!`);
  });
});
