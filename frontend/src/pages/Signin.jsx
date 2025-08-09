import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from '../config/api';

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
      const response = await axios.post(API_ENDPOINTS.USER_SIGNIN, {
        username,
        password
      });
            
            login(response.data.user, response.data.token);
            
            navigate("/dashboard");
        } catch (error) {
            alert("Error while signing in");
            console.error(error);
        }
    };

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox 
          placeholder="harkirat@gmail.com" 
          label={"Email"} 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox 
          placeholder="123456" 
          label={"Password"} 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSignin} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}