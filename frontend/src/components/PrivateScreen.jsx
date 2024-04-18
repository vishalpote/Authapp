import {useState,useEffect} from 'react'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios';
import { getData } from '../utils/apiRoute';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const PrivateScreen = () => {

  const [user,setUser]=useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
     navigate("/login")
    }

    const fetchData=async()=>{
      const opetions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }

      try {
        const {data}=await axios.get(getData,config);
        setUser(data.data);
      } catch (error) {
        // localStorage.removeItem("authToken");
        toast.error("You Are Not Authorized Please Login..!!", opetions)
      }
    }
    fetchData();
  },[]);

  const handleLogout=()=>{
    localStorage.clear("authToken");
   navigate("/login");
  }
  return (
    <>
      <Container>
        <h1>Welcome to the Home Page</h1>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Container>
        <ToastContainer></ToastContainer>
    </>
  )
}


const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

// const UserInfo = styled.div`
//   background-color: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 20px;
//   margin-bottom: 20px;
// `;

// const UserName = styled.h2`
//   margin-bottom: 10px;
// `;

// const Email = styled.p`
//   font-size: 18px;
// `;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;
export default PrivateScreen
