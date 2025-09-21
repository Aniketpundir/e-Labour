import React from 'react'
import "./Header.css";

const Header = () => {
    return (
        <>
            <div className='how-header'>
                <button data-aos="fade-down">How it Works</button>
                <h1 data-aos="fade-down">A Simple Process to Get Things Done</h1>
                <p data-aos="fade-down">
                    Our platform streamlines the process of finding and hiring local workers. Follow these simple steps to get your tasks completed and with complete peace of mind.
                </p>
            </div>
        </>
    )
}

export default Header