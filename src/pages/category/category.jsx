import { useParams, Link} from "react-router-dom";
import PostList from "../../component/posts/postList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector(state => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category,dispatch]);

  return (
    <section className="category min-h-screen container mx-auto mt-20 mb-4 px-2">
      {postsCate.length === 0 ? 
        <>
          <h1 className="category-not-found text-[30px] text-[#292b2c] capitalize">
            posts with <span className=" text-red-500">{category}</span> Category not found
          </h1>
          <Link to= "/posts" className="category-not-found-link underline text-[21px] font-medium">
            Go to the posts page
          </Link>
        </>
       : 
        <>
          <h1 className="category-title capitalize mb-[15px] text-[#1d2d3d] pb-[5px] border-b-2 border-gray-700 text-3xl w-max ">
            posts based on {category}
          </h1>
          <PostList posts={postsCate} />
        </>
      }

    
    </section>
  );
};

export default Category;
