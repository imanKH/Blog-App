import { AiFillCamera } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import "./profile.css";
// import postList from "../../component/posts/postList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./updateProfileModal";
import {logoutUser} from "../../redux/apiCalls/authApiCall";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profiLeApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../component/posts/postItem";
import { Oval } from "react-loader-spinner";
// import state from "sweetalert/typings/modules/state";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const navigate = useNavigate();
  useEffect(() => {
 if(isProfileDeleted){
  navigate("/");
 }
  }, [dispatch, navigate,isProfileDeleted]);

  //Form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Ther no file!");

    // const formData = new FormData();
    // formData.append("image", file);
    dispatch(uploadProfilePhoto(file));
  };

  //Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
      dispatch(deleteProfile(user._id));
      dispatch(logoutUser());
      } 
    });
  };
  if (loading) {
    return (
      <div className="profile-loader ">
        <Oval
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="grey"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }

  return (
    <section className="profile pt-[35px]">
      <div className="profile-header w-full h-[400px] flex  items-center justify-center flex-col bg-[#083b6e]">
        <div className="profile-image-wrapper w-[120px] h-[120px] relative text-center">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image w-full h-full rounded-[50%] object-cover"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="upload-profile-photo-icon text-[#1d2d3d] bg-[#eee] border border-solid border-gray-800 rounded-[50%] px-[5px] absolute bottom-[-5px] right-[5px] m-auto w-max cursor-pointer z-10 text-[25px] "
                >
                  <AiFillCamera onClick={() => setUpdateProfile(false)} />
                </label>
              </abbr>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                type="file"
                name="file"
                id="file"
              />
              <button
                className="upload-profile-photo-btn  bg-[#eee] border border-solid border-gray-800 rounded-[5px] px-[5px] absolute bottom-[-5px]  m-auto w-max cursor-pointer z-10 text-[14px] font-bold text-[#292b2c] right-[-55px]"
                type="submit"
              >
                Upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username text-[30px] text-white my-[8px] ">
          {profile?.userName}
        </h1>
        <p className="profile-bio text-[18px] font-medium my-[8px] ">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong className=" text-gray-500 text-[17px]">Date joined:</strong>
          <span className="text-[#16a085] text-[500] font-medium ">
            {new Date(profile?.createdAt).toDateString()}
          </span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn flex items-center justify-center px-[8px] py-[3px] text-[21px] font-medium bg-[#1398A2] text-white border-0 my-[8px] mx-5 rounded-[10px] mt-[20px] cursor-pointer"
          >
            <BsFillPersonFill />
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list w-[800px] flex flex-col items-center gap-4 w-full">
        <h2 className="profile-posts-list-title mb-[20px] py-[8px] text-[#1d2d3d] border-b-2 border-solid border-gray-800">
          {profile?.userName} Posts
        </h2>
        {profile?.posts?.map((post =>
          <PostItem
            key={post._id}
            post={post}
            userName={profile?.userName}
            userId={profile?._id}
          />
        ))}
      </div>

      {user?._id === profile?._id && (
        <button
          onClick={deleteAccountHandler}
          className="delete-account-btn bg-[white] text-[red] p-[8px] border border-solid border-red-500 cursor-pointer font-medium text-[18px]"
        >
          {" "}
          Delete Your Account{" "}
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
