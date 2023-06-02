import { BsList, BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const HeaderLeft = ({ toggle, setToggle }) => {
  return (
    <Link
      to={"/"}
      className=" header-left flex items-center md:flex-row-reverse"
    >
      <div className=" flex items-center text-[30px] select-none gap-1 text-white font-thin">
         <span className="bg-white w-1 h-1 rounded-full" />ActivityHub<span className="bg-white w-1 h-1 rounded-full" />
      </div>
      <div
        onClick={() => setToggle((prev) => !prev)}
        className=" header-menu text-4xl text-white cursor-pointer md:hidden  md:mr-20 "
      >
        {toggle ? <BsXLg /> : <BsList />}
      </div>
    </Link>
  );
};

export default HeaderLeft;
