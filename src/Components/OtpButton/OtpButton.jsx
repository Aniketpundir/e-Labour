import React, { useState, useEffect } from "react";
import "./Otpbutton.css";
const OTPButton = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleClick = () => {
        setIsDisabled(true);
        setCountdown(60);
    };

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsDisabled(false);
        }

        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <div>
            <button className="OTPbutton" onClick={handleClick} disabled={isDisabled}>
                {isDisabled ? `Wait ${countdown}s` : "Get OTP"}
            </button>
        </div>
    );
};

export default OTPButton;