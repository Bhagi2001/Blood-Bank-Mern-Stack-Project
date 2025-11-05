import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Donors from './pages/Donors';
import Hospitals from './pages/Hospitals';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}> 
          <Route index element={<Home />} />

          {/* General authenticated routes (any logged-in user) */}
          <Route element={<ProtectedRoute />}> 
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allow={[ 'admin' ]} />}> 
            <Route path="inventory" element={<Inventory />} />
            <Route path="donors" element={<Donors />} />
            <Route path="hospitals" element={<Hospitals />} />
          </Route>

          {/* Requests: allowed for admin and hospital roles */}
          <Route element={<ProtectedRoute allow={[ 'admin', 'hospital' ]} />}> 
            <Route path="requests" element={<Requests />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}> 
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
