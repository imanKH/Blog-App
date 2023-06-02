import { AiOutlineClose } from "react-icons/ai";

import "./update-post.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import fetchCategories from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title is required");
    if (category.trim() === "") return toast.error("post category is required");
    if (description.trim() === "")
      return toast.error("post description is required");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="update-post fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[999] flex items-center justify-center">
      <form
        onSubmit={formSubmitHandler}
        className="update-post-form w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]"
      >
        <abbr title="close">
          <AiOutlineClose
            onClick={() => setUpdatePost(false)}
            className="update-form-close absolute top-[5px] right-[5px] text-[#d9534f cursor-pointer text-[30px]"
          />
        </abbr>
        <h1 className="update-post-title mb-2.5 text-[24px] text-[#16a085] text-center">
          {" "}
          Update Post
        </h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="update-post-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="update-post-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        >
          <option disabled value="">
            Select A category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="update-post-textarea w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
          rows="5"
        ></textarea>
        <button
          type="submit"
          className="update-post-btn w-full text-center cursor-pointer bg-[#16a085] border-0 text-[21px] font-medium text-white rounded-[10px] p-2.5 mt-[15px]"
        >
          Upload Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
