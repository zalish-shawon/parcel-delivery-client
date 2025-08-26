import React from "react";

const About: React.FC = () => (
  <div className="flex items-center justify-center min-h-[70vh] px-4">
    <div className="max-w-2xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        About Us
      </h2>
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
        We are a <span className="font-semibold text-blue-600">mission-driven logistics team </span> 
        dedicated to delivering your parcels with speed, security, and care.  
        Our commitment is to provide reliable delivery solutions for businesses 
        and individuals, ensuring that every package reaches its destination 
        safely and on time.
      </p>
    </div>
  </div>
);

export default About;
