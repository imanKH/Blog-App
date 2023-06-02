import { useState } from "react";
import {toast} from "react-toastify";

const ForgotPassword = () => {
 const [email, setEmail] = useState("");

 //Form Submit Handler
 const formSubmitHandler = (e) => {
    e.preventDefault();
    if(email.trim() === "") return toast.error("email is required");

    console.log ({email})
 }

    return (
        <section className="form-container w-full min-h-screen flex justify-center items-center flex-col p-[15px]">
            <h1 className="form-title text-[30px] text-[#1d2d3d] mb-[15px]"> Forgot Password </h1>
            <form  onSubmit={formSubmitHandler} className="form w-[500px]">
                <div className="form-group  mb-[15px] flex flex-col items-start">
                    <label htmlFor="email" className="form-label m-2.5 text-[15px] font-medium text-[#495e74]">
                        Email
                    </label>
                    <input type="email" 
                    className="form-input  w-full rounded-[5px] border border-gray-500 text-[21px] p-5" 
                    id="username" placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
               
                <button className="form-btn w-full text-center cursor-pointer bg-[#1d2d3d] border-0 text-[21px] font-medium text-white rounded-[5px] p-5 mt-[15px]" type="submit"> 
                Submit
                </button>

            
            </form>
        </section>
     );
}
 
export default ForgotPassword;