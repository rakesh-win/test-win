import React, { useEffect, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, Checkbox, FormControlLabel, FormGroup, Button, TextField } from '@mui/material';
import axios from 'axios';

function LandingPageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: [],
    experience: '',
  });
  const [locations, setLocations] = useState('');
  const [errors, setErrors] = useState({});

  const domains = [
    'Cyber Security',
    'Data Privacy',
    'AI Management System',
    'IT Service Management',
    'Project Management',
    'IT Governance, Risk and Compliance',
    'IT Audit',
    'IT Admin',
    'Learning & Development, Procurement team',
    'IT Consultant',
    'All of the above',
    'Others',

  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocations(window.location.href);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [category]: [...formData[category], value] });
    } else {
      setFormData({ ...formData, [category]: formData[category].filter((item) => item !== value) });
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.email.trim()) formErrors.email = 'Email is required';
    if (!formData.phone.trim()) formErrors.phone = 'Phone number is required';
    if (!formData.domain.length) formErrors.domain = 'Please select at least one domain';
    if (!formData.experience.trim()) formErrors.experience = 'Experience is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        domain: formData.domain.join(", "),
        experience: formData.experience,
        utm_source: locations
      };

      try {
        const response = await axios.post('https://winupskill.in/api/api/forms', requestData);
        if (response.status === 200) {
          console.log('Form submitted successfully:', response.data);
          alert('Form submitted successfully!');
        } else {
          console.error('Form submission failed:', response);
          alert('Form submission failed!');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form!');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: "solid 1px", marginBottom: 10 }}>
      <center><h3>Fill-in & Get Free Vouchers</h3></center>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Your Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Your Phone Number"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const validValue = e.target.value.replace(/[^0-9+#*]/g, '');
              setFormData({ ...formData, phone: validValue });
            }}
            inputProps={{
              inputMode: 'tel',
              pattern: '[0-9+#*]*',
            }}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>Domains of Interest</label>
          <FormGroup>
            {domains.map((domain, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={domain}
                    onChange={(e) => handleCheckboxChange(e, 'domain')}
                    checked={formData.domain.includes(domain)}
                  />
                }
                label={domain}
              />
            ))}
          </FormGroup>
          {errors.domain && <FormHelperText error>{errors.domain}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Total Years of Experience"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            error={!!errors.experience}
            helperText={errors.experience}
          />
        </FormControl>

        <br />
        <br />

        <center>
          <button type="submit" className='default-btn'>
            I Want Free Vouchers
          </button>
        </center>
      </form>
    </div>
  );
}

export default LandingPageForm;