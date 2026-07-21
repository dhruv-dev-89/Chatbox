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
    <div className='flex h-screen justify-center items-center text-white bg-app'>
        
        <div className='flex  border border-border shadow-xl rounded-2xl bg-panel/60 lg:px-15 lg:py-10'>
            <div className='mr-10 flex flex-col gap-5 justify-center items-center '>
                <h1 className='text-5xl'>💬 Chat <span className='text-indigo-400'>Box</span></h1>
                <p className='text-gray-400 bg-white/10 rounded-2xl px-2 py-2'>Connect instantly with your friends.</p>
                <img src="/images/registerPage.jpg" className=' size-60 rounded-full' alt="" srcset="" />     
            </div>
            <div>
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }}
                action="" 
                className='flex flex-col shadow-2xl shadow-black w-70 h-80 lg:w-100 lg:h-100 rounded-xl px-7 lg:px-10 py-7 lg:py-15 bg-panel border border-border justify-between '>
                    <h1 className='lg:text-4xl text-3xl text-center  pb-4 lg:pb-0'>Registration</h1>
                    
                    <input value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    className='bg-app border  border-border  text-ink-primary placeholder:text-ink-placeholder rounded px-1 py-1' type="text" id='username' placeholder='username...'/>
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
                
                    <button type='submit' className=' bg-accent hover:bg-accent-hover text-white p-1 lg:py-2 rounded lg:px-2 text-xl active:scale-95 '>Register</button>
                    <div className='flex gap-2 justify-center'>
                        <h4 className='text-sm lg:text-xl'>Already have an account?</h4>
                        <Link to={"/login"} className='text-blue-400 underline hover:text-indigo-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}


export default RegisterPage