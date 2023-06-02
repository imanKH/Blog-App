import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("email is required");
    if (password.trim() === "") return toast.error("password is required");

    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="form-container w-full min-h-screen flex justify-center items-center flex-col p-[15px]">
      <h1 className="form-title text-[30px] text-[#1d2d3d] mb-[15px] capitalize">
        {" "}
        Login To Your Account{" "}
      </h1>
      <form onSubmit={formSubmitHandler} className="form w-[500px]">
        <div className="form-group  mb-[15px] flex flex-col items-start">
          <label
            htmlFor="email"
            className="form-label m-2.5 text-[15px] font-medium text-[#495e74] capitalize"
          >
            Email
          </label>
          <input
            type="email"
            className="form-input  w-full rounded-[5px] border border-gray-500 text-[21px] p-5"
            id="username"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group  mb-[15px] flex flex-col items-start">
          <label
            htmlFor="password"
            className="form-label m-2.5 text-[15px] font-medium text-[#495e74] capitalize"
          >
            Password
          </label>
          <input
            type="password"
            className="form-input  w-full rounded-[5px] border border-gray-500 text-[21px] p-5"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center w-full ">
        <button
          className=" cursor-pointer w-[50%] bg-[#1d2d3d] text-[16px] text-white rounded-[5px] px-[10px] py-[10px]"
          type="submit"
        >
          Login 
        </button>
        </div>
       

        <div className="flex justify-center gap-1 mt-4 items-center text-[17px] text-[#292b2c]">
          Did you forgot Your Password?{" "}
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-800">Forgot Password</Link>
        </div>
      </form>
    </section>
  );
};
// form-btn w-full text-center cursor-pointer  bg-[#1d2d3d] border-0 text-[21px] font-medium text-white rounded-[5px] p-5 mt-[15px]

export default Login;
