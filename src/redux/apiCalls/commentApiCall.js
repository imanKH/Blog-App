// This function creates a new comment and adds it to the post
import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

//create comment 
export default function createComment(newComment) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.post("/api/comments", newComment, {
      headers:{
        Authorization: "Bearer " + getState().auth.user.token,
          }
      });

      dispatch(postActions.addCommentToPost(data));
      toast.success("Comment added successfully!");
    
    } catch (error) {
      // Only catch the specific error that it is meant to catch
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        throw error;
      }
    }
  };
}

//update comment 
export function updateComment(commentId , comment, user) {
    return async (dispatch,getState) => {
      try {
        const { data } = await request.put(`/api/comments/${commentId}`, {
          postId: commentId,
          text:comment,
          user
        }, {
        headers:{
          Authorization: "Bearer " + getState().auth.user.token,
            }
        });
  
        dispatch(postActions.updateCommentPost(data));
        toast.success("Comment added successfully!");
      
      } catch (error) {
        // Only catch the specific error that it is meant to catch
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          throw error;
        }
      }
    };
  }

//delete comment 
export function DeleteComment(commentId) {
    return async (dispatch,getState) => {
      try {
        await request.delete(`/api/comments/${commentId}`, {
        headers:{
          Authorization: "Bearer " + getState().auth.user.token,
            },
        });
        dispatch(commentActions.deleteComment(commentId));  
        dispatch(postActions.deleteCommentFromPost(commentId)); 
        
      } catch (error) {
        // Only catch the specific error that it is meant to catch
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          throw error;
        }
      }
    };
  }

  //Fetch All Comments
export function fetchAllComments() {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
      headers:{
        Authorization: "Bearer " + getState().auth.user.token,
          },
      });
      dispatch(commentActions.setComments(data));
    
    } catch (error) {
      // Only catch the specific error that it is meant to catch
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        throw error;
      }
    }
  };
}
