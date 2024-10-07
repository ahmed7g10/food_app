import { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import './add.css'
import { toast } from 'react-toastify'
const Add = () => {
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:'',
    description:'',
    category:'Salad',
    price:"",
  })
  const onchangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('price',Number(data.price));
    formData.append('image',image);
    try {
      await axios.post('http://localhost:4000/api/food/add',formData);
      setData({
        name:'',
        description:'',
        category:'Salad',
        price:"",
      })

      setImage(false)
      toast.success("successfully created  new food");
    } catch (error) {
      toast.error('Failed to add product');
      console.log(error);
    }
  }
  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img upload flex-col">
          <p>
            Upload Image
          </p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input type="file"
          onChange={(e)=>{
            setImage(e.target.files[0])
          }}
          id="image" required hidden accept="image/*" />
        </div>
        <div className="add-product-name flex-col">
          <label htmlFor="name">
            Product Name:
          </label>
          <input  value={data.name} placeholder='enter' onChange={(e)=>{
            onchangeHandler(e)
          }} type="text" id="name" name='name' required />
        </div>
        <div className="add-product-description flex-col">
          <label htmlFor="description">
            Description:
          </label>
          <textarea  onChange={(e)=>{
            onchangeHandler(e)
          }} id="description"
          placeholder='write Content'
           rows={'6'}
           value={data.description} name='description' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>
              Category:
            </p>
            <select id="category"  value={data.category}  onChange={(e)=>{
            onchangeHandler(e)
          }} name='category'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="SandWich">SandWich</option>
              <option value="Cake">Cake</option>
              <option value="Pure">Pure</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>
              Product Price
            </p>
            <input value={data.price}  onChange={(e)=>{
            onchangeHandler(e)
          }} type="number" placeholder='$20' name='price' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>

      </form>
    </div>
  )
}

export default Add
