// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button
let total = parseInt(JSON.parse(localStorage.getItem("total")));

var options = {
  key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
  amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  name: "MyShop Checkout",
  description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  theme: {
    color: "blue",
  },
  image:
    "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  // callback_url: "https://shop/index.html", not working
  // callback_url: "/cart/index.html",

  handler: function (response) {
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("total")
    console.log('Razorpay payment handler fired');
    console.log(response);
    if (response.error) {
      console.log('Razorpay payment failed');
      window.location.href = "/cart/index.html"; // Set this to the URL of your failure page
    } else {
      console.log('Razorpay payment successful');
      window.location.href = "/shop/index.html"; // Set this to the URL of your success page
    }
  },
};

var rzpy1 = new Razorpay(options);

document.getElementById("rzp-button1").onclick = function (e) {
  rzpy1.open();
  e.preventDefault();
};

// rzpy1.on("payment.success", function (response) {
//   // Payment successful
//   // localStorage.removeItem("cartItems"); // Remove cart items from localStorage
//   window.location.href = "/shop/index.html"; // Set this to the URL of your success page
// });

// rzpy1.on("payment.error", function (response) {
//   // Payment failed or was cancelled
//   window.location.href = "/cart/index.html"; // Set this to the URL of your failure page
// });

// rzpy1.on("payment.cancel", function (response) {
//   // Payment was cancelled by the user
//   console.log("Payment cancelled by user");
//   window.location.href = "/cart/index.html"; // Set this to the URL of your failure page
// });
