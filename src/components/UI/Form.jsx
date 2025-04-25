import React, { useEffect, useState } from "react";
import { postData, updateData } from "../../API/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;
  //get the updated data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  //add
  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
};

//update
const updatePostData = async ()=>{
    try {
        const res = await updateData(updateDataApi.id , addData); 
        console.log(res);
        if(res.status === 200){
            setData((prev)=>{
                return prev.map((curElem)=>{
                    return curElem.id === res.data.id ? res.data : curElem;
                })
            })
            setAddData({title:"",body:""});
            setUpdateDataApi({});
        }
        
    } catch (error) {
        console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          name="title"
          id="title"
          value={addData.title}
          onChange={handleInput}
          placeholder="Add Title"
          autoComplete="off"
        />
        <input
          type="text"
          name="body"
          id="body"
          value={addData.body}
          onChange={handleInput}
          placeholder="Add Post"
          autoComplete="off"
        />
        <button
          className="btn-add"
          value={isEmpty ? "Add" : "Edit"}
          type="submit"
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
