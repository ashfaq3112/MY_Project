const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/pay', (req, res) => {
    const { paymentMethod, paymentDetails, amount } = req.body;

    // Mock payment processing (integrate with a real payment gateway)
    if (!paymentMethod || !paymentDetails || !amount) {
        return res.status(400).json({ success: false, message: 'Payment failed. Please check your details and try again.' });
    }

    // Example of different payment method handling
    switch(paymentMethod) {
        case 'card':
            // Process card payment
            console.log('Processing card payment:', paymentDetails);
            break;
        case 'upi':
            // Process UPI payment
            console.log('Processing UPI payment:', paymentDetails);
            break;
        case 'netbanking':
            // Process net banking payment
            console.log('Processing net banking payment:', paymentDetails);
            break;
        case 'wallet':
            // Process mobile wallet payment
            console.log('Processing mobile wallet payment:', paymentDetails);
            break;
        default:
            return res.status(400).json({ success: false, message: 'Invalid payment method.' });
    }

    // Mock successful payment response
    res.json({ success: true, message: 'Payment processed successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
