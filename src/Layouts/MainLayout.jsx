import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="max-w-7xl mx-auto w-full p-4 md:p-8 lg:p-12 flex-1 ">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default MainLayout;