import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Logout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  localStorage.removeItem("auth");
  setAuth({
    ...auth,
    user: null,
    token: "",
  });
  navigate("/");
};

export default Logout;
