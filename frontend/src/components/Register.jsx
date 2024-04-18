import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { opetions } from '../utils/options';
import { registerRoute } from '../utils/apiRoute';
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [cpassword,setCpassword]=useState("")
    const navigate=useNavigate();

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
         navigate("/login")
        }
    }, [])

    const handleRegister=async(e)=>{
        e.preventDefault();

        const config={
            headers:{
                "content-type": "application/json"
            }
        }

        if(password!==cpassword){
            toast.error("Password Does Not Match..!!",opetions);
            return ;
        }

        try {
            const info={
                username:username,
                email:email,
                password:password,
            }
            const { data } = await axios.post(registerRoute, info,config);
              console.log(data.data);
            // localStorage.setItem("authToken",data.token);
            // toast.success("User Register Successfully..!!",options)
            navigate("/login");
        } catch (error) {
            toast.error("Backend Error",opetions);
        }
    }
    return (
        <>
        <PageContainer>
            <FormContainer onSubmit={handleRegister}>
                {/* <h2>Register</h2> */}
                <FormGroup>
                    <Label htmlFor="username">Username :</Label>
                    <Input type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username'/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email :</Label>
                    <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Here' />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password :</Label>
                    <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password Here' />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">Confirm Password :</Label>
                    <Input type="password" id="cpassword" name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' />
                </FormGroup>
                <Button type="submit">Register</Button>
                <Para>Already have an account ? Please <Link to="/login">Login</Link></Para>
            </FormContainer>
        </PageContainer>
            <ToastContainer />
            </>
    );
};


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
  
`;

const Para=styled.div`
  font-size:16px;
  font-weight:bold;
  padding-top:10px;
  a{
    color:red;
    font-weight:bold;
    text-decoration:underline;
  }
`


export default Register;
