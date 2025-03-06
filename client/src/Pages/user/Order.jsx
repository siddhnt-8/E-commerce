import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import userModel from '../../../../models/userModel';

function Order() {
useEffect(() => {
  fetchUserId()
}, [])

  const fetchUserId = async () => {
    try {
      const users = await userModel.find(); 
      users.forEach((user) => console.log(user._id)); 
    } catch (error) {
      console.error("Error fetching user IDs:", error);
    }
  };

  return (
    <Layout title={'Users orders - Ecommerce website'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Order
