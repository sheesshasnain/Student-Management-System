import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'
import { Button } from '@mui/material'

const NotFoundPage = () => {
  return (
    <div><center><h1>Page Not Found </h1>
    <Link to={"/"}>
    <Button variant="contained">Return</Button>
      </Link>
        </center>
        </div>
  )
}

export default NotFoundPage