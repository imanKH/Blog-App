import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import fetchCategories from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  //bade ekhud el information yalle bl form la eb3ata la serveur la haya ekhud el info mn el input bestaeml usestate
  useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // lezem naamol binding ben el state wl input
  //(3mlna binding ben el state wl input yaene kl el values yalle rah ykteba el user bl input rah tkun bl state )

  //(lezm nkton form handler function  submit mishn ne2der nekhued l data la serveur )

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); // e yaene evenet bas aeml e. prevent default hiye yalle btsir taemel save lal info badal ma tkun el submit 3m taeml reload
    // abel ma nebaat el data lal serveur lzm naeml validation
    if (title.trim() === "") return toast.error("post title is required");
    if (category.trim() === "") return toast.error("post category is required");
    if (description.trim() === "")
      return toast.error("post description is required");
    if (!file) return toast.error("post image is required");

    // console.log({title, category , description , file });
    //(ana am etba3 bl console bas lzm etba3 msg lal user mishn heik bde estaeml nom i react toastify bftah new terminal  heik btnzl)
    // hayda el form yalle 3ande laan fe image fa hue mnu form 3ade ma b2der ebaato ka file json la serveur
    // lzm ebaatu ka form data

    const formData = new FormData(); //el FormData hue class bl js khla2et mnu object hyda el object
    formData.append("image", file); // hyda el append bizide data ka key w value lal form data w baedn mnbaat el form data la serveur
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // @TODO - send form data to server
    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  },[dispatch]);

  return (
    <section className="create-post w-full h-screen pt-130px flex items-center justify-center p-[20px] flex-col ">
      {/* el h-screen pt-130px hiyye el height : calc(100vh -130px) el 130 hiye 80 header w 30 footer */}
      <h1 className="create-post-title text-[30px] text-[#1d2d3d] mb-2.5">
        Create new post
      </h1>
      <form
        onSubmit={formSubmitHandler}
        className="create-post-form font-bol flex flex-col"
      >
        <input
          type="text"
          placeholder="Post title"
          className="create-post-input w-full rounded-[5px] border border-gray-400 text-[21px] p-2.5 my-[5px] mx-0"
          value={title} // yaene hayda el title mn el state
          onChange={(e) => setTitle(e.target.value)} //el value el tile yale ha yktba el user w el target hiye el input
          //yaene el e.target.value setTitle(e.target 3am tekhud el el value yalle am ynkatab w am ynaamlu set)
          //bisir el value tabae el title hue el value yalle foe 3raftu
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input  w-full rounded-[5px] border border-gray-400 text-[21px] p-2.5 my-[5px] mx-0"
        >
          <option disabled value="">
            Select a category
          </option>
          {categories.map(category => <option className="capitalize" key={category._id} value={category.title}>
            {category.title}
          </option>)}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-post-textarea resize-none  w-full rounded-[5px] border border-gray-400 text-[21px] p-2.5 my-[5px] mx-0"
          rows="5"
          placeholder="Post description"
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])} //ma b3tiya value baetiya files laan l file yu3tabar array w ana bde aeml upload la sura wahde w sura wahde ra7 ykhazena b index 0 fa bktba index[0]
          className="create-post-upload  w-full rounded-[5px] border border-gray-400 text-[21px] p-2.5 my-[5px] mx-0  "
        />
        <button
          type="submit"
          className="create-post-btn w-full text-center cursor-pointer bg-[#2A3A5F]  text-white border-0 text-[21px] font-medium rounded-[5px] p-2.5 mt-[15px] "
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) :
           "Create"
          }
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
