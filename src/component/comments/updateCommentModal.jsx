import { AiOutlineClose } from "react-icons/ai";

import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate, user }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(commentForUpdate?.text);

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("post write something");

    dispatch(updateComment(commentForUpdate?._id, text , user)); // hyda bdu el comment id bas el comment id mawjude bl comment for update
    setUpdateComment(false);
    
  };

  return (
    <div className="update-comment fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[999] flex items-center justify-center">
      <form
        onSubmit={formSubmitHandler}
        className="update-post-form w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]"
      >
        <abbr title="close">
          <AiOutlineClose
            onClick={() => setUpdateComment(false)}
            className="update-comment-form-close absolute top-[5px] right-[5px] text-[#d9534f cursor-pointer text-[30px]"
          />
        </abbr>
        <h1 className="update-comment-title mb-2.5 text-[24px] text-[#16a085] text-center">
          {" "}
          Edit Comment
        </h1>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="update-post-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        />

        <button
          type="submit"
          className="update-comment-btn w-full text-center cursor-pointer bg-[#16a085] border-0 text-[21px] font-medium text-white rounded-[10px] p-2.5 mt-[15px]"
        >
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
