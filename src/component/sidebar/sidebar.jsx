import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchCategories from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [range, setRange] = useState(7);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="sidebar space-y-4 select-none flex-grow ">
      <h5 className="sidebar-title text-[30px] capitalize text-black ">
        categories
      </h5>
      <ul className="sidebar-links flex flex-col gap-2">
        {categories.slice(0, range).map((category) => (
          <Link
            className="flex flex-col bg-[#188897] capitalize px-4 py-2 rounded-md font-medium hover:bg-[#1A7C8E] transition-all duration-300 text-gray-100 text-[16px]"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
        <button
          onClick={() => setRange(range + 2)}
          className="bg-[#264C6C] capitalize px-4 py-1 rounded-md font-medium hover:bg-[#235774] transition-all duration-300 text-gray-100 text-[16px]"
        >
          Show more
        </button>
      </ul>

      <div className="bg-gray-300 h-[300px] animate-pulse rounded-md shadow flex items-center justify-center">
        Loading ad
      </div>
    </div>
  );
};
export default Sidebar;
