import { Link } from 'react-router-dom';
import { BsPerson ,BsFilePostFill ,BsTagFill , BsChatLeftText,BsColumns} from 'react-icons/bs';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar flex-[2]  p-[20px] border-r border-gray-400">
         <Link to="/admin-dashboard" className="admin-sidebar-title text-[24px] font-bold text-[#1d2d3d] mb-[30px]  block"> 
         <BsColumns className='mr-2.5 text-green-500'/>
         Dashboard
         </Link>
         <ul className="admin-dashboard-list p-2.5 ">
            <Link to="/admin-dashboard/users-table"
             className='admin-sidebar-link flex text-[#495e74] font-semibold mb-[20px] cursor-pointer block '>
            <BsPerson className='mr-2.5 text-[24px]'/>
           <span> Users</span>
            </Link>
            <Link to="/admin-dashboard/posts-table" className='admin-sidebar-link  flex  text-[#495e74] font-semibold mb-[20px] cursor-pointer block'>
            <BsFilePostFill className='mr-2.5 text-[24px]'/>
           <span>Posts</span> 
            </Link>
            <Link to="/admin-dashboard/categories-table" className='admin-sidebar-link flex text-[#495e74] font-semibold mb-[20px] cursor-pointer block'>
            <BsTagFill className='mr-2.5 text-[24px]'/>
            <span>categories</span>
            </Link>
            <Link to="/admin-dashboard/comments-table" className='admin-sidebar-link flex text-[#495e74] font-semibold mb-[20px] cursor-pointer block'>
            <BsChatLeftText className='mr-2.5 text-[24px]'/>
            <span>comments</span>
            </Link>
         </ul>
        </div>
      );
}
 
export default AdminSidebar ;