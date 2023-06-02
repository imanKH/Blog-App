import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import createComment, { fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId, user }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("please write something");

    dispatch(createComment({ text, postId, user }));
    setText("");
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex gap-3 flex-col">
      <textarea
        type="text"
        placeholder="Add a comment"
        className="add-comment-input w-full p-2 text-[16px] border  rounded-[5px]"
        value={text}
        rows={5}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#1d2d3d] text-white font-bold shadow-md rounded-full capitalize px-4 py-1 text-[14px]"
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default AddComment;
