import  { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { options } from '../utils/options';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { resetPasswordRoute } from '../utils/apiRoute';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 500px;
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
  font-size: 16px;
  font-weight: bold;
  padding-top: 10px;
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

const H2 = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const Resetpassword = () => {
  const { resetToken } = useParams()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    const data = {
      password,
      confirmPassword
    };

    try {
      const response = await axios.put(`${resetPasswordRoute}/${resetToken}`, data, config);
      setSuccessMessage(response.data);
      // console.log(response.message);
      navigate("/login");
      
    } catch (error) {
      // setErrorMessage("Error resetting password");
      toast.error("Error resetting password", {
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
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleResetPassword}>
        <H2>Reset Password</H2>
        <FormGroup>
          <Label htmlFor="password">New Password:</Label>
          <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit">Reset Password</Button>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
      <ToastContainer />
    </PageContainer>
  );
};


export default Resetpassword
