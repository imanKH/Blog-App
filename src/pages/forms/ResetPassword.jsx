import { useState } from "react";
import {toast} from "react-toastify";

const ResetPassword = () => {
 const [password, setPassword] = useState("");

 //Form Submit Handler
 const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if(password.trim() === "") return toast.error("password is required");


    console.log ({ password})
 }

    return (
        <section className="form-container w-full  flex justify-center items-center flex-col p-[15px]">
            <h1 className="form-title text-[30px] text-[#1d2d3d] mb-[15px]"> Reset Password </h1>
            <form  onSubmit={formSubmitHandler} className="form w-[500px]">
                <div className="form-group  mb-[15px] flex flex-col items-start">
                    <label htmlFor="password" className="form-label m-2.5 text-[15px] font-medium text-[#495e74]">
                      New Password
                    </label>
                    <input type="password" 
                    className="form-input  w-full rounded-[10px] border border-gray-500 text-[21px] p-5"
                     id="password" placeholder="Enter your New password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} 
                     />
                </div>
                <button className="form-btn w-full text-center cursor-pointer bg-[#1d2d3d] border-0 text-[21px] font-medium text-white rounded-[10px] p-5 mt-[15px]" type="submit"> 
                Submit
                </button>

            </form>
        </section>
     );
}
 
export default ResetPassword;