import styled from 'styled-components';
import axios from 'axios';
// import { options } from '../utils/options';
import { toast, ToastContainer } from 'react-toastify'
import { forgotRoute } from '../utils/apiRoute';
import { useState } from 'react';

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
  font-size:20px;
  font-weight:bold;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgot = async (e) => {
    // const option = options;

    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    try {
      const { data } = await axios.post(forgotRoute, { email }, config);
      setSuccessMessage(data.data);

    } catch (error) {
      // setErrorMessage("Couldn't Send Email..!!");
      toast.error("Couldn't Send Email..!!", {
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
      <FormContainer onSubmit={handleForgot}>
        <H2>Forgot Password</H2>
        <p>Enter your email address to reset your password.</p>
        <FormGroup>
          <Label htmlFor="email">Email :</Label>
          <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <Button type="submit">Send Email</Button>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
      <ToastContainer />
    </PageContainer>
  );
};

export default Forgotpassword;
