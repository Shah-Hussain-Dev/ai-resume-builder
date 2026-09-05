import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Features from "../components/home/Features";
import TemplateGallery from "../components/home/TemplateGallery";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white font-sans transition-colors duration-300">
      <Banner />
      <Hero />
      <HowItWorks />
      <Features />
      <TemplateGallery />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
