import AdminSidebar from "./adminSidebar";
import "./userTable.css";
import swal from "sweetalert";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import fetchCategories, { deleteCategory } from "../../redux/apiCalls/categoryApiCall";


const CategoriesTable = () => {
  const dispatch = useDispatch();
  const {categories} =useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  },[dispatch])


  //Delete category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
       dispatch(deleteCategory(categoryId))
      } 
    });
  };
  return (
    <section className="table-container flexh-screen mb-[130px] overflow-hidden">
      <AdminSidebar />
      <div className="table-wrapper flex-[10] p-[20px] overflow-y-scroll">
        <h1 className="table-title text-[30px] text-[#495e74] mb-[15px] border-b-2 border-solid border-blue-800 pb-[3px] w-max">
          Categories
        </h1>
        <table className="table w-full text-left border-collapse">
          <thead>
            <tr>
              <th>count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                 <b>{item.title}</b>
                </td>
               
                <td>
                  <div className="table-button-group flex items-center justify-around">
                    <button
                      onClick={() => deleteCategoryHandler(item._id)}
                      className=" border-0  text-white rounded-[5px] text-[17px] font-medium p-2.5 cursor-pointer"
                    >
                      Delete category
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

export default CategoriesTable;
