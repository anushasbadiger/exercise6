document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const dobInput = document.getElementById("dob");
    const submitButton = document.getElementById("submitButton");

    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const regex = /^[A-Za-z ]{3,}$/;
        return regex.test(nameValue);
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailValue);
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(passwordValue);
    }

    function validateConfirmPassword() {
        return passwordInput.value === confirmPasswordInput.value;
    }

    function validateDob() {
        const dobValue = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dobValue.getFullYear();
        const monthDiff = today.getMonth() - dobValue.getMonth();
        return (
            age > 18 ||
            (age === 18 && monthDiff > 0) ||
            (age === 18 && monthDiff === 0 && today.getDate() >= dobValue.getDate())
        );
    }

    // Real-time validation
    nameInput.addEventListener("input", function () {
        if (validateName()) {
            nameInput.classList.add("valid");
            nameInput.classList.remove("invalid");
            document.getElementById("nameError").textContent = "";
        } else {
            nameInput.classList.add("invalid");
            nameInput.classList.remove("valid");
            document.getElementById("nameError").textContent = "Please enter a valid name.";
        }
    });

    emailInput.addEventListener("input", function () {
        if (validateEmail()) {
            emailInput.classList.add("valid");
            emailInput.classList.remove("invalid");
            document.getElementById("emailError").textContent = "";
        } else {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
        }
    });

    passwordInput.addEventListener("input", function () {
        if (validatePassword()) {
            passwordInput.classList.add("valid");
            passwordInput.classList.remove("invalid");
            document.getElementById("passwordError").textContent = "";
        } else {
            passwordInput.classList.add("invalid");
            passwordInput.classList.remove("valid");
            document.getElementById("passwordError").textContent = "Password must be at least 8 characters long and contain letters and numbers.";
        }
    });

    confirmPasswordInput.addEventListener("input", function () {
        if (validateConfirmPassword()) {
            confirmPasswordInput.classList.add("valid");
            confirmPasswordInput.classList.remove("invalid");
            document.getElementById("confirmPasswordError").textContent = "";
        } else {
            confirmPasswordInput.classList.add("invalid");
            confirmPasswordInput.classList.remove("valid");
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        }
    });

    dobInput.addEventListener("input", function () {
        if (validateDob()) {
            dobInput.classList.add("valid");
            dobInput.classList.remove("invalid");
            document.getElementById("dobError").textContent = "";
        } else {
            dobInput.classList.add("invalid");
            dobInput.classList.remove("valid");
            document.getElementById("dobError").textContent = "You must be at least 18 years old.";
        }
    });

    // Form submission validation
    form.addEventListener("submit", function (event) {
        if (
            !validateName() ||
            !validateEmail() ||
            !validatePassword() ||
            !validateConfirmPassword() ||
            !validateDob()
        ) {
            event.preventDefault();
            alert("Please fix the errors in the form before submitting.");
        }
    });

    // Disable submit button if under 18
    dobInput.addEventListener("input", function () {
        submitButton.disabled = !validateDob();
    });
});
