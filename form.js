function checkName(name) {
  if (name === "") return "Please enter your name";
  if (name.length < 2) return "Name must be at least 2 characters";
  return "";
}

function checkEmail(email) {
  if (email === "") return "Please enter your email";
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!pattern.test(email)) return "Email format is not correct (example: name@mail.com)";
  return "";
}

function checkPassword(password) {
  if (password === "") return "Please enter a password";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
}

function checkConfirm(password, confirm) {
  if (confirm === "") return "Please repeat your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
}

function checkInterest(value) {
  if (value === "") return "Please choose what you are interested in";
  return "";
}

function checkAgree(isChecked) {
  if (!isChecked) return "You must agree to the Terms and Privacy Policy";
  return "";
}


function showError(field, message) {
  field.classList.add("is-invalid");
  field.parentElement.querySelector(".invalid-feedback").textContent = message;
}

function clearError(field) {
  field.classList.remove("is-invalid");
}


function validateField(field, message) {
  if (message !== "") {
    showError(field, message);
    return false;
  }
  clearError(field);
  return true;
}


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  if (!form) return;   

  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmInput = document.getElementById("signup-confirm");
  const interestSelect = document.getElementById("signup-interest");
  const agreeBox = document.getElementById("agree");
  const successBox = document.getElementById("success-box");


  form.addEventListener("submit", function (event) {
    event.preventDefault();   

    const name = nameInput.value.trim();


    const nameOk = validateField(nameInput, checkName(name));
    const emailOk = validateField(emailInput, checkEmail(emailInput.value.trim()));
    const passwordOk = validateField(passwordInput, checkPassword(passwordInput.value));
    const confirmOk = validateField(confirmInput, checkConfirm(passwordInput.value, confirmInput.value));
    const interestOk = validateField(interestSelect, checkInterest(interestSelect.value));
    const agreeOk = validateField(agreeBox, checkAgree(agreeBox.checked));

    
    if (!(nameOk && emailOk && passwordOk && confirmOk && interestOk && agreeOk)) {
      return;
    }

    successBox.textContent = "Welcome to MELORA, " + name + "! Your gift is waiting for you";
    successBox.hidden = false;
    form.hidden = true;
  });

  const allFields = [nameInput, emailInput, passwordInput, confirmInput, interestSelect, agreeBox];
  allFields.forEach(function (field) {
    field.addEventListener("input", function (event) {
      clearError(event.target);
    });
    field.addEventListener("change", function (event) {
      clearError(event.target);
    });
  });
});