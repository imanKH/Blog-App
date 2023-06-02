import { Link } from "react-router-dom";

const PostItem = ({ post, userName, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  return (
    <Link
      to={`/posts/details/${post?._id}`}
      className=" gap-3 w-[500px] relative max-lg:w-full bg-white overflow-hidden rounded-lg gap flex flex-col items-start justify-between border border-gray-300 transition-all duration-150 shadow-sm hover:shadow-md"
    >
      <div className="w-full">
        <img
          src={post?.image.url}
          alt=""
          draggable="false"
          className="post-item-image w-full h-[250px] object-cover"
        />
        <Link
          className="cursor-pointer absolute top-4 left-4 bg-white font-bold shadow-md rounded-full capitalize px-4 py-1 text-[12px]"
          to={`/posts/categories/${post?.category}`}
        >
          {" "}
          {post?.category}
        </Link>
      </div>

      <div className="flex flex-col px-4 pb-5 pt-3 w-full h-full">
        <div className="post-item-info flex items-center justify-between">
          <div className="flex text-[12px] items-center gap-2">
            <Link
              to={profileLink}
              className="border-b border-b-gray-400 hover:border-b-transparent transition-all duration-300 text-gray-400 capitalize"
            >
              {userName ? userName : post?.user.userName}
            </Link>
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            <div className="post-item-date  border-b border-b-transparent text-gray-400">
              {new Date(post?.createdAt).toDateString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <div className="post-item-details flex items-center justify-end p-[5px]">
            <h4 className="post-item-title text-[#1d2d3d] text-center text-[25px] font-bold capitalize">
              {post?.title}
            </h4>
          </div>
          <p className="flex-grow text-right text-[14px] leading-[1.9] text-gray-400 font-medium p-[5px] my-[5px] mx-0  line-clamp-2 ">
            {post?.description}
          </p>
          <div className="flex">
            <p className="mt-3 font-bold border-b-[2px] border-transparent hover:border-black transition-all duration-500">
              Read More
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
