import React, { useState, useRef, useEffect } from "react";
import "../styles/Home.css";
import Navbar1 from "./components/Navbar1";

// Sample product data with badges and categories

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  //navbar
  return (
    <div className="p-4 bg-[#360133] min-h-screen w-full">
      <Navbar1
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </div>
  );

  //sidebar

  //main content

  //footer
};

export default Home;
