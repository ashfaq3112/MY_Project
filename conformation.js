document.addEventListener('DOMContentLoaded', () => {
    // Retrieve order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));

    if (!orderDetails) {
        alert('No order details found!');
        window.location.href = 'index.html';
        return;
    }

    // Populate the receipt details
    const receiptDiv = document.getElementById('receipt');
    receiptDiv.innerHTML = `
        <p><strong>Order ID:</strong> ${orderDetails.id}</p>
        <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
        <p><strong>Amount Paid:</strong> ₹${orderDetails.amount}</p>
        <p><strong>Date & Time:</strong> ${orderDetails.dateTime}</p>
    `;

    // Add download receipt functionality
    const downloadButton = document.getElementById('download-receipt');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            // Generate PDF content
            const { jsPDF } = window.jspdf; // Ensure jsPDF is loaded
            const doc = new jsPDF();

            // Add receipt content to the PDF
            doc.setFontSize(14);
            doc.text('Thank you for your payment!', 20, 20);
            doc.text('Order Receipt:', 20, 30);
            doc.text('----------------------------', 20, 40);
            doc.text(`Order ID: ${orderDetails.id}`, 20, 50);
            doc.text(`Total Amount: ₹${orderDetails.amount}`, 20, 60);
            doc.text(`Payment Method: ${orderDetails.paymentMethod}`, 20, 70);
            doc.text(`Order Date & Time: ${orderDetails.dateTime}`, 20, 80);
            doc.text('----------------------------', 20, 90);

            // Trigger download
            doc.save(`Receipt_${orderDetails.id}.pdf`);
        });
    }
});
