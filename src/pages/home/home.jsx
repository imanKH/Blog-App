import PostList from "../../component/posts/postList";
import "./home.css";
import Sidebar from "../../component/sidebar/sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1)); //bdu page number ka argument baete 1
  }, [dispatch]);
  // It will come back to you in unexptected ways.
  return (
    <section>
      <div className="h-[450px] checking bg-gradient-to-br from-[#380036] to-[#0CBABA] w-full flex items-center relative">
      <div class="area h-[450px]" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
        <div className="container mx-auto px-2 flex flex-col justify-center items-center gap-4 text-slate-200">
          <h3 className="text-[40px] text-center font-thin text-white">Do good</h3>
          <p className="text-[18px] text-center font-thin">It will come back to you in unexptected ways.</p>
        </div>
      </div>

      <div className="container mx-auto  py-7 px-4 flex flex-col gap-4">
        <div className="flex items-start flex-wrap justify-between gap-5">
          <PostList posts={posts} />
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default Home;
