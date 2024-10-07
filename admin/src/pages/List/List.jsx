import { useState } from 'react'
import './list.css'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const List = () => {
  const [list,setList]=useState()
  const fetchList=async () =>{
    try {
      const res=await axios.get('http://localhost:4000/api/food/list')
      setList(res.data.data);
    } catch (error) {
      toast.error(" Couldn't get list")
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  const deleteFood=async (id) =>{
    try {
      await axios.delete(`http://localhost:4000/api/food/${id}`)
      toast.success("Deleted successfully")
      fetchList()
    } catch (error) {
      toast.error("Failed to delete")
      console.log(error);
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list&& list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>deleteFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
