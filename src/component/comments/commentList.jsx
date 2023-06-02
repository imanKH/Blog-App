import { useState } from "react";
// import { BsPencilSquare, BsTrash } from "react-icons/bs";
import swal from "sweetalert";
// import { useState } from "react";
import UpdateCommentModal from "./updateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { DeleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const [UpdateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const [userID, setUserID] = useState(0);

  //update comment handler
  const updateCommentHandler = (Comment) => {
    setCommentForUpdate(Comment);
    setUpdateComment(true);
    setUserID(Comment._id);
  };
  console.log(comments);
  // Delete comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(DeleteComment(commentId));
      }
    });
  };

  return (
    <div className="comment-list flex  flex-col gap-3 rounded-[5px] mb-5">
      <h4 className="comment-list-count select-none text-[30px] tetx-[#292b2c] pb-[5px]">
        {comments?.length} comments
      </h4>
      <div className="flex flex-col gap-3">
        {comments
          ?.slice(0)
          .reverse()
          .map((Comment) => (
            <div key={Comment._id} className="comment-item px-2">
              <div className="flex flex-row items-start gap-3">
                <img
                  src={post?.user.profilePhoto?.url}
                  alt=""
                  draggable="false"
                  className="post-details-user-image select-none h-[55px] object-cover rounded-[8px]"
                />
                {/* <div className="w-[60px] h-[60px] rounded-full bg-slate-400"></div> */}
                <div className="flex flex-col gap-2">
                  {/* username and createdAt */}
                  <div className="flex flex-row items-center select-none gap-2 font-thin">
                    <div className="flex items-center gap-3">
                      <div className=" text-[14px] font-semibold text-[#1d2d3d] capitalize">
                        {Comment.username}
                      </div>
                      <div className="text-[12px] text-gray-400">
                        <Moment fromNow ago>
                          {Comment.createdAt}
                        </Moment>{" "}
                        ago
                      </div>
                    </div>
                    {user?._id === Comment.user && (
                      <div className="flex select-none items-center gap-3">
                        <div className="space-x-2 text-[12px]">
                          <span
                            onClick={() => updateCommentHandler(Comment)}
                            className="border-b border-b-[#8FB8B4] hover:border-b-transparent transition-all duration-300 text-[#8FB8B4] cursor-pointer"
                          >
                            edit
                          </span>
                          <span
                            onClick={() => deleteCommentHandler(Comment?._id)}
                            className="border-b border-b-[#8FB8B4] hover:border-b-transparent transition-all duration-300 text-[#8FB8B4] cursor-pointer"
                          >
                            delete
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* comment description */}
                  <p className="comment-item-text text-gray-500 text-[16px]">
                    {Comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {UpdateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
          user={userID}
        />
      )}
    </div>
  );
};

export default CommentList;
