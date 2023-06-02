import "./postPage.css";

import PostList from "../../component/posts/postList.jsx";
import Sidebar from "../../component/sidebar/sidebar.jsx";
import Pagination from "../../component/pagination/pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 4;

const PostPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

useEffect(() => {
  dispatch(fetchPosts(currentPage,POST_PER_PAGE));
  window.scrollTo(0, 0);
},[currentPage,dispatch]);

useEffect(() => {
  dispatch(getPostsCount());
},[dispatch]);
  
  return (
    <>
      <section className="posts-page flex items-start gap-4 pt-[30px] px-2">
        <PostList posts={posts} />
        <Sidebar/>
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostPage;
