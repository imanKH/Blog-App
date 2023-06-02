import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header/header";
import Home from "./pages/home/home";
import Login from "./pages/forms/login";
import Register from "./pages/forms/registerPage";
import PostPage from "./pages/post-pages/postsPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import CreatePost from "./pages/create-post/createPost";
import Footer from "./component/footer/footer";
import PostDetails from "./pages/post details/postDetails";
import Category from "./pages/category/category";
import Profile from "./pages/profile/profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/postTable";
import CategoriesTable from "./pages/admin/categoriesTable";
import CommentsTable from "./pages/admin/commentsTable";
import ForgotPassword from "./pages/forms/forgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not found/notFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/verifyEmail";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* yaene bas ykun el route / byftahle el home component */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="posts">
          <Route index element={<PostPage />} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />{" "}
          {/*  hatet /:d laan he parameter w post aan post bykhtlf  */}
          <Route path="categories/:category" element={<Category />} />
        </Route>
        <Route path="/admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
