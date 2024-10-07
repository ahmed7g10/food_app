import { useContext, useEffect, useState } from 'react'
import './myorders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/front/assets';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../my_env/the_urls.js';
const MyOrders = () => {
    const [data,setdata] =useState([])
    const {Token}=useContext(StoreContext);
    const nav=useNavigate()
    const fetchOrders=async()=>{
        const response=await axios.post(`${API_URL}/order/userorders`,{},{headers:{token:Token}})
        setdata(response.data.data)
        console.log(response.data.data);
    }
    useEffect(()=>{
        if(Token){
            fetchOrders()
        }else{
            nav('/')
        }
    },[Token])
  return (
    <div className='my-orders'>
        <h2>My Ordes</h2>
        <div className="container">
            {
                data.map((item,index)=>{
                    return <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>Items: {item.items.map(i=>i.name).join(', ')}</p>
                        <p>Total: ${item.amount}.00</p>
                        <p>items:{item.items.length}</p>
                        <p>Status: {item.status}</p>
                        <button onClick={fetchOrders}>
                            Track Order
                        </button>
                    </div>
                })
                

                
            }
        </div>
    </div>
  )
}

export default MyOrders
