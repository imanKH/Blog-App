import { Link } from "react-router-dom";
import {
  BsPerson,
  BsFilePostFill,
  BsTagFill,
  BsChatLeftText,
} from "react-icons/bs";
import AddCategoryForm from "./addCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import { useEffect } from "react";
import fetchCategories from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profiLeApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { setUsersCount } = useSelector(state => state.profile);
  const { postsCount } = useSelector(state => state.post);
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <div className="admin-main flex-[10] p-5 ">
      <div className="admin-main-header flex items-center justify-between flex-wrap mb-[30px] border-b border-gray-400">
        <div className="admin-main-card border border-gray-400 w-[22%] m-2.5 p-5 rounded-[10px]">
          <h5 className="admin-card-title text-[21px] font-medium text-gray-500">
            Users
          </h5>
          <div className="admin-card-count text-[#3D7AC5] text-[24px]  font-semibold my-2.5">
            {setUsersCount}
          </div>
          <div className="admin-card-link-wrapper flex items-center justify-between ">
            <Link
              to="/admin-dashboard/users-table"
              className="admin-card-link text-[17px] bg-[#3D6084] p-2.5 rounded-[10px] font-medium text-white "
            >
              See all Users
            </Link>
            <div className="admin-card-icon w-[35px] h-[35px] rounded-[10px] bg-[#3D6084] flex items-center justify-center text-[24px] text-white">
              <BsPerson />
            </div>
          </div>
        </div>

        <div className="admin-main-card border border-gray-400 w-[22%] m-2.5 p-5 rounded-[10px]">
          <h5 className="admin-card-title text-[21px] font-medium text-gray-500 ">
            Posts
          </h5>
          <div className="admin-card-count text-[#3D7AC5] text-[24px]  font-semibold my-2.5">
            {postsCount}
          </div>
          <div className="admin-card-link-wrapper flex items-center justify-between">
            <Link
              to="/admin-dashboard/posts-table"
              className="admin-card-link text-[17px] bg-[#3D6084] p-2.5 rounded-[10px] font-medium text-white "
            >
              See all Posts
            </Link>
            <div className="admin-card-icon w-[35px] h-[35px] rounded-[10px] bg-[#3D6084] flex items-center justify-center text-[24px] text-white">
              <BsFilePostFill />
            </div>
          </div>
        </div>

        <div className="admin-main-card border border-gray-400 w-[22%] m-2.5 p-5 rounded-[10px]">
          <h5 className="admin-card-title text-[21px] font-medium text-gray-500">
            Categories
          </h5>
          <div className="admin-card-count text-[#3D7AC5] text-[24px]  font-semibold my-2.5">
            {categories.length}
          </div>
          <div className="admin-card-link-wrapper flex items-center justify-between">
            <Link
              to="/admin-dashboard/categories-table"
              className="admin-card-link text-[17px] bg-[#3D6084] p-2.5 rounded-[10px] font-medium text-white"
            >
              See all Categories
            </Link>
            <div className="admin-card-icon  w-[35px] h-[35px] rounded-[10px] bg-[#3D6084] flex items-center justify-center text-[24px] text-white">
              <BsTagFill />
            </div>
          </div>
        </div>

        <div className="admin-main-card border border-gray-400 w-[22%] m-2.5 p-5 rounded-[10px]">
          <h5 className="admin-card-title text-[21px] font-medium text-gray-500">
            Comments
          </h5>
          <div className="admin-card-count text-[#3D7AC5] text-[24px]  font-semibold my-2.5">
            {comments.length}
          </div>
          <div className="admin-card-link-wrapper flex items-center justify-between">
            <Link
              to="/admin-dashboard/comments-table"
              className="admin-card-link text-[17px] bg-[#3D6084] p-2.5 rounded-[10px] font-medium text-white"
            >
              See all Comments
            </Link>
            <div className="admin-card-icon w-[35px] h-[35px] rounded-[10px] bg-[#3D6084] flex items-center justify-center text-[24px] text-white">
              <BsChatLeftText />
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  );
};

export default AdminMain;
