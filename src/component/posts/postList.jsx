import { Link } from "react-router-dom";
import "./post.css";
import { useLocation } from "react-router-dom";
import PostItem from "./postItem";

const PostList = ({ posts }) => {
  let location = useLocation().pathname;
  return (
    <div className="flex flex-col gap-4 select-none">
      <h1 className="text-[30px] capitalize text-black">latest posts</h1>
      <div className="post-list grid grid-cols-2 max-lg:grid-cols-1 gap-4">
        {posts.map((item) => (
          <PostItem post={item} key={item._id} />
        ))}
      </div>

      {location === "/" && (
        <Link
          to="/posts"
          className="bg-[#264C6C] capitalize px-4 py-1 text-center rounded-md font-medium hover:bg-[#235774] transition-all duration-300 text-gray-100 text-[20px]"
        >
          See All Posts
        </Link>
      )}
    </div>
  );
};

export default PostList;
