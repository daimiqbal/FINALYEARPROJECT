import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import Footer from "../components/footer";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword);

    try {
      setLoading(true);

      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });

      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Amazing!! Now u can login with ur new password");
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left1">
            <h1>
              Forgot Password
            </h1>
          </div>
          <div className="right1">
            <form onSubmit={success ? handleResetPassword : handleSubmit} className="form_container1">
              <input
                type="email"
                className="input1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              {success && (
                <>
                  <input
                    type="text"
                    className="input1"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter secret code"
                    required
                  />
                  <input
                    type="password"
                    className="input1"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </>
              )}
              <br />
              <button
                className="green_btn1"
                disabled={loading || !email}
              >
                {loading ? <SyncOutlined spin /> : "Submit"}
              </button>
              <p className="p-1">
                Want to Login?{``}{" "}
                <Link className="link-style" href="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
