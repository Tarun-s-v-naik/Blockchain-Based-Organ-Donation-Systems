document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username.trim()) {
    showError('username', 'Username cannot be empty');
    return;
  }

  if (!password.trim()) {
    showError('password', 'Password cannot be empty');
    return;
  }

  const loginButton = document.querySelector('.login-button');
  const originalText = loginButton.innerHTML;
  loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  loginButton.disabled = true;

  // Simulated API call
  setTimeout(() => {
    loginButton.innerHTML = originalText;
    loginButton.disabled = false;

    // Redirect to index.html after successful login
    window.location.href = "index.html";
}, 1500);

});

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add('error');

  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) existingError.remove();

  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.style.color = 'red';
  errorElement.style.fontSize = '0.8rem';
  errorElement.style.marginTop = '0.25rem';
  errorElement.textContent = message;

  input.parentElement.appendChild(errorElement);

  setTimeout(() => {
    input.classList.remove('error');
    errorElement.remove();
  }, 3000);
}

// Toggle password visibility
document.addEventListener('DOMContentLoaded', function() {
  const passwordField = document.getElementById('password');
  const togglePassword = document.createElement('i');
  togglePassword.className = 'fas fa-eye toggle-password';
  
  passwordField.parentElement.appendChild(togglePassword);

  togglePassword.addEventListener('click', function() {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      togglePassword.className = 'fas fa-eye-slash toggle-password';
    } else {
      passwordField.type = 'password';
      togglePassword.className = 'fas fa-eye toggle-password';
    }
  });
});
