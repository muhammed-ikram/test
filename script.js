document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    // Show error message
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }

    // Hide error message
    function hideError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    function isValidPassword(password) {
        return password.length >= 8;
    }

    // Real-time validation
    username.addEventListener('input', () => {
        if (username.value.length < 3) {
            showError(username, 'Username must be at least 3 characters long');
        } else {
            hideError(username);
        }
    });

    email.addEventListener('input', () => {
        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
        } else {
            hideError(email);
        }
    });

    password.addEventListener('input', () => {
        if (!isValidPassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long');
        } else {
            hideError(password);
        }
    });

    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
        } else {
            hideError(confirmPassword);
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        // e.preventDefault();
        
        let isValid = true;

        // Validate all fields
        if (username.value.length < 3) {
            showError(username, 'Username must be at least 3 characters long');
            isValid = false;
        }

        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!isValidPassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }

        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to a server
            console.log('Form submitted successfully!');
        }
    });
});