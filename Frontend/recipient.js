 const formSections = ['personal', 'address', 'medical', 'emergency', 'consent', 'preview', 'success'];
        let currentSection = 0;

        function updateProgress() {
            const progress = (currentSection / (formSections.length - 1)) * 100;
            document.getElementById('progress').style.width = `${progress}%`;
        }

        function showSection(section) {
            // Validate current section before proceeding
            if (section !== 'personal' && !validateSection(formSections[currentSection])) {
                alert('Please fill all required fields correctly before proceeding.');
                return;
            }
            
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            if (section === 'success') {
                document.getElementById('section-success').classList.add('active');
                currentSection = formSections.length - 1;
            } else {
                document.getElementById(`section-${section}`).classList.add('active');
                currentSection = formSections.indexOf(section);
            }
            
            updateProgress();
        }

        function validateSection(section) {
            const activeSection = document.getElementById(`section-${section}`);
            const requiredFields = activeSection.querySelectorAll('[required]');
            
            for (let field of requiredFields) {
                if (!field.value.trim()) {
                    field.focus();
                    return false;
                }
                
                // Validate Aadhar format
                if (field.id === 'aadhar' && !/^\d{12}$/.test(field.value)) {
                    alert('Please enter a valid 12-digit Aadhar number.');
                    return false;
                }
                
                // Validate Pincode format
                if (field.id === 'pincode' && !/^\d{6}$/.test(field.value)) {
                    alert('Please enter a valid 6-digit pincode.');
                    return false;
                }
            }
            
            // Validate at least one organ is selected for recipients
            if (section === 'medical') {
                const organs = document.querySelectorAll('input[name="organs-needed"]:checked');
                if (organs.length === 0) {
                    alert('Please select at least one organ you need.');
                    return false;
                }
            }
            
            return true;
        }

        function showPreview() {
            if (validateSection('consent')) {
                // Generate preview content
                const previewData = document.getElementById('preview-data');
                previewData.innerHTML = '';
                
                // Personal Information
                addPreviewItem(previewData, 'Full Name', document.getElementById('fullname').value);
                addPreviewItem(previewData, 'Email', document.getElementById('email').value);
                addPreviewItem(previewData, 'Phone', document.getElementById('phone').value);
                addPreviewItem(previewData, 'Date of Birth', document.getElementById('dob').value);
                addPreviewItem(previewData, 'Aadhar Number', document.getElementById('aadhar').value);
                addPreviewItem(previewData, 'Blood Type', document.getElementById('blood-type').value);
                
                // Address Information
                addPreviewItem(previewData, 'Address', document.getElementById('address').value);
                addPreviewItem(previewData, 'District', document.getElementById('district').value);
                addPreviewItem(previewData, 'City', document.getElementById('city').value);
                addPreviewItem(previewData, 'State', document.getElementById('state').value);
                addPreviewItem(previewData, 'Pincode', document.getElementById('pincode').value);
                
                // Medical Information
                addPreviewItem(previewData, 'Primary Diagnosis', document.getElementById('primary-diagnosis').value);
                addPreviewItem(previewData, 'Date of Diagnosis', document.getElementById('diagnosis-date').value);
                addPreviewItem(previewData, 'Current Treatment', document.getElementById('current-treatment').value || 'Not provided');
                
                // Organs needed
                const selectedOrgans = Array.from(document.querySelectorAll('input[name="organs-needed"]:checked'))
                    .map(checkbox => {
                        const label = checkbox.nextElementSibling.textContent;
                        return label;
                    })
                    .join(', ');
                addPreviewItem(previewData, 'Organs Needed', selectedOrgans);
                
                // Urgency and hospital info
                const urgency = document.getElementById('urgency');
                const urgencyText = urgency.options[urgency.selectedIndex].text;
                addPreviewItem(previewData, 'Medical Urgency', urgencyText);
                addPreviewItem(previewData, 'Treating Hospital', document.getElementById('treating-hospital').value);
                addPreviewItem(previewData, 'Treating Physician', document.getElementById('doctor-info').value);
                
                // Emergency Contact
                addPreviewItem(previewData, 'Emergency Contact', document.getElementById('emergency-name').value);
                addPreviewItem(previewData, 'Relationship', document.getElementById('emergency-relation').value);
                addPreviewItem(previewData, 'Emergency Phone', document.getElementById('emergency-phone').value);
                addPreviewItem(previewData, 'Emergency Email', document.getElementById('emergency-email').value || 'Not provided');
                addPreviewItem(previewData, 'Emergency Address', document.getElementById('emergency-address').value || 'Not provided');
                
                // Consent
                addPreviewItem(previewData, 'Signature', document.getElementById('signature').value);
                addPreviewItem(previewData, 'Consent Date', document.getElementById('consent-date').value);
                
                showSection('preview');
            }
        }

        function addPreviewItem(container, label, value) {
            if (!value) return;
            
            const item = document.createElement('div');
            item.className = 'preview-item';
            
            // Apply urgency styling if applicable
            let valueClass = '';
            if (label === 'Medical Urgency') {
                if (value.includes('High')) valueClass = 'urgency-high';
                else if (value.includes('Medium')) valueClass = 'urgency-medium';
                else if (value.includes('Low')) valueClass = 'urgency-low';
            }
            
            item.innerHTML = `
                <div class="preview-label">${label}</div>
                <div class="preview-value ${valueClass}">${value}</div>
            `;
            container.appendChild(item);
        }

        // Handle form submission
        document.getElementById('recipient-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showSection('success');
            
            // In a real application, you would send the form data to a server here
            // For demonstration, we'll just log the data
            const formData = new FormData(this);
            console.log('Form data:', Object.fromEntries(formData.entries()));
        });

        // Initialize progress bar
        updateProgress();