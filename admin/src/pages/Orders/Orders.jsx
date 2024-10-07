import { useState } from 'react'
import './orders.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from './../../assets/assets';
const Orders = () => {
  const [orders,setOrders]=useState([])
  const fetchAllOrders=async()=>{
    const response =await axios.get('http://localhost:4000/api/order/list')
    if (response.data.success){
      console.log(response.data.data);
      setOrders(response.data.data)
    }else{
      toast.error("error")
    }
  }
  const statusHandler =async(e,id)=>{
    const response = await axios.post('http://localhost:4000/api/order/status',{
      orderId:id,
      status:e.target.value
    })
    if (response.data.success){
      toast.success("Status updated successfully")
      fetchAllOrders()
    }else{
      toast.error("Failed to update status")
    }

  }
  useEffect(()=>{
    fetchAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders&& orders.map((order,index)=>{
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((food,index)=>(
                    <span key={index}>{food.name}, </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " "+order.address.lastName }
                </p>
                <div className="order-item-address">
                  <p>
                    {order.address.street}
                  </p>
                 <p>
                 {order.address.street +", "+order.address.city +", "+order.address.state}
                 </p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>items {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>{
                statusHandler(e,order._id)
              }} name="" value={order.status} id="">
                <option value="Food Processing">food Processing</option>
                <option value="out">out</option>
                <option value="done">done</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
