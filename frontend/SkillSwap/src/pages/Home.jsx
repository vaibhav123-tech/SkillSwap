/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import\
import './Home.css'; // Make sure the path is correct

import { useUserContext } from '../contexts/user_context';  // adjust path
const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        offeredSkills: '',
        wantedSkills: '',
    });

    const navigate = useNavigate();  // Initialize navigate
    const { setUserId } = useUserContext();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);

        const response = await fetch('http://localhost:5000/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json(); // 
            if (data.user && data.user._id) {
            setUserId(data.user._id); // 🔥 set the returned _id from backend
            console.log('User ID:', data.user._id); // Log the user ID
            navigate('/getUsers');
    } else {
      console.error('User ID not found in response');
    }
        } else {
            console.log('Error submitting data');
        }
    };

    return (
        <div>
            <h1>Skill Swap Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="offeredSkills">Skills You Offer:</label>
                    <textarea
                        id="offeredSkills"
                        name="offeredSkills"
                        value={formData.offeredSkills}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="wantedSkills">Skills You Want in Return:</label>
                    <textarea
                        id="wantedSkills"
                        name="wantedSkills"
                        value={formData.wantedSkills}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Home;
