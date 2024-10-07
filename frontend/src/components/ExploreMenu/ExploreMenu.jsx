import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../assets/front/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div id='explore-menu' className='explore-menu'>
      <h1>
        Explore our menu
      </h1>
      <p className='explore-menu-text'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, provident?
        
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, provident?

      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index) => (
          <div onClick={()=>setCategory((pre)=>{
            if(pre === item.menu_name) return 'All'
            return item.menu_name
          })} className="explore-menu-list-item" key={index}>
            <img className={`${category==item.menu_name?"active":''}`} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
           
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
