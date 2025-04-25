import React from 'react'
import { deletePost } from '../../API/PostApi';

const Cards = ({curData}) => {
    const handleDelete=async(id)=>{
        try{
            const res = await deletePost(id);
            if(res.status === 200){
                const newUpdatedPosts = data.filter((curPost)=>{
                    return curPost.id === id;
                })
                setData(newUpdatedPosts);
            }
        }catch(error){
            console.log(error);
            
        }
        
    }
    const {id ,title ,body} = curData;
  return (
    <div className='box'>
      <p className='id'>{id}</p>
      <p>Title : {title}</p>
      <p>News : {body}</p>
      <div className="button-container">
        <button className='btn-edit'>Edit</button>
        <button className='btn-add' onClick={()=>handleDelete(id)}>Delete</button>
      </div>
    </div>
  )
}

export default Cards
