import axios from 'axios';
import './verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useEffect } from 'react';
import { API_URL } from '../../my_env/the_urls.js';
const Verify = () => {
    const [search,setSearch]=useSearchParams();
    const success=search.get('success');
    const orderId=search.get('orderId');
    const nav=useNavigate();
    console.log(success,orderId);
    const verifyPayment=async()=>{
        const res=await axios.post(`${API_URL}/order/verify`,{success,orderId},)
        if(res.data.success){
            nav('/myorders')
        }else{
            nav('/')
        }
    }
    useEffect(()=>{
        verifyPayment()
        // eslint-disable-next-line
    },[])
  return (
    <div className='verify'>
      <div className="spiner">

      </div>
    </div>
  )
}

export default Verify;
