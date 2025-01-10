// Handle payment method change
document.getElementById('payment-method').addEventListener('change', function () {
    const method = this.value;

    // Hide all payment details sections
    document.querySelectorAll('.payment-details').forEach(div => {
        div.style.display = 'none';
    });

    // Show the selected payment method details
    if (method === 'card') {
        document.getElementById('card-details').style.display = 'block';
    } else if (method === 'upi') {
        document.getElementById('upi-details').style.display = 'block';
    } else if (method === 'netbanking') {
        document.getElementById('netbanking-details').style.display = 'block';
    } else if (method === 'wallet') {
        document.getElementById('wallet-details').style.display = 'block';
    }
});

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const paymentMethod = document.getElementById('payment-method').value;
    const amount = document.getElementById('payment-total').textContent;
    let paymentDetails;

    // Collect payment details based on the method
    if (paymentMethod === 'card') {
        paymentDetails = {
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry-date').value,
            cvv: document.getElementById('cvv').value
        };
    } else if (paymentMethod === 'upi') {
        paymentDetails = { upiId: document.getElementById('upi-id').value };
    } else if (paymentMethod === 'netbanking') {
        paymentDetails = {
            bankName: document.getElementById('bank-name').value
        };
    } else if (paymentMethod === 'wallet') {
        paymentDetails = { walletNumber: document.getElementById('wallet-number').value };
    }

    // Validate dummy input fields
    if (!paymentDetails || Object.values(paymentDetails).some(value => !value)) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate successful payment
    const orderId = `ORD${Date.now()}`; // Generate a unique order ID
    const orderDetails = {
        id: orderId,
        amount: amount,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleDateString(),
    };

    // Save order details in localStorage and redirect to confirmation page
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = `confirmation.html`;
});
// Handle payment method change
document.getElementById('payment-method').addEventListener('change', function () {
    const method = this.value;

    // Hide all payment details sections
    document.querySelectorAll('.payment-details').forEach(div => {
        div.style.display = 'none';
    });

    // Show the selected payment method details
    if (method === 'card') {
        document.getElementById('card-details').style.display = 'block';
    } else if (method === 'upi') {
        document.getElementById('upi-details').style.display = 'block';
    } else if (method === 'netbanking') {
        document.getElementById('netbanking-details').style.display = 'block';
    } else if (method === 'wallet') {
        document.getElementById('wallet-details').style.display = 'block';
    }
});

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const paymentMethod = document.getElementById('payment-method').value;
    const amount = document.getElementById('payment-total').textContent;
    let paymentDetails;

    // Collect payment details based on the method
    if (paymentMethod === 'card') {
        paymentDetails = {
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry-date').value,
            cvv: document.getElementById('cvv').value
        };
    } else if (paymentMethod === 'upi') {
        paymentDetails = { upiId: document.getElementById('upi-id').value };
    } else if (paymentMethod === 'netbanking') {
        paymentDetails = {
            bankName: document.getElementById('bank-name').value
        };
    } else if (paymentMethod === 'wallet') {
        paymentDetails = { walletNumber: document.getElementById('wallet-number').value };
    }

    // Validate dummy input fields
    if (!paymentDetails || Object.values(paymentDetails).some(value => !value)) {
        alert('Please fill in all required fields.');
        return;
    }

    // Generate a random order ID
    const orderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

    // Get the current date and time
    const now = new Date();
    const dateTime = now.toLocaleString();

    // Prepare order details
    const orderDetails = {
        id: orderId,
        amount: amount,
        paymentMethod: paymentMethod,
        dateTime: dateTime
    };

    // Save order details in localStorage and redirect to confirmation page
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = `confirmation.html`;
});

// Set total amount on page load
document.addEventListener('DOMContentLoaded', () => {
    const totalAmount = localStorage.getItem('totalAmount') || '0';
    document.getElementById('payment-total').textContent = totalAmount;
});

// Set total amount on page load
document.addEventListener('DOMContentLoaded', () => {
    const totalAmount = localStorage.getItem('totalAmount') || '0';
    document.getElementById('payment-total').textContent = totalAmount;
});
