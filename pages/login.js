import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);

  const { user } = state;
  const router = useRouter();
  useEffect(() => {
    if (user !== null) {
      if (user.role.includes("Agency")) {
        router.push("/instructor");
      } else {
        router.push("/user");
      }
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      toast.success("Logging in");

      console.log("login response",  data._id );
      sessionStorage.setItem('user', data._id);

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      // router.push("/user");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
        <div className= "login_container">
          <div className= "login_form_container">
            <div className= "left">

              <form className="form_container" onSubmit={handleSubmit}>
                <h1>Login to Your Account</h1>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
                <input
                 className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
                <div >
                  <button
                    className="green_btn"
                    type="submit"
                    disabled={!email || !password || loading}
                  >
                    {loading ? <SyncOutlined spin /> : "Submit"}
                  </button>
                </div>
                <p>
                 
                  <Link className="link-style" href="/forgot-password">
                  Forgot your Password?
                  </Link>
                </p>
              </form>
            </div>
            <div className="right" >
              <h1>New Here ?</h1>
              <Link href="/register">
                <button type="button" className="white_btn" color="white">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
    </>
  );
};

export default Login;
