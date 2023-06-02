import "./admin.css";
import AdminMain from "./adminMain";
import AdminSidebar from "./adminSidebar";


const AdminDashboard = () => {
    return ( 
    <section className="admin-dashboard flex  flex-col overflow-hidden w-full min-h-screen-[100vh]
    ">
        <AdminSidebar/>
        <AdminMain/>

    </section> );
}
 
export default AdminDashboard;