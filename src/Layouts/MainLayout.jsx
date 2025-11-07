import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className='flex-1 min-h-screen'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default MainLayout;