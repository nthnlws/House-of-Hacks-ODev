import "./Navbar.css"
export default function Navbar({ setShowForm }) {
    // MAKE BUTTON GO TO RIGHT
    return (
        <div id="settings-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
            </svg>
            <input type="checkbox" onChange={() => setShowForm(true)}></input>
        </div>

    )
}