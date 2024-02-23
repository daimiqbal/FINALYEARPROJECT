import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import {
  UserSwitchOutlined,
  LoadingOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { toast } from "react-toastify";
import Footer from "../../components/footer";

const RegisterAgency = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const registerAgency = () => {
    setLoading(true);
    axios
      .post("/api/make-agency")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        toast("Stripe onboarding failed. Try again!!");
        setLoading(false);
      });
  };
  return (
    <>
      <div className="site1">
        <div className="jumbotron">
          <div>
            <h1 className="text-center square text-white">Register Your Agency</h1>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                  <div className="pt-4">
                    <UserSwitchOutlined className="display-1 pb-3 text-white" />
                    <br />
                    <h2 className="text-white">Setup payout to Register your Agency on Travel Ease</h2>
                    <p className="lead text-warning">
                      Travel Ease partners with stripe to make your payments
                      secure and safe
                    </p>
                    <Button
                      className="mb-3 btn-color"
                      type="primary"
                      block
                      shape="round"
                      icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                      size="large"
                      onClick={registerAgency}
                      disabled={
                        (user &&
                          user.role &&
                          user.role.includes("Instructor")) ||
                        loading
                      }
                    >
                      {loading ? "Processing...." : "Payout Setup"}
                    </Button>

                    <p className="lead">
                      You will be redirected to stripe to complete onboarding
                      process
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
  export default RegisterAgency;
