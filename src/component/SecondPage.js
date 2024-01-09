import React from 'react'
import UserInfo from './UserInfo'
import PublishForm from './PublishForm'
import VerticalSidebar from './VerticalSidebar'
import './SecondPage.css'
import { Box } from '@mui/material'

const SecondPage = () => {
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="main-content">
          <PublishForm />
        </div>
      </div>
    </div>
  )
}

export default SecondPage
