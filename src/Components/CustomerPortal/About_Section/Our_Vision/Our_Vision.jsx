import React from 'react'
import "./Our_Vision.css"
import Image from "../../../../assets/About2nd_img.png"

const Our_Vision = () => {
    return (
        <>
            <div className='Our-Vision'>
                <div className='Our-Vision-text'>
                    <h1>Our Vision for the Future</h1>
                    <p>Our vision extends beyond being a simple service platform. We aim to build a future where every skilled individual has the opportunity to thrive economically and every customer can access reliable help with confidence. We are committed to leveraging technology to create a more equitable and efficient future of work.</p>
                    <button>Join Our Journey</button>
                </div>
                <div className='Our-Vision-image'>
                    <img src={Image} alt='Vision Image' />
                </div>
            </div>
        </>
    )
}

export default Our_Vision