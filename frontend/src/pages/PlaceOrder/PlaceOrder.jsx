import  { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/API_URL.js';
const PlaceOrder = () => {
  const {getTotalCartAmount,Token,food_list,cartItems}=useContext(StoreContext);
  const nav=useNavigate();
  useEffect(()=>{
    if(!Token)nav('/')
  
  },[Token])
  const [data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phone:''
  })
  const onChangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const placeOrder=async(e)=>{
    e.preventDefault()
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo.quantity=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
      userId:Token
    }
    let response=await axios.post(`${API_URL}/order/place`,orderData,{headers:{Token}})
    if( response.data.success){
      alert('Order Placed Successfully')
      const {sessionurl}=response.data;
    
      window.location.replace(sessionurl) ;
    }else{
      toast.error(response.data.message)
    }
    console.log(response.data);
  }
  return (
    <form onSubmit={placeOrder} className="place-order">
     <div className="place-order-left">
      <p className="title">Delivary Information</p>
      <div className="multi-fildes">
        <input required type="text" name='firstName' value={data.firstName} onChange={(e)=>{
          onChangeHandler(e);
        }}  placeholder="Firest Name" />
        <input required type="text" name='lastName' value={data.lastName} onChange={(e)=>{
          onChangeHandler(e);
        }} placeholder="Last Name" />
      </div>
      <input required type='email' name='email' value={data.email} onChange={(e)=>{
        onChangeHandler(e);
      }} placeholder='Email Address' />
      <input required type='text' name='street' value={data.street} onChange={(e)=>{
        onChangeHandler(e);
      }} placeholder='Street' />
      <div className="multi-fildes">
        <input required type="text" name='city' value={data.city} onChange={(e)=>{
          onChangeHandler(e);
        }} placeholder="City" />
        <input required type="text" name='state' value={data.state} onChange={(e)=>{
          onChangeHandler(e);
        }} placeholder="State" />
      </div>
      <div className="multi-fildes">
        <input required type="text" name='zipCode' value={data.zipCode} onChange={(e)=>{
          onChangeHandler(e);
        }} placeholder="Zip code" />
        <input required type="text" name='country' value={data.country} onChange={(e)=>{
          onChangeHandler(e);
        }} placeholder="Country" />
      </div>
      <input required type="text" name='phone' value={data.phone} onChange={(e)=>{
        onChangeHandler(e);
      }} placeholder="Phone" />
     </div>
     <div className="place-order-right">
     <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()==0?0:getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${+2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' onClick={()=>{
         
          }}>PROCEED TO PAYMENT</button>

        </div>
     </div>
    </form>
  )
}

export default PlaceOrder
