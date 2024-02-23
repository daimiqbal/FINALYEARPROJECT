import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import success from "../public/images/success.png";
const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const router = useRouter();
    const { emailVerificationToken } = router.query;

    useEffect(() => {
        if (emailVerificationToken) {
          const verifyEmailUrl = async () => {
            try {
              const { data } = await axios.get(
                `/api/VerifyEmail/${emailVerificationToken}`
              );
              console.log(data);
              setValidUrl(true);
            } catch (error) {
              console.log(error);
              setValidUrl(false);
            }
          };
          verifyEmailUrl();
        }
        console.log(emailVerificationToken);
      }, [emailVerificationToken]);
      

    return (
        <>
            {validUrl ? (
                <div className="container2">
                    <Image src={success} alt="success_img" className="success_img" />
                    <h1>Email verified successfully</h1>
                </div>
            ) : (
                <div className="site1">
                    <div className="container2">
                        <h1>404 Not Found </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmailVerify;
