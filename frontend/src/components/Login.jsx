import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { opetions } from '../utils/options';
import { loginRoute } from '../utils/apiRoute';
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate();

    useEffect(()=>{
        if (localStorage.getItem("authToken")){
          navigate("/")
        }
    },[])



    const handleLogin = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        

        try {
            const info = {
                email: email,
                password: password,
            }
            const { data } = await axios.post(loginRoute, info, config);

            localStorage.setItem("authToken", data.token);
          // localStorage.setItem("UserId", JSON.stringify(data.data._id));
            navigate("/");
          toast.success("Logged In Successfull..", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            //   transition: Bounce,
          });
        } catch (error) {
            toast.error("Invalid Email And Password Please Try Again..!!", opetions);
        }
    }
    return (
        <>
            <PageContainer>
                <FormContainer onSubmit={handleLogin}>
                    {/* <h2>Register</h2> */}
                    <FormGroup>
                        <Label htmlFor="email">Email :</Label>
                        <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Here' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password :</Label>
                        <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password Here' />
                    </FormGroup>
                    <Button type="submit">Login</Button>
                    <Para>Don't have an account ? Please <Link to="/register">Register</Link></Para>
            <Link style={{ color: "blue",fontSize:"16px",paddingLeft:"100px",opacity:"0.8" }} to="/forgotpassword"> Forgot Password ?</Link>
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

const Para = styled.div`
  font-size:16px;
  font-weight:bold;
  padding-top:10px;
  a{
    color:red;
    font-weight:bold;
    text-decoration:underline;
  }
`;

const Linke=styled.div`
color:blue;
font-weight:bold;
font-size:16px;
opacity:0.5;
padding-left:100px;
`


export default Login;
