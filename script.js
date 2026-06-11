//age calculator with decimals and live update
function calculateAge(birthdate){
    const birthday = new Date(birthdate);
    const today = new Date();
    const ageInMs = today - birthday;
    const ageInYr = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYr.toFixed(9) //5 decimal place
}

function updateAge(){
    const birthday = "2006-12-04";
    const ageElement = document.querySelector(".stat-box:nth-child(2) .real-info");
    if (ageElement){
        ageElement.textContent = calculateAge(birthday);
        setInterval(() => {
            ageElement.textContent = calculateAge(birthday);
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", updateAge);

//scroll effect on header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    if (window.scrollY > scrollThreshold) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Background Changer
function setupBackgroundChanger() {
    const body = document.body;
    const projectsSection = document.getElementById('projects');
    const visibility = { threshold: 0.4 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'projects') {
                if (entry.isIntersecting) {
                    body.classList.add('projectsBG');
                } else {
                    body.classList.remove('projectsBG');
                }
            }
        });
    }, visibility);

    observer.observe(projectsSection);
}

// Form validation
class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('contactSubmitBtn');
        this.feedback = document.getElementById('formFeedback');
        this.isSubmitting = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Submit button click
        this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input[type="text"], select');
        const radios = this.form.querySelectorAll('input[type="radio"]');

        // Real-time validation for text inputs and selects
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Real-time validation for radio buttons
        radios.forEach(radio => {
            radio.addEventListener('change', () => this.validateGender());
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'firstname':
                if (!value) {
                    errorMessage = 'First name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'First name must be at least 2 characters';
                    isValid = false;
                } 
                break;

            case 'lastname':
                if (!value) {
                    errorMessage = 'Last name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Last name must be at least 2 characters';
                    isValid = false;
                }
                break;

            case 'E-mail':
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!this.isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'CR':
                if (!value || value === 'Choice') {
                    errorMessage = 'Please select a country/region';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message cannot exceed 1000 characters';
                    isValid = false;
                }
                break;
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    validateGender() {
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        const isSelected = Array.from(genderRadios).some(radio => radio.checked);
        const genderRow = genderRadios[0].closest('.form-row');
        const errorElement = document.getElementById('gender-error');

        if (!isSelected) {
            this.showFieldError(genderRow, errorElement, 'Please select a gender');
            return false;
        } else {
            this.clearFieldError(genderRow, errorElement);
            return true;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setFieldValidation(field, isValid, errorMessage) {
        const formRow = field.closest('.form-row');
        const errorElement = document.getElementById(`${field.id}-error`);

        if (!isValid) {
            this.showFieldError(formRow, errorElement, errorMessage);
        } else {
            this.clearFieldError(formRow, errorElement);
        }
    }

    showFieldError(formRow, errorElement, message) {
        formRow.classList.remove('success');
        formRow.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearFieldError(formRow, errorElement) {
        formRow.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    validateAllFields() {
        const inputs = this.form.querySelectorAll('input[type="text"], select');
        let allValid = true;

        // Validate all text inputs and selects
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        // Validate gender
        if (!this.validateGender()) {
            allValid = false;
        }

        return allValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) {
            return;
        }

        // Validate all fields
        if (!this.validateAllFields()) {
            this.showFeedback('Please correct the errors above before submitting.', 'error');
            return;
        }

        // Start submission process
        this.isSubmitting = true;
        this.setSubmitButtonLoading(true);

        try {
            await this.submitForm();
            
            // Show success message
            this.showFeedback('Thank you! Your message has been sent successfully.', 'success');
            this.resetForm();
            
        } catch (error) {
            // Show error message
            this.showFeedback('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonLoading(false);
        }
    }

    setSubmitButtonLoading(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt"></i>';
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
        }
    }

    showFeedback(message, type) {
        this.feedback.textContent = message;
        this.feedback.className = `form-feedback ${type}`;
        this.feedback.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.feedback.style.display = 'none';
            }, 5000);
        }
    }

    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        const formRows = this.form.querySelectorAll('.form-row');
        formRows.forEach(row => {
            row.classList.remove('error', 'success');
        });

        // Clear all error messages
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });

        // Hide feedback
        this.feedback.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateAge();
    setupBackgroundChanger();
    
    // Initialize form validation
    if (document.getElementById('contactForm')) {
        new FormValidator();
    }
}); 

//Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });