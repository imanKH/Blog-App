import { useState } from "react";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
const dispatch = useDispatch();
const [title ,setTitle]=useState("");

//form submit handler 
const formSubmitHandler =(e) => {
    e.preventDefault();
    if(title.trim()==="") return toast.error("category Title is required");

dispatch(createCategory( { title }));
setTitle("");
}

    return (
        <div className="add-Category mx-auto my-2.5 mt-[20px] w-[700px] border border-gray-400 rounded-[10px] p-5">
            <h6 className="add-category-title text-[24px] font-semibold text-[#1d2d3d] mb-[15px]">Add New Category </h6>
            <form onSubmit={formSubmitHandler}>
                <div className="add-category-form-group mb-[15px] flex flex-col ">
                    <label htmlFor="title" className="m-2.5 text-[15px] font-semibold text-gray-400"> Category Title</label>
                    <input 
                    type="text"
                     id="title" 
                     placeholder="Enter Category Title"
                      className="p-5 border border-gray-400 rounded-[10px] text-[21px]"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      />
                </div>
                <button type="submit" className="add-category-btn cursor-pointer border-0 bg-[#3D6084] w-full text-[21px] font-semibold rounded-[10px] p-5 text-white">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddCategoryForm;
