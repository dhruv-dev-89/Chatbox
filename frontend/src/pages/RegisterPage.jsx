import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import api from '../api/Api'
const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submitHandler=async (e)=>{
        e.preventDefault();
        try {
            const response=await api.post("/api/auth/register",{
                username,
                email,
                password
            });
            console.log(response.data);
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/login");
            
        } catch (error) {
            console.log(error);
        }
        
    }

  return (
    <div className='flex h-screen justify-center items-center tlext-white bg-app'>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}
        action="" 
        className='flex flex-col shadow-2xl shadow-black w-100 h-100 rounded-xl px-10  py-15 bg-panel border border-border justify-between '>
            <h1 className='text-4xl text-center'>Registration</h1>
            
            <input value={username}
            onChange={(e)=>{
                setUsername(e.target.value);
            }}
             className='bg-app border border-border text-ink-primary placeholder:text-ink-placeholder rounded px-1 py-1' type="text" id='username' placeholder='username...'/>
            <input value={email} 
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
             className='bg-app border border-border text-ink-primary placeholder:text-ink-placeholder rounded px-1 py-1' type="text" id='email' placeholder='email...' />
            <input value={password} 
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
             className='bg-app border border-border text-ink-primary placeholder:text-ink-placeholder rounded px-1 py-1' type="password" id="password" placeholder='password...' />
          
            <button type='submit' className=' bg-accent hover:bg-accent-hover text-white py-2 rounded px-2 text-xl active:scale-95 '>Register</button>
            <div className='flex gap-2 justify-center'>
                <h4>Already have an account?</h4>
                <Link to={"/login"} className='text-blue-400 underline hover:text-indigo-700'>Login</Link>
            </div>
        </form>
    </div>
  )
}


export default RegisterPage