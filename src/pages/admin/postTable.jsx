import AdminSidebar from "./adminSidebar";
import { Link } from "react-router-dom";
import "./userTable.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
   dispatch(getAllPosts());
  },[dispatch])

  //Delete User Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
     dispatch(deletePost(postId))
      } 
    });
  };
  return (
    <section className="table-container flexh-screen mb-[130px] overflow-hidden">
      <AdminSidebar />
      <div className="table-wrapper flex-[10] p-[20px] overflow-y-scroll">
        <h1 className="table-title text-[30px] text-[#495e74] mb-[15px] border-b-2 border-solid border-blue-800 pb-[3px] w-max">
          Posts
        </h1>
        <table className="table w-full text-left border-collapse">
          <thead>
            <tr>
              <th>count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index+ 1}</td>
                <td>
                  <div className="table-image flex items-center ">
                    <img
                      src={item.user.profilePhoto?.url}
                      alt=""
                      className="table-user-image w-[40px] h-[40px] rounded-[50%] object-cover"
                    />
                    <span className="tabel-username  font-medium text-[17px] ml-2.5 ">
                      {item.user.userName}
                    </span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group flex items-center justify-around">
                    <button className=" border-0 bg-[#27ae60] text-white rounded-[5px] text-[17px] font-medium p-2.5 cursor-pointer">
                      <Link className=" text-white" to={`/posts/details/${item._id}`}>
                        {" "}
                        View Post
                      </Link>
                    </button>
                    <button
                      onClick={() => deletePostHandler(item._id)}
                      className=" border-0  text-white rounded-[5px] text-[17px] font-medium p-2.5 cursor-pointer"
                    >
                      Delete Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PostsTable;
