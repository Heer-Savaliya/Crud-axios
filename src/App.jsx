import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "./API/PostApi";
import Cards from "./components/UI/Cards";
import "./App.css";
import Form from "./components/UI/Form";

const App = () => {
  console.log(getPost());
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  //delete
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id != id;
        });
        setData(newUpdatedPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle update
  const handleUpdate = (curData)=>{
    setUpdateDataApi(curData);
  }


  //get
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="main">
      <h1>Crud with axios</h1>
      <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>

      <ol className="grid grid-col-three">
        {data.map((curData) => {
          const { id, title, body } = curData;
          return (
            <li key={curData.id}>
              <div className="box">
                <p className="id">{id}</p>
                <p>Title : {title}</p>
                <p>News : {body}</p>
                <div className="button-container">
                  <button className="btn-edit" onClick={() => handleUpdate(curData)}>Edit</button>
                  <button className="btn-add" onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default App;
