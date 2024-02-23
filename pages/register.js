import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import Footer from "../components/footer";
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Registration successful Please Verify your email before Logging in.");
      console.log("register response", { data });
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setMessage(true);

    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className= "signup_container">
        <div className= "signup_form_container">
          <div className= "left1">
            <h1>Welcome Back</h1>
            <Link href="/login">
              <button type="button" className="white_btn" color="white">
                Sign in
              </button>
            </Link>
          </div>
          <div className="right1">
            {message ? (
              <div className="form_container1">
                <p className="text-center">
                  A verification email has been sent to {email}.
                  Please follow the instructions in the email
                  to complete your registration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form_container1">
                <input
                  type="text"
                  className="input1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name"
                  required
                />
                <input
                  type="email"
                  className="input1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
                <input
                  type="password"
                  className="input1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
                <div>
                  <button
                    className="green_btn1"
                    type="submit"
                    disabled={!name || !email || !password || loading}
                  >
                    {loading ? <SyncOutlined spin /> : "Submit"}
                  </button>
                </div>
              </form>
            )}
            <p className="p-1">
              Already registered?{``}{" "}
              <Link className="link-style" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
