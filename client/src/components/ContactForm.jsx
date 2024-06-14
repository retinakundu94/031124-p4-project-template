import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log('Form data submitted:', data);
                    // Optionally reset the form
                    setFormData({
                        name: '',
                        email: '',
                        feedback: ''
                    });
                });
            } else {
                alert('Error submitting form');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Feedback:</label>
                <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
