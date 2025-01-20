import React, { useState } from 'react';
import axios from 'axios';
import apiClient from "../../axios/apiClient.js";
import {useAuth} from "../../context/AuthProvider.jsx";

function CreateProfile(props) {
    const [image, setImage] = useState(null);
    const ath = useAuth()
    // Handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file in state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('https://capital-badly-imp.ngrok-free.app/api/cargo-owner-register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${ath.token}`,
                }
            });

            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    id="img"
                    onChange={handleImageChange}
                    accept="image/*" // Restrict file types to images
                />
                <button type="submit">Upload Image</button>
            </form>
        </div>
    );
}

export default CreateProfile;
