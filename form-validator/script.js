const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
};

// Show input success message
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const initCap = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${initCap(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${initCap(input.id)} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${initCap(input.id)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match");
  }
};

// Event listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = [username, email, password, password2];

  checkRequired(inputs);
  checkLength(username, 3, 20);
  checkLength(password, 12, 50);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
