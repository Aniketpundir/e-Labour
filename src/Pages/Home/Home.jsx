import React from 'react'
import "./Home.css";
import HeroSection from '../../Components/CustomerPortal/Home_Section/Hero_Section/HeroSection';
import TopCategories from '../../Components/CustomerPortal/Home_Section/Service/TopCategories/TopCategories';
import HowItWork from "../../Components/CustomerPortal/Home_Section/HowItWork/HowItWork"
import FeatureHighlights from '../../Components/CustomerPortal/Home_Section/FeatureHighlights/FeatureHighlights';

const Home = () => {
    return (
        <>
            <HeroSection />
            <TopCategories />
            <HowItWork />
            <FeatureHighlights />
        </>
    )
}

export default Home