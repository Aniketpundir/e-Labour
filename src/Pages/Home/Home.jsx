import React from 'react'
import "./Home.css";
import HeroSection from '../../Components/CustomerPortal/Hero_Section/HeroSection';
import TopCategories from '../../Components/CustomerPortal/Service/TopCategories/TopCategories';
import HowItWork from "../../Components/CustomerPortal/HowItWork/HowItWork"
import FeatureHighlights from '../../Components/CustomerPortal/FeatureHighlights/FeatureHighlights';

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