const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");
const email = document.getElementById("email");

let isValid = false;
let passwordsMatch = false;
let detail = JSON.parse(localStorage.getItem("userDetails")) || [];
let emailExist = false;

function validateForm() {
  // Use HTML constraint API to check form validity
  isValid = form.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    // Style main message for an error
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }

  emailExist = detail.some((user) => user.email === email.value);
  if (emailExist) {
    message.textContent = "Email already exists. Please use a different email.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  // Check to see if both password fields match
  if (password1El.value === password2El.value) {
    // If they match, set value to true and borders to green
    passwordsMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    // If they don't match, border color of input to red, change message
    passwordsMatch = false;
    message.textContent = "Make sure passwords match.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }
  // If form is valid and passwords match
  if (isValid && passwordsMatch && !emailExist) {
    // Style main message for success
    message.textContent = "Successfully Registered!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function storeFormData() {
  const user = {
    first_name: form.firstName.value.toLowerCase(),
    last_name: form.lastName.value.toLowerCase(),

    email: form.email.value,
    password: form.password.value,
  };
  console.log(user);

  detail.push(user);
  form.reset();
  message.textContent = "";
  message.style.color = "";
  messageContainer.style.borderColor = "";
  password1El.style.borderColor = "";
  password2El.style.borderColor = "";
  // Do something with user data
  // localStorage.setItem(detail, JSON.stringify(user))
  localStorage.setItem("userDetails", JSON.stringify(detail));
}

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit Form if Valid
  if (isValid && passwordsMatch && !emailExist) {
    storeFormData();
  }
}

form.addEventListener("submit", processFormData);
