import React from 'react'
import "./Home.css";
import HeroSection from '../../Components/CustomerPortal/Hero_Section/HeroSection';
import TopCategories from '../../Components/CustomerPortal/Service/TopCategories/TopCategories';
import HowItWork from "../../Components/CustomerPortal/HowItWork/HowItWork"

const Home = () => {
    return (
        <>
            <HeroSection />
            <TopCategories />
            <HowItWork />
        </>
    )
}

export default Home