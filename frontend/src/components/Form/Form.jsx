import { useState } from "react";
import "./Form.css";
import { createProperty } from "../../HTTPClient";

export default function Form({ setShowForm, data, setData }) {
    // Create a state to store form input values
    // FIX OVERFLOW
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        zipcode: "",
        rooms: "",
        sqrFeet: "",
        bathrooms: ""
    });

    // Handle change for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field should be a number, then parse it
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: ["zipcode", "rooms", "sqrFeet", "bathrooms"].includes(name) ? parseFloat(value) || "" : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on submit
        setData(formData); // Update the main data state with form data
        setShowForm(false); // Close the form
    };

    return (
        <div id="backdrop">
            <div id="exit-btn" onClick={() => setShowForm(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
            </div>
            <div id="main-container">
                <div id="left-side">
                    <h2>Welcome to TaskNest</h2>
                    <span>Join your community online!</span>
                    <p>Discover all the ways TaskNest can help</p>
                    <ul>
                        <li>See how your home value or rent compares to your area</li>
                        <li>Keep track of tasks around your home</li>
                        <li>Receive AI insights on tips and tricks to keep your home stocked and safe</li>
                    </ul>
                </div>
                <div id="right-side">
                    <h2>Let's get started!</h2>
                    <p>Let's team up! Share a bit about yourself so we can connect you with your neighborhood and provide you with the best info possible.</p>
                    <form onSubmit={handleSubmit} className="">
                        <div className="address-inputs">
                            <label htmlFor="address">What is your address?</label>
                            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required />
                            <label htmlFor="city">What city do you live in?</label>
                            <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required />
                            <label htmlFor="state">What state is your city in?</label>
                            <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required />
                            <label htmlFor="zipcode">What is your zip code?</label>
                            <input type="number" name="zipcode" id="zipcode" value={formData.zipcode} onChange={handleChange} required />
                        </div>
                        <div className="home-inputs">
                            <label htmlFor="rooms">How many rooms in your home?</label>
                            <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleChange} required />
                            <label htmlFor="sqr-feet">How many sqr feet in your home?</label>
                            <input type="number" name="sqrFeet" id="sqr-feet" value={formData.sqrFeet} onChange={handleChange} required />
                            <label htmlFor="bathrooms">How many bathrooms does your home have?</label>
                            <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                        </div>
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
