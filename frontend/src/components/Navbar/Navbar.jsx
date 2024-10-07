import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './navbar.css'
import { assets } from '../../assets/front/assets';
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState('home');
    const {getTotalCartAmount,Token,setToken}=useContext(StoreContext);
    const navi=useNavigate()
    const Logout=()=>{
        setToken("")
        localStorage.removeItem('token');
        navi('/')
    }
  return (
    <div className='navbar'>
        <Link to='/'>
        <img className='logo' src={assets.logo} alt="logo" />
        </Link>
            <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={`${menu ==="home"?'active':''}`} >home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu ==="menu"?'active':''}`}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={`${menu ==="mobile-app"?'active':''}`}>mobile App</a>
            <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu ==="contact"?'active':''}`}>contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="search" />
            <div className="navbar-searc-icon">
               <NavLink to={'/cart'}> <img src={assets.basket_icon} alt="basket" /></NavLink>
                <div className={`${getTotalCartAmount()===0?"":"dot"}`}>
                    
                </div>
            </div>
            {!Token?<button onClick={()=>{
                setShowLogin(pre=>!pre)
            }}>
                sign in
            </button>:(
                <div className="navbar-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul className="navbar-profile-dropdown">
                        <li>
                            <Link to={'/myorders'}>
                            <img src={assets.bag_icon} alt="" />
                        <p>Orders</p></Link>
                        </li>
                        <hr />
                        <li onClick={Logout}><img src={assets.logout_icon} alt="" />
                        <p>Logout</p></li>
                        <hr />
                    </ul>
                </div>
            )}
            
        </div>
    </div>
  )
}

export default Navbar
