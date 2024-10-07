import  { useEffect, useContext,useState } from 'react'
import './loginpopup.css';
import { assets } from '../../assets/front/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';
import { API_URL } from '../../utils/API_URL.js';
const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState] =useState("Sign Up");
    const {setToken}=useContext(StoreContext)
    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',
    });
    const onchangeHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const onLogin=async(e)=>{
        e.preventDefault();       
        if(data.email==""||data.password==""){
            toast.error("Please fill all fields")
            return ;
        }
        const res=await axios.post(`${API_URL}/user/login`,{
            email:data.email,
            password:data.password
        });
        if(res.data.success){
            localStorage.setItem('token',res.data.token)
            setToken(res.data.token)
            toast.success("loged in successfully")
            setShowLogin(false)
        }else{
            toast.error(res.data.message)
        }
    }
    const onRegister=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('email',data.email);
        formData.append('name',data.name);
        formData.append('password',data.password);
        if(data.name==""||data.password==""){
            toast.error("Please fill all fields")
            return ;
        }
        const res=await axios.post(`${API_URL}/user/register`,{
            email:data.email,
            name:data.name,
            password:data.password
        })
        console.log(res);

        if(res.data.success==true){
            localStorage.setItem('token',res.data.token)
            toast.success("register successfully")

            setToken(res.data.token)
            setShowLogin(false)
        }else{
            
            toast.error(res.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={currentState =="Login"?onLogin:onRegister} className="login-popup-container">
           <div className="login-popup-title">
           <h2>
            {
                currentState === "Sign Up"? "Sign Up" : "Login"
 
            }
           </h2>
           <img onClick={()=>{
            setShowLogin(false)
           }} src={assets.cross_icon} alt="" />
           </div>
           <div className="login-popup-inputs">
            {
                currentState === "Sign Up"?
                <>
                   <input type="text" name='name' value={data.name} 
                   onChange={(e)=>{
                    onchangeHandler(e)
                   }}
                   placeholder="Username" />
                </>
                :
                <></>
            }
            <input type="email" name='email'
            value={data.email}
            onChange={(e)=>{
                onchangeHandler(e)
            }}
            placeholder="email" />
            <input type="password"
            name='password'
            value={data.password}
            onChange={(e)=>{
                onchangeHandler(e)
            }}
            placeholder="Password" />
           </div>
           <button type='submit' >
            {currentState === "Sign Up"?"Create Account":"Login"}
           </button>
            <div className="login-popup-condition">
                {
                    currentState === "Sign Up"?<div>
                        Already have an account?<span 
                        onClick={()=>{
                            setCurrentState("Login");
                        }}>Login</span>
                    </div> 
                     : <div>
                        Don't have an account? <span onClick={()=>{
                            setCurrentState("Sign Up");
                        }}>
                        Sign Up
                        </span>
                     </div>
                }
            </div>
          
        </form>
    </div>
  )
}

export default LoginPopup
