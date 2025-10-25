import React from "react";
import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";

const HomePage = () => {
  return (
    <div className="custom-scrollbar">
      <Hero />
      <WhyUs />
    </div>
  );
};

export default HomePage;
