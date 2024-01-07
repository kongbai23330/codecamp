import React from 'react';
import UserInfo from './UserInfo';
import PublishForm from './PublishForm';
import VerticalSidebar from './VerticalSidebar';
import './SecondPage.css';
import { Box } from '@mui/material';

const SecondPage = () => {
  return (
    <div className="page-container">
      <div className="header">
        <h1>Travel Finland</h1>
        <UserInfo />
      </div>
      
      <div className="content-container">
        <VerticalSidebar />
        
        <div className="main-content">
          
          <PublishForm />
        </div>
      </div>
      
    </div>
  );
};

export default SecondPage;
