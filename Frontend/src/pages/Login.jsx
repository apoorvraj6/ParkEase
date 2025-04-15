import React, { useContext, useEffect, useState } from 'react'
import loging from '../assets/loging.svg'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const {backendUrl,token,setToken} = useContext(AppContext)
    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up')
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const onSubmitHandeler = async(e)=>{
        e.preventDefault();

        try {
            if(state === 'Sign Up')
            {
                const {data} = await axios.post(backendUrl+'/api/user/register-user',{name,password,email})
                if(data.success){
                    localStorage.setItem("token",data.token)
                    setToken(data.token)
                }else{
                    toast.error(data.message);
                }
                    
            
            }else{
                const {data} = await axios.post(backendUrl+'/api/user/login-user',{email,password})
                console.log(data);
                if(data.success)
                {
                    localStorage.setItem("token",data.token);
                    console.log(data.token)
                    setToken(data.token);
                    console.log(token)
                }else{
                    toast.error(data.message)
                }
            }
            

        } catch (error) {
            toast.error(error.message)
        }    
    }

    useEffect(()=>{
        if(token)
            navigate('/');
    },[token])

    return (
        <form onSubmit={onSubmitHandeler} className='min-h-[80vh] mt-10 flex justify-center  flex-col md:flex-row md:items-center md:justify-evenly md:gap-32 '>
            <img src={loging} alt="err" className='hidden md:block md:w-1/3' />

            <div className='mx-auto  flex flex-col gap-2 items-start md:ml-0 shadow-lg p-16 max-w-md'>
                <p className='text-4xl font-bold text-primary'>{state ==='Sign Up' ? 'Register' :'Login'}</p>

                <p className='text-xl font-medium '>Please {state ==='Sign Up' ? "Sign Up" : "Sign In"} to book Parking</p>
                
                {
                    state==="Sign Up" && <div className='w-full'>
                        <p className='text-xl font-medium'>Full Name</p>
                        <input type="text" required className='border w-full border-black px-3 py-1' onChange={(e)=>{setName(e.target.value)}}></input>
                    </div>
                }
                <div className='w-full'>
                    <p className='text-xl font-medium'>Email</p>
                    <input type="email" required className='border w-full border-black px-3 py-1' onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>

                <div className='w-full'>
                    <p className='text-xl font-medium'>Password</p>
                    <input type="password" required className='border w-full border-black px-3 py-1' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <button type='submit' className='bg-primary self-center mt-5 px-5 py-2 rounded-3xl text-white font-semibold'>{state==='Sign Up' ? "Create Account" : "Login"}</button>
                {
                    state==="Sign Up" ?
                    <p>Already have an account <span className='text-primary font-normal cursor-pointer' onClick={()=>{setState('Login')}}>Login Here</span></p> :
                    <p>Create a new account <span className='text-primary font-normal cursor-pointer' onClick={()=>{setState('Sign Up')}}>Create Account</span></p>
                }
            </div>

        </form>
    )
}

export default Login


