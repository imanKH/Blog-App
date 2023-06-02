import "./verifyEmail.css";
import { BsPatchCheck } from "react-icons/bs";
import { Link,useParams } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux';
import { useEffect } from "react";

const VerifyEmail = () => {
const dispatch = useDispatch();
const { isEmailVerified } = useSelector(state => state.auth);

const {userId , token} =useParams();

useEffect(() => {
dispatch(VerifyEmail(userId, token));
},[userId, token,dispatch])
  return (
    <section className="verify-email w-full flex  items-center justify-center flex-col">
      {isEmailVerified ? (
        <>
          <BsPatchCheck className="verify-email-icon text-[80px] text-green-500" />
          <h1 className="verify-email-title text-[32px] mb-5 text-green-500">
            Your email has been successfully verified
          </h1>
          <Link to ="/login" className="verify-email-link text-[24px] font-semibold bg-[#1d2d3d] p-[5px] rounded-[5px] text-white">
          Go to login Page
          </Link>
        </>
      ) : (
        <>
        <h1 className="verify-email-not-found text-[40px] text-red-500">
            Not Found

        </h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
