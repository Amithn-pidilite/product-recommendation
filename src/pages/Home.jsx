import React, { useState, useRef, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./components/navbar";

// Sample product data with badges and categories

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  //navbar
  return (
    <div className="p-4 bg-[#360133] min-h-screen w-full">
      <Navbar
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
