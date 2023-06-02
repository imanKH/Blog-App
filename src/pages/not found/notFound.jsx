import {Link} from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
    return (
        <section className="not-found w-full flex items-center justify-center flex-col">
            <div className="not-found-title text-[70px] font-bold text-red-500">
                404
            </div>
            <h1 className="not-found-text text-[30px] text-[#1d2d3d] mb-[30px] ">
                Page Not Found
            </h1>
            <Link className="not-found-link  block text-white bg-[#495e74] text-[21px] font-medium rounded-[5px] hover:bg-[#1d2d3d]"  to='/'> Got to home pge</Link>
        </section>
    );
}

export default NotFound;
