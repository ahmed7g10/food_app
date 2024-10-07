import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../my_env/the_urls";
export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({})
    const [Token,setToken] = useState("");
    const [food_list,settFoodList]=useState([])
    const fetchFoodList = async()=>{
        try {
            const res=await axios.get(`${API_URL}/food/list`)
            settFoodList(res.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    const addToCart=async(itemId)=>{
         if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
         }else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
         }
         if(Token){
            await axios.post(`${API_URL}/cart/add`,{itemId:itemId},{headers:{token:Token}})
         }
    }
    const removeFromCart=async(itemId)=>{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
            if(Token){
                await axios.post(`${API_URL}/cart/remove`,{itemId:itemId},{headers:{token:Token}})
             }
    }
    const loadCartData=async(t)=>{
        if(t){
            const res=await axios.post(`${API_URL}/cart/get`,{},{headers:{token:t}})
            console.log("res")
            setCartItems(res.data.cartData);
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo =food_list.find(product=>product._id===item);
                totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    useEffect(()=>{
         const loadData=async()=>{
            await fetchFoodList();
            
            if(localStorage.getItem(`token`)){
            setToken(localStorage.getItem(`token`))
            await loadCartData(localStorage.getItem(`token`));
        }
    }
    loadData();
       
    },[])
    const contextValue={
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        Token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;