import "./registerPage.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { registerUser } from "../../redux/apiCalls/authApiCall";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMesssage } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // From Submit Handler
  const OnSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    const user = {
      userName: username,
      email,
      password,
    };

    dispatch(registerUser(user));
  };

  const navigate = useNavigate();

  if (registerMesssage) {
    swal({
      title: registerMesssage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }

  return (
    <section className="form-container min-h-screen">
      <h1 className="form-title capitalize">Create new account</h1>
      <form onSubmit={OnSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input capitalize"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label capitalize">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label capitalize">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn capitalize">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link className="text-blue-500 hover:text-blue-800" to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
