import "./Form.css"
export default function Form() {
    return (
        <div id="backdrop">
            <div id="exit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                </svg>

                <input type="checkbox"></input>
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
                    <form action="" method="" className="">
                        <div className="address-inputs">
                            <label htmlFor="address">What is your address?</label>
                            <input type="text" name="address" id="address" required />
                            <label htmlFor="city">What city do you live in?</label>
                            <input type="text" name="city" id="city" />
                            <label htmlFor="state">What state is your city in?</label>
                            <input type="text" name="state" id="state" />
                            <label htmlFor="zipcode">What is your zip code?</label>
                            <input type="number" name="zipcode" id="zipcode" />
                        </div>
                        <div className="home-inputs">
                            <label htmlFor="rooms">How many rooms in your home?</label>
                            <input type="number" name="rooms" id="rooms" />
                            <label htmlFor="sqr-feet">How many sqr feet in your home?</label>
                            <input type="number" name="sqr-feet" id="sqr-feet" />
                            <label htmlFor="bathrooms">How many bathrooms does your home have?</label>
                            <input type="number" name="bathrooms" id="bathrooms" />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}