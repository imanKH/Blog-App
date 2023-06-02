import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { profileActions } from "../slices/profileSlice";

//Get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Upload profile photo
export const uploadProfilePhoto = (newPhoto) => async (dispatch, getState) => {
  try {
    const { data } = await request.post(
      "/api/users/profile-photo-upload",
      { image: newPhoto },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(profileActions.setProfilePhoto(data.profilePhoto));
    dispatch(authActions.setUserPhoto(data.profilePhoto));
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userInfo")),
        profilePhoto: data.profilePhoto,
      })
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Error uploading profile photo"
    );
    console.error(error);
  }
};

//Update profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUserName(data.userName));

      //modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data.userName;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error?.response.data.message);
      console.error(error);
    }
  };
}

//Delete profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(
        `/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error?.response.data.message);
      dispatch(profileActions.clearLoading())
    }
  };
}

//Get users Count(for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.getUsersCount(data));
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };
}

//Get All users Profile(for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/profile`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };
}