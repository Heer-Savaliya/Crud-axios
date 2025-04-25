import axios from 'axios'
import React from 'react'

const API = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})


//get method
export const getPost = ()=>{
    return API.get("/posts");
}

//delete method
export const deletePost = (id)=>{
    return API.delete(`/posts/${id}`);
}

//post method
export const postData =(post)=>{
    return API.post('/posts' , post);
}

//put method
export const updateData =(id,post)=>{
    return API.put(`/posts/${id}` , post);
}