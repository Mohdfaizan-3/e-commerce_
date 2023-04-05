const form = document.getElementById("form");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;

function validateForm() {
  isValid = form.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    // Style main message for an error
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
}

function authenticateUser(enteredEmail, enteredPassword) {
  let arr = JSON.parse(localStorage.getItem("userDetails")) || [];
  console.log(arr);
  let user = arr.find(
    (user) => user.email === enteredEmail && user.password === enteredPassword
  );

  if (!user) {
    message.textContent = "Invalid email or password.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  } else {
    message.textContent = "Successfully logged in!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
    setTimeout(() => {
      window.location.href = "/shop/index.html";
    }, 1000);
  }
}

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit Form if Valid

  if (isValid) {
    let enteredEmail = form.email.value;
    let enteredPassword = form.password.value;
    console.log(enteredEmail, enteredPassword);
    authenticateUser(enteredEmail, enteredPassword);
  }
}

form.addEventListener("submit", processFormData);
