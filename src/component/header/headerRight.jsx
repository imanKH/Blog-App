import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiLogOut, BiUser } from 'react-icons/bi'
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dropdown, setDropdown] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };
  console.log(user);
  return (
    <div className="header-right select-none text-[21px] flex ">
      {user ? (
        <>
          <div
            onClick={() => setDropdown(!dropdown)}
            className="header-right-user-info justify-center flex flex-row-reverse items-center gap-3 relative cursor-pointer "
          >
            <span className="header-right-usename text-[18px] text-[#efefef] capitalize">
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="userphoto"
              className="header-right-user-photo w-[40px] h-[40px] object-cover rounded-lg"
            />
            {dropdown && (
              <div className="absolute rounded-b-lg flex flex-col gap-3 p-4 top-[60px] right-[0px] text-[20px] bg-white shadow-xl">
                <Link
                  to={`/profile/${user?._id}`}
                  className="flex items-center gap-2 hover:bg-gray-300 rounded px-3 py-1 transition-all duraiton-300"
                  onClick={() => setDropdown(false)}
                >
                  <BiUser /> Profile
                </Link>
                <div
                  onClick={logoutHandler}
                  className="flex items-center gap-2 border hover:bg-red-700 hover:text-white text-red-700 border-red-700 rounded px-3 py-1 transition-all duraiton-300"
                >
                  <BiLogOut /> Logout
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
        <div className="flex gap-4">
        <Link
            to="/login"
            className="header-right-link cursor-pointer text-[21px] flex gap-2 items-center font-thin text-white hover:-[#efefef]"
          >
          
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="header-right-link cursor-pointer text-[21px] flex gap-2 items-center bg-white hover:-[#efefef] transition-all duration-150 border border-white rounded-[10px] px-4 py-2 shadow-sm hover:shadow-lg"
          >
            
            <span>Register</span>
          </Link>
        </div>
       
        </>
      )}
    </div>
  );
};

export default HeaderRight;
