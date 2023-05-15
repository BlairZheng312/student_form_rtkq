import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from './pages/LoginPage';
import Auth from './components/Auth';
import useAutoLogout from './hooks/useAutoLogout';
import StudentPage from './pages/StudentPage';

function App() {
  useAutoLogout()
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={
            <Auth>
              <ProfilePage />
            </Auth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={
            <Auth>
              <StudentPage />
            </Auth>
          } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
