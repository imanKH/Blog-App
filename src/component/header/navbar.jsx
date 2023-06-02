import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle, location }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar select-none"
    >
      <ul className="  nav-links header-right flex items-center gap-6">
        <Link
          to="/"
          onClick={() => setToggle(false)}
          className={
            "nav-link cursor-pointer text-[21px] flex gap-2 items-center font-thin hover:-[#efefef] transition-all duration-150 " +
            (location === "/"
              ? " text-white"
              : " text-gray-400 hover:text-white")
          }
        >
          Home
        </Link>
        <Link
          to="/posts "
          onClick={() => setToggle(false)}
          className={
            "nav-link cursor-pointer flex gap-2 items-center text-[21px] font-thin transition-all duration-150 " +
            (location === "/posts"
              ? " text-white"
              : " text-gray-400 hover:text-white")
          }
        >
          <span>Posts</span>
        </Link>

        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}
            className={
              "nav-link flex gap-2 items-center cursor-pointer text-[21px] font-thin transition-all duration-150 " +
              (location === "/admin-dashboard"
                ? " text-white"
                : " text-gray-400 hover:text-white")
            }
          >
            Dashboard
          </Link>
        )}
        
        {user && (
          <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}
            className={
              "nav-link flex gap-2 items-center cursor-pointer text-[21px] font-thin transition-all duration-150 " +
              (location === "/posts/create-post"
                ? " text-white"
                : " text-gray-400 hover:text-white")
            }
          >
            <span>Create</span>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
