let currentStep = 1;
const totalSteps = 6;
const progressBar = document.getElementById('progress');

function updateProgressBar() {
    progressBar.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function showStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    updateProgressBar();
}

function nextStep(current) {
    if (validateStep(current)) {
        if (current === 5) {
            updatePreview();
        }
        showStep(current + 1);
    }
}

function prevStep(current) {
    showStep(current - 1);
}

function validateStep(step) {
    let isValid = true;
    const stepElement = document.getElementById(`step-${step}`);
    
    // Check all required fields in current step
    const requiredFields = stepElement.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
            
            // Scroll to first error
            if (isValid === false) {
                field.focus();
            }
        } else {
            field.style.borderColor = '#ced4da';
        }
    });
    
    // Special validation for Aadhar field
    if (step === 1) {
        const aadhar = document.getElementById('aadhar');
        if (!aadhar.checkValidity()) {
            aadhar.style.borderColor = '#dc3545';
            isValid = false;
            aadhar.focus();
        }
    }
    
    if (!isValid) {
        alert('Please fill all required fields correctly before proceeding.');
    }
    
    return isValid;
}

function updatePreview() {
    document.getElementById('preview-name').textContent = document.getElementById('fullName').value;
    document.getElementById('preview-dob').textContent = document.getElementById('dob').value;
    document.getElementById('preview-gender').textContent = document.getElementById('gender').options[document.getElementById('gender').selectedIndex].text;
    document.getElementById('preview-email').textContent = document.getElementById('email').value;
    document.getElementById('preview-phone').textContent = document.getElementById('phone').value;
    document.getElementById('preview-aadhar').textContent = document.getElementById('aadhar').value;
    
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    document.getElementById('preview-address').textContent = `${address}, ${city}, ${state} - ${pincode}`;
    
    const emergencyName = document.getElementById('emergencyName').value;
    const emergencyPhone = document.getElementById('emergencyPhone').value;
    const emergencyRelation = document.getElementById('emergencyRelation').options[document.getElementById('emergencyRelation').selectedIndex].text;
    document.getElementById('preview-emergency').textContent = `${emergencyName} (${emergencyRelation}) - ${emergencyPhone}`;
    
    const selectedOrgans = [];
    document.querySelectorAll('input[name="organs"]:checked').forEach(checkbox => {
        selectedOrgans.push(checkbox.value);
    });
    
    document.getElementById('preview-organs').textContent = selectedOrgans.join(', ') || 'None selected';
}

function submitForm() {
    // In a real application, this would submit to a blockchain
    // For this demo, we'll just show the thank you step
    
    // Update donor card
    document.getElementById('card-name').textContent = document.getElementById('fullName').value;
    document.getElementById('card-aadhar').textContent = document.getElementById('aadhar').value;
    
    const selectedOrgans = [];
    document.querySelectorAll('input[name="organs"]:checked').forEach(checkbox => {
        selectedOrgans.push(checkbox.value);
    });
    
    const organsContainer = document.getElementById('card-organs');
    organsContainer.innerHTML = '';
    
    if (selectedOrgans.length > 0) {
        organsContainer.innerHTML = '<div>Organs pledged:</div>';
        selectedOrgans.forEach(organ => {
            const tag = document.createElement('span');
            tag.classList.add('organ-tag');
            tag.textContent = organ;
            organsContainer.appendChild(tag);
        });
    }
    
    showStep(7);
}

function printCard() {
    window.print();
}

// Initialize progress bar
updateProgressBar();

// Add input event listeners to remove error styling when user types
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
        this.style.borderColor = '#ced4da';
    });
});

// Add navigation functionality
// donor.js
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // allow normal navigation
        window.location.href = this.getAttribute("href");
    });
});