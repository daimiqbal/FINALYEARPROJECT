import TopNav from "../components/TopNav";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import Footer from "../components/footer";
const MyApp = ({ Component, pageProps }) => {
  return (
    
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  );
};

export default MyApp;
