import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profiLeApiCall";

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(profile.userName);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { userName: username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[999] flex items-center justify-center">
      <form
        onSubmit={formSubmitHandler}
        className="update-profile-form w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]"
      >
        <abbr title="close">
          <AiOutlineClose
            onClick={() => setUpdateProfile(false)}
            className="update-form-close absolute top-[5px] right-[5px] text-[#d9534f cursor-pointer text-[30px]"
          />
        </abbr>
        <h1 className="update-profile-title mb-2.5 text-[24px] text-[#16a085] text-center">
          {" "}
          Update Your Profile
        </h1>
        <input
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="update-profile-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        />
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          type="text"
          className="update-profile-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="text"
          className="update-profile-input w-full rounded-[10px] text-[21px] border border-gray-500 p-2.5 my-2.5 mx-0"
        />
        <button
          type="submit"
          className="update-post-btn w-full text-center cursor-pointer bg-[#16a085] border-0 text-[21px] font-medium text-white rounded-[10px] p-2.5 mt-[15px]"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
