import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="bb-app">
      <Navbar />
      <main className="bb-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
