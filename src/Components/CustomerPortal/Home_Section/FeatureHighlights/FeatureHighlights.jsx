import React from 'react'
import "./FeatureHighlights.css"
import { MdVerified } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

const FeatureHighlight = [
    {
        id: "1",
        icon: <MdVerified style={{ color: "#3B82F6" }} />,
        Feature: "Verified Workers",
    },
    {
        id: "2",
        icon: <MdOutlinePayment style={{ color: "#22C55E" }} />,
        Feature: "Secure Payments",
    },
    {
        id: "3",
        icon: <MdOutlineSupportAgent style={{ color: "#F59E0B" }} />,
        Feature: "24/7 Support",
    },
]

const FeatureHighlights = () => {
    return (
        <>
            <div className='FeatureHighlights'>
                {FeatureHighlight.map((items, index) => {
                    return (
                        <div key={index} className='FeatureHighlights-content'>
                            <div className='FeatureHighlights-logo'>
                                {items.icon}
                            </div>
                            <div className='FeatureHighlights-text'>
                                <h2>{items.Feature}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default FeatureHighlights