
        // Toggle password visibility
        document.getElementById('password-toggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
        
        document.getElementById('confirm-password-toggle').addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirm-password');
            const icon = this;
            
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                confirmPasswordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
        
        // Password strength meter
        document.getElementById('password').addEventListener('input', function() {
            const password = this.value;
            const strengthMeter = document.getElementById('password-strength');
            const strengthText = document.getElementById('password-strength-text');
            
            // Remove all classes
            strengthMeter.className = 'strength-meter';
            
            if (password.length === 0) {
                strengthText.textContent = 'Password strength: Too weak';
                return;
            }
            
            let strength = 0;
            
            // Check length
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Check for lowercase letters
            if (/[a-z]/.test(password)) strength += 1;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Check for numbers
            if (/[0-9]/.test(password)) strength += 1;
            
            // Check for special characters
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update strength meter
            if (strength <= 2) {
                strengthMeter.classList.add('weak');
                strengthText.textContent = 'Password strength: Weak';
            } else if (strength <= 4) {
                strengthMeter.classList.add('medium');
                strengthText.textContent = 'Password strength: Medium';
            } else if (strength <= 5) {
                strengthMeter.classList.add('strong');
                strengthText.textContent = 'Password strength: Strong';
            } else {
                strengthMeter.classList.add('very-strong');
                strengthText.textContent = 'Password strength: Very Strong';
            }
        });
        
        // Form validation
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // First name validation
            const firstname = document.getElementById('firstname');
            if (firstname.value.trim() === '') {
                document.getElementById('firstname-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('firstname-error').style.display = 'none';
            }
            
            // Last name validation
            const lastname = document.getElementById('lastname');
            if (lastname.value.trim() === '') {
                document.getElementById('lastname-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('lastname-error').style.display = 'none';
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('email-error').style.display = 'none';
            }
            
            // Phone validation
            const phone = document.getElementById('phone');
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
                document.getElementById('phone-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('phone-error').style.display = 'none';
            }
            
            // Date of birth validation
            const dob = document.getElementById('dob');
            if (dob.value === '') {
                document.getElementById('dob-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('dob-error').style.display = 'none';
            }
            
            // Gender validation
            const gender = document.getElementById('gender');
            if (gender.value === '') {
                document.getElementById('gender-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('gender-error').style.display = 'none';
            }
            
            // Address validation
            const address = document.getElementById('address');
            if (address.value.trim() === '') {
                document.getElementById('address-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('address-error').style.display = 'none';
            }
            
            // City validation
            const city = document.getElementById('city');
            if (city.value.trim() === '') {
                document.getElementById('city-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('city-error').style.display = 'none';
            }
            
            // Zip code validation
            const zipcode = document.getElementById('zipcode');
            const zipcodeRegex = /^\d{5}(-\d{4})?$/;
            if (!zipcodeRegex.test(zipcode.value)) {
                document.getElementById('zipcode-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('zipcode-error').style.display = 'none';
            }
            
            // Password validation
            const password = document.getElementById('password');
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password.value)) {
                document.getElementById('password-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('password-error').style.display = 'none';
            }
            
            // Confirm password validation
            const confirmPassword = document.getElementById('confirm-password');
            if (confirmPassword.value !== password.value) {
                document.getElementById('confirm-password-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('confirm-password-error').style.display = 'none';
            }
            
           
            
            // If form is valid, submit
            if (isValid) {
                // Show loading spinner
                document.getElementById('spinner').style.display = 'inline-block';
                document.getElementById('register-btn').disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    // Hide spinner
                    document.getElementById('spinner').style.display = 'none';
                    
                    // Show success message
                    document.getElementById('success-message').style.display = 'block';
                    
                    // Reset form
                    document.getElementById('register-form').reset();
                    
                    // Redirect to login page after a delay
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 3000);
                }, 2000); // Simulate 2 second API call
            }
        });
        
        // Input field validation on blur
        const validateField = (field, errorId, validationFn) => {
            field.addEventListener('blur', function() {
                if (!validationFn(this.value)) {
                    document.getElementById(errorId).style.display = 'block';
                } else {
                    document.getElementById(errorId).style.display = 'none';
                }
            });
        };
        
        // Validation functions
        const isNotEmpty = value => value.trim() !== '';
        const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isValidPhone = value => /^\d{10}$/.test(value.replace(/\D/g, ''));
        const isValidZipcode = value => /^\d{5}(-\d{4})?$/.test(value);
        const isValidPassword = value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        
        // Apply validation to fields
        validateField(document.getElementById('firstname'), 'firstname-error', isNotEmpty);
        validateField(document.getElementById('lastname'), 'lastname-error', isNotEmpty);
        validateField(document.getElementById('email'), 'email-error', isValidEmail);
        validateField(document.getElementById('phone'), 'phone-error', isValidPhone);
        validateField(document.getElementById('address'), 'address-error', isNotEmpty);
        validateField(document.getElementById('city'), 'city-error', isNotEmpty);
        validateField(document.getElementById('zipcode'), 'zipcode-error', isValidZipcode);
        validateField(document.getElementById('password'), 'password-error', isValidPassword);
        
        // Confirm password validation
        document.getElementById('confirm-password').addEventListener('blur', function() {
            const password = document.getElementById('password').value;
            if (this.value !== password) {
                document.getElementById('confirm-password-error').style.display = 'block';
            } else {
                document.getElementById('confirm-password-error').style.display = 'none';
            }
        });
        
        // Format phone number as user types
        document.getElementById('phone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });