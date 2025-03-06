import React ,{useEffect,useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {
  //context
  const [auth,setAuth] = useAuth()
  //state
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(()=>{
      const {email,name,phone,address} = auth.user
      setName(name)
      setAddress(address)
      setEmail(email)
      setPhone(phone)
    },[])

    //handleSubmit
    const handleSubmit = async (e) => {
      e.preventDefault();
      try { 
      const {data} =  await axios.put('http://localhost:8080/api/v1/auth/profile', {  
          name, email, password, phone, address
        });
        if(data?.error){
          toast.error(data?.error)
        }else{
          setAuth({...auth,user :data?.updateUser})
          let ls = localStorage.getItem('auth')
          ls = JSON.parse(ls)
          ls.user = data.updateUser
          localStorage.setItem('auth',JSON.stringify(ls))
          toast.success("profile is updated successfully")
        }
       
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
  return (
    <Layout title={'User profile - Ecommerce Website'}>
      <div className="container-fuild m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
          <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">UPDATE FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail12"
              placeholder="Enter Your Email "
              disabled
            />
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail14"
              placeholder="Enter Your Phone"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail15"
              placeholder="Enter Your Address"
            />
          </div>
         
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
