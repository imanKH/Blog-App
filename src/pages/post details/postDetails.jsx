import "./postDetail.css";
import { Link, useParams, useNavigate } from "react-router-dom"; // kl l parameter yalle mawjude bl url btkun mawjude bl useParams
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../component/comments/AddComment";
import CommentList from "../../component/comments/commentList";
import swal from "sweetalert";
import UpdatePostModal from "./updatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams(); // baeml object destructuring bas ef2uss aa read more bisir bytla3 3ande deghre el id taba3 el post bl url w talama ana aande el ide tabae el post b2eder jibu mn el array

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id)); //el id akhadta mn el useparams
  }, [id, dispatch]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };
  // w-full object-cover bg-center bg-no-repeat h-full
  return (
    <>
      <div className="h-20 bg-gradient-to-br from-[#380036] to-[#0CBABA] " />

      <section className="post-deatils w-[50%] mt-[3px] m-auto  max-md:w-full max-md:px-2">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="w-full object-cover mb-4 bg-no-repeat max-h-[500px] "
        />
        <div className="post-details-user-info flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={post?.user.profilePhoto?.url}
              alt=""
              className="post-details-user-image w-[40px] h-[40px] object-cover rounded-lg"
            />
            <div className="post-details-user flex text-[12px] items-center gap-2 ">
              <strong className="border-b-gray-400 hover:border-b-transparent transition-all duration-300 text-gray-400 capitalize">
                <Link to={`/profile/${post?.user._id}`}>
                  {post?.user.userName}
                </Link>
              </strong>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="border-b border-b-transparent text-gray-400">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </div>
          {user?._id === post?.user?._id && (
            <form
              onSubmit={updateImageSubmitHandler}
              className="update-post-image-form select-none flex flex-row-reverse gap-4"
            >
              <label
                htmlFor="file"
                className="border-b-gray-400 flex items-center gap-2  text-[16px] hover:border-b-transparent transition-all duration-300 text-gray-400 capitalize cursor-pointer "
              >
                <AiFillPicture className="text-[25px] inline-block" /> Select
                New Image
              </label>
              <input
                className="hidden"
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                className=" ml-[10px] bg-[#1d2d3d] text-white font-bold shadow-md rounded-full capitalize px-2 py-1 text-[10px]"
              >
                upload
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <h1 className="post-details-title  text-[40px] text-[#1d2d3d] font-bold capitalize text-right">
            {post?.title}
          </h1>
          <p className="post-details-description text-[18px] leading-relaxed text-[#1d2d3d] text-right">
            {post?.description}
          </p>
          <div className="post-details-icon-wrapper my-[15px] text-[27px] flex items-center justify-between text-[#0275d8]">
            <div className="flex">
              {user && (
                <BsHandThumbsUp
                  onClick={() => dispatch(toggleLikePost(post?._id))}
                  className="mr-[5px] cursor-pointer"
                />
              )}
              <small>{post?.likes.length} likes</small>
            </div>

            {user?._id === post?.user?.id && (
              <div className="flex">
                <BiEdit
                  onClick={() => setUpdatePost(true)}
                  className="mr-[15px] text-[#16a085]"
                />
                <MdDeleteOutline
                  onClick={deletePostHandler}
                  className="text-red-500"
                />
              </div>
            )}
          </div>
          {/* <div className="flex gap-3 ">
            <div className="w-[30px] h-[30px] rounded-full bg-slate-500"></div>
            <div>
              
            </div>
          </div> */}

          {user ? (
            <AddComment postId={post?._id} user={user?._id} />
          ) : (
            <p className="post-details-info-write text-[17px] text-[gray]">
             
              to write a comment you should login first
            </p>
          )}

          <CommentList comments={post?.comments} />
          {updatePost && (
            <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
          )}
        </div>
      </section>
    </>
  );
};

export default PostDetails;
