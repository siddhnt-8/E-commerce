import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <Layout title='Go back -404 not found'>
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found</h2>
        <Link to='/' className='pnf-btn'>Go back</Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound
