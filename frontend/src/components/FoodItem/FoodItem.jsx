import React, { useContext, useState } from 'react'
import './fooditem.css'
import { assets } from '../../assets/front/assets'
import { StoreContext } from '../../context/StoreContext';
import { IMAGES_PATH } from '../../my_env/the_urls';
const FoodItem = ({food}) => {
    const {cartItems,addToCart,removeFromCart}=useContext(StoreContext);
    
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            {console.log(`${IMAGES_PATH}images/${food?.image}`)}
            <img className='food-item-image' src={`${IMAGES_PATH}uploads/${food?.image}`} alt={food?.name} />
            {
                 !cartItems[food?._id] ?
                (<div className='food-item-counter'>

                <img className='add' onClick={()=>{
                    addToCart(food?._id);
                }}  src={assets.add_icon_white} alt='no' 
               
                />
                </div>)
                :(<div  className='food-item-counter'>
                    <img  onClick={()=>{
                    removeFromCart(food?._id);
                }} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[food?._id]}</p>
                    <img  onClick={()=>{
                   addToCart(food?._id);
                }} src={assets.add_icon_green} alt="" />
                    </div>)
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{food?.name}</p>
                <img src={assets.rating_starts} alt="rating" />
            </div>
            <p className='food-item-desc'>
                {food?.description}
            </p>
            <p className="food-item-price">
                ${food?.price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem
