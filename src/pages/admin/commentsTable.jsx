import AdminSidebar from "./adminSidebar";
import "./userTable.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DeleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";


const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
dispatch(fetchAllComments());
  },[dispatch]);

  //Delete Comment Handler
  const deletetCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteComment(commentId));
      }
    });
  };
  return (
    <section className="table-container flexh-screen mb-[130px] overflow-hidden">
      <AdminSidebar />
      <div className="table-wrapper flex-[10] p-[20px] overflow-y-scroll">
        <h1 className="table-title text-[30px] text-[#495e74] mb-[15px] border-b-2 border-solid border-blue-800 pb-[3px] w-max">
          Comments
        </h1>
        <table className="table w-full text-left border-collapse">
          <thead>
            <tr>
              <th>count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item , index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
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
                <td>{item.text}</td>
                <td>
                  <div className="table-button-group flex items-center justify-around">
                   
                    <button
                      onClick={() => deletetCommentHandler(item._id)}
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

export default CommentsTable;
