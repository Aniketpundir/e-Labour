import React from 'react'
import "./About.css";
import Header from '../../Components/CustomerPortal/About_Section/Header/Header';
import Our_Mission from '../../Components/CustomerPortal/About_Section/Our_Mission/Our_Mission';
import About_Features from '../../Components/CustomerPortal/About_Section/About_Features/About_Features';
import Our_Vision from '../../Components/CustomerPortal/About_Section/Our_Vision/Our_Vision';
import Timeline from '../../Components/CustomerPortal/About_Section/Milestones/Timeline';

const About = () => {
    return (
        <>
            <Header />
            <Our_Mission />
            <About_Features />
            {/* <Timeline /> */}
            <Our_Vision />
        </>
    )
}

export default About