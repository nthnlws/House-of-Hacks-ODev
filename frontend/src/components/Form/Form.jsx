import { useState } from "react";
import "./Form.css";


export default function Form({ setShowForm, data, setData }) {
    // Create a state to store form input values
    const [formData, setFormData] = useState({
        homeType: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        rooms: "",
        sqrFeet: "",
        bathrooms: "",
        yardSize: "",
        pool: "",
        ac: "",
        homePrice: ""
    });

    // Handle change for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
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
                    <h2>Welcome to NestNotes</h2>
                    <p>Join your community online, discover all the ways NestNotes can help!</p>
                    <ul>
                        <li>
                            <span>Smart Maintenance Management</span>
                            <p>Automate your home care with personalized reminders and countdowns, ensuring no task is ever overlooked.</p>
                        </li>
                        <li>
                            <span>AI-Driven Insights</span>
                            <p>Leverage cutting-edge AI to receive tailored tips and maintenance suggestions based on your unique home setup, making home management effortless.</p>
                        </li>
                        <li>
                            <span>Comprehensive Home Profile</span>
                            <p>Easily input details about your home—size, features, and value—to receive a customized maintenance plan that keeps your property in peak condition.</p>
                        </li>
                    </ul>
                </div>
                <div id="right-side">
                    <h2>Let's get started!</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="address-inputs">
                            <label htmlFor="home-type">What kind of home do you have?</label>

                            <select name="homeType" id="home-type" value={formData.homeType} onChange={handleChange} required>
                                <option value="" disabled>Select an option</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="other">Other</option>
                            </select>

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

                            <label htmlFor="yard-size">How many acres is your yard?</label>

                            <input type="text" name="yardSize" id="yard-size" value={formData.yardSize} onChange={handleChange} required />

                            <label htmlFor="pool">Does your home have a pool?</label>

                            <select name="pool" id="pool" value={formData.pool} onChange={handleChange} required>
                                <option value="" disabled>Select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            <label htmlFor="ac">What kind of ac is in your home?</label>

                            <select name="ac" id="ac" value={formData.ac} onChange={handleChange} required>
                                <option value="" disabled>Select an option</option>
                                <option value="central">Central</option>
                                <option value="window">Window</option>
                            </select>

                            <label htmlFor="home-price">What is the value of your home?</label>

                            <input type="number" name="homePrice" id="home-price" value={formData.homePrice} onChange={handleChange} required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
