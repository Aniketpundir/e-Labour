import React from 'react'
import "./Home.css";
import HeroSection from '../../Components/CustomerPortal/Hero_Section/HeroSection';
import TopCategories from '../../Components/CustomerPortal/Service/TopCategories/TopCategories';
import ServiceCard from '../../Components/CustomerPortal/Service/ServiceCard/ServiceCard';

const Home = () => {
    return (
        <>
            <HeroSection />
            <TopCategories />
            {/* <ServiceCard /> */}
        </>
    )
}

export default Home